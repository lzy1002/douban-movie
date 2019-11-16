<template>
  <div class="loading-box">
    <div v-if="isLoading" class="loading">
      <span class="loading-item-1"></span>
      <span class="loading-item-2"></span>
      <span class="loading-item-3"></span>
      <span class="loading-item-4"></span>
      <span class="loading-item-5"></span>
    </div>
    <div v-else>没有更多数据了</div>
  </div>
</template>

<script>
  export default {
    name: "Loading",
    props: {
      isLoading: {
        type: Boolean,
        default: true
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../../common/stylus/variable.styl";

  @keyframes loading
    from
      transform scale(1)
    to
      opacity 0
      transform scale(0)

  .loading-box
    display flex
    align-items center
    justify-content center
    width 100%
    height 50px
    .loading
      span
        display inline-block
        width 18px
        height 18px
        margin-right 10px
        background-color $color-theme
        transform-origin center
        &.loading-item-1
          animation loading 1s linear 0s infinite
        &.loading-item-2
          animation loading 1s linear 0.26s infinite
        &.loading-item-3
          animation loading 1s linear 0.39s infinite
        &.loading-item-4
          animation loading 1s linear 0.52s infinite
        &.loading-item-5
          animation loading 1s linear 0.65s infinite
</style>
