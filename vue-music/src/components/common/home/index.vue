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
import Banners from './banner';
import RecommendList from './recommendList'
import RecommendSong from './recommendSong'
export default {
  components:{
    Banners,
    RecommendList,
    RecommendSong,
  },
}
 </script>