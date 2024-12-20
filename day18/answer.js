
function prepareInput( input ) {

	input = input.split("\n").map(function(l){
		return l.split(",").map(function(n){
			return parseInt(n, 10);
		});
	});

	return input;
}

function answer1( input ) {

	var w = 70+1,
		h = 70+1;

	var maxN = 1024;

	if( input.length < 100 ) {
		// NOTE: the test cases have a smaller area
		w = 6+1;
		h = 6+1;
		maxN = 12;
	}

	var map = Array.from({ length: h }, function(){
		return Array.from({ length: w }, function(){
			return ".";
		});
	});


	for( var i = 0; i < maxN; i++ ) {

		var coordinate = input[i],
			x = coordinate[0],
			y = coordinate[1];

		map[y][x] = "#";

	}


	var start = [0,0],
		target = [w-1,h-1];

	var cost = getCheapestPath(map, start, target);

	return cost;
}

function answer2( input ) {
	var w = 70+1,
		h = 70+1;

	var maxN = 1024;

	if( input.length < 100 ) {
		// NOTE: the test cases have a smaller area
		w = 6+1;
		h = 6+1;
		maxN = 12;
	}

	var map = Array.from({ length: h }, function(){
		return Array.from({ length: w }, function(){
			return ".";
		});
	});


	for( var i = 0; i < maxN; i++ ) {

		var coordinate = input[i],
			x = coordinate[0],
			y = coordinate[1];

		map[y][x] = "#";

	}

	var start = [0,0],
		target = [w-1,h-1];

	var cost = '';

	while( i < input.length ) {

		var coordinate = input[i],
			x = coordinate[0],
			y = coordinate[1];

		map[y][x] = "#";

		cost = getCheapestPath(map, start, target);

		if( cost === undefined ) break;

		i++;
	}

	return input[i].join(',');
}


function getCheapestPath( map, start, target ) {

	var processedNodes = [],
		costList = [],
		trackedCosts = {};

	addNodeCost( costList, trackedCosts, coordinate2Id(start), 0 );

	var nodeId = getLowestCostNodePosition( costList );

	while( nodeId ) {
		var costToReachNode = trackedCosts[nodeId];

		var childrenOfNode = getNodeChildren( map, nodeId, processedNodes );

		for( var child of childrenOfNode ) {

			var costToChild = costToReachNode + 1;

			if( ! trackedCosts[child] || costToChild < trackedCosts[child] ) {
				addNodeCost( costList, trackedCosts, child, costToChild );
			}
		}

		processedNodes.push( nodeId );

		nodeId = getLowestCostNodePosition( costList );

	}

	return trackedCosts[coordinate2Id(target)];
}




function coordinate2Id( coordinate ) {
	return ''+coordinate[0]+'/'+coordinate[1];
}
function id2Coordinate( id ) {
	return id.split('/').map(function(n){
		return parseInt(n,10);
	});
}


function addNodeCost( costList, trackedCosts, nodeId, cost ) {

	trackedCosts[nodeId] = cost;

	for( var i = 0; i < costList.length; i++ ) {
		if( costList[i].cost < cost ) continue;
		break;
	}

	costList.splice( i, 0, {
		cost: cost,
		id: nodeId
	} );
}


function getLowestCostNodePosition( costList ) {
	var node = costList.shift();
	return node?.id;
}


function getNodeChildren( map, node, processedNodes ) {

	var node = id2Coordinate(node),
		x = node[0],
		y = node[1];

	var children = [];
	
	// top
	if( y-1 >= 0 && map[y-1][x] === "." ) {
		var newNodeId = coordinate2Id( [x, y-1] );
		children.push(newNodeId);
	}

	// right
	if( x+1 < map[0].length && map[y][x+1] === "." ) {
		var newNodeId = coordinate2Id( [x+1, y] );
		children.push(newNodeId);
	}

	// bottom
	if( y+1 < map.length && map[y+1][x] === "." ) {
		var newNodeId = coordinate2Id( [x, y+1] );
		children.push(newNodeId);
	}

	// left
	if( x-1 >= 0  && map[y][x-1] === "." ){
		var newNodeId = coordinate2Id( [x-1, y] );
		children.push(newNodeId);
	}

	return children;
}
