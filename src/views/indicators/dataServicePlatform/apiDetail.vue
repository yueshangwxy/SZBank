<template>
  <div class="applyForApi">
    <div class="contain">
      <div class="info">
        <div class="title">
          <i></i>
          <span>{{ title }}</span>
        </div>
        <div class="content">
          <!-- API名称 -->
          <div class="item">
            <span>API名称</span>
            <el-input
              v-model="ruleForm.name"
              placeholder="请输入名称"
              disabled
            ></el-input>
          </div>
          <!-- 描述 -->
          <div class="item">
            <span>描述</span>
            <el-input
              type="textarea"
              rows="4"
              resize="none"
              v-model="ruleForm.description"
              placeholder="请输入描述"
              disabled
            ></el-input>
          </div>
          <!--  -->
          <div class="itemSpecial">
            <p>
              <span>超时(s)</span>
              <el-input
                v-model="ruleForm.overtime"
                placeholder="请输入描述"
                disabled
              ></el-input>
            </p>
            <p>
              <span>限流(次/秒)</span>
              <el-input
                v-model="ruleForm.currentLimit"
                placeholder="请输入描述"
                disabled
              ></el-input>
            </p>
            <p>
              <span>接口类型</span>
              <el-select
                v-model="ruleForm.type"
                placeholder="请选择接口类型"
                disabled
              >
                <el-option label="API接口" value="1"></el-option>
                <el-option label="文件接口" value="2"></el-option>
              </el-select>
            </p>
          </div>
          <div class="itemSpecial">
            <p>
              <span>所属部门</span>
              <el-cascader
                v-model="ruleForm.dept"
                :options="deptTree"
                :show-all-levels="false"
                :props="{
                  value: 'id',
                  label: 'name',
                  children: 'sysDeptList',
                  emitPath: false,
                }"
                placeholder="请选择所属部门"
                clearable
                disabled
              ></el-cascader>
            </p>
            <p>
              <span>对接人</span>
              <el-input
                v-model="ruleForm.dockName"
                placeholder="请输入对接人"
                disabled
              ></el-input>
            </p>
            <p>
              <span>接口状态</span>
              <el-select
                v-model="ruleForm.status"
                placeholder="请选择接口状态"
                disabled
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
            </p>
          </div>
          <div class="item">
            <span>测试地址</span>
            <el-input
              v-model="ruleForm.sitPath"
              placeholder="请输入测试地址"
              disabled
            ></el-input>
          </div>
          <div class="item">
            <span>生产地址</span>
            <el-input
              v-model="ruleForm.prePath"
              placeholder="请输入生产地址"
              disabled
            ></el-input>
          </div>
          <div class="itemSpecial">
            <p>
              <span>归属应用</span>
              <el-select
                v-model="ruleForm.belongApplicationName"
                placeholder="请选择归属应用"
                disabled
              >
                <el-option
                  v-for="item in appList"
                  :key="item.appCode"
                  :label="item.appName"
                  :value="item.appCode"
                ></el-option>
              </el-select>
            </p>
            <p class="itemSpec">
              <span>可访问应用</span>
              <el-select
                v-model="ruleForm.applicationInfoList"
                multiple
                placeholder="请选择可访问应用"
                disabled
              >
                <el-option
                  v-for="item in appList"
                  :key="item.appCode"
                  :label="item.appName"
                  :value="item.appCode"
                ></el-option>
              </el-select>
            </p>
          </div>
          <!-- 入参 -->
          <div class="item">
            <span>入参</span>
            <div
              class="reqParams"
              v-for="(item, index) in reqParams"
              :key="index"
            >
              <el-input
                class="params"
                v-model="item.name"
                placeholder="参数名称"
                disabled
              ></el-input>
              <el-select
                class="params"
                v-model="item.type"
                placeholder="参数类型"
                disabled
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
              <el-select
                class="params"
                v-model="item.isPass"
                placeholder="必传"
                disabled
              >
                <el-option label="非必传" value="0"></el-option>
                <el-option label="必传" value="1"></el-option>
              </el-select>
              <el-input
                class="params"
                v-if="item.isPass == 1"
                v-model="item.defaultValue"
                placeholder="默认值"
                disabled
              ></el-input>
              <el-input
                class="params"
                v-model="item.description"
                placeholder="参数说明"
                disabled
              ></el-input>
            </div>
          </div>
          <!-- 出参 -->
          <div class="item">
            <span>出参</span>
            <div
              class="reqParams"
              v-for="(item, index) in resParams"
              :key="index"
            >
              <el-input
                class="params"
                v-model="item.name"
                placeholder="参数名称"
                disabled
              ></el-input>
              <el-select
                class="params"
                v-model="item.type"
                placeholder="参数类型"
                disabled
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
              <el-select
                class="params"
                v-model="item.isPass"
                placeholder="必传"
                disabled
              >
                <el-option label="非必传" value="0"></el-option>
                <el-option label="必传" value="1"></el-option>
              </el-select>
              <el-input
                class="params"
                v-if="item.isPass == 1"
                v-model="item.defaultValue"
                placeholder="默认值"
                disabled
              ></el-input>
              <el-input
                class="params"
                v-model="item.description"
                placeholder="参数说明"
                disabled
              ></el-input>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "API详情",
      reqParams: [
        {
          name: "",
          type: "",
          parameterType: "1",
          description: "",
          defaultValue: "",
          isPass: "",
        },
      ],
      resParams: [
        {
          name: "",
          type: "",
          parameterType: "2",
          description: "",
          defaultValue: "",
          isPass: "",
        },
      ],
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
            parameterType: "", // 1入参 2出参
            description: "",
            defaultValue: "",
            isPass: "",
          },
        ],
        applicationInfoList: [],
      },
      // 应用列表
      appList: [],
      // 部门树
      deptTree: [],
    };
  },
  mounted() {
    this.initData()
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
  //     if (e.name === "apiDetail") {
  //       this.initData();
  //     }
  //   }
  // },
  methods: {
    initData() {
      this.$api.qryOpenApp({}).then((res) => {
        this.appList = res.data;
      });
      this.$api.findDeptTree({}).then((res) => {
        this.deptTree = res.data;
      });
      this.id = this.$route.query.id ? this.$route.query.id : "";
      this.$api
        .viewServiceDetail({
          id: this.id,
        })
        .then((res) => {
          this.ruleForm = res.data;
          this.reqParams = this.ruleForm.serviceParamList.filter((item) => {
            return item.parameterType === "1";
          });
          this.resParams = this.ruleForm.serviceParamList.filter((item) => {
            return item.parameterType === "2";
          });
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
        .item {
          display: flex;
          flex-direction: column;
          margin-bottom: 16px;
          span {
            line-height: 20px;
            margin-bottom: 8px;
          }
          .reqParams {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 8px;
            .params {
              width: 100%;
              margin-right: 1%;
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
          .itemSpec {
            width: 65%;
          }
        }
      }
    }
    ::v-deep .el-input.is-disabled {
      background: #fff;
      border: none;
      .el-input__inner {
        background: #fff;
        border: none;
      }
    }
    ::v-deep .el-tag.el-tag--info {
      background-color: #ffffff;
      border-color: #e9e9e9;
      color: #c5c9d0;
    }
    ::v-deep .el-textarea.is-disabled {
      background: #fff;
      border: none;
      .el-textarea__inner {
        background: #fff;
        border: none;
      }
    }
  }
}
</style>