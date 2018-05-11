const MyPlugin = function

    install(Vue, options) {

    Vue.myGlobalMethod = function () {
        return "Hello from [Plugin]";
    };

    Vue.directive('my-directive', {
        bind(el, binding, vnode, oldVnode) {

        }

    });

    Vue.mixin({
        created: function () {
            console.log('created');
        }

    });

    Vue.prototype.$myMethod = function (methodOptions) {

    }
}


Vue.use(MyPlugin);

export default MyPlugin;