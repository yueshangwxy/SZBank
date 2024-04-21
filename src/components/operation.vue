<template>
  <div class="operation">
    <div class="left">
      <el-tabs v-model="activeTab" @tab-click="handleClick">
        <el-tab-pane
          v-for="item in tabList"
          :key="item.name"
          :label="item.label"
          :name="item.name"
        ></el-tab-pane>
      </el-tabs>
      <div class="tree">
        <!-- <el-input
          placeholder="输入关键字进行过滤"
          v-model="filterText"
          clearable
        >
          <i slot="suffix" class="el-input__icon el-icon-search"></i>
        </el-input> -->
        <el-tree
          class="filter-tree"
          node-key="contentsId"
          highlight-current
          :data="treeData"
          :props="defaultProps"
          accordion
          @node-click="handleNodeClick"
          @node-expand="handleNodeClick"
          :filter-node-method="filterNode"
          ref="tree"
        >
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span v-if="data.icon" :class="data.icon"></span>
            <span> {{ node.label }} </span>
          </span>
        </el-tree>
      </div>
    </div>
    <div class="content">
      <div class="catalogue">
        <div class="catalogueType">
          <span>一级目录:</span>
          <el-tabs v-model="firstType">
            <el-tab-pane
              v-for="item in firstList"
              :key="item.contentsId"
              :label="item.name"
              :name="item.contentsId"
            ></el-tab-pane>
          </el-tabs>
        </div>
        <div class="catalogueType">
          <span>二级目录:</span>
          <el-tabs v-model="secondType" v-if="!secondList.length">
            <el-tab-pane label="全部" name="all"></el-tab-pane>
          </el-tabs>
          <el-tabs v-model="secondType">
            <el-tab-pane
              v-for="item in secondList"
              :key="item.contentsId"
              :label="item.name"
              :name="item.contentsId"
            ></el-tab-pane>
          </el-tabs>
        </div>
        <div class="catalogueType">
          <span>三级目录:</span>
          <el-tabs v-model="thirdType" v-if="!thirdList.length">
            <el-tab-pane label="全部" name="all"></el-tab-pane>
          </el-tabs>
          <el-tabs v-model="thirdType">
            <el-tab-pane
              v-for="item in thirdList"
              :key="item.contentsId"
              :label="item.name"
              :name="item.contentsId"
            ></el-tab-pane>
          </el-tabs>
        </div>
        <div class="filterConditon">
          <span class="desc">筛选条件:</span>
          <!-- 表 -->
          <div class="filterItem" v-if="routerName === 'tableOperation'">
            <el-cascader
              v-model="belongSys"
              :options="deptTreeList"
              :show-all-levels="false"
              :props="{
                value: 'id',
                label: 'name',
                children: 'children',
                emitPath: false,
                checkStrictly: true,
              }"
              placeholder="请选择属主部门"
              clearable
            ></el-cascader>
            <el-input
              v-model="project"
              placeholder="请输入存储项目名称"
              clearable
            ></el-input>
            <el-input
              v-model="tableName"
              placeholder="请输入表名"
              clearable
            ></el-input>
          </div>
          <!-- API -->
          <div class="filterItem" v-if="routerName === 'apiOperation'">
            <el-select
              v-model="application"
              placeholder="请选择归属应用"
              clearable
            >
              <el-option
                v-for="item in appList"
                :key="item.appCode"
                :label="item.appName"
                :value="item.appCode"
              ></el-option>
            </el-select>
            <el-cascader
              v-model="apiDept"
              :options="deptTreeList"
              :show-all-levels="false"
              :props="{
                value: 'id',
                label: 'name',
                children: 'children',
                emitPath: false,
                checkStrictly: true,
              }"
              placeholder="请选择属主部门"
              clearable
            ></el-cascader>
          </div>
          <!-- 指标 -->
          <div class="filter" v-if="routerName === 'targetOperation'">
            <el-input
              v-model="targetCode"
              placeholder="请输入指标编码"
              clearable
            ></el-input>
            <el-input
              v-model="targetName"
              placeholder="请输入指标名称"
              clearable
            ></el-input>
            <el-select
              v-model="targetType"
              placeholder="请选择指标类型"
              clearable
            >
              <el-option
                v-for="item in targetTypeList"
                :key="item"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
            <el-cascader
              v-model="businessDept"
              :options="deptTreeList"
              :show-all-levels="false"
              :props="{
                value: 'id',
                label: 'name',
                children: 'children',
                emitPath: false,
                checkStrictly: true,
              }"
              placeholder="请选择属主部门"
              clearable
            ></el-cascader>
            <el-select
              v-model="classifyOne"
              placeholder="请选择一级分类"
              clearable
            >
              <el-option
                v-for="item in classifyOneList"
                :key="item"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </div>
          <!-- 标签 -->
          <div class="filter" v-if="routerName === 'labelOperation'">
            <el-input
              v-model="labelName"
              placeholder="请输入标签名称"
              clearable
            ></el-input>
            <!-- <el-input
              v-model="objectCode"
              placeholder="请输入适用对象"
              clearable
            ></el-input> -->
            <el-input
              v-model="fromCode"
              placeholder="请输入标签来源"
              clearable
            ></el-input>
            <el-cascader
              v-model="branchOrInsideCode"
              :options="deptTreeList"
              :show-all-levels="false"
              :props="{
                value: 'id',
                label: 'name',
                children: 'children',
                emitPath: false,
                checkStrictly: true,
              }"
              placeholder="请选择属主部门"
              clearable
            ></el-cascader>
          </div>
          <el-button @click="queryFromFirstPage()">确认</el-button>
        </div>
      </div>
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
            <!-- <span>
              <el-tag type="success" v-if="routerName === 'tableOperation'">表</el-tag>
              <el-tag type="" v-if="routerName === 'apiOperation'">API</el-tag>
              <el-tag type="warning" v-if="routerName === 'targetOperation'"
                >指标</el-tag
              >
              <el-tag type="" v-if="routerName === 'labelOperation'">标签</el-tag>
              <span v-if="routerName === 'tableOperation'">{{ item.tableName }}</span>
              <span v-if="routerName === 'apiOperation'">{{ item.indexName }}</span>
              <span v-if="routerName === 'targetOperation'">{{
                item.targetName
              }}</span>
              <span v-if="routerName === 'labelOperation'">{{ item.labelName }}</span>
            </span> -->
            <div class="title-left">
              <el-tag
                class="title-left-tag"
                :type="getAssetTypeInfo()['tagColor']"
                >{{ getAssetTypeInfo()["tagName"] }}</el-tag
              >
              <div v-if="routerName === 'tableOperation'" class="table-title">
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
                :content="item[getAssetTypeInfo()['codeName']]"
              >
                <div>
                  {{ item[getAssetTypeInfo()["codeName"]] }}
                </div>
              </el-tooltip>
            </div>
            <span v-if="item.oprState != null ? item.oprState == 'publish' : (item.assetsState == 'publish')">
              <i
                class="el-icon-star-off"
                v-if="!item.favorite"
                @click="addFavorite(item)"
              ></i>
              <i
                class="el-icon-star-on"
                v-if="item.favorite"
                @click="delFavorite(item)"
              ></i>
            </span>
          </div>
          <div class="detail" v-if="routerName === 'tableOperation'">
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
          </div>
          <div class="detail" v-if="routerName === 'apiOperation'">
            <p>
              <span>接口地址：{{ item.interfaceAds }}</span>
              <span>请求类型：{{ item.reqType }}</span>
            </p>
            <!-- <p>
              <span>所属用户：{{ item.owner }}</span>
              <span>返回类型：{{ item.respType }}</span>
            </p> -->
            <p>
              <span>归属应用：{{ item.applicationName }}</span>
            </p>
            <p>
              <span>接口描述：{{ item.apiDescription }}</span>
            </p>
            <p></p>
          </div>
          <div class="detail" v-if="routerName === 'targetOperation'">
            <p>
              <span>指标编码：{{ item.targetCode }}</span>
              <span>指标类型：{{ item.targetType }}</span>
            </p>
            <p>
              <span>业务属主部门：{{ item.deptName }}</span>
            </p>
            <p>
              <span>币种：{{ item.currency }}</span>
            </p>
            <p>
              <span>频率：{{ item.statisticsRate }}</span>
            </p>
          </div>
          <div class="detail" v-if="routerName === 'labelOperation'">
            <p>
              <span>标签编号：{{ item.labelCode }}</span>
              <span>失效时间：{{ transInvalidTime(item.invalidTime) }}</span>
            </p>
            <p>
              <span>分类名称：{{ item.classifyName }}</span>
            </p>
            <p>
              <span>标签描述：{{ item.description }}</span>
            </p>
            <p>
              <span>标签业务口径：{{ item.businessCaliber }}</span>
            </p>
          </div>
          <div class="btn">
            <div>
              <el-button type="text" @click="modify(item)">修改</el-button>
            </div>
            <span class="line">|</span>
            <div>
              <el-button
                type="text"
                v-if="
                  item.oprState
                    ? item.oprState === 'publish'
                    : item.assetsState === 'publish'
                "
                class="offline"
                @click="offline(item)"
                >下线</el-button
              >
              <el-button
                type="text"
                v-else
                class="online"
                @click="offline(item)"
                >发布</el-button
              >
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
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tabList: {
      type: Array,
      default: () => {
        return [];
      },
    },
    tableData: {
      type: Array,
      default: () => {
        return [];
      },
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    nowPage: {
      type: Number,
      default: 1,
    },
    total: {
      type: Number,
      default: 50,
    },
  },
  data() {
    return {
      currentPage: this.nowPage,
      activeTab: "publish",
      // 树形控件
      filterText: "",
      defaultProps: {
        id: "contentsId",
        children: "children",
        label: "name",
      },
      treeData: [],
      publishTree: [],
      unpublishedTree: [],
      // 目录列表
      catalogueList: [],
      // 一级目录
      firstType: "all",
      firstList: [],
      // 二级目录
      secondType: "all",
      secondList: [],
      // 四级目录
      thirdType: "all",
      thirdList: [],
      // 精准筛选
      // 表
      belongSys: "",
      tableName: "",
      project: "",
      // api
      application: "",
      apiDept: "",
      // 指标
      targetCode: "",
      targetName: "",
      targetType: "",
      businessDept: "",
      classifyOne: "",
      // 标签
      labelName: "",
      objectCode: "",
      fromCode: "",
      branchOrInsideCode: "",
      // 列表部分
      // 收藏
      save: true,
      // 路由
      routerName: "",
      // 应用列表
      appList: [],
      // 指标类型
      targetTypeList: [],
      // 一级分类
      classifyOneList: [],
      // 部门树
      deptTreeList: [],
    };
  },
  watch: {
    save(val) {
      console.log(val);
    },
    // 节点过滤
    filterText(val) {
      this.$refs.tree.filter(val);
    },
    // 树状图tab
    activeTab(val) {
      if (val === "publish") {
        this.firstType = "all";
        this.secondType = "all";
        this.thirdType = "all";
        this.treeData = this.publishTree;
        this.queryFromFirstPage();
      } else {
        this.firstType = "all";
        this.secondType = "all";
        this.thirdType = "all";
        this.treeData = this.unpublishedTree;
        this.queryFromFirstPage();
      }
    },
    // 目录联动
    // 一级
    firstType(val) {
      this.secondType = "all";
      let data;
      data = this.firstList.filter((item) => {
        return item.contentsId == val;
      });
      if (data.length < 1) {
        this.secondList = [];
      } else {
        this.secondList = JSON.parse(JSON.stringify(data[0].children));
        if (this.secondList.length > 0) {
          this.secondList.unshift({
            contentsId: "all",
            name: "全部",
            children: [],
          });
        }
      }
      this.queryFromFirstPage()
      this.$refs.tree.setCurrentKey(val);
    },
    // 二级
    secondType(val) {
      this.thirdType = "all";
      let data;
      data = this.secondList.filter((item) => {
        return item.contentsId == val;
      });
      if (data.length < 1) {
        this.thirdList = [];
      } else {
        this.thirdList = JSON.parse(JSON.stringify(data[0].children));
        if (this.thirdList.length > 0) {
          this.thirdList.unshift({
            contentsId: "all",
            name: "全部",
            children: [],
          });
        }
      }
      this.queryFromFirstPage()
      this.$refs.tree.setCurrentKey(val);
    },
    // 三级
    thirdType(val) {
      this.queryFromFirstPage()
      this.$refs.tree.setCurrentKey(val);
    }
  },
  created() {
    // 全部目录
    this.$api.getAllCatalogueList({}).then((res) => {
      this.firstList = res.data;
      this.firstList.unshift({
        contentsId: "all",
        name: "全部",
        children: [],
      });
    });
    // 查询所有应用   appList
    // 查询指标类型, 一级分类，二级分类
    // 查询部门树
    this.$api.qryOpenApp({}).then((res) => {
      this.appList = res.data;
    });
    this.$api.getTargetSelect({}).then((res) => {
      this.targetTypeList = res.data.targetTypeList;
    });
    // this.$api.getClassifyList({}).then((res) => {
    //   this.classifyOneList = res.classifyOne;
    // });
    if(this.$route.name === 'targetOperation') {
      this.$api.getTargetSelect({}).then((res) => {
        this.classifyOneList = res.data.classifyOneList;
      });
    }
    this.$api.getDeptTree({}).then((res) => {
      this.deptTreeList = [res.data];
    });
    this.routerName = this.$route.name;
    this.getCatalogueList();
  },
  methods: {
    getAssetTypeInfo() {
      if (this.routerName === "tableOperation") {
        return {
          tagColor: "success",
          tagName: "表",
          codeName: "tableName",
        };
      } else if (this.routerName === "targetOperation") {
        return {
          tagColor: "warning",
          tagName: "指标",
          codeName: "targetName",
        };
      } else if (this.routerName === "apiOperation") {
        return {
          tagColor: "normal",
          tagName: "API",
          codeName: "indexName",
        };
      } else if (this.routerName === "labelOperation") {
        return {
          tagColor: "danger",
          tagName: "标签",
          codeName: "labelName",
        };
      }
    },
    getCatalogueList() {
      if (this.routerName === "apiOperation") {
        loadFunction.call(this, "getCatalogueListApi");
      } else if (this.routerName === "targetOperation") {
        loadFunction.call(this, "getCatalogueListTarget");
      } else if (this.routerName === "labelOperation") {
        loadFunction.call(this, "getCatalogueListLabel");
      } else {
        loadFunction.call(this);
      }
      function loadFunction(apiUrl = "getCatalogueList") {
        // 已发布
        this.$api[apiUrl]({ state: "publish" }).then((res) => {
          this.publishTree = res;
          this.treeData = res;
        });
        // 未发布
        this.$api[apiUrl]({ state: "unpublished" }).then((res) => {
          this.unpublishedTree = res;
        });
      }
    },
    // 树状图tab
    handleClick(tab, event) {
      this.$emit("handleClick", tab, event);
    },
    // 节点过滤
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value.toString()) !== -1;
    },
    // 节点点击   --- 树状图节点点击调接口重新查询列表
    handleNodeClick(data, node) {
      let levelMap = {
        1: "firstType",
        2: "secondType",
        3: "thirdType",
      };
      if (data.level == 1) {
        this.secondType = "";
        this.thirdType = "";
      } else if (data.level == 2) {
        this.thirdType = "";
      }
      this[levelMap[data.level]] = data.contentsId;
      if (!data.children || data.children.length === 0) {
        this.queryFromFirstPage();
      }
    },
    // 从第一页开始查询
    queryFromFirstPage() {
      this.currentPage = 1;
      this.queryList();
    },
    // 列表查询  搜索
    queryList() {
      // 表
      let request = {};
      if (this.routerName === "tableOperation") {
        request = {
          page: String(this.currentPage),
          size: String(this.pageSize),
          tableName: this.tableName,
          assetsState: this.activeTab,
          project: this.project,
          deptCode: this.belongSys,
          contentsOne: this.firstType,
          contentsTwo: this.secondType,
          contentsThree: this.thirdType,
        };
        if (this.firstType === "all") {
          request.contentsOne = "";
        }
        if (this.secondType === "all") {
          request.contentsTwo = "";
        }
        if (this.thirdType === "all") {
          request.contentsThree = "";
        }
      } else if (this.routerName === "apiOperation") {
        request = {
          page: String(this.currentPage),
          size: String(this.pageSize),
          driverType: "",
          assetsState: this.activeTab,
          contacts: "",
          deptCode: this.apiDept,
          application: this.application,
          contentsOne: this.firstType,
          contentsTwo: this.secondType,
          contentsThree: this.thirdType,
        };
        if (this.firstType === "all") {
          request.contentsOne = "";
        }
        if (this.secondType === "all") {
          request.contentsTwo = "";
        }
        if (this.thirdType === "all") {
          request.contentsThree = "";
        }
      } else if (this.routerName === "targetOperation") {
        request = {
          page: String(this.currentPage),
          size: String(this.pageSize),
          assetsState: this.activeTab,
          targetCode: this.targetCode,
          classifyOne: this.classifyOne,
          targetName: this.targetName,
          targetType: this.targetType,
          deptCode: this.businessDept,
          contentsOne: this.firstType,
          contentsTwo: this.secondType,
          contentsThree: this.thirdType,
        };
        if (this.firstType === "all") {
          request.contentsOne = "";
        }
        if (this.secondType === "all") {
          request.contentsTwo = "";
        }
        if (this.thirdType === "all") {
          request.contentsThree = "";
        }
      } else if (this.routerName === "labelOperation") {
        request = {
          page: String(this.currentPage),
          size: String(this.pageSize),
          deptCode: this.branchOrInsideCode,
          assetsState: this.activeTab,
          objectCode: this.objectCode,
          classifyName: "",
          fromCode: this.fromCode,
          labelName: this.labelName,
          description: "",
          contentsOne: this.firstType,
          contentsTwo: this.secondType,
          contentsThree: this.thirdType,
        };
        if (this.firstType === "all") {
          request.contentsOne = "";
        }
        if (this.secondType === "all") {
          request.contentsTwo = "";
        }
        if (this.thirdType === "all") {
          request.contentsThree = "";
        }
      }
      this.$emit("queryList", request);
    },
    // 分页
    handleCurrentChange(val) {
      this.currentPage = val;
      this.queryList();
    },
    // 修改
    modify(item) {
      this.$router.push({
        path: "/detailsMod/" + item.assetType,
        query: {
          id: item.id,
        },
      });
    },
    // 下线
    offline(item) {
      let request = {
        id: item.id,
        activeTab: this.activeTab,
        assetsState: this.activeTab === "publish" ? "unpublished" : "publish",
      };
      this.$emit("offline", request);
    },
    // 添加收藏
    addFavorite(item) {
      this.$api
        .addFavorite({
          assetId: item.id,
          assetType: item.assetType,
        })
        .then((res) => {
          this.$message.success("添加收藏成功!");
          this.queryList();
        });
    },
    // 删除收藏
    delFavorite(item) {
      this.$api
        .delFavorite({
          assetId: item.id,
          assetType: item.assetType,
        })
        .then((res) => {
          this.$message.success("取消收藏成功!");
          this.queryList();
        });
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
.operation {
  height: calc(100vh - 130px);
  // height: 100%;
  // margin: 16px;
  display: flex;
  .left {
    width: 260px;
    min-width: 260px;
    padding: 16px;
    background: #fff;
    border-radius: 8px;
    box-sizing: border-box;
    ::v-deep .el-tabs {
      height: auto;
      .el-tabs__header {
        margin: 0;
        .el-tabs__nav-wrap {
          .el-tabs__nav-scroll {
            .el-tabs__nav {
              .el-tabs__item {
                margin-right: 2px;
              }
            }
          }
        }
        .el-tabs__nav-wrap::after {
          background: transparent;
        }
      }
    }

    .tree {
      width: 100%;
      height: 100%;
      overflow: auto;
      // margin-top: 16px;
      ::v-deep .el-input {
        height: 30px;
        .el-input__inner {
          height: 100%;
          line-height: 30px;
          background: #f2f3f5;
          border: none;
        }
      }
      .el-tree {
        margin-top: 8px;
        padding-top: 8px;
        height: calc(100% - 95px);
        border: none;
      }
      ::v-deep .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content {
          color: #61bd53;
          background: #ddf4d5;
      }
    }
  }
  .content {
    flex: 1;
    margin-left: 16px;
    background: #fff;
    padding: 12px;
    border-radius: 8px;
    overflow: auto;
    position: relative;
    // 目录部分
    .catalogue {
      // height: 160px;
      // 一级 二级 四级
      .catalogueType {
        width: 100%;
        height: 20px;
        display: flex;
        align-items: center;
        font-size: 12px;
        color: rgba(32, 34, 36, 1);
        margin-bottom: 4px;
        span {
          width: 80px;
          margin-right: 8px;
          line-height: 20px;
        }
        ::v-deep .el-tabs {
          max-width: 70%;
          overflow: auto;
          height: auto;
          .el-tabs__header {
            margin: 0;
            height: 20px;
            .el-tabs__nav-wrap.is-scrollable {
              padding: 0 40px 0 0;
            }
            .el-tabs__nav-wrap {
              height: 100%;
              // 左箭头
              .el-tabs__nav-prev {
                line-height: 20px;
                right: 20px;
                // color: #e5e5e5;
                color: #202224;
                font-size: 16px;
                .el-icon-arrow-left {
                  position: absolute;
                  right: 0;
                }
                .el-icon-arrow-left::before {
                  content: "";
                }
              }
              // 右箭头
              .el-tabs__nav-next {
                line-height: 16px;
                right: 0;
                // color: #e5e5e5;
                color: #202224;
                font-size: 16px;
                .el-icon-arrow-right::before {
                  content: "";
                }
              }
              // 箭头禁用状态
              .is-disabled {
                color: #202224;
              }
              .el-tabs__nav-scroll {
                height: 100%;
                .el-tabs__nav {
                  height: 100%;
                  .el-tabs__active-bar {
                    display: none;
                  }
                  .el-tabs__item {
                    padding: 2px 6px;
                    height: 100%;
                    line-height: 16px;
                    margin-right: 22px;
                    font-size: 12px;
                  }
                  .el-tabs__item.is-active {
                    background: #61bd53;
                    color: #fff;
                    border-radius: 2px;
                  }
                }
              }
            }
            .el-tabs__nav-wrap::after {
              display: none;
            }
          }
        }
      }
    }
    // 精准筛选
    .filterConditon {
      width: 100%;
      display: flex;
      align-items: center;
      font-size: 12px;
      color: rgba(32, 34, 36, 1);
      margin-bottom: 8px;
      .desc {
        width: 80px;
        margin-right: 8px;
        line-height: 20px;
        white-space: nowrap;
      }
      .filterItem {
        width: auto;
        // height: 30px;
        // flex: 1;
        display: flex;
        justify-content: flex-start;
        align-items: center;
      }
      .filter {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .el-input {
          max-width: 160px;
          font-size: 12px;
        }
        .el-select {
          max-width: 160px;
          font-size: 12px;
        }
        .el-cascader {
          max-width: 160px;
          font-size: 12px;
        }
      }
      span {
        margin-right: 8px;
      }
      .el-input {
        max-width: 180px;
        margin-right: 8px;
      }
      .el-select {
        max-width: 180px;
        margin-right: 8px;
        .el-input {
          margin-right: 0;
          .el-input__inner {
            max-width: 180px;
          }
        }
      }
      .el-cascader {
        max-width: 180px;
        margin-right: 8px;
        .el-input {
          margin-right: 0;
          .el-input__inner {
            max-width: 180px;
          }
        }
      }
      .el-button {
        margin-left: 8px;
        background: #61bd53;
        color: #fff;
        border: none;
      }
    }
    // 列表部分
    .list {
      display: flex;
      flex-wrap: wrap;
      // justify-content: space-between;
      align-content: flex-start;
      height: calc(100% - 225px);
      overflow: auto;
      .listItem {
        width: 32%;
        // height: 165px;
        margin-bottom: 8px;
        padding: 12px;
        border: 1px solid #e8e8e8;
        border-radius: 4px;
        margin-right: 1%;
        .title {
          min-height: 32px;
          // height: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 14px;
          color: #202224;
          margin-bottom: 8px;

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
        }
        .btn {
          width: 100%;
          height: 20px;
          margin-top: 4px;
          display: flex;
          align-items: center;
          div {
            width: 49%;
            text-align: center;
          }
          .line {
            color: #e6ebf5;
          }
          .offline {
            color: #f35957;
          }
          .online {
            color: #409eff;
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
  }
}
</style>