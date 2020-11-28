<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar>
      <template v-slot:center>
        <div>购物车({{cartLength}})</div>
      </template>
    </nav-bar>
    <!-- 商品列表 -->
    <cart-list></cart-list>
    <!-- 底部汇总 -->
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'

import CartList from './childComps/CartList.vue'
import CartBottomBar from './childComps/CartBottomBar.vue'

import {mapGetters} from 'vuex'

export default {
  name: "Shopcar",
  components: {
    NavBar,
    CartList,
    CartBottomBar,
  },
  computed: {
    // 两种语法
    ...mapGetters(['cartLength']),
    // 语法二（用于需要改名的情况，跟对象）
    // ...mapGetters({
    //   length: 'cartLength',
    //   list: 'cartList',
    // }),
  },
}
</script>

<style scoped>
  .nav-bar{
    background-color: var(--color-tint);
    color: #fff;
  }
</style>