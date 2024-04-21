<template>
  <div class="detailsView">
    <div class="contain">
      <div class="titleInfo">
        统一数据门户流程审批详情
        <i class="el-icon-close" @click="returnLastPage()"></i>
      </div>
      <div class="basicinfo">
        <div class="title">
          <i></i>
          <span>基本信息</span>
        </div>
        <div class="content">
          <div class="name">
            <el-tag type="success">表</el-tag>
            <span>{{ basicinfo.tableComment }}</span>
          </div>
          <div class="details">
            <div class="left">
              <p>
                <span class="label">中文名:</span>
                <span>{{ basicinfo.tableComment}}</span>
              </p>
              <p>
                <span class="label">英文名:</span>
                <span>{{ basicinfo.tableName}}</span>
              </p>
              <p>
                <span class="label">所属用户:</span>
                <span>{{ basicinfo.owner }}</span>
              </p>
              <p>
                <span class="label">租户编码:</span>
                <span>{{ basicinfo.tenantCode }}</span>
              </p>
              <p>
                <span class="label">存储项目名称:</span>
                <span>{{ basicinfo.project }}</span>
              </p>
              <p>
                <span class="label">底层存储类型:</span>
                <span>{{ basicinfo.driverType }}</span>
              </p>
              <p>
                <span class="label">项目描述类型:</span>
                <span>{{ basicinfo.tableComment }}</span>
              </p>
              <p>
                <span class="label">业务属主部门:</span>
                <span>{{ basicinfo.deptName }}</span>
              </p>
              <p>
                <span class="label">创建时间:</span>
                <span>{{ basicinfo.myCrtTime }}</span>
              </p>
              <p>
                <span class="label">更新时间:</span>
                <span>{{ basicinfo.myUpdTime }}</span>
              </p>
              <p>
                <span class="label">是否公开:</span>
                <span>{{ transOnline(basicinfo.online) }}</span>
              </p>
            </div>
            <div class="right">
              <p v-if="cataValue.length < 1">
                <span class="label">目录：无</span>
              </p>
              <p v-for="(item, index) in cataValue" :key="index">
                <span class="label">目录{{ index + 1 }}:</span>
                <el-cascader
                  v-model="item.id"
                  :options="catalogueList"
                  :props="{
                    value: 'contentsId',
                    label: 'name',
                    children: 'children',
                    checkStrictly: true,
                  }"
                  :show-all-levels="false"
                  clearable
                  disabled
                ></el-cascader>
                <span class="label">目录路径{{ index + 1 }}:</span>
                <el-cascader
                  class="cascaderAll"
                  v-model="item.id"
                  :options="catalogueList"
                  :props="{
                    value: 'contentsId',
                    label: 'name',
                    children: 'children',
                  }"
                  disabled
                  placeholder=""
                ></el-cascader>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="fieldinfo">
        <div class="title">
          <i></i>
          <span>字段信息</span>
        </div>
        <!-- 表格 -->
        <el-table :data="dataList" max-height="220px">
          <el-table-column
            v-for="(item, index) in propList"
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
      </div>
      <div class="approvalInfo">
        <div class="title">
          <i></i>
          <span>审批意见</span>
        </div>
        <!-- 审批意见表格 -->
        <el-table :data="commentData" max-height="220px">
          <el-table-column label="序号" type="index" width="50">
          </el-table-column>
          <el-table-column
            v-for="(item, index) in commentProp"
            :prop="item.prop"
            :label="item.label"
            :align="item.align"
            :key="index"
            :min-width="item.width"
            show-overflow-tooltip
          >
            <template scope="scope">
              <span v-if="item.type === 'tag'">
                <el-tag :type="item.tagType(scope.row)" size="mini">
                  {{ item.render(scope.row) }}
                </el-tag>
              </span>
              <span v-else>{{ scope.row[item.prop] }}</span>
            </template>
          </el-table-column>
        </el-table>
        <!-- 审批意见 -->
        <el-form
          :model="ruleForm"
          :rules="rules"
          class="demo-ruleForm"
          ref="ruleForm"
          v-if="todo"
        >
          <!-- 审批意见 -->
          <el-form-item label="审批意见" prop="apprComment">
            <el-input
              v-model="ruleForm.apprComment"
              placeholder="请输入审批意见"
              type="textarea"
              rows="4"
              resize="none"
              maxlength="1000"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item class="approveBtn">
            <el-button @click="reject('ruleForm')">拒绝</el-button>
            <el-button type="primary" @click="pass('ruleForm')">通过</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!-- 代码注释掉elementUI样式会丢失 -->
    <theme-select
      id="theme"
      class="right-menu-item hover-effect">
    </theme-select>
  </div>
</template>

