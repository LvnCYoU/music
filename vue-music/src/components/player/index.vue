<template>
  <div class="player-box">
    <audio ref="playingBox" 
    @timeupdate="getCurrentTime" 
    @ended="songEnd"
    preload="auto"
    :src="songUrl"
    ></audio>
    <div class="song-image">
      <img :src="getCurrentSong.img">
      <p>{{ getCurrentSong }}</p>
    </div>
    <div class="info">
      <h2 class="ellipsis">{{ getCurrentSong.song }}</h2>
      <p class="ellipsis">{{ getCurrentSong.singer }}</p>
    </div>
    <div class="player-btn">
      <i class="iconfont icon-shangyishou" title="上一首" @click="propSong"></i>
      <i class="iconfont icon-bofang" title="播放" ref="playing" @click="playing"></i>
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
      <i class="iconfont icon-laba" title="音量" ref="volumn" @click="changeVolumn"></i>
      <div class="progress">
        <el-slider 
        v-model="volume.ve"
        @change="adjustVolumn"
        :max="100"
        ></el-slider>
      </div>
    </div>  
    <div class="tool-box">
      <i class="iconfont icon-xunhuanbofang" title="循环播放" ref="playerMode" @click="changeMode"></i>
      <i class="iconfont icon-gecitiaozheng" title="歌词" @click="showList($refs.lyricBox)"></i>
      <i class="iconfont icon-gedan" title="播放列表" @click="showList($refs.songList)"></i>
    </div>
    <div 
      class="lyric-box shadow" 
      @wheel.stop.prevent
      ref="lyricBox"
    >
      <scroll 
        class="lyric" 
        :data="getCurrentSong.lyric.lyric"
        ref="lyricList"
      >
        <div class="wrapper">
          <p v-for="(item,index) in getCurrentSong.lyric" :key="index">
            {{ item.lyric }}
          </p>
        </div>
      </scroll>
    </div>
    <div 
      class="songlist-box shadow" 
      @wheel.stop.prevent
      ref="songList"
    >
      <h2 class="title">播放列表</h2>
      <scroll 
        class="list" 
        :data="songList.name"
      >
        <div class="wrapper" v-for="(item,index) in songList" :key="index">
          <div class="index">{{ index + 1 }}</div>
          <div class="song-name">
            <p>{{ item.song }}</p>
          </div>
          <div class="singer">
          </div>
          <div class="del">
          </div>
        </div>
      </scroll>
    </div>

    </div>
</template>

