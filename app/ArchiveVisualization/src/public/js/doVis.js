
function createTopTenArchivingYears(where, data) {

   var visualization = d3plus.viz()
      .container(where)
      .data(data)
      .type("bar")
      .id("Year of Archive")
      .x("Year of Archive")
      .y("Number Of Mementos")
      .resize(true)
      .draw()
}

function createTopTenKeywords(where, data) {

   var visualization = d3plus.viz()
      .container(where)
      .data(data)
      .type("bubbles")
      .id(["group", "name"])
      .depth(1)
      .size("size")
      .color("group")
      .resize(true)
      .draw()

}

/*
 create chart top ten popular domains
 */
function createTopTenPopularDomains(where, data) {

   var chart = c3.generate({
      bindto: where,
      data: {
         x: 'x',
         columns: [
            data.x,
            data.cols
         ],
         type: 'bar'
      },
      bar: {
         width: {
            ratio: 0.5
         }
      },
      axis: {
         rotated: true,
         x: {
            type: 'category',
            show: true
         }
      }
   });

}

function createZoomableContainer(where, data) {
   var width = $(where).width();
   var height = $(where).height();
   var svg = d3.select(where)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

   preprocess.onLoad(data);

   var group = drawing.createZoomableContainer(svg, width, height);
   drawing.drawGridLines(group, width, height, 100);
   var view = new drawing.predefined.DynamicTextNodeView(
      group, width, height, svg, d3.select(where));
   view.drawControls($(where));
}

function createHistogramOfTags(where, data) {
   c3.generate({
      bindto: where,
      data: {
         x: 'x',
         columns: [
            data.x,
            data.cols
         ],
         type: 'bar'
      },
      bar: {
         width: {
            ratio: 0.5
         }
      },
      axis: {
         x: {
            type: 'category',
            show: true
         }
      }
   });
}



function yearMonthTagDomainTree(where, data) {
   var visualization = d3plus.viz()
      .container(where)
      .data(data)
      .type("tree_map")
      .id(["year", "month", "tag", "domain"])
      .size("num")
      .time({"value": "year", "solo": data[0].year})
      .tooltip({
         fullscrean: true,
         size: false,
         large: 450,
         small: 450,
         value: ["year", "month", "tag", "domain", "dates"]
      })
      .resize(true)
      .draw();
}



function tagDomainYearMonthDatGraph(where,data) {
   var visualization = d3plus.viz()
      .container(where)
      .type("network")
      .data(data.nodes)
      .nodes({overlap: 0.5})
      .edges(data.edges)
      .size("size")
      .id("id")
      .tooltip(["connectionsOut", "connectionsIn"])
      .descs({
         "connectionsOut": "How many Tags/Domains/Dates this node points to",
         "connectionsIn": "How many Tags/Domains/Dates point to this node"
      })
      .resize(true)
      .draw();
}

function domainTagYearMonthTree(where, data) {
   var visualization = d3plus.viz()
      .container(where)
      .data(data)
      .type("tree_map")
      .id([ "domain","tag","year", "month"])
      .size("num")
      .time({"value": "year", "solo": data[0].year})
      .tooltip({
         fullscrean: true,
         size: false,
         large: 450,
         small: 450,
         value: ["domain","tag","year", "month", "dates"]
      })
      .resize(true)
      .draw();
}

function yearTagDomainYearMonthTree(where, data) {
   var visualization = d3plus.viz()
      .container(where)
      .data(data)
      .type("tree_map")
      .id(["tag", "domain","year", "month"])
      .size("num")
      .time({"value": "year", "solo": data[0].year})
      .tooltip({
         fullscrean: true,
         size: false,
         large: 450,
         small: 450,
         value: ["tag", "domain","year", "month", "dates"]
      })
      .resize(true)
      .draw();
}

function createTimeLine(where, tldata) {
   var tl = new TimelineChart(where, tldata, {
      tip: function (d) {
         return d.urim + '<br>' +d.at || d.from + '<br>' + d.to;
      },
      ttip: function (d) {
         let dit = S(d.label);
         if (dit.contains(',')) {
            return "Tags: " + dit.replaceAll(',', ',<br>').s;
         } else {
            return "Tags: " + d.s;
         }
      }
   });

}

