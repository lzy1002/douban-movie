<template>
  <div class="profile">
    <div class="user">
      <div class="user-icon-box">
        <img class="user-icon" src="../../common/images/user.jpg" alt="">
      </div>
      <div class="user-name-box">
        <span class="user-name">豆瓣用户</span>
      </div>
    </div>
    <tab-control class="tab-control" :title-list="titleList" @itemClick="itemClick"></tab-control>
    <keep-alive>
      <collection-wanted v-if="activeIndex === 0" class="collection"></collection-wanted>
      <collection-watched v-if="activeIndex === 1" class="collection"></collection-watched>
      <collection-celebrity v-if="activeIndex === 2" class="collection"></collection-celebrity>
    </keep-alive>
  </div>
</template>

<script>
  import {SYNCHRONIZATION_STATE} from "../../store/mutations-types.js";

  import TabControl from "../../components/content/TabControl/TabControl.vue";

  import CollectionWanted from "./childrenViews/CollectionWanted/CollectionWanted.vue";
  import CollectionWatched from "./childrenViews/CollectionWatched/CollectionWatched.vue";
  import CollectionCelebrity from "./childrenViews/CollectionCelebrity/CollectionCelebrity.vue";

  export default {
    name: "Profile",
    components: {
      TabControl,
      CollectionWanted,
      CollectionWatched,
      CollectionCelebrity
    },
    data() {
      return {
        titleList: ["想看", "看过", "影人"],
        activeIndex: 0
      }
    },
    methods: {
      itemClick(index) {
        this.activeIndex = index;
      }
    },
    created() {
      this.$store.commit(SYNCHRONIZATION_STATE, "wantedArr");
      this.$store.commit(SYNCHRONIZATION_STATE, "watchedArr");
      this.$store.commit(SYNCHRONIZATION_STATE, "celebrityArr");
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/variable.styl";

  .profile
    position absolute
    top 0
    left 0
    right 0
    bottom 60px
    background-color #f8f8f8
    .user
      display flex
      padding 35px 50px 35px 20px
      background linear-gradient(#42bd56, #9ad57f)
      .user-icon-box
        display flex
        flex-direction column
        justify-content center
        width 60px
        height 80px
        margin-right 20px
        .user-icon
          width 60px
          height 60px
          border-radius 50%
      .user-name-box
        line-height 80px
        font-size $font-size-large
        color #fff
    .tab-control
      background-color $color-background
    .collection
      position absolute
      top 198px
      left 0
      right 0
      bottom 0
</style>