export default{
  CHANGE_STATUS(state,flag){
    return state.status = flag;
  },
  SHOW_PLAYER(state){
    return state.playing = true;
  },
  CURRENT_SONG(state,obj){
    return state.currentSong = Object.assign(state.currentSong,obj)
  },
  SONG_LIST(state,list){
    return state.songList = list;
  },
  AUDIO_INIT(state,obj){
    return state.audio = obj;
  },
  SONGSHEET_INIT(state,obj){
    return state.songSheet = obj
  },
  SINGER_INIT(state,obj){
    return state.singer = obj
  },
  MV_INIT(state,obj){
    return state.mv = obj;
  },
  SHOW_LOADING(state){
    return state.isLoading = true;
  },
  HIDDEN_LOADING(state){
    return state.isLoading = false;
  }
}