<template>
  <div class="comments">
    <fixed-bar class="fixed-bar" @leftClick="back" @rightClick="toTop">
      <i slot="left" class="icon-arrow_lift"></i>
      <span slot="center">全部短评</span>
      <i slot="right" class="icon-circle-up"></i>
    </fixed-bar>
    <scroll v-if="commentsData.length > 0" class="scroll" ref="scroll" :pullUpLoad="true" @pullingUp="pullingUp">
      <p class="total">短评共{{total}}条</p>
      <movie-comment-item v-for="(item, index) in commentsData" :comment="item" @itemLoad="itemLoad"></movie-comment-item>
      <loading :isLoading="commentsData.length !== total"></loading>
    </scroll>
    <loading v-else class="screen-loading"></loading>
  </div>
</template>

<script>
  import {getCommentsData} from "../../api/comments.js";

  import Scroll from "../../components/common/Scroll/Scroll.vue";

  import FixedBar from "../../components/content/FixedBar/FixedBar.vue";
  import MovieCommentItem from "../../components/content/MovieCommentItem/MovieCommentItem.vue";
  import Loading from "../../components/content/Loading/Loading.vue";

  export default {
    name: "Comments",
    components: {
      Scroll,
      FixedBar,
      MovieCommentItem,
      Loading
    },
    data(){
      return {
        start: 0,
        count: 20,
        total: 1,
        commentsData: []
      }
    },
    methods: {
      getCommentsData(movieId, start, count){
        getCommentsData(movieId, start, count).then(res => {
          this.total = res.total;
          this.commentsData.push(...res.comments);
          this.start += this.count;
        })
      },
      pullingUp(){
        this.getCommentsData(this.$route.params.movieId, this.start, this.count);
      },
      itemLoad(){
        this.$refs.scroll.refresh();
      },
      back(){
        this.$router.back();
      },
      toTop(){
        this.$refs.scroll.scrollTo(0, 0, 1000);
      }
    },
    created(){
      console.log(this.$route.params.movieId);
      this.getCommentsData(this.$route.params.movieId, this.start, this.count);
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/variable.styl";

  .comments
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
      z-index 4
      background-color $color-background
    .scroll
      width 100%
      height 100%
      padding 0 20px 20px 20px
      .total
        font-size $font-size-medium
        margin-bottom 15px
    .screen-loading
      width 100%
      height 100%
</style>