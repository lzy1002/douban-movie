<template>
  <div class="collection-watched">
    <scroll class="scroll" ref="scroll">
      <div class="total-box">
        <span class="total">{{takeWatchedArr.length}} 部</span>
      </div>
      <work-item class="work-item border-1px" v-for="(item, index) in takeWatchedArr" :work="item"></work-item>
    </scroll>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";

  import Scroll from "../../../../components/common/Scroll/Scroll.vue";

  import WorkItem from "../../../../components/content/WorkItem/WorkItem.vue";

  export default {
    name: "CollectionWatched",
    components: {
      Scroll,
      WorkItem
    },
    computed: {
      ...mapGetters(["takeWatchedArr"])
    },
    activated() {
      this.$refs.scroll.refresh();
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../../../common/stylus/variable.styl";
  @import "../../../../common/stylus/mixin.styl";

  .collection-watched
    .scroll
      width 100%
      height 100%
      overflow hidden
      .total-box
        font-size $font-size-medium
        height 40px
        line-height 40px
        padding 0 15px
        background-color #f8f8f8
      .work-item
        border-1px(rgba(0, 0, 0, 0.1))
        background-color $color-background
</style>