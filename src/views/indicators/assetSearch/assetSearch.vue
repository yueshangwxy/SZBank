<template>
  <div class="searchIndex">
    <div class="left">
      <el-tabs v-model="activeTab" v-if="assetType === 'table'">
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
          highlight-current
          node-key="id"
          :data="treeData"
          :default-expanded-keys="expandedKeys"
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
        <div class="filterBox">
          <div class="catalogueType">
            <span>资产类型:</span>
            <el-tabs v-model="assetType" @tab-click="handleClick">
              <el-tab-pane label="全部" name="all"></el-tab-pane>
              <el-tab-pane label="表" name="table"></el-tab-pane>
              <el-tab-pane label="API" name="api"></el-tab-pane>
              <el-tab-pane label="指标" name="target"></el-tab-pane>
              <el-tab-pane label="标签" name="label"></el-tab-pane>
            </el-tabs>
          </div>
          <div class="catalogueType">
            <span>一级目录:</span>
            <el-tabs v-model="firstType" v-if="!firstList.length">
              <el-tab-pane label="全部" name="all"></el-tab-pane>
            </el-tabs>
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
            <span class="desc" v-show="this.assetType !== 'all'"
              >筛选条件:</span
            >
            <!-- table -->
            <div class="filterItem" v-if="assetType === 'table'">
              <el-cascader
                v-model="deptCode"
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
                v-model="table.project"
                placeholder="请输入存储项目名称"
                clearable
              ></el-input>
            </div>
            <!-- API -->
            <div class="filterItem" v-if="assetType === 'api'">
              <el-select
                v-model="api.application"
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
                v-model="deptCode"
                :options="deptTreeList"
                :show-all-levels="false"
                :props="{
                  value: 'id',
                  label: 'name',
                  children: 'children',
                  emitPath: false,
                  checkStrictly: true,
                }"
                placeholder="属主部门"
                clearable
              ></el-cascader>
            </div>
            <!-- 指标 -->
            <div class="filter" v-if="assetType === 'target'">
              <el-input
                v-model="target.targetCode"
                placeholder="指标编码"
                clearable
              ></el-input>
              <el-input
                v-model="target.targetName"
                placeholder="指标名称"
                clearable
              ></el-input>
              <el-select
                v-model="target.targetType"
                placeholder="指标类型"
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
                v-model="deptCode"
                :options="deptTreeList"
                :show-all-levels="false"
                :props="{
                  value: 'id',
                  label: 'name',
                  children: 'children',
                  emitPath: false,
                  checkStrictly: true,
                }"
                placeholder="属主部门"
                clearable
              ></el-cascader>
              <el-select
                v-model="target.classifyOne"
                placeholder="一级分类"
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
            <div class="filter" v-if="assetType === 'label'">
              <el-select
                v-model="label.classifyName"
                placeholder="标签分类"
                clearable
              >
                <el-option
                  v-for="item in classifyNameList"
                  :key="item"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
              <el-select
                v-model="label.fromCode"
                placeholder="标签来源"
                clearable
              >
                <el-option
                  v-for="item in fromCodeList"
                  :key="item"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
              <el-cascader
                v-model="deptCode"
                :options="deptTreeList"
                :show-all-levels="false"
                :props="{
                  value: 'id',
                  label: 'name',
                  children: 'children',
                  emitPath: false,
                  checkStrictly: true,
                }"
                placeholder="属主部门"
                clearable
              ></el-cascader>
            </div>
            <el-button v-show="this.assetType !== 'all'" @click="queryList()"
              >确认</el-button
            >
          </div>
        </div>
        <div class="btnBox" v-if="assetType === 'all' || assetType === 'table'">
          <el-button
            type="primary"
            icon="el-icon-shopping-cart-full"
            @click="jumpShopCar()"
            ></el-button
          >
          <el-button
            type="warning"
            icon="el-icon-star-off"
            @click="jumpCollection()"
            ></el-button
          >
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
            <div class="title-left">
              <el-tag
                class="title-left-tag"
                :type="getAssetTypeInfo(item.assetType)['tagColor']"
                >{{ getAssetTypeInfo(item.assetType)["tagName"] }}</el-tag
              >
              <div v-if="item.assetType === 'table'" class="table-title">
                <el-popover
                  placement="top-start"
                  width="200"
                  trigger="hover"
                  :content="item.tableComment">
                  <div slot="reference">
                    {{ item.tableComment }}
                  </div>
                </el-popover>
                <el-popover
                  placement="top-start"
                  width="200"
                  trigger="hover"
                  :content="item.tableName">
                  <div slot="reference" style="font-size: 12px;line-height: 14px;">
                    {{ item.tableName }}
                  </div>
                </el-popover>
              </div>
              <el-popover
                v-else
                placement="top-start"
                width="200"
                trigger="hover"
                :content="item[getAssetTypeInfo(item.assetType)['codeName']]">
                <div slot="reference">
                  {{ item[getAssetTypeInfo(item.assetType)['codeName']] }}
                </div>
              </el-popover>
            </div>
            <i
              class="el-icon-star-off"
              v-if="!item.favorite"
              @click="addFavorite(item)"
            ></i>
            <i
              class="el-icon-star-on"
              v-else-if="item.favorite"
              @click="delFavorite(item)"
            ></i>
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
              <span>项目描述类型：
                <el-popover
                  placement="top-start"
                  width="200"
                  trigger="hover"
                  :content="item.tableComment">
                  <span slot="reference">
                    {{ item.tableComment }}
                  </span>
                </el-popover>
              </span>
            </p>
            <div class="btn">
              <div>
                <el-button type="text" @click="previewData(item)"
                  >数据预览</el-button
                >
              </div>
              <span class="line">|</span>
              <div>
                <el-button type="text" @click="viewDetails(item)"
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
          <div class="detail" v-else-if="item.assetType === 'api'">
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
                <el-button type="text" @click="viewDetails(item)"
                  >详情查看</el-button
                >
              </div>
              <span class="line">|</span>
              <div>
                <el-button v-if="item.applyStatus == 1" type="text" disabled
                  >已通过</el-button
                >
                <el-button
                  v-else-if="item.applyStatus == 2"
                  type="text"
                  disabled
                  >申请中</el-button
                >
                <el-button v-else type="text" @click="applyForAccess(item)"
                  >申请访问</el-button
                >
              </div>
            </div>
          </div>
          <div class="detail" v-else-if="item.assetType === 'target'">
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
            <div class="btn">
              <div>
                <el-button type="text" @click="viewDetails(item)"
                  >详情查看</el-button
                >
              </div>
            </div>
          </div>
          <div class="detail" v-else-if="item.assetType === 'label'">
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
            <div class="btn">
              <div>
                <el-button type="text" @click="viewDetails(item)"
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
      <!-- 选择生效日期弹窗 -->
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 首页传来的关键字
      keywords: "",
      tabList: [
        { label: "全部表", name: "all" },
        { label: "我的表", name: "mine" },
      ],
      activeTab: "all",
      // 树形控件
      filterText: "",
      defaultProps: {
        id: "contentsId",
        children: "children",
        label: "name",
      },
      index: 2,
      treeData: [],
      treeDataAll: [],
      treeDataMine: [],
      // 目录列表
      catalogueList: [],
      // 资产类型
      assetType: "all",
      // 一级目录
      firstType: "all",
      firstList: [],
      // 二级目录
      secondType: "all",
      secondList: [],
      // 三级目录
      thirdType: "all",
      thirdList: [],
      // 精准筛选
      // 属主部门
      deptCode: "",
      table: {
        project: "",
      },
      api: {
        application: "",
      },
      target: {
        targetName: "",
        targetCode: "",
        targetType: "",
        classifyOne: "",
      },
      label: {
        classifyName: "",
        fromCode: "",
      },
      // 列表部分
      tableData: [],
      // 收藏
      save: true,
      // 分页
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
        tableId: "",
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

      nodeData: [],
      // 应用列表
      appList: [],
      // 指标类型列表
      targetTypeList: [],
      // 一级分类列表
      classifyOneList: [],
      // 部门树
      deptTreeList: [],
      // 标签下拉框 标签分类 标签来源
      classifyNameList: [],
      fromCodeList: [],
      dataErrorMsg: "",
    };
  },
  computed: {
    expandedKeys() {
      return [this.firstType, this.secondType, this.thirdType];
    },
  },
  watch: {
    $route(to, from) {
      if (from.name.indexOf("详情") < 0) {
        this.getRouteData();
      }
    },
    save(val) {
      // console.log(val);
    },
    // 节点过滤
    filterText(val) {
      this.$refs.tree.filter(val);
    },
    // 树状图tab
    activeTab(val) {
      if (val === "all") {
        this.treeData = this.treeDataAll;
        this.currentPage = 1;
        this.getListByKeywords();
      } else {
        this.treeData = this.treeDataMine;
        this.currentPage = 1;
        this.getSelfTablePage();
      }
    },
    // 目录联动
    // 资产类型
    assetType(val) {
      // this.firstType = "all";
      if (val === "all") {
        this.thirdList = [];
        // this.firstType = "all";
        this.treeData = this.treeDataAll;
      } else if (val === "table") {
        // this.firstType = "all";
        this.activeTab = "all";
        this.treeData = this.treeDataAll;
      } else if (val === "api") {
        // this.firstType = "all";
        this.treeData = this.treeDataAll;
      } else if (val === "target") {
        // this.firstType = "all";
        this.treeData = this.treeDataAll;
      } else if (val === "label") {
        // this.firstType = "all";
        this.treeData = this.treeDataAll;
      }
      this.queryList();
    },
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
          if (
            this.$route.query.secondDir &&
            val === this.$route.query.firstDir
          ) {
            this.secondType = this.$route.query.secondDir;
          } else {
            this.secondType = "all";
          }
        }
      }
      this.expandedAllTree();
      this.queryList();
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
          if (
            this.$route.query.thirdDir &&
            val === this.$route.query.secondDir
          ) {
            this.thirdType = this.$route.query.thirdDir;
          } else {
            this.thirdType = "all";
          }
        }
      }
      this.expandedAllTree();
      this.queryList();
      this.$refs.tree.setCurrentKey(val);
    },
    // 三级
    thirdType(val) {
      this.queryList();
      this.$refs.tree.setCurrentKey(val);
    },
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
    // let obj = {
    //   table: 1,
    //   api: 2,
    //   target: 3,
    //   label: 4,
    // };
    // this.$route.query.assetType = obj[this.assetType];
    // this.$route.query.index = obj[this.assetType];
    // this.$route.query.firstDir = this.firstType;
    // this.$route.query.secondDir = this.secondType;
    // this.$route.query.thirdDir = this.thirdType;
    // console.log(this.$route);
    next();
  },
  created() {
    this.$store.commit("SET_KEEPALIVE", true);
    // 树状图初始数据
    this.$api.getAllCatalogueList({}).then((res) => {
      this.treeData = res.data;
      this.treeDataAll = res.data;
    });
    // 我的表目录树
    this.$api.getAuthTree({}).then((res) => {
      this.treeDataMine = res.data;
    });
    // 全部目录
    this.$api.getAllCatalogueList({}).then((res) => {
      this.firstList = res.data;
      this.firstList.unshift({
        contentsId: "all",
        name: "全部",
        children: [],
      });
      // 首页跳转
      this.getRouteData();
    });
    // 查询所有应用   appList
    // 查询指标类型, 一级分类
    // 查询部门树
    this.$api.qryOpenApp({}).then((res) => {
      this.appList = res.data;
    });
    this.$api.getTargetSelect({}).then((res) => {
      this.targetTypeList = res.data.targetTypeList;
      this.classifyOneList = res.data.classifyOneList;
    });
    this.$api.getDeptTree({}).then((res) => {
      this.deptTreeList = [res.data];
    });
    // 标签下拉框   标签分类  标签来源
    this.$api.getLabelSelect({}).then((res) => {
      this.classifyNameList = res.data.classifyNameList;
      this.fromCodeList = res.data.fromCodeList;
    });
  },
  mounted() {
    if (window.history && window.history.pushState) {
      history.pushState(null, null, document.URL); //这里有没有都无所谓，最好是有以防万一
      window.addEventListener("popstate", this.goBack, false); // 回退时执行goback方法
    }
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
    // 回退到当前页
    goBack() {
      // if (location.href.indexOf("/searchPage") > -1) {
      //   location.reload();
      // } else {
      // this.$router.replace();
      // }
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
    transInvalidTime(time) {
      if (time && time.includes("9999")) {
        return "永久";
      } else {
        return time;
      }
    },
    expandedAllTree() {
      for (var i = 0; i < this.$refs.tree.store._getAllNodes().length; i++) {
        if (this.$refs.tree.store._getAllNodes()[i].id !== 1) {
          this.$refs.tree.store._getAllNodes()[i].expanded = false;
        }
      }
    },
    getRouteData() {
      if (this.$route.query.assetType) {
        if (this.$route.query.assetType == 1) {
          this.assetType = "table";
        } else if (this.$route.query.assetType == 2) {
          this.assetType = "api";
        } else if (this.$route.query.assetType == 3) {
          this.assetType = "target";
        } else if (this.$route.query.assetType == 4) {
          this.assetType = "label";
        }
        delete this.$route.query.type;
      }
      // 从首页搜索
      if (this.$route.query.from == "home") {
        this.currentPage = 1;
        var index = this.$route.query.index;
        if (index != undefined) {
          this.assetType = "all";
          this.firstType = this.$route.query.firstDir;
          this.secondType = this.$route.query.secondDir;
          this.thirdType = this.$route.query.thirdDir;
        }
      }
      // 初始化列表
      if (this.assetType === "table" && this.activeTab === "mine") {
        this.getSelfTablePage();
      } else {
        // 其他搜索按钮点击
        this.getListByKeywords();
      }
    },
    // 搜索按钮点击
    queryList() {
      // 我的表搜索按钮点击
      this.currentPage = 1;
      if (this.assetType === "table" && this.activeTab === "mine") {
        this.getSelfTablePage();
      } else {
        // 其他搜索按钮点击
        this.getListByKeywords();
      }
    },
    // 资产类型切换
    handleClick(tab, event) {
      this.table = {};
      this.api = {};
      this.target = {};
      this.label = {};
      this.deptCode = "";
    },
    // 节点过滤
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value.toString()) !== -1;
    },
    // 节点点击   --- 树状图节点点击调接口重新查询列表
    handleNodeClick(data, node) {
      console.log(node);
      // 最后一级节点点击
      if (!data.children || data.children.length == 0) {
        let p = new Promise((resolve, reject) => {
          this.firstType = node.parent.parent.data.contentsId;
          resolve();
        });
        p.then(() => {
          this.secondType = node.parent.data.contentsId;
        })
          .then(() => {
            this.thirdType = data.contentsId;
          })
          .then(() => {
            this.queryList();
          });
      } else if (node.expanded) {
        if (data.level == 1) {
          this.firstType = data.contentsId;
          this.secondType = "all";
          this.thirdType = "all";
        } else if (data.level == 2) {
          this.secondType = data.contentsId;
          this.thirdType = "all";
        }
        this.queryList();
      }
    },
    // 我的表查询
    getSelfTablePage() {
      this.keywords = sessionStorage.getItem("searchKeyWords")
        ? sessionStorage.getItem("searchKeyWords")
        : "";
      const request = {
        contentsOne: this.firstType,
        contentsTwo: this.secondType,
        contentsThree: this.thirdType,
        keywords: this.keywords,
        deptCode: this.deptCode,
        project: this.table.project,
        page: this.currentPage,
        size: this.pageSize,
      };
      this.$api.getSelfTablePage(request).then((res) => {
        this.total = res.data.total;
        this.tableData = res.data.records;
      });
    },
    // 列表查询
    getListByKeywords() {
      this.keywords = sessionStorage.getItem("searchKeyWords")
        ? sessionStorage.getItem("searchKeyWords")
        : "";
      let request = {
        keywords: this.keywords,
        page: this.currentPage,
        size: this.pageSize,
        assetType: this.assetType,
        contentsOne: this.firstType,
        contentsTwo: this.secondType,
        contentsThree: this.thirdType,
        table: this.table,
        api: this.api,
        target: this.target,
        label: this.label,
        deptCode: this.deptCode,
      };
      this.$api.getListByKeywords(request).then((res) => {
        this.total = res.total;
        if (this.assetType === "table") {
          this.tableData = res.tableList;
        } else if (this.assetType === "api") {
          this.tableData = res.apiList;
        } else if (this.assetType === "target") {
          this.tableData = res.targetList;
        } else if (this.assetType === "label") {
          this.tableData = res.labelList;
        } else {
          this.tableData = res.obj;
        }
      });
    },
    // 分页
    handleCurrentChange(val) {
      this.currentPage = val;
      if (this.assetType === "table" && this.activeTab === "mine") {
        this.getSelfTablePage();
      } else {
        this.getListByKeywords();
      }
    },
    // 我的购物车
    jumpShopCar() {
      this.$router.push({
        name: "myShopCar",
      });
    },
    // 我的收藏
    jumpCollection() {
      this.$router.push({
        name: "myCollection",
        // path: "asset/myCollection/index",
      });
    },
    // 详情查看
    viewDetails(item) {
      delete this.$route.query.assetType;
      this.$router.push({
        path: "/detailsView/" + item.assetType,
        query: {
          id: item.id,
        },
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
    // 添加收藏
    addFavorite(item) {
      this.$api
        .addFavorite({
          assetId: item.id,
          assetType: item.assetType,
        })
        .then((res) => {
          if (res.code == 200 || res.code == 0) {
            this.$message.success(res.msg);
            if (this.assetType === "table" && this.activeTab === "mine") {
              this.getSelfTablePage();
            } else {
              this.getListByKeywords();
            }
          } else {
            this.$message.error(res.msg);
          }
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
          if (res.code == 200 || res.code == 0) {
            this.$message.success(res.msg);
            if (this.assetType === "table" && this.activeTab === "mine") {
              this.getSelfTablePage();
            } else {
              this.getListByKeywords();
            }
          } else {
            this.$message.error(res.msg);
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
            this.getListByKeywords();
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
            if (this.assetType === "table" && this.activeTab === "mine") {
              this.getSelfTablePage();
            } else {
              this.getListByKeywords();
            }
          } else {
            this.$message.error(res.msg);
          }
        });
    },
    // 生效日期弹窗确定
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
    // 失效时间转换
    transInvalidTime(time) {
      let invalidTime = time ? (time.indexOf("9999") > -1 ? "永久" : time) : "";
      return invalidTime;
    },
  },
};
</script>

<style lang="scss" scoped>
.searchIndex {
  height: calc(100vh - 130px);
  margin: 0 16px 16px 16px;
  display: flex;
  overflow: auto;
  @import "./style.scss";
}
.dataErrorMsg {
  padding: 60px 0px;
  text-align: center;
}
/deep/.el-table__body-wrapper {
  /deep/.el-table__body-wrapper::-webkit-scrollbar {
    height: 10px !important;
  }
}
</style>
<style>
.el-popper {
  padding: 10px;
}
</style>