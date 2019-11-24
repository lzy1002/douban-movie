<template>
  <div class="welcome">
    <div class="welcome-top">
      <div class="info">
        <div class="smile">^_^</div>
        <p class="date">{{date}}</p>
        <p class="text">遇见你, 真美好</p>
      </div>
    </div>
    <div class="welcome-bottom">
      <div class="main">
        <div class="image-box">
          <img src="../../../common/images/logo.png" alt="">
        </div>
        <div class="content">
          <h1 class="name">豆瓣</h1>
          <p class="desc">我们的精神角落</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {getDate} from "../../../common/js/utils.js";

  export default {
    name: "Welcome",
    data(){
      return {
        date: ""
      }
    },
    methods: {
      getDate(){
        this.date = getDate();
      }
    },
    created(){
      this.getDate();
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../../common/stylus/variable.styl";

  .welcome
    position fixed
    top 0
    left 0
    right 0
    bottom 0
    z-index 10
    background-color $color-background
    .welcome-top
      position relative
      width 100%
      height 80%
      .info
        position absolute
        top 30%
        left 50%
        text-align center
        transform translate(-50%, 0)
        color $color-title
        .smile
          font-size 50px
          white-space nowrap
          color $color-theme
        .date
          margin 30px 0 20px 0
    .welcome-bottom
      position relative
      width 100%
      height 20%
      .main
        display flex
        position absolute
        top 50%
        left 50%
        transform translate(-50%, -50%)
        .image-box
          width 48px
          height 48px
          margin-right 10px
          img
            width 48px
            height 48px
        .content
          display flex
          flex-direction column
          justify-content space-around
          .name
            font-size $font-size-large-x
            color $color-title
          .desc
            font-size $font-size-medium
</style>