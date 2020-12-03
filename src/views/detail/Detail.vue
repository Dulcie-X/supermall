<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="detailNav"></detail-nav-bar>
    <div class="scroll-wrapper">
      <scroll class="wrapper-content" 
            ref="scroll" 
            :mouse-wheel="true"
            :probe-type="3"
            @scroll="detailContentScroll">
            <!-- 属性：topImages，传入值：top-images -->
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info :param-info="paramInfo" ref="params"></detail-param-info>
      <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
      <goods-list :goods="recommends" ref="recommend"></goods-list>
    </scroll>
    </div>
    
    <detail-bottom-bar @addCart="addToCart" class="detail-bottom-bar"></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <!-- <toast :message="message" :show="show"></toast> -->
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar.vue"
import DetailSwiper from "./childComps/DetailSwiper.vue"
import DetailBaseInfo from "./childComps/DetailBaseInfo.vue"
import DetailShopInfo from "./childComps/DetailShopInfo.vue"
import DetailGoodsInfo from "./childComps/DetailGoodsInfo.vue"
import DetailParamInfo from "./childComps/DetailParamInfo"
import DetailCommentInfo from "./childComps/DetailCommentInfo.vue"
import DetailBottomBar from "./childComps/DetailBottomBar"

import Scroll from "components/common/scroll/Scroll.vue"
import GoodsList from "components/content/goods/GoodsList.vue";

import {getDetail,Goods,Shop,GoodsParam,getRecommend} from "network/detail.js"
import {debounce} from "common/utils.js"
import {backTopMixin} from "common/mixin.js"

import { mapActions } from "vuex"

// import Toast from "components/common/toast/Toast.vue"

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    Scroll,
    // Toast
  },
  mixins: [backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      refresh: null,
      themeTopYs: [],
      getThemeTopY: null,
      // message: '',
      // show: false,
    }
  },
  created() {
    // 保存传入的iid
    this.iid = this.$route.params.iid;

    // 根据iid请求详情页数据
    getDetail(this.iid).then(res => {
      console.log(res);
      // 获取顶部的图片轮播数据
      const data = res.result;
      this.topImages = data.itemInfo.topImages;
      // 获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);

      // 创建店铺信息
      this.shop = new Shop(data.shopInfo);

      // 保存商品的详情数据
      this.detailInfo = data.detailInfo;

      // 获取参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);

      // 取出评论信息
      if(data.rate.cRate !==0) {
        this.commentInfo = data.rate.list[0];
      };
    });

    // 请求推荐数据
    getRecommend().then(res => {
      this.recommends = res.data.list;
    });

    // 给getThemeTopY赋值
      this.getThemeTopY = debounce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      if(this.$refs.params) {
        this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      };
      if(this.$refs.comment) {
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      };
      if(this.$refs.recommend) {
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      };
      this.themeTopYs.push(Number.MAX_VALUE);
      // console.log(this.themeTopYs);
    }, 500);
  },
  mounted() {
    this.refresh = debounce(this.$refs.scroll.refresh, 500);
    this.$bus.$on("detailItemImgLoad", () => {
      this.refresh();
    });
  },
  methods: {
    ...mapActions(['addCart']),
    imageLoad() {
      // 此处事件监听了很多次，因此本函数执行次数也很多次，而下面赋值执行了很多次，达不到防抖效果
      // this.refresh = debounce(this.$refs.scroll.refresh, 500);
      // console.log("-----------");
      this.refresh();

      this.getThemeTopY();
    },
    titleClick(index) {
      // console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200);
    },
    detailContentScroll(position) {
      // if(-position.y >= this.themeTopYs[0] && -position.y < this.themeTopYs[1]) {
      //   this.$refs.detailNav.currentIndex = 0;
      // }else if(-position.y >= this.themeTopYs[1] && -position.y < this.themeTopYs[2]) {
      //   this.$refs.detailNav.currentIndex = 1;
      // }else if(-position.y >= this.themeTopYs[2] && -position.y < this.themeTopYs[3]) {
      //   this.$refs.detailNav.currentIndex = 2;
      // }else if(-position.y >= this.themeTopYs[3]) {
      //   this.$refs.detailNav.currentIndex = 3;
      // }else{
      //   this.$refs.detailNav.currentIndex = 0;
      // }

      for(let i = 0; i < this.themeTopYs.length-1; i++) {
        // i为字符串
        i = parseInt(i);
        // if((this.$refs.detailNav.currentIndex != i) && ((i < this.themeTopYs.length-1 && -position.y >= this.themeTopYs[i] && -position.y < this.themeTopYs[i+1]) || (i === this.themeTopYs.length-1 && -position.y >= this.themeTopYs[i]))) {
        //   this.$refs.detailNav.currentIndex = i;
        // }
        if((this.$refs.detailNav.currentIndex != i) && (-position.y >= this.themeTopYs[i] && -position.y < this.themeTopYs[i+1])) {
          this.$refs.detailNav.currentIndex = i;
        }
      }

      // 判断BackTop是否显示
      this.isShowBackTop = Math.abs(position.y) > 1000;
    },
    addToCart() {
      // 获取购物车需要展示的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;

      // 将商品添加到购物车
      // this.$store.commit('addCart', product);
      this.$store.dispatch('addCart', product).then(res => {
        // this.show = true;
        // this.message = res;
        // setTimeout(() => {
        //   this.show = false;
        //   this.message = '';
        // }, 1500);
        this.$toast.show(res, 1500);
        // console.log(this.$toast);
      });
      // 通过mapActions来dispatch actions
      // this.addCart(product).then(res => {
      //   console.log(res);
      // });
    },
  }
}
</script>

<style scoped>
  #detail{
    position: relative;
    z-index: 1;
    background-color: #fff;
    height: 100vh;
  }

  #detail .detail-nav{
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 10;
    background-color: white;
  }

  .scroll-wrapper{
    position: fixed;
    width: 100%;
    position: fixed;
    bottom: 49px;
    right: 0;
    left: 0;
    top:44px;
  }
  .wrapper-content{
    height: 100%;
    background-color: #fff;
  }

  .detail-bottom-bar{
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
  }
</style>