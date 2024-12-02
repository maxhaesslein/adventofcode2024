
function prepareInput( input ) {

	input = input.split("\n");

	input = input.map(function(line){
		return line.split(" ").map(function(e){
			return parseInt(e, 10);
		});
	});

	return input;
}

function answer1( input ) {
	
	var safeSum = 0;

	for( var report of input ) {

		if( reportInvalid(report) ) {
			continue;
		}

		safeSum++;

	}

	return safeSum;
}

function answer2( input ) {
	
	var safeSum = 0;

	for( var report of input ) {

		var invalidAtPosition = reportInvalid(report);

		if( invalidAtPosition ) {
			// original report is invalid. try again without number at position x and x-1

			var skip = true;

			newReport = report.toSpliced(invalidAtPosition-1, 1);
			if( ! reportInvalid( newReport ) ) {
				// no longer invalid!
				skip = false;
			}

			if( skip ) {
				newReport = report.toSpliced(invalidAtPosition, 1);
				if( ! reportInvalid( newReport ) ) {
					// no longer invalid!
					skip = false;
				}
			}

			if( skip ) {
				// still invalid after checking x and x-1;
				// but ... maybe the first element is the edge case, for example: 3 1 2 3 4
				newReport = report.toSpliced(0, 1);
				if( reportInvalid(newReport) ) {
					// still invalid, skip
					continue;
				}

			}

		}

		safeSum++;

	}

	return safeSum;
}

function reportInvalid( report ) {

	var lastDir = false,
		skip = false;

	for( var i = 0; i < report.length-1; i++ ) {

		var check = checkNextLevel(report[i], report[i+1]),
			success = check[0],
			direction = check[1];

		if( ! success ) {
			return i+1;
		}

		if( lastDir && direction != lastDir ) {
			return i+1;
		}

		lastDir = direction;

	}

	return false;
}

function checkNextLevel( level, nextLevel ) {

	if( level === nextLevel) {
		return [false, false];
	} else if( level > nextLevel ) {
		// desc
		if( level - nextLevel > 3 ) {
			return [false, "desc"];
		}
		return [true, "desc"];
	} else {
		// asc
		if( nextLevel - level > 3 ) {
			return [false, "asc"];
		}
		return [true, "asc"];
	}

}

