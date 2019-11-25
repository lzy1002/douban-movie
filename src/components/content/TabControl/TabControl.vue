<template>
  <div class="tab-control">
    <tab-control-item v-for="(item, index) in titleList" :text="item" :index="index" @itemClick="itemClick" :class="{active: activeIndex===index}"></tab-control-item>
  </div>
</template>

<script>
  import TabControlItem from "./TabControlItem.vue";

  export default {
    name: "TabControl",
    props: {
      titleList: {
        type: Array,
        default(){
          return []
        }
      }
    },
    components: {
      TabControlItem
    },
    data(){
      return {
        activeIndex: 0
      }
    },
    methods: {
      itemClick(index){
        this.activeIndex = index;
        this.$emit("itemClick", index);
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../../common/stylus/variable.styl";

  .tab-control
    display flex
    width 100%
    height 48px
    line-height 48px
    .active
      border-bottom 1px solid $color-theme
      color $color-theme
</style>