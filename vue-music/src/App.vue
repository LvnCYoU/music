<template>
  <div id="app">
    <component :is="mode" />
  </div>
</template>

<script>
const PCMode = () => import('@/view/pc')
export default {
  data(){
    return{
      mode: 'PCMode' //默认展示pc
    }
  },
  components: {
    PCMode,
  },
  created(){
    // if (this.isMobile()) {
    //   //手机端
    //   this.mode = 'MPMode'
    //   //设置rem
    //   window.onload = function(){
    //       getRem(750,100)
    //   };
    //   window.onresize = function(){
    //       getRem(750,100)
    //   };
    //   function getRem(pwidth,prem){
    //       var html = document.getElementsByTagName("html")[0];
    //       var oWidth = document.body.clientWidth || document.documentElement.clientWidth;
    //       html.style.fontSize = oWidth/pwidth*prem + "px";
    //   }
    // }
    // console.log(this.mode)
  },
  mounted(){  
    window.addEventListener('unload', this.saveState)
  },
  methods: {
    saveState() {
      sessionStorage.setItem('state', JSON.stringify(this.$store.state))
    },

    // 判断是否是移动端
    // isMobile(){
    //   let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
    //   return flag;
    // }
  },
}
</script>

