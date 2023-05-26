import React from 'react';
import '../styles/dashboard.css';
import CardList from '../components/CardList';

const Dashboard = () => {
  return (
    <div>
      <header>
        <h1>trollo</h1>
      </header>
      <div className="body.dashboard">
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

export default Dashboard;
