import ToastComponent from './toast.vue';

let $vm = null;

export default {
  install(Vue) {
    if (!$vm) {
      const ToastPlugin = Vue.extend(ToastComponent);

      $vm = new ToastPlugin({
        el: document.createElement('div')
      });
      document.body.appendChild($vm.$el);
    }

    $vm.show = false;

    let toast = {
      show({title = '', mask = false, duration = 1500}) {
        $vm.show = true;
        $vm.title = title;
        $vm.mask = mask;
        setTimeout( () => {
          $vm.show = false;
        }, duration);
      }
    };

    if (!Vue.$toast) {
      Vue.$toast = toast;
      Vue.prototype.$toast = Vue.$toast;
    } else {
      console.log('toast组件已被注册');
    }
  }
};