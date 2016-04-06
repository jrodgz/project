/*
	create some line chart, need to update this, not sure what it is
*/
function createLineChart(where) {
	chartLineX = [];
	chartLineY = [];
	for (var i = 0; i < 10; ++i)
	{
		chartLineX.push(i);
		chartLineY.push(Math.random() * 10 + 1);
	}

	chartLineX.unshift('x');
	chartLineY.unshift('count');
	
	var otherChart = c3.generate({
		bindto: where,
		data: {
			x: 'x',
			columns: [chartLineX, chartLineY]
		}
	});
}