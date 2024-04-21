import request from '@/utils/request'

const url = '/datalab/dataworksAcProject'

export function getDataworksAccount() {
    return request({
        url: url + "/getDataworksAccount",
        method: 'get'
    })
}