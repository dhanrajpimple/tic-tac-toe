import { useState } from 'react';
import './Card.css';
import ResetButton from './ResetButton';

const Card = () => {
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);
  const [winner, setWinner] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [data, setData] = useState(Array(9).fill(''));

  const toggle = (num) => {
    if (lock || winner || data[num] !== '') {
      return;
    }

    const newData = [...data];
    newData[num] = currentPlayer;
    setData(newData);
    setCount((prevCount) => prevCount + 1);

    setCurrentPlayer((prevPlayer) => (prevPlayer === 'X' ? 'O' : 'X'));

    const result = calculateWinner(newData);
    if (result) {
      setWinner(result);
      setLock(true);
    }
  };

  const resetGame = () => {
    setData(Array(9).fill(''));
    setCount(0);
    setLock(false);
    setWinner(null);
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
    return isBoardFull() && !winner;
  };

  return (
    <div className='container'>
      <h2>{`Current Player's Turn: ${currentPlayer}`}</h2>
      <div className='board'>
        <div className='row1'>
          <div className='box' onClick={() => toggle(0)}>{data[0]}</div>
          <div className='box' onClick={() => toggle(1)}>{data[1]}</div>
          <div className='box' onClick={() => toggle(2)}>{data[2]}</div>
        </div>
        <div className='row2'>
          <div className='box' onClick={() => toggle(3)}>{data[3]}</div>
          <div className='box' onClick={() => toggle(4)}>{data[4]}</div>
          <div className='box' onClick={() => toggle(5)}>{data[5]}</div>
        </div>
        <div className='row3'>
          <div className='box' onClick={() => toggle(6)}>{data[6]}</div>
          <div className='box' onClick={() => toggle(7)}>{data[7]}</div>
          <div className='box' onClick={() => toggle(8)}>{data[8]}</div>
        </div>
      </div>
      <ResetButton onClick={resetGame} />
      {winner && <h2 className='winner'>Winner: {winner}</h2>}
      {checkGameOver() && <h1 className='game-over'>Game Over - No one wins!</h1>}
    </div>
  );
};

export default Card;
