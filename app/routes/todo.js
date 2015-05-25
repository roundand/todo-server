var express = require('express');
var router = express.Router();
var logger = require('morgan');

var mongoose = require('mongoose');
var todoModel = require('../models/todo.js');

/* /todo/ GET and POST */
router.route('/')
  .get(function(req, res, next) {
    console.log('GET/ ' + JSON.stringify(req.params))
    todoModel.find(function(err, todos) {
      if(err) {
        return next(err);
      }
      res.json(todos);
    });
  })
  .post(function(req, res, next) {
    console.log('POST ' + JSON.stringify(req.params))
    todoModel.create(req.body, function (err, post) {
      if (err) {
        return next(err);
      }
      res.json(post);
    });
  });


/* /todo/:id GET, PUT and DELETE */
router.route('/:id')
  .get(function(req, res, next) {
    console.log('GET /:id ' + JSON.stringify(req.params))
    todoModel.findById(req.params.id, function (err, post) {
      if (err) {
        return next(err);
      }
      res.json(post);
    });
  })
  .put(function(req, res, next) {
    console.log('PUT /:id ' + JSON.stringify(req.params))
    console.log('PUT body ' + JSON.stringify(req.body))
    todoModel.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  })
  .delete(function(req, res, next) {
    console.log('DELETE /:id ' + JSON.stringify(req.params))
    console.log('DELETE body ' + JSON.stringify(req.body))
    todoModel.findByIdAndRemove(req.params.id, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });

module.exports = router;
