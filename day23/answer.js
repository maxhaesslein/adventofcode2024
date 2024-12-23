
function prepareInput( input ) {

	input = input.split("\n").map(function(l){
		return l.split('-');
	});

	var connectionMap = {};
	for( var connection of input ) {

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

	return connectionMap;
}

function answer1( connectionMap ) {

	var filteredConnections = [];

	for( var pc in connectionMap ) {

		if( ! pc.startsWith('t') ) continue;

		var networks = getThreeConnectedPcs(pc, connectionMap);

		for( var network of networks ) {
			var id = network.sort().join('-');

			if( filteredConnections.includes(id) ) continue;

			filteredConnections.push(id);
		}

	}

	filteredConnections = filteredConnections.sort();

	return filteredConnections.length;
}

function answer2( connectionMap ) {

	var networks = [];

	for( var pc in connectionMap ) {

		var network = getNetwork(pc, connectionMap, [pc]);

		if( network.length <= 2 ) continue;

		network = network.sort().join(',');

		if( networks.includes(network) ) continue;

		networks.push(network);
	}

	networks = networks.sort(function(a,b){
		return b.length-a.length;
	});

	return networks[0];
}


function getThreeConnectedPcs( pc, connectionMap ) {

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


function getNetwork( pc, connectionMap, network ) {

	for( var connectedPc of connectionMap[pc] ) {

		if( connectedPc === pc ) continue;
		if( network.includes(connectedPc) ) continue;

		var interconnected = true;

		for( var subPc of network ) {
			if( ! connectionMap[subPc].includes(connectedPc) ) {
				interconnected = false;
			}
		}

		if( ! interconnected ) continue;

		network = getNetwork( connectedPc, connectionMap, [... network, connectedPc] );
	}

	return network;
}
