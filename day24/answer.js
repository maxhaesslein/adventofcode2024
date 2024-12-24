
function prepareInput( input ) {

	input = input.split("\n\n");


	var wires = {};
	for( var wire of input[0].split("\n") ) {
		wire = wire.split(': ');
		wires[wire[0]] = parseInt(wire[1],10);
	}

	var gates = [];
	for( var gateObj of input[1].split("\n") ) {

		gateObj = gateObj.split(' -> ');

		var inpEl = gateObj[0].split(' '),
			out = gateObj[1];

		var type = inpEl[1],
			inp = [inpEl[0], inpEl[2]];

		gates.push({
			input: inp,
			type: type,
			output: out
		});
	}

	return {
		wires: wires,
		gates: gates
	};
}

function answer1( input ) {

	var wires = input.wires,
		gates = input.gates;

	var emergencyCount = 0;
	while( true ) {

		if( emergencyCount++ > 1000 ) {
			console.warn('emergency break');
			break;
		}

		if( ! gates.length ) {
			break;
		}

		var newGates = [];

		while( gates.length ) {

			var gate = gates.shift();

			if( wires[gate.input[0]] === undefined || wires[gate.input[1]] === undefined ) {
				newGates.push(gate);
				continue;
			}

			var value = false;

			if( gate.type === 'AND' ) {
				if( wires[gate.input[0]] === 1 && wires[gate.input[1]] === 1 ) {
					value = 1;
				} else {
					value = 0;
				}
			} else if( gate.type === 'OR' ) {
				if( wires[gate.input[0]] === 0 && wires[gate.input[1]] === 0 ) {
					value = 0;
				} else {
					value = 1;
				}
			} else if( gate.type === 'XOR' ) {
				if( wires[gate.input[0]] === wires[gate.input[1]] ) {
					value = 0;
				} else {
					value = 1;
				}
			}

			wires[gate.output] = value;

		}

		gates = newGates;

	}

	var wireValues = [];
	for( var key in wires ) {
		if( ! key.startsWith('z') ) continue;
		wireValues[parseInt(key.replace('z',''),10)] = wires[key];
	}

	wireValues.reverse(); // z00 is least significant bit

	var binaryString = wireValues.join('');

	return parseInt(binaryString, 2);
}

function answer2( input ) {
	return "?";
}
