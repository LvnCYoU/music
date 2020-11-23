<template>
  <transition name="el-fade-in">
    <div 
      class="player-box" 
      ref="playerBox"
    >
      <audio ref="playingBox" 
      @timeupdate="getCurrentTime" 
      @ended="songEnd"
      preload="auto"
      :src="getCurrentSong.songUrl"
      ></audio>
      <div class="song-image">
        <img :src="getCurrentSong.img">
      </div>
      <div class="info">
        <h2>{{ getCurrentSong.song }}</h2>
        <p>{{ getCurrentSong.singer }}</p>
      </div>
      <div class="player-btn">
        <i class="iconfont icon-shangyishou" title="上一首" @click="propSong"></i>
        <i 
          :class="playStatus ? 
          'iconfont icon-zanting' : 'iconfont icon-bofang' " 
          :title="playStatus ? '暂停' : '播放' " 
          @click="playing"></i>
        <i class="iconfont icon-xiayishou" title="下一首" @click="nextSong"></i>
      </div>
      <div class="progress-box">
        <p class="current-time">{{ utils.formatTime(time) }}</p>
        <div class="progress">
          <el-slider 
          v-model="time"
          :max="getCurrentSong.dt"
          :show-tooltip="false"
          @change="changeCurrentTime"
          ></el-slider>
        </div>
        <p class="duration">{{ getCurrentSong.durationTime }}</p>
      </div>
      <div class="volume-box">
        <i 
          :class="volume.ve == 0 ? 'iconfont icon-jingyin' : 'iconfont icon-laba'" 
          :title="volume.ve == 0 ? '静音' : '音量'"  
          @click="changeVolumn"
        ></i>
        <div class="progress">
          <el-slider 
          v-model="volume.ve"
          @change="adjustVolumn"
          :max="100"
          ></el-slider>
        </div>
      </div>  
      <div class="tool-box">
        <i 
          :class="playMode == 'loop' ? 'iconfont icon-xunhuanbofang':
            playMode == 'once' ? 'iconfont icon-danquxunhuan' :
            'iconfont icon-suijibofang'" 
          :title="playMode == 'loop' ? '循环播放' :
            playMode == 'once' ? '单曲循环' : '随机播放'"  
          @click="changeMode"
        >
        </i>
        <i class="iconfont icon-gecitiaozheng" title="歌词" @click="showList"></i>
        <i class="iconfont icon-gedan" title="播放列表" @click="showList"></i>
      </div>
      <transition name="fade" mode="out-in">
        <div 
          class="lyric-box shadow" 
          @wheel.stop.prevent
          v-show="showLyric"
        >
          <scroll 
            class="lyric" 
            :data="getCurrentSong.lyric"
            ref="lyricList"
          >
            <div class="wrapper" ref="lyricWrap" style="transition-duration='1000ms'">
              <p 
                v-for="(item,index) in getCurrentSong.lyric" 
                :key="index" ref="line"
                :class="lineNo-1 == index ? 'is-linehigh' : ''"
              >
                {{ item.lyric }}
              </p>
            </div>
          </scroll>
        </div>
      </transition>
      <transition name="fade" mode="out-in">
        <div 
          class="songlist-box shadow" 
          @wheel.stop.prevent
          v-show="showPlayList"
        >
          <div class="title">
            <h2>播放列表</h2>
            <i class="iconfont icon-lajitong" title="清空" @click="delList"></i>
          </div>

          <scroll 
            class="list" 
            :data="songList"
            ref="songList"
          >
          <div class="wrapper-box">
            <div 
              :class="item.id == songId ? 
              playStatus ? 
              'wrapper is-active' : 'wrapper' : 'wrapper'" 
              v-for="(item,index) in songList" 
              :key="index" 
              @click="changeSong(index)"
            >
              <div class="index">
                <p>{{ index + 1 }}</p>
                <i class="iconfont icon-bofang" v-show="item.id != songId || !playStatus"></i>
                <i class="iconfont icon-zanting" v-show="playStatus && item.id == songId"></i>
                <div class="play-animation">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
              <div class="song-name">
                <p>{{ item.song }}</p>
              </div>
              <div class="singer">
                <p>{{ item.singer }}</p>
              </div>
              <div class="del" @click.stop="del(index)">
                <i class="iconfont icon-error"></i>
              </div>
            </div>
          </div>

          </scroll>
        </div>
      </transition>
      </div>
  </transition>
</template>

