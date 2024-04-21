<template>
  <div class="app-container">
    <div class="content">
      <div class="header">
        <el-form :inline="true">
          <el-row>
            <el-col :span="6">
              <el-form-item label="文件创建时间：">
                <el-input
                    v-model="queryForm.fileCreateTime"
                    placeholder="请输入名称"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="状态：">
                <el-select v-model="queryForm.status" placeholder="请选择状态">
                  <el-option label="已接受" value="1"></el-option>
                  <el-option label="开发中" value="2"></el-option>
                  <el-option label="测试中" value="3"></el-option>
                  <el-option label="待投产" value="4"></el-option>
                  <el-option label="已发布" value="5"></el-option>
                  <el-option label="驳回" value="6"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="名称：">
                <el-input
                    v-model="queryForm.name2"
                    placeholder="请输入名称"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="名称：">
                <el-input
                    v-model="queryForm.name3"
                    placeholder="请输入名称"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="名称：">
                <el-input
                    v-model="queryForm.name4"
                    placeholder="请输入名称"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="名称：">
                <el-input
                    v-model="queryForm.name5"
                    placeholder="请输入名称"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-button type="primary" @click="queryPageList">查询</el-button>
              <el-button type="primary">重置</el-button>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="main">
        <el-table v-loading="loading" :data="tableData" height="100%">
          <el-table-column label="序号" prop="id"></el-table-column>
          <el-table-column label="文件名" prop="fileName"></el-table-column>
          <el-table-column label="文件生成时间" prop="fileCreateTime"></el-table-column>
          <el-table-column label="文件大小" prop="fileSize"></el-table-column>
        </el-table>
      </div>
      <div class="footer">
        <el-pagination
            :page-size="size"
            :total="total"
            background
            layout="total, prev, pager, next, sizes"
            style="margin-top: 10px"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "DocGeneration",
  data() {
    return {
      queryForm: {
        name1: "",
        name2: "",
        name3: "",
        name4: "",
        name5: "",
        status: "",
        fileCreateTime: '2022-03-28 17:05:38'
      },
      size: 10,
      total: 0,
      pages: 0,
      page: 1,
      loading: true,
      tableData: [],

      editDialogVisible: false,
    };
  },
  methods: {
    async queryPageList() {
      this.loading = true;
      let res = await request({
        url: `data/service/day/file/record?page=${this.page}&size=${this.size}&fileCreateTime=${this.queryForm.fileCreateTime}`,
        method: 'get'
      })
      if (res.data && res.data.records) {
        this.total = res.data.total;
        this.pages = res.data.pages;
        this.tableData = res.data.records;
      }
      this.loading = false;
      console.log(res)
    },
    handleSizeChange(val) {
      this.size = val;
      this.queryPageList();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.queryPageList();
    }
  },
  mounted() {
    this.queryPageList()
  }
};
</script>

<style lang="scss" scoped>

.app-container {
  height: calc(100vh - 84px);
}

.content {
  display: flex;
  height: 100%;
  flex-direction: column;


  .main {
    flex: 1;
    display: flex;
  }


}
</style>
