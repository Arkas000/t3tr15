//create gameMatrix
var gameMatrix = new Array(10);
for (var i = 0; i < 10; i++) {
	gameMatrix[i] = new Array(22);
}

var GameStates = {"IDLE":0, "PLAYING":1, "ENDED":2, "BUSY":3}

/**
* Clear the game matrix content
*/
function clearMatrix() {
	for(var i = 0; i < 10; i++) {
		for(var j = 0; j < 22; j++) {
			gameMatrix[i][j] = {"val":0,"shape":null};
			vMatrix.paintSquare(i,j,getShapeColor(null));
		}
	}
	vMatrix.paintBG("#000000");
}

/**
* Clear the preview matrix content
*/
function clearPreviewMatrix() {
	for(var i = 0; i < 4; i++) {
		for(var j = 0; j < 4; j++) {
			nextPiece.paintSquare(i,j,getShapeColor(null));
		}
	}
}

var nextShape = null;
var currentShape = null;
/**
* generate and spawn a random shape
*/
function initializeShape() {
	if(currentShapeCoords) {
		//fix old shape to matrix as obstacle before creating new one
		for(var i = 0; i < currentShapeCoords.length; i++)
			gameMatrix[currentShapeCoords[i][0]][currentShapeCoords[i][1]].val = 1;
	}

	_checkForCompleteRows();
	generateNextAndCurrentShape();
	_updateNextPieceMatrixWithShape(getShapeCoordinates(nextShape), 0, 0, nextShape);
	var shapeCoordinates = getShapeCoordinates(currentShape);
	shapeCoordinates.forEach(function(coord) {
		coord[0] += 3;
	});

	//if there is not enaught space, the game is over, so let the game know this by returning null
	if(_checkSpaceAvailability(shapeCoordinates) == 0) return null;

	_updateMatrixWithShape(shapeCoordinates, 0, 0, currentShape);
	return shapeCoordinates;
}

/**
* return 1: no collision occours
* return 0: collision with another piece
* return -1: collision with left wall
* return -2: collision with right wall
* return -3: collision with bottom wall
* return -4: collision with up wall
*/
function _checkSpaceAvailability(shapeCoordinates) {
	for(var i = 0; i < shapeCoordinates.length; i++) {
		var coord = shapeCoordinates[i];
		if(coord[0] < 0) return -1;
		if(coord[0] >= gameMatrix.length) return -2;
		if(coord[1] >= gameMatrix[0].length) return -3;
		if(coord[1] < 0) return -4;
		if(gameMatrix[coord[0]][coord[1]].val == 1) return 0;
	};
	return 1;
}

/**
* return true: no collisions, so shapeCoordinates are automatically updated
* return false: collisions on the left or on the right with a wall or another piece
* collisions with other pieces are simply ignored in Horizontal Shift Phase!
*/
function _horizontalShiftShape(shapeCoordinates, shift) {
	var newCoords = new Array(shapeCoordinates.length);
	for(var i = 0; i < shapeCoordinates.length; i++)
		newCoords[i] = [shapeCoordinates[i][0]+shift,shapeCoordinates[i][1]];
	var res = _checkSpaceAvailability(newCoords);
	if(res == 1) {
		_updateMatrixWithShape(shapeCoordinates, shift, 0, currentShape);		
		for(var i = 0; i < shapeCoordinates.length; i++)
			shapeCoordinates[i] = [shapeCoordinates[i][0]+shift, shapeCoordinates[i][1]];
		
		return true;
	}
	return false;
}

function _forceHorizontalShiftShape(shapeCoordinates, shift) {
	var newCoords = new Array(shapeCoordinates.length);
	for(var i = 0; i < shapeCoordinates.length; i++)
		newCoords[i] = [shapeCoordinates[i][0]+shift,shapeCoordinates[i][1]];
	return newCoords;
}

/**
* return true: no collisions, so shapeCoordinates are automatically updated
* return false: collisions on the bottom with bottom wall or another piece
*/
function _verticalShiftShape(shapeCoordinates, shift) {
	var newCoords = new Array(shapeCoordinates.length);
	for(var i = 0; i < shapeCoordinates.length; i++)
		newCoords[i] = [shapeCoordinates[i][0],shapeCoordinates[i][1] + shift];
	var res = _checkSpaceAvailability(newCoords);
	if(res == 1) { //no collisions
		_updateMatrixWithShape(shapeCoordinates, 0, shift, currentShape);		
		for(var i = 0; i < shapeCoordinates.length; i++)
			shapeCoordinates[i] = [shapeCoordinates[i][0],shapeCoordinates[i][1]+shift];
		return res;
	}
	return res; //collision detected
}

