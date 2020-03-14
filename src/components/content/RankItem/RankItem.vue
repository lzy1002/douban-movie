<template>
  <div class="rank-item">
    <div class="title-num">
      <div class="line"></div>
      <span class="num">{{titleNum}}</span>
      <div class="line"></div>
    </div>
    <div class="content" @click="toMovieInfo">
      <div class="content-left">
        <div class="img-box">
          <img :src="listData.images.large | attachImageUrl" alt="">
        </div>
      </div>
      <div class="content-right">
        <h1 class="name">{{listData.title}}</h1>
        <div class="star-box">
          <p v-if="listData.rating.average !== 0"><star :size="24" :score="listData.rating.average"></star><span class="score">{{listData.rating.average}}</span></p>
          <p v-else>暂无评分</p>
        </div>
        <p class="directors">
          导演: <span v-for="(item, index) in listData.directors">{{item.name}}<span v-show="index+1 !== listData.directors.length">/</span></span>
        </p>
        <p class="casts">
          主演: <span v-for="(item, index) in listData.casts">{{item.name}}<span v-if="index+1 !== listData.casts.length">/</span></span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  import {attachImageUrl} from "../../../common/js/utils.js";

  import Star from "../../../components/common/Star/Star.vue";

  import WorkItem from "../WorkItem/WorkItem.vue";

  export default {
    name: "RankItem",
    props: {
      listData: {
        type: Object,
        default() {
          return {}
        }
      },
      titleNum: {
        type: Number,
        required: true
      }
    },
    components: {
      Star,
      WorkItem
    },
    methods: {
      toMovieInfo() {
        this.$router.push("/movie-info/" + this.listData.id);
      }
    },
    filters: {
      attachImageUrl(imgUrl) {
        return attachImageUrl(imgUrl);
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.$emit("itemLoad");
      })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../../common/stylus/variable.styl";

  .rank-item
    padding-top 30px
    .title-num
      display flex
      width 50%
      margin 30px auto
      .line
        flex 1
        border-top 1px solid #eee
      .num
        font-size $font-size-large
        color $color-theme
        padding 0 8px
        transform translateY(-50%)
    .content
      display flex
      padding 15px
      border 1px solid #ccc
      .content-left
        .img-box
          width 70px
          height 100px
          margin-right 10px
          img
            width 70px
            height 100px
      .content-right
        flex 1
        display flex
        flex-direction column
        justify-content space-around
        font-size $font-size-small
        padding-bottom 20px
        .name
          font-size $font-size-medium-x
          color $color-title
</style>