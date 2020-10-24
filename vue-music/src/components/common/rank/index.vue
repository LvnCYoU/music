<template>
    <div class="rank">
      <div class="container">
        <div class="cloud-music-rank">
          <h2 class="title">云音乐特色榜</h2>
          <div class="cloud-list">
            <div class="item" v-for="(item,index) in cloudList" :key="index">
              <div class="wrapper">
                <router-link tag="a" :to="{name:'playlist-detail',query:{id:item.id}}">
                  <div class="cover">
                    <div class="img" :key="index">
                      <el-image :src="item.coverImgUrl" fit="cover" lazy></el-image>
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
        <div class="global-music-rank">
          <h2 class="title">全球媒体榜</h2>
          <div class="global-list">
            <div class="item" v-for="(item,index) in globalList" :key="index">
              <div class="wrapper">
                <router-link tag="a" :to="{name:'playlist-detail',query:{id:item.id}}">
                  <div class="cover">
                    <div class="img" :key="index">
                      <el-image :src="item.coverImgUrl" fit="cover" lazy></el-image>
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
      </div>
    </div>
</template>
<script>
export default {
  data(){
    return{
      cloudList: [],
      globalList: [],
    }
  },
  mounted(){
    this.init();
  },
  methods: {
    async init(){
      await this.$api.TopList()
        .then( res => {
          this.cloudList = res.data.list.slice(0,4);
          this.globalList = res.data.list.slice(4)
        })
    }
  }
}
</script>
<style lang="scss" scoped>
  .rank{
    padding: 20px 0;
    .cloud-music-rank{
      box-sizing: border-box;
    }
    .cloud-list,.global-list{
      position: relative;
      display: flex;
      flex-wrap: wrap;
      margin: 0 -15px;
    }
  }
</style>

<style lang="scss" src="../songsheet/item.scss"></style>