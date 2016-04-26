'use strict';
!function(t){if("object"==typeof exports)module.exports=t();else if("function"==typeof define&&define.amd)define(t);else{var e;"undefined"!=typeof window?e=window:"undefined"!=typeof global?e=global:"undefined"!=typeof self&&(e=self),e.S=t()}}(function(){var t;return function e(t,r,n){function i(o,u){if(!r[o]){if(!t[o]){var a="function"==typeof require&&require;if(!u&&a)return a(o,!0);if(s)return s(o,!0);throw new Error("Cannot find module '"+o+"'")}var c=r[o]={exports:{}};t[o][0].call(c.exports,function(e){var r=t[o][1][e];return i(r?r:e)},c,c.exports,e,t,r,n)}return r[o].exports}for(var s="function"==typeof require&&require,o=0;o<n.length;o++)i(n[o]);return i}({1:[function(t,e){function r(t,e){for(var r=0,n=t.indexOf(e);n>=0;)r+=1,n=t.indexOf(e,n+1);return r}e.exports=r},{}],2:[function(t,e){function r(t,e,r,n){if("undefined"==typeof r)var r=-1;var i=t.split(e),s=i.slice(0,r),o=i.slice(r);return i=0===o.length?s:s.concat(o.join(e)),"undefined"==typeof n?i:0>n?i.slice(n):i.slice(0,n)}e.exports=r},{}],3:[function(t,e){function r(t,e,r,n){if("undefined"==typeof r)var r=-1;if("undefined"==typeof n)var n=0;for(var i=[t],s=t.length-1;s>=0;s--)0===i[0].slice(s).indexOf(e)&&(i.length<=r||-1===r)&&(i.splice(1,0,i[0].slice(s+e.length)),i[0]=i[0].slice(0,s));return n>=0?i.slice(-n):i.slice(0,-n)}e.exports=r},{}],4:[function(e,r){!function(){"use strict";function n(t,e){t.s=null!==e&&void 0!==e?"string"==typeof e?e:e.toString():e,t.orig=e,null!==e&&void 0!==e?t.__defineGetter__?t.__defineGetter__("length",function(){return t.s.length}):t.length=e.length:t.length=-1}function i(t){n(this,t)}function s(){for(var t in v)!function(t){var e=v[t];m.hasOwnProperty(t)||(w.push(t),m[t]=function(){return String.prototype.s=this,e.apply(this,arguments)})}(t)}function o(){for(var t=0;t<w.length;++t)delete String.prototype[w[t]];w.length=0}function u(){for(var t=a(),e={},r=0;r<t.length;++r){var n=t[r];if("to"!==n&&"toEnd"!==n){var i=m[n];try{var s=typeof i.apply("teststring");e[n]=s}catch(o){}}}return e}function a(){var t=[];if(Object.getOwnPropertyNames)return t=Object.getOwnPropertyNames(m),t.splice(t.indexOf("valueOf"),1),t.splice(t.indexOf("toSstring"),1),t;var e={};for(var r in String.prototype)e[r]=r;for(var r in Object.prototype)delete e[r];for(var r in e)t.push(r);return t}function c(t){return new i(t)}function l(t, e){var r,n=[];for(r=0; r<t.length; r++)n.push(t[r]),e&&e.call(t,t[r],r);return n}function h(t){var e,r,n=[],i=/^[A-Za-z0-9]+$/;for(t=f(t),r=0; r<t.length; ++r)e=t.charAt(r),n.push(i.test(e)?e:"\\000"===e?"\\000":"\\"+e);return n.join("")}function f(t){return null==t?"":""+t}var p="3.3.1",g={},d={"Á":"A","Ă":"A","Ắ":"A","Ặ":"A","Ằ":"A","Ẳ":"A","Ẵ":"A","Ǎ":"A","Â":"A","Ấ":"A","Ậ":"A","Ầ":"A","Ẩ":"A","Ẫ":"A","Ä":"A","Ǟ":"A","Ȧ":"A","Ǡ":"A","Ạ":"A","Ȁ":"A","À":"A","Ả":"A","Ȃ":"A","Ā":"A","Ą":"A","Å":"A","Ǻ":"A","Ḁ":"A","Ⱥ":"A","Ã":"A","Ꜳ":"AA","Æ":"AE","Ǽ":"AE","Ǣ":"AE","Ꜵ":"AO","Ꜷ":"AU","Ꜹ":"AV","Ꜻ":"AV","Ꜽ":"AY","Ḃ":"B","Ḅ":"B","Ɓ":"B","Ḇ":"B","Ƀ":"B","Ƃ":"B","Ć":"C","Č":"C","Ç":"C","Ḉ":"C","Ĉ":"C","Ċ":"C","Ƈ":"C","Ȼ":"C","Ď":"D","Ḑ":"D","Ḓ":"D","Ḋ":"D","Ḍ":"D","Ɗ":"D","Ḏ":"D","ǲ":"D","ǅ":"D","Đ":"D","Ƌ":"D","Ǳ":"DZ","Ǆ":"DZ","É":"E","Ĕ":"E","Ě":"E","Ȩ":"E","Ḝ":"E","Ê":"E","Ế":"E","Ệ":"E","Ề":"E","Ể":"E","Ễ":"E","Ḙ":"E","Ë":"E","Ė":"E","Ẹ":"E","Ȅ":"E","È":"E","Ẻ":"E","Ȇ":"E","Ē":"E","Ḗ":"E","Ḕ":"E","Ę":"E","Ɇ":"E","Ẽ":"E","Ḛ":"E","Ꝫ":"ET","Ḟ":"F","Ƒ":"F","Ǵ":"G","Ğ":"G","Ǧ":"G","Ģ":"G","Ĝ":"G","Ġ":"G","Ɠ":"G","Ḡ":"G","Ǥ":"G","Ḫ":"H","Ȟ":"H","Ḩ":"H","Ĥ":"H","Ⱨ":"H","Ḧ":"H","Ḣ":"H","Ḥ":"H","Ħ":"H","Í":"I","Ĭ":"I","Ǐ":"I","Î":"I","Ï":"I","Ḯ":"I","İ":"I","Ị":"I","Ȉ":"I","Ì":"I","Ỉ":"I","Ȋ":"I","Ī":"I","Į":"I","Ɨ":"I","Ĩ":"I","Ḭ":"I","Ꝺ":"D","Ꝼ":"F","Ᵹ":"G","Ꞃ":"R","Ꞅ":"S","Ꞇ":"T","Ꝭ":"IS","Ĵ":"J","Ɉ":"J","Ḱ":"K","Ǩ":"K","Ķ":"K","Ⱪ":"K","Ꝃ":"K","Ḳ":"K","Ƙ":"K","Ḵ":"K","Ꝁ":"K","Ꝅ":"K","Ĺ":"L","Ƚ":"L","Ľ":"L","Ļ":"L","Ḽ":"L","Ḷ":"L","Ḹ":"L","Ⱡ":"L","Ꝉ":"L","Ḻ":"L","Ŀ":"L","Ɫ":"L","ǈ":"L","Ł":"L","Ǉ":"LJ","Ḿ":"M","Ṁ":"M","Ṃ":"M","Ɱ":"M","Ń":"N","Ň":"N","Ņ":"N","Ṋ":"N","Ṅ":"N","Ṇ":"N","Ǹ":"N","Ɲ":"N","Ṉ":"N","Ƞ":"N","ǋ":"N","Ñ":"N","Ǌ":"NJ","Ó":"O","Ŏ":"O","Ǒ":"O","Ô":"O","Ố":"O","Ộ":"O","Ồ":"O","Ổ":"O","Ỗ":"O","Ö":"O","Ȫ":"O","Ȯ":"O","Ȱ":"O","Ọ":"O","Ő":"O","Ȍ":"O","Ò":"O","Ỏ":"O","Ơ":"O","Ớ":"O","Ợ":"O","Ờ":"O","Ở":"O","Ỡ":"O","Ȏ":"O","Ꝋ":"O","Ꝍ":"O","Ō":"O","Ṓ":"O","Ṑ":"O","Ɵ":"O","Ǫ":"O","Ǭ":"O","Ø":"O","Ǿ":"O","Õ":"O","Ṍ":"O","Ṏ":"O","Ȭ":"O","Ƣ":"OI","Ꝏ":"OO","Ɛ":"E","Ɔ":"O","Ȣ":"OU","Ṕ":"P","Ṗ":"P","Ꝓ":"P","Ƥ":"P","Ꝕ":"P","Ᵽ":"P","Ꝑ":"P","Ꝙ":"Q","Ꝗ":"Q","Ŕ":"R","Ř":"R","Ŗ":"R","Ṙ":"R","Ṛ":"R","Ṝ":"R","Ȑ":"R","Ȓ":"R","Ṟ":"R","Ɍ":"R","Ɽ":"R","Ꜿ":"C","Ǝ":"E","Ś":"S","Ṥ":"S","Š":"S","Ṧ":"S","Ş":"S","Ŝ":"S","Ș":"S","Ṡ":"S","Ṣ":"S","Ṩ":"S","ẞ":"SS","Ť":"T","Ţ":"T","Ṱ":"T","Ț":"T","Ⱦ":"T","Ṫ":"T","Ṭ":"T","Ƭ":"T","Ṯ":"T","Ʈ":"T","Ŧ":"T","Ɐ":"A","Ꞁ":"L","Ɯ":"M","Ʌ":"V","Ꜩ":"TZ","Ú":"U","Ŭ":"U","Ǔ":"U","Û":"U","Ṷ":"U","Ü":"U","Ǘ":"U","Ǚ":"U","Ǜ":"U","Ǖ":"U","Ṳ":"U","Ụ":"U","Ű":"U","Ȕ":"U","Ù":"U","Ủ":"U","Ư":"U","Ứ":"U","Ự":"U","Ừ":"U","Ử":"U","Ữ":"U","Ȗ":"U","Ū":"U","Ṻ":"U","Ų":"U","Ů":"U","Ũ":"U","Ṹ":"U","Ṵ":"U","Ꝟ":"V","Ṿ":"V","Ʋ":"V","Ṽ":"V","Ꝡ":"VY","Ẃ":"W","Ŵ":"W","Ẅ":"W","Ẇ":"W","Ẉ":"W","Ẁ":"W","Ⱳ":"W","Ẍ":"X","Ẋ":"X","Ý":"Y","Ŷ":"Y","Ÿ":"Y","Ẏ":"Y","Ỵ":"Y","Ỳ":"Y","Ƴ":"Y","Ỷ":"Y","Ỿ":"Y","Ȳ":"Y","Ɏ":"Y","Ỹ":"Y","Ź":"Z","Ž":"Z","Ẑ":"Z","Ⱬ":"Z","Ż":"Z","Ẓ":"Z","Ȥ":"Z","Ẕ":"Z","Ƶ":"Z","Ĳ":"IJ","Œ":"OE","ᴀ":"A","ᴁ":"AE","ʙ":"B","ᴃ":"B","ᴄ":"C","ᴅ":"D","ᴇ":"E","ꜰ":"F","ɢ":"G","ʛ":"G","ʜ":"H","ɪ":"I","ʁ":"R","ᴊ":"J","ᴋ":"K","ʟ":"L","ᴌ":"L","ᴍ":"M","ɴ":"N","ᴏ":"O","ɶ":"OE","ᴐ":"O","ᴕ":"OU","ᴘ":"P","ʀ":"R","ᴎ":"N","ᴙ":"R","ꜱ":"S","ᴛ":"T","ⱻ":"E","ᴚ":"R","ᴜ":"U","ᴠ":"V","ᴡ":"W","ʏ":"Y","ᴢ":"Z","á":"a","ă":"a","ắ":"a","ặ":"a","ằ":"a","ẳ":"a","ẵ":"a","ǎ":"a","â":"a","ấ":"a","ậ":"a","ầ":"a","ẩ":"a","ẫ":"a","ä":"a","ǟ":"a","ȧ":"a","ǡ":"a","ạ":"a","ȁ":"a","à":"a","ả":"a","ȃ":"a","ā":"a","ą":"a","ᶏ":"a","ẚ":"a","å":"a","ǻ":"a","ḁ":"a","ⱥ":"a","ã":"a","ꜳ":"aa","æ":"ae","ǽ":"ae","ǣ":"ae","ꜵ":"ao","ꜷ":"au","ꜹ":"av","ꜻ":"av","ꜽ":"ay","ḃ":"b","ḅ":"b","ɓ":"b","ḇ":"b","ᵬ":"b","ᶀ":"b","ƀ":"b","ƃ":"b","ɵ":"o","ć":"c","č":"c","ç":"c","ḉ":"c","ĉ":"c","ɕ":"c","ċ":"c","ƈ":"c","ȼ":"c","ď":"d","ḑ":"d","ḓ":"d","ȡ":"d","ḋ":"d","ḍ":"d","ɗ":"d","ᶑ":"d","ḏ":"d","ᵭ":"d","ᶁ":"d","đ":"d","ɖ":"d","ƌ":"d","ı":"i","ȷ":"j","ɟ":"j","ʄ":"j","ǳ":"dz","ǆ":"dz","é":"e","ĕ":"e","ě":"e","ȩ":"e","ḝ":"e","ê":"e","ế":"e","ệ":"e","ề":"e","ể":"e","ễ":"e","ḙ":"e","ë":"e","ė":"e","ẹ":"e","ȅ":"e","è":"e","ẻ":"e","ȇ":"e","ē":"e","ḗ":"e","ḕ":"e","ⱸ":"e","ę":"e","ᶒ":"e","ɇ":"e","ẽ":"e","ḛ":"e","ꝫ":"et","ḟ":"f","ƒ":"f","ᵮ":"f","ᶂ":"f","ǵ":"g","ğ":"g","ǧ":"g","ģ":"g","ĝ":"g","ġ":"g","ɠ":"g","ḡ":"g","ᶃ":"g","ǥ":"g","ḫ":"h","ȟ":"h","ḩ":"h","ĥ":"h","ⱨ":"h","ḧ":"h","ḣ":"h","ḥ":"h","ɦ":"h","ẖ":"h","ħ":"h","ƕ":"hv","í":"i","ĭ":"i","ǐ":"i","î":"i","ï":"i","ḯ":"i","ị":"i","ȉ":"i","ì":"i","ỉ":"i","ȋ":"i","ī":"i","į":"i","ᶖ":"i","ɨ":"i","ĩ":"i","ḭ":"i","ꝺ":"d","ꝼ":"f","ᵹ":"g","ꞃ":"r","ꞅ":"s","ꞇ":"t","ꝭ":"is","ǰ":"j","ĵ":"j","ʝ":"j","ɉ":"j","ḱ":"k","ǩ":"k","ķ":"k","ⱪ":"k","ꝃ":"k","ḳ":"k","ƙ":"k","ḵ":"k","ᶄ":"k","ꝁ":"k","ꝅ":"k","ĺ":"l","ƚ":"l","ɬ":"l","ľ":"l","ļ":"l","ḽ":"l","ȴ":"l","ḷ":"l","ḹ":"l","ⱡ":"l","ꝉ":"l","ḻ":"l","ŀ":"l","ɫ":"l","ᶅ":"l","ɭ":"l","ł":"l","ǉ":"lj","ſ":"s","ẜ":"s","ẛ":"s","ẝ":"s","ḿ":"m","ṁ":"m","ṃ":"m","ɱ":"m","ᵯ":"m","ᶆ":"m","ń":"n","ň":"n","ņ":"n","ṋ":"n","ȵ":"n","ṅ":"n","ṇ":"n","ǹ":"n","ɲ":"n","ṉ":"n","ƞ":"n","ᵰ":"n","ᶇ":"n","ɳ":"n","ñ":"n","ǌ":"nj","ó":"o","ŏ":"o","ǒ":"o","ô":"o","ố":"o","ộ":"o","ồ":"o","ổ":"o","ỗ":"o","ö":"o","ȫ":"o","ȯ":"o","ȱ":"o","ọ":"o","ő":"o","ȍ":"o","ò":"o","ỏ":"o","ơ":"o","ớ":"o","ợ":"o","ờ":"o","ở":"o","ỡ":"o","ȏ":"o","ꝋ":"o","ꝍ":"o","ⱺ":"o","ō":"o","ṓ":"o","ṑ":"o","ǫ":"o","ǭ":"o","ø":"o","ǿ":"o","õ":"o","ṍ":"o","ṏ":"o","ȭ":"o","ƣ":"oi","ꝏ":"oo","ɛ":"e","ᶓ":"e","ɔ":"o","ᶗ":"o","ȣ":"ou","ṕ":"p","ṗ":"p","ꝓ":"p","ƥ":"p","ᵱ":"p","ᶈ":"p","ꝕ":"p","ᵽ":"p","ꝑ":"p","ꝙ":"q","ʠ":"q","ɋ":"q","ꝗ":"q","ŕ":"r","ř":"r","ŗ":"r","ṙ":"r","ṛ":"r","ṝ":"r","ȑ":"r","ɾ":"r","ᵳ":"r","ȓ":"r","ṟ":"r","ɼ":"r","ᵲ":"r","ᶉ":"r","ɍ":"r","ɽ":"r","ↄ":"c","ꜿ":"c","ɘ":"e","ɿ":"r","ś":"s","ṥ":"s","š":"s","ṧ":"s","ş":"s","ŝ":"s","ș":"s","ṡ":"s","ṣ":"s","ṩ":"s","ʂ":"s","ᵴ":"s","ᶊ":"s","ȿ":"s","ɡ":"g","ß":"ss","ᴑ":"o","ᴓ":"o","ᴝ":"u","ť":"t","ţ":"t","ṱ":"t","ț":"t","ȶ":"t","ẗ":"t","ⱦ":"t","ṫ":"t","ṭ":"t","ƭ":"t","ṯ":"t","ᵵ":"t","ƫ":"t","ʈ":"t","ŧ":"t","ᵺ":"th","ɐ":"a","ᴂ":"ae","ǝ":"e","ᵷ":"g","ɥ":"h","ʮ":"h","ʯ":"h","ᴉ":"i","ʞ":"k","ꞁ":"l","ɯ":"m","ɰ":"m","ᴔ":"oe","ɹ":"r","ɻ":"r","ɺ":"r","ⱹ":"r","ʇ":"t","ʌ":"v","ʍ":"w","ʎ":"y","ꜩ":"tz","ú":"u","ŭ":"u","ǔ":"u","û":"u","ṷ":"u","ü":"u","ǘ":"u","ǚ":"u","ǜ":"u","ǖ":"u","ṳ":"u","ụ":"u","ű":"u","ȕ":"u","ù":"u","ủ":"u","ư":"u","ứ":"u","ự":"u","ừ":"u","ử":"u","ữ":"u","ȗ":"u","ū":"u","ṻ":"u","ų":"u","ᶙ":"u","ů":"u","ũ":"u","ṹ":"u","ṵ":"u","ᵫ":"ue","ꝸ":"um","ⱴ":"v","ꝟ":"v","ṿ":"v","ʋ":"v","ᶌ":"v","ⱱ":"v","ṽ":"v","ꝡ":"vy","ẃ":"w","ŵ":"w","ẅ":"w","ẇ":"w","ẉ":"w","ẁ":"w","ⱳ":"w","ẘ":"w","ẍ":"x","ẋ":"x","ᶍ":"x","ý":"y","ŷ":"y","ÿ":"y","ẏ":"y","ỵ":"y","ỳ":"y","ƴ":"y","ỷ":"y","ỿ":"y","ȳ":"y","ẙ":"y","ɏ":"y","ỹ":"y","ź":"z","ž":"z","ẑ":"z","ʑ":"z","ⱬ":"z","ż":"z","ẓ":"z","ȥ":"z","ẕ":"z","ᵶ":"z","ᶎ":"z","ʐ":"z","ƶ":"z","ɀ":"z","ﬀ":"ff","ﬃ":"ffi","ﬄ":"ffl","ﬁ":"fi","ﬂ":"fl","ĳ":"ij","œ":"oe","ﬆ":"st","ₐ":"a","ₑ":"e","ᵢ":"i","ⱼ":"j","ₒ":"o","ᵣ":"r","ᵤ":"u","ᵥ":"v","ₓ":"x"},m=String.prototype,v=i.prototype={between:function(t,e){var r=this.s,n=r.indexOf(t),i=r.indexOf(e,n+t.length);return new this.constructor(-1==i&&null!=e?"":-1==i&&null==e?r.substring(n+t.length):r.slice(n+t.length,i))},camelize:function(){var t=this.trim().s.replace(/(\-|_|\s)+(.)?/g,function(t,e,r){return r?r.toUpperCase():""});return new this.constructor(t)},capitalize:function(){return new this.constructor(this.s.substr(0,1).toUpperCase()+this.s.substring(1).toLowerCase())},charAt:function(t){return this.s.charAt(t)},chompLeft:function(t){var e=this.s;return 0===e.indexOf(t)?(e=e.slice(t.length),new this.constructor(e)):this},chompRight:function(t){if(this.endsWith(t)){var e=this.s;return e=e.slice(0,e.length-t.length),new this.constructor(e)}return this},collapseWhitespace:function(){var t=this.s.replace(/[\s\xa0]+/g," ").replace(/^\s+|\s+$/g,"");return new this.constructor(t)},contains:function(t){return this.s.indexOf(t)>=0},count:function(t){return e("./_count")(this.s,t)},dasherize:function(){var t=this.trim().s.replace(/[_\s]+/g,"-").replace(/([A-Z])/g,"-$1").replace(/-+/g,"-").toLowerCase();return new this.constructor(t)},latinise:function(){var t=this.replace(/[^A-Za-z0-9\[\] ]/g,function(t){return d[t]||t});return new this.constructor(t)},decodeHtmlEntities:function(){var t=this.s;return t=t.replace(/&#(\d+);?/g,function(t,e){return String.fromCharCode(e)}).replace(/&#[xX]([A-Fa-f0-9]+);?/g,function(t,e){return String.fromCharCode(parseInt(e,16))}).replace(/&([^;\W]+;?)/g,function(t,e){var r=e.replace(/;$/,""),n=g[e]||e.match(/;$/)&&g[r];return"number"==typeof n?String.fromCharCode(n):"string"==typeof n?n:t}),new this.constructor(t)},endsWith:function(){for(var t=Array.prototype.slice.call(arguments,0),e=0;e<t.length;++e){var r=this.s.length-t[e].length;if(r>=0&&this.s.indexOf(t[e],r)===r)return!0}return!1},escapeHTML:function(){return new this.constructor(this.s.replace(/[&<>"']/g,function(t){return"&"+E[t]+";"}))},ensureLeft:function(t){var e=this.s;return 0===e.indexOf(t)?this:new this.constructor(t+e)},ensureRight:function(t){var e=this.s;return this.endsWith(t)?this:new this.constructor(e+t)},humanize:function(){if(null===this.s||void 0===this.s)return new this.constructor("");var t=this.underscore().replace(/_id$/,"").replace(/_/g," ").trim().capitalize();return new this.constructor(t)},isAlpha:function(){return!/[^a-z\xDF-\xFF]|^$/.test(this.s.toLowerCase())},isAlphaNumeric:function(){return!/[^0-9a-z\xDF-\xFF]/.test(this.s.toLowerCase())},isEmpty:function(){return null===this.s||void 0===this.s?!0:/^[\s\xa0]*$/.test(this.s)},isLower:function(){return this.isAlpha()&&this.s.toLowerCase()===this.s},isNumeric:function(){return!/[^0-9]/.test(this.s)},isUpper:function(){return this.isAlpha()&&this.s.toUpperCase()===this.s},left:function(t){if(t>=0){var e=this.s.substr(0,t);return new this.constructor(e)}return this.right(-t)},lines:function(){return this.replaceAll("\r\n","\n").s.split("\n")},pad:function(t,e){if(null==e&&(e=" "),this.s.length>=t)return new this.constructor(this.s);t-=this.s.length;var r=Array(Math.ceil(t/2)+1).join(e),n=Array(Math.floor(t/2)+1).join(e);return new this.constructor(r+this.s+n)},padLeft:function(t,e){return null==e&&(e=" "),new this.constructor(this.s.length>=t?this.s:Array(t-this.s.length+1).join(e)+this.s)},padRight:function(t,e){return null==e&&(e=" "),new this.constructor(this.s.length>=t?this.s:this.s+Array(t-this.s.length+1).join(e))},parseCSV:function(t,e,r,n){t=t||",",r=r||"\\","undefined"==typeof e&&(e='"');var i=0,s=[],o=[],u=this.s.length,a=!1,c=!1,l=this,h=function(t){return l.s.charAt(t)};if("undefined"!=typeof n)var f=[];for(e||(a=!0);u>i;){var p=h(i);switch(p){case r:if(a&&(r!==e||h(i+1)===e)){i+=1,s.push(h(i));break}if(r!==e)break;case e:a=!a;break;case t:c&&(a=!1,c=!1),a&&e?s.push(p):(o.push(s.join("")),s.length=0);break;case n:c?(a=!1,c=!1,o.push(s.join("")),f.push(o),o=[],s.length=0):a?s.push(p):f&&(o.push(s.join("")),f.push(o),o=[],s.length=0);break;case" ":a&&s.push(p);break;default:a?s.push(p):p!==e&&(s.push(p),a=!0,c=!0)}i+=1}return o.push(s.join("")),f?(f.push(o),f):o},replaceAll:function(t,e){var r=this.s.split(t).join(e);return new this.constructor(r)},splitLeft:function(t,r,n){return e("./_splitLeft")(this.s,t,r,n)},splitRight:function(t,r,n){return e("./_splitRight")(this.s,t,r,n)},strip:function(){for(var t=this.s,e=0,r=arguments.length;r>e;e++)t=t.split(arguments[e]).join("");return new this.constructor(t)},stripLeft:function(t){var e,r,n=f(this.s);return void 0===t?r=/^\s+/g:(e=h(t),r=new RegExp("^["+e+"]+","g")),new this.constructor(n.replace(r,""))},stripRight:function(t){var e,r,n=f(this.s);return void 0===t?r=/\s+$/g:(e=h(t),r=new RegExp("["+e+"]+$","g")),new this.constructor(n.replace(r,""))},right:function(t){if(t>=0){var e=this.s.substr(this.s.length-t,t);return new this.constructor(e)}return this.left(-t)},setValue:function(t){return n(this,t),this},slugify:function(){var t=new i(new i(this.s).latinise().s.replace(/[^\w\s-]/g,"").toLowerCase()).dasherize().s;return"-"===t.charAt(0)&&(t=t.substr(1)),new this.constructor(t)},startsWith:function(){for(var t=Array.prototype.slice.call(arguments,0),e=0;e<t.length;++e)if(0===this.s.lastIndexOf(t[e],0))return!0;return!1},stripPunctuation:function(){return new this.constructor(this.s.replace(/[^\w\s]|_/g,"").replace(/\s+/g," "))},stripTags:function(){var t=this.s,e=arguments.length>0?arguments:[""];return l(e,function(e){t=t.replace(RegExp("</?"+e+"[^<>]*>","gi"),"")}),new this.constructor(t)},template:function(t,e,r){var n=this.s,e=e||c.TMPL_OPEN,r=r||c.TMPL_CLOSE,i=e.replace(/[-[\]()*\s]/g,"\\$&").replace(/\$/g,"\\$"),s=r.replace(/[-[\]()*\s]/g,"\\$&").replace(/\$/g,"\\$"),o=new RegExp(i+"(.+?)"+s,"g"),u=n.match(o)||[];return u.forEach(function(i){var s=i.substring(e.length,i.length-r.length).trim(),o="undefined"==typeof t[s]?"":t[s];n=n.replace(i,o)}),new this.constructor(n)},times:function(t){return new this.constructor(new Array(t+1).join(this.s))},titleCase:function(){var t=this.s;return t&&(t=t.replace(/(^[a-z]| [a-z]|-[a-z]|_[a-z])/g,function(t){return t.toUpperCase()})),new this.constructor(t)},toBoolean:function(){if("string"==typeof this.orig){var t=this.s.toLowerCase();return"true"===t||"yes"===t||"on"===t||"1"===t}return this.orig===!0||1===this.orig},toFloat:function(t){var e=parseFloat(this.s);return t?parseFloat(e.toFixed(t)):e},toInt:function(){return/^\s*-?0x/i.test(this.s)?parseInt(this.s,16):parseInt(this.s,10)},trim:function(){var t;return t="undefined"==typeof m.trim?this.s.replace(/(^\s*|\s*$)/g,""):this.s.trim(),new this.constructor(t)},trimLeft:function(){var t;return t=m.trimLeft?this.s.trimLeft():this.s.replace(/(^\s*)/g,""),new this.constructor(t)},trimRight:function(){var t;return t=m.trimRight?this.s.trimRight():this.s.replace(/\s+$/,""),new this.constructor(t)},truncate:function(t,e){var r=this.s;if(t=~~t,e=e||"...",r.length<=t)return new this.constructor(r);var n=function(t){return t.toUpperCase()!==t.toLowerCase()?"A":" "},s=r.slice(0,t+1).replace(/.(?=\W*\w*$)/g,n);return s=s.slice(s.length-2).match(/\w\w/)?s.replace(/\s*\S+$/,""):new i(s.slice(0,s.length-1)).trimRight().s,new i((s+e).length>r.length?r:r.slice(0,s.length)+e)},toCSV:function(){function t(t){return null!==t&&""!==t}var e=",",r='"',n="\\",s=!0,o=!1,u=[];if("object"==typeof arguments[0]?(e=arguments[0].delimiter||e,e=arguments[0].separator||e,r=arguments[0].qualifier||r,s=!!arguments[0].encloseNumbers,n=arguments[0].escape||n,o=!!arguments[0].keys):"string"==typeof arguments[0]&&(e=arguments[0]),"string"==typeof arguments[1]&&(r=arguments[1]),null===arguments[1]&&(r=null),this.orig instanceof Array)u=this.orig;else for(var a in this.orig)this.orig.hasOwnProperty(a)&&u.push(o?a:this.orig[a]);for(var c=n+r,l=[],h=0;h<u.length;++h){var f=t(r);if("number"==typeof u[h]&&(f&=s),f&&l.push(r),null!==u[h]&&void 0!==u[h]){var p=new i(u[h]).replaceAll(r,c).s;l.push(p)}else l.push("");f&&l.push(r),e&&l.push(e)}return l.length=l.length-1,new this.constructor(l.join(""))},toString:function(){return this.s},underscore:function(){var t=this.trim().s.replace(/([a-z\d])([A-Z]+)/g,"$1_$2").replace(/([A-Z\d]+)([A-Z][a-z])/g,"$1_$2").replace(/[-\s]+/g,"_").toLowerCase();return new this.constructor(t)},unescapeHTML:function(){return new this.constructor(this.s.replace(/\&([^;]+);/g,function(t,e){var r;return e in y?y[e]:(r=e.match(/^#x([\da-fA-F]+)$/))?String.fromCharCode(parseInt(r[1],16)):(r=e.match(/^#(\d+)$/))?String.fromCharCode(~~r[1]):t}))},valueOf:function(){return this.s.valueOf()},wrapHTML:function(t,e){var r=this.s,n=null==t?"span":t,i="",s="";if("object"==typeof e)for(var o in e)i+=" "+o+'="'+new this.constructor(e[o]).escapeHTML()+'"';return r=s.concat("<",n,i,">",this,"</",n,">"),new this.constructor(r)}},w=[],O=u();for(var A in O)!function(t){var e=m[t];"function"==typeof e&&(v[t]||(v[t]="string"===O[t]?function(){return new this.constructor(e.apply(this,arguments))}:e))}(A);v.repeat=v.times,v.include=v.contains,v.toInteger=v.toInt,v.toBool=v.toBoolean,v.decodeHTMLEntities=v.decodeHtmlEntities,v.constructor=i,c.extendPrototype=s,c.restorePrototype=o,c.VERSION=p,c.TMPL_OPEN="{{",c.TMPL_CLOSE="}}",c.ENTITIES=g,"undefined"!=typeof r&&"undefined"!=typeof r.exports?r.exports=c:"function"==typeof t&&t.amd?t([],function(){return c}):window.S=c;var y={lt:"<",gt:">",quot:'"',apos:"'",amp:"&"},E={};for(var L in y)E[y[L]]=L;g={amp:"&",gt:">",lt:"<",quot:'"',apos:"'",AElig:198,Aacute:193,Acirc:194,Agrave:192,Aring:197,Atilde:195,Auml:196,Ccedil:199,ETH:208,Eacute:201,Ecirc:202,Egrave:200,Euml:203,Iacute:205,Icirc:206,Igrave:204,Iuml:207,Ntilde:209,Oacute:211,Ocirc:212,Ograve:210,Oslash:216,Otilde:213,Ouml:214,THORN:222,Uacute:218,Ucirc:219,Ugrave:217,Uuml:220,Yacute:221,aacute:225,acirc:226,aelig:230,agrave:224,aring:229,atilde:227,auml:228,ccedil:231,eacute:233,ecirc:234,egrave:232,eth:240,euml:235,iacute:237,icirc:238,igrave:236,iuml:239,ntilde:241,oacute:243,ocirc:244,ograve:242,oslash:248,otilde:245,ouml:246,szlig:223,thorn:254,uacute:250,ucirc:251,ugrave:249,uuml:252,yacute:253,yuml:255,copy:169,reg:174,nbsp:160,iexcl:161,cent:162,pound:163,curren:164,yen:165,brvbar:166,sect:167,uml:168,ordf:170,laquo:171,not:172,shy:173,macr:175,deg:176,plusmn:177,sup1:185,sup2:178,sup3:179,acute:180,micro:181,para:182,middot:183,cedil:184,ordm:186,raquo:187,frac14:188,frac12:189,frac34:190,iquest:191,times:215,divide:247,"OElig;":338,"oelig;":339,"Scaron;":352,"scaron;":353,"Yuml;":376,"fnof;":402,"circ;":710,"tilde;":732,"Alpha;":913,"Beta;":914,"Gamma;":915,"Delta;":916,"Epsilon;":917,"Zeta;":918,"Eta;":919,"Theta;":920,"Iota;":921,"Kappa;":922,"Lambda;":923,"Mu;":924,"Nu;":925,"Xi;":926,"Omicron;":927,"Pi;":928,"Rho;":929,"Sigma;":931,"Tau;":932,"Upsilon;":933,"Phi;":934,"Chi;":935,"Psi;":936,"Omega;":937,"alpha;":945,"beta;":946,"gamma;":947,"delta;":948,"epsilon;":949,"zeta;":950,"eta;":951,"theta;":952,"iota;":953,"kappa;":954,"lambda;":955,"mu;":956,"nu;":957,"xi;":958,"omicron;":959,"pi;":960,"rho;":961,"sigmaf;":962,"sigma;":963,"tau;":964,"upsilon;":965,"phi;":966,"chi;":967,"psi;":968,"omega;":969,"thetasym;":977,"upsih;":978,"piv;":982,"ensp;":8194,"emsp;":8195,"thinsp;":8201,"zwnj;":8204,"zwj;":8205,"lrm;":8206,"rlm;":8207,"ndash;":8211,"mdash;":8212,"lsquo;":8216,"rsquo;":8217,"sbquo;":8218,"ldquo;":8220,"rdquo;":8221,"bdquo;":8222,"dagger;":8224,"Dagger;":8225,"bull;":8226,"hellip;":8230,"permil;":8240,"prime;":8242,"Prime;":8243,"lsaquo;":8249,"rsaquo;":8250,"oline;":8254,"frasl;":8260,"euro;":8364,"image;":8465,"weierp;":8472,"real;":8476,"trade;":8482,"alefsym;":8501,"larr;":8592,"uarr;":8593,"rarr;":8594,"darr;":8595,"harr;":8596,"crarr;":8629,"lArr;":8656,"uArr;":8657,"rArr;":8658,"dArr;":8659,"hArr;":8660,"forall;":8704,"part;":8706,"exist;":8707,"empty;":8709,"nabla;":8711,"isin;":8712,"notin;":8713,"ni;":8715,"prod;":8719,"sum;":8721,"minus;":8722,"lowast;":8727,"radic;":8730,"prop;":8733,"infin;":8734,"ang;":8736,"and;":8743,"or;":8744,"cap;":8745,"cup;":8746,"int;":8747,"there4;":8756,"sim;":8764,"cong;":8773,"asymp;":8776,"ne;":8800,"equiv;":8801,"le;":8804,"ge;":8805,"sub;":8834,"sup;":8835,"nsub;":8836,"sube;":8838,"supe;":8839,"oplus;":8853,"otimes;":8855,"perp;":8869,"sdot;":8901,"lceil;":8968,"rceil;":8969,"lfloor;":8970,"rfloor;":8971,"lang;":9001,"rang;":9002,"loz;":9674,"spades;":9824,"clubs;":9827,"hearts;":9829,"diams;":9830}}.call(this)},{"./_count":1,"./_splitLeft":2,"./_splitRight":3}]},{},[4])(4)});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



var TimelineChart = function () {
   function TimelineChart(element, data, opts) {
      _classCallCheck(this, TimelineChart);

      var self = this;
      d3.select(element).clear();
      d3.select(element).addClass('timeline-chart');

      var options = this.extendOptions(opts);

      var allElements = data.reduce(function (agg, e) {
         return agg.concat(e.data);
      }, []);

      var minDt = d3.min(allElements, this.getPointMinDt);
      var maxDt = d3.max(allElements, this.getPointMaxDt);

      var elementWidth = options.width || d3.select(element).node().getBoundingClientRect().width;
      var elementHeight = options.height || d3.select(element).node().getBoundingClientRect().height;

      var margin = {
         top: 0,
         right: 0,
         bottom: 20,
         left: 0
      };

      var width = elementWidth - margin.left - margin.right;
      var height = elementHeight - margin.top - margin.bottom;

      var groupWidth = 200;

      var x = d3.time.scale().domain([minDt, maxDt]).range([groupWidth, width]);

      var xAxis = d3.svg.axis().scale(x).orient('bottom').tickSize(-height);

      var zoom = d3.behavior.zoom().x(x).on('zoom', zoomed);

      var svg = d3.select(element).append('svg').attr('id', 'tlsvg').attr('width', width + margin.left + margin.right).attr('height', height + margin.top + margin.bottom).append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')').call(zoom);

      svg.append('defs').append('clipPath').attr('id', 'chart-content').append('rect').attr('x', groupWidth).attr('y', 0).attr('height', height).attr('width', width - groupWidth);

      svg.append('rect').attr('class', 'chart-bounds').attr('x', groupWidth).attr('y', 0).attr('height', height).attr('width', width - groupWidth);

      svg.append('g').attr('class', 'x axis').attr('transform', 'translate(0,' + height + ')').call(xAxis);
      var color = d3.scale.category20();
      var groupHeight = height / data.length;
      var groupSection = svg.selectAll('.group-section').data(data).enter().append('line').attr('class', 'group-section').attr('x1', 0).attr('x2', width).attr('y1', function (d, i) {
         return groupHeight * (i + 1);
      }).attr('y2', function (d, i) {
         return groupHeight * (i + 1);
      });

      var groupLabels = svg.selectAll('.group-label').data(data).enter().append('text').attr('class', 'group-label').attr('x', 0).attr('y', function (d, i) {
         return groupHeight * i + groupHeight / 2 + 5.5;
      }).attr('dx', '0.5em').text(function (d) {
         var dit = S(d.label);
         if(dit.contains(',')){
            return dit.s.split(',')[0]+", ....";
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
         if (d3.tip) {
            var tip = d3.tip().attr('class', 'd3-tip').html(options.tip);
            svg.select('.chart-bounds').call(tip);
            dots.on('mouseover', tip.show).on('mouseout', tip.hide);
            if (options.ttip) {
               var ttip = d3.tip().attr('class', 'd3-tip').html(options.ttip);
               groupLabels.call(ttip);
               groupLabels.on('mouseover', ttip.show).on('mouseout', ttip.hide);
            }
         } else {
            console.error('Please make sure you have d3.tip included as dependency (https://github.com/Caged/d3-tip)');
         }
      }

      $(window).resize(function () {
         var elementWidth = options.width || d3.select(element).node().getBoundingClientRect().width;
         var elementHeight = options.height || d3.select(element).node().getBoundingClientRect().height;
         var width = elementWidth - margin.left - margin.right;
         var height = elementHeight - margin.top - margin.bottom;
         var groupHeight = height / data.length;
         var tlsvg = d3.select('#tlsvg');
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
         if (self.onVizChangeFn && d3.event) {
            self.onVizChangeFn.call(self, {
               scale: d3.event.scale,
               translate: d3.event.translate,
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

   _createClass(TimelineChart, [{
      key: 'extendOptions',
      value: function extendOptions(ext) {
         if (!ext) {
            ext = {};
         }
         var defaultOptions = {
            tip: undefined,
            textTruncateThreshold: 30
         };
         Object.keys(ext).map(function (k) {
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

TimelineChart.TYPE = {
   POINT: Symbol(),
   INTERVAL: Symbol()
};

