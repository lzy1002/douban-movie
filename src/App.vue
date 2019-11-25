<template>
  <div id="app">
    <keep-alive exclude="MovieInfo,Celebrity,Search">
      <router-view></router-view>
    </keep-alive>

    <tab-bar></tab-bar>

    <welcome v-if="welcomeIsShow"></welcome>
  </div>
</template>

<script>
  import TabBar from "./components/content/TabBar/TabBar.vue";
  import Welcome from "./components/content/Welcome/Welcome.vue";

  export default {
    name: "App",
    components: {
      TabBar,
      Welcome
    },
    data(){
      return {
        welcomeIsShow: true
      }
    },
    methods: {
      changeShow(){
        setTimeout(() => {
          this.welcomeIsShow = false;
        }, 1500)
      }
    },
    mounted(){
      this.changeShow();
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #app
    position fixed
    top 0
    left 0
    right 0
    bottom 0
    overflow hidden
</style>
