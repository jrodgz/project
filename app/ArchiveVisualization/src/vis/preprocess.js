'use strict';
import 'babel-polyfill';

class preprocess{
   constructor(){
      this.raw = null;
      this.tags = null;
      this.domains = null;
      this.dates = null;
   }
   onLoad(data) {
      this.raw = data;
      this.populate();
   };

   getTags() { return this.tags; };

   getDomains() { return this.domains; };

   getDates() { return this.dates; };
   
   populate(){
      if (this.raw != null) {
         let tags = {};
         let domains = {};
         let dates = {};
         this.raw.forEach(function(tm) { // tagged mementos
            tm.mementos.forEach(function(memento) {
               var domain = memento.domain.replace(/(.*?:\/\/)*(www\.)*/g,
                  '');
               var payload = {
                  urim: memento.original,
                  urir: domain,
                  date: memento.dateString(),
                  datei: memento.date._i
               };

               if (domains[domain] == null) {
                  domains[domain] = [];
               }

               domains[domain].push(payload);

               if (dates[memento.dateString()] == null) {
                  dates[memento.dateString()] = [];
               }

               dates[memento.dateString()].push(payload);

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
}

export default preprocess;
