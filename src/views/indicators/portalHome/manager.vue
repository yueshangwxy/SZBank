<template>
    <div class="portal-home" style="background: rgba(245, 245, 245, 1)">
        <!-- 头部 -->
        <div class="portal-header">
            <div class="portal-logo" style="height: 70px;line-height: 70px;">
                <router-link key="collapse" class="sidebar-logo-link" to="/portalHomeIndex">
                    <img :src="logo" width="158px" height="35.5px" class="sidebar-logo" style="margin-left:24px;vertical-align: middle;">
                </router-link>
            </div>
            <div class="portal-header-title">
                <div class="portal-header-title-top">统一数据门户</div>
                <div class="portal-header-title-bottom">UNfied  data  portal</div>
            </div>
            <!-- <div class="portal-header-desc">
                <h1>统一数据门户</h1>
                <p>满足银行内部资产管理需求，对分散在各系统的数据结构、数据含义进行集中采集后进行目录化管理，向全行业务人员实现共享共用共治。</p>
            </div> -->
            <div class="right-menu">
                <template v-if="device !== 'mobile'">
                    <theme-select id="theme" class="right-menu-item hover-effect"></theme-select>
                </template>
                <div style="margin-right: 32px">
                    <router-link to="/myWorkSheet" style="margin-right: 8px">
                        <el-tooltip content="我的工单">
                            <i class="el-icon-tickets"></i>
                        </el-tooltip>
                    </router-link>
                    <router-link to="/manager">
                        <el-tooltip content="管理入口">
                            <i class="el-icon-setting"></i>
                        </el-tooltip>
                    </router-link>
                </div>
                <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click" style="margin: 0">
                    <div class="avatar-wrapper">
                        <el-link style="color: #ffffff; text-align: right">
                            <span class="profile-picture"><i class="el-icon-user"></i></span>
                            {{ user.nickName || "张伟"}}
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
                        :name="item.name"></el-tab-pane>
                </el-tabs>
                <UserManager v-if="activeTab==='userManager'"></UserManager>
                <OrganizationManager v-if="activeTab==='organizationManager'"></OrganizationManager>
                <RoleManager v-if="activeTab==='roleManager'"></RoleManager>
                <AuthManager v-if="activeTab==='authManager'"></AuthManager>
                
            </div>
        </div>
        <!-- 底部 -->
        <div class="portal-footer"></div>
    </div>
</template>

<script>
    import {
        mapGetters,
        mapState
    } from "vuex";
    import Avatar from "@eladmin/assets/images/avatar.png";
    import RoleSelect from "@eladmin/components/RoleSelect";
    import ThemeSelect from "@portal/components/ThemeSelect";
    import Logo from "@portal/layout/components/Sidebar/Logo";
    import UserManager from './manager/userManager.vue'
    import OrganizationManager from './manager/organizationManager.vue'
    import RoleManager from './manager/roleManager.vue'
    import AuthManager from './manager/authManager.vue'
    export default {
        name: "manager",
        components: {
            RoleSelect,
            ThemeSelect,
            Logo,
            UserManager,
            OrganizationManager,
            RoleManager,
            AuthManager,
        },
        data() {
            return {
                Avatar: Avatar,
                logo: require('../../../../public/images/logo.png'),
                activeTab: '',
                tabList: [
                    {
                        name: 'userManager',
                        label: '用户管理',
                    },                    
                    {
                        name: 'roleManager',
                        label: '角色管理',
                    },
                    {
                        name: 'organizationManager',
                        label: '机构管理',
                    },
                    {
                        name: 'authManager',
                        label: '权限管理',
                    },
                ],
            };
        },
        watch: {
            activeTab(val) {
                if(val==='userManager') {
                    
                }else if(val==='organizationManager') {
                    
                }else if(val==='roleManager') {

                }else if(val==='authManager') {

                }
            },
        },
        mounted() {
            this.activeTab = 'userManager'
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
            
        },
        methods: {
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
        },
    };
</script>

