const express = require('express')
const router = express.Router();

const boardController = require('../controllers/boards.controller');

router.post('/createBoard',boardController.createBoard);
router.post('/viewBoard', boardController.getBoards);

module.exports = router;