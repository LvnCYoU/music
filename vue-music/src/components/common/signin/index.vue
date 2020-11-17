<template>
  <div class="login">
    <div class="login-wrap">
      <div class="wrapper">
        <div class="top">
          <div class="logo">
            <img src="../../../assets/logo-a.png" alt="nicemusic">
            <p>NiceMusic</p>
          </div>
          
        </div>
        <div class="center">
          <el-form :model="userMessage" ref="userMessage" :validate-on-rule-change="false">
            <el-form-item
              prop="phone"
              :rules="[
                { required: true, message: '手机号呢！'},
                { type: 'number', message: '起码是数字吧。。。'}
              ]"
            >
              <el-input 
                type="phone" 
                v-model.number="userMessage.phone" 
                autocomplete="off"
                maxlength="11"
              >
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
      <audio src="./mp3/Approaching Nirvana - You.mp3" autoplay></audio>
      <star />
    </div>
  </div>
</template>

<script>
import Star from '../star'
import {mapMutations} from 'vuex'
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
  components: {
    Star,
  },
  mounted(){
    this.init();
  },
  methods:{
    ...mapMutations(['CHANGE_STATUS']),
    
    init(){
      this.url = this.$route.fullPath.split('?')[1];
    },

    // 点击登录
    async submit(){
      let duration = 2000;
      if(this.userMessage.phone && this.userMessage.password){
        let reg = /^1[0-9]{10}$/.test(this.userMessage.phone);
        if(!reg){
          this.$Message({
            message: '请输入正确的手机号码',
            type: 'error',
            duration,
          })
        }else{
          await this.$api.PhoneLogin(this.userMessage.phone,this.userMessage.password)
            .then( res => {
              res.data.code > 200 && this.$Message({
                message: res.data.message,
                type: 'error',
                duration,
              })
              if(res.data.code === 200){
                this.CHANGE_STATUS(true);
                this.$Message({
                  message: '登陆成功',
                  type: 'success',
                  duration,
                })
                this.url ? this.$router.push({path: '/' + this.url}) : this.$router.push({path:'/home'})
              }
            }, () => {
              this.$Message({
                showClose: true,
                message: '用户不存在',
                type: 'error',
                duration,
              })
            })
        }
      }else{
        this.$Message({
          message: '请输入手机号或密码',
          type: 'error',
          duration,
        })
      }
        
    },
    
  }
}
</script>

<style lang="scss" scoped>
  .login{   
    .login-wrap{
      @include flex;
      flex-wrap: wrap;
      min-height: 100vh;
      overflow: hidden;

      .wrapper{
        @include shadow;
        width: 350px;
        height: 486px;
        background: url('../../../assets/logbg.jpg') #fff bottom no-repeat;
        border-radius: 8px;
        z-index: 9;
        opacity: .1;
        transition: opacity 1s ease;
        .top{
          margin-top: 44px;
          text-align: center;
          img{
            width: 55px;
          }
          p{
            margin: 0 0 45px;
          }
        }

        .center{
          margin: 0 27px;
          .el-form-item{
            .el-input input{
              height: 40px;
            }
            .el-button{
              width: 100%;
              background: #5dd5c8;
              color: #fff;
            }
          }
        }
        &:hover{
          opacity: 1;
        }
      }
    }
  }
</style>