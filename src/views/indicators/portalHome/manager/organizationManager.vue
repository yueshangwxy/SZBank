<template>
  <div class="organization">
    <!-- 筛选条件 -->
    <div class="conditions">
      <el-input v-model="name" placeholder="机构名称搜索" clearable></el-input>
<!--      <el-date-picker-->
<!--        v-model="date"-->
<!--        type="daterange"-->
<!--        range-separator="至"-->
<!--        start-placeholder="开始日期"-->
<!--        end-placeholder="结束日期"-->
<!--      >-->
<!--      </el-date-picker>-->
      <!-- <el-select v-model="enabled" placeholder="启用" clearable> 
                <el-option label="禁用" value="0"></el-option>
                <el-option label="启用" value="1"></el-option>
            </el-select> -->
      <el-button type="primary" @click="queryList()">搜索</el-button>
    </div>
    <!-- 表格 -->
    <div class="table">
      <el-table
        :data="tableData"
        row-key="code"
        lazy
        :load="load"
        :tree-props="{ hasChildren: 'hasChildren' }"
        @selection-change="handleSelectionChange"
      >
<!--        <el-table-column type="selection" width="55"> </el-table-column>-->
        <el-table-column
          v-for="(item, index) in propList"
          :key="index"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :align="item.align"
        >
          <template slot-scope="scope">
            <!-- 需要前端转译字段 -->
            <span v-if="item.type === 'transType'">
              {{ transType(scope.row[item.prop]) }}
            </span>
            <!-- tag标签 -->
            <span v-else-if="item.type === 'tag'">
              <el-tag :type="item.tagType(scope.row)" size="mini">
                {{ item.render(scope.row) }}
              </el-tag>
            </span>
            <!-- switch开关 -->
            <span v-else-if="item.type === 'switch'">
              <el-switch
                :value="item.trans(scope.row)"
                inactive-color="#ff4949"
              >
              </el-switch>
            </span>
            <span v-else-if="item.prop === 'enabled'">
              {{ getNameByEnabled(scope.row[item.prop]) }}
            </span>
            <span v-else>{{ scope.row[item.prop] }}</span>


