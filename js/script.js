//
//  script.js
//  Sudoku Solver
//
//  Created by Nicolas Bergeron on 2013-05-28.
//  Copyright (c) Nicolas Bergeron. All rights reserved.
//
var ROWS = 9;
var COLS = 9;
var SECTIONS = 9;
var CELL_MODEL = {
	value: null,
	possibilities: [1,2,3,4,5,6,7,8,9],
	i: 0,
	j: 0,
	section: 0,
	error: false
};
var TRY_LIMIT = 10000;
var grid;
var rowsValues;
var colsValues;
var sectionsValues;
var gridCopy;
var rowsValuesCopy;
var colsValuesCopy;
var sectionsValuesCopy;

var resolvedCount = 0;
var resolvedCountCopy = 0;
var currentPossibiliesCells;
var nbrOfTry = 0;
var elapsedTime = 0;
var hasError = false;

function MultiDimensionalArray(iRows, iCols, value)
{
	var isObject = false;
	if (typeof(value) == 'object') {
		isObject = true;
		value = $.toJSON(value);
	}
	var a = new Array(iRows);
	for (var i=0; i < iRows; i++) {
		a[i] = new Array(iCols);
		for (var j=0; j < iCols; j++) {
			if (isObject) {
				var obj = $.evalJSON(value);
				a[i][j] = obj;
				// vvv Specific for the grid vvv
				obj.i = i;
				obj.j = j;
				obj.section = parseInt(parseInt((i)/3)*3+(j)/3);
				// ^^^ Specific for the grid ^^^
			}
			else {
				a[i][j] = value;
			}
		}
	}
	return(a);
}

function concatValues(commonValues, arrValues) {
	var concatCount = 0;
	for (var i = 0; i < arrValues.length; i++) {
		if (commonValues.indexOf(arrValues[i]) === -1) {
			commonValues.push(arrValues[i]);
			concatCount++;
		}
	}
	return concatCount;
}

function removePossibilities(cell, arrValues) {
	if (cell.value === null) {
		var tmpIndexOf;
		var arrPossibilities = cell.possibilities;
		for (var i = 0; i < arrValues.length; i++) {
			if (arrPossibilities.length > 0) {
				tmpIndexOf = arrPossibilities.indexOf(arrValues[i]);
				if (tmpIndexOf != -1) {
					arrPossibilities.splice(tmpIndexOf, 1);
				}
			}
		}
		return checkPossibilitiesFinished(cell);
	}
	return 0;
}

function checkPossibilitiesFinished(cell) {
	var arrPossibilities = cell.possibilities;
	if (arrPossibilities.length === 1) {
		var intValue = arrPossibilities[0];
		cell.value = intValue;
		cell.possibilities = [intValue];
		rowsValues[cell.i].push(intValue);
		colsValues[cell.j].push(intValue);
		sectionsValues[cell.section].push(intValue);
		return 1;
	}
	return 0;
}

$(function() {
	createGrid();
	fillGrid();
	$('#cmdClearGrid').click(function() {
		clearGrid();
	});
	$('#cmdAutoResolve').click(function() {
		autoResolve();
	});
	$("input[type=text].cell").live("click", function() {
		this.select();
	});
	$("input[type=text].cell").live("keyup", function (evt) {
		var iOS = ( navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false );

	    if (this.value != this.value.replace(/[^1-9\.]/g, '')) {
			this.value = this.value.replace(/[^1-9\.]/g, '');
		}
		var currentInputIndex = $('input[type=text]').index(this);
		if (!iOS) {
			switch (evt.keyCode) {
				case 32: // Space
					$('input[type=text]:eq(' + (currentInputIndex+1) + ')').focus().select();
					break;
				case 13: // Enter
					$('input[type=text]:eq(' + (currentInputIndex+9) + ')').focus().select();
					break;
				case 8: // Backspace
					if (this.value.length === 0) {
						$('input[type=text]:eq(' + (currentInputIndex-1) + ')').focus().select();
					}
					break;
				case 9: // Tab
				case 16: // Shift
					// Do nothing
					break;
				default:
					if ($(this).val().length > 0) {
						$('input[type=text]:eq(' + (currentInputIndex+1) + ')').focus().select();
					}
			}
		}
	});
});

