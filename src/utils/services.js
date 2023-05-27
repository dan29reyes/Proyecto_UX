import axios from "axios";

function postLogin(email, password) {
  const options = {
    method: 'POST',
    url: 'http://localhost:8000/user/login',
    data: { email: email, password: password }
  };;

  return axios.request(options)
    .then(function (response) {
      console.log(response.data)
      return response.data;
    })
    .catch(function (error) {
      console.error(error);
      throw error;
    });
}

function postRegister(email, password) {
  const options = {
    method: 'POST',
    url: 'http://localhost:8000/user/register',
    data: { email: email, password: password }
  };

  axios.request(options).then(function (response) {
    console.log(response.data);
  }).catch(function (error) {
    console.error(error);
  });
}

export default {
  postLogin, postRegister,
};