<template>
  <div 
    class="loading" 
    v-loading="isLoading"
    element-loading-text="拼命加载中"
    element-loading-background="#fff"
  >
    
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  computed: {
    ...mapState(['isLoading'])
  }
}
</script>
<style lang="scss" scoped>
.loading{
  position: fixed;
  top: 60px;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99;
}

</style>