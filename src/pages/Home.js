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
    <div className="container">
      <div className="row">
        <div className="col-md-12 text-center">
          <div class="content">
            <h2>Trollo</h2>
            <h2>Trollo</h2>
          </div>
        </div>
      </div>
    </div>
    <h2>¿Te sientes ahogado con tus proyectos? ¡Deja que Trollo los lleve a otro nivel!</h2>
    <p>Trollo te sabra con balde de agua fria </p>
  </div>
</div>

          <div className="page" id="p2">
  <div className="wrap">
    <div className="waviy">
      <span style={{ '--i': 1 }}>R</span>
      <span style={{ '--i': 2 }}>e</span>
      <span style={{ '--i': 3 }}>G</span>
      <span style={{ '--i': 4 }}>I</span>
      <span style={{ '--i': 5 }}>S</span>
      <span style={{ '--i': 6 }}>T</span>
      <span style={{ '--i': 7 }}>R</span>
      <span style={{ '--i': 8 }}>A</span>
      <span style={{ '--i': 9 }}>T</span>
      <span style={{ '--i': 10 }}>E</span>
    </div>
    <p>¿Listo para llevar tus proyectos al siguiente nivel? Regístrate en Trollo y descubre una nueva forma de organizar, colaborar y hacer realidad tus ideas. ¡Únete ahora y comienza a construir el éxito!</p>
    <div className="button-container">
      <a href="/Registro" className="register-button">Sign Up</a>
    <a href="/InicioSesion" className="login-button">Login</a>
    
   
    </div>
  </div>
</div>

<div className="page" id="p3">
  <div className="wrap">
    <h1>
      <span>About</span>
      <div class="message">
        <div class="word1">Us</div>
        <div class="word2">Nosotros</div>
        <div class="word3">Nous</div>
      </div>
    </h1>
    <p>Trello esta conformada por dos estudiantes cursantes de la carrera ingenieria en sistemas computacioneles, Franklin Rodriguez y Kenneth Reyes, siguenos en nuestro instagram para saber sobre los demas proyectos</p>
    
  </div>
  <footer>
    <a href="https://www.instagram.com/franklinrtinoco/">
      <i className="fab fa-instagram"></i>
    </a>
    <a href="https://www.instagram.com/29danireyes/">
      <i className="fab fa-instagram"></i>
    </a>
  </footer>


            
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

