'use strict';

import 'babel-polyfill';
import S from 'string';
import tld from 'tldjs';
import MementoTag from './MementoTag';
import _ from 'lodash';
var moment = require('moment');
require('twix');


class Memento {
   constructor(marray, original) {
      this.date = moment(marray[5], "YYYYMMDDHHmmss");
      this.archive = marray[3];
      this.domain = marray[9];
      this.original = original;
      this.fulluri = marray[6];
      this.tags = null;
      this.tagproject = null;
      this.fullTag = null;
      this.domainWithSuffix = tld.getDomain(this.domain);

   }

   addTags(tags,fullTag) {
      this.fullTag = fullTag;
      this.tags = Array.from(tags);
      var d = S(tld.getDomain(this.domain))
         .strip(tld.getPublicSuffix(tld.getDomain(this.domain)))
         .stripPunctuation().s;
      var dt = this.date;
      var fullDom = this.domain;
      this.tagproject = _.map(Array.from(this.tags), t => new MementoTag(this, t));
   }

   getFromData(f) {
      return {
         from: f, temporal: this.date, domain: this.domain,
         original: this.original, domainWithSuffix: tld.getDomain(this.domain),
         timeString: this.date.format("h:mm:ss a"), year: this.date.year(),
         month: this.date.month() + 1, day: this.date.date(), ymd: this.date.format('DD/MMM/YYYY'),
         fullUri: this.fulluri
      };
   }

   doTwix(om) {
      return this.date.twix(om.date);
   }

   dateFormated(f) {
      return this.date.format(f);
   }

   getSerializableData() {
      return {
         tags: this.tags,
         year: this.date.year(),
         month: this.date.month() + 1,
         ms: this.date.format("MMM"),
         day: this.date.date(),
         domain: this.domain,
         archive: this.archive,
         original: this.original,
         fullURIr: this.fulluri,
         sdateString: this.date.format('DD/MMM/YYYY'),
         jsdateString: this.date.toDate().toDateString(),
         datei: this.date._i
      };
   }

   getTagedOne(){
      return new MementoTag(this, this.fullTag);
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
   }


   month() {
      return this.date.month();
   }


   day() {
      return this.date.date();
   }

   cleanDomain() {
      return tld.getDomain(this.domain);
   }


   compare(m) {
      if (this.date.isBefore(m.date))return -1;
      if (this.date.isSame(m.date)) return 0;
      return 1;
   }

   toSstring() {
      return this.dateString() + " " + this.domain + " " + this.tags;
   }

   toJSON() {
      return this.toString();
   }


}

export default Memento;