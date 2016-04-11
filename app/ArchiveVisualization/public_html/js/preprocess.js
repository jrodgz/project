var preprocess = window.preprocess || {};

// Collect useful transformations of the data.
(function(preprocess, undefined) {
    // Notify when the data has loaded.
    preprocess.onLoad = function(data) {
        raw = data;
        populate();
    };

    preprocess.getTags = function() { return tags; };

    preprocess.getDomains = function() { return domains; };

    // Organize mementos by archivers, tags, and domains.
    function populate() {
        if (raw != null) {
            archivers = {};
            tags = {};
            domains = {};
            raw.forEach(function(tm) { // tagged mementos
                tm.mementos.forEach(function(memento) {
                    var domain = memento.domain.replace(/(.*?:\/\/)*(www\.)*/g, 
                                                        '');
                    var payload = { 
                        urim: memento.original,
                        urir: domain,
                        date: memento.dateString()                    
                    };

                    if (domains[domain] == null) {
                        domains[domain] = [];
                    }

                    domains[domain].push(payload);

                    tm.tags.forEach(function(tag) {
                        var tag = tag.replace(/[^a-zA-Z0-9]/g, '');
                        if (tags[tag] == null) {
                            tags[tag] = [];
                        }

                        tags[tag].push(payload);
                    });
                });
            });
        } else {
            console.log('preprocess.populate: data has not loaded');
        }
    }

    var raw = null;
    var tags = null;
    var domains = null;
}(window.preprocess = window.preprocess || {}));
