import React from 'react';
import { useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Home.css';


const HomePage = () => {
  const navigate = useNavigate();

  const handleNavigation = (e, route) => {
    e.preventDefault();
    navigate(route);
  };

  return (
    <div id="t1">
      <div id="t2">
        <div id="t3">
          <div className="menu">
            <a href="#t1" className="one"><i className="fas fa-space-shuttle"></i></a>
            <a href="#t2" className="two"><i className="fas fa-terminal"></i></a>
            <a href="#t3" className="three"><i className="fab fa-slack-hash"></i></a>    
          </div>
          <div className="page" id="p1">
            <div className="wrap">
              <h2> Trollo?</h2>
              <span>Un puto plagio</span>
            </div>
          </div>
          <div className="page" id="p2">
            <div className="wrap">
              <h2> Registrate aqui! </h2>
              <p>Organiza, colabora y sigue el progreso de tus proyectos de manera fácil y eficiente.</p>
              
            </div>
          </div>
          <div className="page" id="p3">
            <div className="wrap">
              <h2> ABout us</h2>
              <p>somos unos virgos que por aburrimiento tuvimos ganas de joder el bote</p>
              <span> Siguenos para saber mas sobre nuestros proyectos</span>
          
              <footer>
                <a href="https://www.instagram.com/franklinrtinoco/"><i className="fab fa-instagram"></i></a>
                <a href="https://www.instagram.com/29danireyes/"><i className="fab fa-instagram"></i></a>  
              </footer>
            </div> 
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
