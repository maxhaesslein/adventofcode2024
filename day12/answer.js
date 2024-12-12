
function prepareInput( input ) {

	input = input.trim().split("\n").map(function(l){
		return l.split('');
	});

	return input;
}

function answer1( map ) {

	var visitedTiles = [];
	var regions = [];

	for( var y = 0; y < map.length; y++ ) {
		for( var x = 0; x < map[y].length; x++ ) {

			if( visitedTiles.includes(''+x+'/'+y) ) continue;

			var region = expand(map,x,y,[]);
			regions.push(region);

			for( var newVisitedTile of region ) {
				visitedTiles.push(''+newVisitedTile[0]+'/'+newVisitedTile[1]);
			}
		}
	}

	var price = 0;

	for( var region of regions ) {

		var area = region.length,
			perimeter = getPerimeter(region);

		price += area*perimeter;
	}

	return price;
}

function answer2( map ) {
	return "?";
}


function getPerimeter( region ) {
	var perimeter = 0;

	var regionFlat = region.map(function(p){return p[0]+'/'+p[1];});

	for( var plot of region ) {
		var x = plot[0],
			y = plot[1];

		additionalPerimeter = 4;

		// top
		if( regionFlat.includes((x)+'/'+(y-1)) ) {
			additionalPerimeter--;
		}
		// right
		if( regionFlat.includes((x+1)+'/'+(y)) ) {
			additionalPerimeter--;
		}
		// bottom
		if( regionFlat.includes((x)+'/'+(y+1)) ) {
			additionalPerimeter--;
		}
		// left
		if( regionFlat.includes((x-1)+'/'+(y)) ) {
			additionalPerimeter--;
		}

		perimeter += additionalPerimeter;

	}

	return perimeter;
}


function expand(map,x,y,visitedTiles) {

	var region = [ [x,y] ];

	visitedTiles.push(''+x+'/'+y);

	var tile = map[y][x];

	// top
	if( map[y-1] && map[y-1][x] && map[y-1][x] === tile && ! visitedTiles.includes(''+(x)+'/'+(y-1)) ) {
		additionalRegion = expand(map,x,y-1,visitedTiles);
		region = [...region, ...additionalRegion];
	}
	// right
	if( map[y] && map[y][x+1] && map[y][x+1] === tile && ! visitedTiles.includes(''+(x+1)+'/'+(y)) ) {
		additionalRegion = expand(map,x+1,y,visitedTiles);
		region = [...region, ...additionalRegion];
	}
	// bottom
	if( map[y+1] && map[y+1][x] && map[y+1][x] === tile && ! visitedTiles.includes(''+(x)+'/'+(y+1)) ) {
		additionalRegion = expand(map,x,y+1,visitedTiles);
		region = [...region, ...additionalRegion];
	}
	// left
	if( map[y] && map[y][x-1] && map[y][x-1] === tile && ! visitedTiles.includes(''+(x-1)+'/'+(y)) ) {
		additionalRegion = expand(map,x-1,y,visitedTiles);
		region = [...region, ...additionalRegion];
	}

	return region;
}
