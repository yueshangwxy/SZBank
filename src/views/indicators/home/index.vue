<template>
  <div class="portal-home">
    <div class="portal-header">
      <logo v-if="showLogo" :collapse="true" />
      <div class="portal-header-title">
        <div class="portal-header-title-top">数据资产平台</div>
        <div class="portal-header-title-bottom">Data Asset Platform</div>
      </div>
      <div class="portal-header-search">
        <el-autocomplete
          class="inline-input"
          style="width: 333px"
          size="small"
          prefix-icon="el-icon-search"
          v-model="searchValue"
          :fetch-suggestions="querySearch"
          placeholder="请输入搜索内容"
          :trigger-on-focus="false"
          @select="handleSelect"
          @input="inputChange"
          clearable
          ref="autocomplete"
          @clear="setBlur()"
          popper-class="remoteOption"
        >
          <template slot-scope="scope">
            <el-tooltip effect="light" :content="scope.item.value">
              <span>
                <span v-if="scope.item.assetType === 'table'">
                  <el-tag type="success">表</el-tag>
                </span>
                <span v-if="scope.item.assetType === 'api'">
                  <el-tag type="">API</el-tag>
                </span>
                <span v-if="scope.item.assetType === 'target'">
                  <el-tag type="warning">指标</el-tag>
                </span>
                <span v-if="scope.item.assetType === 'label'">
                  <el-tag type="danger">标签</el-tag>
                </span>
                {{ scope.item.value }}
              </span>
            </el-tooltip>
          </template>
        </el-autocomplete>
        <el-button
          size="small"
          style="
            width: 52px;
            font-size: 14px;
            background: rgba(97, 189, 83, 1);
            border: none;
            padding: 6px 12px 6px 12px;
            color: #fff;
          "
          @click="globalSearch"
          >搜索</el-button
        >
      </div>
      <div class="right-menu">
        <template v-if="device !== 'mobile'">
          <!-- 代码注释掉样式会丢失 -->
          <theme-select
            id="theme"
            class="right-menu-item hover-effect"
          ></theme-select>
        </template>
        <span class="profile-picture"> <i class="el-icon-user"></i></span>
        <el-dropdown
          class="avatar-container right-menu-item hover-effect"
          trigger="click"
          style="margin: 0"
        >
          <div class="avatar-wrapper">
            <el-link style="color: rgba(56, 56, 56, 1); text-align: right">{{
              user.nickName ? user.nickName : "张伟"
            }}</el-link>
          </div>
          <el-dropdown-menu slot="dropdown">
            <span style="display: block" @click="open">
              <el-dropdown-item> 退出登录 </el-dropdown-item>
            </span>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <div class="portal-container">
      <!-- aside -->
      <div class="portal-aside">
        <div
          v-for="item in leftTree"
          :key="item.id"
          class="aside-item company"
          :class="{ highLight: currentName == item.name }"
          @mouseleave="leaveSecondArea"
        >
          <div class="first company-header">
            <img :src="getIconUrl(item.name)" alt="" />
            <span>{{ item.name }}</span>
          </div>
          <div
            class="second"
            :class="
              !currentSecond.id || currentName != item.name
                ? 'second-content'
                : ''
            "
          >
            <div
              class="second-item"
              v-for="(itemSecond, indexSecond) in item.children"
              :class="currentId == itemSecond.id ? 'company-active' : ''"
              :key="itemSecond.id"
            >
              <span class="labelName"
                @mouseenter="
                  selectSecondData(item.name, itemSecond.id, itemSecond)
                "
                @mouseleave="clearSelectSecond"
                @click="selectThird(indexSecond, itemSecond, 2)"
              >
                {{ itemSecond.name }}
                <i class="tri" v-if="currentId == itemSecond.id && thirdList.length > 0"></i>
              </span>
              <div
                class="third company-footer"
                v-if="currentId == itemSecond.id && thirdList.length > 0"
              >
                <div
                  class="third-item"
                  v-for="(itemThird, indexThird) in thirdList"
                  :key="itemThird.id"
                  @click="selectThird(indexThird, itemThird, 3)"
                >
                  {{ itemThird.name }}
                </div>
              </div>
            </div>
            <!-- 第三级 -->
            <!-- <div
              class="third company-footer"
              v-if="currentName === item.name && thirdList.length > 0"
            >
              <div
                class="third-item"
                v-for="(itemThird, indexThird) in thirdList"
                :key="itemThird.id"
                @click="selectThird(indexThird, itemThird, 3)"
              >
                {{ itemThird.name }}
              </div>
            </div> -->
          </div>
          <div class="control" @click="showMore(item)">
            <i v-if="currentName != item.name" class="el-icon-caret-bottom"></i>
            <i v-if="currentName == item.name" class="el-icon-caret-top"></i>
          </div>
        </div>
      </div>
      <!-- content -->
      <div class="portal-content">
        <div class="content-top">
          <div class="top-item top-item-1" @click="goTo(1)">
            <div class="top-item-left">
              <div class="name">表资产数量</div>
              <div class="count">{{ numberFormat(this.assetsList.table) }}</div>
            </div>
            <div class="top-item-right right1"></div>
          </div>
          <div class="top-item top-item-2" @click="goTo(2)">
            <div class="top-item-left">
              <div class="name">API资产数量</div>
              <div class="count">{{ numberFormat(this.assetsList.api) }}</div>
            </div>
            <div class="top-item-right right2"></div>
          </div>
          <div class="top-item top-item-3" @click="goTo(3)">
            <div class="top-item-left">
              <div class="name">指标资产数量</div>
              <div class="count">
                {{ numberFormat(this.assetsList.target) }}
              </div>
            </div>
            <div class="top-item-right right3"></div>
          </div>
          <div class="top-item top-item-4" @click="goTo(4)">
            <div class="top-item-left">
              <div class="name">标签资产数量</div>
              <div class="count">{{ numberFormat(this.assetsList.label) }}</div>
            </div>
            <div class="top-item-right right4"></div>
          </div>
        </div>
        <div class="content-middle">
          <SwiperBox
            :deptList="deptList"
            @getOrganizationData="getOrganizationDcaleRankingData"
          ></SwiperBox>
          <!-- <div class="middle-pre" @click="fnPrev()">
            <i class="el-icon-caret-left"></i>
          </div>
          <div class="middle-dept" :ref="`fixedBox`">
            <div
              class="centerScroll"
              :style="`width:${
                signleWidth * deptList.length
              }px;transform:translate(${scrollResultWidth}px,0);transition:1s;`"
            >
              <div
                class="dept-item"
                v-for="item of deptList"
                :key="item.deptCode"
                @click="getOrganizationDcaleRankingData(item)"
              >
                <div class="dept-item-top">
                  <div class="icon"></div>
                  <el-popover
                    trigger="hover"
                    width="200"
                    ref="reference"
                    class="popover-word"
                  >
                    <span>{{ item.deptName }}</span>
                    <span class="dept-item-word" slot="reference">{{
                      item.deptName
                    }}</span>
                  </el-popover>
                </div>
                <div class="dept-item-bottom">
                  {{ numberFormat(item.num) }}<span>笔</span>
                </div>
              </div>
            </div>
          </div>
          <div class="middle-next" @click="fnNext(activeName)">
            <i class="el-icon-caret-right"></i>
          </div> -->
        </div>
        <div class="content-down">
          <div class="down-left">
            <div class="down-left-top">
              <div class="head"><i class="pre-icon"></i> 资产分类</div>
              <div id="asset-classification"></div>
            </div>
            <div class="down-left-bottom">
              <div class="head"><i class="pre-icon"></i> 业务趋势</div>
              <div id="business-trends"></div>
            </div>
          </div>
          <div class="down-middle">
            <div class="down-middle-top">
              <div class="head">机构资产统计-{{ this.scaleDeptName }}</div>
              <div class="scale">
                <div
                  class="scale-item"
                  v-for="item of scaleList"
                  :key="item.id"
                >
                  <!-- <el-tooltip
                    class="item"
                    effect="dark"
                    :content="item.name"
                    placement="bottom"
                  > -->
                    <div class="name">{{ item.name }}</div>
                  <!-- </el-tooltip> -->
                  <div class="count">
                    <el-tooltip
                      class="item"
                      effect="dark"
                      :content="numberFormat(item.count)"
                      placement="bottom"
                    >
                      <span>{{ numberFormat(item.count) }}</span>
                    </el-tooltip>
                  </div>
                </div>
              </div>
            </div>
            <div id="organization-scale-ranking"></div>
          </div>
          <div class="down-right">
            <div class="down-right-top">
              <div class="head"><i class="pre-icon"></i> 资产数据增长情况</div>
              <div id="data-asset-growth"></div>
            </div>
            <div class="down-right-bottom">
              <div class="head">我的收藏</div>
              <div class="asset">
                <div
                  class="asset-item"
                  v-for="(item, index) of assetList"
                  :key="item.asset_type"
                  @click="jumpCollection(index)"
                >
                  <div class="name">
                    <img src="../../../assets/collect.png" alt="" />
                    {{ item.name }}
                  </div>
                  <div class="count">
                    {{ numberFormat(item.count) }}<span>条</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import Avatar from "@eladmin/assets/images/avatar.png";
import RoleSelect from "@eladmin/components/RoleSelect";
import ThemeSelect from "@portal/components/ThemeSelect";
import Logo from "@portal/layout/components/Sidebar/Logo";
import * as echarts from "echarts";
import SwiperBox from "./swiper-box.vue";

const cnMap = {
  公司银行: {
    name1: "company",
    name2: "com",
  },
  数字银行: {
    name1: "number",
    name2: "num",
  },
  零售银行: {
    name1: "retail",
    name2: "sale",
  },
  金融市场: {
    name1: "finance",
    name2: "fin",
  },
  公共类: {
    name1: "public",
    name2: "pub",
  },
};
export default {
  name: "home",
  components: {
    SwiperBox,
    RoleSelect,
    ThemeSelect,
    Logo,
  },
  data() {
    return {
      leftTree: [],
      Avatar: Avatar,
      dialogVisible: false,
      searchValue: "", // 搜索内容
      // 左侧
      thirdList: [],
      currentSecond: {},
      currentName: "",
      currentId: -1,
      currentFirstDir: "",
      currentSecondDir: "",
      // 资产
      assetsList: [],
      // 部门
      deptList: [], // 部门列表
      // 部门滚动展示
      currentProgressId: "",
      scrollResultWidth: 0, //transform滚动的距离
      signleWidth: 166, //单个流程的宽度
      activeName: 0,
      currentClickNumber: 0,
      noScrollRight: true,
      // 资产分类
      pieData: [],
      // 业务趋势
      lineData: [],
      // 机构规模排行
      barData: [],
      scaleDeptName: "",
      // 分类账户数
      scaleList: [],
      // 我的收藏
      assetList: [],
      // 查询资产数据增长情况多折线图数据
      monthList: [],
      trendStatisticLegendColorList: [],
      trendStatisticDeptList: [],
      trendStatisticSeriesData: [],
      netGoldDeptList: [],
      retailDeptList: [],
      companyDeptList: [],
      mutualGoldList: [],
      screenWidth: document.body.clientWidth,
      screenHeight: document.body.clientHeight,
      timer: null,
      activeName: '',
    };
  },
  mounted() {
    this.searchValue = "";
    const that = this;
    window.onresize = () => {
      window.screenWidth = document.body.clientWidth;
      window.screenHeight = document.body.clientHeight;
      that.screenWidth = window.screenWidth;
      that.screenHeight = window.screenHeight;
    };
  },
  watch: {
    // 窗口宽度发生变化则刷新页面   更新echarts
    screenWidth(oldVal, newVal) {
      if (newVal != this.screenWidth) {
        window.location.reload();
      }
    },
  },
  computed: {
    ...mapGetters(["sidebar", "device", "user", "baseApi"]),
    ...mapState({
      showBreadcrumb: (state) => state.settings.showBreadcrumb,
    }),
    showLogo() {
      return this.$store.state.settings.sidebarLogo;
    },
    show: {
      get() {
        return this.$store.state.settings.showSettings;
      },
      set(val) {
        this.$store.dispatch("settings/changeSetting", {
          key: "showSettings",
          value: val,
        });
      },
    },
  },
  created() {
    // 加载数据
    // 查询资产数量
    this.queryAssetsCount();
    // 查询部门笔数
    this.queryDeptCount();
    // 查询业务趋势折线图数据
    this.queryLineData();
    // 查询资产数据增长情况多折线图数据
    this.queryLinesData(); // mock接口报错
    // 查询我的各个资产收藏
    this.queryCollection();
    // 获取目录树
    this.getLeftTree();
    // this.$nextTick(() => {
    //   setTimeout(() => {
    //     this.initgoRightArrow();
    //   }, 100);
    // });
  },
  methods: {
    setBlur() {
      this.$refs.autocomplete.activated = true;
    },
    // 输入框
    querySearch(queryString, cb) {
      let request = {
        page: 1,
        size: 10,
        keywords: queryString,
        suggest: true,
      };
      setTimeout(() => {
        this.$api.getListByKeywords(request).then((res) => {
          let temp = res.obj;
          let suggestion = [];
          temp.forEach((item) => {
            if (item.targetName) {
              suggestion.push({
                value: item.targetName,
                assetType: item.assetType,
              });
            } else if (item.labelName) {
              suggestion.push({
                value: item.labelName,
                assetType: item.assetType,
              });
            } else if (item.indexName) {
              suggestion.push({
                value: item.indexName,
                assetType: item.assetType,
              });
            } else if (item.tableName) {
              suggestion.push({
                value: item.tableComment
                  ? item.tableComment
                  : "" + item.tableName,
                assetType: item.assetType,
              });
            }
          });
          cb(suggestion);
        });
      }, 1000);
    },
    handleSelect(item) {
      let type;
      if (item.assetType === "table") {
        type = 1;
      } else if (item.assetType === "api") {
        type = 2;
      } else if (item.assetType === "target") {
        type = 3;
      } else if (item.assetType === "label") {
        type = 4;
      }
      this.$router.push({
        path: "/asset/searchPage/index",
        query: {
          data: this.searchValue,
          from: "home",
          type: type,
        },
      });
    },
    // 输入框值改变
    inputChange(value) {
      this.searchValue = value;
      sessionStorage.setItem("searchKeyWords", value);
    },
    globalSearch() {
      this.$router.push({
        path: "/asset/searchPage/index",
        query: {
          data: this.searchValue,
          from: "home",
        },
      });
    },
    open() {
      this.$confirm("确定注销并退出系统吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.logout();
      });
    },
    logout() {
      this.$store.dispatch("LogOut").then(() => {
        location.reload();
      });
    },
    // 数字实现三位分割显示
    numberFormat(value) {
      if (!value) return "0";
      var intPart = Number(value).toFixed(0); // 获取整数部分
      var intPartFormat = intPart
        .toString()
        .replace(/(\d)(?=(?:\d{3})+$)/g, "$1,"); // 将整数部分逢三一断
      var floatPart = ".00"; // 预定义小数部分
      var value2Array = value.toString().split(".");
      // =2表示数据有小数位
      if (value2Array.length === 2) {
        floatPart = value2Array[1].toString(); // 拿到小数部分
        if (floatPart.length === 1) {
          // 补0
          return intPartFormat + "." + floatPart + "0";
        } else {
          return intPartFormat + "." + floatPart;
        }
      } else {
        return intPartFormat;
      }
    },
    // 离开二级目录
    leaveSecondArea() {
      this.thirdList = [];
      this.currentSecond = {};
      this.currentName = "";
      this.currentId = "";
      this.currentFirstDir = "";
      this.currentSecondDir = "";
    },
    getIconUrl(name) {
      let picMap = {
        公司银行: require("../../../assets/建筑.png"),
        // 公司银行: require("../../../assets/company.png"),
        数字银行: require("../../../assets/银行卡.png"),
        零售银行: require("../../../assets/理财.png"),
        金融市场: require("../../../assets/融资2.png"),
        公共类: require("../../../assets/文件柜.png"),
      };
      return picMap[name];
    },
    clearSelectSecond() {
      clearTimeout(this.timer);
    },
    showMore(item) {
      console.log(item);
      this.currentSecond = item;
      this.currentName = item.name;
    },
    selectSecondData(name, id, item) {
      this.timer = setTimeout(() => {
        this.currentId = id;
        this.currentName = name;
        this.currentFirstDir = cnMap[name].name2;
        this.currentSecondDir = id;
        this.currentSecond = item;
        this.thirdList = item.children.length > 0 ? item.children : [];
      }, 300);
    },
    getLeftTree() {
      this.$api.getCatalogueTreeSort().then((res) => {
        this.leftTree = res.data;
        console.log(res);
      });
    },
    // 选择三级目录到检索页
    // 0~3 表数据资产 4~6 指标数据资产 7~9 标签数据资产
    selectThird(index, item, level) {
      if (!this.currentSecond.id) {
        return;
      }
      this.$router.push({
        path: "/asset/searchPage/index",
        query: {
          // data: item.name,
          index: level == 2 ? item.pid : this.currentSecond.pid,
          firstDir: this.currentSecond.pid,
          secondDir: this.currentSecond.contentsId,
          thirdDir: level == 3 ? item.id : "all",
          from: "home",
        },
      });
    },
    // 查询资产数量
    queryAssetsCount() {
      this.$api.queryAssetsCount().then((res) => {
        this.assetsList = res.data;
        this.getPieData();
      });
    },
    // 查询部门笔数
    queryDeptCount() {
      this.$api.queryDeptCount().then((res) => {
        this.deptList = res;
        this.scaleDeptName = res[0].deptName;
        this.queryOrganizationScaleRanking(res[0].deptCode);
      });
    },
    // 查询资产分类饼图数据
    queryPieData() {
      this.$api.queryPieData().then((res) => {
        this.pieData = res.data;
      });
    },
    // 查询业务趋势折线图数据
    queryLineData() {
      this.$api.queryLineData().then((res) => {
        this.lineData = res;
        this.getLineData();
      });
    },
    // 点击部门查询查询机构规模排行数据
    getOrganizationDcaleRankingData(item) {
      this.scaleDeptName = item.deptName;
      this.queryOrganizationScaleRanking(item.deptCode);
    },
    // 根据部门编号查询机构规模排行数据
    queryOrganizationScaleRanking(val) {
      this.$api.queryOrganizationScaleRanking(val).then((res) => {
        this.scaleList = res.accountCount;
        this.barData = res.barData;

        this.getBarData();
      });
    },
    // 查询资产数据增长情况多折线图数据
    async queryLinesData() {
      let res = await this.$api.queryLinesData();
      this.monthList = res.data.monthRange;

      this.trendStatisticDeptList = Object.keys(res.data.series);
      this.trendStatisticLegendColorList.push();
      this.trendStatisticDeptList.forEach((dept) => {
        this.trendStatisticSeriesData.push({
          name: dept,
          type: "line",
          data: res.data.series[dept],
        });
        let r = Math.floor(Math.random() * 256);
        let g = Math.floor(Math.random() * 256);
        let b = Math.floor(Math.random() * 256);
        this.trendStatisticLegendColorList.push(`rgba(${r},${g},${b},1)`);
      });
      this.getLineListData();
    },
    // 查询我的各个资产收藏
    queryCollection() {
      this.$api.queryCollection().then((res) => {
        this.assetList = res.data;
      });
    },
    // 到检索页
    goTo(value) {
      this.$router.push({
        path: "/asset/searchPage/index",
        query: {
          type: value,
          assetType: value,
        },
      });
    },
    //初始化判断是否可以向右滚动
    initgoRightArrow() {
      const currentScrollWidth = this.$refs[`fixedBox`].clientWidth;
      const canNumber = Math.floor(currentScrollWidth / this.signleWidth); //可以放下的个数
      //如果最后一个流程图标已经展示出来，则停止滚动
      if (this.currentClickNumber + canNumber >= this.deptList.length) {
        this.noScrollRight = false;
        return;
      }
    },
    //点击上一个
    fnPrev() {
      //如果右点击的次数大于0，才可以左滚
      if (this.currentClickNumber > 0) {
        this.currentClickNumber -= 1;
        this.noScrollRight = true;
        this.fnScrollWidth("reduce");
      } else {
        return false;
      }
    },
    //点击下一个
    fnNext() {
      const currentScrollWidth = this.$refs[`fixedBox`].clientWidth;
      const canNumber = Math.floor(currentScrollWidth / this.signleWidth); //可以放下的个数
      //如果最后一个流程图标已经展示出来，则停止滚动
      if (this.currentClickNumber + canNumber >= this.deptList.length) {
        return;
      }
      //说明放不下有滚动条
      if (this.deptList.length > canNumber) {
        this.currentClickNumber += 1;
        if (this.currentClickNumber + canNumber >= this.deptList.length) {
          this.noScrollRight = false;
        }
        this.fnScrollWidth("add");
      }
    },
    //translate的宽度
    fnScrollWidth(type) {
      let result = 0;
      if (type === "reduce") {
        result = 166;
      } else if (type === "add") {
        result = -166;
      } else {
        result = 0;
      }
      this.scrollResultWidth += result;
    },
    // 资产分类 环状饼图
    getPieData() {
      var chartDom = document.getElementById("asset-classification");
      var myChart = echarts.init(chartDom);
      var option;
      let dataList = [
        { value: Number(this.assetsList.table), name: "表资产" },
        { value: Number(this.assetsList.api), name: "API资产" },
        { value: Number(this.assetsList.target), name: "指标资产" },
        { value: Number(this.assetsList.label), name: "标签资产" },
      ];
      option = {
        color: [
          "rgba(126, 131, 237, 1)",
          "rgba(66.55499999999999, 188.20274999999998, 221.85, 1)",
          "rgba(229.5, 177.48000000000002, 45.9, 1)",
          "rgba(57.375, 129.09375, 229.5, 1)",
        ],
        tooltip: {
          trigger: "item",
        },
        legend: {
          selectedMode: false,
          top: "15%",
          left: "60%",
          orient: "Vertical",
        },
        series: [
          {
            name: "",
            type: "pie",
            radius: ["60%", "80%"],
            center: ["30%", "50%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "12",
                // fontWeight: "bold",
                color: "rgba(56, 81, 105, 1)",
                formatter: "{c|{c}}笔\n{b|{b}}",
                rich: {
                  b: {
                    color: "rgba(128, 128, 128, 1)",
                    fontSize: "12",
                  },
                  c: {
                    color: "rgba(56, 81, 105, 1)",
                    fontSize: "16",
                  },
                },
              },
            },
            labelLine: {
              show: false,
            },
            data: dataList,
          },
        ],
      };

      option && myChart.setOption(option);
    },
    // 业务趋势 折线图
    getLineData() {
      let monthList = this.lineData.month;
      let tablePerList = this.lineData.percent.table;
      let apiPerList = this.lineData.percent.api;
      let targetPerList = this.lineData.percent.target;
      let labelPerList = this.lineData.percent.label;

      var chartDom = document.getElementById("business-trends");
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        tooltip: {
          trigger: "axis",
        },
        color: [
          "rgba(126, 131, 237, 1)",
          "rgba(66.55499999999999, 188.20274999999998, 221.85, 1)",
          "rgba(229.5, 177.48000000000002, 45.9, 1)",
          "rgba(57.375, 129.09375, 229.5, 1)",
        ],
        grid: {
          left: "10%",
          right: "5%",
          top: "5%",
          bottom: "15%",
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: monthList,
        },
        yAxis: {
          type: "value",
          name: "%",
          axisLabel: {
            formatter: "{value}%",
          },
        },
        series: [
          {
            data: tablePerList,
            type: "line",
            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(126, 131, 237, 1)", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "rgba(242.8977, 247.35, 239.9295, 1)", // 100% 处的颜色
                  },
                ],
                global: false, // 缺省为 false
              },
            },
          },
          {
            data: apiPerList,
            type: "line",
            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color:
                      "rgba(66.55499999999999, 188.20274999999998, 221.85, 1)", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "rgba(242.8977, 247.35, 239.9295, 1)", // 100% 处的颜色
                  },
                ],
                global: false, // 缺省为 false
              },
            },
          },
          {
            data: targetPerList,
            type: "line",
            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(229.5, 177.48000000000002, 45.9, 1)", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "rgba(242.8977, 247.35, 239.9295, 1)", // 100% 处的颜色
                  },
                ],
                global: false, // 缺省为 false
              },
            },
          },
          {
            data: labelPerList,
            type: "line",
            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(57.375, 129.09375, 229.5, 1)", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "rgba(242.8977, 247.35, 239.9295, 1)", // 100% 处的颜色
                  },
                ],
                global: false, // 缺省为 false
              },
            },
          },
        ],
      };

      option && myChart.setOption(option);
    },
    // 机构规模排行 柱状图
    getBarData() {
      let obj = [];
      this.barData.count.forEach((item, key) => {
        obj.push({ count: item, name: this.barData.name[key] });
      });
      // 倒序
      obj.sort((a, b) => {
        return a.count - b.count;
      });
      var nameList = [];
      var countList = [];
      obj.map((item) => {
        nameList.push(item.name);
        countList.push(item.count);
      });
      var chartDom = document.getElementById("organization-scale-ranking");
      var myChart = echarts.init(chartDom);
      var option;
      option = {
        // title: {
        //   text: "World Population",
        // },
        color: ["rgba(139, 201, 73, 1)"],
        tooltip: {
          show: true,
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {
          show: false,
        },
        grid: {
          top: "3%",
          left: "3%",
          right: "24%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "value",
          boundaryGap: [0, 0.01],
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
        },
        yAxis: {
          type: "category",
          data: nameList,
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
          },
        },
        series: [
          {
            type: "bar",
            barWidth: "20",
            data: countList,
            label: {
              show: true,
              position: "right",
              // position: 'insideBottom',
              offset: [0, 0],
            },

            itemStyle: {
              emphasis: {
                barBorderRadius: 10,
              },
              normal: {
                barBorderRadius: 10,
              },
            },
            // backgroundStyle  4.7版本开始支持，目前版本4.2.1
            // showBackground: true,
            // backgroundStyle: {
            //   color: "rgba(242.8977, 247.35, 239.9295, 1)",
            // },
          },
        ],
      };
      option && myChart.setOption(option);
    },
    // 资产数据增长情况 折线图
    getLineListData() {
      var chartDom = document.getElementById("data-asset-growth");
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        color: this.trendStatisticLegendColorList,
        tooltip: {
          show: true,
          trigger: "axis",
          // axisPointer: {
          //   type: "shadow",
          // },
        },
        legend: {
          selectedMode: false,
          show: true,
          legend: {
            data: this.trendStatisticDeptList,
          },
        },
        grid: {
          top: "18%",
          left: "0%",
          right: "0%",
          bottom: "0%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.monthList,
        },
        yAxis: {
          type: "value",
          axisLabel: {
            // formatter: "{value}%",
            formatter: "{value}",
          },
        },
        series: this.trendStatisticSeriesData,
      };

      option && myChart.setOption(option);
    },
    // 跳转我的收藏页面
    jumpCollection(index) {
      let params = "";
      if (index == 0) {
        params = "table";
      } else if (index == 1) {
        params = "api";
      } else if (index == 2) {
        params = "target";
      } else if (index == 3) {
        params = "label";
      }
      this.$router.push({
        path: "/myCollection/index",
        query: {
          activeName: params,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
ul,
li {
  list-style: none;
}
.portal-home {
  background: #fff;
}
// header
.portal-header {
  width: 100%;
  min-width: 1356px;
  height: 142px;
  display: flex;
  position: relative;
  background: url("../../../assets/bg_header1.png") 100% 100% no-repeat;
  // background: linear-gradient(90deg, rgba(120, 171, 67, 1) 0%, rgba(136, 191, 77, 1) 100%);
  .portal-header-title {
    left: 155px;
    top: 19px;
    width: 105px;
    height: 33px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    margin-top: 19px;
    margin-left: 24px;
    .portal-header-title-top {
      left: 0px;
      top: 0px;
      width: 96px;
      height: 22px;
      display: flex;
      color: rgba(255, 255, 255, 1);
      color: rgba(120, 171, 67, 1);
      font-size: 16px;
    }
    .portal-header-title-bottom {
      left: 0px;
      top: 22px;
      width: 105px;
      height: 11px;
      display: flex;
      color: rgba(255, 255, 255, 1);
      color: rgba(120, 171, 67, 1);
      font-size: 8px;
      white-space: nowrap;
      transform: scale(0.65);
      margin-left: -18px;
    }
  }

  .portal-header-search {
    width: 401px;
    height: 32px;
    display: flex;
    justify-content: space-between;
    margin-top: 19px;
    margin-left: 223px;
  }
  ::v-deep .el-autocomplete {
    .el-input__inner {
      border: 1px solid #61bd53;
    }
  }
  .el-input--mini .el-input__inner {
    height: 32px;
  }
  .el-input--mini .el-input__icon {
    height: 28px;
  }
  .right-menu {
    display: flex;
    align-items: center;
    height: 70px;
    position: absolute;
    right: 24px;
    .profile-picture {
      width: 30px;
      height: 30px;
      border-radius: 30px;
      margin-right: 8px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      color: rgba(56, 56, 56, 1);
      font-weight: 700;
    }
    // .el-link::after {
    //   display: none;
    // }
  }
}
// container
.portal-container {
  width: 100%;
  min-width: 1356px;
  padding: 16px;
  display: flex;
  justify-content: flex-start;
  position: absolute;
  top: 70px;
  background: rgba(211, 226, 230, 1);
  // aside
  // 隐藏滚动条
  .portal-aside::-webkit-scrollbar {
    display: none;
  }
  .portal-aside {
    width: 240px;
    height: calc(100vh - 105px);
    min-height: 626px;
    border-radius: 4px;
    padding: 8px;
    overflow-y: auto;
    margin-right: 16px;
    background: rgba(227, 240, 226, 1);
    border: 1px solid rgba(97, 189, 83, 1);

    .aside-item {
      min-height: 114px;
      margin-bottom: 8px;
      padding: 8px;
      border-radius: 8px;
      .first {
        width: 100%;
        height: 20px;
        // padding: 8px;
        display: flex;
        justify-content: flex-start;
        img {
          width: 16px;
          height: 16px;
          line-height: 20px;
        }
        span {
          display: inline-block;
          margin-left: 5px;
          height: 20px;
          line-height: 20px;
          font-size: 14px;
          color: rgba(56, 81, 105, 1);
        }
      }
      .second {
        width: 100%;
        margin-top: 12px;
        // background: red;
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        position: relative;
        .second-item {
          width: 30%;
          margin-right: 3%;
          // height: 17px;
          margin-bottom: 8px;
          color: rgba(64, 97, 59, 1);
          font-size: 12px;
          cursor: pointer;
          .labelName {
            z-index: 10;
            display: inline-block;
            height: 28px;
            position: relative;
            .tri {
              position: absolute;
              width: 0;
              height: 0;
              border-left: 5px solid transparent;
              border-right: 5px solid transparent;
              border-bottom: 5px solid #fff;
              top: 100%;
              left: calc(50% - 2.5px);
            }
          }
        }
        .second-item:nth-child(3n) {
          .third {
            left: -136px;
          }
        }
        .second-item:nth-child(3n-1) {
          .third {
            left: -68px;
          }
        }
        .company-active,
        .number-active,
        .retail-active,
        .finance-active,
        .public-active {
          color: rgba(121, 172, 67, 1);
        }
      }
      .second-content {
        height: 63px;
        overflow: hidden;
      }
      .third {
        width: 100%;
        width: 333%;
        // background: rgba(229, 240, 223, 1);
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        padding: 2px;
        z-index: 999;
        margin-top: 4px;
        position: relative;
        left: 0;
        .third-item {
          width: 47%;
          font-size: 12px;
          color: #999;
          cursor: pointer;
          margin-bottom: 8px;
        }
      }
      .control {
        width: 100%;
        height: 16px;
        background: rgba(184, 217, 180, 1);
        cursor: pointer;
        text-align: center;
        margin-top: 8px;
        i {
          width: 16px;
          height: 16px;
          color: #61bd53;
        }
      }
    }
    .highLight {
      background: #61bd53;
      border-radius: 4px;
      .first {
        span {
          color: #fff;
        }
      }
      .second {
        .second-item {
          color: #fff;
        }
        .labelName:hover {
          // opacity: 0.7;
          color: rgba(255,255,255,.7);
        }
      }
      .third {
        border-radius: 4px;
        padding: 4px;
        background: rgba(83, 173, 69, 1);
        border: 1px solid;
        z-index: 999;
        .third-item {
          color: #fff;
        }
        .third-item:hover {
          opacity: 0.7;
        }
      }
      .control {
        background: rgba(83, 173, 69, 1);
        i {
          color: #fff;
        }
      }
    }
  }
  // content
  .portal-content {
    width: calc(100vw - 288px);
    height: calc(100vh - 105px);
    // background: grey;
    min-width: 1076px;
    min-height: 626px;
    .pre-icon {
      display: inline-block;
      vertical-align: middle;
      width: 12px;
      height: 12px;
      box-sizing: border-box;
      border: 3px solid rgba(97, 189, 83, 1);
      background: rgba(141, 224, 128, 1);
      border-radius: 2px;
    }
    .content-top {
      width: 100%;
      height: 86px;
      // margin-bottom: 8px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      .top-item {
        width: 25%;
        height: 88px;
        background: #fff;
        border-radius: 4px;
        margin: 0 8px;
        display: flex;
        justify-content: space-between;
        cursor: pointer;
        .top-item-left {
          margin-left: 26px;
          margin-top: 16px;
          .name {
            color: rgba(128, 128, 128, 1);
            color: #fff;
            font-size: 14px;
            height: 20px;
            line-height: 20px;
            margin-bottom: 8px;
          }
          .count {
            color: rgba(56, 81, 105, 1);
            color: #fff;
            font-size: 24px;
            height: 28px;
            line-height: 28px;
          }
        }
        .top-item-right {
          width: 146px;
          height: 88px;
          border-radius: 0 0 4px 0;
        }
        .right1 {
          background: url("../../../assets/bg_table.png") 100% 100% no-repeat;
        }

        .right2 {
          background: url("../../../assets/bg_api.png") 100% 100% no-repeat;
        }

        .right3 {
          background: url("../../../assets/bg_index.png") 100% 100% no-repeat;
        }

        .right4 {
          background: url("../../../assets/bg_tag.png") 100% 100% no-repeat;
        }
      }
      .top-item-1 {
        margin-left: 0;
        background: rgba(126, 131, 237, 1);
      }
      .top-item-2 {
        background: rgba(64, 172, 201, 1);
      }
      .top-item-3 {
        background: rgba(227, 178, 54, 1);
      }
      .top-item-4 {
        margin-right: 0;
        background: rgba(78, 141, 230, 1);
      }
    }
    .content-middle {
      width: 100%;
      height: 112px;
      padding: 5px 0px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-radius: 4px;
      .middle-pre {
        width: 21px;
        height: 63px;
        background: rgba(249.9, 249.9, 249.9, 1);
        border-radius: 4px;
        cursor: pointer;
        z-index: 999;
        i {
          font-size: 14px;
          text-align: center;
          line-height: 63px;
          color: rgba(204, 204, 204, 1);
        }
      }
      .middle-dept {
        // width: calc(100% - 74px);
        // white-space: nowrap;
        // overflow-x: auto;
        flex: 1;
        overflow: hidden;
        .centerScroll {
          white-space: nowrap;
          .dept-item {
            width: 150px;
            height: 63px;
            display: inline-block;
            background: rgba(249.9, 249.9, 249.9, 1);
            margin-right: 16px;
            border-radius: 4px;
            padding: 8px;
            cursor: pointer;
            .dept-item-top {
              width: 100%;
              height: 20px;
              line-height: 20px;
              color: rgba(0, 0, 0, 0.5);
              font-size: 14px;
              display: flex;
              justify-content: flex-start;
              text-align: center;
              margin-bottom: 8px;
              .icon {
                width: 10px;
                height: 10px;
                background: rgba(
                  121.00032724875,
                  171.9975,
                  66.99302624999999,
                  1
                );
                margin-right: 5px;
                margin-top: 5px;
              }
              .popover-word {
                flex: 1;
                overflow: hidden;
                text-overflow: ellipsis;
                text-align: left;
              }
            }
            .dept-item-bottom {
              color: rgba(56, 81, 105, 1);
              font-size: 16px;
              height: 19px;
              span {
                color: rgba(56, 81, 105, 1);
                font-size: 12px;
                height: 17px;
                margin-left: 10px;
              }
            }
          }
          .dept-item:first-child {
            margin-left: 16px;
          }
        }
      }
      .middle-next {
        width: 21px;
        height: 63px;
        background: rgba(249.9, 249.9, 249.9, 1);
        border-radius: 4px;
        cursor: pointer;
        z-index: 999;
        i {
          font-size: 14px;
          text-align: center;
          line-height: 63px;
          color: rgba(204, 204, 204, 1);
        }
      }
    }
    .content-down {
      width: 100%;
      height: calc(100vh - 300px);
      min-height: 432px;
      display: flex;
      justify-content: space-between;
      .down-left {
        width: 48%;
        // height: 100%;
        height: calc(100vh - 300px);
        min-height: 432px;
        background: #fff;
        border-radius: 4px;
        padding: 20px 18px;
        background: rgba(247, 250, 245, 1);
        border: 1px solid rgba(97, 189, 83, 1);
        .down-left-top {
          width: 100%;
          height: 50%;
          // height: 175px;
          .head {
            width: 100%;
            height: 20px;
            color: rgba(32, 34, 36, 1);
            font-size: 14px;
            line-height: 20px;
          }
          #asset-classification {
            width: 100%;
            // height: calc(100vh - 700px);
            height: calc(100% - 20px);
            min-height: 140px;
          }
        }
        .down-left-bottom {
          width: 100%;
          height: 50%;
          // height: 175px;
          .head {
            width: 100%;
            height: 20px;
            color: rgba(32, 34, 36, 1);
            font-size: 14px;
            line-height: 20px;
            margin-bottom: 6px;
          }
          #business-trends {
            width: 100%;
            // height: calc(100vh - 700px);
            height: calc(100% - 20px);
            min-height: 140px;
          }
        }
      }
      .down-middle {
        width: 25%;
        // height: 100%;
        height: calc(100vh - 300px);
        min-height: 432px;
        background: #fff;
        border-radius: 4px;
        padding: 0;
        .down-middle-top {
          height: 140px;
          padding: 16px;
          border-radius: 4px;
          background: url(../../../assets/bg_jg.png) no-repeat center 0;
          background-size: cover;
        }
        .head {
          width: 100%;
          height: 20px;
          color: rgba(32, 34, 36, 1);
          color: #fff;
          font-size: 14px;
          line-height: 20px;
        }
        .scale {
          width: 100%;
          height: 70px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 16px;
          overflow: auto;
          .scale-item {
            width: 70px;
            height: 58px;
            background: rgba(247, 250, 245, 1);
            // padding: 16px;
            padding: 10px 14px;
            text-align: center;
            border-radius: 4px;
            margin-right: 3px;
            .name {
              // height: 17px;
              line-height: 17px;
              color: rgba(78, 141, 230, 1);
              font-size: 12px;
              margin-bottom: 7px;
              width: 100%;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
            }
            .count {
              height: 17px;
              line-height: 17px;
              color: rgba(56, 81, 105, 1);
              font-size: 12px;
              width: 100%;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
              span {
                color: #202224;
                font-weight: 700;
              }
            }
          }
        }
        #organization-scale-ranking {
          width: 100%;
          // height: 232px;
          height: calc(100vh - 500px);
          min-height: 232px;
          margin-top: 24px;
        }
      }
      .down-right {
        width: 25%;
        // height: 100%;
        height: calc(100vh - 300px);
        min-height: 432px;
        .down-right-top {
          width: 100%;
          // height: 258px;
          height: calc(100vh - 433px);
          min-height: 298px;
          padding: 10px 13px;
          border-radius: 4px;
          margin-bottom: 8px;
          background: rgba(247, 250, 245, 1);
          border: 1px solid rgba(97, 189, 83, 1);
          .head {
            width: 100%;
            height: 20px;
            color: rgba(32, 34, 36, 1);
            font-size: 14px;
            line-height: 20px;
            margin-bottom: 6px;
          }
          #data-asset-growth {
            width: 100%;
            height: calc(100vh - 500px);
            min-height: 231px;
          }
        }
        .down-right-bottom {
          width: 100%;
          height: 126px;
          padding: 10px 13px;
          border-radius: 4px;
          background: url(../../../assets/bg_shc.png) no-repeat;
          background-size: 100% 100%;
          .head {
            width: 100%;
            height: 20px;
            color: rgba(32, 34, 36, 1);
            color: #fff;
            font-size: 14px;
            line-height: 20px;
            margin-bottom: 6px;
          }
          .asset {
            width: 100%;
            height: 64px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .asset-item {
              width: 74px;
              height: 64px;
              background: rgba(255, 248, 232, 1);
              padding: 10px 0;
              font-size: 12px;
              color: rgba(121, 172, 67, 1);
              text-align: center;
              cursor: pointer;
              border-radius: 4px;
              .name {
                height: 17px;
                line-height: 17px;
                margin-bottom: 7px;
                color: rgba(204, 157, 37, 1);
              }
              .count {
                color: rgba(56, 81, 105, 1);
                font-weight: 700;
                span {
                  // color: rgba(121, 172, 67, 1);
                  font-weight: 400;
                  margin-left: 2px;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>