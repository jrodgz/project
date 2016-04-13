/*
	create chart top ten popular domains
*/
function createTopTenPopularDomains(where, data) {
	var topTen =_.chain(data)
		.flatMap(mc => mc.cleanedDomains())
		.groupBy(d => d)
		.mapValues((v,k)=> v.length)
		.toPairs()
		.sortBy(p => -p[1])
		.take(10).value();
	var histdata = {
		x: ['x'],
		cols: ['Occurrence Count']
	};
	topTen.forEach(function (tt) {
		histdata.cols.push(tt[1]);
		histdata.x.push(tt[0]);

	});

	var chart =  c3.generate({
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
			rotated: true,
			x: {
				type: 'category',
				show: true
			}
		}
	});

}