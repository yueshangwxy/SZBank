import request from '@/utils/request'

let apiUrl = {
    queryMyCollection: '/assets/favorite/page',
}

export const myCollection = {
    queryMyCollection: (params) => {
        return request({
            url: apiUrl.queryMyCollection,
            method: 'get',
            params
        })
    }
}