
function prepareInput( input ) {

	input = input.split("\n").map(function(l){
		return l.split('').map(function(n){
			if( n === 'A' ) return 'A';
			return parseInt(n,10);
		});
	});

	return input;
}

function answer1( codes ) {

	/*
	789
	456
	123
	X0A
	*/
	var keypad = {
		"0": [1,3],
		"1": [0,2],
		"2": [1,2],
		"3": [2,2],
		"4": [0,1],
		"5": [1,1],
		"6": [2,1],
		"7": [0,0],
		"8": [1,0],
		"9": [2,0],
		"A": [2,3]
	}

	/*
	X^A
	<v>
	*/
	var directionalKeypad = [
		"^": [1,0],
		"<": [0,1],
		"v": [1,1],
		">": [2,1],
		"A": [2,0]
	];


	

	console.log(codes)

	return "?";
}

function answer2( codes ) {
	return "?";
}
