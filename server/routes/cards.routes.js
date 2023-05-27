const express = require('express')
const router = express.Router();

const cardController = require('../controllers/cards.controller');

router.post('/createCard',cardController.createCard);
router.post('/viewCards', cardController.getCards);
router.post('/updateCard', cardController.updateCard);
router.post('/deleteCard', cardController.deleteCard);

module.exports = router;