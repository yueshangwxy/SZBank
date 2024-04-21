module.exports = [

  // 查询三级目录
  // queryThirdDir: '/PncsServer/asset/homepage/queryThirdDir',
  {
    url: '/PncsServer/asset/homepage/queryThirdDir',
    type: 'post',
    response: () => {
      const data = [
        {
          id: 1,
          name: "业务表数据资产",
        },
        {
          id: 2,
          name: "明细表数据资产",
        },
        {
          id: 3,
          name: "汇总表数据资产",
        },
        {
          id: 4,
          name: "业务个性数据资产",
        },
        {
          id: 5,
          name: "原始指标",
        },
        {
          id: 6,
          name: "衍生指标",
        },
        {
          id: 7,
          name: "衍生指标",
        },
        {
          id: 8,
          name: "个人客户标签",
        },
        {
          id: 9,
          name: "对公客户标签",
        },
        {
          id: 10,
          name: "同业客户标签",
        },
      ]

      return {
        code: 20000,
        resCode: '000000',
        resMsg: 'success',
        data: data,
      }
    }
  },
  // 查询资产数量
  // queryAssetsCount: '/PncsServer/asset/homepage/queryAssetsCount',
  {
    url: '/PncsServer/asset/homepage/queryAssetsCount',
    type: 'get',
    response: () => {
      const data = [
        {
          id: 1,
          name: "表资产",
          count: 503
        },
        {
          id: 2,
          name: "API资产",
          count: 20194
        },
        {
          id: 3,
          name: "指标资产",
          count: 985
        },
        {
          id: 4,
          name: "标签资产",
          count: 1589
        },
      ]

      return {
        code: 20000,
        resCode: '000000',
        resMsg: 'success',
        data: data,
      }
    }
  },
  // 查询部门笔数
  // queryDeptCount: '/PncsServer/asset/homepage/queryDeptCount',
  {
    url: '/PncsServer/asset/homepage/queryDeptCount',
    type: 'get',
    response: () => {
      const data = [
        {
          id: 1,
          deptName: "客户发展部",
          count: 1620,
        },
        {
          id: 2,
          deptName: "公司部",
          count: 1621,
        },
        {
          id: 3,
          deptName: "科技金融部",
          count: 1622,
        },
        {
          id: 4,
          deptName: "网金部",
          count: 1623,
        },
        {
          id: 5,
          deptName: "客户发展部",
          count: 1624,
        },
        {
          id: 6,
          deptName: "客户发展部",
          count: 1625,
        },
        {
          id: 7,
          deptName: "客户发展部",
          count: 1626,
        },
        {
          id: 8,
          deptName: "客户发展部",
          count: 1627,
        },
        {
          id: 9,
          deptName: "客户发展部",
          count: 1628,
        },
        {
          id: 10,
          deptName: "客户发展部",
          count: 1629,
        },
        {
          id: 11,
          deptName: "客户发展部",
          count: 1620,
        },
        {
          id: 12,
          deptName: "客户发展部",
          count: 1620,
        },
        {
          id: 13,
          deptName: "客户发展部",
          count: 1620,
        },
      ]

      return {
        code: 20000,
        resCode: '000000',
        resMsg: 'success',
        data: data,
      }
    }
  },
  // 查询资产分类饼图数据
  // queryPieData: 'PncsServer/asset/homepage/queryPieData',
  {
    url: '/PncsServer/asset/homepage/queryPieData',
    type: 'get',
    response: () => {
      const data = [
        { value: 1048, name: "表资产" },
        { value: 735, name: "API资产" },
        { value: 484, name: "指标资产" },
        { value: 300, name: "标签资产" },
      ]

      return {
        code: 20000,
        resCode: '000000',
        resMsg: 'success',
        data: data,
      }
    }
  },
  // 查询业务趋势折线图数据
  // queryLineData: 'PncsServer/asset/homepage/queryLineData',
  {
    url: '/PncsServer/asset/homepage/queryLineData',
    type: 'get',
    response: () => {
      const data = {
        "month": [
            "11月",
            "12月",
            "1月",
            "2月",
            "3月",
            "4月"
        ],
        "percent": {
            "api": [
                "0.0",
                "0.0",
                "100.0",
                "38.0",
                "43.0",
                "0.0"
            ],
            "label": [
                "0.0",
                "0.0",
                "22.0",
                "56.0",
                "0.0",
                "0.0"
            ],
            "table": [
                "0.0",
                "3.0",
                "0.0",
                "63.0",
                "57.0",
                "0.0"
            ],
            "target": [
                "0.0",
                "45.0",
                "0.0",
                "23.0",
                "0.0",
                "99.0"
            ]
        }
    }

      return {
        code: 20000,
        resCode: '000000',
        resMsg: 'success',
        data: data,
      }
    }
  },
  // 根据部门编号查询机构规模排行数据
  // queryOrganizationScaleRanking: 'PncsServer/asset/homepage/queryOrganizationScaleRanking',
  {
    url: `PncsServer/asset/homepage/queryOrganizationScaleRanking?id=`,
    type: 'get',
    response: () => {
      const data = {
        accountCount: [
          {
            id: 1,
            name: "结算账户数",
            count: 2102734
          },
          {
            id: 2,
            name: "当月开户数",
            count: 1027
          },
          {
            id: 3,
            name: "当月销户数",
            count: 507
          },
        ],
        barData: {
          name: ['外币','外汇','NRA','专用','临时','一般','基本'],
          count: [18203,23489,29034,104970,131744,630230,812416]
        },
        // barData: [
        //   {
        //     name: '外币',
        //     count: 18203
        //   },
        //   {
        //     name: '外汇',
        //     count: 23489
        //   },
        //   {
        //     name: 'NRA',
        //     count: 29034
        //   },
        //   {
        //     name: '专用',
        //     count: 104970
        //   },
        //   {
        //     name: '临时',
        //     count: 131744
        //   },
        //   {
        //     name: '一般',
        //     count: 630230
        //   },
        //   {
        //     name: '基本',
        //     count: 812416
        //   },
        // ]
      }

      return {
        code: 20000,
        resCode: '000000',
        resMsg: 'success',
        data: data,
      }
    }
  },
  // 查询分类账户数
  // queryAccountCount: 'PncsServer/asset/homepage/queryAccountCount',
  {
    url: '/PncsServer/asset/homepage/queryAccountCount',
    type: 'get',
    response: () => {
      const data = [
        {
          id: 1,
          name: "结算账户数",
          count: 2102734
        },
        {
          id: 2,
          name: "当月开户数",
          count: 1027
        },
        {
          id: 3,
          name: "当月销户数",
          count: 507
        },
      ]

      return {
        code: 20000,
        resCode: '000000',
        resMsg: 'success',
        data: data,
      }
    }
  },
  // 查询机构规模排行柱状图数据
  // queryBarData: 'PncsServer/asset/homepage/queryBarData',
  {
    url: '/PncsServer/asset/homepage/queryBarData',
    type: 'get',
    response: () => {
      const data = [
        {
          name: '外币',
          count: 18203
        },
        {
          name: '外汇',
          count: 23489
        },
        {
          name: 'NRA',
          count: 29034
        },
        {
          name: '专用',
          count: 104970
        },
        {
          name: '临时',
          count: 131744
        },
        {
          name: '一般',
          count: 630230
        },
        {
          name: '基本',
          count: 812416
        },

      ]

      return {
        code: 20000,
        resCode: '000000',
        resMsg: 'success',
        data: data,
      }
    }
  },
  // 查询资产数据增长情况多折线图数据
  // queryLinesData: 'PncsServer/asset/homepage/queryLinesData',
  {
    url: '/homepage/queryLinesData',
    type: 'get',
    response: () => {
      const data = {
        monthList: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月",],
        // 网金部
        netGoldDeptList: [53, 60, 50, 30, 28, 32, 33, 52, 50, 49],
        // 零售部
        retailDeptList: [38, 40, 42, 54, 50, 42, 30, 10, 8, 6],
        // 公司部
        companyDeptList: [24, 21, 25, 26, 26, 24, 30, 31, 26, 25],
        // 互金
        mutualGoldList: [10, 11, 13, 15, 18, 20, 22, 22, 29, 32],
      }

      return {
        code: 20000,
        resCode: '000000',
        resMsg: 'success',
        data: data,
      }
    }
  },
  // 查询我的各个资产收藏
  // queryCollection: 'PncsServer/asset/homepage/queryCollection',
  {
    url: '/PncsServer/asset/homepage/queryCollection',
    type: 'get',
    response: () => {
      const data = [
        {
          id: 1,
          name: "表资产",
          count: 23
        },
        {
          id: 2,
          name: "API资产",
          count: 24
        },
        {
          id: 3,
          name: "指标资产",
          count: 25
        },
        {
          id: 4,
          name: "标签资产",
          count: 26
        },
      ]

      return {
        code: 20000,
        resCode: '000000',
        resMsg: 'success',
        data: data,
      }
    }
  },
  // 查询资产数量
  // {
  //   url: '/homePage/countAssets',
  //   type: 'get',
  //   response: () => {
  //     return {
  //       data: {
  //         label: 12345,
  //         target: 23456,
  //         table: 34567,
  //         api: 45678
  //       }
  //     }
  //   }
  // },
  // 查询业务趋势折线图数据
  {
    url: '/homePage/getBusinessTrendLineData',
    type: 'get',
    response: () => {
      return {
        "month": [
            "11月",
            "12月",
            "1月",
            "2月",
            "3月",
            "4月"
        ],
        "percent": {
            "api": [
                "0.0",
                "0.0",
                "100.0",
                "38.0",
                "43.0",
                "0.0"
            ],
            "label": [
                "0.0",
                "0.0",
                "0.0",
                "0.0",
                "0.0",
                "0.0"
            ],
            "table": [
                "0.0",
                "0.0",
                "0.0",
                "63.0",
                "57.0",
                "0.0"
            ],
            "target": [
                "0.0",
                "0.0",
                "0.0",
                "0.0",
                "0.0",
                "99.0"
            ]
        }
      }
    }
  },
  // 查询资产数据增长情况多折线图数据
  {
    url: '/homePage/queryLinesData',
    type: 'get',
    response: () => {
        const data = {
          monthRange: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月",],
          series: {
            dept1: [123,234,345,456,567,789,899],
            dept2: [899,234,567,456,333,234,811],
            dept3: [789,234,345,234,111,555,844],
            dept4: [234,435,345,343,222,666,999],
          },
          // 网金部
          netGoldDeptList: [53, 60, 50, 30, 28, 32, 33, 52, 50, 49],
          // 零售部
          retailDeptList: [38, 40, 42, 54, 50, 42, 30, 10, 8, 6],
          // 公司部
          companyDeptList: [24, 21, 25, 26, 26, 24, 30, 31, 26, 25],
          // 互金
          mutualGoldList: [10, 11, 13, 15, 18, 20, 22, 22, 29, 32],
        }
        return {
          code: 20000,
          resCode: '000000',
          resMsg: 'success',
          data: data,
        }
      }
  },
  // 查询部门笔数
  {
    url: '/homePage/countAssetsByDept',
    type: 'get',
    response: () => {
      return [
        {
          deptName: 'dept1',
          deptCode: '001',
          num: 1000,
        },
        {
          deptName: 'dept2',
          deptCode: '002',
          num: 2000,
        },
        {
          deptName: 'depxxxxxxxxxxxxxxxxt3',
          deptCode: '003',
          num: 3000,
        },
        {
          deptName: 'dept4',
          deptCode: '004',
          num: 4000,
        },
        {
          deptName: 'dept5',
          deptCode: '005',
          num: 5000,
        },
        {
          deptName: 'dept6',
          deptCode: '006',
          num: 6000,
        },
        {
          deptName: 'dept7',
          deptCode: '007',
          num: 7000,
        },
      ]
    }
  },
  // 查询我的各个资产收藏
  {
    url: '/assets/favorite/count',
    type: 'get',
    response: () => {
      return {
        data: [
            {
              id: 1,
              name: "表资产",
              count: 23,
            },
            {
              id: 2,
              name: "API资产",
              count: 23,
            },
            {
              id: 3,
              name: "指标资产",
              count: 23,
            },
            {
              id: 4,
              name: "标签资产",
              count: 23,
            },
          ]
      }
    }
  },
  // 查询机构规模排行柱状图数据
  {
    url: '/homePage/queryDeptRankList',
    type: 'get',
    response: () => {
      return {
        data: [],
        accountCount: [
            {
              id: 1,
              name: "结算账户数结算账户数",
              count: 2102734,
            },
            {
              id: 2,
              name: "当月开户数结算账户数",
              count: 1026,
            },
            {
              id: 3,
              name: "当月销户数结算账户数",
              count: 507,
            },
        ],
        barData: {
          name: ['name1','name2','name3','name4','name5','name6','name7'],
          count: [1234,2345,3456,4567,5678,6789,7890]
        }
      }
    }
  },
  {
    url: '/assets/catalogue/getCatalogueTreeSort',
    type: 'get',
    response: () => {
      return {"code":0,"msg":"成功","data":[{"id":"1","contentsId":"1","pid":"0","name":"公司银行","level":"1","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":[{"id":"6","contentsId":"6","pid":"1","name":"对公贷款对公贷款","level":"2","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":[{"id":"300","contentsId":"300","pid":"6","name":"其它1","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"352","contentsId":"352","pid":"6","name":"测试2","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"353","contentsId":"353","pid":"6","name":"业务表数据资产(STD)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"354","contentsId":"354","pid":"6","name":"明细表数据资产(DWD)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"355","contentsId":"355","pid":"6","name":"汇总表数据资产(DWS)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"356","contentsId":"356","pid":"6","name":"业务个性数据资产(ADM)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"357","contentsId":"357","pid":"6","name":"原始指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"358","contentsId":"358","pid":"6","name":"衍生指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"359","contentsId":"359","pid":"6","name":"基础指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"360","contentsId":"360","pid":"6","name":"个人客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"361","contentsId":"361","pid":"6","name":"对公客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"362","contentsId":"362","pid":"6","name":"同业客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null}],"assetNum":14},{"id":"10","contentsId":"10","pid":"1","name":"对公存款","level":"2","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":[{"id":"304","contentsId":"304","pid":"10","name":"其它5","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"393","contentsId":"393","pid":"10","name":"业务表数据资产(STD)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"394","contentsId":"394","pid":"10","name":"明细表数据资产(DWD)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"395","contentsId":"395","pid":"10","name":"汇总表数据资产(DWS)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"396","contentsId":"396","pid":"10","name":"业务个性数据资产(ADM)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"397","contentsId":"397","pid":"10","name":"原始指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"398","contentsId":"398","pid":"10","name":"衍生指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"399","contentsId":"399","pid":"10","name":"基础指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"400","contentsId":"400","pid":"10","name":"个人客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"401","contentsId":"401","pid":"10","name":"对公客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"402","contentsId":"402","pid":"10","name":"同业客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null}],"assetNum":3},{"id":"7","contentsId":"7","pid":"1","name":"理财","level":"2","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":[{"id":"301","contentsId":"301","pid":"7","name":"其它2","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"363","contentsId":"363","pid":"7","name":"业务表数据资产(STD)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"364","contentsId":"364","pid":"7","name":"明细表数据资产(DWD)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"365","contentsId":"365","pid":"7","name":"汇总表数据资产(DWS)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"366","contentsId":"366","pid":"7","name":"业务个性数据资产(ADM)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"367","contentsId":"367","pid":"7","name":"原始指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"368","contentsId":"368","pid":"7","name":"衍生指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"369","contentsId":"369","pid":"7","name":"基础指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"370","contentsId":"370","pid":"7","name":"个人客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"371","contentsId":"371","pid":"7","name":"对公客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"372","contentsId":"372","pid":"7","name":"同业客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null}],"assetNum":1},{"id":"8","contentsId":"8","pid":"1","name":"对公客户","level":"2","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":[{"id":"302","contentsId":"302","pid":"8","name":"其它3","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"373","contentsId":"373","pid":"8","name":"业务表数据资产(STD)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"374","contentsId":"374","pid":"8","name":"明细表数据资产(DWD)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"375","contentsId":"375","pid":"8","name":"汇总表数据资产(DWS)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"376","contentsId":"376","pid":"8","name":"业务个性数据资产(ADM)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"377","contentsId":"377","pid":"8","name":"原始指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"378","contentsId":"378","pid":"8","name":"衍生指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"379","contentsId":"379","pid":"8","name":"基础指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"380","contentsId":"380","pid":"8","name":"个人客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"381","contentsId":"381","pid":"8","name":"对公客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"382","contentsId":"382","pid":"8","name":"同业客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null}],"assetNum":1},{"id":"9","contentsId":"9","pid":"1","name":"进出口类","level":"2","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":[{"id":"303","contentsId":"303","pid":"9","name":"其它4","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"383","contentsId":"383","pid":"9","name":"业务表数据资产(STD)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"384","contentsId":"384","pid":"9","name":"明细表数据资产(DWD)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"385","contentsId":"385","pid":"9","name":"汇总表数据资产(DWS)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"386","contentsId":"386","pid":"9","name":"业务个性数据资产(ADM)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"387","contentsId":"387","pid":"9","name":"原始指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"388","contentsId":"388","pid":"9","name":"衍生指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"389","contentsId":"389","pid":"9","name":"基础指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"390","contentsId":"390","pid":"9","name":"个人客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"391","contentsId":"391","pid":"9","name":"对公客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"392","contentsId":"392","pid":"9","name":"同业客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null}],"assetNum":1},{"id":"11","contentsId":"11","pid":"1","name":"信用证","level":"2","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":[{"id":"305","contentsId":"305","pid":"11","name":"其它6","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"403","contentsId":"403","pid":"11","name":"业务表数据资产(STD)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"404","contentsId":"404","pid":"11","name":"明细表数据资产(DWD)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"405","contentsId":"405","pid":"11","name":"汇总表数据资产(DWS)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"406","contentsId":"406","pid":"11","name":"业务个性数据资产(ADM)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"407","contentsId":"407","pid":"11","name":"原始指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"408","contentsId":"408","pid":"11","name":"衍生指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"409","contentsId":"409","pid":"11","name":"基础指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"410","contentsId":"410","pid":"11","name":"个人客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"411","contentsId":"411","pid":"11","name":"对公客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"412","contentsId":"412","pid":"11","name":"同业客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null}],"assetNum":1},{"id":"12","contentsId":"12","pid":"1","name":"保函","level":"2","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":[{"id":"306","contentsId":"306","pid":"12","name":"其它7","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"413","contentsId":"413","pid":"12","name":"业务表数据资产(STD)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"414","contentsId":"414","pid":"12","name":"明细表数据资产(DWD)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"415","contentsId":"415","pid":"12","name":"汇总表数据资产(DWS)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"416","contentsId":"416","pid":"12","name":"业务个性数据资产(ADM)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"417","contentsId":"417","pid":"12","name":"原始指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"418","contentsId":"418","pid":"12","name":"衍生指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"419","contentsId":"419","pid":"12","name":"基础指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"420","contentsId":"420","pid":"12","name":"个人客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"421","contentsId":"421","pid":"12","name":"对公客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"422","contentsId":"422","pid":"12","name":"同业客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null}],"assetNum":1},{"id":"13","contentsId":"13","pid":"1","name":"银行本汇票","level":"2","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":[{"id":"307","contentsId":"307","pid":"13","name":"其它","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"423","contentsId":"423","pid":"13","name":"业务表数据资产(STD)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"424","contentsId":"424","pid":"13","name":"明细表数据资产(DWD)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"425","contentsId":"425","pid":"13","name":"汇总表数据资产(DWS)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"426","contentsId":"426","pid":"13","name":"业务个性数据资产(ADM)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"427","contentsId":"427","pid":"13","name":"原始指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"428","contentsId":"428","pid":"13","name":"衍生指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"429","contentsId":"429","pid":"13","name":"基础指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"430","contentsId":"430","pid":"13","name":"个人客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"431","contentsId":"431","pid":"13","name":"对公客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"432","contentsId":"432","pid":"13","name":"同业客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null}],"assetNum":1},{"id":"14","contentsId":"14","pid":"1","name":"商业汇票","level":"2","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":[{"id":"308","contentsId":"308","pid":"14","name":"其它","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"433","contentsId":"433","pid":"14","name":"业务表数据资产(STD)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"434","contentsId":"434","pid":"14","name":"明细表数据资产(DWD)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"435","contentsId":"435","pid":"14","name":"汇总表数据资产(DWS)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"436","contentsId":"436","pid":"14","name":"业务个性数据资产(ADM)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"437","contentsId":"437","pid":"14","name":"原始指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"438","contentsId":"438","pid":"14","name":"衍生指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"439","contentsId":"439","pid":"14","name":"基础指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"440","contentsId":"440","pid":"14","name":"个人客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"441","contentsId":"441","pid":"14","name":"对公客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"442","contentsId":"442","pid":"14","name":"同业客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null}],"assetNum":1},{"id":"15","contentsId":"15","pid":"1","name":"代发代扣","level":"2","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":[{"id":"309","contentsId":"309","pid":"15","name":"其它","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"443","contentsId":"443","pid":"15","name":"业务表数据资产(STD)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"444","contentsId":"444","pid":"15","name":"明细表数据资产(DWD)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"445","contentsId":"445","pid":"15","name":"汇总表数据资产(DWS)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"446","contentsId":"446","pid":"15","name":"业务个性数据资产(ADM)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"447","contentsId":"447","pid":"15","name":"原始指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"448","contentsId":"448","pid":"15","name":"衍生指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"449","contentsId":"449","pid":"15","name":"基础指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"450","contentsId":"450","pid":"15","name":"个人客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"451","contentsId":"451","pid":"15","name":"对公客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"452","contentsId":"452","pid":"15","name":"同业客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null}],"assetNum":1},{"id":"16","contentsId":"16","pid":"1","name":"代收代付","level":"2","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":[{"id":"310","contentsId":"310","pid":"16","name":"其它","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"453","contentsId":"453","pid":"16","name":"业务表数据资产(STD)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"454","contentsId":"454","pid":"16","name":"明细表数据资产(DWD)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"455","contentsId":"455","pid":"16","name":"汇总表数据资产(DWS)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"456","contentsId":"456","pid":"16","name":"业务个性数据资产(ADM)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"457","contentsId":"457","pid":"16","name":"原始指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"458","contentsId":"458","pid":"16","name":"衍生指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"459","contentsId":"459","pid":"16","name":"基础指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"460","contentsId":"460","pid":"16","name":"个人客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"461","contentsId":"461","pid":"16","name":"对公客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"462","contentsId":"462","pid":"16","name":"同业客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null}],"assetNum":0}],"assetNum":null},{"id":"2","contentsId":"2","pid":"0","name":"数字银行","level":"1","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":[{"id":"17","contentsId":"17","pid":"2","name":"个人客户 ","level":"2","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":[{"id":"311","contentsId":"311","pid":"17","name":"其它","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"463","contentsId":"463","pid":"17","name":"业务表数据资产(STD)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"464","contentsId":"464","pid":"17","name":"明细表数据资产(DWD)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"465","contentsId":"465","pid":"17","name":"汇总表数据资产(DWS)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"466","contentsId":"466","pid":"17","name":"业务个性数据资产(ADM)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"467","contentsId":"467","pid":"17","name":"原始指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"468","contentsId":"468","pid":"17","name":"衍生指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"469","contentsId":"469","pid":"17","name":"基础指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"470","contentsId":"470","pid":"17","name":"个人客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"471","contentsId":"471","pid":"17","name":"对公客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"472","contentsId":"472","pid":"17","name":"同业客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null}],"assetNum":3},{"id":"18","contentsId":"18","pid":"2","name":"个人存款","level":"2","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":[{"id":"312","contentsId":"312","pid":"18","name":"其它","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"473","contentsId":"473","pid":"18","name":"业务表数据资产(STD)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"474","contentsId":"474","pid":"18","name":"明细表数据资产(DWD)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"475","contentsId":"475","pid":"18","name":"汇总表数据资产(DWS)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"476","contentsId":"476","pid":"18","name":"业务个性数据资产(ADM)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"477","contentsId":"477","pid":"18","name":"原始指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"478","contentsId":"478","pid":"18","name":"衍生指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"479","contentsId":"479","pid":"18","name":"基础指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"480","contentsId":"480","pid":"18","name":"个人客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"481","contentsId":"481","pid":"18","name":"对公客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"482","contentsId":"482","pid":"18","name":"同业客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null}],"assetNum":3},{"id":"25","contentsId":"25","pid":"2","name":"统一支付","level":"2","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":[{"id":"319","contentsId":"319","pid":"25","name":"其它","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"543","contentsId":"543","pid":"25","name":"业务表数据资产(STD)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"544","contentsId":"544","pid":"25","name":"明细表数据资产(DWD)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"545","contentsId":"545","pid":"25","name":"汇总表数据资产(DWS)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"546","contentsId":"546","pid":"25","name":"业务个性数据资产(ADM)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"547","contentsId":"547","pid":"25","name":"原始指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"548","contentsId":"548","pid":"25","name":"衍生指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"549","contentsId":"549","pid":"25","name":"基础指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"550","contentsId":"550","pid":"25","name":"个人客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"551","contentsId":"551","pid":"25","name":"对公客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"552","contentsId":"552","pid":"25","name":"同业客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null}],"assetNum":2},{"id":"19","contentsId":"19","pid":"2","name":"个人贷款","level":"2","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":[{"id":"313","contentsId":"313","pid":"19","name":"其它","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"483","contentsId":"483","pid":"19","name":"业务表数据资产(STD)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"484","contentsId":"484","pid":"19","name":"明细表数据资产(DWD)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"485","contentsId":"485","pid":"19","name":"汇总表数据资产(DWS)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"486","contentsId":"486","pid":"19","name":"业务个性数据资产(ADM)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"487","contentsId":"487","pid":"19","name":"原始指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"488","contentsId":"488","pid":"19","name":"衍生指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"489","contentsId":"489","pid":"19","name":"基础指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"490","contentsId":"490","pid":"19","name":"个人客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"491","contentsId":"491","pid":"19","name":"对公客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"492","contentsId":"492","pid":"19","name":"同业客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null}],"assetNum":1},{"id":"20","contentsId":"20","pid":"2","name":"网贷","level":"2","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":[{"id":"314","contentsId":"314","pid":"20","name":"其它","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"493","contentsId":"493","pid":"20","name":"业务表数据资产(STD)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"494","contentsId":"494","pid":"20","name":"明细表数据资产(DWD)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"495","contentsId":"495","pid":"20","name":"汇总表数据资产(DWS)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"496","contentsId":"496","pid":"20","name":"业务个性数据资产(ADM)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"497","contentsId":"497","pid":"20","name":"原始指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"498","contentsId":"498","pid":"20","name":"衍生指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"499","contentsId":"499","pid":"20","name":"基础指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"500","contentsId":"500","pid":"20","name":"个人客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"501","contentsId":"501","pid":"20","name":"对公客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"502","contentsId":"502","pid":"20","name":"同业客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null}],"assetNum":1},{"id":"21","contentsId":"21","pid":"2","name":"借记卡","level":"2","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":[{"id":"315","contentsId":"315","pid":"21","name":"其它","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"503","contentsId":"503","pid":"21","name":"业务表数据资产(STD)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"504","contentsId":"504","pid":"21","name":"明细表数据资产(DWD)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"505","contentsId":"505","pid":"21","name":"汇总表数据资产(DWS)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"506","contentsId":"506","pid":"21","name":"业务个性数据资产(ADM)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"507","contentsId":"507","pid":"21","name":"原始指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"508","contentsId":"508","pid":"21","name":"衍生指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"509","contentsId":"509","pid":"21","name":"基础指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"510","contentsId":"510","pid":"21","name":"个人客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"511","contentsId":"511","pid":"21","name":"对公客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"512","contentsId":"512","pid":"21","name":"同业客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null}],"assetNum":1},{"id":"22","contentsId":"22","pid":"2","name":"信用卡","level":"2","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":[{"id":"316","contentsId":"316","pid":"22","name":"其它","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"513","contentsId":"513","pid":"22","name":"业务表数据资产(STD)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"514","contentsId":"514","pid":"22","name":"明细表数据资产(DWD)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"515","contentsId":"515","pid":"22","name":"汇总表数据资产(DWS)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"516","contentsId":"516","pid":"22","name":"业务个性数据资产(ADM)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"517","contentsId":"517","pid":"22","name":"原始指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"518","contentsId":"518","pid":"22","name":"衍生指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"519","contentsId":"519","pid":"22","name":"基础指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"520","contentsId":"520","pid":"22","name":"个人客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"521","contentsId":"521","pid":"22","name":"对公客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"522","contentsId":"522","pid":"22","name":"同业客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null}],"assetNum":1},{"id":"23","contentsId":"23","pid":"2","name":"理财","level":"2","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":[{"id":"317","contentsId":"317","pid":"23","name":"其它","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"523","contentsId":"523","pid":"23","name":"业务表数据资产(STD)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"524","contentsId":"524","pid":"23","name":"明细表数据资产(DWD)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"525","contentsId":"525","pid":"23","name":"汇总表数据资产(DWS)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"526","contentsId":"526","pid":"23","name":"业务个性数据资产(ADM)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"527","contentsId":"527","pid":"23","name":"原始指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"528","contentsId":"528","pid":"23","name":"衍生指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"529","contentsId":"529","pid":"23","name":"基础指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"530","contentsId":"530","pid":"23","name":"个人客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"531","contentsId":"531","pid":"23","name":"对公客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"532","contentsId":"532","pid":"23","name":"同业客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null}],"assetNum":1},{"id":"24","contentsId":"24","pid":"2","name":"基金","level":"2","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":[{"id":"318","contentsId":"318","pid":"24","name":"其它","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"533","contentsId":"533","pid":"24","name":"业务表数据资产(STD)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"534","contentsId":"534","pid":"24","name":"明细表数据资产(DWD)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"535","contentsId":"535","pid":"24","name":"汇总表数据资产(DWS)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"536","contentsId":"536","pid":"24","name":"业务个性数据资产(ADM)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"537","contentsId":"537","pid":"24","name":"原始指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"538","contentsId":"538","pid":"24","name":"衍生指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"539","contentsId":"539","pid":"24","name":"基础指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"540","contentsId":"540","pid":"24","name":"个人客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"541","contentsId":"541","pid":"24","name":"对公客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"542","contentsId":"542","pid":"24","name":"同业客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null}],"assetNum":1},{"id":"26","contentsId":"26","pid":"2","name":"电子渠道","level":"2","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":[{"id":"320","contentsId":"320","pid":"26","name":"其它","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"553","contentsId":"553","pid":"26","name":"业务表数据资产(STD)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"554","contentsId":"554","pid":"26","name":"明细表数据资产(DWD)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"555","contentsId":"555","pid":"26","name":"汇总表数据资产(DWS)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"556","contentsId":"556","pid":"26","name":"业务个性数据资产(ADM)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"557","contentsId":"557","pid":"26","name":"原始指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"558","contentsId":"558","pid":"26","name":"衍生指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"559","contentsId":"559","pid":"26","name":"基础指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"560","contentsId":"560","pid":"26","name":"个人客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"561","contentsId":"561","pid":"26","name":"对公客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"562","contentsId":"562","pid":"26","name":"同业客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null}],"assetNum":1},{"id":"27","contentsId":"27","pid":"2","name":"线下渠道","level":"2","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":[{"id":"321","contentsId":"321","pid":"27","name":"其它","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"563","contentsId":"563","pid":"27","name":"业务表数据资产(STD)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"564","contentsId":"564","pid":"27","name":"明细表数据资产(DWD)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"565","contentsId":"565","pid":"27","name":"汇总表数据资产(DWS)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"566","contentsId":"566","pid":"27","name":"业务个性数据资产(ADM)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"567","contentsId":"567","pid":"27","name":"原始指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"568","contentsId":"568","pid":"27","name":"衍生指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"569","contentsId":"569","pid":"27","name":"基础指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"570","contentsId":"570","pid":"27","name":"个人客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"571","contentsId":"571","pid":"27","name":"对公客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"572","contentsId":"572","pid":"27","name":"同业客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null}],"assetNum":0},{"id":"28","contentsId":"28","pid":"2","name":"代发代扣","level":"2","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":[{"id":"322","contentsId":"322","pid":"28","name":"其它","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"573","contentsId":"573","pid":"28","name":"业务表数据资产(STD)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"574","contentsId":"574","pid":"28","name":"明细表数据资产(DWD)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"575","contentsId":"575","pid":"28","name":"汇总表数据资产(DWS)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"576","contentsId":"576","pid":"28","name":"业务个性数据资产(ADM)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"577","contentsId":"577","pid":"28","name":"原始指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"578","contentsId":"578","pid":"28","name":"衍生指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"579","contentsId":"579","pid":"28","name":"基础指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"580","contentsId":"580","pid":"28","name":"个人客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"581","contentsId":"581","pid":"28","name":"对公客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"582","contentsId":"582","pid":"28","name":"同业客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null}],"assetNum":0}],"assetNum":null},{"id":"3","contentsId":"3","pid":"0","name":"公共类","level":"1","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":[{"id":"30","contentsId":"30","pid":"3","name":"渠道属性","level":"2","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":[{"id":"324","contentsId":"324","pid":"30","name":"其它","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"593","contentsId":"593","pid":"30","name":"业务表数据资产(STD)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"594","contentsId":"594","pid":"30","name":"明细表数据资产(DWD)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"595","contentsId":"595","pid":"30","name":"汇总表数据资产(DWS)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"596","contentsId":"596","pid":"30","name":"业务个性数据资产(ADM)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"597","contentsId":"597","pid":"30","name":"原始指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"598","contentsId":"598","pid":"30","name":"衍生指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"599","contentsId":"599","pid":"30","name":"基础指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"600","contentsId":"600","pid":"30","name":"个人客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"601","contentsId":"601","pid":"30","name":"对公客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"602","contentsId":"602","pid":"30","name":"同业客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null}],"assetNum":1},{"id":"33","contentsId":"33","pid":"3","name":"科技属性","level":"2","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":[{"id":"327","contentsId":"327","pid":"33","name":"其它","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"623","contentsId":"623","pid":"33","name":"业务表数据资产(STD)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"624","contentsId":"624","pid":"33","name":"明细表数据资产(DWD)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"625","contentsId":"625","pid":"33","name":"汇总表数据资产(DWS)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"626","contentsId":"626","pid":"33","name":"业务个性数据资产(ADM)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"627","contentsId":"627","pid":"33","name":"原始指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"628","contentsId":"628","pid":"33","name":"衍生指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"629","contentsId":"629","pid":"33","name":"基础指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"630","contentsId":"630","pid":"33","name":"个人客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"631","contentsId":"631","pid":"33","name":"对公客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"632","contentsId":"632","pid":"33","name":"同业客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null}],"assetNum":1},{"id":"29","contentsId":"29","pid":"3","name":"员工属性 ","level":"2","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":[{"id":"323","contentsId":"323","pid":"29","name":"其它","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"583","contentsId":"583","pid":"29","name":"业务表数据资产(STD)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"584","contentsId":"584","pid":"29","name":"明细表数据资产(DWD)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"585","contentsId":"585","pid":"29","name":"汇总表数据资产(DWS)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"586","contentsId":"586","pid":"29","name":"业务个性数据资产(ADM)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"587","contentsId":"587","pid":"29","name":"原始指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"588","contentsId":"588","pid":"29","name":"衍生指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"589","contentsId":"589","pid":"29","name":"基础指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"590","contentsId":"590","pid":"29","name":"个人客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"591","contentsId":"591","pid":"29","name":"对公客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"592","contentsId":"592","pid":"29","name":"同业客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null}],"assetNum":0},{"id":"31","contentsId":"31","pid":"3","name":"机构属性","level":"2","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":[{"id":"325","contentsId":"325","pid":"31","name":"其它","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"603","contentsId":"603","pid":"31","name":"业务表数据资产(STD)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"604","contentsId":"604","pid":"31","name":"明细表数据资产(DWD)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"605","contentsId":"605","pid":"31","name":"汇总表数据资产(DWS)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"606","contentsId":"606","pid":"31","name":"业务个性数据资产(ADM)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"607","contentsId":"607","pid":"31","name":"原始指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"608","contentsId":"608","pid":"31","name":"衍生指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"609","contentsId":"609","pid":"31","name":"基础指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"610","contentsId":"610","pid":"31","name":"个人客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"611","contentsId":"611","pid":"31","name":"对公客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"612","contentsId":"612","pid":"31","name":"同业客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null}],"assetNum":0},{"id":"32","contentsId":"32","pid":"3","name":"科目属性","level":"2","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":[{"id":"326","contentsId":"326","pid":"32","name":"其它","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"613","contentsId":"613","pid":"32","name":"业务表数据资产(STD)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"614","contentsId":"614","pid":"32","name":"明细表数据资产(DWD)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"615","contentsId":"615","pid":"32","name":"汇总表数据资产(DWS)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"616","contentsId":"616","pid":"32","name":"业务个性数据资产(ADM)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"617","contentsId":"617","pid":"32","name":"原始指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"618","contentsId":"618","pid":"32","name":"衍生指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"619","contentsId":"619","pid":"32","name":"基础指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"620","contentsId":"620","pid":"32","name":"个人客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"621","contentsId":"621","pid":"32","name":"对公客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"622","contentsId":"622","pid":"32","name":"同业客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null}],"assetNum":0}],"assetNum":null},{"id":"4","contentsId":"4","pid":"0","name":"零售银行","level":"1","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":[{"id":"37","contentsId":"37","pid":"4","name":"存折","level":"2","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":[{"id":"331","contentsId":"331","pid":"37","name":"三级目录","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"663","contentsId":"663","pid":"37","name":"业务表数据资产(STD)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"664","contentsId":"664","pid":"37","name":"明细表数据资产(DWD)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"665","contentsId":"665","pid":"37","name":"汇总表数据资产(DWS)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"666","contentsId":"666","pid":"37","name":"业务个性数据资产(ADM)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"667","contentsId":"667","pid":"37","name":"原始指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"668","contentsId":"668","pid":"37","name":"衍生指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"669","contentsId":"669","pid":"37","name":"基础指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"670","contentsId":"670","pid":"37","name":"个人客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"671","contentsId":"671","pid":"37","name":"对公客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"672","contentsId":"672","pid":"37","name":"同业客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null}],"assetNum":1},{"id":"34","contentsId":"34","pid":"4","name":"个人存款 ","level":"2","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":[{"id":"328","contentsId":"328","pid":"34","name":"其它","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"633","contentsId":"633","pid":"34","name":"业务表数据资产(STD)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"634","contentsId":"634","pid":"34","name":"明细表数据资产(DWD)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"635","contentsId":"635","pid":"34","name":"汇总表数据资产(DWS)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"636","contentsId":"636","pid":"34","name":"业务个性数据资产(ADM)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"637","contentsId":"637","pid":"34","name":"原始指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"638","contentsId":"638","pid":"34","name":"衍生指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"639","contentsId":"639","pid":"34","name":"基础指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"640","contentsId":"640","pid":"34","name":"个人客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"641","contentsId":"641","pid":"34","name":"对公客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"642","contentsId":"642","pid":"34","name":"同业客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null}],"assetNum":0},{"id":"35","contentsId":"35","pid":"4","name":"个人贷款","level":"2","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":[{"id":"329","contentsId":"329","pid":"35","name":"其它","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"643","contentsId":"643","pid":"35","name":"业务表数据资产(STD)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"644","contentsId":"644","pid":"35","name":"明细表数据资产(DWD)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"645","contentsId":"645","pid":"35","name":"汇总表数据资产(DWS)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"646","contentsId":"646","pid":"35","name":"业务个性数据资产(ADM)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"647","contentsId":"647","pid":"35","name":"原始指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"648","contentsId":"648","pid":"35","name":"衍生指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"649","contentsId":"649","pid":"35","name":"基础指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"650","contentsId":"650","pid":"35","name":"个人客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"651","contentsId":"651","pid":"35","name":"对公客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"652","contentsId":"652","pid":"35","name":"同业客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null}],"assetNum":0},{"id":"36","contentsId":"36","pid":"4","name":"网贷","level":"2","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":[{"id":"330","contentsId":"330","pid":"36","name":"其它","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"653","contentsId":"653","pid":"36","name":"业务表数据资产(STD)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"654","contentsId":"654","pid":"36","name":"明细表数据资产(DWD)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"655","contentsId":"655","pid":"36","name":"汇总表数据资产(DWS)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"656","contentsId":"656","pid":"36","name":"业务个性数据资产(ADM)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"657","contentsId":"657","pid":"36","name":"原始指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"658","contentsId":"658","pid":"36","name":"衍生指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"659","contentsId":"659","pid":"36","name":"基础指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"660","contentsId":"660","pid":"36","name":"个人客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"661","contentsId":"661","pid":"36","name":"对公客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"662","contentsId":"662","pid":"36","name":"同业客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null}],"assetNum":0},{"id":"38","contentsId":"38","pid":"4","name":"借记卡","level":"2","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":[{"id":"332","contentsId":"332","pid":"38","name":"其它","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"673","contentsId":"673","pid":"38","name":"业务表数据资产(STD)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"674","contentsId":"674","pid":"38","name":"明细表数据资产(DWD)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"675","contentsId":"675","pid":"38","name":"汇总表数据资产(DWS)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"676","contentsId":"676","pid":"38","name":"业务个性数据资产(ADM)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"677","contentsId":"677","pid":"38","name":"原始指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"678","contentsId":"678","pid":"38","name":"衍生指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"679","contentsId":"679","pid":"38","name":"基础指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"680","contentsId":"680","pid":"38","name":"个人客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"681","contentsId":"681","pid":"38","name":"对公客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"682","contentsId":"682","pid":"38","name":"同业客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null}],"assetNum":0},{"id":"39","contentsId":"39","pid":"4","name":"信用卡","level":"2","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":[{"id":"333","contentsId":"333","pid":"39","name":"其它","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"683","contentsId":"683","pid":"39","name":"业务表数据资产(STD)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"684","contentsId":"684","pid":"39","name":"明细表数据资产(DWD)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"685","contentsId":"685","pid":"39","name":"汇总表数据资产(DWS)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"686","contentsId":"686","pid":"39","name":"业务个性数据资产(ADM)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"687","contentsId":"687","pid":"39","name":"原始指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"688","contentsId":"688","pid":"39","name":"衍生指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"689","contentsId":"689","pid":"39","name":"基础指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"690","contentsId":"690","pid":"39","name":"个人客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"691","contentsId":"691","pid":"39","name":"对公客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"692","contentsId":"692","pid":"39","name":"同业客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null}],"assetNum":0},{"id":"40","contentsId":"40","pid":"4","name":"个人客户","level":"2","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":[{"id":"334","contentsId":"334","pid":"40","name":"其它","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"693","contentsId":"693","pid":"40","name":"业务表数据资产(STD)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"694","contentsId":"694","pid":"40","name":"明细表数据资产(DWD)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"695","contentsId":"695","pid":"40","name":"汇总表数据资产(DWS)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"696","contentsId":"696","pid":"40","name":"业务个性数据资产(ADM)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"697","contentsId":"697","pid":"40","name":"原始指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"698","contentsId":"698","pid":"40","name":"衍生指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"699","contentsId":"699","pid":"40","name":"基础指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"700","contentsId":"700","pid":"40","name":"个人客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"701","contentsId":"701","pid":"40","name":"对公客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"702","contentsId":"702","pid":"40","name":"同业客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null}],"assetNum":0},{"id":"41","contentsId":"41","pid":"4","name":"理财","level":"2","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":[{"id":"335","contentsId":"335","pid":"41","name":"其它","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"703","contentsId":"703","pid":"41","name":"业务表数据资产(STD)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"704","contentsId":"704","pid":"41","name":"明细表数据资产(DWD)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"705","contentsId":"705","pid":"41","name":"汇总表数据资产(DWS)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"706","contentsId":"706","pid":"41","name":"业务个性数据资产(ADM)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"707","contentsId":"707","pid":"41","name":"原始指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"708","contentsId":"708","pid":"41","name":"衍生指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"709","contentsId":"709","pid":"41","name":"基础指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"710","contentsId":"710","pid":"41","name":"个人客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"711","contentsId":"711","pid":"41","name":"对公客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"712","contentsId":"712","pid":"41","name":"同业客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null}],"assetNum":0},{"id":"42","contentsId":"42","pid":"4","name":"基金","level":"2","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":[{"id":"336","contentsId":"336","pid":"42","name":"其它","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"713","contentsId":"713","pid":"42","name":"业务表数据资产(STD)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"714","contentsId":"714","pid":"42","name":"明细表数据资产(DWD)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"715","contentsId":"715","pid":"42","name":"汇总表数据资产(DWS)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"716","contentsId":"716","pid":"42","name":"业务个性数据资产(ADM)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"717","contentsId":"717","pid":"42","name":"原始指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"718","contentsId":"718","pid":"42","name":"衍生指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"719","contentsId":"719","pid":"42","name":"基础指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"720","contentsId":"720","pid":"42","name":"个人客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"721","contentsId":"721","pid":"42","name":"对公客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"722","contentsId":"722","pid":"42","name":"同业客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null}],"assetNum":0},{"id":"43","contentsId":"43","pid":"4","name":"保险","level":"2","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":[{"id":"337","contentsId":"337","pid":"43","name":"其它","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"723","contentsId":"723","pid":"43","name":"业务表数据资产(STD)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"724","contentsId":"724","pid":"43","name":"明细表数据资产(DWD)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"725","contentsId":"725","pid":"43","name":"汇总表数据资产(DWS)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"726","contentsId":"726","pid":"43","name":"业务个性数据资产(ADM)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"727","contentsId":"727","pid":"43","name":"原始指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"728","contentsId":"728","pid":"43","name":"衍生指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"729","contentsId":"729","pid":"43","name":"基础指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"730","contentsId":"730","pid":"43","name":"个人客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"731","contentsId":"731","pid":"43","name":"对公客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"732","contentsId":"732","pid":"43","name":"同业客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null}],"assetNum":0},{"id":"44","contentsId":"44","pid":"4","name":"信托","level":"2","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":[{"id":"338","contentsId":"338","pid":"44","name":"其它","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"733","contentsId":"733","pid":"44","name":"业务表数据资产(STD)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"734","contentsId":"734","pid":"44","name":"明细表数据资产(DWD)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"735","contentsId":"735","pid":"44","name":"汇总表数据资产(DWS)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"736","contentsId":"736","pid":"44","name":"业务个性数据资产(ADM)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"737","contentsId":"737","pid":"44","name":"原始指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"738","contentsId":"738","pid":"44","name":"衍生指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"739","contentsId":"739","pid":"44","name":"基础指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"740","contentsId":"740","pid":"44","name":"个人客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"741","contentsId":"741","pid":"44","name":"对公客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"742","contentsId":"742","pid":"44","name":"同业客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null}],"assetNum":0},{"id":"45","contentsId":"45","pid":"4","name":"贵金属","level":"2","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":[{"id":"339","contentsId":"339","pid":"45","name":"其它","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"743","contentsId":"743","pid":"45","name":"业务表数据资产(STD)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"744","contentsId":"744","pid":"45","name":"明细表数据资产(DWD)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"745","contentsId":"745","pid":"45","name":"汇总表数据资产(DWS)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"746","contentsId":"746","pid":"45","name":"业务个性数据资产(ADM)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"747","contentsId":"747","pid":"45","name":"原始指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"748","contentsId":"748","pid":"45","name":"衍生指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"749","contentsId":"749","pid":"45","name":"基础指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"750","contentsId":"750","pid":"45","name":"个人客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"751","contentsId":"751","pid":"45","name":"对公客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"752","contentsId":"752","pid":"45","name":"同业客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null}],"assetNum":0},{"id":"46","contentsId":"46","pid":"4","name":"资管","level":"2","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":[{"id":"340","contentsId":"340","pid":"46","name":"其它","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"753","contentsId":"753","pid":"46","name":"业务表数据资产(STD)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"754","contentsId":"754","pid":"46","name":"明细表数据资产(DWD)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"755","contentsId":"755","pid":"46","name":"汇总表数据资产(DWS)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"756","contentsId":"756","pid":"46","name":"业务个性数据资产(ADM)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"757","contentsId":"757","pid":"46","name":"原始指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"758","contentsId":"758","pid":"46","name":"衍生指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"759","contentsId":"759","pid":"46","name":"基础指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"760","contentsId":"760","pid":"46","name":"个人客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"761","contentsId":"761","pid":"46","name":"对公客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"762","contentsId":"762","pid":"46","name":"同业客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null}],"assetNum":0},{"id":"47","contentsId":"47","pid":"4","name":"统一支付","level":"2","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":[{"id":"341","contentsId":"341","pid":"47","name":"其它","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"763","contentsId":"763","pid":"47","name":"业务表数据资产(STD)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"764","contentsId":"764","pid":"47","name":"明细表数据资产(DWD)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"765","contentsId":"765","pid":"47","name":"汇总表数据资产(DWS)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"766","contentsId":"766","pid":"47","name":"业务个性数据资产(ADM)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"767","contentsId":"767","pid":"47","name":"原始指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"768","contentsId":"768","pid":"47","name":"衍生指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"769","contentsId":"769","pid":"47","name":"基础指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"770","contentsId":"770","pid":"47","name":"个人客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"771","contentsId":"771","pid":"47","name":"对公客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"772","contentsId":"772","pid":"47","name":"同业客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null}],"assetNum":0},{"id":"48","contentsId":"48","pid":"4","name":"电子渠道","level":"2","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":[{"id":"342","contentsId":"342","pid":"48","name":"其它","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"773","contentsId":"773","pid":"48","name":"业务表数据资产(STD)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"774","contentsId":"774","pid":"48","name":"明细表数据资产(DWD)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"775","contentsId":"775","pid":"48","name":"汇总表数据资产(DWS)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"776","contentsId":"776","pid":"48","name":"业务个性数据资产(ADM)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"777","contentsId":"777","pid":"48","name":"原始指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"778","contentsId":"778","pid":"48","name":"衍生指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"779","contentsId":"779","pid":"48","name":"基础指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"780","contentsId":"780","pid":"48","name":"个人客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"781","contentsId":"781","pid":"48","name":"对公客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"782","contentsId":"782","pid":"48","name":"同业客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null}],"assetNum":0},{"id":"49","contentsId":"49","pid":"4","name":"线下渠道","level":"2","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":[{"id":"343","contentsId":"343","pid":"49","name":"其它","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"783","contentsId":"783","pid":"49","name":"业务表数据资产(STD)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"784","contentsId":"784","pid":"49","name":"明细表数据资产(DWD)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"785","contentsId":"785","pid":"49","name":"汇总表数据资产(DWS)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"786","contentsId":"786","pid":"49","name":"业务个性数据资产(ADM)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"787","contentsId":"787","pid":"49","name":"原始指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"788","contentsId":"788","pid":"49","name":"衍生指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"789","contentsId":"789","pid":"49","name":"基础指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"790","contentsId":"790","pid":"49","name":"个人客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"791","contentsId":"791","pid":"49","name":"对公客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"792","contentsId":"792","pid":"49","name":"同业客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null}],"assetNum":0},{"id":"50","contentsId":"50","pid":"4","name":"代发代扣","level":"2","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":[{"id":"344","contentsId":"344","pid":"50","name":"其它","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"793","contentsId":"793","pid":"50","name":"业务表数据资产(STD)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"794","contentsId":"794","pid":"50","name":"明细表数据资产(DWD)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"795","contentsId":"795","pid":"50","name":"汇总表数据资产(DWS)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"796","contentsId":"796","pid":"50","name":"业务个性数据资产(ADM)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"797","contentsId":"797","pid":"50","name":"原始指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"798","contentsId":"798","pid":"50","name":"衍生指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"799","contentsId":"799","pid":"50","name":"基础指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"800","contentsId":"800","pid":"50","name":"个人客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"801","contentsId":"801","pid":"50","name":"对公客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"802","contentsId":"802","pid":"50","name":"同业客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null}],"assetNum":0},{"id":"51","contentsId":"51","pid":"4","name":"代收代付","level":"2","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":[{"id":"345","contentsId":"345","pid":"51","name":"其它","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"803","contentsId":"803","pid":"51","name":"业务表数据资产(STD)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"804","contentsId":"804","pid":"51","name":"明细表数据资产(DWD)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"805","contentsId":"805","pid":"51","name":"汇总表数据资产(DWS)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"806","contentsId":"806","pid":"51","name":"业务个性数据资产(ADM)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"807","contentsId":"807","pid":"51","name":"原始指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"808","contentsId":"808","pid":"51","name":"衍生指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"809","contentsId":"809","pid":"51","name":"基础指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"810","contentsId":"810","pid":"51","name":"个人客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"811","contentsId":"811","pid":"51","name":"对公客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"812","contentsId":"812","pid":"51","name":"同业客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null}],"assetNum":0}],"assetNum":null},{"id":"5","contentsId":"5","pid":"0","name":"金融市场","level":"1","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":[{"id":"52","contentsId":"52","pid":"5","name":"同业客户 ","level":"2","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":[{"id":"346","contentsId":"346","pid":"52","name":"其它","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"813","contentsId":"813","pid":"52","name":"业务表数据资产(STD)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"814","contentsId":"814","pid":"52","name":"明细表数据资产(DWD)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"815","contentsId":"815","pid":"52","name":"汇总表数据资产(DWS)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"816","contentsId":"816","pid":"52","name":"业务个性数据资产(ADM)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"817","contentsId":"817","pid":"52","name":"原始指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"818","contentsId":"818","pid":"52","name":"衍生指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"819","contentsId":"819","pid":"52","name":"基础指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"820","contentsId":"820","pid":"52","name":"个人客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"821","contentsId":"821","pid":"52","name":"对公客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"822","contentsId":"822","pid":"52","name":"同业客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null}],"assetNum":2},{"id":"54","contentsId":"54","pid":"5","name":"理财资管","level":"2","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":[{"id":"348","contentsId":"348","pid":"54","name":"其它","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"833","contentsId":"833","pid":"54","name":"业务表数据资产(STD)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"834","contentsId":"834","pid":"54","name":"明细表数据资产(DWD)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"835","contentsId":"835","pid":"54","name":"汇总表数据资产(DWS)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"836","contentsId":"836","pid":"54","name":"业务个性数据资产(ADM)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"837","contentsId":"837","pid":"54","name":"原始指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"838","contentsId":"838","pid":"54","name":"衍生指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"839","contentsId":"839","pid":"54","name":"基础指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"840","contentsId":"840","pid":"54","name":"个人客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"841","contentsId":"841","pid":"54","name":"对公客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"842","contentsId":"842","pid":"54","name":"同业客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null}],"assetNum":2},{"id":"56","contentsId":"56","pid":"5","name":"同业投资","level":"2","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":[{"id":"350","contentsId":"350","pid":"56","name":"其它","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"853","contentsId":"853","pid":"56","name":"业务表数据资产(STD)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"854","contentsId":"854","pid":"56","name":"明细表数据资产(DWD)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"855","contentsId":"855","pid":"56","name":"汇总表数据资产(DWS)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"856","contentsId":"856","pid":"56","name":"业务个性数据资产(ADM)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"857","contentsId":"857","pid":"56","name":"原始指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"858","contentsId":"858","pid":"56","name":"衍生指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"859","contentsId":"859","pid":"56","name":"基础指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"860","contentsId":"860","pid":"56","name":"个人客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"861","contentsId":"861","pid":"56","name":"对公客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"862","contentsId":"862","pid":"56","name":"同业客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null}],"assetNum":2},{"id":"53","contentsId":"53","pid":"5","name":"存放同业","level":"2","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":[{"id":"347","contentsId":"347","pid":"53","name":"其它","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"823","contentsId":"823","pid":"53","name":"业务表数据资产(STD)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"824","contentsId":"824","pid":"53","name":"明细表数据资产(DWD)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"825","contentsId":"825","pid":"53","name":"汇总表数据资产(DWS)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"826","contentsId":"826","pid":"53","name":"业务个性数据资产(ADM)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"827","contentsId":"827","pid":"53","name":"原始指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"828","contentsId":"828","pid":"53","name":"衍生指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"829","contentsId":"829","pid":"53","name":"基础指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"830","contentsId":"830","pid":"53","name":"个人客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"831","contentsId":"831","pid":"53","name":"对公客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"832","contentsId":"832","pid":"53","name":"同业客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null}],"assetNum":0},{"id":"55","contentsId":"55","pid":"5","name":"同业融资","level":"2","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":[{"id":"349","contentsId":"349","pid":"55","name":"其它","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"843","contentsId":"843","pid":"55","name":"业务表数据资产(STD)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"844","contentsId":"844","pid":"55","name":"明细表数据资产(DWD)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"845","contentsId":"845","pid":"55","name":"汇总表数据资产(DWS)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"846","contentsId":"846","pid":"55","name":"业务个性数据资产(ADM)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"847","contentsId":"847","pid":"55","name":"原始指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"848","contentsId":"848","pid":"55","name":"衍生指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"849","contentsId":"849","pid":"55","name":"基础指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"850","contentsId":"850","pid":"55","name":"个人客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"851","contentsId":"851","pid":"55","name":"对公客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"852","contentsId":"852","pid":"55","name":"同业客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null}],"assetNum":0},{"id":"57","contentsId":"57","pid":"5","name":"同业资管","level":"2","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":[{"id":"351","contentsId":"351","pid":"57","name":"其它","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"863","contentsId":"863","pid":"57","name":"业务表数据资产(STD)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"864","contentsId":"864","pid":"57","name":"明细表数据资产(DWD)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"865","contentsId":"865","pid":"57","name":"汇总表数据资产(DWS)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"866","contentsId":"866","pid":"57","name":"业务个性数据资产(ADM)","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"867","contentsId":"867","pid":"57","name":"原始指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"868","contentsId":"868","pid":"57","name":"衍生指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"869","contentsId":"869","pid":"57","name":"基础指标","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"870","contentsId":"870","pid":"57","name":"个人客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"871","contentsId":"871","pid":"57","name":"对公客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null},{"id":"872","contentsId":"872","pid":"57","name":"同业客户标签","level":"3","type":null,"crtUserCode":null,"crtDate":null,"updUserCode":null,"updDate":null,"children":null,"assetNum":null}],"assetNum":0}],"assetNum":null}]}
    }
  }
]