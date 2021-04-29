<template>
  <div id="singer">
    <div class="container">
      <div class="filter">
        <ul class="tag-lang">
          <li 
          :class="item.type == params.area ? 'is-active' : ''"
          v-for="item in area" 
          :key="item.type"
          @click="chooseType('area',item.type)"
          >
            {{ item.name }}
          </li>
        </ul>
        <ul class="tag-type">
          <li v-for="item in type" 
          :class="item.type == params.type ? 'is-active' : ''"
          :key="item.type + item.name"
          @click="chooseType('type',item.type)"
          >
            {{ item.name }}
          </li>
        </ul>
        <ul class="tag-en">
          <li 
          :class="params.initial == item.type ? 'is-active' : ''"
          v-for="item in letter" 
          :key="item.type+item.name"
          @click="chooseType('initial',item.type)"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>
      <singer :artist="artist" :loading="loading"/>
      <push-load v-show="loadStatus" @scroll-data='load'/>
    </div>
  </div>
</template>

<script>
import {mapActions,mapState} from 'vuex';
import pushLoad from 'components/pc/push-load';
import Singer from 'components/pc/singer'
export default {
  data(){
    return{
      artist: [],
      loading: true,
      loadStatus: true,
      // 歌手筛选信息值
      area: [
        {
          name: '全部',
          type: -1,
        },
        {
          name: '华语',
          type: 7,
        },
        {
          name: '欧美',
          type: 96
        },
        {
          name: '日本',
          type: 8
        },
        {
          name: '韩国',
          type: 16
        },
        {
          name: '其他',
          type: 0
        }
      ],
      type: [
        {
          name: '全部',
          type: -1
        },
        {
          name: '男歌手',
          type: 1
        },
        {
          name: '女歌手',
          type: 2
        },
        {
          name: '乐队',
          type: 3
        }
      ],
      letter: [],
      params: {
        limit: 40,
        offset: 0,
        initial: -1,
        type: -1,
        area: -1,
      }
    }
  },
  computed:{
    ...mapState(['singer'])
  },
  mounted(){
    this.init();
  },
  components: {
    pushLoad,
    Singer,
  },
  methods: {
    ...mapActions(['singerInit']),

    init(){ 
      this.$nextTick( () => {
        if(this.singer.area){
          this.params = this.singer;
          this.params.offset = 0;
        }
        this.getLetter();
        this.getSinger(this.params);
      })
    },

    // a-z 字母获取
    getLetter(){
      let ens = [];
      for(let i = 0; i < 26; i++){
        ens.push({
          name: String.fromCharCode(65 + i),
          type: String.fromCharCode(97 + i)
        })
      }
      ens.unshift({
        name: '热门',
        type: -1,
      })
      ens.push({
        name: '其他',
        type: 0
      })
      this.letter = ens;
    },

    // 获取歌手列表
    async getSinger(params){
      let arrSinger = [];
      this.singerInit(params);
      await this.$api.ArtistList(params)
        .then( res => {
          console.log(res)
          arrSinger = res.data.artists;
        })
      arrSinger.map( list => {
        let obj = {
          id: list.id,
          imgUrl: list.picUrl,
          name: list.name,
          music: list.musicSize,
          load: true,
        };
        this.artist.push(obj);
      })
    },

    // 歌手类型选择
    chooseType(str,val){
      let actions = {
        'area': () => {
          if(this.params.area === val) return false
          this.params.area = val;
          return true;
        },
        'initial': () => {
          if(this.params.initial === val) return false
          this.params.initial = val;
          return true;
        },
        'type' : () => this.params.type === val ? false : this.params.type = val
      }
      if(!actions[`${str}`].call(this))return
      this.params.offset = 0;
      this.singerInit(this.params);
      this.getSinger(this.params);
      this.artist.length = 0;
    },

    load(){
      this.loadStatus && setTimeout( () => {
        this.params.offset += this.params.limit;
        this.getSinger(this.params);
      },1000)
      this.loadStatus = true;
    }


  }
}
</script>
<style lang="scss" scoped>
#singer{
  z-index: -1;
}
  .filter{
    ul{
      margin: 20px 0;
      display: flex;
      
      li{
        margin-right: 6px;
        width: 56px;
        height: 28px;
        line-height: 28px;
        font-size: 13px;
        text-align: center;
        border-radius: 14px;
        cursor: pointer;

        &.is-active{
          background: $mainColor;
          font-weight: 700;
          color: #fff;
        }

        
      }
    }
    .tag-en{
      margin: 10px 0 0;
      li{
        width: 28px;
        height: 28px;
        margin-right: 14px;
        text-align: center;
        line-height: 28px;
        border-radius: 50%;
        font-size: 13px;
        color: #333;
        cursor: pointer;

        &:first-child,&:last-child{
          width: 56px;
          border-radius: 14px;
        }
      }
    }
  }

  
</style>