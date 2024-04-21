import Vue from 'vue'
import Router from 'vue-router'
import loadView from "@/modules"

Vue.use(Router)
import Layout from "@portal/layout/index";
import Submenu from "@portal/layout/submenu";

export const constantRouterMap = [
    {
        path: '/login',
        meta: { title: '登录', noCache: true },
        //component: (resolve) => require([`@portal/layout/login`], resolve),
        component: (resolve) => require([`../views/indicators/login/login`], resolve),
        hidden: true
    },
    {
        path: '/portalHomeIndex',
        meta: { title: '门户首页', noCache: true },
        component: (resolve) => require([`../views/indicators/portalHome/portalHome`], resolve),
        hidden: true
    },
    {
        path: '/myWorkSheet',
        meta: { title: '我的工单', noCache: true },
        component: (resolve) => require([`../views/indicators/portalHome/workSheet`], resolve),
        hidden: true
    },
    {
        path: '/manager',
        meta: { title: '管理入口', noCache: true },
        component: (resolve) => require([`../views/indicators/portalHome/manager`], resolve),
        hidden: true
    },
    {
        path: '/processApprove',
        meta: { title: '流程审批', noCache: true },
        component: (resolve) => require([`../views/indicators/portalHome/workSheet/processApprove`], resolve),
        hidden: true
    },
    {
        path: '/sso/login',
        meta: { title: '统一登录', noCache: true },
        component: (resolve) => require(['@eladmin/views/ssologin'], resolve),
        hidden: true
    },
    {
        path: '/404',
        component: (resolve) => require(['@eladmin/views/features/404'], resolve),
        hidden: true
    },
    {
        path: '/401',
        component: (resolve) => require(['@eladmin/views/features/401'], resolve),
        hidden: true
    },
    {
        path: '/redirect',
        component: Layout,
        hidden: true,
        children: [
            {
                path: '/redirect/:path*',
                component: (resolve) => require(['@eladmin/views/features/redirect'], resolve)
            }
        ]
    },
    {
        path: '/',
        component: (resolve) => require([`../views/indicators/home`], resolve),
        meta: { title: '首页', icon: 'index', affix: true, noCache: true },
        hidden: true,
    },
    /* {
        path: '/user',
        component: Layout,
        hidden: false,
        redirect: 'noredirect',
        children: [
            {
                path: 'center',
                component: (resolve) => require(['@eladmin/views/system/user/center'], resolve),
                name: '个人中心',
                meta: { title: '个人中心', icon: 'index', }
            }
        ]
    }, */
    
    {
        path: '/asset',
        component: Layout,
        hidden: false,
        meta: { title: '数据资产平台', icon: 'index', affix: false, noCache: true },
        redirect: 'noredirect',
        children: [
            {
                path: '/',
                component: (resolve) => require([`../views/indicators/home`], resolve),
                meta: { title: '首页', icon: 'index', affix: true, noCache: true },
                hidden: false,
            },
            {
                path: '/asset/searchPage/index',
                component: (resolve) => require(['../views/indicators/assetSearch/assetSearch'], resolve),
                name: '搜索',
                meta: { title: '搜索', icon: 'index', affix: false, noCache: true }
            },
            {
                path: '/assetOperation',
                name: 'assetOperation',
                component: (resolve) => require(['../views/indicators/assetOperation/index'], resolve),
                hidden: false,
                meta: { title: "资产运营", icon: 'index', affix: false, noCache: true },
                redirect: 'noredirect',
                children: [
                    {
                        path: 'tableOperation',
                        component: (resolve) => require(['../views/indicators/assetOperation/tableOperation'], resolve),
                        name: 'tableOperation',
                        meta: { title: '表运营', icon: 'index', affix: false, noCache: true }
                    },
                    {
                        path: 'apiOperation',
                        component: (resolve) => require(['../views/indicators/assetOperation/apiOperation'], resolve),
                        name: 'apiOperation',
                        meta: { title: 'API运营', icon: 'index', affix: false, noCache: true }
                    },
                    {
                        path: 'targetOperation',
                        component: (resolve) => require(['../views/indicators/assetOperation/targetOperation'], resolve),
                        name: 'targetOperation',
                        meta: { title: '指标运营', icon: 'index', affix: false, noCache: true }
                    },
                    {
                        path: 'labelOperation',
                        component: (resolve) => require(['../views/indicators/assetOperation/labelOperation'], resolve),
                        name: 'labelOperation',
                        meta: { title: '标签运营', icon: 'index', affix: false, noCache: true }
                    }
                ]
            },
            {
                path: '/basicDataMnt',
                name: "basicDataMnt",
                component: (resolve) => require(['../views/indicators/basicDataMnt/index'], resolve),
                hidden: false,
                meta: { title: "基础数据管理", icon: 'index', affix: false, noCache: true },
                redirect: 'noredirect',
                children: [
                    {
                        path: 'classify',
                        component: (resolve) => require(['../views/indicators/basicDataMnt/classify'], resolve),
                        name: '数据分级分类导入',
                        meta: { title: '数据分级分类导入', icon: 'index', affix: false, noCache: true }
                    },
                    {
                        path: 'masterInfo',
                        component: (resolve) => require(['../views/indicators/basicDataMnt/masterInfo'], resolve),
                        name: '数据属主信息导入',
                        meta: { title: '数据属主信息导入', icon: 'index', affix: false, noCache: true }
                    },
                    {
                        path: 'blackList',
                        hidden: true,
                        component: (resolve) => require(['../views/indicators/basicDataMnt/blackList'], resolve),
                        name: '黑名单设置',
                        meta: { title: '黑名单设置', icon: 'index', affix: false, noCache: true }
                    }
                ]
            },
            {
                path: '/myShopCar/index',
                component: (resolve) => require(['../views/indicators/myShopCar/myShopCar'], resolve),
                name: '我的购物车',
                meta: { title: '我的购物车', icon: 'index', affix: false, noCache: true }
            },
            {
                path: '/myCollection/index',
                component: (resolve) => require(['../views/indicators/myCollection/myCollection'], resolve),
                name: '我的收藏',
                meta: { title: '我的收藏', icon: 'index', affix: false, noCache: true }
            },
            {
                path: '/dataMonitor/index',
                component: (resolve) => require(['../views/indicators/dataMonitor/dataMonitor'], resolve),
                name: '平台访问数据统计监控',
                meta: { title: '平台访问数据统计监控', icon: 'index', affix: false, noCache: true }
            }
        ]
    },
    {
        path: '/dataServicePlatform',
        component: Layout,
        hidden: false,
        redirect: 'noredirect',
        meta: { title: "数据服务平台", icon: 'index', affix: false, noCache: true },
        children: [
            {
                path: 'myService',
                component: (resolve) => require(['../views/indicators/dataServicePlatform/myService'], resolve),
                name: '我的服务',
                meta: { title: '我的服务', icon: 'index', affix: false, noCache: true }
            },
            {
                path: 'appManagement',
                component: (resolve) => require(['../views/indicators/dataServicePlatform/appManagement'], resolve),
                name: '应用管理',
                meta: { title: '应用管理', icon: 'index', affix: false, noCache: true }
            },
            {
                path: 'applyForApi',
                hidden: true,
                component: (resolve) => require(['../views/indicators/dataServicePlatform/applyForApi'], resolve),
                name: 'API申请',
                meta: { title: 'API申请', icon: 'index', affix: false, noCache: true }
            },
            {
                path: 'editApi',
                hidden: true,
                component: (resolve) => require(['../views/indicators/dataServicePlatform/applyForApi'], resolve),
                name: 'API编辑',
                meta: { title: 'API编辑', icon: 'index', affix: false, noCache: true }
            },
            {
                path: 'apiDetail',
                hidden: true,
                component: (resolve) => require(['../views/indicators/dataServicePlatform/apiDetail'], resolve),
                name: 'API详情',
                meta: { title: 'API详情', icon: 'index', affix: false, noCache: true }
            },
            {
                path: 'applyForDoc',
                hidden: true,
                component: (resolve) => require(['../views/indicators/dataServicePlatform/applyForDoc'], resolve),
                name: '文件申请',
                meta: { title: '文件申请', icon: 'index', affix: false, noCache: true }
            },
            {
                path: 'editDoc',
                hidden: true,
                component: (resolve) => require(['../views/indicators/dataServicePlatform/applyForDoc'], resolve),
                name: '文件编辑',
                meta: { title: '文件编辑', icon: 'index', affix: false, noCache: true }
            },
            {
                path: 'docDetail',
                hidden: true,
                component: (resolve) => require(['../views/indicators/dataServicePlatform/docDetail'], resolve),
                name: '文件详情',
                meta: { title: '文件详情', icon: 'index', affix: false, noCache: true }
            },
            {
                path: 'applyForApp',
                hidden: true,
                component: (resolve) => require(['../views/indicators/dataServicePlatform/applyForApp'], resolve),
                name: '应用申请',
                meta: { title: '应用申请', icon: 'index', affix: false, noCache: true }
            },
            {
                path: 'editApp',
                hidden: true,
                component: (resolve) => require(['../views/indicators/dataServicePlatform/applyForApp'], resolve),
                name: '应用编辑',
                meta: { title: '应用编辑', icon: 'index', affix: false, noCache: true }
            },
            {
                path: 'appDetail',
                hidden: true,
                component: (resolve) => require(['../views/indicators/dataServicePlatform/appDetail'], resolve),
                name: '应用详情',
                meta: { title: '应用详情', icon: 'index', affix: false, noCache: true }
            },
        ]
    },
    {
        path: '/laboratory',
        component: Layout,
        hidden: false,
        redirect: 'noredirect',
        meta: { title: "数据实验室", icon: 'index', affix: false, noCache: true },
        children: [
            /* {
                path: 'sqlAutoAnalysis',
                component: (resolve) => require(['../views/indicators/dataLab/sqlAnalysis'], resolve),
                name: 'SQL自助分析',
                meta: { title: 'SQL自助分析', icon: 'index', affix: false, noCache: true }
            }, */
/*            {
                path: 'sqlAutoAnalysis',
                component: (resolve) => require(['../views/indicators/dataLab/sqlAnalysis/sqlAnalysis'], resolve),
                name: 'SQL自助分析',
                meta: { title: 'SQL自助分析', icon: 'index', affix: false, noCache: true }
            },*/
            {
                path: 'sqlFlexibleAnalysis',
                component: (resolve) => require(['../views/indicators/dataLab/sqlAnalysis/sqlFlexibleAnalysis'], resolve),
                name: 'SQL查询',
                meta: { title: 'SQL查询', icon: 'index', affix: false, noCache: true }
            },
            {
                path: 'approvalInfos',
                component: (resolve) => require(['../views/indicators/dataLab/datasearch/approvalInfos'], resolve),
                name: '原始数据导出部门审核',
                meta: { title: '原始数据导出部门审核', icon: 'index', affix: false, noCache: true }
            },
            {
                path: 'dataImportPage',
                component: (resolve) => require(['../views/indicators/dataLab/datasearch/dataImportPage'], resolve),
                name: '数据导入',
                meta: { title: '数据导入', icon: 'index', affix: false, noCache: true }
            },
            {
                path: 'exportResultDownload',
                component: (resolve) => require(['../views/indicators/dataLab/datasearch/exportResultDownload'], resolve),
                name: '导出结果下载',
                meta: { title: '导出结果下载', icon: 'index', affix: false, noCache: true }
            },
            {
                path: 'maskingRulesConfig',
                component: (resolve) => require(['../views/indicators/dataLab/datasearch/maskingRulesConfig'], resolve),
                name: '脱敏规则配置',
                meta: { title: '脱敏规则配置', icon: 'index', affix: false, noCache: true }
            },
            {
                path: 'dataworksAcProject',
                component: (resolve) => require(['../views/indicators/dataLab/datasearch/dataworksAcProject'], resolve),
                name: 'Dataworks账户维护',
                meta: { title: 'Dataworks账户维护', icon: 'index', affix: false, noCache: true }
            },
            {
                path: 'umRelate',
                component: (resolve) => require(['../views/indicators/dataLab/datasearch/umRelate'], resolve),
                name: 'UM用户关联',
                hidden: true,
                meta: { title: 'UM用户关联', icon: 'index', affix: false, noCache: true }
            },
            {
                path: 'userBehaviorLog',
                component: (resolve) => require(['../views/indicators/dataLab/datasearch/userBehaviorLog'], resolve),
                name: '用户行为日志',
                meta: { title: '用户行为日志', icon: 'index', affix: false, noCache: true }
            },
            {
                path: 'devopsLog',
                component: (resolve) => require(['../views/indicators/dataLab/datasearch/devopsLog'], resolve),
                name: '运维日志',
                meta: { title: '运维日志', icon: 'index', affix: false, noCache: true }
            },
         /*   {
                path: 'taskExportPlan',
                component: (resolve) => require(['../views/indicators/dataLab/datasearch/taskExportPlan'], resolve),
                name: 'taskExportPlan',
                meta: { title: 'taskExportPlan', icon: 'index', affix: false, noCache: true }
            },*/
        ]
    },
    /* {
        path: '/monitorModule',
        component: Layout,
        hidden: false,
        redirect: 'noredirect',
        meta: { title: "服务监控模块", icon: 'index', affix: false, noCache: true },
        children: [
            {
                path: 'apiUsage',
                component: (resolve) => require(['../views/indicators/monitorModule/apiUsage'], resolve),
                name: 'API使用情况',
                meta: { title: 'API使用情况', icon: 'index', affix: false, noCache: true }
            },
            {
                path: 'docGeneration',
                component: (resolve) => require(['../views/indicators/monitorModule/docGeneration'], resolve),
                name: '文件生成情况',
                meta: { title: '文件生成情况', icon: 'index', affix: false, noCache: true }
            },
        ]
    }, */
    /* {
        path: '/administrator',
        component: Layout,
        hidden: false,
        redirect: 'noredirect',
        meta: { title: "中台管理员", icon: 'index', affix: false, noCache: true },
        children: [
            {
                path: 'appManagement',
                component: (resolve) => require(['../views/indicators/administrator/appManagement'], resolve),
                name: 'API使用情况',
                meta: { title: '应用管理', icon: 'index', affix: false, noCache: true }
            },
            {
                path: 'appManagement1',
                component: (resolve) => require(['../views/indicators/administrator/appManagement'], resolve),
                name: '文件生成情况',
                meta: { title: '应用管理', icon: 'index', affix: false, noCache: true }
            },
        ]
    }, */
    {
        path: '/detailsView',
        component: Layout,
        hidden: true,
        redirect: 'noredirect',
        children: [
            {
                path: 'table',
                component: (resolve) => require(['../views/indicators/detailsView/tableDetailsView'], resolve),
                name: '表详情',
                hidden: true,
                meta: { title: '表详情', icon: 'index', affix: false, noCache: true }
            },
            {
                path: 'api',
                component: (resolve) => require(['../views/indicators/detailsView/apiDetailsView'], resolve),
                name: 'API详情',
                hidden: true,
                meta: { title: 'API详情', icon: 'index', affix: false, noCache: true }
            },
            {
                path: 'target',
                component: (resolve) => require(['../views/indicators/detailsView/targetDetailsView'], resolve),
                name: '指标详情',
                hidden: true,
                meta: { title: '指标详情', icon: 'index', affix: false, noCache: true }
            },
            {
                path: 'label',
                component: (resolve) => require(['../views/indicators/detailsView/labelDetailsView'], resolve),
                name: '标签详情',
                hidden: true,
                meta: { title: '标签详情', icon: 'index', affix: false, noCache: true }
            },
        ]
    },
    {
        path: '/detailsMod',
        component: Layout,
        hidden: true,
        redirect: 'noredirect',
        children: [
            {
                path: 'table',
                component: (resolve) => require(['../views/indicators/detailsView/tableDetailsView'], resolve),
                name: '表修改',
                hidden: true,
                meta: { title: '表修改', icon: 'index', affix: false, noCache: true }
            },
            {
                path: 'api',
                component: (resolve) => require(['../views/indicators/detailsView/apiDetailsView'], resolve),
                name: 'API修改',
                hidden: true,
                meta: { title: 'API修改', icon: 'index', affix: false, noCache: true }
            },
            {
                path: 'target',
                component: (resolve) => require(['../views/indicators/detailsView/targetDetailsView'], resolve),
                name: '指标修改',
                hidden: true,
                meta: { title: '指标修改', icon: 'index', affix: false, noCache: true }
            },
            {
                path: 'label',
                component: (resolve) => require(['../views/indicators/detailsView/labelDetailsView'], resolve),
                name: '标签修改',
                hidden: true,
                meta: { title: '标签修改', icon: 'index', affix: false, noCache: true }
            },
        ]
    },

]

export const filterAsyncRouter = (routers) => { // 遍历后台传来的路由字符串，转换为组件对象
    return routers.filter(router => {
        if (router.component) {
            if (router.component === 'Layout') { // Layout组件特殊处理
                router.component = Layout
            } else if (router.component === 'Submenu' || router.component === 'submenu') {
                router.component = Submenu
            } else {
                // console.log('================filterAsyncRouter>>>', router)
                if (router.path.indexOf('?') > 0) { // add by Suny 20200515 处理参数
                    router.meta.cparam = router.path.substring(router.path.indexOf('?'))
                    router.path = router.path.substring(0, router.path.indexOf('?'))
                }
                const component = router.component
                router.component = loadView(component)
                //console.log('-->>>>>>>>#====',router.component)
            }
        }
        if (router.children && router.children.length) {
            router.children = filterAsyncRouter(router.children)
        }
        return true
    })
}
export default new Router({
    mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap
})
