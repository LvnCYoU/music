(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-62bd7edf"],{"0800":function(t,e,a){"use strict";var n=a("ae1d");a.n(n).a},2134:function(t,e,a){"use strict";var n={data:function(){return{body:document.body,document:document.documentElement,loadStatus:!0}},mounted:function(){this.init()},destroyed:function(){window.onscroll=null},methods:{init:function(){this.scroll()},scroll:function(){var t=this;window.onscroll=function(){(t.document.scrollTop||t.body.scrollTop)+(t.document.clientHeight||t.body.clientHeight)>=(t.document.scrollHeight||t.body.scrollHeight)?(t.$refs.loadMoreSinger.classList.add("scroll-bottom"),t.load()):t.$refs.loadMoreSinger.classList.remove("scroll-bottom")}},load:function(){var t=this;this.loadStatus&&(this.loadStatus=!1,this.$emit("scroll-data",!1)),setTimeout((function(){t.loadStatus=!0}),1500)}}},s=(a("5ed1"),a("2877")),o=Object(s.a)(n,(function(){var t=this.$createElement,e=this._self._c||t;return e("div",{ref:"loadMoreSinger",staticClass:"load-more-singer",on:{click:this.load}},[e("span",[this._v("加载更多")]),e("i",{staticClass:"iconfont icon-xiala"})])}),[],!1,null,"e2ec6b6e",null);e.a=o.exports},"5ed1":function(t,e,a){"use strict";var n=a("f06f");a.n(n).a},"99b0":function(t,e,a){"use strict";a.r(e),a("d81d"),a("b0c0"),a("96cf");var n=a("1da1"),s=a("5530"),o=a("2f62"),r=a("2134"),i=a("1d25"),c={data:function(){return{loading:!0,loadStatus:!0,mv:[],area:[{name:"全部",type:""},{name:"内地",type:"内地"},{name:"港台",type:"港台"},{name:"欧美",type:"欧美"},{name:"日本",type:"日本"},{name:"韩国",type:"韩国"}],type:[{name:"全部",type:""},{name:"官方版",type:"官方版"},{name:"原生",type:"原生"},{name:"现场版",type:"现场版"},{name:"网易出品",type:"网易出品"}],order:[{name:"上升最快",type:""},{name:"最新",type:"最新"},{name:"最热",type:"最热"}],params:{area:"",type:"",order:"",limit:16,offset:0}}},components:{pushLoad:r.a,Mv:i.a},mounted:function(){this.init()},methods:Object(s.a)(Object(s.a)({},Object(o.b)(["mvInit"])),{},{init:function(){this.$store.state.mv.offset&&(this.params=this.$store.state.mv,this.params.offset=0),this.getMv(this.params)},getMv:function(t){var e=this;return Object(n.a)(regeneratorRuntime.mark((function a(){return regeneratorRuntime.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return e.mvInit(t),a.next=3,e.$api.MvAll(t).then((function(t){t.data.data.map((function(t){var a={artistName:t.artistName,name:t.name,count:t.playCount,duration:t.duration,cover:t.cover};e.mv.push(a)}))}));case 3:e.mv.length>10&&(e.loading=!1);case 4:case"end":return a.stop()}}),a)})))()},chooseType:function(t,e){var a=this;({area:function(){return a.params.area=e},order:function(){return a.params.order=e},type:function(){return a.params.type=e}})["".concat(t)].call(this),this.mv.length=0,this.loading=!0,this.params.offset=0,this.mvInit(this.params),this.getMv(this.params)},load:function(){var t=this;this.loadStatus&&setTimeout((function(){t.params.offset+=t.params.limit,t.getMv(t.params)}),1500),this.loadStatus=!0}})},l=(a("0800"),a("2877")),u=Object(l.a)(c,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"mv"}},[a("div",{staticClass:"container"},[a("div",{staticClass:"filter"},[a("ul",{staticClass:"tag-area"},t._l(t.area,(function(e){return a("li",{key:e.type,ref:"area",refInFor:!0,class:e.type==t.params.area?"is-active":"",on:{click:function(a){return t.chooseType("area",e.type)}}},[t._v(" "+t._s(e.name)+" ")])})),0),a("ul",{staticClass:"tag-type"},t._l(t.type,(function(e){return a("li",{key:e.type+e.name,ref:"sex",refInFor:!0,class:e.type==t.params.type?"is-active":"",on:{click:function(a){return t.chooseType("type",e.type)}}},[t._v(" "+t._s(e.name)+" ")])})),0),a("ul",{staticClass:"tag-order"},t._l(t.order,(function(e){return a("li",{key:e.type+e.name,ref:"lang",refInFor:!0,class:t.params.order==e.type?"is-active":"",on:{click:function(a){return t.chooseType("order",e.type)}}},[t._v(" "+t._s(e.name)+" ")])})),0)]),a("mv",{attrs:{list:t.mv}}),a("push-load",{directives:[{name:"show",rawName:"v-show",value:t.loadStatus,expression:"loadStatus"}],on:{"scroll-data":t.load}})],1)])}),[],!1,null,"1a12583e",null);e.default=u.exports},ae1d:function(t,e,a){},f06f:function(t,e,a){}}]);