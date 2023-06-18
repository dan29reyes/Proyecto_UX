import React, { useState } from 'react';
import "../styles/Home.css";

import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const HomePage = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/InicioSesion");
  };

  const handleRegister = (e) => {
    e.preventDefault();
    navigate("/Registro"); 
  };

  return (
    <div>
    <div className="home">
      <ul>
      <li><a href="Trollos">Trollo</a></li>
        <li><a href="/InicioSesion" onClick={handleLogin}>login</a></li>
        <li><a href="/Registro" onClick={handleRegister}>Register</a></li>
        <li><a href="about Us">About Us</a></li>
      </ul>
      </div>
      <section className="container">
  <div className="wave"> </div>
    </section>
      <footer>
        <p>&copy; Kenneth Reyes / Franklin Rodriguez</p>
      </footer>
    </div>
   
    
  );
};

export default HomePage;