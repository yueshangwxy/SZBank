module.exports = [
    {
        url: '/home/workSheet/tableList',
        type: 'post',
        response: () => {
            let res = {
                assetList: [
                    {
                        num: 123,
                        name: '111',
                        applicant: 'shenqingren',
                        dept: '部门',
                        time: '2022-05-12',
                        status: '状态'
                    },
                    {
                        num: 124,
                        address: 'xxxx',
                        name: '111',
                        desc: 'aaaaaaa',
                        applicant: 'shenqingren',
                        dept: '部门',
                        time: '2022-05-12',
                        status: '状态'
                    },
                    {
                        num: 124,
                        address: 'xxxx',
                        name: '111',
                        desc: 'aaaaaaa',
                        applicant: 'shenqingren',
                        dept: '部门',
                        time: '2022-05-12',
                        status: '状态'
                    },
                    {
                        num: 124,
                        address: 'xxxx',
                        name: '111',
                        desc: 'aaaaaaa',
                        applicant: 'shenqingren',
                        dept: '部门',
                        time: '2022-05-12',
                        status: '状态'
                    },
                    {
                        num: 124,
                        address: 'xxxx',
                        name: '111',
                        desc: 'aaaaaaa',
                        applicant: 'shenqingren',
                        dept: '部门',
                        time: '2022-05-12',
                        status: '状态'
                    },
                    {
                        num: 124,
                        address: 'xxxx',
                        name: '111',
                        desc: 'aaaaaaa',
                        applicant: 'shenqingren',
                        dept: '部门',
                        time: '2022-05-12',
                        status: '状态'
                    },
                    {
                        num: 124,
                        address: 'xxxx',
                        name: '111',
                        desc: 'aaaaaaa',
                        applicant: 'shenqingren',
                        dept: '部门',
                        time: '2022-05-12',
                        status: '状态'
                    },
                    {
                        num: 124,
                        address: 'xxxx',
                        name: '111',
                        desc: 'aaaaaaa',
                        applicant: 'shenqingren',
                        dept: '部门',
                        time: '2022-05-12',
                        status: '状态'
                    },
                    {
                        num: 124,
                        address: 'xxxx',
                        name: '111',
                        desc: 'aaaaaaa',
                        applicant: 'shenqingren',
                        dept: '部门',
                        time: '2022-05-12',
                        status: '状态'
                    },
                    {
                        num: 124,
                        address: 'xxxx',
                        name: '111',
                        desc: 'aaaaaaa',
                        applicant: 'shenqingren',
                        dept: '部门',
                        time: '2022-05-12',
                        status: '状态'
                    },
                ],
                serviceList: [
                    {
                        num: 123,
                        address: 'xxxx',
                        name: '111',
                        desc: 'aaaaaaa',
                        applicant: 'shenqingren',
                        dept: '部门',
                        time: '2022-05-12',
                        status: '状态'
                    },
                    {
                        num: 124,
                        address: 'xxxx',
                        name: '111',
                        desc: 'aaaaaaa',
                        applicant: 'shenqingren',
                        dept: '部门',
                        time: '2022-05-12',
                        status: '状态'
                    },

                ],
                labList: [
                    {
                        num: 123,
                        name: '111',
                        applicant: 'shenqingren',
                        dept: '部门',
                        time: '2022-05-12',
                        status: '状态'
                    },
                    {
                        num: 124,
                        address: 'xxxx',
                        name: '111',
                        desc: 'aaaaaaa',
                        applicant: 'shenqingren',
                        dept: '部门',
                        time: '2022-05-12',
                        status: '状态'
                    },
                ],
                total: 10,
            }
            return res
        }
    },
    // 用户管理 -- 列表
    {
        url: '/sysUser/listPage',
        type: 'get',
        response: () => {
            return {
                "code": 0,
                "msg": "成功",
                "data": {
                    "records": [
                        {
                            "id": "2",
                            "avatar": null,
                            "email": "chqfang@qq.com",
                            "enabled": "0",
                            "password": null,
                            "username": "chqfang",
                            "deptId": null,
                            "deptName": "苏州银行总行",
                            "phone": "13771741895",
                            "jobId": "1",
                            "createTime": null,
                            "lastPasswordResetTime": null,
                            "nickName": null,
                            "sex": "男",
                            "userType": "1",
                            "userTypeName": "支撑人员",
                            "tellerId": null,
                            "crtUserCode": null,
                            "crtOrgCode": null,
                            "crtDate": null,
                            "updUserCode": null,
                            "updOrgCode": null,
                            "updDate": null,
                            "tenant": null,
                            "userNo": "chqfang",
                            "name": 'xxxx',
                            "idcardNo": null,
                            "title": null,
                            "ename": null,
                            "tel": null,
                            "stId": null,
                            "haoLevel": null,
                            "serveObject": null,
                            "serveSystem": null,
                            "hirPostLevel": null,
                            "datumPost": null,
                            "position": null,
                            "line": null,
                            "grade": null,
                            "dataworksAccount": null,
                            "roleName": '内部人员'
                        },
                        {
                                "id": "1",
                                "email": "zhengjie@tom.com",
                                "username": "admin",
                                "nickName": "管理员",
                                "phone": "18888888888",
                                "deptName": "苏银集团"
                            },
                            {
                                "id": "3",
                                "email": "liuyuyang@qq.com",
                                "username": "liuyuyang",
                                "nickName": "柳宇阳",
                                "phone": "18888888888",
                                "deptName": "苏州银行总行"
                            }
                    ],
                    "total": 1,
                    "size": 10,
                    "current": 1,
                    "orders": [],
                    "hitCount": false,
                    "data": null,
                    "searchCount": true,
                    "pages": 1
                }
            }
        },
    },
    // 用户管理 -- 机构树
    {
        url: '/sysDept/getSysDeptList',
        type: 'get',
        response: () => {
            return {
                content: [
                    {
                        "id": "1",
                        "name": "表结构1",
                        "pid": "0",
                        "type": "table",
                        "deptLevel": "1",
                        "enabled": "",
                        "pname": "",
                        "children": [
                            {
                                "id": "2",
                                "name": "表结构1的儿子",
                                "pid": "1",
                                "type": "table",
                                "level": "2",
                                "children": [
                                    {
                                        "id": "22",
                                        "name": "表结构1的孙子1",
                                        "pid": "2",
                                        "type": "table",
                                        "level": "3",
                                    },
                                    {
                                        "id": "31",
                                        "name": "表结构1的孙子2",
                                        "pid": "2",
                                        "type": "table",
                                        "level": "3",
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        id: '3',
                        name: '表结构2',
                        pid: '0',
                        type: 'table',
                        level: '1',
                        "children": [
                            {
                                "id": "5",
                                "name": "表结构1的儿子",
                                "pid": "1",
                                "type": "table",
                                "level": "2",
                                "children": [
                                    {
                                        "id": "222",
                                        "name": "表结构1的孙子1",
                                        "pid": "2",
                                        "type": "table",
                                        "level": "3",
                                    },
                                    {
                                        "id": "331",
                                        "name": "表结构1的孙子2",
                                        "pid": "2",
                                        "type": "table",
                                        "level": "3",
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        }
    },
    // 我的工单  -- 数据服务平台列表
    {
        url: '/myWork',
        type: 'get',
        response: () => {
            return {
                code: 0,
                msg: '',
                data: {
                    total: 10,
                    size: 10,
                    pages: 1,
                    current: 1,
                    records: [
                        {
                            interfaceAds: 'api地址',
                            indexName: 'api名称',
                            apiDescription: 'api描述',
                            status: '1',
                            applicant: '申请人id',
                            applicantName: '申请人名称',
                            dept: '申请部门',
                            applyDate: '2020-02-02',
                            apiId: '1',
                        },
                        {
                            interfaceAds: 'api地址',
                            indexName: 'api名称',
                            apiDescription: 'api描述',
                            status: '2',
                            applicant: '申请人id',
                            applicantName: '申请人名称',
                            dept: '申请部门',
                            applyDate: '2020-02-02',
                            apiId: '2',
                        },
                        {
                            interfaceAds: 'api地址',
                            indexName: 'api名称',
                            apiDescription: 'api描述',
                            status: '3',
                            applicant: '申请人id',
                            applicantName: '申请人名称',
                            dept: '申请部门',
                            applyDate: '2020-02-02',
                            apiId: '3',
                        },
                    ]
                }
            }
        }
    },
    // 我的工单  -- 数据服务平台  api权限申请审批
    {
        url: '/myWork',
        type: 'post',
        response: () => {
            return {
                code: 200,
                msg: '申请成功!'
            }
        }
    },
    // 我的工单 -- 数据服务平台 审批链路
    {
        url: '/myWork/approvalLink',
        type: 'get',
        response: () => {
            return {
                code: 200,
                msg: '',
                data: [
                    {
                        status: '1',
                        assignee: '1',
                        apprComment: 'gsdgsd1',
                        id: '1',
                        duration: '1',
                        updDateStr: '122222',
                    },
                    {
                        status: '2',
                        assignee: '1',
                        apprComment: 'fdssfgdfgdf1',
                        id: '2',
                        duration: '1',
                        updDateStr: '1333333',
                    },
                    {
                        status: '0',
                        assignee: '1',
                        apprComment: 'sadasdasdasd1',
                        id: '3',
                        duration: '1',
                        updDateStr: '14444',
                    },
                ]
            }
        }
    },
    // 角色管理 -- 列表
    {
        url: '/sysRole/listPage',
        type: 'get',
        response: () => {
            return {
                "code": 0,
                "msg": "成功",
                "data": {
                    "records": [
                        {
                            "id": "R000",
                            "name": "超级管理员",
                            "remark": "超级管理员角色",
                            "dataScope": "全部",
                            "roleLevel": 1,
                            "createTime":'2022-05-23',
                            "permission": "admin",
                            "crtUserCode":' null',
                            "crtOrgCode":' null',
                            "crtDate":'2022-05-23',
                            "updUserCode":' null',
                            "updOrgCode":' null',
                            "updDate":' null',
                            "tenant":' null'
                        },
                        {
                            "id": "R009",
                            "name": "全租户未发布指标查看角色",
                            "remark": "全租户未发布指标查看角色",
                            "dataScope": "o",
                            "roleLevel": 3,
                            "createTime": 1646033771000,
                            "permission": "default",
                            "crtUserCode":' null',
                            "crtOrgCode":' null',
                            "crtDate":'2022-05-23',
                            "updUserCode":' null',
                            "updOrgCode": "",
                            "updDate":' null',
                            "tenant":' null'
                        },
                        {
                            "id": "R024",
                            "name": "未发布指标查阅角色",
                            "remark": "可以查看本租户所有的指标信息",
                            "dataScope": "o",
                            "roleLevel": 3,
                            "createTime": 1645084430000,
                            "permission": "default",
                            "crtUserCode":' null',
                            "crtOrgCode":' null',
                            "crtDate":'2022-05-23',
                            "updUserCode":' null',
                            "updOrgCode":' null',
                            "updDate":' null',
                            "tenant": "1001"
                        },
                        {
                            "id": "R025",
                            "name": "中台科技人员",
                            "remark": "可以查看数据服务信息",
                            "dataScope": "o",
                            "roleLevel": 3,
                            "createTime":' null',
                            "permission": "default",
                            "crtUserCode":' null',
                            "crtOrgCode":' null',
                            "crtDate":'2022-05-23',
                            "updUserCode":' null',
                            "updOrgCode":' null',
                            "updDate":' null',
                            "tenant": "1001"
                        },
                        {
                            "id": "R026",
                            "name": "超级管理员测试1",
                            "remark": "超级2",
                            "dataScope":' null',
                            "roleLevel":' null',
                            "createTime":' null',
                            "permission":' null',
                            "crtUserCode":' null',
                            "crtOrgCode":' null',
                            "crtDate":'2022-05-23',
                            "updUserCode":' null',
                            "updOrgCode":' null',
                            "updDate":' null',
                            "tenant":' null'
                        },
                        {
                            "id": "R027",
                            "name": "超级管理员测试2",
                            "remark": "修改测试",
                            "dataScope":' null',
                            "roleLevel":' null',
                            "createTime":' null',
                            "permission":' null',
                            "crtUserCode":' null',
                            "crtOrgCode":' null',
                            "crtDate":' null',
                            "updUserCode":' null',
                            "updOrgCode":' null',
                            "updDate": 1652837208000,
                            "tenant":' null'
                        }
                    ],
                    "total": 6,
                    "size": 10,
                    "current": 1,
                    "orders": [],
                    "hitCount": false,
                    "data":' null',
                    "searchCount": true,
                    "pages": 1
                }
            }
        }
    },
    // 角色管理 -- 获取租户列表
    {
        url: '/sysRole/getTenants',
        type: 'get',
        response: () => {
            return [
                    {
                        id: '001',
                        name: '租户1'
                    },
                    {
                        id: '002',
                        name: '租户2'
                    },
                    {
                        id: '003',
                        name: '租户3'
                    },
                ]
            }
    },
    // 角色管理 -- 新增角色
    {
        url: '/sysRole/createRole',
        type: 'post',
        response: () => {
            return {
                code: 200,
                msg: '新增成功',
                data: null
            }
        }
    },
    // 角色管理 -- 修改角色
    {
        url: '/sysRole/updateRole',
        type: 'put',
        response: () => {
            return {
                code: 200,
                msg: '修改成功',
                data: null
            }
        }
    },
    // 角色管理 -- 删除角色
    {
        url: '/sysRole/deleteRole',
        type: 'put',
        response: () => {
            return {
                code: 200,
                msg: '删除成功',
                data: null
            }
        }
    },
    // 角色管理  -- 添加用户  查询角色授权的用户
    {
        url: '/sysRole/queryUserByRole',
        type: 'get',
        response: () => {
            return {
                code: 200,
                msg: '',
                data: [
                     {
                        "id": "1",
                        "email": "zhengjie@tom.com",
                        "username": "admin",
                        "nickName": "管理员",
                        "phone": "18888888888",
                        "deptName": "苏银集团"
                    },
                    {
                        "id": "3",
                        "email": "liuyuyang@qq.com",
                        "username": "liuyuyang",
                        "nickName": "柳宇阳",
                        "phone": "18888888888",
                        "deptName": "苏州银行总行"
                    }
                ]
            }
        }
    },
    // 角色管理  -- 添加用户  保存角色授权用户
    {
        url: '/sysRole/saveUserRoles',
        type: 'post',
        response: () => {
            return {
                code: 200,
                msg: '操作成功',
                data: null
            }
        }
    },
    // 机构管理  -- 列表
    {
        url: '/sysDept/listDept',
        type: 'get',
        response: () => {
            return {
                code: 200,
                msg: '操作成功',
                data: [
                     {
                        "crtUserCode": null,
                        "crtOrgCode": null,
                        "crtDate": 1632394068000,
                        "updUserCode": null,
                        "updOrgCode": null,
                        "updDate": null,
                        "operators": {},
                        "_orgAuth": null,
                        "_userAuth": null,
                        "id": "r1",
                        "name": "苏银集团",
                        "sname": null,
                        "pid": "0",
                        "enabled": "1",
                        "createTime": 1632394104000,
                        "tenant": null,
                        "deptLevel": 1,
                        "deptCategory": "1",
                        "bussCode": "",
                        "bussName": null,
                        "code": "MF322112",
                        "type": 1,
                        "sdepart": "122",
                        "grade": 2,
                        "tel": "1377174322",
                        "supchg": "刘颖",
                        "buSid": "122323",
                        "officer": "张欢",
                        "deputysir": "王明",
                        "localNet": "123222",
                        "orgLevelBm": "dsd",
                        "datasDepart": "dsds",
                        "datasBm": "dfdd",
                        "orgLevel": "1",
                        "stId": "123456",
                        "ext1": "fght",
                        "ext2": "vvc",
                        "ext3": "rrr",
                        "ext4": "gg",
                        "ext5": "ttr",
                        "ext6": "tt",
                        "ext7": "rr",
                        "ext8": "rr",
                        "dbpPath": null,
                        "defaultApproveUser": null,
                        "pname": null
                    },
                    {
                        id: '11111',
                        pid: '123',
                        code: 'xxxx',
                        name: 'xxxx',
                        type: 'xxxx',
                        level: 'xxxx',
                        enabled: '0',// 0 禁用 1  启用
                        createTime: '2022-05-23',
                        children: [
                            {
                                id: '32323',
                                pid: '121233',
                                code: 'xxxx',
                                name: 'xxxx',
                                type: 'xxxx',
                                level: 'xxxx',
                                enabled: '0',// 0 禁用 1  启用
                                createTime: '2022-05-23',
                                children: [
                                    
                                ],
                            },
                            {
                                id: '111213123111',
                                pid: '12432423',
                                code: 'xxxx',
                                name: 'xxxx',
                                type: 'xxxx',
                                level: 'xxxx',
                                enabled: '0',// 0 禁用 1  启用
                                createTime: '2022-05-23',
                                children: [
                                    
                                ],
                            },
                        ],
                    },
                    {
                        id: '22222',
                        pid: '234',
                        code: 'xxxx',
                        name: 'xxxx',
                        type: 'xxxx',
                        level: 'xxxx',
                        enabled: '1',// 0 禁用 1  启用
                        createTime: '2022-05-24',
                    },
                ]
            }
        }
    },
    // 机构管理  -- 详情
    {
        url: '/sysDept/getDeptById',
        type: 'get',
        response: () => {
            return {
                code: 200,
                msg: '操作成功',
                data: {
                    id: '1111',
                    name: 'xxxx',
                    deptCategory: '0', // 0 公司 1 部门
                    code: 'aaaa',
                    enabled: '1',// 0 禁用 1  启用
                    pid: 'aaaa',pName: '部门',
                    deptLevel: '1',
                    xxxx: 'aaaa',
                    type: '0',// 0 一般机构 1 支撑机构
                    sdepart: 'aaaa',
                    grade: '1',
                    buSid: 'xxx',
                    supchg: 'xxx',
                    tel: '1888888888',
                }
            }
        }
    },
    // 权限管理  -- 点击角色显示当前角色下的菜单
    {
        url: '/rolesAuth/menu/role',
        type: 'get',
        response: () => {
            return {
                code: 200,
                msg: '操作成功',
                data: [
                    {
                        "id": "01",
                        "name": "系统管理",
                        "component": null,
                        "pid": "0",
                        "sort": 99999,
                        "icon": "system",
                        "path": "system",
                        "cache": "0",
                        "hidden": "0",
                        "componentName": null,
                        "createTime": null,
                        "permission": null,
                        "type": 0,
                        "dataAuthType": null,
                        "enabled": "9",
                        "crtUserCode": null,
                        "crtOrgCode": null,
                        "crtDate": null,
                        "updUserCode": null,
                        "updOrgCode": null,
                        "updDate": null,
                        "tenant": null,
                        "children": [
                            {
                                "id": "0101",
                                "name": "用户管理",
                                "component": "@system/user/index",
                                "pid": "01",
                                "sort": 20,
                                "icon": "peoples",
                                "path": "/system/user",
                                "cache": "0",
                                "hidden": "0",
                                "componentName": "User",
                                "createTime": null,
                                "permission": "user:list",
                                "type": 1,
                                "dataAuthType": null,
                                "enabled": "9",
                                "crtUserCode": null,
                                "crtOrgCode": null,
                                "crtDate": null,
                                "updUserCode": null,
                                "updOrgCode": null,
                                "updDate": null,
                                "tenant": null,
                                "children": [
                                    {
                                        "id": "010101",
                                        "name": "用户查询",
                                        "component": null,
                                        "pid": "0101",
                                        "sort": 999,
                                        "icon": null,
                                        "path": null,
                                        "cache": "0",
                                        "hidden": "0",
                                        "componentName": null,
                                        "createTime": [
                                            2020,
                                            6,
                                            30,
                                            15,
                                            20,
                                            32
                                        ],
                                        "permission": "user:list",
                                        "type": 2,
                                        "dataAuthType": null,
                                        "enabled": "9",
                                        "crtUserCode": null,
                                        "crtOrgCode": null,
                                        "crtDate": null,
                                        "updUserCode": null,
                                        "updOrgCode": null,
                                        "updDate": null,
                                        "tenant": null,
                                        "children": null,
                                        "isSelect": 0,
                                        "iframe": "0"
                                    },
                                    {
                                        "id": "010102",
                                        "name": "用户查询1",
                                        "component": null,
                                        "pid": "01011",
                                        "sort": 999,
                                        "icon": null,
                                        "path": null,
                                        "cache": "0",
                                        "hidden": "0",
                                        "componentName": null,
                                        "createTime": [
                                            2020,
                                            6,
                                            30,
                                            15,
                                            20,
                                            32
                                        ],
                                        "permission": "user:list",
                                        "type": 2,
                                        "dataAuthType": null,
                                        "enabled": "9",
                                        "crtUserCode": null,
                                        "crtOrgCode": null,
                                        "crtDate": null,
                                        "updUserCode": null,
                                        "updOrgCode": null,
                                        "updDate": null,
                                        "tenant": null,
                                        "children": null,
                                        "isSelect": 1,
                                        "iframe": "0"
                                    }
            
                                ],
                                "isSelect": 0,
                                "iframe": "0"
                            }
            
                        ],
                        "isSelect": 0,
                        "iframe": "0"
                    }
                ]
            }
        }
    },
    // 权限管理  -- 保存按钮
    {
        url: '/rolesAuth/saveRoleMen',
        type: 'post',
        response: () => {
            return {
                code: 200,
                msg: '操作成功',
                data: null
            }
        }
    },
]