<style lang="scss" scoped>
    ul,
    li {
        list-style: none;
    }

    // header
    .portal-header {
        width: 100%;
        min-width: 1366px;
        height: 70px;
        display: flex;
        position: relative;
        background: url("../../../assets/bannar.png") 0 0 no-repeat;
        background-size: 100% 100%;

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
                font-size: 16px;
            }

            .portal-header-title-bottom {
                left: 0px;
                top: 22px;
                width: 105px;
                height: 11px;
                display: flex;
                color: rgba(255, 255, 255, 1);
                font-size: 8px;
                white-space: nowrap;
                transform: scale(0.65);
                margin-left: -18px;
            }
        }
        .portal-header-desc {
            position: absolute;
            top: 135px;
            left: 220px;
            h1 {
                font-size: 26px;
                color: #fff;
                margin: 0 0 22px 0;
            }
            p {
                width: 440px;
                font-size: 14px;
                line-height: 20px;
                color: #fff;
                margin: 0;
            }
        }
        
        .right-menu {
            display: flex;
            align-items: center;
            height: 70px;
            position: absolute;
            right: 24px;
            color: #fff;
            font-size: 14px;

            .profile-picture {
                margin-right: 8px;
            }
        }
    }

    // container
    .portal-container {
        width: 100%;
        min-width: 1366px;
        height: calc(100vh - 130px);
        display: flex;
        justify-content: flex-start;
        overflow: auto;
        padding: 16px;
        position: relative;
        .portal-container-content {
            width: 100%;
            // max-width: 1366px;
            height: 100%;
            margin: 0 auto;
            background: #fff;
            padding: 16px;
            border-radius: 8px;
            // tabs
            ::v-deep .el-tabs__nav-wrap::after {
                background: transparent;
            }
            // radio
            .radioBox {
                margin-bottom: 16px;
            }
            // 筛选条件
            .conditions {
                display: flex;
                .el-input {
                    width: 180px;
                    margin-right: 8px;
                }
                .el-select,.el-cascader {
                    margin-right: 8px;
                }
                .el-button {
                    margin-left: 8px;
                }
            }
            // 表格
            .table {
                margin-top: 16px;
                height: calc(100% - 190px);
                .el-table::before {
                    background-color: #fff;
                    height: 0;
                }
                ::v-deep .el-table {
                    margin-top: 24px;
                    padding-left: 4px;
                    // header
                    .el-table__header-wrapper {
                        .el-table__header {
                            tr {
                                th {
                                    color: rgba(32, 34, 36, 1);
                                    font-size: 14px;
                                    font-weight: 400;
                                    border: none;
                                }
                            }
                        }
                    }
                    // body
                    .el-table__body-wrapper {
                        .el-table__body {
                            border-spacing: 0 8px;
                            tr {
                                td:first-child {
                                    border-left: 1px solid rgba(232, 232, 232, 1);
                                }
                                td:last-child {
                                    position: relative;
                                    right: 4px;
                                    border-right: 1px solid rgba(232, 232, 232, 1);
                                }
                                td {
                                    color: rgba(77, 78, 80, 1);
                                    border-top: 1px solid rgba(232, 232, 232, 1);
                                    border-bottom: 1px solid rgba(232, 232, 232, 1);
                                    
                                }
                            }
                        }
                    }
                    // 复选框
                    .cell {
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        .el-checkbox {
                            width: 16px;
                            height: 16px;
                            .el-checkbox__input {
                                .el-checkbox__inner {
                                    width: 16px;
                                    height: 16px;
                                }
                            }
                            .el-checkbox__input.is-checked,.el-checkbox__input.is-indeterminate {
                                width: 16px;
                                height: 16px;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                background: #fff;
                                border: 1px solid #79AC43;
                                border-radius: 2px;
                            }
                            .el-checkbox__input.is-indeterminate {
                                .el-checkbox__inner {
                                    width: 8px;
                                    height: 4px;
                                    background: #79AC43;
                                }
                                .el-checkbox__inner::before {
                                    display: none;
                                }
                            }
                            .el-checkbox__input.is-checked {
                                .el-checkbox__inner {
                                    width: 8px;
                                    height: 8px;
                                    background: #79AC43;
                                }
                                .el-checkbox__inner::after {
                                    display: none;
                                }
                            }
                        }
                    }

                }
            }
            // 分页
            .pagination {
                height: 64px;
                display: flex;
                align-items: center;
                flex-direction: row-reverse;
                .el-pagination {
                    margin: 0;
                }
            }
        }
        ::v-deep .el-dialog__wrapper.approve {
            // .el-dialog__header {
                
            // }
            .el-dialog__body {
                padding: 0 20px;
            }
            .el-dialog__footer {
                padding: 20px 20px 10px;
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