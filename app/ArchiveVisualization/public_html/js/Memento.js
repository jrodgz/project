/*
 3: archive
 5: date
 7: archived version of whole
 8: archived domain
 */
var Memento = function (marray,original) {
    this.date = moment(marray[5],"YYYYMMDDHHmmss");
    this.archive = marray[3];
    this.domain = marray[8];
    this.original = original;
};

Memento.prototype.jsDate = function () {
   return this.date.toDate();
};

Memento.prototype.year = function (){
   return this.date.year();
};


Memento.prototype.month = function (){
   return this.date.month();
};


Memento.prototype.day = function (){
   return this.date.days();
};




function makeMemento(marray,o) {
     return {
        date: moment(marray[5],"YYYYMMDDHHmmss"),
        archive: marray[3],
        domain: marray[8],
        original:  o
     };
 }
