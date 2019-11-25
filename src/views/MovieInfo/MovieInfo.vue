<template>
  <div class="movie-info">
    <div class="fixed-title">
      <div class="back" @click="back">
        <i class="icon-arrow_lift"></i>
      </div>
      <div class="content">
        <i class="icon-video-camera"></i>
        <span class="text">电影</span>
      </div>
    </div>
    <scroll v-if="infoData" class="scroll" ref="scroll">
      <div class="imageBox">
        <img :src="infoData.images.large | attachImageUrl" alt="">
      </div>
      <div class="content">
        <div class="info">
          <div class="desc">
            <h1 class="title">{{infoData.title}}</h1>
            <p class="type">
              <span>{{infoData.year}}/</span>
              <span v-for="(item, index) in infoData.genres">{{item}}<span v-if="index+1 !== infoData.genres.length">/</span></span>
            </p>
            <p class="original-name">原名: {{infoData.original_title}}</p>
            <p class="release-time">上映时间: {{infoData.pubdates[1]}}</p>
            <p class="film-length">片长: {{infoData.durations[0]}}</p>
          </div>
          <div class="rank">
            <p class="title">豆瓣评分</p>
            <p class="score" v-if="infoData.rating.average">{{infoData.rating.average}}</p>
            <star :size="24" :score="infoData.rating.average"></star>
            <p class="ratings-count"><span v-if="infoData.rating.average">{{infoData.ratings_count}}人</span><span v-else>暂无评分</span></p>
          </div>
        </div>
        <div class="operate border-1px">
          <div class="wanted" @click="wantedClick" :class="{active: wantedActive()}">
            {{wantedText}}
          </div>
          <div class="watched" @click="watchedClick" :class="{active: watchedActive()}">
            <img v-show="userImgIsShow" src="../../common/images/user.jpg" alt="">
            {{watchedText}}
          </div>
        </div>
        <div class="summary">
          <h3 class="title">剧情简介</h3>
          <p class="text">{{infoData.summary}}</p>
        </div>
        <div class="casts border-1px">
          <h3 class="title">影人</h3>
          <div class="wrapper" ref="scrollRow">
            <div v-if="infoData.casts.length > 0 || infoData.directors.length > 0" class="casts-box">
              <div v-if="item.id !== null" class="casts-item" v-for="item in infoData.directors" @click="toCelebrity(item.id)">
                <img v-if="item.avatars !== null" :src="item.avatars.small | attachImageUrl" alt="" @load="imgLoad">
                <p class="name">{{item.name}}</p>
                <p>导演</p>
              </div>
              <div v-if="item.id !== null" class="casts-item" v-for="item in infoData.casts"  @click="toCelebrity(item.id)">
                <img v-if="item.avatars !== null" :src="item.avatars.small | attachImageUrl" alt="" @load="imgLoad">
                <p class="name">{{item.name}}</p>
              </div>
            </div>
            <div v-else class="no-casts">
              该影片暂时没有影人信息 :)
            </div>
          </div>
        </div>
      </div>
      <div class="comment">
        <tab-control class="tab-control" :title-list="titleList" @itemClick="itemClick"></tab-control>
        <div v-show="activeIndex === 0" class="movie-comment">
          <movie-comment-item v-for="(item, index) in infoData.popular_comments" :comment="item"></movie-comment-item>
          <div v-if="infoData.popular_comments.length > 0" class="more-comment" @click="toComments">全部短评{{infoData.comments_count}}个</div>
          <div v-else class="no-comment">暂时没有任何短评</div>
        </div>
        <div v-show="activeIndex === 1" class="movie-review">
          <movie-review-item v-for="(item, index) in infoData.popular_reviews" :review="item" :movie-id="infoData.id"></movie-review-item>
          <div v-if="infoData.popular_reviews.length > 0" class="more-review" @click="toReviews">全部影评{{infoData.reviews_count}}个</div>
          <div v-else class="no-review">暂时没有任何影评</div>
        </div>
      </div>
    </scroll>

    <loading v-else class="loading"></loading>

    <router-view></router-view>

  </div>
</template>

