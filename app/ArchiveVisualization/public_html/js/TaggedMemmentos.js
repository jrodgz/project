
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
    this.uri = data.uri;
    this.archiver = data.archiver;
    this.title = data.title;
    this.uri = data.uri;
};

TaggedMemmentos.prototype.numMementos = function () {
   return this.mementos.length;
};

