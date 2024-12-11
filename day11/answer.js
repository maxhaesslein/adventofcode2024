
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

	var maxN = 75;

	var numberOfStones = 0;

	for( var stone of stones ) {
		numberOfStones += simulateStone(stone, 0, maxN);
	}

	return numberOfStones;
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


var cache = {};

function simulateStone( stone, currentN, maxN ) {

	var cacheId = ""+currentN+'/'+stone;

	if( cache[cacheId] !== undefined ) {
		return cache[cacheId];
	}

	var stone2 = false;

	if( stone === 0 ) {
		stone = 1;
	} else if( ((stone+"").length)%2 == 0 ) {
		stone = stone+"";
		var half = stone.length/2;

		stone2 = parseInt(stone.slice(half, stone.length), 10);
		stone = parseInt(stone.slice(0, half), 10);

	} else {
		stone *= 2024;
	}

	var numberOfStones = 1;


	if( currentN < maxN ) {
		// simulate next step

		numberOfStones = simulateStone( stone, (currentN+1), maxN );

		if( stone2 !== false ) {
			numberOfStones += simulateStone( stone2, (currentN+1), maxN );
		}

	}

	cache[cacheId] = numberOfStones;

	return numberOfStones;
}
