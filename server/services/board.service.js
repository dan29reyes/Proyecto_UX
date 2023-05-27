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
        const insertedRows = await knex('boards').insert({
            name_board: boards.name_board,
            id_user: boards.user_id,
            description_board: boards.description_board,
        })
        console.log('Board insertado: ',insertedRows);
    }catch(error){
        console.error("Error insertando el board: ",error);
    }
  }

  async function deleteBoards(boardId){
    try{
        const deletedRows = await('boards').where({id_board: boardId}).del();
        console.log('Board eliminado',deletedRows);
    }catch(error){
        console.error('Error borrando el board');
    }
  }

  async function updateBoards(boardId, boards){
    try{
        const boardUpdated = await knex('boards').where({
                id_board:boardId}).update({
                name_board: boards.name_board,
                description_board: boards.description_board,
            });
            console.log('Board updated: ',boardUpdated);
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