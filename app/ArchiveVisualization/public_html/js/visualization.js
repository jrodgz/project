var visualization = visualization || {};

// namespace for reading the google spreadsheet
(function (google, $, undefined) {

    var url;
    var statusDiv;

    google.setStatusDiv = function (div) {
        statusDiv = div;
    };

    google.setSheetUrl = function (receivedUrl) {
        url = receivedUrl;
    };

    google.loadSheet = function () {
        if (!url) {
            alert("provide a url to use first");
        } else {
            updateStatus(statusDiv, 'Loading sheet...');
            return $.getJSON(url)
                    .error(function () {
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

// namespace for parsing the json data, and stroing it into variables
(function (parser, $, undefined) {

    var mementos = [];
    var tags = [];
    
    parser.getMementos = function () {
        return mementos;
    };

    parser.getTags = function () {
        return tags;
    };

    parser.addMemento = function (mementoSet) {
        var numberOfMementos = mementoSet.length;
        for (var i = 0; i < numberOfMementos; i++) {
            mementos.push(mementoSet[i]);
        }
    };

    parser.addTag = function (tagSet) {
        var numberOfTags = tagSet.length;
        for (var i = 0; i < numberOfTags; i++) {
            tags.push(tagSet[i]);
        }
    };

}(window.visualization.parser = window.visualization.parser || {}, jQuery));

