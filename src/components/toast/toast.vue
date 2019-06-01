<template>
  <div
    class="toast"
    :class="mask ? 'toast-mask' : 'toast-mask-dis'"
    v-show="show"
  >
    <div class="toast-title">
      <p>{{title}}</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Toast',
    props: {
      show: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        default: ''
      },
      mask: {
        type: Boolean,
        default: false
      }
    }
  };
</script>

<style lang="less" scoped>
  .toast {
    position: fixed;
    z-index: 9999;
  }
  .toast-mask-dis {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .toast-mask {
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .toast-title {
    padding: 0 .2rem;
    max-width: 60%;
    color: #fff;
    letter-spacing: .04rem;
    font-weight: 300;
    font-size: .3rem;
    border-radius: .06rem;
    background: rgba(0,0,0,.8);
    overflow: hidden;

    & p {
      max-height: 1.2rem;
      line-height: .40rem;
      overflow: hidden;
    }
  }
</style>
