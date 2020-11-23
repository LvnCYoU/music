<template>
  <div class="footer">
    <div class="container">
      <div class="top">
        <div class="init">
          <p class="title">nicemusic</p>
          <p class="desc">nicemusic</p>
        </div>
        <div class="info">
        </div>
      </div>
      <div class="center">
        <div class="icon">
          <a href="#">
            <i class="iconfont icon-wangyiyunyinle"></i>
          </a>
          <a href="#">
            <i class="iconfont icon-github"></i>
          </a>
        </div>
      </div>
      
    </div>
    <div class="copy">
      <div class="container">
        <p>Copyright ...</p>
         <span>布局参考:
            <a href="http://nicenav.cn/public/desktop-music/?Rewrite#/home">
            nicemusic</a>
          </span>
          <span>感谢Binaryify提供api</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="scss" scoped>
  .footer{
    margin-top: 50px;
    width: 100%;
    height: 230px;
    background: #161e27;
    .container{
      margin: 0 3rem;
      padding: 3vh 0;
      .top{
        display: flex;
      }
      .title{
        font-size: .9375rem;
        letter-spacing: 1px;
        color: #fff;
        margin-bottom: 1rem;
        padding: 0 1rem;
        border-left: 2px solid #fa2800;
      }
    }
    .copy{
      padding: 1.5rem 0;
      border-top: 1px solid #232a31;
      .container{
        padding: 0;
        display: flex;
        p{
          margin-right: 10px;
        }
        span{
          margin-right: 10px;
          a{
            transition: all .5s ease;
            color: #4a4a4a;
            &:hover{
              color: #fff;
            }
          }
        }
      }
    }
  }
  .center{
    margin-top: 20px;

    a{
      margin-right: 5px;
      display: inline-block;
      width: 30px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      border-radius: 50%;
      background-color: #232a31;
      transition: all .3s ease;
      &:hover{
        background-color: #000;
        i{
          color: #fff;
        }
      }
      i{
        color: #637799;
      }
    }
  }

</style>