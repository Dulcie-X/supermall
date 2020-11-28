<template>
  <div v-if="Object.keys(detailInfo).length !== 0" class="detail-goods-info">
    <div class="info-desc clear-fix">
      <div class="start"><span></span></div>
      <div class="desc">{{detailInfo.desc}}</div>
      <div class="end"><span></span></div>
    </div>
    <div v-for="(item, index) in detailInfo.detailImage" :key="index">
      <div class="info-key">{{item.key}}</div>
      <div class="info-list">
        <img v-for="(item, index) in item.list" :key="index" :src="item" @load="imageLoad">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailGoodsInfo",
  props: {
    detailInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    // 判断当所有图片加载完进行一次回调
    imageLoad() {
        this.$emit('imageLoad');
    },
  },
}
</script>

<style scoped>
  .detail-goods-info{
    margin: 10px 5px;
    padding-bottom: 20px;
    border-bottom: 4px solid rgba(200,200,200,0.3);
  }

  .start{
    border-bottom: 1px solid var(--color-text);
    width: 25%;
    margin: 10px 0;
  }
  .start span{
    background-color: var(--color-text);
    display: inline-block;
    width: 5px;
    height: 5px;
    vertical-align: bottom;
  }

  .end{
    border-bottom: 1px solid var(--color-text);
    width: 25%;
    margin: 10px 0;
    float: right;
  }
  .end span{
    background-color: var(--color-text);
    /* display: inline-block; */
    width: 5px;
    height: 5px;
    vertical-align: bottom;
    float: right;
  }

  .desc{
    font-size: 12px;
  }

  .info-key{
    font-size: 12px;
    padding: 5px 20px;
    text-align: center;
  }

  .info-list img{
    width: 100%;
  }

</style>