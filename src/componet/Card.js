import React, { useState } from 'react';
import './Card.css';
import ResetButton from './ResetButton';
let data = ['', '', '', '', '', '', '', '', ''];

const Card = () => {
  let [count, setCount] = useState(0);
  let [lock, setLock] = useState(false);
  let [winner, setWinner] = useState(null);

  const toggle = (e, num) => {
    if (lock || winner) {
      return;
    }
    if (count % 2 === 0) {
      e.target.innerHTML = 'X';
      data[num] = 'X';
      setCount(++count);
    } else {
      e.target.innerHTML = 'O';
      data[num] = 'O';
      setCount(++count);
    }

    // Check for a winner
    const result = calculateWinner(data);
    if (result) {
      setWinner(result);
      setLock(true);
    }
  };

  const resetGame = () => {
    data = ['', '', '', '', '', '', '', '', ''];
    setCount(0);
    setLock(false);
    setWinner(null);

    // Reset the innerHTML of all boxes
    const boxes = document.querySelectorAll('.box');
    boxes.forEach((box) => (box.innerHTML = ''));
  };

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  const isBoardFull = () => {
    return data.every((value) => value !== '');
  };

  const checkGameOver = () => {
    if (isBoardFull() && !winner) {
      
      return true;
    }
    
    return false;
  };
  return (
    <div className='container'>
       {winner && <h2 className='winner'>Winner: {winner}</h2>}
      {checkGameOver() && <h1 className='game-over'>Game Over - No one wins!</h1>}
      <div className='board'>
        <div className='row1'>
          <div className='box' onClick={(e) => toggle(e, 0)}></div>
          <div className='box' onClick={(e) => toggle(e, 1)}></div>
          <div className='box' onClick={(e) => toggle(e, 2)}></div>
        </div>
        <div className='row2'>
          <div className='box' onClick={(e) => toggle(e, 3)}></div>
          <div className='box' onClick={(e) => toggle(e, 4)}></div>
          <div className='box' onClick={(e) => toggle(e, 5)}></div>
        </div>
        <div className='row3'>
          <div className='box' onClick={(e) => toggle(e, 6)}></div>
          <div className='box' onClick={(e) => toggle(e, 7)}></div>
          <div className='box' onClick={(e) => toggle(e, 8)}></div>
        </div>
      </div>
      <ResetButton onClick={resetGame} />
    </div>
  );
};

export default Card;
