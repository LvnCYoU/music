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
  },

  // 转化年月日
  getYear(time){
    let data = new Date(time)
    let y,m,d,str;
    y = data.getFullYear() + '-';
    m = (data.getMonth() + 1 < 10 ? '0' + ( data.getMonth() + 1 ) : data.getMonth() + 1 ) + '-';
    d = data.getDate() + ' ';
    str = y + m + d;
    return str;
  },

  // 获取歌手名字
  getSinger(list){
    if(list){
      let item,len,
          str = '';
      if(list.artists){
        item = list.artists;
      }else{
        item = list;
      }
      len = item.length;
      if(len > 1) {
        for(let i = 0; i < len; i++){
          if(!i) str = item[i].name
          else{
            str += ' / ' + item[i].name
          }
        }
      }else str = item[0].name
      return str;    
    }
  },

  // 获取距今相差时间
  getMonth(time){
    let data = new Date(time),
        cur = new Date(),
        diff = cur - data,
        minute = 1000 * 60,
        hour = minute * 60,
        day = hour * 24,
        month = day * 30,
        str;
    const map = new Map([
      ['year', () => str = ~~(diff / (month * 12)) + '年前'],
      ['month', () => str = ~~(diff / month) + '月前'],
      ['week', () => str = ~~(diff / (day * 7)) + '周前'],
      ['day', () => str = ~~(diff / day) + '天前'],
      ['hour', () => str = ~~(diff / hour) + '小时前'],
      ['minute', () => str = ~~(diff / minute) + '分钟前'],
      ['defalut', () => str = '刚刚'],
      ['init', () => {
        if(diff / (month * 12) >= 1) map.get('year').call(this);
        else if(diff / month >= 1)  map.get('month').call(this);
        else if(diff / (day * 7) >= 1)  map.get('week').call(this);
        else if(diff / day >= 1)  map.get('day').call(this);
        else if(diff / hour >= 1)  map.get('hour').call(this);
        else if(diff / minute >= 1)  map.get('minute').call(this);
        else map.get('default').call(this);
      }]
    ])
    map.get('init').call(this);
    return str;
  },

  // 存储音乐id
  storeId(list){
    let arr = [];
    list.forEach((value,index) => {
      let alid,id,song,singer;
      if(value.song){
        alid = value.song.album.id
        song = value.name;
        singer = this.getSinger(value.song);
      }
      else if(value.album){
        alid = value.album.id
        song = value.name;
        singer = this.getSinger(value.song);
      }
      else{
        alid = value.al.id;
        song = value.name;
        singer = this.getSinger(value.ar);
      }
      
      id = value.id;
      let obj = {
        alid,
        id,
        song,
        index,
        singer,
      }
      arr.push(obj);
    })
    return arr
  },

  // 处理音乐id
  MusicId(arr){
    let list = arr.slice(0,100);
    let id = list.reduce( (pre,cur) => {
      return pre + cur.id + ','
    },'')
    id = id.substr(0, id.length - 1);
    return id;
  },

  /**
   * @method 判断按钮是否一致则返回
   * @params target 目标按钮
   * @params compare 对比数据
   */
  BtnOnce(target,compare){
    return target == compare ? false : true
  }
}