
function prepareInput( input ) {

	input = input.split("\n").map(function(l){
		return l.split('');
	});

	return input;
}

function answer1( map ) {
	
	var [ start, target ] = getStartAndTarget(map);

	var trackedCosts = getCosts(map, start, target);

	var minCost = Infinity
	for( var i = 0; i < 4; i++ ){
		var cost = trackedCosts[coordinate2Id([target[0],target[1],i])];
		if( cost < minCost ) minCost = cost;
	}

	return minCost;
}

var pxSize = 10; // for DEBUG display

function answer2( map ) {
	
	var [ start, target ] = getStartAndTarget(map);

	var trackedCosts = getCosts(map, start, target);

	console.log(trackedCosts)

	// DEBUG display
	var canvas = document.getElementById('canvas'),
		ctx = canvas.getContext('2d');


	canvas.width = map[0].length*pxSize;
	canvas.height = map.length*pxSize;

	for( var y = 0; y < map.length; y++ ) {
		for( var x = 0; x < map[y].length; x++ ) {
			var tile = map[y][x];

			if( tile === "#" ) {
				ctx.fillRect( x*pxSize, y*pxSize, pxSize, pxSize );
			}
		}
	}
	ctx.fillStyle = "orange";
	ctx.fillRect( start[0]*pxSize, start[1]*pxSize, pxSize, pxSize );
	// end DEBUG display

	var sum = 0;
	sum = getPathToTarget( trackedCosts, target[0], target[1], start, ctx );


	return sum;
}


function getPathToTarget( trackedCosts, x, y, target, ctx ) {

	if( x === target[0] && y == target[1] ) {
		return 0; // reached target!
	}


	var paths = []

	for( var direction = 0; direction < 4; direction++ ) {

		var cost = trackedCosts[coordinate2Id([x, y, direction])];

		if( ! Number.isFinite(cost) ) continue;

		paths.push({
			cost: cost,
			x: x,
			y: y,
			d: direction
		});

	}

	paths = paths.sort(function(a,b){
		if( a.cost < b.cost ) {
			return -1;
		} else if( a.cost > b.cost ) {
			return 1;
		} else {
			return 0;
		}
	});

	if( x === 5 && y === 7 ) { // DEBUG
		console.log(paths)
	}

	var sum = 1,
		minCost = Infinity;

	for( var path of paths ) {
		if( path.cost > minCost ) break;
		minCost = path.cost;

		// DEBUG display
		if( ctx ) {
			ctx.fillRect( x*pxSize, y*pxSize, pxSize, pxSize );
		}
		// end DEBUG display

		if( path.d === 0 ) { // previous was bottom
			sum += getPathToTarget( trackedCosts, x, y+1, target, ctx );
		} else if( path.d === 1 ) { // previous was left
			sum += getPathToTarget( trackedCosts, x-1, y, target, ctx );
		} else if( path.d === 2 ) { // previous was top
			sum += getPathToTarget( trackedCosts, x, y-1, target, ctx );
		} else if( path.d === 3 ) { // previous was right
			sum += getPathToTarget( trackedCosts, x+1, y, target, ctx );
		}

	}

	return sum;
}


function getStartAndTarget( map ) {
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

	return [start, target];
}


function getCosts( map, start, target ) {

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

			if( ! trackedCosts[child] || trackedCosts[child] >= costToChild ) {
				addNodeCost( costList, trackedCosts, child, costToChild );
			}
		}

		processedNodes.push( nodeId );

		nodeId = getLowestCostNodePosition( costList );
	}

	return trackedCosts;
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
