<template>
  <div class="song-sheet">
    <div class="container">
      <div class="filter">
        <div class="classify" @click.stop="show = !show">
          <span>{{ params.cat }}</span>
          <i 
            class="iconfont icon-right-arrow" 
            :style="show ? 'transform: translateY(1px) rotate(90deg)' :
            'transform: translateY(1px) rotate(0deg)'">
          </i>
        </div>
        <div class="hot-tag">
          <span>热门标签:</span> 
          <ul>
            <li 
            v-for=" item in hotTag" 
            :key="item"
            :class="params.cat == item ? 'is-active' : ''"
            @click="classify"
            >
              {{ item }}
            </li>
          </ul> 
        </div>
        <div class="type">
          <div 
            :class="params.order == 'hot' ? 'list is-active' : 'list'" 
            @click="order"
          >
            热门
          </div>
          <div 
            :class="params.order != 'hot' ? 'list is-active' : 'list'" 
            @click="order"
          >
            最新
          </div>
        </div>
        <el-collapse-transition>
          <div class="classify-box" v-show="show" @wheel.stop.prevent>
              <div class="wrapper" ref="wrapper" @wheel.stop>
                <div class="classify-type" v-for="item in classifyTag" :key="item.type">
                  <h2>
                    <i :class="'iconfont ' + item.class"></i>
                    {{ item.type }}
                  </h2>
                  <ul>
                    <li 
                    v-for="list in item.sub" 
                    :key="list"
                    :class="params.cat == list ? 'is-active' : ''"
                    @click="classify($event)">{{ list }}</li>
                  </ul>
                </div>
              </div>
          </div>
        </el-collapse-transition>
      </div>
      <song-list :songLists="songSheet"/>
      <error v-if="error" />
      <div class="page-btn" v-show="songSheet.length">
        <el-pagination
        background
        layout="prev, pager, next,total"
        :page-size="params.limit"
        :current-page="$store.state.songSheet.offset / params.limit"
        :total="total"
        @size-change="sizeChange"
        @current-change="currentChange">
        </el-pagination>
      </div>

    </div>
  </div>
