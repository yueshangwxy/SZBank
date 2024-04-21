<template>
    <div class="applyForDoc">
        <div class="contain">
            <div class="info">
                <div class="title">
                    <i></i>
                    <span>{{title}}</span>
                </div>
                <div class="content">
                    <!-- 文件名称 -->
                    <div class="item">
                        <span>文件名称</span>
                        <el-input v-model="ruleForm.name" placeholder="请输入名称" disabled></el-input>
                    </div>
                    <!-- 描述 -->
                    <div class="item">
                        <span>描述</span>
                        <el-input type="textarea" rows="4" resize="none" v-model="ruleForm.description" placeholder="请输入描述" disabled></el-input>
                    </div>
                    <!-- 目标地址 -->
                    <div class="item">
                        <span>目标地址</span>
                        <el-input v-model="ruleForm.destinationAddress" placeholder="请输入目标地址" disabled></el-input>
                    </div>
                    <div class="itemSpecial">
                        <p>
                            <span>文件最晚生成时间</span>
                            <el-time-picker
                                v-model="ruleForm.latestGenerationTime"
                                format="HH:mm:ss"   
                                value-format="HH:mm:ss"
                                :picker-options="{
                                    selectableRange: '00:00:00 - 23:59:59'
                                }"
                                placeholder="请选择时间"
                                disabled>
                            </el-time-picker>
                        </p>
                        <p>
                            <span>分隔符</span>
                            <el-input v-model="ruleForm.separator" placeholder="请输入分隔符" disabled></el-input>
                        </p>
                        <p>
                            <span>格式</span>
                            <el-select v-model="ruleForm.fileFormat" placeholder="请选择格式" disabled> 
                                <el-option label="txt" value="txt"></el-option>
                                <el-option label="csv" value="csv"></el-option>
                                <el-option label="excel" value="excel"></el-option>
                                <el-option label="dat" value="dat"></el-option>
                            </el-select>
                        </p>
                    </div>
                    <!-- 编辑页展示 -->
                    <div class="itemSpecial">
                        <p>
                            <span>所属部门</span>
                            <el-cascader
                                v-model="ruleForm.dept"
                                :options="deptTree"
                                :show-all-levels="false"
                                :props="{value: 'id',label: 'name',children: 'sysDeptList',emitPath:false}"
                                placeholder="请选择所属部门"
                                clearable
                                disabled></el-cascader>
                        </p>
                        <p>
                            <span>对接人</span>
                            <el-input v-model="ruleForm.dockName" placeholder="请输入对接人" disabled></el-input>
                        </p>
                        <p>
                            <span>接口状态</span>
                            <el-select v-model="ruleForm.status" placeholder="请选择接口状态" disabled>
                                <el-option label="已下线" value="0"></el-option>
                                <el-option label="草稿" value="1"></el-option>
                                <el-option label="需求已提交" value="2"></el-option>
                                <el-option label="需求已通过" value="3"></el-option>
                                <el-option label="需求已驳回" value="4"></el-option>
                                <el-option label="开发中" value="5"></el-option>
                                <el-option label="测试中" value="6"></el-option>
                                <el-option label="已完成待上线" value="7"></el-option>
                                <el-option label="已上线" value="8"></el-option>
                            </el-select>
                        </p>
                    </div>
                    <!-- 字段清单 -->
                    <div class="item">
                        <span>字段清单</span>
                        <el-input type="textarea" rows="4" resize="none" v-model="ruleForm.fieldList" placeholder="请输入字段清单" disabled></el-input>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            title: '文件详情',
            editPage: true,
            id: '',
            ruleForm: {
                name: '',
                description: '',
                overtime: '',
                currentLimit: '',
                type: '',
                destinationAddress: '',
                latestGenerationTime: '',
                separator: '',
                fileFormat: '',
                serviceType: '2',
                status: '',
                dept: '',            
                belongUser: '',            
                dockName: '',
                fieldList: '',            
                belongApplication: '',            
                belongApplicationName: '',            
                sitPath: '',            
                prePath: '',            
                serviceParamList: [
                    {
                        name: '',
                        type: '',
                        parameterType: '', // 1入参 2出参
                        description: '',
                        defaultValue: '',
                        isPass: '',
                    }
                ],  
                applicationInfoList: [],          
            },
            // 部门树
            deptTree: [],
        }
    },
    mounted() {
        this.initData();
    },
    // beforeRouteLeave(to, from, next) {
    //     if (to.name === "myService") {
    //         this.$store.commit("SET_KEEPALIVE", true);
    //     } else {
    //         this.$store.commit("SET_KEEPALIVE", false);
    //     }
    //     next();
    // },
    // watch: {
    //     $route(e) {
    //         if (e.name === "docDetail") {
    //             this.initData();
    //         }
    //     }
    // },
    methods: {
        initData() {
            this.$api.findDeptTree({}).then(res => {
                console.log(res);
                this.deptTree = res.data
            })
            this.id = this.$route.query.id ? this.$route.query.id : ''
            this.$api.viewServiceDetail({
                id: this.id
            }).then(res => {
                console.log(res);
                this.ruleForm = res.data
            })
        },
    }
}
</script>

<style lang="scss" scoped>
.applyForDoc {
    height: calc(100vh - 145px);
    padding: 16px;
    margin: 16px;
    background: #fff;
    border-radius: 8px;
    .contain {
    height: 100%;
    overflow: auto;
    .title {
        font-size: 16px;
        color:#79ac43;
        line-height: 22px;
        display: flex;
        align-items: center;
        i {
            width: 12px;
            height: 12px;
            border-radius: 2px;
            background: #79ac43;
            margin-right: 8px;
        }
    }
    // 基本信息
    .info {
        .content {
            margin-top: 8px;
            padding: 16px;
            background: #fafafa;
            font-size: 14px;
            color: #202224;
            .item {
                display: flex;
                flex-direction: column;
                margin-bottom: 16px;
                span {
                    line-height: 20px;
                    margin-bottom: 8px;
                }
                .reqParams {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 8px;
                    .params {
                        width: 100%;
                        margin-right: 1%;
                    }
                    .el-button {
                        width: 20px;
                        height: 20px;
                        border-radius: 4px;
                        padding: 4px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        margin-right: 1%;
                    }
                }
                .addParams {
                    width: 100%;
                    height: 30px;
                    border: 1px dashed #ccc;
                    margin-top: 8px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;
                    span {
                        margin: 0 0 0 8px;
                    }
                }
            }
            .itemSpecial {
                display: flex;
                justify-content: space-between;
                p {
                    width: 30%;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    .el-date-editor {
                        width: 100%;
                    }
                    span {
                        line-height: 20px;
                        margin-bottom: 8px;
                    }
                }
            }
        }
    }
    ::v-deep .el-input.is-disabled {
        background: #fff;
        border: none;
        .el-input__inner {
            background: #fff;
            border: none;
        }
    }
    ::v-deep .el-textarea.is-disabled {
        background: #fff;
        border: none;
        .el-textarea__inner {
            background: #fff;
            border: none;
        }
    }
}
    
}
</style>