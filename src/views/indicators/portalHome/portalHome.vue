<template>
  <div class="portal-home">
    <!-- 头部 -->
    <div class="portal-header">
      <!-- <logo v-if="showLogo" :collapse="true" /> -->
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
      <div class="portal-header-search">
        <!-- <el-input
            style="width: 333px"
            size="small"
            suffix-icon="el-icon-search"
            v-model="searchValue"
            placeholder="请输入搜索内容"
            clearable
            @input="inputChange"
            @keyup.enter="globalSearch"
          /> -->
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
      <!-- <div class="portal-header-desc">
        <p>
          服务于各数据应用平台的门户，打破传统企业组织架构下IT和业务的壁垒，将原本复杂分散的数据孤岛充分进行整合，降低用户进入系统和获得各系统提供信息的难度，使得用户获取和使用信息更直接、更方便实现信息共享、综合利用，以促进信息的共建、共享、共赢的局面。 “一站式 ”实现知数、识数、用数的数据应用过程，极大提升数据使用体验。
        </p>
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
          <router-link to="/manager" v-if="isSuperLogin">
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
            <el-link style="color: #1f1a16; text-align: right">
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
        <div class="portal-header-desc">
          <p>
            服务于各数据应用平台的门户，打破传统企业组织架构下IT和业务的壁垒，将原本复杂分散的数据孤岛充分进行整合，降低用户进入系统和获得各系统提供信息的难度，使得用户获取和使用信息更直接、更方便实现信息共享、综合利用，以促进信息的共建、共享、共赢的局面。 “一站式 ”实现知数、识数、用数的数据应用过程，极大提升数据使用体验。
          </p>
        </div>
        <!-- 主菜单 -->
        <ul class="menu-title">
          <li
            v-for="(item, index) in titleList"
            :key="index"
            :class="{ active: item.active == active }"
            @mouseenter="titleEnter(item)"
          >
            <img :src="item.imgUrl" alt="" />
            <span>{{ item.title }}</span>
          </li>
        </ul>
        <!-- 子菜单 -->
        <ul class="menu-list" :class="this.className" v-if="menuList.length">
          <i class="triangle"></i>
          <div class="listBox">
            <li
              v-for="(item, index) in menuList"
              :key="index"
              @click="openNewWindow(item)"
            >
              <div class="title">
                <div class="box"><i></i></div>
                <span>{{ item.title }}</span>
              </div>
              <el-tooltip
                class="item"
                effect="dark"
                :content="item.desc"
                placement="bottom-start"
              >
                <p>{{ item.desc }}</p>
              </el-tooltip>
            </li>
          </div>
        </ul>
      </div>
    </div>
    <!-- 底部 -->
    <!-- <div class="portal-footer"></div> -->
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import { buildMenus } from "@eladmin/api/system/menu";
import { getCurrentRole } from "@eladmin/utils/auth";
import Avatar from "@eladmin/assets/images/avatar.png";
import RoleSelect from "@eladmin/components/RoleSelect";
import ThemeSelect from "@portal/components/ThemeSelect";
import Logo from "@portal/layout/components/Sidebar/Logo";
import { isSuperAdmin } from "@/utils/validator";

