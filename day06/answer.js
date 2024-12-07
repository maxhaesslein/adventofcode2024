
function prepareInput( input ) {

	input = input.split("\n");

	input = input.map(function(l){
		return l.split('');
	});

	return input;
}

function answer1( input ) {

	map = getPath( input );

	var sum = 0;

	for( var y = 0; y < map.length; y++ ) {
		for( var x = 0; x < map[y].length; x++ ) {
			if( map[y][x] === undefined ) continue;
			
			sum++;
		}
	}

	return sum;
}


function answer2( map ) {

	// we only need to place obstacles on the original path the guard took, no need to place an obstacle where the guard will never be
	var originalPath = getPath( map );

	var sum = 0;

	for( var y = 0; y < originalPath.length; y++ ) {
		for( var x = 0; x < originalPath[y].length; x++ ) {

			if( originalPath[y][x] === undefined ) continue;

			// no need to simulate all the steps that lead up to this obstacle, start at the previous position right before the new obstacle
			var originalDirection = originalPath[y][x],
				start = [x,y];
			if( originalDirection === 0 ) {
				start[1]++;
			} else if( originalDirection === 1 ) {
				start[0]--;
			} else if( originalDirection === 2 ) {
				start[1]--;
			} else if( originalDirection === 3 ) {
				start[0]++;
			}

			if( loop(x, y, start, map, originalDirection) ) {
				sum++;
			}

		}
		
		if( (y+9)%10 === 0 ) {
			console.log('testing', (y+9)+'/'+originalPath.length );
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


function getPath( map ) {

	var start = getStartPosition(map);

	var visitedMap = Array.from({ length: map.length }, function(){
		return Array(map[0].length);
	});

	var curX = start[0],
		curY = start[1],
		dir = 0; // 0: top, 1: right, 2: down, 3: left

	visitedMap[curY][curX] = dir;

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

		if( visitedMap[y][x] === undefined ) visitedMap[y][x] = dir; // record the direction we entered this tile with, but only the first time we encounter it

		curX = x;
		curY = y;

	}

	return visitedMap;
}


function loop( obstacleX, obstacleY, start, map, dir ) {

	var curX = start[0],
		curY = start[1];

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
