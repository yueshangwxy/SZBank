<template>
  <div class="myShopCar">
    <div class="condition">
      <div class="left">
        <span>精准筛选:</span>
        <el-input
          v-model="searchInput"
          placeholder="请输入表名"
          @keyup.enter="initList()"
          clearable
        >
          <i
            slot="suffix"
            class="el-input__icon el-icon-search"
            @click="initList()"
          ></i>
        </el-input>
        <el-button @click="initList()">搜索</el-button>
      </div>
      <el-button
        @click="batchOperation()"
        class="batchOperation"
        :disabled="!selectRows.length"
        >发起审批</el-button
      >
    </div>
    <!-- 表格 -->
    <div class="table">
      <el-table
        :data="tableData"
        @selection-change="handleSelectionChange"
        max-height="543px"
      >
        <el-table-column width="55" type="selection" />
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
            <span v-if="item.type === 'endTime'">
              {{ item.render(scope.row) }}
            </span>
            <span v-else>{{ scope.row[item.prop] }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="180">
          <template slot-scope="scope">
            <el-button type="text" @click="viewDetails(scope.row)"
              >详情查看</el-button
            >
            <el-button
              type="text"
              @click="initiateApproval(scope.row)"
              style="color: #409efe"
              >发起审批</el-button
            >
            <el-button
              type="text"
              @click="deleteRow(scope.row)"
              style="color: #f56c6c"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="total"
        v-if="total !== 0"
      >
      </el-pagination>
    </div>
    <!-- 确认审批弹窗 -->
    <el-dialog :visible.sync="confirmDialog" width="208px" top="38vh">
      <i class="el-icon-info"></i>
      <span>您将发起审批申请</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="confirmDialog = false">取 消</el-button>
        <el-button type="primary" @click="confrim()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 已提交提示弹窗 -->
    <el-dialog :visible.sync="tipDialog" width="212px" top="38vh">
      <i class="el-icon-success"></i>
      <span>申请已提交，等待审批...</span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "MyShopCar",
  data() {
    return {
      searchInput: "",
      // 表格
      tableData: [],
      propList: [],
      // 分页
      pageSize: 10,
      currentPage: 1,
      total: 4,
      // 审批 弹窗
      confirmDialog: false,
      // 提示弹窗
      tipDialog: false,
      // 审批参数
      request: [],
      // 当前选中行
      selectRows: [],
      // 是否批量操作
      isbatch: false,
    };
  },
  beforeRouteLeave(to, from, next) {
    if (
      to.path === "/detailsView/table" ||
      to.path === "/detailsView/api" ||
      to.path === "/detailsView/label" ||
      to.path ===  "/detailsView/target"
    ) {
      this.$store.commit("SET_KEEPALIVE", true);
    } else {
      this.$store.commit("SET_KEEPALIVE", false);
    }
    next();
  },
  created() {
    this.$store.commit("SET_KEEPALIVE", true);
    this.propList = [
      {
        prop: "tableName",
        label: "表名",
        width: "160",
      },
      {
        prop: "deptCode",
        width: 130,
        label: "业务属主部门",
      },
      {
        prop: "project",
        label: "存储项目名称",
        width: "160",
      },
      {
        prop: "driverType",
        width: 130,
        label: "底层存储类型",
      },
      {
        prop: "owner",
        label: "所属用户",
      },
      {
        prop: "beginTimeStr",
        width: 130,
        label: "权限开始日期",
      },
      {
        prop: "endTimeStr",
        width: 130,
        label: "权限结束日期",
        type: "endTime",
        render: (row) => {
          let endTimeStr = row.endTimeStr
            ? row.endTimeStr.indexOf("9999") > -1
              ? "永久"
              : row.endTimeStr
            : "";
          return endTimeStr;
        },
      },
      {
        prop: "crtDateStr",
        label: "申请时间",
      },
    ];
  },
  mounted() {
    this.initList();
  },
  methods: {
    transInvalidTime(time) {
      if (time && time.includes("9999")) {
        return "永久";
      } else {
        return time;
      }
    },
    // 从第一页开始查找
    initList() {
      this.currentPage = 1;
      this.queryList();
    },
    // 查询列表
    queryList() {
      this.$api
        .qryShopCar({
          page: this.currentPage,
          size: this.pageSize,
          tableName: this.searchInput,
        })
        .then((res) => {
          let data = res.data;
          this.tableData = data.records;
          this.total = data.total;
        });
    },
    // 复选框选中
    handleSelectionChange(val) {
      // [{}]  [{},{}]
      // this.selectRows = val
      // if(this.selectRows.length<1) {
      //     this.businessKey = ''
      // } else {
      //     this.selectRows.forEach(ele => {
      //         this.businessKey = this.businessKey += ele.tableId + ','
      //     });
      //     this.businessKey = this.businessKey.slice(0,this.businessKey.length-1)
      // }
      this.selectRows = [];
      val.forEach((item) => {
        this.selectRows.push({
          tableId: item.tableId,
          beginTime: item.beginTimeStr,
          endTime: item.endTimeStr,
        });
      });
    },
    // 详情查看
    viewDetails(row) {
      console.log("详情查看", row.tableId);
      this.$router.push({
        path: "/detailsView/table",
        query: {
          id: row.tableId,
        },
      });
    },
    // 发起审批  -- 单个
    initiateApproval(row) {
      this.confirmDialog = true;
      this.isbatch = false;
      this.request = [
        {
          tableId: row.tableId,
          beginTime: row.beginTimeStr,
          endTime: row.endTimeStr,
        },
      ];
    },
    // 发起审批  -- 批量
    batchOperation() {
      this.confirmDialog = true;
      this.isbatch = true;
    },
    // 确认审批
    confrim() {
      this.confirmDialog = false;
      let list = [];
      if (this.isbatch) {
        list = this.selectRows;
      } else {
        list = this.request;
      }
      // 调接口审批
      this.$api
        .initiateApproval({
          list: list,
        })
        .then((res) => {
          console.log(res);
          if (res.code == 200 || res.code == 0) {
            this.tipDialog = true;
            setTimeout(() => {
              this.tipDialog = false;
              this.queryList();
            }, 3000);
          } else {
            this.$message.error(res.msg);
          }
        });
    },
    // 删除
    deleteRow(row) {
      this.$confirm("确定删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$api
          .delShopCar({
            Id: row.id,
          })
          .then((res) => {
            this.queryList();
            this.$message.success(res.message);
          });
      });
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.queryList();
    },
  },
};
</script>

