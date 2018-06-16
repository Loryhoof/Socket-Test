window.onload = function() {

  var canvas = document.getElementById("paper");
  var ctx = canvas.getContext("2d");

var radius = 10;
var dragging = false;
var color = ["red", "black", "blue", "green"];

var fontBig = document.getElementById('fontBig'),
    fontSmall = document.getElementById('fontSmall');


var random_col = color[Math.floor(Math.random()*color.length)]


socket.on('mouse', newDrawing);


function newDrawing (data) {

  ctx.lineWidth = radius*2;
  ctx.strokeStyle="green";
  ctx.fillStyle="green";

  ctx.lineTo(data.x, data.y);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(data.x, data.y, radius, 0, Math.PI*2);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(data.x, data.y);

  console.log(data.d);

  if (data.d == true) {

    data.d = false;
    //dragging = false;
    ctx.beginPath();

  }

}

var putPoint = function(e) {
  if (dragging == true) {

    var mouseX = e.offsetX;
    var mouseY = e.offsetY;
    var otherDrag = dragging;

    var data = {
      x: mouseX,
      y: mouseY,
      d: otherDrag
    }


    console.log(mouseX, mouseY);


    ctx.lineWidth = radius*2;
    ctx.strokeStyle=random_col;
    ctx.fillStyle=random_col;

    ctx.lineTo(mouseX, mouseY);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(mouseX, mouseY, radius, 0, Math.PI*2);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(mouseX, mouseY);

    socket.emit('mouse', data);

  }

}

var engage = function(e) {
  dragging = true;
  putPoint(e);
}

var disengage = function() {
  dragging = false;
  ctx.beginPath();
}

/*fontBig.addEventListener('click', function() {
  radius++;
  random_col = "yellow";
})

fontSmall.addEventListener('click', function() {
  radius--;
  random_col = "purple";
})*/


canvas.addEventListener('mousedown', engage);
canvas.addEventListener('mousemove', putPoint);
canvas.addEventListener('mouseup', disengage);







}
