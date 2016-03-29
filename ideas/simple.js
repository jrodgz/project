var width = 960;
var height = 500;
var svg = d3.select('body')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

// 1. make a pannable container
var container = drawing.createZoomableContainer(svg, width, height);

// 2. make a word group
var words = [ 'foo', 'bar', 'baz' ];
var wordGroup = new drawing.WordGroup(container, words);
