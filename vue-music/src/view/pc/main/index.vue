<template>
  <div class="main">
    <loading v-show="isLoading" /> 
    <keep-alive exclude="mv">
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
import Loading from 'components/pc/loading'
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
    min-height: 700px;
 }
</style>