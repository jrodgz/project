d3.csv('passing-stats.csv', function(error, raw)
{
    var width = 640;
    var height = 480;
    var svg = d3.select('body')
        .append('svg')
        .attr('width', width)
        .attr('height', height);

    var dataset = [];
    raw.forEach(function(v, i) {
        dataset.push({ 
            x: Number(v['Passing Attempts']),
            y: Number(v['Passing Yards']),
            name: v['Player'],
            color: 'blue'
        });
    });

    var scatter = new drawing.ScatterPlot(svg, dataset, width, height);
    scatter.draw();
    scatter.recolor();
    scatter.makeHoverLabels(function(v, i) { return v.name; });

    var legendGroup = svg.append('g')
        .attr('transform', 'translate(100,100)');

    var legend = new drawing.Legend(legendGroup);
    legend.draw([
        { category: 'foo', color: 'blue' },
        { category: 'bar', color: 'red' },
        { category: 'baz', color: 'green' }
    ]);
});
