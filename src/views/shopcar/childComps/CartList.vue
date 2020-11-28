<template>
  <div class="cart-list">
    <scroll class="wrapper-content" ref="scroll">
      <cart-list-item v-for="(item, index) in cartList" :key="index" :product="item" :item-index="index"></cart-list-item>
    </scroll>
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll.vue';
import CartListItem from './CartListItem.vue'

import {mapGatters, mapGetters} from 'vuex';

export default {
  name: "CartList",
  components: {
    Scroll,
    CartListItem,
  },
  computed: {
    ...mapGetters(['cartList']),
  },
  activated() {
    this.$refs.scroll.refresh();
  }
}
</script>

<style scoped>
  .cart-list{
    position: inherit;
    height: calc(100vh - 44px - 49px - 40px);
  }
  .wrapper-content{
    position: absolute;
    top: 44px;
    bottom: 89px;
    left: 0;
    right: 0;
    overflow: hidden;
  }
</style>