function createGrid() {
	rowsValues = [[], [], [], [], [], [], [], [], []];
	colsValues = [[], [], [], [], [], [], [], [], []];
	sectionsValues = [[], [], [], [], [], [], [], [], []];
	resolvedCount = 0;
	grid = MultiDimensionalArray(ROWS, COLS, CELL_MODEL);
}

function copyGrid() {
	rowsValuesCopy = $.evalJSON($.toJSON(rowsValues));
	colsValuesCopy = $.evalJSON($.toJSON(colsValues));
	sectionsValuesCopy = $.evalJSON($.toJSON(sectionsValues));
	resolvedCountCopy = resolvedCount;
	gridCopy = $.evalJSON($.toJSON(grid));
}

function restoreGrid() {
	rowsValues = $.evalJSON($.toJSON(rowsValuesCopy));
	colsValues = $.evalJSON($.toJSON(colsValuesCopy));
	sectionsValues = $.evalJSON($.toJSON(sectionsValuesCopy));
	resolvedCount = resolvedCountCopy;
	grid = $.evalJSON($.toJSON(gridCopy));
	hasError = false;
}

function fillGrid() {
	var strHTML = '<table id="grid">';
	for (var i=0; i < ROWS; i++) {
		strHTML += '<tr>';
		for (var j=0; j < COLS; j++) {
			var tmpCell = grid[i][j];
			strHTML +=	'<td>' +
						'<input' +
						' type="text" pattern="[0-9]*" size="1"' +
						' style="' + (((j+1)%(COLS/3) === 0 && j < (COLS-1)) ? 'border-right:3px solid black;' : '') + (((i+1)%(ROWS/3) === 0 && i < (ROWS-1)) ? 'border-bottom:3px solid black;' : '') + '"' +
						' maxlength="1" id="' + i.toString() + "_" + j.toString() + '"' +
						' value="' + (tmpCell.value != null ? tmpCell.value.toString() : '') + '"' +
						' class="cell' +
							(tmpCell.error ? " error" : "")  + '"' +
						' />' +
						'</td>';
		}
		strHTML += '</tr>';
	}
	strHTML += '</table>';
	$('#content').html(strHTML);
	$('#resolvedCount').html(resolvedCount.toString());
	if (nbrOfTry === 0) {
		$("#divNbrOfTry").hide();
	}
	else {
		$("#divNbrOfTry").show();
	}
	$('#nbrOfTry').html(nbrOfTry.toString());
	if (elapsedTime === 0) {
		$("#divElapsedTime").hide();
	}
	else {
		$("#divElapsedTime").show();
	}
	$('#elapsedTime').html(elapsedTime.toString());
}

function clearGrid() {
	nbrOfTry = 0;
	elapsedTime = 0;
	createGrid();
	fillGrid();
}

function readGrid() {
	createGrid(); // To reset each cell values

	$('#grid td input').each(function(index) {
		var arrCellId = $(this).attr('id').split('_');
		var i = arrCellId[0];
		var j = arrCellId[1];
		var cellValue = $(this).val();
		if(cellValue !== '') {
			var intValue = parseInt(cellValue);
			if (intValue > 0 && intValue < 10) {
				var cell = grid[i][j];
				cell.value = intValue;
				cell.possibilities = [intValue];
				rowsValues[cell.i].push(intValue);
				colsValues[cell.j].push(intValue);
				sectionsValues[cell.section].push(intValue);
			}
		}
	});
}

