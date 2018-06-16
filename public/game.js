window.onload = function() {

  var canvas = document.getElementById("paper");
  var ctx = canvas.getContext("2d");

var radius = 2;
var dragging = false;
var color = ["red", "black", "blue", "green"];

var fontBig = document.getElementById('fontBig'),
    fontSmall = document.getElementById('fontSmall');


var random_col = color[Math.floor(Math.random()*color.length)]





var putPoint = function(e) {
  if (dragging == true) {

    ctx.lineWidth = radius*2;
    ctx.strokeStyle=random_col;
    ctx.fillStyle=random_col;

    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(e.offsetX, e.offsetY, radius, 0, Math.PI*2);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);

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

fontBig.addEventListener('click', function() {
  radius++;
  random_col = "yellow";
})

fontSmall.addEventListener('click', function() {
  radius--;
  random_col = "purple";
})


canvas.addEventListener('mousedown', engage);
canvas.addEventListener('mousemove', putPoint);
canvas.addEventListener('mouseup', disengage);







}
