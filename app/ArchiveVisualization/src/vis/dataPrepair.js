'use strict';

import 'babel-polyfill';
import _ from 'lodash';
import TimelineChart from './d3timeline';
import S from 'string';
import serialize from 'node-serialize';

var jsnx = require('jsnetworkx');


class dataPrepair {
   constructor(data) {
      this.data = data;
   }
   
   _makeDataForTimeLine(){
      var tldata = [];

      this.data.forEach(d => {
         var tmTl = {
            label: S(d.tagString).replaceAll(',', ', ').s,
            data: []
         };
         d.mementos.forEach(m =>
            tmTl.data.push({
               at: m.jsDate().toDateString(),
               urim: m.domainWithSuffix,
               color: d.tagString
            })
         );
         tldata.push(tmTl);
      });
      
      return tldata;
   }

   _makeDataForTopTenArchivingYears() {
      let mapOfMementoTotals = {};
      this.data.forEach(tm => {
         tm.mementos.forEach(m => {
            if (m.year() in mapOfMementoTotals) {
               mapOfMementoTotals[m.year()] += 1;
            } else {
               mapOfMementoTotals[m.year()] = 1;
            }
         });
      });
      var sortable = [];
      for (var entry in mapOfMementoTotals)
         sortable.push([entry, mapOfMementoTotals[entry]])
      sortable.sort(function (a, b) {
         return b[1] - a[1]
      });

      // craete the json map for chart
      var mementoTotalsdataToPlot = [];
      var totalToGet = sortable.length > 10 ? 10 : sortable.length;
      for (var i = 1; i < totalToGet; i++) {
         var entry = {
            'Year of Archive': sortable[i][0],
            'Number Of Mementos': sortable[i][1]
         };
         mementoTotalsdataToPlot.push(entry)
      }
      return mementoTotalsdataToPlot;
   }

   _makeDataForTopTenKeyWords() {
      return _.chain(this.data)
         .flatMap(tm => tm.tagArray())
         .groupBy(tag => tag)
         .mapValues(tg => tg.length)
         .toPairs()
         .orderBy(it => -it[1])
         .map(p => {
            return {name: p[0], size: p[1], group: ''}
         })
         .take(10)
         .value();
   }

   _makeDataForTopTenDomains() {
      var topTen = _.chain(this.data)
         .flatMap(mc => mc.cleanedDomains())
         .groupBy(d => d)
         .mapValues((v, k)=> v.length)
         .toPairs()
         .sortBy(p => -p[1])
         .take(10).value();
      var histdata = {
         x: ['x'],
         cols: ['Occurrence Count']
      };
      topTen.forEach(function (tt) {
         histdata.cols.push(tt[1]);
         histdata.x.push(tt[0]);

      });
      return histdata;
   }

   _makeDataForTagHistogram() {
      var histdata = {
         x: ['x'],
         cols: ['Number of Mementos']
      };
      this.data.forEach(function (tm) {
         histdata.cols.push(tm.numMementos());
         histdata.x.push(tm.tagString);
      });

      return histdata;
   }

   _makeDataForYearMonthTagDomainTree() {
      var compiled = _.template('<% _.forEach(dates, function(d) { %><%-d%>\n<% }); %>');

      var it = _.chain(this.data)
         .flatMap(tm => tm.tagDateDomain)
         .groupBy(m => _.toLower(m.tag))
         .toPairs()
         .flatMap(p =>
            _.chain(p[1])
               .groupBy(m => m.year)
               .mapValues(g =>_.groupBy(g, gm => gm.ms))
               .flatMap(ym =>
                  _.flatMap(_.keys(ym), mnth => {
                        return _.chain(ym[mnth])
                           .groupBy(k => k.domainWithSuffix )
                           .toPairs()
                           .map(dm => {
                              return {
                                 year: dm[1][0].year,
                                 month: dm[1][0].ms,
                                 tag: dm[1][0].tag,
                                 domain: dm[0],
                                 num: dm[1].length,
                                 dates: compiled({dates: _.map(dm[1], j => j.moment.format("h:mm:ss a"))})
                              }
                           }).value()
                     }
                  )).value()).value();
      return it;
   }

   _makeDataForDomainTagYearMonthTree() {
      var compiled = _.template('<% _.forEach(dates, function(d) { %><%-d%>\n<% }); %>');

      var it = _.chain(this.data)
         .flatMap(tm => tm.tagDateDomain)
         .groupBy(m => m.domain)
         .toPairs()
         .flatMap(p =>
            _.chain(p[1])
               .groupBy(m => m.tag)
               .mapValues(g =>_.groupBy(g, gm => gm.year))
               .flatMap(ym =>
                  _.flatMap(_.keys(ym), mnth => {
                        return _.chain(ym[mnth])
                           .groupBy(k => k.ms)
                           .toPairs()
                           .map(dm => {
                              return {
                                 year: dm[1][0].year,
                                 month: dm[0],
                                 tag: dm[1][0].tag,
                                 domain: dm[1][0].domainWithSuffix ,
                                 num: dm[1].length,
                                 dates: compiled({dates: _.map(dm[1], j => j.moment.format("h:mm:ss a"))})
                              }
                           }).value()
                     }
                  )).value()).value();
      return it;
   }

