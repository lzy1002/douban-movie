<template>
  <div class="movie-comment-item">
    <div class="imageBox">
      <img :src="comment.author.avatar" alt="">
    </div>
    <div class="content">
      <div class="user">
        <span class="name">{{comment.author.name}}</span>
        <star class="star" :size="24" :score="comment.rating.value"></star>
        <span class="thumb" :class="{active: thumbActive()}" @click="thumbClick">
          <i class="icon-thumb_up"></i>
          {{thumbCount}}
        </span>
      </div>
      <p class="text">{{comment.content}}</p>
      <p class="date">{{comment.created_at}}</p>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from "vuex";

  import Star from "../../common/Star/Star.vue";

  export default {
    name: "MovieCommentItem",
    props: {
      comment: {
        type: Object,
        default(){
          return {}
        }
      }
    },
    components: {
      Star
    },
    data(){
      return {
        thumbCount: this.comment.useful_count
      }
    },
    methods: {
      thumbActive(){
        const index = this.takeThumbArr.findIndex((item) => {
          return item === this.comment.id;
        });
        if(index < 0){
          this.thumbCount = this.comment.useful_count;
          return false;
        }
        this.thumbCount = this.comment.useful_count + 1;
        return true;
      },
      thumbClick(){
        this.$store.dispatch("changeThumb", this.comment.id);
      }
    },
    computed: {
      ...mapGetters(["takeThumbArr"])
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

  .movie-comment-item
    display flex
    margin-bottom 20px
    font-size 14px
    .imageBox
      width 36px
      height 100%
      margin-right 12px
      img
        width 36px
        height 36px
        border-radius 50%
    .content
      flex 1
      .user
        position relative
        width 100%
        .name
          margin-right 5px
          line-height 25px
          color $color-title
        .thumb
          position absolute
          top 5px
          right 5px
          &.active
            color $color-theme
      .text
        line-height 20px
        color $color-title
      .date
        font-size $font-size-small-s
        line-height 25px

</style>