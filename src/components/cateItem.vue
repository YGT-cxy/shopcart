<template>
  <div class="cate-item">
    <div class="cate-media">
      <img
        class="cate-img"
        mode="aspectFill"
        :src="cate.cateImg"
      >
    </div>
    <div class="cate-info">
      <div class="cate-name">
        <p>{{cate.title}}</p>
        <p>（{{cate.cateType}}）</p>
      </div>
      <div class="cate-detail">
        <div class="cate-price">￥{{cate.selling_price}}</div>
        <div class="cate-num">数量：{{cate.num}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      cate: {
        type: Object
      }
    }
  };
</script>

<style lang="less" scoped>
  .cate-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 .2rem;
    width: 100%;
    height: 1.2rem;
    color: #777;
    box-sizing: border-box;

    & + .cate-item {
      border-top: 1px solid #bbb;
    }
  }

  .cate-media {
    display: flex;
    align-items: center;
    width: 1.2rem;

    & .cate-img {
      width: 1.2rem;
      height: .9rem;
    }
  }

  .cate-info {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: flex-start;

    & .cate-name {
      display: flex;
      flex: 1;
      flex-direction: row;
    }

    & .cate-detail {
      display: flex;
      flex: 1;
      flex-direction: row;
      align-items: flex-start;
      margin-top: .1rem;
      font-size: .3rem;

      & .cate-price {
        display: flex;
        flex: 1;
        flex-direction: row;
        justify-content: flex-start;
      }

      & .cate-num {
        display: flex;
        justify-content: center;
        margin-left: .4rem;
        font-size: .3rem;
      }
    }
  }
</style>
