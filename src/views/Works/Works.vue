<template>
  <div class="works">
    <fixed-bar class="fixed-bar" @leftClick="leftClick" @rightClick="rightClick">
      <i slot="left" class="icon-arrow_lift"></i>
      <span slot="center">全部作品</span>
      <i slot="right" class="icon-circle-up"></i>
    </fixed-bar>
    <scroll v-if="worksData.length > 0" class="scroll" ref="scroll" :pullUpLoad="true" @pullingUp="pullingUp">
      <work-item class="work-item" v-for="(item, index) in worksData" :work="item"></work-item>
      <loading v-show="worksData.length > 0" :is-loading="worksData.length !== total"></loading>
    </scroll>
    <loading v-else class="screen-loading"></loading>
  </div>
</template>

<script>
  import {getWorksData, fotmatWorksData} from "../../api/works.js";

  import Scroll from "../../components/common/Scroll/Scroll.vue";

  import FixedBar from "../../components/content/FixedBar/FixedBar.vue";
  import WorkItem from "../../components/content/WorkItem/WorkItem.vue";
  import Loading from "../../components/content/Loading/Loading.vue";

  export default {
    name: "Works",
    components: {
      Scroll,
      FixedBar,
      WorkItem,
      Loading
    },
    data(){
      return {
        start: 0,
        count: 20,
        total: 1,
        worksData: []
      }
    },
    methods: {
      getWorksData(celebrityId, start, count){
        getWorksData(celebrityId, start, count).then(res => {
          this.total = res.total;
          this.start += this.count;
          let format = fotmatWorksData(res);
          this.worksData.push(...format);
        })
      },
      pullingUp(){
        if(this.worksData.length === this.total){
          return;
        }
        this.getWorksData(this.$route.params.celebrityId, this.start, this.count);
      },
      leftClick(){
        this.$router.back();
      },
      rightClick(){
        this.$refs.scroll.scrollTo(0, 0, 1000);
      }
    },
    created(){
      this.getWorksData(this.$route.params.celebrityId, this.start, this.count);
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/variable.styl";

  .works
    position fixed
    top 0
    left 0
    right 0
    bottom 0
    z-index 5
    padding-top 50px
    background-color $color-background
    .fixed-bar
      position fixed
      top 0
      left 0
      right 0
      z-index 6
      text-align center
      background-color $color-background
    .scroll
      width 100%
      height 100%
    .screen-loading
      width 100%
      height 100%
</style>