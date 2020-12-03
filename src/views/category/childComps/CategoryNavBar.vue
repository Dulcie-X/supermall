<template>
  <!-- <div> -->
    <scroll class="wrapper-content">
      <div v-for="(item, index) in categories" :key="index" class="category-type" 
           :class="{active:currentIndex === index}"
           @click="selectItem(index)"
      >{{item.title}}</div>
    </scroll>
  <!-- </div> -->
</template>

<script>
import Scroll from 'components/common/scroll/Scroll.vue'

export default {
  name: "CategoryNavBar",
  components: {
    Scroll,
  },
  props: {
    categories: {
      type: Array,
      default() {
        return [];
      },
    },
    currentIndex: {
      type: Number,
      default: 0,
    }
  },
  methods: {
    selectItem(index) {
      this.$emit('selectItem', index);
    },
  }
}
</script>

<style scoped>
  .category-type{
    padding: 10px;
    font-size: 14px;
  }
  .wrapper-content{
    position: fixed;
    right: 70%;
    left: 0;
    top: 44px;
    bottom: 49px;
    background-color: #f6f6f6;
  }

  .active{
    background-color: #fff;
    color: var(--color-high-text);
    font-weight: bold;
  }
</style>