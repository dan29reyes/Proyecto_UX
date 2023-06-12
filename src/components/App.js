import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginContainer from "../pages/login";
import ProjectContainer from "../pages/Project";
import BoardContainer from "../pages/Boards";
import RegisterContainer from "../pages/Register";
import OlvidePasswordPage from '../pages/OlvidePass';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginContainer/>} Redirect to="/InicioSesion"/>
        <Route path="/InicioSesion" element={<LoginContainer/>}/>
        <Route path="/Proyecto" element={<ProjectContainer/>}/>
        <Route path="/Tablero" element={<BoardContainer/>}/>
        <Route path="/Registro" element={<RegisterContainer/>}/>
        <Route path="/Olvide" element={<OlvidePasswordPage/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
