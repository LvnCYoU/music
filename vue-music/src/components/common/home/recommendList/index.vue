<template>
  <div class="recommend-playlist">
    <h2 class="title">推荐歌单</h2>
    <div class="playlist">
      <div class="item" v-for="(item,index) in playlist" :key=item.id>
        <div class="wrapper">
          <router-link tag="a" :to="{name:'playlist-detail',query:{id:item.id}}">
            <div class="cover">
              <div class="img" :key="index">
                <el-image :src="item.picUrl" fit="cover" lazy></el-image>
              </div>
              <div class="count" :key="item.trackCount">
                <i class="el-icon-service"></i>
                <span>{{ utils.SimplifyPlayCount(item.playCount) }}</span>
              </div>
            </div>
          </router-link>
        </div>
        <div class="info">
          <h2>{{ item.name }}</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      playlist: [],
    }
  },
  created(){
    this.$api.Personalized(24)
    .then( res => {
      this.playlist = res.data.result;
    })
  }
}
</script>

<style lang="scss" scoped>
.recommend-playlist{
  margin-top: 40px;
  h2{
    margin: 0;
    font-size: 16px;
    color: #4a4a4a;
  }
  .title{
    margin: 0 0 10px 0;
  }
  .playlist{
    display: flex;
    flex-wrap: wrap;
    margin: 0 -20px;
    .item{
      flex: 0 0 10.1%;
      max-width: 10.1%;
      padding: 15px 15px;
      margin-top: 10px;
      cursor: pointer;
      &:hover{
        .wrapper{
          .cover{
            .img{
              top: -3px;
              &::before,&::after{
                opacity: 1;
              }
            }
            .count{
              top: -2px;
              color: #fa2800;
            }
          }
        }
        .info{
          h2{
            color: #303133;
          }
        }
      }
      .wrapper{
        position: relative;
        padding-right: 10px;
        .cover{
          position: relative;
          padding-top: 100%;
          border-radius: 2px;
          .img{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 4px;
            &::before,&::after{
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              box-shadow: 2px 2px 20px rgba(0,0,0,.3);
              opacity: 0;
            }
          }
          .count{
            position: absolute;
            right: 16px;
            top: 1px;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 24px;
            line-height: 24px;
            padding-left: 9px;
            background: url(https://img.alicdn.com/tfs/TB1xEGRub9YBuNjy0FgXXcxcXXa-268-48.png) no-repeat 0;
            background-size: cover;
            color: #fff;
            font-size: 12px;
            font-weight: 700px;
            &:after{
              content: '';
              position: absolute;
              right: -14px;
              top: 0;
              height: 24px;
              width: 14px;
              background: url(https://img.alicdn.com/tfs/TB1xEGRub9YBuNjy0FgXXcxcXXa-268-48.png) no-repeat 100%;
              background-size: cover;
            }
            i{
              margin-right: 2px;
            }
          }
          .img,.count{
            transition: all 0.3s ease;
          }
        }
      }
      .info{
        margin-top: 10px;
        h2{
          font-size: 14px;
          overflow: hidden;
          line-height: 18px;
          color: #909399;
        }
      }
    }
  }
}
</style>