import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import store from './store'
import Element from 'element-ui'
import axios from 'axios'
import mavonEditor from 'mavon-editor'
import "element-ui/lib/theme-chalk/index.css"
import 'mavon-editor/dist/css/index.css'
import "./axios"
import "./permission"
import store from './store/index.js'
import layer from 'layui-layer'
import SlideVerify from 'vue-monoplasty-slide-verify'
import animated from 'animate.css'
// import jquery from 'jquery'
// Vue.use(jquery)
Vue.use(Element)
Vue.use(mavonEditor)
Vue.use(layer)
Vue.use(SlideVerify)
Vue.use(animated)

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$store = store
Vue.prototype.$getViewprotSize = function () {
    return{
        width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
        height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    };
};
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
