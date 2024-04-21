module.exports = [
    {
        url: '/dataLab/sqlAnalysis/getTablesWithPermissions',
        type: 'get',
        response: () => {
            let data = [
                {
                    "id":"1",
                    "contentsId":"1",
                    "tableName":"表结构1",
                    "pid":"0",
                    "type":"table",
                    "level":"1",
                    "children":[
                        {
                            "id":"2",
                            "contentsId":"2",
                            "tableName":"表结构1的儿子",
                            "pid":"1",
                            "type":"table",
                            "level":"2",
                            "children":[
                                {
                                    "id":"22",
                                    "contentsId":"22",
                                    "tableName":"表结构1的孙子1",
                                    "pid":"2",
                                    "type":"table",
                                    "level":"3",
                                },
                                {
                                    "id":"31",
                                    "contentsId":"31",
                                    "tableName":"表结构1的孙子2",
                                    "pid":"2",
                                    "type":"table",
                                    "level":"3",
                                }
                            ]
                        }
                    ]
                },
                {
                    id: '3',
                    contentsId: '3',
                    tableName: '表结构2',
                    pid: '0',
                    type: 'table',
                    level: '1',
                    "children":[
                        {
                            "id":"5",
                            "contentsId":"6",
                            "tableName":"表结构1的儿子",
                            "pid":"1",
                            "type":"table",
                            "level":"2",
                            "children":[
                                {
                                    "id":"222",
                                    "contentsId":"222",
                                    "tableName":"表结构1的孙子1",
                                    "pid":"2",
                                    "type":"table",
                                    "level":"3",
                                },
                                {
                                    "id":"331",
                                    "contentsId":"331",
                                    "tableName":"表结构1的孙子2",
                                    "pid":"2",
                                    "type":"table",
                                    "level":"3",
                                }
                            ]
                        }
                    ]
                }
            ]
            return data
        }
    },
    {
        url: '/dataLab/sqlAnalysis/getListBySQL',
        type: 'post',
        response: () => {
            return {
                code: 200,
                msg: 'getListBySQL'
            }
        }
    },
    {
        url: '/dataLab/sqlAnalysis/downLoad',
        type: 'post',
        response: () => {
            return {
                code: 200,
                msg: 'downLoad'
            }
        }
    },
    {
        url: '/dataLab/sqlAnalysis/getTableColumn',
        type: 'get',
        response: () => {
            return {
                code: 200,
                msg: 'getTableColumn',
                data: {
                    
                }
            }
        }
    },
    // approvalInfos
    {
        url: '/api/dept/getCurrentDept',
        type: 'get',
        response: () => {
            return {
                code: 200,
                msg: 'getTableColumn',
            }
        }
    },
    {
        url: '/datalab/approvalInfo/list',
        type: 'post',
        response: () => {
            return {
                code: 200,
                msg: 'list',
                data: {
                    records: [
                        {
                            tableName: 'tableName123',
                            sqlTextShow: 'sqlTextShow123',
                            applyDescription: 'applyDescription123',
                            applyUserName: 'applyUserName123',
                            applyDeptName: 'applyDeptName123',
                            applyTime: '2022-05-17',
                            applyStatusShow: 'status',
                        },
                        {
                            tableName: 'tableName123',
                            sqlTextShow: 'sqlTextShow123',
                            applyDescription: 'applyDescription123',
                            applyUserName: 'applyUserName123',
                            applyDeptName: 'applyDeptName123',
                            applyTime: '2022-05-17',
                            applyStatusShow: 'status',
                        },
                        {
                            tableName: 'tableName123',
                            sqlTextShow: 'sqlTextShow123',
                            applyDescription: 'applyDescription123',
                            applyUserName: 'applyUserName123',
                            applyDeptName: 'applyDeptName123',
                            applyTime: '2022-05-17',
                            applyStatusShow: 'status',
                        },
                        {
                            tableName: 'tableName123',
                            sqlTextShow: 'sqlTextShow123',
                            applyDescription: 'applyDescription123',
                            applyUserName: 'applyUserName123',
                            applyDeptName: 'applyDeptName123',
                            applyTime: '2022-05-17',
                            applyStatusShow: 'status',
                        },
                        {
                            tableName: 'tableName123',
                            sqlTextShow: 'sqlTextShow123',
                            applyDescription: 'applyDescription123',
                            applyUserName: 'applyUserName123',
                            applyDeptName: 'applyDeptName123',
                            applyTime: '2022-05-17',
                            applyStatusShow: 'status',
                        },
                        {
                            tableName: 'tableName123',
                            sqlTextShow: 'sqlTextShow123',
                            applyDescription: 'applyDescription123',
                            applyUserName: 'applyUserName123',
                            applyDeptName: 'applyDeptName123',
                            applyTime: '2022-05-17',
                            applyStatusShow: 'status',
                        },
                        {
                            tableName: 'tableName123',
                            sqlTextShow: 'sqlTextShow123',
                            applyDescription: 'applyDescription123',
                            applyUserName: 'applyUserName123',
                            applyDeptName: 'applyDeptName123',
                            applyTime: '2022-05-17',
                            applyStatusShow: 'status',
                        },
                        {
                            tableName: 'tableName123',
                            sqlTextShow: 'sqlTextShow123',
                            applyDescription: 'applyDescription123',
                            applyUserName: 'applyUserName123',
                            applyDeptName: 'applyDeptName123',
                            applyTime: '2022-05-17',
                            applyStatusShow: 'status',
                        },
                        {
                            tableName: 'tableName123',
                            sqlTextShow: 'sqlTextShow123',
                            applyDescription: 'applyDescription123',
                            applyUserName: 'applyUserName123',
                            applyDeptName: 'applyDeptName123',
                            applyTime: '2022-05-17',
                            applyStatusShow: 'status',
                        },
                    ],
                    total: 10,
                    pages: 10,
                }
            }
        }
    },
    {
        url: '/datalab/approvalLink/approveLinkDetail',
        type: 'post',
        response: () => {
            return {
                returnCode: '200',
                returnMsg: 'approveLinkDetail',
                data: {
                    tableName: '123',
                    approvalOpinion: 'approvalOpinion123',
                    approvalTime: '2022-05-17',
                    statusPutShow: 'statusPutShow123',
                }
            }
        }
    },
    {
        url: '/datalab/approvalInfo/approve',
        type: 'post',
        response: () => {
            return {
                returnCode: '200',
                returnMsg: 'approve',
            }
        }
    },
    // dataImportPage
    {
        url: '/datalab/dataImport/executeMgrSql',
        type: 'post',
        response: () => {
            return {
                returnCode: '200',
                returnMsg: 'executeMgrSql',
            }
        }
    },
    {
        url: '/datalab/dataImport/showAnableTables',
        type: 'get',
        response: () => {
            return {
                returnCode: '200',
                returnMsg: 'showAnableTables',
                data: {
                    projectName: '项目名称',
                    tableNames: [
                        'table1',
                        'table2',
                        'table3',
                        'table4',
                    ],
                }
            }
        }
    },
    {
        url: '/datalab/dataImport/importCsvData',
        type: 'post',
        response: () => {
            return {
                returnCode: '200',
                returnMsg: '导入成功',
                data: {
                    projectName: 'projectName',
                    tableNames: 'tableNames',
                }
            }
        }
    },
    // exportResultDownload
    {
        url: '/datalab/taskExport/list',
        type: 'post',
        response: () => {
            return {
                returnCode: '200',
                returnMsg: 'list',
                data: {
                    records: [
                        {
                            taskName: 'taskName1',
                            submitTime: '2022-04-17',
                            taskStageShow: 'taskStageShow',
                            taskStateShow: 'taskStageShow',
                            flag: 'ok'
                        },
                        {
                            taskName: 'taskName2',
                            submitTime: '2022-05-17',
                            taskStageShow: 'taskStageShow',
                            taskStateShow: 'taskStageShow',
                        },
                        {
                            taskName: 'taskName3',
                            submitTime: '2022-06-17',
                            taskStageShow: 'taskStageShow',
                            taskStateShow: 'taskStageShow',
                        },
                        {
                            taskName: 'taskName1',
                            submitTime: '2022-04-17',
                            taskStageShow: 'taskStageShow',
                            taskStateShow: 'taskStageShow',
                            flag: 'ok'
                        },
                        {
                            taskName: 'taskName2',
                            submitTime: '2022-05-17',
                            taskStageShow: 'taskStageShow',
                            taskStateShow: 'taskStageShow',
                        },
                        {
                            taskName: 'taskName3',
                            submitTime: '2022-06-17',
                            taskStageShow: 'taskStageShow',
                            taskStateShow: 'taskStageShow',
                        },
                        {
                            taskName: 'taskName1',
                            submitTime: '2022-04-17',
                            taskStageShow: 'taskStageShow',
                            taskStateShow: 'taskStageShow',
                            flag: 'ok'
                        },
                        {
                            taskName: 'taskName2',
                            submitTime: '2022-05-17',
                            taskStageShow: 'taskStageShow',
                            taskStateShow: 'taskStageShow',
                        },
                        {
                            taskName: 'taskName3',
                            submitTime: '2022-06-17',
                            taskStageShow: 'taskStageShow',
                            taskStateShow: 'taskStageShow',
                        },
                    ],
                    total: 10,
                    pages: 1,
                }
            }
        }
    },
    {
        url: '/datalab/taskExport/download',
        type: 'post',
        response: () => {
            return {
                returnCode: '200',
                returnMsg: 'download',
                data: {}
            }
        }
    },
    // maskingRulesConfig
    {
        url: '/datalab/maskingRulesConfig/list',
        type: 'post',
        response: () => {
            return {
                returnCode: '200',
                returnMsg: 'list',
                data: {
                    records: [
                        {
                            projectName: 'projectName1',
                            tableName: '123',
                            columnName: 'columnName',
                            maskingRuleShow: 'maskingRuleShow',
                            ruleLevel: 'ruleLevel',
                            userName: 'userName',
                            configTime: 'configTime',
                        },
                        {
                            projectName: 'projectName2',
                            tableName: '324',
                            columnName: 'columnName',
                            maskingRuleShow: 'maskingRuleShow',
                            ruleLevel: 'ruleLevel',
                            userName: 'userName',
                            configTime: 'configTime',
                        },
                        {
                            projectName: 'projectName3',
                            tableName: '342',
                            columnName: 'columnName',
                            maskingRuleShow: 'maskingRuleShow',
                            ruleLevel: 'ruleLevel',
                            userName: 'userName',
                            configTime: 'configTime',
                        },
                        {
                            projectName: 'projectName1',
                            tableName: '123',
                            columnName: 'columnName',
                            maskingRuleShow: 'maskingRuleShow',
                            ruleLevel: 'ruleLevel',
                            userName: 'userName',
                            configTime: 'configTime',
                        },
                        {
                            projectName: 'projectName2',
                            tableName: '324',
                            columnName: 'columnName',
                            maskingRuleShow: 'maskingRuleShow',
                            ruleLevel: 'ruleLevel',
                            userName: 'userName',
                            configTime: 'configTime',
                        },
                        {
                            projectName: 'projectName3',
                            tableName: '342',
                            columnName: 'columnName',
                            maskingRuleShow: 'maskingRuleShow',
                            ruleLevel: 'ruleLevel',
                            userName: 'userName',
                            configTime: 'configTime',
                        },
                        {
                            projectName: 'projectName1',
                            tableName: '123',
                            columnName: 'columnName',
                            maskingRuleShow: 'maskingRuleShow',
                            ruleLevel: 'ruleLevel',
                            userName: 'userName',
                            configTime: 'configTime',
                        },
                        {
                            projectName: 'projectName2',
                            tableName: '324',
                            columnName: 'columnName',
                            maskingRuleShow: 'maskingRuleShow',
                            ruleLevel: 'ruleLevel',
                            userName: 'userName',
                            configTime: 'configTime',
                        },
                        {
                            projectName: 'projectName3',
                            tableName: '342',
                            columnName: 'columnName',
                            maskingRuleShow: 'maskingRuleShow',
                            ruleLevel: 'ruleLevel',
                            userName: 'userName',
                            configTime: 'configTime',
                        },
                    ],
                    total: 10,
                    pages: 1,
                }
            }
        }
    },
    {
        url: '/datalab/maskingRulesConfig/getMaskingRules',
        type: 'get',
        response: () => {
            return {
                returnCode: '200',
                returnMsg: 'getMaskingRules',
                data: [
                    {
                        code: '1',
                        desc: '111'
                    },
                    {
                        code: '2',
                        desc: '222'
                    },
                    {
                        code: '3',
                        desc: '333'
                    },
                ]
            }
        }
    },
    {
        url: '/datalab/maskingRulesConfig/add',
        type: 'post',
        response: () => {
            return {
                returnCode: '200',
                returnMsg: 'add成功',
            }
        }
    },
    {
        url: '/datalab/maskingRulesConfig/update',
        type: 'post',
        response: () => {
            return {
                returnCode: '200',
                returnMsg: 'update成功',
            }
        }
    },
    {
        url: '/datalab/maskingRulesConfig/importTemp',
        type: 'post',
        response: () => {
            return {
                returnCode: '200',
                returnMsg: '导入成功',
            }
        }
    },
    {
        url: '/datalab/maskingRulesConfig/downTemplate',
        type: 'get',
        response: () => {
            return {
                returnCode: '200',
                returnMsg: '导入成功',
                data: {}
            }
        }
    },
    // taskExportPlan
    {
        url: '/datalab/taskPlan/list',
        type: 'post',
        response: () => {
            return {
                returnCode: '200',
                returnMsg: 'list',
                data: {
                    records: [
                        {
                            taskName: 'taskName1',
                            exportTime: '2022-05-17',
                            authDeptName: 'authDeptName',
                        },
                        {
                            taskName: 'taskName2',
                            exportTime: '2022-05-17',
                            authDeptName: 'authDeptName',
                        },
                        {
                            taskName: 'taskName3',
                            exportTime: '2022-05-17',
                            authDeptName: 'authDeptName',
                        },
                    ],
                    total: 10,
                    pages: 1,
                }
            }
        }
    },
    {
        url: '/datalab/taskPlan/stop',
        type: 'post',
        response: () => {
            return {
                returnCode: '200',
                returnMsg: 'stop成功',
            }
        }
    },
    {
        url: '',
        type: 'post',
        response: () => {
            return {
                returnCode: '200',
                returnMsg: 'list',
            }
        }
    },
]