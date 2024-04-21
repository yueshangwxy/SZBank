<template>
  <div class="dataImportPage">
    <div :class="currentStep === 1 ? 'finishCss' : 'processCss'">
      <el-steps :active="currentStep" space="200px" simple>
        <el-step
          title="第一步:建表或清理导入表数据"
          icon="el-icon-edit"
        ></el-step>
        <el-step title="第二步:数据导入" icon="el-icon-upload"></el-step>
      </el-steps>
      <div class="firstStep" style="padding: 28px" v-show="firstShow">
        <el-form
          ref="form"
          :model="firstForm"
          label-width="100px"
          class="demo-form-inline"
          label-position="left"
        >
          <el-form-item label="建表或数据删除脚本">
            <el-input
              type="textarea"
              v-model="firstForm.sqlText"
              placeholder="请输入SQL语句"
              rows="5"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="executeSQL"
              size="medium"
              style="margin-left: 200px; margin-right: 150px"
              >执行</el-button
            >
            <el-button
              type="primary"
              @click="jumpStep"
              size="medium"
              style="margin-right: 350px"
              >跳过</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <div class="secondStep" style="padding: 28px" v-show="secondShow">
        <el-form
          ref="form"
          :model="secondForm"
          label-width="100px"
          class="demo-form-inline"
          label-position="left"
        >
          <el-form-item label="上传文件" prop="file">
            <el-upload
              drag
              action=""
              :on-preview="previewFile"
              :before-upload="beforeUpload"
              :on-exceed="handleExceed"
              multiple
              name="file"
              :auto-upload="false"
              :on-change="handleImportFile"
              :http-request="uploadFile"
              :file-list="fileList"
              :on-success="handleSuccess"
              :on-remove="handleRemove"
              accept=".csv"
              :limit="1"
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text"><em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip" style="color: #ff0044">
                只允许上传1个csv文件，且大小不超过{{ this.fileSize }}kb
              </div>
            </el-upload>
          </el-form-item>
          <el-form-item label="导入表">
            {{ secondForm.projectName }}.<el-select
              v-model="secondForm.tableName"
              placeholder="请选择"
              filterable
            >
              <el-option
                v-for="(item, index) in secondForm.tableNames"
                :key="index"
                :value="item"
                >{{ item }}</el-option
              >
            </el-select>
            <el-button
              type="primary"
              @click="refreshData"
              style="margin-left: 10px"
              >刷新</el-button
            >
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="uploadFile"
              size="medium"
              style="margin-left: 200px; margin-right: 150px"
              >导入</el-button
            >
            <el-button
              type="primary"
              @click="lastStep"
              size="medium"
              style="margin-right: 200px"
              >返回上一步</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "dataImportPage",
  data() {
    return {
      currentStep: 0,
      firstForm: {},
      firstShow: true,
      secondForm: {},
      secondShow: false,
      file: undefined,
      fileList: [],
      fileType: ["csv"],
      fileSize: 1024,
    };
  },
  methods: {
    executeSQL() {
      if (this.firstForm.sqlText == null || this.firstForm.sqlText === "") {
        this.$message.error("请输入SQL语句");
        return;
      }
      request({
        url: "/datalab/dataImport/executeMgrSql",
        method: "post",
        data: {
          sqlText: this.firstForm.sqlText,
        },
      }).then((res) => {
        if (res.returnCode === "200") {
          this.$message({
            message: "执行成功",
            type: "success",
          });
          this.jumpStep();
        } else {
          this.$message({
            message: res.returnMsg,
            type: "error",
          });
        }
      });
    },
    jumpStep() {
      this.currentStep++;
      this.firstShow = false;
      this.secondShow = true;
    },
    lastStep() {
      this.currentStep--;
      this.firstShow = true;
      this.secondShow = false;
    },
    async queryTableNames() {
      let res = await request({
        url: "/datalab/dataImport/showAnableTables",
        method: "get",
        data: {},
      });
      if (res.returnCode === "200") {
        this.secondForm.projectName = res.data.projectName;
        this.secondForm.tableNames = res.data.tableNames;
      }
    },
    previewFile(file) {
      if (file.url) {
        window.location.href = file.url;
      }
    },
    beforeUpload(file) {
      if (file === null || file === undefined) {
        this.$message.error("请选择文件");
        return false;
      }
      const limitBody = this.fileUploadLimit(file, this.fileType);
      if (limitBody.limit) {
        //错误提示了，重置文件
        this.fileList = [];
        this.file = undefined;
        this.$message({
          message: limitBody.error,
          type: "error",
        });
      }
      return !limitBody.limit;
    },
    //文件上传限制
    fileUploadLimit(file, fileType) {
      const filePost = file.name.substring(file.name.lastIndexOf(".") + 1);
      const extension = fileType.findIndex(
        (item) => item.toLowerCase().indexOf(filePost.toLowerCase()) > -1
      );
      //文件大小限定50kb
      const isLimit = file.size / 1024 < this.fileSize;
      if (extension === -1) {
        const fileTypeStr = fileType.join(",");
        return {
          limit: true,
          error: "仅支持上传" + fileTypeStr + "格式文件",
        };
      }
      return {
        limit: !isLimit,
        error: "文件大小不能超过" + this.fileSize + "kb",
      };
    },
    handleExceed(files, fileList) {
      this.$message.error("仅可上传1个文件");
    },
    //上传文件
    handleImportFile(file) {
      this.file = file.raw;
      //this.$refs.uploadButton.submit()
    },
    uploadFile() {
      if (!this.beforeUpload(this.file)) return;
      if (
        this.secondForm.tableName == null ||
        this.secondForm.tableName === ""
      ) {
        this.$message.error("请选择导入表-表名");
        return;
      }
      const formData = new FormData();
      formData.append("file", this.file);
      formData.append("tableName", this.secondForm.tableName);
      formData.append("projectName", this.secondForm.projectName);
      request({
        url: "/datalab/dataImport/importCsvData",
        method: "post",
        headers: { "Content-Type": "multipart/form-data;charset=UTF-8" },
        data: formData,
      }).then((res) => {
        if (res.returnCode === "200") {
          this.$message({
            message: "导入成功",
            type: "success",
          });

          this.importDialogVisible = false;
          //this.queryPageList()
        } else {
          this.$message({
            message: res.returnMsg,
            type: "error",
          });
        }
      });
    },
    handleRemove() {
      this.fileList = [];
      this.file = undefined;
    },
    handleSuccess(res, file, fileList) {
      this.$emit("on-success", this.fileList);
    },
    refreshData() {
      this.queryTableNames();
    },
  },
  mounted() {
    this.queryTableNames();
  },
};
</script>

<style lang="scss" scoped>
.dataImportPage {
  height: calc(100vh - 135px);
  background: #fff;
  margin: 0 16px 16px 16px;
  padding: 16px;
  border-radius: 8px;
  overflow: hidden;

  ::v-deep .el-step__title.is-finish {
    //color: #C0C4CC;
    color: white;
  }
  ::v-deep .el-step__title.is-process {
    //color: #79AC43;
    color: white;
  }

  ::v-deep .el-step__title.is-wait {
    color: white;
  }

  ::v-deep .el-upload-list__item.is-ready {
    width: 400px;
  }
}

.processCss {
  ::v-deep .el-steps.el-steps--simple {
    background: linear-gradient(
      to right,
      #79ac43 0%,
      #79ac43 40%,
      #c0c4cc 44%,
      #c0c4cc 100%
    );
  }
}
.finishCss {
  ::v-deep .el-steps.el-steps--simple {
    background: linear-gradient(
      to right,
      #c0c4cc 0%,
      #c0c4cc 56%,
      #79ac43 60%,
      #79ac43 100%
    );
  }
}
</style>
