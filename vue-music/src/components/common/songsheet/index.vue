<template>
  <div 
    :class="'playlist ' + limit" 
    v-loading="loading"
    :data="songLists"
    element-loading-background="#fff"
    element-loading-text="拼命加载中"
    v-show="songLists"
  >
    <div 
      class="item"
      v-for="item in songLists" 
      :key="item.name+item.id"
    >
      <div class="wrapper">
        <router-link tag="a" :to="{name:'songsheet-detail',query:{id:item.id}}">
          <div class="cover">
            <div class="img">
              <el-image 
                :src="item.coverImgUrl || item.picUrl" 
                fit="cover" 
                lazy
                @load="load"
              >
              </el-image>
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
</template>

<script>
export default {
  props: {
    songLists: {
      type: Array,
      required: true,
    },
    limit: {
      type: String,
      required: false,
    }
  },
  watch: {
    songLists(){
      this.loading = true;
      this.len = 0;
    }
  },  
  data(){
    return{
      loading: true,
      len: 1,
    }
  },
  methods: {
    load(){
      this.len >= this.songLists.length / 2 ? 
      this.loading = false : this.len++;
      return;
    }
  }
}
</script>

<style lang="scss" scoped>
  .playlist{
    display: flex;
    flex-wrap: wrap;
    width: 100%;
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
              color: $mainColor;
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
        padding-right: 10px;
        .cover{
          position: relative;
          padding-top: 100%;
          border-radius: 2px;
          .el-image{
            width: 100%;
            height: 100%;
          }
          .img{
            @extend .el-image;
            position: absolute;
            top: 0;
            left: 0;
            border-radius: 4px;
            &::before,&::after{
              @extend .el-image;
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              box-shadow: 2px 2px 20px rgba(0,0,0,.3);
              opacity: 0;
            }
          }
          .count{
            position: absolute;
            right: 16px;
            top: 1px;
            padding-left: 9px;
            line-height: 24px;
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
          line-height: 18px;
          color: #909399;
        }
      }
    }
    &.two{
      @include right;
      .item{
        flex: 0 0 40.1%;
        max-width: 40.1%;
      }
    }
  }

  
</style>