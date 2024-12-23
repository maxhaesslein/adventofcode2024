
function prepareInput( input ) {

	input = input.split("\n\n");

	var patterns = input[0].split(', ');
	var designs = input[1].split("\n");

	return {
		patterns: patterns,
		designs: designs
	};
}

function answer1( input ) {

	var patterns = input.patterns,
		designs = input.designs;

	var possibleDesigns = 0;

	// this was my first idea and it is so dumb, it worked :)
	var regex = new RegExp('^('+patterns.join('|')+')+$');

	for( var design of designs ) {
		if( regex.test(design) ) {
			possibleDesigns++;
		}
	}

	return possibleDesigns;
}

function answer2( input ) {

	cache = {}; // always reset the cache, d'uh ...

	var patterns = input.patterns,
		designs = input.designs;

	var sum = 0n;

	for( var design of designs ) {
		sum += getNumberOfArrangements( design, patterns );
	}

	return sum;
}


var cache = {};

function getNumberOfArrangements( design, patterns ) {

	if( cache[design] ) {
		return cache[design];
	}

	var sum = 0n;

	for( pattern of patterns ) {

		if( ! design.startsWith(pattern) ) {
			continue;
		}

		var newDesign = design.substring(pattern.length);

		if( newDesign.length <= 0 ) {
			sum++;
			break;
		}

		sum += getNumberOfArrangements( newDesign, patterns );

	}

	cache[design] = sum;

	return sum;
}
