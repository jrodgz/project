/*
 * only place global functions in here, but be limited
 */

var parsingComplete = false;

function updateStatus(divToUpdate, stringToSay) {
    divToUpdate.append('Action: ' + stringToSay + ' <br />');
    divToUpdate.scrollTop(divToUpdate.prop('scrollHeight'));
};

function updateContent(divToUpdate, stringToSay) {
    divToUpdate.append('Content: ' + stringToSay + ' <br />');
};

function setParsingComplete(statusDiv, isComplete) {
    parsingComplete = isComplete;
    updateStatus(statusDiv, 'Parsing complete');
};
