
function prepareInput( input ) {

	input = input.split("\n").map(function(l){
		return l.split('');
	});

	return input;
}

function answer1( map ) {

	var [start, end] = getStartEnd(map);

	var minimumSavingTime = 100;

	if( map.length <= 15 ) {
		// test case has smaller requirements
		minimumSavingTime = 2;
	}

	var sum = 0;

	var trackedCosts = getCosts(map, start, end);

	var defaultCost = trackedCosts[coordinate2Id(end)];

	var defaultPath = getPathToTarget( trackedCosts, end[0], end[1], start, [] );

	console.log(defaultPath)

/*
	for( var y = 0; y < map.length; y++ ) {
		for( var x = 0; x < map[y].length; x++ ) {

			if( map[y][x] !== '#' ) continue;

			var cheat = [x,y];
			var cheatCost = getCosts(map, start, end, cheat);
			if( defaultCost - cheatCost >= minimumSavingTime ) {
				sum++;
			}
		}
	}
*/

	return sum;
}

function answer2( map ) {
	return "?";
}


function getPathToTarget( trackedCosts, x, y, target, path ) {

	if( x === target[0] && y == target[1] ) {
		path.push([target[0], target[1]]);
		return path; // reached target!
	}

	var topCost = trackedCosts[coordinate2Id([x,y-1])],
		rightCost = trackedCosts[coordinate2Id([x+1,y])],
		bottomCost = trackedCosts[coordinate2Id([x,y+1])],
		leftCost = trackedCosts[coordinate2Id([x-1,y])];

	if( topCost === undefined ) topCost = Infinity;
	if( rightCost === undefined ) rightCost = Infinity;
	if( bottomCost === undefined ) bottomCost = Infinity;
	if( leftCost === undefined ) leftCost = Infinity;

	var newCoord = false;
	if( topCost < rightCost && topCost < bottomCost && topCost < leftCost ) {
		newCoord = [x,y-1];
	} else if( rightCost < topCost && rightCost < bottomCost && rightCost < leftCost ) {
		newCoord = [x+1,y];
	} else if( bottomCost < topCost && bottomCost < rightCost && bottomCost < leftCost ) {
		newCoord = [x,y+1];
	} else if( leftCost < topCost && leftCost < rightCost && leftCost < bottomCost ) {
		newCoord = [x-1,y];
	}

	if( ! newCoord ) {
		console.warn('ended at', x,y);
		console.log(topCost,rightCost,bottomCost,leftCost)
		return path;
	}

	path.push(newCoord);

	path = getPathToTarget( trackedCosts, newCoord[0], newCoord[1], target, path );

	return path;
}


function getStartEnd( map ) {

	var start, end;

	for( var y = 0; y < map.length; y++ ) {
		for( var x = 0; x < map[y].length; x++ ) {
			var tile = map[y][x];

			if( tile === 'S' ) {
				start = [x,y];
			} else if( tile === 'E' ) {
				end = [x,y];
			}

		}
	}

	return [start, end];
}


function getCosts( map, start, target, cheat ) {

	var processedNodes = [],
		costList = [],
		trackedCosts = {};

	addNodeCost( costList, trackedCosts, coordinate2Id(start), 0 );

	var nodeId = getLowestCostNodePosition( costList );

	while( nodeId ) {
		var costToReachNode = trackedCosts[nodeId];

		var childrenOfNode = getNodeChildren( map, nodeId, processedNodes, cheat );

		for( var child of childrenOfNode ) {

			var costToChild = costToReachNode + 1;

			if( ! trackedCosts[child] || costToChild < trackedCosts[child] ) {
				addNodeCost( costList, trackedCosts, child, costToChild );
			}
		}

		processedNodes.push( nodeId );

		nodeId = getLowestCostNodePosition( costList );

	}

	return trackedCosts;
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


function getNodeChildren( map, node, processedNodes, cheat ) {

	var node = id2Coordinate(node),
		x = node[0],
		y = node[1];

	var children = [];
	
	// top
	if( y-1 >= 0 && ( map[y-1][x] !== "#" || (cheat !== undefined && x == cheat[0] && y-1 == cheat[1]) ) ) {
		var newNodeId = coordinate2Id( [x, y-1] );
		children.push(newNodeId);
	}

	// right
	if( x+1 < map[0].length && ( map[y][x+1] !== "#" || (cheat !== undefined && x+1 == cheat[0] && y == cheat[1]) ) ) {
		var newNodeId = coordinate2Id( [x+1, y] );
		children.push(newNodeId);
	}

	// bottom
	if( y+1 < map.length && ( map[y+1][x] !== "#" || (cheat !== undefined && x == cheat[0] && y+1 == cheat[1]) ) ) {
		var newNodeId = coordinate2Id( [x, y+1] );
		children.push(newNodeId);
	}

	// left
	if( x-1 >= 0  && ( map[y][x-1] !== "#" || (cheat !== undefined && x-1 == cheat[0] && y == cheat[1]) ) ) {
		var newNodeId = coordinate2Id( [x-1, y] );
		children.push(newNodeId);
	}

	return children;
}
