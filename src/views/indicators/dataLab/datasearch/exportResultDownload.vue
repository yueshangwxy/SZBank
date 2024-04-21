<template>
    <div class="exportResultDownload">
        <div class="condition">
          <el-form
          label-position="left"
          label-width="100px"
          :inline="true"
          >
              <el-form-item label="任务日期">
                <el-date-picker
                    v-model="dateValue"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :default-time="['00:00:00','23:59:59']"
                >
                </el-date-picker>
              </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="queryPageList">查询</el-button>
              <!--            <el-button type="primary">重置</el-button>-->
            </el-form-item>
          </el-form>
        </div>
        <!-- 表格 -->
        <el-table
            :loading="queryForm.loading"
            :data="tableData"
            height="75%">
            <el-table-column
                label="序号"
                type="index"
                header-align="center"
                align="center"
                width="180">
              <template scope="scope">
                <span>{{(queryForm.page - 1) * queryForm.size + scope.$index + 1}}</span>
              </template>
            </el-table-column>
            <el-table-column
                prop="taskName"
                label="任务"
                header-align="center"
                align="center"
                show-overflow-tooltip
                width="180">
            </el-table-column>
            <el-table-column
                prop="submitTime"
                :formatter="formatDate"
                header-align="center"
                align="center"
                label="任务提交日期">
            </el-table-column>
            <el-table-column
                prop="taskStageShow"
                header-align="center"
                align="center"
                label="任务阶段">
            </el-table-column>
            <el-table-column
                prop="taskStateShow"
                header-align="center"
                align="center"
                label="任务状态">
            </el-table-column>
          <el-table-column
              prop="updateTime"
              :formatter="formatDateLong"
              header-align="center"
              align="center"
              label="更新时间">
          </el-table-column>
            <el-table-column
                header-align="center"
                align="center"
                label="操作">
                <template slot-scope="scope">
                    <el-button type="text" v-if="scope.row.flag === 'ok'" @click="handleDownload(scope.$index,scope.row)">下载</el-button>
                    <el-button type="text" v-else disabled>-</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="pagination">
          <el-pagination @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="queryForm.page"
              :page-sizes="[10, 20, 30, 50]"
              :page-size="queryForm.size"
              layout="total, sizes, prev, pager, next, jumper"
              :total="queryForm.total"
              v-if="queryForm.total !==0">
          </el-pagination>
        </div>
    </div>
</template>
<script>
import request from "@/utils/request";

export default {
    name: 'ExportResultDownload',
    data() {
        return {
            dateValue: [],
            // 表格
            tableData: [],
          queryForm: {
            size: 10,
            page: 1,
            total: 0,
            loading: true
          },
          editForm: {}
        }
    },
    methods: {



      //格式化日期
      formatDate(row, column) {
        // 获取单元格数据
        let data = row[column.property]
        if(data == null) {
          return null
        }
        let dt = new Date(data)
        return dt.getFullYear() + '-' + ((dt.getMonth() + 1)<10?'0'+ (dt.getMonth() + 1): (dt.getMonth() + 1) )+ '-' + (dt.getDate() < 10 ?'0' + dt.getDate() : dt.getDate()) /*+ ' ' + dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds()*/
      },
      //格式化日期
      formatDateLong(row, column) {
        // 获取单元格数据
        let data = row[column.property]
        if(data == null) {
          return null
        }
        let dt = new Date(data)
        return dt.getFullYear() + '-' + ((dt.getMonth() + 1)<10?'0'+ (dt.getMonth() + 1): (dt.getMonth() + 1) )+ '-' + (dt.getDate() < 10 ?'0' + dt.getDate() : dt.getDate()) + ' ' + (dt.getHours()<10?'0'+dt.getHours():dt.getHours()) + ':' + (dt.getMinutes()<10?'0'+dt.getMinutes():dt.getMinutes()) + ':' + (dt.getSeconds()<10?'0'+dt.getSeconds():dt.getSeconds())
      },

      async queryPageList() {
        if(this.dateValue == null || this.dateValue.length == 0)
          this.dateValue = []
        this.queryForm.loading = true
        let res = await request({
          url: '/datalab/taskExport/list',
          method: 'post',
          data: {
            pageSize: this.queryForm.size,
            pageNum: this.queryForm.page,
            beginTime: this.dateValue[0],
            endTime: this.dateValue[1]
          }
        })
        if (res.data && res.data.records) {
          this.tableData = res.data.records
          this.queryForm.total = res.data.total
          this.queryForm.page = res.data.current

        }
        this.queryForm.loading = false
        console.log(res)
      },
      // 分页
      handleSizeChange(val) {
        this.queryForm.size = val;
        this.queryPageList();
      },
      handleCurrentChange(val) {
        this.queryForm.page = val;
        console.log("当前页：" + val)
        console.log("当前页page：" + this.queryForm.page)
        this.queryPageList();
      },

      // 下载
      handleDownload(index, row) {
        request({
          url: '/datalab/taskExport/download',
          method: 'post',
          data: {
            id: row.id,
          },
          responseType:'arraybuffer',

        }).then((res) => {
          console.log("download===",res);
          const content = res.data;
          const blob = new Blob([content]);

          const contentDisposition = res.headers['content-disposition'];
          const patt = new RegExp("fileName=([^;]+\\.[^\\.;]+);*");
          const result = patt.exec(contentDisposition);
          const fileName = decodeURI(result[1]);
          if ("download" in document.createElement("a")) {
            // 非IE下载
            const elink = document.createElement("a");
            elink.download = fileName;
            elink.style.display = "none";
            elink.href = window.URL.createObjectURL(blob);
            document.body.appendChild(elink);
            elink.click();
            window.URL.revokeObjectURL(elink.href); // 释放URL 对象
            document.body.removeChild(elink);
          } else {
            // IE10+下载
            navigator.msSaveBlob(blob, fileName);
          }

          this.queryPageList()
        }).catch(err => {
          console.log(err)
          this.$message.error('下载失败' + err)
        })
      },
    },
    mounted() {
      this.queryPageList()
    }
}
</script>

