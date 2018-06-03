var express = require('express');
var socket = require('socket.io');

var port = 80;
//var port = 4000;

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

  var total = io.engine.clientsCount;
  socket.emit('getCount', total);
  console.log('Socket connection established: ' + total + ' active. ' + socket.id);


  socket.on('chat', function(data){
    io.sockets.emit('chat', data);
  });

  socket.on('typing', function(data) {
    socket.broadcast.emit('typing', data);

  });

});
