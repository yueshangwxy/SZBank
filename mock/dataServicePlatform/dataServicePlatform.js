module.exports = [
    // API和文件服务申请
    {
        url: '/serviceApply',
        type: 'post',
        response: () => {
            return {
                code: "200",
                msg: "API和文件服务申请",
                data: [],
            }
        }
    },
    // 我的服务列表查询
    {
        url: '/serviceApply',
        type: 'get',
        response: () => {
            const data = [
                {
                    id: '1',
                    name: 'name1',
                    description: 'description1',
                    dept: 'dept1',
                    belongUser: 'belongUser1',
                    serviceType: '1',
                    status: '0',
                    crtUserCode: 'crtUserCode1',
                    createDate: '2022/04/28',
                },
                {
                    id: '2',
                    name: 'name1',
                    description: 'description1',
                    dept: 'dept1',
                    belongUser: 'belongUser1',
                    serviceType: '1',
                    status: '1',
                    crtUserCode: 'crtUserCode1',
                    createDate: '2022/04/28',
                },
                {
                    id: '3',
                    name: 'name1',
                    description: 'description1',
                    dept: 'dept1',
                    belongUser: 'belongUser1',
                    serviceType: '2',
                    status: '2',
                    crtUserCode: 'crtUserCode1',
                    createDate: '2022/04/28',
                },
                {
                    id: '1',
                    name: 'name1',
                    description: 'description1',
                    dept: 'dept1',
                    belongUser: 'belongUser1',
                    serviceType: '1',
                    status: '3',
                    crtUserCode: 'crtUserCode1',
                    createDate: '2022/04/28',
                },
                {
                    id: '2',
                    name: 'name1',
                    description: 'description1',
                    dept: 'dept1',
                    belongUser: 'belongUser1',
                    serviceType: '1',
                    status: '4',
                    crtUserCode: 'crtUserCode1',
                    createDate: '2022/04/28',
                },
                {
                    id: '3',
                    name: 'name1',
                    description: 'description1',
                    dept: 'dept1',
                    belongUser: 'belongUser1',
                    serviceType: '2',
                    status: '5',
                    crtUserCode: 'crtUserCode1',
                    createDate: '2022/04/28',
                },
                {
                    id: '1',
                    name: 'name1',
                    description: 'description1',
                    dept: 'dept1',
                    belongUser: 'belongUser1',
                    serviceType: '1',
                    status: '6',
                    crtUserCode: 'crtUserCode1',
                    createDate: '2022/04/28',
                },
                {
                    id: '2',
                    name: 'name1',
                    description: 'description1',
                    dept: 'dept1',
                    belongUser: 'belongUser1',
                    serviceType: '1',
                    status: '7',
                    crtUserCode: 'crtUserCode1',
                    createDate: '2022/04/28',
                },
                {
                    id: '3',
                    name: 'name1',
                    description: 'description1',
                    dept: 'dept1',
                    belongUser: 'belongUser1',
                    serviceType: '2',
                    status: '8',
                    crtUserCode: 'crtUserCode1',
                    createDate: '2022/04/28',
                },
                {
                    id: '3',
                    name: 'name1',
                    description: 'description1',
                    dept: 'dept1',
                    belongUser: 'belongUser1',
                    serviceType: '2',
                    status: '1',
                    crtUserCode: 'crtUserCode1',
                    createDate: '2022/04/28',
                },
            ]
            return {
                code: "200",
                msg: "",
                data: {
                    total: data.length,
                    size: 1,
                    pages: 10, // 总页数
                    current: 1, // 当前页
                    records: data
                },
            }
        }
    },
    // 查看服务详情
    {
        url: '/serviceApply/query',
        type: 'get',
        response: () => {
            let data = {
                name: '1',
                description: '2',
                overtime: '1',
                currentLimit: '2',
                type: '2',
                destinationAddress: '2',
                latestGenerationTime: '2',
                separator: '1',
                fileFormat: '1',
                serviceType: '1',
                status: '1',
                dept: '1',            
                belongUser: '1',            
                fieldList: '1',            
                belongApplication: '1',            
                belongApplicationName: '1',            
                sitPath: '1',            
                prePath: '1',            
                serviceParamList: [
                    {
                        name: '1',
                        type: '1',
                        parameterType: '1', // 1入参 2出参
                        description: '1',
                        defaultValue: '1',
                        isPass: '0',
                    },
                    {
                        name: '2',
                        type: '2',
                        parameterType: '2', // 1入参 2出参
                        description: '2',
                        defaultValue: '2',
                        isPass: '1',
                    }
                ],  
                applicationInfoList: [
                    {
                        appCode: '1',
                        appName: '1',
                    }
                ],          
            }
            return {
                code: "200",
                msg: "",
                data: data,
            }
        }
    },
    // 服务更新
    {
        url: '/serviceApply',
        type: 'put',
        response: () => {
            return {
                code: "200",
                msg: "更新",
                data: [],
            }
        }
    },
    // 上线
    {
        url: '/serviceApply/open',
        type: 'post',
        response: () => {
            return {
                code: "200",
                msg: "上线成功",
                data: [],
            }
        }
    },
    // 下线
    {
        url: '/serviceApply/close',
        type: 'post',
        response: () => {
            return {
                code: "200",
                msg: "下线成功",
                data: [],
            }
        }
    },
    // 应用管理
    {
        url: '/applicationInfo',
        type: 'get',
        response: () => {
            return {
                code: "200",
                msg: "",
                data: {
                    total: 10,
                    size: 10,
                    pages: 10,
                    current: 1,
                    records: [
                        {
                            appName: 'app1',
                            appCode: '11111',
                            description: 'mioashu',
                            status: '0',
                            crtUserCode: 'chuangjianren1',
                            createDate: '2022-04-29',
                        },
                        {
                            appName: 'app1',
                            appCode: '11111',
                            description: 'mioashu',
                            status: '1',
                            crtUserCode: 'chuangjianren1',
                            createDate: '2022-04-29',
                        },
                        {
                            appName: 'app1',
                            appCode: '11111',
                            description: 'mioashu',
                            status: '2',
                            crtUserCode: 'chuangjianren1',
                            createDate: '2022-04-29',
                        },
                        {
                            appName: 'app1',
                            appCode: '11111',
                            description: 'mioashu',
                            status: '3',
                            crtUserCode: 'chuangjianren1',
                            createDate: '2022-04-29',
                        },
                        {
                            appName: 'app1',
                            appCode: '11111',
                            description: 'mioashu',
                            status: '4',
                            crtUserCode: 'chuangjianren1',
                            createDate: '2022-04-29',
                        },
                        {
                            appName: 'app1',
                            appCode: '11111',
                            description: 'mioashu',
                            status: '5',
                            crtUserCode: 'chuangjianren1',
                            createDate: '2022-04-29',
                        },
                        {
                            appName: 'app1',
                            appCode: '11111',
                            description: 'mioashu',
                            status: '6',
                            crtUserCode: 'chuangjianren1',
                            createDate: '2022-04-29',
                        },
                        {
                            appName: 'app1',
                            appCode: '11111',
                            description: 'mioashu',
                            status: '7',
                            crtUserCode: 'chuangjianren1',
                            createDate: '2022-04-29',
                        },
                        {
                            appName: 'app1',
                            appCode: '11111',
                            description: 'mioashu',
                            status: '8',
                            crtUserCode: 'chuangjianren1',
                            createDate: '2022-04-29',
                        },
                    ]
                },
            }
        }
    },
    // 应用申请
    {
        url: '/applicationInfo/save',
        type: 'post',
        response: () => {
            return {
                code: "200",
                msg: "",
                data: [],
            }
        }
    },
    // 查看应用详情
    {
        url: '/applicationInfo/query',
        type: 'get',
        response: () => {
            return {
                code: "200",
                msg: "",
                data: {
                    appName: '1',
                    appCode: '2',
                    description: '3',
                    status: '2',
                    appKey: '1',
                    appSecret: '1',
                },
            }
        }
    },
    // 应用更新
    {
        url: '/applicationInfo/update',
        type: 'post',
        response: () => {
            return {
                code: "200",
                msg: "",
                data: [],
            }
        }
    },
    // 应用删除
    {
        url: '/applicationInfo/delete',
        type: 'delete',
        response: () => {
            return {
                code: "200",
                msg: "",
                data: [],
            }
        }
    },
    // 应用应有的服务
    {
        url: '/applicationInfo/queryAppService',
        type: 'get',
        response: () => {
            return {
                code: "200",
                msg: "",
                data: [
                    {
                        name: 'xxxxx',
                        description: '222222'
                    },
                    {
                        name: 'yyyyy',
                        description: '222222'
                    },
                    {
                        name: 'zzzzz',
                        description: '222222'
                    },
                ],
            }
        }
    },
    // 应用可访问的服务
    {
        url: '/applicationInfo/queryAppAccessService',
        type: 'get',
        response: () => {
            return {
                code: "200",
                msg: "",
                data: [
                    {
                        name: '11111',
                        description: '222222'
                    },
                    {
                        name: '11111',
                        description: '222222'
                    },
                    {
                        name: '11111',
                        description: '222222'
                    },
                ],
            }
        }
    },
    // 查询所有已上线的应用
    {
        url: '/applicationInfo/queryOpenApplication',
        type: 'get',
        response: () => {
            return {
                code: "200",
                msg: "",
                data: [
                    {
                        appCode: '1',
                        appName: '应用1'
                    },
                    {
                        appCode: '2',
                        appName: '应用2'
                    },
                    {
                        appCode: '3',
                        appName: '应用3'
                    },
                    {
                        appCode: '4',
                        appName: '应用4'
                    },
                    {
                        appCode: '5',
                        appName: '应用5'
                    },
                ],
            }
        }
    },
    // 部门树
    {
        url: '/syeDept/findDeptTree',
        type: 'get',
        response: () => {
            return {
                code: "200",
                msg: "",
                data: [
                    {
                        name: '一级',
                        id: '1',
                        sysDeptList: [
                            {
                                name: '二级1',
                                id: '21',
                                sysDeptList: [
                                    {
                                        name: '三级1',
                                        id: '3',
                                    }
                                ]
                            },
                            {
                                name: '二级2',
                                id: '22',
                                sysDeptList: []
                            },
                            {
                                name: '二级3',
                                id: '23',
                                sysDeptList: []
                            },
                        ]
                    }
                ],
            }
        }
    },
]