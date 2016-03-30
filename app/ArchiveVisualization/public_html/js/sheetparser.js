/*
 groups:
 3: archive
 5: date
 7: archived version of whole
 8: archived domain
 */

var sheetParser = function (url, statusdiv) {
   this.sp = this;
   this.url = url;
   this.statusDiv = statusdiv;
   this.linkExtractor = new RegExp("^((http[s]?):\/)?\/?([^:\/\s]+)\/([0-9]+|web)\/([0-9]+)\/((http[s]?):\/\/)((www.)?([a-zA-z\.]+))(\/(.+)?)$");
};


sheetParser.prototype.setSheetUrl = function (url) {
   this.url = url;
};

sheetParser.prototype.setStatusDiv = function (div) {
   this.statusDiv = div;
};

sheetParser.prototype.parseSheet = function (data) {
   updateStatus(statusDiv, "Preparing to parse mementos for timestamps");
   var taggedMementos = [];
   data.feed.entry.forEach(function (entry) {
      var data = {
         archiver: entry.gsx$archiver.$t,
         name: entry.gsx$name.$t,
         tags: entry.gsx$tags.$t.split(","),
         uri: entry.gsx$uri.$t,
         mementos: [],
         title: entry.title.$t
      };
      entry.gsx$mementos.$t.split(",").forEach(function (m) {
         if(sp.linkExtractor.test(m))
            data.mementos.push(new Memento(sp.linkExtractor.exec(m),m));
      });
      taggedMementos.push(new TaggedMemmentos(data));
   });
   updateStatus(statusDiv, "Finished parsing mementos for timestamps");
   return taggedMementos;
};

sheetParser.prototype.loadSheet = function () {
   if ((typeof this.url !== 'undefined') && this.url !== null) {
      updateStatus(statusDiv, 'Loading sheet...');
      return $.getJSON(this.url)
         .error(function () {
            updateStatus(statusDiv, 'FATAL: unable to reach spreadsheet');
         })
         .then(function (data) {
             updateStatus(statusDiv, 'Sheet loading complete');
           return sp.parseSheet(data);
         });
   } else {
      alert("provide a url to use first");
   }
};


