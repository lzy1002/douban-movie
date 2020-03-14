<template>
  <div class="top-100-wrapper">
    <scroll v-if="listArr.length > 0" class="scroll" ref="scroll" :pullUpLoad="true" @pullingUp="pullingUp">
      <rank-item v-for="(item, index) in listArr" :list-data="item" :title-num="(index + 1) + 50" @itemLoad="itemLoad"></rank-item>
      <loading v-if="listArr.length > 0" :is-loading="listArr.length !== total"></loading>
    </scroll>
    <loading v-else class="screen-loading"></loading>
  </div>
</template>

<script>
  import {getTop250Data} from "../../../../api/rank.js";

  import Scroll from "../../../../components/common/Scroll/Scroll.vue";

  import RankItem from "../../../../components/content/RankItem/RankItem.vue";
  import Loading from "../../../../components/content/Loading/Loading.vue";

  export default {
    name: "Top100Wrapper",
    components: {
      Scroll,
      RankItem,
      Loading
    },
    data() {
      return {
        start: 50,
        count: 10,
        total: 50,
        listArr: []
      }
    },
    methods: {
      getTop250Data(start, count) {
        getTop250Data(start, count).then(res => {
          this.listArr.push(...res.subjects);
          this.start += this.count;
        })
      },
      pullingUp() {
        if(this.listArr.length === this.total){
          return false;
        }
        this.getTop250Data(this.start, this.count);
      },
      itemLoad() {
        this.$refs.scroll.refresh();
      }
    },
    created() {
      this.getTop250Data(this.start, this.count);
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .top-100-wrapper
    padding 0 15px
    overflow hidden
    .scroll
      width 100%
      height 100%
    .screen-loading
      width 100%
      height 100%
</style>