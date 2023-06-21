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
                    <h3 className="animate-charcter">Trollo</h3>
                  </div>
                </div>
              </div>
              <h2> Tu pagina de confianza para llevar tus proyectos a otro nivel</h2>
              <span>Trello? ¿Qué es eso? ¡Aquí puro pinche Trollo!</span>
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
    <p>Organiza, colabora y sigue el progreso de tus proyectos de manera fácil y eficiente.</p>
    
    <div className="button-container">



    </div>
  </div>
</div>

          <div className="page" id="p3">
            <div className="wrap">
              <h2> ABout us</h2>
              <p>Somos unos virgos que por aburrimiento tuvimos ganas de joder el bote.</p>
              <span> Siguenos para saber más sobre nuestros proyectos</span>
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
    </div>
  );
};

export default HomePage;
