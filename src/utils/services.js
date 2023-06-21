import axios from "axios";

function postLogin(email, password) {
  const options = {
    method: 'POST',
    url: 'http://localhost:8000/user/login',
    data: { email: email, password: password }
  };

  return axios.request(options)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      throw error;
    });
}

function postRegister(email, password) {
  const options = {
    method: 'POST',
    url: 'http://localhost:8000/user/register',
    data: { email: email, password: password }
  };

  return axios.request(options)
  .then(function (response) {
    console.log(response.data);
  }).catch(function (error) {
    throw error;
  });
}

function postOlvidePass(email, password) {
  const options = {
    method: 'POST',
    url: 'http://localhost:8000/user/forgot-password',
    data: { 
      email: email,
      password: password,
    }
  };
  return axios.request(options)
  .then(function (response) {
    return response.data;
  }).catch(function (error) {
    throw error;
  })
};

export default {
  postLogin, postRegister,postOlvidePass
};