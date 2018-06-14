window.onload = function() {

  var canvas = document.getElementById("paper");
  var ctx = canvas.getContext("2d");



      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);





      window.addEventListener('mousemove', function (e) {


          ctx.fillStyle = "red";
          ctx.fillRect(e.x, e.y, 15, 15);

      });





};
