import React from 'react';
import './Card.css';
const ResetButton = ({ onClick }) => {
  return <button className='reset' onClick={onClick}>Reset</button>;
};

export default ResetButton;
