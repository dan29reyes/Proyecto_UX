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
  
  async function createList(list) {
    try{
        const insertedRows = await knex('lists').insert({
            name_list: list.name_list,
            id_board: list.id_board,
            position_list: list.position_list
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
  
  async function updateList(list) {
    try{
        const boardUpdated = await knex('lists').where({
            id_list:list.id_list}).update({
              name_list: list.name_list,
              id_list: list.id_list,
              id_board: list.id_board,
              position_list: list.position_list
            });
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