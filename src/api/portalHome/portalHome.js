import request from '@/utils/request'

let apiURL = {
    // 我的工单
    qryWorkSheetList: '/home/workSheet/tableList',
    // 用户管理 -- 列表
    qryUserListPage: '/sysUser/listPage',
    // dataworks账号列表
    getDataWorksList:'/sysUser/listDataworks',
    // 修改dataworks
    updateDataworks: '/sysUser/updateDataworks',
    // 用户管理 -- 机构树
    getSysDeptList: '/sysDept/getSysDeptList',
    // 我的工单  -- 数据服务平台列表
    qryServiceWorkSheet: '/myWork',
    // 我的工单  -- 数据服务平台  api权限申请审批
    applyForApiAuth: '/myWork',
    // 我的工单 -- 数据服务平台 审批链路
    approvalLink: '/myWork/approvalLink',
    // 角色管理 -- 列表
    qryRoleListPage: '/sysRole/listPage',
    // 角色管理  -- 获取租户列表
    getTenants: '/sysRole/getTenants',
    // 角色管理  -- 新增角色
    createRole: '/sysRole/createRole',
    // 角色管理  -- 修改角色
    updateRole: '/sysRole/updateRole',
    // 角色管理  -- 删除角色
    deleteRole: '/sysRole/deleteRole',
    // 角色管理  -- 添加用户  查询角色授权的用户
    queryUserByRole: '/sysRole/queryUserByRole',
    // 角色管理  -- 添加用户  保存角色授权用户
    saveUserRoles: '/sysRole/saveUserRoles',
    // 机构管理  -- 列表
    qryOrgListPage: '/sysDept/listDept',
    // 机构管理  -- 机构详情
    getDeptById: '/sysDept/getDeptById',
    // 权限管理  -- 点击角色显示当前角色下的菜单
    showRolesMenu: '/rolesAuth/menu/role',
    // 权限管理  -- 保存按钮
    saveRoleMenu: '/rolesAuth/saveRoleMenu',
    //我的工单-数据查询平台
    qryLabWorkSheet: '/datalab/approvalInfo/list',
    // 我的工单 -- 数据服务平台 审批链路
    labApprovalLink: '/datalab/approvalInfo/approvalLink',
    // 统一数据门户流程审批详情
    getTableByIdToProcessApprove: '/assets/operate/table/getTableByIdToProcessApprove'
}
export const portalHome = {
    qryWorkSheetList: (params) => {
        return request({
            url: apiURL.qryWorkSheetList,
            method: 'post',
            data: params,
        })
    },
    qryUserListPage: (params) => {
        return request({
            url: apiURL.qryUserListPage,
            method: 'get',
            params: params,
        })
    },
    getDataWorksList: (params) => {
        return request({
            url: apiURL.getDataWorksList,
            method: 'get',
            params: params,
        })
    },
    updateDataworks: (params) => {
        return request({
            url: apiURL.updateDataworks,
            method: 'put',
            data: params,
            params: params,
        })
    },
    getSysDeptList: (params) => {
        return request({
            url: apiURL.getSysDeptList,
            method: 'get',
            params: params,
        })
    },
    qryServiceWorkSheet: (params) => {
        return request({
            url: apiURL.qryServiceWorkSheet,
            method: 'get',
            params: params,
        })
    },
    applyForApiAuth: (params) => {
        return request({
            url: apiURL.applyForApiAuth,
            method: 'post',
            data: params,
        })
    },
    approvalLink: (params) => {
        return request({
            url: apiURL.approvalLink,
            method: 'get',
            params: params,
        })
    },
    qryRoleListPage: (params) => {
        return request({
            url: apiURL.qryRoleListPage,
            method: 'get',
            params: params,
        })
    },
    getTenants: (params) => {
        return request({
            url: apiURL.getTenants,
            method: 'get',
            params: params,
        })
    },
    createRole: (params) => {
        return request({
            url: apiURL.createRole,
            method: 'post',
            data: params,
        })
    },
    updateRole: (params) => {
        return request({
            url: apiURL.updateRole,
            method: 'put',
            data: params,
            params: params,
        })
    },
    deleteRole: (params) => {
        return request({
            url: apiURL.deleteRole,
            method: 'put',
            data: params,
            params: params,
        })
    },
    queryUserByRole: (params) => {
        return request({
            url: apiURL.queryUserByRole,
            method: 'get',
            params: params,
        })
    },
    saveUserRoles: (params) => {
        return request({
            url: apiURL.saveUserRoles,
            method: 'post',
            data: params,
        })
    },
    qryOrgListPage: (params) => {
        return request({
            url: apiURL.qryOrgListPage,
            method: 'get',
            params: params,
        })
    },
    getDeptById: (params) => {
        return request({
            url: apiURL.getDeptById,
            method: 'get',
            params: params,
        })
    },
    showRolesMenu: (params) => {
        return request({
            url: "/rolesAuth/menu/role/" + params.id,
            method: 'get',
            params: params,
        })
    },
    saveRoleMenu: (params) => {
        return request({
            url: apiURL.saveRoleMenu,
            method: 'post',
            data: params,
        })
    },
    qryLabWorkSheet: (params) => {
        return request({
            url: apiURL.qryLabWorkSheet,
            method: 'post',
            data: params,
        })
    },
    labApprovalLink: (params) => {
        return request({
            url: apiURL.labApprovalLink,
            method: 'get',
            params: params,
        })
    },
    getTableByIdToProcessApprove: (params) => {
        return request({
            url: apiURL.getTableByIdToProcessApprove,
            method: 'get',
            params: params,
        })
    },
}
