'use strict';
class TaggedMemmentos {
   constructor(data) {
      this.tags = data.tags;
      this.tagString = data.tagString;
      this.mementos = data.mementos;
      this.mementos.sort((m1, m2)=> m1.compare(m2));
      this.range = this.first().date.twix(this.last().date);
      this.domains = this.mementos.map(m => m.domain);
      this.tagDateDomain = _.flatMap(this.mementos,m => m.getTagDomainDate());
   }
   
   cleanedDomains(){
      return this.domains.map(d => {
         return S(tldjs.getDomain(d)).strip(tldjs.getPublicSuffix(d)).stripPunctuation().s;
      });
   }

   fullDomains(){
      return this.domains.map(d => tldjs.getDomain(d));
   }


   hasTag(tag){
      return this.tags.has(tag);
   }

   tagArray(){
      return Array.from(this.tags);
   }

   first() {
      return this.mementos[0];
   }

   last() {
      return this.mementos[this.mementos.length - 1];
   };

   numMementos() {
      return this.mementos.length;
   };

   groupedByYear() {
      return _.groupBy(this.mementos, m => m.date.year());
   };

   groupedByDomain() {
      return _.groupBy(this.mementos, m =>  m.domain)
   };
   
   groupedByYrMnth() {
      var it = this.groupedByYear();
      _.keys(it).forEach(k => it[k] = _.groupBy(it[k],m=> m.month()+1));
      return it;
   };
}

// /*
//  archiver: entry.gsx$archiver.$t,
//  name: entry.gsx$name.$t,
//  tags: entry.gsx$tags.$t.split(","),
//  uri: entry.gsx$uri.$t,
//  mementos: [],
//  title: entry.gsx$title.$t
//  */
// var TaggedMemmentos = function (data) {
//    this.tags = data.tags;
//    this.mementos = data.mementos;
//    this.mementos.sort(function (m1, m2) {
//       if (m1.date.isBefore(m2.date)) return -1;
//       if (m1.date.isSame(m2.date)) return 0;
//       return 1;
//    });
//    this.uri = data.uri;
//    this.archiver = data.archiver;
//    this.title = data.title;
//    this.uri = data.uri;
// };
//
// TaggedMemmentos.prototype.first = function () {
//    return this.mementos[0];
// };
//
// TaggedMemmentos.prototype.last = function () {
//    return this.mementos[this.mementos.length - 1];
// };
//
// TaggedMemmentos.prototype.numMementos = function () {
//    return this.mementos.length;
// };
//
// TaggedMemmentos.prototype.groupedByYear = function () {
//    return _.groupBy(this.mementos, function (m) {
//       return m.date.year();
//    });
// };
//
// TaggedMemmentos.prototype.groupedByDomain = function () {
//    return _.groupBy(this.mementos, function (m) {
//       return m.domain;
//    })
// };
//
// TaggedMemmentos.prototype.groupedByYrMnth = function () {
//    var it = this.groupedByYear();
//    _.keys(it).forEach(function (k) {
//       it[k] = _.groupBy(it[k], function (m) {
//          return m.date.month() + 1;
//       })
//    });
//    return it;
// };


