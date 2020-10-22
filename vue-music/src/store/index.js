import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import mutations from './mutations'

Vue.use(Vuex)

export default new Vuex.Store({
  state: 
  sessionStorage.getItem('state') ? JSON.parse(sessionStorage.getItem('state')):{
    status: false,
    playing: false,
    uid: '',
    songUrl: '',
    songId: null,
    currentSong: {},
    audio: {},
    songList: [],
    playMode: 'loop',
  },
  getters,
  mutations,
  actions: {
    changeSongUrl({commit} ,url){
      commit('CHANGE_SONG_URL',url);
    },
    currentSong({commit},obj){
      commit('CURRENT_SONG',obj);
    },
    songsList({commit},list){
      commit('SONG_LIST',list)
    },
    audioInit({commit},obj){
      commit('AUDIO_INIT',obj)
    },
  },
  modules: {
  }
})
