module.exports = [
    {
        url: '/assets/favorite/page',
        type: 'get',
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
                    { assetType: 'target', num: 0, targetName: 'test7', targetCode: 'code', targetType: 'type', businessDept: 'dept', currency: 'currency', statisticsRate: '10/min', favorite: false },
                    { assetType: 'target', num: 0, targetName: 'test9', targetCode: 'code', targetType: 'type', businessDept: 'dept', currency: 'currency', statisticsRate: '10/min', favorite: false },
                    { assetType: 'target', num: 0, targetName: 'test11', targetCode: 'code', targetType: 'type', businessDept: 'dept', currency: 'currency', statisticsRate: '10/min', favorite: false },
                    { assetType: 'target', num: 0, targetName: 'test13', targetCode: 'code', targetType: 'type', businessDept: 'dept', currency: 'currency', statisticsRate: '10/min', favorite: true },
                    { assetType: 'target', num: 0, targetName: 'test1', targetCode: 'code', targetType: 'type', businessDept: 'dept', currency: 'currency', statisticsRate: '10/min', favorite: false },
                    { assetType: 'target', num: 0, targetName: 'test8', targetCode: 'code', targetType: 'type', businessDept: 'dept', currency: 'currency', statisticsRate: '10/min', favorite: false },
                    { assetType: 'target', num: 0, targetName: 'test10', targetCode: 'code', targetType: 'type', businessDept: 'dept', currency: 'currency', statisticsRate: '10/min', favorite: false },
                    { assetType: 'target', num: 0, targetName: 'test12', targetCode: 'code', targetType: 'type', businessDept: 'dept', currency: 'currency', statisticsRate: '10/min', favorite: true },
                    { assetType: 'target', num: 0, targetName: 'test2', targetCode: 'code', targetType: 'type', businessDept: 'dept', currency: 'currency', statisticsRate: '10/min', favorite: false },
                    { assetType: 'target', num: 0, targetName: 'test3', targetCode: 'code', targetType: 'type', businessDept: 'dept', currency: 'currency', statisticsRate: '10/min', favorite: true }
                ],
                labelList: [
                    { assetType: 'label', num: 0, labelName: 'test7', labelCode: 'code', invalidTime: '2022-05-05', rangeCode: '公开', description: 'desc', businessCaliber: 'caliber', favorite: true },
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
                    {id: '1', assetType: 'target', num: 0, targetName: 'test7', targetCode: 'code', targetType: 'type', businessDept: 'dept', currency: 'currency', statisticsRate: '10/min', favorite: false },
                    {id: '2', assetType: 'table', num: 0, tableName: 'test7',project: 'project', driverType: 'druvertype', owner: 'owner', tableComment: 'tableComment', favorite: false, permission: 0 },
                    {id: '3', assetType: 'table', num: 0, tableName: 'test9',project: 'project', driverType: 'druvertype', owner: 'owner', tableComment: 'tableComment', favorite: false, permission: 1 },
                    {id: '4', assetType: 'label', num: 0, labelName: 'test7', labelCode: 'code', invalidTime: '2022-05-05', rangeCode: '公开', description: 'desc', businessCaliber: 'caliber', favorite: true },
                    {id: '5', assetType: 'label', num: 0, labelName: 'test9', labelCode: 'code', invalidTime: '2022-05-05', rangeCode: '公开', description: 'desc', businessCaliber: 'caliber', favorite: false },
                    {id: '6', assetType: 'api', num: 0, indexName: 'test7', interfaceAds: 'dizhi1', reqType: 'request', respType: 'response', owner: 'owner', application: 'app', apiDescription: 'description', favorite: true, applyStatus: 1 },
                    {id: '7', assetType: 'api', num: 0, indexName: 'test9', interfaceAds: 'dizhi1', reqType: 'request', respType: 'response', owner: 'owner', application: 'app', apiDescription: 'description', favorite: true, applyStatus: 2 },
                    {id: '8', assetType: 'table', num: 0, tableName: 'test2',project: 'project', driverType: 'druvertype', owner: 'owner', tableComment: 'tableComment', favorite: true,permission: 0 },
                    {id: '9', assetType: 'table', num: 0, tableName: 'test3',project: 'project', driverType: 'druvertype', owner: 'owner', tableComment: 'tableComment', favorite: false,permission: 1 },
                    {id: '10', assetType: 'table', num: 0, tableName: 'test3',project: 'project', driverType: 'druvertype', owner: 'owner', tableComment: 'tableComment', favorite: false, permission: 1 },
                    {id: '11', assetType: 'table', num: 0, tableName: 'test2',project: 'project', driverType: 'druvertype', owner: 'owner', tableComment: 'tableComment', favorite: true, permission: 2},
                    {id: '12', assetType: 'table', num: 0, tableName: 'test3',project: 'project', driverType: 'druvertype', owner: 'owner', tableComment: 'tableComment', favorite: false, permission: 0 },
                    {id: '13', assetType: 'api', num: 0, indexName: 'test7', interfaceAds: 'dizhi1', reqType: 'request', respType: 'response', owner: 'owner', application: 'app', apiDescription: 'description', favorite: true, applyStatus: 3 },
                    {id: '14', assetType: 'api', num: 0, indexName: 'test9', interfaceAds: 'dizhi1', reqType: 'request', respType: 'response', owner: 'owner', application: 'app', apiDescription: 'description', favorite: true, applyStatus: 0 },
                ],
                total: 10,
            }
            return {
                code: 0,
                data: {
                    total: 10,
                    records: [
                        {id: '1', assetType: 'target', num: 0, targetName: 'test7', targetCode: 'code', targetType: 'type', businessDept: 'dept', currency: 'currency', statisticsRate: '10/min', favorite: false },
                        {id: '2', assetType: 'table', num: 0, tableName: 'test7',project: 'project', driverType: 'druvertype', owner: 'owner', tableComment: 'tableComment', favorite: false, permission: 0 },
                        {id: '3', assetType: 'table', num: 0, tableName: 'test9',project: 'project', driverType: 'druvertype', owner: 'owner', tableComment: 'tableComment', favorite: false, permission: 1 },
                        {id: '4', assetType: 'label', num: 0, labelName: 'test7', labelCode: 'code', invalidTime: '2022-05-05', rangeCode: '公开', description: 'desc', businessCaliber: 'caliber', favorite: true },
                        {id: '5', assetType: 'label', num: 0, labelName: 'test9', labelCode: 'code', invalidTime: '2022-05-05', rangeCode: '公开', description: 'desc', businessCaliber: 'caliber', favorite: false },
                        {id: '6', assetType: 'api', num: 0, indexName: 'test7', interfaceAds: 'dizhi1', reqType: 'request', respType: 'response', owner: 'owner', application: 'app', apiDescription: 'description', favorite: true, applyStatus: 1 },
                        {id: '7', assetType: 'api', num: 0, indexName: 'test9', interfaceAds: 'dizhi1', reqType: 'request', respType: 'response', owner: 'owner', application: 'app', apiDescription: 'description', favorite: true, applyStatus: 2 },
                        {id: '8', assetType: 'table', num: 0, tableName: 'test2',project: 'project', driverType: 'druvertype', owner: 'owner', tableComment: 'tableComment', favorite: true,permission: 0 },
                        {id: '9', assetType: 'table', num: 0, tableName: 'test3',project: 'project', driverType: 'druvertype', owner: 'owner', tableComment: 'tableComment', favorite: false,permission: 1 },
                        {id: '10', assetType: 'table', num: 0, tableName: 'test3',project: 'project', driverType: 'druvertype', owner: 'owner', tableComment: 'tableComment', favorite: false, permission: 1 },
                        {id: '11', assetType: 'table', num: 0, tableName: 'test2',project: 'project', driverType: 'druvertype', owner: 'owner', tableComment: 'tableComment', favorite: true, permission: 2},
                        {id: '12', assetType: 'table', num: 0, tableName: 'test3',project: 'project', driverType: 'druvertype', owner: 'owner', tableComment: 'tableComment', favorite: false, permission: 0 },
                        {id: '13', assetType: 'api', num: 0, indexName: 'test7', interfaceAds: 'dizhi1', reqType: 'request', respType: 'response', owner: 'owner', application: 'app', apiDescription: 'description', favorite: true, applyStatus: 3 },
                        {id: '14', assetType: 'api', num: 0, indexName: 'test9', interfaceAds: 'dizhi1', reqType: 'request', respType: 'response', owner: 'owner', application: 'app', apiDescription: 'description', favorite: true, applyStatus: 0 },
                    ]
                }

            }
        }
    },

]
