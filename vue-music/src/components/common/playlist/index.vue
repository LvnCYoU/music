<template>
  <div id="app">
    <div class="test">
      <!-- <audio 
      src='http://m701.music.126.net/20201010031831/a4ea4f770b404a6613dda82befad8e80/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/4250444338/5a68/b4b1/bfaa/c98df0243b9327189c8cf86c64560963.mp3'
      autoplay
      controls
      ref='audio1'
      >
      </audio> -->
      <button @click="t"></button>
      <el-slider v-model="value1" @change="test" :max="1"></el-slider>
      <!-- <scroll :data="data">
        <ul>
          <li v-for="item in data" :key="item">{{item}}</li>
        </ul>
      </scroll> -->
      
    </div>

  </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
  data(){
    return {
      value1: 0,
      url: '',
      status: false,
      volumn: 0,
      data: [1,2,3,4,5,6,7,8,9,10],
    }
  },
  computed:{
    ...mapState(['songList'])
  },
  mounted(){
    console.log(this.$refs.audio1)
    // this.$refs.audio.src = 'http://m701.music.126.net/20201009165656/7df5fab14ff522f74f23083d57481e87/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/4334125381/0f44/79e8/6688/9d1e308b3ad55f8012d74b108c42cabf.mp3'

  },
  methods: {
    test(){
      this.$refs.audio.volume = this.value1;
    },
    t(){
      console.log(this.$refs.audio1.volume)
    }
  }
}
</script>

<style lang="scss" scoped>
  .test{
    display: inline-block;
    width: 650px;

  }
  ul{
    width: 500px;
    height: 500px;
    overflow: hidden;
    li{
      width: 100px;
      height: 100px;
      border: 1px solid #000;
      background: red;
    }
  }
</style>