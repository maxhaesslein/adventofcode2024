
function prepareInput( input ) {

	input = input.split("\n");

	input = input.map(function(l){
		return l.split("");
	});

	return input;
}

function answer1( map ) {

	var frequencies = getFrequencies(map);

	var antinodePositions = [];

	for( var [frequency, positions] of Object.entries(frequencies) ) {
		
		while( positions.length ) {
			var position = positions.shift();

			for( var otherPosition of positions ) {

				var distance = [ position[0]-otherPosition[0], position[1]-otherPosition[1] ];

				var target1 = [position[0] + distance[0], position[1] + distance[1]];
				if( map[target1[1]] && map[target1[1]][target1[0]] ) {
					var antinodePosition = target1[0]+'/'+target1[1];
					if( ! antinodePositions.includes(antinodePosition) ) antinodePositions.push(antinodePosition);
				}

				var target2 = [otherPosition[0] - distance[0], otherPosition[1] - distance[1]];
				if( map[target2[1]] && map[target2[1]][target2[0]] ) {
					var antinodePosition = target2[0]+'/'+target2[1];
					if( ! antinodePositions.includes(antinodePosition) ) antinodePositions.push(antinodePosition);
				}
				
			}

		}

	}

	return antinodePositions.length;
}

function answer2( map ) {
	return "?";
}

function getFrequencies(map) {

	var frequencies = {};

	for( var y = 0; y < map.length; y++ ) {
		for( var x = 0; x < map[y].length; x++ ) {
			if( map[y][x] == '.' ) continue;

			var frequency = map[y][x];

			if( ! Array.isArray(frequencies[frequency]) ) frequencies[frequency] = [];

			frequencies[frequency].push([x,y]);
			
		}
	}

	return frequencies;
}
