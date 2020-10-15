export default{
  changeStatus(state){
    return state.status = !state.status;
  },
  Uid(state,str){
    state.uid = str;
  },
  showPlayer(state){
    return state.playing = true;
  },
  CHANGE_SONG_URL(state,url){
    return state.songUrl = url;
  },
  CURRENT_SONG(state,obj){
    return state.currentSong = Object.assign(state.currentSong,obj)
  },
  SONG_LIST(state,list){
    return state.songList = list;
  }
}