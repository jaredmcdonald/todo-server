var express = require('express')
,   router = express.Router()
,   fileStore = require('../file-store')
,   idRegex = /^\d+$/


function validateId (id, res) {
  var valid = idRegex.test(id)
  
  if (!valid) {
    res.status(400).send({
      status : 'error',
      error : 'malformed todo id'
    })
  }
  return valid
}

router.get('/', function (req, res) {
  fileStore.get(res.send.bind(res))
})

router.get('/:id', function (req, res) {
  if (!validateId(req.params.id, res)) {
    return false
  }

  fileStore.get(function (json) {
    if (json.error) {
        res.status(404)
    }
    res.send(json)
  }, parseInt(req.params.id))
})

router.delete('/:id', function (req, res) {
  if (!validateId(req.params.id, res)) {
    return false
  }

  fileStore.delete(parseInt(req.params.id), function (err) {
    if (err) {
      res.status(404).send({
        status : 'error',
        error : err
      })
      return false
    }
    res.send({
      status : 'success'
    })
  })
})

router.put('/:id', function (req, res) {
  if (!validateId(req.params.id, res)) {
    return false
  }

  var todo = req.body
  todo.lastUpdated = Date.now()

  fileStore.edit(parseInt(req.params.id), todo, function (err) {
    if (err) {
      res.status(404).send({
        status : 'error',
        error : err
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

  fileStore.create(todo, function (err, id) {
    if (err) {
      res.status(500).send({
        status : 'error',
        error : err
      })
      return false
    }
    res.status(201).send({
      status : 'success',
      url : '/todos/' + id
    })
  })
})


module.exports = router;
