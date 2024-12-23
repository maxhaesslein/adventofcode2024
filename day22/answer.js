
function prepareInput( input ) {

	input = input.split("\n").map(function(n){
		return BigInt(parseInt(n,10));
	});

	return input;
}

function answer1( input ) {

	var count = 2000;

	var sum = 0;

	if( Number(input[0]) === 123 ) count = 10; // for testinput 1 (1)

	for( var number of input ) {
		var secretNumber = number;
		for( var i = 0; i < count; i++ ) {
			secretNumber = evolveSecretNumber(secretNumber);
		}
		sum += Number(secretNumber);
	}


	return sum;
}

function answer2( input ) {
	return "?";
}


function evolveSecretNumber(secretNumber) {
	
	var step1Result = secretNumber * 64n;
	secretNumber = secretNumber ^ step1Result;
	secretNumber = secretNumber % 16777216n;

	var step2Result = secretNumber / 32n;
	secretNumber = secretNumber ^ step2Result;
	secretNumber = secretNumber % 16777216n;

	var step3Result = secretNumber * 2048n;
	secretNumber = secretNumber ^ step3Result;
	secretNumber = secretNumber % 16777216n;

	return secretNumber;
}
