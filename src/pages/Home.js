import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import trollo from "../images/Trollo.jpeg";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Home.css';

const HomePage = () => {
  const navigate = useNavigate();

  const handleNavigation = (e, route) => {
    e.preventDefault();
    navigate(route);
  };

  return (
    <div className="container-fluid">
      <div className="background">
        <div className="cube"></div>
        <div className="cube"></div>
        <div className="cube"></div>
        <div className="cube"></div>
        <div className="cube"></div>
      </div>

      <header>
        <nav>
          <ul>
            <li><a href="#" onClick={(e) => handleNavigation(e, "/")}>Home</a></li>
            <li><a href="#" onClick={(e) => handleNavigation(e, "/InicioSesion")}>Login</a></li>
            <li><a href="#" onClick={(e) => handleNavigation(e, "/Registro")}>Register</a></li>
            <li><a href="#" onClick={(e) => handleNavigation(e, "/About")}>About Us</a></li>
            
          </ul>
        </nav>
        <div className="logo">
            
            <img src={trollo} width={100} alt="Login" style={{marginRight:'105px'}} />
            
          </div>
        
          
        
        

        <section className="header-content">
          <h1>Bienvenido a Trollo</h1>
          <p>Welcome to our studio. We are a passionate group of people, making high-quality products designed to make your life easier.</p>
          
        </section>
      </header>

      <section className="container">
        <div className="wave"></div>
      </section>

      
    </div>
  );
};

export default HomePage;
