// getCurrentShapeCoordinates()
// _checkSpaceAvailability(shapeCoordinates) check if ghost can be placed. Otherwise move it up by one
var guideLineCurrentCoordinates = [];
var isGuideLinesActive = false;
function updateMatrixWithGuideLines(offsetX) {
    removeGuideLines();
    if(isGuideLinesActive) {
        calculateGuideLineCoordinates(0, offsetX);
        drawGuidelines();
    }
}

function drawGuidelines() {
    for(var i = 0; i < guideLineCurrentCoordinates.length; i++) {
		vMatrix.paintSquare(guideLineCurrentCoordinates[i][0], guideLineCurrentCoordinates[i][1], getGhostShapeColor());
	}
}

function removeGuideLines() {
    for(var i = 0; i < guideLineCurrentCoordinates.length; i++) {
        if(gameMatrix[guideLineCurrentCoordinates[i][0]][guideLineCurrentCoordinates[i][1]].shape == null)
		    vMatrix.paintSquare(guideLineCurrentCoordinates[i][0],guideLineCurrentCoordinates[i][1], getShapeColor(null));
    }
    guideLineCurrentCoordinates = [];
}

function calculateGuideLineCoordinates(offsetY = 0, offsetX) {
    guideLineCurrentCoordinates = cloneBlock(currentShapeCoords);
    var distanceFromGround = getDistanceFromGround(guideLineCurrentCoordinates);
    //posiziona il ghost in fondo alla griglia
    for(var i = 0; i <guideLineCurrentCoordinates.length; i++) {
        guideLineCurrentCoordinates[i][0]+=offsetX;
        guideLineCurrentCoordinates[i][1]+=- offsetY;
    }

    /*var newCoords = new Array(guideLineCurrentCoordinates.length);
	for(var i = 0; i < guideLineCurrentCoordinates.length; i++)
		newCoords[i] = [guideLineCurrentCoordinates[i][0],guideLineCurrentCoordinates[i][1] - 1];*/
	var res = _checkSpaceAvailability(guideLineCurrentCoordinates);
	if(res == 1) {	
		/*for(var i = 0; i < guideLineCurrentCoordinates.length; i++)
            guideLineCurrentCoordinates[i] = [guideLineCurrentCoordinates[i][0], guideLineCurrentCoordinates[i][1] - 2];*/
		return res;
	} else {
        return calculateGuideLineCoordinates(offsetY - 1, offsetX);
    }
}

function getDistanceFromGround(array) {
    var max = 0;
    for(var i = 0; i < array.length; i++) {
        max = Math.max(max, array[i][1]);
    }
    return gameMatrix[0].length - max;
}