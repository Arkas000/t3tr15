var canvas = document.getElementById("gameArea");
ctx = canvas.getContext("2d");
ctx.fillStyle = "#000000";
ctx.fillRect(0,0,10000,10000);

var vMatrix = new VisualMatrix("gameArea",40,1,22,10,0,0,5);
var nextPiece = new VisualMatrix("gameArea",40,1,4,4,470,650,0);

function greyOutRow(row) {
	for(var i = 0; i < 10; i++)
		vMatrix.paintSquare(i,row,7);
}

/**
 * Visual Matrix constructor.
 * Visual Matrix is an API to use a canvas like a visual matrix
 * @param canvasId
 * @param squareSize
 * @param spaceSize
 * @constructor
 */
function VisualMatrix(canvasId, squareSize, spaceSize, rows, columns, offsetX, offsetY, matrixBorder) {
    this.canvas = $("#"+canvasId);
    this.ctx=this.canvas[0].getContext("2d");

    this.squareSize = squareSize;
    this.spaceSize = spaceSize;
	this.totalCellSize = squareSize + spaceSize;
	this.offsetX = offsetX;
	this.offsetY = offsetY;
	this.matrixBorder = matrixBorder;

    this.maxX = Math.ceil(this.totalCellSize * columns)+offsetX;
	this.maxY = Math.ceil(this.totalCellSize * rows)+offsetY;
	
	ctx.fillStyle = "#d1d1d1";
	ctx.fillRect(offsetX,offsetY,this.maxX+this.matrixBorder*2-offsetX, this.maxY+this.matrixBorder*2-offsetY);
	ctx.fillStyle = "#000000";
	ctx.fillRect(offsetX+this.matrixBorder,offsetY+this.matrixBorder,this.maxX-offsetX, this.maxY-offsetY);

	this.squares = [];

	//initialize
	var idx = 0;
    for (var i = 0; i < columns; i++) {
        this.squares.push([]);
        for (var j = 0; j < rows; j++) {
            this.squares[idx].push(new VisualSquare(i, j, this.squareSize, this.spaceSize, "#000000",this.ctx, this.matrixBorder, this.offsetX, this.offsetY));
		}
		idx++;
    }
}

VisualMatrix.prototype.getSquare = function(x, y) {
    if(this.squares[x])
        return this.squares[x][y];
    return null;
};
/**
 * paint the given square with the required color
 * @param {matrix coordinate x} x 
 * @param {matrix coordinate y} y 
 * @param {square color} color 
 */
VisualMatrix.prototype.paintSquare = function(x, y, color) {
    if(this.squares[x])
        this.squares[x][y].paint(color);
};

/**
 * set the context color
 * @param {conext color} color 
 */
VisualMatrix.prototype.setContextColor = function(color) {
    this.ctx.fillStyle = color;
};

/**
 * VisualSquare is the primitive cell of a Visual Matrix.
 * A VisualSquare can be selected using the x,y coordinates and the VisualMatrix parameters
 * @param x
 * @param y
 * @param squareSize
 * @param spaceSize
 * @param baseColor
 * @param ctx
 * @constructor
 */
function VisualSquare(x, y, squareSize, spaceSize, baseColor, ctx, matrixBorder, offsetX, offsetY) {
    this.x = x;
    this.y = y;
    this.squareSize = squareSize;
    this.spaceSize = spaceSize;
    this.totalCellSize = squareSize + spaceSize;

    this._ctx = ctx;

    this.paint = function(color) {
	    if(color) {
	        this._ctx.fillStyle = color;
		}
		if(color != "#000000") {
			this._ctx.fillStyle = "#000000";
			this._ctx.fillRect(this.x * this.totalCellSize + matrixBorder + offsetX, this.y * this.totalCellSize + matrixBorder + offsetY, this.squareSize, this.squareSize);
			sprites[color].draw(this.x * this.totalCellSize + matrixBorder + offsetX, this.y * this.totalCellSize + matrixBorder + offsetY, this._ctx);
		} else
	    	this._ctx.fillRect(this.x * this.totalCellSize + matrixBorder + offsetX, this.y * this.totalCellSize + matrixBorder + offsetY, this.squareSize, this.squareSize);
	};

    this.paint(baseColor);
}


//CONTROLLER

//Player controller (keyboard)
document.addEventListener('keydown', (event) => {
	const keyName = event.key;
	if(keyName == "ArrowLeft") {
		shiftLeft();
	} else if(keyName == "ArrowRight") {
		shiftRight();
	} else if(keyName == "Enter") {
		newGame();
	} else if(keyName == " " || keyName == "ArrowUp") {
		rotate();
	}
	if(keyName == "ArrowDown") {
		speedOn = true;
	}
});
document.addEventListener('keyup', (event) => {
	const keyName = event.key;
	if(keyName == "ArrowDown") {
		speedOn = false;
	}
});

//Player controller (mobile)
document.addEventListener("touchstart", tapStart, false);
function tapStart(evt) {
	evt.preventDefault();
	var touches = evt.changedTouches;
	
	if(touches[0].pageY < $(window).height() / 5 )
		rotate();
		
	else if(touches[0].pageY < $(window).height()*4 / 5 )
		touches[0].pageX > $(window).width() / 2? shiftRight() : shiftLeft();
	else
		speedOn = true;
	//console.log(touches[0].pageX);
 }
 document.addEventListener("touchend", tapEnd, false);
 function tapEnd(evt) {
	evt.preventDefault();
	speedOn = false;
}