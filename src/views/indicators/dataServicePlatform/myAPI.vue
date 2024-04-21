<template>
  <div class="app-container">
    <el-dialog
        :visible="editDialogVisible"
        title="编辑"
        @close="handleCloseEdit"
    >
      <div
          style="overflow-y: auto;overflow-x:hidden;height:100%;padding-left:10px;padding-right:10px"
      >
        <el-form
            ref="editFormRef"
            :inline="true"
            :model="applyApiServiceForm"
            label-position="left"
            size="medium"
        >
          <el-row :gutter="10">
            <el-col :span="5">
              <el-form-item
                  :rules="applyRules"
                  label="API名称："
                  prop="apiName"

              >
                <el-input
                    v-model="applyApiServiceForm.apiName"
                    placeholder="请输入名称"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item
                  :rules="applyRules"
                  label="口径："
                  prop="caliber"

              >
                <el-input
                    v-model="applyApiServiceForm.caliber"
                    placeholder="请输入口径"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row
              v-for="(parameter, index) in applyApiServiceForm.parameters"
              :key="index"
              :gutter="10"
          >
            <el-col :span="5">
              <el-form-item
                  :label="'参数名称' + index"
                  :prop="`parameters[${index}].parameterName`"
                  :rules="applyRules"
              >
                <el-input
                    v-model="parameter.parameterName"
                    placeholder="请输入名称"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item
                  :label="'参数类型' + index"
                  :prop="`parameters[${index}].parameterType`"
                  :rules="applyRules"
              >
                <el-input
                    v-model="parameter.parameterType"
                    placeholder="请输入参数类型"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <span
              style="cursor:pointer;position: relative;top:-50px;left:330px"
              @click="addParameter"
          >
                  <i class="el-icon-circle-plus" style="top:-50px"></i>
                </span>

          <el-row>
            <el-col>
              <el-form-item>
                <div style="display: flex;justify-content:flex-end">
                  <el-button type="primary" @click="handleConfirmApply"
                  >确认更新
                  </el-button
                  >
                  <el-button type="primary" @click="handleResetParameters"
                  >重置
                  </el-button
                  >
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-dialog>
    <div class="content">
      <div class="header">
        <el-form :inline="true" :model="queryForm">
          <el-row>
            <el-col :span="6">
              <el-form-item label="API ID">
                <el-input
                    v-model="queryForm.id"
                    placeholder="请输入ID"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="状态：">
                <el-select
                    v-model="queryForm.status"
                    placeholder="请选择状态"
                >
                  <el-option label="全部" value=""></el-option>
                  <el-option label="已下线" value="0"></el-option>
                  <el-option label="在线" value="1"></el-option>

                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="搜索类型">
                <el-select
                    v-model="queryForm.apiType"
                    placeholder="请选择API类型"
                >
                  <el-option label="全部" value=""></el-option>
                  <el-option label="新建API" value="0"></el-option>
                  <el-option label="申请权限" value="1"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="名称：">
                <el-input placeholder="请输入名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="名称：">
                <el-input placeholder="请输入名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="名称：">
                <el-input placeholder="请输入名称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-button type="primary" @click="queryPageList">查询</el-button>
              <el-button type="primary" @click="resetQueryForm">重置</el-button>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="main">
        <el-table
            v-loading="loading"
            :data="tableData2"
            height="100%"
        >
          <el-table-column label="API ID" prop="id"></el-table-column>
          <el-table-column label="状态" prop="status"></el-table-column>
          <el-table-column label="类型" prop="apiType"></el-table-column>
          <el-table-column label="测试地址"></el-table-column>
          <el-table-column label="生产地址"></el-table-column>
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
            :page-size="queryForm.size"
            :total="queryForm.total"
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
// import {getApiInfo, getApiPowerInfo} from "@/api/dataservice/myApi/myApi";
import request from "@/utils/request";

export default {
  name: "MyApi",
  data() {
    return {
      editForm: {},
      tableData: [],
      queryForm: {
        id: '',
        status: '',
        size: 10,
        page: 1,
        total: 0,
        pages: 0,
        apiType: '',
      },
      loading: true,
      editDialogVisible: false,
      applyApiServiceForm: {
        apiName: "",
        caliber: "",
        parameters: [
          {
            parameterName: "",
            parameterType: "",
          },
        ],

      },
      tableData2: [],
      applyRules: [
        {
          required: true,
          message: "请输入名称",
          trigger: ["blur", "change"],
        },
      ],
    };
  },
  methods: {
    resetQueryForm() {
      this.queryForm.apiType = '';
      this.queryForm.id = '';
      this.queryForm.status = '';
      this.queryForm.page = 1;
      this.queryForm.size = 10;
      this.queryPageList();
    },
    handleEdit(index, row) {
      this.editDialogVisible = true;
      this.editForm = row
      console.log(index);
      console.log(row);
    },
    handleCloseEdit() {
      this.editDialogVisible = false;
    },
    addParameter() {
      this.applyApiServiceForm.parameters.push({
        parameterName: "",
        parameterType: "",
      });
    },
    removeParameter(index) {
      console.log(index);
      this.applyApiServiceForm.parameters.splice(index, 1);
    },
    handleResetParameters() {
      this.applyApiServiceForm.parameters = [
        {
          parameterName: "",
          parameterType: "",
        },
      ];
      this.applyApiServiceForm.apiName = "";
      this.applyApiServiceForm.caliber = "";
    },
    handleConfirmApply() {

      this.$refs['editFormRef'].validate((valid) => {
        if (valid) {
          request({
            url: '/dataApi/apiApplyInfo',
            method: 'put',
            data: {
              ...this.editForm
            }
          }).then(() => {
            this.$message({
              message: "已成功编辑！",
              type: "success",
            });
            this.editDialogVisible = false;
          })
        } else {
          return false;
        }
      })

    },
    async queryPageList() {
      console.log(this.queryForm);

      //去除查询条件中为空的属性
      let params = Object.keys(this.queryForm).filter((key) => this.queryForm[key] !== null && this.queryForm[key] !== undefined && this.queryForm[key] !== '').reduce((previousKeys, currentKey) => ({
        ...previousKeys,
        [currentKey]: this.queryForm[currentKey]
      }), {});

      console.log(params)
      this.loading = true;
      let res = await request({
        url: `dataApi/apiApplyInfo/page`,
        method: "get",
        params
      });


      if (res.data && res.data.records) {
        this.tableData2 = res.data.records;
        if (res.data.pages) this.queryForm.pages = res.data.pages;
        if (res.data.total) this.queryForm.total = res.data.total;
      }
      this.loading = false;
    },
    handleSizeChange(val) {
      this.queryForm.size = val;
      this.queryPageList();
    },
    handleCurrentChange(val) {
      this.queryForm.page = val;
      this.queryPageList();
    },
    handleDelete(index, row) {
      console.log(row)
      this.editForm = row;
      this.$confirm('是否要下线该文件?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        request({
          url: '/dataApi/apiApplyInfo/close',
          method: 'post',
          data: {
            ...this.editForm,
            status: '0',
          }
        }).then((res) => {
          if (res.code === 0) {
            this.$message({
              type: 'success',
              message: res.msg
            });
          } else {
            this.$message({
              type: 'error',
              message: res.msg
            })
          }
          this.queryPageList()
        })
      });


    }
  },
  mounted() {
    this.queryPageList();
  },
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
