<template>
  <div class="error">
    <h2>
      <span>当前没有数据噢</span>
      <img src="assets/img/error.jpg">
    </h2>
  </div>
</template>

<style lang="scss" scoped>
  .error{
    width: 100%;
    height: 100%;
    img{
      width: 100%;
    }
    h2{
      user-select: none;
      text-align: center;
      pointer-events: none;
    }
  }
</style>