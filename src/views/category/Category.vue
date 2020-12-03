<template>
  <div class="category">
    <nav-bar class="category-top-navbar">
      <template v-slot:center>
        <div>商品分类</div>
      </template>
    </nav-bar>
    <div class="categorydata">
      <div class="category-nav-bar">
        <category-nav-bar 
          :categories="categories" 
          :current-index="currentIndex"
          @selectItem="selectItem"
        ></category-nav-bar>
      </div>
      <scroll 
        class="category-content"
        ref="scroll"
      >
        <div>
          <tab-content-category
            :subcategories="showSubcategory"
          ></tab-content-category>
          <tab-control :titles="['综合', '新品', '销量']" @tabClick="tabClick"></tab-control>
          <tab-content-detail :category-detail="showDetailcategory"></tab-content-detail>
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";
import Scroll from 'components/common/scroll/Scroll.vue';
import TabControl from 'components/content/tabControl/TabControl.vue'

import CategoryNavBar from "./childComps/CategoryNavBar.vue"
import TabContentCategory from "./childComps/TabContentCategory.vue"
import TabContentDetail from "./childComps/TabContentDetail.vue"

import { getCategory,getSubCategory,getDetailCategory } from "network/category.js";
import {debounce} from "common/utils.js";

export default {
  name: "Category",
  components: {
    NavBar,
    CategoryNavBar,
    TabContentCategory,
    Scroll,
    TabControl,
    TabContentDetail,
  },
  data() {
    return {
      categories: [],
      currentIndex: -1,
      categoryData: {},
      currentType: 'pop',
    }
  },
  created() {
    // 请求分类数据
    this.getCategories();

    // 获取某类数据的详细分类数据
    
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
  computed: {
    showSubcategory() {
		  if (this.currentIndex === -1) return {}
      return this.categoryData[this.currentIndex].subcategories
    },
    showDetailcategory() {
      if (this.currentIndex === -1) {
        return [];
      }else{
        return this.categoryData[this.currentIndex].categoryDetail[this.currentType];
      }
    }
  },
  methods: {
    getCategories() {
      // 获取分类数据
      getCategory().then((res) => {
      // console.log(res.data);
      this.categories = res.data.category.list;

      // 2.初始化每个类别的子数据
      for (let i = 0; i < this.categories.length; i++) {
        this.categoryData[i] = {
          subcategories: {},
          categoryDetail: {
            pop: [],
            new: [],
            sell: []
          }
        }
      }

      // 请求第一个分类数据
      // console.log(this.categories[0].maitKey);
      this.getSubCategories(0);
      });
      
    },

    getSubCategories(index) {
      this.currentIndex = index;
      const maitKey = this.categories[index].maitKey;
      getSubCategory(maitKey).then(res => {
        // console.log(res.data);
        this.categoryData[index].subcategories = res.data;
        this.categoryData = {...this.categoryData};
        this.getDetailCategories('pop');
        this.getDetailCategories('sell');
        this.getDetailCategories('new');
        // console.log(this.categoryData);
      });
    },

    getDetailCategories(type) {
      const miniWallkey = this.categories[this.currentIndex].miniWallkey;
      // 发送请求
      getDetailCategory(miniWallkey, type).then(res => {
        // console.log(res);
        this.categoryData[this.currentIndex].categoryDetail[type] = res;
        this.categoryData = {...this.categoryData};
      });
    },

    selectItem(index) {
      this.getSubCategories(index);
    },

    tabClick(index) {
      switch(index) {
        case 0:
          this.currentType = 'pop';
          break;
        case 1:
          this.currentType = 'new';
          break;
        case 2:
          this.currentType = 'sell';
          break;
      }

    }
  },
}
</script>

<style scoped>
  .category-top-navbar{
    background-color: var(--color-tint);
    color: white;
    position: relative;
    z-index: 9;
  }

  .category-nav-bar{
    position: fixed;
    left: 0;
    right: 70%;
    top: 44px;
    bottom: 49px;
  }

  .categorydata{
    position: fixed;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;
    display: flex;
    justify-content: space-between;
  }

  .category-content{
    position: fixed;
    left: 30%;
    right: 0;
    top: 44px;
    bottom: 49px;
  }
  /* .category-nav-bar{
    background-color:#f6f6f6;
  } */
</style>