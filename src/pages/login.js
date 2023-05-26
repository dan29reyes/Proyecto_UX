import React, { useState } from 'react';
import '../styles/login.css';
import logImg from "../images/login_user.png";
import axios from 'axios';
import services from '../utils/services';
import validator from '../utils/validator';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validator.isEmail(form.email)) {
      console.log("email bad")
    } else {
      console.log("email good");
      services.postLogin(form.email, form.password);
      navigate("/Dashboard");
    }
  }

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
    <div className="login-container">
      <div className="logo-container">
        <img src={logImg} width={100} alt="Login" />
      </div>
      <form onSubmit={handleLogin}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          className="input-field"
          onChange={handleChange}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          className="input-field"
          onChange={handleChange}
        />
        <button type="submit" className="login-button">
          Log In
        </button>
        <div className="forgot-password">
          <a href="#">Forgot Password?</a>
        </div>
      </form>
      <div className="signup">
        Don't have an account? <a href="#">Sign Up</a>
      </div>
    </div>
  );
}

export default LoginPage;