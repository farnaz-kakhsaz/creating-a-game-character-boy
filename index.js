var canvas;
var context;
// LoadImage Function:
var images = {};

// ResourceLoaded Function:
var totalResources = 3;
var numResourcesLoaded = 0;
var fps = 30;

// Redraw Function:
var charX = 220;
var charY = 250;
var x = charX;
var y = charY;
var jumpHeight = 45;

// UpdateBreath Function:
var breathInc = 0.1;
var breathDir = 1;
var breathAmt = 0;
var breathMax = 2;
var breathInterval = setInterval(updateBreath, 1000 / fps);

// UpdateBlink & Blink Function:
var maxEyeHeight = 14;
var curEyeHeight = maxEyeHeight;
var eyeOpenTime = 0;
var timeBtwBlinks = 4000;
var blinkUpdateTime = 200;
var blinkTimer = setInterval(updateBlink, blinkUpdateTime);

//Jump & Land Functions:
var jumping = false;

// Create the canvas (Neccessary for IE because it doesn't know what a canvas element is)
function prepareCanvas(canvasDiv, canvasWidth, canvasHeight) {
  canvas = document.createElement("canvas");
  canvas.setAttribute("width", canvasWidth);
  canvas.setAttribute("height", canvasHeight);
  canvas.setAttribute("id", "canvas");
  canvasDiv.appendChild(canvas);
}

loadImage("leftArm-jump");
loadImage("legs-jump");
loadImage("rightArm-jump");

loadImage("leftArm");
loadImage("legs");
loadImage("torso");
loadImage("rightArm");
loadImage("head");
loadImage("hair");

// Load All Images:
function loadImage(name) {
  images[name] = new Image();
  images[name].onload = function() {
    resourceLoaded();
  };
  images[name].src = `images/${name}.png`;
}

// Make Sure All Images Loaded After That Call Redraw Function
function resourceLoaded() {
  numResourcesLoaded += 1;
  if (numResourcesLoaded === totalResources) {
    setInterval(redraw, 1000 / fps);
  }
}

// Main Fuction:
function redraw() {
  canvas.width = canvas.width; // Clears the Canvas

  drawEllipse(x + 40, y + 29 + breathAmt, 160 - breathAmt, 6); // Shadow
  // We want the shadow behind all the other image layers sp an ellipse is drawn at the beginning of the redraw function.

  context.drawImage(images["leftArm"], x + 40, y - 42 - breathAmt);
  context.drawImage(images["legs"], x, y);
  context.drawImage(images["torso"], x, y - 50);
  context.drawImage(images["head"], x - 10, y - 125 - breathAmt);
  context.drawImage(images["hair"], x - 37, y - 138 - breathAmt);
  context.drawImage(images["rightArm"], x - 15, y - 42 - breathAmt);

  drawEllipse(x + 47, y - 68, 8, curEyeHeight); // Left Eye
  drawEllipse(x + 58, y - 68, 8, curEyeHeight); // Right Eye
}

// Eyes Function:
function drawEllipse(centerX, centerY, width, height) {
  context.beginPath();
  context.moveTo(centerX, centerY - breathAmt - height / 2);
  context.bezierCurveTo(
    centerX + width / 2,
    centerY - breathAmt - height / 2,
    centerX + width / 2,
    centerY - breathAmt + height / 2,
    centerX,
    centerY - breathAmt + height / 2
  );
  context.bezierCurveTo(
    centerX - width / 2,
    centerY - breathAmt + height / 2,
    centerX - width / 2,
    centerY - breathAmt - height / 2,
    centerX,
    centerY - breathAmt - height / 2
  );
  context.fillStyle = "black";
  context.fill();
  context.closePath();
}

//Blink & UpdateBlink Function
function updateBlink() {
  eyeOpenTime += blinkUpdateTime;
  if (eyeOpenTime >= timeBtwBlinks) {
    blink();
  }
}

function blink() {
  curEyeHeight -= 1;
  if (curEyeHeight <= 0) {
    eyeOpenTime = 0;
    curEyeHeight = maxEyeHeight;
  } else {
    setTimeout(blink, 10);
  }
}

// Brath Function:
// The purpose of this process is to update the variable breathAmt which we will use to represent the constant
//  breathing of our character in the form of a subtle rise and fall of the head and arms.
function updateBreath() {
  if (breathDir === 1) {
    // Breath In:
    breathAmt -= breathInc;
    if (breathAmt < -breathMax) {
      breathDir = -1;
    }
  } else {
    // Breath Out:
    breathAmt += breathInc;
    if (breathAmt > breathMax) {
      breathDir = 1;
    }
  }

  //Jump Function
  function jump() {
    if (!jumping) {
      jumping = true;
      setTimeout(land, 500);
    }
  }

  //Land Function
  function land() {
    jumping = false;
  }
}