<script>
import {mapMutations,mapActions,mapState,mapGetters} from 'vuex'
let Scroll = () => import('@/api/scroll');
export default {
  data(){
    return {
      audio: {},
      songInfo: {},
      time: 0,
      status: true,
      flag: false,
      lineNo: 0, // 当前行
      propLine: null, // 上一行
      C_pos: 6, // C位
      offset: -34, // 滚动距离
      volume: {
        ve: 50,
        old: 0,
      },
      lyric: [],
      showLyric: false,
      showPlayList: false,
    }
  },
  components:{
    Scroll,
  },
  computed: {
    ...mapGetters(['getCurrentSong','getSongId','getPlayerMode','getPlayStatus']),
    ...mapState(['songId','songList','playMode','playStatus']),

  },
  watch: {
    songId(id,oldid){
      if(!id || id === oldid) return;
      this.$nextTick( () => {
        this.getPlayStatus(false);
        this.currentSongInfo(id,this.getCurrentSong.alid);
      })
    },
  },
  mounted(){
    this.init();
  },

  methods:{
    ...mapMutations(['SHOW_PLAYER']),
    ...mapActions(['currentSong','songsList','audioInit']),

    init(){
      this.audio = this.$refs.playingBox;
      this.audioInit(this.audio);
      this.progressBtn();
    },

    // 歌曲信息初始化
    async currentSongInfo(id,alid){
      let _this = this;
      await this.$api.axios.all([
        this.$api.SongUrl(id),
        this.$api.SongDetail(id),
        this.$api.Album(alid),
        this.$api.Lyric(id)
      ])
        .then( this.$api.axios.spread(
          function(
            resUrl,
            resDetail,
            resAlbum,
            resLyric
            ){
              let obj = {
                durationTime: _this.utils.formatTime(resDetail.data.songs[0].dt),
                dt: resDetail.data.songs[0].dt,
                img: resAlbum.data.album.picUrl,
                song: resAlbum.data.album.name,
                singer: resAlbum.data.album.artist.name,
                lyric: _this.utils.Lyric(resLyric.data.lrc.lyric),
                songUrl: resUrl.data.data[0].url,
              }
              if(!obj.lyric.length){
                let arr = [];
                arr.lyric = '暂无歌词，敬请见谅';
                obj.lyric.push(arr);
              }
              _this.currentSong(obj);

        }))    
        if(this.getCurrentSong.singer){
          this.audio.src = this.getCurrentSong.songUrl;
          this.SHOW_PLAYER();
          this.playing();
        }
    },
    
    // 上一首
    propSong(){
      if(this.songList.length == 0) return;
      let index = this.getCurrentSong.index;
      index == 0 ? index = this.songList.length - 1 : index -= 1;
      this.changeSong(index);
      this.goback();
      this.playPause();
    },

    // 下一首
    nextSong(){
      if(this.songList.length == 0) return ;
      let index = this.getCurrentSong.index;
      index == this.songList.length - 1 ? index = 0: index += 1
      this.changeSong(index);
      this.goback();
      this.playPause();
    },

    // 播放
    playing(){
      this.playStatus ? this.audio.pause()
      : this.audio.play()
        .catch(() => {
          // 处理超时禁止音乐播放
          this.getPlayStatus(false);
          this.playPause();
          this.getPlayStatus(true);
        });
      this.getPlayStatus(!this.audio.paused);
    },

    // 歌曲播放完毕
    songEnd(){
      let index = this.getCurrentSong.index;
      let action = new Map([
        ['loop', () => {
          !this.songList[index + 1] ? index = 0 : index += 1
        }],
        ['once', () => {
          this.playPause();
          return;
        }],
        ['random', () => {
          let len = this.songList.length - 1;
          let i = ~~(Math.random() * (len - 1));
          if(i == index) this.songEnd();
          else index = i;
        }]
      ])
      action.get(this.playMode).call(this);
      this.changeSong(index);
      this.goback();
      this.playPause();
    },

    // 切换歌曲
    changeSong(index){
      if(this.getCurrentSong.index == index) this.playing();
      else{
        this.currentSong(this.songList[index])
        this.songList.length && this.getSongId(this.songList[index].id)
      }
    },

    // 改变喇叭状态
    changeVolumn(){
      let volume = this.volume.ve / 100;
      if(this.volume.ve){
        this.volume.old = volume;
        this.volume.ve = this.audio.volume = 0
      }else{
        this.audio.volume = this.volume.old;
        this.volume.ve = this.volume.old * 100;
      }
    },

    // 获取当前播放时长
    getCurrentTime(){
      if(this.flag) return;
      let len = this.getCurrentSong.lyric.length;
      this.time = this.audio.currentTime * 1000;
      if( this.lineNo == len) return;
      if(this.getCurrentSong.lyric.length == 1 || !this.getCurrentSong.lyric.length) return;
      if(parseFloat(this.getCurrentSong.lyric[this.lineNo].time) <= this.time){
        this.lineHigh(); //高亮当前行
        this.propLine = this.lineNo;
        this.lineNo++;
      }
    },

    // 改变当前播放位置
    changeCurrentTime(){
      let max = 0;
      this.audio.currentTime = this.time / 1000;
      this.getCurrentSong.lyric.map(list => {
        if(list.time <= this.time){
          max = list.index;
        }
      })
      this.lineNo = max;
      this.lineHigh();
    },

    // 改变当前音量
    adjustVolumn(){
      let volume = this.volume.ve / 100;
      this.volume.old = this.audio.volume = volume;
    },

    // 改变播放状态
    changeMode(){
      let action = new Map([
        ['loop',() => {
          this.getPlayerMode('once');
        }],
        ['once', () => {
          this.getPlayerMode('random');
        }],
        ['random', () => {
          this.getPlayerMode('loop');
        }]
      ])
      action.get(this.playMode).call(this);
    },
    
    // 展示 歌词/播放列表
    showList(e){
      if(e.target.className.indexOf('icon-gedan') > 1){
        if(this.showLyric) this.showLyric = false;
        this.showPlayList = !this.showPlayList;
      }
      if(e.target.className.indexOf('icon-gecitiaozheng') > 1){
        if(this.showPlayList) this.showPlayList = false;
        this.showLyric = !this.showLyric;
      }
      this.$nextTick( () => {
        this.$refs.lyricList.refresh();
        this.$refs.songList.refresh();
      })
    },

    // 高亮当前歌词
    lineHigh() {
      if(this.getCurrentSong.lyric.length == 1) return ;
      let ul = this.$refs.lyricWrap;
      //文字滚动
      if(this.lineNo > this.C_pos){
        ul.style.transform = "translateY(" + (this.lineNo - this.C_pos) * this.offset + "px)"; //整体向上滚动一行高度
      }
      else if(this.lineNo < this.C_pos){
        ul.style.transform = "translateY(0)"; //回到开头
      }
    },

    // 回调歌词
    goback() {
      let ul = this.$refs.lyricWrap;
      ul.style.transform = "translateY(0)";
      this.lineNo = 0;
    },

    // 切换歌曲时播放
    playPause() {
      if(this.audio !== null) {
        if(this.playStatus || this.songList.length == 0){
          this.audio.currentTime = 0;	
          this.audio.pause();
          this.getPlayStatus(false)
        }else {
          this.audio.currentTime = 0;	
          this.audio.play()
            .catch(() => {
              let data = this.getCurrentSong;
              this.currentSongInfo(data.id,data.alid)
            });
        }
      }
    },

    // 删除歌曲
    del(index){
      let arr = this.songList;
      arr.splice(index,1);
      this.songsList(arr);
    },
  
    // 清空播放列表
    delList(){
      let arr = [];
      this.songsList(arr);
    },

    // 进度条监听事件
    progressBtn(){
      let dom = document.querySelector('.el-slider__button');
      dom.addEventListener('mousedown',() => {
        this.flag = true;
      })
      window.addEventListener('mouseup', () => {
        if(!this.flag) return ;
        this.flag = false;
      })
    },

  }
}
</script>

