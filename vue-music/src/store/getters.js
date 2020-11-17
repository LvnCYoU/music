export default{
  getSongId(state){
    return id => state.songId = id
  },
  getCurrentSong(state){
    return state.currentSong;
  },
  getPlayerMode(state){
    return mode => state.playMode = mode;
  },
  getPlayStatus(state){
    return status => state.playStatus = status;
  },
  getStatus(state){
    return flag => state.status = flag;
  }
}