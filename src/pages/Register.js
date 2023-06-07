import React, { useState } from 'react';
import "../styles/Register.css";
import axios from 'axios';
import services from '../utils/services';
import validator from '../utils/validator';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  
  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validator.isEmail(form.email)) {
      console.log("email bad")
    } else {
      console.log("email good");
      services.postRegister(form.email, form.password);
    }
    axios.post('http://localhost:8000/user/register', form)
      .then(({ data }) => {
        console.log(data);
      })
      .catch(({ response }) => {
        console.log(response);
      });
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value
    }));
  }

  return (
    <div>
      <div className='main'>
        <section className='signup'>
            <div className='container-sign'>
                <div className='signup-content'>
                    <form id="signup-form" className='signup-form'>
                        <h2 className='form-title'>Crear Cuenta</h2>
                        <div className="form-group">
                            <input type="text" className='form-input' name="name" id="name" placeholder="Nombre"/>
                        </div>
                        <div className="form-group">
                            <input type="password" className='form-input' name="password" id="password" placeholder="Contraseña"/>
                        </div>
                        <div>
                            <input type="password" className='form-input' name="re_password" id="re_password" placeholder="Confirmar Contraseña"/>
                        </div>
                        <div className="form-group">
                            <input type="submit" name="submit" id="submit" className="form-submit" value="Crear Cuenta" onClick={handleRegister}/>
                        </div>
                    </form>
                    <p className='loginhere'>
                        ¿Ya tienes una cuenta? <a href="/InicioSesion" className='loginhere-link'>Inicia Sesión</a>
                    </p>
                </div>
            </div>
        </section>
      </div>
      <footer>
        <p>&copy; Kenneth Reyes / Franklin Rodriguez</p>
      </footer>
    </div>
    
  );
}

export default RegisterPage;