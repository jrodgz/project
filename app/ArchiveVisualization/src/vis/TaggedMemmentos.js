'use strict';

import 'babel-polyfill';
import tld from 'tldjs';
import _ from 'lodash';
import twix from 'twix';
import S from 'string';


class TaggedMemmentos {
   constructor(data) {
      this.tags = Array.from(data.tags);
      this.tagString = data.tagString;
      this.mementos = data.mementos;
      this.mementos.sort((m1, m2)=> m1.compare(m2));
      this.range = this.first().date.twix(this.last().date);
      this.domains = this.mementos.map(m => m.domain);
      this.tagDateDomain = _.flatMap(this.mementos, m => m.getTagDomainDate());
   }

   getSerializableData() {
      return {
         tags: this.tags,
         domains: this.domains,
         mementos: _.map(this.mementos, m => m.getSerializableData())
      };
   }

   cleanedDomains() {
      return this.domains.map(d => {
         return S(tld.getDomain(d)).strip(tld.getPublicSuffix(d)).stripPunctuation().s;
      });
   }

   fullDomains() {
      return this.domains.map(d => tld.getDomain(d));
   }


   hasTag(tag) {
      return this.tags.has(tag);
   }

   tagArray() {
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
      return _.groupBy(this.mementos, m => m.domain)
   };

   groupedByYrMnth() {
      var it = this.groupedByYear();
      _.keys(it).forEach(k => it[k] = _.groupBy(it[k], m=> m.month() + 1));
      return it;
   };

   toJSON() {
      return this.toString();
   }
}

export default TaggedMemmentos;