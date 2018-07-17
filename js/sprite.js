function Sprite(img, width, height, positions){
    this.img = img;
    this.width = width;
    this.height = height;
    this.positions = positions;
  }
  Sprite.prototype = {
    draw: function(x, y,context){
        context.drawImage(
          this.img,
          x, y,
          this.width,
          this.height
        );
      }
  };

var currentSpriteLoaded = 0;
var imageCount = 9;
var sprites = [];

var img = new Image();

img.onload = function() {
	currentSpriteLoaded++;
  };
img.src = 'img/nikes.png';
sprites.push(new Sprite(img, 40, 40, []));

img = new Image();
img.onload = function() {
	currentSpriteLoaded++;
  };
  img.onerror = function() {
      print("E");
  }
img.src = 'img/bottapalle.png';
sprites.push(new Sprite(img, 40, 40, []));

img = new Image();
img.onload = function() {
	currentSpriteLoaded++;
  };
img.src = 'img/jack.png';
sprites.push(new Sprite(img, 40, 40, []));

img = new Image();
img.onload = function() {
	currentSpriteLoaded++;
  };
img.src = 'img/badass.png';
sprites.push(new Sprite(img, 40, 40, []));

img = new Image();
img.onload = function() {
	currentSpriteLoaded++;
  };
img.src = 'img/heart.png';
sprites.push(new Sprite(img, 40, 40, []));

img = new Image();
img.onload = function() {
	currentSpriteLoaded++;
  };
img.src = 'img/geppe.png';
sprites.push(new Sprite(img, 40, 40, []));

img = new Image();
img.onload = function() {
	currentSpriteLoaded++;
  };
img.src = 'img/gode.png';
sprites.push(new Sprite(img, 40, 40, []));

img = new Image();
img.onload = function() {
	currentSpriteLoaded++;
  };
img.src = 'img/omegapiero.png';
sprites.push(new Sprite(img, 40, 40, []));

img = new Image();
img.onload = function() {
	currentSpriteLoaded++;
  };
img.src = 'img/ghost.png';
sprites.push(new Sprite(img, 40, 40, []));