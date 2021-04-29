<template>
  <div class="songsheet-detail shadow">
    <div class="container">
      <div class="left">
        <div class="top">
          <div class="cover">
            <img :src="playlist.coverImgUrl">
          </div>
          <div class="info">
            <div class="title">
              <span>{{ playlist.name }}</span>
            </div>
            <div class="user">
              <div class="cover">
                <img :src="user.avatarUrl">
              </div>
              <div class="info">
                <span class="nickname">{{ user.nickname }}</span>
                <span class="create-time">{{ utils.getYear(playlist.createTime) }}创建</span>
              </div>
            </div>
            <div class="tag" v-if="playlist.tag">
              <span>标签:</span>
              <router-link 
                tag="a" 
                :to="'/songsheet?cat=' + item" 
                v-for="item in playlist.tags" 
                :key="item">
                {{ item || '' }}
              </router-link>
            </div>
            <div class="desc">
              <p ref="des"></p>
              <div class="btn" @click="ellipsis" v-if="des.length >= 50">
                <span v-show="show">收起</span>
                <span v-show="!show">展开</span>
                <i 
                  :class="show ? 'iconfont icon-right-arrow is-active' :
                  'iconfont icon-right-arrow'">
                </i>
              </div>
            </div>
          </div>
        </div>
        <div class="content">
          <div class="tool">
            <div class="item" @click="showPlayer">
              <i class="iconfont icon-nextbtn"></i>
              <span>播放全部</span>
            </div>
            <div class="item">
              <i class="iconfont icon-xinaixin3"></i>
              <span>收藏</span>
            </div>
          </div>
          <song-list :songLists="songList"/> 
        </div>
      </div>
      <div class="right">
        <user-like></user-like>
        <related-playlist></related-playlist>
        <comment-playlist></comment-playlist>
      </div>
    </div>
  </div>
</template>

<script>
import SongList from '../../song-list'
import UserLike from '../../user-like'
import RelatedPlaylist from '../../related-playlist'
import CommentPlaylist from '../../comment/comment-playlist'
import {mapGetters,mapActions,mapState} from 'vuex'
export default {
  data(){
    return{
      playlist: {},
      user: {},
      songList: [],
      des: '',
      show: true,
    }
  },
  components: {
    SongList,
    UserLike,
    RelatedPlaylist,
    CommentPlaylist,
  },
  computed: {
    ...mapState(['audio']),
    ...mapGetters(['getSongId','getCurrentSong']),
  },
  mounted(){
    this.$nextTick( () => {
      this.init();
    })
  },
  destroyed(){
    this.playlist = {};
    this.user = {};
  },
  methods: {
    ...mapActions(['currentSong','songsList']),
    init(){
      this.getSongSheetDetail();
    },
    
    // 获取歌单详情信息
    async getSongSheetDetail(){
      let id = this.$route.query.id;
      let str = '';
      await this.$api.PlaylistDetail({id,})
        .then(res => {
          this.playlist = res.data.playlist;
          this.user = res.data.playlist.creator;
          this.des = res.data.playlist.description;
          this.songList = res.data.playlist.trackIds;
        })
      this.ellipsis();
      str = this.utils.MusicId(this.songList);
      this.getSongDetail(str);
    },


    // 歌单详情介绍省略
    ellipsis(){
      if(this.des.length >= 50){
        this.show ?
          this.$refs.des.innerHTML = this.des.substring(0,50) + '...' :
          this.$refs.des.innerHTML = this.des;
        this.show = !this.show;
      }
    },

    // 获取音乐详情
    async getSongDetail(id){
      await this.$api.SongDetail(id)
        .then( res => {
          this.songList = res.data.songs;
        })
    },

    // 开启播放组件
    showPlayer(){
      let songList = this.utils.storeId(this.songList)
      let index = 0;
      let obj = {
        id: this.songList[index].id,
        alid: this.songList[index].al.id,
        index,
      }
      this.getSongId(this.songList[index].id)
      this.currentSong(obj)
      this.songsList(songList);
      this.audio.paused && this.audio.play();
    },


  }
}
</script>

<style lang="scss" scoped>
  .songsheet-detail{
    @include minHeight;
    padding: 20px 0;
    display: flex;
    align-items: flex-start;
    .container{
      display: flex;
      .left{
        @include left;
        @include shadow;
        .top{
          display: flex;
          .cover{
            width: 200px;
            height: 200px;
            border-radius: 8px;
            margin-right: 30px;
            flex-shrink: 0;
            img{
              width: 100%;
              height: 100%;
              border-radius: 8px;
            }
          }
          .info{
            display: flex;
            flex-direction: column;
            justify-content: center;
            .title{
              margin-bottom: 20px;
              margin-top: 10px;
              width: 100%;
              line-height: 24px;
              font-size: 24px;
              font-weight: 700;
              overflow: hidden;
            }
            .user{
              display: flex;
              margin-bottom: 15px;
              flex-direction: row;
              .cover{
                width: 30px;
                height: 30px;
                border-radius: 50%;
                position: relative;
                margin-right: 15px;
                cursor: pointer;
                img{
                  border-radius: 50%;
                }
              }
              .info{
                margin-right: 30px;
                display: flex;
                align-items: center;
                flex-direction: row;
                font-size: 14px;
                .nickname{
                  margin-right: 30px;
                  cursor: pointer;
                  &:hover{
                    color: $mainColor;
                  }
                }
                .create-time{
                  color: grey;
                }
              }
            }
            .tag{
              display: flex;
              flex-direction: row;
              align-items: center;
              span{
                margin-right: 20px;
                font-size: 14px;
              }
              a{
                margin-right: 15px;
                padding: 4px 12px;
                border-radius: 15px;
                font-size: 12px;
                color: #fff;
                background: $mainColor;
                cursor: pointer;
              }
            }
            .desc{
              margin-top: 15px;
              display: flex;
              flex-direction: column;
              width: 300px;
              overflow: hidden;
              text-overflow: ellipsis;
              transition: all 1s ease;
              p{
                line-height: 1.6;
                font-weight: 400;
                flex: 1;
                font-size: 14px;
              }
              .btn{
                width: 50px;
                font-size: 14px;
                color: $mainColor;
                cursor: pointer;
                i{
                  display: inline-block;
                  font-size: 16px;
                  font-weight: 700;
                  transform: translateY(1px) rotate(90deg);
                  transition: all 1s ease;
                  &.is-active{
                    transform: translateY(1px) rotate(-90deg);
                  }
                }
              }
            }
          }
        }
        .content{
          margin-top: 20px;
          .tool{
            margin: 15px 0;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            .item{
              margin-left: 15px;
              padding: 7px 15px;
              display: flex;
              align-items: center;
              justify-content: center;
              border-radius: 50px;
              background: #f2f2f2;
              color: #333;
              font-size: 14px;
              cursor: pointer;
              i{
                margin-right: 5px;
                font-size: 12px;
              }

              &:first-child{
                background: $mainColor;
                color: #fff;
              }
            }
          }
        }
      }
      .right{
       @include right;
      }
    }
  }
  
</style>