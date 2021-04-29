<template>
  <div class="related shadow">
    <header class="title">
      <span>相关推荐</span>
    </header>
    <ul>
      <router-link
        :to="{name:'songsheet-detail',query:{id:item.id} }"
        tag="li"
        class="item"
        v-for="item in playlist"
        :key="item.id"
        @click.native="$router.go(0)"
      >
        <div class="cover">
          <el-image 
            :src="item.coverImgUrl" 
            fit="fill"
          >
          </el-image>
        </div>
        <div class="info">
          <div class="name">
            <span class=" ellipsis">{{ item.name }}</span>
          </div>
          <div class="creator">
            <span>
              By.<small>{{ item.creator.nickname }}</small>
            </span>
          </div>
        </div>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  data(){
    return{
      playlist: [],
    }
  },

  mounted(){
    this.$nextTick( () => {
      this.init();
    })
    
  },

  methods: {
    init(){
      this.getRelated();
    },

    async getRelated(){
      let id = this.$route.query.id;
      await this.$api.RelatedPlaylist(id)
        .then( res => {
          this.playlist = res.data.playlists;
        })
    }
  }
}
</script>

<style lang="scss" scoped>
  .related{
    padding: 15px 15px 0;
    margin-bottom: 20px;
    border-radius: 8px;
    .title{
      padding-left: 1rem;
      margin-bottom: 15px;
      height: 20px;
      border-left: 3px solid $mainColor;
      font-weight: 700;
      font-size: 14px;
    }
    ul{
      margin-bottom: 25px;
      display: flex;
      flex-wrap: wrap;
          
      .item{
        margin-bottom: 15px;
        display: flex;
        width: 100%;
        cursor: pointer;
        
        .cover{
          margin-right: 15px;
          width: 50px;
          height: 50px;
          flex-shrink: 0;
          .el-image{
            border-radius: 3px;
          }
        }
        .info{
          height: 50px;
          flex:1;
          width: 0;
          overflow: hidden;
          &>div{
            font-size: 14px;
          }
          .name{
            margin-bottom: 10px;
            span{
              display: block;
              font-weight: 700;
            }
          }
          .creator{
            font-size: 12px;
            color: #a5a5c1;
          }
        }

        &:hover{
          .info{
            .name{
              color: $mainColor;
            }
          }
        }
      }
    }
  }
</style>