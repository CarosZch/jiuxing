<template>
    <van-nav-bar class="zy-head"
        :title="title"
        :right-text="rightText"
        :left-arrow="isShowBack"
        @click-left="onClickLeft"
        @click-right="onClickRight"
    />
</template>
<script>
export default {
    props: {
        isShowBack: {
            default: true,
            type: Boolean,
        },
        title: {
            default: '',
            type: String,
        },
        rightText: {
            default: '',
            type: String,
        },
    },
    methods: {
        onClickLeft() {
            this.$router.back();
        },
        onClickRight() {},
    },
};
</script>
<style lang="less">
.zy-head {
    &.van-nav-bar {
        background-color: #f77;
    }
    .van-nav-bar__title {
        color: #fff;
    }
    .van-icon-arrow-left.van-nav-bar__arrow {
        color: #fff;
    }
}
</style>
