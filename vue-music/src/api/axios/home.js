import api from './instance'

export default {
  /**
   * @method 获取轮播图
   */
  async Banner(type){
    return api.get(`/banner?${type}`);
  },
  /**
   * @method 获取推荐歌单
   */
  async Personalized(limit){
    return api.post(`/personalized?limit=${limit}`)
  },
  /**
   * @method 获取歌单详情
   */
  async PlaylistDetail(id){
    return api.post('/playlist/detail',{
      id,
    })
  },
  /**
   * @method 获取推荐新音乐
   */
  async PersonalizedNewSong(){
    return api.post('personalized/newsong');
  },
  /**
   * @method 获取音乐url
   */
  async SongUrl(id){
    return api.get(`/song/url?id=${id}`)
  },
  /**
   * @method 获取歌词
   */
  async Lyric(id){
    return api.get(`/lyric?id=${id}`)
  },
  /**
   * @method 获取歌曲详情
   */
  async SongDetail(id){
    return api.get(`/song/detail?ids=${id}`)
  },
  /**
   * @method 获取专辑内容
   */
  async Album(id){
    return api.get(`/album?id=${id}`)
  },
  /**
   * @method 获取所有榜单
   */
  TopList(){
    return api.post('/toplist');
  },

  /**
   * @method 歌单分类
   */
  PlaylistCatlist(){
    return api.post('/playlist/catlist')
  },

  /**
   * @method 热门歌单分类
   */
  PlaylistHot(){
    return api.post('playlist/hot');
  },

  /**
   * @method 歌单(网友精选碟)
   */
  TopPlaylist(num,str){
    let offset = num ? num * 40 : 0;
    let order = str || 'hot';
    return api.get(`/top/playlist?limit=40&offset=${offset}&order=${order}`)
  },

  /**
   * @method  精品歌单标签列表
   */
  PlaylistHighTags(){
    return api.post('/playlist/highquality/tags')
  },

  /**
   * @method 获取精品歌单
   */
  TopPlaylistHigh(str,before){
    let cat = str || '全部'
    return api.post('/top/playlist/highquality',{
      cat,
      limit: 40,
      before,
    })
  },

}