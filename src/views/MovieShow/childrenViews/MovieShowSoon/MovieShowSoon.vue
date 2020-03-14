<template>
  <div class="movie-show-soon">
    <scroll class="scroll" ref="scroll" :pullUpLoad="true" :probetype="3" @pullingUp="pullingUp" @scroll="scroll">
      <ul class="list-box" ref="listBox">
        <li class="list-item" v-for="(item, index) in soonList">
          <div class="fixedTitle" v-if="titleIsShow(item.mainland_pubdate)">{{item.mainland_pubdate | decDate}}</div>
          <movie-item :subject="item" @refresh="refresh"></movie-item>
        </li>
      </ul>
      <loading v-if="soonList.length > 0" :isLoading="soonList.length !== total"></loading>
    </scroll>
    <loading class="loading" v-if="soonList.length <= 0"></loading>
    <div class="fixed-box" ref="fixedbox" v-show="scrollY < 0">{{activeText}}</div>
  </div>
</template>

<script>
  import {getSoonData} from "../../../../api/movieList.js";

  import {deBounce, getDate} from "../../../../common/js/utils.js";

  import Scroll from "../../../../components/common/Scroll/Scroll.vue";

  import MovieItem from "../../../../components/content/MovieItem/MovieItem.vue";
  import Loading from "../../../../components/content/Loading/Loading.vue";

  let activePubdata = null;
  const fixedTitleHeight = 30;

  export default {
    name: "MovieShowSoon",
    components: {
      Scroll,
      MovieItem,
      Loading
    },
    data() {
      return {
        start: 0,
        count: 10,
        total: 1,
        soonList: [],
        deBounce: null,
        scrollY: 0,
        fixedTitleTopArr: [],
        textArr: [],
        activeIndex: -1,
        nextHeight: 0,
        diff: -1,
        fixedMove: 0
      }
    },
    methods: {
      getSoonData(start, count) {
        getSoonData(start, count).then(res => {
          this.soonList.push(...res.subjects);
          this.start += this.count;
          this.total = res.total;
          this.$nextTick(() => {
            this.createArray();
          })
        })
      },
      pullingUp() {
        if(this.soonList.length === this.total) {
          return;
        }
        this.getSoonData(this.start, this.count);
      },
      titleIsShow(pubdata) {
        if(activePubdata === pubdata) {
          return false;
        }else {
          activePubdata = pubdata;
          return true;
        }
      },
      refresh() {
        this.deBounce();
      },
      scroll(position) {
        this.scrollY = position.y;
        for(let i = 0; i< this.fixedTitleTopArr.length; i++) {
          if((this.activeIndex !== i) && (this.scrollY <= -this.fixedTitleTopArr[i] && this.scrollY > -this.fixedTitleTopArr[i+1])) {
            this.activeIndex = i;
            this.nextHeight = this.fixedTitleTopArr[this.activeIndex + 1];
          }
        }
        this.diff = this.nextHeight + this.scrollY;
      },
      createArray() {
        let topArr = [];
        let textArr = [];
        let titles = this.$refs.listBox.querySelectorAll(".fixedTitle");
        titles.forEach((item, index) => {
          topArr.push(item.offsetTop);
          textArr.push(item.innerText);
        });
        topArr.push(Number.MAX_VALUE);
        this.fixedTitleTopArr = topArr;
        this.textArr = textArr;
      }
    },
    computed: {
      activeText() {
        return this.textArr[this.activeIndex] ? this.textArr[this.activeIndex] : "";
      }
    },
    filters: {
      decDate(date) {
        return date ? getDate(date) : "上映日期待定";
      }
    },
    watch: {
      diff(newVal) {
        let fixedMove = newVal > 0 && newVal < fixedTitleHeight ? newVal - fixedTitleHeight : 0;
        if(this.fixedMove === fixedMove) {
          return;
        }
        this.fixedMove = fixedMove;
        this.$refs.fixedbox.style.transform = `translateY(${fixedMove}px)`;
      }
    },
    created() {
      this.getSoonData(this.start, this.count);
    },
    mounted() {
      this.deBounce = deBounce(this.$refs.scroll.refresh, 200);
    },
    activated() {
      this.$refs.scroll.refresh();
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../../../common/stylus/variable.styl";

  .movie-show-soon
    position absolute
    top 98px
    left 0
    bottom 60px
    width 100%
    overflow hidden
    .scroll
      width 100%
      height 100%
      .list-item
        .fixedTitle
          height 30px
          line-height 30px
          margin 0 15px
          padding-left 5px
          background-color $color-background-d
    .loading
      position absolute
      top 0
      left 0
      width 100%
      height 100%
    .fixed-box
      position absolute
      top 0
      left 15px
      right 15px
      height 30px
      line-height 30px
      padding-left 5px
      background-color $color-background-d
</style>