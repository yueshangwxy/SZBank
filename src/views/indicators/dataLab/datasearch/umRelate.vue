<template>
  <div class="umRelate">
    <!--新增-->
    <el-dialog
        :visible="addDialogVisible"
        title="新增"
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
            <el-input v-model="this.params.dataworksAccount" disabled></el-input>
          </el-form-item>
          <el-form-item label="ODPS Project" prop="projectName">
            <el-input v-model="this.params.projectName" disabled></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="nickName">
            <el-autocomplete
                v-model="editForm.nickName"
                :fetch-suggestions="searchUsersAsync"
                @select="handleSelectUser"
                placeholder="请输入姓名"
                clearable
                :debounce="0"
            >
            </el-autocomplete>
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
            <el-input v-model="editForm.dataworksAccount" disabled></el-input>
          </el-form-item>
          <el-form-item label="ODPS Project" prop="projectName">
            <el-input v-model="editForm.projectName" disabled></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="nickName">
            <el-autocomplete
                v-model="editForm.nickName"
                :fetch-suggestions="searchUsersAsync"
                @select="handleSelectUser"
                placeholder="请输入姓名"
                clearable
                @clear="blurForBug()"
            >
            </el-autocomplete>
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
        <el-form-item label="姓名" >
          <el-input
              placeholder="请输入姓名"
              v-model="queryForm.nickName"
              clearable>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button  type="primary" @click="queryPageList">查询</el-button>
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
            prop="userName"
            label="用户名"
            header-align="center"
            align="center">
        </el-table-column>
        <el-table-column
            prop="deptName"
            header-align="center"
            align="center"
            label="部门">
        </el-table-column>
        <el-table-column
            prop="nickName"
            header-align="center"
            align="center"
            label="姓名">
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
          >
        </el-pagination>
      </div>
    </div>

  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "UmRelate",
  data() {
    return {
      params: {
        dataworksAccount: this.$route.query.dataworksAccount,
        projectName: this.$route.query.projectName
      },
      queryForm: {
        //nickName: "",
        total: 0,
        page: 1,
        size: 10,
        loading: false
      },
      tableData: [],
      addDialogVisible: false,
      editDialogVisible: false,
      editForm: {
        dataworksAccount : '',
        projectName : '',
        nickName: ''
      },
      oldDataAccount: "",
      oldProjectName: "",
      editFormRules: {
        nickName: [
          {required: true, trigger: ['blur', 'change'], message: '请输入姓名'}
        ]
      }
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
        url: '/datalab/dataworksAcProject/detailRelateList',
        method: 'post',
        data: {
          pageSize: this.queryForm.size,
          pageNum: this.queryForm.page,
          dataworksAccount: this.params.dataworksAccount,
          projectName: this.params.projectName,
          nickName: this.queryForm.nickName
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
      this.queryForm.nickName = ''
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
      this.editForm.oldId = row.id
    },
    //提交新增
    handleSendAdd() {
      this.$refs['editFormRef'].validate(valid => {
        if (valid) {
          request({
            url: '/datalab/dataworksAcProject/addRelate',
            method: 'post',
            data: {
              dataworksAccount: this.params.dataworksAccount,
              projectName: this.params.projectName,
              id: this.editForm.id,
            }
          }).then(res => {
            if (res.returnCode === '200') {
              this.$message({
                message: '新增成功',
                type: 'success'
              })
            } else {
              this.$message({
                message: '新增失败,' + res.returnMsg,
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
            url: '/datalab/dataworksAcProject/updateRelate',
            method: 'post',
            data: {
              dataworksAccount: this.params.dataworksAccount,
              projectName: this.params.projectName,
              id: this.editForm.id,
              oldId: this.editForm.oldId,
            }
          }).then(res => {
            if (res.returnCode === '200') {
              this.$message({
                message: '修改成功',
                type: 'success'
              })
            } else {
              this.$message({
                message: '修改失败,' + res.returnMsg,
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
      this.$confirm('确定删除UM用户关联吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        request({
          url: '/datalab/dataworksAcProject/deleteRelate',
          method: 'post',
          data: {
            dataworksAccount: row.dataworksAccount,
            id: row.id
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
    //查询用户
    async searchUsersAsync(queryString, callback) {
      let res = await request({
        url: '/datalab/dataworksAcProject/searchUsers',
        method: 'post',
        data: {
          queryString : queryString
        }
      })
      if (res.returnCode === '200') {
        for (let i of res.data) {
          i.value = i.nickName
        }
        callback(res.data)
      }
    },
    //处理选中的姓名
    handleSelectUser(item) {
      //console.log('item====' + item.id)
      this.editForm.id = item.id
    },
    blurForBug(){
      document.activeElement.blur()
    }
  },
  mounted() {
    this.queryPageList()
  },
  created() {
    //console.log('created:' + this.$route.query.dataworksAccount)
  }
}
</script>

<style lang="scss" scoped>
.umRelate {
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
    }
    .el-button {
      color: #fff;
      margin: 0;
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
    .el-button--text{
      color: #0825f3;
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
    // height: 64px;
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
    .el-pagination {
      margin: 0;
    }
  }

}
</style>