<style lang="scss" scoped>
.myShopCar {
  width: calc(100% - 32px);
  // height: 100%;
  height: calc(100vh - 135px);
  margin: 0 16px 16px 16px;
  padding: 12px;
  box-sizing: border-box;
  background: #fff;
  display: flex;
  flex-direction: column;
  .condition {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      width: 80%;
      span {
        font-size: 14px;
        color: #202224;
      }
      .el-input {
        width: 180px;
        margin-left: 8px;
      }
      .el-button {
        border-radius: 4px;
        color: #202224;
      }
    }
    .batchOperation {
      width: 86px;
      height: 30px;
      border-radius: 2px;
      background: #5783f2;
      color: #fff;
    }
    .batchOperation.is-disabled {
      opacity: 0.7;
    }
  }
  // 表格
  .table {
    flex: 1;
    overflow: auto;
  }
  .el-table::before {
    background-color: #fff;
    height: 0;
  }
  ::v-deep .el-table {
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
  // 分页
  .pagination {
    height: 64px;
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
    .el-pagination {
      margin: 0;
    }
  }
  // 弹窗
  ::v-deep .el-dialog__wrapper {
    .el-dialog {
      border-radius: 8px;
      padding: 16px;
      box-sizing: border-box;
      .el-dialog__header {
        padding: 0;
        display: none;
      }
      .el-dialog__body {
        height: 22px;
        line-height: 22px;
        padding: 0;
        font-size: 14px;
        display: flex;
        align-items: center;
        i {
          color: #79ac43;
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