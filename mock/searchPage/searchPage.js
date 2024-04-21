module.exports = [
    {
        url: '/asset/search/getListByKeywords',
        type: 'post',
        response: () => {
            let res = {
                tableList: [
                    { assetType: 'table', num: 0, tableName: 'test7',project: 'project', driverType: 'druvertype', owner: 'owner', tableComment: 'tableComment', favorite: false, permission: 0 },
                    { assetType: 'table', num: 0, tableName: 'test9',project: 'project', driverType: 'druvertype', owner: 'owner', tableComment: 'tableComment', favorite: false, permission: 1 },
                    { assetType: 'table', num: 0, tableName: 'test11',project: 'project', driverType: 'druvertype', owner: 'owner', tableComment: 'tableComment', favorite: true, permission: 0 },
                    { assetType: 'table', num: 0, tableName: 'test13',project: 'project', driverType: 'druvertype', owner: 'owner', tableComment: 'tableComment', favorite: false, permission: 2 },
                    { assetType: 'table', num: 0, tableName: 'test1',project: 'project', driverType: 'druvertype', owner: 'owner', tableComment: 'tableComment', favorite: false, permission: 0 },
                    { assetType: 'table', num: 0, tableName: 'test8',project: 'project', driverType: 'druvertype', owner: 'owner', tableComment: 'tableComment', favorite: true, permission: 1 },
                    { assetType: 'table', num: 0, tableName: 'test10',project: 'project', driverType: 'druvertype', owner: 'owner', tableComment: 'tableComment', favorite: false, permission: 0 },
                    { assetType: 'table', num: 0, tableName: 'test12',project: 'project', driverType: 'druvertype', owner: 'owner', tableComment: 'tableComment', favorite: false, permission: 2 },
                    { assetType: 'table', num: 0, tableName: 'test2',project: 'project', driverType: 'druvertype', owner: 'owner', tableComment: 'tableComment', favorite: true, permission: 1 },
                    { assetType: 'table', num: 0, tableName: 'test3',project: 'project', driverType: 'druvertype', owner: 'owner', tableComment: 'tableComment', favorite: false, permission: 1 },
                    { assetType: 'table', num: 0, tableName: 'test2',project: 'project', driverType: 'druvertype', owner: 'owner', tableComment: 'tableComment', favorite: true, permission: 0 },
                    { assetType: 'table', num: 0, tableName: 'test3',project: 'project', driverType: 'druvertype', owner: 'owner', tableComment: 'tableComment', favorite: false, permission: 1 },
                    { assetType: 'table', num: 0, tableName: 'test2',project: 'project', driverType: 'druvertype', owner: 'owner', tableComment: 'tableComment', favorite: true, permission: 2},
                    { assetType: 'table', num: 0, tableName: 'test3',project: 'project', driverType: 'druvertype', owner: 'owner', tableComment: 'tableComment', favorite: false, permission: 0 }
                ],
                apiList: [
                    { assetType: 'api', num: 0, indexName: 'test7', interfaceAds: 'dizhi1', reqType: 'request', respType: 'response', owner: 'owner', application: 'app', apiDescription: 'description', favorite: true, applyStatus: 1 },
                    { assetType: 'api', num: 0, indexName: 'test9', interfaceAds: 'dizhi1', reqType: 'request', respType: 'response', owner: 'owner', application: 'app', apiDescription: 'description', favorite: true, applyStatus: 2 },
                    { assetType: 'api', num: 0, indexName: 'test11', interfaceAds: 'dizhi1', reqType: 'request', respType: 'response', owner: 'owner', application: 'app', apiDescription: 'description', favorite: false, applyStatus: 3 },
                    { assetType: 'api', num: 0, indexName: 'test13', interfaceAds: 'dizhi1', reqType: 'request', respType: 'response', owner: 'owner', application: 'app', apiDescription: 'description', favorite: false, applyStatus: 1 },
                    { assetType: 'api', num: 0, indexName: 'test1', interfaceAds: 'dizhi1', reqType: 'request', respType: 'response', owner: 'owner', application: 'app', apiDescription: 'description', favorite: true, applyStatus: 2 },
                    { assetType: 'api', num: 0, indexName: 'test8', interfaceAds: 'dizhi1', reqType: 'request', respType: 'response', owner: 'owner', application: 'app', apiDescription: 'description', favorite: false, applyStatus: 1 },
                    { assetType: 'api', num: 0, indexName: 'test10', interfaceAds: 'dizhi1', reqType: 'request', respType: 'response', owner: 'owner', application: 'app', apiDescription: 'description', favorite: true, applyStatus: 3 },
                    { assetType: 'api', num: 0, indexName: 'test12', interfaceAds: 'dizhi1', reqType: 'request', respType: 'response', owner: 'owner', application: 'app', apiDescription: 'description', favorite: false, applyStatus: 0 },
                    { assetType: 'api', num: 0, indexName: 'test2', interfaceAds: 'dizhi1', reqType: 'request', respType: 'response', owner: 'owner', application: 'app', apiDescription: 'description', favorite: false, applyStatus: 1 },
                    { assetType: 'api', num: 0, indexName: 'test3', interfaceAds: 'dizhi1', reqType: 'request', respType: 'response', owner: 'owner', application: 'app', apiDescription: 'description', favorite: true, applyStatus: 1 }
                ],
                targetList: [
                    { assetType: 'target', num: 0, targetName: 'test7', deptName: '部门',targetCode: 'code', targetType: 'type', businessDept: 'dept', currency: 'currency', statisticsRate: '10/min', favorite: false },
                    { assetType: 'target', num: 0, targetName: 'test9', deptName: '部门',targetCode: 'code', targetType: 'type', businessDept: 'dept', currency: 'currency', statisticsRate: '10/min', favorite: false },
                    { assetType: 'target', num: 0, targetName: 'test11', deptName: '部门',targetCode: 'code', targetType: 'type', businessDept: 'dept', currency: 'currency', statisticsRate: '10/min', favorite: false },
                    { assetType: 'target', num: 0, targetName: 'test13', deptName: '部门',targetCode: 'code', targetType: 'type', businessDept: 'dept', currency: 'currency', statisticsRate: '10/min', favorite: true },
                    { assetType: 'target', num: 0, targetName: 'test1', deptName: '部门',targetCode: 'code', targetType: 'type', businessDept: 'dept', currency: 'currency', statisticsRate: '10/min', favorite: false },
                    { assetType: 'target', num: 0, targetName: 'test8', deptName: '部门',targetCode: 'code', targetType: 'type', businessDept: 'dept', currency: 'currency', statisticsRate: '10/min', favorite: false },
                    { assetType: 'target', num: 0, targetName: 'test10', deptName: '部门',targetCode: 'code', targetType: 'type', businessDept: 'dept', currency: 'currency', statisticsRate: '10/min', favorite: false },
                    { assetType: 'target', num: 0, targetName: 'test12', deptName: '部门',targetCode: 'code', targetType: 'type', businessDept: 'dept', currency: 'currency', statisticsRate: '10/min', favorite: true },
                    { assetType: 'target', num: 0, targetName: 'test2', deptName: '部门',targetCode: 'code', targetType: 'type', businessDept: 'dept', currency: 'currency', statisticsRate: '10/min', favorite: false },
                    { assetType: 'target', num: 0, targetName: 'test3', deptName: '部门',targetCode: 'code', targetType: 'type', businessDept: 'dept', currency: 'currency', statisticsRate: '10/min', favorite: true }
                ],
                labelList: [
                    { assetType: 'label', num: 0, labelName: 'test7', labelCode: 'code', invalidTime: '9999-05-05', rangeCode: '公开', description: 'desc', businessCaliber: 'caliber', favorite: true },
                    { assetType: 'label', num: 0, labelName: 'test9', labelCode: 'code', invalidTime: '2022-05-05', rangeCode: '公开', description: 'desc', businessCaliber: 'caliber', favorite: false },
                    { assetType: 'label', num: 0, labelName: 'test11', labelCode: 'code', invalidTime: '2022-05-05', rangeCode: '公开', description: 'desc', businessCaliber: 'caliber', favorite: true },
                    { assetType: 'label', num: 0, labelName: 'test13', labelCode: 'code', invalidTime: '2022-05-05', rangeCode: '公开', description: 'desc', businessCaliber: 'caliber', favorite: false },
                    { assetType: 'label', num: 0, labelName: 'test1', labelCode: 'code', invalidTime: '2022-05-05', rangeCode: '公开', description: 'desc', businessCaliber: 'caliber', favorite: true },
                    { assetType: 'label', num: 0, labelName: 'test8', labelCode: 'code', invalidTime: '2022-05-05', rangeCode: '公开', description: 'desc', businessCaliber: 'caliber', favorite: false },
                    { assetType: 'label', num: 0, labelName: 'test10', labelCode: 'code', invalidTime: '2022-05-05', rangeCode: '公开', description: 'desc', businessCaliber: 'caliber', favorite: false },
                    { assetType: 'label', num: 0, labelName: 'test12', labelCode: 'code', invalidTime: '2022-05-05', rangeCode: '公开', description: 'desc', businessCaliber: 'caliber', favorite: false },
                    { assetType: 'label', num: 0, labelName: 'test2', labelCode: 'code', invalidTime: '2022-05-05', rangeCode: '公开', description: 'desc', businessCaliber: 'caliber', favorite: true },
                    { assetType: 'label', num: 0, labelName: 'test3', labelCode: 'code', invalidTime: '2022-05-05', rangeCode: '公开', description: 'desc', businessCaliber: 'caliber', favorite: false }
                ],
                obj: [
                    {keywords: '123', id: '1', assetType: 'target', targetName: 'test7', targetCode: 'code', targetType: 'type', businessDept: 'dept', currency: 'currency', statisticsRate: '10/min', favorite: false },
                    {keywords: '234', id: '2', assetType: 'table', tableName: 'test7',project: 'project', driverType: 'druvertype', owner: 'owner', tableComment: 'tableComment11111sadsdasdasdasdasdasdasdasdasdasdasdasdasdsad111111111111111111111111', favorite: false, permission: 0 },
                    {keywords: '333', id: '3', assetType: 'table', tableName: 'test9',project: 'project', driverType: 'druvertype', owner: 'owner', tableComment: 'tableComment', favorite: false, permission: 1 },
                    {keywords: '222', id: '4', assetType: 'label', labelName: 'test7', labelCode: 'code', invalidTime: '2022-05-05', rangeCode: '公开', description: 'desc', businessCaliber: 'caliber', favorite: true },
                    {keywords: '333', id: '5', assetType: 'label', labelName: 'test9', labelCode: 'code', invalidTime: '2022-05-05', rangeCode: '公开', description: 'desc', businessCaliber: 'caliber', favorite: false },
                    {keywords: '444', id: '6', assetType: 'api', indexName: 'test7', interfaceAds: 'dizhi1', reqType: 'request', respType: 'response', owner: 'owner', application: 'app', apiDescription: 'description', favorite: true, applyStatus: 1 },
                    {keywords: '555', id: '7', assetType: 'api', indexName: 'test9', interfaceAds: 'dizhi1', reqType: 'request', respType: 'response', owner: 'owner', application: 'app', apiDescription: 'description', favorite: true, applyStatus: 2 },
                    {keywords: '222', id: '8', assetType: 'table', tableName: 'test2',project: 'project', driverType: 'druvertype', owner: 'owner', tableComment: 'tableComment', favorite: true,permission: 0 },
                    {keywords: '333', id: '9', assetType: 'table', tableName: 'test3',project: 'project', driverType: 'druvertype', owner: 'owner', tableComment: 'tableComment', favorite: false,permission: 1 },
                    {keywords: '111', id: '10', assetType: 'table', tableName: 'test3',project: 'project', driverType: 'druvertype', owner: 'owner', tableComment: 'tableComment', favorite: false, permission: 1 },
                    {keywords: '222', id: '11', assetType: 'table', tableName: 'test2',project: 'project', driverType: 'druvertype', owner: 'owner', tableComment: 'tableComment', favorite: true, permission: 2},
                    {keywords: '444', id: '12', assetType: 'table', tableName: 'test3',project: 'project', driverType: 'druvertype', owner: 'owner', tableComment: 'tableComment', favorite: false, permission: 0 },
                    {keywords: '222', id: '13', assetType: 'api', indexName: 'test7', interfaceAds: 'dizhi1', reqType: 'request', respType: 'response', owner: 'owner', application: 'app', apiDescription: 'description', favorite: true, applyStatus: 3 },
                    {keywords: '111', id: '14', assetType: 'api', indexName: 'test9', interfaceAds: 'dizhi1', reqType: 'request', respType: 'response', owner: 'owner', application: 'app', apiDescription: 'description', favorite: true, applyStatus: 0 },
                ],
                total: 10,
            }
            return res
        }
    },
    {
        url: '/asset/classify/getTree',
        type: 'get',
        response: () => {
            let data = [
                {
                    id: '1',
                    name: '公司银行',
                    level: '1',
                    children: [
                        {
                            id: '1_1',
                            name: '对公贷款',
                            level: '2',
                            children: [
                                {
                                    id: '1_1_1',
                                    name: '业务表数据资产(STD)',
                                    level: '4',
                                    icon: 'el-icon-document',
                                    children: []
                                },
                                {
                                    id: '1_1_2',
                                    name: '明细表数据资产(DWD)',
                                    level: '4',
                                    icon: 'el-icon-document',
                                    children: []
                                },
                                {
                                    id: '1_1_3',
                                    name: '汇总表数据资产(DWS)',
                                    level: '4',
                                    icon: 'el-icon-document',
                                    children: []
                                },
                                {
                                    id: '1_1_4',
                                    name: '业务个性数据资产(ADM)',
                                    level: '4',
                                    icon: 'el-icon-document',
                                    children: []
                                },
                            ]
                        },
                        {
                            id: '1_2',
                            name: '理财',
                            level: '2',
                            children: []
                        },
                        {
                            id: '1_3',
                            name: '对公客户',
                            level: '2',
                            children: []
                        },
                        {
                            id: '1_4',
                            name: '进出口类',
                            level: '2',
                            children: []
                        },
                        {
                            id: '1_5',
                            name: '对公存款',
                            level: '2',
                            children: []
                        },
                        {
                            id: '1_6',
                            name: '信用证',
                            level: '2',
                            children: []
                        },
                        {
                            id: '1_7',
                            name: '保函',
                            level: '2',
                            children: []
                        },
                        {
                            id: '1_8',
                            name: '银行本汇票',
                            level: '2',
                            children: []
                        },
                        {
                            id: '1_9',
                            name: '商业汇票',
                            level: '2',
                            children: []
                        },
                        {
                            id: '1_10',
                            name: '代发代扣',
                            level: '2',
                            children: []
                        },
                        {
                            id: '1_11',
                            name: '代收代付',
                            level: '2',
                            children: []
                        },
                    ]
                },
                {
                    id: '2',
                    name: '零售银行',
                    level: '1',
                    children: [
                        {
                            id: '2_1',
                            name: '个人存款',
                            level: '2',
                            children: []
                        },
                        {
                            id: '2_2',
                            name: '个人贷款',
                            level: '2',
                            children: []
                        },
                        {
                            id: '2_3',
                            name: '网贷',
                            level: '2',
                            children: []
                        },
                        {
                            id: '2_4',
                            name: '存折',
                            level: '2',
                            children: []
                        },
                        {
                            id: '2_5',
                            name: '借记卡',
                            level: '2',
                            children: []
                        },
                        {
                            id: '2_6',
                            name: '信用卡',
                            level: '2',
                            children: []
                        },
                        {
                            id: '2_7',
                            name: '个人客户',
                            level: '2',
                            children: []
                        },
                        {
                            id: '2_8',
                            name: '理财',
                            level: '2',
                            children: []
                        },
                        {
                            id: '2_9',
                            name: '基金',
                            level: '2',
                            children: []
                        },
                        {
                            id: '2_10',
                            name: '保险',
                            level: '2',
                            children: []
                        },
                        {
                            id: '2_11',
                            name: '信托',
                            level: '2',
                            children: []
                        },
                        {
                            id: '2_12',
                            name: '贵金属',
                            level: '2',
                            children: []
                        },
                        {
                            id: '2_13',
                            name: '资管',
                            level: '2',
                            children: []
                        },
                        {
                            id: '2_14',
                            name: '统一支付',
                            level: '2',
                            children: []
                        },
                        {
                            id: '2_15',
                            name: '电子渠道',
                            level: '2',
                            children: []
                        },
                        {
                            id: '2_16',
                            name: '线下渠道',
                            level: '2',
                            children: []
                        },
                        {
                            id: '2_17',
                            name: '代发代扣',
                            level: '2',
                            children: []
                        },
                        {
                            id: '2_18',
                            name: '代收代付',
                            level: '2',
                            children: []
                        },
                    ]
                },
                {
                    id: '3',
                    name: '数字银行',
                    level: '1',
                    children: [
                        {
                            id: '3_1',
                            name: '个人客户',
                            level: '2',
                            children: []
                        },
                        {
                            id: '3_2',
                            name: '个人存款',
                            level: '2',
                            children: []
                        },
                        {
                            id: '3_3',
                            name: '个人贷款',
                            level: '2',
                            children: []
                        },
                        {
                            id: '3_4',
                            name: '网贷',
                            level: '2',
                            children: []
                        },
                        {
                            id: '3_5',
                            name: '借记卡',
                            level: '2',
                            children: []
                        },
                        {
                            id: '3_6',
                            name: '信用卡',
                            level: '2',
                            children: []
                        },
                        {
                            id: '3_7',
                            name: '理财',
                            level: '2',
                            children: []
                        },
                        {
                            id: '3_8',
                            name: '基金',
                            level: '2',
                            children: []
                        },
                        {
                            id: '3_9',
                            name: '统一支付',
                            level: '2',
                            children: []
                        },
                        {
                            id: '3_10',
                            name: '电子渠道',
                            level: '2',
                            children: []
                        },
                        {
                            id: '3_11',
                            name: '线下渠道',
                            level: '2',
                            children: []
                        },
                        {
                            id: '3_12',
                            name: '代发代扣',
                            level: '2',
                            children: []
                        },
                    ]
                },
                {
                    id: '4',
                    name: '金融市场',
                    level: '1',
                    children: [
                        {
                            id: '4_1',
                            name: '同业客户',
                            level: '2',
                            children: []
                        },
                        {
                            id: '4_2',
                            name: '存放同业',
                            level: '2',
                            children: []
                        },
                        {
                            id: '4_3',
                            name: '理财资管',
                            level: '2',
                            children: []
                        },
                        {
                            id: '4_4',
                            name: '同业融资',
                            level: '2',
                            children: []
                        },
                        {
                            id: '4_5',
                            name: '同业投资',
                            level: '2',
                            children: []
                        },
                        {
                            id: '4_6',
                            name: '同业资管',
                            level: '2',
                            children: []
                        },
                    ]
                },
                {
                    id: '5',
                    name: '公共类',
                    level: '1',
                    children: [
                        {
                            id: '5_1',
                            name: '机构目录',
                            level: '2',
                            children: []
                        },
                        {
                            id: '5_2',
                            name: '员工目录',
                            level: '2',
                            children: []
                        },
                        {
                            id: '5_3',
                            name: '渠道目录',
                            level: '2',
                            children: []
                        },
                        {
                            id: '5_4',
                            name: '科目目录',
                            level: '2',
                            children: []
                        },
                        {
                            id: '5_5',
                            name: '科技目录',
                            level: '2',
                            children: []
                        },
                    ]
                }
            ]
            return data
        }
    },
    {
        url: '/asset/classify/getAuthTree',
        type: 'get',
        response: () => {
            let data = [
                {
                    "id":"1",
                    "contentsId":"1",
                    "name":"表结构1",
                    "pid":"0",
                    "type":"table",
                    "level":"1",
                    "children":[
                        {
                            "id":"2",
                            "contentsId":"2",
                            "name":"表结构1的儿子",
                            "pid":"1",
                            "type":"table",
                            "level":"2",
                            "children":[
                                {
                                    "id":"22",
                                    "contentsId":"22",
                                    "name":"表结构1的孙子1",
                                    "pid":"2",
                                    "type":"table",
                                    "level":"3",
                                },
                                {
                                    "id":"31",
                                    "contentsId":"31",
                                    "name":"表结构1的孙子2",
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
                    name: '表结构2',
                    pid: '0',
                    type: 'table',
                    level: '1',
                    "children":[
                        {
                            "id":"5",
                            "contentsId":"6",
                            "name":"表结构1的儿子",
                            "pid":"1",
                            "type":"table",
                            "level":"2",
                            "children":[
                                {
                                    "id":"222",
                                    "contentsId":"222",
                                    "name":"表结构1的孙子1",
                                    "pid":"2",
                                    "type":"table",
                                    "level":"3",
                                },
                                {
                                    "id":"331",
                                    "contentsId":"331",
                                    "name":"表结构1的孙子2",
                                    "pid":"2",
                                    "type":"table",
                                    "level":"3",
                                }
                            ]
                        }
                    ]
                }
            ]
            return {
                code: '200',
                msg: '',
                data: data
            }
        }
    },
    {
        url: '/asset/search/getDetail',
        type: 'post',
        response: () => {
            let obj = {
                code: '200',
                data: {
                    approveState: '4',
                    businessDept: '1023',
                    classifyOne: '941726484844773376',
                    classifyTwo: '941726484861550594',
                    confirmation: 0,
                    dataFormat: '18(2)',
                    dataType: '2',
                    id: '99',
                    insideAlert: '--null',
                    measureUnit: '3',
                    myCrtTime: '2021-03-18 00:00:00',
                    nowProcessing: 0,
                    processSystem: 'Comstar',
                    referenceBasis: '长短期明细表',
                    rtargetName: '',
                    safetyLevel: '3',
                    standardSource: '1',
                    standardState: '2',
                    statisticsRate: 'M',
                    superviseAlert: '--null',
                    targetCode: 'BD000247',
                    targetDefinition: '截至统计时点，我行买入的各类债券余额。',
                    targetLevel: '2',
                    targetName: '债券买入余额',
                    targetRange: '0.00--9999999999999999.99',
                    targetRule: '长短期明细表中所有债券总金额，债券和非标的区分原则（非标人为命名不规范，债券的名字标准）',
                    targetType: '1',
                    tenant: '1001',
                    valueAttribute: '1'
                }
            }
            return obj
        }
    },
    {
        url: '/asset/workflow/tasks/startTask',
        type: 'post',
        response: () => {
            return {
                code: "200",
                msg: '申请成功',
            }
        }
    },
    {
        url: '/assets/favorite/add',
        type: 'post',
        response: () => {
            return {
                code: '200',
                msg: '添加成功!'
            }
        }
    },
    {
        url: '/assets/favorite/cancel',
        type: 'post',
        response: () => {
            return {
                code: '200',
                msg: '取消成功!'
            }
        }
    },
    {
        url: '/asset/search/getAppList',
        type: 'get',
        response: () => {
            return {
                code: '200',
                msg: '',
                data: [
                    {
                        "id": "1519923723722215424",
                        "appCode": "00000001",
                        "appName": "应用1"
                    },
                    {
                        "id": "1519923723722215425",
                        "appCode": "00000002",
                        "appName": "应用2"
                    },
                    {
                        "id": "1519923723722215426",
                        "appCode": "00000003",
                        "appName": "应用3"
                    },
                ]
            }
        }
    },
    {
        url: '/asset/search/getTargetSelec',
        type: 'get',
        response: () => {
            return {
                code: '200',
                msg: '删除成功!',
                data: {
                    "targetTypeList": [
                        "组合指标",
                        "根指标",
                        "衍生指标"
                    ],
                    "classifyOneList": [
                        "963016660711636992",
                        "963016660711636993"
                    ],
                    "classifyTwoList": [
                        "963016660715831296",
                        "963016660715831298"
                    ]
                }
            }
        }
    },
    {
        url: '/asset/search/findDeptTree',
        type: 'get',
        response: () => {
            return {
                code: '200',
                msg: '删除成功!',
                data: 
                    {
                        "id": "r1",
                        "name": "苏银集团",
                        "pid": "r1",
                        "children": [
                            {
                                "id": "1001",
                                "name": "苏州银行总行",
                                "pid": "1001",
                                "children":[
                                    {
                                        "id": "1002",
                                        "name": "苏州银行总行1",
                                        "pid": "1002",
                                        "children":null
                                    },
                                    {
                                        "id": "1003",
                                        "name": "苏州银行总行2",
                                        "pid": "1003",
                                        "children":null
                                    },
                                    {
                                        "id": "1004",
                                        "name": "苏州银行总行3",
                                        "pid": "1004",
                                        "children":null
                                    },
                                ]
                            }
                        ]
                    }
                
            }
        }
    },
    {
        url: '/asset/api/apply/add',
        type: 'post',
        response: () => {
            return {
                code: '200',
                msg: '申请成功!',
            }
        }
    },
    {
        url: '/assets/operate/table/getSelfTablePage',
        type: 'post',
        response: () => {
            let tableList =[
                    { assetType: 'table', num: 0, tableName: 'wodebiao',project: 'prxxxxoject', driverType: 'druvertype', owner: 'owner', tableComment: 'tableComment', favorite: false, permission: 0 },
                    { assetType: 'table', num: 0, tableName: 'wodebiao',project: 'xxxx', driverType: 'druvertype', owner: 'owner', tableComment: 'tableComment', favorite: false, permission: 1 },
                    { assetType: 'table', num: 0, tableName: 'wodebiao',project: 'xxxx', driverType: 'druvertype', owner: 'owner', tableComment: 'tableComment', favorite: true },
                    { assetType: 'table', num: 0, tableName: 'wodebiao',project: 'xxxx', driverType: 'druvertype', owner: 'owner', tableComment: 'tableComment', favorite: false, permission: 0 },
                    { assetType: 'table', num: 0, tableName: 'wodebiao',project: 'xxx', driverType: 'druvertype', owner: 'owner', tableComment: 'tableComment', favorite: false, permission: 2 },
                    { assetType: 'table', num: 0, tableName: 'wodebiao',project: 'project', driverType: 'druvertype', owner: 'owner', tableComment: 'tableComment', favorite: true, permission: 0 },
                    { assetType: 'table', num: 0, tableName: 'wodebiao',project: 'project', driverType: 'druvertype', owner: 'owner', tableComment: 'tableComment', favorite: false, permission: 1 },
                    { assetType: 'table', num: 0, tableName: 'wodebiao',project: 'project', driverType: 'druvertype', owner: 'owner', tableComment: 'tableComment', favorite: false, permission: 0 },
                    { assetType: 'table', num: 0, tableName: 'wodebiao',project: 'project', driverType: 'druvertype', owner: 'owner', tableComment: 'tableComment', favorite: true, permission: 0 },
                    { assetType: 'table', num: 0, tableName: 'wodebiao',project: 'project', driverType: 'druvertype', owner: 'owner', tableComment: 'tableComment', favorite: false, permission: 2 },
                    { assetType: 'table', num: 0, tableName: 'test2',project: 'project', driverType: 'druvertype', owner: 'owner', tableComment: 'tableComment', favorite: true, permission: 0 },
                    { assetType: 'table', num: 0, tableName: 'test3',project: 'project', driverType: 'druvertype', owner: 'owner', tableComment: 'tableComment', favorite: false, permission: 1 },
                    { assetType: 'table', num: 0, tableName: 'test2',project: 'project', driverType: 'druvertype', owner: 'owner', tableComment: 'tableComment', favorite: true, permission: 2},
                    { assetType: 'table', num: 0, tableName: 'test3',project: 'project', driverType: 'druvertype', owner: 'owner', tableComment: 'tableComment', favorite: false, permission: 0 }
                ]
            return {
                code: 0,
                msg: '',
                data: {
                    total: 10,
                    records: tableList
                }
            }
        }
    },
    // 表数据预览
    {
        url: '/assetsTable/preview/getListByName',
        type: 'get',
        response: () => {
            return {
                code: '0',
                msg: '成功',
                data: {
                    columns: [
                        {
                            "prop": "api_id",
                            "label": "api_id"
                        },
                        {
                            "prop": "apply_date",
                            "label": "yingwenbiaoming,中文表名",
                        },
                        {
                            "prop": "crt_user_code",
                            "label": "crt_user_code"
                        },
                        {
                            "prop": "id",
                            "label": "id"
                        },
                        {
                            "prop": "crt_date",
                            "label": "crt_date"
                        },
                        {
                            "prop": "applicant",
                            "label": "applicant"
                        },
                        {
                            "prop": "status",
                            "label": "status"
                        }
                    ],
                    dataList: [
                        {
                            "api_id": "1510160124942413825",
                            "apply_date": "2022-05-06 17:37:16",
                            "crt_user_code": "liuyuyang",
                            "id": "1",
                            "crt_date": "2022-05-06 17:37:16",
                            "applicant": "3",
                            "status": "2"
                        },
                        {
                            "api_id": "1510160124942413825",
                            "apply_date": "2022-05-06 17:37:16",
                            "crt_user_code": "liuyuyang",
                            "id": "2",
                            "crt_date": "2022-05-06 17:37:16",
                            "applicant": "3",
                            "status": "2"
                        },
                        {
                            "api_id": "1510160124942413825",
                            "apply_date": "2022-05-06 17:37:16",
                            "crt_user_code": "liuyuyang",
                            "id": "3",
                            "crt_date": "2022-05-06 17:37:16",
                            "applicant": "3",
                            "status": "2"
                        },
                        {
                            "api_id": "1510160124942413825",
                            "apply_date": "2022-05-06 17:37:16",
                            "crt_user_code": "liuyuyang",
                            "id": "3",
                            "crt_date": "2022-05-06 17:37:16",
                            "applicant": "3",
                            "status": "4"
                        },
                        {
                            "api_id": "1510160124942413825",
                            "apply_date": "2022-05-06 17:37:16",
                            "crt_user_code": "liuyuyang",
                            "id": "5",
                            "crt_date": "2022-05-06 17:37:16",
                            "applicant": "3",
                            "status": "2"
                        },
                    ]
                }
            }
        }
    },
    // 标签下拉框
    {
        url: '/asset/search/getLabelSelect',
        type: 'get',
        response: () => {
            let classifyNameList =[
                '1',
                '2',
                '3'
            ]
            let fromCodeList = [
                '123',
                '234',
                '345'
            ]
            return {
                code: 0,
                msg: '',
                data: {
                    classifyNameList: classifyNameList,
                    fromCodeList: fromCodeList
                }
            }
        }
    },
]