<template>
  <div class="celebrity">
    <div class="fixed-title">
      <div class="left" @click="leftClick">
        <i class="icon-arrow_lift"></i>
      </div>
      <div class="center">影人</div>
    </div>
    <scroll v-if="celebrityData" class="scroll" ref="scroll">
      <div class="imgBox">
        <img :src="celebrityData.avatars.large | attachImageUrl" alt="">
      </div>
      <div class="content">
        <div class="name-box">
          <p class="name-c">{{celebrityData.name}}</p>
          <p class="name-e">{{celebrityData.name_en}}</p>
          <div class="collection" :class="{active: actionCollection()}" @click="collection">
            <i :class="collectionIconClass"></i>
            <span class="text">{{collectionText}}</span>
          </div>
        </div>
        <div v-if="celebrityData.summary" class="introduction">
          <h3 class="title">个人简介</h3>
          <p class="summary" @click="infoShow">{{celebrityData.summary}}<i class="icon-keyboard_arrow_right"></i></p>
        </div>
      </div>
      <div class="works">
        <h3 class="title">代表作品</h3>
        <div class="wrapper border-1px" ref="rowWrapper">
          <div class="content-box">
            <div class="works-item" v-for="(item, index) in celebrityData.works" @click="toMovieInfo(item.subject.id)">
              <div class="image-box">
                <img :src="item.subject.images.large | attachImageUrl" alt="" @load="imgLoad">
              </div>
              <p class="name">{{item.subject.title}}</p>
              <div class="score">
                <star :size="24" :score="item.subject.rating.average"></star>
                <span class="num">{{item.subject.rating.average}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="works-more" @click="toWorks">
        <div class="main"><span class="text">查看全部作品</span><i class="icon-keyboard_arrow_right"></i></div>
      </div>
    </scroll>
    <loading v-else class="screen-loading"></loading>

    <transition name="move">
      <div v-if="infoIsShow" class="celebrity-info">
        <div class="top-bar">
          <div class="left" @click="infoHide">
            <i class="icon-keyboard_arrow_right"></i>
          </div>
          <span class="title">影人简介</span>
        </div>
        <scroll class="info-scroll">
          <div class="name">
            <p class="name-c">{{celebrityData.name}}</p>
            <p class="name-e">{{celebrityData.name_en}}</p>
          </div>
          <div class="info-list">
            <div class="item">
              <span class="item-left">性别:</span><span class="item-right">{{celebrityData.gender}}</span>
            </div>
            <div class="item">
              <span class="item-left">星座:</span><span class="item-right">{{celebrityData.constellation}}</span>
            </div>
            <div class="item">
              <span class="item-left">出生日期:</span><span class="item-right">{{celebrityData.birthday}}</span>
            </div>
            <div class="item">
              <span class="item-left">出生地:</span><span class="item-right">{{celebrityData.born_place}}</span>
            </div>
            <div class="item">
              <span class="item-left">更多中文名:</span><span class="item-right"><span v-for="(item, index) in celebrityData.aka">{{item}}<span v-if="index+1 !== celebrityData.aka.length">/</span></span></span>
            </div>
          </div>
          <p class="text">{{celebrityData.summary}}</p>
        </scroll>
      </div>
    </transition>

    <router-view></router-view>
  </div>

</template>

<script>
  import {mapGetters} from "vuex";

  import BScroll from "better-scroll";

  import {getCelebrityData} from "../../api/celebrity.js";

  import {deBounce, attachImageUrl} from "../../common/js/utils.js";

  import Scroll from "../../components/common/Scroll/Scroll.vue";
  import Star from "../../components/common/Star/Star.vue";

  import Loading from "../../components/content/Loading/Loading.vue";

  export default {
    name: "Celebrity",
    components: {
      Scroll,
      Star,
      Loading
    },
    data(){
      return {
        celebrityData: null,
        deBounce: null,
        collectionText: "收藏",
        collectionIconClass: "icon-price-tags",
        infoIsShow: false
      }
    },
    methods: {
      getCelebrityData(celebrityId){
        getCelebrityData(celebrityId).then(res => {
          this.celebrityData = res;
          this.$nextTick(() => {
            new BScroll(this.$refs.rowWrapper, {
              scrollX: true
            });
            this.deBounce = deBounce(this.$refs.scroll.refresh, 200);
          })
        })
      },
      leftClick(){
        this.$router.back();
      },
      imgLoad(){
        this.deBounce();
      },
      collection(){
        this.$store.dispatch("changeCollection", this.celebrityData);
      },
      actionCollection(){
        const index = this.takeCelebrityArr.findIndex((item) => {
          return item.id === this.celebrityData.id;
        });
        if(index < 0){
          this.collectionText = "收藏";
          this.collectionIconClass = "icon-price-tags";
          return false;
        }else {
          this.collectionText = "已收藏";
          this.collectionIconClass = "icon-checkmark";
          return true;
        }
      },
      toMovieInfo(movieId){
        this.$router.push(`/movie-info/${movieId}`);
      },
      toWorks(){
        this.$router.push(`/celebrity/${this.$route.params.celebrityId}/works`);
      },
      infoShow(){
        this.infoIsShow = true;
      },
      infoHide(){
        this.infoIsShow = false;
      }
    },
    computed: {
      ...mapGetters(["takeCelebrityArr"])
    },
    filters: {
      attachImageUrl(imgUrl){
        return attachImageUrl(imgUrl);
      }
    },
    created(){
      this.getCelebrityData(this.$route.params.celebrityId);
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/variable.styl";
  @import "../../common/stylus/mixin.styl";

  .celebrity
    position absolute
    top 0
    left 0
    right 0
    bottom 0
    z-index 3
    background-color $color-background-f
    .fixed-title
      position fixed
      top 0
      left 0
      right 0
      z-index 4
      display flex
      width 100%
      height 40px
      background-color rgba(85, 85, 85, 0.6)
      .left
        padding 10px 10px 10px 15px
        .icon-arrow_lift
          font-size 18px
          color #fff
      .center
        padding 12px
        font-size $font-size-medium-x
        color #fff
    .scroll
      width 100%
      height 100%
      overflow hidden
      .imgBox
        width 100%
        text-align center
        padding 50px 0 20px 0
        img
          width 40%
      .content
        padding 15px 20px 0 20px
        background-color $color-background
        .name-box
          position relative
          padding-bottom 30px
          .name-c
            color $color-title
          .name-e
            font-size $font-size-medium
            padding-top 7px
          .collection
            position absolute
            top 0
            right 0
            width 82px
            height 32px
            font-size $font-size-medium
            text-align center
            line-height 30px
            color $color-theme
            border 1px solid $color-theme
            border-radius 10px
            &.active
              color #fe9800
              border-color #fe9800
            i
              margin-right 5px
              vertical-align middle
            .text
              display inline-block
              font-size $font-size-small
        .introduction
          font-size $font-size-medium
          .title
            margin-bottom 20px
          .summary
            position relative
            line-height 24px
            color $color-title
            padding-bottom 28px
            .icon-keyboard_arrow_right
              position absolute
              bottom 0
              left 50%
              transform translateX(-50%) rotate(-90deg)
              font-size 26px
              color $color-theme
      .works
        font-size $font-size-medium
        padding 20px 20px 0 20px
        background-color $color-background
        .title
          padding-bottom 20px
        .wrapper
          width 100%
          padding-bottom 20px
          border-1px(rgba(0, 0, 0, 0.1))
          overflow hidden
          .content-box
            display inline-flex
            .works-item
              display inline-block
              width 90px
              margin-right 8px
              .image-box
                width 90px
                height 120px
                img
                  width 90px
                  height 120px
              .name
                width 100%
                padding 8px 0 5px 0
                text-overflow ellipsis
                white-space nowrap
                overflow hidden
              .score
                .num
                  font-size $font-size-small
      .works-more
        font-size $font-size-medium
        height 60px
        line-height 60px
        padding 0 20px
        background-color $color-background
        .main
          .text
            vertical-align middle
          .icon-keyboard_arrow_right
            font-size $font-size-large-x
            vertical-align middle
    .celebrity-info
      position fixed
      top 0
      left 0
      right 0
      bottom 0
      z-index 6
      padding 50px 20px 20px 20px
      overflow hidden
      color: $color-title
      background-color $color-background
      .top-bar
        position fixed
        top 0
        left 0
        right 0
        z-index 7
        width 100%
        height 40px
        text-align center
        background-color $color-background
        .left
          position absolute
          top -6px
          left 0
          display inline-block
          transform rotate(90deg)
          padding 9px 9px 20px 9px
          .icon-keyboard_arrow_right
            font-size $font-size-large-x
            vertical-align middle
        .title
          display inline-block
          margin-top 12px
      .info-scroll
        width 100%
        height 100%
        .name
          margin-top 30px
          .name-c
            font-size $font-size-large
            font-weight 700
          .name-e
            font-size $font-size-small
            margin-top 10px
        .info-list
          font-size $font-size-medium
          padding 20px 0
          .item
            width 100%
            height 25px
            .item-left,.item-right
              display inline-block
              height 25px
              line-height 25px
            .item-left
              width 80px
        .text
          font-size $font-size-medium
          line-height 22px
          padding-bottom 40px
    .move-enter, .move-leave-to
      transform translateY(100%)
    .move-enter-active, .move-leave-active
      transition all 1s ease
    .screen-loading
      height 100%
      width 100%

</style>