
function prepareInput( input ) {

	input = input.split("\n");

	var arr1 = [],
		arr2 = [];

	for( var line of input ) {
		line = line.split(' ');
		line = line.filter(function(el) {
			return el != '';
		});
		line = line.map(function(el){
			return parseInt(el,10);
		});

		if( line.length < 2 ) {
			console.warn('line error', line)
		}

		arr1.push(line[0]);
		arr2.push(line[1]);

	}

	arr1 = arr1.sort();
	arr2 = arr2.sort();

	console.log(arr1);
	console.log(arr2)

	return [arr1,arr2];
}

function answer1( input ) {

	var sum = 0;

	var arr1 = input[0],
		arr2 = input[1];

	for( var i = 0; i < arr1.length; i++ ) {

		var diff = arr1[i] - arr2[i];

		diff = Math.abs(diff)

		sum += diff;

	}

	return sum;
}

function answer2( input ) {
	var sum = 0;

	var arr1 = input[0],
		arr2 = input[1];

	for( var i = 0; i < arr1.length; i++ ) {

		var number = arr1[i];

		var occ = 0;

		for( var test of arr2 ) {
			if( number === test ) occ++;

			if( test > number ) break;
		}

		sum += number * occ;

	}

	return sum;
}
