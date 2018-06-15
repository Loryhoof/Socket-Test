// Make connection
var socket = io.connect('http://139.59.158.3:80');
//var socket = io.connect('http://localhost:4000');

var random_number = Math.floor(Math.random() * 99) + 1;

var num = 0;


// Query DOM
var message = document.getElementById('message'),
    handle = document.getElementById('handle'),
    btn = document.getElementById('send'),
    output = document.getElementById('output'),
    feedback = document.getElementById('feedback');
    user_count = document.getElementById('user_count');
    tab = document.getElementById('tab');

//user-EMOTES
var peepoHappy = "<embed src='https://assets.change.org/photos/2/io/gq/skIogQbuyLePLdd-800x450-noPad.jpg?1527916573' width='30' height='30' />",
    TriHard = "<embed src='https://i.redd.it/z7b7otx1f5zy.png' width='30' height='30' />",
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

  tab.innerHTML = "WebSocket Test";
  num = 0;

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

  newMes = data.message
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/TriHard/g, TriHard)
  .replace(/peepoHappy/g, peepoHappy)
  .replace(/cmonBruh/g, cmonBruh);


  newName = data.handle.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');





  if (data.handle == "") {

    var n = (newMes.includes(".c") || newMes.includes(".d") || newMes.includes("http:") || newMes.includes("https:") || newMes.includes("www."));


    if (n == true) {
      output.innerHTML += '<p><strong><span style="color:orange">' + 'user' + random_number + ': </strong></span>' + '<a style="color:white" target="_blank" href="' + newMes + '">' + newMes +'</a>' + "\n";

    } else {
      output.innerHTML += '<p><strong><span style="color:orange">' + 'user' + random_number + ': </strong></span>' + newMes + '</p>' + "\n";
    }



  } else {

    var n = (newMes.includes(".c") || newMes.includes(".d") || newMes.includes("http:") || newMes.includes("https:") || newMes.includes("www."));


    if (n == true) {
      output.innerHTML += '<p><strong><span style="color:red">' + newName + ': </strong></span>' + '<a style="color:white" target="_blank" href="' + newMes + '">' + newMes +'</a>' + "\n";

    } else {
      output.innerHTML += '<p><strong><span style="color:red">' + newName + ': </strong></span>' + newMes + '</p>' + "\n";
    }


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

  if (data.message == "TriHardVid") {
    output.innerHTML += TriHardVid;
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




  newHandle = data.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  feedback.innerHTML = '<p><em>' + newHandle + ' is typing a message...</em></p>';


});

socket.on('alert', function(data) {
  num++;
  tab.innerHTML = "(" + num + ") " + "WebSocket Test";
  mySound.play();
});
