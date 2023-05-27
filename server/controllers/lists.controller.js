const listService = require("../services/list.service");

const getLists = async (req, res) => {
  const { id_board } = req.body;
  try {
    const lists = await listService.getLists(id_board);
    res.send(lists);
  } catch (e) {
    console.log(e);
    res.status(500).send({
      error: e.toString(),
    });
  }
};

const createList = async (req, res) => {
  const { name_list, id_board } = req.body;
  try {
    if (typeof name_list === "string" && typeof id_board === "number") {
      const listId = await listService.createList(name_list, id_board);
      const lists = await listService.getLists(id_board); // Fetch the updated list of boards
      res.send({ listId, lists });
    } else {
      res.status(400).send({
        error: "Invalid list name",
      });
    }
  } catch (e) {
    res.status(500).send({
      error: e.toString(),
    });
  }
};

const updateList = async (req, res) => {
  const { name_list, id_list, id_board } = req.body;
  try {
    if (typeof name_list === "string" && typeof id_list === "number" && typeof id_board === "number") {
      const listId = await listService.updateList(id_list, name_list);
      const lists = await listService.getLists(id_board); // Fetch the updated list of boards
      res.send({ listId, lists });
    } else {
      res.status(400).send({
        error: "Invalid list name.",
      });
    }
  } catch (e) {
    res.status(500).send({
      error: e.toString(),
    });
  }
};

const deleteList = async (req, res) => {
  const { id_list, id_board } = req.body;
  try {
    const listId = await listService.deleteList(id_list);
    const lists = await listService.getLists(id_board);
    console.log(lists)
    res.send({ listId, lists });
  } catch (e) {
    res.status(500).send({
      error: e.toString(),
    });
  }
}

module.exports = {
    createList,
    getLists,
    updateList,
    deleteList,
};
