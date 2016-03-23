/*
 * only place global functions in here, but be limited
 */

function updateStatus(divToUpdate, stringToSay) {
    divToUpdate.append('Action: ' + stringToSay + ' <br />');
};