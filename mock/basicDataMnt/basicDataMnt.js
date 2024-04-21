module.exports = [
    {
        url: '/asset/excel/importCcn',
        type: 'post',
        response: () => {
            return {
                message: '上传失败',
                result: [
                    {
                        field: '111',
                        row: '2'
                    },
                    {
                        field: '222',
                        row: '2'
                    },
                    {
                        field: '333',
                        row: '2'
                    },
                    {
                        field: '444',
                        row: '2'
                    },
                    {
                        field: '555',
                        row: '2'
                    },
                    {
                        field: '666',
                        row: '2'
                    },
                ],
                success: 'false'
            }
        }
    },
    {
        url: '/asset/excel/importMessage',
        type: 'post',
        response: () => {
            return {
                message: '上传失败',
                result: [
                    {
                        field: '111',
                        row: '2'
                    },
                    {
                        field: '222',
                        row: '2'
                    },
                    {
                        field: '333',
                        row: '2'
                    },
                ],
                success: 'false'
            }
        }
    },
]