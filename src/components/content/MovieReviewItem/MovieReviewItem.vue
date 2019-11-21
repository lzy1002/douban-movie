<template>
  <div class="movie-review-item" @click="changePath">
    <h1 class="title">{{review.title}}</h1>
    <div class="user">
      <img :src="review.author.avatar" alt="">
      <span class="name">{{review.author.name}}</span>
      <star class="star" :size="24" :score="review.rating.value"></star>
    </div>
    <p class="text">{{review.summary}}</p>
  </div>
</template>

<script>
  import Star from "../../common/Star/Star.vue";

  export default {
    name: "MovieReviewItem",
    props: {
      review: {
        type: Object,
        default(){
          return {}
        }
      },
      movieId: {
        type: String,
        required: true
      }
    },
    components: {
      Star
    },
    methods: {
      changePath(){
        this.$router.push(`/movie-info/${this.movieId}/review/${this.review.id}`);
      }
    },
    created(){
      console.log(this.review);
    },
    mounted(){
      this.$nextTick(() => {
        this.$emit("itemLoad");
      })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../../common/stylus/variable.styl";

  .movie-review-item
    font-size $font-size-small
    margin-bottom 20px
    .title
      padding 5px 0
      font-size $font-size-medium-x
      color $color-title
    .user
      padding 5px 0
      img
        width 25px
        height 25px
        border-radius 50%
        margin-right 6px
        vertical-align middle
      .name
        vertical-align middle
        margin-right 5px
      .star
        vertical-align middle
    .text
      line-height 20px
</style>