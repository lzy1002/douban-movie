<template>
  <div class="collection-wanted">
    <scroll class="scroll" ref="scroll">
      <div class="total-box">
        <span class="total">{{takeWantedArr.length}} 部</span>
      </div>
      <work-item class="work-item border-1px" v-for="(item, index) in takeWantedArr" :work="item"></work-item>
    </scroll>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";

  import Scroll from "../../../../components/common/Scroll/Scroll.vue";

  import WorkItem from "../../../../components/content/WorkItem/WorkItem.vue";

  export default {
    name: "CollectionWanted",
    components: {
      Scroll,
      WorkItem
    },
    computed: {
      ...mapGetters(["takeWantedArr"])
    },
    activated(){
      console.log(this.takeWantedArr);
      this.$refs.scroll.refresh();
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../../../common/stylus/variable.styl";
  @import "../../../../common/stylus/mixin.styl";

  .collection-wanted
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