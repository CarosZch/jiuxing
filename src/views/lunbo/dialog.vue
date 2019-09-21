<template>
    <el-dialog :title="isAdd ? '添加轮播' : '编辑轮播'" :visible.sync="isShow" width="80%">
        <el-form label-width="100px">
            <el-form-item label="轮播标题">
                <el-input v-model="formData.title"></el-input>
            </el-form-item>
            <el-form-item label="轮播链接">
                <el-input v-model="formData.link"></el-input>
            </el-form-item>
            <el-form-item label="轮播图片">
                <div v-show="!formData.image">
                    <label for="image">
                        <div class="fake-btn">添加</div>
                        <span style="padding-left: 15px;color: #ff5e5e;">(请上传图片)</span>
                    </label>
                    <input style="display:none;" id="image" @change="onUpload()" type="file">
                </div>
                <div style="margin-top: 10px;" class="img-list" v-show="formData.image">
                    <img :src="formData.image" alt="">
                    <i class="img-list__btn el-icon-delete" @click="formData.image=''"></i>
                </div>
            </el-form-item>
            <el-form-item label="轮播顺序">
                <el-input v-model="formData.order"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="confirm">确 定</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script>
import imageCompress from '@/utils/compress';
import imgUpload from '@/api/imgUpload';
import apiConfig from '@/api/apiConfig';

export default {
    data() {
        return {
            formData: {
                id: '',
                title: '',
                link: '',
                image: '',
                order: '',
            },
            isShow: false,
            isAdd: true,
        };
    },
    props: {
        data: {
            default: null,
        },
    },
    watch: {
        isShow() {
            if (this.data) {
                this.formData = {
                    id: this.data.id,
                    title: this.data.title,
                    link: this.data.link,
                    image: this.data.image,
                    order: this.data.order,
                }
                this.isAdd = false;
            } else {
                this.formData = {
                    id: '',
                    title: '',
                    link: '',
                    image: '',
                    order: '',
                }
                this.isAdd = true;
            }
        },
    },
    methods: {
        show() {
            this.isShow = true;
        },
        async confirm() {
            if (this.isAdd) {
                await this.add();
                this.$emit('getList');
            } else {
                await this.edit();
                this.$emit('getList');
            }
        },
        async add() {
            const res = await this.$request(this.$api.addCarouselList, 'post', this.formData);
            if (res.data.code === '00001') {
                this.$message({ message: '添加成功', type: 'success' });
                this.isShow = false;
            }
        },
        async edit() {
            const res = await this.$request(this.$api.editCarouselList, 'post', this.formData);
            if (res.data.code === '00001') {
                this.$message({ message: '编辑成功', type: 'success' });
                this.isShow = false;
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
                    this.formData.image = `${apiConfig.baseURL}/storage/${res.data.data.path}`;
                } else {
                    this.$message({ message: '上传失败', type: 'warning' });
                }
            } catch (err) {
                console.log(err);
            }
        },
    },
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
