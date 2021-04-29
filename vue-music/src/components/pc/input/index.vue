<template>
  <div class="input">
    <el-autocomplete 
      placeholder="请输入内容"
      v-model="search"
      :trigger-on-focus="false"
      :fetch-suggestions="recommendSearch"
      @select="goSearch"
      :select-when-unmatched="true"
    >
      <i slot="prefix" class="el-input__icon el-icon-search"></i>
      <template slot-scope="{ item }">
        <div class="item" :title="item.name">
          <span class="name">{{ item.name }}</span>
        </div>
      </template>
    </el-autocomplete>
  </div>
</template>

<script>
export default {
  data(){
    return{
      search: '',
    }
  },
  methods: {
    async recommendSearch(str,cb){
      await this.$api.SearchSuggest(str)
        .then( res => {
          let arr,item = [];
          let data = res.data.result;
          let action = new Map([
            ['songs',() => 1],
            ['albums',() => 10],
            ['artists',() => 100],
            ['playlists',() => 1000],
            ['default', () => 1],
          ])
          arr = data.order;
          arr.map( list => {
            data[list].map( type => {
              type.type = 
                action.get(list).call(this) || 
                action.get('default').call(this);
            })
            item.push(...data[list])
          })
          cb(item)
        })
        .catch( () => {
          return ;
        })
    },

    // 跳转至搜索界面
    goSearch(data){
      if(!this.search) return;
      console.log(data)
      let keywords = data.name || this.search;
      let type;
      if(!data.name){
        this.$router.push({name: 'search',query: {
          keywords,
          type: 1,
        }})
      } else{
        type = data.type;
        this.$router.push({name: 'search',query: {
          keywords,
          type,
        }})
      }
      this.search = '';
      return ;
    },
  }
}
</script>

<style lang="scss" scoped>
  ::v-deep.input{
    padding-right: 40px;
    width: 158px;
    z-index: 9;
    height: 100%;
    .el-input input{
      height: 100%;
    }
  }
  .el-autocomplete-suggestion li{
    .item{
      @include ellipse;
    }
  }
  .el-autocomplete{
    width: 100%;
    height: 100%;
  }
  
</style>

