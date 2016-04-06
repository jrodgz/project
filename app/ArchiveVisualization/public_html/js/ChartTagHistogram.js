/*
	create histogram chart of tags
*/
function createHistogramOfTags(where, data) {
	var tags = _.map(data, function (tm) {
		return tm.tags;
	});
	tags = _.flatten(tags);
	var histdata = {
		x: ['x'],
		cols: ['Number of Mementos']
	};
	data.forEach(function (tm) {
		histdata.cols.push(tm.numMementos());
		if (tm.title == 'Row: 2') {
			tm.title = "Egypt Conflict";
			histdata.x.push("Egypt Conflict");
		} else {
			histdata.x.push(tm.title);
		}
	});

	c3.generate({
		bindto: where,
		data: {
			x: 'x',
			columns: [
				histdata.x,
				histdata.cols
			],
			type: 'bar'
		},
		bar: {
			width: {
				ratio: 0.5
			}
		},
		axis: {
			x: {
				type: 'category',
				show: true
			}
		}
	});	
}