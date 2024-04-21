<template>
  <el-dialog
    title="选择用户"
    :visible.sync="dialogVisible"
    width="80%"
    :show-close="false"
    :before-close="handleClose"
  >
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
            ref="multipleTable"
            height="95%"
            :data="tableData"
            row-key="id"
            lazy
            :load="load"
            :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
            @selection-change="handleSelectionChange"
            @select="selectChange"
            @row-click="handleRowClick"
            @select-all="selectAll"
          >
            <el-table-column type="selection" width="55"> </el-table-column>
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
                  <!-- <i :class="item.iconTrans(scope.row)" style="font-size:16px"></i> -->
                  <i :class="scope.row[item.prop]" style="font-size: 16px"></i>
                </span>
                <span v-else>{{ scope.row[item.prop] }}</span>
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
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancelButton">取 消</el-button>
      <el-button type="primary" @click="submitButton">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: true,
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
      handleSelectionList: [],
    };
  },
  watch: {
    // 节点过滤
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },
  methods: {
    handleClose() {},
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
    handleSelectionChange(value) {
      this.handleSelectionList = value;
    },
    selectChange(selection, row) {
      if (selection.length > 1) {
        const del_row = selection.shift();
        this.$refs.multipleTable.toggleRowSelection(del_row, false);
      }
    },
    // 点击行触发，选中或不选中复选框
    handleRowClick(row, column, event) {
      this.$refs.multipleTable.toggleRowSelection(row);
      this.selectChange(this.handleSelectionList);
    },
    selectAll(selection) {
      if (selection.length > 1) {
        selection.length = 1;
      }
    },
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
    //  分页
    handleCurrentChange(val) {
      this.currentPage = val;
      this.queryList();
    },
    cancelButton() {
      this.$emit("slectBelongUser", "");
    },
    submitButton() {
      let userinfo =
        this.handleSelectionList && this.handleSelectionList.length == 1
          ? this.handleSelectionList[0]
          : "";
      this.$emit("slectBelongUser", userinfo);
    },
  },
  created() {
    this.propList = [
      {
        prop: "username",
        label: "用户名",
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
        label: "性别",
      },
    ];
    this.$api.getSysDeptList({}).then((res) => {
      this.treeData = res.content;
    });
    this.queryList();
  },
};
</script>


<style lang="scss" scoped>
.content {
  display: flex;
  padding-top: 20px;
  height: 400px;
  box-sizing: border-box;
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
    // .pagination {
    //   position: absolute;
    //   bottom: 20px;
    //   right: 40px;
    //   height: 64px;
    //   display: flex;
    //   align-items: center;
    //   flex-direction: row-reverse;
    //   .el-pagination {
    //     margin: 0;
    //   }
    // }
  }
}
</style>