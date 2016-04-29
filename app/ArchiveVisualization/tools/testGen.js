import fs from 'fs';
import path from 'path';
import sheetParser from '../src/vis/sheetParser';
import _ from 'lodash';
import sheet from '../src/sheet.json';
import S from 'string';
import tld from 'tldjs';
import util from 'util';
import purl from 'purl';
import TaggedMemmentos from '../src/vis/TaggedMemmentos';


/*
 console.log(`Memento ${1} with domain ${g[1][0].fulluri}
 \nMemento ${2} with domain ${g[1][1].fulluri} have time span between of ${twixed.humanizeLength()}: ${ts}`);
 it.forEach(tm => {
 var gd = _.chain(tm.mementos).groupBy(m => m.fulluri)
 .mapValues(ar => {
 if(ar.length > 2)
 ar.sort((m1, m2)=> m1.compare(m2));
 return ar;
 })
 .toPairs()
 .filter(p => p[1].length >= 2)
 .value();
 var overlapData = { tags: it.tags};
 if(gd.length > 0){
 var olapMs = [];
 gd.forEach(g => {
 let len = g[1].length;
 var twixed,ts,th;
 if(len <= 2){
 twixed = g[1][0].doTwix(g[1][1]);
 ts =`: ${twixed.format()}`;
 th=twixed.humanizeLength();
 if(th.indexOf('a few seconds') != -1){
 ts ="";
 }
 olapMs.push({
 urir: g[1][0].fulluri,
 hSpan: th,
 tSpan: ts
 });

 } else {
 for(let i = 0; i < len; ++i){
 if(i+1< len){
 twixed = g[1][i].doTwix(g[1][i+1]);
 ts = `: ${twixed.format()}`;
 th=twixed.humanizeLength();
 if(th.indexOf('seconds') != -1){
 ts = "";
 }
 olapMs.push({
 urir: g[1][0].fulluri,
 hSpan: th,
 tSpan: ts
 });
 }
 }
 }
 });
 }
 });
 */
async function testGen() {

   let sp = new sheetParser('sdasda');
   sp.parseSheet(sheet, it => {
      var tagSet = { tagedMs: []};

      it.forEach(tmm => {
         let tagDateDomain= tmm.getFullTag();

         // tagDateDomain.forEach(tm => {
         //    var p = purl(tm.fulluri);
         //    console.log(p.pathname);
         //    console.log(tm.domainWithSuffix);
         //    console.log(p.hostname);
         // });

         var nodes = [];
         var edges = [];

         console.log("-=========");

         var grouped = _.chain(tagDateDomain).groupBy(it => it.purled.hostname).toPairs().value();
         nodes.push({name:tmm.fullTagS,value:grouped.length});

         //.flatMap(tm => [{ name: tm.domainWithSuffix},{ name: tm.tag},{ name: tm.dateTimeString()}])
         grouped.forEach(g => {
            edges.push({source:tmm.fullTagS,target:g[0],strength:g[1].length});
            
            var timeDate = _.chain(g[1]).groupBy(gg => gg.dateString()).toPairs().value();
            g[1].forEach(gg => {
               nodes.push({name:gg.purled.pathname});
               edges.push({source:g[0],target:gg.purled.pathname});
               nodes.push({name:gg.dateTimeString()});
               edges.push({source:gg.purled.pathname,target:gg.dateTimeString()});
            });
         });

        let kl = _.countBy(nodes,n => {
            console.log(n);
            return n.name;
         });

         nodes.forEach(n => {
            n.value = kl[n.name];
         });


         let kl2 = _.countBy(edges,e => {
            return e.source+e.target;
         });

         edges.forEach(e => {
            e.strength = kl2[e.source+e.target];
         });



         edges = _.uniqBy(edges,e => {
            return e.source+e.target+e.strength;
         });

         nodes = _.uniqBy(nodes, n => {
            return n.name + n.value;
         });

         console.log(edges);
         console.log(nodes);

         // var g = new jsnx.DiGraph();
         //
         // var nodes = _.chain(tagDateDomain)
         //    .flatMap(tm => [{ name: tm.domainWithSuffix},{ name: tm.tag},{ name: tm.dateTimeString()}])
         //    .uniqBy('name')
         //    .value();
         //
         // nodes.forEach(n => g.addNode(n.name));
         //
         // var ttdp = _.chain(tagDateDomain)
         //    .groupBy(m => m.tag)
         //    .toPairs()
         //    .flatMap(p => {
         //       return _.chain(p[1])
         //          .groupBy(it => it.domainWithSuffix)
         //          .toPairs()
         //          .flatMap(dg => {
         //             return {source: p[0], target: dg[0]};
         //          })
         //          .value()
         //    })
         //    .value();
         // var edges = [];
         // var dtymdp = _.chain(tagDateDomain)
         //    .groupBy(m =>m.domainWithSuffix)
         //    .toPairs()
         //    .flatMap(p => {
         //       return _.chain(p[1])
         //          .groupBy(it => it.dateTimeString())
         //          .toPairs()
         //          .flatMap(dg => {
         //             return {source: p[0], target: dg[0]};
         //          })
         //          .value()
         //    })
         //    .value();
         //
         //
         // edges = edges.concat(ttdp);
         // edges = edges.concat(dtymdp);
         // edges.forEach(e => g.addEdge(e.source,e.target));
         //
         // var sizedNodes = {};
         //
         // Array.from(g.nodesIter()).forEach(n =>{
         //    var out =g.outDegree(n);
         //    var iin =g.inDegree(n);
         //    sizedNodes[n] =  {
         //       size: out + iin,
         //       out: out,
         //       iin: iin
         //    }
         // });
         // nodes.forEach(n => {
         //    n.howBig = sizedNodes[n.name].size;
         //    n.connectionsOut = sizedNodes[n.name].out;
         //    n.connectionsIn = sizedNodes[n.name].iin;
         // });
         //
         // let max = _.maxBy(nodes,n => n.connectionsOut);
         // tagSet.tagedMs.push({nodes: nodes, edges: edges,focus: max});
      });

   });
}

export default testGen;
