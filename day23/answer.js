
function prepareInput( input ) {

	input = input.split("\n").map(function(l){
		return l.split('-');
	});

	return input;
}

function answer1( connections ) {

	var connectionMap = {};
	for( var connection of connections ) {

		var pc1 = connection[0],
			pc2 = connection[1];

		if( ! connectionMap[pc1] ) {
			connectionMap[pc1] = [];
		}
		if( ! connectionMap[pc2] ) {
			connectionMap[pc2] = [];
		}

		connectionMap[pc1].push(pc2);
		connectionMap[pc2].push(pc1);

	}

	var filteredConnections = [];

	for( var pc in connectionMap ) {

		if( ! pc.startsWith('t') ) continue;

		var networks = getNetwork(pc, connectionMap);

		for( var network of networks ) {
			var id = network.sort().join('-');

			if( filteredConnections.includes(id) ) continue;

			filteredConnections.push(id);
		}

	}

	filteredConnections = filteredConnections.sort();

	return filteredConnections.length;
}

function answer2( connections ) {
	return "?";
}


function getNetwork( pc, connectionMap ) {

	var networks = [];

	var connectedPcs = connectionMap[pc];

	for( var connectedPc of connectedPcs ) {

		var connectedConnectedPcs = connectionMap[connectedPc];

		var matchingPcs = connectedConnectedPcs.filter(function(el){
			return connectedPcs.indexOf(el) !== -1;
		});

		for( var matchingPc of matchingPcs ) {
			var network = [pc, connectedPc, matchingPc];
			networks.push(network)
		}
	}

	return networks;
}
