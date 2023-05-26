import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginContainer from "../pages/login";
import DashboardContainer from "../pages/dashboard"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/InicioSesion" element={<LoginContainer/>}/>
        <Route path="/Dashboard" element={<DashboardContainer/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
