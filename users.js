const knex = require("knex")({
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "contra",
    database: "admin_tablero",
  },
});

function getUser(email) {
  const users = knex("users").where("email", email);
  console.log(users);
  return users;
}

module.exports = {
  getUser,
};
