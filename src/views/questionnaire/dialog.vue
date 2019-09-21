<template>
    <el-dialog :title="isAdd ? '创建问卷' : '编辑问卷'" :visible.sync="isShow" width="80%">
        <el-form label-width="100px">
            <el-form-item label="测试标题">
                <el-input v-model="formData.title"></el-input>
            </el-form-item>
            <el-form-item label="测试描述">
                <el-input v-model="formData.description" type="textarea"></el-input>
            </el-form-item>
            <el-form-item label="结果建议图片">
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
            <el-form-item label="结果建议">
                <el-input v-model="formData.suggest"></el-input>
            </el-form-item>
            <el-form-item label="顺序">
                <el-input v-model="formData.order" type="number"></el-input>
            </el-form-item>
            <el-form-item label="问题列表">
                <div class="fake-btn" @click="addQuestionsList">添加</div>
                <el-table
                    :data="formData.questions"
                    style="width: 100%">
                    <el-table-column label="问题名称" prop="title" />
                    <el-table-column label="问题排序" prop="order" />
                    <el-table-column label="选项一分数" prop="ans_1" />
                    <el-table-column label="选项二分数" prop="ans_2" />
                    <el-table-column label="选项三分数" prop="ans_3" />
                    <el-table-column label="选项四分数" prop="ans_4" />
                    <el-table-column label="选项五分数" prop="ans_5" />
                    <el-table-column label="操作" width="160">
                        <template slot-scope="scope">
                            <el-button style="margin-left: 5px;" @click="editQuestions(scope.$index)" size="small">
                                编辑
                            </el-button>
                            <el-button @click="formData.questions.splice(scope.$index, 1)" size="small">
                                移除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="confirm()">{{isAdd ? '上 传 问 卷' : '修 改 问 卷'}}</el-button>
            </el-form-item>
        </el-form>
        <DialogMini ref="dialogMini" :data="targetSocre" @getSocre="getSocre" />
    </el-dialog>
</template>

<script>
import imageCompress from '@/utils/compress';
import imgUpload from '@/api/imgUpload';
import apiConfig from '@/api/apiConfig';
import DialogMini from './dialog_mini';

export default {
    data() {
        return {
            imageUrl: apiConfig.baseURL + apiConfig.upload,
            formData: {
                title: '', // 测试标题
                description: '', // 描述
                image: '', // 结果建议图片
                suggest: '', // 结果建议
                order: '', // 顺序
                questions: [],
            },
            targetSocre: {
                index: -1,
                data: {}
            },
            isShow: false,
            isAdd: true,
        };
    },
    components: {
        DialogMini,
    },
    props: {
        data: {
            default: null,
        },
    },
    watch: {
        async isShow(isShow) {
            if (!isShow) return;
            if (this.data) {
                const { data: { data } } = await this.$request(this.$api.detailQuestionnaireList, 'post', { test_id: this.data.id });
                this.formData = {
                    questions: data.questions,
                    ...data.test,
                };
                this.isAdd = false;
            } else {
                this.formData = {
                    title: '',
                    description: '',
                    image: '',
                    suggest: '',
                    order: '',
                    questions: [],
                };
                this.isAdd = true;
            }
        },
    },
    methods: {
        show() {
            this.isShow = true;
        },
        handleAvatarSuccess(res, file) {
            this.formData.image = URL.createObjectURL(file.raw);
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
            if (!this.formData.questions.length) {
                this.$message({ message: '请添加问题列表', type: 'warning' })
                return
            }
            const res = await this.$request(this.$api.addQuestionnaireList, 'post', this.formData);
            if (res.data.code === '00001') {
                this.$message({ message: '添加成功', type: 'success' });
                this.isShow = false;
            }
        },
        async edit() {
            const data = {
                test_id: this.data.id,
                ...this.formData
            }
            data.questions.forEach(val => {
                val.request_id = val.test_id
            })
            if (!data.questions.length) {
                this.$message({ message: '请添加问题列表', type: 'warning' })
                return
            }
            const res = await this.$request(this.$api.editQuestionnaireList, 'post', data);
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
        addQuestionsList() {
            this.targetSocre = {
                index: -1,
                data: {}
            }
            this.$refs.dialogMini.show();
        },
        getSocre(value) {
            if (value.index === -1) {
                this.formData.questions.push(value.data);
            } else {
                for (const key in value.data) {
                   this.formData.questions[value.index][key] = value.data[key]
                }
            }
        },
        editQuestions(index) {
            this.targetSocre = {
                index,
                data: this.formData.questions[index]
            }
            this.$refs.dialogMini.show()
        }
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
