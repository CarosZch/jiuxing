<template>
    <div style="height: 100%;">
        <div>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="user_name" label="用户名" />
                <el-table-column prop="title" label="建议标题" />
                <el-table-column label="建议图片" >
                    <template slot-scope="scope">
                        <img :src="scope.row.image" style="width: 100%;" alt="">
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
export default {
    async mounted() {
        const res = await this.$request(this.$api.getUserList, 'post', {});
        if (res.data.code === '00001') this.tableData = res.data.data.results.data;
    },
    data() {
        return {
            editData: null,
            tableData: [],
        };
    },
};
</script>
