
function prepareInput( input ) {

	input = input.split("\n\n");

	var map = input[0].split('\n').map(function(l){
		return l.split('');
	});

	var instructions = input[1].replace('\n','').split('');

	return {
		map: map,
		instructions: instructions
	};
}

function answer1( input ) {

	var map = input.map,
		instructions = input.instructions,
		robot = false;

	for( var y = 0; y < map.length; y++ ) {
		for( var x = 0; x < map[y].length; x++ ) {
			if( map[y][x] !== '@' ) continue;

			robot = [x,y];
			break;
		}
	}

	for( var instruction of instructions ) {
		var newPos = move( map, robot, instruction );
		if( newPos !== false ) {
			robot = newPos;
		}
	}


	var sum = 0;

	for( var y = 0; y < map.length; y++ ) {
		for( var x = 0; x < map[y].length; x++ ) {
			if( map[y][x] !== 'O' ) continue;

			sum += y*100+x;
		}
	}

	return sum;
}

function answer2( input ) {

	var map = [];

	for( var y = 0; y < input.map.length; y++ ) {
		map.push([]);
		for( var x = 0; x < input.map[y].length; x++ ) {

			var oldTile = input.map[y][x];

			if( oldTile === '#' ) {
				map[y].push('#');
				map[y].push('#');
			} else if( oldTile === 'O' ) {
				map[y].push('[');
				map[y].push(']');
			} else if( oldTile === '@' ) {
				map[y].push('@');
				map[y].push('.');
			} else {
				map[y].push('.');
				map[y].push('.');
			}

		}
	}


	var robot = false;

	for( var y = 0; y < map.length; y++ ) {
		for( var x = 0; x < map[y].length; x++ ) {
			if( map[y][x] !== '@' ) continue;

			robot = [x,y];
			break;
		}
	}


	for( var instruction of input.instructions ) {
		var newPos = move( map, robot, instruction );
		if( newPos !== false ) {
			robot = newPos;
		}
	}


	var sum = 0;

	for( var y = 0; y < map.length; y++ ) {
		for( var x = 0; x < map[y].length; x++ ) {
			if( map[y][x] !== '[' ) continue;

			sum += y*100+x;
		}
	}

	return sum;
}


function move( map, source, direction, testOnly ) {

	var sourceTile = map[source[1]][source[0]];

	var target = [source[0],source[1]];

	if( direction === '<' ) {
		target[0]--;
	} else if( direction === '>' ) {
		target[0]++;
	} else if( direction === '^' ) {
		target[1]--;
	} else if( direction === 'v' ) {
		target[1]++;
	}

	// we probably don't need this, because there are walls all around, but better sanity check:
	if( target[0] < 0 || target[0] >= map[target[1]].length ) return false;
	if( target[1] < 0 || target[1] >= map.length ) return false;

	var targetTile = map[target[1]][target[0]];

	if( targetTile === 'O' ) {
		// part 1
		if( move( map, [target[0], target[1]], direction, testOnly ) !== false ) {
			targetTile = '.'; // targetTile is now considered empty
		} else {
			return false;
		}
	} else if( targetTile === '[' || targetTile === ']' ) {
		// part 2

		var y = target[1],
			leftX = target[0],
			rightX = target[0];

		if( targetTile === '[' ) {
			rightX++;
		} else if( targetTile === ']' ) {
			leftX--;
		}

		if( direction === '<' ) {
			if( move(map, [leftX, y], direction, testOnly ) !== false ) {
				if( testOnly ) return true;
				map[y][leftX] = ']';
				map[y][rightX] = sourceTile;
				map[y][rightX+1] = '.';
				return [rightX, y];
			}
		} else if( direction === '>' ) {
			if( move(map, [rightX, y], direction, testOnly ) !== false ) {
				if( testOnly ) return true;
				map[y][rightX] = '[';
				map[y][leftX] = sourceTile;
				map[y][leftX-1] = '.';
				return [leftX, y];
			}
		} else if( direction === '^' || direction === 'v' ) {
			if( move(map, [leftX, y], direction, true ) !== false &&
				move(map, [rightX, y], direction, true ) !== false ) {

				if( testOnly ) return true;

				move( map, [leftX, y], direction, testOnly );
				move( map, [rightX, y], direction, testOnly );

				map[source[1]][source[0]] = '.';
				map[target[1]][target[0]] = sourceTile;
				return [target[0], target[1]];
			}
		}

	}

	if( targetTile === '.' ) {
		// target is empty
		
		if( testOnly ) return true;

		map[source[1]][source[0]] = '.';
		map[target[1]][target[0]] = sourceTile;
		return [target[0], target[1]];
	}

	return false;
}
