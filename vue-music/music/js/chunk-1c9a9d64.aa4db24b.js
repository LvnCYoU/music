(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-1c9a9d64"],{"17ca":function(t,e,r){},"766d":function(t,e,r){"use strict";r.r(e),r("d81d"),r("b0c0"),r("4ec9"),r("d3b7"),r("ac1f"),r("3ca3"),r("841c"),r("ddb0");var a=r("2909"),n=(r("96cf"),r("1da1")),s={data:function(){return{search:""}},methods:{recommendSearch:function(t,e){var r=this;return Object(n.a)(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,r.$api.SearchSuggest(t).then((function(t){var n=[],s=t.data.result,i=new Map([["songs",function(){return 1}],["albums",function(){return 10}],["artists",function(){return 100}],["playlists",function(){return 1e3}],["default",function(){return 1}]]);s.order.map((function(t){s[t].map((function(e){e.type=i.get(t).call(r)||i.get("default").call(r)})),n.push.apply(n,Object(a.a)(s[t]))})),e(n)})).catch((function(){}));case 2:case"end":return n.stop()}}),n)})))()},goSearch:function(t){if(this.search){var e,r=t.name||this.search;t.name?(e=t.type,this.$router.push({name:"search",query:{keywords:r,type:e}})):this.$router.push({name:"search",query:{keywords:r,type:1}}),this.search=""}}}},i=(r("8963"),r("2877")),o=Object(i.a)(s,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"input"},[r("el-autocomplete",{attrs:{placeholder:"请输入内容","trigger-on-focus":!1,"fetch-suggestions":t.recommendSearch,"select-when-unmatched":!0},on:{select:t.goSearch},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.item;return[r("div",{staticClass:"item",attrs:{title:a.name}},[r("span",{staticClass:"name"},[t._v(t._s(a.name))])])]}}]),model:{value:t.search,callback:function(e){t.search=e},expression:"search"}},[r("i",{staticClass:"el-input__icon el-icon-search",attrs:{slot:"prefix"},slot:"prefix"})])],1)}),[],!1,null,"e64e00b8",null);e.default=o.exports},8963:function(t,e,r){"use strict";var a=r("d0eb");r.n(a).a},"916e":function(t,e,r){"use strict";r.r(e),r("d81d"),r("45fc"),r("ac1f"),r("1276"),r("96cf");var a=r("1da1"),n=r("5530"),s=r("2f62"),i={data:function(){return{url:"",search:"",id:""}},components:{SearchInput:r("766d").default},computed:{status:{get:function(){return this.$store.state.status},set:function(){}}},mounted:function(){this.init()},methods:Object(n.a)(Object(n.a)({},Object(s.d)(["CHANGE_STATUS"])),{},{init:function(){this.Cookie()},Logout:function(){var t=this;return Object(a.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$api.Logout().then((function(){t.CHANGE_STATUS(!1),"/home"!==t.$route.path&&t.$router.push({path:"/home"})}));case 2:case"end":return e.stop()}}),e)})))()},Status:function(t){var e=this;return Object(a.a)(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(r.t0=t,!r.t0){r.next=4;break}return r.next=4,e.$api.LoginStatus().then((function(t){var r=t.data.profile;e.url=r.avatarUrl,e.id=r.userId})).catch((function(){}));case 4:e.CHANGE_STATUS(t);case 5:case"end":return r.stop()}}),r)})))()},Cookie:function(){var t=this;document.cookie.split(";").map((function(e){e.split("=").some((function(e){if(" __remember_me"==e)return t.Status(!0),!0;t.Status(!1)}))}))}})},o=(r("da07"),r("2877")),c=Object(o.a)(i,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("el-header",[r("div",{staticClass:"header"},[r("div",{staticClass:"container"},[r("div",{staticClass:"left"},[r("router-link",{staticClass:"logo",attrs:{tag:"li",to:"/home"}},[r("img",{attrs:{src:"assets/img/logo_black.png",alt:""}})])],1),r("ul",{staticClass:"main"},[r("router-link",{attrs:{to:"/home",tag:"a"}},[t._v("发现音乐")]),r("router-link",{attrs:{to:"/rank",tag:"a"}},[t._v("排行榜")]),r("router-link",{attrs:{to:"/songsheet",tag:"a"}},[t._v("歌单")]),r("router-link",{attrs:{to:"/singer",tag:"a"}},[t._v("歌手")]),r("router-link",{attrs:{to:"/video",tag:"a"}},[t._v("视频")]),r("router-link",{attrs:{to:"/mv",tag:"a"}},[t._v("MV")])],1),r("el-row",{staticClass:"right"},[r("div",{staticClass:"search"},[r("search-input")],1),r("div",{staticClass:"signin"},[r("div",{staticClass:"wrapper"},[r("router-link",{directives:[{name:"show",rawName:"v-show",value:!t.status,expression:"!status"}],attrs:{tag:"a",to:"/signin"}},[t._v("未登录")]),r("el-dropdown",{directives:[{name:"show",rawName:"v-show",value:t.status,expression:"status"}],attrs:{size:"small"}},[r("router-link",{attrs:{to:{name:"user",query:{id:t.id}}}},[r("img",{staticClass:"user-img",attrs:{src:t.url}})]),r("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[r("el-dropdown-item",{attrs:{icon:"el-icon-user"}},[r("router-link",{attrs:{tag:"a",to:{name:"user",query:{id:t.id}}}},[t._v("个人中心")])],1),r("el-dropdown-item",{attrs:{icon:"el-icon-medal"}},[t._v("个人等级")]),r("el-dropdown-item",{attrs:{icon:"el-icon-setting"}},[t._v("设置")]),r("el-dropdown-item",{attrs:{icon:"el-icon-switch-button"},nativeOn:{click:function(e){return t.Logout(e)}}},[t._v("退出登录")])],1)],1)],1)])])],1)])])}),[],!1,null,"db842d1c",null);e.default=c.exports},d0eb:function(t,e,r){},da07:function(t,e,r){"use strict";var a=r("17ca");r.n(a).a}}]);