<template>
    <div class="maskingRulesConfig">
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
              label-width="80px"
              ref="editFormRef">
              <el-form-item label="项目" prop="projectName">
                <el-input v-model="editForm.projectName" clearable></el-input>
              </el-form-item>
              <el-form-item label="表" prop="tableName">
                <el-input v-model="editForm.tableName" clearable></el-input>
              </el-form-item>
              <el-form-item label="字段" prop="columnName">
                <el-input v-model="editForm.columnName" clearable></el-input>
              </el-form-item>
              <el-form-item label="脱敏规则" prop="maskingRule">
                <el-select v-model="editForm.maskingRule" placeholder="请选择">
                  <el-option
                      v-for="item in maskingRules"
                      :key="item.code"
                      :label="item.desc"
                      :value="item.code">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="规则等级" prop="ruleLevel">
                <el-select v-model="editForm.ruleLevel" placeholder="请选择">
                  <el-option v-for="(item,index) in ruleLevels" :key="index" :value="item">{{item}}</el-option>
                </el-select>
              </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleSendAddRule">提交
                    </el-button>
                    <el-button  @click="handleCloseDetail">取消
                    </el-button>
                </el-form-item>
          </el-form>
        </div>
      </el-dialog>

      <!--配置脱敏规则-->
      <el-dialog
          :visible="editDialogVisible"
          title="配置脱敏规则"
          @close="handleCloseDetail">
        <div style="overflow-y: auto;overflow-x:hidden;height:100%;padding-left:10px;padding-right:10px">
          <el-form
              :model="editForm"
              label-position="left"
              label-width="80px"
              size="medium"
              :rules="editFormRules"
              ref="editFormRef">
              <el-form-item label="项目" prop="projectName">
                <el-input v-model="editForm.projectName" clearable></el-input>
              </el-form-item>
              <el-form-item label="表" prop="tableName">
                <el-input v-model="editForm.tableName" clearable></el-input>
              </el-form-item>
              <el-form-item label="字段" prop="columnName">
                <el-input v-model="editForm.columnName" clearable></el-input>
              </el-form-item>
              <el-form-item label="脱敏规则" prop="maskingRule">
                <el-select v-model="editForm.maskingRule" placeholder="请选择">
                  <el-option
                      v-for="item in maskingRules"
                      :key="item.code"
                      :label="item.desc"
                      :value="item.code"
                      >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="规则等级" prop="ruleLevel">
                <el-select v-model="editForm.ruleLevel" placeholder="请选择">
                  <el-option v-for="(item,index) in ruleLevels" :key="index" :value="item">{{item}}</el-option>
                </el-select>
              </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleSendEditRule">提交
                    </el-button>
                    <el-button  @click="handleCloseDetail">取消
                    </el-button>
                </el-form-item>
          </el-form>
        </div>
      </el-dialog>

      <!--导入excel-->
      <el-dialog
          :visible="importDialogVisible"
          title="导入"
          @close="handleCloseDetail">
        <div style="overflow-y: auto;overflow-x:hidden;height:100%;padding-left:10px;padding-right:10px">
          <el-form
              :model="importForm"
              label-position="left"
              label-width="80px"
              size="medium"
              ref="editFormRef">
              <el-form-item label="导入文件" prop="file">
                <el-upload
                    ref="uploadButton"
                    drag
                    action=""
                    :on-preview="previewFile"
                    :before-upload="beforeUpload"
                    :on-exceed="handleExceed"
                    multiple
                    name="file"
                    :auto-upload="false"
                    :on-change="handleImportFile"
                    :http-request="uploadFile"
                    :file-list="fileList"
                    :on-success="handleSuccess"
                    accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                    :limit="1">
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text"><em>点击上传</em></div>
                  <div class="el-upload__tip" slot="tip" style="color: #ff0044;">只允许上传1个xls/xlsx文件，且大小不超过{{ this.fileSize }}kb</div>
                </el-upload>
              </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleDownloadTemplate">下载模板
                    </el-button>
                    <el-button type="primary" @click="uploadFile">上传导入
                    </el-button>
                </el-form-item>
              <el-form-item>
                <el-table
                    :data="errorData"
                    style="width: 100%"
                    height="250"
                   :hidden="errorData.length==0"
                    :header-row-style="{color: '#FF0000FF'}"
                >

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
                      prop="projectName"
                      label="项目"
                      header-align="center"
                      align="center"
                      width="180">
                  </el-table-column>
                  <el-table-column
                      prop="tableName"
                      header-align="center"
                      align="center"
                      label="表">
                  </el-table-column>
                  <el-table-column
                      prop="columnName"
                      header-align="center"
                      align="center"
                      label="字段">
                  </el-table-column>
                  <el-table-column
                      prop="maskingRuleShow"
                      header-align="center"
                      align="center"
                      label="脱敏规则">
                  </el-table-column>
                  <el-table-column
                      prop="errorMsg"
                      header-align="center"
                      align="center"
                      label="错误原因">
                  </el-table-column>
                  <el-table-column
                      prop="ruleLevel"
                      header-align="center"
                      align="center"
                      label="规则等级">
                  </el-table-column>
                </el-table>
              </el-form-item>
