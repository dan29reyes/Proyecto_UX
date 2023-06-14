require('dotenv').config();

const knex = require("knex")({
    client: "mysql",
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
  });
  
  async function getCards(listId) {
    let cards = await knex.select("*").from("cards").where({id_list: listId});
    cards = JSON.stringify(cards);
    return JSON.parse(cards);
  }
  
  async function createCard(card) {
    try{
        await knex('cards').insert({
            name_card: card.name_card,
            description_card: card.description_card,
            id_list: card.id_list,
            position_card: card.position_card,
        })
    }catch(error){
        console.error("Error insertando el card: ",error);
    }
  }
  
  async function deleteCard(cardId){
    try{
        await knex('cards').where({id_card: cardId}).del();
    }catch(error){
        console.error('Error borrando el card');
    }
  }
  
  async function updateCard(card) {
    try{
        await knex('cards').where({
            id_card:card.id_card}).update({
            name_card: card.name_card,
            description_card: card.description_card,
            position_card: card.position_card,
            id_list: card.id_list,
        });
    }catch(error){
        console.error('Error updating card: ',error);
    }
  }
  
  module.exports = {
    getCards,
    createCard,
    deleteCard,
    updateCard,
  };