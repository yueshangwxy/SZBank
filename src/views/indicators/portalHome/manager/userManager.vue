<template>
  <div class="user">
    <!-- 筛选条件 -->
    <div class="conditions">
      <el-input
        v-model="name"
        placeholder="请输入用户名或姓名"
        clearable
      ></el-input>
<!--      <el-date-picker-->
<!--        v-model="date"-->
<!--        type="daterange"-->
<!--        range-separator="至"-->
<!--        start-placeholder="开始日期"-->
<!--        end-placeholder="结束日期"-->
<!--      >-->
<!--      </el-date-picker>-->
      <!-- <el-select v-model="enabled" placeholder="启用" clearable>
        <el-option label="启用" value="0"></el-option>
        <el-option label="禁用" value="1"></el-option>
        <el-option label="离职" value="2"></el-option>
        <el-option label="偷袭" value="3"></el-option>
      </el-select> -->
      <!-- <el-select v-model="userType" placeholder="用户类型" clearable> 
                <el-option label="内部人员" value="0"></el-option>
                <el-option label="支撑人员" value="1"></el-option>
            </el-select> -->
      <el-button type="primary" @click="searchList()">搜索</el-button>
    </div>
    <div class="content">
      <div class="tree">
        <el-input
          placeholder="输入关键字进行过滤"
          v-model="filterText"
          clearable
        >
          <i slot="suffix" class="el-input__icon el-icon-search"></i>
        </el-input>
        <el-tree
          class="filter-tree"
          node-key="id"
          :data="treeData"
          :props="defaultProps"
          accordion
          @node-click="handleNodeClick"
          :filter-node-method="filterNode"
          ref="tree"
        >
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span v-if="data.icon" :class="data.icon"></span>
            <span> {{ node.label }} </span>
          </span>
        </el-tree>
      </div>
      <div class="right">
        <!-- 表格 -->
        <div class="table">
          <el-table
            height="95%"
            :data="tableData"
            row-key="id"
            lazy
            :load="load"
            :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
            @selection-change="handleSelectionChange"
          >
