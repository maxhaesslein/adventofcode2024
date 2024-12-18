
function prepareInput( input ) {

	var machines = input.split("\n\n");

	machines = machines.map(function(m){
		m = m.split("\n");

		var a = m[0].split(':')[1].trim().split(', ').map(function(n){
				n = n.replace('X+','').replace('Y+','');
				return parseInt(n,10);
			}),
			b = m[1].split(':')[1].trim().split(', ').map(function(n){
				n = n.replace('X+','').replace('Y+','');
				return parseInt(n,10);
			}),
			p = m[2].split(':')[1].trim().split(', ').map(function(n){
				n = n.replace('X=','').replace('Y=','');
				return parseInt(n,10);
			});

		var machine = {
			a: a,
			b: b,
			p: p
		};

		return machine;
	});

	return machines;
}

function answer1( machines ) {

	var costA = 3,
		costB = 1,
		maxPresses = 100;

	var cost = 0;

	for( var machine of machines ) {

		var aPresses = (machine.p[0]*machine.b[1] - machine.p[1]*machine.b[0]) / (machine.a[0]*machine.b[1] - machine.a[1]*machine.b[0]),
			bPresses = (machine.a[0]*machine.p[1] - machine.a[1]*machine.p[0]) / (machine.a[0]*machine.b[1] - machine.a[1]*machine.b[0]);

		if( aPresses%1 !== 0 || bPresses%1 !== 0 ) continue;

		if( aPresses > maxPresses || bPresses > maxPresses ) {
			console.warn('more than',maxPresses,'for',machine)
			continue;
		}

		cost += aPresses*costA + bPresses*costB;

	}

	return cost;
}

function answer2( machines ) {
	
	var costA = 3,
		costB = 1,
		additionalDistance = 10000000000000;

	for( var i = 0; i < machines.length; i++ ) {
		machines[i].p[0] += additionalDistance;
		machines[i].p[1] += additionalDistance;
	}

	var cost = 0;

	for( var machine of machines ) {

		var aPresses = (machine.p[0]*machine.b[1] - machine.p[1]*machine.b[0]) / (machine.a[0]*machine.b[1] - machine.a[1]*machine.b[0]),
			bPresses = (machine.a[0]*machine.p[1] - machine.a[1]*machine.p[0]) / (machine.a[0]*machine.b[1] - machine.a[1]*machine.b[0]);

		if( aPresses%1 !== 0 || bPresses%1 !== 0 ) continue;

		cost += aPresses*costA + bPresses*costB;

	}

	return cost;
}
