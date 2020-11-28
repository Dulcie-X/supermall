<template>
  <div class="check-button" :class="{check: isChecked}">
    <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
export default {
  name: "CheckButton",
  props: {
    isChecked: {
      type: Boolean,
      default: false,
    }
  }
}
</script>

<style scoped>
 .check-button{
   display: flex;
   justify-content: center;
   align-items: center;
 }
 .check-button img{
   border: 1px solid #aaa;
   border-radius: 50%;
   width: 12px;
 }
 .check img{
   border-color: var(--color-high-text);
   background-color: var(--color-high-text);
 }
</style>