<template>
  <div class="user-like" v-show="show">
    <header class="title">
      <span>喜欢这个歌单的人</span>
    </header>
    <ul class="user">
      <li v-for="item in user" :key="item.userId" @click="UserId(item.userId)">
        <el-image 
          :src="item.avatarUrl" 
          fit="fill"
          :title="item.nickname"
        >
        </el-image>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data(){
    return{
      show: true,
      user: [],
      params: {
        id: null,
        limit: 18,
      }
    }
  },
  mounted(){
    this.init();
  },
  methods: {
    init(){
      this.getUserLike();
    },

    // 获取喜欢该歌单得其他用户信息
    async getUserLike(){
      this.params.id = this.$route.query.id;
      await this.$api.PlaylistSubscribers(this.params)
        .then( res => {
          this.user = res.data.subscribers;
          console.log(this.user.length > 0)
          
        })
      if(!this.user.length){
        this.show = false;
      }
    },

    // 跳转用户页面
    UserId(id){
      this.$router.push({name: 'user',query: {id,}})
    }
  }
}
</script>

<style lang="scss" scoped>
  .user-like{
    @include shadow;
    @include rightMain;
    .title{
      @include title;
    }
    .user{
      margin-bottom: 25px;
      display: flex;
      flex-wrap: wrap;
      li{
        padding: 0 0 13px 13px;
        display: inline-block;
        width: 40px;
        height: 40px;
        .el-image{
          border-radius: 8px;
          cursor: pointer;
        }
      }
    }
  }
</style>