
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

	console.log(cache)

	return sum;
}


var cache = {};

function getNumberOfArrangements( design, patterns ) {

	var hash = simpleHash(design);

	if( cache[hash] ) {
		return cache[hash];
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

	cache[hash] = sum;

	return sum;
}


// a very simple hash function by jlevy, found here: https://gist.github.com/jlevy/c246006675becc446360a798e2b2d781
const simpleHash = str => {
	let hash = 0;
	for (let i = 0; i < str.length; i++) {
		const char = str.charCodeAt(i);
		hash = (hash << 5) - hash + char;
	}
	// Convert to 32bit unsigned integer in base 36 and pad with "0" to ensure length is 7.
	return (hash >>> 0).toString(36).padStart(7, '0');
};
