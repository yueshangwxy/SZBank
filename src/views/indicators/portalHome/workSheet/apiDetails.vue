<template>
  <el-dialog
    class="details"
    :visible.sync="apiDetailVis"
    :before-close="handleClose"
    width="80%"
    top="5vh"
  >
    <div class="detailsView">
      <div class="contain">
        <div class="basicinfo">
          <div class="title">
            <i></i>
            <span>基本信息</span>
          </div>
          <div class="content">
            <div class="name">
              <el-tag>API</el-tag>
              <span>{{ basicinfo.indexName }}</span>
            </div>
            <div class="details">
              <div class="left">
                <p>
                  <span class="label">接口地址:</span>
                  <span>{{ basicinfo.interfaceAds }}</span>
                </p>
                <p>
                  <span class="label">接口描述:</span>
                  <span>{{ basicinfo.apiDescription }}</span>
                </p>
                <p>
                  <span class="label">请求类型:</span>
                  <span>{{ basicinfo.reqType }}</span>
                </p>
                <!-- <p>
                                    <span class="label">返回类型:</span>
                                    <span>{{basicinfo.respType}}</span>
                                </p>
                                <p>
                                    <span class="label">所属用户:</span>
                                    <span>{{basicinfo.owner}}</span>
                                </p> -->
                <p>
                  <span class="label">归属应用:</span>
                  <span>{{ basicinfo.application }}</span>
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
                <!-- <p>
                  <span class="label">是否公开:</span>
                  <span>{{ transOnline(basicinfo.online) }}</span>
                </p> -->
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
                  ></el-cascader>
                </p>
              </div>
            </div>
          </div>
        </div>
        <!-- 字段信息 -->
        <div class="fieldinfo">
          <div class="title">
            <i></i>
            <span>入参信息</span>
          </div>
          <!-- 表格 -->
          <el-table :data="fielddataList" max-height="220px">
            <el-table-column
              v-for="(item, index) in respropList"
              :prop="item.prop"
              :label="item.label"
              :align="item.align"
              :key="index"
              :min-width="item.width"
            >
              <template scope="scope">
                <span v-if="item.prop == 'isPass'">{{
                  scope.row[item.prop] == 0
                    ? "非必传"
                    : scope.row[item.prop] == 1
                    ? "必传"
                    : ""
                }}</span>
                <span v-else>{{ scope.row[item.prop] }}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- 出参信息 -->
        <div class="fieldinfo">
          <div class="title">
            <i></i>
            <span>出参信息</span>
          </div>
          <!-- 表格 -->
          <el-table :data="resdataList" max-height="220px">
            <el-table-column
              v-for="(item, index) in respropList"
              :prop="item.prop"
              :label="item.label"
              :align="item.align"
              :key="index"
              :min-width="item.width"
            >
              <template scope="scope">
                <span v-if="item.prop == 'isPass'">{{
                  scope.row[item.prop] == 0
                    ? "非必传"
                    : scope.row[item.prop] == 1
                    ? "必传"
                    : ""
                }}</span>
                <span v-else>{{ scope.row[item.prop] }}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "apiDetails",
  props: {
    apiId: {
      type: String,
      default: "",
    },
    apiDetailVis: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // basicinfo
      basicinfo: {
        indexName: "/api/test",
        interfaceAds: "/api/test",
        apiDescription: "用于查询XXXXXXXXXXX数据",
        reqType: "get", //reqType
        respType: "JSON", //respType
        owner: "AA",
        application: "ind_test",
        myCrtTime: "2022-01-01", //createTime
        myUpdTime: "2022-04-12", //updateTime
        online: "是",
        catalogue1: "个贷",
        catalogue2: "网贷",
        catalogue1Name: "产品/贷款/个贷",
        catalogue2Name: "产品/贷款/网贷",
      },
      fielddataList: [],
      resdataList: [],
      respropList: [
        {
          prop: "name",
          label: "字段名称",
          align: "center",
        },
        {
          prop: "type",
          label: "字段类型",
          align: "center",
        },
        {
          prop: "isPass",
          label: "是否必传",
          align: "center",
        },
        {
          prop: "description",
          label: "字段描述",
          align: "center",
        },
      ],
      id: "",
      assetsState: "",
      // 目录树
      catalogueList: [],
      cataValue: [],
    };
  },
  watch: {
    apiDetailVis(val) {
      if (val) {
        // 数据
        this.$api
          .getApiById({
            id: this.apiId,
            isRecord: false,
          })
          .then((res) => {
            this.basicinfo = res;
            this.cataValue = [];
            // 发布状态
            this.assetsState = this.basicinfo.assetsState;
            // 返回的目录  -- 渲染
            let temp = this.basicinfo.catalogues;
            this.fielddataList = this.basicinfo.reqParams || [];
            this.resdataList = this.basicinfo.respParams || [];
            for (let key in temp) {
              key = key.split("/");
              this.cataValue.push({ id: key });
            }
          });
      }
    },
  },
  created() {
    // 目录树
    this.$api.getAllCatalogueList({}).then((res) => {
      this.catalogueList = res.data;
    });
  },
  methods: {
    handleClose() {
      this.$emit("handleClose");
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
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-dialog__wrapper.details {
  .el-dialog {
    border-radius: 16px;
    .el-dialog__body {
      padding-top: 0;
    }
  }
}
.detailsView {
  height: calc(100vh - 250px);
  background: #fff;
  border-radius: 8px;
  @import "../../detailsView/style.scss";
}
</style>