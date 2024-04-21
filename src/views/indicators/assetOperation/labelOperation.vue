<template>
  <div class="labelOperation">
    <Operation
      v-if="show"
      ref="operation"
      :tableData="tableData"
      :tabList="tabList"
      :pageSize="pageSize"
      :currentPage="currentPage"
      :total="total"
      @queryList="queryList"
      @offline="offline"
      @handleClick="handleClick"
      @handleNodeClick="handleNodeClick"
    ></Operation>
  </div>
</template>

<script>
import Operation from "../../../components/operation.vue";
export default {
  components: {
    Operation,
  },
  data() {
    return {
      tabList: [
        { label: "已发布的标签", name: "publish" },
        { label: "未发布的标签", name: "unpublished" },
      ],
      fourthList: [],
      // 分页
      pageSize: 9,
      currentPage: 1,
      total: 50,
      tableData: [],
      show: false,
    };
  },
  beforeCreate() {},
  created() {
    this.initList();
    this.$store.commit("SET_KEEPALIVE", true);
  },
  beforeRouteLeave(to, from, next) {
    if (to.path === "/detailsMod/label") {
      this.$store.commit("SET_KEEPALIVE", true);
    } else {
      this.$store.commit("SET_KEEPALIVE", false);
    }
    next();
  },
  methods: {
    // 初始化列表
    initList(assetsState) {
      let request = {
        page: String(this.currentPage),
        size: String(this.pageSize),
        branchOrInsideCode: "",
        assetsState: assetsState ? assetsState : "publish",
        objectCode: "",
        classifyName: "",
        fromCode: "",
        labelName: "",
        description: "",
        contentsOne: "",
        contentsTwo: "",
        contentsThree: "",
      };
      this.$api.getAppointLabel(request).then((res) => {
        this.show = true;
        if (res.data) {
          this.tableData = res.data.records;
          this.total = res.data.total;
        }
      });
    },
    // 查询列表
    queryList(request) {
      this.$api.getAppointLabel(request).then((res) => {
        this.tableData = res.data.records;
        this.total = res.data.total;
      });
    },
    // 修改发布状态
    offline(request) {
      const { activeTab, ...req } = request;
      this.$api.updateLabelState(req).then((res) => {
        this.$message.success("操作成功!");
        this.initList(activeTab);
        this.$refs.operation.getCatalogueList();
      });
    },
    // 树状图tab
    handleClick(tab, event) {
      console.log(tab, event);
    },
    // 节点点击
    handleNodeClick(data) {
      console.log(data, "点击");
    },
  },
};
</script>

<style lang="scss" scoped>
.labelOperation {
  padding: 0 16px 16px 16px;
}
</style>