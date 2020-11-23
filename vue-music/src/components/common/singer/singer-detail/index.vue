<template>
  <div class="singer-detail">
    <div class="container">
      <div class="singer-info">
        <div class="cover">
          <el-image
            :src="info.picUrl"
            fit="cover"
          >
          </el-image>
        </div>
        <div class="info">
          <div class="name">
            <h1>{{ info.name }}</h1>
          </div>
          <div class="des">
            <span>{{ info.desc }}</span>
          </div>
          <ul class="works">
            <li class="item">
              <span @click="jump('song')">单曲 <strong>{{ info.music }}</strong></span>
            </li>
            <li class="item">
              <span @click="jump('album')">专辑 <strong>{{ info.album }}</strong></span>
            </li>
            <li class="item">
              <span @click="jump('mv')">MV <strong>{{ info.mv }}</strong></span>
            </li>
          </ul>
        </div>
      </div>
      <div class="song" id="song">
        <header class="title">
          <h2>热门歌曲</h2>
        </header>
        <song-list :songLists="songList" />
      </div>
      <div class="album" id="album">
        <header class="title">
          <h2>专辑</h2>
        </header>
        <album :list="album" />
      </div>
      <div class="mv" id="mv">
        <header class="title">
          <h2>MV</h2>
        </header>
        <mv :list="mv" />
      </div>
      <div class="simi">
        <header class="title">
          <h2>相似歌手</h2>
        </header>
        <singer :artist="simi" />
      </div>
    </div>
  </div>
</template>

<script>
import SongList from 'components/common/song-list'
import Album from 'components/common/album'
import Singer from 'components/common/singer'
import Mv from 'components/common/MV'
export default {
  data(){
    return{
      id: this.$route.query.id,
      info: {},
      song: [],
      songList: [],
      album: [],
      artist: [],
      mv: [],
      simi: [],
    }
  },
  components:{
    SongList,
    Album,
    Singer,
    Mv,
  },
  mounted(){
    this.init();
  },
  methods: {
    init(){
      console.log(this.$route)
      this.$nextTick( ()  => {
        this.getSong(); 
        this.getSingerAlbum(); 
        this.getSingerMv();
        this.getSimiSinger();
      })
      
    },

    // 获取歌手单曲
    async getSong(){
      await this.$api.Artists(this.id)
        .then(res => {
          this.songList = res.data.hotSongs;
          let artist = res.data.artist;
          this.getSingerInfo(artist);
        })
        this.song = this.songList.slice(0,10)
    },

    // 获取歌手专辑
    async getSingerAlbum(){
      let params = {
        id: this.id,
        limit: 4,
      }
      await this.$api.ArtistAlbum(params)
        .then(res => {
          this.album = res.data.hotAlbums;
        })
    },

    // 获取歌手mv
    async getSingerMv(){
      await this.$api.ArtistMv(this.id)
        .then(res => {
          this.mv = res.data.mvs.slice(0,4);
        })
    },

    // 获取相似歌手
    async getSimiSinger(){
      await this.$api.SimiArtist(this.id)
        .then(res => {
          console.log(res)
          this.simi = res.data.artists.slice(0,8);
        })
    },

    // 获取歌手基本信息
    getSingerInfo(artist){
      this.info = {
        name: artist.name,
        picUrl: artist.picUrl,
        desc: artist.briefDesc,
        album: artist.albumSize,
        music: artist.musicSize,
        mv: artist.mvSize,
      }
    },

    // 跳转至锚点
    jump(dom){
      document.querySelector(`#${dom}`).scrollIntoView(true);
    }
  }
}
</script>

<style lang="scss" scoped>
  .singer-info{
    @include shadow;
    margin: 40px 0;
    padding: 20px 0 10px 20px;
    display: flex;
    .cover{
      margin-right: 100px;
      width: 250px;
      height: 250px;
      .el-image{
        border-radius: 50%;
      }
    }
    .info{
      flex: 1;
      padding-right: 20px;
      .name{
        margin-bottom: 10px;
        h1{
          font-weight: 500;
          font-size: 38px;
        }
      }
      .des{
        margin-bottom: 10px;
        font-size: 14px;
      }
      .works{
        display: flex;
        .item{
          padding-right: 10px;
          margin-right: 10px;
          border-right: 1px solid #4a4a4a;
          cursor: pointer;
          span{
            font-size: 18px;
            strong{
              font-size: 25px;
              font-weight: 500;
            }
          }
          &:last-child{
            border-right: none;
          }
          &:hover{
            color: $mainColor;
          }
        }

      }
    }
  }
  .song,.album,.mv,.simi{
    @include shadow;
    margin-bottom: 20px;
    padding: 10px 0 0 10px;
    .title{
      height: 58px;
      line-height: 58px;
      h2{
        font-weight: 500;
      }
    }
  }
</style>