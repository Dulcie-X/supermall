<template>
  <div class="shop-info" v-if="Object.keys(shop).length !== 0">
    <div class="shop-name">
      <img :src="shop.logo" alt="">
      <span>{{shop.name}}</span>
    </div>
    <div class="sell-info">
      <div class="count-info">
        <div class="count-sell">
          <div>{{shop.sell | showSells}}</div>
          <p>总销量</p>
        </div>
        <div class="count-good">
          <div>{{shop.goodsCount}}</div>
          <p>全部宝贝</p>
        </div>
      </div>
      <div class="score-info">
        <div v-for="(arr,index) in shop.score" :key="index" class="score-item">
          <div class="item-name">{{shop.score[index].name}}</div>
          <div class="item-score" :class="{betterscore: shop.score[index].isBetter == true}">{{shop.score[index].score}}</div>
          <div v-if="shop.score[index].isBetter"><span class="isbetter">高</span></div>
          <div v-else><span class="nobetter">低</span></div>
        </div>
      </div>
    </div>
    <div class="shop-bottom">
      <div class="enter-shop">进店逛逛</div>
    </div>
  </div>
</template>

<script>
export default {
  name:"DetailShopInfo",
  props: {
    shop: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  filters: {
    showSells(Csell) {
      let countSell = Csell;
      if (Csell > 10000) {
        countSell = (Csell/10000).toFixed(1) + '万';
      }
      return countSell;
    },
  },
}
</script>

<style scoped>
  .shop-name{
    margin: 25px 5px;
  }
  .shop-name img{
    width: 45px;
    vertical-align: middle;
    padding: 5px;
    border: 1px solid rgba(200,200,200,0.3);
    border-radius: 50%;
  }
  .shop-name span{
    vertical-align: middle;
    font-size: 15px;
    margin: 0 10px;
  }

  .sell-info{
    width:100%;
    display: flex;
  }
  .count-info{
    width: 50%;
    display: flex;
    justify-content: space-evenly;
    text-align: center;
    align-items: center;
    border-right: 1px solid rgba(200,200,200,0.3);
    margin: 20px 0;
  }
  .score-info{
    width: 50%;
  }
  .count-info p{
    font-size: 12px;
    margin: 8px 0;
  }
  .score-item{
    font-size: 12px;
    margin: 10px 0 10px 20px;
    overflow: hidden;
    display: flex;
  }
  .score-item div{
    /* float: left; */
    margin: 0 5px;
    flex: 1;
  }
  .score-item .item-name{
    flex: 2;
  }
  .score-item .item-score{
    color: rgb(40, 165, 40);
  }
  .score-item .betterscore{
    color: tomato;
  }
  .score-item .isbetter{
    /* float: right; */
    color: white;
    background-color: tomato;
  }
  .score-item .nobetter{
    /* float: right; */
    background-color: rgb(40, 165, 40);
    color: white;
  }

  .shop-bottom{
    text-align: center;
    padding-bottom: 20px;
    border-bottom: 4px solid rgba(200,200,200,0.2);
  }
  .enter-shop{
    font-size: 12px;
    padding: 5px 40px;
    display: inline;
    background-color: rgba(200,200,200,0.3);
    border-radius: 5px;
  }
</style>