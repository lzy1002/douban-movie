<template>
  <div class="tab-control-item" @click="itemClick">
    <span>{{text}}</span>
  </div>
</template>

<script>
  export default {
    name: "TabControlItem",
    props: {
      text: {
        type: String,
        require: true
      },
      index: {
        type: Number,
        require: true
      }
    },
    methods: {
      itemClick(){
        this.$emit("itemClick", this.index);
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .tab-control-item
    flex 1
    display flex
    justify-content center
    align-items center

</style>