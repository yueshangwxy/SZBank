import request from '@/utils/request'

let apiURL = {
    // 获取全部目录列表 
    // getAllCatalogueList: '/assets/operate/table/getAllCatalogueList',
    getAllCatalogueList: '/assets/catalogue/getCatalogueTreeSort',
    //  获取有数据的目录列表
    getCatalogueList: '/assets/operate/table/getCatalogueList',
    // api目录
    getCatalogueListApi: '/assets/operate/api/getCatalogueList',
    // 指标
    getCatalogueListTarget: '/assets/operate/target/getCatalogueList',
    // 标签
    getCatalogueListLabel: '/assets/operate/label/getCatalogueList',
    // ---------------
    // 表运营条件查询
    getAppointTable: '/assets/operate/table/getAppointTable',
    // 表详情
    getTableById: '/assets/operate/table/getTableById',
    // 修改状态  -- 发布 下线
    updateTableState: '/assets/operate/table/updateTableState',
    // 更新表资产 
    updateAssetTable: '/assets/operate/table/updateAssetTable',
    // ---------------
    // api运营条件查询  get
    getAppointApi: '/assets/operate/api/getAppointApi',
    // api详情 get
    getApiById: '/assets/operate/api/getApiById',
    // 修改api资产状态（发布、下线） get
    updateApiState: '/assets/operate/api/updateApiState',
    // 更新api资产 post
    updateAssetApi: '/assets/operate/api/updateAssetApi',
    // ---------------
    // 指标运营条件查询  get
    getAppointTarget: '/assets/operate/target/getAppointTarget',
    // 指标详情 get
    getTargetById: '/assets/operate/target/getTargetById',
    // 修改指标资产状态（发布、下线） get
    updateTargetState: '/assets/operate/target/updateTargetState',
    // 更新指标资产 post
    updateAssetTarget: '/assets/operate/target/updateAssetTarget',
    // ---------------
    // 标签运营条件查询  get
    getAppointLabel: '/assets/operate/label/getAppointLabel',
    // 标签详情 get
    getLabelById: '/assets/operate/label/getLabelById',
    // 修改标签资产状态（发布、下线） get
    updateLabelState: '/assets/operate/label/updateLabelState',
    // 更新标签资产 post
    updateAssetLabel: '/assets/operate/label/updateAssetLabel',
    // 访问和监控
    selectVisits: '/asset/monitor/selectVisits',
    // 获取归属应用---api的下拉列表
    getApplication: '/assets/operate/api/getApplication',
    // 获取分级数据
    getClassifyList: '/assets/operate/target/getClassifyList',
    //拿实验室审批详情
    getLabDetailById: '/datalab/approvalInfo/getDetailById',
}
export const assetOperation = {
    // 目录
    getAllCatalogueList: (params) => {
        return request({
            url: apiURL.getAllCatalogueList,
            method: 'get',
            params: params,
        })
    },
    getCatalogueList: (params) => {
        return request({
            url: apiURL.getCatalogueList,
            method: 'get',
            params: params,
        })
    },
    getCatalogueListApi: (params) => {
        return request({
            url: apiURL.getCatalogueListApi,
            method: 'get',
            params: params,
        })
    },
    getCatalogueListTarget: (params) => {
        return request({
            url: apiURL.getCatalogueListTarget,
            method: 'get',
            params: params,
        })
    },
    getCatalogueListLabel: (params) => {
        return request({
            url: apiURL.getCatalogueListLabel,
            method: 'get',
            params: params,
        })
    },
    // 表
    getAppointTable: (params) => {
        return request({
            url: apiURL.getAppointTable,
            method: 'get',
            params: params,
        })
    },
    getTableById: (params) => {
        return request({
            url: apiURL.getTableById,
            method: 'get',
            params: params,
        })
    },
    updateTableState: (params) => {
        return request({
            url: apiURL.updateTableState,
            method: 'get',
            params: params,
        })
    },
    updateAssetTable: (params) => {
        return request({
            url: apiURL.updateAssetTable,
            method: 'post',
            data: params,
        })
    },
    // API
    getAppointApi: (params) => {
        return request({
            url: apiURL.getAppointApi,
            method: 'get',
            params: params,
        })
    },
    getApiById: (params) => {
        return request({
            url: apiURL.getApiById,
            method: 'get',
            params: params,
        })
    },
    updateApiState: (params) => {
        return request({
            url: apiURL.updateApiState,
            method: 'get',
            params: params,
        })
    },
    updateAssetApi: (params) => {
        return request({
            url: apiURL.updateAssetApi,
            method: 'post',
            data: params,
        })
    },
    // 指标
    getAppointTarget: (params) => {
        return request({
            url: apiURL.getAppointTarget,
            method: 'get',
            params: params,
        })
    },
    getTargetById: (params) => {
        return request({
            url: apiURL.getTargetById,
            method: 'get',
            params: params,
        })
    },
    updateTargetState: (params) => {
        return request({
            url: apiURL.updateTargetState,
            method: 'get',
            params: params,
        })
    },
    updateAssetTarget: (params) => {
        return request({
            url: apiURL.updateAssetTarget,
            method: 'post',
            data: params,
        })
    },
    // 标签
    getAppointLabel: (params) => {
        return request({
            url: apiURL.getAppointLabel,
            method: 'get',
            params: params,
        })
    },
    getLabelById: (params) => {
        return request({
            url: apiURL.getLabelById,
            method: 'get',
            params: params,
        })
    },
    updateLabelState: (params) => {
        return request({
            url: apiURL.updateLabelState,
            method: 'get',
            params: params,
        })
    },
    updateAssetLabel: (params) => {
        return request({
            url: apiURL.updateAssetLabel,
            method: 'post',
            data: params,
        })
    },
    // 访问和监控
    selectVisits: (params) => {
        return request({
            url: apiURL.selectVisits,
            method: 'get',
            params: params,
        })
    },
    // 获取归属应用---api的下拉列表
    getApplication: (params) => {
        return request({
            url: apiURL.getApplication,
            method: 'get',
            params: params,
        })
    },
    // 获取分级数据
    getClassifyList: (params) => {
        return request({
            url: apiURL.getClassifyList,
            method: 'get',
            params: params,
        })
    },

    // 获取详情
    getLabDetailById: (params) => {
        return request({
            url: apiURL.getLabDetailById,
            method: 'get',
            params: params,
        })
    },
}
