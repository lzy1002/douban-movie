<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from "better-scroll";

  export default {
    name: "Scroll",
    props: {
      pullUpLoad: {
        type: Boolean,
        default: false
      },
      probetype: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        scroll: null
      }
    },
    methods: {
      refresh() {
        this.scroll.refresh();
      },
      scrollTo(x, y, time) {
        this.scroll.scrollTo(x, y, time);
      }
    },
    mounted() {
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,
        pullUpLoad: this.pullUpLoad,
        probetype: this.probetype
      });

      this.scroll.on("pullingUp", () => {
        this.$emit("pullingUp");
        this.scroll.finishPullUp();
      });

      this.scroll.on("scroll", (position) => {
        this.$emit("scroll", position);
      })
    }
  }
</script>

<style scoped>

</style>