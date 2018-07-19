var ready = false;

var canvas = document.getElementById("gameArea");
ctx = canvas.getContext("2d");
ctx.fillStyle = "#000000";
ctx.fillRect(0,0,10000,10000);

var vMatrix = new VisualMatrix("gameArea",40,1,22,10,0,0,5);
var nextPiece = new VisualMatrix("gameArea",40,1,4,4,470,650,0);

function greyOutRow(row) {
	for(var i = 0; i < 10; i++)
		vMatrix.paintSquare(i,row,sprites[7]);
}

var isMobile = false; //initiate as false
// device detection
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
	|| /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
	isMobile = true;
}
setTimeout(function() {
	

	ctx.font="30px 'Press Start 2P'";
	ctx.fillStyle = "#ffffff";
	ctx.fillText("JackeT3TR15",50,150);

	ctx.font="17px 'Press Start 2P'";
	ctx.fillStyle = "#ffffff";
	if(isMobile)
		ctx.fillText("Tap",170,400)
	else
		ctx.fillText("Press",160,400);

	ctx.font="30px 'Press Start 2P'";
	ctx.fillStyle = "#ffffff";
	if(isMobile)
		ctx.fillText("HERE",140,454)
	else
		ctx.fillText("ENTER",130,454);

	ctx.font="17px 'Press Start 2P'";
	ctx.fillStyle = "#ffffff";
	ctx.fillText("to Play ",140,490);

	ctx.font="17px 'Press Start 2P'";
	ctx.fillStyle = "#ffffff";
	ctx.fillText("Tetris",150,800);
	ctx.fillText("Jackebasta edtion",55,850);

	updateUI();

	ready = true;
}, 500)

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

VisualMatrix.prototype.paintBG = function(color) {
    ctx.fillStyle = "#000000";
	ctx.fillRect(this.offsetX+this.matrixBorder,this.offsetY+this.matrixBorder,this.maxX-this.offsetX, this.maxY-this.offsetY);
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
			color.draw(this.x * this.totalCellSize + matrixBorder + offsetX, this.y * this.totalCellSize + matrixBorder + offsetY, this._ctx);
		} else
	    	this._ctx.fillRect(this.x * this.totalCellSize + matrixBorder + offsetX, this.y * this.totalCellSize + matrixBorder + offsetY, this.squareSize, this.squareSize);
	};

    this.paint(baseColor);
}

function updateScoreUI() {
	ctx.fillStyle = "#000000";
	ctx.fillRect(450, 50, 300, 200);
	ctx.font="20px 'Press Start 2P'";
	ctx.fillStyle = "#ffffff";
	ctx.fillText("score:" + score,450,110);
}

function updateLevelUI() {
	ctx.fillStyle = "#000000";
	//ctx.fillRect(450, 80, 300, 100);
	ctx.font="20px 'Press Start 2P'";
	ctx.fillStyle = "#ffffff";
	ctx.fillText("lines:" + lines,450,140);
}

function updateLinesUI() {
	ctx.fillStyle = "#000000";
	//ctx.fillRect(450, 110, 300, 100);
	//ctx.font="30px Verdana";
	ctx.font="20px 'Press Start 2P'";
	ctx.fillStyle = "#ffffff";
	ctx.fillText("level:" + level,450,170);
}

function updateUI() {
	updateScoreUI();
	updateLevelUI();
	updateLinesUI();
}

//CONTROLLER

//Player controller (keyboard)
document.addEventListener('keydown', (event) => {
	const keyName = event.key;
	if(gameStatus == GameStates.PLAYING) {
		if(keyName == "ArrowLeft") {
			shiftLeft();
		} else if(keyName == "ArrowRight") {
			shiftRight();
		} else if(keyName == "Enter") {
			if(ready) {
				newGame();
				setMusic(bgMusicSelected);
			}
		} else if(keyName == " " || keyName == "ArrowUp") {
			rotate();
		}
		if(keyName == "ArrowDown") {
			speedOn = true;
		}
	}
});
document.addEventListener('keyup', (event) => {
	const keyName = event.key;
	if(keyName == "ArrowDown") {
		speedOn = false;
	}
});

//Player controller (mobile)
$("#mobile-events").on("touchstart", tapStart);
function tapStart(evt) {
	evt.preventDefault();
	var touches = evt.changedTouches;
	if(gameStatus == GameStates.PLAYING) {
		if(touches[0].pageY < $(window).height() / 2 )
			rotate();
			
		else if(touches[0].pageY < $(window).height()*3/4 )
			touches[0].pageX > $(window).width() / 4? shiftRight() : shiftLeft();
		else
			speedOn = true;
	} /*else if(gameStatus == GameStates.ENDED || gameStatus == GameStates.IDLE ) {
		
	}*/
}

