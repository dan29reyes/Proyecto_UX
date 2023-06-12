

import React, { useState } from 'react';
import '../styles/OlvidePass.css';
import services from '../utils/services';
import validator from '../utils/validator';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const OlvidePasswordPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
  });

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    if (!validator.isEmail(form.email)) {
      console.log("email bad");
    } else {
      try {
        const response = await services.postPasswordReset(form.email);
        console.log("Check your email for a password reset link");
        navigate("/Login");
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.log("Email not found");
        } else {
          console.log("An error occurred:", error);
        }
      }
    }
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
      <form onSubmit={handlePasswordReset}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          className="input-field"
          onChange={handleChange}
        />
        <button type="submit" className="reset-button">
          Reset Password
        </button>
      </form>
      <footer>
        <p>&copy; Kenneth Reyes / Franklin Rodriguez</p>
      </footer>
    </div>
    
  );
};

export default OlvidePasswordPage;
