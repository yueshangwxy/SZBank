<template>
    <div class="panelGroup">
        <div class="search">
            <el-autocomplete
                placeholder="请输入内容"
                v-model="searchInput" 
                clearable
                @keyup.enter.native="queryList(searchInput)"
                :fetch-suggestions="querySearch"
                :trigger-on-focus="false"
                @select="handleSelect">
                <el-button slot="append" @click="queryList(searchInput)">搜索</el-button>
            </el-autocomplete>
        </div>
        <div class="btnList">
            <el-link @click="openSearchPage('table')" :underline="false">
                <div class="icon"> <img src="" alt=""> </div>
                <div class="desc"> 
                    <p>表资产数量</p>
                    <span>{{countAssetsData.table}}</span>
                </div>
                <div class="arrow"> <i class="el-icon-arrow-right"></i> </div>
            </el-link>

            <el-link @click="openSearchPage('API')" :underline="false">
                <div class="icon"> <img src="" alt=""> </div>
                <div class="desc"> 
                    <p>API资产</p>
                    <span>{{countAssetsData.api}}</span>
                </div>
                <div class="arrow"> <i class="el-icon-arrow-right"></i> </div>
            </el-link>

            <el-link @click="openSearchPage('target')" :underline="false">
                <div class="icon"> <img src="" alt=""> </div>
                <div class="desc"> 
                    <p>指标资产</p>
                    <span>{{countAssetsData.target}}</span>
                </div>
                <div class="arrow"> <i class="el-icon-arrow-right"></i> </div>
            </el-link>

            <el-link @click="openSearchPage('tag')" :underline="false">
                <div class="icon"> <img src="" alt=""> </div>
                <div class="desc"> 
                    <p>标签资产</p>
                    <span>{{countAssetsData.label}}</span>
                </div>
                <div class="arrow"> <i class="el-icon-arrow-right"></i> </div>
            </el-link>

        </div>
        <!-- 轮播图 -->
        <el-carousel :interval="4000" type="card" height="200px">
            <el-carousel-item v-for="(item,index) in countAssetsByDeptData" :key="index">
                <h3 class="medium">
                    <span>{{item.deptName}}</span>
                    <span>{{item.num}}</span>
                </h3>
            </el-carousel-item>
        </el-carousel>
        <!-- 图表部分 -->
        <div class="details">
            <div class="chart">
                <div id="lineChart" class="chartDom lineChart"></div>
                <div id="pieChart" class="chartDom pieChart"></div>
                <div class="chartDom barChart">
                    <div class="title">
                        <span>机构规模排行</span>
                        <el-date-picker
                            v-model="dateValue"
                            type="date"
                            placeholder="选择日期">
                        </el-date-picker>
                    </div>
                    <div class="des">
                        <div class="box">
                            <span>结算账户数</span>
                            <span>1234户</span>
                        </div>
                        <div class="box">
                            <span>结算账户数</span>
                            <span>1234户</span>
                        </div>
                        <div class="box">
                            <span>结算账户数</span>
                            <span>1234户</span>
                        </div>
                    </div>
                    <div id="barChart"></div>
                </div>
                <div id="smoothLineChart" class="chartDom smoothLineChart"></div>
            </div>
            <div class="board">
                <div class="title">个人看板</div>
                <div class="item" v-for="(item,index) in topTenData" :key="index">
                    <div class="word">
                        <span>{{item.assetName}}</span>
                        <p>
                            <span>{{item.count}}</span>
                            <el-progress :percentage="50"></el-progress>
                        </p>
                    </div>
                    <div class="arrow">
                        <i class="el-icon-arrow-right"></i></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {countAssets,countAssetsByDept,topTen,data2Charts} from '../../../api/searchPage/homePage'
    export default {
        components: {},
        data() {
            return {
                searchInput: '',
                dateValue: '',
                countAssetsData :[],

                topTenData :[],
                pieData :[], //饼图数据
                deptData :[], //柱状图y轴
                barData :[], //柱状图数据
                firstTableLineData :[],//第一个折线图(表)
                firstTargetLineData :[],//第一个折线图(指标)
                firstApiLineData :[],//第一个折线图(api)
                firstLabelLineData :[],//第一个折线图(标签)
                secondTableLineData :[],//第二个折线图(表)
                secondTargetLineData :[],//第二个折线图(指标)
                secondApiLineData :[],//第二个折线图(api)
                secondLabelLineData :[],//第二个折线图(标签)
                countAssetsByDeptData: [
                    {deptName: 1,num:2},
                    {deptName: 2,num:3},
                    {deptName: 3,num:4},
                    {deptName: 4,num:5},
                    {deptName: 5,num:6},
                ],
            }
        },
        created() {

            countAssetsByDept().then(data =>{
                this.countAssetsByDeptData = data
            })
                /*this.countAssetsByDeptData = [{"deptName":"部门1","num":6,"deptCode":"1"},
                    {"deptName":"部门2","num":2,"deptCode":"2"},
                    {"deptName":"部门3","num":3,"deptCode":"3"},
                    {"deptName":"部门4","num":2,"deptCode":"4"}]*/
            topTen().then(data =>{
                this.topTenData = data
            })
        },
        mounted() {
            //各类资产已发布的数量
            countAssets().then(data =>{
                this.countAssetsData = data
            });
            data2Charts().then(data =>{
                this.pieData = data.pieData
                this.deptData = data.barData.deptList
                this.barData = data.barData.numList
                this.firstTableLineData = data.lineData.first.table
                this.firstTargetLineData = data.lineData.first.target
                this.firstApiLineData = data.lineData.first.api
                this.firstLabelLineData = data.lineData.first.label
                this.secondTableLineData = data.lineData.second.table
                this.secondTargetLineData = data.lineData.second.target
                this.secondApiLineData = data.lineData.second.api
                this.secondLabelLineData = data.lineData.second.label
                console.log(JSON.stringify(this.deptData))
                console.log(JSON.stringify(this.barData))
                console.log(JSON.stringify(data.lineData))

                this.drawChart()
            });
            // 轮播图
            let liWidth = $("#carousel ul>li").outerWidth();
            let count = 0;
            
            $("#carousel ul").append($("#carousel ul").find("li").eq(0).clone())
            $("#carousel ul").append($("#carousel ul").find("li").eq(1).clone())
            $("#carousel ul").append($("#carousel ul").find("li").eq(2).clone())
            $("#carousel ul").append($("#carousel ul").find("li").eq(3).clone())
            $("#carousel ul").append($("#carousel ul").find("li").eq(4).clone())
            
            $("#carousel ul").css("width", $("#carousel ul>li").length + "00%");
            let flag = true;
            $(".car .arrow-left").click(function () {
                if (flag) {
                    flag = false;
                    if (count == 0) {
                        count = $("#carousel ul>li").length - 5;
                        $("#carousel ul").css("left", -liWidth * count + "px");
                    }
                    count--;
                    $("#carousel ul").animate({ "left": -liWidth * count }, function () {
                        return flag = true;
                    });
                }
            })
            $(".car .arrow-right").click(function () {
                if (flag) {
                    flag = false;
                    if (count == $("#carousel ul>li").length - 5) {
                        count = 0;
                        $("#carousel ul").css("left", -liWidth * count + "px");
                    }
                    count++;
                    $("#carousel ul").animate({ "left": -liWidth * count }, function () {
                        return flag = true;
                    });
                }
            });
        },
        methods: {
            openSearchPage(desc) {
                this.$router.push({
                    path: 'asset/searchPage/index',
                    query: {
                        desc: desc
                    }
                })
            },
            // 搜索
            queryList(inputValue) {
                // 去除空格
                inputValue = inputValue.replace(/\s*/g,"")  

/*                this.historyTags.unshift(inputValue);
                this.historyTags = Array.from(new Set(this.historyTags))
                localStorage.setItem('historyTags',JSON.stringify(this.historyTags))*/
                this.$router.push({
                    path: 'asset/searchPage/index',query:{searchInput:this.searchInput}
                })
            },
            // 搜索建议
            querySearch(queryString, cb) {
                let suggest = [
                        { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
                        { "value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号" },
                        { "value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113" },
                    ]
                // suggest数据由接口返回
                let results = queryString ? suggest.filter(this.createFilter(queryString)) : suggest;
                // 调用 callback 返回建议列表的数据
                cb(results);
            },
            createFilter(queryString) {
                return (res) => {
                    return (res.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },
            // 搜索建议选中
            handleSelect(item) {
                console.log(item);
                this.queryList(item.value)
            },
            // 绘图
            drawChart() {
                // 饼图
                let pieChartDom = document.getElementById('pieChart');
                let pieChart = this.$echarts.init(pieChartDom);
                let pieChartOption = {
                    title: {
                        text: '资产分类',
                        left: '5%',
                        top: '5%'
                    },
                    tooltip: {
                        trigger: 'item'
                    },
                    legend: {
                        orient: 'vertical',
                        left: '60%',  
                        y: 'center',  
                        formatter: function (name) {
                            let data = pieChartOption.series[0].data
                            let total = 0
                            let tarValue
                            for (let i = 0; i < data.length; i++) {
                            total += data[i].value
                            if (data[i].name == name) {
                                tarValue = data[i].value
                            }
                            }
                            let v = tarValue
                            return `${name}     ${parseInt(v/total*100)} %   `
                        },
                    },
                    series: [
                        {
                            name: '资产分类',
                            type: 'pie',
                            center: ['35%', '50%'],
                            radius: ['30%', '40%'],
                            avoidLabelOverlap: false,
                            label: {
                                show: false,
                                position: 'center',
                                formatter: `{c}资产分类`
                            },
                            emphasis: {
                                label: {
                                show: true,
                                fontSize: '20',
                                fontWeight: 'bold'
                                }
                            },
                            labelLine: {
                                show: false
                            },
                            data: this.pieData
                        }
                    ]
                }

                pieChartOption && pieChart.setOption(pieChartOption);
                // 柱状图
                let barChartDom = document.getElementById('barChart');
                let barChart = this.$echarts.init(barChartDom);
                let barChartOption = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                        type: 'shadow'
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        // bottom: '3%',
                        top: '5%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'value',
                        boundaryGap: [0, 0.01]
                    },
                    yAxis: {
                        type: 'category',
                        data: this.deptData
                    },
                    series: [
                        {
                            name: '资产数',
                            type: 'bar',
                            data: this.barData,
                            itemStyle: {
                                normal: {
                                    color: 'blue'
                                }
                            }
                        },
                    ]
                }

                barChartOption && barChart.setOption(barChartOption);
                // 折线图
                let lineChartDom = document.getElementById('lineChart');
                let lineChart = this.$echarts.init(lineChartDom);
                let lineChartOption = {
                    title: {
                        text: '业务趋势',
                        left: '5%',
                        top: '5%'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        selectedMode: false,
                        data: ['表资产', 'API资产', '目标资产', '标签资产'],
                        top: '5%'
                    },
                    grid: {
                        left: '5%',
                        right: '5%',
                        bottom: '5%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: ['1', '2', '3', '4', '5', '6', '7']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            name: '表资产',
                            type: 'line',
                            stack: 'Total',
                            data: this.firstTableLineData
                        },
                        {
                            name: 'API资产',
                            type: 'line',
                            stack: 'Total',
                            data: this.firstApiLineData
                        },
                        {
                            name: '目标资产',
                            type: 'line',
                            stack: 'Total',
                            data: this.firstTargetLineData
                        },
                        {
                            name: '标签资产',
                            type: 'line',
                            stack: 'Total',
                            data: this.firstLabelLineData
                        },
                    ]
                }

                lineChartOption && lineChart.setOption(lineChartOption);


                // 折线图2
                let smoothLineChartDom = document.getElementById('smoothLineChart');
                let smoothLineChart = this.$echarts.init(smoothLineChartDom);
                let smoothLineChartOption = {
                    title: {
                        text: '资产数据增长情况',
                        left: '5%',
                        top: '5%'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        selectedMode: false,
                        data: ['1部', '2部', '3部', '4部'],
                        top: '5%'
                    },
                    grid: {
                        left: '5%',
                        right: '5%',
                        bottom: '5%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: ['1', '2', '3', '4', '5', '6', '7']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            name: '表资产',
                            type: 'line',
                            smooth: true,
                            stack: 'Total',
                            data: this.secondTableLineData
                        },
                        {
                            name: '指标资产',
                            type: 'line',
                            smooth: true,
                            stack: 'Total',
                            data: this.secondTargetLineData
                        },
                        {
                            name: 'Api资产',
                            type: 'line',
                            smooth: true,
                            stack: 'Total',
                            data: this.secondApiLineData
                        },
                        {
                            name: '标签',
                            type: 'line',
                            smooth: true,
                            stack: 'Total',
                            data: this.secondLabelLineData
                        },
                    ]
                }

                smoothLineChartOption && smoothLineChart.setOption(smoothLineChartOption);
                setTimeout(function () {
                    window.onresize = function () {
                        pieChart.resize();
                        barChart.resize();
                        lineChart.resize();
                        smoothLineChart.resize();
                    }
                }, 200)
            },
        }
    }
