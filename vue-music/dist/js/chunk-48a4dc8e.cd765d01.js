(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-48a4dc8e"],{"0a3d":function(t,e,n){},"0bb2":function(t,e,n){"use strict";n.r(e);var s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"home"}},[n("div",{staticClass:"container"},[n("Banners"),n("RecommendList"),n("RecommendSong")],1)])},a=[],i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"banner"},[n("el-carousel",{attrs:{trigger:"click",height:"240px",type:"card",interval:4e3}},t._l(t.banners,(function(t,e){return n("el-carousel-item",{key:e},[n("div",{staticClass:"image-box"},[n("img",{attrs:{src:t.imageUrl}})])])})),1)],1)},r=[],o=(n("96cf"),n("1da1")),c={data:function(){return{banners:[]}},mounted:function(){this.init()},methods:{init:function(){this.getBanner()},getBanner:function(){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$api.Banner().then((function(e){t.banners=e.data.banners})).catch((function(){}));case 2:case"end":return e.stop()}}),e)})))()}}},u=c,l=(n("16f6"),n("2877")),d=Object(l["a"])(u,i,r,!1,null,null,null),m=d.exports,p=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"recommend-playlist"},[n("h2",{staticClass:"title"},[t._v("推荐歌单")]),n("song-list",{attrs:{songLists:t.playlist}})],1)},g=[],v=n("29e5"),f={data:function(){return{playlist:[]}},components:{SongList:v["a"]},mounted:function(){this.getPersonalized(24)},methods:{getPersonalized:function(t){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,e.$api.Personalized(t).then((function(t){e.playlist=t.data.result}));case 2:case"end":return n.stop()}}),n)})))()}}},h=f,b=(n("8801"),Object(l["a"])(h,p,g,!1,null,"59376ece",null)),w=b.exports,y=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"recommend-song"},[n("h2",{staticClass:"title"},[t._v("推荐新歌")]),n("div",{staticClass:"list"},t._l(t.List,(function(e,s){return n("div",{key:e.id,ref:"play_list",refInFor:!0,staticClass:"item"},[n("div",{staticClass:"wrapper",on:{click:function(n){return t.playSong(e.id,e.song.album.id,s)}}},[n("div",{staticClass:"index"},[n("div",{class:e.id==t.songId&&t.playStatus?"is-active":""},[n("span",[t._v(t._s(s+1))]),n("i",{directives:[{name:"show",rawName:"v-show",value:e.id!=t.songId||!t.playStatus,expression:"item.id != songId || !playStatus"}],staticClass:"el-icon-video-play"}),n("i",{directives:[{name:"show",rawName:"v-show",value:t.playStatus&&e.id==t.songId,expression:"playStatus && item.id == songId"}],staticClass:"el-icon-video-pause"}),t._m(0,!0)])]),n("div",{staticClass:"album"},[n("el-image",{attrs:{src:e.picUrl,fit:"cover"}})],1),n("div",{staticClass:"info"},[n("div",{staticClass:"artist"},[n("p",{directives:[{name:"show",rawName:"v-show",value:e.song.album.company,expression:"item.song.album.company"}],staticClass:"singer-company"},[t._v(t._s(e.song.album.company))]),n("p",{staticClass:"singer"},[t._v(" "+t._s(t.utils.getSinger(e.song))+" ")])])]),n("div",{staticClass:"song-name"},[t._v(" 《"+t._s(e.song.name)+"》 ")]),n("div",{staticClass:"duration"},[t._v(" "+t._s(t.utils.formatTime(e.song.duration))+" ")])])])})),0)])},_=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"play-animation"},[n("span"),n("span"),n("span"),n("span"),n("span")])}],S=n("5530"),C=n("2f62"),x={data:function(){return{List:[],singerList:[]}},computed:Object(S["a"])(Object(S["a"])({},Object(C["c"])(["getSongId","getCurrentSong","getPlayStatus"])),Object(C["e"])(["songList","songId","audio","playStatus"])),mounted:function(){this.init()},methods:Object(S["a"])(Object(S["a"])({},Object(C["b"])(["currentSong","songsList"])),{},{init:function(){this.getPersonalizedNewSong(),this.playStatus&&this.getPlayStatus(!1)},getPersonalizedNewSong:function(){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$api.PersonalizedNewSong().then((function(e){t.List=e.data.result}));case 2:case"end":return e.stop()}}),e)})))()},playSong:function(t,e,n){if(t==this.songId){var s=this.audio;return this.getPlayStatus(s.paused),void(s.paused?s.play():s.pause())}this.getSongId(t);var a=this.utils.storeId(this.List),i={id:t,alid:e,index:n};this.songsList(a),this.currentSong(i)}})},j=x,O=(n("4719"),Object(l["a"])(j,y,_,!1,null,"9008b456",null)),L=O.exports,I={components:{Banners:m,RecommendList:w,RecommendSong:L}},k=I,R=Object(l["a"])(k,s,a,!1,null,null,null);e["default"]=R.exports},"16f6":function(t,e,n){"use strict";var s=n("a9c1"),a=n.n(s);a.a},"2bb2":function(t,e,n){},4719:function(t,e,n){"use strict";var s=n("0a3d"),a=n.n(s);a.a},8801:function(t,e,n){"use strict";var s=n("2bb2"),a=n.n(s);a.a},a9c1:function(t,e,n){}}]);
//# sourceMappingURL=chunk-48a4dc8e.cd765d01.js.map