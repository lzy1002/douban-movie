<template>
  <div class="work-item" @click="toMovieInfo">
    <div class="main">
      <div class="imageBox">
        <img :src="this.work.subject.images.medium | attachImageUrl" alt="">
      </div>
      <div class="content">
        <h3 class="title">{{work.subject.title}}</h3>
        <div  v-if="work.subject.rating.average > 0"><star :size="24" :score="work.subject.rating.average"></star><span>{{work.subject.rating.average}}</span></div>
        <span v-else class="no-time">暂无评分</span>
        <p class="directors">
          导演: <span v-for="(item, index) in work.subject.directors">{{item.name}}<span v-show="index+1 !== work.subject.directors.length">/</span></span>
        </p>
        <p class="casts">
          主演: <span v-for="(item, index) in work.subject.casts">{{item.name}}<span v-show="index+1 !== work.subject.casts.length">/</span></span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  import {attachImageUrl} from "../../../common/js/utils.js";

  import Star from "../../../components/common/Star/Star.vue";

  export default {
    name: "WorkItem",
    props: {
      work: {
        type: Object,
        default(){
          return {}
        }
      }
    },
    components: {
      Star
    },
    methods: {
      toMovieInfo(){
        this.$router.push(`/movie-info/${this.work.subject.id}`);
      }
    },
    computed: {
      imgUrlSwitch(){
        if(this.work.subject.images){
          return attachImageUrl(this.work.subject.images.medium);
        }else if (this.work.images){
          return attachImageUrl(this.work.images.medium);
        }
      }
    },
    filters: {
      attachImageUrl(imgUrl){
        return attachImageUrl(imgUrl);
      }
    },
    created(){
      console.log(this.work);
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../../common/stylus/variable.styl";

  .work-item
    padding 15px
    .main
      display flex
      .imageBox
        flex 70px 0 0
        width 70px
        height 100px
        margin-right 10px
        img
          width 70px
          height 100px
      .content
        display flex
        flex-direction column
        justify-content space-around
        font-size $font-size-small
        padding-bottom 20px
        .title
          font-size $font-size-medium-x
          color $color-title
</style>