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

        group.on('dblclick.zoom', null);

        return container;
    };

    // Use this function to draw width and height worth of grid lines 
    // inside group.
    drawing.drawGridLines = function(group, width, height, tick) {
        tick = tick || 10;

        var rules = {
            'fill': 'none',
            'shape-rendering': 'crispEdges',
            'stroke': 'lightgray'
        };

        var g = group.append('g')
            .attr('class', 'grid')
            // center the grid lines
            .attr('transform', 'translate(' + (-width / 2) + ',' 
                                            + (-height / 2) + ')');

        g.append('g')
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

        g.append('g')
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
                    if (mode == 'drag') {
                        d3.select(this).classed('dragging', true);
                    }
                }

                function dragged(d) {
                    if (mode == 'drag') {
                        d3.select(this)
                            .attr('x', d.x = d3.event.x)
                            .attr('y', d.y = d3.event.y);
                    }
                }

                function dragEnded(d) {
                    if (mode == 'drag') {
                        d3.select(this).classed('dragging', false);
                    }
                }

                var drag = d3.behavior.drag()
                    .origin(function(d) { return d; })
                    .on('dragstart', dragStarted)
                    .on('drag', dragged)
                    .on('dragend', dragEnded);

                word.call(drag);
            }
        };

        // Will call action when words are selected if selection mode is 
        // enabled.
        this.makeSelectable = function(action) {
            if (word != undefined) {
                word.on('click', function(d, i) {
                    if (mode == 'select' && action) {
                        action(this, d, i);
                    }
                });
            }
        };
        
        // Allow dragging if words have been made draggable.
        this.dragMode = function() {
            mode = 'drag';
        };

        // Allow selecting if words have been made selectable.
        this.selectMode = function() {
            mode = 'select';
        };

        // Append events to words.
        this.on = function(evType, callback)
        {
            if (word != null) {
                word.on(evType, callback);
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
            .text(function(d) { return d.text; })
            .style('cursor', 'default');

        var mode = 'select';

        this.updateStyle();
    };
	
	// Draws a node link diagrams with different connection types.
    drawing.TextNodes = function(g, w, h) 
	{
		// data is an array of objects expected to have the fields: text, style, payload
		this.setData = function(data, connection)
		{
			var i = 0, j = 0;
			connection = connection || 'i';
			
			// inter-connected nodes
			if (connection == 'i')
			{
				nodes = data;			
				links = [];
				for (i = 0; i < nodes.length; ++i)
				{
					for (j = 0; j < nodes.length; ++j)
					{
						// create less connections
						if (j != i && Math.random() < 0.25)
						{
							links.push({ source: i, target: j, graph: 0 });
						}
					}
				}
			}
			// linearly connected nodes
			else if (connection == 'l')
			{
				nodes = data;			
				links = [];
				for (i = 1; i < nodes.length; ++i)
				{
					links.push({ source: i, target: i - 1, graph: 0 });
				}
			}
			else
			{
				console.log('unknown connection type, no changes made');
			}
			
			force.nodes(nodes).links(links).start();
		};
		
		this.drawNodes = function()
		{
			if (nodes)
			{
				if (node != null)
				{
					node.remove();
				}
				
				node = group.selectAll('.node')
					.data(nodes)
					.enter()
					.append('text')
					.attr('class', 'node')
					.attr('x', function(d) { return d.x; })
					.attr('y', function(d) { return d.y; })
					// don't change mouse to text cursor
					.style('cursor', 'default')
					.text(function(d) { return d.text; })
					.call(force.drag)
					.each(function(d) { 
						d3.select(this)
							.style(d.style);
					});

				this.updateStyle();
			}
		};
		
		this.drawLinks = function()
		{
			if (links)
			{
				if (link != null)
				{
					link.remove();
				}
				
				link = group.selectAll('.link')
						.data(links)
						.enter()
						.append('line')
						.style('stroke', 'black')
						.style('stroke-width', '1px');
				
				this.updateStyle();
			}
		};
		
		this.clearLinks = function()
		{
			if (link)
			{
				link.remove();
			}
		};
		
		// you can call this repeatedly if the styles are transitioning
		this.updateStyle = function()
		{
			if (node)
			{
				node.style(function(d) { return d.style; });
			}
		};
		
		// appends events for delivery of payload
		this.on = function(etype, action)
		{
			if (node)
			{
				node.on(etype, function(d) {
					if (action)
					{
						action(d.payload);
					}
				});
			}
		};
		
		var group = g;
		var width = w || 640;
		var height = h || 480;
		var nodes = null;
		var links = null;
		var node = null;
		var link = null;
		var force = d3.layout.force()
				// rigid links
				.linkDistance(200)
				.linkStrength(1.0)
				// slow things down
				.friction(0.001)
				.size([ width, height ])
				.on('tick', function(e) {
					if (node)
					{
						node.attr('x', function(d) { return d.x; })
						node.attr('y', function(d) { return d.y; })
					}
					if (link)
					{
						link.attr('x1', function(d) { return d.source.x; })
							.attr('y1', function(d) { return d.source.y; })
							.attr('x2', function(d) { return d.target.x; })
							.attr('y2', function(d) { return d.target.y; });
					}
				});
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
            height = height || width;
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