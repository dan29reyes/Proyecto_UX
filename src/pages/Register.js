import React, { useState } from 'react';
import "../styles/Register.css";
import services from '../utils/services';
import validator from '../utils/validator';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import emailjs from 'emailjs-com';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    rePassword: ''
  });
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [userExists, setUserExists] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validator.isEmail(form.email)) {
      console.log("email bad");
    } else if (form.password !== form.rePassword) {
      setPasswordMismatch(true);
    } else {
      console.log("email good");
      const response = await services.postRegister(form.email, form.password);
      if (response.success === true) {
        console.log("user created");
        const templateParams = {
          to_email: form.email,
          message: 'Organiza, colabora y sigue el progreso de tus proyectos de manera fácil y eficiente.'
          +'Simplifica tu trabajo y mantén todo bajo control con Trollo.'
          +'\n¡Comienza a gestionar tus proyectos de forma efectiva hoy mismo!',
          to_name: form.name
        };
        emailjs.send('service_o47wivh', 'template_qgp002o', templateParams, '3COK_9QAiqVYnnt71')
          .then(() => {
            console.log('Correo de confirmación enviado con éxito');
          })
          .catch((error) => {
            console.error('Error al enviar el correo de confirmación:', error);
          });
        navigate("/InicioSesion");
      } else if (response.success === false) {
        console.log("user exists");
        setUserExists(true);
      }
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value
    }));
    console.log(form);
    setPasswordMismatch(false);
    setUserExists(false);
  }

  return (
    
    <div className='main-signup'>
<div className="context">
 
  </div>
  <div className="area">
          <ul className="circles">
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
                  <li></li>
          </ul>
  
      <section className='signup'>
        <div className='container-sign'>
          <div className='signup-content'>
            <form id="signup-form" className='signup-form'>
              <h2 className='form-title-signup'>Crear Cuenta</h2>
              <div className="form-group-register">
                <input
                  type="text"
                  className='form-input-register'
                  name="name"
                  id="name"
                  placeholder="Nombre Completo"
                  onChange={handleChange}
                />
                <input
                  type="email"
                  className='form-input-register'
                  name="email"
                  id="email"
                  placeholder="Correo electrónico"
                  onChange={handleChange}
                />
                <input
                  type="password"
                  className='form-input-register'
                  name="password"
                  id="password"
                  placeholder="Contraseña"
                  onChange={handleChange}
                />
                <input
                  type="password"
                  className='form-input-register'
                  name="rePassword"
                  id="re_password"
                  placeholder="Confirmar Contraseña"
                  onChange={handleChange}
                />
                {passwordMismatch && <div className="password-mismatch">Las contraseñas no coinciden</div>}
                {userExists && <div className="user-exists">El usuario ya existe</div>}
              </div>
              <input type="submit" name="submit" id="submit" className="form-submit-register" value="Crear Cuenta" onClick={handleRegister} />
            </form>
            <p className='loginhere'>
              ¿Ya tienes una cuenta? <a href="/InicioSesion" className='loginhere-link'>Inicia Sesión</a>
            </p>
          </div>
        </div>
      </section>
      <footer>
      <p>&copy;Kenneth Reyes / Franklin Rodriguez</p>
      </footer>
    </div>
    </div >
  );
}



export default RegisterPage;
