<template>
  <div class="tab-content-category">
    <div class="item" v-for="(item, index) in subcategories.list" :key="index">
      <a :href="item.link">
        <img class="item-img" :src="item.image" alt="" />
        <div class="item-text">{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabContentCategory",
  props: {
    subcategories: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style scoped>
  .tab-content-category{
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
  }
  .tab-content-category .item{
    width: 50%;
    text-align: center;
    font-size: 12px;
  }
  .tab-content-category .item img{
    width: 60%;
  }
</style>