<template>
  <div class="user-playlist">
    <div class="create-list">
      <header class="title">
        <span>{{ userName }}创建的歌单</span>
      </header>
      <song-sheet :songLists="createList" :limit="'two'"></song-sheet>
    </div>
    <div class="collect-list">
      <header class="title">
        <span>{{ userName }}收藏的歌单</span>
      </header>
      <song-sheet :songLists="collectList" :limit="'two'"></song-sheet>
    </div>
  </div>
</template>

<script>
import SongSheet from '../../songsheet/songsheet_scss'
export default {
  props: {
    userName: {
      type: String,
      required: true,
    }
  },
  data(){
    return{
      id: this.$route.query.id,
      createList: [],
      collectList: [],
    }
  },
  components: {
    SongSheet,
  },
  mounted(){
    this.init();
  },
  methods: {
    init(){
      this.getUserPlaylist();
    },

    async getUserPlaylist(){
      await this.$api.UserPlaylist(this.id)
        .then( res => {
          let list = res.data.playlist;
          list.map( list => {
            if(list.creator.userId == this.id){
              this.createList.push(list)
            }else{
              this.collectList.push(list)
            }
          })
        })
    }
  }
}
</script>

<style lang="scss" scoped>
  .user-playlist{
    @include right;
  }
  .create-list,.collect-list{
    @include rightMain;
    @include shadow;
    .title{
      @include title;
    }
  }
  .collect-list{
    margin-top: 20px;
  }
</style>