<template>
    <div class="dataMonitor">
        <div class="chartArea">
            <div class="left">
                <div class="title">
                    <i></i>
                    <span>表资产每日访问趋势</span>
                </div>
                <div id="tableChart" class="chartDom"></div>
            </div>
            <div class="right">
                <div class="title">
                    <i></i>
                    <span>API资产每日访问趋势</span>
                </div>
                <div id="APIChart" class="chartDom"></div>
            </div>
        </div>
        <div class="chartArea">
            <div class="left">
                <div class="title">
                    <i></i>
                    <span>指标资产每日访问趋势</span>
                </div>
                <div id="targetChart" class="chartDom"></div>
            </div>
            <div class="right">
                <div class="title"> 
                    <i></i>
                    <span>标签资产每日访问趋势</span>
                </div>
                <div id="labelChart" class="chartDom"></div>
            </div>
            
        </div>
    </div>
</template>

<script>
export default {
    name: 'DataMonitor',
    data() {
        return {
            chartData: {}
        }
    },
    created() {
        this.$api.selectVisits({}).then(res => {
            this.chartData = res.data
        }).then(() => {
            this.drawChart()
        })
    },
    mounted() { },
    methods: {
        drawChart() {
            console.log(this.chartData);
            let tableNum = this.chartData.table.map((item) => {
                return item.num;
            });
            let apiNum = this.chartData.api.map((item) => {
                return item.num;
            });
            let targetNum = this.chartData.target.map((item) => {
                return item.num;
            });
            let labelNum = this.chartData.label.map((item) => {
                return item.num;
            });
            let tableTime = this.chartData.table.map((item) => {
                return item.time;
            });
            let apiTime = this.chartData.api.map((item) => {
                return item.time;
            });
            let targetTime = this.chartData.target.map((item) => {
                return item.time;
            });
            let labelTime = this.chartData.label.map((item) => {
                return item.time;
            });

            let tableChartDom = document.getElementById('tableChart');
            let tableChart = this.$echarts.init(tableChartDom);
            let tableOption;
            let APIChartDom = document.getElementById('APIChart');
            let APIChart = this.$echarts.init(APIChartDom);
            let APIOption;
            let targetChartDom = document.getElementById('targetChart');
            let targetChart = this.$echarts.init(targetChartDom);
            let targetOption;
            let labelChartDom = document.getElementById('labelChart');
            let labelChart = this.$echarts.init(labelChartDom);
            let labelOption;
            tableOption = {
                tooltip: {
                    trigger: 'axis'
                },
                color: [ "rgba(138.74380000000002, 219.3, 52.63199999999999, 1)" ],
                grid: {
                    left: "7%",
                    right: "5%",
                    top: "5%",
                    bottom: "15%",
                },
                xAxis: {
                    type: "category",
                    boundaryGap: false,
                    data: tableTime,
                    axisTick: {
                        show: false,
                        alignWithLabel: true,
                    },
                    nameTextStyle: {}
                },
                yAxis: {
                    type: "value",
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false,
                        alignWithLabel: true,
                    },
                },
                series: [
                    {
                        data: tableNum,
                        type: "line",
                        areaStyle: {
                        color: {
                            type: "linear",
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [
                            {
                                offset: 0,
                                color:
                                "rgba(138.74380000000002, 219.3, 52.63199999999999, 1)", // 0% 处的颜色
                            },
                            {
                                offset: 1,
                                color: "rgba(242.8977, 247.35, 239.9295, 1)", // 100% 处的颜色
                            },
                            ],
                            global: false, // 缺省为 false
                        },
                        },
                    },
                ],
            }
            APIOption = {
                tooltip: {
                    trigger: 'axis'
                },
                color: [ "rgba(66.55499999999999, 188.20274999999998, 221.85, 1)" ],
                grid: {
                    left: "7%",
                    right: "5%",
                    top: "5%",
                    bottom: "15%",
                },
                xAxis: {
                    type: "category",
                    boundaryGap: false,
                    data: apiTime,
                    axisTick: {
                        show: false,
                        alignWithLabel: true,
                    },
                },
                yAxis: {
                    type: "value",
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false,
                        alignWithLabel: true,
                    },
                },
                series: [
                    {
                        data: apiNum,
                        type: "line",
                        areaStyle: {
                        color: {
                            type: "linear",
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [
                            {
                                offset: 0,
                                color:
                                "rgba(66.55499999999999, 188.20274999999998, 221.85, 1)", // 0% 处的颜色
                            },
                            {
                                offset: 1,
                                color: "rgba(242.8977, 247.35, 239.9295, 1)", // 100% 处的颜色
                            },
                            ],
                            global: false, // 缺省为 false
                        },
                        },
                    },
                ],
            }
            targetOption = {
                tooltip: {
                    trigger: 'axis'
                },
                color: [ "rgba(229.5, 177.48000000000002, 45.9, 1)" ],
                grid: {
                    left: "7%",
                    right: "5%",
                    top: "5%",
                    bottom: "15%",
                },
                xAxis: {
                    type: "category",
                    boundaryGap: false,
                    data: targetTime,
                    axisTick: {
                        show: false,
                        alignWithLabel: true,
                    },
                },
                yAxis: {
                    type: "value",
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false,
                        alignWithLabel: true,
                    },
                },
                series: [
                    {
                        data: targetNum,
                        type: "line",
                        areaStyle: {
                        color: {
                            type: "linear",
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [
                            {
                                offset: 0,
                                color:
                                "rgba(229.5, 177.48000000000002, 45.9, 1)", // 0% 处的颜色
                            },
                            {
                                offset: 1,
                                color: "rgba(242.8977, 247.35, 239.9295, 1)", // 100% 处的颜色
                            },
                            ],
                            global: false, // 缺省为 false
                        },
                        },
                    },
                ],
            }
            labelOption = {
                tooltip: {
                    trigger: 'axis'
                },
                color: [ "rgba(57.375, 129.09375, 229.5, 1)" ],
                grid: {
                    left: "7%",
                    right: "5%",
                    top: "5%",
                    bottom: "15%",
                },
                xAxis: {
                    type: "category",
                    boundaryGap: false,
                    data: labelTime,
                    axisTick: {
                        show: false,
                        alignWithLabel: true,
                    },
                },
                yAxis: {
                    type: "value",
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false,
                        alignWithLabel: true,
                    },
                },
                series: [
                    {
                        data: labelNum,
                        type: "line",
                        areaStyle: {
                        color: {
                            type: "linear",
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [
                            {
                                offset: 0,
                                color:
                                "rgba(57.375, 129.09375, 229.5, 1)", // 0% 处的颜色
                            },
                            {
                                offset: 1,
                                color: "rgba(242.8977, 247.35, 239.9295, 1)", // 100% 处的颜色
                            },
                            ],
                            global: false, // 缺省为 false
                        },
                        },
                    },
                ],
            }
            console.log(tableOption,777);
            // 绘图
            tableOption && tableChart.setOption(tableOption);
            APIOption && APIChart.setOption(APIOption);
            targetOption && targetChart.setOption(targetOption);
            labelOption && labelChart.setOption(labelOption);
            setTimeout(function () {
                window.onresize = function () {
                    tableChart.resize();
                    APIChart.resize();
                    targetChart.resize();
                    labelChart.resize();
                }
            }, 200)

        }
    },
}
</script>

<style lang="scss" scoped>
.dataMonitor {
    height: calc(100vh - 135px);
    overflow: auto;
    padding: 16px;
    margin: 0 16px 16px 16px;
    background: #fff;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .chartArea {
        height: 45%;
        margin-bottom: 24px;
        display: flex;
        justify-content: space-between;
        .left,.right {
            width: 47%;
            height: 100%;
            background: #fff;
            .title {
                font-size: 14px;
                font-weight: 700;
                color: #202224;
                line-height: 22px;
                display: flex;
                align-items: center;
                padding-left: 2%;
                i {
                    width: 12px;
                    height: 12px;
                    border-radius: 2px;
                    background: #79ac43;
                    margin-right: 8px;
                }
            }
        }
        .chartDom {
            width: 100%;
            height: 100%;
            background: #fff;
        } 
    }
}
</style>