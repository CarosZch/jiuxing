/* eslint-disable no-param-reassign */
import * as types from '../mutation-types';
import request from '@/api/request';
import apiConfig from '@/api/apiConfig';

export default {
    state: {
        user: {},
        selectOrder: [],
    },
    mutations: {
        [types.STORE_USER_INFO](state, data) {
            window.localStorage.setItem('adminUser', data);
        },
        [types.CLEAR_USER_INFO]() {
            window.localStorage.removeItem('adminUser');
        },
        [types.GET_USER_INFO](state, data) {
            state.user = data;
        },

        [types.STORE_ROW](state, data) {
            state.selectOrder.push(data);
        },
        [types.DELETE_ROW](state, data) {
            state.selectOrder = state.selectOrder.filter(item => item.order_id !== data.order_id);
        },
        [types.CLEAR_ROW](state) {
            state.selectOrder = [];
        },
    },
    actions: {
        async getUserInfo({ commit }, data) {
            const res = await request(apiConfig.userInfo, 'post', data);
            if (res.data.code === '00001') {
                commit(types.GET_USER_INFO, res.data.data.info);
            }
        },
    },
};
