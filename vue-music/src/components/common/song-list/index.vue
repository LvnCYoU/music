<template>
  <div class="song-list" 
    v-loading="loading"
    :data="list"
    element-loading-text="拼命加载中"
    element-loading-background="#fff"
  >
    <div class="song-box">
      <div class="title">
        <div class="index">序号</div>
        <div class="name">歌曲</div>
        <div class="artist">歌手</div>
        <div class="album">专辑</div>
        <div class="duration">时长</div>
      </div>
      <div 
        :class="songId == item.id ? 
                playStatus ? 
                'item is-active' : 'item' : 'item' "
        v-for="(item,index) in list" 
        :key="item.id + index" 
        ref="list"
        @click="showPlayer(item.id,item.al.id,index)"
      >
        <div class="index">
          <span class="num">{{ handleNum(index)}}</span>
          <i class="iconfont icon-bofang" ref="icon"></i>
          <div class="play-animation">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div class="name">
          <div class="cover">
            <el-image 
              :src="item.al.picUrl" 
              fit="fill"
              v-if="item.al"></el-image>
          </div>
          <div class="song-name ellipsis">
            {{ item.name }}
          </div>
        </div>
        <div class="artist">
          <div class="wrapper ellipsis">
            <span>{{ utils.getSinger(item.ar)}}</span>
          </div>
        </div>
        <div class="album">
          <div class="wrapper ellipsis">
            <span v-if="item.al">{{ item.al.name }}</span>
          </div>
        </div>
        <div class="duration">
          <div class="wrapper">
            <span>{{ utils.formatTime(item.dt) }}</span>  
          </div>  
        </div>  
      </div>
    </div>
    <div 
      class="load-more" 
      v-show="!error"
    >
      <load :list="songLists" :num="10" @load="list = $event" />
    </div>
    <div class="error" v-show="error">
      <span>暂时没有播放数据噢~</span>
    </div>
  </div>
</template>

<script>
import {mapGetters,mapActions,mapState} from 'vuex'
const Load = () => import('../click-more')
export default {
  props: {
    songLists: {
      type: Array,
      required: true,
    }
  },
  data(){
    return{
      list: [],
      loading: true,
      error: false,
      max: 0,
    }
  },
  computed: {
    ...mapState(['audio','playStatus','playing','songId','isLoading']),
    ...mapGetters(['getSongId','getCurrentSong','getPlayStatus']),

  },
  watch: {
    songLists(val){
      this.list.length = 0;
      val.length == 0 ? this.error = true : this.error = false;
    },
  },
  components: {
    Load,
  },
  mounted(){
    this.init();
  },
  methods: {
    ...mapActions([
      'currentSong',
      'songsList',
    ]),
    
    init(){
      this.playStatus && this.getPlayStatus(false);
      this.$nextTick( () => {
        console.log(this.loading)
        this.loading = false;
      })
    },

    // 处理序号
    handleNum(num){
      num++;
      return num < 10 ? '0' + num : num
    },

    // 开启播放组件
    showPlayer(id,alid,index){
        let songList = this.utils.storeId(this.list)
        let obj = {
          id,
          alid,
          index,
        }
        this.getSongId(id)
        this.currentSong(obj)
        this.songsList(songList);
          if(this.playStatus){
            this.audio.pause();
          }
          else{
            this.playing &&
            this.audio.play();
          }
          this.getPlayStatus(!this.playStatus)
    },

    // 加载更多歌曲
    loadSong(data){ 
      this.list = data;
    },

  }
}
</script>

<style lang="scss" scoped> 
  .song-box{
    user-select: none;
    &>div{
      padding: 0 9px;
      display: flex;
      height: 50px;
      line-height: 50px;
      font-size: 14px;
      &>div{
        padding: 0 9px;
        display: flex;
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .index{
        display: inline-block;
        width: 10%;
        text-align: center;
        i{
          display: none;
          color: $mainColor;
        }
      }
      .name{
        align-items: center;
        width: 40%;
        .cover{
          margin-right: 10px;
          width: 35px;
          height: 35px;
          border-radius: 5px;
        }
        .song-name{
          width: 150px;
        }
      }
      .artist{
        width: 25%;
      }
      .album{
        width: 15%;
      }
      .duration{
        padding-right: 40px;
        display: inline-block;
        width: 15%;
        text-align: right;
      }

      &.title{
        text-align: left;
        font-weight: 300;
        background: #fafafa; 
        color: #999;
        div{
          display: inline-block;
        }
      }
      &.item{
        justify-content: center;
        align-items: center;
        transition: all .5s ease;  
        cursor: pointer;
        .play-animation{
          margin-right: 0;
          display: none;
          height: 16px;
          min-width: 18px;
          justify-content: center;
          overflow: hidden;
          span{
            animation: fly 2s infinite linear;
            width: 2px;
            height: 100%;
            margin-left: 2px;
            background: #fa2800;
            &:nth-child(1) { animation-delay: -1s }
            &:nth-child(3) { animation-delay: -1.5s }
            &:nth-child(4) { animation-delay: -0.9s }
            &:nth-child(5) { animation-delay: -0.6s }
          }
        }
        &:hover{
          background: #e8e9ed;
          .index{
            span{
              display: none;
            }
            i{
              display: block;
            }
          }
        }
        &:nth-child(odd){
          background: #f7f7f7;
        }
        &.is-active{
          .index{
            span{
              display: none;
            }
            .play-animation{
              display: flex;
              span{
                display: block;
              }
            }
          }
          
        }
        &.is-active:hover{
          .play-animation{
            display: none;
          }
        }
      }

    } 
  }
  .load-more{
    margin-top: 20px;

  }
  .error{
    @include flex;
    margin-top: 20px;
  }
  
</style>