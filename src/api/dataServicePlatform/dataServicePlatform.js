import request from '@/utils/request'

let apiURL = {
    // API和文件服务申请
    applyForService: '/serviceApply',
    // 我的服务列表查询
    qryServiceList: '/serviceApply',
    // 查看服务详情
    viewServiceDetail: '/serviceApply/query',
    // 服务更新
    serviceUpdate: '/serviceApply',
    // 上线
    serviceOnline: '/serviceApply/open',
    // 下线
    serviceOffline: '/serviceApply/close',
    // 应用申请
    applyForApp: '/applicationInfo/save',
    // 应用管理
    qryAppList: '/applicationInfo',
    // 查看应用详情
    viewAppDetail: '/applicationInfo/query',
    // 应用更新
    updateApp: '/applicationInfo/update',
    // 应用删除
    deleteApp: '/applicationInfo/delete',
    // 应用应有的服务
    qryAppService: '/applicationInfo/queryAppService',
    // 应用可访问的服务
    qryAppAccessService: '/applicationInfo/queryAppAccessService',
    // 查询所有已上线的应用
    qryOpenApp: '/applicationInfo/queryOpenApplication',
    // 查询部门树
    findDeptTree: '/syeDept/findDeptTree',
}
export const dataServicePlatform = {
    applyForService: (params) => {
        return request({
            url: apiURL.applyForService,
            method: 'post',
            data: params,
        })
    },
    qryServiceList: (params) => {
        return request({
            url: apiURL.qryServiceList,
            method: 'get',
            params: params,
        })
    },
    viewServiceDetail: (params) => {
        return request({
            url: apiURL.viewServiceDetail,
            method: 'get',
            params: params,
        })
    },
    serviceUpdate: (params) => {
        return request({
            url: apiURL.serviceUpdate,
            method: 'put',
            data: params,
        })
    },
    serviceOnline: (params) => {
        return request({
            url: apiURL.serviceOnline,
            method: 'post',
            data: params,
            params: params,
        })
    },
    serviceOffline: (params) => {
        return request({
            url: apiURL.serviceOffline,
            method: 'post',
            data: params,
            params: params,
        })
    },
    applyForApp: (params) => {
        return request({
            url: apiURL.applyForApp,
            method: 'post',
            data: params,
        })
    },
    qryAppList: (params) => {
        return request({
            url: apiURL.qryAppList,
            method: 'get',
            params: params,
        })
    },
    viewAppDetail: (params) => {
        return request({
            url: apiURL.viewAppDetail,
            method: 'get',
            params: params,
        })
    },
    updateApp: (params) => {
        return request({
            url: apiURL.updateApp,
            method: 'post',
            data: params,
        })
    },
    deleteApp: (params) => {
        return request({
            url: apiURL.deleteApp,
            method: 'delete',
            params: params,
        })
    },
    qryAppService: (params) => {
        return request({
            url: apiURL.qryAppService,
            method: 'get',
            params: params,
        })
    },
    qryAppAccessService: (params) => {
        return request({
            url: apiURL.qryAppAccessService,
            method: 'get',
            params: params,
        })
    },
    qryOpenApp: (params) => {
        return request({
            url: apiURL.qryOpenApp,
            method: 'get',
            params: params,
        })
    },
    findDeptTree: (params) => {
        return request({
            url: apiURL.findDeptTree,
            method: 'get',
            params: params,
        })
    },

}
