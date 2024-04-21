
export const mixinsFunctions = {
  data() {
    return {
      beforeUrl: {},
      eventLock: true,
    }
  },
  created() {
    this.eventLock = false;
    this.initData();
  },
  activated() {
    if (this.eventLock) {
      this.initData();
    }
  },
  deactivated() {
    this.eventLock = true;
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.beforeUrl = from
    })
  },
  beforeRouteLeave(to, from, next) {
    if (to.name === this.beforeUrl.name) {
      this.$store.commit("SET_KEEPALIVE", true);
    } else {
      this.$store.commit("SET_KEEPALIVE", false);
    }
    next();
  },
  methods: {
    // 关闭当前页面
    closeThisPage() {
      let currentView = this.$store.state.tagsView.visitedViews[0];
      for (currentView of this.$store.state.tagsView.visitedViews) {
        if (currentView.path === this.$route.path) {
          break;
        }
      }
      this.$store.dispatch("tagsView/delView", currentView).then(() => {
        this.$router.go(-1);
      });
    },
  },
};