function resolve(verifyAllErrors) {
	var tmpResolvedCount = 0;
	resolvedCount = 0;
	hasError = false;
	verifyAllErrors = (typeof verifyAllErrors === "undefined") ? false : verifyAllErrors;
	for (var i=0; i < ROWS; i++) {
		for (var j=0; j < COLS; j++) {
			var tmpCell = grid[i][j];

			var commonValues = new Array();
			tmpCell.error = false;

			// Check for errors
			if (hasDoubleValues(rowsValues[i])) {
				hasError = true;
				tmpCell.error = true;
				if (!verifyAllErrors) {
					return;
				}
			}
			if (hasDoubleValues(colsValues[j])) {
				hasError = true;
				tmpCell.error = true;
				if (!verifyAllErrors) {
					return;
				}
			}
			if (hasDoubleValues(sectionsValues[parseInt(parseInt((i)/3)*3+(j)/3)])) {
				hasError = true;
				tmpCell.error = true;
				if (!verifyAllErrors) {
					return;
				}
			}

			concatValues(commonValues, rowsValues[i]);
			concatValues(commonValues, colsValues[j]);
			concatValues(commonValues, sectionsValues[parseInt(parseInt((i)/3)*3+(j)/3)]);
			
			tmpResolvedCount += removePossibilities(tmpCell, commonValues);

			if (tmpCell.value === null) {
				if (tmpCell.possibilities.length === 0) {
					hasError = true;
					tmpCell.error = true;
					if (!verifyAllErrors) {
						return;
					}
				}
			}
			else {
				resolvedCount++;
			}
		}
	}
	return tmpResolvedCount;
}

function resolveByPossibilities() {
	var tmpResolvedCount = 0;
	for (var i=0; i < ROWS; i++) {
		for (var j=0; j < COLS; j++) {
			var tmpCell = grid[i][j];
			if (tmpCell.value === null && tmpCell.error === false) {
				var tmpPossibilities = new Array();
				for (var k=0; k < ROWS; k++) {
					if (k != i) {
						concatValues(tmpPossibilities, grid[k][j].possibilities);
					}
				}
				if (concatValues(tmpPossibilities, grid[i][j].possibilities) === 1) {
					var tmpValue = tmpPossibilities[tmpPossibilities.length - 1];
					tmpCell.value = tmpValue;
					tmpCell.possibilities = [tmpValue];
					concatValues(rowsValues[tmpCell.i], [tmpValue]);
					concatValues(colsValues[tmpCell.j], [tmpValue]);
					concatValues(sectionsValues[tmpCell.section], [tmpValue]);
					tmpResolvedCount++
					while(resolve() > 0) {}
				}

				tmpPossibilities = new Array();
				for (var k=0; k < COLS; k++) {
					if (k != j) {
						concatValues(tmpPossibilities, grid[i][k].possibilities);
					}
				}
				if (concatValues(tmpPossibilities, grid[i][j].possibilities) === 1) {
					var tmpValue = tmpPossibilities[tmpPossibilities.length - 1];
					tmpCell.value = tmpValue;
					tmpCell.possibilities = [tmpValue];
					concatValues(rowsValues[tmpCell.i], [tmpValue]);
					concatValues(colsValues[tmpCell.j], [tmpValue]);
					concatValues(sectionsValues[tmpCell.section], [tmpValue]);
					tmpResolvedCount++
					while(resolve() > 0) {}
				}

				tmpPossibilities = new Array();
				for (var k=0; k < SECTIONS; k++) {
					l = (tmpCell.section%3)*3+(k%3);
					m = parseInt(tmpCell.section/3)*3+parseInt(k/3);
					if (l != i || m != j) {
						concatValues(tmpPossibilities, grid[l][m].possibilities);
					}
				}
				if (concatValues(tmpPossibilities, grid[i][j].possibilities) === 1) {
					var tmpValue = tmpPossibilities[tmpPossibilities.length - 1];
					tmpCell.value = tmpValue;
					tmpCell.possibilities = [tmpValue];
					concatValues(rowsValues[tmpCell.i], [tmpValue]);
					concatValues(colsValues[tmpCell.j], [tmpValue]);
					concatValues(sectionsValues[tmpCell.section], [tmpValue]);
					tmpResolvedCount++
					while(resolve() > 0) {}
				}
			}
		}
	}
	return tmpResolvedCount;
}

