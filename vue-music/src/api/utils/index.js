export default{

  formatTime(time){
    let m,s,endtime;
    // 毫秒数转化为分钟
    if(typeof(time) == 'number'){
      if(time < 1000) endtime = '00:00'
      else if(time < 60000){
        s = ~~((time % (1000 * 60)) / 1000); 
        if(s < 10) s = '0' + s;
        endtime = '00:' + s;
      }else{
        m = ~~((time % (1000 * 60 * 60)) / (1000 * 60));
        s = ~~((time % (1000 * 60)) / 1000); 
        if(m < 10) m ='0' + m;
        if(s < 10) s = '0' + s;
        endtime = m + ':' + s;
      }
    }
    // 分钟转化为毫秒数
    else if(time instanceof Array){
      let ms;
      m = time[1];
      s = time[2];
      ms = time[3];
      endtime = (Number(m * 60) + Number(s)) * 1000 + Number(ms / 1000)
    }
    return endtime;
  },
  // 播放量简化
  SimplifyPlayCount(count){
    let len = count.toString().length;
    if(len < 5) return Math.round(count)
    else if(len < 9 && len >= 5) return Math.round(count / 10000) + '万'
    else return Math.round(count / 100000000) + '亿'
  },
  // 歌词处理
  Lyric(str){
    let arr = [];
    const reg = /\[(\d{2}):(\d{2}).(\d{3}|\d{2})]/g;

    str.split('\n').map( list => {
      let obj = {};
      let time;
      obj.lyric = list.replace(reg,'');
      time = reg.exec(list);
      obj.time = this.formatTime(time);
      if(obj.lyric && obj.time) arr.push(obj);
    });
    arr.forEach( (list,index) => {
      list.index = index
    })
    return arr
  }
}