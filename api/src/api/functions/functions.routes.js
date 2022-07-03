const express = require('express');
const { isAuthenticated, isAdmin } = require('../../middlewares');
const {
  createFunc,
  findById,
  findByName,
  listFunctions,
  runById,
  runByName,
  updateFunction,
  deleteFunction
} = require('./functions.services');

const router = express.Router();

// POST / Create a function
router.post('/', isAuthenticated, isAdmin, async (req, res, next) => {
  try {
    req.body.authorId = req.payload.userId;
    res.json(await createFunc(req.body));
  } catch (err) {
    next(err);
  }
});

// GET Function by ID or Listing all.
router.get('/:id?', isAuthenticated, isAdmin, async (req, res, next) => {
  try {
    res.json((req.params.id === undefined) ? await listFunctions() : await findById(req.params.id));
  } catch (err) {
    next(err);
  }
});

// GET Function By Name
router.get('/byName/:name', isAuthenticated, isAdmin, async (req, res, next) => {
  try {
    res.json(await findByName(req.params.name));
  } catch (err) {
    next(err);
  }
});

// PUT / Update a function
router.put('/:id?', isAuthenticated, isAdmin, async (req, res, next) => {
  try {
    const data = (req.params.id === undefined) ? req.body : { id: req.params.id, ...req.body };
    res.json(await updateFunction(data));
  } catch (err) {
    next(err);
  }
});

// DELETE / Remove a function
router.delete('/:id?', isAuthenticated, isAdmin, async (req, res, next) => {
  try {
    res.json(await deleteFunction((req.params.id === undefined) ? req.body.id : req.params.id));
  } catch (err) {
    next(err);
  }
});

// RUN Function
router.post('/run', isAuthenticated, isAdmin, async (req, res, next) => {
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

// RUN Function byId
router.post('/run/byId/:id', isAuthenticated, isAdmin, async (req, res, next) => {
  try {
    res.json(await runById({ id: req.params.id, args: req.body }));
  } catch (err) {
    next(err);
  }
});

// RUN Function byName
router.post('/run/byName/:name', isAuthenticated, isAdmin, async (req, res, next) => {
  try {
    res.json(await runByName({ name: req.params.name, args: req.body }));
  } catch (err) {
    next(err);
  }
});

module.exports = router;
