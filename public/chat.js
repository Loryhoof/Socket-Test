// Make connection
var socket = io.connect('http://139.59.158.3:80');
//var socket = io.connect('http://localhost:4000');

var random_number = Math.floor(Math.random() * 99) + 1;

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


  if (data.handle == "") {
    output.innerHTML += 'user' + random_number + ': ' + data.message + "\n";
  } else {


    output.innerHTML += data.handle + ': ' + data.message + "\n";
  };

  if (data.message == "/clear") {
    output.innerHTML = "";
  }

  if (data.message == "/ban") {
    output.innerHTML += data.handle + " has been permanently banned." + "\n";
  }

  if (data.message == "!random") {
    output.innerHTML += "Bot: " + (Math.floor(Math.random() * 99) + 1) + "\n";
  }

  if (data.message == "!hug") {
    output.innerHTML += "Bot: " + "I wuuve you *HUG*" + "\n";
  }

  if (data.message == "!help") {
    output.innerHTML += "Bot: You can use " + "/clear /ban !random !hug" + "\n";
  }

  output.scrollTop = output.scrollHeight;
});


socket.on('typing', function(data) {
  feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';


});
