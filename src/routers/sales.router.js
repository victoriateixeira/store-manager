const express = require('express');
const { salesController } = require('../controllers');

const router = express.Router();

router.get('/');

module.exports = router;