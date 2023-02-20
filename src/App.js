import sudokuMatrix from "./sudokuMatrix";
import { useState } from "react";

let [initPuzzleMatrix, initSolutionMatrix] = sudokuMatrix();

function App() {
  const [matrix, setMatrix] = useState(getDeepCopy(initPuzzleMatrix));
  const [checkMatrix, setCheckMatrix] = useState([[]]);
  const [toggleCheck, setToggleCheck] = useState(false);

  function getDeepCopy(arr) {
    return JSON.parse(JSON.stringify(arr));
  }

  const onChangeInput = (e, row, col) => {
    let val = parseInt(e.target.value) || ".",
      grid = getDeepCopy(matrix);
    if ((val >= 1 && val <= 9) || val === ".") {
      grid[row][col] = val;
    }
    setMatrix(grid);
  };

  const handleSolve = () => {
    setToggleCheck(false);
    setMatrix(initSolutionMatrix);
  };
  const handleClear = () => {
    setToggleCheck(false);
    setMatrix(initPuzzleMatrix);
  };
  const handleCheck = () => {
    setToggleCheck(!toggleCheck);
    let cMatrix = [];
    for (let i = 0; i < 9; i++) {
      cMatrix[i] = [];
      for (let j = 0; j < 9; j++) {
        if (initPuzzleMatrix[i][j] === ".") {
          if (parseInt(matrix[i][j]) === parseInt(initSolutionMatrix[i][j])) {
            cMatrix[i][j] = true;
          } else {
            cMatrix[i][j] = false;
          }
        }
      }
    }
    setCheckMatrix(cMatrix);
  };

  const handleNewGame = () => {
    setToggleCheck(false);
    [initPuzzleMatrix, initSolutionMatrix] = sudokuMatrix(handleLevel);
    handleClear();
  };

  const handleLevel = (e) => {
    [initPuzzleMatrix, initSolutionMatrix] = sudokuMatrix(e.target.innerText);
    handleClear();
  };

  return (
    <div className="App">
      <div className="gameHeader">
        <h2>Sudoku Game</h2>
      </div>
      <div className="gameBoard">
        <table>
          <tbody>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((row, rIndex) => (
              <tr className={(row + 1) % 3 === 0 ? "bBorder" : ""} key={rIndex}>
                {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((col, cIndex) => (
                  <td
                    className={(col + 1) % 3 === 0 ? "rBorder" : ""}
                    key={rIndex + cIndex}
                  >
                    {toggleCheck && (
                      <input
                        type="text"
                        className={
                          !checkMatrix[row][col]
                            ? initPuzzleMatrix[row][col] !== "."
                              ? "inputCase emptyCase"
                              : "inputCase wrong"
                            : "inputCase correct"
                        }
                        value={matrix[row][col] === "." ? "" : matrix[row][col]}
                        disabled={initPuzzleMatrix[row][col] !== "."}
                        onChange={(e) => onChangeInput(e, row, col)}
                      />
                    )}
                    {!toggleCheck && (
                      <input
                        type="text"
                        className={
                          matrix[row][col] === "."
                            ? "inputCase emptyCase"
                            : "inputCase"
                        }
                        value={matrix[row][col] === "." ? "" : matrix[row][col]}
                        disabled={initPuzzleMatrix[row][col] !== "."}
                        onChange={(e) => onChangeInput(e, row, col)}
                      />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="controlMenu">
        <button className="solveBtn" onClick={handleSolve}>
          Solve
        </button>
        <button className="checkBtn" onClick={handleCheck}>
          Check
        </button>
        <button className="clearBtn" onClick={handleClear}>
          Clear
        </button>
      </div>
      <button className="newGameBtn" onClick={handleNewGame}>
        New{" "}
      </button>
      <div className="levelMenu">
        <span>Levels : </span>
        <button className="levelBtn" onClick={(e) => handleLevel(e)}>
          Easy
        </button>
        <button className="levelBtn" onClick={(e) => handleLevel(e)}>
          Intermediate
        </button>
        <button className="levelBtn" onClick={(e) => handleLevel(e)}>
          Expert
        </button>
      </div>
    </div>
  );
}

export default App;
