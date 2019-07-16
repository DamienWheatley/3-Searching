let testBoard = '090000006000960485000581000004000000517200900602000370100804020706000810300090000'

module.exports.parseBoard = function(board){
    let parsedBoard = [];
    for(i = 0; i < 9; i++){
        let throwAwayArray = [];
        throwAwayArray.push(board.substring(0,9));
        board = board.substring(9,board.length);
        parsedBoard.push(throwAwayArray[0].split("").map(function(item){
            return +item;
        }));
    };
    return parsedBoard;
};

module.exports.saveEmptyPositions = function(parsedBoard){
    let emptyPositions = [];

    for(i = 0; i < parsedBoard.length; i++){
        for(j = 0; j < parsedBoard[i].length; j++){
            if(parsedBoard[i][j] === 0){
                emptyPositions.push([i,j]);
            };
        };
    };
    return emptyPositions;
};

module.exports.valueInRowIsValid = function(board,row,value){
    for(i=0; i < board[row].length; i++){ // iterates through all rows
        if(board[row][i] === value){ //iterates through each column in the row and checks the value.
            return false; //false if there is a match.
        };
    };
    return true; 
};

module.exports.valueInColumnIsValid = function(board,column,value){
    for(i=0; i < board.length; i++){ // iterates through all rows
        if(board[i][column] === value){ //iterates through each column in the row and checks the value.
            return false; //false if there is a match.
        };
    };
    return true; 
};

module.exports.valueIn3x3SquareIsValid = function(board,column,row,value){
    let columnCorner = 0;
    let rowCorner = 0;
    let squareSize = 3;

    while(column >= columnCorner + squareSize){ //find the uppermost column e.g if column = 4 - this greater than (columnCorner = 0) + (squareSize = 3), so add squareSize to columnCorner to make it 3, 
                                                //then the next "while" loop wont run because column will no longer be more than or equal to (columnCorner = 3) + (squareSize = 3) = 6.
        columnCorner += squareSize;
    };

    while(row >= rowCorner + squareSize){ //find the uppermost row
        rowCorner += squareSize;
    };

    for(i=rowCorner; i < rowCorner + squareSize; i++){
        for(j=columnCorner; j < columnCorner + squareSize; j++){
            if(board[i][j] === value){
                return false;
            };
        };
    };
    return true;
};

module.exports.checkValidityOfValue = function(board,column,row,value){
    if(this.valueInRowIsValid(board,row,value) &&
        this.valueInColumnIsValid(board,column,value) &&
        this.valueIn3x3SquareIsValid(board,column,row,value)){
        return true;
    } else {
        return false;
    };
};

module.exports.resolveSinglePossibilityValues = function(parsedBoard,emptyPositions,singlePossibilitiesResolved){
    let row, column, value;
    singlePossibilitiesResolved.splice(0,singlePossibilitiesResolved.length); //make "singlePossibilitiesResolved.length" = 0
    for(y = 0; y < emptyPositions.length;y++){ //iterate through all emptyPositions
        let possibleValues = 0;
        row = emptyPositions[y][0]; 
        column = emptyPositions[y][1];
        value = [];

        for(x=1; x <= 9;x++){
            if(this.checkValidityOfValue(parsedBoard,column,row,x)){ //iterate through all values 1-9, if it's valid ...
                value.push(x); //... push it to "value"... 
                possibleValues++; //... and increment possible values for this emptyPosition
                if(possibleValues > 1){ // if there are more than 1 possibleValue...
                    x=10; //... set x to 10 (basically to exit this for loop)
                };
            };
        };
        if(possibleValues===1){ // if there's only 1 possible value...
            parsedBoard[row][column] = value[0]; //... write it down!
            singlePossibilitiesResolved.push(value[0]); //in effect just adding one when a single possibility is dealt with in order to exit...
            //... the containing while() loop.
        };
    };
    return parsedBoard;
};

module.exports.solvePuzzle = function(parsedBoard,emptyPositions){
    let i, row, column, value, validValueFound;
    let limit = 9;
    let singlePossibilitiesResolved = [1];

    while(singlePossibilitiesResolved.length !== 0){
        this.resolveSinglePossibilityValues(parsedBoard,emptyPositions,singlePossibilitiesResolved);
        emptyPositions = this.saveEmptyPositions(parsedBoard);
    };

    for(i = 0; i < emptyPositions.length;){
        row = emptyPositions[i][0]; //inside emptyPositions array, take emptyPositions[i] and then from inside emptyPositions[i]...
        column = emptyPositions[i][1]; //... is another array containing the row/column - or 0/1 (0 being row, 1 being column).

        value = parsedBoard[row][column] + 1; // set value as 1 more than is in the selected "cell" (gathered from row/column of "parsedBoard")
        validValueFound = false;

        while(!validValueFound && value <= limit){
            if(this.checkValidityOfValue(parsedBoard,column,row,value)){
                validValueFound = true;
                parsedBoard[row][column] = value; //set parsedBoard cell as value ...
                i++; //move to next "cell"
            } else {
                value++; //if invalid increase value and search again.
            };
        };

        if(!validValueFound){ //if validValueFound is not true ("if(!validValueFound === true)")
            parsedBoard[row][column] = 0;
            i--;
        };
    };

    parsedBoard.forEach(function(row){
        row.join(); //join each row together to print an array containing all 8 rows that contain 8 columns.
    });

    return parsedBoard;
};

module.exports.solveSudoku = function(board) {
    let parsedBoard = this.parseBoard(board);
    let emptyPositions = this.saveEmptyPositions(parsedBoard);
  
    return this.solvePuzzle(parsedBoard, emptyPositions);
};