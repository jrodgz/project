/**
 * Created by john on 4/7/16.
 */
function createTimeLine(where, parsedData) {
   var bindTo = d3.select(where)[0][0];
   var tldata = [];

   console.log(d3.select(where));
  
   parsedData.forEach(d => {
      var tmTl = {
         label: d.collectionName,
         data: []
      };
      d.mementos.forEach(m => 
         tmTl.data.push({
            type: TimelineChart.TYPE.POINT,
            at: m.jsDate(),
            color: d.collectionName
         })
      );
      tldata.push(tmTl);
   });

   var tl = new TimelineChart(where,tldata,{
      tip: function (d) {
         return d.at || d.from +'<br>'+d.to;
      }
   });
   
}
/*
function createTimeLine(where, parsedData) {
   var bindTo = d3.select(where)[0][0];
   var tldata = [];

   parsedData.forEach(function (d) {
      console.log(d);
      var tmTl = {
         label: d.title,
         data: []
      };
      d.mementos.forEach(function (m) {
         tmTl.data.push({
            type: TimelineChart.TYPE.POINT,
            at: m.jsDate()
         });
      });
      tldata.push(tmTl);

      // tldata.push({ label: d.title+" Interval",
      //    data: [{
      //       label: d.title+" Interval",
      //       type: TimelineChart.TYPE.INTERVAL,
      //       from: d.first().jsDate(),
      //       to: d.last().jsDate()
      //    }]
      // });
   });

   var tl = new TimelineChart(bindTo,tldata,{
      tip: function (d) {
         return d.at || d.from +'<br>'+d.to;
      }
   });
}

*/
