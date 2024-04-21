import request from '@/utils/request'

const url = '/homePage'

export function countAssets() {
    return request({
        url: url+"/countAssets",
        method: 'get'
    })
}

export function countAssetsByDept() {
    return request({
        url: url+"/countAssetsByDept",
        method: 'get'
    })
}

export function topTen() {
    return request({
        url: url+"/topTen",
        method: 'get'
    })
}

export function data2Charts() {
    return request({
        url: url+"/data2Charts",
        method: 'get'
    })
}
