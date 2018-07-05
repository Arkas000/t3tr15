var canvas = document.getElementById("gameArea");
var ctx = canvas.getContext('2d');
var vMatrix = new VisualMatrix("gameArea",40,1,22,10);

function greyOutRow(row) {
	for(var i = 0; i < 10; i++)
		vMatrix.paintSquare(i,row,"#818181");
}

/**
 * Visual Matrix constructor.
 * Visual Matrix is an API to use a canvas like a visual matrix
 * @param canvasId
 * @param squareSize
 * @param spaceSize
 * @constructor
 */
function VisualMatrix(canvasId, squareSize, spaceSize, rows, columns) {
    this.canvas = $("#"+canvasId);
    this.ctx=this.canvas[0].getContext("2d");

    this.squareSize = squareSize;
    this.spaceSize = spaceSize;
    this.totalCellSize = squareSize + spaceSize;

 	var wH,wW;
    if(rows) {
		wH = this.totalCellSize * rows;
    } else {
    	wH = $(window).height();
    }

    if(columns) {
		wW = this.totalCellSize * columns;
    } else {
    	wW = $(window).width();
    }

    this.ctx.canvas.width = wW;
    this.ctx.canvas.height = wH;

    this.maxX = Math.ceil(wW / this.totalCellSize);
    this.maxY = Math.ceil(wH / this.totalCellSize);

    this.squares = [];

    //initialize
    for (var i = 0; i < this.maxX; i++) {
        this.squares.push([]);
        for (var j = 0; j < this.maxY; j++) {
            this.squares[i].push(new VisualSquare(i, j, this.squareSize, this.spaceSize, "#d1d1d1",this.ctx));
        }
    }
}

VisualMatrix.prototype.getSquare = function(x, y) {
    if(this.squares[x])
        return this.squares[x][y];
    return null;
};

VisualMatrix.prototype.paintSquare = function(x, y, color) {
    if(this.squares[x])
        this.squares[x][y].paint(color);
};


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
function VisualSquare(x, y, squareSize, spaceSize, baseColor, ctx) {
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
	    this._ctx.fillRect(this.x * this.totalCellSize, this.y * this.totalCellSize, this.squareSize, this.squareSize);
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