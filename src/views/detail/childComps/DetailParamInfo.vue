<template>
  <div v-if="Object.keys(paramInfo).length !== 0" class="param-info">
    <table class="detail-size">
      <tr v-for="(arry1, index1) in paramInfo.sizes[0]" :key="index1">
        <td v-for="(arry2, index2) in arry1" :key="index2">{{arry2}}</td>
      </tr>
    </table>
    <table class="detail-param">
      <tr v-for="(arry1, index1) in paramInfo.infos" :key="index1">
        <td v-for="(item, index2) in arry1" :key="index2" :class="index2">{{item}}</td>
      </tr>
    </table>
    <div v-if="paramInfo.image" class="image-param">
      <img :src="paramInfo.image" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailParamInfo",
  props: {
    paramInfo: {
      type: Object,
      default() {
        return {};
      }
    },
  },
  data() {
    return {
      isHeightText: false,
    }
  }
}
</script>

<style scoped>
.param-info{
  border-bottom: 4px solid rgba(200,200,200,0.3);
}
  .detail-size, .detail-param{
    border-collapse: collapse;
    width: 90%;
    margin: 20px 10px;
    font-size: 12px;
    border-bottom: 2px solid rgba(200,200,200,0.3);
  } 
  .detail-size td, .detail-param td{
    padding: 10px;
    border-bottom: 1px solid rgba(200,200,200,0.3);
  }
  .key{
    width: 30%;
  }
  .value{
    color: var(--color-high-text);
  }
  .image-param img{
    width: 100%;
  }
</style>