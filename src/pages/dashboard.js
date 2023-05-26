import React, { Component } from 'react';
import '../styles/dashboard.css';

class Dashboard extends Component {
  render(){
  return (
    <div>
      <header>
        <h1>trollo</h1>
      </header>
      <div className="body.dashboard">
      <div id="board">
        <div className="list.dashboard" id="Pendiente">
          <h2>Pendiente</h2>
        </div>
        <div className="list.dashboard" id="En progreso">
          <h2>En progreso</h2>
        </div>
        <div className="list.dashboard" id="Completado">
          <h2>Completado</h2>
        </div>
      </div></div>

      <footer>
        <p>&copy; Kenneth Reyes/Franklin Rodriguez</p>
      </footer>
    </div>
  )};
};

export default Dashboard;
