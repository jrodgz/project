/*
	create zoomable word container
*/
function createZoomableContainer(where, data) {
	var width = $(where).width();
	var height = $(where).height();
	var svg = d3.select(where)
			.append('svg')
			.attr('width', width)
			.attr('height', height);
	var container = drawing.createZoomableContainer(svg, width, height);
	drawing.drawGridLines(container, width * 10, height * 10);

	var count = 0;
	var words = data.map(function (d) {
		return {
			text: d.title,
			x: Math.floor(Math.random() * width) + 1,
			y: Math.floor(Math.random() * height) + 1,
			style: {
				'font-family': 'sans-serif',
				'font-size': (d.mementos.length * 2.0) + 'px',
				'font-weight': 'bold',
				'fill': (count++ % 2 == 0) ? 'red' : 'blue'
			}
		}
	});

	var wordGroup = new drawing.WordGroup(container, words);
	wordGroup.makeDraggable();
}