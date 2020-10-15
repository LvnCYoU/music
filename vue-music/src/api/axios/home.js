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
   * @method 获取播放列表
   */
}