<template>
  <div class="song-sheet">
    <div class="container">
      <div class="filter shadow">
        <div class="classify flex-center" @click="showClassify">
          <span>全部</span>
          <i class="iconfont icon-right-arrow"></i>
        </div>
        <div class="hot-tag flex-center">
          <span>热门标签:</span>
          <ul class="flex-center">
            <li 
            v-for=" (item,index) in hotTag" 
            :key="index"
            @click="classify"
            >
              {{ item }}
            </li>
          </ul> 
        </div>
        <div class="type flex-center">
          <div class="list is-active">热门</div>
          <div class="list">最新</div>
        </div>
      </div>
      <div class="list">
        <div class="item" v-for="(item,index) in songSheet" :key=item.id>
          <div class="wrapper">
            <router-link tag="a" :to="{name:'playlist-detail',query:{id:item.id}}">
              <div class="cover">
                <div class="img" :key="index">
                  <el-image :src="item.coverImgUrl" fit="cover" lazy></el-image>
                </div>
                <div class="count" :key="item.trackCount">
                  <i class="el-icon-service"></i>
                  <span>{{ utils.SimplifyPlayCount(item.playCount) }}</span>
                </div>
              </div>
            </router-link>
          </div>
          <div class="info">
            <h2>{{ item.name }}</h2>
          </div>
        </div>
      </div>
      <div class="page-btn">
        
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
      hotTag: [],
      songSheet: [],
    }
  },
  computed:{

  },
  mounted(){
    this.$nextTick( () => {
      this.init();
    }) 

  },
  methods: {

    // 初始化
    async init(){
      let _this = this;
      await this.$api.axios.all([
        this.$api.PlaylistCatlist(),
        this.$api.PlaylistHot(),
        this.$api.TopPlaylist(1),
      ])
        .then( this.$api.axios.spread( 
          function(
            resCatlist,
            resHot,
            resTopPlaylist,
          ){
            let hot = new Array;
            hot = resHot.data.tags
            hot.forEach( list => {
              _this.hotTag.push(list.name);
            })
            _this.songSheet = resTopPlaylist.data.playlists
            console.log(resCatlist,resHot,resTopPlaylist)
          }) 
      )
    },

    classify(){

    },

    showClassify(){

    }
  }
}
</script>

<style lang="scss" scoped>
  .song-sheet{
    margin-top: 30px;
    .filter{
      display: flex;
      margin-bottom: 20px;
      padding-right: 20px;
      height: 40px;
      align-items: center;
      justify-content: space-between;
      border-radius: 5px;
      box-shadow: 5px 0 40px -30px inset;
      .classify{
        margin-right: 15px;
        padding: 0 5px 0 15px;
        width: auto;
        height: 100%;
        background: #fa2800;
        border-radius: 5px 0 5px 5px;
        color: #fff;
        font-size: 14px;
        cursor: pointer;
        i{
          transform: translateY(1px);
          margin-left: 10px;
          font-size: 18px;
          color: #fff;
          transition: transform 1s ease;
        }
      }

      .hot-tag{
        flex: 1;
        justify-content: left;
        font-size: 14px;
        span{
          margin-left: 30px;
          margin-right: 15px;
        }
        ul{
          li{
            margin: 0 5px;
            padding-right: 10px;
            cursor: pointer;
            &:hover{
              color: #888;
            }
          }
        }
      }

      .type{
        .list{
          display: flex;
          margin-left: 20px;
          padding: 5px 10px;
          font-size: 12px;
          border-radius: 3px;
          background: #c6dcf4;
          color: #161e27;
          transition: all .4s;
          cursor: pointer;
          &.is-active{
            background: #fa2800;
            color: #fff;
          }
        }
      }
    }
    .list{
      display: flex;
      flex-wrap: wrap;
      margin: 0 -15px;
    }
  }
</style>
<style lang="scss" src="./item.scss"></style>