<style lang="scss">
  .player-box{
    @include flex;
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    padding-left: 20px;
    padding-right: 10px;
    height: 72px;
    background: #fff;
    box-sizing: border-box;
    z-index: 9;
    .song-image,img{
      margin-right: 30px;
      width: 60px;
      height: 60px;
      border-radius: 5px;
    }
    .info{
      margin-right: 15px;
      width: 120px;
      h2,p{
        @include ellipse;
      }
      h2{
        font-size: 14px;
        color: #333;
        margin-bottom: 15px;
      }
      p{
        font-size: 12px;
        color: #999;
      }
    }
    .player-btn{
      @include flex;
      margin-left: 30px;
      margin-right: 10px;
      .iconfont{
        cursor: pointer;
        color: #4a4a4a;
        &:hover{
          color: $mainColor;
        }
      }
      .icon-shangyishou,.icon-xiayishou{
        font-size: 25px;
      }
      .icon-bofang,.icon-zanting{
        margin: 0 20px;
        font-size: 40px;
      }
    }
    .progress-box{
      @include flex;
      margin-left: 40px;
      width: 650px;
      flex: 1;
      p{
        font-size: 14px;
        margin: 0 20px;
      }
    }
    .volume-box{
      @include flex;
      margin-left: 40px;
      margin-right: 80px;
      width: 180px;
      .iconfont{
        margin-right: 10px;
        font-size: 26px;
        font-weight: 700;
        cursor: pointer;
      }
    }
    .tool-box{
      @include flex;
      .iconfont{
        font-size: 26px;
        margin: 0 15px;
        cursor: pointer;
        &:hover{
          color: #fa2800;
        }
      }
      .icon-gecitiaozheng{
        font-size: 23px;
      }
      .icon-gedan{
        font-size: 21px;
      }
    }
    .progress{
      width: 100px;
      flex:1;
      .el-slider__runway{
        height: 4px;
        .el-slider__bar{
          height: 4px;
          background-color: $mainColor;
        }
        .el-slider__button-wrapper{
          width: 0;
          height: 0;
          top: -10px;
          cursor: pointer;
          div.el-slider__button.el-tooltip{
            width: 10px;
            height: 10px;
            border: 2px solid $mainColor;
            cursor: pointer;
          }
        }
      }
    }
    .lyric-box,.songlist-box{
      position: absolute;
      right: 0;
      bottom: 80px;
      padding: 44px 30px;
      width: 360px;
      height: 500px;
      border-radius: 3px;
      background: #fff;
      box-sizing: border-box; 
      user-select: none;
      z-index: 999;
      .lyric{
        height: 100%;
        overflow: hidden;
        transition-duration: 1s;
        .wrapper{
          font-size: 12px;
          transition-duration: 600ms;
          p{
            padding: 5px 0;
            line-height: 24px;
            font-size: 14px;
            font-weight: 300;
            text-align: center;
            &.is-linehigh{
              color: $mainColor;
            }
          }
        }
      }
    }
    .songlist-box{
      padding: 20px 30px;
      width: 500px;
      .title{
        @include flex;
        margin: 10px 0 30px;
        justify-content: space-between;
        h2{
          margin-left: 20px;
          font-size: 16px;
          font-weight: 500;
        }
        i{
          margin-right: 25px;
          font-size: 20px;
          cursor: pointer;
        }
      }
      .list{
        height: 390px;
        overflow: hidden;
        .wrapper-box{
          transition-duration: 600ms;
          .wrapper{
            display: flex;
            margin: 15px 0;
            height: 24px;
            &.is-active{
              p,i{
                color: $mainColor;
              }
              &:hover{
                .index{
                  .i{
                    display: block;
                  }
                  .play-animation{
                    display: none;
                  }
                }
              }
              .index{
                p{
                  display: none;
                }
                i{
                  display: none;
                }
                .play-animation{
                  display: flex;
                }
              }
              
            }
            &:hover{
              cursor: pointer;
              .index{
                .play-animation{
                  display: none;
                }
                p{
                  display: none;
                }
                i{
                  display: block;
                  color: $mainColor;
                }
              }
              .del{
                display: block;
                &:hover{
                  color: $mainColor;
                }
              }
            }
            div{
              @include flex;
              margin-right: 25px;
              user-select: none;
              p{
                @include ellipse;
                width: 100%;
                text-align: center;
              }
              &.index{
                @include flex;
                width: 30px;
                .play-animation{
                  margin-right: 0;
                  display: none;
                  height: 16px;
                  min-width: 18px;
                  overflow: hidden;
                  span{
                    animation: fly 2s infinite linear;
                    width: 2px;
                    height: 100%;
                    margin-left: 2px;
                    background: $mainColor;
                    &:nth-child(1) { animation-delay: -1s }
                    &:nth-child(3) { animation-delay: -1.5s }
                    &:nth-child(4) { animation-delay: -0.9s }
                    &:nth-child(5) { animation-delay: -0.6s }
                  }
                }
                i{
                  display: none;
                }
              }
              &.song-name{
                width: 110px;
              }
              &.singer{
                margin: 0 20px;
                width: 150px;
              }
              &.del{
                display: none;
                margin: 0 20px;
              }
            }
          }
        }
      }
    }
  }
  .fade-enter-active,.fade-leave-active{
    transition: all .6s ease;
  }
  .fade-enter , .fade-leave-to{
    transform: translateY(30px);
    opacity: 0;
  }

</style>