<!--                <el-form-item>
                    <el-button type="text" @click="handleDownloadTemplate" style="font-size: 20px;color: #000dff;text-decoration:underline;">下载模板
                    </el-button>
                </el-form-item>-->
          </el-form>
        </div>
      </el-dialog>

        <div class="condition">
          <el-form :inline="true" :model="queryForm" label-position="left" label-width="80px">
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="项目" >
                <el-input
                    placeholder="请输入项目名称"
                    v-model="queryForm.sc_project_name"
                    clearable>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="表" >
                <el-input
                    placeholder="请输入表名称"
                    v-model="queryForm.sc_table_name"
                    clearable>
                </el-input>
              </el-form-item>
            </el-col>
              <el-col :span="8">
                <el-form-item label="字段" >
                  <el-input
                      placeholder="请输入字段名称"
                      v-model="queryForm.sc_column_name"
                      clearable>
                  </el-input>
                </el-form-item>
              </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="配置人" >
                <el-input
                    placeholder="请输入配置人"
                    v-model="queryForm.sc_config_user"
                    clearable>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="配置时间" >
                <el-date-picker
                    v-model="queryForm.sc_config_time"
                    type="date"
                    placeholder="请选择配置时间"
                    value-format="yyyy-MM-dd"
                    >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-button  type="primary" @click="queryPageList">查询</el-button>
              <el-button type="primary" @click="resetQueryForm">重置</el-button>
            </el-col>
          </el-row>
          </el-form>
        </div>
      <div class="content">
        <el-button  type="primary" @click="handleAddRule">新增</el-button>
        <el-button  type="primary" @click="handleOnImport">批量导入</el-button>
      </div>
        <!-- 表格 -->
      <el-table
          :loading="queryForm.loading"
          :data="tableData"
          height="50%">
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
              prop="projectName"
              label="项目"
              header-align="center"
              align="center"
              width="180"
              show-overflow-tooltip>
          </el-table-column>
        <el-table-column
            prop="tableName"
            header-align="center"
            align="center"
            label="表"
            show-overflow-tooltip>
        </el-table-column>
        <el-table-column
            prop="columnName"
            header-align="center"
            align="center"
            label="字段"
            show-overflow-tooltip>
        </el-table-column>
        <el-table-column
            prop="maskingRuleShow"
            header-align="center"
            align="center"
            label="脱敏规则"
            show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button type="text" icon="el-icon-edit"   v-if="scope.row.maskingRuleShow === ''||scope.row.maskingRuleShow === null||scope.row.maskingRuleShow === 'undefine'" @click="handleEditRule(scope.row)">配置</el-button>
            <div v-else>{{scope.row.maskingRuleShow}}</div>
          </template>
        </el-table-column>
        <el-table-column
            prop="ruleLevel"
            header-align="center"
            align="center"
            label="规则等级">
        </el-table-column>
        <el-table-column
            prop="userName"
            header-align="center"
            align="center"
            label="配置人">
        </el-table-column>
          <el-table-column
              prop="configTime"
              :formatter="formatDate"
              header-align="center"
              align="center"
              label="配置时间">
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
            v-if="queryForm.total !==0">
        </el-pagination>
      </div>
    </div>
</template>
<script>
import request from "@/utils/request";

