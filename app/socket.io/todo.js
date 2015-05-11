// let's do some socket.io
var ioApp = require('express')();
var ioHttp = require('http').Server(ioApp);
var io = require('socket.io')(ioHttp);
var mongoose = require('mongoose');
var todoModel = require('../models/todo.js');

io.on('connection', function(socket) {
  console.log('a user connected');
  io.emit('result', {hello: 'world'});

  socket.on('request', function(msg){
    console.log('user request: ' + JSON.stringify(msg));
    io.emit('result', msg);
  });

  socket.on('get', function(){
    console.log('socket.io get.' );
    todoModel.find(function(err, todos) {
      if(err) {
        return io.emit('error', err);
      }
      io.emit('update', todos);
    });
  });

  socket.on('post', function(item){
    console.log('socket.io post:' + JSON.stringify(item) );
    todoModel.create(item, function (err, post) {
      if (err) {
        return io.emit(err);
      }
      io.emit('success', post);
    });
  });

  socket.on('put', function(item){
    console.log('socket.io put:' + JSON.stringify(item) );
    todoModel.findByIdAndUpdate(item._id, item, function (err, put) {
      if (err) {
        return io.emit(err);
      }
      io.emit('success', put);
    });
  });

  socket.on('delete', function(item){
    console.log('socket.io post:' + JSON.stringify(item) );
    todoModel.findByIdAndRemove(item._id, item, function (err, result) {
      if (err) {
        return io.emit(err);
      }
      io.emit('success', result);
    });
  });

  socket.on('disconnect', function(){
     console.log('user disconnected');
   });
});

module.exports = ioHttp;
