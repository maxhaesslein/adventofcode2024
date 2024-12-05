
function prepareInput( input ) {

	input = input.split("\n\n");

	var pageOrderingRules = input[0].split('\n').map(function(l){
		return l.split('|').map(function(n){
			return parseInt(n,10);
		});
	});

	var updates = input[1].split('\n').map(function(l){
		return l.split(',').map(function(n){
			return parseInt(n,10);
		})
	});


	return {
		'pageOrderingRules': pageOrderingRules,
		'updates': updates
	};
}

function answer1( input ) {

	var pageOrderingRules = input.pageOrderingRules,
		updates = input.updates;

	var correctUpdates = [];

	for( var pages of updates ){

		var isCorrect = true;

		for( var page of pages ) {
			if( ! checkCorrectOrdering( page, pages, pageOrderingRules) ) {
				isCorrect = false;
				break;
			}
		}

		if( isCorrect ) {
			correctUpdates.push(pages);
		}

	}

	var sum = 0;

	for( var correctUpdate of correctUpdates ) {
		var middleNumber = correctUpdate[Math.floor(correctUpdate.length/2)];
		sum += middleNumber;
	}

	return sum;
}


function answer2( input ) {
	
	var pageOrderingRules = input.pageOrderingRules,
		updates = input.updates;

	var incorrectUpdates = [];
	for( var pages of updates ){
		for( var page of pages ) {
			if( ! checkCorrectOrdering( page, pages, pageOrderingRules) ) {
				isCorrect = false;
				incorrectUpdates.push(pages);
				break;
			}
		}
	}


	var correctedUpdates = [];
	for( var incorrectUpdate of incorrectUpdates ) {
		var correctedUpdate = incorrectUpdate.sort(function(a,b){

			for( var p of pageOrderingRules ) {
				if( p[0] === a && p[1] === b ) {
					// a before b
					return -1;
				} else if( p[0] === b && p[1] === a ) {
					// b before a
					return 1;
				}
			}

			return 0;

		});
		correctedUpdates.push(correctedUpdate);
	}


	var sum = 0;

	for( var correctedUpdate of correctedUpdates ) {
		var middleNumber = correctedUpdate[Math.floor(correctedUpdate.length/2)];
		sum += middleNumber;
	}

	return sum;
}


function checkCorrectOrdering( page, pages, pageOrderingRules ) {

	for( var p of pageOrderingRules ) {

		if( page == p[0] ) {
			var mustBeBefore = p[1];

			var isBefore = false;
			for( checkPage of pages ) {
				if( checkPage === page ) {
					isBefore = true;
				} else if( checkPage === mustBeBefore && ! isBefore ) {
					if( pages.includes(mustBeBefore) ) {
						return false;
					}
				}
			}


		} else if( page == p['1'] ) {
			var mustBeAfter = p[0];

			var isAfter = false;
			for( checkPage of pages ) {
				if( checkPage === mustBeAfter ) {
					isAfter = true;
				} else if( checkPage === page && ! isAfter ) {
					if( pages.includes(mustBeAfter) ) {
						return false;
					}
				}
			}

		}

	}

	return true;
}