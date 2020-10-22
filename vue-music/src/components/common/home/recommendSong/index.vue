<template>
  <div class="recommend-song">
    <h2 class="title">推荐新歌</h2>
    <div class="list">
      <div class="item" v-for="(item,index) in List" :key="item.id" ref="play_list">
        <div class="wrapper flex-center" @click="playSong(item.id,item.song.album.id,index)">
          <div class="index flex-center">
            <span>{{ index + 1 }}</span>
            <i class="el-icon-video-play" ref="play_btn"></i>
            <div class="play-animation">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          <div class="album">
            <el-image :src="item.picUrl" fit="cover"></el-image>
          </div>
          <div class="info flex-center">
            <div class="artist">
              <p class="singer-company">{{ item.song.album.company }}</p>
              <p class="singer">
                {{ item.song.artists.length > 1 ? getSinger(item.song) : item.song.artists[0].name}}
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
import {playing} from '../../../../api/audio'
export default {
  data(){
    return {
      List: [],
      singerList: [],
    }
  },
  computed:{
    ...mapGetters(['getSongId','getCurrentSong']),
    ...mapState(['songList','songId','audio']),
  },
  created(){
    this.$api.PersonalizedNewSong()
      .then( res => {
        this.List = res.data.result;
      })
  },
  watch: {
    songId(id){
      this.List.some( (list,index) => {
        if(list.id == id){
          this.$refs.play_list.some( item => {
            if(item.className.indexOf('is-active') > 1){
              item.classList.remove('is-active');
            }
          })
          this.$refs.play_btn.some( item => {
            if(item.className == 'el-icon-video-pause'){
              item.className = 'el-icon-video-play';
            }
          })
          this.$refs.play_list[index].classList.add('is-active');
          this.$refs.play_btn[index].className = 'el-icon-video-pause';
          return true;
        }
      })
    }
    
  },
  methods: {
    ...mapActions([
      'changeSongUrl',
      'currentSong',
      'songsList',
    ]),


    // 获取歌手名字
    getSinger(list){
      let len = list.artists.length;
      let str = '';
      for(let i = 0; i < len; i++){
        if(!i)str = list.artists[i].name;
        else{
          str += '/' + list.artists[i].name
        }
      }
      return str;    
    },

    // 开启播放组件 , 传播放列表
    playSong(id,alid,index){
      this.getSongId(id)
      let obj = {};
      let songList = this.storeId(this.List)
      obj.id = id;
      obj.alid = alid;
      obj.index = index;
      this.currentSong(obj)
      this.getSongUrl();
      this.songsList(songList)
      if(id == this.getCurrentSong.id){
        if(!this.audio.audio.paused){
          this.$refs.play_list.some( item => {
            if(item.className.indexOf('is-active') > 1){
              item.classList.remove('is-active');
            }
          })
          this.$refs.play_btn.some( item => {
            if(item.className == 'el-icon-video-pause'){
              item.className = 'el-icon-video-play';
            }
          })
        }else{
           this.$refs.play_list[index].classList.add('is-active');
          this.$refs.play_btn[index].className = 'el-icon-video-pause';
        }
        playing(this.audio);
      }
      
      
    },

    // 存储音乐id
    storeId(list){
      let arr = [];
      list.forEach((value,index) => {
        let obj = {}
        obj.alid = value.song.album.id;
        obj.id = value.id;
        obj.song = value.name;
        obj.singer = value.song.artists.length > 1 ? 
          this.getSinger(value.song) : 
          value.song.artists[0].name
        obj.index = index;
        arr.push(obj)
      })
      return arr
    },

    // 获取音乐url  
    getSongUrl(){
      let str = ''
      this.songList.map( (list,index) => {
        !index ? str = list.id : str += ',' + list.id
      })
      this.$api.SongUrl(str)
        .then(res => {
          let arr = [];
          this.songList.map( (list,index) => {
            res.data.data.map( item => {
              if(list.id === item.id){
                arr.push(item.url)
              }
            })
            list.url = arr[index]
          })

        })
    },

    // 播放动画
    // animation(id){
      
    // }
  },
}
</script>
<style lang="scss" scoped>
.recommend-song{
  h2{
    margin: 0;
    font-size: 16px;
    color: #4a4a4a;
  }
  .title{
    margin: 20px 0 20px 0;
  }
  .list{
    display: flex;
    flex-wrap: wrap;
    margin: 0 -15px;
    .item{
      flex: 0 0 50%;
      max-width: 50%;
      margin-bottom: 20px;
      height: 80px;
      padding: 0 15px 30px;
      box-sizing: border-box;
      &:nth-child(even){
        padding-left: 30px;
      }
      &.is-active:hover{
        .wrapper{
          .index{
            .play-animation{
              display: none;
            }
          }
        }
        
      }
      &.is-active{
        .wrapper{
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
        
        
      }
      .wrapper{
        position: relative;
        height: 80px;
        padding-left: 2%;
        border-radius: 5px;
        justify-content: start;
        background: #fff;
        width: 100%;
        box-shadow: 0 5px 40px -1px rgba(2,10,18,.1);
        cursor: pointer;
        &:hover{
          span{
            display: none;
          }
          .el-icon-video-play,.el-icon-video-pause{
            display: block;
          }
        }
        .index{
          width: 30px;
          margin-right: 20px;
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
          span{
            font-size: 15px;
            color: #4a4a4a;
            font-weight: 700;
          }
          i{
            display: none;
            font-size: 22px;
            color: #fa2800;
          }
          span,i{
            transition: all 1s;
          }

        }
        .album{
          position: relative;
          width: 55px;
          height: 55px;
          border-radius: 5px;
          margin-right: 30px;
        }
        .info{
          width: 15%;
          .artist{
            width: 100%;
            .singer-company{
              margin-bottom: 10px;
              font-weight: 700;
            }
            .singer{
              overflow: hidden;
            }
            .singer,.singer-company{
              text-overflow: ellipsis;
              white-space: nowrap;
              overflow: hidden;
              font-size: 14px;
              color: #333;
              transition: all 1s;
            }
          }
        }
        .song-name,.duration{
          font-size: 14px;
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
      }
    }
  }
}

</style>