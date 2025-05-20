import { useState } from "react";
import './App.css'
function App() {
   const [turn,setTurn]=useState('X');
   const [arr,setarr] = useState(Array(3).fill(null).map(() => Array(3).fill(-1)));
   const [winner,setwinner]=useState('0');
   
   const check = (i, j, board = arr) => {
    const val = board[i][j];
    let count = 0;

    // Check column
    for (let it = 0; it < 3; it++) {
      if (board[it][j] === val) count++;
    }
    if (count === 3) return true;

    // Check row
    count = 0;
    for (let it = 0; it < 3; it++) {
      if (board[i][it] === val) count++;
    }
    if (count === 3) return true;

    // Check diagonal
    if (i === j) {
      count = 0;
      for (let it = 0; it < 3; it++) {
        if (board[it][it] === val) count++;
      }
      if (count === 3) return true;
    }

    // Check anti-diagonal
    if (i + j === 2) {
      count = 0;
      for (let it = 0; it < 3; it++) {
        if (board[it][2 - it] === val) count++;
      }
      if (count === 3) return true;
    }

    return false;
  };

   const HandleClick=(i,j)=>{
    if(arr[i][j]!=-1){
      return;
    }
    const newBoard = arr.map(row => [...row]);
    newBoard[i][j] = turn;
    setarr(newBoard);
     if(check(i,j,newBoard)==1){
       console.log("Game Finishes");
       setwinner(1);
      //  alert(`Game Finishes with ${turn} Wins`);
       setarr(Array(3).fill(null).map(() => Array(3).fill(-1)));
        setTurn('X');
      }
      else{
          setTurn(turn === 'X' ? 'O' : 'X');
      } 
   }
  return (
   <div>
    <h1 className={`${winner==1?"loose":""}`}>Tic Tac Toe</h1>
    <p className={winner==1?"win":"loose"}>Game Finishes with Player {turn} as Winner</p>
     <table className={`ttt-table ${winner==1?"loose":""}`}>
        <tbody>
          {[0, 1, 2].map((row) => (
            <tr key={row}>
              {[0, 1, 2].map((col) => (
                <td key={col} className="cell" onClick={() => HandleClick(row,col)} >{arr[row][col]==-1?"":arr[row][col]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
<p className={`turner ${winner==1?"loose ":""}`}>turn:{turn}</p>
   </div>
  )
}

export default App
