<template>
  <div class="profile">
    <nav-bar class="prifile-navbar">
      <template v-slot:center>
        <div>我的商城</div>
      </template>
    </nav-bar>
    <user-info></user-info>

    <section class="account">
      <div class="account-item">
        <div class="number">
          <span class="balance">0.00</span>元
        </div>
        <div class="account-info">我的余额</div>
      </div>
      <div class="account-item">
        <div class="number">
          <span class="balance">0</span>个
        </div>
        <div class="account-info">我的优惠</div>
      </div>
      <div class="account-item">
        <div class="number">
          <span class="balance">0</span>分
        </div>
        <div class="account-info">我的积分</div>
      </div>
    </section>

    <div class="user-infomation">
      <div class="item">
        <img src="~assets/img/profile/message.svg" alt="">
        <span>我的消息</span>
      </div>
      <div class="item">
        <img src="~assets/img/profile/pointer.svg" alt="">
        <span>积分商城</span>
      </div>
      <div class="item">
        <img src="~assets/img/profile/vip.svg" alt="">
        <span>会员卡</span>
      </div>
    </div>

    <div class="cart-infomation">
      <div class="item">
        <img src="~assets/img/profile/cart.svg" alt="">
        <span>我的消息</span>
      </div>
      <div class="item">
        <img src="~assets/img/profile/shopping.svg" alt="">
        <span>积分商城</span>
      </div>
    </div>

  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";

import UserInfo from "./childComps/UserInfo.vue";

export default {
  name: "Profile",
  components: {
    NavBar,
    UserInfo,
  },
}
</script>

<style>
  .prifile-navbar{
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
  }

  #profile {
    background-color: #f2f2f2;
  }
  .account {
    display: flex;
  }
  .account-item {
    width: 100%;
    background-color: #fff;
    margin-right: 1px;
    text-align: center;
  }
  .account-item:last-of-type {
    margin-right: 0;
  }
  .account-item {
    color: #666;
    font-size: 13px;
    padding: 18px;
  }
  .account-item .balance {
    font-size: 24px;
    font-weight: 700;
    color: #ff5f3e;
  }
  .account-info {
    margin-top: 6px;
  }
  .order-list, .service-list {
    margin-top: 12px;
  }

  .user-infomation, .cart-infomation{
    border-top: 10px solid rgba(200,200,200,0.2);
  }
  
  .item{
    margin: 10px;
  }
  .item img{
    width: 18px;
    margin-right: 5px;
    /* display: inline-block; */
    vertical-align: middle;
  }
  .item span{
    font-size: 14px;
  }
</style>