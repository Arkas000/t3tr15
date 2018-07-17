// getCurrentShapeCoordinates()
// _checkSpaceAvailability(shapeCoordinates) check if ghost can be placed. Otherwise move it up by one
var guideLineCurrentCoordinates = [];
function updateMatrixWithGuideLines() {
	removeGuideLines();
	for(var i = 0; i < guideLineCurrentCoordinates.length; i++) {
		gameMatrix[guideLineCurrentCoordinates[i][0]][guideLineCurrentCoordinates[i][1]] = {"val":0,"shape":null};
		vMatrix.paintSquare(guideLineCurrentCoordinates[i][0], guideLineCurrentCoordinates[i][1], getGhostShapeColor());
	}
	//updateUI();	
}

function removeGuideLines() {
    for(var i = 0; i < guideLineCurrentCoordinates.length; i++) {
		gameMatrix[guideLineCurrentCoordinates[i][0]][guideLineCurrentCoordinates[i][1]] = {"val":0,"shape":null};
		vMatrix.paintSquare(guideLineCurrentCoordinates[i][0],guideLineCurrentCoordinates[i][1], getShapeColor(null));
	}
}

function calculateGuideLineCoordinates() {
    guideLineCurrentCoordinates = cloneBlock(currentShapeCoords);
    var distanceFromGround = getDistanceFromGround(guideLineCurrentCoordinates);
    //posiziona il ghost in fondo alla griglia
    for(var i = 0; i <guideLineCurrentCoordinates.length; i++) {
        guideLineCurrentCoordinates[i][1]+=distanceFromGround-1;
    }
    updateMatrixWithGuideLines();

    /*var newCoords = new Array(guideLineCurrentCoordinates.length);
	for(var i = 0; i < guideLineCurrentCoordinates.length; i++)
		newCoords[i] = [guideLineCurrentCoordinates[i][0],guideLineCurrentCoordinates[i][1] - 1];
	var res = _checkSpaceAvailability(newCoords);
	if(res == 1) {
		updateMatrixWithGuideLines();		
		for(var i = 0; i < guideLineCurrentCoordinates.length; i++)
            guideLineCurrentCoordinates[i] = [guideLineCurrentCoordinates[i][0], guideLineCurrentCoordinates[i][1] - 2];
		return res;
	} else {
        return calculateGuideLineCoordinates();
    }*/
}

function getDistanceFromGround(array) {
    var max = 0;
    for(var i = 0; i < array.length; i++) {
        max = Math.max(max, array[i][1]);
    }
    return gameMatrix[0].length - max;
}