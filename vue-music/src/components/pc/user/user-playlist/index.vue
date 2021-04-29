<template>
  <div class="user-playlist">
    <div class="create-list">
      <header class="title">
        <span>{{ userName }}创建的歌单</span>
      </header>
      <song-sheet :songLists="createList" :limit="'two'"></song-sheet>
      <load :list="create" @load="createList = $event" />
    </div>
    <div class="collect-list">
      <header class="title">
        <span>{{ userName }}收藏的歌单</span>
      </header>
      <song-sheet :songLists="collectList" :limit="'two'"></song-sheet>
      <load :list="collect" @load="collectList = $event" />
    </div>
  </div>
</template>

<script>
import SongSheet from 'components/pc/songsheet'
const Load = () => import('components/pc/click-more')
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
      collect: [],
      create: [],
    }
  },
  components: {
    SongSheet,
    Load,
  },
  watch: {
    $route(to){
      this.id = to.query.id;
      this.create.length = 0;
      this.collect.length = 0;
      this.init();
    }
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
            list.creator.userId == this.id ? 
              this.create.push(list) :
              this.collect.push(list)
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