<template>
  <div class="detailsView">
    <div class="contain contain-table">
      <!-- title  -->
      <div class="titleTop">
        <span class="tableIcon">指标</span>
        <span class="titleName">{{ basicinfo.targetName }}</span>
        <img :src="targetBgImg" class="bg" alt="" />
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

          <!-- 维度 -->
          <el-table :data="dimensionList" stripe class="cateValueTable">
            <el-table-column
              type="index"
              width="50"
              label="序号"
              align="center"
            ></el-table-column>
            <el-table-column
              label="维度"
              width="300"
              align="center"
              prop="name"
            >
            </el-table-column>
            <el-table-column label="维度值" prop="value"> </el-table-column>
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
            <span class="name">指标加工详情信息</span>
          </div>
          <el-table class="basicTable" stripe :data="basicInfoList">
            <el-table-column
              v-for="(item, index) in basicInfoDetailProp"
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
        </div>

        <div class="basicinfo">
          <div class="titleTag">
            <span class="name">指标统计项信息</span>
          </div>
          <div class="content">
            <p>
              <el-radio v-model="basicinfo.contemporaneousValue" :label="1" disabled>同期值</el-radio>
              <el-radio v-model="basicinfo.currentValue" :label="1" disabled>当期值</el-radio>
              <el-radio v-model="basicinfo.yearOnYearIncrement" :label="1" disabled>同比增量</el-radio>
              <el-radio v-model="basicinfo.yearOnYearGrowth" :label="1" disabled>同比增幅</el-radio>
              <el-radio v-model="basicinfo.previousPeriodValue" :label="1" disabled>上期值</el-radio>
              <el-radio v-model="basicinfo.monthOnMonthIncreament" :label="1" disabled>环比增量</el-radio>
              <el-radio v-model="basicinfo.monthOnMonthGrowth" :label="1" disabled>环比增幅</el-radio>
              <el-radio v-model="basicinfo.initialValueOfTheYear" :label="1" disabled>年初值</el-radio>
              <el-radio v-model="basicinfo.yearOnYearIncre" :label="1" disabled>较年初增量</el-radio>
              <el-radio v-model="basicinfo.increaseOverTheBeginningOfTheYear" :label="1" disabled>较年初增幅</el-radio>
            </p>
          </div>
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
        id: "",
        targetName: "",
        targetType: "",
        classifyOne: "",
        classifyTwo: "",
        businessDept: "",
        targetLevel: "",
        targetDefinition: "",
        targetRule: "",
        currency: "",
        myCrtTime: "",
        myUpdTime: "",
        dimension1: "",
        dimensionValue1: "",
        dimension2: "",
        dimensionValue2: "",
        catalogue1: "",
        catalogue2: "",
        catalogue1Name: "",
        catalogue2Name: "",
        statisticsRate: "",
        superviseAlert: "",
        measureUnit: "",
        dataType: "",
        referenceBasis: "",
        processSystem: "",
        safetyLevel: "",
        valueAttribute: "",
        currentValue: '', //当期值
        contemporaneousValue: '', //同期值
        yearOnYearIncrement: '', //同比增量
        yearOnYearGrowth: '', //同比增幅
        previousPeriodValue: '', //上期值
        monthOnMonthIncreament: '', //环比增量
        monthOnMonthGrowth: '', //环比增幅
        initialValueOfTheYear: '', //年初值
        yearOnYearIncre: '', //较年初增量
        increaseOverTheBeginningOfTheYear: '',//较年初增幅
      },
      detailsView: false,
      id: "",
      assetsState: "",
      // 目录树
      catalogueList: [],
      cataValue: [],
      basicInfoProp: [
        {
          prop: "targetName",
          label: "指标名称",
          align: "center",
        },
        {
          prop: "targetCode",
          label: "指标编码",
          align: "center",
        },
        {
          prop: "targetType",
          label: "指标类型",
          align: "center",
        },
        {
          prop: "classifyOne",
          label: "指标一级分类",
          align: "center",
        },
        {
          prop: "classifyTwo",
          label: "指标二级分类",
          align: "center",
        },
        {
          prop: "deptName",
          label: "业务属主部门",
          align: "center",
        },
        {
          prop: "targetLevel",
          label: "指标层级",
          align: "center",
        },
        {
          prop: "targetDefinition",
          label: "指标定义",
          align: "center",
        },
        {
          prop: "targetRule",
          label: "指标口径规则",
          align: "center",
        },
        {
          prop: "currency",
          label: "币种",
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
      ],
      basicInfoDetailProp: [
        {
          prop: "statisticsRate",
          label: "指标生成频率",
          align: "center",
        },
        {
          prop: "superviseAlert",
          label: "监管属性",
          align: "center",
        },
        {
          prop: "measureUnit",
          label: "度量单位",
          align: "center",
        },
        {
          prop: "dataType",
          label: "数据类型",
          align: "center",
        },
        {
          prop: "referenceBasis",
          label: "参考依据",
          align: "center",
        },
        {
          prop: "processSystem",
          label: "权威加工系统",
          align: "center",
        },
        {
          prop: "safetyLevel",
          label: "指标安全等级",
          align: "center",
        },
        {
          prop: "valueAttribute",
          label: "指标数值属性",
          align: "center",
        },
      ],
      dimensionList: [],
      basicInfoList: [],
      targetBgImg: require("../../../assets/targetBg.png"),
    };
  },
  methods: {
    initData() {
      if (this.$route.name === "指标详情") {
        this.detailsView = true;
      }
      // 目录树
      this.$api.getAllCatalogueList({}).then((res) => {
        this.catalogueList = res.data;
      });
      // 数据
      this.id = this.$route.query.id; // 通过路由传递id
      this.$api
        .getTargetById({
          id: this.id,
          isRecord: this.detailsView,
        })
        .then((res) => {
          this.basicinfo = res;
          this.cataValue = [];
          this.basicInfoDetailList = [];
          this.dimensionList = [];
          this.basicInfoList = [];
          // 发布状态
          this.assetsState = this.basicinfo.assetsState;
          this.basicInfoList.push(this.basicinfo || []);
          // 返回的目录  -- 渲染
          let temp = this.basicinfo.catalogues;
          if(this.basicinfo.dimension1) {
            this.dimensionList.push(
              {
                name: this.basicinfo.dimension1,
                value: this.basicinfo.dimensionValue1,
              }
            )
          }
          if(this.basicinfo.dimension2) {
            this.dimensionList.push(
              {
                name: this.basicinfo.dimension2,
                value: this.basicinfo.dimensionValue2,
              }
            )
          }
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
          .updateAssetTarget({
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
    rgba(245, 237, 220, 1) 0%,
    rgba(250, 247, 240, 1) 100%
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
    color: rgba(214, 156, 21, 1);
    border: 1px solid rgba(214, 156, 21, 1);
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
  ::v-deep .el-radio.is-disabled {
    color: #61bd53;
    .el-radio__inner {
      border-color: #61bd53;
    }
    .el-radio__inner::after {
      background-color: #61bd53;
    }
    .el-radio__label {
      color: #61bd53;
    }
  }
}
</style>