//ud
function _updateMatrixWithShape(shapeCoordinates, shiftX, shiftY, shapeType) {
	for(var i = 0; i < shapeCoordinates.length; i++) {
		gameMatrix[shapeCoordinates[i][0]][shapeCoordinates[i][1]] = {"val":0,"shape":null};
		vMatrix.paintSquare(shapeCoordinates[i][0],shapeCoordinates[i][1], getShapeColor(null));
	}
	for(var i = 0; i < shapeCoordinates.length; i++) {
		gameMatrix[shapeCoordinates[i][0]+shiftX][shapeCoordinates[i][1]+shiftY] = {"val":2,"shape":shapeType};
		vMatrix.paintSquare(shapeCoordinates[i][0]+shiftX, shapeCoordinates[i][1]+shiftY, getShapeColor(shapeType));
	}
	//updateUI();	
}

/**
 * Draw next incoming piece to the small matrix (piece preview)
 * @param {*} shapeCoordinates 
 * @param {*} shiftX 
 * @param {*} shiftY 
 * @param {*} shapeType 
 */
function _updateNextPieceMatrixWithShape(shapeCoordinates, shiftX, shiftY, shapeType) {
	clearPreviewMatrix();
	for(var i = 0; i < shapeCoordinates.length; i++) {
		nextPiece.paintSquare(shapeCoordinates[i][0]+shiftX, shapeCoordinates[i][1]+shiftY+1, getShapeColor(shapeType));
	}
}

function _updateMatrixSubstituteShape(oldShape, newShape, shapeType) {
	for(var i = 0; i < oldShape.length; i++) {
		gameMatrix[oldShape[i][0]][oldShape[i][1]] = {"val":0,"shape":null};
		vMatrix.paintSquare(oldShape[i][0],oldShape[i][1], getShapeColor(null));
	}
	for(var i = 0; i < newShape.length; i++) {
		gameMatrix[newShape[i][0]][newShape[i][1]] = {"val":2,"shape":shapeType};
		vMatrix.paintSquare(newShape[i][0],newShape[i][1], getShapeColor(shapeType));
	}
	//updateUI();	
}

//public function to move a piece left
function shiftLeft() {
	if(currentShapeCoords)
		_horizontalShiftShape(currentShapeCoords,-1);
}

//public function to move a piece right
function shiftRight() {
	if(currentShapeCoords)
		_horizontalShiftShape(currentShapeCoords,1);
}

var currentShapeCoords;
var skipped = 0;
var speedOn = false;

function shiftDown() {
	var levelCapped = level > 10?10 : level;
	if((speedOn && skipped % 2 == 0) || skipped % (Math.floor(30/(levelCapped+1)))== 0) {
		if(currentShapeCoords) {		
			var res = _verticalShiftShape(currentShapeCoords,1);
			if(res == -3 || res == 0) {	
				increaseScore(16+level);
				currentShapeCoords = initializeShape();
				if(!currentShapeCoords) {
					endGame();
				}
			}
		} else {
			currentShapeCoords = initializeShape();
		}
	}
	skipped++;
}

