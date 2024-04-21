<template>
  <div class="detailsView">
    <div class="contain contain-table">
      <!-- title  -->
      <div class="titleTop">
        <span class="tableIcon">标签</span>
        <span class="titleName">{{ basicinfo.labelName }}</span>
        <img :src="labelBgImg" class="bg" alt="" />
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
                <span v-if="item.type === 'needTrans'">
                  {{ transInvalidTime(scope.row[item.prop]) }}
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
        labelName: "",
        labelCode: "",
        classifyCode: "",
        classifyName: "",
        stateCode: "",
        fromCode: "",
        invalidTime: "",
        description: "",
        businessCaliber: "",
        catalogue1: "",
        catalogue2: "",
        catalogue1Name: "",
        catalogue2Name: "",
      },
      detailsView: false,
      id: "",
      assetsState: "",
      // 目录树
      catalogueList: [],
      cataValue: [],
      basicInfoList: [],
      basicInfoProp: [
        {
          prop: "labelCode",
          label: "标签编号",
          align: "center",
        },
        {
          prop: "classifyName",
          label: "标签分类",
          align: "center",
        },
        {
          prop: "stateCode",
          label: "标签状态",
          align: "center",
        },
        {
          prop: "fromCode",
          label: "标签来源",
          align: "center",
        },
        {
          prop: "deptName",
          label: "业务属主部门",
          align: "center",
        },
        {
          prop: "invalidTime",
          label: "标签失效时间",
          type: "needTrans",
          align: "center",
        },
        {
          prop: "description",
          label: "标签描述",
          align: "center",
        },
        {
          prop: "businessCaliber",
          label: "标签业务口径",
          align: "center",
        },
      ],
      labelBgImg: require("../../../assets/labelBg.png"),
    };
  },
  computed: {},
  methods: {
    initData() {
      if (this.$route.name === "标签详情") {
        this.detailsView = true;
      }
      // 目录树
      this.$api.getAllCatalogueList({}).then((res) => {
        this.catalogueList = res.data;
      });
      // 数据
      this.id = this.$route.query.id; // 通过路由传递id
      this.$api
        .getLabelById({
          id: this.id,
          isRecord: this.detailsView,
        })
        .then((res) => {
          this.basicInfoList = [];
          this.basicinfo = res;
          this.cataValue = [];
          // 发布状态
          this.assetsState = this.basicinfo.assetsState;
          this.basicInfoList.push(this.basicinfo || []);
          // 返回的目录  -- 渲染
          let temp = this.basicinfo.catalogues;
          for (let key in temp) {
            key = key.split("/");
            this.cataValue.push({ id: key });
          }
        });
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
          .updateAssetLabel({
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
    handleChange(value) {
      console.log(value);
    },
    deleteCatalogue(index) {
      this.cataValue.splice(index, 1);
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
    // 失效时间转换
    transInvalidTime(time) {
      let invalidTime = time ? (time.indexOf("9999") > -1 ? "永久" : time) : "";
      return invalidTime;
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
    rgba(220, 230, 245, 1) 0%,
    rgba(240, 244, 250, 1) 100%
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
    color: rgba(68, 100, 207, 1);
    border: 1px solid rgba(68, 100, 207, 1);
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