export default{
  getSongId(state){
    return id => state.songId = id
  },
  getSongUrl(state){
    return url => state.songUrl = url;
  },
  getCurrentSong(state){
    return state.currentSong;
  }
}