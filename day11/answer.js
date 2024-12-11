
function prepareInput( input ) {

	input = input.trim().split(" ").map(function(n){return parseInt(n,10);});

	return input;
}

function answer1( stones ) {

	var maxN = 25;

	for( var n = 0; n < maxN; n++ ) {
		stones = advanceSimulation(stones);
	}

	return stones.length;
}

function answer2( stones ) {
	return "uh-oh";
}


function advanceSimulation( stones ) {

	var newStones = [];

	for( var i = 0; i < stones.length; i++ ) {
		var stone = stones[i];
		
		if( stone === 0 ) {
			newStones.push(1);
		} else if( ((stone+"").length)%2 == 0 ) {
			stone = stone+"";
			var half = stone.length/2;

			newStones.push(parseInt(stone.slice(0, half), 10));
			newStones.push(parseInt(stone.slice(half, stone.length), 10));

		} else {
			newStones.push(stone*2024);
		}

	}

	return newStones;
}
