const Chai = require('chai');
const expect = Chai.expect;
const solver = require('../sudoku_exports');

describe('Sudoku Solver', function(){
    let board = '090000006000960485000581000004000000517200900602000370100804020706000810300090000';
    let parsedBoard = [];

    describe('parseBoard check', function (){
        it('should parse a sudoku board into a 2D array', function(){
            parsedBoard = solver.parseBoard(board);
            
            let expectedBoard = [
                [ 0 , 9 , 0 , 0 , 0 , 0 , 0 , 0 , 6 ],
                [ 0 , 0 , 0 , 9 , 6 , 0 , 4 , 8 , 5 ],
                [ 0 , 0 , 0 , 5 , 8 , 1 , 0 , 0 , 0 ],
                [ 0 , 0 , 4 , 0 , 0 , 0 , 0 , 0 , 0 ],
                [ 5 , 1 , 7 , 2 , 0 , 0 , 9 , 0 , 0 ],
                [ 6 , 0 , 2 , 0 , 0 , 0 , 3 , 7 , 0 ],
                [ 1 , 0 , 0 , 8 , 0 , 4 , 0 , 2 , 0 ],
                [ 7 , 0 , 6 , 0 , 0 , 0 , 8 , 1 , 0 ],
                [ 3 , 0 , 0 , 0 , 9 , 0 , 0 , 0 , 0 ]
            ];

            expect(parsedBoard.length).to.equal(9);
            expect(parsedBoard[0].length).to.equal(9);
            expect(parsedBoard).to.eql(expectedBoard);
        });
    });
    
    let expectedPositions = [ 
        [ 0, 0 ],[ 0, 2 ],[ 0, 3 ],[ 0, 4 ],[ 0, 5 ],[ 0, 6 ],[ 0, 7 ],[ 1, 0 ],[ 1, 1 ],
        [ 1, 2 ],[ 1, 5 ],[ 2, 0 ],[ 2, 1 ],[ 2, 2 ],[ 2, 6 ],[ 2, 7 ],[ 2, 8 ],[ 3, 0 ],
        [ 3, 1 ],[ 3, 3 ],[ 3, 4 ],[ 3, 5 ],[ 3, 6 ],[ 3, 7 ],[ 3, 8 ],[ 4, 4 ],[ 4, 5 ],
        [ 4, 7 ],[ 4, 8 ],[ 5, 1 ],[ 5, 3 ],[ 5, 4 ],[ 5, 5 ],[ 5, 8 ],[ 6, 1 ],[ 6, 2 ],
        [ 6, 4 ],[ 6, 6 ],[ 6, 8 ],[ 7, 1 ],[ 7, 3 ],[ 7, 4 ],[ 7, 5 ],[ 7, 8 ],[ 8, 1 ],
        [ 8, 2 ],[ 8, 3 ],[ 8, 5 ],[ 8, 6 ],[ 8, 7 ],[ 8, 8 ] 
    ];

    describe('saveEmptyPositions check', function(){
        it('should push all empty positions to an array', function(){
            let emptyPositions = [];
            emptyPositions = solver.saveEmptyPositions(parsedBoard);

            expect(emptyPositions.length).to.equal(51);
            expect(emptyPositions).to.eql(expectedPositions);
        });
    });

    describe('valueInRowIsValid check', function(){
        it('should check that each value in the row does not equal the input', function(){
            expect(solver.valueInRowIsValid(parsedBoard,0,2)).to.be.ok;
            expect(solver.valueInRowIsValid(parsedBoard,0,9)).to.not.be.ok;
        });
    });

    describe('valueInColumnIsValid check', function(){
        it('should check that each value in the column does not equal the input', function(){
            expect(solver.valueInColumnIsValid(parsedBoard,0,9)).to.be.ok;
            expect(solver.valueInColumnIsValid(parsedBoard,0,5)).to.not.be.ok;
        });
    });

    describe('valueIn3x3SquareIsValid check', function(){
        it('should check that each value in the 3 x 3 square does not equal the input', function(){
            expect(solver.valueIn3x3SquareIsValid(parsedBoard,2,2,1)).to.be.ok;
            expect(solver.valueIn3x3SquareIsValid(parsedBoard,7,7,9)).to.be.ok;
            expect(solver.valueIn3x3SquareIsValid(parsedBoard,8,1,3)).to.be.ok;

            expect(solver.valueIn3x3SquareIsValid(parsedBoard,2,2,9)).to.not.be.ok;
            expect(solver.valueIn3x3SquareIsValid(parsedBoard,7,7,1)).to.not.be.ok;
            expect(solver.valueIn3x3SquareIsValid(parsedBoard,7,7,8)).to.not.be.ok;
        });
    });

    describe('checkValidityOfValue check', function(){
        it('should check whether a value is valid for a particular position', function(){
            expect(solver.checkValidityOfValue(parsedBoard,0,0,2)).to.be.ok;
            expect(solver.checkValidityOfValue(parsedBoard,8,8,4)).to.be.ok;

            expect(solver.checkValidityOfValue(parsedBoard,8,8,9)).to.not.be.ok;
            expect(solver.checkValidityOfValue(parsedBoard,0,0,1)).to.not.be.ok;
        });
    });

    var expectedSolution = [[ 8 , 9 , 5 , 7 , 4 , 2 , 1 , 3 , 6 ],
                            [ 2 , 7 , 1 , 9 , 6 , 3 , 4 , 8 , 5 ],
                            [ 4 , 6 , 3 , 5 , 8 , 1 , 7 , 9 , 2 ],
                            [ 9 , 3 , 4 , 6 , 1 , 7 , 2 , 5 , 8 ],
                            [ 5 , 1 , 7 , 2 , 3 , 8 , 9 , 6 , 4 ],
                            [ 6 , 8 , 2 , 4 , 5 , 9 , 3 , 7 , 1 ],
                            [ 1 , 5 , 9 , 8 , 7 , 4 , 6 , 2 , 3 ],
                            [ 7 , 4 , 6 , 3 , 2 , 5 , 8 , 1 , 9 ],
                            [ 3 , 2 , 8 , 1 , 9 , 6 , 5 , 4 , 7 ]];

    //describe('')

    describe('solvePuzzle check', function() {
        it('should find a solution to the puzzle passed in', function() {
            let parsedBoard = solver.parseBoard(board);
            let emptyPositions = solver.saveEmptyPositions(parsedBoard);
            let solution = solver.solvePuzzle(parsedBoard, emptyPositions);

            expect(solution).to.eql(expectedSolution);
        });
    });

    describe('solveSudoku check', function() {
        it('should find a solution to the puzzle string passed in', function() {
          let solution = solver.solveSudoku(board);
      
          expect(solution).to.eql(expectedSolution);
        });
      });
});