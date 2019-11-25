<template>
  <div class="top-250">
    <fixed-bar class="fixed-bar" @leftClick="leftClick">
      <i class="icon-arrow_lift" slot="left"></i>
      <span class="title" slot="center">
        豆瓣 Top250
      </span>
    </fixed-bar>
    <tab-control class="tab-control" @itemClick="itemClick" :title-list="['1-50', '51-100', '101-150', '151-200', '201-250']"></tab-control>
    <keep-alive>
      <top50-wrapper v-if="activeIndex === 0" class="list-wrapper"></top50-wrapper>
      <top100-wrapper v-if="activeIndex === 1" class="list-wrapper"></top100-wrapper>
      <top150-wrapper v-if="activeIndex === 2" class="list-wrapper"></top150-wrapper>
      <top200-wrapper v-if="activeIndex === 3" class="list-wrapper"></top200-wrapper>
      <top250-wrapper v-if="activeIndex === 4" class="list-wrapper"></top250-wrapper>
    </keep-alive>
  </div>
</template>

<script>
  import FixedBar from "../../components/content/FixedBar/FixedBar.vue";
  import TabControl from "../../components/content/TabControl/TabControl.vue";

  import Top50Wrapper from "./childrenViews/Top50Wrapper/Top50Wrapper.vue";
  import Top100Wrapper from "./childrenViews/Top100Wrapper/Top100Wrapper.vue";
  import Top150Wrapper from "./childrenViews/Top150Wrapper/Top150Wrapper.vue";
  import Top200Wrapper from "./childrenViews/Top200Wrapper/Top200Wrapper.vue";
  import Top250Wrapper from "./childrenViews/Top250Wrapper/Top250Wrapper.vue";

  export default {
    name: "Top250",
    components: {
      FixedBar,
      TabControl,
      Top50Wrapper,
      Top100Wrapper,
      Top150Wrapper,
      Top200Wrapper,
      Top250Wrapper
    },
    data(){
      return {
        activeIndex: 0
      }
    },
    methods: {
      itemClick(index){
        this.activeIndex = index;
      },
      leftClick(){
        this.$router.back();
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/variable.styl";

  .top-250
    position fixed
    top 0
    left 0
    right 0
    bottom 0
    z-index 5
    background-color $color-background
    .tab-control
      font-size $font-size-small
    .list-wrapper
      position absolute
      top 98px
      left 0
      right 0
      bottom 0
</style>