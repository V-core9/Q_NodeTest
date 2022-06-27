const express = require('express');
const { isAuthenticated, isAdmin } = require('../../middlewares');
const { findUserById, listUsers, updateUser } = require('./users.services');

const router = express.Router();

router.get('/', isAuthenticated, isAdmin, async (req, res, next) => {
  try {
    res.json(await listUsers());
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