<style lang="scss" scoped>
.exportResultDownload {
    height: calc(100vh - 135px);
    background: #fff;
    margin: 0 16px 16px 16px;
    padding: 16px;
    border-radius: 8px;
    overflow: hidden;
    position: relative;
    .condition {
        ::v-deep .el-form {
          .el-form-item__label {
            font-weight: 400;
            color: #202224;
          }
          .el-select {
              width: 120px;
          }
        } 
    }
    // 表格
    .table {
        flex: 1;
        overflow: auto;
    }
    .el-table::before {
        background-color: #fff;
        height: 0;
    }
    ::v-deep .el-table {
        padding-left: 4px;
        // header
        .el-table__header-wrapper {
            .el-table__header {
                tr {
                    th {
                        color: rgba(32, 34, 36, 1);
                        font-size: 14px;
                        font-weight: 400;
                        border: none;
                    }
                }
            }
        }
        // body
        .el-table__body-wrapper {
            .el-table__body {
                border-spacing: 0 8px;
                tr {
                    td:first-child {
                        border-left: 1px solid rgba(232, 232, 232, 1);
                    }
                    td:last-child {
                        position: relative;
                        right: 4px;
                        border-right: 1px solid rgba(232, 232, 232, 1);
                    }
                    td {
                        color: rgba(77, 78, 80, 1);
                        border-top: 1px solid rgba(232, 232, 232, 1);
                        border-bottom: 1px solid rgba(232, 232, 232, 1);
                    }
                }
            }
        }
        // 复选框
        .cell {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            .el-checkbox {
                width: 16px;
                height: 16px;
                .el-checkbox__input {
                    .el-checkbox__inner {
                        width: 16px;
                        height: 16px;
                    }
                }
                .el-checkbox__input.is-checked,
                .el-checkbox__input.is-indeterminate {
                    width: 16px;
                    height: 16px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background: #fff;
                    border: 1px solid #79ac43;
                    border-radius: 2px;
                }
                .el-checkbox__input.is-indeterminate {
                    .el-checkbox__inner {
                        width: 8px;
                        height: 4px;
                        background: #79ac43;
                    }
                    .el-checkbox__inner::before {
                        display: none;
                    }
                }
                .el-checkbox__input.is-checked {
                    .el-checkbox__inner {
                        width: 8px;
                        height: 8px;
                        background: #79ac43;
                    }
                    .el-checkbox__inner::after {
                        display: none;
                    }
                }
            }
        }
    }
    // 分页
    .pagination {
        position: absolute;
        bottom: 10px;
        right: 20px;
        // height: 64px;
        display: flex;
        align-items: center;
        flex-direction: row-reverse;
        .el-pagination {
            margin: 0;
        }
    }

}
</style>
