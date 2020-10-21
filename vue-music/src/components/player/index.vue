<template>
  <transition name="el-fade-in">
    <div class="player-box" ref="playerBox">
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
        <i class="iconfont icon-gedan" title="播放列表" @click="showList($refs.songBox)"></i>
      </div>
      <transition name="el-zoom-in-bottom">
        <div 
          class="lyric-box shadow" 
          @wheel.stop.prevent
          ref="lyricBox"
        >
          <scroll 
            class="lyric" 
            :data="getCurrentSong.lyric"
            ref="lyricList"
          >
            <div class="wrapper" ref="lyricWrap" style="transition-duration='1000ms'">
              <p v-for="(item,index) in getCurrentSong.lyric" :key="index" ref="line">
                {{ item.lyric }}
              </p>
            </div>
          </scroll>
        </div>
      </transition>
      <transition name="el-zoom-in-bottom">
        <div 
          class="songlist-box shadow" 
          @wheel.stop.prevent
          ref="songBox"
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
            <div class="wrapper" ref="listWrap" v-for="(item,index) in songList" :key="index" @click="playlistPlay(index)">
              <div class="index">
                <p>{{ index + 1 }}</p>
                <i class="iconfont icon-bofang" ref="listStatus"></i>
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
import Scroll from '../../api/scroll'
export default {
  data(){
    return {
      audio: {},
      songInfo: {},
      time: 0,
      status: true,
      amend: false,
      lineNo: 0, // 当前行
      propLine: null, // 上一行
      C_pos: 6, // C位
      offset: -34, // 滚动距离
      volume: {
        ve: 50,
        old: 0,
      },
      mode: 'loop',
    }
  },
  components:{
    Scroll,
  },
  computed: {
    ...mapGetters(['getCurrentSong','getSongId','getPlayerMode']),
    ...mapState(['songUrl','songId','songList','playMode']),

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
    let dom = this.$refs.playerMode;
    this.audio = this.$refs.playingBox;
    this.mode = this.playMode
    if(this.mode === 'loop'){
      dom.className = 'iconfont icon-xunhuanbofang'
      dom.title = '循环播放'
    }
    else if(this.mode === 'once'){
      dom.className = 'iconfont icon-danquxunhuan'
      dom.title = '单曲循环'
    }
    else if(this.mode === 'random'){
      dom.className = 'iconfont icon-suijibofang'
      dom.title = '随机播放'
    }
  },

  methods:{
    ...mapMutations(['showPlayer']),
    ...mapActions(['changeSongUrl','currentSong','songsList']),
    test(){
      this.changeTime = false;
    },
    test1(){
      this.changeTime = true;
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
      this.goback();
      this.playPause();
    },

    // 下一首
    nextSong(){
      let index = this.getCurrentSong.index;
      index == this.songList.length - 1 ? index = 0: index += 1
      this.changeSong(index);
      this.goback();
      this.playPause();
    },

    // 播放
    playing(){

      if(this.status){
        this.$refs.playing.className = 'iconfont icon-zanting'
        this.audio.play();
        this.currentPlayList();
      }
      if(!this.status){
        this.$refs.playing.className = 'iconfont icon-bofang'
        this.audio.pause();
      }
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
        let i = ~~(Math.random() * (len - 1));
        console.log(1)
        if(i == index) this.songEnd();
        else index = i;
      }
      this.changeSong(index);
      this.goback();
      this.playPause();
    },

    // 切换歌曲
    changeSong(index){
      this.currentSong(this.songList[index])
      this.songList.length && this.getSongId(this.songList[index].id)
    },

    // 改变喇叭状态
    changeVolumn(e){
      let volume = this.volume.ve / 100;
      if(e.target.className === "iconfont icon-laba"){
        e.target.className = "iconfont icon-jingyin"
        this.volume.old = volume;
        this.volume.ve = this.audio.volume = 0
      }else{
        e.target.className = "iconfont icon-laba"
        this.audio.volume = this.volume.old;
        this.volume.ve = this.volume.old * 100;
      }
    },

    // 获取当前播放时长
    getCurrentTime(){
      let len = this.getCurrentSong.lyric.length;
      this.time = this.audio.currentTime * 1000;
      if( this.lineNo == len) return;
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
      let dom = this.$refs.playerMode;
      if(this.mode === 'loop'){
        this.getPlayerMode('once');
        this.mode = 'once';
        dom.className = 'iconfont icon-danquxunhuan'
        dom.title = '单曲循环'
      }
      else if(this.mode === 'once'){
        this.mode = 'random';
        this.getPlayerMode('random')
        dom.className = 'iconfont icon-suijibofang'
        dom.title = '随机播放'
      }
      else if(this.mode === 'random'){
        this.mode = 'loop';
        this.getPlayerMode('loop')
        dom.className = 'iconfont icon-xunhuanbofang'
        dom.title = '循环播放'
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
        this.$refs.lyricList.refresh();
        this.$refs.songList.refresh();
      })
    },

    // 高亮当前歌词
    lineHigh() {
      let ul = this.$refs.lyricWrap;
      let lis = this.$refs.line;
      ul.style.transitionDuration = '1000ms'
      if(this.lineNo > 0 && this.propLine || this.propLine == 0){
        lis[this.propLine].removeAttribute("class");
      }
      lis[this.lineNo].className = "is-linehigh";// 高亮显示当前行
      //文字滚动
      if(this.lineNo > this.C_pos){
        ul.style.transform = "translateY("+(this.lineNo - this.C_pos) * this.offset+"px)"; //整体向上滚动一行高度
      }
      else if(this.lineNo < this.C_pos){
        ul.style.transform = "translateY(0)"; //回到开头
      }
    },

    // 回调歌词
    goback() {
      let ul = this.$refs.lyricWrap;
      if(this.propLine) {
        this.$refs.line[this.propLine].removeAttribute("class");
      }
      ul.style.transform = "translateY(0)";
      this.lineNo = 0;
    },

    // 切换歌曲时播放
    playPause() {
      let playPromise;
      if(this.audio !== null) {
        if(this.status) {		// 暂停
          this.audio.pause();
        }else {
          this.audio.currentTime = 0;		// 控制audio时间
          playPromise = this.audio.play();
          this.currentPlayList();
          if (playPromise) {
            playPromise.then(() => {
              // 音频加载成功
            }).catch(() => {
                // 失败后继续回调
                setTimeout( () => {
                  this.playPause(); 
                },1000)
                console.log('err')
            });
          }
        }
      }
    },

    // 播放列表点击播放
    playlistPlay(index){
      let status = this.$refs.listStatus;
      let wrap = this.$refs.listWrap;
      if(index === this.getCurrentSong.index){
        if(wrap[this.getCurrentSong.index].className == 'wrapper is-active'){
          wrap[this.getCurrentSong.index].classList.remove('is-active');
          status[this.getCurrentSong.index].className = 'iconfont icon-bofang';
        }else{
          wrap[this.getCurrentSong.index].classList.add('is-active');
          status[this.getCurrentSong.index].className = 'iconfont icon-zanting';
        }
        this.playing();
      }
      else {
        this.changeSong(index);
      }
    },

    // 删除歌曲
    del(index){
      let arr = this.songList;
      arr.splice(index,1);
      this.songsList(arr);
    },
  
    // 列表当前播放动画
    currentPlayList(){
      let status = this.$refs.listStatus;
      let wrap = this.$refs.listWrap;
      if(this.songList.length){
        status.some( current => { 
          if(current.className == 'iconfont icon-zanting'){
            current.className = 'iconfont icon-bofang'
          }
        })
        wrap.some( current => {
          if(current.className == 'wrapper is-active'){
            current.classList.remove('is-active');
          }
        })
        status[this.getCurrentSong.index].className = 'iconfont icon-zanting'
        wrap[this.getCurrentSong.index].classList.add("is-active");
      }
    },

    // 清空播放列表
    delList(){
      let arr = [];
      this.songsList(arr);
      console.log(this.getCurrentSong);
    }
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
    transition: all 1s ease;
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
      user-select: none;
      z-index: 999;
      .lyric{
        height: 100%;
        overflow: hidden;
        .wrapper{
          transition-duration: 600ms;
          p{
            padding: 5px 0;
            line-height: 24px;
            font-size: 14px;
            font-weight: 300;
            text-align: center;
            user-select: none;
            &.is-linehigh{
              color: #fa2800;
            }
          }
        }
      }
    }
    .songlist-box{
      padding: 20px 30px;
      width: 500px;
      .title{
        margin: 10px 0 30px;
        display: flex;
        align-items: center;
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
        height: 400px;
        overflow: hidden;
        .wrapper-box{
          transition-duration: 600ms;
          .wrapper{
            display: flex;
            margin: 15px 0;
            height: 24px;
            &.is-active{
              p,i{
                color: #fa2800;
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
                  color: #fa2800;
                }
              }
              .del{
                display: block;
                &:hover{
                  color: #fa2800;
                }
              }
            }
            div{
              display: flex;
              align-items: center;
              margin-right: 25px;
              user-select: none;
              p{
                display: inline-block;
                width: 100%;
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
                font-size: 14px;
              }
              &.index{
                display: flex;
                width: 30px;
                text-align: center;
                justify-content: center;
                align-items: center;
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
                    background: #fa2800;
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
</style>

