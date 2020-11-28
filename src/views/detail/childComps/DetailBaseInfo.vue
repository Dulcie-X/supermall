<template>
  <div v-if="Object.keys(goods).length !== 0" class="base-info">
    <div class="info-title">{{goods.title}}</div>
    <div class="info-price">
      <span class="new-price">{{goods.newPrice}}</span>
      <span class="old-price">{{goods.oldPrice}}</span>
      <span class="discount" v-if="Object.keys(goods.discount).length !== 0">{{goods.discount}}</span>
    </div>
    <div class="info-other">
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <span>{{goods.services[0].name}}</span>
    </div>
    <div class="info-services">
      <span>
        <img :src="goods.services[goods.services.length-1].icon" alt="">
        <span>{{goods.services[goods.services.length-1].name}}</span>
      </span>
      <span>
        <img :src="goods.services[goods.services.length-2].icon" alt="">
        <span>{{goods.services[goods.services.length-2].name}}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBaseInfo",
  props: {
    goods: {
      type: Object,
      default() {
        return {};
      }
    }
  }
}
</script>

<style scoped>
  .info-title{
    font-size: 15px;
    margin: 10px 5px;
    font-weight:550;
  }

  .info-price{
    margin: 10px 5px;
  }
  .new-price{
    font-size: 18px;
    color: var(--color-high-text);
    font-weight: bold;
  }

  .old-price{
    color:rgb(160, 160, 160);
    font-size: 10px;
    text-decoration: line-through;
    margin: 0 5px;
  }

  .discount{
    background-color: var(--color-high-text);
    color: white;
    font-size: 10px;
    padding: 2px;
    border-radius: 6px;
    vertical-align: top;
  }

  .info-other{
    font-size: 12px;
    color: rgb(160, 160, 160);
    display: flex;
    justify-content: space-between;
    padding: 5px 0;
    box-shadow: 0px 2px 1px rgba(200,200,200,0.2);
    margin: 0 5px;
  }

  .info-services{
    font-size: 12px;
    display: flex;
    justify-content: space-between;
    font-weight:500;
    padding: 20px 5px;
    border-bottom: 4px solid rgba(200,200,200,0.2);
  }
  .info-services img{
    width: 12px;
    height: 12px;
    vertical-align: middle;
    padding-bottom: 2px;
  }
</style>