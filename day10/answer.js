
function prepareInput( input ) {

	input = input.split("\n");

	input = input.map(function(l){
		return l.split('').map(function(n){
			return parseInt(n,10);
		});
	});

	return input;
}

function answer1( map ) {

	var completedPaths = [];

	for( var y = 0; y < map.length; y++ ) {
		for( var x = 0; x < map[y].length; x++ ) {
			var number = map[y][x];
			if( number !== 0 ) continue;
			
			paths = getPath(map,x,y,0);

			paths = Array.from(new Set(paths)); // remove duplicates

			completedPaths = completedPaths.concat(paths);

		}
	}

	return completedPaths.length;
}

function answer2( map ) {
	
	var completedPaths = [];

	for( var y = 0; y < map.length; y++ ) {
		for( var x = 0; x < map[y].length; x++ ) {
			var number = map[y][x];
			if( number !== 0 ) continue;
			
			paths = getPath(map,x,y,0);

			completedPaths = completedPaths.concat(paths);

		}
	}

	return completedPaths.length;
}

function getPath( map, x, y, currentNumber  ){

	currentNumber++;

	var completedPaths = [];

	// check top
	if( map[y-1] && map[y-1][x] && map[y-1][x] == currentNumber ) {
		if( currentNumber === 9 ) {
			completedPaths.push(x+'/'+(y-1));
		} else {
			completedPaths = completedPaths.concat(getPath( map, x, y-1, currentNumber, [x+'/'+(y-1) ] ));
		}
	}

	// check right
	if( map[y] && map[y][x+1] && map[y][x+1] == currentNumber ) {
		if( currentNumber === 9 ) {
			completedPaths.push((x+1)+'/'+y);
		} else {
			completedPaths = completedPaths.concat(getPath( map, x+1, y, currentNumber, [(x+1)+'/'+y ] ));
		}
	}

	// check bottom
	if( map[y+1] && map[y+1][x] && map[y+1][x] == currentNumber ) {
		if( currentNumber === 9 ) {
			completedPaths.push(x+'/'+(y+1));
		} else {
			completedPaths = completedPaths.concat(getPath( map, x, y+1, currentNumber, [x+'/'+(y+1) ] ));
		}
	}

	// check left
	if( map[y] && map[y][x-1] && map[y][x-1] == currentNumber ) {
		if( currentNumber === 9 ) {
			completedPaths.push((x-1)+'/'+y);
		} else {
			completedPaths = completedPaths.concat(getPath( map, x-1, y, currentNumber, [(x-1)+'/'+y ] ));
		}
	}

	return completedPaths;
}
