
function prepareInput( input ) {

	input = input.split("\n");

	input = input.map(function(l){
		return l.split('');
	});

	return input;
}

function answer1( input ) {

	var map = input;

	var curX, curY;
	for( var y = 0; y < map.length; y++ ) {
		for( var x = 0; x < map[y].length; x++ ) {

			if( map[y][x] != '^' ) continue;

			curX = x,
			curY = y;

			break;

		}
	}

	map[curY][curX] = 'X';

	var dir = 0; // 0: top, 1: right, 2: down, 3: left

	while( true ) {

		var x = curX,
			y = curY;

		if( dir === 0 ) {
			y--;
		} else if( dir === 1 ) {
			x++;
		} else if( dir === 2 ) {
			y++;
		} else if( dir === 3 ) {
			x--;
		}

		if( y < 0 || y >= map.length ) {
			break;
		} else if( x < 0 || x >= map[y].length ) {
			break;
		}

		if( map[y][x] === '#' ) {
			dir++;
			if( dir >= 4 ) dir = 0;

			x = curX;
			y = curY;
		}

		map[y][x] = 'X';

		curX = x;
		curY = y;

	}


	var sum = 0;

	for( var y = 0; y < map.length; y++ ) {
		for( var x = 0; x < map[y].length; x++ ) {
			if( map[y][x] === 'X' ) {
				sum++;
			}
		}
	}

	return sum;
}


function answer2( input ) {

	return "?";
}
