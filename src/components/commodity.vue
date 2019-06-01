<template>
  <div class="cate">
    <div class="cate-img">
      <img :src="commodity.cateImg" :data-src="commodity.cateImg" @click="previewImage">
    </div>
    <div class="cate-info">
      <div class="cate-title">{{commodity.title}}</div>
      <div class="cate-type">{{commodity.cateType}}</div>
      <div class="cate-detail">
        <div>月销售{{commodity.sales}}份</div>
        <div>好评率100%</div>
      </div>
      <div class="cate-foot">
        <div class="cate-money">￥{{commodity.selling_price}}</div>
        <div class="cate-buy">
          <div
            class="buy-btn"
            @click="commoditySize"
            data-flag="minus"
          >-</div>
          <div class="buy-num">{{commodity.num}}</div>
          <div
            class="buy-btn"
            @click="commoditySize"
            data-flag="add"
          >+</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    commodity: {
      type: Object
    },
    index: {
      type: Number
    }
  },
  methods: {
    // 商品数量的增减
    commoditySize (e) {
      const flag = e.currentTarget.dataset.flag;
      const index = this.index;
      let num = this.commodity.num;
      this.$loading.show();
      if (flag === 'add') { // 商品数量增加
        num++;
      } else if (flag === 'minus') { // 商品数量减少
        num > 0 && num--;
      }
      // console.log(index, num);
      this.$emit('commoditySize', index, num);
    },
    // 全屏预览图片
    previewImage (e) {
      // console.log(e);
      const imgUrl = e.currentTarget.dataset.src;
      console.log(imgUrl);
      // wx.previewImage({
      //   current: imgUrl, // 当前显示图片的http链接
      //   urls: [imgUrl] // 需要预览的图片http链接列表
      // });
    }
  }
};
</script>

<style lang="less">
  .cate {
    display: flex;
    flex-direction: row;
    padding: .1rem .2rem;
    box-sizing: border-box;

    &-img {
      width: 2rem;
      height: 1.4rem;

      & img {
        width: 100%;
        height: 100%;
      }
    }

    & + .cate {
      margin-top: .1rem;
      border-top: .04rem solid #000;
    }

    &-info {
      display: flex;
      flex-direction: column;
      flex: 1;
      padding-left: .2rem;
      font-size: .24rem;
      box-sizing: border-box;
    }

    &-title {
      font-size: .3rem;
      font-weight: 600;
    }

    &-type {
      margin-top: .06rem;
    }

    &-detail {
      display: flex;
      flex-direction: row;
      align-items: center;
      font-size: .22rem;

      & div {
        & + div {
          margin-left: .1rem;
        }
      }
    }

    &-foot {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      margin-top: .06rem;

      & .cate-money {
        font-size: .28rem;
      }

      & .cate-buy {
        display: flex;
        flex-direction: row;
        align-content: center;
        justify-content: center;
      }

      & .buy-num {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 .06rem;
        width: 2em;
      }

      & .buy-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        width: .4rem;
        height: .4rem;
        line-height: .4rem;
        color: #fff;
        font-size: .3rem;
        border-radius: 100%;
        overflow: hidden;
        background: #14d100;
        box-sizing: border-box;
      }
    }
  }
</style>
