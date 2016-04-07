 /*
	create top ten keywords chart
*/
function createTopTenKeywords(where, sampleData, statusDiv) {
	
	updateStatus(statusDiv, "Preparing to create top ten keywords");
	var allWords = {};
	sampleData.forEach(function (tm) {
		var currentTags = String(tm.tags).split(',');
		var numberOfTags = currentTags.length;
		var mememntoNumber = tm.mementos.length;
		for (var i = 0; i < numberOfTags; i++) {
			var currentTag = currentTags[i].trim();
			if (currentTag in allWords) {
				allWords[currentTag] = allWords[currentTag] + mememntoNumber;
			} else {
				allWords[currentTag] = mememntoNumber;
			}
		}
	});
	
	var sortedTopTenKeywords = [];
	for (var key in allWords){
		sortedTopTenKeywords.push([key, allWords[key]]);
	}
	sortedTopTenKeywords.sort(function(a, b){return b[1] - a[1]});
	var topTenWordsArray = sortedTopTenKeywords.slice(0,10);
	
	var data = {};
	data.children = [];
	for (var i = 0; i < topTenWordsArray.length; i++) {
		var newObject = {};
		newObject.name = topTenWordsArray[i][0];
		newObject.size = topTenWordsArray[i][1];
		newObject.rank = i;
		data.children.push(newObject);
	}
	updateStatus(statusDiv, "Finished creating top ten keywords");
		
	updateStatus(statusDiv, "Loading D3 chart for top ten keywords");
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
	    .text(function(d){return d.name})

    updateStatus(statusDiv, "Finished loading D3 chart for top ten keywords");
}
