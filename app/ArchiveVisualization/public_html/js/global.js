/*
 * only place global functions in here, but be limited
 */

var parsingComplete = false;

function updateStatus(divToUpdate, stringToSay) {
    divToUpdate.append('Action: ' + stringToSay + ' <br />');
};

function updateContent(divToUpdate, stringToSay) {
    divToUpdate.append('Content: ' + stringToSay + ' <br />');
};

function setParsingComplete(isComplete) {
    parsingComplete = isComplete;
}

function waitForParsingComplete(statusDiv) {
    if(parsingComplete === false) {
       window.setTimeout(function() {waitForParsingComplete(statusDiv)}, 100); /* this checks the flag every 100 milliseconds*/
    } else {
        updateStatus(statusDiv, 'INFO: Parsing complete');
    }
}

/**
 * @brief Appends a pannable, zoomable container to the given group.
 *
 * @param[in] group
 * The group in which the container will be appended.
 *
 * @param[in] width
 * Width of input sensitive region.
 *
 * @param[in] height
 * Height of input sensitive region.
 */
function createZoomableContainer(group, width, height) {
    var zoom = d3.behavior.zoom()
        .scaleExtent([1, 10])
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
}
