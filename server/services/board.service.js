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

  async function getBoards(userId){
    try{
        let boards = await knex.select("*").from("boards").where({id_user: userId});
        boards = JSON.stringify(boards);
        return JSON.parse(boards);
    }catch(error){
        console.error("Error obteniendo los boards: ",error);
    }
  }

  async function createBoards(boards){
    try{
        await knex('boards').insert({
            name_board: boards.name_board,
            id_user: boards.user_id,
            description_board: boards.description_board,
        })
    }catch(error){
        console.error("Error insertando el board: ",error);
    }
  }

  async function deleteBoards(boardId){
    try{
        const listId = await knex.select('id_list').from('lists').where({id_board: boardId});
        console.log(listId)
        for(let i = 0; i < listId.length; i++){
            const id_cards = await knex.select('id_card').from('cards').where({id_list: listId[i].id_list});
            for(let i = 0; i < id_cards.length; i++){
                await knex('cards').where({id_card: id_cards[i].id_card}).del();
            }
            await knex('lists').where({id_list: listId[i].id_list}).del();
        }
        await knex('boards').where({id_board: boardId}).del();
    }catch(error){
        console.error('Error borrando el board');
    }
  }

  async function updateBoards(boards){
    try{
        await knex('boards').where({
            id_board:boards.id_board}).update({
            name_board: boards.name_board,
            description_board: boards.description_board,
        });
    }catch(error){
        console.error('Error updating board: ',error);
    }
}

module.exports = {
    getBoards,
    createBoards,
    deleteBoards,
    updateBoards,
}