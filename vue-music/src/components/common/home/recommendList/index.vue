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
  }
}
</style>
<style lang="scss" src="../../songsheet/item.scss"></style>