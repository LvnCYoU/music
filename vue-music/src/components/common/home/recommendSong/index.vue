<template>
  <div class="recommend-song">
    <h2 class="title">推荐新歌</h2>
    <div class="list">
      <div class="item" v-for="(item,index) in List" :key="item.id" ref="play_list">
        <div class="wrapper" @click="playSong(item.id,item.song.album.id,index)">
          <div class='index'>
            <div 
              :class="item.id == songId ? 
              playStatus ? 
              'is-active': '' : '' "
            >
              <span>{{ index + 1 }}</span>
              <i class="el-icon-video-play" v-show="item.id != songId || !playStatus"></i>
              <i class="el-icon-video-pause" v-show="playStatus && item.id == songId"></i>
              <div class="play-animation">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
            
          </div>
          <div class="album">
            <el-image :src="item.picUrl" fit="cover"></el-image>
          </div>
          <div class="info">
            <div class="artist">
              <p class="singer-company" v-show="item.song.album.company">{{ item.song.album.company }}</p>
              <p class="singer">
                {{ utils.getSinger(item.song) }}
              </p>
            </div>
          </div>
          <div class="song-name">
            《{{ item.song.name }}》
          </div>
          <div class="duration">
            {{ utils.formatTime(item.song.duration) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapActions,mapGetters,mapState} from 'vuex'
export default {
  data(){
    return {
      List: [],
      singerList: [],
    }
  },
  computed:{
    ...mapGetters(['getSongId','getCurrentSong','getPlayStatus']),
    ...mapState(['songList','songId','audio','playStatus']),
  },
  mounted(){
    this.init()
  },
  methods: {
    ...mapActions([
      'currentSong',
      'songsList',
    ]),

    init(){
      this.getPersonalizedNewSong();
      this.playStatus && this.getPlayStatus(false);
    },

    // 获取推荐新歌
    async getPersonalizedNewSong(){
      await this.$api.PersonalizedNewSong()
        .then( res => {
          this.List = res.data.result;
        })
    },

    // 开启播放组件 , 传播放列表
    playSong(id,alid,index){
      if(id == this.songId){
        let audio = this.audio;
        this.getPlayStatus(audio.paused);
        audio.paused ? audio.play() : audio.pause();
        return ;
      }
      this.getSongId(id)
      let songList = this.utils.storeId(this.List)
      let obj = {
        id,
        alid,
        index,
      }
      this.songsList(songList)
      this.currentSong(obj)
    },
  },
}
</script>
<style lang="scss" scoped>
.recommend-song{
  .title{
    margin: 20px 0 20px 10px;
    padding-left: 10px;
    border-left: 2px solid $mainColor;
  }
  .list{
    display: flex;
    flex-wrap: wrap;
    margin: 0 -15px;
    .item{
      flex: 0 0 50%;
      max-width: 50%;
      margin-bottom: 20px;
      padding-left: 15px;
      box-sizing: border-box;
      &:nth-child(even){
        padding-left: 30px;
      }
      .wrapper{
        @include flex;
        @include shadow;
        height: 80px;
        padding-left: 2%;
        border-radius: 5px;
        justify-content: flex-start;
        background: #fff;
        cursor: pointer; 
        .index{
          @include flex;
          width: 30px;
          margin-right: 20px;
          .play-animation{
            display: none;
            height: 16px;
            min-width: 18px;
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
          span{
            font-size: 15px;
            color: #4a4a4a;
            font-weight: 700;
          }
          i{
            display: none;
            font-size: 22px;
            color: $mainColor;
          }
          span,i{
            transition: all 1s;
          }
          .is-active{
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
        .album{
          margin-right: 30px;
          width: 55px;
          height: 55px;
          border-radius: 5px;
        }
        .info{
          width: 15%;
          .artist{
            width: 100%;
            .singer-company{
              margin-bottom: 10px;
              font-weight: 700;
            }
            .singer,.singer-company{
              @include ellipse;
              color: #333;
              transition: all 1s;
            }
          }
        }
        .song-name,.duration{
          color: #333;
          font-weight: 700;
        }
        .song-name{
          margin-left: 70px;
          flex: 0.8;
        }
        .duration {
          margin-left: 40px;
        }
        &:hover{
          .index{
            .play-animation{
              display: none;
            }
            i{
              display: block;
            }
            span{
              display: none;
            }
          }
        }
      }
    }
  }
}

</style>