<template>
  <div id="app">
    <router-view v-if="isRouterAlive" />
  </div>
</template>

<script>
export default {
  name: "App",
  provide() {
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      isRouterAlive: true,
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
      });
    },
  },
};
</script>
<style lang="scss">
::-webkit-scrollbar {
  width: 10px; /*对垂直流动条有效*/
  height: 10px; /*对水平流动条有效*/
}

/*定义滚动条的轨道颜色、内阴影及圆角*/
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.05);
  background-color: inset 0 0 6px rgba(0, 0, 0, 0.05);
  border-radius: 3px;
}

/*定义滑块颜色、内阴影及圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 7px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.05);
  background-color: #e8e8e8;
}

/*定义两端按钮的样式*/
/* ::-webkit-scrollbar-button {
background-color: #84C22E;
} */

/*定义右下角汇合处的样式*/
/* ::-webkit-scrollbar-corner {
background:khaki;
} */
.el-pagination {
  font-size: 14px;
  color: #202224;
  font-weight: 400;
  margin-top: 8px;
  padding: 0 !important;

  .el-pagination__total {
    height: 32px !important;
    line-height: 32px !important;
    color: #202224;
  }
  .el-pagination__sizes {
    height: 32px !important;
    line-height: 32px !important;
  }
  .el-pagination__jump {
    height: 32px !important;
    line-height: 32px !important;
    color: #202224;
    .el-pagination__editor {
      height: 32px;
      .el-input__inner {
        width: 48px;
        height: 32px;
      }
    }
  }
  .btn-prev,
  .btn-next {
    width: 32px;
    height: 32px;
    border: 1px solid #e7e7e7;
    box-sizing: border-box;
  }
  .el-pager {
    margin-left: 8px;
    li {
      border: 1px solid #e7e7e7;
      border-radius: 3px;
      color: #202224;
      font-weight: 400;
      width: 32px;
      min-width: 32px;
      height: 32px;
      line-height: 32px;
      margin-right: 8px;
      box-sizing: border-box;
    }
    li:hover {
      background: #84c22e;
      color: #fff;
    }
    li.active {
      background: #79ac43;
      background: #61bd53;
      color: #fff;
    }
  }
}

#app .sidebar-container {
  width: 48px;
  position: relative !important;
  top: 70 !important;
  height: calc(100vh - 70px) !important;
  min-width: 48px;
}
#app .sidebar-container.has-logo .el-scrollbar {
  height: calc(100vh - 130px) !important;
  // overflow: hidden;
}
#app .main-container {
  height: calc(100vh - 70px) !important;
}
#app .main-container-isCollapse {
  width: calc(100vw - 48px) !important;
}
#app .main-container-collapse {
  width: calc(100vw - 220px) !important;
}
.app-wrapper {
  position: relative;
  .hasTagsView .fixed-header + .app-main {
    padding-top: 112px;
  }

  .hasTagsView {
    .app-main {
      // min-height: 100vh;
      height: calc(100vh - 70px);
    }
  }
  .navbar {
    width: 100%;
    height: 70px;
    // overflow: hidden;
    position: relative;
    // background: #79ac43;
    .breadcrumb-container {
      line-height: 70px !important;
    }
    .right-menu {
      line-height: 70px;
    }
  }
  .container {
    display: flex;
    width: 100%;
    height: calc(100vh -70px);
    margin: 0;
    .sidebar-container {
      position: relative;
      height: 100%;
      // margin-top: 70px;
    }
    .main-container {
      position: relative;
      // width: calc(100% - 200px);
      width: 100%;
      height: 100%;
      overflow: auto;
      margin: 0 !important;
      .fixed-header-isCollapse {
        width: calc(100vw - 48px) !important;
      }
      .fixed-header-collapse {
        width: calc(100vw - 220px) !important;
      }
      .fixed-header {
        width: 100%;
        top: 70px;
        background: rgba(237, 249, 233, 1);
        //
        // .navbar {
        //   height: 70px;
        //   overflow: hidden;
        //   position: relative;
        //   background: #79AC43;
        //   .breadcrumb-container {
        //     line-height: 70px !important;
        //   }
        //   .right-menu {
        //     line-height: 70px;
        //   }
        // }
        // .tags-view-container .tags-view-wrapper .tags-view-item.not-active

        .tags-view-container {
          height: 30px;
          line-height: 2;
          background: #edf9e9;
          .tags-view-wrapper {
            background: #edf9e9;
            .el-scrollbar__wrap {
              padding: 0;
            }
            .tags-view-item {
              height: 24px;
              line-height: 22px;
              font-size: 12px;
              position: relative;
              top: -1.5px;
            }
            .tags-view-item.active {
              color: #fff;
              background: #61bd53;
              border: 1px solid #61bd53;
              border-radius: 2px;
            }
            .tags-view-item.not-active {
              color: #61bd53;
              background: #fff;
              background: transparent;
              border: 1px solid #91bf82;
            }
            .el-icon-close {
              position: relative;
              // top: -1px;
            }
            .el-icon-close:before {
              transform: scale(0.84);
              vertical-align: -2px;
            }
          }
        }
      }
      .app-main {
        padding-top: 40px;
      }
    }
  }
}
// el-table 背景色
.el-table {
  .el-table__header-wrapper {
    .el-table__header {
      tr {
        th {
          background: #fff;
        }
      }
    }
  }
  .el-table__body-wrapper {
    .el-table__body {
      tr:hover {
        td {
          background: #fff;
        }
      }
    }
  }
  .cell {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
// el-tooltip
.el-tooltip__popper { 
  max-width: 80% 
}
</style>