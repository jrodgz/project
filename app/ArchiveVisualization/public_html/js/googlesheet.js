var visualization = visualization || {};

(function (google, $, undefined) {

    // private properties
    var url;
    var statusDiv;
    
    // setters and getters
    google.setStatusDiv = function (div) {
        statusDiv = div;
    };
    
    google.setSheetUrl = function (receivedUrl) {
        url = receivedUrl;
    };

    google.getSheetUrl = function () {
        return url;
    };

    // public methods
    google.loadSheet = function () {
        if (!url) {
            alert("provide a url to use first");
        } else {
            updateStatus(statusDiv, 'Loading sheet...');
            return $.getJSON(url)
                    .error(function() { 
                        updateStatus(statusDiv, 'FATAL: unable to reach spreadsheet');
                    })
                    .then(function (data) {
                        updateStatus(statusDiv, 'Sheet loading complete');
                        return data;
                    });
        }
        return true;
    };

}(window.visualization.google = window.visualization.google || {}, jQuery));