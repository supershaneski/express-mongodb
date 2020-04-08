const express = require('express');
const router = express.Router();
const dbConfig = require('../db/config');

const MongoClient = require('mongodb').MongoClient
var db;
MongoClient.connect(`mongodb://${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`, {
        useNewUrlParser: true,
    useUnifiedTopology: true
  }, (err, database) => {
  if (err) return console.log(err)
  db = database.db(dbConfig.database)
})

router.get('/', async (req, res) => {
    db.collection('todo').find().toArray((err, result) => {
            if (err) return console.log(err)
        res.send(result);
    })
})

router.get('/:id', async (req, res) => {
    var { id } = req.params;
    var ObjectID = require('mongodb').ObjectID;
    var query = { _id: new ObjectID(id) };
    db.collection('todo').findOne(query, (err, result) => {
        if (err) return console.log(err)
        res.send(result);
    })
})

router.post('/add', async (req, res) => {
    const { name, date, state } = req.body;
    const newTodo = {
        name: name,
        date: new Date(date),
        state: Number(state)
    }
    db.collection('todo').insertOne(newTodo, (err, result) => {
        if (err) return console.log(err)
        res.send({
            insertedCount: result.insertedCount,
            insertedData: result.ops
        })
    })
})

router.put('/:id', async (req, res) => {
    var { id } = req.params;
    const { name, date, state } = req.body;
    var ObjectID = require('mongodb').ObjectID;
    const selectObj = { _id: new ObjectID(id)};
    const updateObj = { name: name, date: date, state: state};
    db.collection('todo').updateOne(selectObj, {$set: updateObj }, (err, result) => {
        if (err) return console.log(err)
        res.send({
            modifiedCount: result.modifiedCount,
            modifiedData: {
                _id: id,
                name: name,
                date: date,
                state: state
            }
        })
    })
})

router.delete('/:id', async (req, res) => {
    var { id } = req.params;
    var ObjectID = require('mongodb').ObjectID;
    var query = { _id: new ObjectID(id) };
    db.collection('todo').deleteOne(query, (err, result) => {
        if (err) return console.log(err)
        res.send({
            deletedCount: result.deletedCount,
            deletedData: {
                _id: id
            }
        })
    })
})

module.exports = router;
