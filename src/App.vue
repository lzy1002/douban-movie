<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <tab-bar></tab-bar>
  </div>
</template>

<script>
  import TabBar from "./components/content/TabBar/TabBar.vue";

  export default {
    name: "App",
    components: {
      TabBar
    }
  }
</script>

<style lang="stylus">

</style>
