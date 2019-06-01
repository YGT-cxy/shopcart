<template>
  <div
    class="nav-item"
    :class="hove ? 'nav-item-active' : ''"
    @click="handleIndex"
  >
    {{title}}
  </div>
</template>

<style lang="less" scoped>
  .nav-item {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: .2rem .1rem;
    width: 100%;
    height: 1rem;
    color: #fff;
    background: #bbb;
    box-sizing: border-box;

    & + .nav-item {
      border-top: .04rem solid #fff;
    }

    &-active {
      background: #3c9dd0;
    }
  }
</style>

<script>
export default {
  props: {
    title: {
      type: String
    },
    hove: {
      type: Boolean
    },
    index: {
      type: Number
    }
  },
  methods: {
    handleIndex () {
      this.$emit('click', this.index, this.title);
    }
  }
};
</script>
