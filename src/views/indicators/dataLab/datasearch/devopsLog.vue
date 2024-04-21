<template>
  <div class="devopsLog">

    <!--详情弹窗-->
    <el-dialog
        :visible="detailDialogVisible"
        title="详情"
        @close="handleCloseDetail">
      <div style="overflow-y: auto;overflow-x:hidden;height:100%;padding-left:10px;padding-right:10px">
        <el-form
            :model="detailForm"
            label-position="left"
            label-width="100px"
            size="medium">
          <el-form-item label="异常信息" >
            <el-input type="textarea" v-model="detailForm.exceptionContent" disabled :rows="5"></el-input>
          </el-form-item>
          <el-form-item label="所属功能" >
            <el-input v-model="detailForm.module" disabled></el-input>
          </el-form-item>
          <el-form-item label="连接信息" >
            <el-input v-model="detailForm.connectionInfo" disabled></el-input>
          </el-form-item>
          <el-form-item label="申请时间" >
            <el-date-picker type="datetime" v-model="detailForm.recordTime" disabled ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="info" @click="handleCloseDetail">关闭
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>

    <div class="condition">
      <el-form :inline="true" :model="queryForm" label-position="left" label-width="80px">

            <el-form-item label="异常信息" >
              <el-input
                  placeholder="请输入异常信息关键字"
                  v-model="queryForm.exceptionContent"
                  clearable>
              </el-input>
            </el-form-item>

            <el-form-item label="所属功能" >
              <el-input
                  placeholder="请输入所属功能"
                  v-model="queryForm.module"
                  clearable>
              </el-input>
            </el-form-item>

            <el-form-item label="记录时间" >
              <el-date-picker
                  v-model="queryForm.recordTime"
                  type="date"
                  placeholder="请选择记录时间"
                  value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </el-form-item>

            <el-button type="primary" @click="queryPageList">查询</el-button>
            <el-button type="primary" @click="resetQueryForm">重置</el-button>

      </el-form>
    </div>
    <!-- 表格 -->
    <el-table
        :loading="queryForm.loading"
        :data="tableData"
        @cell-dblclick="handleDetail"
        height="75%">
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
          prop="exceptionContentShow"
          label="异常信息"
          header-align="center"
          align="center"
          width="180">
      </el-table-column>
      <el-table-column
          prop="module"
          header-align="center"
          align="center"
          label="所属功能">
      </el-table-column>
      <el-table-column
          prop="connectionInfo"
          header-align="center"
          align="center"
          label="连接信息"
          show-overflow-tooltip>
      </el-table-column>
      <el-table-column
          prop="recordTime"
          :formatter="formatDate"
          header-align="center"
          align="center"
          label="记录时间">
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
  name: "DevopsLog",
  data(){
    return {
      tableData: [],
      queryForm: {
        size: 10,
        page: 1,
        total: 0,
        loading: true,
        exceptionContent: '',
        module: '',
        recordTime: ''
      },
      detailDialogVisible: false,
      detailForm: {},
    }
  },
  methods:{
    //格式化日期
    formatDate(row, column) {
      // 获取单元格数据
      let data = row[column.property]
      if(data == null) {
        return null
      }
      let dt = new Date(data)
      return dt.getFullYear() + '-' + ((dt.getMonth() + 1)<10?'0'+ (dt.getMonth() + 1): (dt.getMonth() + 1) )+ '-' + (dt.getDate() < 10 ?'0' + dt.getDate() : dt.getDate()) + ' ' + (dt.getHours()<10?'0'+dt.getHours():dt.getHours()) + ':' + (dt.getMinutes()<10?'0'+dt.getMinutes():dt.getMinutes()) + ':' + (dt.getSeconds()<10?'0'+dt.getSeconds():dt.getSeconds())
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
    handleCloseDetail(){
      this.detailDialogVisible = false
    },
    resetQueryForm() {
      this.queryForm.exceptionContent = ''
      this.queryForm.module = ''
      this.queryForm.recordTime = ''
      this.queryPageList()
    },
    async queryPageList() {
      this.queryForm.loading = true
      let res = await request({
        url: '/datalab/devopsLogs/list',
        method: 'post',
        data: {
          pageSize: this.queryForm.size,
          pageNum: this.queryForm.page,
          exceptionContent: this.queryForm.exceptionContent,
          module: this.queryForm.module,
          recordTime: this.queryForm.recordTime
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
    // 查看详情
    handleDetail(row) {
      this.detailDialogVisible = true
      this.detailForm = row
    },
  },
  mounted() {
    this.queryPageList()
  }
}
</script>

<style lang="scss" scoped>
.devopsLog {
  height: calc(100vh - 135px);
  background: #fff;
  margin: 0 16px 16px 16px;
  padding: 16px;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  .condition {
    ::v-deep .el-form {
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
    margin-top: 0;
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
