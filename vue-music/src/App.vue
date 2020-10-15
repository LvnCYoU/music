<template>
  <div id="app">
    <app-header v-if="$route.path!=='/signin'"></app-header>
    <app-main></app-main>
    <Player v-show="$store.state.playing" v-if="$route.path!=='/signin'"></Player>
    <app-footer v-if="$route.path!=='/signin'"></app-footer>
  </div>
</template>

<script>
const AppHeader = () => import('./components/header')
const AppMain = () => import('./components/main')
const Player = () => import('./components/player')
import AppFooter from './components/footer'
export default {
  mounted(){  
    window.addEventListener('unload', this.saveState)
  },
  methods: {
    saveState() {
      sessionStorage.setItem('state', JSON.stringify(this.$store.state))
    },
  },
  components: {
    AppHeader,
    AppMain,
    Player,
    AppFooter,
  }
}
</script>
<style lang="scss" src="./main.scss">

</style>
