<template>
  <div id="app">
    <back-top></back-top>
    <app-header v-if="$route.path!=='/signin'"></app-header>
    <app-main></app-main>
    <Player v-show="$store.state.playing" v-if="$route.path!=='/signin'"></Player>
    <app-footer v-if="$route.path!=='/signin'"></app-footer>
  </div>
</template>

<script>
const AppHeader = () => import('@/view/header')
const AppMain = () => import('@/view/main')
const Player = () => import('@/view/player')
const AppFooter = () => import('@/view/footer')
const BackTop = () => import('components/common/go-top')
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
    BackTop,
  }
}
</script>

