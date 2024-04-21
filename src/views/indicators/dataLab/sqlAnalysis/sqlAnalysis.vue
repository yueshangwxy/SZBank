<template>
  <div class="sqlAnalysis">
    <div class="left">
      <div class="tree">
        <el-input placeholder="输入关键字进行过滤"
                  v-model="filterText"
                  clearable="">
        </el-input>
        <el-tree class="filter-tree"
                node-key="id"
                :data="treeData"
                :props="defaultProps"
                accordion
                @node-click="handleNodeClick"
                :filter-node-method="filterNode" ref="tree">
        </el-tree>
      </div>
    </div>
    <div class="right">
      <div class="textarea">
        <div class="btns">
          <h3>输入SQL</h3>
          <el-button type="success" @click="executeSql()">执行</el-button>
          <el-button type="primary" @click="dataDownLoad()">数据导出</el-button>
        </div>
        <el-input
                type="textarea"
                :rows="8"
                resize="none"
                placeholder="请输入内容"
                v-model="textarea">
        </el-input>
      </div>

      <el-dialog
              title="导出确认"
              :visible.sync="downLoadDialog"
              width="30%"
              center>
        <el-dialog title="原因"
                  :visible.sync="descriptionDialog"
                  width="30%"
                  @close="closeDescriptionDialog"
                  append-to-body>
          <el-input
                  type="textarea"
                  :rows="8"
                  resize="none"
                  placeholder="请输入内容"
                  v-model="description">
          </el-input>
          <el-button type="primary" @click="downLoadSourceData('1')">确认</el-button>
        </el-dialog>
        <span slot="footer" class="dialog-footer">
        <el-button @click="downLoad('0')">脱敏数据导出</el-button>
        <el-button type="primary" @click="downLoad('1')">原始数据导出</el-button>
        </span>
      </el-dialog>

      <!-- 表格 -->
      <el-table :data="tableList.slice((currentPage-1)*pageSize,currentPage*pageSize)" stripe height="400px">
        <el-table-column
                type="index"
                width="50"
                label="序号"
                align="center">
        </el-table-column>
        <el-table-column
                v-for="(item, index) in propList"
                :prop="item.prop"
                :label="item.label"
                :key="index"
                :min-width="100"
                :align="item.align">
          <template scope="scope">
            <span>{{scope.row[item.prop]}}</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[5,10, 20, 30, 50]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
  import {getTablesWithPermissions,getListBySQL,downLoad} from "@/api/dataLab/sqlAnalysis";
  export default {
    name: 'SqlAnalysis',
    data() {
      return {
        // 树形控件
        filterText: '',
        defaultProps: {
          id:'id',
          children: 'children',
          label: 'tableName'
        },
        treeData: [],
        // 文本域
        textarea: '',
        description: '',
        // 表格
        tableList: [],
        propList: [],
        // 分页
        pageSize: 10,
        currentPage: 1,
        total: 0,
        downLoadDialog:false,
        descriptionDialog:false
      }
    },
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      },
    },
    created() {
      getTablesWithPermissions().then(data =>{
        this.treeData = data
      })

      this.propList = [
        {
          prop: 'column1',
          label: 'column1',
          align: 'center'  // 当前列对齐方式  居中  默认为居左
        },
        {
          prop: 'column2',
          label: 'column2',
        },
        {
          prop: 'column3',
          label: 'column3',
        },
        {
          prop: 'column4',
          label: 'column4',
        },
        {
          prop: 'column5',
          label: 'column5',
        },
        {
          prop: 'column6',
          label: 'column6',
        }]
      this.tableList = []

    },
    mounted() {},
    methods: {
      // 节点过滤
      filterNode(value, data) {
        if (!value) return true;
        return data.name.indexOf(value.toString()) !== -1;
      },
      // 节点点击
      handleNodeClick(data) {
        console.log(data);
      },
      executeSql(){
        if(this.textarea == null || this.textarea ==""){
          this.$message({
            type: 'warning',
            message: '请填写SQL!',
          })
        }else {
          const param = {
            "sql": this.textarea
          }
          this.getListBySQL(param);
        }
      },
      dataDownLoad(){
          this.downLoadDialog = true;
      },
      downLoad(flag) {
        if (this.textarea == null || this.textarea == "") {
          this.$message({
            type: 'warning',
            message: '请填写SQL!',
          })
        } else {
          const param = {
            "flag": flag,
            "sql": this.textarea
          }
          if (flag == "1") {
            this.descriptionDialog = true
          } else {
            downLoad(param).then(data => {
              if (data.code == '200') {
                this.$message({
                  type: 'success',
                  message: data.msg,
                })
                this.downLoadDialog = false;
              } else {
                this.$message({
                  type: 'error',
                  message: data.msg,
                })
              }
            })
          }
        }
      },
      downLoadSourceData(){
        const param = {
          "flag":"1",
          "sql":this.textarea,
          "description":this.description
        }
        downLoad(param).then(data => {
          console.log(JSON.stringify(data))
          if(data.code =='200') {
            this.$message({
              type: 'success',
              message: data.msg,
            })
            this.downLoadDialog = false
            this.descriptionDialog = false
          }else {
            this.$message({
              type: 'error',
              message: data.msg,
            })
          }
        })
      },
      closeDescriptionDialog(){
        this.descriptionDialog = false
        this.description =""
      },
      getListBySQL(param){
        getListBySQL(param).then(data =>{
          if(data.code == "200"){
            this.propList = data.head
            this.tableList = data.data
            this.total = this.tableList.length

          }else {
            this.$message({
              type: 'error',
              message: data.msg,
            })
          }
        })
      },

      // 分页
      handleSizeChange(val) {
        this.pageSize = val;
        this.currentPage = 1;
      },
      handleCurrentChange(val) {
        this.currentPage = val;
      }
    },
  }
</script>
<style lang="scss" scoped>
  .sqlAnalysis {
    display: flex;
    height: calc(100vh - 135px);
    background: #fff;
    margin: 0 16px 16px 16px;
    padding: 16px;
    border-radius: 8px;
    overflow: hidden;
    position: relative;
    .left {
      .tree {
        width: 300px;
        height: 100%;
        max-height: 620px;
        overflow: auto;
        .el-tree {
          margin-top: 8px;
          padding-top: 8px;
          height: calc(100% - 38px);
        }
      }
    }
    .right {
      flex: 1;
      margin-left: 20px;
      .textarea {
        display: flex;
        height: 150px;
        width: 100%;
        .btns {
          width: 100px;
          margin-right: 8px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .el-button {
            margin: 0;
          }
          .el-button--primary {
            background-color: #409EFF;
          }
        }
      }
      .el-table {
        width: 100%;
        margin-top: 24px;
        overflow-x: scroll;
        .cell {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      // 分页
      .pagination {
          position: absolute;
          bottom: 5px;
          right: 20px;
          height: 64px;
          display: flex;
          align-items: center;
          flex-direction: row-reverse;
          .el-pagination {
              margin: 0;
          }
      }
    }
  }
</style>