   _makeDataForTagDomainYearMonthTree() {
      var compiled = _.template('<% _.forEach(dates, function(d) { %><%-d%>\n<% }); %>');
      var it = _.chain(this.data)
         .flatMap(tm => tm.tagDateDomain)
         .groupBy(m => m.tag)
         .toPairs()
         .flatMap(p =>
            _.chain(p[1])
               .groupBy(m => m.domain)
               .mapValues(g =>_.groupBy(g, gm => gm.year))
               .flatMap(ym =>
                  _.flatMap(_.keys(ym), mnth => {
                        return _.chain(ym[mnth])
                           .groupBy(k => k.ms)
                           .toPairs()
                           .map(dm => {
                              return {
                                 year: dm[1][0].year,
                                 month: dm[0],
                                 tag: dm[1][0].tag,
                                 domain: dm[1][0].domainWithSuffix ,
                                 num: dm[1].length,
                                 dates: compiled({dates: _.map(dm[1], j => j.moment.format("h:mm:ss a"))})
                              }
                           }).value()
                     }
                  )).value()).value();
      return it;
   }


   _makeDataForTagDomainYearMonthDayGraph(){
      var tagDateDomain = _.chain(this.data)
         .flatMap(tm => tm.getFullTag()).value();

      var g = new jsnx.DiGraph();
     
      var nodes = _.chain(tagDateDomain)
         .flatMap(tm => [{ name: tm.domainWithSuffix},{ name: tm.tag},{ name: tm.dateTimeString()}])
         .uniqBy('name')
         .value();

      nodes.forEach(n => g.addNode(n.name));

      var ttdp = _.chain(tagDateDomain)
         .groupBy(m => m.tag)
         .toPairs()
         .flatMap(p => {
            return _.chain(p[1])
               .groupBy(it => it.domainWithSuffix)
               .toPairs()
               .flatMap(dg => {
                  return {source: p[0], target: dg[0]};
               })
               .value()
         })
         .value();
      var edges = [];
      var dtymdp = _.chain(tagDateDomain)
         .groupBy(m =>m.domainWithSuffix)
         .toPairs()
         .flatMap(p => {
            return _.chain(p[1])
               .groupBy(it => it.dateTimeString())
               .toPairs()
               .flatMap(dg => {
                  return {source: p[0], target: dg[0]};
               })
               .value()
         })
         .value();


      edges = edges.concat(ttdp);
      edges = edges.concat(dtymdp);
      edges.forEach(e => g.addEdge(e.source,e.target));

      var sizedNodes = {};

      Array.from(g.nodesIter()).forEach(n =>{
         var out =g.outDegree(n);
         var iin =g.inDegree(n);
         sizedNodes[n] =  {
            size: 1,
            out: out,
            iin: iin
         }
      });
      nodes.forEach(n => {
         n.howBig = sizedNodes[n.id].size;
         n.connectionsOut = sizedNodes[n.id].out;
         n.connectionsIn = sizedNodes[n.id].iin;
      });

      return  {nodes: nodes, edges: edges};
   }

   getTagSharing(){
      let c = 0;
      var shared = _.map(this.data, tmm => {
         var cc = c++;
         return {tm: tmm, num: cc};
      });
      let len = shared.length;
      let keep = [];
      for (var i = 0; i < len; ++i) {
         // console.log(i);
         var cur = shared[i];
         var others = _.filter(shared, o => (o.num != cur.num && cur.tm.shareTags(o.tm.tset)));
         var sinfo = [];
         if (others.length > 0) {
            others.forEach(o => sinfo.push(cur.tm.getSharedInfo(o.tm,cur.num,o.num)));
            sinfo = _.uniqWith(sinfo, (oo,o) =>{
               return oo.to == o.from && o.to == oo.from;
            });
            keep.push(sinfo);
         } 

      }

      keep = _.chain(keep)
         .flatMap(kk => kk)
         .groupBy(kk => kk.sharedTags)
         .mapValues(ar =>{
            if(ar.length > 1){
               return _.chain(ar)
                  .flatMap(v => _.map(v.sameYMDTagDomain,vv => {
                     return {
                        date: vv[0],
                        dateShare: vv[1]
                     };
                  }))
                  .groupBy(it => it.date)
                  .mapValues(vv =>_.chain(vv)
                     .flatMap(vvv => vvv.dateShare)
                     .map(it => {
                        return {
                           domain: it[0],
                           time: it[1]
                        };
                     })
                     .groupBy(it => it.domain)
                     .mapValues(vv => {
                        return _.chain(vv)
                           .flatMap(vvv => vvv.time)
                           .uniqWith((a,b) => {
                              if(a.one && b.one)
                                 return a.urir == b.urir;
                              return true;
                           }).value();
                     })
                     .toPairs()
                     .value()
                  )
                  .toPairs()

                  .value();
            }
            return [ar[0].sharedTags,ar[0]. sameYMDTagDomain];
         }).toPairs()
         .filter(it => it[0] != 'Rememberence')
         .value();
      return keep;
   }

   makeDataForVis(cb) {
      console.log("In dataPrepair doing the things");
      let out = {};
      out.timeDateWithOverlap = _.map(this.data,tm => tm.getMementoTimeData());
      out.tagSharing = _.map(this.data,tm => tm.getMementoTimeData());
      out.timeline = this._makeDataForTimeLine();
      out.topTenArchingYears = this._makeDataForTopTenArchivingYears();
      console.log("Got top ten archiving years");
      out.topTenKeyWords = this._makeDataForTopTenKeyWords();
      console.log("Got top ten key words");
      out.topTenDomains = this._makeDataForTopTenDomains();
      console.log("Got top ten domains");
      out.tagHistogram = this._makeDataForTagHistogram();
      console.log("Got tag histogram");
      out.yMTDTree = this._makeDataForYearMonthTagDomainTree();
      out.domainTYMTree = this._makeDataForDomainTagYearMonthTree();
      out.tagDomainYearMonthTree = this._makeDataForDomainTagYearMonthTree();

      out.parsedData = _.map(this.data,tm => tm.getSerializableData());
      console.log("Got year month tag domain tree");
      console.log(out.parsedData);
      // console.log(out.domainTYMTree);
      cb(out);
   }
}


export default dataPrepair;