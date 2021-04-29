<template>
  <div class="star">
    <div id="background" class="wall"></div>
    <div id="midground" class="wall"></div>
    <div id="foreground" class="wall"></div>
    <div id="top" class="wall"></div>
  </div>
</template>
<style lang="scss" scoped>
  .wall{
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
  div#background{
    background: url("../../../assets/img/preview.jpg")no-repeat;
    background-size: cover;
    background-position: center;
  }
  div#midground{
    background: url("../../../assets/img/midground.png");
    animation: cc 100s linear infinite;
  }
  div#foreground{
    background: url("../../../assets/img/foreground.png");
    animation: cc 153s linear infinite;
  }
  div#top{
    background: url("../../../assets/img/midground.png");
    animation: da 100s linear infinite;
  }
  @keyframes cc {
    0%{
      background-position: 0 0;
    }
    100%{
      background-position: 600% 0;
    }
  }
  @keyframes da {
    0%{
      background-position: 0 0;
    }
    100%{
      background-position: 0 600%;
    }
  }
</style>