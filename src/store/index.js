import Vue from 'vue';
import Vuex from 'vuex';
import main from './model/main';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        main,
    },
});
