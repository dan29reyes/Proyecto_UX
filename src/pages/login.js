import React, { useState } from 'react';
import '../styles/login.css';
import logImg from "../images/login_user.png";
import userIcon from "../images/usericon.png";
import passIcon from "../images/keyicon.png";
import axios from 'axios';
import services from '../utils/services';
import validator from '../utils/validator';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validator.isEmail(form.email)) {
      console.log("email bad");
    } else {
      try {
        const response = await services.postLogin(form.email, form.password);
        localStorage.setItem("accesstoken", response.data.accesstoken);
        localStorage.setItem("refreshToken", response.data.refreshToken);
        localStorage.setItem("id_user", response.data.id_user);
        navigate("/Tablero");
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.log("Invalid credentials");
        } else {
          console.log("An error occurred:", error);
        }
      }
    }
  };
  
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

  const handleOlvidePass = async (e) => {
    e.preventDefault();
    if (!validator.isEmail(form.email)) {
      console.log("Invalid email");
    } else {
      try {
        const response = await services.postOlvidePass(form.email);
        console.log(response);
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }
  }








  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value
    }));
  }

  return (
   
      <div className="container-fluid"> 
      
      <div className="background">
            <div className="cube"></div>
            <div className="cube"></div>
            <div className="cube"></div>
            <div className="cube"></div>
            <div className="cube"></div>
         
        <div className="login-container">
          <div className='login-content'>
          <div className="logo-container">
            
            <img src={logImg} width={100} alt="Login" style={{marginRight:'105px'}} />
          </div>
          
          <form onSubmit={handleLogin}>
            <label htmlFor="email" style={{ marginRight: '10px' }}> 
              <img src={userIcon} width={20} style={{ marginRight: '5px' }}/>
              Email:
            </label>
            <div>
              <input
                type="email"
                id="email"
                name="email"
                className="input-field"
                onChange={handleChange}
              />
            </div>
            <label htmlFor="password" style={{ marginRight: '10px' }}>
              <img src={passIcon} width={20} style={{ marginRight: '5px' }}/>
              Password:
            </label>
            <div>
              <input
                type="password"
                id="password"
                name="password"
                className="input-field"
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="login-button">
              Log In
            </button>
            <div className="forgot-password">
              <a href="/Olvide">Forgot Password?</a>
            </div>
          </form>
          <div className="signup">
            Don't have an account? <a href="/Registro">Sign Up</a>
          </div>
          </div>
  </div> 
      </div>
          <footer>
            <p>&copy; Kenneth Reyes / Franklin Rodriguez</p>
          </footer>
         
          
     
      
      </div>
    );
    
  }


export default LoginPage;
