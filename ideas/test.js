d3.select('head')
    .append('link')
    .attr('rel', 'stylesheet')
    .attr('type', 'text/css')
    .attr('href', 'example.css');

var width = 960;
var height = 500;

var svg = d3.select('body')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

var container = createZoomableContainer(svg, width, height);

container.append('g')
    .attr('class', 'x axis')
    .selectAll('line')
    .data(d3.range(0, width, 10))
    .enter()
    .append('line')
    .attr('x1', function(d) { return d; })
    .attr('y1', 0)
    .attr('x2', function(d) { return d; })
    .attr('y2', height);

container.append('g')
    .attr('class', 'y axis')
    .selectAll('line')
    .data(d3.range(0, height, 10))
    .enter()
    .append('line')
    .attr('x1', 0)
    .attr('y1', function(d) { return d; })
    .attr('x2', width)
    .attr('y2', function(d) { return d; });

// -----------------------------------------------------------------------------

var drag = d3.behavior.drag()
    .origin(function(d) { return d; })
    .on('dragstart', dragStarted)
    .on('drag', dragged)
    .on('dragend', dragEnded);

function dotType(d)
{
    d.x = +d.x * 3;
    d.y = +d.y * 3;
    return d;
}

d3.tsv('dots.tsv', dotType, function(error, dots)
{
    dot = container.append('g')
        .attr('class', 'dot')
        .selectAll('circle')
        .data(dots)
        .enter()
        .append('circle')
        .attr('r', 10)
        .attr('cx', function(d) { return d.x; })
        .attr('cy', function(d) { return d.y; })
        .call(drag);
});

function dragStarted(d)
{
    d3.event.sourceEvent.stopPropagation();
    d3.select(this).classed('dragging', true);
}

function dragged(d)
{
    d3.select(this)
        .attr('cx', d.x = d3.event.x)
        .attr('cy', d.y = d3.event.y);
}

function dragEnded(d)
{
    d3.select(this).classed('dragging', false);
}

