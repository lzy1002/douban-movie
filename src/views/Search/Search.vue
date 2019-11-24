<template>
  <transition name="fade">
    <div class="search">
      <div class="search-top">
        <div class="main">
          <i class="icon-search"></i>
          <input class="inp" type="text" name="" id="" placeholder="搜索电影/影人">
          <div class="cancel" @click="back">取消</div>
        </div>
      </div>
      <div class="search-tag">
        <div class="classic">
          <div class="tag">经典</div>
          <div class="tag">豆瓣高分</div>
          <div class="tag">冷门佳片</div>
        </div>
        <div class="type">
          <div class="tag">剧情</div>
          <div class="tag">爱情</div>
          <div class="tag">喜剧</div>
          <div class="tag">科幻</div>
          <div class="tag">动作</div>
          <div class="tag">悬疑</div>
          <div class="tag">喜剧</div>
          <div class="tag">青春</div>
          <div class="tag">文艺</div>
        </div>
        <div class="country">
          <div class="tag">日本</div>
          <div class="tag">韩国</div>
        </div>
      </div>
      <div class="history">
        <div class="title">
          <span>搜索历史</span>
          <i class="icon-bin"></i>
        </div>
        <ul v-if="false" class="search-history-list">
          <li></li>
        </ul>
        <p v-else class="space">
          还没有搜索历史, 快去搜索吧 :)
        </p>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: "Search",
    methods: {
      back(){
        this.$router.back();
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/variable.styl";
  @import "../../common/stylus/mixin.styl";

  .search
    position fixed
    top 0
    left 0
    right 0
    bottom 0
    z-index 5
    background-color $color-background
    .search-top
      padding 10px 0 10px 20px
      background-color $color-theme
      .main
        position relative
        display flex
        height 30px
        .icon-search
          position absolute
          top 8px
          left 8px
          font-size $font-size-medium
        .inp
          flex 1
          font-size $font-size-medium
          color $color-text
          padding-left 30px
          border-radius 5px
        .cancel
          width 68px
          text-align center
          line-height 30px
          color #fff
    .search-tag
      padding 0 15px
      .tag
        display inline-block
        font-size $font-size-medium
        color $color-theme
        padding 8px 16px
        margin 0 15px 20px 0
        border 1px solid $color-theme
        border-radius 8px
      .classic, .type, .country
        padding-top 20px
        border-1px(rgba(0, 0, 0, 0.1))
    .history
      color $color-theme
      padding 0 15px
      .title
        position relative
        font-size $font-size-large
        padding 20px 0
        .icon-bin
          position absolute
          top 12px
          right 0
          padding 8px
      .space
        font-size $font-size-medium
        text-align center
        line-height 50px
        color $color-text
  .fade-enter, .fade-leave-to
    opacity 0
  .fade-enter-active, .fade-leave-active
    transition all 0.5s ease
</style>