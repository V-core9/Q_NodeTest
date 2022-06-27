const express = require('express');
const { isAuthenticated, isAdmin } = require('../../middlewares');
const { findUserById, listUsers, updateUser } = require('./users.services');

const router = express.Router();

router.get('/:id?', isAuthenticated, isAdmin, async (req, res, next) => {
  try {
    if (req.params.id === undefined) {
      res.json(await listUsers());
    } else {
      res.json(await findUserById(req.params.id));
    }
  } catch (err) {
    next(err);
  }
});

router.put('/', isAuthenticated, isAdmin, async (req, res, next) => {
  try {
    res.json(await updateUser(req.body));
  } catch (err) {
    next(err);
  }
});

module.exports = router;
