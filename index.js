var images = {};

loadImage("leftArm");
loadImage("legs");
loadImage("torso");
loadImage("rightArm");
loadImage("head");
loadImage("hair");

function loadImage(name) {
  images[name] = new Image();
  images[name].onload = function() {
    resourceLoaded();
  };
  images[name].src = `images/${name}.png`;
}

var totalResources = 6;
var numResourcesLoaded = 0;
var fps = 30;

function resourceLoaded() {
  numResourcesLoaded += 1;
  if (numResourcesLoaded === totalResources) {
    setInterval(redraw, 1000 / fps);
  }
}

var context = document.getElementById("canvas").getContext("2d");

var charX = 220;
var charY = 200;

function redraw() {
  var x = charX;
  var y = charY;

  canvas.width = canvas.width; // clears the canvas

  context.drawImage(images["leftArm"], x + 40, y - 42);
  context.drawImage(images["legs"], x, y);
  context.drawImage(images["torso"], x, y - 50);
  context.drawImage(images["rightArm"], x - 15, y - 42);
  context.drawImage(images["head"], x - 10, y - 125);
  context.drawImage(images["hair"], x - 37, y - 138);
}
