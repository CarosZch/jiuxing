<template>
    <div style="height: 100%;">
        <div class="table-head">
            <el-button type="primary" @click="addCarouse">添加</el-button>
        </div>
        <div>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="title" label="轮播标题" />
                <el-table-column prop="link" label="轮播链接" />
                <el-table-column label="轮播图片">
                    <template slot-scope="scope">
                        <img :src="scope.row.image" style="width: 100%;" alt="">
                    </template>
                </el-table-column>
                <el-table-column prop="order" label="轮播顺序" />
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="editAdmin(scope.row)">修改</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <Dialog ref="dialog" :data="editData" @getList="getCarouselList"></Dialog>
    </div>
</template>
<script>
import Dialog from './dialog';

export default {
    mounted() {
        this.getCarouselList();
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
        addCarouse() {
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
        async getCarouselList() {
            const res = await this.$request(this.$api.getCarouselList, 'post', {});
            if (res.data.code === '00001') this.tableData = res.data.data.carousels;
        },

    },
};
</script>
