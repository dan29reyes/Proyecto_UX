import React, { useEffect, useState } from 'react';
import '../styles/OlvidePass.css';
import services from '../utils/services';
import validator from '../utils/validator';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import emailjs from 'emailjs-com';

const OlvidePasswordPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
  });
  const [generado, setGenerado] = useState(false);
  const [form2, setForm2] = useState({
    code: '',
    password: '',
    rePassword: '',
  });
  const [emailSent, setEmailSent] = useState(false);
  const [codigo, setCodigo] = useState('')

  useEffect(() => {
    generateCode();
  }, []);

  const generateCode = () => {
    if (generado === false){
      const length = 8;
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let code = 'T-';
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        code += characters.charAt(randomIndex);
      }
      setCodigo(code);
      setGenerado(true);
    }
  }

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    if (!validator.isEmail(form.email)) {
      alert("email bad");
    } else {
      try {
        setEmailSent(true);
        const templateParams = {
          to_email: form.email,
          message: 'Ingresa el siguiente codigo para cambiar tu contraseña: ' +
           codigo + '\nSi no solicitaste un cambio de contraseña, ignora este correo.',
        };
        emailjs.send('service_o47wivh', 'template_qgp002o', templateParams, '3COK_9QAiqVYnnt71')
          .then(() => {
            alert("Revisa tu correo para cambiar tu contraseña");
          })
          .catch((error) => {
            alert('Error al enviar el correo de recuperacion:', error);
          });
      } catch (error) {
        if (error.response && error.response.status === 401) {
          alert("Email not found");
        } else {
          alert("An error occurred:", error);
        }
      }
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    console.log(codigo, form2.code)
    if(form2.code !== codigo){
      alert("Codigo de verificacion incorrecto");
    }else{
      if (form2.password !== form2.rePassword) {
        alert("La contraseña no coincide");
      } else {
        try {
          const response = await services.postOlvidePass(form.email, form2.password);
          navigate("/InicioSesion");
          alert("Contraseña cambiada con exito");
        } catch (error) {
          if (error.response && error.response.status === 401) {
            alert("Invalid code");
          }
        }
      }
    }
  };

  const form2Change = (e) => {
    const { name, value } = e.target;
    setForm2((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className="reset-container">
      <div className="background">
        { !emailSent ? (
        <form onSubmit={handlePasswordReset}>
          <h1 style={{color:'white'}}>Recuperar Contraseña</h1>
          <p style={{color:'white'}}>Ingrese su correo electrónico y le enviaremos un codigo para restablecer su contraseña.</p>
          <input
            type="email"
            id="email"
            name="email"
            className="input-field"
            placeholder='Email'
            onChange={handleChange}
          />
          <button 
            type="submit" 
            className="reset-button"
            onClick={handlePasswordReset}
          >
            Restablecer Contraseña
          </button>
        </form>
        ) : (
          <form onSubmit={handlePasswordReset}>
            <h1 style={{color:'white'}}>Recuperar Contraseña</h1>
            <p style={{color:'white'}}>Ingrese el codigo enviado al correo y la nueva contraseña</p>
            <input
              type="text"
              id="code"
              name="code"
              className="input-field"
              placeholder='Codigo'
              onChange={form2Change}
            />
            <input
              type="text"
              id="password"
              name="password"
              className="input-field"
              placeholder='Nueva Contraseña'
              onChange={form2Change}
            />
            <input
              type="text"
              id="rePassword"
              name="rePassword"
              className="input-field"
              placeholder='Confirmar Contraseña'
              onChange={form2Change}
            />
            <button
              type="submit"
              className="reset-button"
              onClick={handlePasswordChange}
            >Restablecer contraseña</button>
          </form>
        )}
      </div>
      <footer>
        <p>&copy; Kenneth Reyes / Franklin Rodriguez</p>
      </footer>
    </div>
  )
}

export default OlvidePasswordPage;
