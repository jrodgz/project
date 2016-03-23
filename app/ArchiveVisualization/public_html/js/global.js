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