$(".left-panel").on("touchstart", function(evt) {
	evt.preventDefault();
	if(ready && gameStatus != GameStates.PLAYING && gameStatus != GameStates.PAUSED) {
		newGame();
		setMusic(bgMusicSelected);
	}
})

$(".left-panel").on("click", function(evt) {
	if(ready && gameStatus != GameStates.PLAYING && gameStatus != GameStates.PAUSED) {
		newGame();
		setMusic(bgMusicSelected);
	}
})

 $("#mobile-events").on("touchend", tapEnd);
 function tapEnd(evt) {
	evt.preventDefault();
	speedOn = false;
}

function updateRankUI(ranks) {
	if(isUsernameSet()) {
		$("#rank-panel").removeAttr('hidden');

		$("#rank-list").html('');
		var row = "<div class='header-rank-value rank-value'><p class='small standard-text'>&nbsp</p><p class='small standard-text score' style='right:10px;'>pos name &nbsp&nbsp score lvl</p></div>";
			$("#rank-list").append(row);
		for(var i = 0; i < ranks.length && i < 5; i++) {
			var row = "<div class='rank-value'><p class='small standard-text'>"+(i+1)+". " + ranks[i].name + "</p><p class='standard-text score' style='right:10px;'> " + ranks[i].score + " " + ranks[i].level + "</p></div>";
			$("#rank-list").append(row);
		}
	}
}

function showGlobalRankUI(ranks) {
	$(".global-rank-panel").attr("hidden", false);

	$("#global-rank-list").html('');
	var row = "<div class='global-rank-value global-header'><p class='standard-text global-standard-text'>PLAYER GLOBAL LEADERBOARD</p></div>";
	$("#global-rank-list").append(row);
		
	var row = "<div class='global-rank-value'><p class='global-small standard-text'>pos name</p><p class='small standard-text global-score' style='right:10px;'>score lvl</p></div>";
	$("#global-rank-list").append(row);
		
	$("#global-rank-list").append('<div id="global-rank-values"></div>');
	for(var i = 0; i < ranks.length; i++) {
		var row = "<div class='global-rank-value'><p class='global-small standard-text'>"+(i+1)+". " + ranks[i].name + "</p><p class='standard-text global-score' style='right:10px;'> " + ranks[i].score + " " + ranks[i].level + "</p></div>";
		$("#global-rank-values").append(row);
	}
	pause(true);
}

function hideGlobalRankUI() {
	$(".global-rank-panel").attr("hidden", true);
	//pause(false);
}

function updateUsernameUI() {
	if(isUsernameSet) {
		$("#username").html(saveGame.playerName);
	}
}

function isUsernameSet() {
	return saveGame.playerName != "";
}

function deleteUsernameFormIfNotNecessary() {
	if(isUsernameSet()) {
		$("#submit-record-panel").remove();
	}
}

$("#submit-record-btn").click(function() {
		var name = $("#submit-record-name").val();
		if(name.length > 0) {
			saveGame.setPlayerName(name);
			deleteUsernameFormIfNotNecessary();
			updateRank();
		}
	})
	.on("tap", function(){
		var name = $("#submit-record-name").val();
		if(name.length > 0) {
			saveGame.setPlayerName(name);
			deleteUsernameFormIfNotNecessary();
			updateRank();
		}
	}
);

$("#submit-record-name").on('keydown', function (e) {
	if (e.keyCode == 13) {
		var name = $("#submit-record-name").val();
		if(name.length > 0) {
			saveGame.setPlayerName(name);
			deleteUsernameFormIfNotNecessary();
			updateRank();
		}
	}
});

function pause(val) {
	if(gameStatus == GameStates.PAUSED && !val) {
		gameStatus = lastGameStatus;
		$("#pause").removeClass("play-button");	
		$("#pause").addClass("pause-button");			
	}
	else if(gameStatus == GameStates.PLAYING || (gameStatus == GameStates.PLAYING && val == true)) {
		if(gameStatus != GameStates.PAUSED)
			lastGameStatus = gameStatus;
		gameStatus = GameStates.PAUSED;
		$("#pause").removeClass("pause-button");	
		$("#pause").addClass("play-button");
	}
}

$("#close-global-rank").click(function() {hideGlobalRankUI();});
$("#open-global-rank").click(function() {showGlobalRank();});
$("#guide-line-button").click(function() {isGuideLinesActive = !isGuideLinesActive; });

$("#pause").click(function(evt){pause()});


deleteUsernameFormIfNotNecessary();
updateUsernameUI();
updateRank();