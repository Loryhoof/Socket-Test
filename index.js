var express = require('express');
var socket = require('socket.io');

var port = 443;

//App setup
var app = express();
var server = app.listen(port, function(){
  console.log('listening to requests on port ' + port)
});



//Static files
app.use(express.static('public'));

//Socket setup
var io = socket(server);

var active_connections = 0;

io.on('connection', function(socket){
  active_connections++;
  console.log('Socket connection established: ' + active_connections + ' active. ' + socket.id);

  socket.on('chat', function(data){
    io.sockets.emit('chat', data);
  });

  socket.on('typing', function(data) {
    socket.broadcast.emit('typing', data);

  });

});
