<template>
    <el-container>
        <el-aside style="width: auto;">
            <el-menu :default-active="defaultActive" router class="el-menu-vertical-demo" :collapse="isCollapsed"
                background-color="#545c64" text-color="#fff" active-text-color="#ffd04b"
            >
                <el-submenu v-for="item in menuList" :key="item.id" :index="item.id">
                    <template slot="title">
                        <i :class="item.icon"></i>
                        <span>{{item.name}}</span>
                    </template>
                    <el-menu-item v-for="subMenu in item.children" :key="subMenu.id" :index="subMenu.index">
                        {{subMenu.name}}
                    </el-menu-item>
                </el-submenu>
            </el-menu>
        </el-aside>
        <el-container>
            <el-header class="zy-header">
                <el-button v-if="!isCollapsed" class="zy-header__btn" icon="el-icon-s-fold" @click="collapse(true)"></el-button>
                <el-button v-else class="zy-header__btn" icon="el-icon-s-unfold" @click="collapse(false)"></el-button>
                <div class="zy-header__avatar">
                    <div class="zy-header__list">
                        <p class="zy-header__list-item">{{name}}</p>
                        <p class="zy-header__list-item" @click="signout">退出登录</p>
                    </div>
                </div>
            </el-header>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {
    data() {
        return {
            isCollapsed: false,
            name: window.localStorage.getItem('name'),
            menuList1: [],
            menuList: [
                {
                    name: '人员管理',
                    id: '1',
                    icon: 'el-icon-s-goods',
                    children: [
                        {
                            name: '管理员列表', id: '1-1', index: '/adminList'
                        },
                        {
                            name: '用户测试列表', id: '1-2', index: '/userList'
                        },
                    ],
                },
                {
                    name: '内容管理',
                    id: '2',
                    icon: 'el-icon-s-order',
                    children: [
                        {
                            name: '轮播管理', id: '2-1', index: '/lunbo'
                        },
                        {
                            name: '问卷管理', id: '2-2', index: '/questionnaire'
                        },
                    ],
                },
                {
                    name: '系统管理',
                    id: '3',
                    icon: 'el-icon-s-order',
                    children: [
                        {
                            name: '系统管理', id: '3-1', index: '/system'
                        },
                    ],
                },
            ],
        };
    },
    computed: {
        defaultActive() {
            return this.$route.fullPath;
        },
    },
    methods: {
        collapse(status) {
            this.isCollapsed = status;
        },
        signout() {
            this.$confirm('确定退出？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                window.localStorage.removeItem('adminUser');
                this.$router.replace('/signin');
            }).catch(() => {});
        },
    },
};
</script>
<style lang="less">
.el-header {
    background-color: #828d98;
}
.zy-header {
    position: relative;
    &__avatar {
        position: absolute;
        right: 40px;
        top: 50%;
        z-index: 4;
        transform: translate3d(0, -50%, 0);
        width: 50px;
        height: 50px;
        background: #fff;
        background: url(../../assets/img/common/member.png)no-repeat center center / cover;
        cursor: pointer;
        &:hover {
            .zy-header__list {
                display: block;
            }
        }
    }
    &__list {
        display: none;
        position: absolute;
        bottom: 0;
        right: 0;
        padding-top: 10px;
        transform: translate3d(0, 100%, 0);
        width: 150px;
        box-shadow: 0 0 10px 0 rgba(0,0,0,.2);
    }
    &__list-item {
        padding: 15px;
        text-align: center;
        background: #fff;
        & + & {
            border-top: 1px solid #f0f0f0;
        }
    }
    &__btn {
        margin-top: 10px;
    }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
}
.el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
}

.el-aside {
    height: 100%;
}

.el-main {
    background-color: #E9EEF3;
    color: #333;
}

.el-menu {
    height: 100%;
    border-right: 0;
}

body > .el-container {
    height: 100%;
}
</style>
