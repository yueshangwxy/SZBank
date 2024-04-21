<template>
    <div class="taskExportPlan">
        <div class="condition">
            任务名：<el-input v-model="taskNameInput" placeholder="请输入任务名"></el-input>
            授权部门：<el-select v-model="dept" placeholder="授权部门">
                <el-option label="请选择" value=""></el-option>
                <el-option label="部门一" value="1"></el-option>
                <el-option label="部门二" value="2"></el-option>
            </el-select>
            <el-button type="primary" @click="queryPageList">查询</el-button>
            <el-button>重置</el-button>
        </div>
        <!-- 表格 -->
        <el-table
            :data="tableData"
            max-height="450px">
            <el-table-column
                label="序号"
                header-align="center"
                align="center"
                width="180">
              <template scope="scope">
                <span>{{(queryForm.page - 1) * queryForm.size + scope.$index + 1}}</span>
              </template>
            </el-table-column>
            <el-table-column
                prop="taskName"
                label="任务名"
                header-align="center"
                align="center"
                width="180">
            </el-table-column>
            <el-table-column
                prop="exportTime"
                :formatter="formatDate"
                header-align="center"
                align="center"
                label="任务导出时间">
            </el-table-column>
            <el-table-column
                prop="authDeptName"
                header-align="center"
                align="center"
                label="授权部门">
            </el-table-column>
            <el-table-column
                header-align="center"
                align="center"
                label="操作">
                <template slot-scope="scope">
                  <el-button
                      type="text"
                      @click="handleEdit(scope.$index, scope.row)">编辑
                  </el-button>
                  <el-button
                      type="text"
                      @click="handleStop(scope.$index, scope.row)">终止
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
</template>
<script>
import request from "@/utils/request";

export default {
    name: 'TaskExportPlan',
    data() {
        return {
          taskNameInput: '',
          dept: '',
          // 表格
          tableData: [],
          queryForm: {
            size: 10,
            page: 1,
            total: 0,
            loading: true
          },
          editDialogVisible: false,
          editForm: {
          /* taskName: '',
            authDeptName: '',
            emailAddr: '',
            sqlText: '',
            isDd: ''*/
          },
        }
    },
    methods: {
      //格式化日期
      formatDate(row, column) {
        // 获取单元格数据
        let data = row[column.property]
        if(data == null) {
          return null
        }
        let dt = new Date(data)
        return dt.getFullYear() + '-' + ((dt.getMonth() + 1)<10?'0'+ (dt.getMonth() + 1): (dt.getMonth() + 1) )+ '-' + dt.getDate() /*+ ' ' + dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds()*/
      },
      async queryPageList() {
        this.queryForm.loading = true
        let res = await request({
          url: '/datalab/taskPlan/list',
          method: 'post',
          data: {
            pageSize: this.queryForm.size,
            pageNum: this.queryForm.page,
            taskName: this.taskNameInput,
            authDeptName: this.dept
          }
        })
        if (res.data && res.data.records) {
          this.tableData = res.data.records
          this.queryForm.total = res.data.total
          this.queryForm.page = res.data.current

        }
        this.queryForm.loading = false
        console.log(res)
      },
      // 分页
      handleSizeChange(val) {
        this.queryForm.size = val;
        this.queryPageList();
      },
      handleCurrentChange(val) {
        this.queryForm.page = val;
        this.queryPageList();
      },
      //编辑
      handleEdit(index, row) {
        this.editDialogVisible = true;
        this.editForm = row
        console.log(index);
        console.log(row);
      },
      //终止
      handleStop(index, row) {
        console.log(row)
        this.editForm = row;
        this.$confirm('是否要终止该定时任务?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          request({
            url: '/datalab/taskPlan/stop',
            method: 'post',
            data: {
              ...this.editForm,
              taskState: 'STOP'
            }
          }).then((res) => {
            if (res.returnCode === '200') {
              this.$message({
                type: 'success',
                message: res.returnMsg
              });
            } else {
              this.$message({
                type: 'error',
                message: res.returnMsg
              });
            }
            this.queryPageList()
          })
        });
      },
    },
  mounted() {
    this.queryPageList()
  }
}
</script>

<style lang="scss" scoped>
.taskExportPlan {
    height: calc(100vh - 135px);
    background: #fff;
    margin: 0 16px 16px 16px;
    padding: 16px;
    border-radius: 8px;
    overflow: hidden;
    position: relative;
    .condition {
        display: flex;
        justify-content: space-around;

        .el-input {
            width: 120px;
        }
        .el-select {
            width: 120px;
        }
        .el-button {
            border-radius: 6px;
            background: #84C22E;
            color: #fff;
            margin: 0;
        }

    }
    // 表格
    .el-table {
        margin-top: 24px;
    }
    @import "./style.scss";
    // 分页
    .pagination {
        position: absolute;
        bottom: 5px;
        right: 20px;
        height: 64px;
        display: flex;
        align-items: center;
        flex-direction: row-reverse;
        .el-pagination {
            margin: 0;
        }
    }

}
</style>
