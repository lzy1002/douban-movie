<template>
  <div class="celebrity-item" @click="toCelebrityInfo">
    <div class="item-left">
      <img :src="celebrityData.avatars.large | attachImageUrl" alt="">
    </div>
    <div class="item-right">
      <h1 class="name">{{celebrityData.name}}</h1>
      <p class="name-en">{{celebrityData.name_en}}</p>
      <p class="works">
        <span v-for="(item, index) in celebrityData.works">{{item.subject.title}}<span v-if="index + 1 !== celebrityData.works.length">/</span></span>
      </p>
    </div>
  </div>
</template>

<script>
  import {attachImageUrl} from "../../../common/js/utils.js";

  export default {
    name: "CelebrityItem",
    props: {
      celebrityData: {
        type: Object,
        default(){
          return {}
        }
      }
    },
    methods: {
      toCelebrityInfo(){
        this.$router.push("/celebrity/" + this.celebrityData.id);
      }
    },
    filters: {
      attachImageUrl(imgUrl){
        return attachImageUrl(imgUrl);
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../../common/stylus/variable.styl";

  .celebrity-item
    display flex
    padding 15px
    .item-left
      width 70px
      height 100px
      margin-right 10px
      img
        width 70px
        height 100px
    .item-right
      display flex
      flex-direction column
      justify-content space-around
      width 100%
      font-size $font-size-small
      padding-bottom 20px
      .name
        font-size $font-size-medium-x
        color $color-title
      .works
        line-height 16px
</style>