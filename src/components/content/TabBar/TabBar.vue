<template>
  <div class="tab-bar">
    <div class="tab-bar-item" :class="{active: $route.path === '/movie-show'}" @click="changePath('/movie-show')">
      <i class="icon-video-camera"></i>
      <p class="text">热映</p>
    </div>
    <div class="tab-bar-item" :class="{active: $route.path === '/rank'}" @click="changePath('/rank')">
      <i class="icon-stats-bars"></i>
      <p class="text">排行</p>
    </div>
    <div class="tab-bar-item" :class="{active: $route.path === '/profile'}" @click="changePath('/profile')">
      <i class="icon-user"></i>
      <p class="text">我的</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabBar",
    methods: {
      changePath(path){
        if(this.$route.path === path){
          return;
        }
        this.$router.replace(path);
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../../common/stylus/variable.styl"

  .tab-bar
    display flex
    position fixed
    bottom 0
    left 0
    right 0
    height 60px
    width 100%
    border-top 1px solid $color-theme
    background-color $color-background
    .tab-bar-item
      flex 1
      text-align center
      display flex
      flex-direction column
      justify-content center
      color #777
      &.active
        color $color-theme
      [class*= "icon-"]
        font-size 22px
      .text
        font-size 12px
        line-height 18px
</style>
