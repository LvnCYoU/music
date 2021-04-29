<template>
  <div class="banner">
    <el-carousel trigger="click" type="card" :interval="4000" ref="banner">
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
      height: '',
      scale: 24 / 156,
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
    },
  }
}
</script>
<style lang="scss">
  @media screen and (min-width: 1000px){
    .el-carousel__container{
      height: 240px;
    }
  }
  @media screen and (max-width: 1000px){
    .el-carousel__container{
      height: 190px;
    }
  }
  @media screen and (max-width: 700px){
    .el-carousel__container{
      height: 100px;
    }
  }
  .banner{
    margin-top: 40px;
    height: auto;
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