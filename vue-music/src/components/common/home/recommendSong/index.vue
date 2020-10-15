<template>
  <div class="recommend-song">
    <h2 class="title">推荐新歌</h2>
    <div class="list">
      <div class="item" v-for="(item,index) in List" :key="item.id">
        <div class="wrapper flex-center" @click="playSong(item.id,item.song.album.id,index)">
          <div class="index flex-center">
            <span>{{ index + 1 }}</span>
            <i class="el-icon-video-play"></i>
            <i class="el-icon-video-pause"></i>
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
export default {
  data(){
    return {
      List: [],
      singerList: [],
    }
  },
  computed:{
    ...mapGetters(['getSongId']),
    ...mapState(['songList']),
  },
  created(){
    this.$api.PersonalizedNewSong()
      .then( res => {
        this.List = res.data.result;
        let obj = this.storeId(this.List)
        this.songsList(obj)
      })
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
      obj.id = id;
      obj.alid = alid;
      obj.index = index;
      this.currentSong(obj)
      this.getSongUrl();
    },

    // 存储音乐id
    storeId(list){
      let arr = [];
      list.forEach((value,index) => {
        let obj = {}
        obj.id = value.id
        obj.song = value.name;
        obj.img = value.picUrl;
        obj.dt = value.song.duration;
        obj.durationTime = this.utils.formatTime(value.song.duration);
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
          console.log(res,this.songList.length)
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
    }
  }
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
          .el-icon-video-play{
            display: block;
          }
        }
        .index{
          width: 30px;
          margin-right: 20px;
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