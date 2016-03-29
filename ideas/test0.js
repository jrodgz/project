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

var container = drawing.createZoomableContainer(svg, width, height);
drawing.drawGridLines(container, width, height);

// -----------------------------------------------------------------------------

var dictionary = [ 'foo', 'bar', 'baz', 'qux' ];
var words = [];
for (var i = 0; i < 100; ++i)
{
    words.push({
        text: dictionary[i % 4],
        x: Math.floor(Math.random() * width) + 1,
        y: Math.floor(Math.random() * height) + 1,
        style: { 
            // So we'll be able to evaluate individually for each word.
            // We'll be able to grow, color, etc. words based on different
            // criteria.
            // See below.
            'font-family': 'sans-serif',
            'font-size': 10 + 'px',
            'font-weight': 'bold'
        }
    });
}

var drag = d3.behavior.drag()
    .origin(function(d) { return d; })
    .on('dragstart', dragStarted)
    .on('drag', dragged)
    .on('dragend', dragEnded);

var wordGroup = new drawing.WordGroup(container, words, drag);

function dragStarted(d)
{
    d3.event.sourceEvent.stopPropagation();
    d3.select(this).classed('dragging', true);
}

function dragged(d)
{
    d3.select(this)
        .attr('x', d.x = d3.event.x)
        .attr('y', d.y = d3.event.y);
}

function dragEnded(d)
{
    d3.select(this).classed('dragging', false);
}

// -----------------------------------------------------------------------------

for (var i = 0; i < 100; ++i)
{
    words[i].style['font-size'] = (Math.floor(Math.random() * 25) + 1) + 'px';

    if (i % 2)
    {
        words[i].style['fill'] = 'green';
    }
    else
    {
        words[i].style['fill'] = 'blue';
    }
}

wordGroup.updateStyle();

var button = d3.select('body')
    .append('input')
    .attr('type', 'submit')
    .attr('value', 'override');

button.pressed = false;

button.on('click', function() {
    if (button.pressed)
    {
        wordGroup.updateStyle();
    }
    else
    {
        wordGroup.overrideStyle({ 'fill': 'black' });
    }

    button.pressed = !button.pressed;
});
