"use strict";

/*
 tag: t,
 date: dt,
 domain: d ,
 site: d,
 fullD: fullDom,
 jsDate: function () {
 return this.date.toDate();
 },
 year: function () {
 return this.date.year();
 },
 month: function () {
 return this.date.month()+1;
 },
 ms: function(){
 return this.date.format("MMM");
 },
 day: function () {
 return this.date.day();
 },
 compare: function(m) {
 if (this.date.isBefore(m.date)) return -1;
 if (this.date.isSame(m.date)) return 0;
 return 1;
 }
 */
class MementoTag {
   constructor(m, tag) {
      this.tag = tag;
      this.year = m.year();
      this.month = m.month() + 1;
      this.ms = m.date.format("MMM");
      this.day = m.day();
      this.moment = m.date;
      this.jsDate = m.jsDate();
      this.domain = S(tldjs.getDomain(m.domain))
         .strip(tldjs.getPublicSuffix(tldjs.getDomain(m.domain)))
         .stripPunctuation().s;
      this.fullDom = m.domain;
   }

   compare(m) {
      if (this.moment.isBefore(m.moment)) return -1;
      if (this.moment.isSame(m.moment)) return 0;
      return 1;
   }
}