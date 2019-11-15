<template>
  <div class="movie-show-soon">
    <scroll class="scroll">

    </scroll>
  </div>
</template>

<script>
  import Scroll from "../../../../components/common/Scroll/Scroll.vue";

  export default {
    name: "MovieShowSoon",
    components: {
      Scroll
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .movie-show-soon
    position absolute
    top 97px
    left 0
    bottom 60px
    width 100%
    overflow hidden
    .scroll
      width 100%
      height 100%
</style>