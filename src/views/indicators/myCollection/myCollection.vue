<template>
  <div class="myCollection">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="全部" name="all"></el-tab-pane>
      <el-tab-pane label="表" name="table"></el-tab-pane>
      <el-tab-pane label="API" name="api"></el-tab-pane>
      <el-tab-pane label="指标" name="target"></el-tab-pane>
      <el-tab-pane label="标签" name="label"></el-tab-pane>
    </el-tabs>
    <!-- 列表部分 -->
    <div class="list">
      <div class="listItem" 
        v-for="(item, index) in tableData" 
        :key="index"
        :class="{
          'listItem-table': item.assetType === 'table',
          'listItem-api': item.assetType === 'api',
          'listItem-target': item.assetType === 'target',
          'listItem-label': item.assetType === 'label',
        }">
        <div class="title">
          <div class="title-left">
            <el-tag
              class="title-left-tag"
              :type="getAssetTypeInfo(item.assetType)['tagColor']"
              >{{ getAssetTypeInfo(item.assetType)["tagName"] }}</el-tag
            >
            <div v-if="item.assetType === 'table'" class="table-title">
              <el-tooltip
                effect="dark"
                placement="top-start"
                :content="item.tableComment"
              >
                <div>
                  {{ item.tableComment }}
                </div>
              </el-tooltip>
              <el-tooltip
                effect="dark"
                placement="top-start"
                :content="item.tableName"
              >
                <div style="font-size: 12px;line-height: 14px;">{{ item.tableName }}</div>
              </el-tooltip>
            </div>
            <el-tooltip
              v-else
              effect="dark"
              placement="top-start"
              :content="item[getAssetTypeInfo(item.assetType)['codeName']]"
            >
              <div>
                {{ item[getAssetTypeInfo(item.assetType)["codeName"]] }}
              </div>
            </el-tooltip>
          </div>
          <i class="el-icon-star-on" @click="delFavorite(item)"></i>
        </div>
        <div class="detail" v-if="item.assetType === 'table'">
          <p>
            <span>存储项目名称：{{ item.project }}</span>
          </p>
          <p>
            <span>底层存储类型：{{ item.driverType }}</span>
          </p>
          <p>
            <span>所属用户：{{ item.owner }}</span>
          </p>
          <p>
            <span>项目描述类型：{{ item.tableComment }}</span>
          </p>
          <div class="btn">
            <div>
              <el-button type="text" @click="previewData(item)"
                >数据预览</el-button
              >
            </div>
            <span class="line">|</span>
            <div>
              <el-button type="text" @click="viewDetails('table', item)"
                >详情查看</el-button
              >
            </div>
            <span class="line">|</span>
            <div>
              <el-button
                type="text"
                v-if="item.permission == 0"
                @click="applyForAuthority(item)"
                >申请权限</el-button
              >
              <el-button type="text" v-if="item.permission == 1" disabled
                >已有权限</el-button
              >
              <el-button type="text" v-if="item.permission == 2" disabled
                >申请中</el-button
              >
              <el-button type="text" v-if="item.permission == 3" disabled
                >待生效</el-button
              >
            </div>
          </div>
        </div>
        <div class="detail" v-if="item.assetType === 'api'">
          <p>
            <span>接口地址：{{ item.interfaceAds }}</span>
            <span>请求类型：{{ item.reqType }}</span>
          </p>
          <p>
            <span>归属应用：{{ item.applicationName }}</span>
          </p>
          <p>
            <span>接口描述：{{ item.apiDescription }}</span>
          </p>
          <p></p>
          <div class="btn">
            <div>
              <el-button type="text" @click="viewDetails('api', item)"
                >详情查看</el-button
              >
            </div>
            <span class="line">|</span>
            <div>
              <el-button v-if="item.applyStatus == 1" type="text" disabled
                >已通过</el-button
              >
              <el-button v-else-if="item.applyStatus == 2" type="text" disabled
                >申请中</el-button
              >
              <!-- <el-button v-else-if="item.applyStatus == 3" type="text" disabled
                >已拒绝</el-button
              > -->
              <el-button v-else type="text" @click="applyForAccess(item)"
                >申请访问</el-button
              >
            </div>
          </div>
        </div>
        <div class="detail" v-if="item.assetType === 'target'">
          <p>
            <span>指标编码：{{ item.targetCode }}</span>
            <span>指标类型：{{ item.targetClassify }}</span>
          </p>
          <p>
            <span>业务属部门：{{ item.businessDept }}</span>
          </p>
          <p>
            <span>币种：{{ item.currency }}</span>
          </p>
          <p>
            <span>频率：{{ item.statisticsRate }}</span>
          </p>
          <div class="btn">
            <div>
              <el-button type="text" @click="viewDetails('target', item)"
                >详情查看</el-button
              >
            </div>
          </div>
        </div>
        <div class="detail" v-if="item.assetType === 'label'">
          <p>
            <span>标签编号：{{ item.labelCode }}</span>
            <span>失效时间：{{ transInvalidTime(item.invalidTime) }}</span>
          </p>
          <!-- <p>
            <span>对公：{{ item.rangeCode }}</span>
          </p> -->
          <p>
            <span>标签描述：{{ item.description }}</span>
          </p>
          <p>
            <span>标签业务口径：{{ item.businessCaliber }}</span>
          </p>
          <p>
            <span></span>
          </p>
          <div class="btn">
            <div>
              <el-button type="text" @click="viewDetails('label', item)"
                >详情查看</el-button
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 分页 -->
    <div class="pagination">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="total"
        v-if="total !== 0"
      >
      </el-pagination>
    </div>
    <!-- 数据预览弹窗 -->
    <el-dialog
      class="preView"
      title="数据预览"
      :visible.sync="dataPreVis"
      width="80%"
      top="25vh"
    >
      <!-- 表格 -->
      <el-table
        v-if="!dataErrorMsg"
        :data="preDataList"
        height="320px"
        ref="dataTable"
      >
        <el-table-column
          v-for="(item, index) in preDataProp"
          :prop="item.prop"
          :label="item.label"
          align="center"
          :key="index"
          show-overflow-tooltip
          :render-header="linefeed"
        >
          <template scope="scope">
            <span>{{ scope.row[item.prop] }}</span>
          </template>
        </el-table-column>
      </el-table>
      <p class="dataErrorMsg" v-else>{{ dataErrorMsg }}</p>
    </el-dialog>
    <!-- 申请权限 -->
    <el-dialog
      class="authority"
      :visible.sync="authorityVis"
      width="256px"
      top="40vh"
    >
      <el-button @click="addShopCar()">加入购物车</el-button>
      <el-button @click="directApply()">直接申请</el-button>
    </el-dialog>
    <!-- 直接申请 -->
    <el-dialog
      class="directApply"
      title="有效期选择"
      :visible.sync="directApplyVis"
      width="640px"
      top="30vh"
    >
      <p :class="{ active: radio === '1' }">
        <el-radio v-model="radio" label="1">临时生效</el-radio>
        <el-date-picker
          v-model="daterange"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
        >
        </el-date-picker>
      </p>
      <p :class="{ active: radio === '2' }">
        <el-radio v-model="radio" label="2">永久生效</el-radio>
      </p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="directApplyVis = false">取消</el-button>
        <el-button type="primary" @click="confirmApply()">确定</el-button>
      </span>
    </el-dialog>
    <!-- 已提交提示弹窗 -->
    <el-dialog
      class="tipDialog"
      :visible.sync="tipDialog"
      width="212px"
      top="38vh"
    >
      <i class="el-icon-success"></i>
      <span>申请已提交，等待审批...</span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "all",
      tableData: [],
      currentPage: 1,
      pageSize: 9,
      total: 50,
      // 数据预览
      dataPreVis: false,
      preDataList: [],
      preDataProp: [],
      // 申请权限
      authorityVis: false,
      // 加入购物车参数
      request: {
        assetId: "",
        beginTime: "",
        endTime: "",
      },
      // 直接申请
      directApplyVis: false,
      daterange: "",
      pickerOptions: {
        disabledDate: (time) => {
          let oneDay = 60 * 60 * 24 * 1000;
          return time.getTime() < Date.now() - oneDay;
        },
      },
      radio: "2",
      // 提示弹窗
      tipDialog: false,
      dataErrorMsg: "",
    };
  },
  mounted() {
    this.$store.commit("SET_KEEPALIVE", true);
    if (this.$route.query && this.$route.query.activeName) {
      this.activeName = this.$route.query.activeName;
      this.getFavoriteList();
    } else {
      // 默认查询全部
      this.$api
        .queryMyCollection({
          page: this.currentPage,
          size: this.pageSize,
        })
        .then((res) => {
          this.tableData = res.data.records;
          this.total = res.data.total;
        });
    }
  },
  beforeRouteLeave(to, from, next) {
    if (
      to.path === "/detailsView/table" ||
      to.path === "/detailsView/api" ||
      to.path === "/detailsView/label" ||
      to.path === "/detailsView/target"
    ) {
      this.$store.commit("SET_KEEPALIVE", true);
    } else {
      this.$store.commit("SET_KEEPALIVE", false);
    }
    next();
  },
  watch: {
    // 时间选择
    daterange(val) {
      if (val) {
        this.request.beginTime = this.formatDate(val[0]);
        this.request.endTime = this.formatDate(val[1]);
      } else {
        this.request.beginTime = "";
        this.request.endTime = "";
      }
    },
  },
  methods: {
    linefeed(h, { column, $index }) {
      let realWidth = 0;
      let span = document.createElement("span");
      span.innerText = column.label;
      if (!column.label) {
        document.body.appendChild(span);
        realWidth = 100;
        column.minWidth = realWidth; // 可能还有边距/边框等值，需要根据实际情况加上
        document.body.removeChild(span);
        if(column.label.indexOf(',')>-1) {
          return h("div",{},[
            h("div",{},column.label.split(',')[0]),
            h("div",{},column.label.split(',')[1]),
          ])
        } else {
          return h("span", column.label);
        } 
      } else {
        document.body.appendChild(span);
        realWidth = span.getBoundingClientRect().width + 30;
        column.minWidth = realWidth; // 可能还有边距/边框等值，需要根据实际情况加上
        document.body.removeChild(span);
        if(column.label.indexOf(',')>-1) {
          return h("div",{},[
            h("div",{},column.label.split(',')[0]),
            h("div",{},column.label.split(',')[1]),
          ])
        } else {
          return h("span", column.label);
        } 
      }
    },
    getAssetTypeInfo(assetType) {
      if (assetType === "table") {
        return {
          tagColor: "success",
          tagName: "表",
          codeName: "tableName",
        };
      } else if (assetType === "target") {
        return {
          tagColor: "warning",
          tagName: "指标",
          codeName: "targetName",
        };
      } else if (assetType === "api") {
        return {
          tagColor: "",
          tagName: "API",
          codeName: "indexName",
        };
      } else if (assetType === "label") {
        return {
          tagColor: "danger",
          tagName: "标签",
          codeName: "labelName",
        };
      }
    },
    // tab切换
    handleClick(tab, event) {
      this.currentPage = 1;
      this.getFavoriteList();
    },

    //列表查询
    getFavoriteList() {
      if (this.activeName === "all") {
        this.$api
          .queryMyCollection({
            page: this.currentPage,
            size: this.pageSize,
          })
          .then((res) => {
            this.tableData = res.data.records;
            this.total = res.data.total;
          });
      } else if (this.activeName === "table") {
        this.$api
          .queryMyCollection({
            page: this.currentPage,
            size: this.pageSize,
            assetType: "table",
          })
          .then((res) => {
            this.tableData = res.data.records;
            this.total = res.data.total;
          });
      } else if (this.activeName === "api") {
        this.$api
          .queryMyCollection({
            page: this.currentPage,
            size: this.pageSize,
            assetType: "api",
          })
          .then((res) => {
            this.tableData = res.data.records;
            this.total = res.data.total;
          });
      } else if (this.activeName === "target") {
        this.$api
          .queryMyCollection({
            page: this.currentPage,
            size: this.pageSize,
            assetType: "target",
          })
          .then((res) => {
            this.tableData = res.data.records;
            this.total = res.data.total;
          });
      } else if (this.activeName === "label") {
        this.$api
          .queryMyCollection({
            page: this.currentPage,
            size: this.pageSize,
            assetType: "label",
          })
          .then((res) => {
            this.tableData = res.data.records;
            this.total = res.data.total;
          });
      }
    },
    // 分页
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getFavoriteList();
    },
    // 日期格式转换
    formatDate(date) {
      let y = date.getFullYear();
      let m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      let h = date.getHours();
      h = h < 10 ? "0" + h : h;
      let minute = date.getMinutes();
      minute = minute < 10 ? "0" + minute : minute;
      let second = date.getSeconds();
      second = second < 10 ? "0" + second : second;
      return y + "-" + m + "-" + d;
      // return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
    },
    // 详情查看
    viewDetails(type, item) {
      this.$router.push({
        path: "/detailsView/" + item.assetType,
        query: {
          id: item.id,
        },
      });
    },
    // 删除收藏
    delFavorite(item) {
      this.$api
        .delFavorite({
          assetId: item.id,
        })
        .then((res) => {
          if (res.code == 0 || res.code == 200) {
            this.$message.success(res.msg);
            this.getFavoriteList();
          } else {
            this.$message.error(res.msg);
          }
        });
    },
    // 数据预览
    previewData(item) {
      this.preDataProp = [];
      this.preDataList = [];
      this.dataPreVis = true;
      this.dataErrorMsg = "";
      this.$api
        .previewTableData({ name: item.tableName, project: item.project })
        .then((res) => {
          if (res.code == 200 || res.code == 0) {
            this.preDataProp = res.data.columns;
            this.preDataList = res.data.dataList;
            this.$nextTick(() => {
              this.$refs.dataTable.doLayout();
            });
          } else {
            // this.$message.error(res.msg);
            this.dataErrorMsg = res.msg;
          }
        });
    },
    // 申请访问
    applyForAccess(item) {
      this.$api
        .applyForAccess({
          apiId: item.id,
        })
        .then((res) => {
          if (res.code == 0 || res.code == 200) {
            this.$message.success(res.msg);
            this.getFavoriteList();
          } else {
            this.$message.error(res.msg);
          }
        });
    },
    // 申请权限
    applyForAuthority(item) {
      this.directApplyVis = true;
      this.daterange = "";
      this.request.tableId = item.id;
    },
    // 加入购物车
    addShopCar() {
      this.$api.addShopCar(this.request).then((res) => {
        this.authorityVis = false;
        if (res.code == 999) {
          this.$message.warning(res.msg);
        } else if (res.code == 200 || res.code == 0) {
          this.$message.success(res.msg);
        }
      });
    },
    // 直接申请
    directApply() {
      this.authorityVis = false;
      // 直接申请权限接口
      let list = [this.request];
      this.$api
        .applyForAuthority({
          list: list,
        })
        .then((res) => {
          if (res.code == 200 || res.code == 0) {
            this.$message.success(res.msg);
            this.getFavoriteList();
          } else {
            this.$message.error(res.msg);
          }
        });
    },
    // 确定申请
    confirmApply() {
      // 关闭当前弹窗
      if (this.radio === "2") {
        this.request.beginTime = "";
        this.request.endTime = "";
        this.directApplyVis = false;
        // 打开申请权限方式弹窗
        this.authorityVis = true;
      } else {
        if (this.daterange.length < 1) {
          this.$message.error("请选择时间");
        } else {
          this.directApplyVis = false;
          // 打开申请权限方式弹窗
          this.authorityVis = true;
        }
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
/deep/.el-table__body-wrapper::-webkit-scrollbar {
  height: 10px !important;
}
.dataErrorMsg {
  padding: 60px 0px;
  text-align: center;
}
.myCollection {
  height: calc(100vh - 135px);
  background: #fff;
  margin: 0 16px 16px 16px;
  padding: 16px;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  // tab
  ::v-deep .el-tabs {
    height: auto;

    .el-tabs__header {
      margin: 0;

      .el-tabs__nav-wrap {
        .el-tabs__nav-scroll {
          height: 25px;

          .el-tabs__nav {
            height: 100%;

            .el-tabs__item {
              height: 100%;
              line-height: 25px;
              font-size: 14px;
              color: #202224;
            }

            .el-tabs__item.is-active {
              color: #79ac43;
            }
          }
        }
      }

      .el-tabs__nav-wrap::after {
        background: transparent;
      }
    }
  }

  // 列表部分
  .list {
    display: flex;
    flex-wrap: wrap;
    // justify-content: space-between;
    align-content: flex-start;
    height: calc(100% - 190px);
    overflow: auto;
    margin-top: 24px;

    .listItem {
      width: 32%;
      // height: 32%;
      margin-bottom: 8px;
      padding: 12px;
      border: 1px solid #e8e8e8;
      border-radius: 4px;
      margin-right: 1%;

      .title {
        // height: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;
        color: #202224;
        margin-bottom: 8px;
        width: 100%;
        min-height: 32px;

        .title-left {
          display: flex;
          width: calc(100% - 14px);
          align-items: center;
          .title-left-tag {
            display: inline-table;
          }
          .el-tag {
            margin-right: 8px;
            color: #409eff;
            background-color: #ecf5ff;
            border: 1px solid #409eff;
          }
          .el-tag.el-tag--success {
            background-color: #dedaf2;
            border-color: #7e83ed;
            color: #7e83ed;
          }

          .el-tag.el-tag--warning {
            background-color: #fff8e6;
            border-color: #ffba00;
            color: #ffba00;
          }
          .el-tag.el-tag--danger {
            background-color: #dbe9f8;
            border-color: #0062ff;
            color: #0062ff;
          }
          div {
            padding-left: 5px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
        span {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          .el-tag {
            margin-right: 8px;
            color: #409eff;
            background-color: #ecf5ff;
            border: 1px solid #d9ecff;
          }

          .el-tag.el-tag--success {
            background-color: #f2f7ec;
            border-color: #e4eed9;
            color: #79ac43;
          }

          .el-tag.el-tag--warning {
            background-color: #fff8e6;
            border-color: #fff1cc;
            color: #ffba00;
          }
        }

        i {
          cursor: pointer;
        }

        .el-icon-star-on {
          color: #f7ba2a;
          font-size: 18px;
        }
      }

      .detail {
        font-size: 12px;

        p {
          height: 20px;
          line-height: 20px;
          background: #fafafa;
          margin: 0 0 4px 0;
          width: 100%;

          display: flex;
          justify-content: space-between;

          span {
            width: 100%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            color: #808080;
          }
        }

        .btn {
          width: 100%;
          height: 20px;
          margin-top: 10px;
          display: flex;
          align-items: center;

          div {
            width: 100%;
            text-align: center;
          }

          .line {
            color: #e6ebf5;
          }
        }
      }
    }
    .listItem-table {
      background: #f7f5fa;
      border-color: #7e83ed;
    }
    .listItem-api {
      background: #f0f8fa;
      border-color: #259dc2;
    }
    .listItem-target {
      background: #faf7f0;
      border-color: #d69c15;
    }
    .listItem-label {
      background: #f0f4fa;
      border-color: #4464cf;
    }
  }

  // 分页
  .pagination {
    margin-top: 24px;
    height: 32px;
    display: flex;
    flex-direction: row-reverse;
    position: absolute;
    right: 20px;
    bottom: 20px;
    .el-pagination {
      margin: 0;
    }
  }

  // 弹窗
  ::v-deep .el-dialog__wrapper.preView {
    // 数据预览弹窗
    .el-dialog {
      // height: 308px;
      border-radius: 8px;
      // overflow: hidden;
      box-sizing: border-box;
      padding: 16px 24px;

      .el-dialog__header {
        padding: 0;

        .el-dialog__title {
          font-size: 16px !important;
          color: #202224 !important;
        }
      }

      .el-dialog__body {
        padding: 0;
        margin-top: 18px;

        // .el-table::before {
        //   display: none;
        // }

        // .el-table {
        //   border: 1px solid #e8e8e8;
        //   // header
        //   .el-table__header-wrapper {
        //     .el-table__header {
        //       tr {
        //         border: 1px solid #e8e8e8;

        //         th {
        //           color: rgba(32, 34, 36, 1);
        //           font-size: 14px;
        //           font-weight: 400;
        //           border: none;
        //           background: #fafafa;
        //         }
        //       }
        //     }
        //   }

        //   // body
        //   .el-table__body-wrapper {
        //     .el-table__body {
        //       tr {
        //         font-size: 12px;
        //         color: #4d4e50;
        //       }
        //     }
        //   }

        //   .cell {
        //     // white-space: nowrap;
        //     // overflow: hidden;
        //     // text-overflow: ellipsis;
        //   }
        // }
      }
    }
  }

  // 申请权限
  ::v-deep .el-dialog__wrapper.authority {
    .el-dialog {
      padding: 16px;
      height: 88px;
      box-sizing: border-box;
      border-radius: 8px;

      .el-dialog__header {
        padding: 0;
        display: none;
      }

      .el-dialog__body {
        padding: 0;
        display: flex;
        justify-content: space-between;

        .el-button {
          width: 104px;
          height: 56px;
          border: 1px solid #79ac43;
          color: #79ac43;
          font-size: 14px;
          margin: 0;
        }
      }
    }
  }

  // 直接申请
  ::v-deep .el-dialog__wrapper.directApply {
    .el-dialog {
      height: 292px;
      padding: 16px 24px;
      box-sizing: border-box;
      border-radius: 8px;

      .el-dialog__header {
        padding: 0;

        .el-dialog__title {
          font-size: 16px !important;
          color: #202224;
        }
      }

      .el-dialog__body {
        padding: 0;
        margin-top: 26px;

        p {
          width: 592px;
          height: 64px;
          margin: 0 0 16px 0;
          padding: 20px 24px;
          border: 1px solid #e7e7e7;
          border-radius: 4px;
          box-sizing: border-box;
          display: flex;
          justify-content: space-between;
          align-items: center;

          .el-date-editor {
            border: none;
            padding-right: 0;
            width: 240px;
          }
        }

        .active {
          border: 1px solid #79ac43;
          background: #e8f2dc;

          .el-date-editor {
            background: #e8f2dc;
            color: #79ac43;

            .el-range-input {
              background: #e8f2dc;
              color: #79ac43;
            }

            .el-range-separator {
              color: #79ac43;
            }
          }
        }
      }

      .el-dialog__footer {
        padding: 0;

        .el-button {
          width: 88px;
          height: 36px;
          border: 1px solid #79ac43;
          color: #79ac43;
          font-size: 14px;
          margin: 0;
        }

        .el-button--primary {
          color: #fff;
        }
      }
    }
  }

  // 提示弹窗
  ::v-deep .el-dialog__wrapper.tipDialog {
    .el-dialog {
      border-radius: 8px;
      padding: 16px;
      box-sizing: border-box;

      .el-dialog__header {
        padding: 0;
        display: none;
      }

      .el-dialog__body {
        height: 22px;
        line-height: 22px;
        padding: 0;
        font-size: 14px;
        display: flex;
        align-items: center;

        i {
          color: #79ac43;
          font-size: 16px;
          margin-right: 8px;
        }

        span {
          color: rgba(0, 0, 0, 0.9);
        }
      }
    }
  }
}
</style>