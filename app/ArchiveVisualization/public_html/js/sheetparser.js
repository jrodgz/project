/*
 var linkExtractor =/^((http[s]?):\/)?\/?([^:\/\s]+)\/\w+\/(\w+)\/((http[s]?|ftp):\/\/)(www.([a-zA-z\.]+)[^#?\s]+)$/g;
 var linkExtractor = new RegExp("^((http[s]?):\/)?\/?([^:\/\s]+)\/\w+\/(\w+)\/((http[s]?|ftp):\/\/)(www.([a-zA-z\.]+)[^#?\s]+)$");
 var linkExtractor = new RegExp("^((http[s]?):\/)?\/?([^:\/\s]+)\/\w+\/(\w+)\/((http[s]?|ftp):\/\/)(www.([a-zA-z\.]+)[^#?\s]+)$");
 var linkExtractor = new RegExp("^((http[s]?):\/)?\/?([^:\/\s]+)\/\w+\/(\w+)\/((http[s]?|ftp):\/\/)(www.([a-zA-z\.]+)[^#?\s]+)$");
 var linkExtractor = new RegExp("^((http[s]?):\/)?\/?([^:\/\s]+)\/[0-9]+\/([0-9]+)\/((http[s]?):\/\/)(www.([a-zA-z\.]+)\/(.+)?)$");



 ^((http[s]?):\/)?\/?([^:\/\s]+)\/[0-9]+\/([0-9]+)\/([\w\-\.]+[^#?\s]+)(#[\w\-]+)?$
 ^((http[s]?):\/)?\/?([^:\/\s]+)\/([0-9]+|web)\/([0-9]+)\/((http[s]?):\/\/)((www.)?([\w\.]+)\/(.+)?)$

 ((http[s]?):\/)?\/?([^:\/\s]+)\/([0-9]+|web)\/([0-9]+)\/((http[s]?):\/\/)?((www.)?([\w\.]+)\/(.+)?)

 ((http[s]?):\/)?\/?([\w\.\-]+)\/([0-9]+|web)\/([0-9]+)\/((http[s]?):\/\/)?((www.)?([\w\.]+)\/(.+)?)
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
   updateStatus(statusDiv, 'Sheet loading complete');
   updateStatus(statusDiv, "Preparing to parse mementos for timestamps");
   var taggedMementos = [];
   data.feed.entry.forEach(function (entry) {
      console.log(entry);
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
      console.log(data);
      taggedMementos.push(new TaggedMemmentos(data));
   });
   return taggedMementos;
};

sheetParser.prototype.loadSheet = function () {
   console.log(this.url);
   if ((typeof this.url !== 'undefined') && this.url !== null) {
      updateStatus(statusDiv, 'Loading sheet...');
      return $.getJSON(this.url)
         .error(function () {
            updateStatus(statusDiv, 'FATAL: unable to reach spreadsheet');
         })
         .then(function (data) {
           return sp.parseSheet(data);
         });
   } else {
      alert("provide a url to use first");
   }
};


