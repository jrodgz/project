class TimelineChart {
   constructor(element, data, opts) {
      let self = this;
      d3.select(element).clear();
      d3.select(element).addClass('timeline-chart');

      let options = this.extendOptions(opts);


      let allElements = data.reduce((agg, e) => agg.concat(e.data), []);

      let minDt = d3.min(allElements, this.getPointMinDt);
      let maxDt = d3.max(allElements, this.getPointMaxDt);

      let elementWidth = options.width || d3.select(element).node().getBoundingClientRect().width;
      let elementHeight = options.height || d3.select(element).node().getBoundingClientRect().height;

      let margin = {
         top: 0,
         right: 0,
         bottom: 20,
         left: 0
      };

      let width = elementWidth - margin.left - margin.right;
      let height = elementHeight - margin.top - margin.bottom;

      let groupWidth = 200;

      let x = d3.time.scale()
         .domain([minDt, maxDt])
         .range([groupWidth, width]);

      let xAxis = d3.svg.axis()
         .scale(x)
         .orient('bottom')
         .tickSize(-height);

      let zoom = d3.behavior.zoom()
         .x(x)
         .on('zoom', zoomed);

      let svg = d3.select(element).append('svg').attr('id', 'tlsvg')
         .attr('width', width + margin.left + margin.right)
         .attr('height', height + margin.top + margin.bottom)
         .append('g')
         .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
         .call(zoom);

      svg.append('defs')
         .append('clipPath')
         .attr('id', 'chart-content')
         .append('rect')
         .attr('x', groupWidth)
         .attr('y', 0)
         .attr('height', height)
         .attr('width', width - groupWidth);

      svg.append('rect')
         .attr('class', 'chart-bounds')
         .attr('x', groupWidth)
         .attr('y', 0)
         .attr('height', height)
         .attr('width', width - groupWidth);

      svg.append('g')
         .attr('class', 'x axis')
         .attr('transform', 'translate(0,' + height + ')')
         .call(xAxis);
      let color = d3.scale.category20();
      let groupHeight = height / data.length;
      let groupSection = svg.selectAll('.group-section')
         .data(data)
         .enter()
         .append('line')
         .attr('class', 'group-section')
         .attr('x1', 0)
         .attr('x2', width)
         .attr('y1', (d, i) => {
            return groupHeight * (i + 1);
         })
         .attr('y2', (d, i) => {
            return groupHeight * (i + 1);
         });

      let groupLabels = svg.selectAll('.group-label')
         .data(data)
         .enter()
         .append('text')
         .attr('class', 'group-label')
         .attr('x', 0)
         .attr('y', (d, i) => {
            return (groupHeight * i) + (groupHeight / 2) + 5.5;
         })
         .attr('dx', '0.5em')
         .text(d => {
            let dit = S(d.label);
            if(dit.contains(',')){
               return dit.s.split(',')[0]+", ....";
            } else {
               return d.s;
            }
         });

      let lineSection = svg.append('line').attr('x1', groupWidth).attr('x2', groupWidth).attr('y1', 0).attr('y2', height).attr('stroke', 'black');

      let groupIntervalItems = svg.selectAll('.group-interval-item')
         .data(data)
         .enter()
         .append('g')
         .attr('clip-path', 'url(#chart-content)')
         .attr('class', 'item')
         .attr('transform', (d, i) => `translate(0, ${groupHeight * i})`)
         .selectAll('.dot')
         .data(d => d.data.filter(_ => _.type === TimelineChart.TYPE.INTERVAL))
         .enter();


      let intervalBarHeight = 0.8 * groupHeight;
      let intervalBarMargin = (groupHeight - intervalBarHeight) / 2;
      let intervals = groupIntervalItems
         .append('rect')
         .attr('class', 'interval')
         .attr('width', (d) => x(d.to) - x(d.from))
         .attr('height', intervalBarHeight)
         .attr('y', intervalBarMargin)
         .attr('x', (d) => x(d.from));

      let intervalTexts = groupIntervalItems
         .append('text')
         .text(d => d.label)
         .attr('fill', 'white')
         .attr('class', 'interval-text')
         .attr('y', (groupHeight / 2) + 5)
         .attr('x', (d) => x(d.from));

      let groupDotItems = svg.selectAll('.group-dot-item')
         .data(data)
         .enter()
         .append('g')
         .attr('clip-path', 'url(#chart-content)')
         .attr('class', 'item')
         .attr('transform', (d, i) => `translate(0, ${groupHeight * i})`)
         .selectAll('.dot')
         .data(d => {
            return d.data.filter(_ => _.type === TimelineChart.TYPE.POINT);
         })
         .enter();

      let dots = groupDotItems
         .append('circle')
         .attr('class', 'dot')
         .attr('cx', d => x(d.at))
         .attr('cy', groupHeight / 2)
         .attr('r', 5)
         .style('fill', d => color(d.color));

      if (options.tip) {
         if (d3.tip) {
            let tip = d3.tip().attr('class', 'd3-tip').html(options.tip);
            svg.select('.chart-bounds').call(tip);
            dots.on('mouseover', tip.show).on('mouseout', tip.hide);
            if(options.ttip){
               let ttip = d3.tip().attr('class', 'd3-tip').html(options.ttip);
               groupLabels.call(ttip);
               groupLabels.on('mouseover', ttip.show).on('mouseout', ttip.hide);
            }

         } else {
            console.error('Please make sure you have d3.tip included as dependency (https://github.com/Caged/d3-tip)');
         }
      }


      $(window).resize(function () {
         console.log("resizing", d3.select('tlsvg'));
         let elementWidth = options.width || d3.select(element).node().getBoundingClientRect().width;
         let elementHeight = options.height || d3.select(element).node().getBoundingClientRect().height;
         let width = elementWidth - margin.left - margin.right;
         let height = elementHeight - margin.top - margin.bottom;
         let groupHeight = height / data.length;
         let tlsvg = d3.select('#tlsvg');
         x.range([groupWidth, elementWidth - margin.left - margin.right]);
         xAxis.scale(x);
         tlsvg.attr('width', elementWidth)
            .attr('height', elementHeight);
         tlsvg.select('g').select('.x axis')
            .attr('transform', 'translate(0,' + height + ')')
            .call(xAxis);


         tlsvg.selectAll('.group-dot-item').select('g')
            .attr('transform', (d, i) => `translate(0, ${groupHeight * i})`);

         tlsvg.selectAll('.group-section')
            .attr('x2', width)
            .attr('y1', (d, i) => {
               return groupHeight * (i + 1);
            })
            .attr('y2', (d, i) => {
               return groupHeight * (i + 1);
            });
         tlsvg.select('.chart-bounds').attr('x', groupWidth)
            .attr('y', 0)
            .attr('height', height)
            .attr('width', width - groupWidth);

         tlsvg.select('#chart-content').select('rect')
            .attr('x', groupWidth)
            .attr('y', 0)
            .attr('height', height)
            .attr('width', width - groupWidth);
         tlsvg.selectAll('.group-label').selectAll('text')
            .attr('y', (d, i) => {
               return (groupHeight * i) + (groupHeight / 2) + 5.5;
            });
         tlsvg.select('.x.axis').call(xAxis);
         tlsvg.selectAll('circle.dot').attr('cx', d => x(d.at)).attr('cy', groupHeight / 2);
         tlsvg.selectAll('rect.interval').attr('x', d => x(d.from)).attr('width', d => x(d.to) - x(d.from));
         tlsvg.selectAll('.interval-text').attr('x', function (d) {
            let positionData = getTextPositionData.call(this, d);
            if ((positionData.upToPosition - groupWidth - 10) < positionData.textWidth) {
               return positionData.upToPosition;
            } else if (positionData.xPosition < groupWidth && positionData.upToPosition > groupWidth) {
               return groupWidth;
            }
            return positionData.xPosition;
         }).attr('text-anchor', function (d) {
               let positionData = getTextPositionData.call(this, d);
               if ((positionData.upToPosition - groupWidth - 10) < positionData.textWidth) {
                  return 'end';
               }
               return 'start';
            })
            .attr('dx', function (d) {
               let positionData = getTextPositionData.call(this, d);
               if ((positionData.upToPosition - groupWidth - 10) < positionData.textWidth) {
                  return '-0.5em';
               }
               return '0.5em';
            });
      
      });

      zoomed();

      function zoomed() {
         if (self.onVizChangeFn && d3.event) {
            self.onVizChangeFn.call(self, {
               scale: d3.event.scale,
               translate: d3.event.translate,
               domain: x.domain()
            });
         }

         svg.select('.x.axis').call(xAxis);

         svg.selectAll('circle.dot').attr('cx', d => x(d.at));
         svg.selectAll('rect.interval').attr('x', d => x(d.from)).attr('width', d => x(d.to) - x(d.from));

         svg.selectAll('.interval-text').attr('x', function (d) {
            let positionData = getTextPositionData.call(this, d);
            if ((positionData.upToPosition - groupWidth - 10) < positionData.textWidth) {
               return positionData.upToPosition;
            } else if (positionData.xPosition < groupWidth && positionData.upToPosition > groupWidth) {
               return groupWidth;
            }
            return positionData.xPosition;
         }).attr('text-anchor', function (d) {
               let positionData = getTextPositionData.call(this, d);
               if ((positionData.upToPosition - groupWidth - 10) < positionData.textWidth) {
                  return 'end';
               }
               return 'start';
            })
            .attr('dx', function (d) {
               let positionData = getTextPositionData.call(this, d);
               if ((positionData.upToPosition - groupWidth - 10) < positionData.textWidth) {
                  return '-0.5em';
               }
               return '0.5em';
            }).text(function (d) {
            var positionData = getTextPositionData.call(this, d);
            var percent = (positionData.width - options.textTruncateThreshold) / positionData.textWidth;
            if (percent < 1) {
               if (positionData.width > options.textTruncateThreshold) {
                  return d.label.substr(0, Math.floor(d.label.length * percent)) + '...';
               } else {
                  return '';
               }
            }

            return d.label;
         });

         function getTextPositionData(d) {
            this.textSizeInPx = this.textSizeInPx || this.getComputedTextLength();
            var from = x(d.from);
            var to = x(d.to);
            return {
               xPosition: from,
               upToPosition: to,
               width: to - from,
               textWidth: this.textSizeInPx
            }
         }
      }
   }

   extendOptions(ext = {}) {
      let defaultOptions = {
         tip: undefined,
         textTruncateThreshold: 30
      };
      Object.keys(ext).map(k => defaultOptions[k] = ext[k]);
      return defaultOptions;
   }

   getPointMinDt(p) {
      return p.type === TimelineChart.TYPE.POINT ? p.at : p.from;
   }

   getPointMaxDt(p) {
      return p.type === TimelineChart.TYPE.POINT ? p.at : p.to;
   }

   onVizChange(fn) {
      this.onVizChangeFn = fn;
      return this;
   }
}

