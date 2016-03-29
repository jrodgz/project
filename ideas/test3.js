var width = 640;
var height = 480;
var svg = d3.select('body')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

var dataset = [
    { name: 'a', value: 10 },
    { name: 'b', value: 20 },
    { name: 'c', value: 30 },
    { name: 'd', value: 40 }
];

var barplot = new drawing.BarPlot(svg, dataset);
barplot.draw();
