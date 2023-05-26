const boardService = require("../services/board.service");

const getBoards = async (req, res) => {
    const { id_user } = req.body;
  try {
    const boards = await boardService.getBoards(id_user);
    res.send(boards);
  } catch (e) {
    console.log(e);
  }
};

const createBoard = async (req, res) => {
  const { name_board, user_id, description_board } = req.body;
  try {
    if (typeof name_board == "string" && typeof user_id == "number" && typeof description_board == "string") {
      const [boardId] = await boardService.createBoards(req.body);
      res.send({ boardId });
    }
  } catch (e) {
    res.status(500).send({
      error: e.toString(),
    });
  }
};

module.exports = {
    createBoard,
    getBoards,
};