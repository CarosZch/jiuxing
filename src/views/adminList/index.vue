<template>
    <div style="height: 100%;">
        <div class="table-head">
            <el-button type="primary" @click="addCate">添加</el-button>
        </div>
        <div>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="name" label="姓名"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="editAdmin(scope.row)">修改</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <Dialog ref="dialog" :data="editData" @getList="getAdminList"></Dialog>
    </div>
</template>
<script>
import Dialog from './dialog';

export default {
    mounted() {
        this.getAdminList();
    },
    data() {
        return {
            isShowDialog: false,
            editData: null,
            tableData: [],
        };
    },
    components: {
        Dialog,
    },
    methods: {
        addCate() {
            this.editData = null;
            this.showDialog();
        },
        editAdmin(row) {
            this.editData = row;
            this.showDialog();
        },
        showDialog() {
            this.$refs.dialog.show();
        },
        async getAdminList() {
            const res = await this.$request(this.$api.getAdminList, 'post', {});
            if (res.data.code === '00001') this.tableData = res.data.data.admins;
        },

    },
};
</script>