export default {
  name: "portalHome",
  components: {
    RoleSelect,
    ThemeSelect,
    Logo,
  },
  data() {
    return {
      Avatar: Avatar,
      logo: require("../../../../public/images/logo.png"),
      searchValue: "", // 搜索内容
      // title
      active: 1,
      className: "menu-list1",
      titleList: [
        {
          imgUrl: require("../../../assets/explore1.png"),
          title: "数据探索",
          desc: "为了借助社交产品的流量,让用户主动分享APP中的内容到社交平...",
          active: 1,
          className: "menu-list1",
          children: [
            {
              title: "数据资产平台",
              path: "/",
              name: "/",
              desc: "对数据资产进行采集、归档、盘点及管理，使数据资产得以沉淀。数据资产与业务场景的结合，使业务口径得以沉淀，使数据资产更贴合业务场景，从而将数据资产从专注于技术描述，提升为业务服务。",
            },
            {
              title: "数据查询平台",
              path: "/dataLab/sqlFlexibleAnalysis",
              name: "sqlFlexibleAnalysis",
              desc: "作为数据中台的配套系统，服务于我行数据分析、业务支持岗位人员。结合业务部门对数据探索相关需求，实现基于数据中台体系的数据自助探索、分析。",
            },
          ],
        },
        {
          imgUrl: require("../../../assets/service1.png"),
          title: "数据服务",
          desc: "为了借助社交产品的流量,让用户主动分享APP中的内容到社交平...",
          active: 2,
          className: "menu-list2",
          children: [
            {
              title: "数据服务平台",
              path: "/dataServicePlatform/myService",
              name: "myService",
              desc: "提供全面的数据服务方式，将数据能力通过各系统融入业务经营、运营之中。",
            },
          ],
        },
        {
          imgUrl: require("../../../assets/application1.png"),
          title: "数据应用",
          desc: "为了借助社交产品的流量,让用户主动分享APP中的内容到社交平...",
          active: 3,
          className: "menu-list3",
          children: [
            {
              title: "指标管理平台",
              // path: '',
              desc: "正在接入中...",
            },
            {
              title: "统一标签管理系统",
              // path: '',
              desc: "正在接入中...",
            },
          ],
        },
        {
          imgUrl: require("../../../assets/manage1.png"),
          title: "数据管理",
          desc: "为了借助社交产品的流量,让用户主动分享APP中的内容到社交平...",
          active: 4,
          className: "menu-list4",
          children: [
            {
              title: "正在建设",
              desc: "正在建设中...",
            },
          ],
        },
      ],
      menuList: [],
    };
  },
  mounted() {},
  watch: {},
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
      return isSuperAdmin();
    },
  },
  created() {
    // 加载数据
    this.menuList = this.titleList[0].children;
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
    // // 输入框
    // inputChange(value) {
    //   this.searchValue = value;
    //   // localStorage.setItem("searchKeyWords", value);
    // },
    // globalSearch() {
    //   this.$router.push({
    //     path: "/searchPage/index",
    //     query: {
    //       data: this.searchValue,
    //       from: "home",
    //     },
    //   });
    // },
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
    // 鼠标移入
    titleEnter(item) {
      this.active = item.active;
      this.className = item.className;
      this.menuList = item.children;
    },
    // 打开新窗口
    openNewWindow(item) {
      // 根据build接口判断是否需要跳转
      var allMenuName = [];
      buildMenus(getCurrentRole().id).then((res) => {
        getAllMenuName(res.menu);
        if (allMenuName.includes(item.name) || item.name === "/") {
          if (item.path) {
            let routeData = this.$router.resolve({ path: item.path });
            window.open(routeData.href, "_blank");
          }
        } else {
          this.$message.error("暂无权限跳转");
        }

        // 获取所有菜单的名称
        function getAllMenuName(menus) {
          for (let menu of menus) {
            if (menu.name) {
              allMenuName.push(menu.name);
            }
            if (menu.children && menu.children.length > 0) {
              getAllMenuName(menu.children);
            }
          }
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
ul,
li {
  list-style: none;
  margin: 0;
  padding: 0;
}
.portal-home {
  height: 100vh;
  background: #fff url("../../../assets/portalBannar.png") 0 0 no-repeat;
  background-size: 100% auto;
  overflow: hidden;
}
// header
.portal-header {
  width: 100vw;
  // min-width: 1366px;
  // height: 190px;
  display: flex;
  position: relative;
  align-items: center;
  // background: url("../../../assets/bannar.png") 0 0 no-repeat;
  // background-size: 100% 100%;

  .portal-header-title {
    // left: 155px;
    // top: 19px;
    width: 105px;
    height: 33px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    // margin-top: 19px;
    margin-left: 24px;

    .portal-header-title-top {
      left: 0px;
      top: 0px;
      width: 96px;
      height: 22px;
      display: flex;
      color: #1f1a16;
      font-size: 16px;
    }

    .portal-header-title-bottom {
      left: 0px;
      top: 22px;
      width: 105px;
      height: 11px;
      display: flex;
      color: #1f1a16;
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
    // margin-top: 19px;
    margin-left: 5%;
    ::v-deep .el-input__inner {
      border: 1px solid #76c820;
    }
  }

  .el-input--mini .el-input__inner {
    height: 32px;
  }

  .el-input--mini .el-input__icon {
    height: 28px;
  }
  .portal-header-desc {
    position: absolute;
    top: 120px;
    left: 220px;
    p {
      width: 480px;
      font-size: 14px;
      line-height: 20px;
      margin: 0;
      color: #1a761f;
    }
  }

  .right-menu {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 70px;
    // position: absolute;
    margin-right: 24px;
    color: #1f1a16;
    font-size: 14px;

    .profile-picture {
      margin-right: 8px;
    }
  }
}

// container
.portal-container {
  width: 100vw;
  // min-width: 1366px;
  height: calc(100vh - 70px);
  display: flex;
  justify-content: center;
  overflow: auto;
  .portal-container-content {
    width: 85%;
    // max-width: 1000px;
    height: 100%;
    // margin: 0 auto;
    padding-top: 5%;
    padding-bottom: 5%;
    display: flex;
    flex-direction: column;
    // align-items: center;
    .portal-header-desc {
      height: 24%;
      // margin-bottom: 5%;
      p {
        width: 35%;
        height: 100%;
        font-size: calc(100vw * 16 / 1920);
        // line-height: 20px;
        line-height: 1.5;
        margin: 0;
        color: #1a761f;
        overflow: auto;
      }
    }
    // title
    .menu-title {
      width: 100%;
      height: 33%;
      margin: 25px 0 0 0;
      padding: 0;
      display: flex;
      justify-content: space-between;
      box-sizing: border-box;
      li {
        // width: 214px;
        width: 24%;
        height: 100%;
        padding: 0 20px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        border-radius: 8px;
        img {
          width: 50%;
          // height: 40%;
        }
        span {
          font-size: 20px;
          color: #293138;
          color: #fff;
          // font-weight: 700;
          margin-top: 3%;
        }
        p {
          font-size: 12px;
          line-height: 18px;
          color: rgba(41, 49, 56, 0.7);
          margin: 12px 0 0 0;
        }
      }
      li:nth-child(1) {
        background: linear-gradient(
          180deg,
          rgba(97, 189, 83, 1) 0%,
          rgba(153, 212, 95, 1) 100%
        );
        backdrop-filter: blur(15px);
      }
      li:nth-child(2) {
        background: linear-gradient(
          180deg,
          rgba(114, 119, 237, 1) 0%,
          rgba(114, 165, 237, 1) 99.95%
        );
        backdrop-filter: blur(15px);
      }
      li:nth-child(3) {
        background: linear-gradient(
          180deg,
          rgba(78, 141, 230, 1) 0%,
          rgba(78, 177, 230, 1) 100%
        );
        backdrop-filter: blur(15px);
      }
      li:nth-child(4) {
        background: linear-gradient(
          180deg,
          rgba(227, 178, 54, 1) 0%,
          rgba(227, 201, 54, 1) 100%
        );
        backdrop-filter: blur(15px);
      }
      // li.active {
      //   background: #fff;
      //   border: 1px solid #76c820;
      //   border-bottom: 6px solid #76c820;
      //   border-radius: 8px;
      // }
    }
    // menu
    .menu-list {
      width: 100%;
      height: 33%;
      margin: 20px 0 0 0;
      padding: 13px 20px;
      border-radius: 8px;
      box-sizing: border-box;
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      background: rgba(127, 202, 116, 1);
      overflow-x: auto;
      position: relative;
      overflow: visible;
      .triangle {
        position: absolute;
        width: 0;
        height: 0;
        border-left: 15px solid transparent;
        border-right: 15px solid transparent;
        border-bottom: 15px solid rgba(97, 189, 83, 1);
        top: -15px;
        left: 12%;
      }
      .listBox {
        width: 100%;
        height: 100%;
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        overflow: auto;
      }
      li {
        width: 24%;
        height: 85%;
        margin: 0 9px;
        padding: 16px 23px;
        box-sizing: border-box;
        border-radius: 4px;
        background: #f6faf2;
        cursor: pointer;
        flex-shrink: 0;
        .title {
          // font-size: 14px;
          font-size: calc(100vw * 16 / 1920);
          color: #293138;
          display: flex;
          align-items: center;
          .box {
            width: 14px;
            height: 14px;
            border-radius: 2px;
            display: flex;
            justify-content: center;
            align-items: center;
            box-sizing: border-box;
            margin-right: 8px;
            background: #d5e3c9;

            i {
              width: 8px;
              height: 8px;
              border-radius: 2px;
              background: #79ac43;
            }
          }
          span {
            font-weight: 700;
          }
        }
        p {
          width: 100%;
          // height: 60px;
          // font-size: 12px;
          font-size: calc(100vw * 16 / 1920);
          line-height: 1.5;
          color: rgba(41, 49, 56, 0.7);
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          overflow: hidden;
        }
      }
    }
    .menu-list1 {
      background: linear-gradient(
        180deg,
        rgba(97, 189, 83, 1) 0%,
        rgba(153, 212, 95, 1) 100%
      );
      .triangle {
        border-bottom: 15px solid rgba(97, 189, 83, 1);
        left: 12%;
      }
    }
    .menu-list2 {
      background: linear-gradient(
        180deg,
        rgba(114, 119, 237, 1) 0%,
        rgba(114, 165, 237, 1) 99.95%
      );
      .triangle {
        border-bottom: 15px solid rgba(114, 119, 237, 1);
        left: 37%;
      }
    }
    .menu-list3 {
      background: linear-gradient(
        180deg,
        rgba(78, 141, 230, 1) 0%,
        rgba(78, 177, 230, 1) 100%
      );
      .triangle {
        border-bottom: 15px solid rgba(78, 141, 230, 1);
        left: 63%;
      }
    }
    .menu-list4 {
      background: linear-gradient(
        180deg,
        rgba(227, 178, 54, 1) 0%,
        rgba(227, 201, 54, 1) 100%
      );
      .triangle {
        border-bottom: 15px solid rgba(227, 178, 54, 1);
        left: 87%;
      }
    }
  }
  
}
// footer
.portal-footer {
  width: 100%;
  min-width: 1366px;
  height: 60px;
  background: url("../../../assets/footer.png") 0 0 no-repeat;
  background-size: 100% 100%;
  position: fixed;
  bottom: 0;
}
</style>
<style lang="scss" scoped>
@media screen and (max-width: 1366px) {
  .portal-container {
    .portal-container-content {
      padding-bottom: 36px;
    }
  } 
}
</style>
