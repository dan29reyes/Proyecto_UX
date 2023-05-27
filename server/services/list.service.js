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
  
  async function getLists(boardId) {
    let lists = await knex.select("*").from("lists").where({id_board: boardId});;
    lists = JSON.stringify(lists);
    return JSON.parse(lists);
  }
  
  async function createList(name, boardId) {
    try{
        const insertedRows = await knex('lists').insert({
            name_list: name,
            id_board: boardId,
        })
        console.log('Lista insertado: ',insertedRows);
    }catch(error){
        console.error("Error insertando el list: ",error);
    }
  }
  
  async function deleteList(listId){
    try{
        const id_cards = await knex.select('id_card').from('cards').where({id_list: listId});
        for(let i = 0; i < id_cards.length; i++){
          await knex('cards').where({id_card: id_cards[i].id_card}).del();
        }
        await knex('lists').where({id_list: listId}).del();
    }catch(error){
        console.error('Error borrando el list');
    }
  }
  
  async function updateList(listId, name) {
    try{
        const boardUpdated = await knex('lists').where({
            id_list:listId}).update({name_list: name});
        console.log('List updated: ',boardUpdated);
    }catch(error){
        console.error('Error updating List: ',error);
    }
  }
  
  module.exports = {
    getLists,
    createList,
    deleteList,
    updateList,
  };