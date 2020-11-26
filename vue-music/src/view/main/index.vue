<template>
  <div class="main">
    <loading v-show="isLoading" /> 
    <keep-alive>
      <router-view/>
    </keep-alive>

  </div>
</template>

<script>
import Loading from 'components/common/loading'
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