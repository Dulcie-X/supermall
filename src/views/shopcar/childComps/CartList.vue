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
    position: fixed;
    top: 44px;
    bottom: 89px;
    right: 0;
    left: 0;
  }
  .wrapper-content{
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 0;
    right: 0;
    overflow: hidden;
  }
</style>