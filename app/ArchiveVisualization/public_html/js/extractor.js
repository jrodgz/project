var extractor = extractor || {};

// namespace for memento extracting
(function (memento, $, undefined) {

    var jsonData = [];

    memento.getTimestampsWithMementos = function () {
        return jsonData;
    };

    /* 
     * NOTE: it seems that the archive it website has a very specific url. At index 4,
     *  if we are parsing by a forward slash, the http:// method contains two, the timestamp is located.
     *  from this, we only need the first 8 didgits, as it represents the year, month, day respectfully.
     */

    memento.createTimeStampsForMementos = function (statusDiv, mementos) {
        updateStatus(statusDiv, "Preparing to parse mementos for timestamps");
        var numberOfMementos = mementos.length;
        for (var i = 0; i < numberOfMementos; i++) {
            var bits = mementos[i].split("/");
            var timestamp = bits[4].substring(0, 14);
            jsonData.push({
                memento: mementos[i],
                timestamp: timestamp
            });
        }
        updateStatus(statusDiv, "Completed parsing timestamps of mementos");
    };


}(window.extractor.memento = window.extractor.memento || {}, jQuery));