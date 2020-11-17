<template>
  <div id="main">
    <loading v-show="isLoading" /> 
    <router-view/>
  </div>
</template>

<script>
import Loading from '../common/loading'
import {mapState} from 'vuex'
export default {
  components: {
    Loading,
  },
  computed:{
    ...mapState(['isLoading']),
  }
}
</script>
<style lang="scss" scoped>
 .main{
   height: 100%;
 }
</style>