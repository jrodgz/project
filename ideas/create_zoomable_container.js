/** @file create_zoomable_container.js */

/**
 * @brief Appends a pannable, zoomable container to the given group.
 *
 * @param container
 * The group in which the container will be appended.
 *
 * @param width
 * Width of input sensitive region.
 *
 * @param height
 * Height of input sensitive region.
 *
 * @return The container in which to add elements to pan over.
 */
function createZoomableContainer(group, width, height)
{
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
