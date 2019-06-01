import LoadingComponent from './loading.vue';

let $vm = null;

export default {
  install(Vue) {
    if (!$vm) {
      const LoadingPlugin = Vue.extend(LoadingComponent);

      $vm = new LoadingPlugin({
        el: document.createElement('div')
      });

      document.body.appendChild($vm.$el);
    }
    // console.log($vm);

    $vm.show = false;

    let loading = {
      show(title) {
        $vm.show = true;
        $vm.title = title;
      },
      hide() {
        setTimeout( () => {
          $vm.show = false;
        }, 500);
      }
    };

    if (!Vue.$loading) {
      Vue.$loading = loading;
      Vue.prototype.$loading = Vue.$loading;
    } else {
      console.log('loading组件已被注册');
    }

    // Vue.mixin({
    //   created() {
    //     this.$loading = Vue.$loading;
    //   }
    // });
  }
};