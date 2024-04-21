<template>
    <div class="myApplication">
        <div class="condition">
            <span class="desc">筛选条件:</span>
            <!-- <span>申请部门:</span> -->
            <el-cascader
                    v-model="dept"
                    :options="deptTreeList"
                    :show-all-levels="false"
                    :props="{value: 'id',label: 'name',children: 'children',emitPath:false,checkStrictly: true}"
                    placeholder="请选择申请部门"
                    clearable></el-cascader>
            <!-- <span>申请状态:</span> -->
            <el-select v-model="status" placeholder="请选择申请状态" clearable>
                <el-option label="待审批" value="0"></el-option>
                <el-option label="已通过" value="1"></el-option>
                <el-option label="已拒绝" value="2"></el-option>
                <el-option label="草稿" value="3"></el-option>
            </el-select>
            <!-- <span>申请时间:</span> -->
            <el-date-picker
                v-model="dateValue"
                type="daterange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                clearable>
            </el-date-picker>
            <!-- <span>申请名称:</span> -->
            <el-input v-model="searchInput" placeholder="请输入申请名称" clearable></el-input>
            <el-button @click="queryList()">搜索</el-button>
        </div>
        <!-- 表格 -->
        <div class="table">
            <el-table
                :data="tableData"
                height="543px">
                <el-table-column
                    v-for="(item,index) in propList"
                    :key="index"
                    :prop="item.prop"
                    :label="item.label"
                    :width="item.width"
                    :align="item.align">
                    <template slot-scope="scope">
                        <span v-if="item.type==='tag'">
                            <!-- 待审批 warning 已拒绝 danger 已通过 info -->
                            <el-tag :type="item.tagType(scope.row)"
                                size="mini">
                                {{scope.row[item.prop]}}
                            </el-tag>
                        </span>
                        <span v-else>{{scope.row[item.prop]}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" @click="viewDetails(scope.row)">详情查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 分页 -->
        <div class="pagination">
            <el-pagination 
                @current-change="handleCurrentChange"
                :current-page="currentPage" 
                :page-size="pageSize"
                layout="total, prev, pager, next, jumper" 
                :total="total"
                v-if="total !==0">
            </el-pagination>

        </div>
    </div>
</template>
<script>
export default {
    name: 'MyApplycation',
    data() {
        return {
            searchInput: '',
            dept: '',
            status: '',
            dateValue: '',
            startTime: '',
            endTime: '',
            // 表格
            tableData: [],
            propList: [],
            // 分页
            pageSize: 9,
            currentPage: 1,
            total: 150,
            // 部门树
            deptTreeList: [],
        }
    },
    watch: {
        dateValue(val) {
            if(val) {
                this.startTime = this.$formatDate(val[0])
                this.endTime = this.$formatDate(val[1]) 
            } else {
                this.startTime = ''
                this.endTime = ''
            }
        }
    },
    created() {
        this.propList = [
            {
                prop: 'PROC_INST_ID',
                label: '申请编号',
                align: 'left'
            },
            {
                prop: 'NAME',
                label: '申请名称',
            },
            {
                prop: 'dept_Name',
                label: '申请部门',
            },
            {
                prop: 'CRT_USER',
                label: '申请人',
            },
            {
                prop: 'CRT_DATE',
                label: '申请时间',
            },
            {
                prop: 'STATUS_DESC',
                label: '申请状态',
                type: 'tag',
                tagType: (row)=> {
                    return row.STATUS_DESC === '已通过' ? 'info' : (row.STATUS_DESC === '草稿' ? '' : (row.STATUS_DESC ==='待审批' ? 'warning': 'danger'))
                }
            },
        ]
        // 部门树
        this.$api.getDeptTree({}).then(res => {
            this.deptTreeList = res.data
        })
        this.queryList()
    },
    methods: {
        // 分页
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.currentPage = val
            this.queryList()
        },
        // 列表查询
        queryList() {
            let request = {
                page: String(this.currentPage),
                size: String(this.pageSize),
                deptCode: this.dept,
                name: this.searchInput,
                state: this.status,
                crtDateBeg: this.startTime,
                crtDateEnd: this.endTime,
            }
            console.log(request);
            this.$api.appliedProcess(request).then(res => {
                console.log(res);
                let data = res.data
                this.tableData = data.records
                this.total = data.total
            })
        },
        // 详情查看
        viewDetails(row) {
            console.log('详情查看',row.tableId);
            this.$router.push({
                path: '/detailsView/table',
                query: {
                    id: row.tableId
                }
            })
        },
    },

}
</script>

<style lang="scss" scoped>
.myApplication {
    width: calc(100% - 32px);
    height: calc(100vh - 135px);
    margin: 0 16px 16px 16px;
    padding: 12px;
    box-sizing: border-box;
    background: #fff;
    display: flex;
    flex-direction: column;
    @import './style.scss';
}
</style>