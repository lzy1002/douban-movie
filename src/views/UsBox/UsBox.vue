<template>
  <div class="us-box">
    <fixed-bar class="fixed-bar" @leftClick="leftClick">
      <i class="icon-arrow_lift" slot="left"></i>
      <span slot="center">北美票房榜</span>
    </fixed-bar>
    <div class="main" v-if="usBoxData.length > 0">
      <scroll class="scroll" ref="scroll">
        <rank-item v-for="(item, index) in usBoxData" :list-data="item" :title-num="index + 1"></rank-item>
        <loading v-if="usBoxData.length > 0" :is-loading="usBoxData.length !== total"></loading>
      </scroll>
    </div>
    <loading v-else class="screen-loading"></loading>
  </div>
</template>

<script>
  import {getUsBoxData, formatUsBoxData} from "../../api/rank.js";

  import Scroll from "../../components/common/Scroll/Scroll.vue";

  import FixedBar from "../../components/content/FixedBar/FixedBar.vue";
  import RankItem from "../../components/content/RankItem/RankItem.vue";
  import Loading from "../../components/content/Loading/Loading.vue";

  export default {
    name: "UsBox",
    data(){
      return {
        total: 1,
        usBoxData: []
      }
    },
    components: {
      Scroll,
      FixedBar,
      RankItem,
      Loading
    },
    methods: {
      getUsBoxData(){
        getUsBoxData().then(res => {
          this.usBoxData = formatUsBoxData(res);
          this.total = res.subjects.length;
        })
      },
      leftClick(){
        this.$router.back();
      }
    },
    created(){
      this.getUsBoxData();
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/variable.styl";

  .us-box
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
      z-index 6
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