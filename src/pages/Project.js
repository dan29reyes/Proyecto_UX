import React from 'react';
import '../styles/Project.css';
import CardList from '../components/List';

const Project = () => {
  return (
    <div className='page-container'>
      <header>
        <h1>TROLLO</h1>
      </header>
      <div>
        <div id="board">
          <CardList></CardList>
        </div>
      </div>

      <footer>
        <p>&copy; Kenneth Reyes/Franklin Rodriguez</p>
      </footer>
    </div>
  );
};

export default Project;
