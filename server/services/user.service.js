const knex = require("knex")({
    client: "mysql",
    connection: {
      host: "127.0.0.1",
      port: 3306,
      user: "newuser",
      password: "contra",
      database: "admin_tablero",
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
  
  module.exports = {
    getCredentials,
    registerUser,
  };
  