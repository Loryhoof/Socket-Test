var express = require('express');
var socket = require('socket.io');

var port = 80;
//var port = 4000;

var count = 0;

//App setup
var app = express();
var server = app.listen(port, function(){
  console.log('listening to requests on port ' + port)
});



//Static files
app.use(express.static('public'));

//Socket setup
var io = socket(server);


io.on('connection', function(socket){

  count++;
  io.sockets.emit('broadcast', count + ' users online')

  socket.on('disconnect', function(data) {
    count--;
    io.sockets.emit('broadcast', count + ' users online')
  })


  socket.on('chat', function(data){
    io.sockets.emit('chat', data);
  });


  socket.on('alert', function(data) {
    socket.broadcast.emit('alert', data);
  });

  socket.on('typing', function(data) {
    socket.broadcast.emit('typing', data);

  });

});
