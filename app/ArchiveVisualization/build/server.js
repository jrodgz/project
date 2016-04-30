require("source-map-support").install();
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  var app = __webpack_require__(13);
  var debug = __webpack_require__(29)('serverVisProject:server');
  var http = __webpack_require__(31);
  
  var port = normalizePort(process.env.PORT || '3000');
  app.set('port', port);
  
  var server = http.createServer(app);
  
  server.listen(port);
  server.on('error', onError);
  server.on('listening', onListening);
  
  function normalizePort(val) {
     var port = parseInt(val, 10);
  
     if (isNaN(port)) {
        // named pipe
        return val;
     }
  
     if (port >= 0) {
        // port number
        return port;
     }
  
     return false;
  }
  
  function onError(error) {
     if (error.syscall !== 'listen') {
        throw error;
     }
  
     var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
  
     // handle specific listen errors with friendly messages
     switch (error.code) {
        case 'EACCES':
           console.error(bind + ' requires elevated privileges');
           process.exit(1);
           break;
        case 'EADDRINUSE':
           console.error(bind + ' is already in use');
           process.exit(1);
           break;
        default:
           throw error;
     }
  }
  
  /**
   * Event listener for HTTP server "listening" event.
   */
  
  function onListening() {
     var addr = server.address();
     var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
     debug('Listening on ' + bind);
  }

