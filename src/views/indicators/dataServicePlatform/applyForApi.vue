<template>
  <div class="applyForApi">
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
            <!-- API名称 -->
            <el-form-item label="API名称" prop="name">
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
            <!--  -->
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="超时(s)" prop="overtime">
                  <el-input
                    v-model="ruleForm.overtime"
                    placeholder="请输入超时"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="限流(次/秒)" prop="currentLimit">
                  <el-input
                    v-model="ruleForm.currentLimit"
                    placeholder="请输入限流"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="接口类型" prop="type">
                  <el-select
                    v-model="ruleForm.type"
                    placeholder="请选择接口类型"
                    clearable
                  >
                    <el-option
                      label="get/post类型"
                      value="get/post"
                    ></el-option>
                    <el-option label="get类型" value="get"></el-option>
                    <el-option label="post类型" value="post"></el-option>
                    <el-option label="delete类型" value="delete"></el-option>
                    <el-option label="put类型" value="put"></el-option>
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
            <el-form-item label="测试地址" prop="sitPath" v-if="editPage">
              <el-input
                v-model="ruleForm.sitPath"
                placeholder="请输入测试地址"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item label="生产地址" prop="prePath" v-if="editPage">
              <el-input
                v-model="ruleForm.prePath"
                placeholder="请输入生产地址"
                clearable
              ></el-input>
            </el-form-item>
            <el-row :gutter="20" v-if="editPage">
              <el-col :span="8">
                <el-form-item label="归属应用" prop="belongApplicationName">
                  <el-select
                    v-model="ruleForm.belongApplicationName"
                    placeholder="请选择归属应用"
                    clearable
                    @change="selectBelongApplication"
                  >
                    <el-option
                      v-for="item in appList"
                      :key="item.appCode"
                      :label="item.appName"
                      :value="item.appName"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="16">
                <el-form-item label="可访问应用" prop="applicationInfoList">
                  <el-select
                    v-model="ruleForm.applicationInfoList"
                    multiple
                    placeholder="请选择可访问应用"
                    clearable
                  >
                    <el-option
                      v-for="item in appList"
                      :key="item.appCode"
                      :label="item.appName"
                      :value="item.appCode"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- 入参 -->
            <el-form-item label="入参" class="must">
              <div
                class="reqParams"
                v-for="(item, index) in ruleForm.serviceParamList"
                :key="index"
              >
                <template v-if="item.parameterType === '1'">
                  <el-form-item
                    :prop="`serviceParamList.${index}.name`"
                    :rules="rules.paramsName"
                  >
                    <el-input
                      v-model="item.name"
                      placeholder="参数名称"
                      clearable
                    ></el-input>
                  </el-form-item>
                  <el-form-item
                    :prop="`serviceParamList.${index}.type`"
                    :rules="rules.paramsType"
                  >
                    <el-select
                      v-model="item.type"
                      placeholder="参数类型"
                      clearable
                    >
                      <el-option label="int" value="int"></el-option>
                      <el-option label="double" value="double"></el-option>
                      <el-option label="float" value="float"></el-option>
                      <el-option label="long" value="long"></el-option>
                      <el-option label="char" value="char"></el-option>
                      <el-option label="String" value="String"></el-option>
                      <el-option label="Date" value="Date"></el-option>
                      <el-option label="List" value="List"></el-option>
                      <el-option label="Map" value="Map"></el-option>
                      <el-option label="Set" value="Set"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item
                    :prop="`serviceParamList.${index}.isPass`"
                    :rules="rules.paramsIsPass"
                  >
                    <el-select
                      v-model="item.isPass"
                      placeholder="必传"
                      clearable
                    >
                      <el-option label="非必传" value="0"></el-option>
                      <el-option label="必传" value="1"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item
                    :prop="`serviceParamList.${index}.defaultValue`"
                    v-if="item.isPass == 1"
                    :rules="rules.paramsDefault"
                  >
                    <el-input
                      v-if="item.isPass == 1"
                      v-model="item.defaultValue"
                      placeholder="默认值"
                      clearable
                    ></el-input>
                  </el-form-item>
                  <el-form-item
                    :prop="`serviceParamList.${index}.description`"
                    :rules="rules.paramsDesc"
                  >
                    <el-input
                      v-model="item.description"
                      placeholder="参数说明"
                      clearable
                    ></el-input>
                  </el-form-item>
                  <el-button
                    icon="el-icon-close"
                    :disabled="index === 0"
                    @click="delReqParams(index)"
                  ></el-button>
                </template>
              </div>
              <div class="addParams" @click="addReqParams()">
                <i class="el-icon-plus"></i>
                <span>添加参数</span>
              </div>
            </el-form-item>
            <!-- 出参 -->
            <el-form-item label="出参" class="must">
              <div
                class="reqParams"
                v-for="(item, index) in ruleForm.serviceParamList"
                :key="index"
              >
                <template v-if="item.parameterType === '2'">
                  <el-form-item
                    :prop="`serviceParamList.${index}.name`"
                    :rules="rules.paramsName"
                  >
                    <el-input
                      v-model="item.name"
                      placeholder="参数名称"
                      clearable
                    ></el-input>
                  </el-form-item>
                  <el-form-item
                    :prop="`serviceParamList.${index}.type`"
                    :rules="rules.paramsType"
                  >
                    <el-select
                      v-model="item.type"
                      placeholder="参数类型"
                      clearable
                    >
                      <el-option label="int" value="int"></el-option>
                      <el-option label="double" value="double"></el-option>
                      <el-option label="float" value="float"></el-option>
                      <el-option label="long" value="long"></el-option>
                      <el-option label="char" value="char"></el-option>
                      <el-option label="String" value="String"></el-option>
                      <el-option label="Date" value="Date"></el-option>
                      <el-option label="List" value="List"></el-option>
                      <el-option label="Map" value="Map"></el-option>
                      <el-option label="Set" value="Set"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item
                    :prop="`serviceParamList.${index}.isPass`"
                    :rules="rules.paramsIsPass"
                  >
                    <el-select
                      v-model="item.isPass"
                      placeholder="必传"
                      clearable
                    >
                      <el-option label="非必传" value="0"></el-option>
                      <el-option label="必传" value="1"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item
                    :prop="`serviceParamList.${index}.defaultValue`"
                    v-if="item.isPass == 1"
                    :rules="rules.paramsDefault"
                  >
                    <el-input
                      v-if="item.isPass == 1"
                      v-model="item.defaultValue"
                      placeholder="默认值"
                      clearable
                    ></el-input>
                  </el-form-item>
                  <el-form-item
                    :prop="`serviceParamList.${index}.description`"
                    :rules="rules.paramsDesc"
                  >
                    <el-input
                      v-model="item.description"
                      placeholder="参数说明"
                      clearable
                    ></el-input>
                  </el-form-item>
                  <el-button
                    icon="el-icon-close"
                    :disabled="index === 0"
                    @click="delReqParams(index)"
                  ></el-button>
                </template>
              </div>
              <div class="addParams" @click="addResParams()">
                <i class="el-icon-plus"></i>
                <span>添加参数</span>
              </div>
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
      title: "API申请",
      editPage: false,
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
        serviceType: "1",
        status: "",
        dept: "",
        belongUser: "",
        dockName: "",
        fieldList: "",
        belongApplication: "",
        belongApplicationName: "",
        sitPath: "",
        prePath: "",
        serviceParamList: [
          {
            name: "",
            type: "",
            parameterType: "1", // 1入参 2出参
            description: "",
            defaultValue: "",
            isPass: "",
          },
          {
            name: "",
            type: "",
            parameterType: "2", // 1入参 2出参
            description: "",
            defaultValue: "",
            isPass: "",
          },
        ],
        applicationInfoList: [],
      },
      labelPosition: "top",
      rules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        description: [
          { required: true, message: "请输入描述", trigger: "blur" },
        ],
        overtime: [{ required: true, message: "请输入超时", trigger: "blur" }],
        currentLimit: [
          { required: true, message: "请输入限流", trigger: "blur" },
        ],
        type: [
          { required: true, message: "请选择接口类型", trigger: "change" },
        ],
        dept: [
          { required: true, message: "请选择所属部门", trigger: "change" },
        ],
        dockName: [
          { required: true, message: "请输入对接人", trigger: "change" },
        ],
        status: [
          { required: true, message: "请选择接口状态", trigger: "change" },
        ],
        sitPath: [
          { required: true, message: "请输入测试地址", trigger: "blur" },
        ],
        prePath: [
          { required: true, message: "请输入生产地址", trigger: "blur" },
        ],
        belongApplicationName: [
          { required: true, message: "请选择归属应用", trigger: "change" },
        ],
        applicationInfoList: [
          { required: true, message: "请选择可访问应用", trigger: "change" },
        ],
        applicationInfoList: [
          { required: true, message: "请选择可访问应用", trigger: "change" },
        ],
        paramsName: [
          { required: true, message: "请输入参数名称", trigger: "blur" },
        ],
        paramsType: [
          { required: true, message: "请选择参数类型", trigger: "change" },
        ],
        paramsIsPass: [
          { required: true, message: "请选择参数是否必传", trigger: "change" },
        ],
        paramsDefault: [
          { required: true, message: "请输入默认值", trigger: "blur" },
        ],
        paramsDesc: [
          { required: true, message: "请输入参数说明", trigger: "blur" },
        ],
      },
      // 应用列表
      appList: [],
      // 部门树
      deptTree: [],
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
  //     if (e.name === "applyForApi") {
  //       this.initData();
  //     }
  //   }
  // },
  methods: {
    initData() {
      this.editPage = this.$route.name === "editApi" ? true : false;
      if (this.editPage) {
        this.title = this.$route.meta.title;
      }
      this.$api.findDeptTree({}).then((res) => {
        this.deptTree = res.data;
      });
      this.$api.qryOpenApp({}).then((res) => {
        this.appList = res.data;
      });
      this.id = this.$route.query.id ? this.$route.query.id : "";
      if (this.$route.name === "editApi") {
        this.$api
          .viewServiceDetail({
            id: this.id,
          })
          .then((res) => {
            this.ruleForm = res.data;
          });
      }
    },
    selectBelongApplication(name) {
      let app = this.appList.filter((item) => {
        return item.appName === name;
      });
      this.$set(this.ruleForm, "belongApplication", app[0].appCode);
    },
    slectBelongUser(user) {
      if (user && user.username) {
        this.$set(this.ruleForm, "dockName", user.nickName);
        this.$set(this.ruleForm, "belongUser", user.username);
      }
      this.showSelectUser = !this.showSelectUser;
    },
    // 添加入参
    addReqParams() {
      this.ruleForm.serviceParamList.push({
        name: "",
        type: "",
        parameterType: "1",
        description: "",
        defaultValue: "",
        isPass: "",
      });
    },
    // 删除入参
    delReqParams(index) {
      this.ruleForm.serviceParamList.splice(index, 1);
    },
    // 添加出参
    addResParams() {
      this.ruleForm.serviceParamList.push({
        name: "",
        type: "",
        parameterType: "2",
        description: "",
        defaultValue: "",
        isPass: "",
      });
    },
    // 删除出参
    delResParams(index) {
      this.ruleForm.serviceParamList.splice(index, 1);
    },
    // 取消
    cancel() {
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
.applyForApi {
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
        // 表单
        ::v-deep .el-form {
          .el-form-item.must {
            .el-form-item__label::before {
              content: "*";
              color: #ff4949;
              margin-right: 4px;
            }
          }
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
            .reqParams {
              display: flex;
              justify-content: space-between;
              align-items: center;
              .el-form-item {
                width: 100%;
                margin: 0;
                margin-right: 1%;
                margin-bottom: 16px;
              }
              .el-button {
                width: 20px;
                height: 20px;
                border-radius: 4px;
                padding: 4px;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-right: 1%;
                margin-bottom: 16px;
              }
            }
            .addParams {
              width: 100%;
              height: 30px;
              border: 1px dashed #ccc;
              margin-top: 8px;
              display: flex;
              justify-content: center;
              align-items: center;
              cursor: pointer;
              span {
                margin: 0 0 0 8px;
              }
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