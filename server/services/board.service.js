// const knex = require("knex")({
//     client: "mysql",
//     connection: {
//       host: "127.0.0.1",
//       port: 3306,
//       user: "root",
//       password: "Kdrr29909",
//       database: "admin_tablero",
//     },
//   });

//   async function getBoards(){
//     let boards = await knex.select("*").from("boards");
//     boards = JSON.stringify(boards);
//     return JSON.parse(boards);
//   }

//   async function createBoards(boards, userId){
//     try{
//         const insertedRows = await knex('boards').insert({
//             id_board: boards.id_board,
//             name_board: boards.name_board,
//             id_user: userId,
//             description_board: boards.description_board,
//         })
//         console.log('Board insertado: ',insertedRows);
//     }catch(error){
//         console.error("Error insertando el board: ",error);
//     }finally{
//         knex.destroy();
//     }
//   }

//   async function deleteBoards(boardId){
//     try{
//         const deletedRows = await('boards').where({id_board: boardId}).del();
//         console.log('Board eliminado',deletedRows);
//     }catch(error){
//         console.error('Error borrando el board');
//     }finally{
//         knex.destroy();
//     }
//   }

//   async function updateBoards(boardId, boards){
//     try{
//         const boardUpdated = await knex('boards').where({
//                 id_board:boardId}).update({
//                 name_board: boards.name_board,
//                 description_board: boards.description_board,
//             });
//             console.log('Board updated: ',boardUpdated);
//     }catch(error){
//         console.error('Error updating board: ',error);
//     }finally{
//         knex.destroy();
//     }
// }

// module.exports = {
//     getBoards,
//     createBoards,
//     deleteBoards,
//     updateBoards,
// }