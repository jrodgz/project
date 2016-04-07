var preprocess = window.preprocess || {};

// Lazily collect useful transformations of the data which can be shared between
// the different views.
(function(preprocess, undefined) {
	// Notify when the data has loaded.
	preprocess.onLoad = function(data) {
		raw = data;
	};
	
	// Fetch all domains across all stories, and the URI-Ms associated to each domain.
	// Returns null if called before data loads.
	preprocess.getDomains = function() {
		if (raw != null && domains == null)
		{
			domains = {};
			raw.forEach(function(story) {
				story.mementos.forEach(function(memento) {
					var domain = memento.domain.replace(/(.*?:\/\/)*(www\.)*/g, '');
					if (domains[domain] == null) {
						domains[domain] = [];
					}
					domains[domain].push(memento.original);
				});
			});
		}
		return domains;
	};

	var domains = null;
	var raw = null;
}(window.preprocess = window.preprocess || {}));