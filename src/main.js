import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


import App from './App.vue'
import router from './router'
import JsonViewer from 'vue-json-viewer'

Vue.use(ElementUI);
Vue.use(JsonViewer)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
