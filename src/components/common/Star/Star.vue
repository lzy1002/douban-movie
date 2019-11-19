<template>
  <div class="star" :class="starSize">
    <span class="star-item" v-for="(item, index) in starArr" :class="item"></span>
  </div>
</template>

<script>
  export default {
    name: "Star",
    props: {
      size: {
        type: Number,
        required: true
      },
      score: {
        type: Number,
        required: true
      }
    },
    computed: {
      starSize(){
        return `star-${this.size}`;
      },
      starArr(){
        let arr = [];
        let score = this.score > 5 ? this.score / 2 : this.score;
        let integer = Math.floor(score);
        for(let i = 0; i< integer; i++){
          arr.push("on");
        }
        score - integer > 0 ? arr.push("half") : "";
        while(arr.length !== 5){
          arr.push("off");
        }
        return arr;
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../../common/stylus/mixin.styl";

  .star
    display inline-block
  &.star-24
    .star-item
      width 10px
      height 10px
      display inline-block
      margin-right 3px
      background-size 10px
      background-repeat no-repeat
      &.on
        bg-image("./images/star24_on")
      &.half
        bg-image("./images/star24_half")
      &.off
        bg-image("./images/star24_off")
</style>