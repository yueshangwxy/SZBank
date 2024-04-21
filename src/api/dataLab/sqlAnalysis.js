import request from '@/utils/request'

const url = '/dataLab/sqlAnalysis'


export function getTablesWithPermissions() {
    return request({
        url: url + "/getTablesWithPermissions",
        method: 'get'
    })
}
export function getListBySQL(data) {
    return request({
        url: url + "/getListBySQL",
        method: 'post',
        data
    })
}
export function downLoad(data){
    return request({
        url: url+"/downLoad",
        method: 'post',
        data
    })
}

export function downLoadSourceData(data){
    return request({
        url: url+"/downLoadSourceData",
        method: 'post',
        data
    })
}

export function getTableColumn(projectName,tableName) {
    return request({
        url: url + "/getTableColumn?projectName="+projectName+"&tableName="+tableName,
        method: 'get'
    })
}

export function getSession() {
    return request({
        url:  "/dataLab/getSession",
        method: 'get'
    })
}

export function stop() {
    return request({
        url:  "/dataLab/stop",
        method: 'get'
    })
}