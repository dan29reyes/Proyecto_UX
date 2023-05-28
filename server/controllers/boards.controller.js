const boardService = require("../services/board.service");

const getBoards = async (req, res) => {
  const { id_user } = req.body;
  try {
    const boards = await boardService.getBoards(id_user);
    res.send(boards);
  } catch (e) {
    console.log(e);
    res.status(500).send({
      error: e.toString(),
    });
  }
};

const createBoard = async (req, res) => {
  const { name_board, id_user, description_board } = req.body;
  try {
    if (typeof name_board === "string" && typeof description_board === "string" && typeof id_user === "number") {
      const boardId = await boardService.createBoards(req.body);
      const boards = await boardService.getBoards(id_user);
      res.send({ boardId, boards });
    } else {
      res.status(400).send({
        error: "Invalid board name or description.",
      });
    }
  } catch (e) {
    res.status(500).send({
      error: e.toString(),
    });
  }
};

const updateBoard = async (req, res) => {
  const { name_board, description_board, id_board, user_id } = req.body;
  try {
    if (typeof name_board === "string" && typeof description_board === "string" && typeof id_board === "number") {
      const boardId = await boardService.updateBoard(req.body);
      const boards = await boardService.getBoards(user_id);
      res.send({ boardId, boards });
    } else {
      res.status(400).send({
        error: "Invalid board name or description.",
      });
    }
  } catch (e) {
    res.status(500).send({
      error: e.toString(),
    });
  }
};

const deleteBoard = async (req, res) => {
  const { id_board, id_user } = req.body;
  try {
    const boardId = await boardService.deleteBoards(id_board);
    const boards = await boardService.getBoards(id_user);
    res.send({ boardId, boards });
  } catch (e) {
    res.status(500).send({
      error: e.toString(),
    });
  }
}

module.exports = {
  createBoard,
  getBoards,
  updateBoard,
  deleteBoard,
};
