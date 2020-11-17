<template>
    <div class="rank">
      <div class="container">
        <div class="cloud-music-rank">
          <h2 class="title">云音乐特色榜</h2>
          <song-sheet :songLists="cloudList"/>
        </div>
        <div class="global-music-rank">
          <h2 class="title">全球媒体榜</h2>
          <song-sheet :songLists="globalList"/>
        </div>
      </div>
    </div>
</template>
<script>
import SongSheet from '../songsheet/songsheet_scss'
export default {
  data(){
    return{
      cloudList: [],
      globalList: [],
    }
  },
  components: {
    SongSheet,
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
    .title{
      padding-left: 20px;
      border-left: 3px solid $mainColor;
    }
  }
</style>
