<template>
  <div v-if="categoryDetail.length != 0">
    <!-- <div>{{categoryDetail[0].img}}</div> -->
    <goods-list :goods="categoryDetail"></goods-list>
  </div>
</template>

<script>
import GoodsList from "components/content/goods/GoodsList.vue";

export default {
  name: "TabContentDetail",
  components: {
    GoodsList,
  },
  props: {
    categoryDetail: {
      type: Array,
      default() {
        return [];
      },
    },
  },
}
</script>

<style scoped>

</style>