function rotate() {
	if(gameStatus == GameStates.PLAYING && currentShape != Shapes.SQUARE) {
		var tempBlock = cloneBlock(currentShapeCoords);
		var origin = currentShapeCoords[1];
		for (i = 0, length = tempBlock.length; i < length; i++) {
	        x = tempBlock[i][0];
	        y = tempBlock[i][1];

	        // Tranpose to cartersian system (minus the origin's offset).
	        x -= origin[0];
	        y -= origin[1];

	        // Flip the y's sign (cartesian's y goes up, our implementation's y goes down).
	        y = -y;

	        // Apply transformation.
	        // x' = x * cos(PI/2) - y * sin(PI/2)
	        // y' = x * sin(PI/2) + y * cos(PI/2)
	        // These formulas translate to more simple equations
	        // as we are only rotation 90 degree chunks.
	        // x' = -y
	        // y' = x;
	        temp = x;
	        x = -y;
	        y = temp;

	        // Flip the y's sign back to origin.
	        y = -y;

	        // Add origin offset back to coords.
	        x += origin[0];
	        y += origin[1];

	        // Move back to original struct.
	        currentShapeCoords[i][0] = x;
	        currentShapeCoords[i][1] = y;
	    }

	    var res = _checkSpaceAvailability(currentShapeCoords);
	    if(res == -1) { //left wall collision
	    	var shiftedShape = _forceHorizontalShiftShape(currentShapeCoords,1);
	    	res = _checkSpaceAvailability(shiftedShape);
	    	if(res == -1) {
	    		shiftedShape = _forceHorizontalShiftShape(currentShapeCoords,2);
	    		res = _checkSpaceAvailability(shiftedShape);
	    		if(res == 1) {
	    			currentShapeCoords = shiftedShape;
	    		}
	    	} else if(res == 0 || res == -3 || res == -4) {
	    		currentShapeCoords = tempBlock;
	    	} else {
	    		currentShapeCoords = shiftedShape;
	    	}
	    } else if(res == -2) { //right wall collision
	    	var shiftedShape = _forceHorizontalShiftShape(currentShapeCoords,-1);
	    	res = _checkSpaceAvailability(shiftedShape);
	    	if(res == -2) {
	    		shiftedShape = _forceHorizontalShiftShape(currentShapeCoords,-2);
	    		res = _checkSpaceAvailability(shiftedShape);
	    		if(res == 1) {
	    			currentShapeCoords = shiftedShape;
	    		}
	    	} else if(res == 0 || res == -3 || res == -4) {
	    		currentShapeCoords = tempBlock;
	    	} else {
	    		currentShapeCoords = shiftedShape;
	    	}
	    } else if(res == 0 || res == -3 || res == -4) { //block or bottom wall collision
	    	currentShapeCoords = tempBlock;
	    }

	    _updateMatrixSubstituteShape(tempBlock, currentShapeCoords,currentShape);
	}
}

function getCurrentSpeed() {
	return initialSpeed;
}

function cloneBlock(block) {
	var newBlock = new Array(block.length);
	for(var i = 0; i < block.length; i++) {
		newBlock[i] = [block[i][0],block[i][1]];
	}
	return newBlock;
}

function _checkForCompleteRows() {
	for(var i = 0; i < gameMatrix[0].length; i++) {
		var count = 0;
		for(var j = 0; j < gameMatrix.length; j++) {
			if(gameMatrix[j][i].val == 0) break;
			count++;
		}
		if(count == gameMatrix.length) _moveEverythingAboveDownByOne(i);
	}
}

function _moveEverythingAboveDownByOne(row) {
	for(var i = row; i > 0; i--) {
		for(var j = 0; j < gameMatrix.length; j++) {
			gameMatrix[j][i] = gameMatrix[j][i-1];
			vMatrix.paintSquare(j,i, getShapeColor(gameMatrix[j][i].shape));
		}
		gameMatrix[j-1][i-2] = {"val":0, "shape":null};
		vMatrix.paintSquare(j,i-1, getShapeColor(null));
	}
	increaseLines();
	increaseScore(100);
}

function endGame() {
	clearInterval(gameInterval);
	gameStatus = GameStates.BUSY;
	endingPhaseInterval = setInterval(endingPhase, 50);
	console.log("Game Over");
}

var gameStatus = GameStates.ENDED;
var gameInterval;

function newGame() {
	if(gameStatus != GameStates.PLAYING && gameStatus != GameStates.BUSY) {
		resetData();
		clearMatrix();
		gameStatus = GameStates.PLAYING;
		gameInterval = setInterval(shiftDown, 20);
	}
}

var endingPhaseInterval;
var endingPhaseRow = 21;
function endingPhase() {
	if(endingPhaseRow < 0) {		
		endingPhaseRow = 21;
		gameStatus = GameStates.ENDED;
		clearInterval(endingPhaseInterval);
	} else {
		greyOutRow(endingPhaseRow--);
	}
}

function waitForSpritesReady() {
	if(currentSpriteLoaded >= imageCount) {
		//newGame();
		clearInterval(spriteReadyInterv);
	}
}

var spriteReadyInterv = setInterval(waitForSpritesReady, 10);