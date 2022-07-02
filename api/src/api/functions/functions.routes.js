const express = require('express');
const { isAuthenticated } = require('../../middlewares');
const {
  createFunc,
  findById,
  findByName,
  listFunctions,
  runById,
  runByName
} = require('./functions.services');

const router = express.Router();

router.post('/', isAuthenticated, async (req, res, next) => {
  try {
    req.body.authorId = req.payload.userId;
    res.json(await createFunc(req.body));
  } catch (err) {
    next(err);
  }
});

router.get('/:id?', async (req, res, next) => {
  try {
    if (req.params.id === undefined) {
      res.json(await listFunctions());
    } else {
      res.json(await findById(req.params.id));
    }
  } catch (err) {
    next(err);
  }
});

router.get('/byName/:name?', async (req, res, next) => {
  try {
    res.json(await findByName(req.params.name));
  } catch (err) {
    next(err);
  }
});

router.post('/run', async (req, res, next) => {
  try {
    if (!req.body.id) {
      res.json(await runByName({ name: req.body.name, args: req.body.args }));
    } else {
      res.json(await runById({ id: req.body.id, args: req.body.args }));
    }
  } catch (err) {
    next(err);
  }
});

router.post('/run/byId/:id', async (req, res, next) => {
  try {
    res.json(await runById({ id: req.params.id, args: req.body }));
  } catch (err) {
    next(err);
  }
});

router.post('/run/byName/:name', async (req, res, next) => {
  try {
    res.json(await runByName({ name: req.params.name, args: req.body }));
  } catch (err) {
    next(err);
  }
});

module.exports = router;
