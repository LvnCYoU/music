(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-5816db97","chunk-43b1613c"],{"0a3d":function(t,e,n){},1168:function(t,e,n){"use strict";var r=n("42c4");n.n(r).a},"16f6":function(t,e,n){"use strict";var r=n("a9c1");n.n(r).a},"1cf8":function(t,e,n){"use strict";var r=n("5279");n.n(r).a},"1da1":function(t,e,n){"use strict";function r(t,e,n,r,i,a,o){try{var s=t[a](o),c=s.value}catch(t){return void n(t)}s.done?e(c):Promise.resolve(c).then(r,i)}function i(t){return function(){var e=this,n=arguments;return new Promise((function(i,a){var o=t.apply(e,n);function s(t){r(o,i,a,s,c,"next",t)}function c(t){r(o,i,a,s,c,"throw",t)}s(void 0)}))}}n.d(e,"a",(function(){return i})),n("d3b7")},"42c4":function(t,e,n){},4719:function(t,e,n){"use strict";var r=n("0a3d");n.n(r).a},5279:function(t,e,n){},"96cf":function(t,e,n){var r=function(t){"use strict";var e=Object.prototype,n=e.hasOwnProperty,r="function"==typeof Symbol?Symbol:{},i=r.iterator||"@@iterator",a=r.asyncIterator||"@@asyncIterator",o=r.toStringTag||"@@toStringTag";function s(t,e,n){return Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{s({},"")}catch(t){s=function(t,e,n){return t[e]=n}}function c(t,e,n,r){var i=e&&e.prototype instanceof f?e:f,a=Object.create(i.prototype),o=new L(r||[]);return a._invoke=function(t,e,n){var r="suspendedStart";return function(i,a){if("executing"===r)throw new Error("Generator is already running");if("completed"===r){if("throw"===i)throw a;return{value:void 0,done:!0}}for(n.method=i,n.arg=a;;){var o=n.delegate;if(o){var s=b(o,n);if(s){if(s===l)continue;return s}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if("suspendedStart"===r)throw r="completed",n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r="executing";var c=u(t,e,n);if("normal"===c.type){if(r=n.done?"completed":"suspendedYield",c.arg===l)continue;return{value:c.arg,done:n.done}}"throw"===c.type&&(r="completed",n.method="throw",n.arg=c.arg)}}}(t,n,o),a}function u(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(t){return{type:"throw",arg:t}}}t.wrap=c;var l={};function f(){}function h(){}function d(){}var p={};p[i]=function(){return this};var v=Object.getPrototypeOf,g=v&&v(v(S([])));g&&g!==e&&n.call(g,i)&&(p=g);var m=d.prototype=f.prototype=Object.create(p);function y(t){["next","throw","return"].forEach((function(e){s(t,e,(function(t){return this._invoke(e,t)}))}))}function w(t,e){var r;this._invoke=function(i,a){function o(){return new e((function(r,o){!function r(i,a,o,s){var c=u(t[i],t,a);if("throw"!==c.type){var l=c.arg,f=l.value;return f&&"object"==typeof f&&n.call(f,"__await")?e.resolve(f.__await).then((function(t){r("next",t,o,s)}),(function(t){r("throw",t,o,s)})):e.resolve(f).then((function(t){l.value=t,o(l)}),(function(t){return r("throw",t,o,s)}))}s(c.arg)}(i,a,r,o)}))}return r=r?r.then(o,o):o()}}function b(t,e){var n=t.iterator[e.method];if(void 0===n){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=void 0,b(t,e),"throw"===e.method))return l;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return l}var r=u(n,t.iterator,e.arg);if("throw"===r.type)return e.method="throw",e.arg=r.arg,e.delegate=null,l;var i=r.arg;return i?i.done?(e[t.resultName]=i.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,l):i:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,l)}function x(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function _(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function L(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(x,this),this.reset(!0)}function S(t){if(t){var e=t[i];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var r=-1,a=function e(){for(;++r<t.length;)if(n.call(t,r))return e.value=t[r],e.done=!1,e;return e.value=void 0,e.done=!0,e};return a.next=a}}return{next:C}}function C(){return{value:void 0,done:!0}}return h.prototype=m.constructor=d,d.constructor=h,h.displayName=s(d,o,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===h||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,d):(t.__proto__=d,s(t,o,"GeneratorFunction")),t.prototype=Object.create(m),t},t.awrap=function(t){return{__await:t}},y(w.prototype),w.prototype[a]=function(){return this},t.AsyncIterator=w,t.async=function(e,n,r,i,a){void 0===a&&(a=Promise);var o=new w(c(e,n,r,i),a);return t.isGeneratorFunction(n)?o:o.next().then((function(t){return t.done?t.value:o.next()}))},y(m),s(m,o,"Generator"),m[i]=function(){return this},m.toString=function(){return"[object Generator]"},t.keys=function(t){var e=[];for(var n in t)e.push(n);return e.reverse(),function n(){for(;e.length;){var r=e.pop();if(r in t)return n.value=r,n.done=!1,n}return n.done=!0,n}},t.values=S,L.prototype={constructor:L,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(_),!t)for(var e in this)"t"===e.charAt(0)&&n.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function r(n,r){return o.type="throw",o.arg=t,e.next=n,r&&(e.method="next",e.arg=void 0),!!r}for(var i=this.tryEntries.length-1;i>=0;--i){var a=this.tryEntries[i],o=a.completion;if("root"===a.tryLoc)return r("end");if(a.tryLoc<=this.prev){var s=n.call(a,"catchLoc"),c=n.call(a,"finallyLoc");if(s&&c){if(this.prev<a.catchLoc)return r(a.catchLoc,!0);if(this.prev<a.finallyLoc)return r(a.finallyLoc)}else if(s){if(this.prev<a.catchLoc)return r(a.catchLoc,!0)}else{if(!c)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return r(a.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var i=this.tryEntries[r];if(i.tryLoc<=this.prev&&n.call(i,"finallyLoc")&&this.prev<i.finallyLoc){var a=i;break}}a&&("break"===t||"continue"===t)&&a.tryLoc<=e&&e<=a.finallyLoc&&(a=null);var o=a?a.completion:{};return o.type=t,o.arg=e,a?(this.method="next",this.next=a.finallyLoc,l):this.complete(o)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),l},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),_(n),l}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var r=n.completion;if("throw"===r.type){var i=r.arg;_(n)}return i}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,n){return this.delegate={iterator:S(t),resultName:e,nextLoc:n},"next"===this.method&&(this.arg=void 0),l}},t}(t.exports);try{regeneratorRuntime=r}catch(t){Function("r","regeneratorRuntime = r")(r)}},a411:function(t,e,n){"use strict";n.r(e),n("96cf");var r=n("1da1"),i={data:function(){return{banners:[]}},mounted:function(){this.init()},methods:{init:function(){this.getBanner()},getBanner:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$api.Banner().then((function(e){t.banners=e.data.banners})).catch((function(){}));case 2:case"end":return e.stop()}}),e)})))()}}},a=(n("16f6"),n("2877")),o=Object(a.a)(i,(function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"banner"},[e("el-carousel",{attrs:{trigger:"click",height:"240px",type:"card",interval:4e3}},this._l(this.banners,(function(t,n){return e("el-carousel-item",{key:n},[e("div",{staticClass:"image-box"},[e("img",{attrs:{src:t.imageUrl}})])])})),1)],1)}),[],!1,null,null,null).exports,s={data:function(){return{playlist:[]}},components:{SongList:n("e63d").default},mounted:function(){this.getPersonalized(24)},methods:{getPersonalized:function(t){var e=this;return Object(r.a)(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,e.$api.Personalized(t).then((function(t){e.playlist=t.data.result}));case 2:case"end":return n.stop()}}),n)})))()}}},c=(n("1168"),Object(a.a)(s,(function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"recommend-playlist"},[e("h2",{staticClass:"title"},[this._v("推荐歌单")]),e("song-list",{attrs:{songLists:this.playlist}})],1)}),[],!1,null,"4b411acc",null).exports),u=n("5530"),l=n("2f62"),f={data:function(){return{List:[],singerList:[]}},computed:Object(u.a)(Object(u.a)({},Object(l.c)(["getSongId","getCurrentSong","getPlayStatus"])),Object(l.e)(["songList","songId","audio","playStatus"])),mounted:function(){this.init()},methods:Object(u.a)(Object(u.a)({},Object(l.b)(["currentSong","songsList"])),{},{init:function(){this.getPersonalizedNewSong(),this.playStatus&&this.getPlayStatus(!1)},getPersonalizedNewSong:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$api.PersonalizedNewSong().then((function(e){t.List=e.data.result}));case 2:case"end":return e.stop()}}),e)})))()},playSong:function(t,e,n){if(t==this.songId){var r=this.audio;return this.getPlayStatus(r.paused),void(r.paused?r.play():r.pause())}this.getSongId(t);var i=this.utils.storeId(this.List),a={id:t,alid:e,index:n};this.songsList(i),this.currentSong(a)}})},h=(n("4719"),{components:{Banners:o,RecommendList:c,RecommendSong:Object(a.a)(f,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"recommend-song"},[n("h2",{staticClass:"title"},[t._v("推荐新歌")]),n("div",{staticClass:"list"},t._l(t.List,(function(e,r){return n("div",{key:e.id,ref:"play_list",refInFor:!0,staticClass:"item"},[n("div",{staticClass:"wrapper",on:{click:function(n){return t.playSong(e.id,e.song.album.id,r)}}},[n("div",{staticClass:"index"},[n("div",{class:e.id==t.songId&&t.playStatus?"is-active":""},[n("span",[t._v(t._s(r+1))]),n("i",{directives:[{name:"show",rawName:"v-show",value:e.id!=t.songId||!t.playStatus,expression:"item.id != songId || !playStatus"}],staticClass:"el-icon-video-play"}),n("i",{directives:[{name:"show",rawName:"v-show",value:t.playStatus&&e.id==t.songId,expression:"playStatus && item.id == songId"}],staticClass:"el-icon-video-pause"}),t._m(0,!0)])]),n("div",{staticClass:"album"},[n("el-image",{attrs:{src:e.picUrl,fit:"cover"}})],1),n("div",{staticClass:"info"},[n("div",{staticClass:"artist"},[n("p",{directives:[{name:"show",rawName:"v-show",value:e.song.album.company,expression:"item.song.album.company"}],staticClass:"singer-company"},[t._v(t._s(e.song.album.company))]),n("p",{staticClass:"singer"},[t._v(" "+t._s(t.utils.getSinger(e.song))+" ")])])]),n("div",{staticClass:"song-name"},[t._v(" 《"+t._s(e.song.name)+"》 ")]),n("div",{staticClass:"duration"},[t._v(" "+t._s(t.utils.formatTime(e.song.duration))+" ")])])])})),0)])}),[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"play-animation"},[e("span"),e("span"),e("span"),e("span"),e("span")])}],!1,null,"9008b456",null).exports}}),d=Object(a.a)(h,(function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"home"}},[e("div",{staticClass:"container"},[e("Banners"),e("RecommendList"),e("RecommendSong")],1)])}),[],!1,null,null,null);e.default=d.exports},a9c1:function(t,e,n){},e63d:function(t,e,n){"use strict";n.r(e);var r={props:{songLists:{type:Array,required:!0},limit:{type:String,required:!1}},data:function(){return{loading:!0,len:1}},methods:{load:function(){this.len>=this.songLists.length/2?this.loading=!1:this.len++}}},i=(n("1cf8"),n("2877")),a=Object(i.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"},{name:"show",rawName:"v-show",value:t.songLists,expression:"songLists"}],class:"playlist "+t.limit,attrs:{data:t.songLists,"element-loading-background":"#fff","element-loading-text":"拼命加载中"}},t._l(t.songLists,(function(e){return n("div",{key:e.name+e.id,staticClass:"item"},[n("div",{staticClass:"wrapper"},[n("router-link",{attrs:{tag:"a",to:{name:"songsheet-detail",query:{id:e.id}}}},[n("div",{staticClass:"cover"},[n("div",{staticClass:"img"},[n("el-image",{attrs:{src:e.coverImgUrl||e.picUrl,fit:"cover",lazy:""},on:{load:t.load}})],1),n("div",{key:e.trackCount,staticClass:"count"},[n("i",{staticClass:"el-icon-service"}),n("span",[t._v(t._s(t.utils.SimplifyPlayCount(e.playCount)))])])])])],1),n("div",{staticClass:"info"},[n("h2",[t._v(t._s(e.name))])])])})),0)}),[],!1,null,"4c1ab340",null);e.default=a.exports}}]);