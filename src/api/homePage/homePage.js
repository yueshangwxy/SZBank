import request from '@/utils/request'

let apiURL = {
    // 查询三级目录
    queryThirdDir: '/PncsServer/asset/homepage/queryThirdDir',
    getCatalogueTreeSort: '/assets/catalogue/getCatalogueTreeSort',
    // 查询资产数量
    queryAssetsCount: '/homePage/countAssets', // /DataAssetServer/homePage/countAssets
    // 查询部门笔数
    queryDeptCount: '/homePage/countAssetsByDept', // /DataAssetServer/homePage/countAssetsByDept
    // 查询资产分类饼图数据
    queryPieData: '/PncsServer/asset/homepage/queryPieData',
    // 查询业务趋势折线图数据
    queryLineData: '/homePage/getBusinessTrendLineData',
    // // 查询机构规模排行柱状图数据
    queryBarData: '/homePage/queryDeptRankList',
    // 根据部门编号查询机构规模排行数据
    queryOrganizationScaleRanking: 'PncsServer/asset/homepage/queryOrganizationScaleRanking?id=',
    // 查询资产数据增长情况多折线图数据
    queryLinesData: '/homePage/queryLinesData',
    // 查询我的各个资产收藏
    queryCollection: '/assets/favorite/count', // /DataAssetServer/assets/favorite/count

}
export const homePage = {
    queryThirdDir: (params) => {
        return request({
            url: apiURL.queryThirdDir,
            method: 'post',
            data: params,
        })
    },
    getCatalogueTreeSort: (params) => {
        return request({
            url: apiURL.getCatalogueTreeSort,
            method: 'get',
        })
    },
    queryAssetsCount: (params) => {
        return request({
            url: apiURL.queryAssetsCount,
            method: 'get',
        })
    },
    queryDeptCount: (params) => {
        return request({
            url: apiURL.queryDeptCount,
            method: 'get',
        })
    },
    queryPieData: (params) => {
        return request({
            url: apiURL.queryPieData,
            method: 'get',
        })
    },
    queryLineData: (params) => {
        return request({
            url: apiURL.queryLineData,
            method: 'get',
        })
    },
    queryOrganizationScaleRanking: (params) => {
        return request({
            url: apiURL.queryBarData + "?deptId=" + params,
            method: 'get',
        })
    },
    queryLinesData: (params) => {
        return request({
            url: apiURL.queryLinesData,
            method: 'get',
        })
    },
    queryCollection: (params) => {
        return request({
            url: apiURL.queryCollection,
            method: 'get',
        })
    },
}
