<template>
  <div class="portal-home" style="background: rgba(245, 245, 245, 1)">
    <!-- 头部 -->
    <div class="portal-header">
      <div class="portal-logo" style="height: 70px; line-height: 70px">
        <router-link
          key="collapse"
          class="sidebar-logo-link"
          to="/portalHomeIndex"
        >
          <img
            :src="logo"
            width="158px"
            height="35.5px"
            class="sidebar-logo"
            style="margin-left: 24px; vertical-align: middle"
          />
        </router-link>
      </div>
      <div class="portal-header-title">
        <div class="portal-header-title-top">统一数据门户</div>
        <div class="portal-header-title-bottom">Data Facade System</div>
      </div>
      <!-- <div class="portal-header-desc">
                <h1>统一数据门户</h1>
                <p>满足银行内部资产管理需求，对分散在各系统的数据结构、数据含义进行集中采集后进行目录化管理，向全行业务人员实现共享共用共治。</p>
            </div> -->
      <div class="right-menu">
        <template v-if="device !== 'mobile'">
          <theme-select
            id="theme"
            class="right-menu-item hover-effect"
          ></theme-select>
        </template>
        <div style="margin-right: 32px">
          <router-link to="/myWorkSheet" style="margin-right: 8px">
            <el-tooltip
              content="我的工单">
              <i class="el-icon-tickets"></i>
            </el-tooltip>
          </router-link>
          <router-link to="/manager" v-if="isSuperLogin2">
            <el-tooltip
              content="管理入口">
              <i class="el-icon-setting"></i>
            </el-tooltip>
          </router-link>
        </div>
        <el-dropdown
          class="avatar-container right-menu-item hover-effect"
          trigger="click"
          style="margin: 0"
        >
          <div class="avatar-wrapper">
            <el-link style="color: #ffffff; text-align: right">
              <span class="profile-picture"><i class="el-icon-user"></i></span>
              {{ user.nickName || "张伟" }}
            </el-link>
          </div>
          <el-dropdown-menu slot="dropdown">
            <span style="display: block" @click="open">
              <el-dropdown-item> 退出登录 </el-dropdown-item>
            </span>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <!-- 内容部分 -->
    <div class="portal-container">
      <!-- 版心 -->
      <div class="portal-container-content">
        <!-- tabs -->
        <el-tabs v-model="activeTab">
          <el-tab-pane
            v-for="item in tabList"
            :key="item.name"
            :label="item.label"
            :name="item.name"
          ></el-tab-pane>
        </el-tabs>
        <!-- radio -->
        <div
          class="radioBox"
          v-if="activeTab === 'asset' || activeTab === 'laboratory'"
        >
          <el-radio-group v-model="radio">
            <el-radio :label="0">我的申请</el-radio>
            <el-radio :label="1">待我审批</el-radio>
            <el-radio :label="2">我已审批</el-radio>
          </el-radio-group>
        </div>
        <!-- 筛选条件 -->
        <div class="conditions">
