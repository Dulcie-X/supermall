<template>
  <div class="cart-list-item">
    <div class="item-selector">
      <check-button :is-checked="product.checked" @click.native="checkClick"></check-button>
    </div>
    <div class="image-in-cart">
      <img :src="product.image" alt="">
    </div>
    <div class="goodinfo-in-cart">
      <div class="title-in-cart">{{product.title}}</div>
      <div class="describe-in-cart">{{product.desc}}</div>
      <div class="price-count">
        <div class="paice-in-cart">{{product.price | showPrice}}</div>
        <div>{{product.count | showCount}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton.vue"

export default {
  name: "CartListItem",
  components: {
    CheckButton,
  },
  props: {
    product: {
      type: Object,
      default() {
        return {};
      }
    },
    itemIndex: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    checkClick() {
      // this.product.checked = !this.product.checked;
      this.$store.commit('convertCheckButton', this.itemIndex);
    },
  },
  filters: {
    showPrice(price) {
      return "￥" + price;
    },
    showCount(count) {
      return "x" + count;
    }
  }
}
</script>

<style scoped>
  .cart-list-item{
    padding: 2vw;
    border: 1px solid rgba(200,200,200,0.3);
    display: flex;
    justify-content: space-evenly;
    width: 100%;
    box-sizing: border-box;
  }
  .item-selector{
    width: 10px;
    padding-right: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .image-in-cart{
    width: 100%;
  }
  .image-in-cart img{
    width:100%;
    border-radius: 5%;
  }
  .goodinfo-in-cart{
    width: 70%;
    padding-left: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .goodinfo-in-cart .title-in-cart, .goodinfo-in-cart .describe-in-cart {
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    
  }
  .title-in-cart{
    font-size: 15px;
  }
  .describe-in-cart{
    font-size: 12px;
  }

  .price-count{
    display: flex;
    justify-content: space-between;
    font-size: 14px;
  }
  .paice-in-cart{
    color: rgb(236, 154, 1);
    font-weight: 600;
  }
</style>