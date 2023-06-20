require('dotenv').config();

const knex = require("knex")({
    client: process.env.DB_CLIENT,
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
  });
  
  const registerUser = async (user) => {
    return await knex("users").insert({
        email_user: user.email, 
        password_user: user.encryptedPassword, 
        salt_user: user.salt,});
  }

  const getCredentials = async (email) => {
    let credentials = await knex.select("*").from("users").where("email_user",email);
    credentials = JSON.stringify(credentials);
    return JSON.parse(credentials);
  }
  
  const forgotPassword = async (user) => {
    console.log("ping")
    return await knex("users").where({email_user: user.email}).update({
      password_user: user.encryptedPassword,
      salt_user: user.salt,
    });
  }

  module.exports = {
    getCredentials,
    registerUser,
    forgotPassword,
  };
  