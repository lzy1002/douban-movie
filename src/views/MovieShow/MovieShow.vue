<template>
  <div class="movie-show">
    <search-bar></search-bar>
    <tab-control :titleList="['正在热映', '即将上映']" @itemClick="itemClick"></tab-control>
    <keep-alive>
      <movie-show-now v-if="activeIndex === 0"></movie-show-now>
      <movie-show-soon v-if="activeIndex === 1"></movie-show-soon>
    </keep-alive>
  </div>
</template>

<script>
  import Scroll from "../../components/common/Scroll/Scroll.vue";

  import SearchBar from "../../components/content/SearchBar/SearchBar.vue";
  import TabControl from "../../components/content/TabControl/TabControl.vue";

  import MovieShowNow from "./childrenViews/MovieShowNow/MovieShowNow.vue";
  import MovieShowSoon from "./childrenViews/MovieShowSoon/MovieShowSoon.vue";

  export default {
    name: "MovieShow",
    components: {
      Scroll,
      SearchBar,
      TabControl,
      MovieShowNow,
      MovieShowSoon
    },
    data(){
      return {
        activeIndex: 0
      }
    },
    methods: {
      itemClick(index){
        this.activeIndex = index;
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>

</style>