function createTimeLineOL(where, tldata) {
   var tl = new TimelineChart(where, tldata, {
      tip: function (d) {
         return d.urim + '<br>' +d.at || d.tip +'<br>' +d.from + '<br>' + d.to;
      },
      ttip: function (d) {
         let dit = S(d.label);
         if (dit.contains(',')) {
            return "Tags: " + dit.replaceAll(',', ',<br>').s;
         } else {
            return "Tags: " + d.s;
         }
      }
   });

}

function numMtoOlap(where,data) {
   var visualization = d3plus.viz()
      .container(where)  // container DIV to hold the visualization
      .data(data)  // data to use with the visualization
      .type("scatter")    // visualization type
      .id("tag")         // key for which our data is unique on
      .x("nol")         // key for x-axis
      .y("nm")        // key for y-axis
      .draw();

}


function timeGraph(data) {
   var len = data.tagedMs.length;
   for(var i = 0; i <len; ++i){
      d3plus.viz()
         .container("#cchart"+(i+1))
         .type("rings")
         .data(data.tagedMs[i].nodes)
         .id('name')
         .edges({
            "size": "strength",
            "value": data.tagedMs[i].edges
         })
         .resize(true)
         .focus(data.tags[i])
         .draw();
   }

}

// var tableData = [];
// tableData.push({
//    index: data[i].tagString,
//    "Number Of Mementos": data[i].numberOfMementos,
//    "Spans": data[i].spansHuman,
//    "Time Span": data[i].spans,
//    "Number of URI-Rs": data[i].urirs.length,
//    "Has Overlap": data[i].hasOverlap ? "Yes":"No",
//
// });
//
// d3plus.viz()
//    .container("#cchartt"+(i+1))
//    .type("table")
//    .data(tableData)
//    .id("index")
//    .shape("square")
//    .cols(["Number Of Mementos", "Spans", "Time Span","Number of URI-Rs","Has Overlap"])
//    .resize(true)
//    .draw();
// if(data[i].hasOverlap){
//    var odata = [
//
//    ];
//    data[i].overlapData.forEach(function (old) {
//       odata.push({
//          index: old.urir,
//          "Overlaps By": old.fullOut,
//          "Date 1": new Date(old.fd).toString(),
//          "Date 2": new Date(old.lf).toString()
//       });
//    });
//
//    d3plus.viz()
//       .container("#occhartt"+(i+1))
//       .type("table")
//       .data(odata)
//       .id("index")
//       .shape("square")
//       .cols(["Overlaps By", "Date 1", "Date 2"])
//       .resize(true)
//       .draw();
function olapGraph(data) {
   var len = data.tagedMs.length;
   for(var i = 0; i <len; ++i){
      d3plus.viz()
         .container("#cchartt"+(i+1))
         .type("rings")
         .data(data.tagedMs[i].nodes)
         .id('name')
         .edges({
            "size": "strength",
            "value": data.tagedMs[i].edges
         })
         .resize(true)
         .focus(data.tagedMs[i].focus)
         .draw();
   }


}

// d.domainTYMTree ;
// d.tagDomainYearMonthTree ;
// d.tagDomainYearMonthDatGraph ;

$.getJSON("/data",function(d) {
   
   console.log(d);
   d.timeline.forEach(function (i) {
      i.data.forEach(function (ii) {
         ii.at = new Date(ii.at);
         ii.type = TimelineChart.TYPE.POINT;
      });
   });

   olapGraph(d.tagOlapGraph);
   createTimeLine('#chart1',d.timeline);
   createTopTenArchivingYears('#topTenArchivingYears', d.topTenArchingYears );

   createTopTenKeywords('#topTenPopularKeywords', d.topTenKeyWords);

   createTopTenPopularDomains('#topTenPopularDomains', d.topTenDomains);

   createHistogramOfTags('#chart3', d.tagHistogram);

   createZoomableContainer('#chart2', d.parsedData);
   yearMonthTagDomainTree('#chart4',d.yMTDTree );
   domainTagYearMonthTree('#chart5',d.domainTYMTree);
   yearTagDomainYearMonthTree('#chart6',d.tagDomainYearMonthTree);

   timeGraph(d.graphData);

   // numMtoOlap("#numMtoNumOlap",numMToOverlap );
   // #numMtoTimeSpanned
   //  #numMtoNumOlap

   listenForClicks();
   listenForClicks2(d.graphData.tagedMs.length);
   listenForClicks3();
  

});