<script>
import {mapMutations,mapActions,mapState,mapGetters} from 'vuex'
import Scroll from '../../api/scroll'
export default {
  data(){
    return {
      audio: {},
      songInfo: {},
      time: 0,
      volume: {
        ve: 50,
        old: 0,
      },
      status: true,
      amend: false,
      mode: 'loop',
    }
  },
  components:{
    Scroll,
  },
  computed: {
    ...mapGetters(['getCurrentSong']),
    ...mapState(['songUrl','songId','songList']),

  },
  watch: {
    songId(id,oldid){
      if(!id || id === oldid) return;
      this.$nextTick( () => {
        this.status = true;
        this.currentSongInfo(id,this.getCurrentSong.alid);
      })
    },
  },
  mounted(){
    this.audio = this.$refs.playingBox;
    console.log(this.getCurrentSong)
  },

  methods:{
    ...mapMutations(['showPlayer']),
    ...mapActions(['changeSongUrl','currentSong']),
    test(){
      this.changeTime = false;
      console.log(this.changeTime)
    },
    test1(){
      this.changeTime = true;
      console.log(this.changeTime)
    },

    // 初始化
    async currentSongInfo(id,alid){
      let _this = this;
      await this.$api.axios.all([
        this.$api.SongUrl(id),
        this.$api.SongDetail(id),
        this.$api.Album(alid),
        this.$api.Lyric(id)
      ])
        .then(this.$api.axios.spread(
          function(
            resUrl,
            resDetail,
            resAlbum,
            resLyric
            ){
              let obj = {};
              _this.changeSongUrl(resUrl.data.data[0].url);
              obj.durationTime = _this.utils.formatTime(resDetail.data.songs[0].dt)
              obj.dt = resDetail.data.songs[0].dt
              obj.img = resAlbum.data.album.picUrl;
              obj.song = resAlbum.data.album.name;
              obj.singer = resAlbum.data.album.artist.name
              obj.lyric = _this.utils.Lyric(resLyric.data.lrc.lyric)
              console.log(obj.lyric)
              _this.currentSong(obj);
              if(_this.getCurrentSong.singer){  
                _this.showPlayer();
              }
        }))     
      if(this.audio.src) {
        this.playing() 
      }
    },
    // 上一首
    propSong(){
      let index = this.getCurrentSong.index;
      index == 0 ? index = this.songList.length - 1 : index -= 1;
      this.changeSong(index);
      this.playPause();
    },

    // 下一首
    nextSong(){
      let index = this.getCurrentSong.index;
      index == this.songList.length - 1 ? index = 0: index += 1
      this.changeSong(index);
      this.playPause();
    },

    // 播放
    playing(){
      if(this.status){
        this.$refs.playing.className = 'iconfont icon-zanting'
        this.audio.play();
      }
      if(!this.status){
        this.$refs.playing.className = 'iconfont icon-bofang'
        this.audio.pause();
      }
      console.log(this.audio.src)
      this.status = !this.status
    },

    // 歌曲播放完毕
    songEnd(){
      let index = this.getCurrentSong.index;
      if(this.mode === 'loop'){
        !this.songList[index + 1] ? index = 0 : index += 1
        this.getCurrentSong.index += 1;
      }
      else if(this.mode === 'once'){
        this.audio.currentTime = 0;
        this.audio.play();
        return ;
      }
      else {
        let len = this.songList.length - 1;
        index = ~~(Math.random() * (len - 1));
      }
      this.changeSong(index);
      this.playPause();
    },

    // 切换歌曲
    changeSong(index){
      console.log(index)
      console.log(this.songList.length)
      this.$nextTick( () => {
        this.audio.src = this.songList[index].url;
        this.changeSongUrl(this.audio.src)
        this.currentSong(this.songList[index])
        this.$api.Lyric(this.songList[index].id)
          .then( res => {
            let obj = {};
            obj.lyric = this.utils.Lyric(res.data.lrc.lyric)
            this.currentSong(obj)
          })
      })
    },

    // 改变喇叭状态
    changeVolumn(e){
      let volume = this.volume.ve / 100;
      if(e.target.className === "iconfont icon-laba"){
        e.target.className = "iconfont icon-jingyin"
        this.volume.old = volume;
        this.volume.ve = this.audio.volume = 0
        console.log(this.volume.old)
      }else{
        e.target.className = "iconfont icon-laba"
        this.audio.volume = this.volume.old;
        this.volume.ve = this.volume.old * 100;
      }
    },

    // 获取当前播放时长
    getCurrentTime(){
      this.time = this.audio.currentTime * 1000;
      console.log(this.time)
    },

    // 改变当前播放位置
    changeCurrentTime(){
      this.audio.currentTime = this.time / 1000;
    },

    // 改变当前音量
    adjustVolumn(){
      let volume = this.volume.ve / 100;
      this.volume.old = this.audio.volume = volume;
    },

    // 改变播放状态
    changeMode(){
      let dom = this.$refs.playerMode;
      if(this.mode === 'loop'){
        this.mode = 'once';
        dom.className = 'iconfont icon-danquxunhuan'
      }
      else if(this.mode === 'once'){
        this.mode = 'random';
        dom.className = 'iconfont icon-suijibofang'
      }
      else if(this.mode === 'random'){
        this.mode = 'loop';
        dom.className = 'iconfont icon-xunhuanbofang'
      }
    },
    
    // 展示 歌词/播放列表
    showList(dom){
      if(!dom.style.display || dom.style.display == 'none'){
        dom.style.display = 'inline-block'
      }else{
        dom.style.display = 'none'
      }
      this.$nextTick( () => {
        this.$refs.lyricList.refresh()
      })
    },

    // 切换歌曲时播放
    playPause() {
      var audio = this.$refs.playingBox;   // music为vue 中audio的ref值
      if(audio !== null) {
        if(this.status) {		// 暂停
          audio.pause();
        }else {
          audio.currentTime = 0;		// 控制audio时间
          let playPromise = audio.play();
          if (playPromise) {
            console.log('playpPromise')
            playPromise.then(() => {
              // 音频加载成功
              setTimeout(()=>{
                
              },1000)
            }).catch(() => {
                // 失败后继续回调
                this.playPause(); 
                console.log('err')
            });
          }
        }
      }
    },
  }
}
</script>

<style lang="scss">
  .player-box{
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    display: flex;
    align-items: center;
    width: 100%;
    height: 72px;
    background: #fff;
    padding-left: 20px;
    padding-right: 10px;
    box-sizing: border-box;
    .song-image,img{
      display: inline-block;
      margin-right: 30px;
      width: 60px;
      height: 60px;
      border-radius: 5px;
    }
    .info{
      margin-right: 15px;
      width: 120px;
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
      display: flex;
      margin-left: 30px;
      margin-right: 10px;
      align-items: center;
      .iconfont{
        cursor: pointer;
        color: #4a4a4a;
        &:hover{
          color: #fa2800;
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
      position: relative;
      display: flex;
      align-items: center;
      margin-left: 40px;
      width: 650px;
      flex: 1;
      p{
        font-size: 14px;
        margin: 0 20px;
      }
    }
    .volume-box{
      width: 180px;
      margin-left: 40px;
      display: flex;
      align-items: center;
      margin-right: 80px;
      .iconfont{
        margin-right: 10px;
        font-size: 26px;
        font-weight: 700;
        cursor: pointer;
      }
    }
    .tool-box{
      display: flex;
      align-items: center;
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
      display: inline-block;
      align-items: center;
      flex:1;
      .el-slider__runway{
        height: 4px;
        .el-slider__bar{
          height: 4px;
          background-color: #fa2800;
        }
        .el-slider__button-wrapper{
          width: 0;
          height: 0;
          top: -11px;
          cursor: pointer;
          div.el-slider__button.el-tooltip{
            width: 10px;
            height: 10px;
            border: 2px solid #fa2800;
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
      display: none;
      width: 360px;
      height: 500px;
      border-radius: 3px;
      background: #fff;
      box-sizing: border-box; 
      z-index: 999;
      .lyric{
        height: 100%;
        overflow: hidden;
        .wrapper{
          p{
            margin: 5px 0;
            line-height: 24px;
            font-size: 14px;
            font-weight: 300;
            text-align: center;
          }
        }
      }
    }
    .songlist-box{
      width: 500px;
    }
  }
</style>

