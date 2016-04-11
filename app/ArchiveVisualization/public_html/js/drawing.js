var drawing = drawing || {};

// Namespace that contains common and generally useful drawing routines.
(function(drawing, d3, undefined) {
    // Appends a pannable, zoomable container to the given group.
    // Returns the container in which to add elements to pan over.
    drawing.createZoomableContainer = function(group, width, height) {
        width = width || 1024;
        height = height || 768;

        var zoom = d3.behavior.zoom()
            .scaleExtent([ 1, 10 ])
            .on('zoom', zoomed);

        group.call(zoom)
            .on('dblclick.zoom', null)
            // Don't let anything in this container change the mouse.
            .style('cursor', 'default');

        var rect = group.append('rect')
            .attr('width', width)
            .attr('height', height)
            .style('fill', 'none')
            .style('pointer-events', 'all');

        var container = group.append('g');

        var allow = 250;
        function zoomed() {
            var t = d3.event.translate,
                s = d3.event.scale;
                
                t[0] = Math.min(width / 2 * (s - 1) + allow, 
                                Math.max(width / 2 * (1 - s) - allow, t[0]));

                t[1] = Math.min(height / 2 * (s - 1) + allow * s, 
                                Math.max(height / 2 * (1 - s) - allow * s, t[1]));
                zoom.translate(t);

            container.attr('transform', 'translate(' + t + ')scale(' + s + ')');
        }

        container.resetPanZoom = function() {
            container.attr('transform', 'translate(0,0)scale(1)');

            // https://github.com/mbostock/d3/wiki/Zoom-Behavior
            // http://stackoverflow.com/questions/31497864/d3-how-do-you-center-an-element-with-pan-zoom-enabled
            zoom.translate([ 0, 0 ]);
            zoom.scale(1);
        };

        return container;
    };

    // Use this function to draw width and height worth of grid lines 
    // inside group.
    drawing.drawGridLines = function(group, width, height, tick) {
        // Make grid lines larger than container.
        width = width * 10;
        height = height * 10;

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

    // A simple list of words, rendered inside group.
    drawing.WordGroup = function(g, f) {
        this.draw = function() {
            if (words) {
                if (word) {
                    word.remove();
                }

                word = group.append('g')
                    .attr('class', 'word')
                    .selectAll('text')
                    .data(words)
                    .enter()
                    .append('text')
                    .attr('x', function(d) { return d.x; })
                    .attr('y', function(d) { return d.y; })
                    .text(function(d) { return d.text; })
                    .style('cursor', 'default')
                    .each(function(d) {
                        d3.select(this)
                            .style(d.style);
                    })
                    .style('fill', function(d) { return d.color; })
                    .style('font-size', fontSize);
            }
        };

        this.setData = function(data) {
            words = data;
        };

        this.remove = function() {
            if (word) {
                word.remove();
            }
        };

        // Append events to words.
        this.on = function(evType, callback) {
            if (word != null) {
                word.on(evType, callback);
            }
        };

        // Optionally make the words draggable.
        this.makeDraggable = function() {
            if (word) {
                function dragStarted(d) {
                    d3.event.sourceEvent.stopPropagation();
                    d3.select(this).classed('dragging', true);
                }

                function dragged(d) {
                    d3.select(this)
                        .attr('x', d.x = d3.event.x)
                        .attr('y', d.y = d3.event.y);
                }

                function dragEnded(d) {
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

        var group = g; // <g></g>
        var fontSize = f | 15;
        var word = null;
        var words = null;
    };
    
    // A node link diagram with inter-connected nodes.
    drawing.TextNodes = function(g, w, h) {
        // data is an array of objects expected to have the fields: text, style, payload
        this.setData = function(data) {
            nodes = data;
            var i = 0, j = 0;
            var n = nodes.length;
            
            // inter-connect nodes within a cluster to spread them
            links = [];
            linksPerCluster = {};
            var connected = {};
            nodes.forEach(function(v, i) { connected[i] = {} });
            for (i = 0; i < n; ++i) {
                for (j = 0; j < n; ++j) {
                    if (j != i && 
                        !connected[i][j] &&
                        nodes[i].group == nodes[j].group) {
                        connected[i][j] = true;
                        connected[j][i] = true;
                        var cluster = nodes[i].group;
                        links.push({ source: i, target: j, group: cluster });
                        if (!linksPerCluster[cluster]) {
                            linksPerCluster[cluster] = 1;
                        } else {
                            ++linksPerCluster[cluster];
                        }
                    }
                }
            }

            // spread nodes from the center of the image radially
            var groups = [];
            nodes.forEach(function(d) {
                d.x = width / 2;
                d.y = height / 2;
                groups.push(d.group);
            });
            groups = _.uniq(groups);
            groups = _.sortBy(groups);
            var delta = 360.0 / groups.length;
            groups.forEach(function(v, i) {
                var angle = delta * i;
                directions[v] = { 
                    i: Math.cos(angle),
                    j: Math.sin(angle)
                }
            });
           
            force.nodes(nodes).links(links).start();

            // spread the nodes apart a little faster for static layout
            force.alpha(0.17);
        };

        this.filterNodesByText = function(searchString) {
            if (!searchString || searchString == '') {
                node.style('visibility', 'visible');
                return;
            }
            
            node.each(function(d) {
                var dlower = d.text.toLowerCase();
                var slower = searchString.toLowerCase();
                if (dlower.indexOf(slower) > -1) {
                    d3.select(this).style('visibility', 'visible');
                } else {
                    d3.select(this).style('visibility', 'hidden');
                }
            });
        };
        
        // remember this exists: .call(force.drag)
        this.drawNodes = function() {
            if (nodes) {
                if (node != null) {
                    node.remove();
                }
                
                node = group.selectAll('.node')
                    .data(nodes)
                    .enter()
                    .append('text')
                    .attr('class', 'node')
                    // center nodes along middle of word
                    .attr('x', function(d) {
                        return d.x - d.offset;
                    })
                    .attr('y', function(d) { return d.y; })
                    // don't change mouse to text cursor
                    .style('cursor', 'default')
                    .text(function(d) { return d.text; })
                    .each(function(d) {
                        d3.select(this)
                            .style(d.style);
                    })
                    // set color separately
                    .style('fill', function(d) { return d.color; });
            }
        };
        
        this.drawLinks = function() {
            if (links) {
                if (link != null) {
                    link.remove();
                }
                
                link = group.selectAll('.link')
                        .data(links)
                        .enter()
                        .append('line')
                        .style('stroke', 'black')
                        .style('stroke-width', '1px');
            }
        };
        
        this.remove = function() {
            if (link) {
                link.remove();
            }
            if (node) {
                node.remove();
            }
        };
        
        // appends events for delivery of payload
        this.on = function(etype, action) {
            if (node) {
                node.on(etype, function(d) {
                    if (action) {
                        action(d.payload);
                    }
                });
            }
        };

        var group = g;
        var width = w || 1024;
        var height = h || 768;
        var nodes = null;
        var links = null;
        var linksPerCluster = null;
        var linkDistanceScale = null;
        var node = null;
        var link = null;
        var directions = {};
        var amplify = 65;
        var force = d3.layout.force()
                // rigid links
                .linkDistance(function(l) {
                    var nLinks = linksPerCluster[l.group];
                    if (nLinks == 2) {
                        return 50;
                    } else if (nLinks < 10) {
                        return 75
                    } else if (nLinks < 20) {
                        return 100;
                    } else {
                        return 300;
                    }
                })
                .linkStrength(1.0)
                // slow things down
                .friction(0.001)
                .size([ width, height ])
                .on('tick', function(e) {
                    if (node)
                    {
                        var magnitude = amplify * e.alpha;
                        nodes.forEach(function(o) {
                            var fi = magnitude * directions[o.group].i;
                            var fj = magnitude * directions[o.group].j;
                            o.y += fj;
                            o.x += fi;
                        });
                        
                        node.attr('x', function(d) { return d.x - d.offset; })
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

    drawing.Legend = function (g,  // <g></g>
                               mw, // mark width
                               mh, // mark height
                               mp) // mark padding
    {
        mw = mw || 25;
        mh = mh || 25;
        mp = mp || 10;
    
        // public 
        this.draw = function(marks)
        {
            if (mark != null) {
                mark.remove();
            }

            if (marks != null) {
                mark = group.selectAll('.legend')
                    .data(marks)
                    .enter()
                    .append('g')
                    .attr('class', 'legend');
        
                mark.append('rect')
                    .attr('x', 0)
                    .attr('y', function(d, i) {
                        return (markHeight + markPadding) * i;
                    })
                    .attr('width', markWidth)
                    .attr('height', markHeight)
                    .attr('fill', function(d) {
                        return d.color;
                    });
        
                mark.append('text')
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

        this.remove = function() {
            if (mark != null) {
                mark.remove();
            }
        };
    
        // private 
        var group = g;
        var mark = null;
        var markWidth = mw;
        var markHeight = mh;
        var markPadding = mp;
        var tweak = 16;
    };
}(window.drawing = window.drawing || {}, d3));

// Extends the drawing namespace to include useful layout routines.
(function(drawing, $, undefined) {
    // https://blog.mastykarz.nl/measuring-the-length-of-a-string-in-pixels-using-javascript/
    drawing.visualLength = function(text, fontSize, font) {
        var ruler = document.getElementById('ruler');
        ruler.innerHTML = text;
        ruler.setAttribute('style', 'visibility: hidden; white-space: nowrap; font-size: ' +
                                    fontSize + 'px; font: ' + font + ';');
        return ruler.offsetWidth;
    };
    
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

// Extend drawing with a few predefined views.
(function(predefined, d3, $, drawing, preprocess, undefined) {
    // Expects a d3 selection.
    predefined.DynamicTextNodeView = function(g, w, h, lg) {
        // Expects a jQuery selection.
        this.drawControls = function(div) {
            div.prepend(controlsHtml);

            $('.group-by.category').on('click', function() {
                active = $(this).attr('value');
                if (!drawMementos.visible) {
                    draw();
                }
            });

            $('.group-by').css('margin-left', '15px');

            $('.group-by.filter').on('keypress', function(e) {
                if (e.keyCode == 13) {
                    nodeCanvas.filterNodesByText($(this).val());
                }
            })
            .css('margin-bottom', '10px');

            controls = $('#group-buttons');
            back = $('#back-button').on('click', function() { draw(); })
                .css('margin-bottom', '5px');

            draw();
        };

        this.setTags = function() {
            if (tagNodes == null) {
                tagNodes = [];
                var tags = preprocess.getTags();
                var counts = [];
                for (key in tags) {
                    tagNodes.push({
                        text: key,
                        style: defaultTextStyle,
                        payload: tags[key],
                        group: tags[key].length,
                        offset: drawing.visualLength(key, fontSize, font),
                        color: colorScale(tags[key].length)
                    });

                    counts.push(tags[key].length);
                }

                counts = _.uniq(counts);
                counts.sort();
                tagLegendMarks = counts.map(function (d) { 
                    return {
                        category: d + ' mementos',
                        color: colorScale(d)
                    };
                });
            }

            nodeCanvas.setData(tagNodes);
        };

        this.setDomains = function() {
            if (domainNodes == null) {
                domainNodes = [];
                var domains = preprocess.getDomains();
                var counts = [];

                for (key in domains) {
                    domainNodes.push({
                        text: key,
                        style: defaultTextStyle,
                        payload: domains[key],
                        group: domains[key].length,
                        offset: drawing.visualLength(key, fontSize, font),
                        color: colorScale(domains[key].length)
                    });

                    counts.push(domains[key].length);
                }

                counts = _.uniq(counts);
                counts.sort();
                domainLegendMarks = counts.map(function (d) { 
                    return {
                        category: d + ' mementos',
                        color: colorScale(d)
                    };
                });
            }

            nodeCanvas.setData(domainNodes);
        };

        // remember: nodeCanvas.drawLinks();
        function draw() {
            wordGroup.remove();
            if (group.resetPanZoom) {
                group.resetPanZoom();
            }

            if (active == 'tags') {
                that.setTags();
                legend.draw(tagLegendMarks);
            } else {
                that.setDomains();
                legend.draw(domainLegendMarks);
            }

            nodeCanvas.drawNodes();
            nodeCanvas.on('dblclick', drawMementos);
            
            drawMementos.visible = false;
            if (back && controls) {
                back.css('display', 'none');
                controls.css('display', 'inline');
            }
        }

        function drawMementos(payload) {
            nodeCanvas.remove();
            legend.remove();

            if (group.resetPanZoom) {
                group.resetPanZoom();
            }

            var data = [];
            payload.forEach(function(v, i) {
                var s = defaultTextStyle;
                data.push({
                    text: v.date + ': ' + v.urim,
                    style: s,
                    x: 25,
                    y: 50 + (smallFontSize + mementoPadding) * i,
                    color: 'black'
                });
            });

            wordGroup.setData(data);
            wordGroup.draw();
            wordGroup.on('dblclick', function() {
                alert('open memento in new tab');
            });

            drawMementos.visible = true;
            if (back && controls) {
                back.css('display', 'inline');
                controls.css('display', 'none');
            }
        }

        var group = g;

        var back = null;
        var controls = null;
        var tagNodes = null;
        var tagLegendMarks = null;
        var domainNodes = null;
        var domainLegendMarks = null;

        var active = 'tags';

        var font = 'sans-serif';
        var fontSize = 30;
        var smallFontSize = 23;
        var mementoPadding = 5;
        var defaultTextStyle = {
            'font-family': font,
            'font-size': fontSize + 'px',
            'font-weight': 'bold',
            'fill': 'slateblue',
            'stroke': 'black',
            'stroke-width': '1px'
        };

        var colorScale = d3.scale.category20();
        var nodeCanvas = new drawing.TextNodes(g, w, h);
        var wordGroup = new drawing.WordGroup(g, smallFontSize);
        var legend = new drawing.Legend(lg);

        var that = this;

        var controlsHtml = "<span>\
<span id='group-buttons'>\
<input class='group-by category' type='radio' name='group-by' value='tags' checked='checked' /> tags\
<input class='group-by category' type='radio' name='group-by' value='domains' /> domains\
<input class='group-by filter' type='text' value='' />\
</span>\
<input id='back-button' type='submit' value='Back' />\
</span>";
    };
}(window.drawing.predefined = window.drawing.predefined || {}, 
  d3, jQuery, drawing, preprocess));
