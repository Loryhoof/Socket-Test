  // Make connection
  var socket = io.connect('http://139.59.158.3:80');
  //var socket = io.connect('http://localhost:4000');


  // Query DOM
  var message = document.getElementById('message'),
      handle = document.getElementById('handle'),
      btn = document.getElementById('send'),
      output = document.getElementById('output'),
      feedback = document.getElementById('feedback');
      user_count = document.getElementById('user_count');



  // Emit events
  btn.addEventListener('click', function(){
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });
    message.value = "";
  });

  message.addEventListener('keypress', function(event) {
    socket.emit('typing', handle.value)

    if (event.keyCode === 13) {
      event.preventDefault();

      btn.click();
    };
  });

  socket.on('getCount', function(total) {
    user_count.innerHTML = total + ' users online';
  });

  // Listen for events
  socket.on('chat', function(data){
    feedback.innerHTML = "";
    output.innerHTML += data.handle + ': ' + data.message + "\n";
    output.scrollTop = output.scrollHeight;
  });

  //<span style="color: #ff0000">January 30, 2011</span>

  socket.on('typing', function(data) {
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';

  });