<!--            <el-table-column type="selection" width="45"> </el-table-column>-->
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
                  <!-- <i :class="item.iconTrans(scope.row)" style="font-size:16px"></i> -->
                  <i :class="scope.row[item.prop]" style="font-size: 16px"></i>
                </span>
                <span v-else>{{ scope.row[item.prop] }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="150">
              <template slot-scope="scope">
                <el-button type="text" @click="defendAccount(scope.row)"
                  >维护Dataworks账号</el-button
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
      </div>
    </div>
    <!-- 查看详情弹窗 -->
    <el-dialog
      class="detailsDia"
      title="查看用户"
      :visible.sync="detailsVisible"
      width="45%"
      top="25vh"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="80px"
        class="demo-ruleForm"
        disabled
      >
        <!-- 编号 -->
        <el-form-item label="编号" prop="num">
          <el-input
            v-model="ruleForm.num"
            placeholder="请输入编号"
            clearable
          ></el-input>
        </el-form-item>
        <!-- 姓名 -->
        <el-form-item label="姓名" prop="name">
          <el-input
            v-model="ruleForm.name"
            placeholder="请输入姓名"
            clearable
          ></el-input>
        </el-form-item>
        <!-- 机构 -->
        <el-form-item label="机构" prop="org">
          <el-input
            v-model="ruleForm.org"
            placeholder="请输入机构"
            clearable
          ></el-input>
        </el-form-item>
        <!-- 角色 -->
        <el-form-item label="角色" prop="role">
          <el-select v-model="ruleForm.role" placeholder="请选择角色" clearable>
            <el-option label="角色1" value="1"></el-option>
            <el-option label="角色2" value="2"></el-option>
            <el-option label="角色3" value="3"></el-option>
            <el-option label="角色4" value="4"></el-option>
          </el-select>
        </el-form-item>
        <!-- 岗位 -->
        <el-form-item label="岗位" prop="job">
          <el-input
            v-model="ruleForm.job"
            placeholder="请输入岗位"
            clearable
          ></el-input>
        </el-form-item>
        <!-- 电话 -->
        <el-form-item label="电话" prop="phone">
          <el-input
            v-model="ruleForm.phone"
            placeholder="请输入电话"
            clearable
          ></el-input>
        </el-form-item>
        <!-- 柜员编号 -->
        <el-form-item label="柜员编号" prop="tellerNo">
          <el-input
            v-model="ruleForm.tellerNo"
            placeholder="请输入电话"
            clearable
          ></el-input>
        </el-form-item>
        <!--  -->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="性别" prop="gender">
              <el-radio-group v-model="ruleForm.gender">
                <el-radio label="男"></el-radio>
                <el-radio label="女"></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态" prop="status">
              <el-radio-group v-model="ruleForm.status">
                <el-radio label="启用"></el-radio>
                <el-radio label="禁用"></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    <!-- 设置dataworks账号弹窗 -->
    <el-dialog
      width="55%"
      top="25vh"
      title="维护Dataworks"
      :before-close="handleCloseDataWork"
      :visible.sync="dataWorksVisible"
    >
      <el-table
        :data="dataWorksTable"
        ref="dataWorksTable"
        @selection-change="handleDataWorksChange"
      >
        <el-table-column type="selection" width="45"> </el-table-column>
        <el-table-column
          prop="dataworksAccount"
          label="dataworks账号"
        ></el-table-column>
        <el-table-column prop="crtDate" label="账号创建时间">
          <template scope="scope">
            {{ transTime(scope.row.crtDate) }}
          </template>
        </el-table-column>
      </el-table>
      <div class="dataWorkPagination">
        <el-pagination
          @current-change="handleDataWorksTable"
          :current-page="dataWorksInfo.page"
          :page-size="dataWorksInfo.size"
          :total="dataWorksInfo.total"
          v-if="dataWorksInfo.total !== 0"
          layout="total, prev, pager, next, jumper"
        >
        </el-pagination>
      </div>

      <div slot="footer" align="center" class="dialog-footer">
        <el-button @click="dataWorksVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitUpdateDateWorks"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "userManager",
  components: {},
  data() {
    return {
      currentUserId: "", // 当前选择用户
      dataWorksVisible: false,
      currentSelectDataWorks: [],
      dataWorksInfo: {
        page: 1,
        size: 10,
        total: 0,
      },
      dataWorksTable: [],
      // 筛选项
      name: "",
      date: "",
      dateValue: "",
      enabled: "",
      userType: "",
      // 树状图
      filterText: "",
      treeData: [],
      nodeId: "",
      // 表格
      tableData: [],
      propList: [],
      defaultProps: {
        id: "id",
        children: "children",
        label: "name",
      },
      // 分页
      pageSize: 10,
      total: 10,
      currentPage: 1,
      // 详情弹窗
      detailsVisible: false,
      ruleForm: {
        num: "123",
        name: "123",
        org: "123",
        role: "1",
        job: "123",
        phone: "123456789",
        tellerNo: "12131231223",
        gender: "男",
        status: "启用",
      },
      rules: {
        num: [{ required: true, message: "请输入编号", trigger: "blur" }],
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
      },
    };
  },
  watch: {
    // 节点过滤
    filterText(val) {
      this.$refs.tree.filter(val);
    },
    //
    date(val) {
      if (val) {
        let startTime = this.$formatDate(val[0]);
        let endTime = this.$formatDate(val[1]);
        this.dateValue = [startTime, endTime];
        console.log(this.dateValue);
      } else {
        this.dateValue = [];
      }
    },
  },
  mounted() {},
  computed: {},
  created() {
    this.propList = [
      {
        prop: "username",
        label: "用户名",
        width: 70,
      },
      {
        prop: "userNo",
        label: "用户编号",
        align: "center",
      },
      {
        prop: "nickName",
        label: "姓名",
      },
      {
        prop: "sex",
        width: 50,
        label: "性别",
      },
      {
        prop: "phone",
        label: "电话",
      },
      {
        prop: "email",
        label: "邮箱",
      },
      {
        prop: "deptName",
        label: "机构",
      },
      {
        prop: "roleName",
        label: "角色",
      },
      // {
      //   prop: "jobName",
      //   label: "岗位",
      // },
      {
        width: 120,
        prop: "dataworksAccount",
        label: "Dataworks账号",
      },
    ];
    this.$api.getSysDeptList({}).then((res) => {
      this.treeData = res.content;
    });
    this.queryList();
  },
  methods: {
    transTime(datetime) {
      let date = new Date(datetime); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      let Y = date.getFullYear();
      let M =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      return Y + "-" + M + "-" + d;
    },
    // 提交修改
    submitUpdateDateWorks() {
      if (
          this.currentSelectDataWorks.length==0||
          (!this.currentSelectDataWorks[0] &&
              !this.currentSelectDataWorks[0].dataworksAccount)
      ) {
        this.$message.error("请先选择Dataworks账号");
        return;
      }
      let request = {
        dataworksAccount: this.currentSelectDataWorks[0].dataworksAccount || "",
        id: this.currentUserId,
      };
      this.$api.updateDataworks(request).then((res) => {
        if (res.code == 0) {
          this.$message.success("修改成功");
          this.dataWorksVisible = false;
          this.queryList();
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    handleDataWorksChange(val) {
      if (val.length > 1) {
        this.$refs.dataWorksTable.clearSelection(); //清除
        this.$refs.dataWorksTable.toggleRowSelection(val.pop()); //pop：最后一个
      } else {
        this.currentSelectDataWorks = val; //multipleSelection：当前选择的数组
      }
    },
    handleCloseDataWork() {
      this.currentSelectDataWorks = [];
      this.dataWorksInfo = {
        page: 1,
        size: 10,
        total: 0,
      };
      this.dataWorksVisible = false;
    },
    handleDataWorksTable(num) {
      this.$set(this.dataWorksInfo, "page", num);
      this.getDataWorksTable();
    },
    getDataWorksTable() {
      const { currentUserDataWorks, ...request } = this.dataWorksInfo;
      this.$api.getDataWorksList(request).then((res) => {
        this.dataWorksTable = res.data.records;
        this.$set(this.dataWorksInfo, "total", res.data.total);
        selectDefaultDataWorks.call(this);
      });
      function selectDefaultDataWorks() {
        console.log(currentUserDataWorks);
        this.dataWorksTable.forEach((row) => {
          if (row.dataworksAccount === currentUserDataWorks) {
            this.$nextTick(() => {
              this.$refs.dataWorksTable.toggleRowSelection(row, true);
            });
          }
        });
      }
    },
    // 重置
    reset() {
      this.name = "";
      this.date = "";
      this.enabled = "";
      this.userType = "";
    },
    // 树状图过滤
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value.toString()) !== -1;
    },
    // 树状图节点点击
    handleNodeClick(node, data) {
      this.currentPage = 1;
      this.nodeId = node.id;
      this.queryList();
    },
    // 搜索按钮
    searchList() {
      this.currentPage = 1;
      this.nodeId = "";
      this.queryList();
    },
    // 维护账号
    defendAccount(row) {
      this.$set(
        this.dataWorksInfo,
        "currentUserDataWorks",
        row.dataworksAccount
      );
      this.currentUserId = row.id;
      this.dataWorksVisible = true;
      this.getDataWorksTable();
    },
    // 列表查询
    queryList() {
      let request = {
        deptId: this.nodeId,
        keyWord: this.name,
        crtDate: this.dateValue,
        enabled: this.enabled,
        userType: this.userType,
        size: this.pageSize,
        page: this.currentPage,
      };
      this.$api.qryUserListPage(request).then((res) => {
        this.tableData = res.data.records;
        this.total = res.data.total;
      });
    },
    // 复选框
    handleSelectionChange(val) {},
    // 懒加载
    load(tree, treeNode, resolve) {
      setTimeout(() => {
        resolve([
          {
            id: 31,
            name: "菜单1",
            sort: 10,
            router: "/xxx",
            auth: "xxxx",
            component: "组件1",
            links: "www.baidu.com",
            cache: "否",
            visibility: "fou",
            date: "2016-05-02",
          },
          {
            id: 32,
            name: "菜单1",
            sort: 10,
            router: "/xxx",
            auth: "xxxx",
            component: "组件1",
            links: "www.baidu.com",
            cache: "否",
            visibility: "fou",
            date: "2016-05-02",
          },
        ]);
      }, 1000);
    },
    // 详情
    viewDetails(row) {
      this.detailsVisible = true;
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
.user {
  width: 100%;
  height: 92%;
  .conditions {
    display: flex;
    .el-input {
      width: 180px;
      margin-right: 8px;
    }
    .el-select,
    .el-cascader,
    .el-date-editor {
      margin-right: 8px;
    }
    .el-button {
      margin-left: 8px;
    }
  }
  // content
  .content {
    display: flex;
    padding-top: 20px;
    height: calc(100% - 32px);
    box-sizing: border-box;
    .tree {
      width: 300px;
      height: 100%;
      overflow-x: scroll;
      .el-input {
        margin-bottom: 4px;
      }
      .el-tree {
        height: calc(100% - 45px);
        padding-top: 8px;
        overflow: auto;
        .el-tree-node {
          .el-tree-node__children {
            overflow: visible !important;
          }
        }
      }
    }
    .right {
      flex: 1;
      padding-left: 16px;
      .table {
        max-width: 95%;
        height: calc(100% - 70px);
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
    }
  }
  // 详情弹窗
  ::v-deep .el-dialog__wrapper.detailsDia {
    .el-dialog {
      border-radius: 8px;
      .el-dialog__body {
        padding: 10px 20px;
        .el-form {
          width: 70%;
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
}
/deep/ .el-table__header-wrapper .el-checkbox {
  display: none;
}
.dataWorkPagination {
  text-align: right;
  padding-top: 20px;
}
</style>
