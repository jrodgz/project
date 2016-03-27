var drawing = drawing || {};

// Namespace that contains common and generally useful drawing routines.
(function(drawing, d3, undefined) {
    // Appends a pannable, zoomable container to the given group.
    // Returns the container in which to add elements to pan over.
    drawing.createZoomableContainer = function(group, width, height) {
        var zoom = d3.behavior.zoom()
            .scaleExtent([ 1, 10 ])
            .on('zoom', zoomed);

        group.call(zoom);

        var rect = group.append('rect')
            .attr('width', width)
            .attr('height', height)
            .style('fill', 'none')
            .style('pointer-events', 'all');

        var container = group.append('g');

        function zoomed()
        {
            container.attr('transform',
                           'translate(' + d3.event.translate + ')scale(' + 
                           d3.event.scale + ')');
        }

        return container;
    }

    // Use this function to draw width and height worth of grid lines 
    // inside group.
    drawing.drawGridLines = function(group, width, height, tick = 10) {
        group.append('g')
            .attr('class', 'x axis')
            .selectAll('line')
            .data(d3.range(0, width, 10))
            .enter()
            .append('line')
            .attr('x1', function(d) { return d; })
            .attr('y1', 0)
            .attr('x2', function(d) { return d; })
            .attr('y2', height);

        group.append('g')
            .attr('class', 'y axis')
            .selectAll('line')
            .data(d3.range(0, height, 10))
            .enter()
            .append('line')
            .attr('x1', 0)
            .attr('y1', function(d) { return d; })
            .attr('x2', width)
            .attr('y2', function(d) { return d; });
    }

    // Renders the list of words inside group, optionally calling action on 
    // the group of words.
    // The rendered group of words is retained for further manipulations.
    drawing.WordGroup = function(group, words, action = null) {
        // Overrides the current styles in the word group to rules.
        this.overrideStyle = function(rules)
        {
            word.style(rules);
        }

        // Updates CSS styles based on the state of the dataset.
        this.updateStyle = function()
        {
            word.each(function(d) {
                d3.select(this)
                    .style(d.style);
            });
        }

        var word = group.append('g')
            .attr('class', 'word')
            .selectAll('text')
            .data(words)
            .enter()
            .append('text')
            .attr('x', function(d) { return d.x; })
            .attr('y', function(d) { return d.y; })
            .text(function(d) { return d.text; });

        if (action != null) {
            word.call(action);
        }

        this.updateStyle();
    }
}(window.drawing = window.drawing || {}, d3));
