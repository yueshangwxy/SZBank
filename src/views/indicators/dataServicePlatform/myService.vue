<template>
  <div class="myService">
    <div class="condition">
      <div class="left">
        <span style="margin-right: 8px">筛选条件:</span>
        <el-input v-model="name" placeholder="请输入名称" clearable> </el-input>
        <el-input v-model="oppositePerson" placeholder="请输入对接人" clearable>
        </el-input>
        <el-cascader
          v-model="dept"
          :options="deptTree"
          :props="{
            value: 'id',
            label: 'name',
            children: 'sysDeptList',
            emitPath: false,
            checkStrictly: true,
          }"
          placeholder="请选择所属部门"
          :show-all-levels="false"
          clearable
        ></el-cascader>
        <el-select v-model="serviceType" placeholder="请选择类型" clearable>
          <el-option label="API" value="1"></el-option>
          <el-option label="文件" value="2"></el-option>
        </el-select>

        <el-button @click="queryList()">搜索</el-button>
      </div>
      <div class="btns">
        <el-button class="applyApi" @click="jumpApi()">API申请</el-button>
        <el-button class="applyDoc" @click="jumpDoc()">文件申请</el-button>
      </div>
    </div>
    <!-- 表格 -->
    <div class="table">
      <el-table :data="tableData" max-height="543px">
        <el-table-column
          v-for="(item, index) in propList"
          :key="index"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :align="item.align"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <span v-if="item.type === 'service'">
              {{ item.render(scope.row) }}
            </span>
            <span v-else-if="item.type === 'tag'">
              <el-tag :type="item.tagType(scope.row)" size="mini">
                {{ item.render(scope.row) }}
              </el-tag>
            </span>
            <span v-else>{{ scope.row[item.prop] }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <el-button type="text" @click="viewDetails(scope.row)"
              >查看</el-button
            >
            <el-button
              type="text"
              :disabled="hasEditRole(scope.row) ? false : true"
              @click="edit(scope.row)"
              >编辑</el-button
            >
            <el-button
              type="text"
              style="color: #409efe"
              v-if="isMiddleAdmin()"
              @click="online(scope.row)"
              >上线</el-button
            >
            <el-button
              type="text"
              style="color: #f56c6c"
              v-if="isMiddleAdmin()"
              @click="offline(scope.row)"
              >下线</el-button
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
  </div>
</template>
<script>
import { isMiddleAdmin, isSuperAdmin } from "@/utils/validator";
export default {
  name: "myService",
  data() {
    return {
      name: "",
      oppositePerson: "",
      dept: "",
      type: "",
      serviceType: "",
      // 表格
      tableData: [],
      propList: [],
      // 分页
      pageSize: 10,
      currentPage: 1,
      total: 10,
      // 上下线确认弹窗
      confirmDialog: false,
      message: "",
      // 当前操作id
      currentOperation: {
        online: 0,
        id: "",
      },
      // 部门树
      deptTree: [],
    };
  },
  // beforeRouteLeave(to, from, next) {
  //   if (
  //     to.name === "editApi" ||
  //     to.name === "apiDetail" ||
  //     to.name === "docDetail" ||
  //     to.name === 'applyForApi' ||
  //     to.name === 'applyForDoc' ||
  //     to.name === "editDoc"
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
        prop: "name",
        label: "名称",
      },
      {
        prop: "description",
        label: "描述",
      },
      {
        prop: "dept",
        label: "所属部门",
      },
      {
        prop: "belongUser",
        label: "对接人",
      },
      {
        prop: "serviceType",
        label: "服务类型",
        type: "service",
        render: (row) => {
          let label = row.serviceType === "1" ? "API" : "文件";
          return label;
        },
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
        prop: "crtUserCode",
        label: "创建人",
      },
      {
        prop: "createDate",
        label: "创建时间",
      },
    ];
    this.$api.findDeptTree({}).then((res) => {
      this.deptTree = res.data;
    });
  },
  mounted() {
    this.queryList();
  },
  computed: {
    isSuperLogin() {
      return isMiddleAdmin() || isSuperAdmin();
    },
  },
  methods: {
    isMiddleAdmin() {
      return isMiddleAdmin();
    },
    // 查询列表
    queryList() {
      let request = {
        name: this.name, // 名称
        belongUser: this.oppositePerson, // 对接人
        dept: this.dept, // 所属部门
        serviceType: this.serviceType, // 1API 2wenjian
        crtUserCode: "", // 创建人
        page: this.currentPage,
        size: this.pageSize,
      };
      this.$api.qryServiceList(request).then((res) => {
        console.log(res);
        this.tableData = res.data.records;
        this.total = res.data.total;
      });
    },
    // jumpApi
    jumpApi() {
      this.$router.push({
        path: "/dataServicePlatform/applyForApi",
      });
    },
    // jumpDoc
    jumpDoc() {
      this.$router.push({
        path: "/dataServicePlatform/applyForDoc",
      });
    },
    // 查看
    viewDetails(row) {
      if (row.serviceType === "1") {
        this.$router.push({
          path: "/dataServicePlatform/apiDetail",
          query: {
            id: row.id,
          },
        });
      } else if (row.serviceType === "2") {
        this.$router.push({
          path: "/dataServicePlatform/docDetail",
          query: {
            id: row.id,
          },
        });
      }
    },
    /**
     * 普通用户只能在草稿状态下编辑
     */
    hasEditRole(row) {
      if (!this.isSuperLogin && row.status !== "1") {
        return false;
      } else {
        return true;
      }
    },
    // 编辑
    edit(row) {
      if (row.serviceType === "1") {
        this.$router.push({
          path: "/dataServicePlatform/editApi",
          query: {
            id: row.id,
          },
        });
      } else if (row.serviceType === "2") {
        this.$router.push({
          path: "/dataServicePlatform/editDoc",
          query: {
            id: row.id,
          },
        });
      }
    },
    // 上线
    online(row) {
      console.log(row);
      this.message = "您要上线此条服务吗？";
      this.confirmDialog = true;
      this.currentOperation = {
        online: 0,
        id: row.id,
      };
    },
    // 下线
    offline(row) {
      console.log(row);
      this.message = "您要下线此条服务吗？";
      this.confirmDialog = true;
      this.currentOperation = {
        online: 1,
        id: row.id,
      };
    },
    // 确认上下线
    confrim() {
      this.confirmDialog = false;
      console.log(this.currentOperation, "上下线");
      // 调接口
      if (this.currentOperation.online === 0) {
        this.$api
          .serviceOnline({
            id: this.currentOperation.id,
          })
          .then((res) => {
            console.log(res, "上线");
            if (res.code == 0 || res.code == 200) {
              this.$message.success(res.msg);
              this.queryList();
            } else {
              this.$message.error(res.msg);
            }
          });
      } else {
        this.$api
          .serviceOffline({
            id: this.currentOperation.id,
          })
          .then((res) => {
            console.log(res, "下线");
            if (res.code == 0 || res.code == 200) {
              this.$message.success(res.msg);
              this.queryList();
            } else {
              this.$message.error(res.msg);
            }
          });
      }
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
      width: 80%;
      span {
        font-size: 14px;
        color: #202224;
      }
      .el-input,
      .el-cascader,
      .el-select {
        width: 180px;
        max-width: 19%;
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
      width: 20%;
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
}
</style>