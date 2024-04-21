<template>
  <div class="masterInfo">
    <el-upload
      ref="upload"
      :auto-upload="false"
      multiple
      class="upload-demo"
      action="#"
      :on-change="uploadChange"
      :before-remove="beforeRemove"
      :on-remove="upLoadRemove"
      accept=".xls,.xlsx"
      :file-list="fileList"
    >
      <el-button size="small" icon="el-icon-upload" slot="trigger"
        >上传附件</el-button
      >
      <!-- <el-button style="margin-left: 10px" size="small" icon="el-icon-upload" type="success" @click="submitUpload" :disabled="fileList.length <= 0">上传到服务器</el-button> -->
    </el-upload>
    <!-- 失败提示 -->
    <el-dialog
      class="tipDialog"
      :visible.sync="tipDialog"
      width="400px"
      top="38vh"
    >
      <span class="title">{{ title }}</span>
      <el-table :data="dataList" height="320px" ref="dataTable">
        <el-table-column
          v-for="(item, index) in propList"
          :prop="item.prop"
          :label="item.label"
          align="center"
          :key="index"
          show-overflow-tooltip
          :render-header="linefeed"
        >
          <template scope="scope">
            <span>{{ scope.row[item.prop] }}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "MasterInfo",
  data() {
    return {
      fileList: [],
      tipDialog: false,
      dataList: [],
      propList: [
        {
          prop: "field",
          label: "field",
          align: "center",
        },
        {
          prop: "row",
          label: "row",
          align: "center",
        },
      ],
      title: "",
    };
  },
  methods: {
    // 移出前
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    // 移除附件
    upLoadRemove(file, fileList) {
      let tempFileList = [];
      for (var index = 0; index < this.fileList.length; index++) {
        if (this.fileList[index].name !== file.name) {
          tempFileList.push(this.fileList[index]);
        }
      }
      this.fileList = tempFileList;
    },
    // 监控上传文件列表
    uploadChange(file, fileList) {
      let testmsg = file.name.substring(file.name.lastIndexOf(".") + 1);
      if (testmsg !== "xls" && testmsg !== "xlsx") {
        this.$refs.upload.clearFiles();
        this.$message({
          message: "上传文件只能是 .xls、.xlsx格式!",
          type: "warning",
        });
        return false;
      } else {
        this.fileList = fileList;

        let formData = new FormData();
        this.fileList.forEach((item) => {
          formData.append("file", item.raw);
        });
        this.$api.importMessage(formData).then((res) => {
          if (res.success === "true") {
            this.$message.success(res.message);
            this.fileList = [];
          } else {
            this.tipDialog = true;
            this.dataList = res.result;
            this.title = res.message;
            this.fileList = [];
          }
        }).catch(err=> {
          this.fileList = [];
        });
      }
    },
    linefeed(h, { column, $index }) {
      let realWidth = 0;
      let span = document.createElement("span");
      span.innerText = column.label;
      if(!column.label) {
        document.body.appendChild(span);
        realWidth = 100;
        column.minWidth = realWidth; // 可能还有边距/边框等值，需要根据实际情况加上
        document.body.removeChild(span);
        return h("span", column.label);
      }else {
        document.body.appendChild(span);
        realWidth = span.getBoundingClientRect().width + 30;
        column.minWidth = realWidth; // 可能还有边距/边框等值，需要根据实际情况加上
        document.body.removeChild(span);
        return h("span", column.label);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.masterInfo {
  margin: 0 16px 16px 16px;
  height: calc(100vh - 135px);
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  border-radius: 16px;
  .upload-demo {
    width: 300px;
    display: flex;
    justify-content: center;
    ::v-deep .el-upload-list {
      display: none;
    }
    .el-button {
      background: #79ac43;
      color: #fff;
    }
    .el-button:hover {
      opacity: 0.8;
    }
  }
  ::v-deep .el-dialog__wrapper.tipDialog {
    .el-dialog {
      border-radius: 8px;
      padding: 16px;
      box-sizing: border-box;

      .el-dialog__header {
        padding: 0;
        // display: none;
      }

      .el-dialog__body {
        padding: 0;
        font-size: 14px;

        i {
          color: #79ac43;
          font-size: 16px;
          margin-right: 8px;
        }

        .title {
          color: rgba(0, 0, 0, 0.9);
          line-height: 20px;
        }
        .el-table {
          margin-top: 12px;
        }
      }
    }
  }
}

/deep/.el-table__body-wrapper::-webkit-scrollbar {
  height: 10px !important;
}
</style>