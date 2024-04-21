<template>
  <div class="sqlAnalysis">
    <el-col class="left" :span="leftWidth">
      <div class="tree">
        <el-input
          placeholder="输入关键字进行过滤"
          v-model="filterText"
          clearable=""
        >
        </el-input>
        <el-tree
          class="filter-tree"
          node-key="id"
          :data="treeData"
          :props="defaultProps"
          :allow-drop="treeAllowDrop"
          accordion
          draggable
          @node-drag-start="handleDragStart"
          @node-click="handleNodeClick"
          :filter-node-method="filterNode"
          ref="tree"
        >
            <span class="span-ellipsis" slot-scope="{ node, data }">
                <span :title="node.label">{{ node.label }}</span>
            </span>
        </el-tree>
      </div>
    </el-col>
    <el-col :span="right">
      <div class="right">
        <el-tabs
          v-model="activeName"
          @tab-click="handleClick"
          :before-leave="changeTab"
        >
          <el-tab-pane label="便捷查询" name="second"></el-tab-pane>
          <el-tab-pane label="SQL查询" name="first"></el-tab-pane>

        </el-tabs>
        <div
          class="textarea"
          @drop="drop($event, 'item')"
          @dragover="allowDrop($event)"
        >
          <!--<div class="btns">
          <h3 >输入SQL</h3>
          <el-button type="success" @click="executeSql()">执行</el-button>
          <el-button type="primary" @click="dataDownLoad()">数据导出</el-button>
        </div>-->
          <el-input
            type="textarea"
            :rows="7"
            :disabled="inputDisabled"
            resize="none"
            :placeholder="tips"
            v-model="textarea"
          >
          </el-input>
        </div>
        <div class="button" align="right" style="flex-wrap: wrap">
          <el-button
            align="right"
            style=""
            :type="buttonType"
            @click="executeSql()"
            >{{ buttonText }}</el-button
          >
          <el-button
            style="background-color: #409eff"
            type="primary"
            @click="dataDownLoad()"
            >数据导出</el-button
          >
          <el-button style="" type="primary" @click="textClear()"
            >清除</el-button
          >
        </div>
        <el-dialog
          title="导出确认"
          :visible.sync="downLoadDialog"
          width="30%"
          center
        >
          <el-dialog
            title="原因"
            :visible.sync="descriptionDialog"
            width="30%"
            @close="closeDescriptionDialog"
            append-to-body
          >
            <el-input
              type="textarea"
              :rows="4"
              resize="none"
              maxlength="100"
              show-word-limit
              placeholder="请输入内容"
              v-model="description"
            >
            </el-input>
            <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="downLoadSourceData('1')" style="margin-left: 80%"
              >确认</el-button
            >
            </span>
          </el-dialog>
          <span slot="footer" class="dialog-footer">
            <el-button @click="downLoad('0')">脱敏数据导出</el-button>
            <el-button type="primary" @click="downLoad('1')"
              >原始数据导出</el-button
            >
          </span>
        </el-dialog>

        <el-tabs
          v-model="editableTabs"
          type="card"
          @tab-click="ClickEditableTabs"
          @tab-remove="removeTab"
        >
          <el-tab-pane
            v-for="(item) in tabs"
            :key="item.name"
            :label="item.title"
            :closable="item.closeable"
            :name="item.name"
          >
          </el-tab-pane>
        </el-tabs>
        <div class="tableList" v-if="editableTabs != 'log'">
          <!-- 表格 -->
          <el-table
            :data="
              tableList.slice(
                (currentPage - 1) * pageSize,
                currentPage * pageSize
              )
            "
            v-loading="loading"
            stripe
            height="100%"
          >
            <el-table-column
              type="index"
              min-width="50"
              label="序号"
              align="left"
              v-if="propList.length>0"
            >
            </el-table-column>
            <el-table-column
              v-for="(item, index) in propList"
              :prop="item.prop"
              :label="item.label"
              :key="index"
              :align="item.align"
              show-overflow-tooltip
              :render-header="linefeed"
            >
              <template scope="scope">
                <span>{{ scope.row[item.prop] }}</span>
              </template>
            </el-table-column>
          </el-table>
          <div class="pagination">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[5, 10, 20, 30, 50]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
            >
            </el-pagination>
          </div>
        </div>
        <div class="log" v-if="editableTabs == 'log'">
          <div class="textarea">
            <el-input
              type="textarea"
              :rows="15"
              :disabled="true"
              resize="none"
              placeholder=""
              v-model="log"
            >
            </el-input>
          </div>
        </div>
      </div>
    </el-col>
    <el-col :span="connection">
      <div class="connection">
        <div
          class="queryCriteria"
          v-for="(item, index) in ruleList"
          :key="index"
        >
          <el-select
            v-model="item.where1"
            @change="selectTable(index, item.where1, 'from')"
            filterable
            ><el-option
              v-for="item in tableAndNickname"
              :key="item"
              :label="item"
              :value="item" /></el-select
          ><el-select
            v-model="item.where2"
            @change="connChange(index)"
            filterable
          >
            <el-option
              v-for="item in columnList[index]['from']"
              :key="item"
              :label="item"
              :value="item" /></el-select
          ><span class="eq">=</span
          ><el-select
            v-model="item.where3"
            @change="selectTable(index, item.where3, 'to')"
            filterable
            ><el-option
              v-for="item in tableAndNickname"
              :key="item"
              :label="item"
              :value="item" /></el-select
          ><el-select
            v-model="item.where4"
            @change="connChange(index)"
            filterable
            ><el-option
              v-for="item in columnList[index]['to']"
              :key="item"
              :label="item"
              :value="item"
          /></el-select>
          <i
            class="el-icon-remove-outline"
            @click="deleteRow(index)"
            :disabled="index == 0"
          ></i>
        </div>
        <el-col align="middle">
          <p
            align="middle"
            style="
              width: 80%;
              justify-content: center;
              border: 1px dashed #4d4e50;
              cursor: pointer;
            "
            @click="addRow"
          >
            <i class="el-icon-plus"></i>添加条件
          </p>
        </el-col>
        <div
          class="tableColumn"
          v-for="(value, key,index) in tableColumnList"
          :key="key"
        >
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>t{{index+1}}: {{ key }} {{getComment(key)}}</span>
              <el-button
                style="float: right; padding: 3px 0"
                type="text"
                @click="deleteTable(key)"
                >删除</el-button
              >
            </div>
            <div v-for="(item, index) in value" :key="index" class="text">
              <el-checkbox
                v-if="true"
                :value="selectionList"
                :label="key + '.' + item"
                @change="ids(key + '.' + item)"
                >{{ "" }}</el-checkbox
              >
              {{ item }}
            </div>
          </el-card>
        </div>
      </div>
    </el-col>
  </div>
