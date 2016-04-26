
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

function timeGraph(where, data) {
   var visualization = d3plus.viz()
      .container(where)
      .type("network")
      .data(data.nodes)//{value:nodes, overlap: 0.5})
      // .nodes({overlap: 0.5})
      .edges( data.edges)
      // .size("size")
      .id("id")
      // .tooltip(["connectionsd", "connectionsIn"])
      // .descs({
      //    "connectionsd": "How many Tags/Domains/Dates this node points to",
      //    "connectionsIn": "How many Tags/Domains/Dates point to this node"
      // })
      .resize(true)
      .draw();
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
      .edges({value: data.edges, arrows: 2})
      // .size("size")
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

   createTimeLine('#chart1',d.timeline );
   createTopTenArchivingYears('#topTenArchivingYears', d.topTenArchingYears );
   console.log("Got top ten archiving years");
   createTopTenKeywords('#topTenPopularKeywords', d.topTenKeyWords);
   console.log("Got top ten key words");
   createTopTenPopularDomains('#topTenPopularDomains', d.topTenDomains);
   console.log("Got top ten domains");
   createHistogramOfTags('#chart3', d.tagHistogram);
   console.log("Got tag histogram");
   createZoomableContainer('#chart2', d.parsedData);
   yearMonthTagDomainTree('#chart4',d.yMTDTree );
   domainTagYearMonthTree('#chart5',d.domainTYMTree);
   yearTagDomainYearMonthTree('#chart6',d.tagDomainYearMonthTree);
   timeGraph('#chart7',d.tagDomainYearMonthDatGraph);
   listenForClicks();
  

});