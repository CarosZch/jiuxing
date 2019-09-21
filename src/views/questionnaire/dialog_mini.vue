<template>
    <el-dialog title="添加问题" :visible.sync="isShow" width="80%" append-to-body>
        <el-form :model="formData" ref="formData" label-width="100px" class="demo-dynamic">
            <el-form-item
                label="问题名称"
                prop="title"
                :rules="[{ required: true, message: '请输入问题名称', trigger: 'blur' }]"
            >
                <el-input v-model="formData.title"></el-input>
            </el-form-item>
            <el-form-item
                label="问题排序"
                prop="order"
                :rules="[{ required: true, message: '请输入问题排序', trigger: 'blur' }]"
            >
                <el-input v-model="formData.order" type="number"></el-input>
            </el-form-item>
            <el-form-item
                v-for="(item, index) in 5" :key="index"
                :label="`选项${toBigNumber(index)}分数`"
                :prop="`ans_${index + 1}`"
                :rules="[{ required: true, message: `请输入选项${toBigNumber(index)}分数`, trigger: 'blur' }]"
            >
                <el-input v-model="formData[`ans_${index + 1}`]" type="number"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="confirm()">确 定</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script>

export default {
    data() {
        return {
            isShow: false,
            formData: {
                title: '',
                order: '',
                ans_1: '',
                ans_2: '',
                ans_3: '',
                ans_4: '',
                ans_5: '',
            },
            ans_add: '',
        };
    },
    props: {
        data: {
            default: null,
        },
    },
    watch: {
        isShow(isShow) {
            if (!isShow) return;
            if (this.data.index !== -1) {
                for (const key in this.formData) {
                    this.formData[key] = this.data.data[key];
                }
            } else {
                this.formData = {
                    title: '',
                    order: '',
                    ans_1: '',
                    ans_2: '',
                    ans_3: '',
                    ans_4: '',
                    ans_5: '',
                };
            }
        },
    },
    methods: {
        toBigNumber(index) {
            switch (index) {
            case 0: return '一';
            case 1: return '二';
            case 2: return '三';
            case 3: return '四';
            case 4: return '五';
            default: return '';
            }
        },
        show() {
            this.isShow = true;
        },
        confirm() {
            this.$refs.formData.validate((valid) => {
                if (valid) {
                    this.isShow = false;
                    this.$emit('getSocre', {
                        data: this.formData,
                        index: this.data.index,
                    });
                }
            });
        },
    },
};
</script>

<style lang="less">

</style>
