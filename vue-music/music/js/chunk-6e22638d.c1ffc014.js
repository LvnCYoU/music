(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-6e22638d"],{"2bb7":function(t,s,i){},"8bda":function(t,s,i){"use strict";i.r(s),i("d3b7");var a=i("5530"),n=i("2f62"),e={props:{songLists:{type:Array,required:!0}},data:function(){return{list:[],loading:!0,error:!1,max:0}},computed:Object(a.a)(Object(a.a)({},Object(n.e)(["audio","playStatus","playing","songId","isLoading"])),Object(n.c)(["getSongId","getCurrentSong","getPlayStatus"])),watch:{songLists:function(t){this.list.length=0,0==t.length?this.error=!0:this.error=!1}},components:{Load:function(){return i.e("chunk-292912b5").then(i.bind(null,"4d8e"))}},mounted:function(){this.init()},methods:Object(a.a)(Object(a.a)({},Object(n.b)(["currentSong","songsList"])),{},{init:function(){var t=this;this.playStatus&&this.getPlayStatus(!1),this.$nextTick((function(){t.loading=!1}))},handleNum:function(t){return++t<10?"0"+t:t},showPlayer:function(t,s,i){var a=this.utils.storeId(this.list),n={id:t,alid:s,index:i};this.getSongId(t),this.currentSong(n),this.songsList(a),this.playStatus?this.audio.pause():this.playing&&this.audio.play(),this.getPlayStatus(!this.playStatus)},loadSong:function(t){this.list=t}})},l=(i("9bc4"),i("2877")),r=Object(l.a)(e,(function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"song-list",attrs:{data:t.list,"element-loading-text":"拼命加载中","element-loading-background":"#fff"}},[i("div",{staticClass:"song-box"},[t._m(0),t._l(t.list,(function(s,a){return i("div",{key:s.id+a,ref:"list",refInFor:!0,class:t.songId==s.id&&t.playStatus?"item is-active":"item",on:{click:function(i){return t.showPlayer(s.id,s.al.id,a)}}},[i("div",{staticClass:"index"},[i("span",{staticClass:"num"},[t._v(t._s(t.handleNum(a)))]),i("i",{ref:"icon",refInFor:!0,staticClass:"iconfont icon-bofang"}),t._m(1,!0)]),i("div",{staticClass:"name"},[i("div",{staticClass:"cover"},[s.al?i("el-image",{attrs:{src:s.al.picUrl,fit:"fill"}}):t._e()],1),i("div",{staticClass:"song-name ellipsis"},[t._v(" "+t._s(s.name)+" ")])]),i("div",{staticClass:"artist"},[i("div",{staticClass:"wrapper ellipsis"},[i("span",[t._v(t._s(t.utils.getSinger(s.ar)))])])]),i("div",{staticClass:"album"},[i("div",{staticClass:"wrapper ellipsis"},[s.al?i("span",[t._v(t._s(s.al.name))]):t._e()])]),i("div",{staticClass:"duration"},[i("div",{staticClass:"wrapper"},[i("span",[t._v(t._s(t.utils.formatTime(s.dt)))])])])])}))],2),i("div",{directives:[{name:"show",rawName:"v-show",value:!t.error,expression:"!error"}],staticClass:"load-more"},[i("load",{attrs:{list:t.songLists,num:10},on:{load:function(s){t.list=s}}})],1),i("div",{directives:[{name:"show",rawName:"v-show",value:t.error,expression:"error"}],staticClass:"error"},[i("span",[t._v("暂时没有播放数据噢~")])])])}),[function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"title"},[s("div",{staticClass:"index"},[this._v("序号")]),s("div",{staticClass:"name"},[this._v("歌曲")]),s("div",{staticClass:"artist"},[this._v("歌手")]),s("div",{staticClass:"album"},[this._v("专辑")]),s("div",{staticClass:"duration"},[this._v("时长")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"play-animation"},[s("span"),s("span"),s("span"),s("span"),s("span")])}],!1,null,"82bdbe36",null);s.default=r.exports},"9bc4":function(t,s,i){"use strict";var a=i("2bb7");i.n(a).a}}]);