
function prepareInput( input ) {

	input = input.split("\n");

	input = input.map(function(l){
		return l.split('');
	});

	return input;
}

function answer1( input ) {

	var map = input;

	var xmasSum = 0;

	for( y = 0; y < map.length; y++ ) {
		for( x = 0; x < map[y].length; x++ ) {
			
			if( ! checkForLetter(map,x,y,'X') ) continue;
			
			// check left
			if( checkInDirection( map, x, y, -1, 0 ) ) xmasSum++;

			// check right
			if( checkInDirection( map, x, y, +1, 0 ) ) xmasSum++;

			// check top
			if( checkInDirection( map, x, y, 0, -1 ) ) xmasSum++;

			// check bottom
			if( checkInDirection( map, x, y, 0, +1 ) ) xmasSum++;

			// check left top
			if( checkInDirection( map, x, y, -1, -1 ) ) xmasSum++;

			// check right top
			if( checkInDirection( map, x, y, +1, -1 ) ) xmasSum++;

			// check left bottom
			if( checkInDirection( map, x, y, -1, +1 ) ) xmasSum++;

			// check right bottom
			if( checkInDirection( map, x, y, +1, +1 ) ) xmasSum++;

		}
	}

	return xmasSum;
}


function answer2( input ) {
	var map = input;

	var xmasSum = 0;

	for( y = 0; y < map.length; y++ ) {
		for( x = 0; x < map[y].length; x++ ) {
			
			if( ! checkForLetter(map,x,y,'A') ) continue;
			
			// left top to right bottom
			if( ( checkForLetter( map, x-1, y-1, 'M') && checkForLetter( map, x+1, y+1, 'S') )
			||  ( checkForLetter( map, x-1, y-1, 'S') && checkForLetter( map, x+1, y+1, 'M') )
			) {
				// and right top to left bottom
				if( ( checkForLetter( map, x+1, y-1, 'M') && checkForLetter( map, x-1, y+1, 'S') )
				||  ( checkForLetter( map, x+1, y-1, 'S') && checkForLetter( map, x-1, y+1, 'M') )
				) {
					xmasSum++;
				}
			}

		
		}
	}

	return xmasSum;
}


function checkInDirection( map, x, y, xDif, yDif ) {

	var nextLetters = ['M','A','S'];

	while( nextLetters.length ){
		var nextLetter = nextLetters.shift();

		x += xDif;
		y += yDif;

		if( ! checkForLetter(map,x,y, nextLetter) ) {
			return false;
		}

	}

	return true;
}


function checkForLetter( map, x, y, letter ) {

	if( ! map[y] ) return false;
	if( ! map[y][x] ) return false;

	return( map[y][x] === letter );
}
