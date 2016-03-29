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
    };

    // Renders the list of words inside group, optionally calling action on 
    // the group of words.
    // The rendered group of words is retained for further manipulations.
    drawing.WordGroup = function(group, words, action = null) {
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

        var word = group.append('g')
            .attr('class', 'word')
            .selectAll('text')
            .data(words)
            .enter()
            .append('text')
            .attr('x', functionMath.floor(Math.random() * width) + 1)
            .attr('y', Math.floor(Math.random() * height) + 1)
            .text(function(d) { return d; });

        if (action != null) {
            word.call(action);
        }

        this.updateStyle();
    };

    // Poops out a scatterplot. Assumes data has the following members:
    // { x, y, color }.
    drawing.ScatterPlot = function(g,       // group
                                   d,       // dataset { x, y, color }
                                   w = 640, // width
                                   h = 480, // height
                                   p = 75,  // padding
                                   t = 5,   // ticks
                                   r = 4)   // radius
    {
        // Draws the dataset inside its corresponding group.
        this.draw = function() {
            // only draw once
            if (marks == null) {
                // create circles
                marks = group.selectAll('circle')
                    .data(dataset)
                    .enter()
                    .append('circle')
                    .attr('cx', function(d) {
                        return xScale(d.x);
                    })
                    .attr('cy', function(d) {
                        return yScale(d.y);
                    })
                    .attr('r', radius);

                // create x axis
                group.append('g')
                    .attr('class', 'axis x-axis')
                    .attr('transform', 'translate(0,' + (height - padding) + ')')
                    .call(xAxis);

                // create y axis
                group.append('g')
                    .attr('class', 'axis y-axis')
                    .attr('transform', 'translate(' + padding + ',0)')
                    .call(yAxis);
            }
        };

        // Update mark colors.
        this.recolor = function() {
            if (marks != null) {
                marks.style('fill', function(d) { return d.color; });
            }
        };

        // Places the text returned by readData as a label shown when the mouse
        // hovers over the chart marks. The callback is expected to know how to
        // read implementation specific details of the data to return the text
        // to be used for a lable.
        this.makeHoverLabels = function(readData) {
            if (hoverLabels == null && marks != null) {
                hoverLabels = group.selectAll('.hover-label')
                    .data(dataset)
                    .enter()
                    .append('text')
                    .attr('class', 'hover-label')
                    .attr('transform', function(d, i) {
                        return 'translate(' + (xScale(d.x) - 55) + ',' + 
                               (yScale(d.y) - 10) + ')';
                    });

                marks.on('mouseover', function(d, i) { 
                    hoverLabels.each(function(d, j) {
                        if (i == j) {
                            d3.select(this)
                                .text(function(d, i) {
                                    return readData(d, i);
                                });
                        }
                    })
                })
                .on('mouseout', function(d, i) {
                    hoverLabels.each(function(d, j) {
                        if (i == j) {
                            d3.select(this).text('');
                        }
                    })
                });
            }
        };

        // Place lables on the vertical and horizontal axes.
        this.drawAxisLabels = function(vertical, horizontal) {
            if (group != null) {
                group.select('.x-axis')
                    .append('text')
                    .attr('x', width * 0.80 / 2 )
                    .attr('y', -5)
                    .text(horizontal);

                group.select('.y-axis')
                    .append('text')
                    .attr('transform', 'rotate(-90)')
                    .attr('x', -height * 1.10 / 2)
                    .attr('y', 10)
                    .text(vertical);
            }
        };

        // private
        var group = g;
        var dataset = d;
        var width = w;
        var height = h;
        var padding = p;
        var radius = r;
        var ticks = t;

        var xScale = d3.scale.linear()
            .domain([ d3.min(dataset, function(d) { return d.x }) - 50,
                      d3.max(dataset, function(d) { return d.x }) + 50])
            .range([ padding, width - padding * 2]); 

        var yScale = d3.scale.linear()
            .domain([ d3.min(dataset, function(d) { return d.y }) - 50,
                      d3.max(dataset, function(d) { return d.y }) + 50])
            .range([ height - padding, padding ]);

        var xAxis = d3.svg.axis()
            .scale(xScale)
            .orient('bottom')
            .ticks(t);

        var yAxis = d3.svg.axis()
            .scale(yScale)
            .orient('left')
            .ticks(t);

        var marks = null;
        var hoverLabels = null;
    };

    // TODO: Probably should have base class for common functionality.
    // TODO: WIP
    drawing.BarPlot = function(g,       // group
                               d,       // dataset { x, y, color }
                               w = 640, // width
                               h = 480, // height
                               p = 75,  // padding
                               t = 5,   // ticks
                               r = 4)   // radius
    {
        // Draw the bar plot inside its corresponding group.
        this.draw = function() {
            if (marks == null) {
                group.selectAll('.bar')
                    .data(dataset)
                    .enter()
                    .append('rect')
                    .attr('class', 'bar')
                    .attr('x', function(d) { return xScale(d.name); })
                    .attr('y', function(d) { return yScale(d.value); })
                    .attr('height', function(d) { return height - yScale(d.value); })
                    .attr('width', xScale.rangeBand());
            }
        };

        // private
        var group = g;
        var dataset = d;
        var width = w;
        var height = h;
        var padding = p;
        var ticks = t;

        var xScale = d3.scale.ordinal()
            .domain(dataset.map(function(d) { return d.name; }))
            .rangeRoundBands([ padding, width - padding * 2], 0.1); 

        var yScale = d3.scale.linear()
            .domain([ 0, d3.max(dataset, function(d) { return d.value; }) ])
            .range([ height - padding, padding ]);

        var marks = null;
    };

    // Poops out a legend.
    drawing.Legend = function(g, mw = 25, mh = 25, mp = 10) {
        // Draw the legend with the provided categories.
        // { category, color }
        this.draw = function(categories) {
            if (marks == null) {
                marks = group.append('g')
                    .attr('class', 'legend')
                    .selectAll('rect')
                    .data(categories)
                    .enter()
                    .append('g'); // rectangle label combination

                marks.append('rect')
                    .attr('x', 0)
                    .attr('y', function (d, i) {
                        return (markHeight + markPadding) * i;
                    })
                    .attr('width', markWidth)
                    .attr('height', markHeight)
                    .attr('fill', function(d, i) {
                        return d.color
                    });

                marks.append('text')
                    .attr('transform', function(d, i) { 
                        var x = markWidth + markPadding;
                        var y = (markHeight + markPadding) * i;
                        y += tweak;
                        return 'translate(' + x + ',' + y + ')';
                    })
                    .attr('class', 'legend-text')
                    .text(function(d) {
                        return d.category;
                    });
            }
        };

        // private
        var group = g;
        var markWidth = mw;
        var markHeight = mh;
        var markPadding = mp;
        var tweak = 16; // might need to expose this
        var marks = null;
    }
}(window.drawing = window.drawing || {}, d3));

// Extends the drawing namespace to include useful layout routines.
(function(drawing, $, undefined) {
    // Instantiate these to create a small image gallery.
    // Expects div to be a jQuery div selection.
    drawing.ImageGroup = function(div, pathList, ipp = Number.MAX_VALUE) {
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
        this.paginate = function(ipp = Number.MAX_VALUE) {
            imagesPerPage = ipp;
            nPages = Math.ceil(nImages / imagesPerPage);
            currPage = 0;
            redraw();
        };

        function redraw()
        {
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
