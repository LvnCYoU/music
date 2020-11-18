<template>
  <div class="video">
    <el-autocomplete
      class="inline-input"
      v-model="state2"
      :fetch-suggestions="querySearch"
      placeholder="请输入内容"
      :trigger-on-focus="false"
      ></el-autocomplete>
  </div>
</template>

<script>
export default {
  data(){
    return{
      state2: '',
    }
  },
    methods: {
        querySearch(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
                }
    }
}
</script>

<style lang="scss" scoped>

</style>