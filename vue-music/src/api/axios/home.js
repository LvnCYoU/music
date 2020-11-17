import api from './instance'

export default {
  /**
   * @method 获取轮播图
   */
  Banner(type){
    return api.get(`/banner?${type}`);
  },
  /**
   * @method 获取推荐歌单
   */
  Personalized(limit){
    return api.post(`/personalized?limit=${limit}`)
  },
  /**
   * @method 获取歌单详情
   */
  PlaylistDetail(params){
    return api.get(`/playlist/detail`,{params})
  },
  /**
   * @method 获取推荐新音乐
   */
  PersonalizedNewSong(){
    return api.post('personalized/newsong');
  },
  /**
   * @method 获取音乐url
   */
  SongUrl(id){
    return api.post(`/song/url?id=${id}`)
  },
  /**
   * @method 获取歌词
   */
  Lyric(id){
    return api.get(`/lyric?id=${id}`)
  },
  /**
   * @method 获取歌曲详情
   */
  SongDetail(id){
    return api.get(`/song/detail?ids=${id}`)
  },
  /**
   * @method 获取专辑内容
   */
  Album(id){
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
  TopPlaylist(params){
    return api.get(`/top/playlist?`,{params})
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

  /**
   * @method 歌手分类列表
   */
  ArtistList(params){
    return api.get('/artist/list',{params})
  },

  /**
   * @method 获取mv
   */
  MvAll(params){
    return api.get('/mv/all',{params})
  },
  
  /**
   * @method 获取歌单收藏者
   */
  PlaylistSubscribers(params){
    return api.get('/playlist/subscribers',{params})
  },

  /**
   * @method 获取相关歌单推荐
   */
  RelatedPlaylist(id){
    return api.get(`/related/playlist?id=${id}`)
  },

  /**
   * @method 获取歌单评论
   */
  CommentPlaylist(id){
    return api.get(`comment/playlist?id=${id}`);
  },

  /**
   * @method 获取搜索建议
   */
  SearchSuggest(key){
    return api.get(`/search/suggest?keywords=${key}`);
  },

  /**
   * @method 搜索
   */
  Search(params){
    return api.get('/search',{params});
  },

  /**
   * @method 获取歌手单曲
   */
  Artists(id){
    return api.get(`/artists?id=${id}`)
  },

  /**
   * @method 获取歌手描述
   */
  ArtistDesc(id){
    return api.get(`/artist/desc?id=${id}`)
  },

  /**
   * @method 获取歌手专辑
   */
  ArtistAlbum(params){
    return api.get(`/artist/album`,{params})
  },

  /**
   * @method 获取歌手mv
   */
  ArtistMv(id){
    return api.get(`artist/mv?id=${id}`)
  },

  /**
   * @method 获取相似歌手
   */
  SimiArtist(id){
    return api.get(`simi/artist?id=${id}`)
  },
}