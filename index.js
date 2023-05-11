const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const cardService = require("./services/card.service");

const { isEmail, isPassword } = require("./utils/validator");
app.use(bodyParser.json());

const userService = require("./services/users");
const { createReadStream } = require("fs");

app.post("/login/", async function (req, res) {
  //0. TODO; middleware

  //1. verificacion de los parametros (formato)
  const errors = [];
  if (!isEmail(req.body.email)) {
    errors.push("Email is not valid");
  }

  if (!isPassword(req.body.password)) {
    errors.push("Password is not valid");
  }

  //2. TODO; ejecucion del procedimiento
  //2.1 validacion en base de datos
  if (!errors.length) {
    const user = userService.getUser(req.body.email);
    console.log(user);
  }

  //3. TODO; mandar una respuesta para cada escenario

  //4. TODO; control de excepciones try catch
  res.send({
    success: true,
  });
});

app.get("/cards", async (req, res) => {
  console.log("query", req.query);
  try {
    const cards = await cardService.getCards();
    res.send(cards);
  } catch (e) {
    console.log(e);
  }
});

// ?listId=1
app.post("/cards", async (req, res) => {
  // const card = req.body;
  // card.name

  // destructuracion de objeto
  const { id_card, name_card, description_card, position_card } = req.body;

  try {
    if (
      typeof id_card == "number" &&
      typeof name_card == "string" &&
      typeof description_card == "string" &&
      typeof position_card == "number"
    ) {
      throw "Server error";
      const [cardId] = await cardService.createCard(req.body);
      res.send({ cardId });
    }
  } catch (e) {
    res.status(500).send({
      error: e.toString(),
    });
  }
});

app.listen(3000);
