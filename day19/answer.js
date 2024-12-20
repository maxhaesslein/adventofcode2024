
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
	return "?";
}
