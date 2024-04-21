<template>
  <div class="myService">
    <div class="condition">
      <div class="left">
        <span style="margin-right: 8px">精准筛选:</span>
        <el-input v-model="appCode" placeholder="请输入应用code" clearable>
        </el-input>
        <el-input v-model="appName" placeholder="请输入应用名称" clearable>
        </el-input>
        <el-select v-model="status" placeholder="请选择状态" clearable>
          <el-option label="已下线" value="0"></el-option>
          <el-option label="草稿" value="1"></el-option>
          <el-option label="需求已提交" value="2"></el-option>
          <el-option label="需求已通过" value="3"></el-option>
          <el-option label="需求已驳回" value="4"></el-option>
          <el-option label="开发中" value="5"></el-option>
          <el-option label="测试中" value="6"></el-option>
          <el-option label="已完成待上线" value="7"></el-option>
          <el-option label="已上线" value="8"></el-option>
        </el-select>

        <el-button @click="queryList()">搜索</el-button>
      </div>
      <div class="btns">
        <el-button class="applyDoc" @click="jumpApp()">应用申请</el-button>
      </div>
    </div>
    <!-- 表格 -->
    <div class="table">
      <el-table :data="tableData" max-height="543px">
        <el-table-column label="序号" type="index" width="50">
        </el-table-column>
        <el-table-column
          v-for="(item, index) in propList"
          :key="index"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :align="item.align"
        >
          <template slot-scope="scope">
            <span v-if="item.type === 'tag'">
              <el-tag :type="item.tagType(scope.row)" size="mini">
                {{ item.render(scope.row) }}
              </el-tag>
            </span>
            <span v-else>{{ scope.row[item.prop] }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="250">
          <template slot-scope="scope">
            <el-button type="text" @click="viewDetails(scope.row)"
              >查看</el-button
            >
            <el-button type="text" @click="edit(scope.row)">编辑</el-button>
            <el-button
              type="text"
              style="color: #409efe"
              @click="appService(scope.row)"
              >应用服务关系</el-button
            >
            <el-button
              type="text"
              style="color: #f56c6c"
              @click="delApp(scope.row)"
              >删除</el-button
            >
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
    <!-- 上下线确认弹窗 -->
    <el-dialog :visible.sync="confirmDialog" width="208px" top="38vh">
      <i class="el-icon-info"></i>
      <span>{{ message }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="confirmDialog = false">取 消</el-button>
        <el-button type="primary" @click="confrim()">确 认</el-button>
      </span>
    </el-dialog>
    <!-- 数据预览弹窗 -->
    <el-dialog
      class="appService"
      :visible.sync="appServiceVis"
      width="1040px"
      top="25vh"
    >
      <i class="el-icon-close" @click="appServiceVis = false"></i>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="我拥有的" name="first"></el-tab-pane>
        <el-tab-pane label="我可访问的" name="second"></el-tab-pane>
      </el-tabs>
      <!-- 表格 -->
      <el-table :data="diaDataList" height="235px">
        <el-table-column
          v-for="(item, index) in diaDataProp"
          :prop="item.prop"
          :label="item.label"
          :align="item.align"
          :key="index"
          :min-width="item.width"
        >
          <template scope="scope">
            <span>{{ scope.row[item.prop] }}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "MyShopCar",
  data() {
    return {
      // 条件
      appCode: "",
      appName: "",
      status: "",
      // 表格
      tableData: [],
      propList: [],
      // 分页
      pageSize: 10,
      currentPage: 1,
      total: 10,
      // 删除确认弹窗
      confirmDialog: false,
      message: "",
      // 当前操作id
      currentId: "",
      // 应用服务关系
      appServiceVis: false,
      activeName: "first",
      diaDataProp: [],
      diaDataList: [],
      curAppCode: "",
    };
  },
  // beforeRouteLeave(to, from, next) {
  //   if (
  //     to.name === "applyForApp" ||
  //     to.name === "appDetail" ||
  //     to.name === "editApp"
  //   ) {
  //     this.$store.commit("SET_KEEPALIVE", true);
  //   } else {
  //     this.$store.commit("SET_KEEPALIVE", false);
  //   }
  //   next();
  // },
  created() {
    // this.$store.commit("SET_KEEPALIVE", true);
    this.propList = [
      {
        prop: "appName",
        label: "应用名称",
      },
      {
        prop: "appCode",
        label: "应用code",
      },
      {
        prop: "description",
        label: "描述",
      },
      {
        prop: "status",
        label: "状态",
        type: "tag",
        tagType: (row) => {
          let type = "";
          if (row.status === "0") {
            type = "info";
          } else if (row.status === "1") {
            type = "warning";
          } else if (row.status === "2") {
            type = "warning";
          } else if (row.status === "3") {
            type = "success";
          } else if (row.status === "4") {
            type = "danger";
          } else if (row.status === "5") {
            type = "warning";
          } else if (row.status === "6") {
            type = "warning";
          } else if (row.status === "7") {
            type = "warning";
          } else if (row.status === "8") {
            type = "";
          }
          return type;
        },
        render: (row) => {
          let status = "";
          if (row.status === "0") {
            status = "已下线";
          } else if (row.status === "1") {
            status = "草稿";
          } else if (row.status === "2") {
            status = "需求已提交";
          } else if (row.status === "3") {
            status = "需求已通过";
          } else if (row.status === "4") {
            status = "需求已驳回";
          } else if (row.status === "5") {
            status = "开发中";
          } else if (row.status === "6") {
            status = "测试中";
          } else if (row.status === "7") {
            status = "已完成待上线";
          } else if (row.status === "8") {
            status = "已上线";
          }
          return status;
        },
      },
      {
        prop: "createDate",
        label: "创建时间",
      },
    ];
  },
  mounted() {
    this.queryList();
  },
  methods: {
    // 查询列表
    queryList() {
      let request = {
        page: this.currentPage,
        size: this.pageSize,
        appCode: this.appCode,
        appName: this.appName,
        status: this.status,
      };
      this.$api.qryAppList(request).then((res) => {
        console.log(res);
        this.tableData = res.data.records;
        this.total = res.data.total;
      });
    },
    // jumpApp
    jumpApp() {
      this.$router.push({
        path: "/dataServicePlatform/applyForApp",
      });
    },
    // 查看
    viewDetails(row) {
      console.log("查看", row.appCode);
      this.$router.push({
        path: "/dataServicePlatform/appDetail",
        query: {
          appCode: row.appCode,
        },
      });
    },
    // 编辑
    edit(row) {
      console.log("编辑", row.appCode);
      this.$router.push({
        path: "/dataServicePlatform/editApp",
        query: {
          appCode: row.appCode,
        },
      });
    },
    // 应用服务关系
    appService(row) {
      console.log("应用服务关系");
      this.diaDataProp = [
        {
          prop: "name",
          label: "名称",
          align: "center",
        },
        {
          prop: "description",
          label: "描述",
          align: "center",
        },
      ];
      this.appServiceVis = true;
      this.curAppCode = row.appCode;
      this.$api
        .qryAppService({
          appCode: this.curAppCode,
        })
        .then((res) => {
          console.log(res, 23333);
          this.diaDataList = res.data;
        });
    },
    // 弹窗tab
    handleClick(tab, event) {
      console.log(tab.name);
      if (tab.name === "first") {
        this.$api
          .qryAppService({
            appCode: this.curAppCode,
          })
          .then((res) => {
            this.diaDataList = res.data;
          });
      } else {
        this.$api
          .qryAppAccessService({
            appCode: this.curAppCode,
          })
          .then((res) => {
            this.diaDataList = res.data;
          });
      }
    },
    // 删除
    delApp(row) {
      console.log(row);
      this.message = "您要删除此应用吗？";
      this.confirmDialog = true;
      this.currentId = row.appCode;
    },
    // 确认删除
    confrim() {
      this.confirmDialog = false;
      this.$api
        .deleteApp({
          appCode: this.currentId,
        })
        .then((res) => {
          console.log(res, "删除");
          if (res.code == 0 || res.code == 200) {
            this.$message.success(res.msg);
            this.queryList();
          } else {
            this.$message.error(res.msg);
          }
        });
    },
    // 分页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.queryList();
    },
  },
};
</script>