<script>
import ThemeSelect from "@portal/components/ThemeSelect";
export default {
  components: {
    ThemeSelect,
  },
  data() {
    return {
      // basicinfo
      basicinfo: {
        tableName: "",
        chineseName: "",
        owner: "",
        tenantCode: "",
        project: "",
        driverType: "",
        myCrtTime: "",
        myUpdTime: "",
        online: "是",
        catalogue1: "",
        catalogue2: "",
        catalogue1Name: "",
        catalogue2Name: "",
      },
      basicInfoProp: [
        {
          prop: "chineseName",
          label: "中文名",
          align: "center",
        },
        {
          prop: "owner",
          label: "所属用户",
          align: "center",
        },
        {
          prop: "tenantCode",
          label: "租户编码",
          align: "center",
        },
        {
          prop: "project",
          label: "存储项目名称",
          align: "center",
        },
        {
          prop: "driverType",
          label: "底层存储类型",
          align: "center",
        },
        {
          prop: "myCrtTime",
          label: "创建时间",
          align: "center",
        },
        {
          prop: "myUpdTime",
          label: "更新时间",
          align: "center",
        },
        {
          prop: "online",
          label: "是否公开",
          align: "center",
        },
      ],
      basicInfoList: [],
      dataList: [],
      propList: [],
      detailsView: true,
      id: "",
      assetsState: "",
      // 目录树
      catalogueList: [],
      cataValue: [],
      ruleForm: {
        apprComment: "",
      },
      rules: {
        apprComment: [
          { required: true, message: "请输入审批意见", trigger: "blur" },
        ],
      },
      taskId: '',
      processFlag: true,
      // 审批表格
      commentData: [],
      commentProp: [],
      // todo
      todo: false,
    };
  },
  mounted() {
    this.initData()
  },
  methods: {
    // 关闭当前页
    returnLastPage() {
      this.$router.back()
    },
    initData() {
      // 目录树
      this.$api.getAllCatalogueList({}).then((res) => {
        this.catalogueList = res.data;
      });
      // 数据
      this.id = this.$route.query.id; // 通过路由传递id
      this.taskId = this.$route.query.taskId
      this.$api
        .getTableByIdToProcessApprove({
          taskId: this.taskId,
        })
        .then((res) => {
          console.log(res,2333);
          this.basicInfoList = [];
          this.cataValue = [];
          let data = res.data;
          this.todo = data.todo === 'true' ? true : false
          this.basicinfo = data.main_form;
          this.basicInfoList.push(this.basicinfo);
          // 表格数据
          this.dataList = data.sub_forms;
          // 审批表格数据
          this.commentData = data.opinion
          // 发布状态
          this.assetsState = this.basicinfo.assetsState;
          // 返回的目录  -- 渲染
          let temp = this.basicinfo.catalogues;

          for (let key in temp) {
            key = key.split("/");
            this.cataValue.push({ id: key });
          }
          console.log(this.cataValue);
        });
      this.propList = [
        {
          prop: "columnName",
          label: "字段名称",
          align: "center",
        },
        {
          prop: "columnMessage",
          label: "字段信息",
          align: "center",
        },
        {
          prop: "type",
          label: "字段类型",
          align: "center",
        },
        {
          prop: "length",
          label: "字段长度",
          align: "center",
        },
        {
          prop: "isNull",
          label: "是否可以为空",
          align: "center",
        },
      ];
      this.commentProp = [
        {
          prop: "state",
          label: "办理环节",
          type: "tag",
          align: "center",
          tagType: (row) => {
            return row.state == 1
              ? "info"
              : "warning";
          },
          render: (row) => {
            return row.state == 1
              ? "已办"
              : "待办";
          },
        },
        {
          prop: "user_name",
          label: "办理人",
          align: "center",
        },
        {
          prop: "message",
          label: "办理意见",
        },
        {
          prop: "duration",
          label: "办理时效(工作日)",
          align: "center",
        },
        {
          prop: "end_time",
          label: "更新时间",
        },
      ]
    },
    transOnline(online) {
      if (online === 1) {
        return "是";
      } else if (online === 0) {
        return "否";
      } else {
        return "";
      }
    },
    // 审批  -- 通过
    pass(formName) {
      console.log("通过", this.taskId);
      this.$refs[formName].validate((valid) => {
        if (valid && this.processFlag) {
          this.processFlag = false;
          this.$api
            .completeTask({
              taskId: this.taskId,
              submitType: "0",
              assignee: "",
              apprComment: this.ruleForm.apprComment,
            })
            .then((res) => {
              if (res.code == 0 || res.code == 200) {
                this.$message.success(res.msg);
                this.returnLastPage()
              } else {
                this.$message.error(res.msg);
              }
              this.processFlag = true;
            });
        } else {
          return false;
        }
      });
    },
    // 审批  -- 拒绝
    reject(formName) {
      console.log("拒绝", this.taskId);
      this.$refs[formName].validate((valid) => {
        if (valid && this.processFlag) {
          this.processFlag = false;
          this.$api
            .completeTask({
              taskId: this.taskId,
              submitType: "1",
              assignee: "",
              apprComment: this.ruleForm.apprComment,
            })
            .then((res) => {
              if (res.code == 0 || res.code == 200) {
                this.$message.success(res.msg);
                this.returnLastPage()
              } else {
                this.$message.error(res.msg);
              }
              this.processFlag = true;
            });
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.detailsView {
  height: 100vh;
  padding: 32px 10%;
  // background: #fff;
  border-radius: 8px;
  box-sizing: border-box;
  .contain {
    height: 100%;
    // 标题
    .titleInfo {
      text-align: center;
      color: #79ac43;
      font-size: 20px;
      position: relative;
      i {
        position: absolute;
        right: 0;
        font-size: 24px;
        color: #79ac43;
        cursor: pointer;
      }
    }
    .title {
        font-size: 16px;
        color: #79ac43;
        line-height: 22px;
        display: flex;
        align-items: center;

        i {
            width: 12px;
            height: 12px;
            border-radius: 2px;
            background: #79ac43;
            margin-right: 8px;
        }
    }

    // 基本信息
    .basicinfo {
        .content {
            margin-top: 8px;
            padding: 16px;
            background: #fafafa;
            background: #fff;
            border-radius: 8px;
            .name {
                font-size: 16px;
                color: #202224;

                .el-tag {
                    margin-right: 8px;
                }

                .el-tag--light {
                    border: 1px solid #259dc2;
                    background-color: #daedf2;
                    color: #259dc2;
                    margin-right: 4px;
                }

                .el-tag--warning {
                    border: 1px solid #d69c15;
                    background-color: #f2ebda;
                    color: #d69c15;
                    margin-right: 4px;
                }

                .el-tag--success {
                    border: 1px solid #79ac43;
                    background-color: #f2f7ec;
                    border-color: #e4eed9;
                    color: #79ac43;
                }
            }

            .details {
                display: flex;
                font-size: 14px;
                color: #4d4e50;
                margin-top: 16px;
                justify-content: space-between;

                .left {
                    width: 40%;

                    p {
                        width: 100%;
                        margin: 0 0 8px 0;
                        display: flex;

                        span {
                            flex: 1;
                            line-height: 20px;
                        }

                        .el-textarea {
                            flex: 1;
                            font-size: 14px;
                        }

                        ::v-deep .el-textarea.is-disabled {
                            .el-textarea__inner {
                                padding: 0;
                                background: transparent;
                                border: none;
                                color: #4d4e50;
                            }
                        }

                        ::v-deep .el-input,
                        .el-select {
                            font-size: 14px;
                            flex: 1;
                            line-height: 20px;
                            height: 20px;

                            .el-input__inner {
                                height: 20px;
                                line-height: 20px;
                            }
                        }

                        ::v-deep .el-input.is-disabled {
                            .el-input__icon {
                                display: none;
                            }

                            .el-input__inner {
                                background: transparent;
                                border: none;
                                color: #4d4e50;
                                padding: 0;
                            }
                        }

                        .label {
                            flex: 0.3;
                            line-height: 20px;
                        }
                    }
                }

                .right {
                    width: 55%;

                    p {
                        margin: 0 0 8px 0;
                        display: flex;
                        align-items: center;

                        span {
                            line-height: 20px;
                        }

                        ::v-deep .el-input {
                            width: 23%;
                            // flex: 1;
                            line-height: 20px;
                            height: 20px;
                            margin-right: 1%;
                            font-size: 14px;

                            .el-input__inner {
                                width: 100%;
                                height: 20px;
                                line-height: 20px;
                            }
                        }

                        ::v-deep .el-input.is-disabled {
                            .el-input__icon {
                                display: none;
                            }

                            .el-input__inner {
                                background: transparent;
                                border: none;
                                color: #4d4e50;
                                padding: 0;
                            }
                        }

                        ::v-deep .el-cascader {
                            width: 20%;

                            .el-input {
                                width: 100%;

                                .el-input__suffix {
                                    display: flex;
                                    align-items: center;
                                }
                            }
                        }

                        ::v-deep .el-cascader.cascaderAll {
                            width: 50%;
                        }

                        .label {
                            width: 15%;
                        }

                        .desc {
                            width: 25%;
                        }
                    }
                }
            }
        }
    }

    // 字段信息
    .fieldinfo {
        margin-top: 16px;
    }
    .el-table::before {
            display: none;

        }

        ::v-deep .el-table {
            margin-top: 16px;
            border: 1px solid #e8e8e8;

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
    // 审批意见
    .approvalInfo {
      margin-top: 16px;
      .demo-ruleForm {
        margin-top: 8px;
        padding-bottom: 24px;
        .approveBtn {
          text-align: center;
        }
      }
    }
    .btn {
        margin-top: 16px;

        .el-button {
            margin-left: 8px;
            background: #79ac43;
            color: #fff;
            border: none;
            border-radius: 4px;
        }
    }
}
}
</style>