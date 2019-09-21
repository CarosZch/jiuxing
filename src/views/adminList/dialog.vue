<template>
    <el-dialog :title="isAdd ? '添加管理员' : '编辑管理员'" :visible.sync="isShow" width="40%">
        <el-input v-model="formData.name" placeholder="请输入姓名"></el-input>
        <el-input v-model="formData.password" type="password" placeholder="请输入密码"></el-input>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="confirm">确 定</el-button>
        </span>
    </el-dialog>
</template>
<script>
export default {
    data() {
        return {
            formData: {
                admin_id: '',
                name: '',
                password: '',
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
                this.formData.admin_id = this.data.id;
                this.formData.name = this.data.name;
                this.formData.password = '';
                this.isAdd = false;
            } else {
                this.formData.admin_id = '';
                this.formData.name = '';
                this.formData.password = '';
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
            const res = await this.$request(this.$api.addAdminList, 'post', this.formData);
            if (res.data.code === '00001') {
                this.$message({ message: '添加成功', type: 'success' });
                this.isShow = false;
            }
        },
        async edit() {
            const res = await this.$request(this.$api.editAdminList, 'post', this.formData);
            if (res.data.code === '00001') {
                this.$message({ message: '编辑成功', type: 'success' });
                this.isShow = false;
            }
        },
    },
};
</script>
