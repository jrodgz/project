
class Memento {
   constructor(marray,original){
      this.date = moment(marray[5],"YYYYMMDDHHmmss");
      this.archive = marray[3];
      this.domain = marray[8];
      this.original = original;
   }

   jsDate() {
      return this.date.toDate();
   }

   year() {
      return this.date.year();
   }


   month(){
      return this.date.month();
   };


   day(){
      return this.date.days();
   }

   compare(m){
      if (this.date.isBefore(m.date)) return -1;
      if (this.date.isSame(m.date)) return 0;
      return 1;
   }
}


/*
 3: archive
 5: date
 7: archived version of whole
 8: archived domain
 */
// var Memento = function (marray,original) {
//     this.date = moment(marray[5],"YYYYMMDDHHmmss");
//     this.archive = marray[3];
//     this.domain = marray[8];
//     this.original = original;
// };
//
// Memento.prototype.jsDate = function () {
//    return this.date.toDate();
// };
//
// Memento.prototype.year = function (){
//    return this.date.year();
// };
//
//
// Memento.prototype.month = function (){
//    return this.date.month();
// };
//
//
// Memento.prototype.day = function (){
//    return this.date.days();
// };


