<template>
  <div class="movie-show-now">
    <scroll class="scroll" ref="scroll" :pull-up-load="true" @pullingUp="pullingUp">
      <movie-item v-if="nowList.length > 0" v-for="(item, index) in nowList" :subject="item" @refresh="refresh"></movie-item>
      <loading v-if="nowList.length > 0" :is-loading="nowList.length !== total"></loading>
    </scroll>
    <loading class="loading" v-if="nowList.length <= 0"></loading>
  </div>
</template>

<script>
  import {getNowData} from "../../../../api/movieList.js";

  import {deBounce} from "../../../../common/js/utils.js";

  import Scroll from "../../../../components/common/Scroll/Scroll.vue";

  import MovieItem from "../../../../components/content/MovieItem/MovieItem.vue";
  import Loading from "../../../../components/content/Loading/Loading.vue";

  export default {
    name: "MovieShowNow",
    components: {
      Scroll,
      MovieItem,
      Loading
    },
    data(){
      return {
        start: 0,
        count: 10,
        total: 1,
        nowList: [],
        deBounce: null
      }
    },
    methods: {
      getNowData(){
        if(this.nowList.length >= this.total){
          return false;
        }
        getNowData(this.start, this.count).then(res => {
          this.nowList.push(...res.subjects);
          this.start += this.count;
          this.total = res.total;
          console.log(this.nowList);
        })
      },
      pullingUp(){
        console.log("触发了上拉加载");
        this.getNowData();
      },
      refresh(){
        this.deBounce();
      }
    },
    created(){
      this.getNowData();
    },
    mounted(){
      this.deBounce = deBounce(this.$refs.scroll.refresh, 200);
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .movie-show-now
    position absolute
    top 97px
    left 0
    bottom 60px
    width 100%
    overflow hidden
    .scroll
      width 100%
      height 100%
    .loading
      position absolute
      top 0
      left 0
      width 100%
      height 100%
</style>