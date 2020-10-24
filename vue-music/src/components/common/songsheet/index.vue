<template>
  <div class="song-sheet">
    
  </div>
</template>
<script>
export default {
  data(){
    return {
      
    }
  },
  computed:{

  },
  mounted(){
    this.$nextTick( () => {
      this.init();
    }) 

  },
  methods: {
    async init(){
      await this.$api.axios.all([
        this.$api.PlaylistCatlist(),
        this.$api.PlaylistHot(),
        this.$api.TopPlaylist(1),
      ])
        .then( this.$api.axios.spread( 
          function(
            resCatlist,
            resHot,
            resTopPlaylist,
          ){
            console.log(resCatlist,resHot,resTopPlaylist)
          }) 
      )
      
    }
  }
}
</script>
<style lang="scss" scoped>
    .item{
      flex: 0 0 10.1%;
      max-width: 10.1%;
      padding: 15px 15px;
      margin-top: 10px;
      cursor: pointer;
      &:hover{
        .wrapper{
          .cover{
            .img{
              top: -3px;
              &::before,&::after{
                opacity: 1;
              }
            }
            .count{
              top: -2px;
              color: #fa2800;
            }
          }
        }
        .info{
          h2{
            color: #303133;
          }
        }
      }
      .wrapper{
        position: relative;
        padding-right: 10px;
        .cover{
          position: relative;
          padding-top: 100%;
          border-radius: 2px;
          .img{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 4px;
            &::before,&::after{
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              box-shadow: 2px 2px 20px rgba(0,0,0,.3);
              opacity: 0;
            }
          }
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
            }
          }
          .img,.count{
            transition: all 0.3s ease;
          }
        }
      }
      .info{
        margin-top: 10px;
        h2{
          font-size: 14px;
          overflow: hidden;
          line-height: 18px;
          color: #909399;
        }
      }
    }
</style>