<template>
  <el-dialog
    class="details"
    :visible.sync="detailVis"
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
              <el-tag type="success">表</el-tag>
              <span>{{ basicinfo.tableComment }}</span>
            </div>
            <div class="details">
              <div class="left">
                <p>
                  <span class="label">中文名:</span>
                  <span>{{ basicinfo.tableComment}}</span>
                </p>
                <p>
                  <span class="label">英文名:</span>
                  <span>{{ basicinfo.tableName}}</span>
                </p>
                <p>
                  <span class="label">所属用户:</span>
                  <span>{{ basicinfo.owner }}</span>
                </p>
                <p>
                  <span class="label">租户编码:</span>
                  <span>{{ basicinfo.tenantCode }}</span>
                </p>
                <p>
                  <span class="label">存储项目名称:</span>
                  <span>{{ basicinfo.project }}</span>
                </p>
                <p>
                  <span class="label">底层存储类型:</span>
                  <span>{{ basicinfo.driverType }}</span>
                </p>
<!--                <p>
                  <span class="label">项目描述类型:</span>
                  <span>{{ basicinfo.tableComment }}</span>
                </p>-->
                <p>
                  <span class="label">业务属主部门:</span>
                  <span>{{ basicinfo.deptName }}</span>
                </p>
                <p>
                  <span class="label">创建时间:</span>
                  <span>{{ basicinfo.createTimeStr }}</span>
                </p>
                <p>
                  <span class="label">更新时间:</span>
                  <span>{{ basicinfo.updateTimeStr }}</span>
                </p>
                <p>
                  <span class="label">是否公开:</span>
                  <span>{{ transOnline(basicinfo.online) }}</span>
                </p>
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
                    placeholder=""
                  ></el-cascader>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="fieldinfo">
          <div class="title">
            <i></i>
            <span>字段信息</span>
          </div>
          <!-- 表格 -->
          <el-table :data="dataList" max-height="220px">
            <el-table-column
              v-for="(item, index) in propList"
              :prop="item.prop"
              :label="item.label"
              :align="item.align"
              :key="index"
              :min-width="item.width"
            >
              <template scope="scope">
                <span>{{ scope.row[item.prop] }}</span>
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
  name: "processDetails",
  props: {
    tableId: {
      type: String,
      default: "",
    },
    detailVis: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // basicinfo
      basicinfo: {
        tableName: "ind_dim_info_dd_org",
        chineseName: "指标机构表",
        owner: "48",
        tenantCode: "idmp",
        project: "std_01_uat1",
        driverType: "odps",
        myCrtTime: "2022-01-01",
        myUpdTime: "2022-04-12",
        online: "是",
        catalogue1: "个贷",
        catalogue2: "网贷",
        catalogue1Name: "产品/贷款/个贷",
        catalogue2Name: "产品/贷款/网贷",
      },
      dataList: [],
      propList: [],
      id: "",
      assetsState: "",
      // 目录树
      catalogueList: [],
      cataValue: [],
    };
  },
  watch: {
    detailVis(val) {
      console.log(val, 23333333);
      if (val) {
        console.log(this.tableId, "详情弹窗");
        // 数据
        this.$api
          .getTableById({
            id: this.tableId,
            isRecord: false,
          })
          .then((res) => {
            let data = res.data;
            this.basicinfo = data.table;
            // 表格数据
            this.dataList = data.column;
            // 发布状态
            this.assetsState = this.basicinfo.assetsState;
            // 返回的目录  -- 渲染
            let temp = this.basicinfo.catalogues;
            this.cataValue = [];
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
    this.propList = [
      {
        prop: "columnName",
        label: "字段名称",
        align: "center",
      },
      {
        prop: "columnMessage",
        label: "字段信息",
        align: "center",
      },
      {
        prop: "type",
        label: "字段类型",
        align: "center",
      },
      {
        prop: "length",
        label: "字段长度",
        align: "center",
      },
      {
        prop: "isNull",
        label: "是否可以为空",
        align: "center",
      },
    ];
  },
  mounted() {},
  methods: {
    transOnline(online) {
      if (online === 1) {
        return "是";
      } else if (online === 0) {
        return "否";
      } else {
        return "";
      }
    },
    handleClose() {
      this.$emit("handleClose");
    },
  },
};
</script>

<style lang="scss" scoped>
// 详情
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