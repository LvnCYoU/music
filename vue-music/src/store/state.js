export default
  sessionStorage.getItem('state') ? JSON.parse(sessionStorage.getItem('state')):{
    status: false,
    playing: false,
    playStatus: false,
    songId: null,
    currentSong: {},
    audio: {},
    songList: [],
    playMode: 'loop',
    songSheet: {},
    singer: {},
    mv: {},
    isLoading: false,
  }

