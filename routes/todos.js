var express = require('express')
,   router = express.Router()

module.exports = function (models) {

  router.get('/', function (req, res) {
    models.Todo.find()
      .exec(function (err, todos) {
        if (err) {
          res.status(500).send({
            status : 'error',
            error : 'error accessing database'
          })
          return false
        }
        res.send(todos)
      })
  })

  router.get('/:id', function (req, res) {
    models.Todo.findById(req.params.id)
      .exec(function (err, todo) {
      if (err) {
          console.error(err)
          res.status(500).send({
            status : 'error',
            error : 'error accessing database'
          })
          return false
        }
        if (!todo) {
          res.status(404).send({
            status : 'error',
            error : 'no todo exists with specified id'
          })
          return false
        }
        res.send(todo)
      })
  })

  router.delete('/:id', function (req, res) {
    models.Todo.findOneAndRemove({ _id : req.params.id })
      .exec(function (err, deletedTodo) {
        if (err) {
          console.error(err)
          res.status(500).send({
            status : 'error',
            error : err
          })
          return false
        }
        if (!deletedTodo) {
          res.status(404).send({
            status : 'error',
            error : 'no todo exists with specified id'
          })
          return false
        }
        res.send({
          status : 'success'
        })
      })
  })

  router.patch('/:id', function (req, res) {
    var todo = req.body
    todo.lastUpdated = Date.now()
    delete todo._id // will throw mongo exception if you try to 'modify' id

    models.Todo.findOneAndUpdate({ _id : req.params.id }, todo)
      .exec(function (err, updatedTodo) {
        if (err) {
          console.error(err)
          res.status(500).send({
            status : 'error',
            error : err
          })
          return false
        }
        if (!updatedTodo) {
          res.status(404).send({
            status : 'error',
            error : 'no todo exists with specified id'
          })
          return false
        }
        res.send({
          status : 'success'
        })
      })
  })

  router.post('/create', function (req, res) {
    var todo = req.body
    ,   now = Date.now()

    todo.lastUpdated = now
    todo.created = now
    todo.completed = false

    new models.Todo(todo).save(function (err, newTodo) {
      if (err) {
        res.status(500).send({
          status : 'error saving to database',
          error : err
        })
        return false
      }
      res.status(201).send({
        status : 'success',
        url : '/todos/' + newTodo._id
      })
    })
  })

  return router
}
