<template>
  <div class="movie-item">
    <div class="image">
      <img :src="subject.images.small | attachImageUrl">
    </div>
    <div class="content">
      <h1 class="title">{{subject.title}}</h1>
      <div class="score">
        <div v-if="subject.rating.average"><star :size="24" :score="subject.rating.average"></star><span class="num">{{subject.rating.average}}</span></div>
        <span v-else class="text">暂无评分</span>
      </div>
      <p class="director">导演: {{subject.directors[0].name}}</p>
      <p class="casts">主演: <span v-for="(item, index) in subject.casts">{{item.name}}<span v-if="index !== subject.casts.length-1">/</span></span></p>
      <p class="looked">{{subject.collect_count}}人看过</p>
    </div>
  </div>
</template>

<script>
  import {attachImageUrl} from "../../../common/js/utils.js";

  import Star from "../../common/Star/Star.vue";

  export default {
    name: "MovieItem",
    props: {
      subject: {
        type: Object,
        default(){
          return {}
        }
      }
    },
    components: {
      Star
    },
    filters: {
      attachImageUrl(imgUrl) {
        return attachImageUrl(imgUrl);
      }
    },
    mounted(){
      this.$emit("refresh");
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../../common/stylus/variable.styl";

  .movie-item
    display flex
    padding 15px
    .image
      width 80px
      flex 0 0 80px
      height 120px
      margin-right 10px
      img
        width 100%
        height 100%
    .content
      display flex
      flex-direction column
      justify-content space-around
      .title
        color $color-title
        font-size $font-size-medium-x
      .score
        .num
          font-size $font-size-small
        .text
          font-size $font-size-small
          color $color-text
      .director,.casts,.looked
        font-size $font-size-small-s
      .looked
        color $color-title
</style>