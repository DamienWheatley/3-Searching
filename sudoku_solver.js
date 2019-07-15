let testBoard = '026000003000000000700048060070001000040205009200080057508000000000000020000010540'

function parseBoard(board){
    let parsedBoard = [];
    for(i = 0; i < 9; i++){ //iterate through 9 times (assuming its a 9x9 sudoku), once for each row.
        let stagingArray = [];
        stagingArray.push(board.substring(0,9)); //push the first 9 characters to a staging array for temporary storage
        board = board.substring(9,board.length); //remove those 9 characters from the inputted board
        parsedBoard.push(stagingArray[0].split("").map(function(item){ //push the individual characters to the "parsedBoard" 
            return +item; // change it to a number first though!!!
        }));
    };
    return parsedBoard;
};

function saveEmptyPositions(parsedBoard){
    let emptyPositions = [];

    for(i = 0; i < parsedBoard.length; i++){ //iterate through the "rows"
        for(j = 0; j < parsedBoard[i].length; j++){ //iterate through the "columns" for each "row"
            if(parsedBoard[i][j] === 0){ // it the value = 0;
                emptyPositions.push([i,j]); //push the row/column location to the empty positions array.
            };
        };
    };
    return emptyPositions;
};

function checkRowForMatchingValues(board,row,value){
    for(i=0; i < board[row].length; i++){ // iterates through all rows
        if(board[row][i] === value){ //iterates through each column in the row and checks the value.
            return false; //false if there is a match.
        };
    };
    return true; 
}

function checkColumnForMatchingValues(board,column,value){
    for(i=0; i < board.length; i++){ // iterates through all rows
        if(board[i][column] === value){ //iterates through each column in the row and checks the value.
            return false; //false if there is a match.
        };
    };
    return true; 
}

function check3x3Square(board,column,row,value){
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

function checkValue(board,column,row,value){
    if(checkRowForMatchingValues(board,row,value) &&
        checkColumnForMatchingValues(board,column,value) &&
        check3x3Square(board,column,row,value)){
            return true;
    } else {
        return false;
    };
};

function solvePuzzle(parsedBoard,emptyPositions){
    let limit = 9;
    let i, row, column, value, found;
    
    for(i = 0; i < emptyPositions.length;){
        row = emptyPositions[i][0];
        column = emptyPositions[i][1];

        value = parsedBoard[row][column] + 1;
        found = false;

        while(!found && value <= limit){
            if(checkValue(parsedBoard,column,row,value)){
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
        row.join();
    });

    return parsedBoard;
};

function solveSudoku(board) {
    let parsedBoard = parseBoard(board);
    let emptyPositions = saveEmptyPositions(parsedBoard);
  
    return solvePuzzle(parsedBoard, emptyPositions);
};

console.log(solveSudoku(testBoard));