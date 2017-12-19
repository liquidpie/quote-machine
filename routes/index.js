'use strict';

const express = require('express');
const router  = express.Router();
const quoteRoute = require('./quote');


/* GET home page. */
router.get('/', quoteRoute.quoteMachine);

router.get('/nextquote', quoteRoute.nextQuote);

module.exports = router;
