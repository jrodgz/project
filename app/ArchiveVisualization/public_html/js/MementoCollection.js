
class MementoCollection{
  constructor(data){
     this.tags = data.tags;
     this.id = data.id;
     this.collectionName = data.collectionName;
     this.collectedBy = data.collectedBy;
     this.mementos = data.mementos;
     this.mementos.sort((m1, m2)=> m1.compare(m2));
     this.range = this.first().date.twix(this.last().date);
     this.domains = this.mementos.map(m => m.domain);
  }

   cleanedDomains(){
      return this.domains.map(d => {
        return S(tldjs.getDomain(d)).strip(tldjs.getPublicSuffix(d)).stripPunctuation().s;
      });
   }

   fullDomains(){
      return this.domains.map(d => tldjs.getDomain(d));
   }


   hasTag(tag){
      return this.tags.has(tag);
   }

   tagArray(){
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
      return _.groupBy(this.mementos, m =>  m.domain)
   };

   groupedByYrMnth() {
      var it = this.groupedByYear();
      _.keys(it).forEach(k => it[k] = _.groupBy(it[k],m=> m.month()+1));
      return it;
   };
}

class MultipleStoryMC extends MementoCollection {
   constructor(data){
      super(data);
   }
}