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

async function getCards() {
  let cards = await knex.select("*").from("cards");
  cards = JSON.stringify(cards);
  return JSON.parse(cards);
}

async function createCard(card, listId) {
  return knex("cards").insert({
    id_card: card.id,
    name_card: card.name,
    description_card: card.description,
    position_card: card.position,
    id_list: listId,
  });
}

async function deleteCard(cardId) {
  return knex("cards").where("id_card", cardId).del();
}

async function updateCard(cardId, card) {
  return knex("cards").where("id_card", cardId).update({
    id_card: card.id,
    name_card: card.name,
    description_card: card.description,
    position_card: card.position,
    id_list: listId,
  });
}

module.exports = {
  getCards,
  createCard,
  deleteCard,
  updateCard,
};
