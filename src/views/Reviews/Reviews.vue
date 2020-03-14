<template>
  <div class="reviews">
    <fixed-bar v-if="title" class="fixed-bar" @leftClick="leftClick" @rightClick="rightClick">
      <i slot="left" class="icon-arrow_lift"></i>
      <span slot="center">{{title}}全部影评</span>
      <i slot="right" class="icon-circle-up"></i>
    </fixed-bar>
    <scroll v-if="reviewsData.length > 0" class="scroll" ref="scroll" :pullUpLoad="true" @pullingUp="pullingUp">
      <div class="content">
        <p class="total">影评共{{total}}条</p>
        <movie-review-item v-for="(item, index) in reviewsData" :review="item" :movie-id="movieId" @itemLoad="itemLoad"></movie-review-item>
        <loading :is-loading="reviewsData.length !== total"></loading>
      </div>
    </scroll>
    <loading v-if="reviewsData.length === 0" class="screen-loading"></loading>
  </div>
</template>

<script>
  import {getReviewsData} from "../../api/reviews.js";

  import Scroll from "../../components/common/Scroll/Scroll.vue";

  import FixedBar from "../../components/content/FixedBar/FixedBar.vue";
  import MovieReviewItem from "../../components/content/MovieReviewItem/MovieReviewItem.vue";
  import Loading from "../../components/content/Loading/Loading.vue";

  export default {
    name: "Reviews",
    components: {
      Scroll,
      FixedBar,
      MovieReviewItem,
      Loading
    },
    data() {
      return {
        start: 0,
        count: 20,
        total: 1,
        title: "",
        movieId: null,
        reviewsData: []
      }
    },
    methods: {
      getReviewsData(movieId, start, count) {
        getReviewsData(movieId, start, count).then(res => {
          this.title = res.subject.title;
          this.reviewsData.push(...res.reviews);
          this.total = res.total;
          this.start += this.count;
          this.movieId = res.subject.id;
        })
      },
      pullingUp() {
        if(this.reviewsData.length === this.total) {
          return;
        }
        this.getReviewsData(this.$route.params.movieId, this.start, this.count);
      },
      itemLoad() {
        this.$refs.scroll.refresh();
      },
      leftClick() {
        this.$router.back();
      },
      rightClick() {
        this.$refs.scroll.scrollTo(0, 0, 1000);
      }
    },
    created() {
      this.getReviewsData(this.$route.params.movieId, this.start, this.count);
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/variable.styl";

  .reviews
    position fixed
    top 0
    left 0
    right 0
    bottom 0
    z-index 3
    padding-top 50px
    background-color $color-background
    .fixed-bar
      position fixed
      top 0
      left 0
      right 0
      z-index 4
      background-color $color-background
    .scroll
      width 100%
      height 100%
      .content
        padding 20px
        .total
          margin-bottom 15px
          font-size $font-size-medium
    .screen-loading
      height 100%
      width 100%
</style>