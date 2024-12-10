
function prepareInput( input ) {

	input = input.split("").map(function(n){return parseInt(n,10);});

	return input;
}

function answer1( input ) {

	var id = 0,
		diskMap = [],
		isFile = true;
	for( var element of input ) {

		if( isFile ) {

			for( var i = 0; i < element; i++ ) {
				diskMap.push({
					type: 'file',
					id: id
				});
			}

			id++;
		} else {

			for( var i = 0; i < element; i++ ) {
				diskMap.push(0);
			}
		}

		isFile = ! isFile;
	}

	var emptySpaces = [];
	for( var i = 0; i < diskMap.length; i++ ) {
		if( diskMap[i] !== 0 ) continue;

		emptySpaces.push(i);
	}

	while( emptySpaces.length ){
		var emptySpaceIndex = emptySpaces.shift();

		var lastElement;
		do {
			lastElement = diskMap.pop();
		} while(lastElement === 0 );

		diskMap[emptySpaceIndex] = lastElement;

	}

	diskMap = diskMap.filter(function(){return true;}); // reset indexes

	var checksum = 0;

	for( var i = 0; i < diskMap.length; i++ ) {

		if( diskMap[i] === 0 ) continue;

		checksum += diskMap[i].id*i;
	}

	return checksum;
}

function answer2( input ) {
	
	var id = 0,
		diskMap = [],
		isFile = true;
	for( var element of input ) {

		if( isFile ) {

			diskMap.push({
				type: 'file',
				id: id,
				length: element
			});

			id++;
		} else {

			diskMap.push({
				type: 'free',
				length: element
			})

		}

		isFile = ! isFile;
	}


	for( var l = id-1; l > 0; l-- ) {

		var lastElement;
		for( var lastElementIndex = diskMap.length-1; lastElementIndex > 0; lastElementIndex-- ) {
			lastElement = diskMap[lastElementIndex];

			if( lastElement.type === 'free' ) continue;

			if( lastElement.id !== l )  continue;

			break;

		}

		for( var freeSpaceIndex = 0; freeSpaceIndex < diskMap.length; freeSpaceIndex++ ) {

			var freeElement = diskMap[freeSpaceIndex];

			if( freeElement.type !== 'free' ) continue;

			if( lastElement.length > freeElement.length ) continue;

			if( freeSpaceIndex > lastElementIndex ) continue;

			diskMap[freeSpaceIndex].length = freeElement.length-lastElement.length; // previous free space is now smaller

			diskMap.splice(lastElementIndex, 1, {
				type: 'free',
				length: lastElement.length
			}); // replace old element with free space

			diskMap.splice( freeSpaceIndex, 0, lastElement ); // insert lastElement at new Position

			break;
		}

	}

	var checksum = 0,
		index = 0;

	while( diskMap.length ) {
		var element = diskMap.shift();

		if( element.type !== 'free' ) {
			for( var i = 0; i < element.length; i++ ) {
				checksum += element.id*index;
				index++;
			}
		} else {
			index += element.length;
		}


	}

	return checksum;
}