<style lang="scss" scoped>
.myService {
  width: calc(100% - 32px);
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
      width: 85%;
      span {
        font-size: 14px;
        color: #202224;
      }
      .el-input,
      .el-cascader,
      .el-select {
        width: 180px;
        max-width: 20%;
        min-width: 120px;
      }
      .el-button {
        border-radius: 4px;
        color: #fff;
        background: #79ac43;
        border: none;
      }
    }
    .btns {
      width: 15%;
      display: flex;
      justify-content: flex-end;
      .el-button {
        width: 86px;
        height: 30px;
        border-radius: 2px;
        color: #fff;
        border: none;
      }
      .applyApi {
        background: #5783f2;
      }
      .applyDoc {
        background: #79ac43;
      }
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
    overflow-x: auto;
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

            .el-tag {
              border: none;
              // width: 44px;
              height: 21px;
              line-height: 21px;
            }
            .el-tag.el-tag--light {
              color: rgba(87, 131, 242, 1);
              background: rgba(237, 242, 255, 1);
            }
            .el-tag.el-tag--success {
              color: rgba(121, 172, 67, 1);
              background: rgba(240, 255, 224, 1);
            }
            .el-tag.el-tag--info {
              color: rgba(77, 78, 80, 1);
            }
            .el-tag.el-tag--danger {
              color: rgba(201, 31, 28, 1);
              background: rgba(255, 235, 232, 1);
            }
            .el-tag.el-tag--warning {
              color: rgba(230, 151, 34, 1);
              background: rgba(255, 243, 224, 1);
            }
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
  // 数据服务关系弹窗
  ::v-deep .el-dialog__wrapper.appService {
    .el-dialog {
      height: 320px;
      border-radius: 8px;
      overflow: hidden;
      box-sizing: border-box;
      padding: 16px 24px;
      .el-dialog__header {
        padding: 5px;
      }
      .el-dialog__body {
        padding: 0;
        height: auto;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        .el-icon-close {
          font-size: 20px;
          position: absolute;
          right: 20px;
          top: 25px;
          color: #4d4e50;
          cursor: pointer;
        }
        .el-icon-close:hover {
          color: #79ac43;
        }
        .el-tabs {
          // width: 100%;
          .el-tabs__nav-wrap::after {
            background: transparent;
          }
        }
        .el-table::before {
          display: none;
        }
        .el-table {
          border: 1px solid #e8e8e8;
          margin-top: 0;
          max-height: 235px;
          // header
          .el-table__header-wrapper {
            .el-table__header {
              tr {
                border: 1px solid #e8e8e8;
                th {
                  color: rgba(32, 34, 36, 1);
                  font-size: 14px;
                  font-weight: 400;
                  border: none;
                  background: #fafafa;
                }
              }
            }
          }
          // body
          .el-table__body-wrapper {
            height: 185px;
            overflow-y: auto;
            .el-table__body {
              tr {
                font-size: 12px;
                color: #4d4e50;
              }
            }
          }
          .cell {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
    }
  }
}
</style>