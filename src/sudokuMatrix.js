import fileEasy from './data/easy';
import fileExpert from './data/expert';
import fileIntermediate from './data/intermediate';
import csvToArray from './csvToArray';

const sudokuMatrix = (level) => {
    let file ;
    level === 'Easy'  ? file = fileEasy : level === 'Intermediate'  ? file =fileIntermediate : file = fileExpert;
    const n = Math.floor(Math.random() * 3);
    const sudokuArr = csvToArray(file);
    const sudokuObj = sudokuArr[n];
    const puzzleMatrix = sudokuObj.Puzzle.split("");
    const solutionMatrix = sudokuObj.Solution.split("");
    const pMatrix = [] , sMatrix = [] ; 
    while (puzzleMatrix.length) pMatrix.push(puzzleMatrix.splice(0, 9));
    while (solutionMatrix.length) sMatrix.push(solutionMatrix.splice(0, 9));
    
    return [pMatrix,sMatrix];
}

export default sudokuMatrix ; 