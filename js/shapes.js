var Shapes = {"SQUARE":0, "L_L":1, "L_R":2, "TRUNK":3, "PYRAMID":4, "Z_L":5, "Z_R":6 }
Object.freeze(Shapes);

function getInitialCoordinates(shape) {
	//coordinates that build the shape. (4x2 square components)
	switch(shape) {
		case Shapes.SQUARE: { // [::]
			return [[0,1],[0,0],[1,1],[1,0]];
		}
		case Shapes.L_L: { // [:..]
			return [[0,1],[1,1],[0,0],[2,1]];
		}
		case Shapes.L_R: { // [..:]
			return [[0,1],[1,1],[2,1],[2,0]];
		}
		case Shapes.TRUNK: { // [....]
			return [[0,1],[1,1],[2,1],[3,1]];
		}
		case Shapes.PYRAMID: { // [.:.]
			return [[0,1],[1,1],[1,0],[2,1]];
		}
		case Shapes.Z_L: { // [':.]
			return [[0,0],[1,1],[1,0],[2,1]];
		}
		case Shapes.Z_R: { // [.:']
			return [[0,1],[1,1],[1,0],[2,0]];
		}
		default: {
			return [[1,0],[1,1],[2,0],[2,1]];
		}
	}
}

function getRandomShape() {
	currentShape = Math.floor(Math.random()*7)
	return getInitialCoordinates(currentShape);
}

function getShapeColor(shape) {
	switch(shape) {
		case Shapes.SQUARE: { // [::]
			return "#bb2020";
		}
		case Shapes.L_L: { // [:..]
			return "#20bb20";
		}
		case Shapes.L_R: { // [..:]
			return "#2020bb";
		}
		case Shapes.TRUNK: { // [....]
			return "#bbbb20";
		}
		case Shapes.PYRAMID: { // [.:.]
			return "#bb20bb";
		}
		case Shapes.Z_L: { // [':.]
			return "#20bbbb";
		}
		case Shapes.Z_R: { // [.:']
			return "#009070";
		}
		default: {
			return "#d1d1d1";
		}
	}
}