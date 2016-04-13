/*
 create top ten keywords chart
 */
function createTopTenKeywords(where, sampleData) {

	var topTen = _.chain(sampleData)
		.flatMap(tm => tm.tagArray())
		.groupBy(tag => tag)
		.mapValues(tg => tg.length)
		.toPairs()
		.orderBy(it => -it[1])
		.map(p => {return { name: p[0], num: p[1]}})
		.take(10)
		.value();

	var data = [];
	for (var i = 0; i < topTen.length; i++) {
		var newObject = {};
		newObject.name = topTen[i].name;
		newObject.size = topTen[i].num;
		newObject.group = "";
		data.push(newObject);
	}

	var visualization = d3plus.viz()
		.container(where)
		.data(data)
		.type("bubbles")
		.id(["group", "name"])
		.depth(1)
		.size("size")
		.color("group")
		.draw()

}

