<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-button"></check-button>
      <span>全选</span>
    </div>
    <div class="total-price">
      合计：{{totalPrice}}
    </div>
    <div class="calculate">
      结算 ({{checkLength}})
    </div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton.vue"

export default {
  name: "CartBottomBar",
  components: {
    CheckButton,
  },
  computed: {
    totalPrice() {
      return '￥' + this.$store.getters.cartList.filter(item => {
        return item.checked;
      }).reduce((preValue, item) => {
        return preValue + item.price * item.count;
      }, 0).toFixed(2);
    },
    checkLength() {
      return this.$store.getters.cartList.filter(item => {
        return item.checked
      }).length;
    },
  }
}
</script>

<style scoped>
  .bottom-bar{
    height: 40px;
    background-color: #eee;
    position: relative;
    line-height: 40px;
    display: flex;
    justify-content: space-between;
  }
  .check-content{
    display: flex;
    align-items: center;
    font-size: 12px;
    margin-left: 10px;
  }
  .check-button{
    width: 20px;
    height: 20px;
    margin-right: 5px;
  }

  .total-price{
    font-size: 12px;
    margin-left: 30px;
  }
  .calculate{
    font-size: 13px;
    padding: 0 10px;
    background-color: rgb(255, 70, 0);
    color: #fff;
  }
</style>