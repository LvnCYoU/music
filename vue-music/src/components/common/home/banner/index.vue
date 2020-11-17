<template>
  <div class="banner">
    <el-carousel trigger="click" height="240px" type="card" :interval="4000">
      <el-carousel-item v-for="(item,index) in banners" :key="index">
        <div class="image-box">            
          <img :src="item.imageUrl">            
        </div>  
      </el-carousel-item>
    </el-carousel>
  </div> 
</template>

<script>
export default {
  data(){
    return {
      banners: [],
    }
  },
  mounted(){
    this.init();
  },
  methods:{
    init(){
      this.getBanner();
    },
    async getBanner(){
      await this.$api.Banner()
        .then( res => {
          this.banners = res.data.banners;
        })
        .catch( () => {
          return ;
        })
    }
  }
}
</script>
<style lang="scss">
  .banner{
    margin-top: 40px;
    height: 236px;
    .el-carousel__container{
      .el-carousel__item{
        display: flex;
        align-items: center;
        .image-box{
          display: flex;
          align-items: center;
          img{
            width: 100%;
          }
        }    
      } 
    } 
    .el-carousel__indicator.is-active button{
      background: $mainColor;
    }
    .el-carousel__indicator button{
      background: #a3a3a3;
    }
  }
</style>