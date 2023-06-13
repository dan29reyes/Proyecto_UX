
import React, { useState } from 'react';
import '../styles/Home.css';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


const HomePage = () => {
  const navigate = useNavigate();

    const handleLogin = (e) => {
    e.preventDefault();
    navigate("/InicioSesion");
    }
    const handleRegister = (e) => {
    e.preventDefault();
    navigate("/Registro");
    }
    
    
  

  return (
    <div>
      <h1>Home Page</h1>
      
      <footer>
            <p>&copy; Kenneth Reyes / Franklin Rodriguez</p>
          </footer>
    </div>
    
  );
};

export default HomePage;
