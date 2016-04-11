"use strict";
class sheetParser2 {
   constructor(url, statusdiv){
      this.sp = this;
      this._url = url;
      this.statusDiv = statusdiv;
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
         updateStatus(this.statusDiv,'Loading sheet...');
         return $.getJSON(this._url)
            .error(function () {
               updateStatus(statusDiv, 'FATAL: unable to reach spreadsheet');
            }).then(data => this.parseSheet(data))

      }
   }

   parseSheet(data){
      updateStatus(statusDiv, 'Sheet loading complete');
      updateStatus(statusDiv, "Preparing to parse mementos for timestamps");
      return _.map(_.pairs(_.groupBy(data.feed.entry,e => e.gsx$collectionname.$t)),p=> {
         console.log(p);
         var d = {
            collectedBy: p[1][0].gsx$collectedby.$t,
            collectionName: p[1][0].gsx$collectionname.$t,
            tags: new Set(p[1][0].gsx$tags.$t.split(',')),
            mementos: _.map(p[1],e =>
               new Memento(this.linkExtractor.exec(e['gsx$uri-m'].$t.trim()),e['gsx$uri-m'].$t.trim())
            ),
            id: p[1][0].gsx$id.$t
         };
         this._buildStories(p);
         /*

          */
         console.log(_.groupBy(p[1],e => e.gsx$story.$t));
         return new MementoCollection(d);
      });
   }

   _buildStories(collection){
      console.log(collection);
      let uniquStories = _.uniq(collection[1],e => e.gsx$story.$t);
      if(Object.keys(uniquStories).length == 1){
         console.log("We only have one story");
      } else {
         
      }
      console.log(uniquStories);
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