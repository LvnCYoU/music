(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-01fd6954"],{"1da1":function(t,e,n){"use strict";function i(t,e,n,i,o,r,a){try{var s=t[r](a),c=s.value}catch(t){return void n(t)}s.done?e(c):Promise.resolve(c).then(i,o)}function o(t){return function(){var e=this,n=arguments;return new Promise((function(o,r){var a=t.apply(e,n);function s(t){i(a,o,r,s,c,"next",t)}function c(t){i(a,o,r,s,c,"throw",t)}s(void 0)}))}}n.d(e,"a",(function(){return o})),n("d3b7")},"630d":function(t,e,n){"use strict";var i=n("f596");n.n(i).a},"91de":function(t,e,n){"use strict";n.r(e),n("c975"),n("d81d"),n("a434"),n("b0c0"),n("4ec9"),n("d3b7"),n("3ca3"),n("ddb0"),n("96cf");var i=n("1da1"),o=n("5530"),r=n("2f62"),a={data:function(){return{audio:{},songInfo:{},time:0,status:!0,flag:!1,lineNo:0,propLine:null,C_pos:6,offset:-34,volume:{ve:50,old:0},lyric:[],showLyric:!1,showPlayList:!1}},components:{Scroll:function(){return Promise.resolve().then(n.bind(null,"c5dc"))}},computed:Object(o.a)(Object(o.a)({},Object(r.c)(["getCurrentSong","getSongId","getPlayerMode","getPlayStatus"])),Object(r.e)(["songId","songList","playMode","playStatus"])),watch:{songId:function(t,e){var n=this;t&&t!==e&&this.$nextTick((function(){n.getPlayStatus(!1),n.currentSongInfo(t,n.getCurrentSong.alid)}))}},mounted:function(){this.init()},methods:Object(o.a)(Object(o.a)(Object(o.a)({},Object(r.d)(["SHOW_PLAYER"])),Object(r.b)(["currentSong","songsList","audioInit"])),{},{init:function(){this.audio=this.$refs.playingBox,this.audioInit(this.audio),this.progressBtn()},currentSongInfo:function(t,e){var n=this;return Object(i.a)(regeneratorRuntime.mark((function i(){var o;return regeneratorRuntime.wrap((function(i){for(;;)switch(i.prev=i.next){case 0:return o=n,i.next=3,n.$api.axios.all([n.$api.SongUrl(t),n.$api.SongDetail(t),n.$api.Album(e),n.$api.Lyric(t)]).then(n.$api.axios.spread((function(t,e,n,i){var r={durationTime:o.utils.formatTime(e.data.songs[0].dt),dt:e.data.songs[0].dt,img:n.data.album.picUrl,song:n.data.album.name,singer:n.data.album.artist.name,lyric:o.utils.Lyric(i.data.lrc.lyric),songUrl:t.data.data[0].url};if(!r.lyric.length){var a=[];a.lyric="暂无歌词，敬请见谅",r.lyric.push(a)}o.currentSong(r)})));case 3:n.getCurrentSong.singer&&(n.audio.src=n.getCurrentSong.songUrl,n.SHOW_PLAYER(),n.playing());case 4:case"end":return i.stop()}}),i)})))()},propSong:function(){if(0!=this.songList.length){var t=this.getCurrentSong.index;0==t?t=this.songList.length-1:t-=1,this.changeSong(t),this.goback(),this.playPause()}},nextSong:function(){if(0!=this.songList.length){var t=this.getCurrentSong.index;t==this.songList.length-1?t=0:t+=1,this.changeSong(t),this.goback(),this.playPause()}},playing:function(){var t=this;this.playStatus?this.audio.pause():this.audio.play().catch((function(){t.getPlayStatus(!1),t.playPause(),t.getPlayStatus(!0)})),this.getPlayStatus(!this.audio.paused)},songEnd:function(){var t=this,e=this.getCurrentSong.index;new Map([["loop",function(){t.songList[e+1]?e+=1:e=0}],["once",function(){t.playPause()}],["random",function(){var n=t.songList.length-1,i=~~(Math.random()*(n-1));i==e?t.songEnd():e=i}]]).get(this.playMode).call(this),this.changeSong(e),this.goback(),this.playPause()},changeSong:function(t){this.getCurrentSong.index==t?this.playing():(this.currentSong(this.songList[t]),this.songList.length&&this.getSongId(this.songList[t].id))},changeVolumn:function(){var t=this.volume.ve/100;this.volume.ve?(this.volume.old=t,this.volume.ve=this.audio.volume=0):(this.audio.volume=this.volume.old,this.volume.ve=100*this.volume.old)},getCurrentTime:function(){if(!this.flag){var t=this.getCurrentSong.lyric.length;this.time=1e3*this.audio.currentTime,this.lineNo!=t&&1!=this.getCurrentSong.lyric.length&&this.getCurrentSong.lyric.length&&parseFloat(this.getCurrentSong.lyric[this.lineNo].time)<=this.time&&(this.lineHigh(),this.propLine=this.lineNo,this.lineNo++)}},changeCurrentTime:function(){var t=this,e=0;this.audio.currentTime=this.time/1e3,this.getCurrentSong.lyric.map((function(n){n.time<=t.time&&(e=n.index)})),this.lineNo=e,this.lineHigh()},adjustVolumn:function(){var t=this.volume.ve/100;this.volume.old=this.audio.volume=t},changeMode:function(){var t=this;new Map([["loop",function(){t.getPlayerMode("once")}],["once",function(){t.getPlayerMode("random")}],["random",function(){t.getPlayerMode("loop")}]]).get(this.playMode).call(this)},showList:function(t){var e=this;t.target.className.indexOf("icon-gedan")>1&&(this.showLyric&&(this.showLyric=!1),this.showPlayList=!this.showPlayList),t.target.className.indexOf("icon-gecitiaozheng")>1&&(this.showPlayList&&(this.showPlayList=!1),this.showLyric=!this.showLyric),this.$nextTick((function(){e.$refs.lyricList.refresh(),e.$refs.songList.refresh()}))},lineHigh:function(){if(1!=this.getCurrentSong.lyric.length){var t=this.$refs.lyricWrap;this.lineNo>this.C_pos?t.style.transform="translateY("+(this.lineNo-this.C_pos)*this.offset+"px)":this.lineNo<this.C_pos&&(t.style.transform="translateY(0)")}},goback:function(){this.$refs.lyricWrap.style.transform="translateY(0)",this.lineNo=0},playPause:function(){var t=this;null!==this.audio&&(this.playStatus||0==this.songList.length?(this.audio.currentTime=0,this.audio.pause(),this.getPlayStatus(!1)):(this.audio.currentTime=0,this.audio.play().catch((function(){var e=t.getCurrentSong;t.currentSongInfo(e.id,e.alid)}))))},del:function(t){var e=this.songList;e.splice(t,1),this.songsList(e)},delList:function(){this.songsList([])},progressBtn:function(){var t=this;document.querySelector(".el-slider__button").addEventListener("mousedown",(function(){t.flag=!0})),window.addEventListener("mouseup",(function(){t.flag&&(t.flag=!1)}))}})},s=(n("630d"),n("2877")),c=Object(s.a)(a,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("transition",{attrs:{name:"el-fade-in"}},[n("div",{ref:"playerBox",staticClass:"player-box"},[n("audio",{ref:"playingBox",attrs:{preload:"auto",src:t.getCurrentSong.songUrl},on:{timeupdate:t.getCurrentTime,ended:t.songEnd}}),n("div",{staticClass:"song-image"},[n("img",{attrs:{src:t.getCurrentSong.img}})]),n("div",{staticClass:"info"},[n("h2",[t._v(t._s(t.getCurrentSong.song))]),n("p",[t._v(t._s(t.getCurrentSong.singer))])]),n("div",{staticClass:"player-btn"},[n("i",{staticClass:"iconfont icon-shangyishou",attrs:{title:"上一首"},on:{click:t.propSong}}),n("i",{class:t.playStatus?"iconfont icon-zanting":"iconfont icon-bofang",attrs:{title:t.playStatus?"暂停":"播放"},on:{click:t.playing}}),n("i",{staticClass:"iconfont icon-xiayishou",attrs:{title:"下一首"},on:{click:t.nextSong}})]),n("div",{staticClass:"progress-box"},[n("p",{staticClass:"current-time"},[t._v(t._s(t.utils.formatTime(t.time)))]),n("div",{staticClass:"progress"},[n("el-slider",{attrs:{max:t.getCurrentSong.dt,"show-tooltip":!1},on:{change:t.changeCurrentTime},model:{value:t.time,callback:function(e){t.time=e},expression:"time"}})],1),n("p",{staticClass:"duration"},[t._v(t._s(t.getCurrentSong.durationTime))])]),n("div",{staticClass:"volume-box"},[n("i",{class:0==t.volume.ve?"iconfont icon-jingyin":"iconfont icon-laba",attrs:{title:0==t.volume.ve?"静音":"音量"},on:{click:t.changeVolumn}}),n("div",{staticClass:"progress"},[n("el-slider",{attrs:{max:100},on:{change:t.adjustVolumn},model:{value:t.volume.ve,callback:function(e){t.$set(t.volume,"ve",e)},expression:"volume.ve"}})],1)]),n("div",{staticClass:"tool-box"},[n("i",{class:"loop"==t.playMode?"iconfont icon-xunhuanbofang":"once"==t.playMode?"iconfont icon-danquxunhuan":"iconfont icon-suijibofang",attrs:{title:"loop"==t.playMode?"循环播放":"once"==t.playMode?"单曲循环":"随机播放"},on:{click:t.changeMode}}),n("i",{staticClass:"iconfont icon-gecitiaozheng",attrs:{title:"歌词"},on:{click:t.showList}}),n("i",{staticClass:"iconfont icon-gedan",attrs:{title:"播放列表"},on:{click:t.showList}})]),n("transition",{attrs:{name:"fade",mode:"out-in"}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.showLyric,expression:"showLyric"}],staticClass:"lyric-box shadow",on:{wheel:function(t){t.stopPropagation(),t.preventDefault()}}},[n("scroll",{ref:"lyricList",staticClass:"lyric",attrs:{data:t.getCurrentSong.lyric}},[n("div",{ref:"lyricWrap",staticClass:"wrapper",staticStyle:{}},t._l(t.getCurrentSong.lyric,(function(e,i){return n("p",{key:i,ref:"line",refInFor:!0,class:t.lineNo-1==i?"is-linehigh":""},[t._v(" "+t._s(e.lyric)+" ")])})),0)])],1)]),n("transition",{attrs:{name:"fade",mode:"out-in"}},[n("div",{directives:[{name:"show",rawName:"v-show",value:t.showPlayList,expression:"showPlayList"}],staticClass:"songlist-box shadow",on:{wheel:function(t){t.stopPropagation(),t.preventDefault()}}},[n("div",{staticClass:"title"},[n("h2",[t._v("播放列表")]),n("i",{staticClass:"iconfont icon-lajitong",attrs:{title:"清空"},on:{click:t.delList}})]),n("scroll",{ref:"songList",staticClass:"list",attrs:{data:t.songList}},[n("div",{staticClass:"wrapper-box"},t._l(t.songList,(function(e,i){return n("div",{key:i,class:e.id==t.songId&&t.playStatus?"wrapper is-active":"wrapper",on:{click:function(e){return t.changeSong(i)}}},[n("div",{staticClass:"index"},[n("p",[t._v(t._s(i+1))]),n("i",{directives:[{name:"show",rawName:"v-show",value:e.id!=t.songId||!t.playStatus,expression:"item.id != songId || !playStatus"}],staticClass:"iconfont icon-bofang"}),n("i",{directives:[{name:"show",rawName:"v-show",value:t.playStatus&&e.id==t.songId,expression:"playStatus && item.id == songId"}],staticClass:"iconfont icon-zanting"}),n("div",{staticClass:"play-animation"},[n("span"),n("span"),n("span"),n("span"),n("span")])]),n("div",{staticClass:"song-name"},[n("p",[t._v(t._s(e.song))])]),n("div",{staticClass:"singer"},[n("p",[t._v(t._s(e.singer))])]),n("div",{staticClass:"del",on:{click:function(e){return e.stopPropagation(),t.del(i)}}},[n("i",{staticClass:"iconfont icon-error"})])])})),0)])],1)])],1)])}),[],!1,null,null,null);e.default=c.exports},"96cf":function(t,e,n){var i=function(t){"use strict";var e=Object.prototype,n=e.hasOwnProperty,i="function"==typeof Symbol?Symbol:{},o=i.iterator||"@@iterator",r=i.asyncIterator||"@@asyncIterator",a=i.toStringTag||"@@toStringTag";function s(t,e,n){return Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{s({},"")}catch(t){s=function(t,e,n){return t[e]=n}}function c(t,e,n,i){var o=e&&e.prototype instanceof h?e:h,r=Object.create(o.prototype),a=new b(i||[]);return r._invoke=function(t,e,n){var i="suspendedStart";return function(o,r){if("executing"===i)throw new Error("Generator is already running");if("completed"===i){if("throw"===o)throw r;return{value:void 0,done:!0}}for(n.method=o,n.arg=r;;){var a=n.delegate;if(a){var s=x(a,n);if(s){if(s===u)continue;return s}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if("suspendedStart"===i)throw i="completed",n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);i="executing";var c=l(t,e,n);if("normal"===c.type){if(i=n.done?"completed":"suspendedYield",c.arg===u)continue;return{value:c.arg,done:n.done}}"throw"===c.type&&(i="completed",n.method="throw",n.arg=c.arg)}}}(t,n,a),r}function l(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(t){return{type:"throw",arg:t}}}t.wrap=c;var u={};function h(){}function f(){}function g(){}var d={};d[o]=function(){return this};var p=Object.getPrototypeOf,v=p&&p(p(C([])));v&&v!==e&&n.call(v,o)&&(d=v);var y=g.prototype=h.prototype=Object.create(d);function m(t){["next","throw","return"].forEach((function(e){s(t,e,(function(t){return this._invoke(e,t)}))}))}function w(t,e){var i;this._invoke=function(o,r){function a(){return new e((function(i,a){!function i(o,r,a,s){var c=l(t[o],t,r);if("throw"!==c.type){var u=c.arg,h=u.value;return h&&"object"==typeof h&&n.call(h,"__await")?e.resolve(h.__await).then((function(t){i("next",t,a,s)}),(function(t){i("throw",t,a,s)})):e.resolve(h).then((function(t){u.value=t,a(u)}),(function(t){return i("throw",t,a,s)}))}s(c.arg)}(o,r,i,a)}))}return i=i?i.then(a,a):a()}}function x(t,e){var n=t.iterator[e.method];if(void 0===n){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=void 0,x(t,e),"throw"===e.method))return u;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return u}var i=l(n,t.iterator,e.arg);if("throw"===i.type)return e.method="throw",e.arg=i.arg,e.delegate=null,u;var o=i.arg;return o?o.done?(e[t.resultName]=o.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,u):o:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,u)}function L(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function S(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function b(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(L,this),this.reset(!0)}function C(t){if(t){var e=t[o];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var i=-1,r=function e(){for(;++i<t.length;)if(n.call(t,i))return e.value=t[i],e.done=!1,e;return e.value=void 0,e.done=!0,e};return r.next=r}}return{next:_}}function _(){return{value:void 0,done:!0}}return f.prototype=y.constructor=g,g.constructor=f,f.displayName=s(g,a,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===f||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,g):(t.__proto__=g,s(t,a,"GeneratorFunction")),t.prototype=Object.create(y),t},t.awrap=function(t){return{__await:t}},m(w.prototype),w.prototype[r]=function(){return this},t.AsyncIterator=w,t.async=function(e,n,i,o,r){void 0===r&&(r=Promise);var a=new w(c(e,n,i,o),r);return t.isGeneratorFunction(n)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},m(y),s(y,a,"Generator"),y[o]=function(){return this},y.toString=function(){return"[object Generator]"},t.keys=function(t){var e=[];for(var n in t)e.push(n);return e.reverse(),function n(){for(;e.length;){var i=e.pop();if(i in t)return n.value=i,n.done=!1,n}return n.done=!0,n}},t.values=C,b.prototype={constructor:b,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(S),!t)for(var e in this)"t"===e.charAt(0)&&n.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function i(n,i){return a.type="throw",a.arg=t,e.next=n,i&&(e.method="next",e.arg=void 0),!!i}for(var o=this.tryEntries.length-1;o>=0;--o){var r=this.tryEntries[o],a=r.completion;if("root"===r.tryLoc)return i("end");if(r.tryLoc<=this.prev){var s=n.call(r,"catchLoc"),c=n.call(r,"finallyLoc");if(s&&c){if(this.prev<r.catchLoc)return i(r.catchLoc,!0);if(this.prev<r.finallyLoc)return i(r.finallyLoc)}else if(s){if(this.prev<r.catchLoc)return i(r.catchLoc,!0)}else{if(!c)throw new Error("try statement without catch or finally");if(this.prev<r.finallyLoc)return i(r.finallyLoc)}}}},abrupt:function(t,e){for(var i=this.tryEntries.length-1;i>=0;--i){var o=this.tryEntries[i];if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var r=o;break}}r&&("break"===t||"continue"===t)&&r.tryLoc<=e&&e<=r.finallyLoc&&(r=null);var a=r?r.completion:{};return a.type=t,a.arg=e,r?(this.method="next",this.next=r.finallyLoc,u):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),u},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),S(n),u}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var i=n.completion;if("throw"===i.type){var o=i.arg;S(n)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,n){return this.delegate={iterator:C(t),resultName:e,nextLoc:n},"next"===this.method&&(this.arg=void 0),u}},t}(t.exports);try{regeneratorRuntime=i}catch(t){Function("r","regeneratorRuntime = r")(i)}},a434:function(t,e,n){"use strict";var i=n("23e7"),o=n("23cb"),r=n("a691"),a=n("50c4"),s=n("7b0b"),c=n("65f0"),l=n("8418"),u=n("1dde"),h=n("ae40"),f=u("splice"),g=h("splice",{ACCESSORS:!0,0:0,1:2}),d=Math.max,p=Math.min;i({target:"Array",proto:!0,forced:!f||!g},{splice:function(t,e){var n,i,u,h,f,g,v=s(this),y=a(v.length),m=o(t,y),w=arguments.length;if(0===w?n=i=0:1===w?(n=0,i=y-m):(n=w-2,i=p(d(r(e),0),y-m)),y+n-i>9007199254740991)throw TypeError("Maximum allowed length exceeded");for(u=c(v,i),h=0;h<i;h++)(f=m+h)in v&&l(u,h,v[f]);if(u.length=i,n<i){for(h=m;h<y-i;h++)g=h+n,(f=h+i)in v?v[g]=v[f]:delete v[g];for(h=y;h>y-i+n;h--)delete v[h-1]}else if(n>i)for(h=y-i;h>m;h--)g=h+n-1,(f=h+i-1)in v?v[g]=v[f]:delete v[g];for(h=0;h<n;h++)v[h+m]=arguments[h+2];return v.length=y-i+n,u}})},c975:function(t,e,n){"use strict";var i=n("23e7"),o=n("4d64").indexOf,r=n("a640"),a=n("ae40"),s=[].indexOf,c=!!s&&1/[1].indexOf(1,-0)<0,l=r("indexOf"),u=a("indexOf",{ACCESSORS:!0,1:0});i({target:"Array",proto:!0,forced:c||!l||!u},{indexOf:function(t){return c?s.apply(this,arguments)||0:o(this,t,arguments.length>1?arguments[1]:void 0)}})},f596:function(t,e,n){}}]);