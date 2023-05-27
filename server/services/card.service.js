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
    try{
        const insertedRows = await knex('cards').insert({
            id_card: card.id,
            name_card: card.name,
            description_card: card.description,
            position_card: card.position,
            id_list: listId,
        })
        console.log('Card insertado: ',insertedRows);
    }catch(error){
        console.error("Error insertando el card: ",error);
    }
  }
  
  async function deleteCard(cardId){
    try{
        const deletedRows = await('card').where({id_card: cardId}).del();
        console.log('Card eliminado',deletedRows);
    }catch(error){
        console.error('Error borrando el card');
    }
  }
  
  async function updateCard(cardId, card) {
    try{
        const boardUpdated = await knex('cards').where({
            id_card:cardId}).update({
            name_card: card.name_card,
            description_card: card.description_card,
            position_card: card.position_card,
        });
        console.log('Card updated: ',boardUpdated);
    }catch(error){
        console.error('Error updating board: ',error);
    }
  }
  
  module.exports = {
    getCards,
    createCard,
    deleteCard,
    updateCard,
  };