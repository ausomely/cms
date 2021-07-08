const express = require('express');
const router = express.Router();
const adminController = requre('../controllers/admin-controllers');


router.route('/').get(adminController.index);