export default {
    name: 'MaskingRulesConfig',
    data() {
        return {
          maskingRules: [],
          addDialogVisible: false,
          editDialogVisible: false,
          importDialogVisible: false,
            // 表格
          tableData: [],
          errorData: [],
          ruleLevels: [1,2,3,4,5,6,7,8,9,10],
          queryForm: {
            sc_project_name: '',
            sc_table_name: '',
            sc_column_name: '',
            sc_config_user: '',
            sc_config_time: '',
            size: 10,
            page: 1,
            total: 0,
            loading: true
          },
          editForm: {},
          importForm: {},
          file:undefined,
          fileList: [],
          fileType: ['xlsx', 'xls'],
          fileSize: 50,
          editFormRules: {
            projectName: [
              {required: true, trigger: ['blur', 'change'], message: '请输入项目名称'}
            ],
            tableName: [
              {required: true, trigger: ['blur', 'change'], message: '请输入表名称'}
            ],
            columnName: [
              {required: true, trigger: ['blur', 'change'], message: '请输入字段名称'}
            ],
            maskingRule: [
              {required: true, trigger: ['blur', 'change'], message: '请选择脱敏规则'}
            ],
            ruleLevel: [
              {required: true, trigger: ['blur', 'change'], message: '请选择规则等级'}
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
      //重置查询条件
      resetQueryForm() {
        this.queryForm.sc_project_name = ''
        this.queryForm.sc_table_name = ''
        this.queryForm.sc_column_name = ''
        this.queryForm.sc_config_user = ''
        this.queryForm.sc_config_time = ''
        this.queryPageList()
      },
      async queryPageList() {
        this.queryForm.loading = true
        let res = await request({
          url: '/datalab/maskingRulesConfig/list',
          method: 'post',
          data: {
            pageSize: this.queryForm.size,
            pageNum: this.queryForm.page,
            projectName: this.queryForm.sc_project_name,
            tableName: this.queryForm.sc_table_name,
            columnName: this.queryForm.sc_column_name,
            userName: this.queryForm.sc_config_user,
            configTime: this.queryForm.sc_config_time
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
      handleCloseDetail(){
        this.addDialogVisible = false
        this.editDialogVisible = false
        this.importDialogVisible = false
        this.$refs.editFormRef.resetFields()
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
      //查询规则枚举
      async queryMaskingRules() {
        let res = await request({
          url: '/datalab/maskingRulesConfig/getMaskingRules',
          method: 'get',
          data: {
          }
        })
        if (res.data) {
          this.maskingRules = res.data
        }
      },
    //新增
      handleAddRule() {
        this.addDialogVisible = true
        this.editForm = {}
      },
      //导入窗口
      handleOnImport() {
        this.importDialogVisible = true
        this.fileList = []
        this.file = undefined
        this.errorData = []
      },
      //提交新增
      handleSendAddRule() {
        this.$refs['editFormRef'].validate(valid => {
            if (valid) {
              request({
                url: '/datalab/maskingRulesConfig/add',
                method: 'post',
                data: {
                  projectName: this.editForm.projectName,
                  tableName: this.editForm.tableName,
                  columnName: this.editForm.columnName,
                  maskingRule: this.editForm.maskingRule,
                  ruleLevel: this.editForm.ruleLevel
                }
              }).then(res => {
                if (res.returnCode === '200') {
                  this.$message({
                    message: '新增成功',
                    type: 'success'
                  })
                } else {
                  this.$message({
                    message: '新增失败',
                    type: 'error'
                  })
                }
                this.addDialogVisible = false
                this.queryPageList()
              })
            } else {
              return false
            }
          })
      },
      //配置脱敏规则
      handleEditRule(row) {
        this.editDialogVisible = true
        this.editForm = row
      },
      //配置脱敏规则提交
      handleSendEditRule() {
        this.$refs['editFormRef'].validate(valid => {
          if (valid) {
            request({
              url: '/datalab/maskingRulesConfig/update',
              method: 'post',
              data: {
                id: this.editForm.id,
                projectName: this.editForm.projectName,
                tableName: this.editForm.tableName,
                columnName: this.editForm.columnName,
                maskingRule: this.editForm.maskingRule,
                ruleLevel: this.editForm.ruleLevel
              }
            }).then(res => {
              if (res.returnCode === '200') {
                this.$message({
                  message: '脱敏规则配置成功',
                  type: 'success'
                })
              } else {
                this.$message({
                  message: '脱敏规则配置失败',
                  type: 'error'
                })
              }
              this.editDialogVisible = false
              this.queryPageList()
            })
          } else {
            return false
          }
        })
      },
      //上传文件
      handleImportFile(file) {
        this.file = file.raw
        //this.$refs.uploadButton.submit()
      },
      uploadFile(){
        this.errorData = []
        if (!this.beforeUpload(this.file)) {
          return
        }
        const formData = new FormData()
        formData.append('file',this.file)
        request({
          url:'/datalab/maskingRulesConfig/importTemp',
          method:'post',
          headers:{'Content-Type':'multipart/form-data;charset=UTF-8'},
          data:formData
        }).then(res=>{
          if (res.returnCode === '200') {
            if (res.data){
              this.$message({
                message: '导入失败，请查看表格中的错误数据，重新导入',
                type: 'error'
              })
              this.errorData = res.data
            }else {
              this.$message({
                message: '导入成功',
                type: 'success'
              })

              this.importDialogVisible = false
              this.queryPageList()
            }
          } else {
            this.$message({
              message: '导入失败，' + res.returnMsg,
              type: 'error'
            })
          }
        })
      },
      //删除之前
/*      handleRemove(file,fileList) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$emit('on-remove', fileList)
          this.fileList = fileList
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },*/
      // 下载模板
      handleDownloadTemplate() {
        request({
          url: '/datalab/maskingRulesConfig/downTemplate',
          method: 'get',
          data: {
          },
          responseType:'arraybuffer',
        }).then((res) => {
          const content = res.data;
          const blob = new Blob([content]);
          const contentDisposition = res.headers['content-disposition'];
          const patt = new RegExp("fileName=([^;]+\\.[^\\.;]+);*");
          const result = patt.exec(contentDisposition);
          const fileName = decodeURI(result[1]);
          if ("download" in document.createElement("a")) {
            // 非IE下载
            const elink = document.createElement("a");
            elink.download = fileName;
            elink.style.display = "none";
            elink.href = window.URL.createObjectURL(blob);
            document.body.appendChild(elink);
            elink.click();
            window.URL.revokeObjectURL(elink.href); // 释放URL 对象
            document.body.removeChild(elink);
          } else {
            // IE10+下载
            navigator.msSaveBlob(blob, fileName);
          }
        }).catch(err => {
          console.log(err)
          this.$message.error('下载失败')
        })
      },
      previewFile(file) {
        if (file.url){
          window.location.href = file.url
        }
      },
      beforeUpload(file){
        if (file === null || file === undefined) {
          this.$message.error('请选择文件')
          return false
        }
        const limitBody = this.fileUploadLimit(file,this.fileType)
        if (limitBody.limit) {
          this.$message({
            message: limitBody.error,
            type: 'error'
          })
        }
        return !limitBody.limit
      },
      handleExceed(files, fileList) {
        this.$message.error('仅可上传1个文件')
      },
      handleSuccess(res, file, fileList) {
        this.$emit('on-success', this.fileList)
      },
      //文件上传限制
      fileUploadLimit(file,fileType){
        const filePost = file.name.substring(file.name.lastIndexOf('.')+1)
        const extension = fileType.findIndex(item => item.toLowerCase().indexOf(filePost.toLowerCase()) > -1)
        //文件大小限定50kb
        const isLimit = file.size / 1024  < this.fileSize
        if (extension === -1){
          const fileTypeStr = fileType.join(',')
          return {
            limit : true,
            error : '仅支持上传' + fileTypeStr + '格式文件'
          }
        }
        return {
          limit : !isLimit,
          error : '文件大小不能超过' + this.fileSize + 'kb'
        }
      },
      //编辑
      handleEdit(index, row) {
        this.editDialogVisible = true
        this.editForm = row
      },
      //删除
      handleDelete(index, row) {
        this.$confirm('确定删除该条记录吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          request({
            url: '/datalab/maskingRulesConfig/delete',
            method: 'post',
            data: {
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
    },
    mounted() {
      this.queryPageList()
      this.queryMaskingRules()
    }
}
</script>

<style lang="scss" scoped>
.maskingRulesConfig {
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
        .el-date-editor.el-input{
          width: 180px;
          .el-date-editor.el-input__inner {
            width: 180px;
          }
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
    // .el-button--text{
    //   color: #0825f3;
    // }
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
