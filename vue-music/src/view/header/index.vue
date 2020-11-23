<template>
  <el-header>
    <div class="header">
      <div class="container">
        <div class="left">
          <router-link tag="li" to="/home" class="logo">
            <img src="assets/img/logo_black.png" alt="">
          </router-link>
        </div>
        <ul class="main">
          <router-link to="/home" tag="a">发现音乐</router-link>
          <router-link to='/rank' tag='a'>排行榜</router-link>
          <router-link to='/songsheet' tag='a'>歌单</router-link>
          <router-link to='/singer' tag='a'>歌手</router-link>
          <router-link to='/video' tag='a'>视频</router-link>
          <router-link to='/mv' tag='a'>MV</router-link>
        </ul>       
        <el-row class="right">
          <div class="search">
            <search-input></search-input>
          </div>
          <div class="signin">
            <div class="wrapper">
              <router-link tag="a" to="/signin" v-show="!status">未登录</router-link>
              <el-dropdown size="small" v-show="status">
                <router-link :to='{name: "user",query:{id,}}'>
                  <img :src="url" class="user-img">
                </router-link>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item icon="el-icon-user">
                    <router-link tag="a" :to='{name: "user",query:{id,}}'>个人中心</router-link>
                  </el-dropdown-item>
                  <el-dropdown-item icon="el-icon-medal">个人等级</el-dropdown-item>
                  <el-dropdown-item icon="el-icon-setting">设置</el-dropdown-item>
                  <el-dropdown-item icon="el-icon-switch-button" @click.native="Logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div> 
        </el-row>
      </div>
    </div>

  </el-header>
</template>

<script>
import {mapMutations} from 'vuex'
import SearchInput from 'components/common/input'
export default {
  data(){
    return{
      url: '',
      search: '',
      id: '',
    }
  },
  components: {
    SearchInput,
  },
  computed: {
    status: {
      get(){
        return this.$store.state.status
      },
      set(){}
    },
  },


  mounted(){
    this.init();
  },

  methods:{
    ...mapMutations(['CHANGE_STATUS']),

    init(){
      this.Cookie();
    },
    
    // 退出登录
    async Logout(){
      await this.$api.Logout()
        .then( () => {
          this.CHANGE_STATUS(false);
          this.$route.path !== '/home' && this.$router.push({path: '/home'})
        })
    },

    // 获取登陆状态
    async Status(flag){
      flag && 
      await this.$api.LoginStatus()
      .then( res => { 
        let data = res.data.profile;
        this.url = data.avatarUrl;
        this.id = data.userId;
        console.log(res)
      })
      .catch( () => {
        return;
      })
      this.CHANGE_STATUS(flag);
    },

    // 查看cookie
    Cookie(){
       document.cookie.split(';').map(list => {
         list.split('=').some(item => {
           if(item == ' __remember_me'){
             this.Status(true)
             return true;
           }else{
             this.Status(false)
           }
         })
       })
    }
  }
}
</script>

<style lang="scss" scoped>
  .el-header{
    @include shadow;
    .header{
      position: fixed;
      top: 0;
      right: 0;
      left: 0;
      width: 100%;
      z-index: 9;
      background: #fff;
    }
    .container{
      display: flex;
      .left{
        @include flex;
        margin-right: 40px;       
        .logo{
          @include flex;
          height: 100%;
          cursor: pointer;
        }   
      }   
      
      .main{
        display: flex;
        height: 60px;
        line-height: 60px;
        color: #909399;
        align-items: center;
        a{
          margin-right: 40px;
          cursor: pointer;
          border-bottom: 2px solid transparent;
          color: #909399;
          &:hover{
            color: #303133;
          }
          &.router-link-active{
            color: $mainColor;
            border-bottom-color: $mainColor;
          }
        }
      }

      .right{
        position: absolute;
        right: 0;
        top: 10px;
        display: flex;
        .search{
          height: 40px;
        }
        .signin{
          @include flex;
          padding-right: 60px;
          .wrapper{
            width: 50px;
            a{
              color: #909399;
              &:hover{
                color: #303133;
              }
            }
            .el-dropdown{
              @include flex;
              a{
                @include flex;
              }
              .user-img{
                height: 30px;
                border-radius: 50%;
                cursor: pointer;
              }
            }
          }
        }
      }
    }
  }
  .el-dropdown-menu{
    hr,a{
      color: #606266;
    }
    .el-dropdown-menu__item{
      &:last-of-type{
        margin-top: 6px;
        padding-top: 5px;
        border-top: 1px solid #ebeef5;
      }
      &:hover{
        background: none;
        color: #fa2800;
        a{
          color: #fa2800;
        }

      }

    }
  }
</style>