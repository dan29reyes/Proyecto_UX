const express = require('express')
const router = express.Router();

const cardController = require('../controllers/cards.controller');

router.post('/create',cardController.createCard);
router.post('/view', cardController.getCards);

module.exports = router;