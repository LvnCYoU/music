<template>
  <div class="recommend-playlist">
    <h2 class="title">推荐歌单</h2>
    <song-list :songLists="playlist"/>
  </div>
</template>

<script>
import SongList from 'components/pc/songsheet'
export default {
  data(){
    return {
      playlist: [],
    }
  },
  components: {
    SongList,
  },
  mounted(){
    this.getPersonalized(24)
  },

  methods:{
    async getPersonalized(num){
      await this.$api.Personalized(num)
      .then( res => {
        this.playlist = res.data.result;
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.recommend-playlist{
  margin-top: 40px;
  .title{
    margin-left: 15px;
    margin-bottom: 10px;
    padding-left: 10px;
    font-size: 16px;
    color: #4a4a4a;
    border-left: 2px solid $mainColor;
  }
}
@media screen and (max-width: 680px){
  .recommend-playlist{
    margin-top: 20px;
  }
}

</style>