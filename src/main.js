import Vue from 'vue';
import VueClipboard from 'vue-clipboard2';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import '@/assets/less/index.less';
import request from '@/api/request';
import apiConfig from '@/api/apiConfig';

Vue.use(ElementUI);
Vue.use(VueClipboard);
Vue.prototype.$request = request; // 绑定全局请求函数
Vue.prototype.$api = apiConfig;

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