</script>
<style lang="scss">
    .panelGroup {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        // 搜索框
        .search {
            display: flex;
            .el-autocomplete {
                .el-input  {
                    width: 515px;
                    height: 40px;
                    .el-input__inner {
                        height: 100%;
                        border-top-left-radius: 20px;
                        border-bottom-left-radius: 20px;
                    }
                    .el-input-group__append {
                        border: none;
                        height: 32px;
                        .el-button {
                            width: 75px;
                            height: 40px;
                            border-top-right-radius: 20px;
                            border-bottom-right-radius: 20px;
                            font-size: 14px;
                            background: #84C22E;
                            color: #fff;
                        }
                    }
                }
            }
        }

        // 按钮
        .btnList {
            margin-top: 24px;
            display: flex;
            justify-content: space-around;
            width: 100%;
            .el-link {
                width: 20%;
                height: 100px;
                border-radius: 16px;
                background: #fff;
                padding: 14px 20px;
                .el-link--inner {
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    .icon {
                        width: 50px;
                        height: 50px;
                        background: rgba(0,0,0,0.04);
                        margin-right: 8px;
                        
                    }
                    .desc {
                        flex: 1;
                        p {
                            margin: 8px 0;
                        }
                        span {
                            font-weight: 700;
                        }
                    }
                }
            }
        }
        // 图表部分
        .details {
            display: flex;
            .chart {
                flex: 1;
                display: flex;
                justify-content: space-between;
                flex-wrap: wrap;
                .chartDom {
                    width: 49%;
                    height: 500px;
                    border-radius: 16px;
                    box-shadow: 0 0 10px #ccc;
                    margin-bottom: 16px;
                    .title {
                        font-family: '黑体';
                        font-size: 20px;
                        font-weight: 700;
                        margin-top: 18px;
                        padding: 0 20px;
                        color: rgba(0,0,0,0.8);
                        display: flex;
                        justify-content: space-between;
                    }
                    .des {
                        display: flex;
                        justify-content: space-around;
                        margin-top: 16px;
                        .box {
                            display: flex;
                            flex-direction: column;
                            color: rgb(0, 187, 255);
                            align-items: center;
                            justify-content: center;
                            background: rgba(0,0,0,0.04);
                            padding: 16px;
                            border-radius: 8px;
                        }
                    }
                    #barChart {
                        width: 100%;
                        height: 350px;
                    }
                }
                .lineChart {
                    width: 58%;
                }
                .pieChart {
                    width: 40%;
                }
            }
            .board {
                width: 200px;
                padding: 8px;
                background: #fff;
                border-radius: 8px;
                margin-left: 8px;
                .title {
                    font-family: '黑体';
                    font-size: 20px;
                    font-weight: 700;
                    color: rgba(0,0,0,0.8);
                    margin: 8px 0;
                }
                .item {
                    margin-top: 8px;
                    padding: 8px;
                    border-radius: 8px;
                    box-shadow: 0 0 10px #ccc;
                    display: flex;
                    align-items: center;
                    .word {
                        width: 90%;
                        p {
                            display: flex;
                            .el-progress {
                                width: 80%;
                                margin-left: 3px;
                                .el-progress-bar {
                                    width: 100%;
                                }
                                .el-progress__text {
                                    width: 0;
                                    display: none;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>

<style>
/* 轮播图 */
.el-carousel {
    margin: 16px 0;
}
.el-carousel__item {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
}
.el-carousel__item .medium {
    /* width: 40%; */
    height: 100%;
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    margin: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.el-carousel__indicators {
    display: none;
}
</style>