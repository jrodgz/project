'use strict';

import 'babel-polyfill';
import tld from 'tldjs';
import _ from 'lodash';
import S from 'string';
import purl from 'purl';


export function mgbFullURIFilter(arr) {
   return _.chain(arr).groupBy(m => m.fulluri)
      .mapValues(ar => {
         if (ar.length > 2)
            ar.sort((m1, m2)=> m1.compare(m2));
         return ar;
      })
      .toPairs()
      .filter(p => p[1].length >= 2)
      .value();
}

export function mgbFullURIFilterShare(arr) {
   let it = _.chain(arr).groupBy(m => {
      return m.fulluri
   }).value();
   console.log(it);
   return _.chain(arr).groupBy(m => {
         return m.fulluri
      })
      .mapValues(ar => {
         if (ar.length > 2)
            ar.sort((m1, m2)=> {
               if (m1.temporal.isBefore(m2.temporal))return -1;
               if (m1.temporal.isSame(m2.temporal)) return 0;
               return 1;
            });
         return ar;
      })
      .toPairs()
      .filter(p => p[1].length >= 2)
      .value();
}

export function overLapData(m1, m2) {
   var twixed, ts, th;
   twixed = m1.doTwix(m2);
   ts = `${twixed.format()}`;
   th = twixed.humanizeLength();
   if (th.indexOf('a few seconds') == -1) {
      ts = twixed.simpleFormat("YYYY-MM-DD hmmA");
   }
   return {
      urir1: m1.fulluri,
      urir2: m2.fulluri,
      burir: m1.fulluri +" - "+ m1.fulluri,
      domain: m1.domainWithSuffix,
      easyReadLength: th,
      fullLength: ts,
      fullOut: `have time span between of ${th} ${ts}`,
      fd: m1.jsDate(),
      ld: m2.jsDate()
   };
}
// time span between of ${twixed.humanizeLength()}: ${ts}
export function sameTagDomainTimeData(m1, m2,same) {
   var twixed, ts, th,ret;
   twixed = m1.temporal.twix(m2.temporal);
   ts = `: ${twixed.format()}`;
   th = twixed.humanizeLength();
   if (th.indexOf('a few seconds') == -1) {
      ts = "";
   }
   var purled = purl(m1.fullUri);
   var purled2 = purl(m2.fullUri);
   if(same){
      ret = {
         urir: purled.host+purled.pathname,
         domain: m1.domainWithSuffix,
         easyReadLength: th,
         fullLength: ts,
         fullOut: `have time span of ${th}${ts}`,
         fd: m1.temporal.toDate(),
         ld: m2.temporal.toDate(),
         one:false,
         areSame: true,
      };
   } else {
      ret = {
         urir1: purled.host+purled.pathname,
         urir2: purled2.host+purled2.pathname,
         domain: m1.domainWithSuffix,
         easyReadLength: th,
         fullLength: ts,
         fullOut: `have time span of ${th}${ts}`,
         m1d: m1.temporal.toDate(),
         m2d: m2.temporal.toDate(),
         one:false,
         areSame: false,
      };
   }
   return ret;
}


export function mementoGFullURIOverlap(group, overlapData) {
   group.forEach(g => {
      let len = g[1].length;
      var twixed, ts, th;
      if (len <= 2) {
         overlapData.olapMs.push(overLapData(g[1][0], g[1][1]));
      } else {
         for (let i = 0; i < len; ++i) {
            if (i + 1 < len) {
               overlapData.olapMs.push(overLapData(g[1][i], g[1][i + 1]));
            }
         }
      }
   });
}
