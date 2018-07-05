var Shapes = {"SQUARE":0, "L_L":1, "L_R":2, "TRUNK":3, "PYRAMID":4, "Z_L":5, "Z_R":6 }
Object.freeze(Shapes);

function getInitialCoordinates(shape) {
	//coordinates that build the shape. (4x2 square components)
	switch(shape) {
		case Shapes.SQUARE: { // [::]
			return [[1,1],[1,0],[2,1],[2,0]];
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

function generateNextAndCurrentShape() {
	if(nextShape == null) nextShape = Math.floor(Math.random()*7);
	currentShape = nextShape;
	nextShape = Math.floor(Math.random()*7);
}
function getShapeCoordinates(shape) {
	return getInitialCoordinates(shape);
}

function getShapeColor(shape) {
	switch(shape) {
		case Shapes.SQUARE: { // [::]
			//return "#bb2020";
			return 0;
		}
		case Shapes.L_L: { // [:..]
			//return "#20bb20";
			return 1;
		}
		case Shapes.L_R: { // [..:]
			//return "#2020bb";
			return 2;
		}
		case Shapes.TRUNK: { // [....]
			//return "#bbbb20";
			return 3;
		}
		case Shapes.PYRAMID: { // [.:.]
			//return "#bb20bb";
			return 4;
		}
		case Shapes.Z_L: { // [':.]
			//return "#20bbbb";
			return 5;
		}
		case Shapes.Z_R: { // [.:']
			//return "#009070";
			return 5;
		}
		default: {
			return "#000000";
		}
	}
}