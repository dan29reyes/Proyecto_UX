import React from 'react';
import '../styles/Boards.css';
import BoardList from '../components/BoardList';

const Boards = () => {
  return (
    <div className='tablero-container'>
      <header>
        <h1>TROLLO</h1>
      </header>
      <div id="board">
        <BoardList></BoardList>
      </div>
      <footer>
        <p>&copy; Kenneth Reyes / Franklin Rodriguez</p>
      </footer>
    </div>
  );
};

export default Boards;