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
                        parseSheet(statusDiv, data);
                        return data;
                    });
        }
        return true;
    };

    function parseSheet(statusDiv, data) {
        updateStatus(statusDiv, 'Sheet loading complete');
        var entry = data.feed.entry;
        $(entry).each(function () {
            var tags = this.gsx$tags.$t.split(",");
            var mementos = this.gsx$mementos.$t.split(",");
            visualization.parser.addMemento(mementos);
            updateStatus(statusDiv, "added " + mementos.length + " mementos for " + this.gsx$uri.$t);
            visualization.parser.addTag(tags);
            updateStatus(statusDiv, "added " + tags.length + " tags for " + this.gsx$uri.$t);
        });

        setParsingComplete(statusDiv, true);
        updateStatus(statusDiv, "Total mementos added: " + visualization.parser.getMementos().length);
        updateStatus(statusDiv, "Total tags were added: " + visualization.parser.getTags().length);
    }

}(window.visualization.google = window.visualization.google || {}, jQuery));

// namespace for parsing the json data, and storing it into variables
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