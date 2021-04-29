<template>
  <div class="user">
    <div class="container">
      <div class="left">
        <div class="user-detail" v-if="info.profile">
          <div class="user-img">
            <img :src="info.profile.avatarUrl" class="user-img" >
          </div>
          <div class="user-message">
            <div class="user-name">
              <div>
                <h2>
                  <span class="name">{{ userName }}</span>
                  <span class="level">
                    <i class="el-icon-medal"></i>
                    <p>Lv{{ info.level }}</p>
                  </span>
                </h2>
              </div>
              
            </div>
            <ul class="user-tab-box">
              <router-link tag="li" to="/gender">
                <strong>{{ info.profile.gender }}</strong>
                <span>动态</span>
              </router-link>
              <router-link tag="li" to="/user/follows">
                <strong>{{ info.profile.follows }}</strong>
                <span>关注</span>
              </router-link>
              <router-link tag="li" to="/user/followeds">
                <strong>{{ info.profile.followeds }}</strong>
                <span>粉丝</span>
              </router-link>
            </ul>
            <div class="user-address inf">
              <span>所在地区: {{ province + '-' + city }}</span>
            </div>
          </div> 
        </div>
        <div class="song-rank">
          <div class="title">
            <h2>
              听歌排行
              <small>累计听歌{{ info.listenSongs }}首</small>
            </h2>
            <div class="btn">
              <span 
                :class="time ? 'is-active' : ''"
                @click="changeTime(true)"
              >
                最近一周
              </span>
              <span 
                :class="!time ? 'is-active' : ''"
                @click="changeTime(false)"
              >
                所有时间
              </span>
            </div>
          </div>
          <song-list :songLists="songlist"></song-list>
        </div>
      </div>
      <div class="right">
        <user-playlist :userName="userName"></user-playlist>
      </div>
    </div>
  </div>
</template>

<script>
import SongList from '../song-list'
import UserPlaylist from './user-playlist'
export default {
  data(){
    return {
      info: {},
      time: true,
      type: 1,
      id: this.$route.query.id,
      songlist: [],
      userName: '',
      province: '',
      city: '',
    }
  },
  components: {
    SongList,
    UserPlaylist,
  },
  watch: {
    $route(to){
      this.id = to.query.id;
      this.init();
    }
  },
  mounted(){
    this.init();
  },
  methods: {
    init(){
      this.$nextTick( () => {
        this.getUser();
        this.getUserRecord();
      })
    },

    // 获取用户信息
    async getUser(){
      await this.$api.UserDetail(this.id)
        .then(res => {
          this.info = res.data;
          this.userName = this.info.profile.nickname;
          this.province = this.info.profile.province;
          this.city = this.info.profile.city;
          this.province && this.getArea();
        }) 
      
    },


    // 获取用户播放记录
    async getUserRecord(){
      await this.$api.UserRecord({
        uid: this.id,
        type: this.type,
      })
        .then(res => {
          this.songlist = res.data.weekData || res.data.allData;
        })
    },

    // 改变听歌排行
    changeTime(flag){
      if(flag == this.time) return
      if(flag){
        this.type = 1;
      }else{
        this.type = 0;
      }
      this.songlist.length = 0;
      this.time = flag;
      this.getUserRecord();
    },

    // 获取用户所在地区
    async getArea(){
      await this.$api.getDistrict(this.province)
        .then(res => {
          let data = res.data.districts[0]
          this.province = data.name;
          data.districts.some(list => {
            if(list.adcode == this.city){
              this.city = list.name;
              return true;
            }
          })
        })
    }
  }
}
</script>

<style lang="scss" scoped>
  .container{
    display: flex;
    padding: 40px;
  }
  .left{
    @include shadow;
    @include left;
    .user-detail{
      display: flex;
      margin-bottom: 43px;
      .user-img{
        width: 188px;
        margin-right: 40px;
        img{
          display: block;
          padding: 3px;
          width: 180px;
          background: #fff;
          border: 1px solid #d5d5d5
        }
      }

      .user-message{
        width: 670px;
        .user-name{
          padding-bottom: 12px;
          margin-bottom: 10px;
          border-bottom: 1px solid #ddd;
          display: flex;
          justify-content: space-between;
          h2{
            margin: 0;
            display: flex;
            padding-bottom: 3px;
            justify-content: center;
            align-items: center;
            .name{
              float: left;
              margin-top: 3px;
              font-size: 22px;
              font-weight: normal;
              line-height: 30px;
            }
            .level{
              float: left;
              margin-top: 2px;
              margin-left: 5px;
              color: #fa2800;
              font-size: 16px;
              p{
                display: inline-block;
                margin: 0;
                font-weight: 500;
              }
            }
          }
        }
        .user-tab-box{
          display: flex;
          height: 41px;
          margin-bottom: 15px;
          color: #666;
          li{
            padding: 0 40px 0 20px;
            border-left: 1px solid #ddd;
            cursor: pointer;
            &:first-of-type{
              padding-left: 0;
              border-left: none;
            }
            &:hover{
              color: #0c7372;
            }
            strong{
              display: block;
              margin-top: -4px;
              font-size: 24px;
              font-weight: normal;
            }
            span{
              display: block;
              text-indent: 2px;
              font-size: 12px;
            }
          }
        }
        .inf{
          margin-bottom: 5px;
          line-height: 21px;
          span{
            color: #666;
            font-size: 12px;
          }
        }
      }
    }
    .song-rank{
      .title{
        margin-bottom: 10px;
        display: flex;
        justify-content: space-between;
        h2{
          padding-left: 20px;
          font-size: 14px;
          color: #666;
          font-weight: 500;
          border-left: 2px solid $mainColor;
        }
        .btn{
          margin-right: 10px;
          font-size: 14px;
          span{
            cursor: pointer;
          }
          .is-active{
            color: $mainColor;
          }
          span:last-child{
            padding-left: 5px;
            border-left: 1px solid #666;
          }
        }
      }
    }
  }
  .right{
    @include right;
  }
    
</style>