<!--          <el-input-->
<!--            v-if="activeTab === 'asset'"-->
<!--            v-model="searchInput"-->
<!--            placeholder="申请名称"-->
<!--            clearable-->
<!--          ></el-input>-->
          <el-cascader
            v-if="activeTab === 'asset'"
            v-model="dept"
            :options="deptTreeList"
            :show-all-levels="false"
            :props="{
              value: 'id',
              label: 'name',
              children: 'children',
              emitPath: false,
              checkStrictly: true,
            }"
            placeholder="申请部门"
            clearable
          ></el-cascader>
          <el-input
            v-if="activeTab === 'service'"
            v-model="apiAddress"
            placeholder="api接口地址"
            clearable
          ></el-input>
          <el-input
            v-if="activeTab === 'service'"
            v-model="apiName"
            placeholder="api名称"
            clearable
          ></el-input>
          <!-- 流程状态 -->
          <el-select
            v-model="status"
            placeholder="请选择状态"
            clearable
            v-if="
              radio == 0 &&
              (activeTab === 'asset' || activeTab === 'laboratory')
            "
          >
            <el-option label="待审批" value="0"></el-option>
            <el-option label="已通过" value="1"></el-option>
            <el-option label="已拒绝" value="2"></el-option>
          </el-select>
          <!-- 服务状态 -->
          <el-select
            v-model="serviceStatus"
            placeholder="请选择状态"
            clearable
            v-if="activeTab === 'service'"
          >
            <el-option label="通过" value="1"></el-option>
            <el-option label="申请中" value="2"></el-option>
            <el-option label="拒绝" value="3"></el-option>
          </el-select>
          <!-- 实验室状态 -->

          <!-- 日期选择器 -->
          <el-date-picker
            v-model="dateValue"
            type="daterange"
            range-separator="至"
            start-placeholder="提交申请开始日期"
            end-placeholder="提交申请结束日期"
          >
          </el-date-picker>
          <!-- <el-date-picker
                            v-model="date"
                            type="date"
                            placeholder="申请时间">
                        </el-date-picker> -->
          <el-button class="searchButton" @click="initList()">搜索</el-button>
        </div>
        <!-- 表格 -->
        <div class="table">
          <el-table height="calc(100% - 5px)" :data="tableData">
            <el-table-column
              v-for="(item, index) in propList"
              :key="index"
              :prop="item.prop"
              :label="item.label"
              :width="item.width"
              :align="item.align"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span v-if="item.type === 'tag'">
                  <el-tag :type="item.tagType(scope.row)" size="mini">
                    <!-- {{scope.row[item.prop]}} -->
                    {{ item.render(scope.row) }}
                  </el-tag>
                </span>
                <span v-else-if="item.type === 'endTime'">
                  {{ transEndTime(scope.row[item.prop]) }}
                </span>
                <span v-else>{{ scope.row[item.prop] }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="200">
              <template slot-scope="scope">
                <el-button type="text" @click="viewDetails(scope.row)"
                  >详情</el-button
                >
                <el-button
                  type="text"
                  @click="approveBtn(scope.row)"
                  v-if="radio == 1"
                  >审批</el-button
                >
                <el-button
                  type="text"
                  @click="approveLink(scope.row)"
                  v-if="activeTab === 'asset'"
                  >审批链路</el-button
                >
                <el-button
                    type="text"
                    @click="labApproveLink(scope.row)"
                    v-if="activeTab === 'laboratory'"
                >审批链路</el-button>
                <el-button
                  type="text"
                  @click="applyForApiAuth(scope.row)"
                  v-if="activeTab === 'service' && isSuperLogin"
                  :disabled="scope.row.status !=2"
                  >审批</el-button
                >
                <!-- <el-button type="text" @click="appService(scope.row)" v-if="activeTab==='service'">应用服务关系</el-button> -->
              </template>
            </el-table-column>
          </el-table>
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
      <!-- 审批意见 -->
      <el-dialog
        class="approve"
        :visible.sync="approveDialog"
        title="审批"
        width="400px"
        top="38vh"
      >
        <el-form
          :model="ruleForm"
          :rules="rules"
          class="demo-ruleForm"
          ref="ruleForm"
        >
          <!-- 审批意见 -->
          <el-form-item label="审批意见" prop="apprComment">
            <el-input
              v-model="ruleForm.apprComment"
              placeholder="请输入审批意见"
              type="textarea"
              rows="4"
              resize="none"
              maxlength="1000"
              clearable
            ></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="reject('ruleForm')">拒绝</el-button>
          <el-button type="primary" @click="pass('ruleForm')">通过</el-button>
        </span>
      </el-dialog>
      <!-- 服务审批 -->
      <el-dialog
        class="approve"
        :visible.sync="serviceApprove"
        title="审批"
        width="400px"
        top="38vh"
      >
        <el-form
          :model="serviceForm"
          :rules="serviceRules"
          class="demo-ruleForm"
          ref="serviceForm"
        >
          <el-form-item label="状态" prop="approveStatus">
            <el-select
              v-model="serviceForm.approveStatus"
              placeholder="请选择状态"
              clearable
            >
              <el-option label="通过" value="1"></el-option>
              <el-option label="拒绝" value="3"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="serviceApprove = false">取消</el-button>
          <el-button type="primary" @click="confirmApproval()">确定</el-button>
        </span>
      </el-dialog>
      <!-- 应用服务关系 -->
      <el-dialog
        class="appService"
        :visible.sync="appServiceVis"
        width="1040px"
        top="25vh"
      >
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="我拥有的" name="first"></el-tab-pane>
          <el-tab-pane label="我可访问的" name="second"></el-tab-pane>
        </el-tabs>
        <!-- 表格 -->
        <el-table :data="diaDataList" height="235px">
          <el-table-column
            v-for="(item, index) in diaDataProp"
            :prop="item.prop"
            :label="item.label"
            :align="item.align"
            :key="index"
            :min-width="item.width"
            show-overflow-tooltip
          >
            <template scope="scope">
              <span>{{ scope.row[item.prop] }}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
      <!-- 审批链路 -->
      <el-dialog
        class="approveLink"
        title="审批链路"
        :visible.sync="linkVisible"
        width="1040px"
        top="25vh"
      >
        <!-- 表格 -->
        <el-table :data="linkDataList" height="235px">
          <el-table-column label="序号" type="index" width="50">
          </el-table-column>
          <el-table-column
            v-for="(item, index) in linkDataProp"
            :prop="item.prop"
            :label="item.label"
            :align="item.align"
            :key="index"
            :min-width="item.width"
            show-overflow-tooltip
          >
            <template scope="scope">
              <span v-if="item.type === 'tag'">
                <el-tag :type="item.tagType(scope.row)" size="mini">
                  {{ item.render(scope.row) }}
                </el-tag>
              </span>
              <span v-else>{{ scope.row[item.prop] }}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>

      <!-- 实验室审批链路 -->
      <el-dialog
          class="approveLink"
          title="审批链路"
          :visible.sync="labLinkVisible"
          width="1040px"
          top="25vh"
      >
        <!-- 表格 -->
        <el-table :data="linkDataList" height="235px">
          <el-table-column label="序号" type="index" width="50">
          </el-table-column>
          <el-table-column
              v-for="(item, index) in labLinkDataProp"
              :prop="item.prop"
              :label="item.label"
              :align="item.align"
              :key="index"
              :min-width="item.width"
              show-overflow-tooltip
          >
            <template scope="scope">
              <span v-if="item.type === 'tag'">
                <el-tag :type="item.tagType(scope.row)" size="mini">
                  {{ item.render(scope.row) }}
                </el-tag>
              </span>
              <span v-else>{{ scope.row[item.prop] }}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
      <!-- 流程详情 -->
      <ProcessDetails
        :tableId="tableId"
        :detailVis.sync="detailVis"
        @handleClose="handleClose"
      >
      </ProcessDetails>
      <!-- API详情 -->
      <ApiDetails
        :apiId="apiId"
        :apiDetailVis.sync="apiDetailVis"
        @handleClose="handleClose"
      >
      </ApiDetails>
      <!-- 实验室详情 -->
      <el-dialog :visible="labDetailVis" title="详情" @close="handleClose">
        <div
          style="
            overflow-y: auto;
            overflow-x: hidden;
            height: 100%;
            padding-left: 10px;
            padding-right: 10px;
          "
        >
          <el-form
            :model="labDetail"
            label-position="left"
            label-width="100px"
            size="medium"
          >
            <el-form-item label="表或视名(包含项目)">
              <el-input v-model="labDetail.tableName" disabled></el-input>
            </el-form-item>
            <el-form-item label="申请口径">
              <el-input
                type="textarea"
                v-model="labDetail.sqlText"
                disabled
                :rows="3"
              ></el-input>
            </el-form-item>
            <el-form-item label="申请说明">
              <el-input
                v-model="labDetail.applyDescription"
                disabled
              ></el-input>
            </el-form-item>
            <el-form-item label="申请人">
              <el-input v-model="labDetail.applyUserName" disabled></el-input>
            </el-form-item>
            <el-form-item label="申请人部门">
              <el-input v-model="labDetail.applyDeptName" disabled></el-input>
            </el-form-item>
            <el-form-item label="申请时间">
              <el-date-picker
                type="datetime"
                v-model="labDetail.applyTime"
                disabled
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="申请状态">
              <el-input v-model="labDetail.applyStatusShow" disabled></el-input>
            </el-form-item>
<!--            <el-form-item>
              <el-button type="info" @click="handleClose">关闭 </el-button>
            </el-form-item>-->
          </el-form>
        </div>
      </el-dialog>

      <!-- 实验室审批 -->
      <el-dialog
        class="approve"
        :visible.sync="labApproveDialog"
        title="审批"
        width="400px"
        top="38vh"
      >
        <el-form
          :model="ruleForm"
          :rules="rules"
          class="demo-ruleForm"
          ref="ruleForm"
        >
          <!-- 审批意见 -->
          <el-form-item label="审批意见" prop="apprComment">
            <el-input
              v-model="ruleForm.apprComment"
              placeholder="请输入审批意见"
              type="textarea"
              rows="4"
              resize="none"
              maxlength="1000"
              clearable
            ></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="labReject('ruleForm')">拒绝</el-button>
          <el-button type="primary" @click="labPass('ruleForm')"
            >通过</el-button
          >
        </span>
      </el-dialog>
    </div>
    <!-- 底部 -->
    <div class="portal-footer"></div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import Avatar from "@eladmin/assets/images/avatar.png";
import RoleSelect from "@eladmin/components/RoleSelect";
import ThemeSelect from "@portal/components/ThemeSelect";
import Logo from "@portal/layout/components/Sidebar/Logo";
import ProcessDetails from "./workSheet/processDetails.vue";
import ApiDetails from "./workSheet/apiDetails.vue";
import { isMiddleAdmin, isSuperAdmin } from "@/utils/validator";

export default {
  name: "myWorkSheet",
  components: {
    RoleSelect,
    ThemeSelect,
    Logo,
    ProcessDetails,
    ApiDetails,
  },
  data() {
    return {
      Avatar: Avatar,
      logo: require("../../../../public/images/logo.png"),
      activeTab: "",
      tabList: [
        {
          name: "asset",
          label: "数据资产平台",
        },
        {
          name: "service",
          label: "数据服务平台",
        },
        {
          name: "laboratory",
          label: "数据查询平台",
        },
      ],
      // radio
      radio: 0,
      // name: '',
      // dept: '',
      apiAddress: "",
      apiName: "",
      status: "",
      serviceStatus:"",
      // date: '',
      searchInput: "",
      dept: "",
      dateValue: "",
      startTime: "",
      endTime: "",
      // 部门树
      deptTreeList: [],
      // 表格
      tableData: [],
      propList: [],
      // 分页
      pageSize: 10,
      total: 10,
      currentPage: 1,
      // 审批弹窗
      approveDialog: false,
      ruleForm: {
        apprComment: "",
      },
      rules: {
        apprComment: [
          { required: true, message: "请输入审批意见", trigger: "blur" },
        ],
      },
      selectedRow: {},
      // 应用服务关系
      appServiceVis: false,
      activeName: "first",
      diaDataProp: [],
      diaDataList: [],
      curAppCode: "",
      // 审批链路
      linkVisible: false,
      linkDataProp: [],
      linkDataList: [],
      // 流程详情弹窗
      detailVis: false,
      tableId: "",
      // 服务审批
      serviceApprove: false,
      serviceForm: {
        approveStatus: "",
      },
      serviceRules: {
        approveStatus: [
          { required: true, message: "请选择审批状态", trigger: "change" },
        ],
      },
      // api详情弹窗
      apiDetailVis: false,
      apiId: "",
      //实验室详情弹窗
      labDetailVis: false,
      labDetail: {},
      labApproveDialog: false,
      // 数据资产平台  流程审批开关
      processFlag: true,
      labLinkVisible: false,
      labLinkDataProp : [],
    };
  },
  watch: {
    activeTab(val) {
      if (val === "asset") {
        this.propList = [
          {
            prop: "PROC_INST_ID",
            label: "申请编号",
          },
          {
            prop: "DEPT_NAME",
            label: "申请部门",
          },
          {
            prop: "CRT_USER",
            label: "申请人",
          },
          {
            prop: "TABLE_NAME",
            label: "表英文名",
          },
          {
            prop: "TABLE_COMMENT",
            label: "表中文名",
          },
          {
            prop: "EFF_BEGIN_TIME",
            label: "权限开始日期",
          },
          {
            prop: "EFF_END_TIME",
            type: "endTime",
            label: "权限结束日期",
          },
          {
            prop: "CRT_DATE",
            label: "申请时间",
          },
          {
            prop: "STATUS_DESC",
            label: "状态",
            type: "tag",
            tagType: (row) => {
              return row.STATUS_DESC === "已通过"
                ? "info"
                : row.STATUS_DESC === "草稿"
                ? ""
                : row.STATUS_DESC === "待审批"
                ? "warning"
                : "danger";
            },
            render: (row) => {
              return row.STATUS_DESC;
            },
          },
        ];
        this.radio = 0;
        this.reset();
        this.initList();
      } else if (val === "service") {
        this.propList = [
          {
            prop: "indexName",
            label: "api名称",
          },
          {
            prop: "apiDescription",
            label: "api描述",
          },
          {
            prop: "applicantName",
            label: "申请人",
          },
          {
            prop: "dept",
            label: "申请部门",
          },
          {
            prop: "applyDate",
            label: "申请时间",
          },
          {
            prop: "status",
            label: "状态",
            type: "tag",
            tagType: (row) => {
              return row.status == 1
                ? "info"
                : row.status == 2
                ? "warning"
                : "danger";
            },
            render: (row) => {
              return row.status == 1
                ? "通过"
                : row.status == 2
                ? "申请中"
                : "拒绝";
            },
          },
        ];
        this.radio = 0;
        this.reset();
        this.initList();
      } else if (val === "laboratory") {
        this.propList = [
          {
            prop: "id",
            label: "申请编号",
          },
          {
            prop: "tableName",
            label: "表或视名(包含项目)",
          },
          {
            prop: "sqlTextShow",
            label: "申请口径",
          },
          {
            prop: "applyDescription",
            label: "申请说明",
          },
          {
            prop: "applyUserName",
            label: "申请人",
          },
          {
            prop: "applyDeptName",
            label: "申请人部门",
          },
          {
            prop: "applyTimeShow",
            label: "申请时间",
          },
          {
            prop: "applyStatus",
            label: "申请状态",
            type: "tag",
            tagType: (row) => {
              return row.applyStatus === "03" ||
                row.applyStatus === "05" ||
                row.applyStatus === "06" ||
                row.applyStatus === "07"
                ? "info"
                : row.applyStatus === "00"
                ? "warning"
                : "danger";
            },
            render: (row) => {
              return row.applyStatus === "03" ||
                row.applyStatus === "05" ||
                row.applyStatus === "06" ||
                row.applyStatus === "07"
                ? "已通过"
                : row.applyStatus === "00"
                ? "待审批"
                : "已拒绝";
            },
          },
        ];
        this.radio = 0;
        this.reset();
        this.initList();
      }
    },
    radio(val) {
      if (val == 0) {
        this.reset();
        this.initList();
        console.log("我的申请");
      } else if (val == 1) {
        this.reset();
        this.initList();
        console.log("待我审批");
      } else {
        this.reset();
        this.initList();
        console.log("我已审批");
      }
    },
    dateValue(val) {
      if (val) {
        this.startTime = this.$formatDate(val[0]);
        this.endTime = this.$formatDate(val[1]);
      } else {
        this.startTime = "";
        this.endTime = "";
      }
    },
  },
  created() {},
  mounted() {
    this.activeTab = "asset";
    this.$api.getDeptTree({}).then((res) => {
      this.deptTreeList = res.data;
    }); /* 办理环节 0 运行 1 已处理，结束  2 退回 */
    this.linkDataProp = [
      {
        prop: "status",
        label: "办理环节",
        type: "tag",
        align: "center",
        tagType: (row) => {
          return row.status === "1"
            ? "info"
            : row.status === "0"
            ? "warning"
            : "danger";
        },
        render: (row) => {
          return row.status === "1"
            ? "已处理，结束"
            : row.status === "0"
            ? "运行"
            : "退回";
        },
      },
      {
        prop: "assignee",
        label: "办理人",
        align: "center",
      },
      {
        prop: "apprComment",
        label: "办理意见",
      },
      {
        prop: "duration",
        label: "办理时效(工作日)",
        align: "center",
      },
      {
        prop: "updDateStr",
        label: "更新时间",
      },
    ];
    this.labLinkDataProp = [
      {
        prop: "status",
        label: "办理环节",
        type: "tag",
        align: "center",
        tagType: (row) => {
          return row.status === "03"||row.status === "05"||row.status === "06"||row.status === "07"
              ? "info"
              : row.status === "00"
                  ? "warning"
                  : "danger";
        },
        render: (row) => {
          return row.status === "03"||row.status === "05"||row.status === "06"||row.status === "07"
              ? "已处理，结束"
              : row.status === "00"
                  ? "运行"
                  : "退回";
        },
      },
      {
        prop: "assignee",
        label: "办理人",
        align: "center",
      },
      {
        prop: "apprComment",
        label: "办理意见",
      },
      {
        prop: "duration",
        label: "办理时效",
        align: "center",
      },
      {
        prop: "updDateStr",
        label: "更新时间",
      },
    ];
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
    isSuperLogin() {
      return isMiddleAdmin() || isSuperAdmin();
    },
    isSuperLogin2(){
      return isSuperAdmin();
    }
  },
  methods: {
    // 正常时间
    transEndTime(time) {
      if (time && time.includes("9999")) {
        return "永久";
      } else {
        return time;
      }
    },
    // 退出登录提示
    open() {
      this.$confirm("确定注销并退出系统吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.logout();
      });
    },
    // 退出登录
    logout() {
      this.$store.dispatch("LogOut").then(() => {
        location.reload();
      });
    },
    // 重置
    reset() {
      this.searchInput = "";
      this.dept = "";
      this.apiAddress = "";
      this.apiName = "";
      this.status = "";
      this.serviceStatus = "";
      this.dateValue = "";
    },
    // 列表查询  -- 从第一页开始查  搜索按钮
    initList() {
      this.currentPage = 1;
      this.queryList();
    },
    // 列表查询 -- 当前页
    queryList() {
      if (this.activeTab === "asset") {
        console.log("asset查询");
        this.queryProcessList();
      } else if (this.activeTab === "service") {
        console.log("service查询");
        this.queryServiceList();
      } else if (this.activeTab === "laboratory") {
        console.log("laboratory查询");
        this.queryLaboratoryList();
      }
    },
    // 列表查询  数据资产平台  -- 流程
    queryProcessList() {
      let request = {
        page: String(this.currentPage),
        size: String(this.pageSize),
        deptCode: this.dept,
        name: this.searchInput,
        crtDateBeg: this.startTime,
        crtDateEnd: this.endTime,
      };
      console.log(request);
      if (this.radio == 0) {
        request.state = this.status;
        this.$api.appliedProcess(request).then((res) => {
          console.log(res);
          let data = res.data;
          this.tableData = data.records;
          this.total = data.total;
        });
      } else if (this.radio == 1) {
        // 待我审批
        this.$api.waitApprove(request).then((res) => {
          console.log(res);
          let data = res.data;
          this.tableData = data.records;
          this.total = data.total;
        });
      } else if (this.radio == 2) {
        // 我已审批
        this.$api.alreadyApprove(request).then((res) => {
          console.log(res);
          let data = res.data;
          this.tableData = data.records;
          this.total = data.total;
        });
      }
    },
    // 列表查询  数据服务平台
    queryServiceList() {
      console.log("service");
      let request = {
        page: this.currentPage,
        size: this.pageSize,
        interfaceAds: this.apiAddress,
        indexName: this.apiName,
        beginTime: this.startTime,
        endTime: this.endTime,
        status: this.serviceStatus,
      };
      this.$api.qryServiceWorkSheet(request).then((res) => {
        console.log(res);
        this.tableData = res.data.records;
        this.total = res.data.total;
      });
    },
    // 列表查询 
    queryLaboratoryList() {
      console.log("laboratory");
      let request = {
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        beginTime: this.startTime,
        endTime: this.endTime,
        queryState: this.status,
        dataType: this.radio,
      };
      this.$api.qryLabWorkSheet(request).then((res) => {
        console.log(res);
        this.tableData = res.data.records;
        this.total = res.data.total;
      });
    },
    // 详情
    viewDetails(row) {
      if (this.activeTab === "asset") {
        this.tableId = row.BUSINESS_KEY;
        this.detailVis = true;
      } else if (this.activeTab === "service") {
        this.apiId = row.apiId;
        this.apiDetailVis = true;
      } else if (this.activeTab === "laboratory") {
        this.labDetail = row;
        this.labDetailVis = true;
      }
    },
    // 关闭详情
    handleClose() {
      this.detailVis = false;
      this.apiDetailVis = false;
      this.labDetailVis = false;
    },
    // 审批按钮
    approveBtn(row) {
      if (this.activeTab === "laboratory") this.labApproveDialog = true;
      else this.approveDialog = true;
      this.selectedRow = row;
      this.$nextTick(() => {
        this.$refs["ruleForm"].resetFields();
      });
    },
    // 审批  -- 通过
    pass(formName) {
      console.log("通过", this.selectedRow.TASK_ID);
      this.$refs[formName].validate((valid) => {
        if (valid && this.processFlag) {
          this.processFlag = false;
          this.$api
            .completeTask({
              taskId: this.selectedRow.TASK_ID,
              submitType: "0",
              assignee: "",
              apprComment: this.ruleForm.apprComment,
            })
            .then((res) => {
              if (res.code == 0 || res.code == 200) {
                this.approveDialog = false;
                this.$message.success(res.msg);
                this.queryProcessList();
              } else {
                this.$message.error(res.msg);
              }
              this.processFlag = true;
            });
        } else {
          return false;
        }
      });
    },
    // 审批  -- 拒绝
    reject(formName) {
      console.log("拒绝", this.selectedRow.TASK_ID);
      this.$refs[formName].validate((valid) => {
        if (valid && this.processFlag) {
          this.processFlag = false;
          this.$api
            .completeTask({
              taskId: this.selectedRow.TASK_ID,
              submitType: "1",
              assignee: "",
              apprComment: this.ruleForm.apprComment,
            })
            .then((res) => {
              if (res.code == 0 || res.code == 200) {
                this.approveDialog = false;
                this.$message.success(res.msg);
                this.queryProcessList();
              } else {
                this.$message.error(res.msg);
              }
              this.processFlag = true;
            });
        } else {
          return false;
        }
      });
    },
    // 实验室审批  -- 通过
    labPass(formName) {
      console.log("通过", this.selectedRow.id);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$api
            .labCompleteTask({
              id: this.selectedRow.id,
              applyState: "03",
              approvalOpinion: this.ruleForm.apprComment,
            })
            .then((res) => {
              if (res.returnCode == 0 || res.returnCode == 200) {
                this.labApproveDialog = false;
                this.$message.success(res.returnMsg);
                this.queryLaboratoryList();
              } else {
                this.$message.error(res.returnMsg);
              }
            });
        } else {
          return false;
        }
      });
    },
    // 实验室审批  -- 拒绝
    labReject(formName) {
      console.log("拒绝", this.selectedRow.id);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$api
            .labCompleteTask({
              id: this.selectedRow.id,
              applyState: "04",
              approvalOpinion: this.ruleForm.apprComment,
            })
            .then((res) => {
              if (res.returnCode == 0 || res.returnCode == 200) {
                this.labApproveDialog = false;
                this.$message.success(res.returnMsg);
                this.queryLaboratoryList();
              } else {
                this.$message.error(res.returnMsg);
              }
            });
        } else {
          return false;
        }
      });
    },
    // 实验室审批链路
    labApproveLink(row) {
      this.labLinkVisible = true;
      this.$api.labApprovalLink({ id: row.id }).then((res) => {
        //console.log(res, 233331111111111111111);
        this.linkDataList = res.data;
      });
    },
    // 审批链路
    approveLink(row) {
      console.log(row.PROC_INST_ID);
      this.linkVisible = true;

      this.$api.approvalLink({ procInstId: row.PROC_INST_ID }).then((res) => {
        console.log(res, 23333);
        this.linkDataList = res.data;
      });
    },
    // 服务平台  -- 审批
    applyForApiAuth(row) {
      this.serviceApprove = true;
      this.selectedRow = row;
      this.$nextTick(() => {
        this.$refs["serviceForm"].resetFields();
      });
    },
    // 服务平台审批确定
    confirmApproval() {
      this.$refs["serviceForm"].validate((valid) => {
        if (valid) {
          this.$api
            .applyForApiAuth({
              id: this.selectedRow.id,
              status: this.serviceForm.approveStatus,
            })
            .then((res) => {
              if (res.code == 200 || res.code == 0) {
                this.$message.success(res.msg);
                this.queryList();
                this.serviceApprove = false;
              } else {
                this.$message.error(res.msg);
                this.serviceApprove = false;
              }
            });
        } else {
          return false;
        }
      });
    },
    // 应用服务关系
    appService(row) {
      console.log("应用服务关系");
      this.diaDataProp = [
        {
          prop: "name",
          label: "名称",
          align: "center",
        },
        {
          prop: "description",
          label: "描述",
          align: "center",
        },
      ];
      this.appServiceVis = true;
      this.curAppCode = row.appCode;
      this.$api
        .qryAppService({
          appCode: this.curAppCode,
        })
        .then((res) => {
          console.log(res, 23333);
          this.diaDataList = res.data;
        });
    },
    // 弹窗tab
    handleClick(tab, event) {
      console.log(tab.name);
      if (tab.name === "first") {
        this.$api
          .qryAppService({
            appCode: this.curAppCode,
          })
          .then((res) => {
            this.diaDataList = res.data;
          });
      } else {
        this.$api
          .qryAppAccessService({
            appCode: this.curAppCode,
          })
          .then((res) => {
            this.diaDataList = res.data;
          });
      }
    },
    // 分页
    handleCurrentChange(val) {
      console.log(val);
      this.currentPage = val;
      this.queryList();
    },
  },
};
</script>

<style lang="scss" scoped>
ul,
li {
  list-style: none;
}

@import "./style/workSheet.scss";
</style>
