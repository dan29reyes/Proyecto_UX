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