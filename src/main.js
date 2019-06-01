import Vue from 'vue';
import App from './App.vue';
import vLoading from './components/loading/loading';
import vToast from './components/toast/toast';

Vue.config.productionTip = false;
Vue.use(vLoading).use(vToast);

new Vue({
  render: h => h(App),
}).$mount('#app')
