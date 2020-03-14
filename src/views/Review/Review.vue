<template>
  <div class="review">
    <fixed-bar class="fixed-bar" @leftClick="back">
      <i slot="left" class="icon-arrow_lift"></i>
      <span slot="center">影评</span>
    </fixed-bar>
    <scroll v-if="reviewData" class="scroll" ref="scroll">
      <h1 class="title">{{reviewData.title}}</h1>
      <div class="user">
        <div class="imgBox">
          <img :src="reviewData.author.avatar" alt="">
        </div>
        <div class="content">
          <p><span class="name">{{reviewData.author.name}}</span>的影评</p>
          <p class="date">{{reviewData.created_at | splitData}}<star class="star" :size="24" :score="reviewData.rating.value"></star></p>
        </div>
      </div>
      <p class="text">{{reviewData.content}}</p>
      <p class="copy">本文版权归 {{reviewData.author.name}} 所有，任何形式转载请联系作者</p>
      <div class="end">
        <div class="line"></div>
        <div class="content">THE END</div>
        <div class="line"></div>
      </div>
      <div class="useful">
        <div class="yes">有用({{reviewData.useful_count}})</div>
        <div class="no">没用({{reviewData.useless_count}})</div>
      </div>
    </scroll>
    <loading v-else class="screen-loading"></loading>
  </div>
</template>

<script>
  import {getReviewData} from "../../api/review.js";

  import Scroll from "../../components/common/Scroll/Scroll.vue";
  import Star from "../../components/common/Star/Star.vue";

  import FixedBar from "../../components/content/FixedBar/FixedBar.vue";
  import Loading from "../../components/content/Loading/Loading.vue";

  export default {
    name: "Review",
    components: {
      Scroll,
      Star,
      FixedBar,
      Loading
    },
    data() {
      return {
        reviewData: null
      }
    },
    methods: {
      back() {
        this.$router.back();
      }
    },
    filters: {
      splitData(date) {
        return date.split(" ")[0];
      }
    },
    created() {
      getReviewData(this.$route.params.reviewId).then(res => {
        this.reviewData = res;
      })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/variable.styl";

  .review
    position fixed
    top 0
    left 0
    right 0
    bottom 0
    z-index 3
    padding-top 70px
    background-color $color-background
    .fixed-bar
      position fixed
      top 0
      left 0
      right 0
      z-index 1
      background-color $color-background
    .scroll
      width 100%
      height 100%
      padding 0 20px 20px 20px
      .title
        font-size $font-size-large-x
        line-height 30px
        color $color-title
      .user
        display flex
        font-size 12px
        margin-top 20px
        .imgBox
          width 36px
          height 36px
          border-radius 50%
          margin-right 10px
          overflow hidden
          img
            width 100%
            height 100%
        .content
          .name
            margin-right 5px
            color $color-title
          .date
            margin-top 5px
            .star
              margin-left 5px
      .text
        margin-top 30px
        padding-bottom 100px
        line-height 25px
        color $color-title
        white-space pre-wrap;
      .copy
        font-size $font-size-small
        text-align center
      .end
        display flex
        width 70%
        margin 30px auto
        .line
          flex 1
          border-top 1px solid rgba(0, 0, 0, 0.1)
        .content
          transform translateY(-40%)
      .useful
        text-align center
        padding-bottom 50px
        .yes, .no
          display inline-block
          padding 10px 15px
          font-size $font-size-medium
          border 1px solid #ccc
          border-radius 6px
          color $color-title
        .yes
          margin-right 10px
    .screen-loading
      width 100%
      height 100%
</style>