<!--            <span v-else>{{ getNameByEnabled(scope.row[item.enabled])}}</span>-->
          </template>
        </el-table-column>
        <!-- <el-table-column
                    label="操作"
                    width="150">
                    <template slot-scope="scope">
                        <el-button type="text" @click="viewDetails(scope.row)">详情</el-button>
                        <el-button type="text" @click="settings(scope.row)">配置</el-button>
                    </template>
                </el-table-column> -->
      </el-table>
    </div>
    <!-- 分页 -->
    <!-- <div class="pagination">
            <el-pagination
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-size="pageSize"
                layout="total, prev, pager, next, jumper"
                :total="total"
                v-if="total !==0">
            </el-pagination>
        </div> -->
    <!-- 详情弹窗 -->
    <el-dialog
      class="viewDetails"
      title="查看机构"
      :visible.sync="detailsVisible"
      width="800px"
      top="25vh"
    >
      <el-form
        :model="detailsForm"
        :rules="detailsRules"
        label-width="120px"
        class="demo-detailsForm"
        ref="detailsForm"
        disabled
      >
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="管理机构ID" prop="id">
              <el-input
                v-model="detailsForm.id"
                placeholder="管理机构ID"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="管理机构名称" prop="name">
              <el-input
                v-model="detailsForm.name"
                placeholder="管理机构名称"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="机构类别" prop="deptCategory">
              <el-select
                v-model="detailsForm.deptCategory"
                placeholder="机构类别"
                clearable
              >
                <el-option label="公司" value="0"></el-option>
                <el-option label="部门" value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="管理机构编码" prop="code">
              <el-input
                v-model="detailsForm.code"
                placeholder="管理机构编码"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="状态" prop="enabled">
              <el-radio-group v-model="detailsForm.enabled">
                <el-radio label="1">启用</el-radio>
                <el-radio label="0">禁用</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="上级部门" prop="pName">
              <el-input
                v-model="detailsForm.pName"
                placeholder="上级部门"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="级别" prop="deptLevel">
              <el-select
                v-model="detailsForm.deptLevel"
                placeholder="级别"
                clearable
              >
                <el-option label="级别1" value="1"></el-option>
                <el-option label="级别2" value="2"></el-option>
                <el-option label="级别3" value="3"></el-option>
                <el-option label="级别4" value="4"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="12">
                        <el-form-item label="账务机构编号" prop="xxxx">
                            <el-input v-model="detailsForm.xxxx"
                            placeholder="账务机构编号"
                            clearable></el-input>
                        </el-form-item>
                    </el-col> -->
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="类型" prop="type">
              <!-- <el-input v-model="detailsForm.type"
                                placeholder="类型"
                                clearable></el-input> -->
              <el-select
                v-model="detailsForm.type"
                placeholder="类型"
                clearable
              >
                <el-option label="一般机构" value="0"></el-option>
                <el-option label="支撑机构" value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="机构简拼" prop="sdepart">
              <el-input
                v-model="detailsForm.sdepart"
                placeholder="机构简拼"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="机构级别" prop="grade">
              <el-select
                v-model="detailsForm.grade"
                placeholder="机构级别"
                clearable
              >
                <el-option label="机构级别1" value="1"></el-option>
                <el-option label="机构级别2" value="2"></el-option>
                <el-option label="机构级别3" value="3"></el-option>
                <el-option label="机构级别4" value="4"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="上层业务机构ID" prop="buSid">
              <el-input
                v-model="detailsForm.buSid"
                placeholder="上层业务机构ID"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="联系人" prop="supchg">
              <el-input
                v-model="detailsForm.supchg"
                placeholder="联系人"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话" prop="tel">
              <el-input
                v-model="detailsForm.tel"
                placeholder="联系电话"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    <!-- 配置弹窗 -->
    <el-dialog
      class="settingsDia"
      title="配置"
      :visible.sync="settingsVisible"
      width="600px"
      top="25vh"
    >
      <el-form
        :model="settingsForm"
        :rules="settingsRules"
        label-width="120px"
        ref="settingsForm"
      >
        <!-- 机构名称 -->
        <el-form-item label="机构名称" prop="name">
          <el-input
            v-model="settingsForm.name"
            placeholder="机构名称"
            clearable
          ></el-input>
        </el-form-item>
        <!-- 首页看板路径 -->
        <el-form-item label="首页看板路径" prop="path">
          <el-input
            v-model="settingsForm.path"
            type="textarea"
            rows="3"
            placeholder="首页看板路径"
            clearable
          ></el-input>
        </el-form-item>
        <!-- 指标审批人员 -->
        <el-form-item label="指标审批人员" prop="approver">
          <el-select
            v-model="detailsForm.approver"
            placeholder="指标审批人员"
            clearable
          >
            <el-option label="指标审批人员1" value="1"></el-option>
            <el-option label="指标审批人员2" value="2"></el-option>
            <el-option label="指标审批人员3" value="3"></el-option>
            <el-option label="指标审批人员4" value="4"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="settingsVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmSettings()">确 认</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "organizationManager",
  components: {},
  data() {
    return {
      name: "",
      date: "",
      dateValue: [],
      enabled: "",
      // 表格
      tableData: [],
      propList: [],
      // 分页
      pageSize: 10,
      total: 10,
      currentPage: 1,
      // 详情弹窗
      detailsVisible: false,
      detailsForm: {
        id: "",
        name: "",
        deptCategory: "",
        code: "",
        enabled: "",
        pName: "",
        deptLevel: "",
        // xxxx: '',
        type: "",
        sdepart: "",
        grade: "",
        buSid: "",
        supchg: "",
        tel: "",
      },
      detailsRules: {
        id: [{ required: true, message: "请输入管理机构ID", trigger: "blur" }],
        name: [
          { required: true, message: "请输入管理机构名称", trigger: "blur" },
        ],
      },
      // 配置
      settingsVisible: false,
      settingsForm: {
        name: "",
        path: "",
        approver: "",
      },
      settingsRules: {
        name: [{ required: true, message: "请输入机构名称", trigger: "blur" }],
      },
    };
  },
  watch: {
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
        prop: "id",
        label: "管理机构ID",
      },
      {
        prop: "code",
        label: "管理机构编号",
        align: "center",
      },
      {
        prop: "name",
        label: "管理机构名称",
      },
      {
        prop: "deptCategory",
        type: "transType",
        label: "机构类别",
      },
      {
        prop: "orgLevel",
        label: "机构层级",
      },
      {
        prop: "createTime",
        label: "创建日期",
      },
      {
        prop: "enabled",
        label: "是否启用",
      },
    ];
    this.queryList();
  },
  methods: {
    //翻译是否启动
    getNameByEnabled(val){
      if(val){
        return "是";
      }else{
        return "否";
      }
    },
    // 重置
    reset() {
      this.name = "";
      this.date = "";
      this.enabled = "";
    },
    // 列表查询
    queryList() {
      // name	部门名称	N	按照部门名称搜索
      // crtDate	时间控制	N
      // enabled	状态	N	默认都是1 启用
      // pid	上级id	Y	当点击层级结构下拉框需要传入pid,不点击默认是根节点
      let request = {
        name: this.name,
        crtDate: this.dateValue,
        enabled: this.enabled,
        pid: "",
      };
      this.$api.qryOrgListPage(request).then((res) => {
        this.tableData = res.data;
      });
    },
    // 复选框选中
    handleSelectionChange(val) {
      console.log(val);
    },
    // 懒加载
    load(tree, treeNode, resolve) {
      let request = {
        name: this.name,
        crtDate: this.dateValue,
        enabled: this.enabled,
        pid: tree.id,
      };
      this.$api.qryOrgListPage(request).then((res) => {
        setTimeout(() => {
          resolve(res.data);
        }, 1000);
      });
    },
    // 详情
    viewDetails(row) {
      this.detailsForm = {};
      this.detailsVisible = true;
      this.$api
        .getDeptById({
          id: row.id,
        })
        .then((res) => {
          this.detailsForm = res.data;
        });
    },
    // 配置
    settings(row) {
      this.settingsVisible = true;
    },
    confirmSettings() {
      this.settingsVisible = false;
    },
    transType(prop) {
      return prop == 0 ? "公司" : prop == 1 ? "部门" : "";
    },
    //  分页
    handleCurrentChange(val) {
      console.log(val);
    },
  },
};
</script>

<style lang="scss" scoped>
ul,
li {
  list-style: none;
}
.organization {
  height: 95%;
  // 筛选条件
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
  // 表格
  .table {
    margin-top: 16px;
    height: calc(100% - 125px);
    .el-table::before {
      background-color: #fff;
      height: 0;
    }
    ::v-deep .el-table {
      height: 96%;
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
  // 详情
  ::v-deep .el-dialog__wrapper.viewDetails {
    .el-dialog {
      border-radius: 8px;
      .el-dialog__body {
        padding: 20px 20px;
        .el-form {
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
  // 设置
  ::v-deep .el-dialog__wrapper.settingsDia {
    .el-dialog {
      border-radius: 8px;
      .el-dialog__body {
        padding: 10px 20px;
        .el-form {
          width: 90%;
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
</style>
