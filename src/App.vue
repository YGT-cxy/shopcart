<template>
  <div class="container">
    <div id="main">
      <div class="side-nav">
        <div class="scroll-view">
          <side-nav
            v-for="(item, index) in sideNav"
            :key="index"
            :index="index"
            :title="item"
            :hove="activeNav.index === index"
            @click="switchSideNav"
          ></side-nav>
        </div>
      </div>
      <div class="content">
        <div class="scroll-view">
          <commodity
            v-for="(item, index) in cateList"
            :key="index"
            :commodity="item"
            :index="index"
            @commoditySize="commoditySize"
          ></commodity>
        </div>
      </div>
    </div>
    <div id="foot">
      <div class="foot-left">
        <img
          class="icon-order"
          src="./assets/images/order.png"
          @click="showShoppingList"
        >
        <div class="sum-money">
          <p>￥{{sumMoney}}</p>
        </div>
      </div>
      <div class="foot-right">
        <div class="accounts" @click="settleAccount">去结算</div>
      </div>
    </div>
    <div id="cate_list" v-if="isShowCateList">
      <div class="scroll-view">
        <cate-item
          v-for="(cateItem, index) of buyCateList"
          :key="index"
          :cate="cateItem"
        ></cate-item>
      </div>
    </div>
  </div>
</template>

<script>
import Commodity from './components/commodity';
import SideNav from './components/sideNav';
import CateItem from './components/cateItem.vue';
import CateData from './assets/data/cate.json';

export default {
  data () {
    return {
      sideNav: [], // 左侧导航栏
      activeNav: {}, // 当前导航激活的下标
      cateList: [], // 右侧内容
      sumMoney: 0, // 总金额
      buyCateList: [], // 商品结算列表
      isShowCateList: false // 是否显示购物车的商品列表
    };
  },

  components: {
    Commodity,
    SideNav,
    CateItem
  },

  methods: {
    // 查看用户添加到购物车里的商品
    showShoppingList () {
      if (this.buyCateList.length === 0) {
        console.log('没有商品添加，提示用户添加商品');
        this.$toast.show({
          title: '购物车还没有商品，请添加商品',
          mask: true,
          duration: 1000
        });
      } else {
        console.log('显示用户添加的商品');
        this.isShowCateList = !this.isShowCateList;
      }
    },
    /**
     * 切换侧边栏
     * @param  {Number} index 侧边栏下标
     * @param  {String} title 侧边栏标题，对应json文件中的键位
     */
    switchSideNav (index, title) {
      const _this = this;
      let buyCateList = _this.buyCateList;

      _this.activeNav = {
        index,
        title
      };
      _this.cateList = _this.formatCateData(CateData[title]);
      _this.cateList.forEach(item => { // 判断当前的商品列表中的商品是否有存在结算列表中
        const findIndex = _this.judgeCateInList(item.cateId, buyCateList);
        if (findIndex !== -1) { // 结算列表中存在这个商品，修改商品的数量
          item.num = buyCateList[findIndex].num;
        }
      });
    },
    // 初始化处理商品数据
    formatCateData (data) {
      let res = [];
      data.forEach(item => {
        if (!('num' in item)) {
          item.num = 0;
        }
        res.push(item);
      });
      return res;
    },
    // 结算金额
    settleAccount () {
      this.$toast.show({
        title: '应支付' + this.sumMoney + '元',
        mask: true
      });
      this.isShowCateList = false; // 隐藏显示购物车列表
    },
    /**
     * 商品的增减
     * @param  {Number} index 该商品在列表中的下标
     * @param  {Number} num   商品数量
     */
    commoditySize (index, num) {
      let cate = this.cateList[index];
      cate.num = num;
      let buyCateList = this.buyCateList;
      let findIndex = this.judgeCateInList(cate.cateId, buyCateList);

      if (findIndex === -1) {
        if (num === 0) {
          this.$loading.hide();
          return false; // 当商品数量为0时
        }
        buyCateList.push(cate);
      } else {
        if (num === 0) { // 当商品数量为0时，删除这个商品
          buyCateList.splice(findIndex, 1);
        } else {
          buyCateList[findIndex].num = num;
        }
      }
      this.$loading.hide();
      this.isShowCateList = false; // 隐藏显示购物车列表
      this.countMoney();
    },
    /**
     * 判断当前商品是否在某个列表中存在
     * @param  {Number} cateId 该商品的唯一ID
     * @param  {Array} list    结算列表
     * @return {Number}        商品在列表中的下标，未找到返回-1
     */
    judgeCateInList (cateId, list) {
      if (!list.length) return -1;
      return list.findIndex(item => {
        return item.cateId === cateId;
      });
    },
    // 计算商品的金额
    countMoney () {
      let buyCateList = this.buyCateList;
      let sumMoney = 0;
      if (buyCateList.length) {
        buyCateList.forEach(item => {
          sumMoney += (item.num * item.selling_price);
        });
      }
      this.sumMoney = sumMoney;
      return sumMoney;
    }
  },

  mounted () {
    this.sideNav = [];
    for (let i in CateData) { // 进行侧边栏栏目初始化
      // console.log(i);
      if (!('title' in this.activeNav)) {
        this.activeNav = {
          index: 0,
          title: i
        };
      }
      this.sideNav.push(i);
    }
    this.cateList = this.formatCateData(CateData[this.activeNav.title]);
  }
};
</script>

<style lang="less">
  html,
  body {
    height: 100%;
    overflow: hidden;
  }

  .container {
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
  }

  .scroll-view {
    width: 100%;
    height: 100%;
    overflow: auto;
    &::webkit-scrollbar {
      display: none;
    }
  }

  #main {
    display: flex;
    flex-direction: row;
    height: 100%;
    overflow: hidden;
  }

  .side-nav {
    display: flex;
    padding-bottom: .4rem;
    width: 2rem;
    height: 100%;
    font-size: .26rem;
    border-right: .1rem solid #000;
    box-sizing: border-box;
    background: #bbb;
  }

  .content {
    display: flex;
    flex: 1;
    padding-bottom: .2rem;
    max-width: calc(100% - 2rem);
    height: 100%;
    box-sizing: border-box;
  }

  #foot {
    display: flex;
    flex-direction: row;
    font-size: .32rem;
    height: 1rem;

    & .foot-left {
      position: relative;
      display: flex;
      flex: 1;
      height: 100%;
      background: #000;

        & .icon-order {
          position: relative;
          top: -.3rem;
          margin-left: .35rem;
          padding: .1rem;
          width: .6rem;
          height: .6rem;
          border: .1rem solid #000;
          border-radius: 100%;
          background: #fff;
        }

        & .sum-money {
          display: flex;
          align-items: center;
          margin-left: .3rem;
          color: #fff;
          font-weight: 300;
        }
    }

    & .foot-right {
      display: flex;
      align-content: center;
      justify-content: center;
      width: 2rem;
      height: 100%;
      background: #14d100;

      & .accounts {
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
      }
    }
  }

  #cate_list {
    position: absolute;
    bottom: 1.3rem;
    left: .9rem;
    display: flex;
    flex-direction: column;
    padding: .1rem 0;
    max-height: 6rem;
    border: 1px solid #bbb;
    background: #fff;
    overflow-y: scroll;
  }
</style>
