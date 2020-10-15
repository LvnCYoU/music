<template>
  <el-header>
      <div class="container">
        <div class="left">
          <router-link tag="li" to="/" class="logo"><a></a></router-link>
        </div>
        <ul class="main">
          <router-link to="/home" tag="a">发现音乐</router-link>
          <router-link to='/rank' tag='a'>排行榜</router-link>
          <router-link to='/playlist' tag='a'>歌单</router-link>
          <router-link to='/singer' tag='a'>歌手</router-link>
          <router-link to='/video' tag='a'>视频</router-link>
          <router-link to='/mv' tag='a'>MV</router-link>
        </ul>

        
        
        <el-row class="right">
          <div class="input">
            <el-input
              placeholder="请输入内容"
              >
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-input>
          </div>
          <div class="signin">
            <router-link tag="a" to="/signin" v-show="!status">未登录</router-link>
            
            <el-dropdown size="small" v-show="status">
              <router-link to="/user">
                <img ref="userImg" class="user-img">
              </router-link>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-user">
                  <router-link tag="a" to="/user">个人中心</router-link>
                </el-dropdown-item>
                <el-dropdown-item icon="el-icon-medal">个人等级</el-dropdown-item>
                <el-dropdown-item icon="el-icon-setting">设置</el-dropdown-item>
                <el-dropdown-item icon="el-icon-switch-button" @click.native="Logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div> 
        </el-row>
      </div>
  </el-header>
</template>

<script>
export default {
  data(){
    return{
      nowPath: '',
      url: '',
      cookie: [],
    }
  },
  computed: {
    status: {
      get(){
        return this.$store.state.status
      },
      set(){}
    },

  },
  beforeCreate(){
    this.$api.LoginStatus()
      .then( res => {
        this.url = res.data.profile.avatarUrl;
        this.$store.commit('Uid',res.data.profile.userId);
      })
      .catch( () => {
        return;
      })
  },
  created(){
    if(!this.status){
      let arr = [],
          len;
      arr = document.cookie.split('; ');
      len = arr.length;
      for(let i = 0; i < len; i++){
        this.cookie = arr[i].split('=')
        if(this.cookie[0] == '__remember_me'){
          return this.$store.commit('changeStatus');
        }else{
          this.cookie = [];
        }
      }
    }
    
  },
  mounted(){
    this.status && setTimeout(() => {
      this.$refs.userImg.src = this.url
    }, 1000);
  },
  updated(){
    this.$api.LoginRefresh()
      .then( () => {
        this.$refs.userImg.src = this.url
      })
      .catch( () => {
        console.log('LoginRefresh')
        return this.status = false;
      })
  },
  methods:{
    changeRouter(event){
      let path = this.$router.options.routes;
      console.log(path,event.target)
    },
    Logout(){
      console.log(this.$route)
      this.$api.Logout()
        .then( () => {
          this.$store.commit('changeStatus');
          this.$store.commit('Uid','');
          this.$route.path !== '/home' && this.$router.push({path: '/home'})
        })
        .catch(()=> {
          console.log('Logout')
        })
    }
  }
}
</script>

<style lang="scss" scoped>
  .el-header{
    .container{
      position: relative;
      display: flex;
      width: 100%;
      height: 100%;

      .left{
        margin-right: 40px;
        width: 146px;
        height: 60px;
        line-height: 60px;
        
        .logo{
          display: inline-block;
          width: 146px;
          height: 26px;
          vertical-align: middle;
          background-image: url('../../assets/logo_black.png');
          background-position: 0;
          background-repeat: no-repeat;
          background-size: cover;
        }   
      }   
      
      .main{
        display: flex;
        width: 60%;
        height: 60px;
        line-height: 60px;
        font-size: 14px;
        color: #909399;

        a{
          margin-right: 40px;
          cursor: pointer;
          border-bottom: 2px solid transparent;
          color: #909399;
          &:hover{
            color: #303133;
          }
          &.router-link-active{
            color: #fa2800;
            border-bottom-color: #fa2800
          }
        }
      }

      .right{
        position: absolute;
        right: 0;
        top: 10px;
        display: flex;
        &:focus{
          outline: 0;
        }

        .input{
          padding-right: 40px;
          width: 158px;
        }

        .signin{
          display: flex;
          padding-right: 20px;
          height: 40px; 
          line-height: 40px;
          text-align: center;

          a{
            width: 60px;
            margin-right: 40px;
            height: 40px;
            font-size: 14px;
            color: #909399;
            &:hover{
              color: #303133;
            }
          }
          .el-dropdown{
            display: flex;
            width: 60px;
            margin-right: 40px;
            height: 40px;
            line-height: 40px;
            align-items: center;
            justify-content: center;
            text-align: center;

            a{
              display: flex;
              align-items: center;
              margin-right: 0;
              width: 30px;
            }
            .user-img{
              display: inline-block;
              height: 30px;
              line-height: 30px;
              border-radius: 50%;
              cursor: pointer;
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