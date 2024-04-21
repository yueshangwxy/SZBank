import request from '@/utils/request'

let apiURL = {
    // 我的申请列表
    appliedProcess: '/asset/workflow/myTasks/appliedProcess',
    // 待我审批列表
    waitApprove: '/asset/workflow/myTasks/waitApprove',
    // 我已审批列表
    alreadyApprove: '/asset/workflow/myTasks/alreadyApprove',
    // 通过  拒绝
    completeTask: '/asset/workflow/tasks/completeTask',
    // 实验室通过  拒绝
    labCompleteTask: '/datalab/approvalInfo/approve',

}
export const myProcess = {
    appliedProcess: (params) => {
        return request({
            url: apiURL.appliedProcess,
            method: 'get',
            params: params,
        })
    },
    waitApprove: (params) => {
        return request({
            url: apiURL.waitApprove,
            method: 'get',
            params: params,
        })
    },
    alreadyApprove: (params) => {
        return request({
            url: apiURL.alreadyApprove,
            method: 'get',
            params: params,
        })
    },
    completeTask: (params) => {
        return request({
            url: apiURL.completeTask,
            method: 'post',
            data: params,
            params: params,
        })
    },
    labCompleteTask: (params) => {
        return request({
            url: apiURL.labCompleteTask,
            method: 'post',
            data: params,
            params: params,
        })
    },
}
