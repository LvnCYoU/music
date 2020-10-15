
<template>
    <scroll class="content" :data="data">
          <div class="wrapper">
            <p v-for="item in data" :key='item'>{{item}}</p>
          </div>
            
        <div class="loading-wrapper"></div>
    </scroll>
</template>
<script> 
import Scroll from '../../../api/scroll'
export default {
  data() {
    return {
      data: [1,2,3,4,5,6,7,8,9,10],
      pulldown: true
    }
  },
  components:{
    Scroll,
  },
  created() {
    
  },
  methods: {
    
  }
}
</script>
<style lang="scss" scoped>
.content{
    width: 500px;
    height: 500px;
    overflow: hidden;
    .wrapper{
    //       width: 500px;
    // height: 500px;
      // overflow: scroll;
      p{
        width: 100px;
        height: 100px;
        border: 1px solid #000;
        background: red;
      }
    }
    
  }
</style>