module.exports = [
    // 登录
    {
        url: 'auth/login',
        type: 'post',
        response: () => {
            return {
                "user": {
                    "dataScopes": [],
                    "roles": [
                        "admin"
                    ],
                    "user": {
                        "avatarName": "avatar.jpeg",
                        "avatarPath": "/home/eladmin/avatar/avatar.jpeg",
                        "createTime": "2018-08-23 09:11:56",
                        "dept": {
                            "id": 2,
                            "name": "研发部"
                        },
                        "email": "admin@el-admin.vip",
                        "enabled": true,
                        "gender": "男",
                        "id": 1,
                        "jobs": [
                            {
                                "id": 11,
                                "name": "全栈开发"
                            }
                        ],
                        "nickName": "管理员",
                        "phone": "18888888888",
                        "pwdResetTime": "2020-05-03 16:38:31",
                        "roles": [
                            {
                                "dataScope": "全部",
                                "id": 1,
                                "level": 1,
                                "name": "超级管理员"
                            }
                        ],
                        "updateBy": "admin",
                        "updateTime": "2020-09-05 10:43:31",
                        "username": "admin"
                    }
                },
                "token": "Bearer eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiIyODBiNzMzMWUyYTE0NjhhODQ3YzM1NWIxOGY5YzM0OCIsInVzZXIiOiJhZG1pbiIsInN1YiI6ImFkbWluIn0.twYXIOMHIC-_PxkNHtv4UhI6rNqxl4lET_lvYyqMo87sGzAxIxkcJ0D5kBsd32dBKA-TEJtDQTujdoO2YuwxWA"
            }
        }
    },
    // 图形验证码
    {
        url: 'auth/code',
        type: 'get',
        response: () => {
            return {
                "uuid": "code-key-4ebd3548f86c45de92e46323b0c41991",
                "img": "data:image/png;base64,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"
            }
        }
    },
    // 用户信息
    {
        url: 'auth/info',
        type: 'get',
        response: () => {
            return {
                "dataScopes": [],
                "roles": [
                    "admin"
                ],
                "user": {
                    "avatarName": "avatar.jpeg",
                    "avatarPath": "/home/eladmin/avatar/avatar.jpeg",
                    "createTime": "2018-08-23 09:11:56",
                    "dept": {
                        "id": 2,
                        "name": "研发部"
                    },
                    "email": "admin@el-admin.vip",
                    "enabled": true,
                    "gender": "男",
                    "id": 1,
                    "jobs": [
                        {
                            "id": 11,
                            "name": "全栈开发"
                        }
                    ],
                    "nickName": "管理员",
                    "phone": "18888888888",
                    "pwdResetTime": "2020-05-03 16:38:31",
                    "roles": [
                        {
                            "dataScope": "全部",
                            "id": 1,
                            "level": 1,
                            "name": "超级管理员"
                        }
                    ],
                    "updateBy": "admin",
                    "updateTime": "2020-09-05 10:43:31",
                    "username": "admin"
                }
            }
        }
    }

]