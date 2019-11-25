<template>
  <div class="fixed-bar">
    <div class="left" @click="leftClick"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right" @click="rightClick"><slot name="right"></slot></div>
  </div>
</template>

<script>
  export default {
    name: "FixedBar",
    methods: {
      leftClick(){
        this.$emit("leftClick");
      },
      rightClick(){
        this.$emit("rightClick");
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../../common/stylus/variable.styl";

  .fixed-bar
    display flex
    height 50px
    border-bottom 1px solid rgba(0, 0, 0, 0.1)
    .left
      width 50px
      height 50px
      font-size 18px
      text-align center
      padding 16px
      color $color-theme
    .right
      width 50px
      height 50px
      font-size 22px
      text-align center
      padding 14px
      color $color-theme
    .center
      flex 1
      line-height 50px
      overflow hidden
      text-overflow ellipsis
      white-space nowrap
</style>