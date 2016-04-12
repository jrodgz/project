/*
	create zoomable word container
*/
function createZoomableContainer(where, data) {
	var width = $(where).width();
	var height = $(where).height();
	console.log(data);

	var svg = d3.select(where)
			.append('svg')
			.attr('width', width)
			.attr('height', height);
	var container = drawing.createZoomableContainer(svg, width, height);
	drawing.drawGridLines(container, width * 10, height * 10);

	var count = 0;
	var words = _.chain(data)
		.map(d => _.map(d.tagArray(),t => { return { 'tag': t, 'size': d.mementos.length} }))
		.flatten()
		.uniq(to => to.tag)
		.map(d => {
			return {
				text: d.tag,
				x: Math.floor(Math.random() * width) + 1,
				y: Math.floor(Math.random() * height) + 1,
				style: {
					'font-family': 'sans-serif',
					'font-size':d.size  + 'px',
					'font-weight': 'bold',
					'fill': (count++ % 2 == 0) ? 'red' : 'blue'
				}
			}
		})
		.value();


	var wordGroup = new drawing.WordGroup(container, words);
	wordGroup.makeDraggable();
}