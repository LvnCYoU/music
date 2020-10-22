// 播放事件
function playing(obj){
  if(obj.audio.paused){
    console.log(obj)
    obj.playBtn.className = 'iconfont icon-zanting'
    obj.audio.play();
  }else{
    obj.playBtn.className = 'iconfont icon-bofang'
    obj.audio.pause();
  }
  
}
  

export {playing}
  
