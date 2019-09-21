<template>
    <div class="sign">
        <div class="sign__container">
            <div class="sign__title">用户登录</div>
            <el-form ref="form" :model="form">
                <el-form-item>
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input type="password" v-model="form.password"></el-input>
                </el-form-item>
                <el-form-item class="text-center">
                    <el-button style="width: 140px;" type="primary" @click="onSubmit">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import { mapMutations } from 'vuex';

export default {
    data() {
        return {
            form: {
                name: '',
                password: '',
            },
        };
    },
    methods: {
        ...mapMutations([
            'STORE_USER_INFO',
        ]),
        async onSubmit() {
            const res = await this.$request(this.$api.signin, 'post', this.form);
            if (res.data.code === '00001') {
                this.STORE_USER_INFO(res.data.data.token);
                this.$message({
                    message: '欢迎回来',
                    type: 'success',
                });
                setTimeout(() => {
                    window.localStorage.setItem('name', this.form.name);
                    this.$router.replace('/');
                }, 500);
            } else {
                this.$message({
                    message: res.data.msg,
                    type: 'error',
                });
            }
        },
    },
};
</script>
<style lang="less" scoped>
.sign {
    background: url(../../assets/img/bg/login-bg.jpg) no-repeat center center / cover;
    height: 100%;
    position: relative;
    &__title {
        padding: 15px 0;
        text-align: center;
        font-size: 26px;
        font-weight: bold;
    }
    &__container {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate3d(-50%, -50%, 0);
        padding: 30px;
        border: 1px solid lightblue;
        border-radius: 10px;
        width: 400px;
        background: rgba(255, 255, 255, 0.3);
    }
}
</style>
