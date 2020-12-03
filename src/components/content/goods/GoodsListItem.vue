<template>
  <div class="goods-item" @click="itemClick">
    <img v-lazy="showImage" alt="" @load="imageLoad">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed: {
    showImage() {
      // 此处注意this.goodsItem.show.img需放在最后，因为如果goodsItem没有show属性，那this.goodsItem.show.img.show.img将会报错
      return this.goodsItem.image || this.goodsItem.img || this.goodsItem.show.img ;
    }
  },
  methods: {
    imageLoad() {
      if(this.$route.path.indexOf('/home') !== -1) {
        this.$bus.$emit('homeItemImgLoad');
      }
      if(this.$route.path.indexOf('/detail') !== -1) {
        this.$bus.$emit('detailItemImgLoad');
      }
    },
    itemClick() {
      // 便于后面从详情页返回至主页
      this.$router.push('/detail/' + this.goodsItem.iid);
    }
  }
}
</script>

<style>
  /* .goods{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding:1%;
  } */

  .goods-item{
    padding-bottom: 40px;
    position: relative;
    width: 48%;
  }

  .goods-item img{
    width: 100%;
    border-radius: 5px;
  }

  .goods-info{
    font-size: 12px;
    text-align: center;
    overflow: hidden;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
  }

  .goods-info p{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }
  .goods-info .price{
    color: var(--color-high-text);
    margin-right: 20px;
  }
  .goods-info .collect{
    position: relative;
  }

  .goods-info .collect::before{
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") ;
    background-size: contain;
  }
</style>