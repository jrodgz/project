'use strict';

import 'babel-polyfill';
import tld from 'tldjs';
import _ from 'lodash';
import S from 'string';
import {mementoGFullURIOverlap,mgbFullURIFilter} from './utils';
import {sameTagDomainTimeData,mgbFullURIFilterShare} from './utils';


class TaggedMemmentos {
   constructor(data,ft) {
      this.tags = Array.from(data.tags);
      this.tset = data.tags;
      this.fullTagS = ft;
      this.tagString = data.tagString;
      this.mementos = data.mementos;
      this.mementos.sort((m1, m2)=> m1.compare(m2));
      this.mementoRange = this.mementos[0].doTwix(this.mementos[this.mementos.length - 1]);
      this.domains = this.mementos.map(m => m.domain);
      this.tagDateDomain = _.flatMap(this.mementos, m => m.getTagDomainDate());
   }

   getFullTag(){
      return _.map(this.mementos,m=>m.getTagedOne());
   }

   getMementoOverlapData() {
      var gd = mgbFullURIFilter(this.mementos);
      var overlapData = {haveOlap:false};
      if (gd.length > 0) {
         overlapData.olapMs = [];
         overlapData.haveOlap = true;
         mementoGFullURIOverlap(gd,overlapData);
      }
      return overlapData;
   }

   getMementoTimeData() {
      var mtd = {};
      mtd.spansHuman = this.mementoRange.humanizeLength();
      mtd.spans = this.mementoRange.format();
      mtd.spansDays = this.mementoRange.count("days");
      mtd.spansHours = this.mementoRange.count("hours");
      mtd.spanMonths = this.mementoRange.count("months");
      mtd.numberOfMementos = this.mementos.length;
      mtd.domains = this.domains;
      mtd.urirs = _.map(this.mementos,m=>m.fulluri);
      mtd.tagString = this.tagString;
      mtd.tags = this.tags;
      let olap = this.getMementoOverlapData();
      mtd.hasOverlap = false;
      if(olap.haveOlap){
         mtd.hasOverlap = true;
         mtd.overlapData = olap.olapMs;
      }
      return mtd;
   }

   shareTags(otherTags) {
      for (let ot of otherTags)
         if (this.tset.has(ot))
            return true;
      return false;
   }

   getSharedInfo(otherTm,from,to) {
      var sharedInfo = {};
      var sharedTags = [];
      for (let ot of otherTm.tset)
         if (this.tset.has(ot))
            sharedTags.push(ot);
      sharedTags.sort();
      sharedInfo.sharedTags = sharedTags.length > 1 ? _.join(sharedTags,','): sharedTags[0];
      sharedInfo.to = to;
      sharedInfo.from = from;
      // console.log(sharedInfo.sharedTags.keys());
      var bothM = _.concat(_.map(this.mementos, m => m.getFromData(1)), _.map(otherTm.mementos, m => m.getFromData(2)));
      sharedInfo.sameYMDTagDomain = _.chain(bothM)
         .groupBy(it => it.ymd)
         .mapValues(v => _.chain(v).groupBy(vv => vv.domainWithSuffix)
            .mapValues(ar => {
               var len = ar.length;
               var retData = [];
               if (len > 1) {
                  if (len > 2) {
                     ar.sort((m1, m2)=> {
                        if (m1.temporal.isBefore(m2.temporal))return -1;
                        if (m1.temporal.isSame(m2.temporal)) return 0;
                        return 1;
                     });
                     for (var i = 0; i < len; ++i) {
                        if (i + 1 < len) {
                           var f = ar[i], s = ar[i + 1];
                           if (f.fullUri == s.fullUri) {
                              retData.push(sameTagDomainTimeData(f, s, true));
                           } else {
                              retData.push(sameTagDomainTimeData(f, s, false));
                           }
                        }
                     }

                  } else {
                     // console.log(ar[0]);
                     retData.push({
                        urir: ar[0].fullUri,
                        domain: ar[0].domainWithSuffix,
                        one: true,
                        date: ar[0].temporal.toDate()
                     });
                  }


               }
               return retData;
            })
            .toPairs().filter(p => p[1].length >= 1)
            .value()
         ).toPairs().filter(p => p[1].length >= 1).value();

      return sharedInfo;

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
   }

   numMementos() {
      return this.mementos.length;
   }

   groupedByYear() {
      return _.groupBy(this.mementos, m => m.temporalDatedate.year());
   }

   groupedByDomain() {
      return _.groupBy(this.mementos, m => m.domain)
   }

   groupedByYrMnth() {
      var it = this.groupedByYear();
      _.keys(it).forEach(k => it[k] = _.groupBy(it[k], m=> m.month() + 1));
      return it;
   }

   toJSON() {
      return this.toString();
   }

   simpleString() {
      return "Tagged Memento " + this.mementoRange.humanizeLength();
   }
}

export default TaggedMemmentos;