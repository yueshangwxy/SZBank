<template>
  <div class="applyForApp">
    <div class="contain">
      <div class="info">
        <div class="title">
          <i></i>
          <span>{{ title }}</span>
        </div>
        <div class="content">
          <el-form
            :model="ruleForm"
            :rules="rules"
            :label-position="labelPosition"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <!-- 应用名称 -->
            <el-form-item label="应用名称" prop="appName">
              <el-input
                v-model="ruleForm.appName"
                placeholder="请输入名称"
                maxlength="100"
                show-word-limit
                clearable
              ></el-input>
            </el-form-item>
            <!-- code -->
            <el-form-item label="应用code" prop="appCode">
              <el-input
                v-model="ruleForm.appCode"
                placeholder="请输入应用code"
                maxlength="100"
                show-word-limit
                clearable
              ></el-input>
            </el-form-item>
            <!-- 描述 -->
            <el-form-item label="描述" prop="description">
              <el-input
                v-model="ruleForm.description"
                type="textarea"
                rows="4"
                resize="none"
                placeholder="请输入描述"
                maxlength="1000"
                show-word-limit
                clearable
              ></el-input>
            </el-form-item>
            <el-row :gutter="20" v-if="editPage">
              <el-col :span="8">
                <el-form-item label="appkey" prop="appKey">
                  <el-input
                    v-model="ruleForm.appKey"
                    placeholder="请输入appkey"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="appSecret" prop="appSecret">
                  <el-input
                    v-model="ruleForm.appSecret"
                    placeholder="请输入appSecret"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="状态" prop="status">
                  <el-select
                    v-model="ruleForm.status"
                    placeholder="请选择状态"
                    clearable
                  >
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
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item class="btn">
              <el-button class="cancelBtn" @click="cancel()">取消</el-button>
              <el-button @click="submitApplication()" v-if="!editPage"
                >提交申请</el-button
              >
              <el-button @click="confirmModify()" v-if="editPage"
                >确定更新</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "应用申请",
      editPage: false,
      labelPosition: "top",
      ruleForm: {
        appName: "",
        appCode: "",
        description: "",
        status: "",
        appKey: "",
        appSecret: "",
      },
      rules: {
        appName: [
          { required: true, message: "请输入应用名称", trigger: "blur" },
        ],
        appCode: [
          { required: true, message: "请输入应用Code", trigger: "blur" },
        ],
        description: [
          { required: true, message: "请输入描述", trigger: "blur" },
        ],
        appKey: [{ required: true, message: "请输入appKey", trigger: "blur" }],
        appSecret: [
          { required: true, message: "请输入appSecret", trigger: "blur" },
        ],
        status: [{ required: true, message: "请选择状态", trigger: "change" }],
      },
      appCode: "",
    };
  },
  mounted() {
    this.initData();
  },
  // beforeRouteLeave(to, from, next) {
  //   if (to.name === "appManagement") {
  //     this.$store.commit("SET_KEEPALIVE", true);
  //   } else {
  //     this.$store.commit("SET_KEEPALIVE", false);
  //   }
  //   next();
  // },
  // watch: {
  //   $route(e) {
  //     if (e.name === "applyForApp") {
  //       this.initData();
  //     }
  //   },
  // },
  methods: {
    initData() {
      this.editPage = this.$route.name === "editApp" ? true : false;
      if (this.editPage) {
        this.title = this.$route.meta.title;
      }
      this.appCode = this.$route.query.appCode ? this.$route.query.appCode : "";
      console.log(this.$route);
      if (this.$route.name === "editApp") {
        this.$api
          .viewAppDetail({
            appCode: this.appCode,
          })
          .then((res) => {
            console.log(res, "yyyy");
            this.ruleForm = res.data;
          });
      }
    },
    // 取消
    cancel() {
      console.log("取消");
      let currentView = this.$store.state.tagsView.visitedViews[0];
      for (currentView of this.$store.state.tagsView.visitedViews) {
        if (currentView.path === this.$route.path) {
          break;
        }
      }
      this.$store.dispatch("tagsView/delView", currentView).then(() => {
        this.$router.push({
          path: "/dataServicePlatform/appManagement",
        });
      });
    },
    // 提交申请
    submitApplication() {
      console.log("提交申请");
      console.log(this.ruleForm);
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$api.applyForApp(this.ruleForm).then((res) => {
            if (res.code == 0 || res.code == 200) {
              this.$message.success(res.msg);
              this.cancel();
            } else {
              this.$message.error(res.msg);
            }
          });
        } else {
          return false;
        }
      });
    },
    // 确认更新
    confirmModify() {
      console.log("确定修改");
      console.log(this.ruleForm);
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$api.updateApp(this.ruleForm).then((res) => {
            if (res.code == 0 || res.code == 200) {
              this.$message.success(res.msg);
              this.cancel();
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
.applyForApp {
  height: calc(100vh - 145px);
  padding: 16px;
  margin: 16px;
  background: #fff;
  border-radius: 8px;
  .contain {
    height: 100%;
    overflow: auto;
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
    .info {
      .content {
        margin-top: 8px;
        padding: 16px;
        background: #fafafa;
        font-size: 14px;
        color: #202224;
        .item {
          display: flex;
          flex-direction: column;
          margin-bottom: 16px;
          span {
            line-height: 20px;
            margin-bottom: 8px;
          }
        }
        .itemSpecial {
          display: flex;
          justify-content: space-between;
          p {
            width: 30%;
            display: flex;
            flex-direction: column;
            span {
              line-height: 20px;
              margin-bottom: 8px;
            }
          }
        }
        // 表单
        ::v-deep .el-form {
          .el-form-item__label {
            font-weight: 400;
            color: #202224;
          }
          .el-form-item__content {
            .el-input {
              width: 100%;
            }
            .el-select {
              width: 100%;
            }
            .el-date-editor {
              width: 100%;
            }
            .el-cascader {
              width: 100%;
            }
          }
        }
      }
    }
    .btn {
      margin-top: 24px;
      display: flex;
      justify-content: flex-end;
      .el-button {
        width: 86px;
        height: 30px;
        margin-left: 14px;
        background: #79ac43;
        color: #fff;
        border: none;
        border-radius: 4px;
      }
      .cancelBtn {
        background: #fff;
        border: 1px solid #79ac43;
        color: #79ac43;
      }
    }
  }
}
</style>