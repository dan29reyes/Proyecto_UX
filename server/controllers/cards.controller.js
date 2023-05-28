const cardService = require("../services/card.service");

const getCards = async (req, res) => {
  const { id_list } = req.body;
  try {
    const cards = await cardService.getCards(id_list);
    res.send(cards);
  } catch (e) {
    console.log(e);
  }
};

const createCard = async (req, res) => {
  const { name_card, description_card, id_list, position_card } = req.body;
  try {
    if (typeof name_card == "string" && typeof description_card == "string" 
    && typeof id_list == "number" && typeof position_card == "number") {
      const cardId = await cardService.createCard(req.body);
      const cards = await cardService.getCards(id_list);
      res.send({ cardId, cards });
    }
  } catch (e) {
    res.status(500).send({
      error: e.toString(),
    });
  }
};

const updateCard = async (req, res) => {
  const { id_card, name_card, description_card, position_card, id_list } = req.body;
  try {
    if (typeof id_card == "number" && typeof name_card == "string" && typeof description_card == "string" 
    && typeof id_list == "number" && typeof position_card == "number") {
      const [cardId] = await cardService.updateCard(req.body);
      res.send({ cardId });
    }
  } catch (e) {
    res.status(500).send({
      error: e.toString(),
    });
  }
}

const deleteCard = async (req, res) => {
  const { id_card } = req.body;
  try {
    if (typeof id_card == "number") {
      const cardId = await cardService.deleteCard(id_card);
      res.send({ cardId });
    }
  } catch (e) {
    res.status(500).send({
      error: e.toString(),
    });
  }
}

module.exports = {
  getCards,
  createCard,
  updateCard,
  deleteCard,
};