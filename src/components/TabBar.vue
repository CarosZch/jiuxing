<template>
    <van-tabbar v-model="active" active-color="#07c160">
        <van-tabbar-item icon="home-o">首页</van-tabbar-item>
        <van-tabbar-item icon="balance-o">钱包</van-tabbar-item>
        <van-tabbar-item icon="cart-o" info="5">购物车</van-tabbar-item>
        <van-tabbar-item icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
</template>
<script>
export default {
    created() {
        this.setActive();
    },
    data() {
        return {
            active: 0,
        };
    },
    computed: {},
    watch: {
        active(index) {
            if (index === 0) this.$router.replace('/');
            if (index === 1) this.$router.replace('/money');
            if (index === 2) this.$router.replace('/cart');
            if (index === 3) this.$router.replace('/mine');
        },
    },
    methods: {
        setActive() {
            const routeName = this.$route.name;
            if (routeName === 'home') this.active = 0;
            if (routeName === 'money') this.active = 1;
            if (routeName === 'cart') this.active = 2;
            if (routeName === 'mine') this.active = 3;
        },
    },
};
</script>
<style lang="less" scoped>

</style>
