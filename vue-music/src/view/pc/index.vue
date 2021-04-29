<template>
  <div class="app">
    <back-top></back-top>
    <app-header v-if="$route.path!=='/signin'"></app-header>
    <app-main></app-main>
    <Player v-show="$store.state.playing" v-if="$route.path!=='/signin'"></Player>
    <app-footer v-if="$route.path!=='/signin'"></app-footer>
  </div>
</template>

<script>
const AppHeader = () => import('components/pc/header')
const AppMain = () => import('@/view/pc/main')
const Player = () => import('components/pc/player')
const AppFooter = () => import('components/pc/footer')
const BackTop = () => import('components/pc/go-top')
export default {
  components: {
    AppFooter,
    AppHeader,
    Player,
    BackTop,
    AppMain,
  }
}
</script>