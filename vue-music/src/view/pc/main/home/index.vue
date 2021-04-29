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
import Banners from 'components/pc/home/banner';
import RecommendList from 'components/pc/home/recommendList'
import RecommendSong from 'components/pc/home/recommendSong'
export default {
  components:{
    Banners,
    RecommendList,
    RecommendSong,
  },
}
 </script>