<template>
  <div class="detailsView">
    <div class="contain contain-table">
      <!-- title  -->
      <div class="titleTop">
        <span class="tableIcon">api</span>
        <span class="titleName">{{ basicinfo.indexName }}</span>
        <img :src="apiBgImg" class="bg" alt="" />
      </div>
      <div class="scollViews">
        <div class="basicinfo">
          <div class="titleTag">
            <span class="name">基本信息</span>
          </div>

          <el-table class="basicTable" stripe :data="basicInfoList">
            <el-table-column
              v-for="(item, index) in basicInfoProp"
              :prop="item.prop"
              :label="item.label"
              :align="item.align"
              :key="index"
              :min-width="item.width"
              show-overflow-tooltip
            >
              <template scope="scope">
                <span v-if="item.prop === 'online'">
                  {{ transOnline(scope.row[item.prop]) }}
                </span>
                <span v-else>{{ scope.row[item.prop] }}</span>
              </template>
            </el-table-column>
          </el-table>

          <!-- 目录 -->
          <el-table :data="cataValue" stripe class="cateValueTable">
            <el-table-column
              type="index"
              width="50"
              label="序号"
              align="center"
            ></el-table-column>
            <el-table-column label="目录" width="300" align="center">
              <template scope="scope">
                <el-cascader
                  v-model="scope.row.id"
                  :options="catalogueList"
                  :props="{
                    value: 'contentsId',
                    label: 'name',
                    children: 'children',
                    checkStrictly: false,
                  }"
                  :show-all-levels="false"
                  clearable
                  @change="handleChange"
                  :disabled="detailsView"
                ></el-cascader>
              </template>
            </el-table-column>
            <el-table-column label="目录路径" align="center">
              <template scope="scope">
                <el-cascader
                  class="cascaderAll2"
                  v-model="scope.row.id"
                  :options="catalogueList"
                  :props="{
                    value: 'contentsId',
                    label: 'name',
                    children: 'children',
                  }"
                  disabled
                  placeholder=""
                ></el-cascader>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              width="150"
              align="center"
              v-if="!detailsView"
            >
              <template scope="scope">
                <el-button type="text" @click="deleteCatalogue(scope.$index)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <el-button
            class="addCata"
            type="primary"
            size="mini"
            @click="addCatalogue"
            v-if="!detailsView"
            >添加目录</el-button
          >
        </div>

        <div class="basicinfo">
          <div class="titleTag">
            <span class="name">入参信息</span>
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
              show-overflow-tooltip
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
        <div class="basicinfo">
          <div class="titleTag">
            <span class="name">出参信息</span>
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
              show-overflow-tooltip
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
        <div class="btn" v-if="!detailsView">
          <el-button @click="confirmModify()">确定修改</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mixinsFunctions } from "@/mixins/mixinsFunc";
