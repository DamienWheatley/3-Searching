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

module.exports.solvePuzzle = function(parsedBoard,emptyPositions){
    let limit = 9;
    let row, column, value, found;
    
    for(i = 0; i < emptyPositions.length;){
        row = emptyPositions[i][0];
        column = emptyPositions[i][1];

        value = parsedBoard[row][column] + 1;
        found = false;

        while(!found && value <= limit){
            if(this.checkValidityOfValue(parsedBoard,column,row,value)){
                found = true;
                parsedBoard[row][column] = value;
                i++;
            } else {
                value++;
            };
        };

        if(!found){
            parsedBoard[row][column] = 0;
            i--;
        };
    };

    parsedBoard.forEach(function(row){
        console.log(row.join());
    });

    return parsedBoard;
};

module.exports.solveSudoku = function(board) {
    let parsedBoard = this.parseBoard(board);
    let emptyPositions = this.saveEmptyPositions(parsedBoard);
  
    return this.solvePuzzle(parsedBoard, emptyPositions);
};