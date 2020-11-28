export default {
  // mutations唯一的目的就是修改state中的状态
  // mutations的每一个方法尽可能完成的事情比较单一
  addCounter(state, payload) {
    payload.count++;
  },
  addToCart(state, payload) {
    payload.checked = true;
    state.cartList.push(payload);
  },
  convertCheckButton(state, payload) {
    state.cartList[payload].checked = !state.cartList[payload].checked
  }
}