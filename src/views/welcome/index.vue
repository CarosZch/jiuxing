<template>
    <div>
        <p style="font-size: 24px;padding: 100px 0;text-align:center;color:#999;">欢迎来到九型体质管理系统</p>
    </div>
</template>
<script>
export default {
    mounted() { // 仅用于在首页请求，如果用户未登录，则跳转到登录页面
        this.getCateList();
    },
    methods: {
        getCateList() {
            this.$request(this.$api.getAdminList, 'post', {});
        },
    },
};
</script>
