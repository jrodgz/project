/*
	create histogram chart of tags
*/
function createHistogramOfTags(where, data) {
	var tags = _.map(data, function (tm) {
		return tm.tagArray();
	});
	tags = _.flatten(tags);
	var histdata = {
		x: ['x'],
		cols: ['Number of Mementos']
	};
	data.forEach(function (tm) {
		histdata.cols.push(tm.numMementos());
		histdata.x.push(tm.tagString);
		
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