</template>
<script>
import {
  getTablesWithPermissions,
  getListBySQL,
  downLoad,
  getTableColumn,
  getSession,
  stop,
  downLoadSourceData
} from "@/api/dataLab/sqlAnalysis";
import draggable from "vuedraggable";
import {getCurrentRole} from "../../../../utils/auth";
export default {
  inject: ["reload"],
  name: "SqlAnalysis",
  data() {
    return {
      timer: null,
      buttonType: "success",
      buttonText: "执行",
      loading: false,
      // 树形控件
      filterText: "",
      tableName: "",
      defaultProps: {
        id: "id",
        children: "tables",
        label: "projectName",
      },
      treeData: [],
      // 文本域
      textarea: "",
      textarea1: "",
      textarea2: "",
      tips: "请拖动表到此区域",
      description: "",
      // 表格
      tableList: [],
      propList: [],
      // 分页
      pageSize: 10,
      currentPage: 1,
      total: 0,
      downLoadDialog: false,
      descriptionDialog: false,

      //flag为true的时候可以拖动，false的时候还在查找上一张表的字段信息
      flag: true,
      //拖到右侧的表
      nameList: [],
      tableAndNickname: [], //表和他的别名
      //放到右侧的节点
      nodeList: {},
      //表字段信息
      tableColumnList: [],
      //表注释
      tableComment: [],
      //被选择字段
      selectionList: [],
      selection2sql: [],
      //删除表时，同时删除该表选择的字段
      newSelectionList: [],
      newSelection2sql: [],
      //ruleList
      ruleList: [
        {
          where1: "",
          where2: "",
          where3: "",
          where4: "",
        },
      ],
      columnList: [],
      connList: [], //拼接好的关联条件

      //标签页相关
      activeName: "second",
      connectionShow: true,
      inputDisabled: true,
      dragFlag: false,
      right: 10,
      connection: 9,
      type: "1",
      //日志和记录的标签页相关
      editableTabs: "log",
      tabs: [
        {
          title: "日志",
          name: "log",
          closeable: false,
          propList: [],
          tableList: [],
        },
        {
          title: "当前结果",
          name: "latest",
          closeable: false,
          propList: [],
          tableList: [],
        },
      ],
      log: "",
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
    activeName(val) {
      if (val == "second") {
        this.dragFlag = true;
        this.inputDisabled = true;
        this.right = 10;
        this.connection = 9;
        this.type = "1";
        this.tips = "请拖动表到此区域"
      } else {
        this.dragFlag = false;
        this.inputDisabled = false;
        this.right = 19;
        this.connection = 0;
        this.type = "0";
        this.tips = "请输入内容"
      }
    },
  },
  created() {
    getTablesWithPermissions().then((data) => {
      this.treeData = data;
      console.log(this.treeData);
    });

    this.propList = [
    ];
    (this.tableList = []),
      (this.tableColumnList = {
        /*        "test1": [
          "column1",
          "column2",
          "column3",
          "column4",
          "column5",
          "column6",
          "column7",
          "column8"
        ],
        "test2":[
          "column1",
          "column2"
        ]*/
      });
    this.columnList = [
      {
        from: [],
        to: [],
      },
    ];
    console.log(
      "this.tableColumnList=" + Object.keys(this.tableColumnList).length
    );
  },
  mounted() {},
  destroyed() {
    this.stopSetInterval();
  },
  computed: {
    leftWidth() {
      return 24 - this.right - this.connection;
    },
  },
  methods: {
    getSession() {
      getSession().then((data) => {
        if (data.code == "200") {
          this.buttonType = "danger";
          this.buttonText = "中止";
        }
      });
    },
    stop() {
      stop().then((data) => {
        if (data.code == "200") {
          this.buttonType = "success";
          this.buttonText = "执行";
          this.$message({
            type: "success",
            message: data.msg,
          });
        } else {
          this.buttonType = "success";
          this.buttonText = "执行";
          this.$message({
            type: "error",
            message: data.msg,
          });
        }
      });
      this.stopSetInterval();
    },
    // 节点过滤
    filterNode(value, data) {
      if (!value) return true;
      return data.projectName.indexOf(value.toString()) !== -1;
    },
    // 节点点击
    handleNodeClick(data) {},
    executeSql() {

      this.connectionShow = true;
      if (this.textarea == null || this.textarea == "") {
        this.$message({
          type: "warning",
          message: "请填写SQL!",
        });
      } else {
        if (this.buttonText == "执行") {
          const param = {
            sql: this.textarea,
          };
          this.getListBySQL(param);
        } else {
          this.stop();
        }
      }
    },
    dataDownLoad() {
      this.downLoadDialog = true;
    },
    downLoad(flag) {

      if (this.textarea == null || this.textarea == "") {
        this.$message({
          type: "warning",
          message: "请填写SQL!",
        });
      } else {
        const  user = this.$store.state.user
        console.log(user)
        const param = {
          flag: flag,
          sql: this.textarea,
          userId: user.user.id,
          userName: user.user.username,
          deptId: user.user.deptId,
          deptName: user.user.dept
        };
        if (flag == "1") {
          this.descriptionDialog = true;
        } else {
          downLoad(param).then((data) => {
            this.$message({
              type: "success",
              message:
                "下载任务已提交至执行队列，请至'导出结果下载'页面查看任务状态并下载文件",
            });
            this.downLoadDialog = false;
          });
        }
      }
    },
    downLoadSourceData() {

      const  user = this.$store.state.user
      const param = {
        flag: "1",
        sql: this.textarea,
        description: this.description,
        userId: user.user.id,
        userName: user.user.username,
        deptId: user.user.deptId,
        deptName: user.user.dept
      };
      downLoadSourceData(param).then((data) => {
        console.log(JSON.stringify(data));
        console.log(data);
        this.downLoadDialog = false;
        this.descriptionDialog = false;
        if(data.code == '200') {
          this.$message({
            type: "success",
            message: data.msg
          });
        }else {
          this.$message({
            type: "error",
            message: data.msg
          });
        }
      });
    },
    closeDescriptionDialog() {
      this.descriptionDialog = false;
      this.description = "";
    },
    getListBySQL(param) {

      const noneList = [];
      if (
        this.nameList.length > 1 &&
        this.connList.length == 0 &&
        this.type == "1"
      ) {
        this.$message({
          type: "warning",
          message: "请填写关联条件",
        });
      } else if (
        this.nameList.length != this.connList.length + 1 &&
        this.type == "1"
      ) {
        let index = 0;
        for (let i = 0; i < this.nameList.length; i++) {
          let nickName = `t${i + 1}`; //  "t" + (i + 1)
          for (let k in this.connList) {
            if (this.connList[k].includes(nickName)) {
              index += 1;
              break;
            }
          }
          if (index == 0) {
            noneList.push(this.nameList[i]);
          }
          index = 0;
        }
        if (noneList.length > 0) {
          this.$message({
            type: "warning",
            message: "表" + noneList.toString() + "没有和其他表关联",
          });
        }else {
          this.submit(param)
        }
      } else {
        this.submit(param)
      }
    },

    submit(param){
      this.loading = true;
      this.log = "执行中";
      this.editableTabs = "log";
      this.createSetInterval();
      getListBySQL(param).then((data) => {
        console.log(data);
        this.buttonText = "执行";
        this.buttonType = "success";
        if (data.code == "200") {
          this.stopSetInterval();
          this.handleTabs();
          this.currentPage = 1;
          this.propList = data.head;
          this.tableList = data.data;
          this.log = data.log;
          this.total = this.tableList.length;
          this.tabs[1].propList = this.propList;
          this.tabs[1].tableList = this.tableList;
          this.editableTabs = "latest"
        } else {
          this.stopSetInterval();
          this.log = data.log;
          this.$message({
            type: "error",
            message: data.msg,
          });
        }
        this.loading = false;
      });
      this.loading = false;
    },
    stopSetInterval() {
      console.log("=================轮询结束==================");
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
    createSetInterval() {
      console.log("=================轮询开始==================");
      this.stopSetInterval();
      let _this = this;
      this.timer = setInterval(() => {
        _this.getSession();
      }, 5000);
    },
    // 拖拽
    /*      drag(ev, node) {
        console.log("拖动", node);
        let transData = JSON.stringify(node)
        this.dom = ev.currentTarget.cloneNode(true);
        ev.dataTransfer.setData("node", transData)
        this.tableName = this.dom.textContent;
        //console.log(this.dom);
        //console.log(this.dom.tableName);
      },*/
    handleDragStart(node, event) {
      console.log("拖动", node);
      this.nodeList = node.data;
      event.dataTransfer.setData("node", node);
    },
    /*      handleDragEnd(node,event){
        console.log("放下", item);
        this.textarea = "select * from " +this.tableName;
      },*/
    treeAllowDrop() {
      return false;
    },
    // 允许放下拖拽
    allowDrop(ev) {
      if (this.type == "0") {
        return false;
      }
      ev.preventDefault();
    },
    // 放下事件
    drop(ev, item) {
      if (this.flag == true) {
        this.flag = false;
        console.log("放下", this.nodeList);
        if (this.nodeList.tableName != null && this.nodeList.tableName != "") {
          this.tableName = this.nodeList.name + "." + this.nodeList.tableName;
          let index = this.indexOf(this.tableName, this.nameList);
          if (index > -1) {
            this.$message({
              type: "warning",
              message: "已选择该表",
            });
            this.flag = true;
            return;
          } else {
            getTableColumn(this.nodeList.name, this.nodeList.tableName).then(
              (data) => {
                //this.tableColumnList.push(data)
/*                this.$set(this.tableColumnList, this.tableName, data);
                this.nameList.push(this.tableName);
                this.tableAndNickname.push("t" + this.nameList.length);
                this.data2Sql();*/
                if (data.code == "200") {
                  this.nameList.push(this.tableName);
                  this.tableAndNickname.push("t" + this.nameList.length);
                  this.$set(this.tableColumnList, this.tableName, data.data);
                  this.$set(this.tableComment, this.tableName, data.comment)
                  this.data2Sql();
                } else {
                  this.$message({
                    type: "warning",
                    message: data.msg,
                  });
                }
                this.flag = true;
              }
            );
          }
        } else {
          this.flag = true;
          this.$message({
            type: "warning",
            message: "现在选择是为项目,请选择一个表",
          });
        }
        ev.preventDefault();
        if (this.tableName == null) {
          this.tableName = "";
        }
      } else {
        this.$message({
          type: "warning",
          message: "正在加载上一张表的字段信息",
        });
      }
      /*        let treeNode = ev.target;
        if (treeNode) {
          treeNode.appendChild(this.dom);
        }*/
    },
    getComment(val){

      for(let k in this.tableComment){
          if(k == val){
            console.log(this.tableComment[k])
            return this.tableComment[k];
          }
      }

    },
    addRow() {
      this.columnList.push({
        from: [],
        to: [],
      });
      this.ruleList.push({
        where1: "",
        where2: "",
        where3: "",
        where4: "",
      });
    },
    deleteRow(index) {
      this.ruleList.splice(index, 1);
      this.connList.splice(index, 1);
      this.data2Sql();
    },
    //获取字段
    selectTable(rowNum, nickName, whereOrTo) {
      let index = nickName.replace("t", "");
      index = index - 1;
      let tableName = this.nameList[index];
      const backList = [];
      for (let k in this.tableColumnList) {
        if (k == tableName) {
          for (let j = 0; j < this.tableColumnList[k].length; j++) {
            let column = this.tableColumnList[k][j].toString();
            if(column.includes('(')){
              column = column.substring(0,column.indexOf("("))
            }
            backList.push(column);
          }
        }
      }
      if (whereOrTo == "from") {
        this.ruleList[rowNum].where2 = "";
      } else {
        this.ruleList[rowNum].where4 = "";
      }
      this.$set(this.columnList[rowNum], whereOrTo, backList);
      console.log("this.columnList" + JSON.stringify(this.columnList));
    },
    connChange(rowNum) {
      let where1 = this.ruleList[rowNum].where1;
      let where2 = this.ruleList[rowNum].where2;
      let where3 = this.ruleList[rowNum].where3;
      let where4 = this.ruleList[rowNum].where4;
      if (where1 != "" && where2 != "" && where3 != "" && where4 != "") {
        this.connList[rowNum] =
          where1 + "." + where2 + "=" + where3 + "." + where4;
        this.data2Sql();
      }
    },
    handleConn() {
      this.connList = [];
      for (let i = 0; i < this.ruleList.length; i++) {
        this.columnList.push({
          from: [],
          to: [],
        });
        let where1 = this.ruleList[i].where1;
        let where3 = this.ruleList[i].where3;
        let from = where1.replace("t", "") - 1;
        let to = where3.replace("t", "") - 1;
        for (let k in this.tableColumnList) {
          if (k == this.nameList[from]) {
            this.$set(this.columnList[i], "from", this.tableColumnList[k]);
          }
          if (k == this.nameList[to]) {
            this.$set(this.columnList[i], "to", this.tableColumnList[k]);
          }
        }
        if (
          this.ruleList[i].where1 != "" &&
          this.ruleList[i].where2 != "" &&
          this.ruleList[i].where3 != "" &&
          this.ruleList[i].where4 != ""
        ) {
          this.connList.push(
            this.ruleList[i].where1 +
              "." +
              this.ruleList[i].where2 +
              "=" +
              this.ruleList[i].where3 +
              "." +
              this.ruleList[i].where4
          );
        }
      }
    },
    //组装sql
    data2Sql() {
      let strColumn = "";
      let strFrom = "";
      let strConn = "";
      if (this.selectionList.length == 0) {
        for (let k in this.tableAndNickname) {
          strColumn += this.tableAndNickname[k] + ".*";
          strColumn += ",";
        }
      }

      for (let j = 0; j < this.selection2sql.length; j++) {
        let a = this.selection2sql[j].substring(
          0,
          this.selection2sql[j].lastIndexOf(".")
        );
        let b = this.selection2sql[j].substring(
          this.selection2sql[j].lastIndexOf(".") + 1,
          this.selection2sql[j].length
        );
        let index = this.indexOf(a, this.nameList);
        let column = "t" + (index + 1) + "." + b;
        strColumn += column + ",";
      }
      for (let i = 0; i < this.nameList.length; i++) {
        strFrom += this.nameList[i] + " t" + (i + 1) + ",";
      }
      for (let k = 0; k < this.connList.length; k++) {
        strConn += this.connList[k] + " and ";
      }
      if (strFrom == "") {
        this.textarea = "";
      } else {
        this.textarea =
          "select " +
          strColumn.substring(0, strColumn.lastIndexOf(",")) +
          " from " +
          strFrom.substring(0, strFrom.lastIndexOf(","));
        if (strConn != "") {
          this.textarea =
            this.textarea +
            " where " +
            strConn.substring(0, strConn.lastIndexOf("and"));
        }
      }
      if(this.textarea != ''){
        this.textarea += ";";
      }
    },
    //删除被拖过来的表
    deleteTable(tableName) {
      //右侧操作区的数组
      this.$delete(this.tableColumnList, tableName);
      //中间被拖拽表的数组
      let index = this.indexOf(tableName, this.nameList);
      this.nameList.splice(index, 1);
      this.tableAndNickname.splice(this.tableAndNickname.length - 1, 1);
      console.log("表还剩：" + this.nameList);
      console.log("表别名还剩：" + this.tableAndNickname);
      //选择字段的数组
      for (let i = 0; i < this.selectionList.length; i++) {
        if (!this.selectionList[i].includes(tableName)) {
          this.newSelectionList.push(this.selectionList[i]);
        }
      }
      for (let i = 0; i < this.selection2sql.length; i++) {
        if (!this.selection2sql[i].includes(tableName)) {
          this.newSelection2sql.push(this.selection2sql[i]);
        }
      }
      const backRuleList = []; //备份
      let nickName = "t" + (index + 1);
      for (let j = 0; j < this.ruleList.length; j++) {
        if (
          this.ruleList[j].where1 != nickName &&
          this.ruleList[j].where2 != nickName &&
          this.ruleList[j].where3 != nickName &&
          this.ruleList[j].where4 != nickName
        ) {
          backRuleList.push(this.ruleList[j]);
        }
      }

      this.ruleList = backRuleList;
      if (this.ruleList.length == 0) {
        this.ruleList.push({
          where1: "",
          where2: "",
          where3: "",
          where4: "",
        });
      }
      for (let h = index + 1; h < this.tableAndNickname.length + 1; h++) {
        let old = "t" + (h + 1);
        for (let j = 0; j < this.ruleList.length; j++) {
          for (let k in this.ruleList[j]) {
            if (this.ruleList[j][k] == old) {
              this.ruleList[j][k] = "t" + h;
            }
          }
        }
      }
      this.handleConn();
      this.selectionList = this.newSelectionList;
      this.newSelectionList = [];
      this.selection2sql = this.newSelection2sql;
      this.newSelection2sql = [];
      this.data2Sql();
    },
    //获取数组中数值的下标
    indexOf(val, ids) {
      for (let i = 0; i < ids.length; i++) {
        //获取当前值的下标
        if (ids[i] === val) {
          return i;
        }
      }
      return -1;
    },
    //多选赋值ids
    ids(val) {
      //检索下标,判断当前值(或对象是否在数组中); 在则返回在的对象,不在则返回-1
      let column = val
      if(column.includes("(")){
        column = column.substring(0,val.indexOf("("));
      }
      let index = this.indexOf(val, this.selectionList);
      if (this.selectionList.length > 0 && index > -1) {
        //删除数组中的某个元素(在取消勾选时,删除数组中的值)
        this.selectionList.splice(index, 1);
        this.selection2sql.splice(index, 1);
      } else {
        //id添加到数组中
        this.selectionList.push(val);
        this.selection2sql.push(column)
        //⽤逗号隔开
        // this.selectionList.join(",");
      }
      // 发射数据给⽗组件：
      this.$emit("handelSelectionList", this.selectionList);
      this.data2Sql();
      console.log("选择的字段有:" + this.selectionList);
    },
    // 分页
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    changeTab(activeName, oldActiveName) {
      console.log(activeName, oldActiveName);

      if (oldActiveName == "first") {
        this.textarea1 = this.textarea;
        this.textarea = this.textarea2;
      } else {
        this.textarea2 = this.textarea;
        this.textarea = this.textarea1;
      }
      this.flag = true;
      /*this.textarea = "";
      //拖到右侧的表
      this.nameList = [];
      this.tableAndNickname = []; //表和他的别名
      //放到右侧的节点
      this.nodeList = {};
      //表字段信息
      this.tableColumnList = {}; //被选择字段
      this.selectionList = [];
      //删除表时，同时删除该表选择的字段
      this.newSelectionList = [];
      //ruleList
      (this.ruleList = [
        {
          where1: "",
          where2: "",
          where3: "",
          where4: "",
        },
      ]),
        (this.columnList = [
          {
            from: [],
            to: [],
          },
        ]);
      this.connList = []; //拼接好的关联条件*/
    },
    textClear() {
      if (this.activeName == "first") {
        this.textarea1 = "";
        this.textarea = "";
      } else {
        this.textarea2 = "";
        this.textarea = "";
        this.nameList = [];
        this.tableAndNickname = []; //表和他的别名
        //放到右侧的节点
        this.nodeList = {};
        //表字段信息
        this.tableColumnList = {}; //被选择字段
        this.selectionList = [];
        this.selection2sql = [];
        //删除表时，同时删除该表选择的字段
        this.newSelectionList = [];
        //ruleList
        (this.ruleList = [
          {
            where1: "",
            where2: "",
            where3: "",
            where4: "",
          },
        ]),
          (this.columnList = [
            {
              from: [],
              to: [],
            },
          ]);
        this.connList = []; //拼接好的关联条件
      }
    },
    indexOfTabs(val, tabs) {
      for (let i = 0; i < tabs.length; i++) {
        //获取当前值的下标
        if (tabs[i].name === val) {
          return i;
        }
      }
      return -1;
    },
    ClickEditableTabs(tab, event) {
      let index = this.indexOfTabs(tab.name, this.tabs);
      if (tab.name != "log") {
        this.propList = this.tabs[index].propList;
        this.tableList = this.tabs[index].tableList;
        this.total = this.tableList.length;
      }
    },
    removeTab(targetName) {
      let tabs = this.tabs;
      let activeName = this.editableTabs;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }

      this.editableTabs = activeName;
      this.tabs = tabs.filter((tab) => tab.name !== targetName);
    },
    handleTabs() {
      if (this.tabs[1].propList.length != 0) {
        for (let i = this.tabs.length; i > 1; i--) {
          let index = i - 2;
          let next = index + 1;
          let title = "记录" + next;
          let name = "category" + next;
          if (next > 5) continue;
          const newTab = {
            title: title,
            name: name,
            closeable: true,
            propList: this.tabs[next].propList,
            tableList: this.tabs[next].tableList,
          };
          this.tabs.splice(i, 1, newTab);
        }
      }
    },
    // el-table表头中加el-popover下拉框
    linefeed(h, { column, $index }) {
      let realWidth = 0;
      let span = document.createElement("span");
      span.innerText = column.label;
      if (!column.label) {
        document.body.appendChild(span);
        realWidth = 100;
        column.minWidth = realWidth; // 可能还有边距/边框等值，需要根据实际情况加上
        document.body.removeChild(span);
        return h("span", column.label);
      } else {
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

/deep/.el-table__body-wrapper::-webkit-scrollbar {
  height: 10px !important;
}
::-webkit-scrollbar {
  width: 10px; /*对垂直流动条有效*/
  height: 10px; /*对水平流动条有效*/
}

/*定义滚动条的轨道颜色、内阴影及圆角*/
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.05);
  background-color: inset 0 0 6px rgba(0, 0, 0, 0.05);
  border-radius: 3px;
}

/*定义滑块颜色、内阴影及圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 7px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.05);
  background-color: #e8e8e8;
}
.el-select__caret.el-input__icon {
  .el-icon-arrow-up:before {
    content: "";
  }
}

i.el-select__caret {
  appearance: none;
  -moz-appearance: none;
  -webkit-animation: none;
  .el-icon-arrow-up:before {
    content: "";
  }
}
.el-tabs__nav .el-tabs__item:nth-child(1) span {
  display: none;
}
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
      // width: 300px;
      height: 100%;
      max-height: 620px;
      overflow: auto;
      .el-tree {
        margin-top: 8px;
        padding-top: 8px;
        height: calc(100% - 38px);
      }
    }
      .span-ellipsis {
          width: 100%;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          display: block;
      }
  }
  .right {
    // flex: 1;
    height: calc(100% - 40px);
    margin-left: 20px;
    // overflow: auto;
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
          background-color: #409eff;
        }
      }
    }
    .log {
      height: calc(100% - 290px);
      overflow: auto;
    }
    .log >>> .el-textarea.is-disabled .el-textarea__inner {
      /* background-color:white;
        　　border-color: white;*/
      color: #ff0044;
    }
    .tableList {
      height: calc(100% - 290px);
    }
    .el-table {
      // width: 100%;
      // margin-top: 24px;
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
  .connection {
    // width: 420px;
    max-height: 620px;
    // height: 100%;
    height: calc(100% - 40px);
    overflow: auto;
    margin-left: 20px;
    margin-right: 8px;
    .queryCriteria {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      align-items: center;
      .el-select {
        margin-right: 5px;
      }
      .eq {
        margin-right: 5px;
      }
    }
    .el-card {
      height: 200px;
      margin-top: 10px;
      margin-right: 5px;
      overflow-y: auto;
    }
  }
}
</style>