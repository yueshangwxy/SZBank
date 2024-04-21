<template>
    <div class="approvalInfos">
      <!--审批详情弹窗-->
      <el-dialog
      :visible="showApproveDialogVisible"
      title="审批详情"
      @close="handleCloseDetail">
      <div style="overflow-y: auto;overflow-x:hidden;height:100%;padding-left:10px;padding-right:10px">
        <el-form
            :model="showForm"
            label-position="left"
            label-width="80px"
            size="medium">
<!--          <el-row :gutter="10">
            <el-form-item label="表或视名(包含项目)" >
              <el-input v-model="showForm.tableName" disabled></el-input>
            </el-form-item>
          </el-row>-->
            <el-form-item label="审批意见" >
              <el-input v-model="showForm.approvalOpinion" disabled></el-input>
            </el-form-item>
            <el-form-item label="审批时间" >
              <el-date-picker type="datetime" v-model="showForm.approvalTime" disabled ></el-date-picker>
            </el-form-item>
            <el-form-item label="审批状态" >
              <el-input v-model="showForm.statusPutShow" disabled></el-input>
            </el-form-item>
              <el-form-item>
                  <el-button type="info" @click="handleCloseDetail">关闭
                  </el-button>
              </el-form-item>
        </el-form>
      </div>
      </el-dialog>
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
              <el-form-item label="表或视名(包含项目)" >
                <el-input v-model="detailForm.tableName" disabled></el-input>
              </el-form-item>
              <el-form-item label="申请口径" >
                <el-input type="textarea" v-model="detailForm.sqlText" disabled :rows="3"></el-input>
              </el-form-item>
              <el-form-item label="申请说明" >
                <el-input v-model="detailForm.applyDescription" disabled></el-input>
              </el-form-item>
              <el-form-item label="申请人" >
                <el-input v-model="detailForm.applyUserName" disabled></el-input>
              </el-form-item>
              <el-form-item label="申请人部门" >
                <el-input v-model="detailForm.applyDeptName" disabled></el-input>
              </el-form-item>
              <el-form-item label="申请时间" >
                <el-date-picker type="datetime" v-model="detailForm.applyTime" disabled ></el-date-picker>
              </el-form-item>
              <el-form-item label="申请状态" >
                <el-input v-model="detailForm.applyStatusShow" disabled></el-input>
              </el-form-item>
                <el-form-item>
                    <el-button type="info" @click="handleCloseDetail">关闭
                    </el-button>
                </el-form-item>
          </el-form>
        </div>
      </el-dialog>
      <!--审批弹窗-->
      <el-dialog
      :visible="editDialogVisible"
      title="审核"
      @close="handleCloseEdit">
        <div style="overflow-y: auto;overflow-x:hidden;height:100%;padding-left:10px;padding-right:10px">
          <el-form
              :model="editForm"
              label-position="left"
              label-width="80px"
              size="medium"
              :rules="editFormRules"
              ref="editFormRef"
          >
              <el-form-item label="审批意见"  prop="approvalOpinion">
                <el-input type="textarea"
                          v-model="editForm.approvalOpinion"
                          :rows="2"
                          placeholder="请输入审批意见"></el-input>
              </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleConfirmPass">审批通过
                    </el-button>
                    <el-button type="danger" @click="handleConfirmReject">审批拒绝
                    </el-button>
                </el-form-item>
          </el-form>
        </div>
      </el-dialog>

        <!-- 表格 -->
      <el-tabs v-model="applyType" type="card" @tab-click="changeType">
        <el-tab-pane label="待审批" name="wait_list"></el-tab-pane>
        <el-tab-pane label="已审批" name="approved_list"></el-tab-pane>
      </el-tabs>
        <el-table
            :data="tableData"
            :loading="loading"
            height="75%">
            <el-table-column
                label="序号"
                header-align="center"
                align="center">
              <template scope="scope">
                <span>{{(queryForm.page - 1) * queryForm.size + scope.$index + 1}}</span>
              </template>
            </el-table-column>
            <el-table-column
                prop="tableName"
                label="表或视名(包含项目)"
                header-align="center"
                align="center"
                width="150">
            </el-table-column>
            <el-table-column
                prop="sqlTextShow"
                header-align="center"
                align="center"
                label="申请口径">
            </el-table-column>
            <el-table-column
                prop="applyDescription"
                header-align="center"
                align="center"
                label="申请说明">
            </el-table-column>
            <el-table-column
                prop="applyUserName"
                header-align="center"
                align="center"
                label="申请人">
            </el-table-column>
            <el-table-column
                prop="applyDeptName"
                header-align="center"
                align="center"
                label="申请人部门">
            </el-table-column>
            <el-table-column
                prop="applyTime"
                :formatter="formatDate"
                header-align="center"
                align="center"
                width="160"
                label="申请时间">
            </el-table-column>
            <el-table-column
                prop="applyStatusShow"
                header-align="center"
                align="center"
                label="申请状态">
            </el-table-column>
            <el-table-column
                header-align="center"
                align="center"
                width="160"
                label="操作">
                <template slot-scope="scope">
                  <el-button
                      type="text"
                      @click="showDetail(scope.$index, scope.row)">详情
                  </el-button>
                  <el-button
                      v-if="scope.row.applyStatus === '00'"
                      type="text"
                      @click="handleEdit(scope.$index, scope.row)">审核
                  </el-button>
                  <el-button
                      v-else
                      type="text"
                      @click="approveDetail(scope.$index, scope.row)">审批详情
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
import {getDepts, getCurrentDept} from '@/utils/system'

