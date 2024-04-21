<template>
  <div class="app-container">
    <div class="content">
      <div class="header">
        <el-form :inline="true">
          <el-row>
            <el-col :span="6">
              <el-form-item label="名称：">
                <el-input
                    v-model="queryForm.name1"
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
              <el-button type="primary">查询</el-button>
              <el-button type="primary">重置</el-button>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="main">
        <el-table :data="tableData" height="100%">
          <el-table-column label="序号"></el-table-column>
          <el-table-column label="API信息"></el-table-column>
          <el-table-column label="监控统计访问量"></el-table-column>
          <el-table-column label="访问源"></el-table-column>
          <el-table-column label="访问耗时"></el-table-column>
        </el-table>
      </div>
      <div class="footer">
        <el-pagination
            :total="1000"
            background
            layout="total, prev, pager, next, sizes"
            style="margin-top:10px"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ApiUsage",
  data() {
    return {
      queryForm: {
        name1: "",
        name2: "",
        name3: "",
        name4: "",
        name5: "",
        status: "",
      },
      tableData: [
        {
          fileName: "api1",
          fileStatus: "已接收",
        },
      ],

      editDialogVisible: false,
    };
  },
  methods: {},
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

  .header {
  }

  .main {
    flex: 1;
    display: flex;
  }

  .footer {
  }
}
</style>
