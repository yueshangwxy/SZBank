<template>
  <el-dialog
    class="addUser"
    :title="title"
    custom-class="addUser"
    :visible.sync="addUserVisible"
    :before-close="closeAddUser"
    width="90%"
    top="2vh"
  >
    <div class="tree">
      <el-input placeholder="输入关键字进行过滤" v-model="filterText" clearable>
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
    <div class="center">
      <div class="conditions">
        <el-input
          v-model="name"
          placeholder="角色名称和描述搜索"
          clearable
        ></el-input>
        <el-button type="primary" @click="initList()">搜索</el-button>
      </div>
      <!-- 表格 -->
      <div class="table" v-if="addUserVisible">
        <el-table
          height="95%"
          ref="multipleTable"
          :data="tableData"
          row-key="id"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            :reserve-selection="true"
            width="55"
          >
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
              <span>{{ scope.row[item.prop] }}</span>
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
    <div class="right">
      <el-tag
        v-for="(tag, index) in dynamicTags"
        :key="tag.id"
        closable
        :disable-transitions="false"
        @close="handleClose(tag.id, index)"
      >
        {{ tag.username }}
      </el-tag>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeAddUser()">取 消</el-button>
      <el-button type="primary" @click="confirmAddUser()">确 认</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: "addUser",
  props: {
    rowId: {
      type: String,
      default: "",
    },
    addUserVisible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // 对话框标题
      title: "当前角色",
      name: "",
      // 树状图
      filterText: "",
      treeData: [],
      defaultProps: {
        id: "id",
        children: "children",
        label: "name",
      },
      // 表格
      tableData: [],
      propList: [],
      // 分页
      pageSize: 10,
      total: 10,
      currentPage: 1,
      // tag标签
      dynamicTags: [],
      // 节点id
      nodeId: "",
      rowSelectLock: false,
    };
  },
  watch: {
    addUserVisible(val) {
      if (val) {
        this.name = "";
        this.filterText = "";
        this.initList();
        this.dynamicTags = [];
        // 查询已有菜单
        this.$api.queryUserByRole({ roleId: this.rowId }).then((res) => {
          this.dynamicTags = res;
          let names = res.map((item) => item.username);
          this.tableData.forEach((row) => {
            if (names.includes(row.username)) {
              this.$nextTick(() => {
                this.rowSelectLock = true;
                this.$refs.multipleTable.toggleRowSelection(row, true);
                this.rowSelectLock = false;
              });
            }
          });
        });
      }
    },
    // 节点过滤
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },
  created() {
    this.$api.getSysDeptList({}).then((res) => {
      this.treeData = res.content;
    });
    this.propList = [
      {
        prop: "username",
        label: "用户名",
      },
      {
        prop: "nickName",
        label: "姓名",
      },
      {
        prop: "email",
        label: "邮箱",
      },
      {
        prop: "deptName",
        label: "部门",
      },
    ];
  },
  methods: {
    // 从第一页开始查询
    initList() {
      this.currentPage = 1;
      this.queryList();
    },
    // 分页
    handleCurrentChange(val) {
      this.currentPage = val;
      this.queryList();
    },
    // 列表查询
    queryList() {
      let request = {
        deptId: this.nodeId,
        keyWord: this.name,
        size: this.pageSize,
        page: this.currentPage,
      };
      this.$api.qryUserListPage(request).then((res) => {
        this.tableData = res.data.records;
        this.total = res.data.total;
        let names = this.dynamicTags.map((item) => item.username);
        res.data.records.forEach((row) => {
          if (names.includes(row.username)) {
            this.$nextTick(() => {
              // this.rowSelectLock = true;
              this.$refs.multipleTable.toggleRowSelection(row, true);
              // this.rowSelectLock = false;
            });
          } else {
            this.$nextTick(() => {
              this.$refs.multipleTable.toggleRowSelection(row, false);
            });
          }
        });
      });
    },
    // 关闭对话框
    closeAddUser() {
      this.$emit("closeAddUser");
    },
    // 确定
    confirmAddUser() {
      let ids = this.dynamicTags.map((item) => item.id);
      this.$api
        .saveUserRoles({
          roleId: this.rowId,
          userIds: ids,
        })
        .then((res) => {
          if (res.code == 200 || res.code == 0) {
            this.$message.success(res.msg);
            this.$emit("confirmAddUser");
          } else {
            this.$message.error(res.msg);
          }
        });
    },
    // 树状图过滤
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value.toString()) !== -1;
    },
    // 树状图节点点击
    handleNodeClick(node, data) {
      console.log(node);
      this.nodeId = node.id;
      this.initList();
    },
    // 复选框
    handleSelectionChange(val) {
      if (this.rowSelectLock) return;
      // 当前页选择的用户
      let currentPageIds = val.map((item) => item.id);
      // 当前页没有选择的用户
      let currentPageNoIds = [];
      this.tableData.forEach((item) => {
        if (currentPageIds.indexOf(item.id) < 0) currentPageNoIds.push(item.id);
      });
      // 当前选择的所有用户
      let allSelectIds = this.dynamicTags.map((item) => item.id);
      val.map((item) => {
        // 添加
        if (allSelectIds.indexOf(item.id) < 0) {
          this.dynamicTags.push(item);
        }
      });
      allSelectIds.forEach((item, key) => {
        if (currentPageNoIds.indexOf(item) > -1) {
          this.$delete(this.dynamicTags, key);
        }
      });
    },
    // tag标签关闭
    handleClose(tagId, index) {
      this.$delete(this.dynamicTags, index);
      this.tableData.forEach((row) => {
        if (tagId === row.id) {
          this.$refs.multipleTable.toggleRowSelection(row, false);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .addUser {
  height: 700px;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  // .el-dialog__header {
  // }
  .el-dialog__body {
    flex: 1;
    padding: 5px 20px;
    display: flex;
    height: 500px;
    justify-content: space-between;
    .tree {
      width: 300px;
      height: 100%;
      .el-input {
        margin-bottom: 4px;
      }
      .el-tree {
        height: calc(100% - 45px);
        padding-top: 8px;
        overflow: auto;
      }
    }
    .center {
      flex: 1;
      margin: 0 1%;
      .conditions {
        .el-input {
          width: 200px;
        }
      }
      .el-table::before {
        display: none;
      }
      .table {
        height: 90%;
        margin-top: 8px;
      }
    }
    .right {
      width: 32%;
      padding: 20px;
      border: 1px solid #e5e5e5;
      .el-tag {
        margin: 4px;
      }
    }
  }
  .el-dialog__footer {
    padding: 20px;
  }
}
</style>
