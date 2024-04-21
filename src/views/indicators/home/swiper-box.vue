<template>
  <div class="recommendPage">
    <swiper
      :options="swiperOption"
      ref="mySwiper"
      currnt="2"
      class="swiper-wrapper"
      style="display: flex; align-items: center"
      v-if="deptList.length"
    >
      <swiper-slide v-for="(item, index) in deptList" :key="index">
        <template>
          <div class="dept-item-top">
            <img class="userIcon" src="../../../assets/depUser.png" />{{
              item.deptName
            }}
          </div>
          <div class="dept-item-bottom">
            <span class="p1"> {{ numberFormat(item.num) }}</span>
            <span class="p2">笔</span>
          </div>
        </template>
      </swiper-slide>
      <!-- <div class="swiper-pagination" slot="pagination"></div> -->
      <div
        class="swiper-button-prev swiper-button-white"
        slot="button-prev"
      ></div>
      <div
        class="swiper-button-next swiper-button-white"
        slot="button-next"
      ></div>
    </swiper>
  </div>
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";
const c_swiper = document.getElementsByClassName("swiper-wrapper");
export default {
  name: "SwiperBox",
  components: { swiper, swiperSlide },
  props: {
    deptList: {
      type: Array,
      default: [],
    },
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    },
  },
  data() {
    return {
      activeSlide: 1,
      swiperOption: {
        loop: true, // 是否循环轮播
        autoplay: {
          delay: 10000,
          stopOnLastSlide: false,
          disableOnInteraction: true,
        }, // 是否可以自动轮播
        slidesPerView: "auto", // 可是区域内可展示多少个块
        spaceBetween: 16, // 块之间间隔距离
        initialSlide: 0, // 默认初始显示块
        freeMode: false,
        observer: true,
        observeParents: true,
        centeredSlides: true,
        slideToClickedSlide: true, // 点击居中显示
        // 显示分页
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        // 设置点击箭头
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        on: {
          slideChange: () => {
            c_swiper[0].style.alignItem = "center";
            this.getCurrentData(c_swiper[0].swiper.activeIndex);
          },
        },
      },
    };
  },
  methods: {
    // 获取接口
    getCurrentData(index) {
      if (index < this.deptList.length) {
        this.$emit("getOrganizationData", this.deptList[index]);
      } else {
        // 因为是循环的，所以要取余
        let num = parseInt(index % this.deptList.length);
        this.$emit("getOrganizationData", this.deptList[num]);
      }
    },

    // 数字实现三位分割显示
    numberFormat(value) {
      if (!value) return "0";
      var intPart = Number(value).toFixed(0); // 获取整数部分
      var intPartFormat = intPart
        .toString()
        .replace(/(\d)(?=(?:\d{3})+$)/g, "$1,"); // 将整数部分逢三一断
      var floatPart = ".00"; // 预定义小数部分
      var value2Array = value.toString().split(".");
      // =2表示数据有小数位
      if (value2Array.length === 2) {
        floatPart = value2Array[1].toString(); // 拿到小数部分
        if (floatPart.length === 1) {
          // 补0
          return intPartFormat + "." + floatPart + "0";
        } else {
          return intPartFormat + "." + floatPart;
        }
      } else {
        return intPartFormat;
      }
    },
  },
  created() {
    // this.$refs.mySwiper.slideToLoop(3, 100, false);
  },
};
</script>

<style>
.swiper-wrapper {
  display: flex;
  align-items: center !important;
}
</style>
<style scoped lang="scss">
$common-green: rgba(97, 189, 83, 1);
$common-grey: rgba(56, 81, 105, 1);
.recommendPage {
  width: 100%;
  height: 100%;
}
.recommendPage .swiper-container {
  position: relative;
  width: 100%;
}

.recommendPage .swiper-container .swiper-slide {
  width: 180px;
  border: 1px solid $common-green;
  color: #000;
  font-size: 16px;
  text-align: center;
  height: 70%;
  opacity: 0.5;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: url("../../../assets/bgDep.png") 150% 50% no-repeat #fff;
  box-shadow: 0px 2px 4px rgba(130, 204, 118, 0.5);
}
.recommendPage .swiper-container .swiper-slide-prev {
  opacity: 0.7;
  height: 86%;
  width: 200px;
}

.recommendPage .swiper-container .swiper-slide-next {
  opacity: 0.7;
  height: 86%;
  width: 200px;
}
.recommendPage .swiper-container .swiper-slide-active {
  background: url("../../../assets/bgDep.png") 100% 50% no-repeat #61bd53;
  color: #fff !important;
  width: 240px !important;
  height: 99%;
  opacity: 1;

  .dept-item-top {
    color: #fff;
  }
  .dept-item-bottom {
    .p1 {
      color: #fff;
      font-size: 20px;
    }
    .p2 {
      font-size: 12px;
      color: #fff;
    }
  }
}
.dept-item-top {
  color: $common-green;
  font-size: 14px;
  padding-bottom: 10px;
  .user {
    background: url("../../../assets/depUser.png") 100% 100% no-repeat;
  }
}

.userIcon {
  width: 15px;
  height: 15px;
  position: relative;
  top: 2px;
  left: -4px;
}
.dept-item-bottom {
  .p1 {
    color: rgba(56, 81, 105, 1);
    font-size: 16px;
    font-weight: 600;
  }
  .p2 {
    font-size: 12px;
    color: rgba(56, 81, 105, 1);
  }
}
.swiper-button-prev,
.swiper-button-next {
  background-size: 15px 20px;
}
</style>