<template>
  <div class="dataworksAcProject">
    <!--新增-->
    <el-dialog
        :visible="addDialogVisible"
        title="新增"
        width="30%"
        @close="handleCloseDetail">
      <div style="overflow-y: auto;overflow-x:hidden;height:100%;padding-left:10px;padding-right:10px">
        <el-form
            :model="editForm"
            label-position="left"
            size="medium"
            :rules="editFormRules"
            label-width="120px"
            ref="editFormRef">
          <el-form-item label="dataworks账户" prop="dataworksAccount">
            <el-select v-model="editForm.dataworksAccount" placeholder="请选择" clearable filterable>
              <el-option
                v-for="item in dataworksAccountList"
                :key="item.id"
                :label="item.dataworksAccount"
                :value="item.dataworksAccount"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="ODPS Project" prop="projectName">
            <el-input v-model="editForm.projectName" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSendAdd">提交
            </el-button>
            <el-button  @click="handleCloseDetail">取消
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>

    <!--修改-->
    <el-dialog
        :visible="editDialogVisible"
        title="修改"
        @close="handleCloseDetail">
      <div style="overflow-y: auto;overflow-x:hidden;height:100%;padding-left:10px;padding-right:10px">
        <el-form
            :model="editForm"
            label-position="left"
            size="medium"
            :rules="editFormRules"
            label-width="120px"
            ref="editFormRef">
          <el-form-item label="dataworks账户" prop="dataworksAccount">
            <el-input v-model="editForm.dataworksAccount" clearable></el-input>
          </el-form-item>
          <el-form-item label="ODPS Project" prop="projectName">
            <el-input v-model="editForm.projectName" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSendEdit">提交
            </el-button>
            <el-button  @click="handleCloseDetail">取消
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>

    <div class="condition">
      <el-form :inline="true" :model="queryForm" label-position="left" @submit.native.prevent >
        <el-form-item label="dataworks账户" style="font-size: 14px;">
          <el-input
              placeholder="dataWorks账户"
              v-model="queryForm.dataworksAccount"
              clearable>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="queryPageList">查询</el-button>
          <el-button type="primary" @click="resetQueryForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="content">
      <el-button  type="primary" @click="handleAddRule">新增</el-button>
      <!-- 表格 -->
      <el-table
          :loading="queryForm.loading"
          :data="tableData"
          height="80%">
        <el-table-column
            label="序号"
            type="index"
            header-align="center"
            align="center"
            width="60">
          <template scope="scope">
            <span>{{(queryForm.page - 1) * queryForm.size + scope.$index + 1}}</span>
          </template>
        </el-table-column>
        <el-table-column
            prop="dataworksAccount"
            label="dataworks账户"
            header-align="center"
            align="center">
        </el-table-column>
        <el-table-column
            prop="projectName"
            header-align="center"
            align="center"
            label="ODPS Project">
        </el-table-column>
        <el-table-column
            header-align="center"
            align="center"
            label="操作">
          <template slot-scope="scope">
            <el-button
                type="text"
                @click="handleEdit(scope.$index, scope.row)">修改
            </el-button>
            <el-button
                type="text"
                @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
            <el-button
                type="text"
                @click="showRelate(scope.$index, scope.row)">查看对应UM用户
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="pagination">
        <el-pagination @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryForm.page"
          :page-sizes="[10, 20, 30, 50]"
          :page-size="queryForm.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="queryForm.total"
          v-if="queryForm.total !==0">
        </el-pagination>
      </div>
    </div>

  </div>
</template>

