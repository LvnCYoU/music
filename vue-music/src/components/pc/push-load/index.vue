<template>
  <div 
  class="load-more-singer"
  ref="loadMoreSinger"
  @click="load"
  >
    <span>加载更多</span>
    <i class="iconfont icon-xiala"></i>
  </div>
</template>

<script>
export default {
  data(){
    return{
      body: document.body,
      document: document.documentElement,
      loadStatus: true,
    }
  },
  mounted(){
    this.init();
  },
  destroyed(){
    window.onscroll = null;
  },
  methods:{
    init(){
      this.scroll();
    },
    scroll(){
      window.onscroll = () => {
        let scrollTop = this.document.scrollTop || this.body.scrollTop;
        let windowHeight = this.document.clientHeight || this.body.clientHeight;
        let scrollHeight = this.document.scrollHeight || this.body.scrollHeight;
        if(scrollTop + windowHeight >= scrollHeight){
          this.$refs.loadMoreSinger.classList.add('scroll-bottom');
          this.load();
        }
        else{
          this.$refs.loadMoreSinger.classList.remove('scroll-bottom');
        }
      }
    },
    load(){
      if(this.loadStatus){
        this.loadStatus = false;
        this.$emit('scroll-data',false);
      }
      setTimeout( () => {
        this.loadStatus = true;
      },1500)
    }
  }
}
</script>

<style lang="scss" scoped>
  .load-more-singer{
    @include flex;
    margin: 50px auto;
    width: 100px;
    flex-direction: column;
    cursor: pointer;
    span{
      font-size: 14px;
    }
    i{
      display: inline-block;
      transition: all 1s ease;
      transform: rotate(180deg);
      font-size: 20px;
    }
    &:hover,&.scroll-bottom{
      span{
        color: $mainColor;
      }
      i{
        transform: rotate(180deg) translateY(-15px);
      }
    }
  }
</style>