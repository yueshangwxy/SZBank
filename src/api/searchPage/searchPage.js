import request from '@/utils/request'

let apiURL = {
    // 目录树  全部表  get
    getTree: '/asset/classify/getTree',
    // 目录树  我的表  get 
    getAuthTree: '/asset/classify/getAuthTree',
    // 关键字检索  post
    getListByKeywords: '/asset/search/getListByKeywords',
    // 类型检索  get ----  废弃
    getListByClassify: '/asset/search/getListByClassify',
    // 表资产申请权限 post
    applyForAuthority: '/asset/workflow/tasks/startTask',
    // 资产添加收藏 post
    addFavorite: '/assets/favorite/add',
    // 资产取消收藏 post
    delFavorite: '/assets/favorite/cancel',
    // 查看表数据预览 get
    previewTableData: '/assetsTable/preview/getListByName',
    // 详情查看  post
    getAssetsDetail: '/asset/search/getDetail',
    // 表资产添加购物车 post
    addShopping: '/asset/shopping/addShopping',
    // 表资产取消购物车 post
    deleteShopping: '/asset/shopping/deleteShoppingCart',
    // 查询所有应用  get
    getAppList: '/asset/search/getAppList',
    // 查询指标类型, 一级分类，二级分类  get
    getTargetSelect: '/asset/search/getTargetSelect',
    // 查询部门树
    getDeptTree: '/asset/search/findDeptTree',
    // 检索mysql库全部资产(点击左边目录树)  post   --- 原类型检索  --- 废弃
    getAssetPage: '/asset/search/getAssetPage',
    // 申请访问  post
    applyForAccess: '/asset/api/apply/add',
    // 我的表树状图点击接口
    getSelfTablePage: '/assets/operate/table/getSelfTablePage',
    // 标签下拉框
    getLabelSelect: '/asset/search/getLabelSelect',
}
export const searchPage = {
    getTree: (params) => {
        return request({
            url: apiURL.getTree,
            method: 'get',
            params: params,
        })
    },
    getAuthTree: (params) => {
        return request({
            url: apiURL.getAuthTree,
            method: 'get',
            params: params,
        })
    },
    getListByKeywords: (params) => {
        return request({
            url: apiURL.getListByKeywords,
            method: 'post',
            data: params,
        })
    },
    getListByClassify: (params) => {
        return request({
            url: apiURL.getListByClassify,
            method: 'get',
            params: params,
        })
    },
    applyForAuthority: (params) => {
        return request({
            url: apiURL.applyForAuthority,
            method: 'post',
            data: params,
        })
    },
    addFavorite: (params) => {
        return request({
            url: apiURL.addFavorite,
            method: 'post',
            data: params,
        })
    },
    delFavorite: (params) => {
        return request({
            url: apiURL.delFavorite,
            method: 'post',
            data: params,
        })
    },
    previewTableData: (params) => {
        return request({
            url: apiURL.previewTableData,
            method: 'get',
            params: params,
        })
    },
    getAssetsDetail: (params) => {
        return request({
            url: apiURL.getAssetsDetail,
            method: 'post',
            data: params,
        })
    },
    addShopping: (params) => {
        return request({
            url: apiURL.addShopping,
            method: 'post',
            data: params,
        })
    },
    deleteShopping: (params) => {
        return request({
            url: apiURL.deleteShopping,
            method: 'post',
            data: params,
        })
    },
    getAppList: (params) => {
        return request({
            url: apiURL.getAppList,
            method: 'get',
            params: params,
        })
    },
    getTargetSelect: (params) => {
        return request({
            url: apiURL.getTargetSelect,
            method: 'get',
            params: params,
        })
    },
    getDeptTree: (params) => {
        return request({
            url: apiURL.getDeptTree,
            method: 'get',
            params: params,
        })
    },
    getAssetPage: (params) => {
        return request({
            url: apiURL.getAssetPage,
            method: 'post',
            data: params,
        })
    },
    applyForAccess: (params) => {
        return request({
            url: apiURL.applyForAccess,
            method: 'post',
            data: params,
        })
    },
    getSelfTablePage: (params) => {
        return request({
            url: apiURL.getSelfTablePage,
            method: 'post',
            data: params,
            params: params,
        })
    },
    getLabelSelect: (params) => {
        return request({
            url: apiURL.getLabelSelect,
            method: 'get',
            params: params,
        })
    },
}
