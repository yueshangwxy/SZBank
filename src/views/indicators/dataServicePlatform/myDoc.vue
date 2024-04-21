<template>
    <div class="myDoc">
        <el-button class="title">我的文件</el-button>
        <el-divider></el-divider>
        <div class="condition">
            <div class="input">
                <p>
                    <el-input v-model="filterForm.input1" placeholder="新建/申请" clearable></el-input>
                    <el-input v-model="filterForm.input2" placeholder="XX" clearable></el-input>
                    <el-input v-model="filterForm.input3" placeholder="XX" clearable></el-input>
                </p>
                <p>
                    <el-input v-model="filterForm.input4" placeholder="XX" clearable></el-input>
                    <el-input v-model="filterForm.input5" placeholder="XX" clearable></el-input>
                    <el-input v-model="filterForm.input6" placeholder="XX" clearable></el-input>
                </p>
            </div>
            <div class="option">
                <p></p>
                <p>
                    <el-button>搜索</el-button>
                    <el-button @click="reset()">重置</el-button>
                </p>
            </div>
        </div>
            <el-table
                :data="dataList"
                border
                max-height="450px">
            <el-table-column
                prop="code"
                label="xxx"
                width="180">
            </el-table-column>
            <el-table-column
                prop="name"
                label="xxx"
                width="180">
            </el-table-column>
            <el-table-column
                prop="dept"
                label="xxx">
            </el-table-column>
            <el-table-column
                prop="type"
                label="xxx">
            </el-table-column>
            <el-table-column
                prop="status"
                label="状态">
            </el-table-column>
            <el-table-column
                label="操作">
                <template slot-scope="scope">
                    <el-button type="text" @click="edit(scope.row)">编辑</el-button>
                    <el-button type="text" @click="outLine(scope.row)">下线</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination @size-change="handleSizeChange" 
            @current-change="handleCurrentChange"
            :current-page="currentPage" 
            :page-sizes="[10, 20, 30, 50]" 
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper" 
            :total="total"
            v-if="total !==0">
        </el-pagination>
        <!-- 编辑弹窗 -->
        <el-dialog
            class="editDocDialog"
            title="编辑"
            :visible.sync="editDialog"
            width="35%">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="文件内容" prop="name">
                <el-input v-model="ruleForm.name" placeholder="请输入名称"></el-input>
            </el-form-item>
            <el-form-item label="文件接口口径" prop="name">
                <el-input v-model="ruleForm.name" placeholder="请输入名称"></el-input>
            </el-form-item>
            <el-form-item label="文件生成时间" prop="name">
                <el-input v-model="ruleForm.name" placeholder="请输入名称"></el-input>
            </el-form-item>
            <el-form-item label="文件目标地址" prop="name">
                <el-input v-model="ruleForm.name" placeholder="请输入名称"></el-input>
            </el-form-item>
            <el-form-item label="文件分隔符" prop="name">
                <el-input v-model="ruleForm.name" placeholder="请输入名称"></el-input>
            </el-form-item>
            <el-form-item label="文件接口格式" prop="name">
                <el-input v-model="ruleForm.name" placeholder="请输入名称"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">确认更新</el-button>
                <el-button type="primary" @click="editDialog=false">取消</el-button>
            </el-form-item>
            <!-- <el-form-item v-if="false">
                <el-upload
                    class="upload-demo"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :on-change="handleChange"
                    :file-list="fileList">
                    <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
            </el-form-item> -->
        </el-form>
        </el-dialog>

    </div>
</template>

<script>
export default {
    name: 'MyDoc',
    data() {
        return {
            filterForm: {
                input1: '',
                input2: '',
                input3: '',
                input4: '',
                input5: '',
                input6: '',
            },
            dataList: [],
            // 分页
            pageSize: 10,
            currentPage: 1,
            total: 2,
            // 编辑弹窗
            editDialog: false,
            ruleForm: {
                name: '',
            },
            rules: {
                name: [
                    { required: false, message: '请输入活动名称', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ]
            },
            fileList: []
        }
    },
    created() {
        this.dataList = [
            {
                id: 1,
                code: "用户1",
                name: "123",
                dept: "13212341234",
                type: "男",
                status: "132@11.com",
            },
            {
                id: 2,
                code: "用户2",
                name: "123",
                dept: "13212341xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx234",
                type: "男",
                status: "132@11.com",
            },
        ]
    },
    methods: {
        // 编辑
        edit(row) {
            console.log(row,'edit');
            this.editDialog = true
        },
        // 下线
        outLine(row) {
            console.log(row,'outLine');
        },
        // 分页
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
        // 编辑弹窗
        // 确认更新
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('submit!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
    },
    
}
</script>

<style lang="scss" scoped>
.myDoc {
    width: 100%;
    padding: 20px;
    .title {
        border-radius: 8px;
        background: #79ac43;
        color: #fff;
        cursor: default;
    }
    .condition {
        display: flex;
        .input {
            width: 80%;
            height: 75px;
            p {
                margin: 0 0 8px 0;
                display: flex;
                .el-input {
                    width: 30%;
                    margin-right: 8px;
                }
            }
        }
        .option {
            flex: 1;
            p {
                display: flex;
                justify-content: center;
                align-items: center;
                i {
                    color: #79ac43;
                    font-size: 20px;
                }
                .el-button {
                    background: #79ac43;
                    color: #fff;
                    border-radius: 8px;
                }
            }
        }
    }
}
</style>

<style lang="scss">
.el-dialog {
    .el-button {
        width: 80px;
        height: 28px;
        background: #79ac43;
        color: #fff;
        border-radius: 8px;
        justify-content: center;
    }
    .apiName {
        display: flex;
        justify-content: space-between;
        margin-bottom: 24px;
        .el-input {
            width: 150px;
            margin: 0 8px;
        }
    }
    .params {
        p {
            display: flex;
            padding-left: 80px;
            margin: 0 0 8px 0;
            .el-input {
                width: 150px;
                margin: 0 24px 0 12px;
            }
        }
    }
    .btns {
        margin-top: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>

<style lang="scss">
.editDocDialog {
    .el-form {
        .el-form-item__label {
            border-radius: 8px;
            background: #79ac43;
            color: #fff;
            text-align: center;
            padding: 0;
            font-weight: 400;
        }
        .el-form-item__content {
            padding-left: 20px;
        }
    }
}
.el-table .cell {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>