export default {
    name: 'ApprovalInfos',
    data() {
        return {
          applyType: 'wait_list',
          // 表格
          tableData: [],
          queryForm: {
            size: 10,
            page: 1,
            total: 0,
            deptNo: ''
          },
          editDialogVisible: false,
          detailDialogVisible: false,
          showApproveDialogVisible: false,
          editForm: {},
          detailForm: {},
          showForm:{},
          loading: true,
          editFormRules: {
            approvalOpinion: [
              {required: true, trigger: ['blur', 'change'], message: '请输入审批意见'}
            ]
          }
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
        return dt.getFullYear() + '-' + ((dt.getMonth() + 1)<10?'0'+ (dt.getMonth() + 1): (dt.getMonth() + 1) )+ '-' + (dt.getDate() < 10 ?'0' + dt.getDate() : dt.getDate()) + ' ' + (dt.getHours()<10?'0'+dt.getHours():dt.getHours()) + ':' + (dt.getMinutes()<10?'0'+dt.getMinutes():dt.getMinutes()) + ':' + (dt.getSeconds()<10?'0'+dt.getSeconds():dt.getSeconds())
      },
      async queryPageList() {
        this.loading = true
        this.queryForm.loading = true
        let res = await request({
          url: '/datalab/approvalInfo/list',
          method: 'post',
          data: {
            pageSize: this.queryForm.size,
            pageNum: this.queryForm.page,
            applyType: this.applyType,
            applyDept: this.queryForm.deptNo
          }
        })
        if (res.data && res.data.records) {
          this.tableData = res.data.records
          this.queryForm.total = res.data.total
          this.queryForm.page = res.data.current

        }
        this.queryForm.loading = false
        console.log(res)
        this.loading = false
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
      //审核
      handleEdit(index, row) {
        this.editDialogVisible = true
        this.editForm = row
      },
      //详情
      showDetail(index,row){
        this.detailDialogVisible = true
        this.detailForm = row
      },
      //审批详情
      approveDetail(index,row){
        request({
          url: '/datalab/approvalLink/approveLinkDetail',
          method: 'post',
          data: {
            id: row.id
          }
        }).then(res => {
          if (res.returnCode === '200'){
            this.showApproveDialogVisible = true
            this.showForm = res.data
          }else{
            this.$message({
              message: res.returnMsg,
              type: 'error'
            })
          }
        })
      },
      handleConfirmPass() {
        this.editForm.applyState = '03'
        this.handleConfirmApply()
      },
      handleConfirmReject() {
        this.editForm.applyState = '04'
        this.handleConfirmApply()
      },
      handleConfirmApply() {
        this.$refs['editFormRef'].validate(valid => {
          if (valid) {
            //this.editDialogVisible = false
            request({
              url: '/datalab/approvalInfo/approve',
              method: 'post',
              data: {
                id: this.editForm.id,
                applyState:this.editForm.applyState,
                approvalOpinion: this.editForm.approvalOpinion
              }
            }).then(res => {
              if (res.returnCode === '200') {
                this.$message({
                  message: res.returnMsg,
                  type: 'success',
                });
              } else {
                this.$message({
                  message: res.returnMsg,
                  type: 'error'
                })
              }
              this.editDialogVisible = false
              this.queryPageList()
            })
          } else {
            return false;
          }
        })
      },
      handleCloseEdit() {
        this.editDialogVisible = false
        this.$refs.editFormRef.resetFields()
      },
      handleCloseDetail(){
        this.showApproveDialogVisible = false
        this.detailDialogVisible = false
      },
      changeType(tab,event) {
        this.applyType = tab.name
        //清空列表
        this.tableData = []
        this.queryPageList()
      }
    },
  mounted() {
    getCurrentDept().then(res => {
      console.log("dessss => " + res)
      this.queryForm.deptNo = res.id
      this.queryPageList()
    })
  }
}
</script>

<style lang="scss" scoped>
.approvalInfos {
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
    @import "./style.scss";
    // 表格
    .el-table {
        margin-top: 0px;
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