TimelineChart.TYPE = {
   POINT: Symbol(),
   INTERVAL: Symbol()
};

// 'use strict';
//
// var _createClass = function () {
//    function defineProperties(target, props) {
//       for (var i = 0; i < props.length; i++) {
//          var descriptor = props[i];
//          descriptor.enumerable = descriptor.enumerable || false;
//          descriptor.configurable = true;
//          if ("value" in descriptor) descriptor.writable = true;
//          Object.defineProperty(target, descriptor.key, descriptor);
//       }
//    }
//
//    return function (Constructor, protoProps, staticProps) {
//       if (protoProps) defineProperties(Constructor.prototype, protoProps);
//       if (staticProps) defineProperties(Constructor, staticProps);
//       return Constructor;
//    };
// }();
//
// function _classCallCheck(instance, Constructor) {
//    if (!(instance instanceof Constructor)) {
//       throw new TypeError("Cannot call a class as a function");
//    }
// }
//
// var TimelineChart = function () {
//    function TimelineChart(element, data, opts) {
//       _classCallCheck(this, TimelineChart);
//
//       var self = this;
//
//       d3.select(element).addClass('timeline-chart');
//
//
//       var options = this.extendOptions(opts);
//
//       var allElements = data.reduce((agg,e)=> agg.concat(e.data), []);
//
//       var minDt = d3.min(allElements, this.getPointMinDt);
//       var maxDt = d3.max(allElements, this.getPointMaxDt);
//
//
//
//       var elementWidth = options.width || d3.select(element).node().getBoundingClientRect().width;
//       var elementHeight = options.height || d3.select(element).node().getBoundingClientRect().height;
//
//       var margin = {
//          top: 0,
//          right: 0,
//          bottom: 20,
//          left: 0
//       };
//
//       var width = elementWidth - margin.left - margin.right;
//       var height = elementHeight - margin.top - margin.bottom;
//
//       var groupWidth = 200;
//
//       var x = d3.time.scale().domain([minDt, maxDt]).range([groupWidth, width]);
//
//       var xAxis = d3.svg.axis().scale(x).orient('bottom').tickSize(-height);
//
//       var zoom = d3.behavior.zoom().x(x).on('zoom', zoomed);
//
//       var svg = d3.select(element).append('svg').attr('width', width + margin.left + margin.right).attr('height', height + margin.top + margin.bottom).append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')').call(zoom);
//
//       svg.append('defs').append('clipPath').attr('id', 'chart-content').append('rect').attr('x', groupWidth).attr('y', 0).attr('height', height).attr('width', width - groupWidth);
//
//       svg.append('rect').attr('class', 'chart-bounds').attr('x', groupWidth).attr('y', 0).attr('height', height).attr('width', width - groupWidth);
//
//       svg.append('g').attr('class', 'x axis').attr('transform', 'translate(0,' + height + ')').call(xAxis);
//
//       var groupHeight = height / data.length;
//       var groupSection = svg.selectAll('.group-section').data(data).enter().append('line').attr('class', 'group-section').attr('x1', 0).attr('x2', width).attr('y1', function (d, i) {
//          return groupHeight * (i + 1);
//       }).attr('y2', function (d, i) {
//          return groupHeight * (i + 1);
//       });
//
//       var groupLabels = svg.selectAll('.group-label').data(data).enter().append('text').attr('class', 'group-label').attr('x', 0).attr('y', function (d, i) {
//          return groupHeight * i + groupHeight / 2 + 5.5;
//       }).attr('dx', '0.5em').text(function (d) {
//          return d.label;
//       });
//
//       var lineSection = svg.append('line').attr('x1', groupWidth).attr('x2', groupWidth).attr('y1', 0).attr('y2', height).attr('stroke', 'black');
//
//       var groupIntervalItems = svg.selectAll('.group-interval-item').data(data).enter().append('g').attr('clip-path', 'url(#chart-content)').attr('class', 'item').attr('transform', function (d, i) {
//          return 'translate(0, ' + groupHeight * i + ')';
//       }).selectAll('.dot').data(function (d) {
//          return d.data.filter(function (_) {
//             return _.type === TimelineChart.TYPE.INTERVAL;
//          });
//       }).enter();
//
//       var intervalBarHeight = 0.8 * groupHeight;
//       var intervalBarMargin = (groupHeight - intervalBarHeight) / 2;
//       var intervals = groupIntervalItems.append('rect').attr('class', 'interval').attr('width', function (d) {
//          return x(d.to) - x(d.from);
//       }).attr('height', intervalBarHeight).attr('y', intervalBarMargin).attr('x', function (d) {
//          return x(d.from);
//       });
//
//       var intervalTexts = groupIntervalItems.append('text').text(function (d) {
//          return d.label;
//       }).attr('fill', 'white').attr('class', 'interval-text').attr('y', groupHeight / 2 + 5).attr('x', function (d) {
//          return x(d.from);
//       });
//
//       var groupDotItems = svg.selectAll('.group-dot-item').data(data).enter().append('g').attr('clip-path', 'url(#chart-content)').attr('class', 'item').attr('transform', function (d, i) {
//          return 'translate(0, ' + groupHeight * i + ')';
//       }).selectAll('.dot').data(function (d) {
//          return d.data.filter(function (_) {
//             return _.type === TimelineChart.TYPE.POINT;
//          });
//       }).enter();
//
//       var dots = groupDotItems.append('circle').attr('class', 'dot').attr('cx', function (d) {
//          return x(d.at);
//       }).attr('cy', groupHeight / 2).attr('r', 5);
//
//       if (options.tip) {
//          if (d3.tip) {
//             var tip = d3.tip().attr('class', 'd3-tip').html(options.tip);
//             svg.call(tip);
//             dots.on('mouseover', tip.show).on('mouseout', tip.hide);
//          } else {
//             console.error('Please make sure you have d3.tip included as dependency (https://github.com/Caged/d3-tip)');
//          }
//       }
//
//       zoomed();
//
//       function zoomed() {
//          if (self.onVizChangeFn && d3.event) {
//             self.onVizChangeFn.call(self, {
//                scale: d3.event.scale,
//                translate: d3.event.translate,
//                domain: x.domain()
//             });
//          }
//
//          svg.select('.x.axis').call(xAxis);
//
//          svg.selectAll('circle.dot').attr('cx', function (d) {
//             return x(d.at);
//          });
//          svg.selectAll('rect.interval').attr('x', function (d) {
//             return x(d.from);
//          }).attr('width', function (d) {
//             return x(d.to) - x(d.from);
//          });
//
//          svg.selectAll('.interval-text').attr('x', function (d) {
//             var positionData = getTextPositionData.call(this, d);
//             if (positionData.upToPosition - groupWidth - 10 < positionData.textWidth) {
//                return positionData.upToPosition;
//             } else if (positionData.xPosition < groupWidth && positionData.upToPosition > groupWidth) {
//                return groupWidth;
//             }
//             return positionData.xPosition;
//          }).attr('text-anchor', function (d) {
//             var positionData = getTextPositionData.call(this, d);
//             if (positionData.upToPosition - groupWidth - 10 < positionData.textWidth) {
//                return 'end';
//             }
//             return 'start';
//          }).attr('dx', function (d) {
//             var positionData = getTextPositionData.call(this, d);
//             if (positionData.upToPosition - groupWidth - 10 < positionData.textWidth) {
//                return '-0.5em';
//             }
//             return '0.5em';
//          }).text(function (d) {
//             var positionData = getTextPositionData.call(this, d);
//             var percent = (positionData.width - options.textTruncateThreshold) / positionData.textWidth;
//             if (percent < 1) {
//                if (positionData.width > options.textTruncateThreshold) {
//                   return d.label.substr(0, Math.floor(d.label.length * percent)) + '...';
//                } else {
//                   return '';
//                }
//             }
//
//             return d.label;
//          });
//
//          function getTextPositionData(d) {
//             this.textSizeInPx = this.textSizeInPx || this.getComputedTextLength();
//             var from = x(d.from);
//             var to = x(d.to);
//             return {
//                xPosition: from,
//                upToPosition: to,
//                width: to - from,
//                textWidth: this.textSizeInPx
//             };
//          }
//       }
//    }
//
//    _createClass(TimelineChart, [{
//       key: 'extendOptions',
//       value: function extendOptions() {
//          var ext = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
//
//          var defaultOptions = {
//             tip: undefined,
//             textTruncateThreshold: 30
//          };
//          Object.keys(ext).map(function (k) {
//             return defaultOptions[k] = ext[k];
//          });
//          return defaultOptions;
//       }
//    }, {
//       key: 'getPointMinDt',
//       value: function getPointMinDt(p) {
//          return p.type === TimelineChart.TYPE.POINT ? p.at : p.from;
//       }
//    }, {
//       key: 'getPointMaxDt',
//       value: function getPointMaxDt(p) {
//          return p.type === TimelineChart.TYPE.POINT ? p.at : p.to;
//       }
//    }, {
//       key: 'onVizChange',
//       value: function onVizChange(fn) {
//          this.onVizChangeFn = fn;
//          return this;
//       }
//    }]);
//
//    return TimelineChart;
// }();
//
// TimelineChart.TYPE = {
//    POINT: Symbol(),
//    INTERVAL: Symbol()
// };