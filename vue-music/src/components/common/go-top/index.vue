<template>
  <el-backtop :bottom="100" :right="100">
    <div class="icon">
      <i class="iconfont icon-xiala"></i>
    </div>
    <span>top</span>
  </el-backtop>
</template> 

<style lang="scss" scoped>
  .el-backtop{
    @include flex;
    @include shadow;
    padding: 10px;
    flex-direction: column;
    border-radius: 0;
    background: #fff;
    color: $mainColor;
    z-index: 9;
  }
  i{
    font-size: 20px;
    color: $mainColor;
  }
  span{
    font-size: 14px;
  }
</style>