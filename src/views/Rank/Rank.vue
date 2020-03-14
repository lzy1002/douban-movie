<template>
  <div class="rank">
    <search-bar class="search-bar"></search-bar>
    <scroll v-if="dataIsLoad" class="scroll" ref="scroll">
      <div class="main">
        <h1 class="title">精选榜单</h1>
        <div class="rank-section-item top250" @click="changePath('top250')">
          <div class="section-left">
            <h1 class="section-title">豆瓣 Top250</h1>
            <p class="desc">8分以上好电影</p>
          </div>
          <div class="section-right">
            <img class="two" :src="top250Data.subjects[1].images.large | attachImageUrl" alt="">
            <img class="one" :src="top250Data.subjects[0].images.large | attachImageUrl" alt="">
            <img class="three" :src="top250Data.subjects[2].images.large | attachImageUrl" alt="">
          </div>
        </div>
        <div class="rank-section-item weekly" @click="changePath('weekly')">
          <div class="section-left">
            <h1 class="section-title">本周口碑榜</h1>
            <p class="desc">本周口碑较好的电影</p>
          </div>
          <div class="section-right">
            <img class="two" :src="weeklyData.subjects[1].subject.images.large | attachImageUrl" alt="">
            <img class="one" :src="weeklyData.subjects[0].subject.images.large | attachImageUrl" alt="">
            <img class="three" :src="weeklyData.subjects[2].subject.images.large | attachImageUrl" alt="">
          </div>
        </div>
        <div class="rank-section-item new-movies" @click="changePath('new-movies')">
          <div class="section-left">
            <h1 class="section-title">新片榜</h1>
            <p class="desc">最近刚上映的电影</p>
          </div>
          <div class="section-right">
            <img class="two" :src="newMovieData.subjects[1].images.large | attachImageUrl" alt="">
            <img class="one" :src="newMovieData.subjects[0].images.large | attachImageUrl" alt="">
            <img class="three" :src="newMovieData.subjects[2].images.large | attachImageUrl" alt="">
          </div>
        </div>
        <div class="rank-section-item us-box" @click="changePath('us-box')">
          <div class="section-left">
            <h1 class="section-title">北美票房榜</h1>
            <p class="desc">票房最高的电影</p>
          </div>
          <div class="section-right">
            <img class="two" :src="usBoxData.subjects[1].subject.images.large | attachImageUrl" alt="">
            <img class="one" :src="usBoxData.subjects[0].subject.images.large | attachImageUrl" alt="">
            <img class="three" :src="usBoxData.subjects[2].subject.images.large | attachImageUrl" alt="">
          </div>
        </div>
      </div>
    </scroll>
    <loading v-else class="screen-loading"></loading>

    <router-view></router-view>
  </div>
</template>

<script>
  import {getTop250Data, getWeeklyData, getNewMovieData, getUsBoxData} from "../../api/rank.js";

  import {attachImageUrl} from "../../common/js/utils.js";

  import Scroll from "../../components/common/Scroll/Scroll.vue";

  import SearchBar from "../../components/content/SearchBar/SearchBar.vue";
  import Loading from "../../components/content/Loading/Loading.vue";

  export default {
    name: "Rank",
    components: {
      Scroll,
      SearchBar,
      Loading
    },
    data() {
      return {
        top250Data: null,
        weeklyData: null,
        newMovieData: null,
        usBoxData: null
      }
    },
    methods: {
      changePath(path) {
        this.$router.push("/rank/" + path);
      }
    },
    computed: {
      dataIsLoad() {
        return this.top250Data && this.weeklyData && this.newMovieData && this.usBoxData;
      }
    },
    filters: {
      attachImageUrl(imgUrl) {
        return attachImageUrl(imgUrl);
      }
    },
    created() {
      getTop250Data(0, 3).then(res => {
        this.top250Data = res;
      });
      getWeeklyData().then(res => {
        this.weeklyData = res;
      });
      getNewMovieData().then(res => {
        this.newMovieData = res;
      });
      getUsBoxData().then(res => {
        this.usBoxData = res;
      })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/variable.styl";

  .rank
    .scroll
      position absolute
      top 50px
      left 0
      right 0
      bottom 60px
      overflow hidden
      .main
        padding 0 15px 5px
        .title
          padding-top 20px
          margin-bottom 15px
          color $color-title
        .rank-section-item
          display flex
          width 100%
          height 130px
          margin-bottom 15px
          border-radius 10px
          background-color lightpink
          &.top250
            background -webkit-linear-gradient(#e1a708, #efd491)
          &.weekly
            background -webkit-linear-gradient(#32c05e, #a1e5be)
          &.new-movies
            background -webkit-linear-gradient(#a361c3, #d9b9e8)
          &.us-box
            background -webkit-linear-gradient(#dd7286, #f3b9c5)
          .section-left
            display flex
            flex-direction column
            justify-content center
            flex 35%
            width 35%
            color #fff
            text-align center
            .section-title
              font-size $font-size-large
              line-height 24px
            .desc
              font-size $font-size-small
          .section-right
            flex 55%
            width 55%
            text-align center
            line-height 130px
            img
              vertical-align middle
            .one
              width 35%
              max-width 77px
            .two
              width 30%
              max-width 66px
            .three
              width 30%
              max-width 66px

    .screen-loading
      position absolute
      top 0
      left 0
      right 0
      bottom 0
      width 100%
      height 100%
</style>