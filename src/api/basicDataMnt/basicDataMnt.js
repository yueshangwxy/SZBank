import request from '@/utils/request'

let apiURL = {
    // 分类分级导入
    importCcn: '/asset/excel/importCcn',
    // 属主信息导入
    importMessage: '/asset/excel/importMessage',
}
export const basicDataMnt = {
    importCcn: (params) => {
        return request({
            url: apiURL.importCcn,
            method: 'post',
            data: params,
        })
    },
    importMessage: (params) => {
        return request({
            url: apiURL.importMessage,
            method: 'post',
            data: params,
        })
    },
}
