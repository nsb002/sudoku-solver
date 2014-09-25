# sudoku-solver #
### What is this? ###
* Well, this is a simple sudoku solver in JavaScript that I created from scratch

### How does this work? ###
* You just have to enter the numbers and hit `Solve Grid`
    * Here's a live version: [Sudoku Solver](http://nsb002.github.io/sudoku-solver/)!!!
        * P.S. This is hosted on [GitHub Pages](https://pages.github.com/)

### Why use that? ###
* Because it's a web-based app!
    * It can be added to your phone's home page
    * It doesn't need an internet connection once "installed"

### Is this fun? ###
* To have some fun, try to solve the [World's hardest sudoku](http://www.telegraph.co.uk/science/science-news/9359579/Worlds-hardest-sudoku-can-you-crack-it.html)
    * For the lazy ones:
        * Open up a JavaScript console in your browser, paste that and hit `Solve Grid`

        ```javascript
grid = [[{"value":8,"possibilities":[8],"i":0,"j":0,"section":0,"error":false},{"value":null,"possibilities":[1,2,3,4,5,6,7,8,9],"i":0,"j":1,"section":0,"error":false},{"value":null,"possibilities":[1,2,3,4,5,6,7,8,9],"i":0,"j":2,"section":0,"error":false},{"value":null,"possibilities":[1,2,3,4,5,6,7,8,9],"i":0,"j":3,"section":1,"error":false},{"value":null,"possibilities":[1,2,3,4,5,6,7,8,9],"i":0,"j":4,"section":1,"error":false},{"value":null,"possibilities":[1,2,3,4,5,6,7,8,9],"i":0,"j":5,"section":1,"error":false},{"value":null,"possibilities":[1,2,3,4,5,6,7,8,9],"i":0,"j":6,"section":2,"error":false},{"value":null,"possibilities":[1,2,3,4,5,6,7,8,9],"i":0,"j":7,"section":2,"error":false},{"value":null,"possibilities":[1,2,3,4,5,6,7,8,9],"i":0,"j":8,"section":2,"error":false}],[{"value":null,"possibilities":[1,2,3,4,5,6,7,8,9],"i":1,"j":0,"section":0,"error":false},{"value":null,"possibilities":[1,2,3,4,5,6,7,8,9],"i":1,"j":1,"section":0,"error":false},{"value":3,"possibilities":[3],"i":1,"j":2,"section":0,"error":false},{"value":6,"possibilities":[6],"i":1,"j":3,"section":1,"error":false},{"value":null,"possibilities":[1,2,3,4,5,6,7,8,9],"i":1,"j":4,"section":1,"error":false},{"value":null,"possibilities":[1,2,3,4,5,6,7,8,9],"i":1,"j":5,"section":1,"error":false},{"value":null,"possibilities":[1,2,3,4,5,6,7,8,9],"i":1,"j":6,"section":2,"error":false},{"value":null,"possibilities":[1,2,3,4,5,6,7,8,9],"i":1,"j":7,"section":2,"error":false},{"value":null,"possibilities":[1,2,3,4,5,6,7,8,9],"i":1,"j":8,"section":2,"error":false}],[{"value":null,"possibilities":[1,2,3,4,5,6,7,8,9],"i":2,"j":0,"section":0,"error":false},{"value":7,"possibilities":[7],"i":2,"j":1,"section":0,"error":false},{"value":null,"possibilities":[1,2,3,4,5,6,7,8,9],"i":2,"j":2,"section":0,"error":false},{"value":null,"possibilities":[1,2,3,4,5,6,7,8,9],"i":2,"j":3,"section":1,"error":false},{"value":9,"possibilities":[9],"i":2,"j":4,"section":1,"error":false},{"value":null,"possibilities":[1,2,3,4,5,6,7,8,9],"i":2,"j":5,"section":1,"error":false},{"value":2,"possibilities":[2],"i":2,"j":6,"section":2,"error":false},{"value":null,"possibilities":[1,2,3,4,5,6,7,8,9],"i":2,"j":7,"section":2,"error":false},{"value":null,"possibilities":[1,2,3,4,5,6,7,8,9],"i":2,"j":8,"section":2,"error":false}],[{"value":null,"possibilities":[1,2,3,4,5,6,7,8,9],"i":3,"j":0,"section":3,"error":false},{"value":5,"possibilities":[5],"i":3,"j":1,"section":3,"error":false},{"value":null,"possibilities":[1,2,3,4,5,6,7,8,9],"i":3,"j":2,"section":3,"error":false},{"value":null,"possibilities":[1,2,3,4,5,6,7,8,9],"i":3,"j":3,"section":4,"error":false},{"value":null,"possibilities":[1,2,3,4,5,6,7,8,9],"i":3,"j":4,"section":4,"error":false},{"value":7,"possibilities":[7],"i":3,"j":5,"section":4,"error":false},{"value":null,"possibilities":[1,2,3,4,5,6,7,8,9],"i":3,"j":6,"section":5,"error":false},{"value":null,"possibilities":[1,2,3,4,5,6,7,8,9],"i":3,"j":7,"section":5,"error":false},{"value":null,"possibilities":[1,2,3,4,5,6,7,8,9],"i":3,"j":8,"section":5,"error":false}],[{"value":null,"possibilities":[1,2,3,4,5,6,7,8,9],"i":4,"j":0,"section":3,"error":false},{"value":null,"possibilities":[1,2,3,4,5,6,7,8,9],"i":4,"j":1,"section":3,"error":false},{"value":null,"possibilities":[1,2,3,4,5,6,7,8,9],"i":4,"j":2,"section":3,"error":false},{"value":null,"possibilities":[1,2,3,4,5,6,7,8,9],"i":4,"j":3,"section":4,"error":false},{"value":4,"possibilities":[4],"i":4,"j":4,"section":4,"error":false},{"value":5,"possibilities":[5],"i":4,"j":5,"section":4,"error":false},{"value":7,"possibilities":[7],"i":4,"j":6,"section":5,"error":false},{"value":null,"possibilities":[1,2,3,4,5,6,7,8,9],"i":4,"j":7,"section":5,"error":false},{"value":null,"possibilities":[1,2,3,4,5,6,7,8,9],"i":4,"j":8,"section":5,"error":false}],[{"value":null,"possibilities":[1,2,3,4,5,6,7,8,9],"i":5,"j":0,"section":3,"error":false},{"value":null,"possibilities":[1,2,3,4,5,6,7,8,9],"i":5,"j":1,"section":3,"error":false},{"value":null,"possibilities":[1,2,3,4,5,6,7,8,9],"i":5,"j":2,"section":3,"error":false},{"value":1,"possibilities":[1],"i":5,"j":3,"section":4,"error":false},{"value":null,"possibilities":[1,2,3,4,5,6,7,8,9],"i":5,"j":4,"section":4,"error":false},{"value":null,"possibilities":[1,2,3,4,5,6,7,8,9],"i":5,"j":5,"section":4,"error":false},{"value":null,"possibilities":[1,2,3,4,5,6,7,8,9],"i":5,"j":6,"section":5,"error":false},{"value":3,"possibilities":[3],"i":5,"j":7,"section":5,"error":false},{"value":null,"possibilities":[1,2,3,4,5,6,7,8,9],"i":5,"j":8,"section":5,"error":false}],[{"value":null,"possibilities":[1,2,3,4,5,6,7,8,9],"i":6,"j":0,"section":6,"error":false},{"value":null,"possibilities":[1,2,3,4,5,6,7,8,9],"i":6,"j":1,"section":6,"error":false},{"value":1,"possibilities":[1],"i":6,"j":2,"section":6,"error":false},{"value":null,"possibilities":[1,2,3,4,5,6,7,8,9],"i":6,"j":3,"section":7,"error":false},{"value":null,"possibilities":[1,2,3,4,5,6,7,8,9],"i":6,"j":4,"section":7,"error":false},{"value":null,"possibilities":[1,2,3,4,5,6,7,8,9],"i":6,"j":5,"section":7,"error":false},{"value":null,"possibilities":[1,2,3,4,5,6,7,8,9],"i":6,"j":6,"section":8,"error":false},{"value":6,"possibilities":[6],"i":6,"j":7,"section":8,"error":false},{"value":8,"possibilities":[8],"i":6,"j":8,"section":8,"error":false}],[{"value":null,"possibilities":[1,2,3,4,5,6,7,8,9],"i":7,"j":0,"section":6,"error":false},{"value":null,"possibilities":[1,2,3,4,5,6,7,8,9],"i":7,"j":1,"section":6,"error":false},{"value":8,"possibilities":[8],"i":7,"j":2,"section":6,"error":false},{"value":5,"possibilities":[5],"i":7,"j":3,"section":7,"error":false},{"value":null,"possibilities":[1,2,3,4,5,6,7,8,9],"i":7,"j":4,"section":7,"error":false},{"value":null,"possibilities":[1,2,3,4,5,6,7,8,9],"i":7,"j":5,"section":7,"error":false},{"value":null,"possibilities":[1,2,3,4,5,6,7,8,9],"i":7,"j":6,"section":8,"error":false},{"value":1,"possibilities":[1],"i":7,"j":7,"section":8,"error":false},{"value":null,"possibilities":[1,2,3,4,5,6,7,8,9],"i":7,"j":8,"section":8,"error":false}],[{"value":null,"possibilities":[1,2,3,4,5,6,7,8,9],"i":8,"j":0,"section":6,"error":false},{"value":9,"possibilities":[9],"i":8,"j":1,"section":6,"error":false},{"value":null,"possibilities":[1,2,3,4,5,6,7,8,9],"i":8,"j":2,"section":6,"error":false},{"value":null,"possibilities":[1,2,3,4,5,6,7,8,9],"i":8,"j":3,"section":7,"error":false},{"value":null,"possibilities":[1,2,3,4,5,6,7,8,9],"i":8,"j":4,"section":7,"error":false},{"value":null,"possibilities":[1,2,3,4,5,6,7,8,9],"i":8,"j":5,"section":7,"error":false},{"value":4,"possibilities":[4],"i":8,"j":6,"section":8,"error":false},{"value":null,"possibilities":[1,2,3,4,5,6,7,8,9],"i":8,"j":7,"section":8,"error":false},{"value":null,"possibilities":[1,2,3,4,5,6,7,8,9],"i":8,"j":8,"section":8,"error":false}]];
fillGrid();
