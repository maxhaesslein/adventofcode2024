
function prepareInput( input ) {

	input = input.split("\n");

	input = input.map(function(l){

		l = l.split(' ');

		var pos = l[0].replace('p=','').split(',').map(function(n){
			return parseInt(n,10);
		});

		var vel = l[1].replace('v=','').split(',').map(function(n){
			return parseInt(n,10);
		});

		return {
			position: pos,
			velocity: vel
		}
	});

	return input;
}

function answer1( input ) {

	var w = 101,
		h = 103;

	if( input.length < 15 ) {
		// NOTE: our test case has a smaller sized map
		w = 11;
		h = 7;
	}

	var maxN = 100;

	for( var n = 0; n < maxN; n++ ) {
		simulate(input, w, h);
	}

	var map = Array.from({ length: h }, function(){
		return Array.from({ length: w }, function(){
			return 0;
		});
	});

	for( var robot of input ) {

		var x = robot.position[0],
			y = robot.position[1];

		map[y][x]++;
	}


	var quadrant1 = 0,
		quadrant2 = 0,
		quadrant3 = 0,
		quadrant4 = 0;

	for( var y = 0; y < h; y++ ) {
		for( var x = 0; x < w; x++ ) {
			if( map[y][x] <= 0 ) continue;

			var count = map[y][x];

			if( x < Math.floor(w/2) && y < Math.floor(h/2) ) {
				quadrant1 += count;
			} else if( x > Math.floor(w/2) && y < Math.floor(h/2) ) {
				quadrant2 += count;
			} else if( x < Math.floor(w/2) && y > Math.floor(h/2) ) {
				quadrant3 += count;
			} else if( x > Math.floor(w/2) && y > Math.floor(h/2) ) {
				quadrant4 += count;
			}
			
		}
	}

	var safetyFactor = quadrant1*quadrant2*quadrant3*quadrant4;

	return safetyFactor;
}

function answer2( input ) {

	var w = 101,
		h = 103;

	if( input.length < 15 ) {
		// NOTE: our test case has a smaller sized map
		w = 11;
		h = 7;
	}

	var canvas = document.getElementById('canvas'),
		ctx = canvas.getContext('2d');

	canvas.width = w;
	canvas.height = h;

	var n = 0;

	// lets just assume, we want to have a lot of particles in the middle area of the image
	var maxParticles = 300,
		middleArea = [];

	var emergencyBreak = 0;

	do {

		middleArea = [];

		simulate( input, w, h );

		n++;

		for( var robot of input ) {

			var x = robot.position[0],
				y = robot.position[1];

			if( 
				x > Math.floor(w/4) && x < Math.floor(w*3/4) &&
				y > Math.floor(h/4) && y < Math.floor(h*3/4) 
				) {
				middleArea.push(y);
			}

		}

		// in case something goes wrong ...
		emergencyBreak++;
		if( emergencyBreak > 10000 ) {
			console.warn('emergency break');
			break;
		}

	} while( middleArea.length < maxParticles );

	ctx.clearRect(0,0,w,h);

	for( var robot of input ) {

		var x = robot.position[0],
			y = robot.position[1];

		ctx.fillRect( x, y, 1, 1 );
		
	}

	return n+1;
}


function simulate(input, w, h) {

	for( var robot of input ) {
		
		robot.position[0] += robot.velocity[0];
		if( robot.position[0] >= w ) robot.position[0] -= w;
		else if( robot.position[0] < 0 ) robot.position[0] += w;

		robot.position[1] += robot.velocity[1];
		if( robot.position[1] >= h ) robot.position[1] -= h;
		else if( robot.position[1] < 0 ) robot.position[1] += h;

	}

}
