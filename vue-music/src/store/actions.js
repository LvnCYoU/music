export default {
  currentSong({commit},obj){
    commit('CURRENT_SONG',obj);
  },
  songsList({commit},list){
    commit('SONG_LIST',list)
  },
  audioInit({commit},obj){
    commit('AUDIO_INIT',obj)
  },
  songSheetInit( {commit},obj){
    commit('SONGSHEET_INIT',obj)
  },
  singerInit({commit},obj){
    commit('SINGER_INIT',obj);
  },
  mvInit({commit},obj){
    commit('MV_INIT',obj);
  }
}