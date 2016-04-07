/*
	create top ten archivers list
*/
function createTopTenArchivers(where, data) {
	
	var topTenArchiverCols = {};
	data.forEach(function (tm) {
		
		var currentArchiver = tm.archiver;
		var mememntoNumber = tm.mementos.length;
		if (currentArchiver in topTenArchiverCols) {
			topTenArchiverCols[currentArchiver] = topTenArchiverCols[currentArchiver] + mememntoNumber;
		} else {
			topTenArchiverCols[currentArchiver] = mememntoNumber;
		}

	});
	
	var sortedTopTenList = [];
	for (var key in topTenArchiverCols){
		sortedTopTenList.push([key, topTenArchiverCols[key]]);
	}
	sortedTopTenList.sort(function(a, b){return b[1] - a[1]});
	var topTenArray = sortedTopTenList.slice(0,10);
	
	var chart = c3.generate({
		bindto: where,
		data: {
			columns: topTenArray,
			type: 'bar'
		},
		bar: {
			width: {
				ratio: 0.5 // this makes bar width 50% of length between ticks
			}
		},
		axis : {
			y : {
				label: 'Mementos'
			},
			x : {
				type : 'categorized',
				tick: {
					format: function (x) { return ''; }
				}
			}
		}
	});
}
