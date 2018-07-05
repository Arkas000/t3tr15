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
var imageCount = 6;
var sprites = [];

var img = new Image();

img.onload = function() {
	currentSpriteLoaded++;
  };
img.src = 'img/nikes.webp';
sprites.push(new Sprite(img, 40, 40, []));

img = new Image();
img.onload = function() {
	currentSpriteLoaded++;
  };
img.src = 'img/bottapalle.webp';
sprites.push(new Sprite(img, 40, 40, []));

img = new Image();
img.onload = function() {
	currentSpriteLoaded++;
  };
img.src = 'img/jack.webp';
sprites.push(new Sprite(img, 40, 40, []));

img = new Image();
img.onload = function() {
	currentSpriteLoaded++;
  };
img.src = 'img/badass.webp';
sprites.push(new Sprite(img, 40, 40, []));

img = new Image();
img.onload = function() {
	currentSpriteLoaded++;
  };
img.src = 'img/heart.webp';
sprites.push(new Sprite(img, 40, 40, []));

img = new Image();
img.onload = function() {
	currentSpriteLoaded++;
  };
img.src = 'img/geppe.webp';
sprites.push(new Sprite(img, 40, 40, []));