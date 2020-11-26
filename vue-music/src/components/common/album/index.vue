<template>
  <div class="album">
    <div 
      class="item"
      v-for="item in list"
      :key="item.id"
      v-loading="loading"
    >
      <div class="cover">
        <el-image
          :src="item.picUrl"
          fit="cover"
          @load="num++">
        </el-image>
        <div class="type">
          <i class="el-icon-service"></i>
          <span>{{ item.type }}</span>
        </div>
      </div>
      <div class="info">
        <p class="name">{{ item.name }}</p>
        <p class="singer">{{ utils.getSinger(item.artists) }}</p>
        <p class="time">{{ utils.getYear(item.publishTime) }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      required: true,
    }
  },
  data(){
    return{
      num: 0,
      loading: true,
    }
  },
  watch: {
    num(val){
      val >= this.list.length - 2 ? 
        this.loading = false :
        this.loading = true;
    }
  }
}
</script>

<style lang="scss" scoped>
  .album{
    margin: 15px 0;
    display: flex;
    flex-wrap: wrap;
    .item{
      margin-right: 25px;
      padding: 0 15px 30px;
      flex: 0 0 20%;
      max-width: 20%;
      cursor: pointer;
      .cover{
        position: relative;
        .el-image{
          width: 200px;
        }
        &::after{
          content: "";
          position: absolute;
          z-index: -1;
          right: -10px;
          transform: translateY(-100%);
          width: 100%;
          height: 100%;
          background: url('../../../assets/img/cd.png') no-repeat center;
          transition: all .4s ease;
        }
        .type{
          @include flex;
          position: absolute;
          left: 2px;
          top: 3px;
          padding-left: 9px;
          height: 24px;
          font-size: 12px;
          background: url(https://img.alicdn.com/tfs/TB1xEGRub9YBuNjy0FgXXcxcXXa-268-48.png) no-repeat 0;
          background-size: cover;
          color: #fff;
          &:after{
            content: '';
            position: absolute;
            right: -14px;
            height: 24px;
            width: 14px;
            background: url(https://img.alicdn.com/tfs/TB1xEGRub9YBuNjy0FgXXcxcXXa-268-48.png) no-repeat 100%;
            background-size: cover;
          }
          i{
            margin-right: 5px;
          }
        }

      }
      .info{
        margin-top: 10px;
        font-size: 14px;
        p{
          @include ellipse;
          color: #999;
        }
        .name{
          color: #4a4a4a;
        }
      }
      &:hover{
        .cover{
          &::after{
            right: -40px;
          }
        }
        .type{
          color: $mainColor;
        }
        
      }
    }
  }
</style>