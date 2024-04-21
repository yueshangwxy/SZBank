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
          <div class="details">
            <div class="left">
              <p>
                <span class="label">表或视名(包含项目):</span>
                <span>{{ basicinfo.tableName}}</span>
              </p>
              <p>
                <span class="label">申请口径:</span>
                <span>{{ basicinfo.sqlText}}</span>
              </p>
              <p>
                <span class="label">申请说明:</span>
                <span>{{ basicinfo.applyDescription }}</span>
              </p>
              <p>
                <span class="label">申请人:</span>
                <span>{{ basicinfo.applyUserName }}</span>
              </p>
              <p>
                <span class="label">申请人部门:</span>
                <span>{{ basicinfo.applyDeptName }}</span>
              </p>
              <p>
                <span class="label">申请时间:</span>
                <span>{{ basicinfo.ApplyTimeShow }}</span>
              </p>
              <p>
                <span class="label">申请状态:</span>
                <span>{{ basicinfo.applyStatus }}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="approvalInfo">
        <div class="title">
          <i></i>
          <span>审批意见</span>
        </div>
        <!-- 审批意见 -->
        <el-form
          :model="ruleForm"
          :rules="rules"
          class="demo-ruleForm"
          ref="ruleForm"
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
            <el-button @click="labReject('ruleForm')">拒绝</el-button>
            <el-button type="primary" @click="labPass('ruleForm')">通过</el-button>
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
        sqlText: "",
        applyDescription: "",
        applyUserName: "",
        applyDeptName: "",
        ApplyTimeShow: "",
        applyStatus: ""
      },
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

      // 数据
      this.taskId = this.$route.query.taskId
      this.$api
        .getLabDetailById({
          id: this.taskId,
        })
        .then((res) => {
          this.basicinfo = res.data;
        });
    },
    // 实验室审批  -- 通过
    labPass(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$api
                  .labCompleteTask({
                    taskId: this.taskId,
                    applyState: "03",
                    approvalOpinion: this.ruleForm.apprComment,
                  })
                  .then((res) => {
                    if (res.code == 0 || res.code == 200) {
                      this.$message.success(res.msg);
                      this.returnLastPage()
                    } else {
                      this.$message.error(res.msg);
                    }
                  });
        } else {
          return false;
        }
      });
    },
    // 审批  -- 拒绝
    labReject(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$api
                  .labCompleteTask({
                    taskId: this.taskId,
                    applyState: "04",
                    approvalOpinion: this.ruleForm.apprComment,
                  })
                  .then((res) => {
                    if (res.code == 0 || res.code == 200) {
                      this.$message.success(res.msg);
                      this.returnLastPage()
                    } else {
                      this.$message.error(res.msg);
                    }
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
  padding: 32px;
  background: #fff;
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
    }
    // 审批意见
    .approvalInfo {
      margin-top: 16px;
      .demo-ruleForm {
        margin-top: 8px;
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