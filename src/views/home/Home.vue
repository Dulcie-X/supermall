<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template v-slot:center>
        <div>购物街</div>
      </template>
    </nav-bar>
    <tab-control
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      v-show="isTabFixed"
      class="tabFixed"
    ></tab-control>
    <scroll 
      class="wrapper-content" ref="scroll" 
      :probe-type="3" 
      :mouse-wheel="true"
      :pull-up-load="true"
      @scroll="contentScroll"
      @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl2"
      ></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>

    <!-- 
      你可能想在某个组件的根元素上监听一个原生事件。可以使用 v-on 的修饰符 .native 
      通俗点讲：就是在父组件中给子组件绑定一个原生的事件，就将子组件变成了普通的HTML标签，不加'. native'事件是无法触发的
     -->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>

  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper.vue";
import RecommendView from "./childComps/RecommendView.vue";
import FeatureView from "./childComps/FeatureView.vue";

import NavBar from "components/common/navbar/NavBar.vue";
import TabControl from "components/content/tabControl/TabControl.vue";
import GoodsList from "components/content/goods/GoodsList.vue";
import Scroll from "components/common/scroll/Scroll.vue";

import { getHomeMultidata, getHomeGoods } from "network/home.js";
import {debounce} from "common/utils.js";
import {backTopMixin} from "common/mixin.js"

export default {
  name: "Home",
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
  },
  mixins: [backTopMixin],
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentGoods: "pop",
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentGoods].list;
    },
  },
  activated() {
    this.$refs.scroll.refresh();
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    // console.log("activated");
  },
  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY();
    // console.log("deactivated");
  },
  created() {
    // 一般created中只写主要逻辑，不写具体的方法实现
    // 1.请求多个数据(将原始的getHomeMultidata请求函数抽取到方法中)
    this.getHomeMultidata();

    // 2.请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");

  },
  mounted() {
    // 1.监听item图片加载完成
    const refresh = debounce(this.$refs.scroll.refresh, 500);
    this.$bus.$on("homeItemImgLoad", () => {
      // console.log("--------");
      // 此处的refresh形成闭包，外部赋值只会有一次
      refresh();
    });
  },
  methods: {
    /**
     * 事件监听相关
     */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentGoods = "pop";
          break;
        case 1:
          this.currentGoods = "new";
          break;
        case 2:
          this.currentGoods = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },

    contentScroll(position) {
      // 判断BackTop是否显示
      this.isShowBackTop = Math.abs(position.y) > 1000;

      // 决定tabControl是否吸顶（position：fixed）
      this.isTabFixed = (-position.y) > this.tabOffsetTop;
    },

    loadMore() {
      this.getHomeGoods(this.currentGoods);
    },

    swiperImageLoad() {
      // 2.获取tabcontrol的offsetTop
      // 所有的组件都有一个属性$el，用于获取组件中的元素
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },

    /**
     * 网络请求相关
     */
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      // 调用的是home.js里封装的getHomeGoods函数
      getHomeGoods(type, page).then((res) => {
        // ...ES6扩展运算符，结构数组
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
      });
    },
  },
};
</script>

<style scoped>
/* scoped 是作用域，只针对当前vue里面的元素生效 */
#home {
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
}
#home .home-nav {
  background-color: #e8989a;
  color: white;
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
}
/* .tab-control { */
  /* 粘性定位，在没有达到设置的值以前，默认为static，达到之后，内部会将属性自动修改为fixed，移动端一般支持，网页端兼容性较差 */
  /* position: sticky; */
  /* top: 44px; */
  /* z-index: 9; */
/* } */
.tabFixed {
  z-index: 9;
  position: relative;
}
.wrapper-content {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  overflow: hidden;
}
</style>