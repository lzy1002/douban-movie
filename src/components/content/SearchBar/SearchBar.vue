<template>
  <div class="search-bar" @click="toSearch">
    <img class="logo" src="../../../common/images/logo.png" alt="">
    <div class="search-box">
      <p class="text">
        <i class="icon-search"></i>
        <span>电影/影人/标签</span>
      </p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "SearchBar",
    methods: {
      toSearch(){
        this.$router.push("/search");
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../../common/stylus/variable.styl";

  .search-bar
    width 100%
    height 50px
    padding 10px 10px 5px 60px
    .logo
      position absolute
      left 10px
      top 10px
      width 35px
      height 35px
    .search-box
      width 100%
      height 100%
      background-color $color-background-d
      line-height 35px
      border-radius 5px
      .text
        text-align center
        .icon-search
          vertical-align middle
          margin-right 5px
        span
          vertical-align middle
</style>
