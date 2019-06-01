<template>
  <div class="loading" v-show="show">
    <div class="icon-loading">
      <span class="icon-item"></span>
      <span class="icon-item"></span>
      <span class="icon-item"></span>
      <span class="icon-item"></span>
      <span class="icon-item"></span>
    </div>
    <div class="loading-text">
      {{title}}
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Loading',
    props: {
      show: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        default: ''
      }
    }
  };
</script>

<style lang="less" scoped>
  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9999;
    background: rgba(0,0,0,.8);
  }
  .icon-loading {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 1rem;
    height: 1rem;

    & .icon-item {
      display: flex;
      width: .04rem;
      background: #fff;

      &:nth-child(1) {
        animation: load-effect1 1.1s infinite linear;
      }
      &:nth-child(2) {
        animation: load-effect1 1s infinite linear;
      }
      &:nth-child(3) {
        animation: load-effect1 .9s infinite linear;
      }
      &:nth-child(4) {
        animation: load-effect1 1s infinite linear;
      }
      &:nth-child(5) {
        animation: load-effect1 1.1s infinite linear;
      }
    }
  }

  @keyframes load-effect1 {
    0% {
      height: .6rem;
    }
    50% {
      height: .2rem;
    }
    100% {
      height: .6rem;
    }
  }

  .loading-text {
    margin-top: .1rem;
    font-size: .3rem;
    letter-spacing: .04rem;
    color: #fff;
  }
</style>
