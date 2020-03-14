<template>
  <div class="collection-celebrity">
    <scroll class="scroll" ref="scroll">
      <div class="total-box">
        <span class="total">{{takeCelebrityArr.length}} 人</span>
      </div>
      <celebrity-item class="celebrity-item border-1px" v-for="(item, index) in takeCelebrityArr" :celebrity-data="item"></celebrity-item>
    </scroll>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";

  import Scroll from "../../../../components/common/Scroll/Scroll.vue";

  import CelebrityItem from "../../../../components/content/CelebrityItem/CelebrityItem.vue";

  export default {
    name: "CollectionCelebrity",
    components: {
      Scroll,
      CelebrityItem
    },
    computed: {
      ...mapGetters(["takeCelebrityArr"])
    },
    activated() {
      this.$refs.scroll.refresh();
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../../../common/stylus/variable.styl";
  @import "../../../../common/stylus/mixin.styl";

  .collection-celebrity
    .scroll
      width 100%
      height 100%
      overflow hidden
      .total-box
        width 100%
        height 40px
        line-height 40px
        font-size $font-size-medium
        padding 0 15px
        background-color #f8f8f8
      .celebrity-item
        border-1px(rgba(0, 0, 0, 0.1))
        background-color $color-background
</style>