</template>
<script>
import {mapActions} from 'vuex';
import SongList from 'components/common/songsheet'
import Error from 'components/common/error'
export default {
  data(){
    return {
      hotTag: [],
      songSheet: [],
      classifyTag: [],
      show: false,
      total: 0,
      error: false,
      class: {
        0: 'icon-icon',
        1: 'icon-fengge',
        2: 'icon-changjing',
        3: 'icon-qinggan',
        4: 'icon-zhuti',
      },
      params: {
        limit: 40,
        offset: 0,
        cat: '全部',
        order: 'hot',
      },

    }
  },
  components: {
    SongList,
    Error,
  },
  mounted(){
    this.$nextTick( () => {
      this.init();
    }) 

  },
  methods: {
    ...mapActions(['songSheetInit']),

    // 初始化
    async init(){
      let _this = this;
      if(this.$store.state.songSheet.limit){
        this.params = this.$store.state.songSheet;
      }
      await this.$api.axios.all([
        this.$api.PlaylistCatlist(),
        this.$api.PlaylistHot(),
      ])
        .then( this.$api.axios.spread( 
          function(
            resCatlist,
            resHot,
          ){
            let hot,
                sub,
                classify = new Array,
                index = 0;
            let categories = resCatlist.data.categories
            sub = resCatlist.data.sub;
            hot = resHot.data.tags;
            for(let key in categories){
              let obj = {
                type: categories[key],
                category: key,
                sub: [],
                class: _this.class[index],
              }
              classify.push(obj);
              index++;
            }
            sub.map( list => {
              classify.map( item => {
                if(item.category == list.category){
                  item.sub.push(list.name)
                }
              })
            })
            hot.forEach( list => {
              _this.hotTag.push(list.name);
            })
            _this.hotTag.unshift('全部')
            _this.classifyTag = classify;
          }) 
      )
      this.getSongSheet(this.params);
    },

    // 获取歌单
    async getSongSheet(params){
      await this.$api.TopPlaylist(params)
        .then( res => {
          this.songSheet = res.data.playlists
          this.total = res.data.total;

        })
      this.songSheetInit(params)
      this.$nextTick( () => {
        this.songSheet.length == 0 ? this.error = true : this.error = false;
      })
    },

    // 获取所选分类歌单
    classify(e){
      let str = e.target.innerHTML.trim()
      this.params.offset = 0;
      if(this.utils.BtnOnce(str,this.params.cat)){
        this.params.cat = str;
        this.songSheetInit(this.params);
        this.getSongSheet(this.params);
        this.show = false;
      }
    },
    
    // 当前页变化
    currentChange(val){
      this.params.offset = val * this.params.limit;
      this.getSongSheet(this.params)
    },

    // 页数内条数变化触发
    sizeChange(val){
      this.params.limit = val;
      this.getSongSheet(this.params)
    },

    // 最新/热门
    order(e){
      if(e.target.className.indexOf('is-active') > 0){
        return;
      }else{
        this.params.order == 'hot' ? this.params.order = 'new' : this.params.order = 'hot';
        this.getSongSheet(this.params);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .song-sheet{
    margin-top: 30px;
    .filter{
      @include flex;
      @include shadow;
      margin-bottom: 20px;
      padding-right: 20px;
      height: 40px;
      justify-content: space-between;
      border-radius: 5px;
      user-select: none;
      .classify{
        @include flex;
        margin-right: 15px;
        padding: 0 5px 0 15px;
        height: 100%;
        background: $mainColor;
        border-radius: 5px 0 5px 5px;
        color: #fff;
        cursor: pointer;
        i{
          transform: translateY(1px);
          margin-left: 10px;
          font-size: 18px;
          color: #fff;
          transition: transform .5s ease;
        }
      }

      .hot-tag{
        @include flex;
        flex: 1;
        justify-content: left;
        span{
          margin-left: 30px;
          margin-right: 15px;
        }
        ul{
          @include flex;
          li{
            margin: 0 5px;
            padding-right: 10px;
            cursor: pointer;
            &:hover{
              color: #888;
            }
            &.is-active{
              color: $mainColor;
            }
          }
        }
        
      }

      .type{
        @include flex;
        box-sizing: border-box;
        .list{
          margin-left: 30px;
          padding: 5px 10px;
          font-size: 12px;
          border-radius: 3px;
          background: #fff;
          color: #161e27;
          transition: all .4s;
          cursor: pointer;
          box-sizing: border-box;
          &:hover{
            color: #888;
          }
          &.is-active{
            background: $mainColor;
            color: #fff;
          }
        }
      }

      .classify-box{
        @include shadow;
        position: absolute;
        top: 50px;
        padding: 15px 10px 0 16px;
        width: 720px;
        height: 400px;
        color: #000;
        background: #fff;
        overflow: hidden;
        z-index: 100;
        .wrapper{
          width: calc(100% + 30px);
          height: 100%;
          overflow-y: scroll;
          transition-duration: 600ms;
        }
        .classify-type{
          margin-bottom: 20px;
          h2{
            font-size: 15px;
            margin-bottom: 15px;
            color: #161e27;
            i{
              margin-top: -1px;
              margin-right: 5px;
              width: 16px;
              font-size: 18px;
            }
          }
          ul{
            display: flex;
            flex-wrap: wrap;
            li{
              padding: 8px 18px;
              margin: 0 10px 10px 0;
              cursor: pointer;
              font-size: 12px;
              color: #161e27;
              background: #f7f7f7;
              border-radius: 16px;
              transition: all .4s;

              &:hover,&.is-active{
                background: $mainColor;
                color: #fff;
              }
            }
          }

        }
      }
    }
    .list{
      display: flex;
      flex-wrap: wrap;
      margin: 0 -15px;
    }
    .page-btn{
      text-align: center;
    }
  }
</style>
