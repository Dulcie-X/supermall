<template>
  <div class="bottom-bar">
    <div class="bar-left">
      <div>
        <i class="icon service"></i>
        <span class="text">客服</span>
      </div>
      <div>
        <i class="icon shop"></i>
        <span class="text">店铺</span>
      </div>
      <div>
        <i class="icon collect"></i>
        <span class="text">收藏</span>
      </div>
    </div>
    <div class="bar-right">
      <div class="cart" @click="addToCart">加入购物车</div>
      <div class="buy">购买</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBottomBar",
  methods: {
    addToCart() {
      this.$emit("addCart");
    }
  }
}
</script>

<style scoped>
  .bottom-bar{
    height: 49px;
    background-color: #fff;
    position: relative;
    display: flex;
  }

  .bar-left, .bar-right{
    flex: 1;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .bar-left{
    margin: 0 10px;
  }
  .bar-right{
    text-align: center;
  }

  .bar-left .icon{
    background: url("~assets/img/detail/detail_bottom.png") 0 0 / 100%;
    display: block;
    width: 22px;
    height: 22px;
    margin: 5px auto 3px;
  }
  .bar-left .text{
    font-size: 12px;
  }

  .bar-left .service{
    background-position: 0 -52px;
  }
  .bar-left .shop{
    background-position: 0 -98px;
  }

  .bar-right div{
    flex: 1;
    font-size: 14px;
  }
  .bar-right .cart{
    background-color: rgb(236, 154, 1);
    height: 49px;
    line-height: 49px;
    color:#fff;
  }
  .bar-right .buy{
    background-color: rgb(255, 70, 0);
    height: 49px;
    line-height: 49px;
    color:#fff;
  }
</style>