const express = require('express')
const router = express.Router();

const listController = require('../controllers/lists.controller');

router.post('/createList',listController.createList);
router.post('/viewList', listController.getLists);
router.post('/updateList', listController.updateList);
router.post('/deleteList', listController.deleteList);

module.exports = router;