<template>
  <div class="app">
    <div class="login-wrap">
      <div class="login">
        <div class="top">
          <div class="logo">
            <img src="../../../assets/logo-a.png" alt="nicemusic">
            <p>NiceMusic</p>
          </div>
          
        </div>
        <div class="center">
          <el-form :model="userMessage" ref="userMessage" class="" :validate-on-rule-change="false">
            <el-form-item
              prop="phone"
              :rules="[
                { required: true, message: '手机号呢！'},
                { type: 'number', message: '起码是数字吧。。。'}
              ]"
            >
            <el-input type="phone" 
              v-model.number="userMessage.phone" 
              autocomplete="off">
                <i slot="prefix" class="el-input__icon el-icon-phone"></i>
              </el-input>
            </el-form-item>
            <el-form-item
              prop="password"
              :rules="[
                { required: true, message: '密码呢！'},
              ]"
            >
            <el-input type="password" 
              v-model="userMessage.password" 
              autocomplete="off">
                <i slot="prefix" class="el-input__icon el-icon-lock"></i>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="submit">登录</el-button>
            </el-form-item> 
          </el-form>
        </div>        
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      userMessage: {
        phone: '',
        password: '',
        url: '',
      }
    }
  },
  computed: {
    count(){
      return this.$store.state.status;
    },
  },
  created(){
    this.url = this.$route.fullPath.split('?')[1];
  },
  methods:{
    submit(){
      let reg = /^1[0-9]{10}$/.test(this.userMessage.phone);
      this.userMessage.phone && this.userMessage.password
        if(!reg){
          this.$Message({
            message: '请输入正确的手机号码',
            type: 'error',
            duration: 2000
          })
        }else{
          this.$api.PhoneLogin(this.userMessage.phone,this.userMessage.password)
            .then( res => {
              res.data.code > 200 && this.$Message({
                message: res.data.message,
                type: 'error',
                duration: 2000,
              })
              if(res.data.code === 200){
                this.$store.commit('changeStatus');
                this.$store.commit('Uid',res.data.account.id);
                this.$Message({
                  message: '登陆成功',
                  type: 'success',
                  duration: 2000,
                })
                if(this.url){
                  this.$router.push({path: '/' + this.url})
                }else this.$router.push({path:'/home'})
              }
            }, () => {
              this.$Message({
                showClose: true,
                message: '用户不存在',
                type: 'error',
                duration: 2000
              })
            })
        }
    },
    
  }
}
</script>

<style lang="scss" scoped>
  .app{   
    width: 100%;
    height: 100%;

    .login-wrap{
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      height: 100%;
      background: #5dd5c8 url('../../../assets/newbg1.png') bottom no-repeat;
      background-size: cover;
      overflow: hidden;

      .login{
        width: 350px;
        height: 486px;
        background: url('../../../assets/logbg.jpg') #fff bottom no-repeat;
        border-radius: 8px;
        box-shadow: 1px 2px 15px rgba(0,0,0,.3);
        
        .top{
          margin-top: 44px;
          text-align: center;
          img{
            width: 55px;
          }
          p{
            margin: 0 0 45px;
            font-size: 14px;
            
          }
        }

        .center{
          margin: 0 27px;
          .el-form-item{
            .el-button{
              width: 100%;
              background: #5dd5c8;
              color: #fff;
            }
          }
        }
      }
    }
  }
</style>