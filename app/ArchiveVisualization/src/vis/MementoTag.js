'use strict';

import 'babel-polyfill';
import tld from 'tldjs';
import S from 'string';

class MementoTag {
   constructor(m, tag) {
      this.tag = tag;
      this.year = m.year();
      this.month = m.month() + 1;
      this.ms = m.date.format("MMM");
      this.day = m.day();
      this.moment = m.date;
      this.jsDate = m.jsDate();
      this.domain = S(tld.getDomain(m.domain))
         .strip(tld.getPublicSuffix(tld.getDomain(m.domain)))
         .stripPunctuation().s;
      this.domainWithSuffix = tld.getDomain(m.domain);
      this.fullDom = m.domain;
   }

   getSerializableData(){
      return {
         tag: this.tag,
         year: this.year,
         month: this.month,
         ms: this.ms,
         day: this.day,
      };
   }

   dateString() {
      return this.moment.format('MMM-DD-YYYY');
   }

   timeString(){
      return this.moment.format('LTS');
   }

   dateTimeString(){
      return this.moment.format('ddd-MMM-DD-YYYY @ h:m:sa');
   }

   summaryString(){
      return this.tag + ":"+ this.domainWithSuffix+":"+this.moment.format('ddd-MMM-DD-YYYY @ h:m:sa');
   }

   makeNodeData(){
      return {
         moment: this.moment,
         tag: this.tag,
         domain: this.domain,
         domainSuf: this.domainWithSuffix,
         fullDom: this.fullDom
      };
   }

   compare(m) {
      if (this.moment.isBefore(m.moment)) return -1;
      if (this.moment.isSame(m.moment)) return 0;
      return 1;
   }

   toJSON(){
      return this.toString();
   }


}

export default MementoTag;