
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
	return "?";
}


function move( map, source, direction ) {

	/*
	console.info('--');
	console.log('move',source,'(',map[source[1]][source[0]],') in direction',direction);
	for( var y = 0; y < map.length; y++ ) {
		console.log(map[y].join(''));
	}
	*/

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
		if( move( map, [target[0], target[1]], direction ) !== false ) {
			targetTile = '.'; // targetTile is now considered empty
		} else {
			return false;
		}
	}

	if( targetTile === '.' ) {
		// target is empty, move
		map[source[1]][source[0]] = '.';
		map[target[1]][target[0]] = sourceTile;
		return [target[0], target[1]];
	}

	return false;
}
