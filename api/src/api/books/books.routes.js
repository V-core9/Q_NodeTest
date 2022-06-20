const express = require('express');

const { isAuthenticated } = require('../../middlewares');

const {
  createBook,
  findBookById,
  listBooks,
  updateBook,
  deleteBook
} = require('./books.services');

const router = express.Router();

router.get('/:id?', isAuthenticated, async (req, res, next) => {
  try {
    if (req.params.id !== undefined) {
      res.json(await findBookById(req.params.id));
    } else {
      res.json(await listBooks());
    }
  } catch (err) {
    next(err);
  }
});

router.post('/', isAuthenticated, async (req, res, next) => {
  try {
    req.body.authorId = req.payload.userId;
    res.json(await createBook(req.body));
  } catch (err) {
    next(err);
  }
});

router.put('/', isAuthenticated, async (req, res, next) => {
  try {
    res.json(await updateBook(req.body));
  } catch (err) {
    next(err);
  }
});

router.delete('/', isAuthenticated, async (req, res, next) => {
  try {
    const book = await findBookById(req.body.id);
    if (book.authorId !== req.payload.userId) {
      res.status(401).json({ message: 'You are not authorized to delete this book' });
    } else {
      res.json(await deleteBook(req.body.id));
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
