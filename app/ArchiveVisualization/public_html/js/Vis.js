'use strict';
/**
 * Created by john on 4/7/16.
 */
function createTimeLine(where, parsedData) {
   var bindTo = d3.select(where)[0][0];
   var tldata = [];

   parsedData.forEach(d => {
      var tmTl = {
         label: S(d.tagString).replaceAll(',', ', ').s,
         data: []
      };
      d.mementos.forEach(m =>
         tmTl.data.push({
            type: TimelineChart.TYPE.POINT,
            at: m.jsDate(),
            color: d.tagString
         })
      );
      tldata.push(tmTl);
   });

   var tl = new TimelineChart(where, tldata, {
      tip: function (d) {
         return d.at || d.from + '<br>' + d.to;
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

/*
 create top ten 
*/
function createTopTenArchivingYears(where, data) {
	
	/*
	sample data that the map uses
	var data = [
	    {"year": 1991, "value": 15}
	]
	*/

	var mapOfMementoTotals = {};
	data.forEach(function (tm) {
		var mementos = tm.mementos;
		mementos.forEach(function (m) {
			var date = new Date(m.date);
			var year = date.getFullYear();
			if (year in mapOfMementoTotals) {
				mapOfMementoTotals[year] = mapOfMementoTotals[year] + 1;
			} else {
				mapOfMementoTotals[year] = 1;
			}
		});
	   });

	// sort by value
	var sortable = [];
	for (var entry in mapOfMementoTotals)
	      sortable.push([entry, mapOfMementoTotals[entry]])
	sortable.sort(function(a, b) {return b[1] - a[1]})

	// craete the json map for chart
	var dataToPlot = []
	var totalToGet = sortable.length > 10 ? 10 : sortable.length
	for (var i = 1; i < totalToGet; i++) {
		var entry = new Object();
		entry['Year of Archive'] = sortable[i][0]
		entry['Number Of Mementos'] = sortable[i][1]
		dataToPlot.push(entry)
	}

    var visualization = d3plus.viz()
    .container(where)
    .data(dataToPlot)
    .type("bar")
    .id("Year of Archive")
    .x("Year of Archive")
    .y("Number Of Mementos")
    .draw()
}

/*
 create top ten keywords chart
 */
function createTopTenKeywords(where, sampleData) {

   var topTen = _.chain(sampleData)
      .flatMap(tm => tm.tagArray())
      .groupBy(tag => tag)
      .mapValues(tg => tg.length)
      .toPairs()
      .orderBy(it => -it[1])
      .map(p => {
         return {name: p[0], num: p[1]}
      })
      .take(10)
      .value();

   var data = [];
   for (var i = 0; i < topTen.length; i++) {
      var newObject = {};
      newObject.name = topTen[i].name;
      newObject.size = topTen[i].num;
      newObject.group = "";
      data.push(newObject);
   }

   var visualization = d3plus.viz()
      .container(where)
      .data(data)
      .type("bubbles")
      .id(["group", "name"])
      .depth(1)
      .size("size")
      .color("group")
      .draw()

}

/*
 create top ten archivers list
 */
function createTopTenArchivers(where, data) {

   var topTenArchiverCols = {};
   data.forEach(function (tm) {

      var currentArchiver = tm.archiver;
      var mememntoNumber = tm.mementos.length;
      if (currentArchiver in topTenArchiverCols) {
         topTenArchiverCols[currentArchiver] = topTenArchiverCols[currentArchiver] + mememntoNumber;
      } else {
         topTenArchiverCols[currentArchiver] = mememntoNumber;
      }

   });

   var sortedTopTenList = [];
   for (var key in topTenArchiverCols) {
      sortedTopTenList.push([key, topTenArchiverCols[key]]);
   }
   sortedTopTenList.sort(function (a, b) {
      return b[1] - a[1]
   });
   var topTenArray = sortedTopTenList.slice(0, 10);

   var chart = c3.generate({
      bindto: where,
      data: {
         columns: topTenArray,
         type: 'bar'
      },
      bar: {
         width: {
            ratio: 0.5 // this makes bar width 50% of length between ticks
         }
      },
      axis: {
         y: {
            label: 'Mementos'
         },
         x: {
            type: 'categorized',
            tick: {
               format: function (x) {
                  return '';
               }
            }
         }
      }
   });
}


/*
 create chart top ten popular domains
 */
function createTopTenPopularDomains(where, data) {
   var topTen = _.chain(data)
      .flatMap(mc => mc.cleanedDomains())
      .groupBy(d => d)
      .mapValues((v, k)=> v.length)
      .toPairs()
      .sortBy(p => -p[1])
      .take(10).value();
   var histdata = {
      x: ['x'],
      cols: ['Occurrence Count']
   };
   topTen.forEach(function (tt) {
      histdata.cols.push(tt[1]);
      histdata.x.push(tt[0]);

   });

   var chart = c3.generate({
      bindto: where,
      data: {
         x: 'x',
         columns: [
            histdata.x,
            histdata.cols
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

/*
 create zoomable word container
 */
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
    var view = new drawing.predefined.DynamicTextNodeView(group, width, height, svg);
    view.drawControls($(where));
}

/*
 Create memento previewer of the images
 */
function createMementoPreviews(where, buttonOne, buttonTwo) {
   var images = [
      'images/page0.png',
      'images/page1.png',
      'images/page2.png',
      'images/page3.png',
      'images/page4.png',
      'images/page4.png',
      'images/page3.png',
      'images/page2.png',
      'images/page1.png',
      'images/page0.png',
      'images/page1.png',
      'images/page0.png',
      'images/page3.png',
      'images/page2.png',
      'images/page4.png'
   ];
   var imageGroup = new drawing.ImageGroup($(where), images);
   var npages = Math.ceil(images.length / 3);
   imageGroup.paginate(npages);
   imageGroup.resize(128);
   $(buttonOne).click(function () {
      imageGroup.previousPage();
   });
   $(buttonTwo).click(function () {
      imageGroup.nextPage();
   });

   let someXvalue = [];
   let someYvalue = [];
   for (var i = 0; i < 10; ++i) {
      someXvalue.push(i);
      someYvalue.push(Math.random() * 10 + 1);
   }

   someXvalue.unshift('x');
   someYvalue.unshift('count');
}

/*
 create some line chart, need to update this, not sure what it is
 */
function createLineChart(where) {
   let chartLineX = [];
   let chartLineY = [];
   for (var i = 0; i < 10; ++i) {
      chartLineX.push(i);
      chartLineY.push(Math.random() * 10 + 1);
   }

   chartLineX.unshift('x');
   chartLineY.unshift('count');

   var otherChart = c3.generate({
      bindto: where,
      data: {
         x: 'x',
         columns: [chartLineX, chartLineY]
      }
   });
}

/*
 create histogram chart of tags
 */
function createHistogramOfTags(where, data) {
   var tags = _.flatMap(data, function (tm) {
      return tm.tagArray();
   });

   var histdata = {
      x: ['x'],
      cols: ['Number of Mementos']
   };
   data.forEach(function (tm) {
      histdata.cols.push(tm.numMementos());
      histdata.x.push(tm.tagString);

   });

   c3.generate({
      bindto: where,
      data: {
         x: 'x',
         columns: [
            histdata.x,
            histdata.cols
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

function yearMonthTagDomainTree(where,data){

   var compiled = _.template('<% _.forEach(dates, function(d) { %><%-d%>\n<% }); %>');

   var it = _.chain(data)
      .flatMap(tm => tm.tagDateDomain)
      .groupBy(m => _.toLower(m.tag))
      .toPairs()
      .flatMap(p =>
         _.chain(p[1])
            .groupBy(m => m.year)
            .mapValues(g =>_.groupBy(g, gm => gm.ms))
            .flatMap(ym =>
               _.flatMap(_.keys(ym), mnth => {
                     return _.chain(ym[mnth])
                        .groupBy(k => k.domain)
                        .toPairs()
                        .map(dm => {
                           return {
                              year: dm[1][0].year,
                              month: dm[1][0].ms,
                              tag: dm[1][0].tag,
                              domain: dm[0],
                              num: dm[1].length,
                              dates: compiled({dates: _.map(dm[1],j => j.moment.format("h:mm:ss a"))})
                           }
                        }).value()
                  }
               )).value()).value();
   var visualization = d3plus.viz()
      .container(where)
      .data(it)
      .type("tree_map")
      .id(["year","month","tag","domain"])
      .size("num")
      .time({"value": "year", "solo": it[0].year})
      .tooltip({fullscrean:true,size:false,large: 450,small:450,value:["year","month","tag","domain","dates"]})
      .draw();
}


function tagOverlap(where, data) {

   console.log(where, d3.select(where));
   var it = _.chain(data)
      .flatMap(tm => tm.tagDateDomain)
      .groupBy(m => _.toLower(m.tag))
      .toPairs()
      .flatMap(p => {
         var tldata = [];
         var tag = p[0];
         return _.chain(p[1])
            .groupBy(m => m.year)
            .mapValues(g => g.length)
            .toPairs()
            .map(yc => {
               return {
                  year: +yc[0],
                  num: yc[1],
                  tag: tag
               };
            })
            .value();
      })
      .sortBy(ynt => ynt.year)
      .value();

   var it2=
      _.chain(data)
         .flatMap(tm => tm.tagDateDomain)
         .groupBy(m => _.toLower(m.tag))
         .toPairs()
         .flatMap(p =>
            _.chain(p[1])
               .groupBy(m => m.year)
               .mapValues(g =>_.groupBy(g, gm => gm.ms))
               .flatMap(ym =>
                  _.flatMap(_.keys(ym), mnth => {
                        return _.chain(ym[mnth])
                           .groupBy(k => k.domain)
                           .toPairs()
                           .map(dm => {
                              return {
                                 year: dm[1][0].year,
                                 month: dm[1][0].ms,
                                 tag: dm[1][0].tag,
                                 domain: dm[0],
                                 num: dm[1].length
                              }
                           }).value()
                     }
                  )).value()).value();
   // console.log(it);
   var visualization = d3plus.viz()
      .container(where)
      .data(it2)
      .type("tree_map")
      .id(["year","month","tag","domain"])
      .size("num")
      .time({"value": "year", "solo": it[0].year})
      .draw();

   // var it2 = _.chain(data)
   //    .flatMap(tm => tm.tagDateDomain)
   //    .groupBy(m => _.toLower(m.tag))
   //    .toPairs()
   //    .flatMap(p =>
   //       _.chain(p[1])
   //          .groupBy(m => m.year)
   //          .mapValues(g =>_.groupBy(g, gm => gm.ms))
   //          .flatMap(ym =>
   //             _.flatMap(_.keys(ym), mnth =>{
   //                _.chain(ym[mnth])
   //                   .groupBy(k => k.domain)
   //                   .toPairs()
   //                   .map(dm => {
   //                      return {
   //                         year: dm[1][0].year,
   //                         month: dm[1][0].ms,
   //                         tag: dm[1][0].tag,
   //                         domain: dm[0],
   //                         value: dm[1].length
   //                      }
   //                   }).value();
   //                console.log(_.groupBy(ym[mnth],k => k.domain));
   //                return _.map(ym[mnth], ymm => {
   //
   //                   return {
   //                      year: ymm.year,
   //                      month: ymm.ms,
   //                      day: ymm.day,
   //                      tag: ymm.tag,
   //                      domain: ymm.domain
   //                   }
   //                });
   //             }
   //
   //             )
   //          )
   //          .value()
   //    )
   //    .value();

   console.log(it2);


   // var byYear = _.chain(data)
   //     .flatMap(d => d.mementos)
   //     .groupBy(m => m.year())
   //
   //     .value();
   //
   //
   //
   // console.log( _.flatMap(yrmnth, g => _.values(g)));

   // console.log(_.chain(data).flatMap(d => _.map(d.mementos,m => {
   //    return _.map(d.tagArray(),t => {
   //       return { domain: m.cleanDomain(), date: m.date,tag: t };
   //    })
   // })).value());
}
