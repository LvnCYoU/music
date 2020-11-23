<template>
  <div id="mv">
    <div class="container">
      <div class="filter">
        <ul class="tag-area">
          <li 
          :class="item.type == params.area ? 'is-active' : ''"
          v-for="item in area" 
          :key="item.type"
          @click="chooseType('area',item.type)"
          ref="area"
          >
            {{ item.name }}
          </li>
        </ul>
        <ul class="tag-type">
          <li v-for="item in type" 
          :class="item.type == params.type ? 'is-active' : ''"
          :key="item.type + item.name"
          @click="chooseType('type',item.type)"
          ref="sex"
          >
            {{ item.name }}
          </li>
        </ul>
        <ul class="tag-order">
          <li 
          :class="params.order == item.type ? 'is-active' : ''"
          v-for="item in order" 
          :key="item.type+item.name"
          @click="chooseType('order',item.type)"
          ref="lang"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>
      <mv :list="mv" />
      <push-load v-show="loadStatus" @scroll-data='load'/>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import pushLoad from 'components/common/push-load';
import Mv from 'components/common/MV'
export default {
  data(){
    return{
      loading: true,
      loadStatus: true,
      mv: [],
      // 获取mv配置项
      area: [
        {
          name: '全部',
          type: '',
        },
        {
          name: '内地',
          type: '内地',
        },
        {
          name: '港台',
          type: '港台',
        },
        {
          name: '欧美',
          type: '欧美',
        },
        {
          name: '日本',
          type: '日本'
        },
        {
          name: '韩国',
          type: '韩国'
        }
      ],
      type: [
        {
          name: '全部',
          type: '',
        },
        {
          name: '官方版',
          type: '官方版',
        },
        {
          name: '原生',
          type: '原生',
        },
        {
          name: '现场版',
          type: '现场版',
        },
        {
          name: '网易出品',
          type: '网易出品'
        },
      ],
      order: [
        {
          name: '上升最快',
          type: '',
        },
        {
          name: '最新',
          type: '最新',
        },
        {
          name: '最热',
          type: '最热',
        },
      ],
      params: {
        area: '',
        type: '',
        order: '',
        limit: 16,
        offset: 0,
      },
    }
  },
  components: {
    pushLoad,
    Mv,
  },
  mounted(){
    this.init();
  },
  methods: {
    ...mapActions(['mvInit']),

    init(){
      if(this.$store.state.mv.offset){
        this.params = this.$store.state.mv;
        this.params.offset = 0;
      }
      this.getMv(this.params);
    },

    // 获取mv
    async getMv(params){
      this.mvInit(params);
      await this.$api.MvAll(params)
        .then( res => {
          let arr = res.data.data;
          arr.map( list => {
            let obj = {
              artistName: list.artistName,
              name: list.name,
              count: list.playCount,
              duration: list.duration,
              cover: list.cover,
            }
            this.mv.push(obj)
          })
        })
      if(this.mv.length > 10){
        this.loading = false;
      }
    },

    // 类别选择
    chooseType(str,val){
      let actions = {
        'area': () => this.params.area = val,
        'order': () => this.params.order = val,
        'type' : () => this.params.type = val,
      }
      actions[`${str}`].call(this)
      this.mv.length = 0;
      this.loading = true;
      this.params.offset = 0;
      this.mvInit(this.params);
      this.getMv(this.params);
    },

    load(){
      this.loadStatus && setTimeout( () => {
        this.params.offset += this.params.limit;
        this.getMv(this.params);
      },1500)
      this.loadStatus = true;
    }
  },
}
</script>

<style lang="scss" scoped>
  .filter{
    ul{
      margin: 20px 0;
      display: flex;
      
      li{
        margin-right: 6px;
        width: 56px;
        height: 28px;
        line-height: 29px;
        font-size: 13px;
        text-align: center;
        border-radius: 14px;
        cursor: pointer;

        &.is-active{
          background: #fa2800;
          font-weight: 700;
          color: #fff;
        }
      }
    }
    .tag-order{
      li{
        &:first-child{
          width: 102px;
          border-radius: 14px;
        }
      }
    }
  }

</style>