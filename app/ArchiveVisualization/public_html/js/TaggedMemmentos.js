
/*
 archiver: entry.gsx$archiver.$t,
 name: entry.gsx$name.$t,
 tags: entry.gsx$tags.$t.split(","),
 uri: entry.gsx$uri.$t,
 mementos: [],
 title: entry.gsx$title.$t
 */
var TaggedMemmentos = function (data) {
    this.tags = data.tags;
    this.mementos = data.mementos;
    this.mementos.sort(function (m1,m2) {
      if(m1.date.isBefore(m2.date)) return -1;
      if(m1.date.isSame(m2.date)) return 0;
      return 1;
    });
    this.uri = data.uri;
    this.archiver = data.archiver;
    this.title = data.title;
    this.uri = data.uri;
};

TaggedMemmentos.prototype.first= function () {
   return this.mementos[0];
};

TaggedMemmentos.prototype.last= function () {
   return this.mementos[this.mementos.length-1];
};

TaggedMemmentos.prototype.numMementos = function () {
   return this.mementos.length;
};

TaggedMemmentos.prototype.groupedByYear = function () {
  return  _.groupBy(this.mementos,function (m) {
      return m.date.year();
  });
};

TaggedMemmentos.prototype.groupedByDomain = function () {
  return _.groupBy(this.mementos,function (m) {
      return m.domain;
  })
};

TaggedMemmentos.prototype.groupedByYrMnth = function () {
    var it =  this.groupedByYear();
    _.keys(it).forEach(function (k) {
        it[k] = _.groupBy(it[k],function (m) {
            return m.date.month()+1;
        })
    });
    return it;
};
