<template>
  <div class="app-container">
    <el-dialog
        :visible="addApplicationDialogVisible"
        title="增加应用"
        @close="addApplicationDialogVisible = false"
    >
      <div style="width: 500px">
        <el-form :model="addForm">
          <el-form-item label="应用id">
            <el-input v-model="addForm.id" placeholder="请输入id"></el-input>
          </el-form-item>
          <el-form-item label="应用名称">
            <el-input v-model="addForm.appName" placeholder="请输入名称"></el-input>
          </el-form-item>
          <el-form-item label="应用code">
            <el-input v-model="addForm.appCode" placeholder="请输入code"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="handleConfirmAdd">增加</el-button>
            <el-button type="success" @click="addApplicationDialogVisible = false">取消</el-button>
          </el-form-item>
        </el-form>
      </div>

    </el-dialog>
    <el-dialog :visible="editApplicationDialogVisible" @close="editApplicationDialogVisible = false">
      <el-form :model="editForm">
        <!--        <el-form-item label="应用ID">-->
        <!--          <el-input v-model="editForm.id" disabled></el-input>-->
        <!--        </el-form-item>-->
        <el-form-item label="应用名称">
          <el-input v-model="editForm.appName"></el-input>
        </el-form-item>
        <el-form-item label="应用code">
          <el-input v-model="editForm.appCode"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="handleConfirmEdit">修改</el-button>
          <el-button type="success" @click="editApplicationDialogVisible = false">取消</el-button>

        </el-form-item>
      </el-form>
    </el-dialog>
    <div class="content">
      <div class="header">
        <el-form :inline="true" :model="queryForm">
          <el-form-item label="标题1">
            <el-input
                v-model="queryForm.content1"
                placeholder="请输入内容"
            ></el-input>
          </el-form-item>
          <el-form-item label="">
            <el-button type="primary" @click="handleAddApplication"
            >新建应用
            </el-button
            >
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="queryPageList">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="main">
        <el-table v-loading="loading" :data="tableData" height="100%">
          <el-table-column label="序号" prop="id"></el-table-column>
          <el-table-column label="应用名称" prop="appName"></el-table-column>
          <el-table-column label="应用code" prop="appCode"></el-table-column>
          <el-table-column label="描述"></el-table-column>
          <el-table-column label="AppKey"></el-table-column>
          <el-table-column label="APPSecret"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-link
                  size="mini"
                  type="primary"
                  @click="handleEdit(scope.$index, scope.row)"
              >编辑
              </el-link
              >
              <el-link
                  size="mini"
                  type="primary"
                  @click="handleDelete(scope.$index, scope.row)"
              >下线
              </el-link
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="footer">
        <el-pagination
            :page-size="size"
            :total="total"
            background
            layout="total, prev, pager, next, sizes"
            style="margin-top:10px"
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
  name: "AppManagement",
  data() {
    return {
      tableData: [{}],
      queryForm: {
        content1: "",
        content2: "",
        content3: "",
      },
      addForm: {
        name: "",
      },
      editForm: {},
      addApplicationDialogVisible: false,
      editApplicationDialogVisible: false,
      size: 10,
      total: 0,
      pages: 0,
      page: 1,
      loading: true,
    };
  },
  methods: {
    handleConfirmAdd() {
      request({
        url: 'applicationInfo/save',
        method: 'post',
        data: {
          ...this.addForm
        }
      })
      this.addApplicationDialogVisible = false
      this.queryPageList()
    },
    handleAddApplication() {
      this.addApplicationDialogVisible = true;
    },
    handleConfirmEdit() {
      request({
        url: 'applicationInfo/update',
        method: 'post',
        data: {
          ...this.editForm
        }
      })
    },
    async queryPageList() {
      this.loading = true;
      let res = await request({
        url: `applicationInfo?page=${this.page}&size=${this.size}`,
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
    },
    handleEdit(index, row) {
      this.editForm = row;
      this.editApplicationDialogVisible = true;
    },
    handleDelete(index, row) {
      this.editForm = row

      this.$confirm('是否要下线该文件?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        request({
          url: 'applicationInfo/close?appCode=' + this.editForm.appCode,
          method: 'post',
        }).then((res) => {
          if (res.code === 0) {
            this.$message({
              message: res.msg,
              type: 'success'
            })
          } else {
            this.$message({
              message: res.msg,
              type: 'error'
            })
          }
        })
      })

    }
  },
  mounted() {
    this.queryPageList();
  }
};
</script>

<style lang="scss" scoped>
.app-container {
  height: calc(100vh - 84px);
}

.content {
  height: 100%;
  display: flex;
  flex-direction: column;

  .main {
    flex: 1;
    display: flex;
  }
}
</style>
