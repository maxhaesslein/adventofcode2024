
function prepareInput( input ) {

	input = input.split("\n");

	input = input.map(function(l){
		l = l.split(': ');

		return {
			'answer': parseInt(l[0],10),
			'numbers': l[1].split(' ').map(function(n){
				return parseInt(n,10);
			})
		};
	});

	return input;
}

function answer1( input ) {
	
	var sum = 0;

	for( var line of input ) {

		if( testEquations(line.answer, line.numbers, ['+','*']) ) {
			sum += line.answer;
		}

	}

	return sum;
}

function answer2( input ) {
	
	var sum = 0;

	for( var line of input ) {

		if( testEquations(line.answer, line.numbers, ['+','*','||']) ) {
			sum += line.answer;
		}

	}

	return sum;
}


function testEquations( answer, numbers, operators ){

	var firstNumber = numbers.shift(),
		secondNumber = numbers.shift();

	for( operator of operators ) {

		var result;

		if( operator == '+' ) {
			result = firstNumber+secondNumber;
		} else if( operator == '*' ) {
			result = firstNumber*secondNumber;
		} else if( operator == '||' ) {
			result = parseInt(firstNumber+""+secondNumber, 10);
		}

		if( numbers.length ) {
			if( testEquations( answer, [result, ...numbers], operators ) ) {
				return true;
			}
		} else {
			if( result === answer ) {
				return true;
			}
		}

	}

	return false;
}
