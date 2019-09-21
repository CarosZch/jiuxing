<template>
    <div class="img-preview" v-if="isShow">
        <img class="img-preview__img" :src="psrc" alt="">
        <div class="close-btn" @click="hide">
            <i class="el-icon-close" style="font-size: 45px;color: #fff;"></i>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            isShow: false,
        };
    },
    props: {
        psrc: {
            default: '',
        },
    },
    methods: {
        show() {
            this.isShow = true;
        },
        hide() {
            this.isShow = false;
        },
    },
};
</script>
<style lang="less" scoped>
.img-preview {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 10;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .5);
    &__img {
        width: 50%;
        max-height: 90%;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate3d(-50%, -50%, 0);
    }
}
.close-btn {
    position: absolute;
    right: 0;
    top: 0;
    width: 50px;
    height: 50px;
    cursor: pointer;
}
</style>