export default {
  mixins: [mixinsFunctions],
  data() {
    return {
      // basicinfo
      basicinfo: {
        indexName: "",
        interfaceAds: "",
        apiDescription: "",
        reqType: "", //reqType
        respType: "", //respType
        owner: "",
        application: "",
        myCrtTime: "", //createTime
        myUpdTime: "", //updateTime
        online: "是",
        catalogue1: "",
        catalogue2: "",
        catalogue1Name: "",
        catalogue2Name: "",
      },
      basicInfoProp: [
        {
          prop: "interfaceAds",
          label: "接口地址",
          align: "center",
        },
        {
          prop: "apiDescription",
          label: "接口描述",
          align: "center",
        },
        {
          prop: "reqType",
          label: "请求类型",
          align: "center",
        },
        {
          prop: "deptName",
          label: "业务属主部门",
          align: "center",
        },
        // {
        //   prop: "respType",
        //   label: "返回类型",
        //   align: "center",
        // },
        // {
        //   prop: "owner",
        //   label: "所属用户",
        //   align: "center",
        // },
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
        // {
        //   prop: "online",
        //   label: "是否公开",
        //   align: "center",
        // },
      ],
      basicInfoList: [],
      fielddataList: [],
      resdataList: [],
      apiBgImg: require("../../../assets/apiBg.png"),
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
      detailsView: false,
      id: "",
      assetsState: "",
      // 目录树
      catalogueList: [],
      cataValue: [],
    };
  },
  methods: {
    initData() {
      if (this.$route.name === "API详情") {
        this.detailsView = true;
      }
      // 目录树
      this.$api.getAllCatalogueList({}).then((res) => {
        this.catalogueList = res.data;
      });
      // 数据
      this.id = this.$route.query.id; // 通过路由传递id
      this.$api
        .getApiById({
          id: this.id,
          isRecord: this.detailsView,
        })
        .then((res) => {
          this.basicinfo = res;
          this.basicInfoList = [];
          // 发布状态
          this.assetsState = this.basicinfo.assetsState;
          // 返回的目录  -- 渲染
          let temp = this.basicinfo.catalogues;
          this.cataValue = [];
          this.fielddataList = this.basicinfo.reqParams || [];
          this.resdataList = this.basicinfo.respParams || [];
          this.basicInfoList.push(this.basicinfo || []);
          for (let key in temp) {
            key = key.split("/");
            this.cataValue.push({ id: key });
          }
        });
    },
    handleChange(val) {
      console.log(val);
    },
    confirmModify() {
      let list = JSON.parse(JSON.stringify(this.cataValue));
      list = list.map((item) => {
        return (item = item.id.join("/"));
      });
      let listSet = Array.from(new Set(list));
      if (listSet.length !== list.length) {
        this.$message.error("添加目录不能重复");
      } else {
        this.$api
          .updateAssetApi({
            id: this.id,
            list: list,
            assetsState: this.assetsState,
          })
          .then((res) => {
            this.$message.success("修改成功!");
            this.closeThisPage();
          });
      }
    },
    deleteCatalogue(index) {
      this.cataValue.splice(index, 1);
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
    addCatalogue() {
      if (this.cataValue.length > 4) {
        this.$message.warning("最多添加5条目录");
      } else {
        this.cataValue.push({
          id: [],
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.contain-table {
  overflow: inherit !important;
}
.cateValueTable {
  margin-top: 20px;
  border: 1px solid #eee;
}
.basicTable {
  margin-top: 20px;
  border: 1px solid #eee;
}
.cascaderAll2 {
  width: 600px;
}
.addCata {
  margin: 5px 0px;
}
.scollViews {
  overflow-y: scroll;
  height: calc(100% - 70px);
}
.titleTop {
  height: 60px;
  border-radius: 6px;
  background: linear-gradient(
    90deg,
    rgba(220, 240, 245, 1) 0%,
    rgba(240, 248, 250, 1) 100%
  );
  display: flex;
  align-items: center;
  position: relative;
  .bg {
    position: absolute;
    right: 20px;
  }
  .tableIcon {
    padding: 1px 5px;
    color: rgba(37, 157, 194, 1);
    border: 1px solid rgba(37, 157, 194, 1);
    margin-left: 20px;
    font-size: 12px;
  }
  .titleName {
    color: rgba(56, 56, 56, 1);
    font-size: 14px;
    padding-left: 8px;
  }
}
.basicinfo {
  .titleTag {
    color: rgba(56, 56, 56, 1);
    font-size: 14px;
    padding: 12px 10px;
    border-bottom: 1px solid #eee;
    .name {
      padding-bottom: 10px;
      border-bottom: 3px solid rgba(97, 189, 83, 1);
    }
  }
}
.detailsView {
  height: calc(100vh - 135px);
  padding: 16px;
  margin: 0 16px 16px 16px;
  background: #fff;
  border-radius: 8px;
  @import "./style.scss";
}
</style>