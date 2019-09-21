<template>
    <div style="height: 100%;">
        <div class="table-head">
            <el-button type="primary" @click="addQuestionnaireList()">添加</el-button>
        </div>
        <div>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="title" label="标题"></el-table-column>
                <el-table-column prop="created_at" label="创建时间"></el-table-column>
                <el-table-column prop="updated_at" label="修改时间"></el-table-column>
                <el-table-column prop="description" label="结果描述"></el-table-column>
                <el-table-column prop="suggest" label="结果建议"></el-table-column>
                <el-table-column label="结果建议图片">
                  <template slot-scope="scope">
                    <img style="width: 100%;" :src="scope.row.image" alt="">
                  </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="editQuestionnaireList(scope.row)">修改</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <Dialog ref="dialog" :data="selectItem" @getList="getQuestionnaireList"></Dialog>
    </div>
</template>

<script>
import Dialog from './dialog';

export default {
    mounted() {
        this.getQuestionnaireList();
    },
    data() {
        return {
            tableData: [],
            selectItem: [],
            editDialig: false,
        };
    },
    components: {
        Dialog,
    },
    methods: {
        async getQuestionnaireList() {
            const res = await this.$request(this.$api.getQuestionnaireList, 'post', {});
            if (res.data.code === '00001') this.tableData = res.data.data.tests;
        },
        addQuestionnaireList() {
            this.selectItem = null;
            this.dialogShow();
        },
        editQuestionnaireList(row) {
            this.selectItem = row;
            this.dialogShow();
        },
        dialogShow() {
            this.$refs.dialog.show();
        },
    },
};
</script>

<style lang="less" scoped>

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