<script>
import request from "@/utils/request";
import {getDataworksAccount} from "@/api/dataLab/dataworksAcProject";
export default {
  name: "DataworksAcProject",
  data() {
    return {
      queryForm: {
        dataworksAccount: "",
        total: 0,
        page: 1,
        size: 10,
        loading: false
      },
      tableData: [],
      addDialogVisible: false,
      editDialogVisible: false,
      editForm: {},
      oldDataAccount: "",
      oldProjectName: "",
      editFormRules: {
        dataworksAccount: [
          {required: true, trigger: ['blur', 'change'], message: '请输入dataworks账户'}
        ],
        projectName: [
          {required: true, trigger: ['blur', 'change'], message: '请输入ODPS Project'}
        ]
      },
      dataworksAccountList : []
    };
  },
  methods:{
    // 分页
    handleSizeChange(val) {
      this.queryForm.size = val;
      this.queryPageList();
    },
    handleCurrentChange(val) {
      this.queryForm.page = val;
      this.queryPageList();
    },
    async queryPageList() {
      this.queryForm.loading = true
      let res = await request({
        url: '/datalab/dataworksAcProject/list',
        method: 'post',
        data: {
          pageSize: this.queryForm.size,
          pageNum: this.queryForm.page,
          dataworksAccount: this.queryForm.dataworksAccount
        }
      })
      if (res.data && res.data.records) {
        this.tableData = res.data.records
        this.queryForm.total = res.data.total
        this.queryForm.page = res.data.current

      }
      this.queryForm.loading = false
      //console.log(res)
    },
    //重置查询条件
    resetQueryForm() {
      this.queryForm.dataworksAccount = ''
      this.queryPageList()
    },
    handleCloseDetail(){
      this.addDialogVisible = false
      this.editDialogVisible = false
      this.$refs.editFormRef.resetFields()
      this.queryPageList()
    },
    //新增
    handleAddRule() {
      this.addDialogVisible = true
      this.editForm = {}
    },
    //编辑
    handleEdit(index, row) {
      this.editDialogVisible = true
      this.editForm = row
      this.oldDataAccount = row.dataworksAccount
      this.oldProjectName = row.projectName
    },
    //提交新增
    handleSendAdd() {
      this.$refs['editFormRef'].validate(valid => {
        if (valid) {
          request({
            url: '/datalab/dataworksAcProject/add',
            method: 'post',
            data: {
              dataworksAccount: this.editForm.dataworksAccount,
              projectName: this.editForm.projectName,
            }
          }).then(res => {
            if (res.returnCode === '200') {
              this.$message({
                message: '新增成功',
                type: 'success'
              })
            } else {
              this.$message({
                message: '新增失败' + res.returnMsg,
                type: 'error'
              })
            }
            this.addDialogVisible = false
          })
        } else {
          return false
        }
      })
    },
    //提交编辑
    handleSendEdit() {
      this.$refs['editFormRef'].validate(valid => {
        if (valid) {
          request({
            url: '/datalab/dataworksAcProject/update',
            method: 'post',
            data: {
              dataworksAccount: this.editForm.dataworksAccount,
              projectName: this.editForm.projectName,
              oldDataAccount: this.oldDataAccount,
              oldProjectName: this.oldProjectName
            }
          }).then(res => {
            if (res.returnCode === '200') {
              this.$message({
                message: '修改成功',
                type: 'success'
              })
            } else {
              this.$message({
                message: '修改失败:' + res.returnMsg,
                type: 'error'
              })
            }
            this.editDialogVisible = false
          })
        } else {
          return false
        }
      })
    },
    //删除
    handleDelete(index, row) {
      this.$confirm('确定删除dataworks账户吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        request({
          url: '/datalab/dataworksAcProject/delete',
          method: 'post',
          data: {
            dataworksAccount: row.dataworksAccount,
            projectName: row.projectName
          }
        }).then(res => {
          if (res.returnCode === '200') {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.queryPageList()
          } else {
            this.$message({
              type: 'error',
              message: res.returnMsg
            });
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    //查看对应UM用户
    showRelate(index, row) {
      this.$router.push({
        path: 'umRelate',
        query: {
          dataworksAccount: row.dataworksAccount,
          projectName: row.projectName
        }
      })
    },
    getDataworksAccount(){
      getDataworksAccount().then(data =>{
        this.dataworksAccountList = data
        console.log(this.dataworksAccountList)
      })
    }
  },
  mounted() {
    this.queryPageList()
    this.getDataworksAccount()
  },
}
</script>

<style lang="scss" scoped>
.dataworksAcProject {
  height: calc(100vh - 135px);
  background: #fff;
  margin: 0 16px 16px 16px;
  padding: 16px;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  .condition {
    height: 40px;
    ::v-deep .el-form {
      height: 100%;
      .el-form-item__label {
        font-weight: 400;
        color: #202224;
      }
    }
    .el-row {
      /*margin-bottom: 20px;*/
      &:last-child {
        margin-bottom: 0;
      }
    }
    .el-col {
      border-radius: 4px;
    }
  }

  .content{
    height: calc(100% - 40px);
    .el-button {
      margin: 0;
    }
  }
  @import "./style.scss";
  // 表格
  .el-table {
    margin-top: 10px;
  }
  // 分页
  .pagination {
    position: absolute;
    bottom: 10px;
    right: 20px;
    //height: 64px;
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
    .el-pagination {
      margin: 0;
    }
  }

}
</style>
