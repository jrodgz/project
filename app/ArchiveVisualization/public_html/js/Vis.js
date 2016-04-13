/**
 * Created by john on 4/7/16.
 */
function createTimeLine(where, parsedData) {
   var bindTo = d3.select(where)[0][0];
   var tldata = [];

   parsedData.forEach(d => {
      var tmTl = {
         label: S(d.tagString).replaceAll(',',', ').s,
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

   var tl = new TimelineChart(where,tldata,{
      tip: function (d) {
         return d.at || d.from +'<br>'+d.to;
      },
      ttip: function (d) {
         let dit = S(d.label);
         if(dit.contains(',')){
            return "Tags: "+dit.replaceAll(',',',<br>').s;
         } else {
            return "Tags: "+d.s;
         }
      }
   });

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
      .map(p => { return { name: p[0], num: p[1]}})
      .take(10)
      .value();


   var data = {};
   data.children = [];
   for (var i = 0; i < topTen.length; i++) {
      var newObject = {};
      newObject.name = topTen[i].name;
      newObject.size = topTen[i].num;
      newObject.rank = i;
      data.children.push(newObject);
   }
   var w = $(where).width();
   var h = $(where).height();
   var canvas = d3.select(where).append("svg:svg").attr('width', w).attr('height', h);

   var nodes = d3.layout.pack()
      .value(function(d) { return d.size; })
      .size([w, h])
      .nodes(data);

   // Get rid of root node
   nodes.shift();

   function getColorForCircle(rank) {
      var colors = [	'#a50026', '#d73027',
         '#f46d43', '#fdae61',
         '#fee090', '#e0f3f8',
         '#abd9e9', '#74add1',
         '#4575b4', '#313695'];
      return colors[rank];
   }

   var node = canvas.selectAll(".node")
      .data(nodes).enter().append("g").attr("class", "node")
      .attr("transform", function(d) {
         return "translate(" + d.x + "," + d.y + ")";
      });

   node.append("circle")
      .attr("r", function(d) { return d.r; })
      .attr("fill", function(d) {
         return getColorForCircle(d.rank);
      })
      .attr("stroke", "#000")
      .append("svg:title")
      .text(function(d) { return "The size is : " + d.size; });

   node.append("text")
      .attr("dx", function(d){return -20})
      .attr("font-size", function(d) {
         return "9px;"
      })
      .text(function(d){return d.name});

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
   for (var key in topTenArchiverCols){
      sortedTopTenList.push([key, topTenArchiverCols[key]]);
   }
   sortedTopTenList.sort(function(a, b){return b[1] - a[1]});
   var topTenArray = sortedTopTenList.slice(0,10);

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
      axis : {
         y : {
            label: 'Mementos'
         },
         x : {
            type : 'categorized',
            tick: {
               format: function (x) { return ''; }
            }
         }
      }
   });
}


/*
 create chart top ten popular domains
 */
function createTopTenPopularDomains(where, data) {
   var topTen =_.chain(data)
      .flatMap(mc => mc.cleanedDomains())
      .groupBy(d => d)
      .mapValues((v,k)=> v.length)
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

   var chart =  c3.generate({
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
   var container = drawing.createZoomableContainer(svg, width, height);
   drawing.drawGridLines(container, width * 10, height * 10);

   var count = 0;
   var words = _.chain(data)
      .map(d => _.map(d.tagArray(),t => { return { 'tag': t, 'size': d.mementos.length} }))
      .flatten()
      .uniq(to => to.tag)
      .map(d => {
         return {
            text: d.tag,
            x: Math.floor(Math.random() * width) + 1,
            y: Math.floor(Math.random() * height) + 1,
            style: {
               'font-family': 'sans-serif',
               'font-size':d.size  + 'px',
               'font-weight': 'bold',
               'fill': (count++ % 2 == 0) ? 'red' : 'blue'
            }
         }
      })
      .value();


   var wordGroup = new drawing.WordGroup(container, words);
   wordGroup.makeDraggable();
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

   someXvalue = [];
   someYvalue = [];
   for (var i = 0; i < 10; ++i)
   {
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
   chartLineX = [];
   chartLineY = [];
   for (var i = 0; i < 10; ++i)
   {
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
   var tags = _.map(data, function (tm) {
      return tm.tagArray();
   });
   tags = _.flatten(tags);
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

