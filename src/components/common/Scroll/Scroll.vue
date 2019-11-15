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
      }
    },
    data(){
      return {
        scroll: null
      }
    },
    methods: {
      refresh(){
        this.scroll.refresh();
      }
    },
    mounted(){
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,
        pullUpLoad: this.pullUpLoad
      });

      this.scroll.on("pullingUp", () => {
        this.$emit("pullingUp");
        this.scroll.finishPullUp();
      })
    }
  }
</script>

<style scoped>

</style>