"use strict";
class sheetParser2 {
   constructor(url){
      this.sp = this;
      this._url = url;
      this.linkExtractor =
       new RegExp("^((http[s]?):\/)?\/?([^:\/\s]+)\/([0-9]+|web)\/([0-9]+)\/(((http[s]?):\/\/)((www.)?([a-zA-z0-9\.\-]+))(\/(.+)?))$");
   }

   get url(){
      return this._url;
   }

   set url(url){
      this._url = url;
   }

   loadSheet(){
      if((typeof this._url !== 'undefined') && this._url !== null){
         return $.getJSON(this._url)
            .error(function () {
              alert("error loading sheet");
            }).then(data => this.parseSheet(data))

      }
   }

   parseSheet(data){
      return _(data.feed.entry)
         .groupBy(e => e.gsx$tags.$t)
         .toPairs()
         .map(p => {
            var d = {
               tags: new Set(p[0].split(',').map(s => S(s).trim().s)),
               tagString: p[0],
               mementos: _.map(p[1],e =>
                  new Memento(this.linkExtractor.exec(e['gsx$uri-m'].$t.trim()),e['gsx$uri-m'].$t.trim())
               )
            };
            return new TaggedMemmentos(d)
         })
         .value();
   }
   
}

/*

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
   */