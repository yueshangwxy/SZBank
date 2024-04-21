<template>
  <div class="applyForDoc">
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
            <!-- 文件名称 -->
            <el-form-item label="文件名称" prop="name">
              <el-input
                v-model="ruleForm.name"
                placeholder="请输入名称"
                maxlength="100"
                show-word-limit
                clearable
              ></el-input>
            </el-form-item>
            <!-- 描述 -->
            <el-form-item label="描述" prop="description">
              <el-input
                type="textarea"
                rows="4"
                resize="none"
                v-model="ruleForm.description"
                placeholder="请输入描述"
                maxlength="1000"
                show-word-limit
                clearable
              ></el-input>
            </el-form-item>
            <!-- 目标地址 -->
            <el-form-item label="目标地址" prop="destinationAddress">
              <el-input
                v-model="ruleForm.destinationAddress"
                placeholder="请输入目标地址  例:ip/目录"
                clearable
              ></el-input>
            </el-form-item>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item
                  label="文件最晚生成时间"
                  prop="latestGenerationTime"
                >
                  <el-time-picker
                    v-model="ruleForm.latestGenerationTime"
                    format="HH:mm:ss"
                    value-format="HH:mm:ss"
                    :picker-options="{
                      selectableRange: '00:00:00 - 23:59:59',
                    }"
                    placeholder="请选择时间"
                  >
                  </el-time-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="分隔符" prop="separator">
                  <el-input
                    v-model="ruleForm.separator"
                    placeholder="请输入分隔符"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="格式" prop="fileFormat">
                  <el-select
                    v-model="ruleForm.fileFormat"
                    placeholder="请选择格式"
                    clearable
                  >
                    <el-option label="txt" value="txt"></el-option>
                    <el-option label="csv" value="csv"></el-option>
                    <el-option label="excel" value="excel"></el-option>
                    <el-option label="dat" value="dat"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20" v-if="editPage">
              <el-col :span="8">
                <el-form-item label="所属部门" prop="dept">
                  <el-cascader
                    v-model="ruleForm.dept"
                    :options="deptTree"
                    :show-all-levels="false"
                    :props="{
                      value: 'id',
                      label: 'name',
                      children: 'sysDeptList',
                      emitPath: false,
                      checkStrictly: true,
                    }"
                    placeholder="请选择所属部门"
                    clearable
                  ></el-cascader>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="对接人" prop="dockName">
                  <el-input
                    v-model="ruleForm.dockName"
                    @focus="slectBelongUser"
                    placeholder="请输入对接人"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="接口状态" prop="status">
                  <el-select
                    v-model="ruleForm.status"
                    placeholder="请选择接口状态"
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
            <el-form-item label="字段清单" prop="fieldList" v-if="editPage">
              <el-input
                type="textarea"
                rows="4"
                resize="none"
                v-model="ruleForm.fieldList"
                placeholder="请输入字段清单"
                clearable
              ></el-input>
            </el-form-item>
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

    <selectUser v-if="showSelectUser" @slectBelongUser="slectBelongUser" />
  </div>
</template>

<script>
import selectUser from "./selectUser.vue";
export default {
  components: { selectUser },
  data() {
    return {
      title: "文件申请",
      editPage: true,
      showSelectUser: false,
      id: "",
      ruleForm: {
        name: "",
        description: "",
        overtime: "",
        currentLimit: "",
        type: "",
        destinationAddress: "",
        latestGenerationTime: "",
        separator: "",
        fileFormat: "",
        serviceType: "2",
        status: "",
        dept: "",
        dockName: "",
        belongUser: "",
        fieldList: "",
        belongApplication: "",
        belongApplicationName: "",
        sitPath: "",
        prePath: "",
        serviceParamList: [
          {
            name: "",
            type: "",
            parameterType: "", // 1入参 2出参
            description: "",
            defaultValue: "",
            isPass: "",
          },
        ],
        applicationInfoList: [],
      },
      // 部门树
      deptTree: [],
      // 表单
      labelPosition: "top",
      rules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        description: [
          { required: true, message: "请输入描述", trigger: "blur" },
        ],
        destinationAddress: [
          { required: true, message: "请输入目标地址", trigger: "blur" },
        ],
        latestGenerationTime: [
          { required: true, message: "请选择时间", trigger: "change" },
        ],
        separator: [
          { required: true, message: "请输入分隔符", trigger: "blur" },
        ],
        fileFormat: [
          { required: true, message: "请选择格式", trigger: "change" },
        ],
        status: [
          { required: true, message: "请选择接口状态", trigger: "change" },
        ],
      },
    };
  },
  mounted() {
    this.initData();
  },
  // beforeRouteLeave(to, from, next) {
  //   if (to.name === "myService") {
  //     this.$store.commit("SET_KEEPALIVE", true);
  //   } else {
  //     this.$store.commit("SET_KEEPALIVE", false);
  //   }
  //   next();
  // },
  // watch: {
  //   $route(e) {
  //     if (e.name === "applyForDoc") {
  //       this.initData();
  //     }
  //   },
  // },
  methods: {
    initData() {
      this.editPage = this.$route.name === "editDoc" ? true : false;
      if (this.editPage) {
        this.title = this.$route.meta.title;
      }
      this.$api.findDeptTree({}).then((res) => {
        this.deptTree = res.data;
      });
      if (this.$route.name === "editDoc") {
        this.id = this.$route.query.id ? this.$route.query.id : "";
        this.$api
          .viewServiceDetail({
            id: this.id,
          })
          .then((res) => {
            this.ruleForm = res.data;
          });
      }
    },
    slectBelongUser(user) {
      if (user && user.username) {
        this.$set(this.ruleForm, "dockName", user.nickName);
        this.$set(this.ruleForm, "belongUser", user.username);
      }
      this.showSelectUser = !this.showSelectUser;
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
          path: "/dataServicePlatform/myService",
        });
      });
    },
    // 提交申请
    submitApplication() {
      console.log("提交申请", this.ruleForm);
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$api.applyForService(this.ruleForm).then((res) => {
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
      console.log("确定修改", this.ruleForm);
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$api.serviceUpdate(this.ruleForm).then((res) => {
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
.applyForDoc {
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
        // .item {
        //     display: flex;
        //     flex-direction: column;
        //     margin-bottom: 16px;
        //     span {
        //         line-height: 20px;
        //         margin-bottom: 8px;
        //     }
        // }
        // .itemSpecial {
        //     display: flex;
        //     justify-content: space-between;
        //     p {
        //         width: 30%;
        //         display: flex;
        //         flex-direction: column;
        //         justify-content: space-between;
        //         .el-date-editor {
        //             width: 100%;
        //         }
        //         span {
        //             line-height: 20px;
        //             margin-bottom: 8px;
        //         }
        //     }
        // }
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
      margin-top: 70px;
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