function hasDoubleValues(arrValues) {
	var hasDouble = false;
	for (var i=0; i < arrValues.length; i++) {
		if (arrValues.indexOf(arrValues[i], i + 1) != -1) {
			hasDouble = true;
			break;
		}
	}
	return hasDouble;
}

function getPossibilityCount(possibilitieslimit) {
	var intToReturn = 0;
	currentPossibiliesCells = [];
	possibilitieslimit = (typeof possibilitieslimit === "undefined") ? 9 : possibilitieslimit;
	for (var i=0; i < ROWS; i++) {
		for (var j=0; j < COLS; j++) {
			var tmpCell = grid[i][j];
			if (tmpCell.value === null) {
				var tmpPossibilities = tmpCell.possibilities;
				var tmpPossibilitiesLength = tmpPossibilities.length;
				if (tmpPossibilitiesLength <= possibilitieslimit) {
					intToReturn += tmpPossibilities.length;
					currentPossibiliesCells.push(tmpCell);
				}
			}
		}
	}
	return intToReturn;
}

function autoResolve() {
	var startTime = new Date().getTime();
	var endTime;
	nbrOfTry = 0;

	readGrid();
	resolve(true);
	if (!hasError) {
		nbrOfTry = autoResolveNormal();
		endTime = new Date().getTime();
		elapsedTime = (endTime - startTime);
		if (resolvedCount < (ROWS * COLS)) {
			alert("No final solution found this time!");
		}
		else {
			fillGrid();
		}
	}
	else {
		alert("Error found in the grid!");
		fillGrid();
	}
}

function autoResolveNormal() {
	var lastResolvedCount;
	var tmpLimit = 0;
	
	do {
		do {
			lastResolvedCount = resolve();
			if (lastResolvedCount === 0 && !hasError) {
				lastResolvedCount += resolveByPossibilities();
			}
			if (lastResolvedCount === 0 && !hasError) {
				lastResolvedCount += resolve();
			}
		} while (lastResolvedCount > 0 && !hasError);
		
		if (tmpLimit === 0 && !hasError) {
			copyGrid();
		}

		if (hasError) {
			restoreGrid();
		}
		var actualPossibilitiesCount = 0;
		for (var i=2; i < 10; i++) {
			actualPossibilitiesCount = getPossibilityCount(i);
			if (actualPossibilitiesCount != 0) {
				break;
			}
		}
		autoResolveTry(parseInt(Math.random() * actualPossibilitiesCount));
	} while (resolvedCount < (ROWS * COLS) && tmpLimit++ < TRY_LIMIT);
	
	return (tmpLimit > TRY_LIMIT ? TRY_LIMIT : tmpLimit);
}

function autoResolveTry(nbrToSkip) {
	var currentPossibiliesCellsLength = currentPossibiliesCells.length;
	for (var i=0; i < currentPossibiliesCellsLength; i++) {
		var tmpCell = currentPossibiliesCells[i];
		var tmpPossibilities = tmpCell.possibilities;
		var tmpPossibilitiesLength = tmpPossibilities.length;
		for (var j=0; j < tmpPossibilitiesLength; j++) {
			if (nbrToSkip === 0) {
				var tmpValue = tmpPossibilities[j];
				tmpCell.value = tmpValue;
				tmpCell.possibilities = [tmpValue];
				rowsValues[tmpCell.i].push(tmpValue);
				colsValues[tmpCell.j].push(tmpValue);
				sectionsValues[tmpCell.section].push(tmpValue);
				return;
			}
			nbrToSkip--;
		}
	}
}