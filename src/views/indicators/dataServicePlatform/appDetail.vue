<template>
  <div class="applyForApp">
    <div class="contain">
      <div class="info">
        <div class="title">
          <i></i>
          <span>{{ title }}</span>
        </div>
        <div class="content">
          <div class="item">
            <span>应用名称</span>
            <el-input
              v-model="object.appName"
              placeholder="请输入名称"
              disabled
            ></el-input>
          </div>
          <div class="item">
            <span>应用code</span>
            <el-input
              v-model="object.appCode"
              placeholder="请输入应用code"
              disabled
            ></el-input>
          </div>
          <div class="item">
            <span>描述</span>
            <el-input
              v-model="object.description"
              type="textarea"
              rows="4"
              resize="none"
              placeholder="请输入描述"
              disabled
            ></el-input>
          </div>
          <div class="itemSpecial">
            <p>
              <span>appkey</span>
              <el-input
                v-model="object.appKey"
                placeholder="请输入appkey"
                disabled
              ></el-input>
            </p>
            <p>
              <span>appSecret</span>
              <el-input
                v-model="object.appSecret"
                placeholder="请输入appSecret"
                disabled
              ></el-input>
            </p>
            <p>
              <span>状态</span>
              <el-select
                v-model="object.status"
                placeholder="请选择状态"
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "应用详情",
      object: {
        appName: "",
        appCode: "",
        description: "",
        status: "",
        appKey: "",
        appSecret: "",
      },
      appCode: "",
    };
  },
  mounted() {
    this.initData()
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
  //     if (e.name === "appDetail") {
  //       this.initData();
  //     }
  //   }
  // },
  methods: {
    initData() {
      this.appCode = this.$route.query.appCode ? this.$route.query.appCode : "";
      this.$api
        .viewAppDetail({
          appCode: this.appCode,
        })
        .then((res) => {
          console.log(res, "yyyy");
          this.object = res.data;
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