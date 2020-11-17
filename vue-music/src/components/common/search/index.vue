<template>
  <div class="search-detail">
    <div class="search-btn">
      <star></star> 
      <div class="btn-search">
        <search-input></search-input>
      </div>
    </div>
    <div class="container">
      <div class="kind-btn">
        <div class="title">
          <small>搜索"{{ keywords }}",找到{{len + '个' + cur.name}}</small>
        </div>
        <ul class="btn">
          <li 
            v-for="item in type" 
            :key="item.type"
            :class="cur.name == item.name ? 'is-active' : ''"
            @click="changeType(item.num)"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>
      <div class="main">
        <song-list :songLists="list" v-if="cur.type == 1" />
        <singer :artist="list" v-if="cur.type == 100" />
        <song-sheet :songLists="list" v-if="cur.type == 1000" />
        <album :list="list" v-if="cur.type == 10" />
        <error v-if="!list" />
      </div>
    </div>
  </div>
</template>

<script>
import Star from '../star'
import SearchInput from '../input'
import SongList from '../song-list'
import SongSheet from '../songsheet/songsheet_scss'
import Singer from '../singer/singer'
import Album from '../album'
import Error from '../error'
export default {
  data(){
    return{
      keywords: this.$route.query.keywords,
      len: null,
      cur: '',
      type: [],
      list: [],
    }
  },
  components: {
    Star,
    SearchInput,
    SongList,
    SongSheet,
    Singer,
    Album,
    Error,
  },
  watch:{
    $route(val){
      console.log(val)
      this.getSearch();
    }
  },
  mounted(){
    this.init();
  },
  methods: {
    init(){
      this.Type();
      this.getSearch();
    },

    // 获取搜索信息
    async getSearch(){
      this.keywords = this.$route.query.keywords;
      let keywords = this.keywords;
      let type = this.$route.query.type;
      let params = {
        keywords,
        type,
      }
      let action = new Map([
        [1, list => {
          let id;
          id = this.utils.MusicId(list)
          this.getSongDetail(id)
        }],
        [10, list => this.list = list],
        [100, list => this.list = list],
        [1000, list => this.list = list]

      ])
      await this.$api.Search(params)
        .then(res => {
          console.log(res)
          let index;
          this.type.some( list => {
            if(list.num == this.$route.query.type){
              index = list.type;
              this.cur = {
                name: list.name,
                type: list.num,
              }
              return;
            }
          })
          this.len = res.data.result[index].length;
          console.log(res.data.result[index],this.cur)
          action.get(this.cur.type)(res.data.result[index]);
        })
      
    },


    // type种类
    Type(){
      let obj = [
        {
          name: '单曲',
          type: 'songs',
          num: 1,
        },
        {
          name: '专辑',
          type: 'albums',
          num: 10,
        },
        {
          name: '歌手',
          type: 'artists',
          num: 100,
        },
        {
          name: '歌单',
          type: 'playlists',
          num: 1000,
        },
      ]
      this.type = obj;
    },

    // 改变搜索内容
    changeType(num){
      if(num == this.cur.type) return;
      this.$router.push({name: 'search',query: {
        keywords: this.keywords,
        type: num,
      }})
      this.getSearch();
    },

    // 获取音乐详情
    async getSongDetail(id){
      await this.$api.SongDetail(id)
        .then( res => {
          this.list = res.data.songs;
        })
    },

    // 获取歌单详情
    async getSongSheet(params){
      await this.$api.TopPlaylist(params)
        .then( res => {
          this.songSheet = res.data.playlists
          this.total = res.data.total;
          this.$refs.sort.innerHTML = res.data.cat;
        })
    },



    
  }
}
</script>

<style lang="scss" scoped>
  .search-btn{
    @include flex;
    position: relative;
    width: 100%;
    height: 250px;
    background: #000;
    .btn-search{
      height: 55px;
    }
    .input{
      width: 720px;
    }
  }
  .container{
    @include shadow;
    .kind-btn{
      margin-top: 28px;
      padding: 10px 0 0 10px;
      .title{
        margin-bottom: 17px;
        color: #999;
      }
      .btn{
        margin-bottom: 42px;
        display: flex;
        li{
          margin-right: 34px;
          color: #333;
          font-weight: 300;
          cursor: pointer;
          &.is-active{
            color: $mainColor;
          }
        }
      }
    }
  }
</style>