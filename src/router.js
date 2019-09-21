import Vue from 'vue';
import Router from 'vue-router';
import Signin from '@/views/signin';
import Welcome from '@/views/welcome';
import Inner from '@/layout/inner';
import adminList from '@/views/adminList';
import userList from '@/views/userList';
import questionnaire from '@/views/questionnaire';
import lunbo from '@/views/lunbo';
import system from '@/views/system';

Vue.use(Router);

const router = new Router({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            component: Inner,
            children: [
                {
                    path: '/',
                    name: 'welcome',
                    component: Welcome,
                    meta: { name: '欢迎' },
                },
                {
                    path: '/adminList',
                    name: 'adminList',
                    component: adminList,
                    meta: { name: '管理员列表' },
                },
                {
                    path: '/userList',
                    name: 'userList',
                    component: userList,
                    meta: { name: '用户测试列表' },
                },
                {
                    path: '/questionnaire',
                    name: 'questionnaire',
                    component: questionnaire,
                    meta: { name: '问卷管理' },
                },
                {
                    path: '/lunbo',
                    name: 'lunbo',
                    component: lunbo,
                    meta: { name: '轮播管理' },
                },
                {
                    path: '/system',
                    name: 'system',
                    component: system,
                    meta: { name: '系统管理' },
                },
            ],
        },
        {
            path: '/signin',
            name: 'signin',
            component: Signin,
            meta: { name: '登录' },
        },
    ],
});


export default router;
