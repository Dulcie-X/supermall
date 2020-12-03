import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import toast from 'components/common/toast/index.js'
import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false;

// 添加事件总线对象
Vue.prototype.$bus = new Vue();
// 安装toast插件，本质是会去调用安装对象的install函数
Vue.use(toast);

// 使用懒加载插件
Vue.use(VueLazyLoad);

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