/***/ },
/* 1 */
/***/ function(module, exports) {

  module.exports = require("babel-polyfill");

/***/ },
/* 2 */
/***/ function(module, exports) {

  module.exports = require("string");

/***/ },
/* 3 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/classCallCheck");

/***/ },
/* 4 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/helpers/createClass");

/***/ },
/* 5 */
/***/ function(module, exports) {

  module.exports = require("lodash");

/***/ },
/* 6 */
/***/ function(module, exports) {

  module.exports = require("tldjs");

/***/ },
/* 7 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/core-js/array/from");

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
     value: true
  });
  exports.mgbFullURIFilter = mgbFullURIFilter;
  exports.mgbFullURIFilterShare = mgbFullURIFilterShare;
  exports.overLapData = overLapData;
  exports.sameTagDomainTimeData = sameTagDomainTimeData;
  exports.mementoGFullURIOverlap = mementoGFullURIOverlap;
  
  __webpack_require__(1);
  
  var _tldjs = __webpack_require__(6);
  
  var _tldjs2 = _interopRequireDefault(_tldjs);
  
  var _lodash = __webpack_require__(5);
  
  var _lodash2 = _interopRequireDefault(_lodash);
  
  var _string = __webpack_require__(2);
  
  var _string2 = _interopRequireDefault(_string);
  
  var _purl = __webpack_require__(12);
  
  var _purl2 = _interopRequireDefault(_purl);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  function mgbFullURIFilter(arr) {
     return _lodash2.default.chain(arr).groupBy(function (m) {
        return m.fulluri;
     }).mapValues(function (ar) {
        if (ar.length > 2) ar.sort(function (m1, m2) {
           return m1.compare(m2);
        });
        return ar;
     }).toPairs().filter(function (p) {
        return p[1].length >= 2;
     }).value();
  }
  
  function mgbFullURIFilterShare(arr) {
     var it = _lodash2.default.chain(arr).groupBy(function (m) {
        return m.fulluri;
     }).value();
     console.log(it);
     return _lodash2.default.chain(arr).groupBy(function (m) {
        return m.fulluri;
     }).mapValues(function (ar) {
        if (ar.length > 2) ar.sort(function (m1, m2) {
           if (m1.temporal.isBefore(m2.temporal)) return -1;
           if (m1.temporal.isSame(m2.temporal)) return 0;
           return 1;
        });
        return ar;
     }).toPairs().filter(function (p) {
        return p[1].length >= 2;
     }).value();
  }
  
  function overLapData(m1, m2) {
     var twixed, ts, th;
     twixed = m1.doTwix(m2);
     ts = '' + twixed.format();
     th = twixed.humanizeLength();
     if (th.indexOf('a few seconds') == -1) {
        ts = twixed.simpleFormat("YYYY-MM-DD hmmA");
     }
     return {
        urir1: m1.fulluri,
        urir2: m2.fulluri,
        burir: m1.fulluri + " - " + m1.fulluri,
        domain: m1.domainWithSuffix,
        easyReadLength: th,
        fullLength: ts,
        fullOut: 'have time span between of ' + th + ' ' + ts,
        fd: m1.jsDate(),
        ld: m2.jsDate()
     };
  }
  // time span between of ${twixed.humanizeLength()}: ${ts}
  function sameTagDomainTimeData(m1, m2, same) {
     var twixed, ts, th, ret;
     twixed = m1.temporal.twix(m2.temporal);
     ts = ': ' + twixed.format();
     th = twixed.humanizeLength();
     if (th.indexOf('a few seconds') == -1) {
        ts = "";
     }
     var purled = (0, _purl2.default)(m1.fullUri);
     var purled2 = (0, _purl2.default)(m2.fullUri);
     if (same) {
        ret = {
           urir: purled.host + purled.pathname,
           domain: m1.domainWithSuffix,
           easyReadLength: th,
           fullLength: ts,
           fullOut: 'have time span of ' + th + ts,
           fd: m1.temporal.toDate(),
           ld: m2.temporal.toDate(),
           one: false,
           areSame: true
        };
     } else {
        ret = {
           urir1: purled.host + purled.pathname,
           urir2: purled2.host + purled2.pathname,
           domain: m1.domainWithSuffix,
           easyReadLength: th,
           fullLength: ts,
           fullOut: 'have time span of ' + th + ts,
           m1d: m1.temporal.toDate(),
           m2d: m2.temporal.toDate(),
           one: false,
           areSame: false
        };
     }
     return ret;
  }
  
  function mementoGFullURIOverlap(group, overlapData) {
     group.forEach(function (g) {
        var len = g[1].length;
        var twixed, ts, th;
        if (len <= 2) {
           overlapData.olapMs.push(overLapData(g[1][0], g[1][1]));
        } else {
           for (var i = 0; i < len; ++i) {
              if (i + 1 < len) {
                 overlapData.olapMs.push(overLapData(g[1][i], g[1][i + 1]));
              }
           }
        }
     });
  }

/***/ },
/* 9 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/core-js/json/stringify");

/***/ },
/* 10 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/core-js/set");

/***/ },
/* 11 */
/***/ function(module, exports) {

  module.exports = require("express");

/***/ },
/* 12 */
/***/ function(module, exports) {

  module.exports = require("purl");

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  __webpack_require__(1);
  
  var _path = __webpack_require__(37);
  
  var _path2 = _interopRequireDefault(_path);
  
  var _express = __webpack_require__(11);
  
  var _express2 = _interopRequireDefault(_express);
  
  var _cookieParser = __webpack_require__(25);
  
  var _cookieParser2 = _interopRequireDefault(_cookieParser);
  
  var _bodyParser = __webpack_require__(24);
  
  var _bodyParser2 = _interopRequireDefault(_bodyParser);
  
  var _prettyError = __webpack_require__(38);
  
  var _prettyError2 = _interopRequireDefault(_prettyError);
  
  var _morgan = __webpack_require__(34);
  
  var _morgan2 = _interopRequireDefault(_morgan);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var welcomePage = __webpack_require__(14);
  
  var app = global.app = (0, _express2.default)();
  
  app.set('views', _path2.default.join(__dirname, 'views'));
  app.set('view engine', 'jade');
  
  app.use(_express2.default.static(_path2.default.join(__dirname, 'public')));
  
  app.use((0, _cookieParser2.default)());
  app.use(_bodyParser2.default.urlencoded({ extended: true }));
  app.use(_bodyParser2.default.json());
  
  app.use('/', welcomePage);
  app.set('json spaces', 10);
  var pe = new _prettyError2.default();
  app.use(function (req, res, next) {
  
     var err = new Error('Not Found');
     err.status = 404;
     next(err);
  });
  
  app.use(function (err, req, res, next) {
     console.log(pe.render(err));
     res.status(err.status || 500);
     res.render('error', {
        message: err.message,
        error: err
     });
  });
  
  module.exports = app;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  var _stringify = __webpack_require__(9);
  
  var _stringify2 = _interopRequireDefault(_stringify);
  
  __webpack_require__(1);
  
  var _express = __webpack_require__(11);
  
  var _express2 = _interopRequireDefault(_express);
  
  var _sheetParser = __webpack_require__(20);
  
  var _sheetParser2 = _interopRequireDefault(_sheetParser);
  
  var _nodePersist = __webpack_require__(35);
  
  var _nodePersist2 = _interopRequireDefault(_nodePersist);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  _nodePersist2.default.initSync();
  var welcomeRouter = _express2.default.Router();
  var tags = null;
  var olap = null;
  welcomeRouter.get('/', function (req, res, next) {
     console.log("Got the welcome page");
     res.render('welcomePage', {
        pretty: true,
        title: 'Welcome to cs725 Archive Vis',
        headConent: "Input URL To Google Docs SpreadSheet"
     });
  });
  
  welcomeRouter.post('/', function (req, res, next) {
     var url = req.body.sheetURL;
     var sp = new _sheetParser2.default(url);
  
     sp.loadSheet(function (d) {
        tags = d.graphData.tags;
        olap = d.tdol;
        _nodePersist2.default.setItem('data', (0, _stringify2.default)(d));
        res.redirect('/vis');
        console.log("Done");
     });
  
     console.log(url);
  });
  
  welcomeRouter.get('/vis', function (req, res, next) {
     console.log("Got the get vis");
     res.render('vis', {
        pretty: true,
        "tags": tags,
        "olap": olap
     });
  });
  
  welcomeRouter.get('/data', function (req, res, next) {
     console.log("got data");
     res.json(JSON.parse(_nodePersist2.default.getItem('data')));
  });
  
  module.exports = welcomeRouter;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
     value: true
  });
  
  var _from = __webpack_require__(7);
  
  var _from2 = _interopRequireDefault(_from);
  
  var _classCallCheck2 = __webpack_require__(3);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(4);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  __webpack_require__(1);
  
  var _string = __webpack_require__(2);
  
  var _string2 = _interopRequireDefault(_string);
  
  var _tldjs = __webpack_require__(6);
  
  var _tldjs2 = _interopRequireDefault(_tldjs);
  
  var _MementoTag = __webpack_require__(16);
  
  var _MementoTag2 = _interopRequireDefault(_MementoTag);
  
  var _lodash = __webpack_require__(5);
  
  var _lodash2 = _interopRequireDefault(_lodash);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var moment = __webpack_require__(33);
  __webpack_require__(40);
  
  var Memento = function () {
     function Memento(marray, original) {
        (0, _classCallCheck3.default)(this, Memento);
  
        this.date = moment(marray[5], "YYYYMMDDHHmmss");
        this.archive = marray[3];
        this.domain = marray[9];
        this.original = original;
        this.fulluri = marray[6];
        this.tags = null;
        this.tagproject = null;
        this.fullTag = null;
        this.domainWithSuffix = _tldjs2.default.getDomain(this.domain);
     }
  
     (0, _createClass3.default)(Memento, [{
        key: 'addTags',
        value: function addTags(tags, fullTag) {
           var _this = this;
  
           this.fullTag = fullTag;
           this.tags = (0, _from2.default)(tags);
           var d = (0, _string2.default)(_tldjs2.default.getDomain(this.domain)).strip(_tldjs2.default.getPublicSuffix(_tldjs2.default.getDomain(this.domain))).stripPunctuation().s;
           var dt = this.date;
           var fullDom = this.domain;
           this.tagproject = _lodash2.default.map((0, _from2.default)(this.tags), function (t) {
              return new _MementoTag2.default(_this, t);
           });
        }
     }, {
        key: 'getFromData',
        value: function getFromData(f) {
           return {
              from: f, temporal: this.date, domain: this.domain,
              original: this.original, domainWithSuffix: _tldjs2.default.getDomain(this.domain),
              timeString: this.date.format("h:mm:ss a"), year: this.date.year(),
              month: this.date.month() + 1, day: this.date.date(), ymd: this.date.format('DD/MMM/YYYY'),
              fullUri: this.fulluri
           };
        }
     }, {
        key: 'doTwix',
        value: function doTwix(om) {
           return this.date.twix(om.date);
        }
     }, {
        key: 'dateFormated',
        value: function dateFormated(f) {
           return this.date.format(f);
        }
     }, {
        key: 'getSerializableData',
        value: function getSerializableData() {
           return {
              tags: this.tags,
              year: this.date.year(),
              month: this.date.month() + 1,
              ms: this.date.format("MMM"),
              day: this.date.date(),
              domain: this.domain,
              archive: this.archive,
              original: this.original,
              fullURIr: this.fulluri,
              sdateString: this.date.format('DD/MMM/YYYY'),
              jsdateString: this.date.toDate().toDateString(),
              datei: this.date._i
           };
        }
     }, {
        key: 'getTagedOne',
        value: function getTagedOne() {
           return new _MementoTag2.default(this, this.fullTag);
        }
     }, {
        key: 'getTagDomainDate',
        value: function getTagDomainDate() {
           return this.tagproject;
        }
     }, {
        key: 'jsDate',
        value: function jsDate() {
           return this.date.toDate();
        }
     }, {
        key: 'year',
        value: function year() {
           return this.date.year();
        }
     }, {
        key: 'dateString',
        value: function dateString() {
           return this.date.format('DD/MMM/YYYY');
        }
     }, {
        key: 'month',
        value: function month() {
           return this.date.month();
        }
     }, {
        key: 'day',
        value: function day() {
           return this.date.date();
        }
     }, {
        key: 'cleanDomain',
        value: function cleanDomain() {
           return _tldjs2.default.getDomain(this.domain);
        }
     }, {
        key: 'compare',
        value: function compare(m) {
           if (this.date.isBefore(m.date)) return -1;
           if (this.date.isSame(m.date)) return 0;
           return 1;
        }
     }, {
        key: 'toSstring',
        value: function toSstring() {
           return this.dateString() + " " + this.domain + " " + this.tags;
        }
     }, {
        key: 'toJSON',
        value: function toJSON() {
           return this.toString();
        }
     }]);
     return Memento;
  }();
  
  exports.default = Memento;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
     value: true
  });
  
  var _classCallCheck2 = __webpack_require__(3);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(4);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  __webpack_require__(1);
  
  var _tldjs = __webpack_require__(6);
  
  var _tldjs2 = _interopRequireDefault(_tldjs);
  
  var _string = __webpack_require__(2);
  
  var _string2 = _interopRequireDefault(_string);
  
  var _purl = __webpack_require__(12);
  
  var _purl2 = _interopRequireDefault(_purl);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var MementoTag = function () {
     function MementoTag(m, tag) {
        (0, _classCallCheck3.default)(this, MementoTag);
  
        this.tag = tag;
        this.year = m.year();
        this.month = m.month() + 1;
        this.ms = m.date.format("MMM");
        this.day = m.day();
        this.moment = m.date;
        this.jsDate = m.jsDate();
        this.domain = (0, _string2.default)(_tldjs2.default.getDomain(m.domain)).strip(_tldjs2.default.getPublicSuffix(_tldjs2.default.getDomain(m.domain))).stripPunctuation().s;
        this.domainWithSuffix = _tldjs2.default.getDomain(m.domain);
        this.fullDom = m.domain;
        this.fulluri = m.fulluri;
        this.purled = (0, _purl2.default)(this.fulluri);
        this.fulluriout = this.purled.host + this.purled.pathname;
     }
  
     (0, _createClass3.default)(MementoTag, [{
        key: 'getSerializableData',
        value: function getSerializableData() {
           return {
              tag: this.tag,
              year: this.year,
              month: this.month,
              ms: this.ms,
              day: this.day
           };
        }
     }, {
        key: 'dateString',
        value: function dateString() {
           return this.moment.format('MMM-DD-YYYY');
        }
     }, {
        key: 'timeString',
        value: function timeString() {
           return this.moment.format('LTS');
        }
     }, {
        key: 'dateTimeString',
        value: function dateTimeString() {
           return this.moment.format('ddd-MMM-DD-YYYY @ h:m:sa');
        }
     }, {
        key: 'summaryString',
        value: function summaryString() {
           return this.tag + ":" + this.domainWithSuffix + ":" + this.moment.format('ddd-MMM-DD-YYYY @ h:m:sa');
        }
     }, {
        key: 'makeNodeData',
        value: function makeNodeData() {
           return {
              moment: this.moment,
              tag: this.tag,
              domain: this.domain,
              domainSuf: this.domainWithSuffix,
              fullDom: this.fullDom
           };
        }
     }, {
        key: 'compare',
        value: function compare(m) {
           if (this.moment.isBefore(m.moment)) return -1;
           if (this.moment.isSame(m.moment)) return 0;
           return 1;
        }
     }, {
        key: 'toJSON',
        value: function toJSON() {
           return this.toString();
        }
     }]);
     return MementoTag;
  }();
  
  exports.default = MementoTag;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
     value: true
  });
  
  var _getIterator2 = __webpack_require__(21);
  
  var _getIterator3 = _interopRequireDefault(_getIterator2);
  
  var _from = __webpack_require__(7);
  
  var _from2 = _interopRequireDefault(_from);
  
  var _classCallCheck2 = __webpack_require__(3);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(4);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  __webpack_require__(1);
  
  var _tldjs = __webpack_require__(6);
  
  var _tldjs2 = _interopRequireDefault(_tldjs);
  
  var _lodash = __webpack_require__(5);
  
  var _lodash2 = _interopRequireDefault(_lodash);
  
  var _string = __webpack_require__(2);
  
  var _string2 = _interopRequireDefault(_string);
  
  var _utils = __webpack_require__(8);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var TaggedMemmentos = function () {
     function TaggedMemmentos(data, ft) {
        (0, _classCallCheck3.default)(this, TaggedMemmentos);
  
        this.tags = (0, _from2.default)(data.tags);
        this.tset = data.tags;
        this.fullTagS = ft;
        this.tagString = data.tagString;
        this.mementos = data.mementos;
        this.mementos.sort(function (m1, m2) {
           return m1.compare(m2);
        });
        this.mementoRange = this.mementos[0].doTwix(this.mementos[this.mementos.length - 1]);
        this.domains = this.mementos.map(function (m) {
           return m.domain;
        });
        this.tagDateDomain = _lodash2.default.flatMap(this.mementos, function (m) {
           return m.getTagDomainDate();
        });
     }
  
     (0, _createClass3.default)(TaggedMemmentos, [{
        key: 'getFullTag',
        value: function getFullTag() {
           return _lodash2.default.map(this.mementos, function (m) {
              return m.getTagedOne();
           });
        }
     }, {
        key: 'getMementoOverlapData',
        value: function getMementoOverlapData() {
           var gd = (0, _utils.mgbFullURIFilter)(this.mementos);
           var overlapData = { haveOlap: false };
           if (gd.length > 0) {
              overlapData.olapMs = [];
              overlapData.haveOlap = true;
              (0, _utils.mementoGFullURIOverlap)(gd, overlapData);
           }
           return overlapData;
        }
     }, {
        key: 'getMementoTimeData',
        value: function getMementoTimeData() {
           var mtd = {};
           mtd.spansHuman = this.mementoRange.humanizeLength();
           mtd.spans = this.mementoRange.format();
           mtd.spansDays = this.mementoRange.count("days");
           mtd.spansHours = this.mementoRange.count("hours");
           mtd.spanMonths = this.mementoRange.count("months");
           mtd.numberOfMementos = this.mementos.length;
           mtd.domains = this.domains;
           mtd.urirs = _lodash2.default.map(this.mementos, function (m) {
              return m.fulluri;
           });
           mtd.tagString = this.tagString;
           mtd.tags = this.tags;
           var olap = this.getMementoOverlapData();
           mtd.hasOverlap = false;
           if (olap.haveOlap) {
              mtd.hasOverlap = true;
              mtd.overlapData = olap.olapMs;
           }
           return mtd;
        }
     }, {
        key: 'shareTags',
        value: function shareTags(otherTags) {
           var _iteratorNormalCompletion = true;
           var _didIteratorError = false;
           var _iteratorError = undefined;
  
           try {
              for (var _iterator = (0, _getIterator3.default)(otherTags), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                 var ot = _step.value;
  
                 if (this.tset.has(ot)) return true;
              }
           } catch (err) {
              _didIteratorError = true;
              _iteratorError = err;
           } finally {
              try {
                 if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                 }
              } finally {
                 if (_didIteratorError) {
                    throw _iteratorError;
                 }
              }
           }
  
           return false;
        }
     }, {
        key: 'getSharedInfo',
        value: function getSharedInfo(otherTm, from, to) {
           var sharedInfo = {};
           var sharedTags = [];
           var _iteratorNormalCompletion2 = true;
           var _didIteratorError2 = false;
           var _iteratorError2 = undefined;
  
           try {
              for (var _iterator2 = (0, _getIterator3.default)(otherTm.tset), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                 var ot = _step2.value;
  
                 if (this.tset.has(ot)) sharedTags.push(ot);
              }
           } catch (err) {
              _didIteratorError2 = true;
              _iteratorError2 = err;
           } finally {
              try {
                 if (!_iteratorNormalCompletion2 && _iterator2.return) {
                    _iterator2.return();
                 }
              } finally {
                 if (_didIteratorError2) {
                    throw _iteratorError2;
                 }
              }
           }
  
           sharedTags.sort();
           sharedInfo.sharedTags = sharedTags.length > 1 ? _lodash2.default.join(sharedTags, ',') : sharedTags[0];
           sharedInfo.to = to;
           sharedInfo.from = from;
           // console.log(sharedInfo.sharedTags.keys());
           var bothM = _lodash2.default.concat(_lodash2.default.map(this.mementos, function (m) {
              return m.getFromData(1);
           }), _lodash2.default.map(otherTm.mementos, function (m) {
              return m.getFromData(2);
           }));
           sharedInfo.sameYMDTagDomain = _lodash2.default.chain(bothM).groupBy(function (it) {
              return it.ymd;
           }).mapValues(function (v) {
              return _lodash2.default.chain(v).groupBy(function (vv) {
                 return vv.domainWithSuffix;
              }).mapValues(function (ar) {
                 var len = ar.length;
                 var retData = [];
                 if (len > 1) {
                    if (len > 2) {
                       ar.sort(function (m1, m2) {
                          if (m1.temporal.isBefore(m2.temporal)) return -1;
                          if (m1.temporal.isSame(m2.temporal)) return 0;
                          return 1;
                       });
                       for (var i = 0; i < len; ++i) {
                          if (i + 1 < len) {
                             var f = ar[i],
                                 s = ar[i + 1];
                             if (f.fullUri == s.fullUri) {
                                retData.push((0, _utils.sameTagDomainTimeData)(f, s, true));
                             } else {
                                retData.push((0, _utils.sameTagDomainTimeData)(f, s, false));
                             }
                          }
                       }
                    } else {
                       // console.log(ar[0]);
                       retData.push({
                          urir: ar[0].fullUri,
                          domain: ar[0].domainWithSuffix,
                          one: true,
                          date: ar[0].temporal.toDate()
                       });
                    }
                 }
                 return retData;
              }).toPairs().filter(function (p) {
                 return p[1].length >= 1;
              }).value();
           }).toPairs().filter(function (p) {
              return p[1].length >= 1;
           }).value();
  
           return sharedInfo;
        }
     }, {
        key: 'getSerializableData',
        value: function getSerializableData() {
           return {
              tags: this.tags,
              domains: this.domains,
              mementos: _lodash2.default.map(this.mementos, function (m) {
                 return m.getSerializableData();
              })
           };
        }
     }, {
        key: 'cleanedDomains',
        value: function cleanedDomains() {
           return this.domains.map(function (d) {
              return (0, _string2.default)(_tldjs2.default.getDomain(d)).strip(_tldjs2.default.getPublicSuffix(d)).stripPunctuation().s;
           });
        }
     }, {
        key: 'fullDomains',
        value: function fullDomains() {
           return this.domains.map(function (d) {
              return _tldjs2.default.getDomain(d);
           });
        }
     }, {
        key: 'hasTag',
        value: function hasTag(tag) {
           return this.tags.has(tag);
        }
     }, {
        key: 'tagArray',
        value: function tagArray() {
           return (0, _from2.default)(this.tags);
        }
     }, {
        key: 'first',
        value: function first() {
           return this.mementos[0];
        }
     }, {
        key: 'last',
        value: function last() {
           return this.mementos[this.mementos.length - 1];
        }
     }, {
        key: 'numMementos',
        value: function numMementos() {
           return this.mementos.length;
        }
     }, {
        key: 'groupedByYear',
        value: function groupedByYear() {
           return _lodash2.default.groupBy(this.mementos, function (m) {
              return m.temporalDatedate.year();
           });
        }
     }, {
        key: 'groupedByDomain',
        value: function groupedByDomain() {
           return _lodash2.default.groupBy(this.mementos, function (m) {
              return m.domain;
           });
        }
     }, {
        key: 'groupedByYrMnth',
        value: function groupedByYrMnth() {
           var it = this.groupedByYear();
           _lodash2.default.keys(it).forEach(function (k) {
              return it[k] = _lodash2.default.groupBy(it[k], function (m) {
                 return m.month() + 1;
              });
           });
           return it;
        }
     }, {
        key: 'toJSON',
        value: function toJSON() {
           return this.toString();
        }
     }, {
        key: 'simpleString',
        value: function simpleString() {
           return "Tagged Memento " + this.mementoRange.humanizeLength();
        }
     }]);
     return TaggedMemmentos;
  }();
  
  exports.default = TaggedMemmentos;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
     value: true
  });
  
  var _symbol = __webpack_require__(23);
  
  var _symbol2 = _interopRequireDefault(_symbol);
  
  var _keys = __webpack_require__(22);
  
  var _keys2 = _interopRequireDefault(_keys);
  
  var _classCallCheck2 = __webpack_require__(3);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(4);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  __webpack_require__(1);
  
  var _d = __webpack_require__(26);
  
  var _d2 = _interopRequireDefault(_d);
  
  var _d3Tip = __webpack_require__(28);
  
  var _d3Tip2 = _interopRequireDefault(_d3Tip);
  
  var _d3Extended = __webpack_require__(27);
  
  var _d3Extended2 = _interopRequireDefault(_d3Extended);
  
  var _string = __webpack_require__(2);
  
  var _string2 = _interopRequireDefault(_string);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var TimelineChart = function () {
     function TimelineChart(element, data, opts) {
        (0, _classCallCheck3.default)(this, TimelineChart);
  
        var self = this;
  
        var options = this.extendOptions(opts);
  
        var allElements = data.reduce(function (agg, e) {
           return agg.concat(e.data);
        }, []);
  
        var minDt = _d2.default.min(allElements, this.getPointMinDt);
        var maxDt = _d2.default.max(allElements, this.getPointMaxDt);
  
        var elementWidth = options.width || _d2.default.select(element).node().getBoundingClientRect().width;
        var elementHeight = options.height || _d2.default.select(element).node().getBoundingClientRect().height;
  
        var margin = {
           top: 0,
           right: 0,
           bottom: 20,
           left: 0
        };
  
        var width = elementWidth - margin.left - margin.right;
        var height = elementHeight - margin.top - margin.bottom;
  
        var groupWidth = 200;
  
        var x = _d2.default.time.scale().domain([minDt, maxDt]).range([groupWidth, width]);
  
        var xAxis = _d2.default.svg.axis().scale(x).orient('bottom').tickSize(-height);
  
        var zoom = _d2.default.behavior.zoom().x(x).on('zoom', zoomed);
  
        var svg = _d2.default.select(element).append('svg').attr('id', 'tlsvg').attr('width', width + margin.left + margin.right).attr('height', height + margin.top + margin.bottom).append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')').call(zoom);
  
        svg.append('defs').append('clipPath').attr('id', 'chart-content').append('rect').attr('x', groupWidth).attr('y', 0).attr('height', height).attr('width', width - groupWidth);
  
        svg.append('rect').attr('class', 'chart-bounds').attr('x', groupWidth).attr('y', 0).attr('height', height).attr('width', width - groupWidth);
  
        svg.append('g').attr('class', 'x axis').attr('transform', 'translate(0,' + height + ')').call(xAxis);
        var color = _d2.default.scale.category20();
        var groupHeight = height / data.length;
        var groupSection = svg.selectAll('.group-section').data(data).enter().append('line').attr('class', 'group-section').attr('x1', 0).attr('x2', width).attr('y1', function (d, i) {
           return groupHeight * (i + 1);
        }).attr('y2', function (d, i) {
           return groupHeight * (i + 1);
        });
  
        var groupLabels = svg.selectAll('.group-label').data(data).enter().append('text').attr('class', 'group-label').attr('x', 0).attr('y', function (d, i) {
           return groupHeight * i + groupHeight / 2 + 5.5;
        }).attr('dx', '0.5em').text(function (d) {
           var dit = (0, _string2.default)(d.label);
           if (dit.contains(',')) {
              return dit.s.split(',')[0] + ", ....";
           } else {
              return d.s;
           }
        });
  
        var lineSection = svg.append('line').attr('x1', groupWidth).attr('x2', groupWidth).attr('y1', 0).attr('y2', height).attr('stroke', 'black');
  
        var groupIntervalItems = svg.selectAll('.group-interval-item').data(data).enter().append('g').attr('clip-path', 'url(#chart-content)').attr('class', 'item').attr('transform', function (d, i) {
           return 'translate(0, ' + groupHeight * i + ')';
        }).selectAll('.dot').data(function (d) {
           return d.data.filter(function (_) {
              return _.type === TimelineChart.TYPE.INTERVAL;
           });
        }).enter();
  
        var intervalBarHeight = 0.8 * groupHeight;
        var intervalBarMargin = (groupHeight - intervalBarHeight) / 2;
        var intervals = groupIntervalItems.append('rect').attr('class', 'interval').attr('width', function (d) {
           return x(d.to) - x(d.from);
        }).attr('height', intervalBarHeight).attr('y', intervalBarMargin).attr('x', function (d) {
           return x(d.from);
        });
  
        var intervalTexts = groupIntervalItems.append('text').text(function (d) {
           return d.label;
        }).attr('fill', 'white').attr('class', 'interval-text').attr('y', groupHeight / 2 + 5).attr('x', function (d) {
           return x(d.from);
        });
  
        var groupDotItems = svg.selectAll('.group-dot-item').data(data).enter().append('g').attr('clip-path', 'url(#chart-content)').attr('class', 'item').attr('transform', function (d, i) {
           return 'translate(0, ' + groupHeight * i + ')';
        }).selectAll('.dot').data(function (d) {
           return d.data.filter(function (_) {
              return _.type === TimelineChart.TYPE.POINT;
           });
        }).enter();
  
        var dots = groupDotItems.append('circle').attr('class', 'dot').attr('cx', function (d) {
           return x(d.at);
        }).attr('cy', groupHeight / 2).attr('r', 5).style('fill', function (d) {
           return color(d.color);
        });
  
        if (options.tip) {
           if (_d2.default.tip) {
              var tip = _d2.default.tip().attr('class', 'd3-tip').html(options.tip);
              svg.select('.chart-bounds').call(tip);
              dots.on('mouseover', tip.show).on('mouseout', tip.hide);
              if (options.ttip) {
                 var ttip = _d2.default.tip().attr('class', 'd3-tip').html(options.ttip);
                 groupLabels.call(ttip);
                 groupLabels.on('mouseover', ttip.show).on('mouseout', ttip.hide);
              }
           } else {
              console.error('Please make sure you have d3.tip included as dependency (https://github.com/Caged/d3-tip)');
           }
        }
  
        $(window).resize(function () {
           var elementWidth = options.width || _d2.default.select(element).node().getBoundingClientRect().width;
           var elementHeight = options.height || _d2.default.select(element).node().getBoundingClientRect().height;
           var width = elementWidth - margin.left - margin.right;
           var height = elementHeight - margin.top - margin.bottom;
           var groupHeight = height / data.length;
           var tlsvg = _d2.default.select('#tlsvg');
           x.range([groupWidth, elementWidth - margin.left - margin.right]);
           xAxis.scale(x);
           tlsvg.attr('width', elementWidth).attr('height', elementHeight);
           tlsvg.select('g').select('.x axis').attr('transform', 'translate(0,' + height + ')').call(xAxis);
  
           tlsvg.selectAll('.group-dot-item').select('g').attr('transform', function (d, i) {
              return 'translate(0, ' + groupHeight * i + ')';
           });
  
           tlsvg.selectAll('.group-section').attr('x2', width).attr('y1', function (d, i) {
              return groupHeight * (i + 1);
           }).attr('y2', function (d, i) {
              return groupHeight * (i + 1);
           });
           tlsvg.select('.chart-bounds').attr('x', groupWidth).attr('y', 0).attr('height', height).attr('width', width - groupWidth);
  
           tlsvg.select('#chart-content').select('rect').attr('x', groupWidth).attr('y', 0).attr('height', height).attr('width', width - groupWidth);
           tlsvg.selectAll('.group-label').selectAll('text').attr('y', function (d, i) {
              return groupHeight * i + groupHeight / 2 + 5.5;
           });
           tlsvg.select('.x.axis').call(xAxis);
           tlsvg.selectAll('circle.dot').attr('cx', function (d) {
              return x(d.at);
           }).attr('cy', groupHeight / 2);
           tlsvg.selectAll('rect.interval').attr('x', function (d) {
              return x(d.from);
           }).attr('width', function (d) {
              return x(d.to) - x(d.from);
           });
           tlsvg.selectAll('.interval-text').attr('x', function (d) {
              var positionData = getTextPositionData.call(this, d);
              if (positionData.upToPosition - groupWidth - 10 < positionData.textWidth) {
                 return positionData.upToPosition;
              } else if (positionData.xPosition < groupWidth && positionData.upToPosition > groupWidth) {
                 return groupWidth;
              }
              return positionData.xPosition;
           }).attr('text-anchor', function (d) {
              var positionData = getTextPositionData.call(this, d);
              if (positionData.upToPosition - groupWidth - 10 < positionData.textWidth) {
                 return 'end';
              }
              return 'start';
           }).attr('dx', function (d) {
              var positionData = getTextPositionData.call(this, d);
              if (positionData.upToPosition - groupWidth - 10 < positionData.textWidth) {
                 return '-0.5em';
              }
              return '0.5em';
           });
        });
  
        zoomed();
  
        function zoomed() {
           if (self.onVizChangeFn && _d2.default.event) {
              self.onVizChangeFn.call(self, {
                 scale: _d2.default.event.scale,
                 translate: _d2.default.event.translate,
                 domain: x.domain()
              });
           }
  
           svg.select('.x.axis').call(xAxis);
  
           svg.selectAll('circle.dot').attr('cx', function (d) {
              return x(d.at);
           });
           svg.selectAll('rect.interval').attr('x', function (d) {
              return x(d.from);
           }).attr('width', function (d) {
              return x(d.to) - x(d.from);
           });
  
           svg.selectAll('.interval-text').attr('x', function (d) {
              var positionData = getTextPositionData.call(this, d);
              if (positionData.upToPosition - groupWidth - 10 < positionData.textWidth) {
                 return positionData.upToPosition;
              } else if (positionData.xPosition < groupWidth && positionData.upToPosition > groupWidth) {
                 return groupWidth;
              }
              return positionData.xPosition;
           }).attr('text-anchor', function (d) {
              var positionData = getTextPositionData.call(this, d);
              if (positionData.upToPosition - groupWidth - 10 < positionData.textWidth) {
                 return 'end';
              }
              return 'start';
           }).attr('dx', function (d) {
              var positionData = getTextPositionData.call(this, d);
              if (positionData.upToPosition - groupWidth - 10 < positionData.textWidth) {
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
              };
           }
        }
     }
  
     (0, _createClass3.default)(TimelineChart, [{
        key: 'extendOptions',
        value: function extendOptions(ext) {
           if (!ext) {
              ext = {};
           }
           var defaultOptions = {
              tip: undefined,
              textTruncateThreshold: 30
           };
           (0, _keys2.default)(ext).map(function (k) {
              return defaultOptions[k] = ext[k];
           });
           return defaultOptions;
        }
     }, {
        key: 'getPointMinDt',
        value: function getPointMinDt(p) {
           return p.type === TimelineChart.TYPE.POINT ? p.at : p.from;
        }
     }, {
        key: 'getPointMaxDt',
        value: function getPointMaxDt(p) {
           return p.type === TimelineChart.TYPE.POINT ? p.at : p.to;
        }
     }, {
        key: 'onVizChange',
        value: function onVizChange(fn) {
           this.onVizChangeFn = fn;
           return this;
        }
     }]);
     return TimelineChart;
  }();
  
  exports.default = TimelineChart;
  
  
  TimelineChart.TYPE = {
     POINT: (0, _symbol2.default)(),
     INTERVAL: (0, _symbol2.default)()
  };

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
     value: true
  });
  
  var _set = __webpack_require__(10);
  
  var _set2 = _interopRequireDefault(_set);
  
  var _from = __webpack_require__(7);
  
  var _from2 = _interopRequireDefault(_from);
  
  var _classCallCheck2 = __webpack_require__(3);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(4);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  __webpack_require__(1);
  
  var _lodash = __webpack_require__(5);
  
  var _lodash2 = _interopRequireDefault(_lodash);
  
  var _d3timeline = __webpack_require__(18);
  
  var _d3timeline2 = _interopRequireDefault(_d3timeline);
  
  var _string = __webpack_require__(2);
  
  var _string2 = _interopRequireDefault(_string);
  
  var _nodeSerialize = __webpack_require__(36);
  
  var _nodeSerialize2 = _interopRequireDefault(_nodeSerialize);
  
  var _utils = __webpack_require__(8);
  
  var _utils2 = _interopRequireDefault(_utils);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var jsnx = __webpack_require__(32);
  
  var dataPrepair = function () {
     function dataPrepair(data) {
        (0, _classCallCheck3.default)(this, dataPrepair);
  
        this.data = data;
     }
  
     (0, _createClass3.default)(dataPrepair, [{
        key: '_makeDataForTimeLine',
        value: function _makeDataForTimeLine() {
           var tldata = [];
  
           this.data.forEach(function (d) {
              var tmTl = {
                 label: (0, _string2.default)(d.tagString).replaceAll(',', ', ').s,
                 data: []
              };
              d.mementos.forEach(function (m) {
                 return tmTl.data.push({
                    at: m.jsDate().toDateString(),
                    urim: m.domainWithSuffix,
                    color: d.tagString
                 });
              });
              tldata.push(tmTl);
           });
  
           return tldata;
        }
     }, {
        key: '_makeDataForTopTenArchivingYears',
        value: function _makeDataForTopTenArchivingYears() {
           var mapOfMementoTotals = {};
           this.data.forEach(function (tm) {
              tm.mementos.forEach(function (m) {
                 if (m.year() in mapOfMementoTotals) {
                    mapOfMementoTotals[m.year()] += 1;
                 } else {
                    mapOfMementoTotals[m.year()] = 1;
                 }
              });
           });
           var sortable = [];
           for (var entry in mapOfMementoTotals) {
              sortable.push([entry, mapOfMementoTotals[entry]]);
           }sortable.sort(function (a, b) {
              return b[1] - a[1];
           });
  
           // craete the json map for chart
           var mementoTotalsdataToPlot = [];
           var totalToGet = sortable.length > 10 ? 10 : sortable.length;
           for (var i = 1; i < totalToGet; i++) {
              var entry = {
                 'Year of Archive': sortable[i][0],
                 'Number Of Mementos': sortable[i][1]
              };
              mementoTotalsdataToPlot.push(entry);
           }
           return mementoTotalsdataToPlot;
        }
     }, {
        key: '_makeDataForTopTenKeyWords',
        value: function _makeDataForTopTenKeyWords() {
           return _lodash2.default.chain(this.data).flatMap(function (tm) {
              return tm.tagArray();
           }).groupBy(function (tag) {
              return tag;
           }).mapValues(function (tg) {
              return tg.length;
           }).toPairs().orderBy(function (it) {
              return -it[1];
           }).map(function (p) {
              return { name: p[0], size: p[1], group: '' };
           }).take(10).value();
        }
     }, {
        key: '_makeDataForTopTenDomains',
        value: function _makeDataForTopTenDomains() {
           var topTen = _lodash2.default.chain(this.data).flatMap(function (mc) {
              return mc.cleanedDomains();
           }).groupBy(function (d) {
              return d;
           }).mapValues(function (v, k) {
              return v.length;
           }).toPairs().sortBy(function (p) {
              return -p[1];
           }).take(10).value();
           var histdata = {
              x: ['x'],
              cols: ['Occurrence Count']
           };
           topTen.forEach(function (tt) {
              histdata.cols.push(tt[1]);
              histdata.x.push(tt[0]);
           });
           return histdata;
        }
     }, {
        key: '_makeDataForTagHistogram',
        value: function _makeDataForTagHistogram() {
           var histdata = {
              x: ['x'],
              cols: ['Number of Mementos']
           };
           this.data.forEach(function (tm) {
              histdata.cols.push(tm.numMementos());
              histdata.x.push(tm.tagString);
           });
  
           return histdata;
        }
     }, {
        key: '_makeDataForYearMonthTagDomainTree',
        value: function _makeDataForYearMonthTagDomainTree() {
           var compiled = _lodash2.default.template('<% _.forEach(dates, function(d) { %><%-d%>\n<% }); %>');
  
           var it = _lodash2.default.chain(this.data).flatMap(function (tm) {
              return tm.tagDateDomain;
           }).groupBy(function (m) {
              return _lodash2.default.toLower(m.tag);
           }).toPairs().flatMap(function (p) {
              return _lodash2.default.chain(p[1]).groupBy(function (m) {
                 return m.year;
              }).mapValues(function (g) {
                 return _lodash2.default.groupBy(g, function (gm) {
                    return gm.ms;
                 });
              }).flatMap(function (ym) {
                 return _lodash2.default.flatMap(_lodash2.default.keys(ym), function (mnth) {
                    return _lodash2.default.chain(ym[mnth]).groupBy(function (k) {
                       return k.domainWithSuffix;
                    }).toPairs().map(function (dm) {
                       return {
                          year: dm[1][0].year,
                          month: dm[1][0].ms,
                          tag: dm[1][0].tag,
                          domain: dm[0],
                          num: dm[1].length,
                          dates: compiled({ dates: _lodash2.default.map(dm[1], function (j) {
                                return j.moment.format("h:mm:ss a");
                             }) })
                       };
                    }).value();
                 });
              }).value();
           }).value();
           return it;
        }
     }, {
        key: '_makeDataForDomainTagYearMonthTree',
        value: function _makeDataForDomainTagYearMonthTree() {
           var compiled = _lodash2.default.template('<% _.forEach(dates, function(d) { %><%-d%>\n<% }); %>');
  
           var it = _lodash2.default.chain(this.data).flatMap(function (tm) {
              return tm.tagDateDomain;
           }).groupBy(function (m) {
              return m.domain;
           }).toPairs().flatMap(function (p) {
              return _lodash2.default.chain(p[1]).groupBy(function (m) {
                 return m.tag;
              }).mapValues(function (g) {
                 return _lodash2.default.groupBy(g, function (gm) {
                    return gm.year;
                 });
              }).flatMap(function (ym) {
                 return _lodash2.default.flatMap(_lodash2.default.keys(ym), function (mnth) {
                    return _lodash2.default.chain(ym[mnth]).groupBy(function (k) {
                       return k.ms;
                    }).toPairs().map(function (dm) {
                       return {
                          year: dm[1][0].year,
                          month: dm[0],
                          tag: dm[1][0].tag,
                          domain: dm[1][0].domainWithSuffix,
                          num: dm[1].length,
                          dates: compiled({ dates: _lodash2.default.map(dm[1], function (j) {
                                return j.moment.format("h:mm:ss a");
                             }) })
                       };
                    }).value();
                 });
              }).value();
           }).value();
           return it;
        }
     }, {
        key: '_makeDataForTagDomainYearMonthTree',
        value: function _makeDataForTagDomainYearMonthTree() {
           var compiled = _lodash2.default.template('<% _.forEach(dates, function(d) { %><%-d%>\n<% }); %>');
           var it = _lodash2.default.chain(this.data).flatMap(function (tm) {
              return tm.tagDateDomain;
           }).groupBy(function (m) {
              return m.tag;
           }).toPairs().flatMap(function (p) {
              return _lodash2.default.chain(p[1]).groupBy(function (m) {
                 return m.domain;
              }).mapValues(function (g) {
                 return _lodash2.default.groupBy(g, function (gm) {
                    return gm.year;
                 });
              }).flatMap(function (ym) {
                 return _lodash2.default.flatMap(_lodash2.default.keys(ym), function (mnth) {
                    return _lodash2.default.chain(ym[mnth]).groupBy(function (k) {
                       return k.ms;
                    }).toPairs().map(function (dm) {
                       return {
                          year: dm[1][0].year,
                          month: dm[0],
                          tag: dm[1][0].tag,
                          domain: dm[1][0].domainWithSuffix,
                          num: dm[1].length,
                          dates: compiled({ dates: _lodash2.default.map(dm[1], function (j) {
                                return j.moment.format("h:mm:ss a");
                             }) })
                       };
                    }).value();
                 });
              }).value();
           }).value();
           return it;
        }
     }, {
        key: '_makeDataForCircles',
        value: function _makeDataForCircles() {
           var tagSet = { tagedMs: [], tags: [] };
           this.data.forEach(function (tmm) {
              tagSet.tags.push(tmm.fullTagS);
              var tagDateDomain = tmm.getFullTag();
              var nodes = [];
              var edges = [];
              var grouped = _lodash2.default.chain(tagDateDomain).groupBy(function (it) {
                 return it.fulluriout;
              }).toPairs().value();
              nodes.push({ name: tmm.fullTagS });
  
              grouped.forEach(function (g) {
                 edges.push({ source: tmm.fullTagS, target: g[0], strength: g[0].length });
                 g[1].forEach(function (gg) {
                    nodes.push({ name: gg.fulluriout });
                    edges.push({ source: g[0], target: gg.fulluriout });
                    nodes.push({ name: gg.dateTimeString() });
                    edges.push({ source: gg.fulluriout, target: gg.dateTimeString() });
                 });
              });
  
              var kl2 = _lodash2.default.countBy(edges, function (e) {
                 return e.source + e.target;
              });
  
              edges.forEach(function (e) {
                 e.strength = kl2[e.source + e.target];
              });
              tagSet.tagedMs.push({ nodes: nodes, edges: edges, focus: tmm.fullTagS });
           });
           return tagSet;
        }
     }, {
        key: '_makeDataForTagDomainYearMonthDayGraph',
        value: function _makeDataForTagDomainYearMonthDayGraph() {
           var tagDateDomain = _lodash2.default.chain(this.data).flatMap(function (tm) {
              return tm.getFullTag();
           }).value();
  
           var g = new jsnx.DiGraph();
  
           var nodes = _lodash2.default.chain(tagDateDomain).flatMap(function (tm) {
              return [{ name: tm.domainWithSuffix }, { name: tm.tag }, { name: tm.dateTimeString() }];
           }).uniqBy('name').value();
  
           nodes.forEach(function (n) {
              return g.addNode(n.name);
           });
  
           var ttdp = _lodash2.default.chain(tagDateDomain).groupBy(function (m) {
              return m.tag;
           }).toPairs().flatMap(function (p) {
              return _lodash2.default.chain(p[1]).groupBy(function (it) {
                 return it.domainWithSuffix;
              }).toPairs().flatMap(function (dg) {
                 return { source: p[0], target: dg[0] };
              }).value();
           }).value();
           var edges = [];
           var dtymdp = _lodash2.default.chain(tagDateDomain).groupBy(function (m) {
              return m.domainWithSuffix;
           }).toPairs().flatMap(function (p) {
              return _lodash2.default.chain(p[1]).groupBy(function (it) {
                 return it.dateTimeString();
              }).toPairs().flatMap(function (dg) {
                 return { source: p[0], target: dg[0] };
              }).value();
           }).value();
  
           edges = edges.concat(ttdp);
           edges = edges.concat(dtymdp);
           edges.forEach(function (e) {
              return g.addEdge(e.source, e.target);
           });
  
           var sizedNodes = {};
  
           (0, _from2.default)(g.nodesIter()).forEach(function (n) {
              var out = g.outDegree(n);
              var iin = g.inDegree(n);
              sizedNodes[n] = {
                 size: out + iin,
                 out: out,
                 iin: iin
              };
           });
           nodes.forEach(function (n) {
              n.howBig = sizedNodes[n.name].size;
              n.connectionsOut = sizedNodes[n.name].out;
              n.connectionsIn = sizedNodes[n.name].iin;
           });
  
           var max = _lodash2.default.maxBy(nodes, function (n) {
              return n.connectionsOut;
           });
           return { nodes: nodes, edges: edges, focus: max };
        }
     }, {
        key: 'getTagOlapGraph',
        value: function getTagOlapGraph() {
           var tagSet = { tagedMs: [] };
           this.data.forEach(function (tmm) {
              var olap = tmm.getMementoOverlapData();
              var ns = new _set2.default();
  
              var edges = [];
              if (olap.haveOlap) {
                 var nodes;
  
                 (function () {
  
                    olap.olapMs.forEach(function (olm) {
  
                       ns.add(olm.domain);
                       ns.add(olm.burir);
                       ns.add(olm.fullOut);
                       edges.push({ source: tmm.fullTagS, target: olm.fullOut });
                       edges.push({ source: olm.fullOut, target: olm.domain });
                       edges.push({ source: olm.domain, target: olm.burir });
                    });
                    var kl2 = _lodash2.default.countBy(edges, function (e) {
                       return e.source + e.target;
                    });
  
                    edges.forEach(function (e) {
                       e.strength = kl2[e.source + e.target];
                    });
                    nodes = _lodash2.default.map((0, _from2.default)(ns), function (ooo) {
                       return { name: ooo };
                    });
  
                    nodes.push({ name: tmm.fullTagS });
                    tagSet.tagedMs.push({ nodes: nodes, edges: edges, focus: tmm.fullTagS });
                 })();
              }
  
              // var grouped = _.chain(tagDateDomain).groupBy(it => it.purled.hostname).toPairs().value();
              // nodes.push({name:tmm.fullTagS});
              //
              // grouped.forEach(g => {
              //    edges.push({source:tmm.fullTagS,target:g[0],strength:g[0].length});
              //    var timeDate = _.chain(g[1]).groupBy(gg => gg.dateString()).toPairs().value();
              //    timeDate.forEach(gg => {
              //       if(gg[1].length > 1){
              //          nodes.push({name:gg[0]});
              //          let len = gg[1].length;
              //          for(var i = 0; i < len; ++i){
              //             if(i+1 < len){
              //                var olap =sameTagDomainTimeData(gg[1][i],gg[1][i+1],false);
              //             }
              //          }
              //       }
              //
              //       edges.push({source:g[0],target:gg.fulluriout});
              //       nodes.push({name:gg.dateTimeString()});
              //       edges.push({source:gg.fulluriout,target:gg.dateTimeString()});
              //    });
              // });
           });
           return tagSet;
           // let c = 0;
           // var shared = _.map(this.data, tmm => {
           //    var cc = c++;
           //    return {tm: tmm, num: cc};
           // });
           // let len = shared.length;
           // let keep = [];
           // for (var i = 0; i < len; ++i) {
           //    // console.log(i);
           //    var cur = shared[i];
           //    var others = _.filter(shared, o => (o.num != cur.num && cur.tm.shareTags(o.tm.tset)));
           //    var sinfo = [];
           //    if (others.length > 0) {
           //       others.forEach(o => sinfo.push(cur.tm.getSharedInfo(o.tm,cur.num,o.num)));
           //       sinfo = _.uniqWith(sinfo, (oo,o) =>{
           //          return oo.to == o.from && o.to == oo.from;
           //       });
           //       keep.push(sinfo);
           //    }
           //
           // }
           //
           // keep = _.chain(keep)
           //    .flatMap(kk => kk)
           //    .groupBy(kk => kk.sharedTags)
           //    .mapValues(ar =>{
           //       if(ar.length > 1){
           //          return _.chain(ar)
           //             .flatMap(v => _.map(v.sameYMDTagDomain,vv => {
           //                return {
           //                   date: vv[0],
           //                   dateShare: vv[1]
           //                };
           //             }))
           //             .groupBy(it => it.date)
           //             .mapValues(vv =>_.chain(vv)
           //                .flatMap(vvv => vvv.dateShare)
           //                .map(it => {
           //                   return {
           //                      domain: it[0],
           //                      time: it[1]
           //                   };
           //                })
           //                .groupBy(it => it.domain)
           //                .mapValues(vv => {
           //                   return _.chain(vv)
           //                      .flatMap(vvv => vvv.time)
           //                      .uniqWith((a,b) => {
           //                         if(a.one && b.one)
           //                            return a.urir == b.urir;
           //                         return true;
           //                      }).value();
           //                })
           //                .toPairs()
           //                .value()
           //             )
           //             .toPairs()
           //
           //             .value();
           //       }
           //       return [ar[0].sharedTags,ar[0]. sameYMDTagDomain];
           //    }).toPairs()
           //    .filter(it => it[0] != 'Rememberence')
           //    .value();
           // return keep;
           // return 1;
        }
     }, {
        key: 'makeDataForVis',
        value: function makeDataForVis(cb) {
           console.log("In dataPrepair doing the things");
           var out = {};
           out.timeDateWithOverlap = _lodash2.default.map(this.data, function (tm) {
              return tm.getMementoTimeData();
           });
  
           out.tdol = _lodash2.default.chain(out.timeDateWithOverlap).filter(function (it) {
              return it.hasOverlap;
           }).map(function (it) {
              return { ts: it.tagString };
           }).value();
           out.tagOlapGraph = this.getTagOlapGraph();
           out.timeline = this._makeDataForTimeLine();
           out.topTenArchingYears = this._makeDataForTopTenArchivingYears();
           console.log("Got top ten archiving years");
           out.topTenKeyWords = this._makeDataForTopTenKeyWords();
           console.log("Got top ten key words");
           out.topTenDomains = this._makeDataForTopTenDomains();
           console.log("Got top ten domains");
           out.tagHistogram = this._makeDataForTagHistogram();
           console.log("Got tag histogram");
           out.yMTDTree = this._makeDataForYearMonthTagDomainTree();
           out.domainTYMTree = this._makeDataForDomainTagYearMonthTree();
           out.tagDomainYearMonthTree = this._makeDataForDomainTagYearMonthTree();
           out.graphData = this._makeDataForCircles();
           out.parsedData = _lodash2.default.map(this.data, function (tm) {
              return tm.getSerializableData();
           });
           console.log("Got year month tag domain tree");
           console.log(out.parsedData);
           // console.log(out.domainTYMTree);
           cb(out);
        }
     }]);
     return dataPrepair;
  }();
  
  exports.default = dataPrepair;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
     value: true
  });
  
  var _set = __webpack_require__(10);
  
  var _set2 = _interopRequireDefault(_set);
  
  var _stringify = __webpack_require__(9);
  
  var _stringify2 = _interopRequireDefault(_stringify);
  
  var _classCallCheck2 = __webpack_require__(3);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(4);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  __webpack_require__(1);
  
  var _Memento = __webpack_require__(15);
  
  var _Memento2 = _interopRequireDefault(_Memento);
  
  var _TaggedMemmentos = __webpack_require__(17);
  
  var _TaggedMemmentos2 = _interopRequireDefault(_TaggedMemmentos);
  
  var _request = __webpack_require__(39);
  
  var _request2 = _interopRequireDefault(_request);
  
  var _lodash = __webpack_require__(5);
  
  var _lodash2 = _interopRequireDefault(_lodash);
  
  var _string = __webpack_require__(2);
  
  var _string2 = _interopRequireDefault(_string);
  
  var _dataPrepair = __webpack_require__(19);
  
  var _dataPrepair2 = _interopRequireDefault(_dataPrepair);
  
  var _fs = __webpack_require__(30);
  
  var _fs2 = _interopRequireDefault(_fs);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var sheetParser = function () {
     function sheetParser(url) {
        (0, _classCallCheck3.default)(this, sheetParser);
  
        this.sp = this;
        this._url = url;
        this.linkExtractor = /^((http[s]?):\/)?\/?([^:\/\s]+)\/([0-9]+|web)\/([0-9]+)\/(((http[s]?):\/\/)((www.)?([a-zA-z0-9\.\-]+))(\/(.+)?))$/;
     }
  
     (0, _createClass3.default)(sheetParser, [{
        key: 'loadSheet',
        value: function loadSheet(cb) {
           var _this = this;
  
           if (typeof this._url !== 'undefined' && this._url !== null) {
              (0, _request2.default)(this._url, function (error, response, body) {
                 if (error) alert("error loading sheet", error);
                 _fs2.default.writeFile('sheet.json', (0, _stringify2.default)(JSON.parse(body)), function (err) {
                    return console.log(err);
                 });
                 _this.parseSheet(JSON.parse(body), cb);
              });
           }
        }
     }, {
        key: 'parseSheet',
        value: function parseSheet(data, cb) {
           var _this2 = this;
  
           console.log("In parseSheet", cb);
           var parsed = (0, _lodash2.default)(data.feed.entry).groupBy(function (e) {
              return e.gsx$tags.$t;
           }).toPairs().map(function (p) {
              var t = new _set2.default(p[0].split(',').map(function (s) {
                 return (0, _string2.default)(s).trim().s;
              }));
              var ft = p[0];
              var d = {
                 tags: t,
                 tagString: p[0],
                 mementos: _lodash2.default.map(p[1], function (e) {
                    var m = new _Memento2.default(_this2.linkExtractor.exec(e['gsx$uri-m'].$t.trim()), e['gsx$uri-m'].$t.trim());
                    m.addTags(t, ft);
                    return m;
                 })
              };
              return new _TaggedMemmentos2.default(d, ft);
           }).value();
           // cb(parsed);
           // console.log("Prepairing Data");
  
           var dprepair = new _dataPrepair2.default(parsed);
           dprepair.makeDataForVis(cb);
        }
     }, {
        key: 'url',
        get: function get() {
           return this._url;
        },
        set: function set(url) {
           this._url = url;
        }
     }]);
     return sheetParser;
  }();
  
  exports.default = sheetParser;

