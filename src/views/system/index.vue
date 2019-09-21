<template>
    <div style="height: 100%;">
        <el-form ref="formSystem" :model="formSystem" label-width="200px">
            <el-form-item label="平衡体制">
                <el-input v-model="formSystem.score"></el-input>
            </el-form-item>
            <el-form-item label="建议标题">
                <el-input v-model="formSystem.title"></el-input>
            </el-form-item>
            <el-form-item label="建议图片">
                <div v-show="!formSystem.image">
                    <label for="image">
                        <div class="fake-btn">添加</div>
                        <span style="padding-left: 15px;color: #ff5e5e;">(请上传图片)</span>
                    </label>
                    <input style="display:none;" id="image" @change="onUpload()" type="file">
                </div>
                <div style="margin-top: 10px;" class="img-list" v-show="formSystem.image">
                    <img :src="formSystem.image" alt="">
                    <i class="img-list__btn el-icon-delete" @click="formSystem.image=''"></i>
                </div>
            </el-form-item>
            <el-form-item class="text-center">
                <el-button style="width: 140px;" type="primary" @click="onSubmit">保 存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import imageCompress from '@/utils/compress';
import imgUpload from '@/api/imgUpload';
import apiConfig from '@/api/apiConfig';

export default {
    data() {
        return {
            formSystem: {
                score: '',
                title: '',
                image: '',
            },
            editDialig: false,
        };
    },
    async mounted() {
        const res = await this.$request(this.$api.getSystem, 'post', {});
        if (res.data.code === '00001') {
            this.formSystem = res.data.data.system
        }
    },
    methods: {
        async onSubmit() {
            const res = await this.$request(this.$api.editSystem, 'post', this.formSystem);
            if (res.data.code === '00001') {
                this.$message({
                    message: '保存成功',
                    type: 'success',
                });
            }
        },
        onUpload() {
            const { event } = window;
            imageCompress(event.target.files[0], { size: 100000 }).then((blob) => {
                this.upload(blob);
            }).catch((err) => {
                this.$message({ message: err, type: 'warning' });
            });
        },
        async upload(blob) {
            const data = new FormData();
            data.append('file', blob);
            try {
                const res = await imgUpload(this.$api.upload, data);
                if (res.data.code === '00001') {
                    this.formSystem.image = `${apiConfig.baseURL}/storage/${res.data.data.path}`;
                } else {
                    this.$message({ message: '上传失败', type: 'warning' });
                }
            } catch (err) {
                console.log(err);
            }
        },
    }
};
</script>

<style lang="less" scoped>

.fake-btn {
    display: inline-block;
    white-space: nowrap;
    cursor: pointer;
    background: #FFF;
    text-align: center;
    box-sizing: border-box;
    margin: 0;
    transition: .1s;
    font-weight: 500;
    padding: 12px 20px;
    font-size: 14px;
    line-height: 14px;
    border-radius: 4px;
    color: #FFF;
    background-color: #409EFF;
    &:hover {
        background: #74b7fd;
    }
}
.img-list {
    display: inline-block;
    position: relative;
    width: 120px;
    img {
        width: 100%;
        vertical-align: middle;
    }
    &__btn {
        position: absolute;
        top: 25px;
        right: -25px;
        cursor: pointer;
        font-size: 20px;
    }
}
</style>
