module.exports = [
    {
        url: '/asset/workflow/myTasks/appliedProcess',
        type: 'get',
        response: () => {
            return {
                "msg": "查询成功",
                "code": "0",
                "data": {
                    "current": 1,
                    "hitCount": false,
                    "orders": [],
                    "pages": 1,
                    "records": [
                        {
                            "REV": "1",
                            "tableId": "86",
                            "CRT_USER": "liuyuyang",
                            "UPD_USER": "liuyun",
                            "END_DATE": "2022\/04\/18 15:23:24",
                            "PROC_INST_ID": 1515951306171691000,
                            "NICK_NAME": "???",
                            "NAME": "1??267??",
                            "ORIGINAL_INST_ID": "1515951306171691009",
                            "STATUS": "已通过",
                            'STATUS_DESC': '已通过',
                            "CRT_DEPT_CODE": "0001A110000000002648",
                            "CRT_DATE": "2022\/04\/19 15:12:11",
                            "dept_Name": "部门",
                            "DEPT_NAME": "部门",
                            "BUSINESS_KEY": "267",
                            "DURATION": "0?0??",
                            "UPD_DATE": "2022\/04\/18 15:23:24"
                        },
                        {
                            "REV": "1",
                            "tableId": "76",
                            "CRT_USER": "liuyuyang",
                            "END_DATE": "2022\/04\/18 15:03:19",
                            "PROC_INST_ID": 1515946318292750300,
                            "NICK_NAME": "???",
                            "NAME": "1??266??",
                            "ORIGINAL_INST_ID": "1515946318292750337",
                            "STATUS": "已拒绝",
                            'STATUS_DESC': '已拒绝',
                            "CRT_DEPT_CODE": "1001",
                            "CRT_DATE": "2022\/04\/18 14:52:22",
                            "dept_Name": "部门",
                            "DEPT_NAME": "部门",
                            "BUSINESS_KEY": "266",
                            "DURATION": "0?0??",
                            "UPD_DATE": "2022\/04\/18 15:03:19"
                        },
                        {
                            "REV": "1",
                            "tableId": "66",
                            "CRT_USER": "liuyuyang",
                            "UPD_USER": "liuyuyang",
                            "END_DATE": "2022\/04\/18 14:46:27",
                            "PROC_INST_ID": 1515930797337890800,
                            "NICK_NAME": "???",
                            "NAME": "1??265??",
                            "ORIGINAL_INST_ID": "1515930797337890818",
                            "STATUS": "待审批",
                            'STATUS_DESC': '待审批',
                            "CRT_DEPT_CODE": "1001",
                            "CRT_DATE": "2022\/04\/18 13:50:41",
                            "dept_Name": "部门",
                            "DEPT_NAME": "部门",
                            "BUSINESS_KEY": "255",
                            "DURATION": "0?0??",
                            "UPD_DATE": "2022\/04\/18 14:46:27"
                        },
                        {
                            "REV": "1",
                            "tableId": "56",
                            "CRT_USER": "liuyuyang",
                            "UPD_USER": "liuyuyang",
                            "END_DATE": "2022\/04\/18 14:46:27",
                            "PROC_INST_ID": 1515930797337890800,
                            "NICK_NAME": "???",
                            "NAME": "1??265??",
                            "ORIGINAL_INST_ID": "1515930797337890818",
                            "STATUS": "草稿",
                            'STATUS_DESC': '草稿',
                            "CRT_DEPT_CODE": "1001",
                            "CRT_DATE": "2022\/04\/18 13:50:41",
                            "dept_Name": "部门",
                            "DEPT_NAME": "部门",
                            "BUSINESS_KEY": "255",
                            "DURATION": "0?0??",
                            "UPD_DATE": "2022\/04\/18 14:46:27"
                        },
                    ],
                    "searchCount": true,
                    "size": 5,
                    "total": 3
                }
            }
        }
    },
    {
        url: '/asset/workflow/myTasks/waitApprove',
        type: 'get',
        response: () => {
            return {
                "msg": "????",
                "code": "0",
                "data": {
                    "current": 1,
                    "hitCount": false,
                    "orders": [],
                    "pages": 1,
                    "records": [
                        {
                            "ORIGINAL_INST_ID": "1515951306171691009",
                            "CRT_DEPT_CODE": "0001A110000000002648",
                            "DEPT_NAME": "部门",
                            "tableId": "46",
                            "CRT_USER": "liuyuyang",
                            "STATUS_DESC": "待审批",
                            "ASSIGNEE": "liuyuyang",
                            "CRT_DATE": "2022\/04\/19 15:12:11",
                            "BUSINESS_KEY": "267",
                            "PROC_INST_ID": "1515951306171691009",
                            "NICK_NAME": "???",
                            "TASK_ID": 1515951306746310700,
                            "NAME": "1??267??"
                        },
                        {
                            "ORIGINAL_INST_ID": "1515946318292750337",
                            "CRT_DEPT_CODE": "1001",
                            "DEPT_NAME": "部门",
                            "tableId": "36",
                            "CRT_USER": "liuyuyang",
                            "STATUS_DESC": "待审批",
                            "ASSIGNEE": "liuyuyang",
                            "CRT_DATE": "2022\/04\/18 14:52:22",
                            "BUSINESS_KEY": "266",
                            "PROC_INST_ID": "1515946318292750337",
                            "NICK_NAME": "???",
                            "TASK_ID": 1515946318879953000,
                            "NAME": "1??266??"
                        }
                    ],
                    "searchCount": true,
                    "size": 20,
                    "total": 2
                }
            }
        }
    },
    {
        url: '/asset/workflow/myTasks/alreadyApprove',
        type: 'get',
        response: () => {
            return {
                "msg": "????",
                "code": "0",
                "data": {
                    "current": 1,
                    "hitCount": false,
                    "orders": [],
                    "pages": 1,
                    "records": [
                        {
                            "ORIGINAL_INST_ID": "1515951306171691009",
                            "STATUS_DESC": "已通过",
                            "CRT_USER": "liuyuyang",
                            "CRT_DEPT_CODE": "0001A110000000002648",
                            "DEPT_NAME": "部门",
                            "tableId": "26",
                            "CRT_DATE": "2022\/04\/19 15:12:11",
                            "name": "1??267??",
                            "BUSINESS_KEY": "267",
                            "PROC_INST_ID": 1515951306171691000,
                            "NICK_NAME": "???",
                        },
                        {
                            "ORIGINAL_INST_ID": "1515930797337890818",
                            "STATUS_DESC": "已通过",
                            "CRT_USER": "liuyuyang",
                            "CRT_DEPT_CODE": "1001",
                            "DEPT_NAME": "部门",
                            "tableId": "16",
                            "CRT_DATE": "2022\/04\/18 13:50:41",
                            "name": "1??265??",
                            "BUSINESS_KEY": "255",
                            "PROC_INST_ID": 1515930797337890800,
                            "NICK_NAME": "???",
                        }
                    ],
                    "searchCount": true,
                    "size": 20,
                    "total": 2
                }
            }
        }
    },
    {
        url: '/asset/workflow/tasks/completeTask',
        type: 'post',
        response: () => {
            return {
                "msg": "处理成功。",
                "code": "0000"
            }
        }
    },
    // 统一数据门户流程审批详情
    {
        url: '/assets/operate/table/getTableByIdToProcessApprove',
        type: 'get',
        response: () => {
            return {
                "message": "查询成功",
                "data": {
                    "todo": "true",
                    "main_form": {
                        "assetId": "table_1651126255233",
                        "assetType": "",
                        "assetsState": "unpublished",
                        "belongSys": "",
                        "catalogue1Name": "",
                        "catalogue2Name": "",
                        "catalogue3Name": "",
                        "catalogues": {},
                        "categoryInfoList": "",
                        "categoryOne": "",
                        "categoryThree": "",
                        "categoryTwo": "",
                        "chineseName": "",
                        "columnsChinese": "",
                        "columnsMeta": "[{\"name\":\"column1\",\"comment\":\"字段1\"}, {\"name\":\"column2\",\"comment\":\"字段2\"}, {\"name\":\"column3\",\"comment\":\"字段3\"}]",
                        "createTime": 1655954366000,
                        "createTimeStr": "2022-06-23 11:19:26",
                        "deptCode": "0001A11000000000264B",
                        "deptName": "营业部",
                        "description": "",
                        "driverType": "",
                        "favorite": false,
                        "fromWorkspaceCode": "",
                        "fromWorkspaceId": "",
                        "id": "table_1651126255233",
                        "isFavorite": "",
                        "keywords": "",
                        "myCrtTime": "",
                        "myCrter": "",
                        "myUpdTime": "",
                        "myUpder": "",
                        "num": 0,
                        "online": 1,
                        "oprState":
                            "publish",
                        "owner": "",
                        "permission": 0,
                        "project": "project1",
                        "schemaCode": "",
                        "schemaId": "",
                        "tableComment": "zfw的测试表2",
                        "tableName": "test2",
                        "tenantCode": "",
                        "updateTime": 1656063407000,
                        "updateTimeStr": "2022-06-24 17:36:47",
                        "workspaceCode": "",
                        "workspaceId": ""
                    },
                    "assignee": "cqfang",
                    "sub_forms": [
                        {
                            "length": "",
                            "type": "",
                            "columnName": "column1",
                            "columnMessage": "字段1",
                            "isNull": ""
                        },
                        {
                            "length": "",
                            "type": "",
                            "columnName": "column2",
                            "columnMessage": "字段2",
                            "isNull": ""
                        },
                        {
                            "length": "",
                            "type": "",
                            "columnName": "column3",
                            "columnMessage": "字段3",
                            "isNull": ""
                        }
                    ],
                    "opinion": [
                        {
                            "duration": "0",
                            "user_name": "常庆芳",
                            "user_position": "部门经理",
                            "end_time": "2022-06-23 11:12:43",
                            "name": "发起申请",
                            "task_id": "assets202206231112428730000",
                            "user_account": "cqfang",
                            "state": "0",
                            "org_name": "苏州银行总行",
                            "message": "提交申请"
                        },
                        {
                            "duration": "0天3小时",
                            "user_name": "管理员",
                            "user_position": "部门经理",
                            "end_time": "2022-06-23 14:18:36",
                            "name": "申请人领导审批",
                            "task_id": "assets2022062311124287300001",
                            "user_account": "admin",
                            "state": "1",
                            "org_name": "苏银集团",
                            "message": "通过"
                        },
                        {
                            "duration": "0天0小时",
                            "user_name": "管理员",
                            "user_position": "部门经理",
                            "end_time": "2022-06-23 14:20:42",
                            "name": "表资产所属部门领导审批",
                            "task_id": "assets202206231419081110",
                            "user_account": "admin",
                            "state": "1",
                            "org_name": "苏银集团",
                            "message": "通过"
                        }
                    ]
                },
                "success": true
            }
        }
    },
]
