// main.js
import Plugins from './plugins.js'
import Store from './store.js'
import Router from './router.js'
import App from './app.vue'



new Vue({
  el: '#app',
  router: Router,
  store: Store,
  render: function (createElement) {
    return createElement(App)
  }
});
