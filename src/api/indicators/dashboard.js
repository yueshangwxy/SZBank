import request from '@/utils/request'
/*import data from './dashboard-data.json'
import {getYesterday} from '@eladmin/utils/data_format'*/

/*const mock = {
    "periodDate": true,
    "productBal": true,
    "productCustCount": true,
    "trendAnalysis": true,
    "depositAnalysis": true,
    "loanFiveClass": true,
    "badnessLoan": true,
    "orgDlbalOrder": true,
    "todoCount": true,
    "subscribeRpt": false,
    "getDbpPath" : false
}*/
const url = 'v1/core/dashboard'
/*
export function periodDate() {
    if (mock["periodDate"]) {
        return new Promise(function (resolve, reject) {
            resolve({code: 0, data: getYesterday()})
        })
    } else {
        return request({
            url: url + '/period-date',
            method: 'get'
        })
    }
}

export function productBal(date) {
    if (mock["productBal"]) {
        return new Promise(function (resolve, reject) {
            resolve({code: 0, data: data.productBal})
        })
    } else {
        return request({
            url: url + '/product-bal/' + date,
            method: 'get'
        })
    }
}

export function productCustCount(date) {
    if (mock["productCustCount"]) {
        return new Promise(function (resolve, reject) {
            resolve({code: 0, data: data.productCustCount})
        })
    } else {
        return request({
            url: url + '/product-cust-count/' + date,
            method: 'get'
        })
    }
}

export function trendAnalysis(date) {
    if (mock["trendAnalysis"]) {
        return new Promise(function (resolve, reject) {
            resolve({code: 0, data: data.trendAnalysis})
        })
    } else {
        return request({
            url: url + '/trend-analysis/' + date,
            method: 'get'
        })
    }
}

export function depositAnalysis(date) {
    if (mock["depositAnalysis"]) {
        return new Promise(function (resolve, reject) {
            resolve({code: 0, data: data.depositAnalysis})
        })
    } else {
        return request({
            url: url + '/deposit-analysis/' + date,
            method: 'get'
        })
    }
}

export function loanFiveClass(date) {
    if (mock["loanFiveClass"]) {
        return new Promise(function (resolve, reject) {
            resolve({code: 0, data: data.loanFiveClass})
        })
    } else {
        return request({
            url: url + '/loan-five-class/' + date,
            method: 'get'
        })
    }
}

export function badnessLoan(date) {
    if (mock["badnessLoan"]) {
        return new Promise(function (resolve, reject) {
            resolve({code: 0, data: data.badnessLoan})
        })
    } else {
        return request({
            url: url + '/badness-loan/' + date,
            method: 'get'
        })
    }
}

export function orgDlbalOrder(date) {
    if (mock["orgDlbalOrder"]) {
        return new Promise(function (resolve, reject) {
            resolve({code: 0, data: data.orgDlbalOrder})
        })
    } else {
        return request({
            url: url + '/org-dlbal-order/' + date,
            method: 'get'
        })
    }
}*/

/**
 * 待办事项数量查询
 * @returns {Promise<unknown>|AxiosPromise}
 */
export function todoCount() {
    return request({
        url: 'workflow/myTask/waitApprove',
        method: 'get'
    })
}
/**
 * 待办事项数量查询
 * @returns {Promise<unknown>|AxiosPromise}
 */
export function subscribeRpt() {
    return request({
        url: url + '/subscribe/subscribeRpt',
        method: 'get'
    })
}
/*
export function getDbpPath() {
    if (mock["getDbpPath"]) {
        return new Promise(function (resolve, reject) {
            resolve({code: 0, data: {total: 0}})
        })
    } else {
        return request({
            url: url + '/dbp/getDbpPath',
            method: 'get'
        })
    }
}*/
