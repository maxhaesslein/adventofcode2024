
function prepareInput( input ) {

	input = input.split("\n");

	input = input.map(function(l){
		return l.split('');
	});

	return input;
}

function answer1( input ) {

	var map = input;

	var start = getStartPosition(map);

	var curX = start[0],
		curY = start[1];

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


function getStartPosition( map ) {

	for( var y = 0; y < map.length; y++ ) {
		for( var x = 0; x < map[y].length; x++ ) {

			if( map[y][x] != '^' ) continue;

			return [x, y];
		}
	}

	return false;
}


function answer2( input ) {

	var map = input;

	var start = getStartPosition(map);

	var sum = 0;

	for( var y = 0; y < map.length; y++ ) {
		for( var x = 0; x < map[y].length; x++ ) {

			if( map[y][x] === '#' || map[y][x] === '^' ) {
				continue;
			}

			if( loop(x, y, start, map) ) {
				sum++;
			}

		}
		
		if( y%10 === 0 ) {
			console.log('testing', y+'/'+(map.length-1) );
		}

	}

	return sum;
}


function loop( obstacleX, obstacleY, start, map ) {

	var curX = start[0],
		curY = start[1];

	var dir = 0; // 0: top, 1: right, 2: down, 3: left

	var visitedMap = Array.from({ length: map.length }, function(){
		return Array(map[0].length);
	});

	visitedMap[curY][curX] = [dir];


	originalTileAtObstacle = map[obstacleY][obstacleX];
	map[obstacleY][obstacleX] = '#'; // place obstacle


	var isLoop = false;

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
		} else if( Array.isArray(visitedMap[y][x]) && visitedMap[y][x].includes(dir) ) {
			// loop detected, we visited this map tile with this direction before!
			isLoop = true;
			break;
		}

		if( ! Array.isArray(visitedMap[y][x]) ) visitedMap[y][x] = [];
		visitedMap[y][x].push(dir);

		curX = x;
		curY = y;

	}


	map[obstacleY][obstacleX] = originalTileAtObstacle;

	return isLoop;
}
