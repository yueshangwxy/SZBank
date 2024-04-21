<template>
  <div class="auth">
    <div class="left">
      <!-- 筛选条件 -->
      <div class="conditions">
        <el-input
          v-model="name"
          placeholder="请输入角色名称"
          clearable
        ></el-input>
        <el-button type="primary" @click="initList()">搜索</el-button>
      </div>
      <!-- 表格 -->
      <div class="table">
        <el-table
          ref="singleTable"
          :data="tableData"
          row-key="id"
          highlight-current-row
          @current-change="handleRowChange"
        >
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
              <span v-else-if="item.type === 'icon'">
                <i :class="scope.row[item.prop]" style="font-size: 16px"></i>
              </span>
              <span v-else>{{ scope.row[item.prop] }}</span>
            </template>
          </el-table-column>
        </el-table>
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
    <div class="right">
      <el-button type="primary" class="saveBtn" @click="saveMenu()"
        >保存</el-button
      >
      <div class="tree">
        <el-tree
          class="filter-tree"
          node-key="id"
          :data="treeData"
          :props="defaultProps"
          show-checkbox
          accordion
          @node-click="handleNodeClick"
          @check-change="handleCheckChange"
          ref="tree"
        >
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span v-if="data.icon" :class="data.icon"></span>
            <span> {{ node.label }} </span>
          </span>
        </el-tree>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "authManager",
  components: {},
  data() {
    return {
      name: "",
      date: "",
      // 表格
      tableData: [],
      propList: [],
      // 分页
      pageSize: 10,
      total: 10,
      currentPage: 1,
      // 当前选中
      currentRow: null,
      // 树状图
      treeData: [],
      defaultProps: {
        id: "id",
        children: "children",
        label: "name",
      },
    };
  },
  watch: {},
  created() {},
  mounted() {},
  computed: {},
  created() {
    this.propList = [
      {
        prop: "name",
        label: "角色名称",
        align: "center",
      },
      {
        prop: "remark",
        label: "描述",
        align: "center",
      },
    ];
    this.initList();
  },
  methods: {
    // 重置
    reset() {
      this.name = "";
      this.date = "";
    },
    // 从第一页开始查询
    initList() {
      this.currentPage = 1;
      this.queryList();
    },
    // 列表查询
    queryList() {
      // name(输入名称或者描述搜索) crtDate(时间控制) size(分页条数)  page(页码)
      let request = {
        name: this.name,
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
    // 设置当前选中行为哪行
    setCurrent(row) {
      this.$refs.singleTable.setCurrentRow(row);
    },
    // 当前选中改变 --- 显示菜单树
    handleRowChange(val) {
      this.currentRow = val;
      this.$api
        .showRolesMenu({
          id: val.id,
        })
        .then((res) => {
          console.log(res);
          if (res.data) {
            this.handleDisplay(res.data);
          }
        });
    },
    // 处理tree回显
    handleDisplay(val) {
      // 先显示出树，才能获取到所有节点
      val.length > 0 ? (this.treeData = val) : (this.treeData = []);
      // 已勾选id - 调用递归方法进行处理
      let checkedKeyArray = [];
      val ? this.getCheckedId(val, checkedKeyArray) : "";
      this.$nextTick(() => {
        checkedKeyArray.forEach((item) => {
          if (this.$refs.tree) {
            // 选中树，获取到树的节点，如果存在isSelect，则设置回显
            let node = this.$refs.tree.getNode(item);
            if (node.data.isSelect == 1) {
              this.$refs.tree.setChecked(node, true);
            }
          }
        });
      });
    },
    // 递归处理 - 所有层级中选中的菜单id
    getCheckedId(val, checkedKeyArray) {
      val.forEach((item) => {
        if (item.isSelect == 1) {
          checkedKeyArray.push(item.id);
        }
        if (item.children && item.children.length > 0) {
          this.getCheckedId(item.children, checkedKeyArray);
        }
      });
    },
    //  分页
    handleCurrentChange(val) {
      this.currentPage = val;
      this.queryList();
    },
    // 节点点击
    handleNodeClick(node, data) {
      console.log(node);
    },
    // 复选框选中
    handleCheckChange(data, checked, indeterminate) {
      console.log(data, checked, indeterminate);
    },
    // 获取选中的节点
    getCheckedNodes() {
      let selectedNode = this.$refs.tree.getCheckedNodes(false, true);
      let menuIds = [];
      selectedNode.forEach((item) => {
        menuIds.push(item.id);
      });
      return menuIds;
    },
    // 保存菜单
    saveMenu() {
      let request = {
        roleId: this.currentRow.id,
        menuIds: this.getCheckedNodes(),
      };
      this.$api.saveRoleMenu(request).then((res) => {
        if (res.code == 0 || res.code == 200) {
          this.$message.success(res.msg);
          this.queryList();
        } else {
          this.$message.error(res.msg);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
ul,
li {
  list-style: none;
}
.auth {
  height: 95%;
  display: flex;
  justify-content: space-between;
  .left {
    width: 49%;
  }
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
      height: 85%;
      margin-top: 24px;
      padding-left: 4px;
      overflow: auto;
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
    // position: absolute;
    // bottom: 20px;
    // right: 40px;
    height: 64px;
    display: flex;
    align-items: center;
    // flex-direction: row-reverse;
    .el-pagination {
      margin: 0;
    }
  }
  // 右侧
  .right {
    width: 49%;
    height: 90%;
    // overflow-y: scroll;
    .tree {
      width: 100%;
      height: 80%;
      margin-top: 8px;
      // overflow-y: scroll;
      ::v-deep .el-tree {
        width: 100%;
        height: 95%;
        overflow: auto;
        .el-tree-node {
          .el-tree-node__children {
            // overflow: visible !important;
          }
        }
      }
    }
  }
}
</style>
