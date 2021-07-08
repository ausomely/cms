const express = require('express');
const router = express.Router();
const defaultController = require('../controllers/default-controller');

router.route('/')
    .get(defaultController.index);

module.exports = router;