<script>
  import BScroll from "better-scroll";

  import {getMovieInfoData} from "../../api/movieInfo.js";

  import {attachImageUrl, deBounce} from "../../common/js/utils.js";

  import {mapGetters} from "vuex";

  import Scroll from "../../components/common/Scroll/Scroll.vue";
  import Star from "../../components/common/Star/Star.vue";

  import Loading from "../../components/content/Loading/Loading.vue";
  import TabControl from "../../components/content/TabControl/TabControl.vue";

  import MovieCommentItem from "../../components/content/MovieCommentItem/MovieCommentItem.vue";
  import MovieReviewItem from "../../components/content/MovieReviewItem/MovieReviewItem.vue";

  export default {
    name: "MovieInfo",
    components: {
      Scroll,
      Star,
      Loading,
      TabControl,
      MovieCommentItem,
      MovieReviewItem
    },
    data() {
      return {
        infoData: null,
        wantedText: "想看",
        watchedText: "看过 ☆☆☆☆☆",
        userImgIsShow: false,
        deBounce: null,
        titleList: ["短评", "影评"],
        activeIndex: 0
      }
    },
    methods: {
      back() {
        this.$router.back();
      },
      wantedClick() {
        this.$store.dispatch("changeWanted", this.infoData);
      },
      watchedClick() {
        this.$store.dispatch("changeWatched", this.infoData);
      },
      wantedActive() {
        const index = this.takeWantedArr.findIndex((item) => {
          return item.id === this.infoData.id;
        });
        if (index > -1) {
          this.wantedText = "已想看";
          return true;
        }
        this.wantedText = "想看";
        return false;
      },
      watchedActive() {
        const index = this.takeWatchedArr.findIndex((item) => {
          return item.id === this.infoData.id;
        });
        if (index > -1) {
          this.watchedText = "已看过";
          this.userImgIsShow = true;
          return true;
        }
        this.watchedText = "看过 ☆☆☆☆☆";
        this.userImgIsShow = false;
        return false;
      },
      imgLoad() {
        this.deBounce();
      },
      itemClick(index){
        this.activeIndex = index;
      },
      toComments(){
        this.$router.push(`/movie-info/${this.$route.params.movieId}/comments`);
      },
      toReviews(){
        this.$router.push(`/movie-info/${this.$route.params.movieId}/reviews`);
      },
      toCelebrity(celebrityId){
        this.$router.push(`/celebrity/${celebrityId}`);
      }
    },
    computed: {
      ...mapGetters(["takeWantedArr", "takeWatchedArr"])
    },
    filters: {
      attachImageUrl(imgUrl) {
        return attachImageUrl(imgUrl);
      }
    },
    created() {
      getMovieInfoData(this.$route.params.movieId).then(res => {
        this.infoData = res;
        this.$nextTick(() => {
          new BScroll(this.$refs.scrollRow, {
            scrollX: true
          });

          this.deBounce = deBounce(this.$refs.scroll.refresh, 200);
        })
      });
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/variable.styl";
  @import "../../common/stylus/mixin.styl";

  .movie-info
    position fixed
    top 0
    left 0
    right 0
    bottom 0
    z-index 1
    padding-top 40px
    background-color $color-background-f
    .loading
      position absolute
      top 0
      left 0
      width 100%
      height 100%
      background-color $color-background-f
    .fixed-title
      position fixed
      top 0
      left 0
      right 0
      z-index 2
      height 40px
      color #fff
      background-color rgba(85, 85, 85, 0.6)
      .back
        position absolute
        padding 10px 10px 10px 15px
        font-size 18px
      .content
        text-align center
        height 40px
        line-height 40px
        .icon-video-camera
          font-size 22px
          margin-right 5px
          vertical-align text-bottom
        .text
          vertical-align bottom
    .scroll
      position absolute
      top 0
      left 0
      right 0
      bottom 0
      .imageBox
        padding 50px 0 20px 0
        text-align center
        img
          width 50%
      .content
        padding 0 20px
        background-color #fff
        .info
          display flex
          justify-content space-between
          .desc
            display flex
            flex-direction column
            justify-content space-around
            font-size 12px
            width 70%
            height 140px
            .title
              font-size 18px
              padding 10px 0 5px 0
              color $color-title
          .rank
            display flex
            flex-direction column
            justify-content space-around
            height 90px
            width 95px
            padding 10px 15px
            margin-top 15px
            background-color #f8f8f8
            font-size 12px
            text-align center
            box-shadow 0 0 5px $color-border-line
            .score
              font-size 18px
              color $color-title
        .operate
          display flex
          padding 20px 0
          font-size $font-size-medium
          border-1px(rgba(0, 0, 0, 0.1))
          .wanted, .watched
            height 35px
            line-height 35px
            text-align center
            border 1px solid $color-theme
            border-radius 5px
            color $color-theme
          .wanted
            flex 1
            margin-right 20px
            &.active
              color #fe9800
              border-color #fe9800
          .watched
            flex 2
            &.active
              color #fe9800
              border-color #fe9800
            img
              width 25px
              height 25px
              vertical-align middle
              border-radius 50%
        .summary
          margin-top 20px
          .title
            font-size $font-size-small
          .text
            text-indent 1em
            font-size 14px
            line-height 25px
            padding-top 10px
            color $color-title
        .casts
          padding 30px 0
          border-1px(rgba(0, 0, 0, 0.1))
          .title
            font-size 12px
            padding-bottom 20px
        .wrapper
          width 100%
          overflow hidden
          .casts-box
            display inline-flex
            .casts-item
              display inline-block
              width 90px
              margin-right 8px
              font-size $font-size-small
              text-align center
              &:last-child
                margin-right 0
              img
                width 90px
                height 120px
              .name
                color $color-title
                text-overflow ellipsis
                white-space nowrap
                overflow hidden
                padding 8px 0 5px 0
        .no-casts
          width 100%
          height 100px
          line-height 100px
          text-align center
          font-size $font-size-medium
      .comment
        position relative
        width 100%
        padding 0 20px
        background-color $color-background
        .movie-comment,.movie-review
          width 100%
          padding 20px 0
          background-color $color-background
          .more-comment,.more-review,.no-comment,.no-review
            text-align center
            font-size $font-size-medium
            padding-bottom 10px
            color $color-theme
          .no-comment,.no-review
            color $color-title

</style>