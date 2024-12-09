
function prepareInput( input ) {

	input = input.split("\n");

	input = input.map(function(l){
		return l.split("");
	});

	return input;
}

function answer1( input ) {

	var frequencies = getFrequencies(input);

	var antinodes = Array.from({ length: input.length }, function(){
		return Array(input[0].length);
	});


	for ( var [frequency, positions] of Object.entries(frequencies) ) {
		
		while( positions.length ) {
			var position = positions.shift();

			for( var otherPosition of positions ) {

				var distance = [ position[0]-otherPosition[0], position[1]-otherPosition[1] ];

				var target1 = [position[0] + distance[0], position[1] + distance[1]],
					target2 = [otherPosition[0] - distance[0], otherPosition[1] - distance[1]];

				if( input[target1[1]] && input[target1[1]][target1[0]] ) antinodes[target1[1]][target1[0]] = "X";
				if( input[target2[1]] && input[target2[1]][target2[0]] ) antinodes[target2[1]][target2[0]] = "X";

			}

		}

	}


	var sum = 0;
	for( var y = 0; y < antinodes.length; y++ ) {
		for( var x = 0; x < antinodes[y].length; x++ ) {
			if( antinodes[y][x] == "X" ) sum++;
		}
	}


	return sum;
}

function answer2( input ) {
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