/***/ },
/* 21 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/core-js/get-iterator");

/***/ },
/* 22 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/core-js/object/keys");

/***/ },
/* 23 */
/***/ function(module, exports) {

  module.exports = require("babel-runtime/core-js/symbol");

/***/ },
/* 24 */
/***/ function(module, exports) {

  module.exports = require("body-parser");

/***/ },
/* 25 */
/***/ function(module, exports) {

  module.exports = require("cookie-parser");

/***/ },
/* 26 */
/***/ function(module, exports) {

  module.exports = require("d3");

/***/ },
/* 27 */
/***/ function(module, exports) {

  module.exports = require("d3-extended");

/***/ },
/* 28 */
/***/ function(module, exports) {

  module.exports = require("d3-tip");

/***/ },
/* 29 */
/***/ function(module, exports) {

  module.exports = require("debug");

/***/ },
/* 30 */
/***/ function(module, exports) {

  module.exports = require("fs");

/***/ },
/* 31 */
/***/ function(module, exports) {

  module.exports = require("http");

/***/ },
/* 32 */
/***/ function(module, exports) {

  module.exports = require("jsnetworkx");

/***/ },
/* 33 */
/***/ function(module, exports) {

  module.exports = require("moment");

/***/ },
/* 34 */
/***/ function(module, exports) {

  module.exports = require("morgan");

/***/ },
/* 35 */
/***/ function(module, exports) {

  module.exports = require("node-persist");

/***/ },
/* 36 */
/***/ function(module, exports) {

  module.exports = require("node-serialize");

/***/ },
/* 37 */
/***/ function(module, exports) {

  module.exports = require("path");

/***/ },
/* 38 */
/***/ function(module, exports) {

  module.exports = require("pretty-error");

/***/ },
/* 39 */
/***/ function(module, exports) {

  module.exports = require("request");

/***/ },
/* 40 */
/***/ function(module, exports) {

  module.exports = require("twix");

/***/ }
/******/ ]);
//# sourceMappingURL=server.js.map