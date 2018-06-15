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

//user-EMOTES
var peepoHappy = "<embed src='https://assets.change.org/photos/2/io/gq/skIogQbuyLePLdd-800x450-noPad.jpg?1527916573' width='30' height='30' />",
    TriHard = "<embed src='https://ih0.redbubble.net/image.501881470.8713/flat,800x800,070,f.u2.jpg' width='30' height='30' />",
    TriHardVid = "<embed src='https://www.youtube.com/embed/9f9KzWNqKGo?autoplay=1' width='640' height='360' />";
    cmonBruh = "<embed src='https://static-cdn.jtvnw.net/jtv_user_pictures/cmonbruh-profile_image-84cf1a6644b6e42a-300x300.png' width='30' height='30' />"


    //sound function
    function sound(src) {
        this.sound = document.createElement("audio");
        this.sound.src = src;
        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        this.sound.style.display = "none";
        document.body.appendChild(this.sound);
        this.play = function(){
            this.sound.play();
        }
        this.stop = function(){
            this.sound.pause();
        }
    }

    function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}


var mySound;
mySound = new sound("Alert - 01.mp3");


    var colors = [
        "red",
        "orange",
        "yellow",
        "green",
        "blue",
        "purple"
    ];

// Emit events
btn.addEventListener('click', function(){
  socket.emit('chat', {
      message: message.value,
      handle: handle.value
  });
  message.value = "";
});

btn.addEventListener('click', function() {
  socket.emit('alert', {
    mySound
  })

});

message.addEventListener('keypress', function(event) {
  socket.emit('typing', handle.value)

  if (event.keyCode === 13) {
    event.preventDefault();

    btn.click();
  };
});

//socket.emit('getCount', total);



socket.on('getCount', function(total) {
  user_count.innerHTML = total + ' users online';
});



// Listen for events
socket.on('chat', function(data){
  feedback.innerHTML = "";
  newMes = data.message.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  newName = data.handle.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');


  if (data.handle == "") {

    output.innerHTML += '<p><strong><span style="color:orange">' + 'user' + random_number + ': </strong></span>' + newMes + '</p>' + "\n";
  } else {

    output.innerHTML += '<p><strong><span style="color:red">' + newName + ': </strong></span>' + newMes + '</p>' + "\n";

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

  if (data.message == "peepoHappy") {
    output.innerHTML += peepoHappy;
  }

  if (data.message == "TriHard") {
    output.innerHTML += TriHard;
  }

  if (data.message == "TriHardVid") {
    output.innerHTML += TriHardVid;
  }

  if (data.message == "cmonBruh") {
    output.innerHTML+= cmonBruh;
  }

  if (data.message == "!hug") {
    output.innerHTML += "Bot: " + "I wuuve you *HUG* " + peepoHappy + "\n";
  }

  if (data.message == "!help") {
    output.innerHTML += "Bot: You can use " + "/clear /ban !random !hug" + "\n";
  }

  output.scrollTop = output.scrollHeight;
});


socket.on('typing', function(data) {
  feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';


});

socket.on('alert', function(data) {
  mySound.play();
});
