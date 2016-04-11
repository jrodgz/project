/*
	create chart top ten popular domains
*/

function createTopTenPopularDomains(where, data) {
	var topTen =
		_.take(_.sortBy(_.pairs(
			_.mapObject(
				_.groupBy(
					_.flatten(data.map(mc => mc.cleanedDomains())),
					d => d),
				(v,k)=> v.length)
		),p => -p[1]),10);

	console.log(topTen);

	var topTenDomainsArray = topTen.map(p => p[0]);

	var chart = c3.generate({
		bindto: where,
		data: {
			columns: topTen,
			type: 'bar'
		},
		axis : {
			rotated: true,
			y : {
				label: 'Mementos'
			},
			x : {
				type : 'categorized',
				tick: {
					format: function (x) { return ''; }
				},
				show: true
			}
		}
	});


	// var topTenDomans = {};
	// data.forEach(function (tm) {
	// 	var a = document.createElement('a');
    //     a.href = tm.uri;
	// 	var currentUri = a.hostname;
	// 	var mememntoNumber = tm.mementos.length;
	// 	if (currentUri in topTenDomans) {
	// 		topTenDomans[currentUri] = topTenDomans[currentUri] + mememntoNumber;
	// 	} else {
	// 		topTenDomans[currentUri] = mememntoNumber;
	// 	}
	// });
	//
	// var sortedTopTenDomainList = [];
	// for (var key in topTenDomans){
	// 	sortedTopTenDomainList.push([key, topTenDomans[key]]);
	// }
	// sortedTopTenDomainList.sort(function(a, b){return b[1] - a[1]});
	// var topTenDomainsArray = sortedTopTenDomainList.slice(0,10);
	//
	// var chart = c3.generate({
	// 	bindto: where,
	// 	data: {
	// 		columns: topTenDomainsArray,
	// 		type: 'bar'
	// 	},
	// 	axis : {
	// 		rotated: true,
	// 		y : {
	// 			label: 'Mementos'
	// 		},
	// 		x : {
	// 			type : 'categorized',
	// 			tick: {
	// 				format: function (x) { return ''; }
	// 			},
	// 			show: true
	// 		}
	// 	}
	// });
	
}