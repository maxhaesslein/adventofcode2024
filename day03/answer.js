
function prepareInput( input ) {

	input = input.trim();

	return input;
}

function answer1( input ) {

	var instructions = [...input.matchAll(/mul\([0-9]{1,3},[0-9]{1,3}\)/g)];

	var sum = 0;

	for( var instruction of instructions ) {
		
		instruction = instruction[0];

		var numbers = instruction.replace('mul(','').replace(')', '').split(',').map(function(n){
			return parseInt(n, 10);
		});

		sum += numbers[0]*numbers[1];
	}

	return sum;
}

function answer2( input ) {

	var instructions = [...input.matchAll(/(mul\([0-9]{1,3},[0-9]{1,3}\)|don\'t\(\)|do\(\))/g)];

	var sum = 0,
		active = true;

	for( var instruction of instructions ) {

		instruction = instruction[0];

		if( instruction == 'do()' ) {
			active = true;
		} else if( instruction == "don't()" ) {
			active = false;
		} else {
			var numbers = instruction.replace('mul(','').replace(')', '').split(',').map(function(n){
				return parseInt(n, 10);
			});

			if( active ) {
				sum += numbers[0]*numbers[1];
			}
		}
	}

	return sum;
}
