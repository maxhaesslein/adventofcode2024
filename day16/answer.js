
function prepareInput( input ) {

	input = input.split("\n").map(function(l){
		return l.split('');
	});

	return input;
}

function answer1( map ) {
	
	var start = false,
		target = false;

	for( var y = 0; y < map.length; y++ ) {
		for( var x = 0; x < map[y].length; x++ ) {
			var tile = map[y][x];

			if( tile === 'S' ) {
				start = [x,y];
			} else if( tile === 'E' ) {
				target = [x,y];
			}

		}
	}

	var direction = 1; // 0 = top, 1 = right, 2 = bottom, 3 = left


	var processedNodes = [],
		costList = [],
		trackedCosts = {};

	addNodeCost( costList, trackedCosts, coordinate2Id([start[0], start[1], direction]), 0 );
	addNodeCost( costList, trackedCosts, coordinate2Id([target[0], target[1], 0]), Infinity );
	addNodeCost( costList, trackedCosts, coordinate2Id([target[0], target[1], 1]), Infinity );
	addNodeCost( costList, trackedCosts, coordinate2Id([target[0], target[1], 2]), Infinity );
	addNodeCost( costList, trackedCosts, coordinate2Id([target[0], target[1], 3]), Infinity );

	var nodeId = getLowestCostNodePosition( costList );

	while( nodeId ) {
		var costToReachNode = trackedCosts[nodeId];

		var childrenOfNode = getNodeChildren( map, nodeId, processedNodes );

		for( var child in childrenOfNode ) {

			var costFromNodeToChild = childrenOfNode[child],
				costToChild = costToReachNode + costFromNodeToChild;

			if( ! trackedCosts[child] || trackedCosts[child] > costToChild ) {
				addNodeCost( costList, trackedCosts, child, costToChild );
			}
		}

		processedNodes.push( nodeId );

		nodeId = getLowestCostNodePosition( costList );
	}

	var minCost = Infinity
	for( var i = 0; i < 4; i++ ){
		var cost = trackedCosts[coordinate2Id([target[0],target[1],i])];
		if( cost < minCost ) minCost = cost;
	}

	return minCost;
}

function answer2( map ) {
	return "?";
}


function coordinate2Id( coordinate ) {
	return ''+coordinate[0]+'/'+coordinate[1]+'/'+coordinate[2];
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
		y = node[1],
		direction = node[2];

	var children = {};
	
	// forwards
	children = { ...children, ...getNodeChildrenInDirection( map, processedNodes, x, y, direction, 0 ) };

	// rotate 90 right
	children = { ...children, ...getNodeChildrenInDirection( map, processedNodes, x, y, direction+1, 1000 ) };

	// rotate 90 left
	children = { ...children, ...getNodeChildrenInDirection( map, processedNodes, x, y, direction-1, 1000 ) };

	// rotate 180
	children = { ...children, ...getNodeChildrenInDirection( map, processedNodes, x, y, direction+2, 2000 ) };

	return children;
}

function getNodeChildrenInDirection( map, processedNodes, x, y, direction, cost ){

	var children = {};

	if( direction > 3 ) {
		direction -= 4;
	} else if( direction < 0 ) {
		direction += 4;
	}

	var newNode = false;

	if( direction === 0 ) { // top
		if( map[y-1] && map[y-1][x] && map[y-1][x] !== '#' ) {
			cost += 1;
			newNode = [x,y-1,direction];
		}
	} else if( direction === 1 ) { // right
		if( map[y] && map[y][x+1] && map[y][x+1] !== '#' ) {
			cost += 1;
			newNode = [x+1,y,direction];
		}
	} else if( direction === 2 ) { // bottom
		if( map[y+1] && map[y+1][x] && map[y+1][x] !== '#' ) {
			cost += 1;
			newNode = [x,y+1,direction];
		}
	} else if( direction === 3 ) { // left
		if( map[y] && map[y][x-1] && map[y][x-1] !== '#' ) {
			cost += 1;
			newNode = [x-1,y,direction];
		}
	}

	if( newNode ) {
		var nodeId = coordinate2Id(newNode);
		if( ! processedNodes.includes(nodeId) ) {
			children[nodeId] = cost;
		}
	}

	return children;
}
