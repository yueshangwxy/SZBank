<template>
  <div class="role">
    <!-- 筛选条件 -->
    <div class="conditions">
      <el-input
        v-model="name"
        placeholder="角色名称和描述搜索"
        clearable
      ></el-input>
      <el-date-picker
        v-model="date"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      >
      </el-date-picker>
      <el-button type="primary" @click="initList()">搜索</el-button>
      <el-button @click="addRole()" type="primary">新增</el-button>
      <!-- <el-button
        @click="batchDelete()"
        :disabled="!selectRows.length"
        type="primary"
        >删除</el-button
      > -->
    </div>
    <!-- 表格 -->
    <div class="table">
      <el-table
        :data="tableData"
        row-key="id"
        lazy
        @selection-change="handleSelectionChange"
      >
        <!-- <el-table-column type="selection" width="55"> </el-table-column> -->
        <el-table-column
          v-for="(item, index) in propList"
          :key="index"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :align="item.align"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span v-if="item.type === 'tag'">
              <el-tag :type="item.tagType(scope.row)" size="mini">
                {{ item.render(scope.row) }}
              </el-tag>
            </span>
            <span v-else-if="item.type === 'icon'">
              <i :class="scope.row[item.prop]" style="font-size: 16px"></i>
            </span>
            <span v-else-if="item.type === 'dateTime'">
              {{ formatDateTime(scope.row[item.prop]) }}
            </span>
            <span v-else>{{ scope.row[item.prop] }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button type="text" @click="addUser(scope.row)"
              >添加用户</el-button
            >
            <el-button type="text" @click="modify(scope.row)">修改</el-button>
            <el-popover width="200" :ref="`popover-${scope.$index}`">
              <p>确定删除本条数据吗？</p>
              <div style="text-align: right; margin: 0">
                <el-button
                  size="mini"
                  type="text"
                  @click="handleClose(scope.$index)"
                  >取消</el-button
                >
                <el-button
                  type="primary"
                  size="mini"
                  @click="delRow(scope.row, scope.$index)"
                  >确定</el-button
                >
              </div>
              <el-button slot="reference" type="text" style="margin-left: 8px"
                >删除</el-button
              >
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div class="pagination">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="total"
        v-if="total !== 0"
      >
      </el-pagination>
    </div>
    <!-- 角色新增弹窗 -->
    <el-dialog
      class="addRoleDia"
      :title="addOrEditTitle"
      :visible.sync="addRoleVisible"
      width="600px"
      top="25vh"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        label-width="80px"
        class="demo-ruleForm"
        ref="ruleForm"
      >
        <!-- 所属租户 -->
        <!-- <el-form-item label="租户" prop="tenant" v-if="addOrEditTitle==='新增角色'">
                    <el-select v-model="ruleForm.tenant"
                        placeholder="请选择所属租户"
                        clearable>
                        <el-option v-for="item in tenantList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"></el-option>
                    </el-select>
                </el-form-item> -->
        <!-- 角色名称 -->
        <el-form-item label="角色名称" prop="name">
          <el-input
            v-model="ruleForm.name"
            placeholder="请输入角色名称"
            clearable
            maxlength="100"
            show-word-limit
          ></el-input>
        </el-form-item>
        <!-- 描述信息 -->
        <el-form-item label="描述信息" prop="remark">
          <el-input
            v-model="ruleForm.remark"
            type="textarea"
            rows="3"
            placeholder="请输入描述信息"
            clearable
            maxlength="1000"
            show-word-limit
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addRoleVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmAddRole()">确 认</el-button>
      </span>
    </el-dialog>
    <!-- 用户新增 -->
    <AddUserDialog
      :addUserVisible.sync="addUserVisible"
      :rowId="rowId"
      @closeAddUser="closeAddUser"
      @confirmAddUser="confirmAddUser"
    ></AddUserDialog>
    <!-- 批量删除提示框 -->
    <el-dialog
      class="batchDeleteDia"
      title="提示"
      :visible.sync="batchDeleteVisible"
      width="300px"
      top="25vh"
    >
      <i class="el-icon-info"></i>
      <span>确定删除选中的{{ selectRows.length }}条数据吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="batchDeleteVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmDelete()">确 认</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import AddUserDialog from "./addUserDialog.vue";
export default {
  name: "roleManager",
  components: {
    AddUserDialog,
  },
  data() {
    return {
      name: "",
      date: "",
      dateValue: [],
      // 表格
      tableData: [],
      propList: [
        {
          prop: "name",
          label: "名称",
          align: "center",
        },
        // {
        //   prop: "tenantName",
        //   label: "所属租户",
        //   align: "center",
        // },
        {
          prop: "remark",
          label: "描述",
        },
        {
          prop: "crtDate",
          type: "dateTime",
          label: "创建日期",
        },
      ],
      // 分页
      pageSize: 10,
      total: 10,
      currentPage: 1,
      // 角色新增弹窗
      addOrEditTitle: "",
      addRoleVisible: false,
      // tenantList: [],
      ruleForm: {
        // tenant: '',
        name: "",
        remark: "",
      },
      rules: {
        tenantName: [
          { required: true, message: "请选择租户", trigger: "change" },
        ],
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
      },
      // 单条数据删除popover框
      singleDelVis: false,
      // 新增用户弹窗
      addUserVisible: false,
      // 批量删除提示框
      batchDeleteVisible: false,
      // 当前选中行
      selectRows: [],
      // 当前操作行id
      rowId: "",
    };
  },
  watch: {
    date(val) {
      if (val) {
        let startTime = this.$formatDate(val[0]);
        let endTime = this.$formatDate(val[1]);
        this.dateValue = [startTime, endTime];
      } else {
        this.dateValue = [];
      }
    },
  },
  mounted() {},
  computed: {},
  created() {
    this.queryList();
  },
  methods: {
    // 重置
    reset() {
      this.name = "";
      this.date = "";
    },
    // 从第一页开始搜索
    initList() {
      this.currentPage = 1;
      this.queryList();
    },
    // 列表查询
    queryList() {
      // name(输入名称或者描述搜索) crtDate(时间控制) size(分页条数)  page(页码)
      let request = {
        name: this.name,
        crtDateBeg: this.dateValue[0] || '',
        crtDateEnd: this.dateValue[1] || '', 
        size: this.pageSize,
        page: this.currentPage,
      };
      this.$api.qryRoleListPage(request).then((res) => {
        if (res.data && res.data.records) {
          this.tableData = res.data.records;
          this.total = res.data.total;
        }
      });
    },
    // 复选框选中
    handleSelectionChange(val) {
      this.selectRows = val;
    },
    // 角色新增
    addRole() {
      this.addOrEditTitle = "新增角色";
      this.addRoleVisible = true;
      this.$nextTick(() => {
        this.$refs["ruleForm"].resetFields();
      });
    },
    // 新增/编辑角色弹窗确定
    confirmAddRole() {
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          if (this.addOrEditTitle === "新增角色") {
            this.$api
              .createRole({
                name: this.ruleForm.name,
                remark: this.ruleForm.remark,
              })
              .then((res) => {
                if (res.code == 200 || res.code == 0) {
                  this.$message.success(res.msg);
                  this.addRoleVisible = false;
                  this.queryList();
                } else {
                  this.$message.error(res.msg);
                }
              });
          } else if (this.addOrEditTitle === "编辑角色") {
            this.$api
              .updateRole({
                id: this.rowId,
                name: this.ruleForm.name,
                remark: this.ruleForm.remark,
              })
              .then((res) => {
                if (res.code == 200 || res.code == 0) {
                  this.$message.success(res.msg);
                  this.addRoleVisible = false;
                  this.ruleForm = {};
                  this.queryList();
                } else {
                  this.$message.error(res.msg);
                }
              });
          }
        } else {
          return false;
        }
      });
    },
    // 新增用户弹窗  -- 打开
    addUser(row) {
      this.rowId = row.id;
      this.ruleForm = {};
      this.addUserVisible = true;
    },
    // 新增用户弹窗  -- 确定
    confirmAddUser() {
      this.addUserVisible = false;
    },
    // 新增用户弹窗  -- 关闭
    closeAddUser() {
      this.addUserVisible = false;
    },
    // 修改
    modify(row) {
      this.rowId = row.id;
      this.addOrEditTitle = "编辑角色";
      this.addRoleVisible = true;
      this.$nextTick(() => {
        this.ruleForm = { ...row };
        this.$refs["ruleForm"].resetFields();
      });
    },
    // 关闭popover
    handleClose(index) {
      this.$refs[`popover-${index}`].doClose();
    },
    // 批量删除
    batchDelete() {
      this.batchDeleteVisible = true;
    },
    formatDateTime(dateTime) {
      if (dateTime) {
        let now = new Date(dateTime);
        let year = now.getFullYear();
        let month = now.getMonth() + 1;
        let date = now.getDate();
        return year + "-" + month + "-" + date + " ";
      }
    },
    // 批量删除提示框确定
    confirmDelete() {
      // 调接口  当前选中数据this.selectRows
      let temp = [];
      this.selectRows.forEach((item) => {
        temp.push(item.id);
      });
      let request = {
        ids: temp,
      };
      this.$api.deleteRole(request).then((res) => {
        if (res.code == 200 || res.code == 0) {
          this.batchDeleteVisible = false;
          this.$message.success(res.msg);
          this.queryList();
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    // 删除  --- 单行
    delRow(row, index) {
      // this.rowId = row.id;
      let request = {
        id: row.id,
      };
      // 调接口删除
      this.$api.deleteRole(request).then((res) => {
        if (res.code == 200 || res.code == 0) {
          this.handleClose(index);
          this.$message.success(res.msg);
          this.queryList();
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    //  分页
    handleCurrentChange(val) {
      this.currentPage = val;
      this.queryList();
    },
  },
};
</script>

<style lang="scss" scoped>
ul,
li {
  list-style: none;
}
.role {
  height: 95%;
  // 筛选条件
  .conditions {
    display: flex;
    .el-input {
      width: 180px;
      margin-right: 8px;
    }
    .el-select,
    .el-cascader {
      margin-right: 8px;
    }
    .el-button {
      margin-left: 8px;
    }
  }
  // 表格
  .table {
    margin-top: 16px;
    height: calc(100% - 125px);
    .el-table::before {
      background-color: #fff;
      height: 0;
    }
    ::v-deep .el-table {
      height: 90%;
      overflow: auto;
      margin-top: 24px;
      padding-left: 4px;
      // header
      .el-table__header-wrapper {
        .el-table__header {
          tr {
            th {
              color: rgba(32, 34, 36, 1);
              font-size: 14px;
              font-weight: 400;
              border: none;
            }
          }
        }
      }
      // body
      .el-table__body-wrapper {
        .el-table__body {
          border-spacing: 0 8px;
          tr {
            td:first-child {
              border-left: 1px solid rgba(232, 232, 232, 1);
            }
            td:last-child {
              position: relative;
              right: 4px;
              border-right: 1px solid rgba(232, 232, 232, 1);
            }
            td {
              color: rgba(77, 78, 80, 1);
              border-top: 1px solid rgba(232, 232, 232, 1);
              border-bottom: 1px solid rgba(232, 232, 232, 1);
            }
          }
        }
      }
      // 复选框
      .cell {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        .el-checkbox {
          width: 16px;
          height: 16px;
          .el-checkbox__input {
            .el-checkbox__inner {
              width: 16px;
              height: 16px;
            }
          }
          .el-checkbox__input.is-checked,
          .el-checkbox__input.is-indeterminate {
            width: 16px;
            height: 16px;
            display: flex;
            justify-content: center;
            align-items: center;
            background: #fff;
            border: 1px solid #79ac43;
            border-radius: 2px;
          }
          .el-checkbox__input.is-indeterminate {
            .el-checkbox__inner {
              width: 8px;
              height: 4px;
              background: #79ac43;
            }
            .el-checkbox__inner::before {
              display: none;
            }
          }
          .el-checkbox__input.is-checked {
            .el-checkbox__inner {
              width: 8px;
              height: 8px;
              background: #79ac43;
            }
            .el-checkbox__inner::after {
              display: none;
            }
          }
        }
      }
    }
  }
  // 分页
  .pagination {
    position: absolute;
    bottom: 20px;
    right: 40px;
    height: 64px;
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
    .el-pagination {
      margin: 0;
    }
  }
  // 新增弹窗
  ::v-deep .el-dialog__wrapper.addRoleDia {
    .el-dialog {
      border-radius: 8px;
      .el-dialog__body {
        padding: 10px 20px;
        .el-form {
          width: 85%;
          .el-form-item {
            .el-form-item__content {
              .el-select {
                width: 100%;
              }
            }
          }
        }
      }
      .el-dialog__footer {
        padding: 20px 20px 10px;
      }
    }
  }
  // 批量删除提示弹窗
  ::v-deep .el-dialog__wrapper.batchDeleteDia {
    .el-dialog {
      border-radius: 8px;
      padding: 16px;
      box-sizing: border-box;
      .el-dialog__header {
        padding: 0;
      }
      .el-dialog__body {
        line-height: 22px;
        padding: 20px 10px;
        font-size: 14px;
        display: flex;
        align-items: center;
        i {
          color: #e6a23c;
          font-size: 16px;
          margin-right: 8px;
        }
        span {
          color: rgba(0, 0, 0, 0.9);
        }
      }
      .el-dialog__footer {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        padding: 0;
        margin-top: 8px;
        .el-button {
          width: 84px;
          height: 30px;
          margin: 0;
          border-radius: 4px;
        }
        .el-button--default {
          border: none;
          background: #e5e5e5;
          color: #202224;
        }
        .el-button--primary {
          background: #79ac43;
        }
      }
    }
  }
}
</style>
