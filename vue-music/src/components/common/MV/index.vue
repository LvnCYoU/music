<template>
<div>
  <div class="mv" 
    ref="loading"
    v-if="list.length>1"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-background="#fff"
    :data="list"
    style="height: 100%; width: 100%"
    >
    <ul class="mv-list">
      <router-link 
        tag="li" 
        :to="{name:'singer-detail',query:{id:item.id}}"
        v-for="item in list"
        :key="item.name"
      >
        <div class="cover">
          <div class="img">
            <el-image 
              :src="item.cover || item.imgurl" 
              fit="cover" 
              @load="load"
              lazy
            >
            </el-image>
          </div>
          <div class="count">
            <i class="el-icon-caret-right"></i>
            <span>
              {{ utils.SimplifyPlayCount(item.count || item.playCount) }}
            </span>
          </div>
          <div class="action">
            <span class="flex-center">
              <i class="el-icon-caret-right"></i>
            </span>
          </div>
        </div>
        <div class="info">
          <h2 class="ellipsis">{{ item.name }}</h2>
        </div> 
      </router-link>
    </ul>
  </div>
  <div class="error" v-if="list.length==0">
    <p>暂未发布mv，去别处逛逛吧~</p>
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
    return {
      flag: false,
      num: 0,
      loading: true,
    }
  },
  methods: {
    load(){
      if (this.num >= this.list.length - 5) {
        this.loading = false;
        return
      }
      ++this.num;
    }
  }
}
</script>

<style lang="scss" scoped>
  .mv-list{
    margin: 0 -15px;
    padding: 15px 0;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    cursor: pointer;
    li{
      padding: 0 15px 30px;
      flex: 0 0 22%;
      max-width: 22%;
      .cover{
        position: relative;
        overflow: hidden;
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
            font-size: 14px;
          }
        }
        .img{
          transition: all .4s ease;
        }
      }
      .info{
        h2{
          display: block;
          line-height: 1.3;
          font-size: 14px;
          font-weight: 500;
        }
      }
      .action{
        position: absolute;
        top: 50%;
        left: 50%;
        display: none;
        transform: translate(-50%,-50%);
        span{
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: $mainColor;
          color: #fff;
          i{
            font-size: 22px; 
          }
        }
      }
      &:hover{
        .cover{
          .img{
            transform: scale(1.1);
          }
          .count{
            color: $mainColor;
          }
          .action{
            display: flex;
          }
        }
        .info{
          h2{
            color: #000;
          }
        }
      }
    }
  }
  .error{
    padding: 10px;
    padding-left: 0;
    p{
      font-size: 14px;
      color: #999;
    }
  }
</style>