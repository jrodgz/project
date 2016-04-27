'use strict';

import 'babel-polyfill';
import Memento from './Memento';
import TaggedMemmentos from './TaggedMemmentos';
import request from "request";
import _ from 'lodash';
import S from 'string';
import dataPrepair from './dataPrepair';
import fs from 'fs';


class sheetParser {
   constructor(url) {
      this.sp = this;
      this._url = url;
      this.linkExtractor =
         /^((http[s]?):\/)?\/?([^:\/\s]+)\/([0-9]+|web)\/([0-9]+)\/(((http[s]?):\/\/)((www.)?([a-zA-z0-9\.\-]+))(\/(.+)?))$/;
   }

   get url() {
      return this._url;
   }

   set url(url) {
      this._url = url;
   }

   loadSheet(cb) {

      if ((typeof this._url !== 'undefined') && this._url !== null) {
         request(this._url,(error,response,body) => {
            if(error)
               alert("error loading sheet",error);
            fs.writeFile('sheet.json',JSON.stringify(JSON.parse(body)), err => console.log(err));
            this.parseSheet(JSON.parse(body),cb);
         });
      }
   }

   parseSheet(data,cb) {
      console.log("In parseSheet",cb);
      let parsed = _(data.feed.entry)
         .groupBy(e => e.gsx$tags.$t)
         .toPairs()
         .map(p => {
            var t = new Set(p[0].split(',').map(s => S(s).trim().s));
            var ft = p[0];
            var d = {
               tags: t,
               tagString: p[0],
               mementos: _.map(p[1], e => {
                     var m = new Memento(this.linkExtractor.exec(e['gsx$uri-m'].$t.trim()), e['gsx$uri-m'].$t.trim());
                     m.addTags(t,ft);
                     return m;
                  }
               )
            };
            return new TaggedMemmentos(d)
         })
         .value();
      // cb(parsed);
      console.log("Prepairing Data");
      // let pWorker = new Promise((resolve,reject)=>{
      //    resolve(new dataPrepair(parsed))
      // });
      // pWorker.then(val => {
      //    console.log("We are in then",val);
      //    val.makeDataForVis(cb);
      // }).catch(reason => console.log(reason));
      let dprepair = new dataPrepair(parsed);
      dprepair.makeDataForVis(cb);
   }
   
}

export default sheetParser;