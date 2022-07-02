const path = require('path');
const fs = require('fs');
const { db } = require('../../utils/db');

const tempFilePath = path.join(__dirname, '$.js');

function createFunc(func) {
  return db.function.create({ data: func });
}

function findById(id) {
  return db.function.findUnique({
    where: {
      id,
    }
  });
}

function findByName(name) {
  return db.function.findUnique({
    where: {
      name,
    },
  });
}

function listFunctions() {
  return db.function.findMany();
}

function runIt(func, args) {
  fs.writeFileSync(tempFilePath, `module.exports = (args) => {${func.content}}`);
  let response;
  try {
    response = require('./$')(args);
  } catch (error) {
    response = error;
  }
  fs.unlinkSync(tempFilePath);
  return response;
}

async function runByName(data) {
  console.log(data);
  const rez = await db.function.findFirst({
    where: {
      name: data.name
    }
  });

  return runIt(rez, data.args);
}

async function runById(data) {
  const rez = await db.function.findUnique({
    where: {
      id: data.id
    }
  });

  return runIt(rez, data.args);
}

module.exports = {
  findById,
  listFunctions,
  findByName,
  createFunc,
  runByName,
  runById
};
