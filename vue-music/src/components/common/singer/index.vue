<template>
  <div class="load-more" 
    ref="loading"
    :data="artist"
    style="height: 100%; width: 100%"
    >
    <ul class="singer-list">
      <li 
      v-for="(item,index) in artist"
      :key="item.id + item.name">
        <router-link 
        tag="a" 
        :to="{name:'singer-detail',query:{id:item.id}}"
        >
          <div class="cover">
            <div class="img">
              <el-image 
                :src="item.imgUrl || item.picUrl" 
                fit="fill"  
                @load="loadImg(item)"
                v-loading="item.load"
                :data="artist[index].imgUrl || artist[index].picUrl"
                element-loading-background="#fff"
              >
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            </div>
          </div>
          <div class="info">
            <p class="name">{{ item.name }}</p>
            <p class="count">单曲数{{ item.music || item.musicSize }}</p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    artist: {
      type: Array,
      required: true,
    },
  },
  watch:{
    artist(val){
      console.log(val)
      if(val.length <= 40){
        this.img = 0;
        return this.artist = val;
      }
    }
  },
  data(){
    return{
      img: 0,
      loading: true,
      len: 0,
    }
  },
  mounted(){
    this.init();
  },

  methods:{
    init(){
      this.$nextTick( () => {
        console.log(this.artist)
      })

      this.len = this.artist.length;
    },

    // 图片加载
    loadImg(item){
      if(this.img > this.len - 5){
        this.$nextTick( () => {
          this.loading = false;
          item.load = false;
          return;
        })
      }
      this.loading = true;
      ++this.img;
    },
  }
}
</script>

<style lang="scss" scoped>
  .load-more{
    ul{
      margin: 30px 15px 0;
      display: flex;
      flex-wrap: wrap;
      li{
        padding: 0 15px 30px;
        flex: 0 0 10%;
        max-width: 10%;

        .cover{
          position: relative;
          z-index: 2;
          padding-top: 100%;
          border-radius: 50%;
          // background-color: #d9d9d9;
          .img{
            position: absolute;
            top: 0;
            left: 0;
            overflow: hidden;
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
          .el-image{
            height: 100%;
          }
          
        }
        .info{
          margin-top: 15px;
          text-align: center;
          .name{
            font-weight: 700;
            font-size: 14px;
            line-height: 18px;
            word-break: break-word;
          }
          .count{
            font-size: 12px;
            margin-top: 10px;
            color: #fa2800;
          }
        }

        &:hover{
          .info{
            .name{
              color: #fa2800;
            }
            
          }
        }
      }
    }
  }
  
</style>