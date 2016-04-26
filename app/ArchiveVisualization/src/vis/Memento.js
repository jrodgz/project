'use strict';

import 'babel-polyfill';
import moment from 'moment';
import S from 'string';
import tld from 'tldjs';
import MementoTag from './MementoTag';
import _ from 'lodash';


class Memento {
   constructor(marray, original) {
      this.date = moment(marray[5], "YYYYMMDDHHmmss");
      this.archive = marray[3];
      this.domain = marray[9];
      this.original = original;
      this.tags = null;
      this.tagproject = null;
      this.domainWithSuffix = tld.getDomain(this.domain);
   }

   addTags(tags) {
      this.tags = Array.from(tags);
      var d = S(tld.getDomain(this.domain))
         .strip(tld.getPublicSuffix(tld.getDomain(this.domain)))
         .stripPunctuation().s;
      var dt = this.date;
      var fullDom = this.domain;
      this.tagproject = _.map(Array.from(this.tags), t => new MementoTag (this,t));
   }

   getSerializableData(){
      return {
         tags: this.tags,
         year: this.date.year(),
         month: this.date.month()+1,
         ms: this.date.format("MMM"),
         day: this.date.date(),
         domain: this.domain,
         archive: this.archive,
         original: this.original,
         sdateString: this.date.format('DD/MMM/YYYY'),
         jsdateString: this.date.toDate().toDateString(),
         datei: this.date._i
      };
   }

   getTagDomainDate() {
      return this.tagproject;
   }

   jsDate() {
      return this.date.toDate();
   }

   year() {
      return this.date.year();
   }

   dateString() {
      return this.date.format('DD/MMM/YYYY');
   };


   month() {
      return this.date.month();
   };


   day() {
      return this.date.date();
   }

   cleanDomain() {
      return tld.getDomain(this.domain);
   }


   compare(m) {
      if (this.date.isBefore(m.date)) return -1;
      if (this.date.isSame(m.date)) return 0;
      return 1;
   }

   toSstring(){
      return this.dateString()+" "+this.domain+" "+this.tags;
   }
   
   toJSON(){
      return this.toString();
   }
   
   
}

export default Memento;