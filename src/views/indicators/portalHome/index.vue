<template>
  <div class="portal-container">
    <div class="portal-header">
      <div class="portal-header-icon">
        <el-image src="" style="height: 100%;width: 100%"></el-image>
      </div>
      <div class="portal-header-userinfo">
        <span class="portal-header-userinfo-avatar">
          <el-avatar></el-avatar>
        </span>
        <span class="portal-header-userinfo-name">张晓云</span>
        <span>&nbsp;|&nbsp;</span>
        <span class="portal-header-userinfo-logout">退出</span>
      </div>
    </div>
    <div class="portal-main">
      <div class="portal-main-menu">
        <!--        <carousel-3d :height="200" :inverse-scaling="1" :space="400">-->
        <!--          <slide :index="0">-->
        <!--            数据资产平台-->
        <!--          </slide>-->
        <!--          <slide :index="1">-->
        <!--            数据服务平台-->
        <!--          </slide>-->
        <!--          <slide :index="2">-->
        <!--            数据访问平台-->
        <!--          </slide>-->
        <!--          <slide :index="3">-->
        <!--            指标管理平台-->
        <!--          </slide>-->
        <!--          <slide :index="4">-->
        <!--            标签管理平台-->
        <!--          </slide>-->
        <!--          <slide :index="5">-->
        <!--            数据研发平台-->
        <!--          </slide>-->
        <!--        </carousel-3d>-->
        <div class="wrapper"
             style="background-color: green;height: 200px;width: 200px;transform:perspective(800px) rotate3d(0,1,0,40deg)">
          1
        </div>
        <div
            style="background-color: red;height: 200px;width: 200px;transform:perspective(1000px) rotate3d(0,1,0,20deg) scale(85%);">
          2
        </div>
        <div
            style="background-color: pink;height: 200px;width: 200px;transform:perspective(1000px) scale(80%);">
          3
        </div>
        <div
            style="background-color: blue;height: 200px;width: 200px;transform:perspective(1000px) scale(80%);">
          4
        </div>
        <div
            style="background-color: yellow;height: 200px;width: 200px;transform:perspective(1000px) rotate3d(0,1,0,-20deg) scale(85%);">
          5
        </div>
        <div
            style="background-color: purple;height: 200px;width: 200px;transform:perspective(800px) rotate3d(0,1,0,-40deg)">
          6
        </div>
      </div>
    </div>
    <div class="portal-sub">
      <div class="portal-sub-menu">
        <div class="sub-menu-item">
          <el-avatar :size="100"></el-avatar>
          <span style="padding: 10px;color: white">名称</span>
        </div>
        <div class="sub-menu-item">
          <el-avatar :size="100"></el-avatar>
          <span style="padding: 10px;color: white">名称</span>
        </div>
        <div class="sub-menu-item">
          <el-avatar :size="100"></el-avatar>
          <span style="padding: 10px;color: white">名称</span>
        </div>
        <div class="sub-menu-item">
          <el-avatar :size="100"></el-avatar>
          <span style="padding: 10px;color: white">名称</span>
        </div>
        <div class="sub-menu-item">
          <el-avatar :size="100"></el-avatar>
          <span style="padding: 10px;color: white">名称</span>
        </div>
        <div class="sub-menu-item">
          <el-avatar :size="100"></el-avatar>
          <span style="padding: 10px;color: white">名称</span>
        </div>
        <div class="sub-menu-item">
          <el-avatar :size="100"></el-avatar>
          <span style="padding: 10px;color: white">名称</span>
        </div>


      </div>

    </div>
  </div>
</template>

<script>
import {Carousel3d, Slide} from 'vue-carousel-3d';

export default {
  name: "PortalHome",
  components: {
    Carousel3d,
    Slide
  },
  data() {
    return {
      index: 0,
      list: [
        {backgroundColor: '#3f51b5', width: '100%', height: '100%'},
        {backgroundColor: '#eee', width: '100%', height: '100%'},
        {backgroundColor: '#f44336', width: '100%', height: '100%'},
      ],
    };


  }
}
</script>

<style lang="scss" scoped>
.portal-container {
  height: 100vh;
  width: 100vw;
  background-image: linear-gradient(#265cbc, #032b71);

  .portal-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    .portal-header-icon {
      height: 100px;
      width: 600px;
    }

    .portal-header-userinfo {
      color: white;
      display: flex;
      flex-direction: row;
      align-items: center;
      padding-right: 30px;

      .portal-header-userinfo-name {
        font-weight: bold;
      }
    }
  }

  .portal-main {
    margin: 150px 0 150px 0;

    .portal-main-menu {
      display: flex;
      justify-content: center;
      height: 100%;
      margin-left: 10px;
      margin-right: 10px;
    }

  }

  .portal-sub {
    .portal-sub-menu {
      height: 100%;
      display: flex;
      justify-content: space-between;
      margin-left: 100px;
      margin-right: 100px;

      .sub-menu-item {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    }

  }
}

</style>