const express = require('express');

const auth = require('./auth/auth.routes');
const users = require('./users/users.routes');
const books = require('./books/books.routes');
const functions = require('./functions/functions.routes');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏'
  });
});

router.use('/auth', auth);
router.use('/users', users);
router.use('/books', books);


router.use('/functions', functions);

module.exports = router;
