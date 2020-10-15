<template>
  <div id="app">
    <div class="container">
      <div class="user-main">
        <div class="user-detail">
          <div class="user-img">
            <img :src="url" class="user-img">
          </div>
          <div class="user-message">
            <div class="user-name">
              <div>
                <h2>
                  <span class="name">{{ name }}</span>
                  <span class="level">
                    <i class="el-icon-medal"></i>
                    <p>Lv{{ level }}</p>
                  </span>
                </h2>
              </div>
              
            </div>
            <ul class="user-tab-box">
              <router-link tag="li" to="/user/gender">
                <strong>{{ gender }}</strong>
                <span>动态</span>
              </router-link>
              <router-link tag="li" to="/user/follows">
                <strong>{{ follows }}</strong>
                <span>关注</span>
              </router-link>
              <router-link tag="li" to="/user/followeds">
                <strong>{{ followeds }}</strong>
                <span>粉丝</span>
              </router-link>
            </ul>
            <div class="user-address inf">
              <span>所在地区: {{ address }}</span>
            </div>
          </div> 
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      url: '',
      name: '',
      level: '',
      gender: '',
      follows: null,
      followeds: null,
      address: '-',
    }
  },
  created(){
    this.$api.UserDetail(this.$store.state.uid)
      .then(res => {
        this.url = res.data.profile.avatarUrl;
        this.name = res.data.profile.nickname;
        this.level = res.data.level;
        this.gender = res.data.profile.gender;
        this.follows = res.data.profile.follows;
        this.followeds = res.data.profile.followeds;
        console.log(res)
      }) 
      this.$api.UserSubcount()
        .then(res => {
          console.log(res)
        })
  }
}
</script>

<style lang="scss" scoped>
  .container{
    padding: 40px;
  }
  .user-main{
    background: #f5f5f5;

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
  }
</style>