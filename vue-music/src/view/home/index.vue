<template>
  <div id="home">
    <div class="container">
      <Banners></Banners>
      <RecommendList></RecommendList>
      <RecommendSong></RecommendSong>
    </div>
  </div>
</template>

<script>
import Banners from 'components/common/home/banner';
import RecommendList from 'components/common/home/recommendList'
import RecommendSong from 'components/common/home/recommendSong'
export default {
  components:{
    Banners,
    RecommendList,
    RecommendSong,
  },
}
 </script>