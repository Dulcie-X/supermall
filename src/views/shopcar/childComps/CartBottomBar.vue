<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-button" :is-checked="isSelectAll" @click.native="checkClick"></check-button>
      <span>全选</span>
    </div>
    <div class="total-price">
      合计：{{totalPrice}}
    </div>
    <div class="calculate" @click="calcClick">
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
  data() {
    return {
      isSelectAllButton: false,
    }
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
    isSelectAll() {
      // 此方法性能不够高，因为会把整个数组遍历完，但实际上只需要有一个元素未被选中即可完成判断
      // return !(this.$store.getters.cartList.filter(item => !item.checked).length);
      if(this.$store.getters.cartList.length === 0) return false;
      return !this.$store.getters.cartList.find(item => !item.checked);
    }
  },
  methods: {
    checkClick() {
      // console.log("监听点击");
      this.$store.commit("isSelectAll", this.isSelectAll);
    },
    calcClick() {
      if(!this.$store.getters.cartList || !this.$store.getters.cartList.find(item => item.checked)) {
        this.$toast.show('请选择购买的商品', 2000);
      }
    }
  }
}
</script>

<style scoped>
  .bottom-bar{
    height: 40px;
    background-color: #eee;
    position: fixed;
    line-height: 40px;
    display: flex;
    justify-content: space-between;
    bottom: 49px;
    left: 0;
    right: 0;
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