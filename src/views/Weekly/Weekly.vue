<template>
  <div class="weekly">
    <fixed-bar class="fixed-bar" @leftClick="leftClick">
      <i class="icon-arrow_lift" slot="left"></i>
      <span slot="center">本周口碑榜</span>
    </fixed-bar>
    <div class="main" v-if="weeklyData.length > 0">
      <scroll class="scroll" ref="scroll">
        <rank-item v-for="(item, index) in weeklyData" :list-data="item" :title-num="index + 1"></rank-item>
        <loading v-if="weeklyData.length > 0" :is-loading="weeklyData.length !== total"></loading>
      </scroll>
    </div>
    <loading v-else class="screen-loading"></loading>
  </div>
</template>

<script>
  import {getWeeklyData, formatWeeklyData} from "../../api/rank.js";

  import Scroll from "../../components/common/Scroll/Scroll.vue";

  import FixedBar from "../../components/content/FixedBar/FixedBar.vue";
  import RankItem from "../../components/content/RankItem/RankItem.vue";
  import Loading from "../../components/content/Loading/Loading.vue";

  export default {
    name: "Weekly",
    components: {
      Scroll,
      FixedBar,
      RankItem,
      Loading
    },
    data(){
      return {
        total: 1,
        weeklyData: []
      }
    },
    methods: {
      getWeeklyData(){
        getWeeklyData().then(res => {
          let arr = formatWeeklyData(res);
          this.weeklyData.push(...arr);
          this.total = arr.length;
        })
      },
      leftClick(){
        this.$router.back();
      }
    },
    created(){
      this.getWeeklyData();
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/variable.styl";

  .weekly
    position fixed
    top 0
    left 0
    right 0
    bottom 0
    z-index 5
    background-color $color-background
    .fixed-bar
      position fixed
      top 0
      left 0
      right 0
      z-index 6
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