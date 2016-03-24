// source: https://bl.ocks.org/mbostock/6123708
// license: gpl

d3.select('head')
    .append('link')
    .attr('rel', 'stylesheet')
    .attr('type', 'text/css')
    .attr('href', 'example.css');

// -----------------------------------------------------------------------------

var width = 960;
var height = 500;

// -----------------------------------------------------------------------------

// https://github.com/mbostock/d3/wiki/Zoom-Behavior
// This behavior automatically creates event listeners to handle zooming and 
// panning gestures on a container element. Both mouse and touch events are 
// supported.
var zoom = d3.behavior.zoom()
    .scaleExtent([ 1, 10 ])
    .on('zoom', zoomed);

var svg = d3.select('body')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    // Invokes the specified function once, passing in the current selection 
    // along with any optional arguments. 
    // This will apply the zoom event listeners to the svg element.
    .call(zoom);

// This creates an area under which to search for user input (pointer-events).
// Otherwise the user will have to click on actual elements (the thin lines).
var rect = svg.append('rect')
    .attr('width', width)
    .attr('height', height)
    .style('fill', 'none')
    .style('pointer-events', 'all');

// This is the actual container that will be translated.
var container = svg.append('g');

// Draw horizontal grid lines.
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

// Draw vertical grid lines.
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

function zoomed()
{
    container.attr('transform', 
                   'translate(' + d3.event.translate + ')' +
                   'scale(' + d3.event.scale + ')');
}

// -----------------------------------------------------------------------------

// https://github.com/mbostock/d3/wiki/Drag-Behavior
var drag = d3.behavior.drag()
    // Passes object coordinates as event origin instead of pointer coordinates
    // preventing jump when dragging an object. However, D3 expects the object
    // being dragged to have "x" and "y" attributes defined.
    .origin(function(d) { return d; })
    .on('dragstart', dragStarted)
    .on('drag', dragged)
    .on('dragend', dragEnded);

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators
// The unary plus operator attempts to convert the operand to a number, if it is
// not already.
function dotType(d)
{
    d.x = +d.x * 3;
    d.y = +d.y * 3;
    return d;
}

// https://github.com/mbostock/d3/wiki/CSV
// The second argument is an option accessor which will be passed to the parsing
// function and used to access parsed rows.
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
        .attr('cy', function(d) { return d.y; });

    // Apply the drag behavior to each dot.
    dot.call(drag);
});

function dragStarted(d)
{
    // This allows the drag behavior to take precedence over panning.
    d3.event.sourceEvent.stopPropagation();

    // https://github.com/mbostock/d3/wiki/Selections#classed
    // Prevents overwriting any other classes this element may have.
    // Will toggle only the class specified (dragging) on or off.
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

