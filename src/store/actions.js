export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      // 1.查找之前的数组中是否有该商品
      // find函数，传入函数，函数参数为数组中的元素，函数的返回值为ture则把元素返回。
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid);

      // 2.判断oldProduct

      if (oldProduct) {
        // oldProduct.count += 1;
        context.commit("addCounter", oldProduct);
        resolve('当前商品数量+1');
      } else {
        payload.count = 1;
        // state.cartList.push(payload);
        context.commit("addToCart", payload);
        resolve("添加了新的商品");
      }
    });
  }
}