<template>
  <div class="new-movies">
    <fixed-bar class="fixed-bar" @leftClick="leftClick">
      <i class="icon-arrow_lift" slot="left"></i>
      <span slot="center">新片榜</span>
    </fixed-bar>
    <div class="main" v-if="newMoviesData.length > 0">
      <scroll class="scroll" ref="scroll">
        <rank-item v-for="(item, index) in newMoviesData" :list-data="item" :title-num="index + 1"></rank-item>
        <loading v-if="newMoviesData.length > 0" :is-loading="newMoviesData.length !== total"></loading>
      </scroll>
    </div>
    <loading v-else class="screen-loading"></loading>
  </div>
</template>

<script>
  import {getNewMovieData} from "../../api/rank.js";

  import Scroll from "../../components/common/Scroll/Scroll.vue";

  import FixedBar from "../../components/content/FixedBar/FixedBar.vue";
  import RankItem from "../../components/content/RankItem/RankItem.vue";
  import Loading from "../../components/content/Loading/Loading.vue";

  export default {
    name: "NewMovies",
    data(){
      return {
        total: 1,
        newMoviesData: []
      }
    },
    components: {
      Scroll,
      FixedBar,
      RankItem,
      Loading
    },
    methods: {
      getNewMovieData(){
        getNewMovieData().then(res => {
          console.log(res);
          this.newMoviesData.push(...res.subjects);
          this.total = res.subjects.length;
          console.log(this.newMoviesData);
        })
      },
      leftClick(){
        this.$router.back();
      }
    },
    created(){
      this.getNewMovieData();
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/variable.styl";

  .new-movies
    position fixed
    top 0
    left 0
    right 0
    bottom 0
    z-index 5
    width 100%
    height 100%
    background-color $color-background
    .fixed-bar
      position fixed
      top 0
      left 0
      right 0
      background-color $color-background
    .main
      width 100%
      height 100%
      padding 50px 15px 0 15px
      .scroll
        width 100%
        height 100%
        overflow hidden
    .screen-loading
      width 100%
      height 100%
</style>