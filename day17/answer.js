
function prepareInput( input ) {

	input = input.split("\n");

	var regA,
		regB,
		regC,
		prog;

	for( var line of input ) {
		if( line.startsWith("Register A: ") ) {
			regA = parseInt(line.replace("Register A: ", ""), 10);
		} else if( line.startsWith("Register B: ") ) {
			regB = parseInt(line.replace("Register B: ", ""), 10);
		} else if( line.startsWith("Register C: ") ) {
			regC = parseInt(line.replace("Register C: ", ""), 10);
		} else if( line.startsWith("Program: ") ) {
			prog = line.replace("Program: ", "").split(",").map(function(n){
				return parseInt(n, 10);
			});
		}
	}

	return {
		regA: regA,
		regB: regB,
		regC: regC,
		prog: prog
	};
}


function getOperand( operand, regA, regB, regC ) {

	if( operand === 4 ) {
		return regA;
	} else if( operand === 5 ) {
		return regB;
	} else if ( operand === 6 ) {
		return regC;
	}

	return operand;
}


function answer1( input ) {

	return runProgram( input );
}


function runProgram( input ) {

	var regA = input.regA,
		regB = input.regB,
		regC = input.regC,
		program = input.prog;

	var instructionPointer = 0,
		output = [];

	function getComboOperand(operand) {
		switch (operand) {
			case 4: return regA;
			case 5: return regB;
			case 6: return regC;
			default: return operand;
		}
	}

	while( instructionPointer < program.length ) {

		var opcode = program[instructionPointer];
		var operand = program[instructionPointer + 1];

		switch (opcode) {
			case 0: // adv
				var advDenominator = Math.pow(2, getComboOperand(operand));
				if (advDenominator !== 0) {
					regA = Math.trunc(regA / advDenominator);
				}
				instructionPointer += 2;
				break;

			case 1: // bxl
				regB = regB ^ operand; // Bitwise XOR
				instructionPointer += 2;
				break;

			case 2: // bst
				regB = getComboOperand(operand) % 8; // Modulo 8
				instructionPointer += 2;
				break;

			case 3: // jnz
				if (regA !== 0) {
					instructionPointer = operand; // Jump to literal operand
				} else {
					instructionPointer += 2;
				}
				break;

			case 4: // bxc
				regB = regB ^ regC; // Bitwise XOR with register C
				instructionPointer += 2;
				break;

			case 5: // out
				output.push(getComboOperand(operand) % 8); // Output value modulo 8
				instructionPointer += 2;
				break;

			case 6: // bdv
				var bdvDenominator = Math.pow(2, getComboOperand(operand));
				if (bdvDenominator !== 0) {
					regB = Math.trunc(regA / bdvDenominator);
				}
				instructionPointer += 2;
				break;

			case 7: // cdv
				var cdvDenominator = Math.pow(2, getComboOperand(operand));
				if (cdvDenominator !== 0) {
					regC = Math.trunc(regA / cdvDenominator);
				}
				instructionPointer += 2;
				break;

			default:
				console.error("Unknown opcode:", opcode);
				return;
		}
	}

	return output.join(',');
}



function answer2( input ) {
	return "?";
}
