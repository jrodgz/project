 /*
	create top ten keywords chart
*/
function createTopTenKeywords(where, sampleData) {
	console.log("Top teh keywords1",sampleData);

	var topTen = _.chain(sampleData)
		.flatMap(tm => tm.tagArray())
		.groupBy(tag => tag)
		.mapValues(tg => tg.length)
		.toPairs()
		.orderBy(it => -it[1])
		.map(p => { return { name: p[0], num: p[1]}})
		.take(10)
		.value();


	var data = {};
	data.children = [];
	for (var i = 0; i < topTen.length; i++) {
		var newObject = {};
		newObject.name = topTen[i].name;
		newObject.size = topTen[i].num;
		newObject.rank = i;
		data.children.push(newObject);
	}
	var w = $(where).width();
	var h = $(where).height();
    var canvas = d3.select(where).append("svg:svg").attr('width', w).attr('height', h);

    var nodes = d3.layout.pack()
      .value(function(d) { return d.size; })
      .size([w, h])
      .nodes(data);

    // Get rid of root node
    nodes.shift();

	function getColorForCircle(rank) {
		var colors = [	'#a50026', '#d73027',
						'#f46d43', '#fdae61',
						'#fee090', '#e0f3f8',
						'#abd9e9', '#74add1',
						'#4575b4', '#313695'];
		return colors[rank];
	}

	var node = canvas.selectAll(".node")
		.data(nodes).enter().append("g").attr("class", "node")
			.attr("transform", function(d) {
				return "translate(" + d.x + "," + d.y + ")";
			});

	node.append("circle")
		.attr("r", function(d) { return d.r; })
		.attr("fill", function(d) {
			return getColorForCircle(d.rank);
		})
		.attr("stroke", "#000")
		.append("svg:title")
		.text(function(d) { return "The size is : " + d.size; });

	node.append("text")
	    .attr("dx", function(d){return -20})
		.attr("font-size", function(d) {
			return "9px;"
		})
	    .text(function(d){return d.name});

}
