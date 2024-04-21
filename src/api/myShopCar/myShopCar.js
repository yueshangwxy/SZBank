import request from '@/utils/request'

let apiURL = {
    // 查询购物车
    qryShopCar: '/asset/shopping/getShoppingCart',
    // 删除购物车
    delShopCar: '/asset/shopping/deleteShoppingCart',
    // 查看详情
    viewShopCarDetail: '/asset/shopping/getTableByAssetId',
    // 审批
    initiateApproval: '/asset/workflow/tasks/startTask',
    // 加入购物车
    addShopCar: '/asset/shopping/addShopping'
}
export const myShopCar = {
    qryShopCar: (params) => {
        return request({
            url: apiURL.qryShopCar,
            method: 'post',
            data: params,
            params: params,
        })
    },
    delShopCar: (params) => {
        return request({
            url: apiURL.delShopCar,
            method: 'post',
            data: params,
        })
    },
    viewShopCarDetail: (params) => {
        return request({
            url: apiURL.viewShopCarDetail,
            method: 'post',
            data: params,
        })
    },
    initiateApproval: (params) => {
        return request({
            url: apiURL.initiateApproval,
            method: 'post',
            data: params,
        })
    },
    addShopCar: (params) => {
        return request({
            url: apiURL.addShopCar,
            method: 'post',
            data: params,
        })
    },
}
