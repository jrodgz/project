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

        function zoomed() {
            container.attr('transform',
                           'translate(' + d3.event.translate + ')scale(' + 
                           d3.event.scale + ')');
        }

        return container;
    };

    // Makes the input group of elements draggable.
    // Expects a d3 group element selection.
    drawing.makeDraggable = function(group) {
    };

    // Use this function to draw width and height worth of grid lines 
    // inside group.
    drawing.drawGridLines = function(group, width, height, tick) {
        tick = tick || 10;

        // TODO: Make argument?
        var rules = {
            'fill': 'none',
            'shape-rendering': 'crispEdges',
            'stroke': 'lightgray'
        };

        group.append('g')
            .attr('class', 'x axis')
            .selectAll('line')
            .data(d3.range(0, width, tick))
            .enter()
            .append('line')
            .attr('x1', function(d) { return d; })
            .attr('y1', 0)
            .attr('x2', function(d) { return d; })
            .attr('y2', height)
            .style(rules);

        group.append('g')
            .attr('class', 'y axis')
            .selectAll('line')
            .data(d3.range(0, height, tick))
            .enter()
            .append('line')
            .attr('x1', 0)
            .attr('y1', function(d) { return d; })
            .attr('x2', width)
            .attr('y2', function(d) { return d; })
            .style(rules);
    };

    // Renders the list of words inside group, optionally calling action on 
    // the group of words.
    // The rendered group of words is retained for further manipulations.
    drawing.WordGroup = function(group, words) {
        // Overrides the current styles in the word group to rules.
        this.overrideStyle = function(rules) {
            word.style(rules);
        };

        // Updates CSS styles based on the state of the dataset.
        this.updateStyle = function() {
            word.each(function(d) {
                d3.select(this)
                    .style(d.style);
            });
        };

        // Optionally make the words draggable.
        this.makeDraggable = function() {
            if (word != undefined) {
                function dragStarted(d) {
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

                var drag = d3.behavior.drag()
                    .origin(function(d) { return d; })
                    .on('dragstart', dragStarted)
                    .on('drag', dragged)
                    .on('dragend', dragEnded);

                word.call(drag);
            }
        };

        var word = group.append('g')
            .attr('class', 'word')
            .selectAll('text')
            .data(words)
            .enter()
            .append('text')
            .attr('x', function(d) { return d.x; })
            .attr('y', function(d) { return d.y; })
            .text(function(d) { return d.text; });

        this.updateStyle();
    };
}(window.drawing = window.drawing || {}, d3));

// Extends the drawing namespace to include useful layout routines.
(function(drawing, $, undefined) {
    // Instantiate these to create a small image gallery.
    // Expects div to be a jQuery div selection.
    drawing.ImageGroup = function(div, pathList, ipp) {
        ipp = ipp || Number.MAX_VALUE;

        // Resize images in this gallery.
        this.resize = function(width, height) {
            images.attr('width', width);
            images.attr('height', height);
        };

        // Show the next page of images.
        this.nextPage = function() {
            currPage = (currPage + 1) % nPages;
            redraw();
        };

        // Show the previous page of images.
        this.previousPage = function() {
            --currPage;
            if (currPage == -1) {
                currPage = nPages - 1;
            }
            redraw();
        };

        // Re-paginate to a different number of images per page.
        this.paginate = function(ipp) {
            ipp = ipp || Number.MAX_VALUE;
            imagesPerPage = ipp;
            nPages = Math.ceil(nImages / imagesPerPage);
            currPage = 0;
            redraw();
        };

        function redraw() {
            images.each(function(i, v) {
                var pageOfImage = Math.floor(i / imagesPerPage);
                if (pageOfImage == currPage) {
                    $(v).css('display', 'inline');
                } else {
                    $(v).css('display', 'none');
                }
            });
        }

        pathList.forEach(function(v, i) {
            div.append('<img class="gallery" id="img' + i + 
                       '" src="' + v + '" />');
        });

        var images = $('.gallery');
        var nImages = pathList.length;
        var imagesPerPage = ipp;
        var nPages = Math.ceil(nImages / ipp);
        var currPage = 0;

        redraw();
    }
}(window.drawing = window.drawing || {}, jQuery));
