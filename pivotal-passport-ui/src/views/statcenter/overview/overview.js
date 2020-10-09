import './overview.scss'
/** 数据概览*/
import ElDateQuarter from '../common/elDateQuarter.vue'
import TextTemplate from '../common/textTemplate.vue'
import TableTemplate from '../common/tableTemplate.vue'
import {dateFormat} from '@/filters'

export default {
  name: 'StatcenterOverview',
  components: {
    ElDateQuarter,
    TextTemplate,
    TableTemplate
  },
  data() {
    return {
      // 运营视窗 管理视窗切换以及时间选择参数
      timeRange: 'date',
      currentTab: 1,
      tabArr: [
        {cn: '运营视窗', val: 1},
        {cn: '管理视窗', val: 2},
      ],
      queryForm: {
        queryTime: null,
        quarterTime: null,
      },
      // 核心指标参数
      coreIndexList: [],
      coreOptions: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
            label: {
              show: true,
              backgroundColor: '#7B7DDC'
            }
          }
        },
        legend: {
          data: [],
          textStyle: {
            color: '#B4B4B4'
          },
          top: '3%',
          left: '10%'
        },
        yAxis: [{
          splitLine: {show: true},
          axisLine: {
            show: false,
            lineStyle: {
              color: '#B4B4B4',
            }
          },
          axisLabel: {
            color: 'rgb(3,3,3)',
            formatter: '{value} ',
          }
        }],
        grid: {
          top: '15%',
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: '#57617B'
            }
          },
          data: []
        }],
        series: []
      },
      currentLeft: 0,
      parentBoxWidth: 0,
      childBoxWidth: 0,
      // 实时概况参数
      currentOptions: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
            label: {
              show: true,
              backgroundColor: '#7B7DDC'
            }
          }
        },
        grid: {
          top: '3%',
          left: '3%',
          right: '2%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: '#57617B'
            }
          },
          data: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23']
        }],
        yAxis: [{
          type: 'value',
          axisTick: {
            show: false
          },
          axisLabel: {
            margin: 10,
            textStyle: {
              fontSize: 14
            }
          },
          axisLine: {
            show: false
          },
          splitLine: {
            show: false
          }
        }],
        series: [{
          name: '今天',
          type: 'line',
          smooth: true,
          areaStyle: {
            normal: {
              color: 'rgba(51, 136, 255, 0.4)',
              shadowColor: 'rgba(0, 0, 0, 0.1)',
              shadowBlur: 10
            }
          },
          lineStyle: {
            normal: {
              width: 3
            }
          },
          itemStyle: {
            normal: {
              color: 'rgb(51, 136, 255)',
              borderWidth: 4,
            }
          },
          data: []
        }, {
          name: '昨天',
          type: 'line',
          smooth: true,
          areaStyle: {
            normal: {
              color: 'rgba(255, 102, 0, 0.4)',
              shadowColor: 'rgba(0, 0, 0, 0.1)',
              shadowBlur: 10
            }
          },
          lineStyle: {
            normal: {
              width: 3
            }
          },
          itemStyle: {
            normal: {
              color: 'rgb(255, 102, 0)',
              borderWidth: 4,
            }
          },
          data: []
        }]
      },
      currentNum: [],
      todayData: [],
      yesterdayData: [],
      // 流量看板参数
      trafficIndexList: [],
      // 流量转化参数
      percentList: [],
      // 商品看板参数
      RankingTop5: [],
      // 支付排行参数
      payTableData: [],
      // 微信粉丝参数
      wyIndexList: [],
      wyOption: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
            label: {
              show: true,
              backgroundColor: '#7B7DDC'
            }
          }
        },
        legend: {
          data: [],
          textStyle: {
            color: '#B4B4B4'
          },
          top: '0%',
          left: '10%'
        },
        grid: {
          top: '15%',
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: '#57617B'
            }
          },
          data: []
        }],
        yAxis: [{
          splitLine: {show: true},
          axisLine: {
            show: false,
            lineStyle: {
              color: '#B4B4B4',
            }
          },

          axisLabel: {
            color: 'rgb(3,3,3)',
            formatter: '{value} ',
          }
        }],
        series: []
      },
      // 店铺会员参数
      // 微信粉丝参数
      wxIndexList: [],
      wxOption: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
            label: {
              show: true,
              backgroundColor: '#7B7DDC'
            }
          }
        },
        legend: {
          data: [],
          textStyle: {
            color: '#B4B4B4'
          },
          top: '0%',
          left: '10%'
        },
        grid: {
          top: '15%',
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: '#57617B'
            }
          },
          data: []
        }],
        yAxis: [{
          splitLine: {show: true},
          axisLine: {
            show: false,
            lineStyle: {
              color: '#B4B4B4',
            }
          },

          axisLabel: {
            color: 'rgb(3,3,3)',
            formatter: '{value} ',
          }
        }],
        series: []
      },
      // 成立客户
      tradingVolumeOption: {
        color: ['#529c8e', '#535dbd', "#f2719a", "#fca4bb", "#f59a8f", "#fdb301", "#57e7ec", "#cf9ef1"],
        title: {
          text: '成交金额占比',
          bottom: '1%',
          x: 'center',
          textStyle: {
            color: '#999',
            fontSize: 14
          }
        },
        legend: {
          orient: "vertical",
          x: "left",
          top: "center",
          left: "60%",
          bottom: "0%",
          data: ['新成交客户付款金额', '老成交客户付款金额'],
          itemWidth: 8,
          itemHeight: 8,
          itemGap: 16,
          formatter: function (name) {
            return '' + name
          }
        },
        series: [
          {
            name: '客户付款金额',
            type: 'pie',
            clockwise: false, //饼图的扇区是否是顺时针排布
            minAngle: 2, //最小的扇区角度（0 ~ 360）
            radius: ["50%", "75%"],
            center: ["30%", "50%"],
            avoidLabelOverlap: false,
            itemStyle: { //图形样式
              normal: {
                borderColor: '#ffffff',
                borderWidth: 6,
              },
            },
            label: {
              normal: {
                show: false,
                position: 'center',
                formatter: '{text|{b}}\n{c} ({d}%)',
                rich: {
                  text: {
                    color: "#666",
                    fontSize: 12,
                    align: 'center',
                    verticalAlign: 'middle',
                    padding: 8
                  },
                  value: {
                    color: "#8693F3",
                    fontSize: 16,
                    align: 'center',
                    verticalAlign: 'middle',
                  },
                }
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: 16,
                }
              }
            },
            data: []
          }
        ]
      },
      tradingNumberOption: {
        color: ["#63b6ce", "#5c89fd", "#8d7fec", "#5085f2", "#e75fc3", "#f87be2", "#f2719a", "#fca4bb", "#f59a8f", "#fdb301", "#57e7ec", "#cf9ef1"],
        title: {
          text: '成交人数占比',
          bottom: '1%',
          x: 'center',
          textStyle: {
            color: '#999',
            fontSize: 14
          }
        },
        legend: {
          orient: "vertical",
          x: "left",
          top: "center",
          left: "60%",
          bottom: "0%",
          data: ['新成交客户数', '老成交客户数'],
          itemWidth: 8,
          itemHeight: 8,
          itemGap: 16,
          formatter: function (name) {
            return '' + name
          }
        },
        series: [{
          name: '客户数',
          type: 'pie',
          clockwise: false, //饼图的扇区是否是顺时针排布
          minAngle: 2, //最小的扇区角度（0 ~ 360）
          radius: ["50%", "75%"],
          center: ["30%", "50%"],
          avoidLabelOverlap: false,
          itemStyle: { //图形样式
            normal: {
              borderColor: '#ffffff',
              borderWidth: 6,
            },
          },
          label: {
            normal: {
              show: false,
              position: 'center',
              formatter: '{text|{b}}\n{c} ({d}%)',
              rich: {
                text: {
                  color: "#666",
                  fontSize: 12,
                  align: 'center',
                  verticalAlign: 'middle',
                  padding: 8
                },
                value: {
                  color: "#8693F3",
                  fontSize: 16,
                  align: 'center',
                  verticalAlign: 'middle',
                },
              }
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: 16,
              }
            }
          },
          data: []
        }]
      },
      tradingTextObj: [
        {name: '本周', currentNum: '92.32', comparison: '较上一周', lastNum: '0.49'},
        {name: '本月', currentNum: '92.12', comparison: '较上一月', lastNum: '0.69'},
      ],
      // 销售目标参数
      sellNumber: [],
      currentSellTarget: 0,
      currentSell: 0,
      sellOption: {
        color: ['#269fff', '#fe840d', '#5793f3', '#d14a61', '#675bba'],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
            label: {
              show: true,
              backgroundColor: '#7B7DDC'
            }
          }
        },
        grid: {
          top: '15%',
          left: '3%',
          right: '3%',
          bottom: '3%',
          containLabel: true
        },
        legend: {
          data: ['支付金额', '上周同比增长率'],
          textStyle: {
            color: '#B4B4B4'
          },
          top: '3%',
          x: 'center',
        },
        xAxis: [{
          type: 'category',
          axisTick: {
            alignWithLabel: true
          },
          data: []
        }],
        yAxis: [{
          type: 'value',
          name: '支付金额',
          position: 'left',
          splitLine: {show: true},
          axisLine: {
            show: false,
            lineStyle: {
              color: '#666'
            }
          },
          axisLabel: {
            formatter: '{value}'
          }
        },
          {
            type: 'value',
            name: '上周同比增长率',
            position: 'right',
            splitLine: {show: false},
            axisLine: {
              show: false,
              lineStyle: {
                color: '#666'
              }
            },
            axisLabel: {
              formatter: '{value}%'
            }
          }
        ],
        series: [{
          name: '支付金额',
          type: 'bar',
          barWidth: 20,
          data: []
        },
          {
            name: '上周同比增长率',
            type: 'line',
            yAxisIndex: 1,
            data: []
          }
        ]
      },
      // 退款商品列表参数
      refundGoodsTableData: [],
      refundGoodsTableHeader: [{
        label: '商品',
        prop: 'skuName',
        width: 'auto'
      }, {
        label: '退款订单数',
        prop: 'refundTotalO',
        width: '150'
      }, {
        label: '退款金额',
        prop: 'refundTotalA',
        width: '150'
      }],
      // 退款原因排名
      refundInfoTableData: [],
      refundInfoTableHeader: [{
        label: '排名',
        prop: 'index',
        width: '80'
      }, {
        label: '退款原因',
        prop: 'refundCausal',
        width: 'auto'
      }, {
        label: '退款金额',
        prop: 'refundTotalSuccessA',
        width: '150'
      }, {
        label: '占比',
        prop: 'refundCausalRate',
        width: '150'
      }],
      // 成功退款金额
      sellArr: [],
      remarks: {
        '成功退款金额': '当日成功退款的金额',
        '退款率': '筛选时间内，发起退款订单数/付款订单数'
      },
      paySessionOption: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
            label: {
              show: true,
              backgroundColor: '#7B7DDC'
            }
          }
        },
        grid: {
          top: '10%',
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: '#57617B'
            }
          },
          data: []
        }],
        yAxis: [{
          type: 'value',
          axisTick: {
            show: false
          },
          axisLabel: {
            margin: 10,
            textStyle: {
              fontSize: 14
            }
          },
          axisLine: {
            show: false
          },
          splitLine: {
            show: false
          }
        }],
        series: [{
          type: 'line',
          smooth: true,
          areaStyle: {
            normal: {
              color: 'rgba(51, 136, 255, 0.4)',
              shadowColor: 'rgba(0, 0, 0, 0.1)',
              shadowBlur: 10
            }
          },
          lineStyle: {
            normal: {
              width: 3
            }
          },
          itemStyle: {
            normal: {
              color: 'rgb(51, 136, 255)',
              borderWidth: 4,
            }
          },
          data: []
        }]
      },
      // 指标参数
      remarkObj: {
        '跳失率': '访问单个页面的人数/访客数',
        '跌失率': '访问单个页面的人数/访客数',
        '人均浏览量': '浏览量/访客数',
        '平均停留时长': '访客停留总时长/访客数',
        '商品访问转化率': '商品访客数/访客数',
        '访问-加购转化率': '加购人数/访客数',
        '访问-支付转化率': '支付人数/访客数',
      },
      // 刷新加载字段
      isLoadingFn: false
    }
  },
  mounted() {
    this.queryForm.queryTime = dateFormat(new Date(new Date().getTime() - 1000 * 3600 * 24)).slice(0, 10)
    this.init();
    this.getPayDataOnTime()
  },
  methods: {
    // 初始化函数
    init(date) {
      let paramsObj = {
        date: date || this.queryForm.queryTime
      };
      this.getDataCenterCoreIndicators(paramsObj)
      this.getSalesTop5(paramsObj)
      this.getAccessRankingTop5(paramsObj)
      this.getSalesTargetManagement(paramsObj)
      this.getQueryFlowBoard(paramsObj)
      this.getQueryCustomerBoard(paramsObj)
      this.getQueryTransactionCustomer(paramsObj)
      this.getRefundProductInfoTopFive(paramsObj)
      this.getQueryRefundCausalTopFive(paramsObj)
      this.getQuerySuccessRefundAndRate(paramsObj)
    },
    // 获取实时数据处理函数
    getPayDataOnTime() {
      this.currentNum = [
        {"name": "访客数", "lastNum": "5430,322", "num": "440,153"},
        {"name": "浏览量", "lastNum": "64,550,264", "num": "12,833,5"},
        {"name": "支付订单数", "lastNum": "31,52", "num": "92,29"},
        {"name": "支付人数", "lastNum": "27,50", "num": "82,34"},
        {"name": "退款成功金额", "lastNum": "410", "num": "1099.37"},
        {"name": "退款成功订单数", "lastNum": "3,482", "num": "8,195"},
        {"name": "客单价", "lastNum": "144.99", "num": "166.1"},
        {"name": "访客-支付转化率", "lastNum": "7%", "num": "19%"},
        {"name": "待退款订单数", "show": true, "num": "2,285"},
        {"name": "待发货订单数", "show": true, "num": "88,00"}];
      this.currentOptions.series[0].data = ["420.27", "5506.05", "5932.29", "6391.04", "6585.51", "647683.76", "6912.65", "7305.88", "8789.73", "1156.95", "17017.89", "1249.9", "12273.59", "1282884.04", "123696.87", "1299678.84", "871306.71", "1362063.08", "1309768.33", "1350462.98", "1359785.87", "1361520.19"];
      this.currentOptions.series[1].data = ["268.5", "319.4", "441.2", "502.1", "502.1", "502.1", "502.1", "553", "985.15", "1469.3", "2860.15", "2997801.97", "3303459.03", "3418191.58", "357709.08", "3592248.66", "3683410.58", "375458.52", "310026", "381699.87", "388434.36", "391409.68", "395502.7", "398887.9"]
    },
    // 获取数据参数函数
    /**核心指标获取参数处理函数*/
    getDataCenterCoreIndicators(params) {
      this.coreOptions.xAxis[0].data = ["2020-02-03", "2020-02-04", "2020-02-05", "2020-02-06", "2020-02-07", "2020-02-08", "2020-02-09", "2020-02-10", "2020-02-11", "2020-02-12", "2020-02-13", "2020-02-14", "2020-02-15", "2020-02-16", "2020-02-17", "2020-02-18", "2020-02-19", "2020-02-20", "2020-02-21", "2020-02-22", "2020-02-23", "2020-02-24", "2020-02-25", "2020-02-26", "2020-02-27", "2020-02-28", "2020-02-29", "2020-03-01", "2020-03-02", "2020-03-03", "2020-03-04"];
      this.coreIndexList = [
        {
          "wmallCoreIndicatorsDayValueVos": [{"num": "4186513.35", "time": "2020-02-03"}, {
            "num": "185313.1",
            "time": "2020-02-04"
          }, {"num": "4118582.37", "time": "2020-02-05"}, {
            "num": "2587843.76",
            "time": "2020-02-06"
          }, {"num": "4556315.89", "time": "2020-02-07"}, {"num": "208608.3", "time": "2020-02-08"}, {
            "num": "880118.2",
            "time": "2020-02-09"
          }, {"num": "179132.6", "time": "2020-02-10"}, {
            "num": "2592627.9",
            "time": "2020-02-11"
          }, {"num": "1555346.55", "time": "2020-02-12"}, {
            "num": "167814.38",
            "time": "2020-02-13"
          }, {"num": "2963746.13", "time": "2020-02-14"}, {
            "num": "2603966.03",
            "time": "2020-02-15"
          }, {"num": "508503.85", "time": "2020-02-16"}, {
            "num": "132370.95",
            "time": "2020-02-17"
          }, {"num": "2215105.32", "time": "2020-02-18"}, {
            "num": "169274.66",
            "time": "2020-02-19"
          }, {"num": "2337531.34", "time": "2020-02-20"}, {
            "num": "3424322",
            "time": "2020-02-21"
          }, {"num": "2509449.47", "time": "2020-02-22"}, {
            "num": "767701.12",
            "time": "2020-02-23"
          }, {"num": "312509.95", "time": "2020-02-24"}, {
            "num": "2358967.6",
            "time": "2020-02-25"
          }, {"num": "2375383.51", "time": "2020-02-26"}, {
            "num": "1909288.99",
            "time": "2020-02-27"
          }, {"num": "2733763.65", "time": "2020-02-28"}, {
            "num": "1792398.85",
            "time": "2020-02-29"
          }, {"num": "193817.85", "time": "2020-03-01"}, {"num": "80915.55", "time": "2020-03-02"}, {
            "num": "164357.1",
            "time": "2020-03-03"
          }, {"num": "39887.9", "time": "2020-03-04"}],
          "nameCn": "支付金额",
          "currentNum": "3987887.9",
          "lastWeek": "67.88",
          "lastDate": "2326.36",
          "isActive": true
        }, {
          "wmallCoreIndicatorsDayValueVos": [{"num": "35521", "time": "2020-02-03"}, {
            "num": "1989",
            "time": "2020-02-04"
          }, {"num": "31450", "time": "2020-02-05"}, {"num": "26108", "time": "2020-02-06"}, {
            "num": "36646",
            "time": "2020-02-07"
          }, {"num": "3066", "time": "2020-02-08"}, {"num": "10415", "time": "2020-02-09"}, {
            "num": "2582",
            "time": "2020-02-10"
          }, {"num": "25175", "time": "2020-02-11"}, {"num": "13179", "time": "2020-02-12"}, {
            "num": "2745",
            "time": "2020-02-13"
          }, {"num": "31807", "time": "2020-02-14"}, {"num": "22521", "time": "2020-02-15"}, {
            "num": "7836",
            "time": "2020-02-16"
          }, {"num": "1580", "time": "2020-02-17"}, {"num": "15006", "time": "2020-02-18"}, {
            "num": "2217",
            "time": "2020-02-19"
          }, {"num": "20386", "time": "2020-02-20"}, {"num": "27935", "time": "2020-02-21"}, {
            "num": "23684",
            "time": "2020-02-22"
          }, {"num": "12029", "time": "2020-02-23"}, {"num": "3039", "time": "2020-02-24"}, {
            "num": "15085",
            "time": "2020-02-25"
          }, {"num": "11816", "time": "2020-02-26"}, {"num": "15198", "time": "2020-02-27"}, {
            "num": "8840",
            "time": "2020-02-28"
          }, {"num": "14715", "time": "2020-02-29"}, {"num": "2331", "time": "2020-03-01"}, {
            "num": "1115",
            "time": "2020-03-02"
          }, {"num": "1249", "time": "2020-03-03"}, {"num": "27504", "time": "2020-03-04"}],
          "nameCn": "支付人数",
          "currentNum": "27504",
          "lastWeek": "132.77",
          "lastDate": "2102.08",
          "isActive": true
        }, {
          "wmallCoreIndicatorsDayValueVos": [{"num": "42293", "time": "2020-02-03"}, {
            "num": "2096",
            "time": "2020-02-04"
          }, {"num": "35886", "time": "2020-02-05"}, {"num": "29821", "time": "2020-02-06"}, {
            "num": "41690",
            "time": "2020-02-07"
          }, {"num": "3254", "time": "2020-02-08"}, {"num": "12134", "time": "2020-02-09"}, {
            "num": "2705",
            "time": "2020-02-10"
          }, {"num": "28367", "time": "2020-02-11"}, {"num": "14806", "time": "2020-02-12"}, {
            "num": "3065",
            "time": "2020-02-13"
          }, {"num": "35662", "time": "2020-02-14"}, {"num": "25479", "time": "2020-02-15"}, {
            "num": "9149",
            "time": "2020-02-16"
          }, {"num": "1678", "time": "2020-02-17"}, {"num": "16793", "time": "2020-02-18"}, {
            "num": "2455",
            "time": "2020-02-19"
          }, {"num": "22813", "time": "2020-02-20"}, {"num": "32288", "time": "2020-02-21"}, {
            "num": "27280",
            "time": "2020-02-22"
          }, {"num": "14260", "time": "2020-02-23"}, {"num": "3434", "time": "2020-02-24"}, {
            "num": "16649",
            "time": "2020-02-25"
          }, {"num": "13492", "time": "2020-02-26"}, {"num": "16637", "time": "2020-02-27"}, {
            "num": "9765",
            "time": "2020-02-28"
          }, {"num": "16345", "time": "2020-02-29"}, {"num": "2497", "time": "2020-03-01"}, {
            "num": "1208",
            "time": "2020-03-02"
          }, {"num": "1376", "time": "2020-03-03"}, {"num": "31532", "time": "2020-03-04"}],
          "nameCn": "支付订单数",
          "currentNum": "31532",
          "lastWeek": "133.71",
          "lastDate": "2191.57",
          "isActive": true
        }, {
          "wmallCoreIndicatorsDayValueVos": [{"num": "117.86", "time": "2020-02-03"}, {
            "num": "93.17",
            "time": "2020-02-04"
          }, {"num": "130.96", "time": "2020-02-05"}, {"num": "99.12", "time": "2020-02-06"}, {
            "num": "124.33",
            "time": "2020-02-07"
          }, {"num": "68.04", "time": "2020-02-08"}, {"num": "84.5", "time": "2020-02-09"}, {
            "num": "69.38",
            "time": "2020-02-10"
          }, {"num": "102.98", "time": "2020-02-11"}, {"num": "118.02", "time": "2020-02-12"}, {
            "num": "61.13",
            "time": "2020-02-13"
          }, {"num": "93.18", "time": "2020-02-14"}, {"num": "115.62", "time": "2020-02-15"}, {
            "num": "64.89",
            "time": "2020-02-16"
          }, {"num": "83.78", "time": "2020-02-17"}, {"num": "147.61", "time": "2020-02-18"}, {
            "num": "76.35",
            "time": "2020-02-19"
          }, {"num": "114.66", "time": "2020-02-20"}, {"num": "122.58", "time": "2020-02-21"}, {
            "num": "105.96",
            "time": "2020-02-22"
          }, {"num": "63.82", "time": "2020-02-23"}, {"num": "102.83", "time": "2020-02-24"}, {
            "num": "156.38",
            "time": "2020-02-25"
          }, {"num": "201.03", "time": "2020-02-26"}, {"num": "125.63", "time": "2020-02-27"}, {
            "num": "309.25",
            "time": "2020-02-28"
          }, {"num": "121.81", "time": "2020-02-29"}, {"num": "83.15", "time": "2020-03-01"}, {
            "num": "72.57",
            "time": "2020-03-02"
          }, {"num": "131.59", "time": "2020-03-03"}, {"num": "144.99", "time": "2020-03-04"}],
          "nameCn": "客单价",
          "currentNum": "144.99",
          "lastWeek": "-27.88",
          "lastDate": "10.18",
          "isActive": true
        }, {
          "wmallCoreIndicatorsDayValueVos": [{"num": "258049", "time": "2020-02-03"}, {
            "num": "250704",
            "time": "2020-02-04"
          }, {"num": "362648", "time": "2020-02-05"}, {"num": "327050", "time": "2020-02-06"}, {
            "num": "350051",
            "time": "2020-02-07"
          }, {"num": "169914", "time": "2020-02-08"}, {"num": "227526", "time": "2020-02-09"}, {
            "num": "234724",
            "time": "2020-02-10"
          }, {"num": "332549", "time": "2020-02-11"}, {"num": "237997", "time": "2020-02-12"}, {
            "num": "216457",
            "time": "2020-02-13"
          }, {"num": "314398", "time": "2020-02-14"}, {"num": "260957", "time": "2020-02-15"}, {
            "num": "185700",
            "time": "2020-02-16"
          }, {"num": "234992", "time": "2020-02-17"}, {"num": "234421", "time": "2020-02-18"}, {
            "num": "266913",
            "time": "2020-02-19"
          }, {"num": "319950", "time": "2020-02-20"}, {"num": "312160", "time": "2020-02-21"}, {
            "num": "317482",
            "time": "2020-02-22"
          }, {"num": "229018", "time": "2020-02-23"}, {"num": "209171", "time": "2020-02-24"}, {
            "num": "172321",
            "time": "2020-02-25"
          }, {"num": "230050", "time": "2020-02-26"}, {"num": "330444", "time": "2020-02-27"}, {
            "num": "262767",
            "time": "2020-02-28"
          }, {"num": "223425", "time": "2020-02-29"}, {"num": "128692", "time": "2020-03-01"}, {
            "num": "180356",
            "time": "2020-03-02"
          }, {"num": "281537", "time": "2020-03-03"}, {"num": "370318", "time": "2020-03-04"}],
          "nameCn": "访客数",
          "currentNum": "370318",
          "lastWeek": "60.97",
          "lastDate": "31.53",
          "isActive": true
        }, {
          "wmallCoreIndicatorsDayValueVos": [{"num": "4569304", "time": "2020-02-03"}, {
            "num": "3190599",
            "time": "2020-02-04"
          }, {"num": "7010228", "time": "2020-02-05"}, {"num": "5993012", "time": "2020-02-06"}, {
            "num": "6623371",
            "time": "2020-02-07"
          }, {"num": "2264698", "time": "2020-02-08"}, {"num": "3110327", "time": "2020-02-09"}, {
            "num": "2681920",
            "time": "2020-02-10"
          }, {"num": "4871659", "time": "2020-02-11"}, {"num": "3692419", "time": "2020-02-12"}, {
            "num": "2847815",
            "time": "2020-02-13"
          }, {"num": "5323630", "time": "2020-02-14"}, {"num": "4192648", "time": "2020-02-15"}, {
            "num": "2381494",
            "time": "2020-02-16"
          }, {"num": "2738297", "time": "2020-02-17"}, {"num": "3474851", "time": "2020-02-18"}, {
            "num": "3530004",
            "time": "2020-02-19"
          }, {"num": "6161398", "time": "2020-02-20"}, {"num": "5515083", "time": "2020-02-21"}, {
            "num": "5318050",
            "time": "2020-02-22"
          }, {"num": "3221615", "time": "2020-02-23"}, {"num": "2428588", "time": "2020-02-24"}, {
            "num": "2617482",
            "time": "2020-02-25"
          }, {"num": "2787611", "time": "2020-02-26"}, {"num": "3844059", "time": "2020-02-27"}, {
            "num": "2710830",
            "time": "2020-02-28"
          }, {"num": "2813934", "time": "2020-02-29"}, {"num": "1350117", "time": "2020-03-01"}, {
            "num": "2049457",
            "time": "2020-03-02"
          }, {"num": "4127410", "time": "2020-03-03"}, {"num": "7549345", "time": "2020-03-04"}],
          "nameCn": "浏览量",
          "currentNum": "7549345",
          "lastWeek": "170.82",
          "lastDate": "82.91",
          "isActive": true
        }, {
          "wmallCoreIndicatorsDayValueVos": [{"num": "13.77", "time": "2020-02-03"}, {
            "num": "0.79",
            "time": "2020-02-04"
          }, {"num": "8.67", "time": "2020-02-05"}, {"num": "7.98", "time": "2020-02-06"}, {
            "num": "10.47",
            "time": "2020-02-07"
          }, {"num": "1.80", "time": "2020-02-08"}, {"num": "4.58", "time": "2020-02-09"}, {
            "num": "1.10",
            "time": "2020-02-10"
          }, {"num": "7.57", "time": "2020-02-11"}, {"num": "5.54", "time": "2020-02-12"}, {
            "num": "1.27",
            "time": "2020-02-13"
          }, {"num": "10.12", "time": "2020-02-14"}, {"num": "8.63", "time": "2020-02-15"}, {
            "num": "4.22",
            "time": "2020-02-16"
          }, {"num": "0.67", "time": "2020-02-17"}, {"num": "6.40", "time": "2020-02-18"}, {
            "num": "0.83",
            "time": "2020-02-19"
          }, {"num": "6.37", "time": "2020-02-20"}, {"num": "8.95", "time": "2020-02-21"}, {
            "num": "7.46",
            "time": "2020-02-22"
          }, {"num": "5.25", "time": "2020-02-23"}, {"num": "1.45", "time": "2020-02-24"}, {
            "num": "8.75",
            "time": "2020-02-25"
          }, {"num": "5.14", "time": "2020-02-26"}, {"num": "4.60", "time": "2020-02-27"}, {
            "num": "3.36",
            "time": "2020-02-28"
          }, {"num": "6.59", "time": "2020-02-29"}, {"num": "1.81", "time": "2020-03-01"}, {
            "num": "0.62",
            "time": "2020-03-02"
          }, {"num": "0.44", "time": "2020-03-03"}, {"num": "7.43", "time": "2020-03-04"}],
          "nameCn": "访问-支付转化率",
          "currentNum": "7.43%",
          "lastWeek": "44.55",
          "lastDate": "1588.64",
          "isActive": true
        }, {
          "wmallCoreIndicatorsDayValueVos": [{"num": "0", "time": "2020-02-03"}, {
            "num": "0",
            "time": "2020-02-04"
          }, {"num": "0", "time": "2020-02-05"}, {"num": "0", "time": "2020-02-06"}, {
            "num": "0",
            "time": "2020-02-07"
          }, {"num": "0", "time": "2020-02-08"}, {"num": "0", "time": "2020-02-09"}, {
            "num": "0",
            "time": "2020-02-10"
          }, {"num": "0", "time": "2020-02-11"}, {"num": "0", "time": "2020-02-12"}, {
            "num": "0",
            "time": "2020-02-13"
          }, {"num": "0", "time": "2020-02-14"}, {"num": "0", "time": "2020-02-15"}, {
            "num": "0",
            "time": "2020-02-16"
          }, {"num": "3", "time": "2020-02-17"}, {"num": "0", "time": "2020-02-18"}, {
            "num": "0",
            "time": "2020-02-19"
          }, {"num": "0", "time": "2020-02-20"}, {"num": "0", "time": "2020-02-21"}, {
            "num": "0",
            "time": "2020-02-22"
          }, {"num": "0", "time": "2020-02-23"}, {"num": "0", "time": "2020-02-24"}, {
            "num": "0",
            "time": "2020-02-25"
          }, {"num": "753", "time": "2020-02-26"}, {"num": "1", "time": "2020-02-27"}, {
            "num": "6218",
            "time": "2020-02-28"
          }, {"num": "0", "time": "2020-02-29"}, {"num": "0", "time": "2020-03-01"}, {
            "num": "0",
            "time": "2020-03-02"
          }, {"num": "0", "time": "2020-03-03"}, {"num": "0", "time": "2020-03-04"}],
          "nameCn": "异业订单数",
          "currentNum": "0",
          "lastWeek": "-100.00",
          "lastDate": "-",
          "isActive": true
        }, {
          "wmallCoreIndicatorsDayValueVos": [{"num": "0", "time": "2020-02-03"}, {
            "num": "0",
            "time": "2020-02-04"
          }, {"num": "0", "time": "2020-02-05"}, {"num": "0", "time": "2020-02-06"}, {
            "num": "0",
            "time": "2020-02-07"
          }, {"num": "0", "time": "2020-02-08"}, {"num": "0", "time": "2020-02-09"}, {
            "num": "0",
            "time": "2020-02-10"
          }, {"num": "0", "time": "2020-02-11"}, {"num": "0", "time": "2020-02-12"}, {
            "num": "0",
            "time": "2020-02-13"
          }, {"num": "0", "time": "2020-02-14"}, {"num": "0", "time": "2020-02-15"}, {
            "num": "0",
            "time": "2020-02-16"
          }, {"num": "0.03", "time": "2020-02-17"}, {"num": "0", "time": "2020-02-18"}, {
            "num": "0",
            "time": "2020-02-19"
          }, {"num": "0", "time": "2020-02-20"}, {"num": "0", "time": "2020-02-21"}, {
            "num": "0",
            "time": "2020-02-22"
          }, {"num": "0", "time": "2020-02-23"}, {"num": "0", "time": "2020-02-24"}, {
            "num": "0",
            "time": "2020-02-25"
          }, {"num": "539882", "time": "2020-02-26"}, {"num": "699", "time": "2020-02-27"}, {
            "num": "2431628.95",
            "time": "2020-02-28"
          }, {"num": "0", "time": "2020-02-29"}, {"num": "0", "time": "2020-03-01"}, {
            "num": "0",
            "time": "2020-03-02"
          }, {"num": "0", "time": "2020-03-03"}, {"num": "0", "time": "2020-03-04"}],
          "nameCn": "异业订单金额",
          "currentNum": "0",
          "lastWeek": "-100.00",
          "lastDate": "-",
          "isActive": true
        }, {
          "wmallCoreIndicatorsDayValueVos": [{"num": "4147", "time": "2020-02-03"}, {
            "num": "1357",
            "time": "2020-02-04"
          }, {"num": "4536", "time": "2020-02-05"}, {"num": "4262", "time": "2020-02-06"}, {
            "num": "6427",
            "time": "2020-02-07"
          }, {"num": "1825", "time": "2020-02-08"}, {"num": "1938", "time": "2020-02-09"}, {
            "num": "1215",
            "time": "2020-02-10"
          }, {"num": "2682", "time": "2020-02-11"}, {"num": "2611", "time": "2020-02-12"}, {
            "num": "1509",
            "time": "2020-02-13"
          }, {"num": "3147", "time": "2020-02-14"}, {"num": "3308", "time": "2020-02-15"}, {
            "num": "1408",
            "time": "2020-02-16"
          }, {"num": "898", "time": "2020-02-17"}, {"num": "1835", "time": "2020-02-18"}, {
            "num": "732",
            "time": "2020-02-19"
          }, {"num": "1859", "time": "2020-02-20"}, {"num": "2848", "time": "2020-02-21"}, {
            "num": "2229",
            "time": "2020-02-22"
          }, {"num": "1879", "time": "2020-02-23"}, {"num": "1313", "time": "2020-02-24"}, {
            "num": "1330",
            "time": "2020-02-25"
          }, {"num": "1635", "time": "2020-02-26"}, {"num": "1761", "time": "2020-02-27"}, {
            "num": "1266",
            "time": "2020-02-28"
          }, {"num": "1407", "time": "2020-02-29"}, {"num": "915", "time": "2020-03-01"}, {
            "num": "511",
            "time": "2020-03-02"
          }, {"num": "785", "time": "2020-03-03"}, {"num": "3135", "time": "2020-03-04"}],
          "nameCn": "退款订单数",
          "currentNum": "3135",
          "lastWeek": "91.74",
          "lastDate": "299.36",
          "isActive": true
        }, {
          "wmallCoreIndicatorsDayValueVos": [{"num": "436668.25", "time": "2020-02-03"}, {
            "num": "152889.75",
            "time": "2020-02-04"
          }, {"num": "507983.57", "time": "2020-02-05"}, {
            "num": "410371.65",
            "time": "2020-02-06"
          }, {"num": "670547.93", "time": "2020-02-07"}, {
            "num": "179020.05",
            "time": "2020-02-08"
          }, {"num": "163730.12", "time": "2020-02-09"}, {"num": "104390.08", "time": "2020-02-10"}, {
            "num": "261933",
            "time": "2020-02-11"
          }, {"num": "260602.8", "time": "2020-02-12"}, {"num": "135855.46", "time": "2020-02-13"}, {
            "num": "298391.11",
            "time": "2020-02-14"
          }, {"num": "355587.69", "time": "2020-02-15"}, {"num": "129358", "time": "2020-02-16"}, {
            "num": "81314.14",
            "time": "2020-02-17"
          }, {"num": "260059.04", "time": "2020-02-18"}, {"num": "80267.75", "time": "2020-02-19"}, {
            "num": "209024.6",
            "time": "2020-02-20"
          }, {"num": "324669.85", "time": "2020-02-21"}, {
            "num": "214191.22",
            "time": "2020-02-22"
          }, {"num": "143513.18", "time": "2020-02-23"}, {
            "num": "113227.84",
            "time": "2020-02-24"
          }, {"num": "216705.74", "time": "2020-02-25"}, {
            "num": "337684.13",
            "time": "2020-02-26"
          }, {"num": "284751.37", "time": "2020-02-27"}, {
            "num": "363622.35",
            "time": "2020-02-28"
          }, {"num": "238135.06", "time": "2020-02-29"}, {"num": "152898.92", "time": "2020-03-01"}, {
            "num": "78902.64",
            "time": "2020-03-02"
          }, {"num": "140973.41", "time": "2020-03-03"}, {"num": "410936.57", "time": "2020-03-04"}],
          "nameCn": "退款金额",
          "currentNum": "410936.57",
          "lastWeek": "21.69",
          "lastDate": "191.50",
          "isActive": true
        }, {
          "wmallCoreIndicatorsDayValueVos": [{"num": "0", "time": "2020-02-03"}, {
            "num": "0",
            "time": "2020-02-04"
          }, {"num": "0", "time": "2020-02-05"}, {"num": "0", "time": "2020-02-06"}, {
            "num": "0",
            "time": "2020-02-07"
          }, {"num": "0", "time": "2020-02-08"}, {"num": "0", "time": "2020-02-09"}, {
            "num": "0",
            "time": "2020-02-10"
          }, {"num": "0", "time": "2020-02-11"}, {"num": "0", "time": "2020-02-12"}, {
            "num": "0",
            "time": "2020-02-13"
          }, {"num": "0", "time": "2020-02-14"}, {"num": "0", "time": "2020-02-15"}, {
            "num": "0",
            "time": "2020-02-16"
          }, {"num": "0", "time": "2020-02-17"}, {"num": "0", "time": "2020-02-18"}, {
            "num": "0",
            "time": "2020-02-19"
          }, {"num": "0", "time": "2020-02-20"}, {"num": "0", "time": "2020-02-21"}, {
            "num": "0",
            "time": "2020-02-22"
          }, {"num": "0", "time": "2020-02-23"}, {"num": "0", "time": "2020-02-24"}, {
            "num": "0",
            "time": "2020-02-25"
          }, {"num": "0", "time": "2020-02-26"}, {"num": "0", "time": "2020-02-27"}, {
            "num": "0",
            "time": "2020-02-28"
          }, {"num": "0", "time": "2020-02-29"}, {"num": "0", "time": "2020-03-01"}, {
            "num": "0",
            "time": "2020-03-02"
          }, {"num": "0", "time": "2020-03-03"}, {"num": "0", "time": "2020-03-04"}],
          "nameCn": "定金支付人数",
          "currentNum": "0",
          "lastWeek": "-",
          "lastDate": "-",
          "isActive": true
        }, {
          "wmallCoreIndicatorsDayValueVos": [{"num": "0", "time": "2020-02-03"}, {
            "num": "0",
            "time": "2020-02-04"
          }, {"num": "0", "time": "2020-02-05"}, {"num": "0", "time": "2020-02-06"}, {
            "num": "0",
            "time": "2020-02-07"
          }, {"num": "0", "time": "2020-02-08"}, {"num": "0", "time": "2020-02-09"}, {
            "num": "0",
            "time": "2020-02-10"
          }, {"num": "0", "time": "2020-02-11"}, {"num": "0", "time": "2020-02-12"}, {
            "num": "0",
            "time": "2020-02-13"
          }, {"num": "0", "time": "2020-02-14"}, {"num": "0", "time": "2020-02-15"}, {
            "num": "0",
            "time": "2020-02-16"
          }, {"num": "0", "time": "2020-02-17"}, {"num": "0", "time": "2020-02-18"}, {
            "num": "0",
            "time": "2020-02-19"
          }, {"num": "0", "time": "2020-02-20"}, {"num": "0", "time": "2020-02-21"}, {
            "num": "0",
            "time": "2020-02-22"
          }, {"num": "0", "time": "2020-02-23"}, {"num": "0", "time": "2020-02-24"}, {
            "num": "0",
            "time": "2020-02-25"
          }, {"num": "0", "time": "2020-02-26"}, {"num": "0", "time": "2020-02-27"}, {
            "num": "0",
            "time": "2020-02-28"
          }, {"num": "0", "time": "2020-02-29"}, {"num": "0", "time": "2020-03-01"}, {
            "num": "0",
            "time": "2020-03-02"
          }, {"num": "0", "time": "2020-03-03"}, {"num": "0", "time": "2020-03-04"}],
          "nameCn": "定金支付金额",
          "currentNum": "0",
          "lastWeek": "-",
          "lastDate": "-",
          "isActive": true
        }, {
          "wmallCoreIndicatorsDayValueVos": [{"num": "0", "time": "2020-02-03"}, {
            "num": "0",
            "time": "2020-02-04"
          }, {"num": "0", "time": "2020-02-05"}, {"num": "0", "time": "2020-02-06"}, {
            "num": "0",
            "time": "2020-02-07"
          }, {"num": "0", "time": "2020-02-08"}, {"num": "0", "time": "2020-02-09"}, {
            "num": "0",
            "time": "2020-02-10"
          }, {"num": "0", "time": "2020-02-11"}, {"num": "0", "time": "2020-02-12"}, {
            "num": "0",
            "time": "2020-02-13"
          }, {"num": "0", "time": "2020-02-14"}, {"num": "0", "time": "2020-02-15"}, {
            "num": "0",
            "time": "2020-02-16"
          }, {"num": "0", "time": "2020-02-17"}, {"num": "0", "time": "2020-02-18"}, {
            "num": "0",
            "time": "2020-02-19"
          }, {"num": "0", "time": "2020-02-20"}, {"num": "0", "time": "2020-02-21"}, {
            "num": "0",
            "time": "2020-02-22"
          }, {"num": "0", "time": "2020-02-23"}, {"num": "0", "time": "2020-02-24"}, {
            "num": "0",
            "time": "2020-02-25"
          }, {"num": "0", "time": "2020-02-26"}, {"num": "0", "time": "2020-02-27"}, {
            "num": "0",
            "time": "2020-02-28"
          }, {"num": "0", "time": "2020-02-29"}, {"num": "0", "time": "2020-03-01"}, {
            "num": "0",
            "time": "2020-03-02"
          }, {"num": "0", "time": "2020-03-03"}, {"num": "0", "time": "2020-03-04"}],
          "nameCn": "尾款支付人数",
          "currentNum": "0",
          "lastWeek": "-",
          "lastDate": "-",
          "isActive": true
        }, {
          "wmallCoreIndicatorsDayValueVos": [{"num": "0", "time": "2020-02-03"}, {
            "num": "0",
            "time": "2020-02-04"
          }, {"num": "0", "time": "2020-02-05"}, {"num": "0", "time": "2020-02-06"}, {
            "num": "0",
            "time": "2020-02-07"
          }, {"num": "0", "time": "2020-02-08"}, {"num": "0", "time": "2020-02-09"}, {
            "num": "0",
            "time": "2020-02-10"
          }, {"num": "0", "time": "2020-02-11"}, {"num": "0", "time": "2020-02-12"}, {
            "num": "0",
            "time": "2020-02-13"
          }, {"num": "0", "time": "2020-02-14"}, {"num": "0", "time": "2020-02-15"}, {
            "num": "0",
            "time": "2020-02-16"
          }, {"num": "0", "time": "2020-02-17"}, {"num": "0", "time": "2020-02-18"}, {
            "num": "0",
            "time": "2020-02-19"
          }, {"num": "0", "time": "2020-02-20"}, {"num": "0", "time": "2020-02-21"}, {
            "num": "0",
            "time": "2020-02-22"
          }, {"num": "0", "time": "2020-02-23"}, {"num": "0", "time": "2020-02-24"}, {
            "num": "0",
            "time": "2020-02-25"
          }, {"num": "0", "time": "2020-02-26"}, {"num": "0", "time": "2020-02-27"}, {
            "num": "0",
            "time": "2020-02-28"
          }, {"num": "0", "time": "2020-02-29"}, {"num": "0", "time": "2020-03-01"}, {
            "num": "0",
            "time": "2020-03-02"
          }, {"num": "0", "time": "2020-03-03"}, {"num": "0", "time": "2020-03-04"}],
          "nameCn": "尾款支付金额 ",
          "currentNum": "0",
          "lastWeek": "-",
          "lastDate": "-",
          "isActive": true
        }];
      this.$nextTick(() => {
        this.parentBoxWidth = this.$refs.parentBox.offsetWidth;
        this.childBoxWidth = this.$refs.childBox.children[0].offsetWidth - 1;
        this.clickCoreIndexBtn()
      })
    },
    /* 获取流量看板数据获取函数 */
    getQueryFlowBoard(params) {
      this.trafficIndexList = [
        {
          "chartText": {
            "nameCn": "跳失率",
            "currentNum": "5%",
            "lastDate": "-16.67",
            "lastWeek": "-50.00",
            "remark": "访问单个页面的人数/访客数"
          }, "chartOption": {
            "tooltip": {
              "trigger": "axis",
              "axisPointer": {"type": "shadow", "label": {"show": true, "backgroundColor": "#7B7DDC"}}
            },
            "grid": {"top": "10%", "left": "3%", "right": "8%", "bottom": "3%", "containLabel": true},
            "xAxis": [{
              "type": "category",
              "boundaryGap": false,
              "axisLine": {"lineStyle": {"color": "#57617B"}},
              "data": ["2020-02-03", "2020-02-04", "2020-02-05", "2020-02-06", "2020-02-07", "2020-02-08", "2020-02-09", "2020-02-10", "2020-02-11", "2020-02-12", "2020-02-13", "2020-02-14", "2020-02-15", "2020-02-16", "2020-02-17", "2020-02-18", "2020-02-19", "2020-02-20", "2020-02-21", "2020-02-22", "2020-02-23", "2020-02-24", "2020-02-25", "2020-02-26", "2020-02-27", "2020-02-28", "2020-02-29", "2020-03-01", "2020-03-02", "2020-03-03", "2020-03-04"]
            }],
            "yAxis": [{
              "type": "value",
              "axisTick": {"show": false},
              "axisLabel": {
                "color": "rgb(3,3,3)",
                "formatter": "{value}%",
                "margin": 10,
                "textStyle": {"fontSize": 14}
              },
              "axisLine": {"show": false},
              "splitLine": {"show": false}
            }],
            "series": [{
              "type": "line",
              "smooth": true,
              "areaStyle": {
                "normal": {
                  "color": "rgba(51, 136, 255, 0.4)",
                  "shadowColor": "rgba(0, 0, 0, 0.1)",
                  "shadowBlur": 10
                }
              },
              "lineStyle": {"normal": {"width": 3}},
              "itemStyle": {"normal": {"color": "rgb(51, 136, 255)", "borderWidth": 4}},
              "data": [7.01, 8, 7.001, 7.00001, 7.000001, 9, 11, 10, 7.00001, 9, 8, 6, 8, 11, 9, 7.0001, 8, 7.001, 8, 8, 12, 13, 10, 10, 7.00001, 10, 10, 12, 10, 6, 5]
            }]
          }
        }, {
          "chartText": {
            "nameCn": "人均浏览量",
            "currentNum": "20.39",
            "lastDate": "39.09",
            "lastWeek": "68.23",
            "remark": "浏览量/访客数"
          }, "chartOption": {
            "tooltip": {
              "trigger": "axis",
              "axisPointer": {"type": "shadow", "label": {"show": true, "backgroundColor": "#7B7DDC"}}
            },
            "grid": {"top": "10%", "left": "3%", "right": "8%", "bottom": "3%", "containLabel": true},
            "xAxis": [{
              "type": "category",
              "boundaryGap": false,
              "axisLine": {"lineStyle": {"color": "#57617B"}},
              "data": ["2020-02-03", "2020-02-04", "2020-02-05", "2020-02-06", "2020-02-07", "2020-02-08", "2020-02-09", "2020-02-10", "2020-02-11", "2020-02-12", "2020-02-13", "2020-02-14", "2020-02-15", "2020-02-16", "2020-02-17", "2020-02-18", "2020-02-19", "2020-02-20", "2020-02-21", "2020-02-22", "2020-02-23", "2020-02-24", "2020-02-25", "2020-02-26", "2020-02-27", "2020-02-28", "2020-02-29", "2020-03-01", "2020-03-02", "2020-03-03", "2020-03-04"]
            }],
            "yAxis": [{
              "type": "value",
              "axisTick": {"show": false},
              "axisLabel": {"color": "rgb(3,3,3)", "formatter": "{value}", "margin": 10, "textStyle": {"fontSize": 14}},
              "axisLine": {"show": false},
              "splitLine": {"show": false}
            }],
            "series": [{
              "type": "line",
              "smooth": true,
              "areaStyle": {
                "normal": {
                  "color": "rgba(51, 136, 255, 0.4)",
                  "shadowColor": "rgba(0, 0, 0, 0.1)",
                  "shadowBlur": 10
                }
              },
              "lineStyle": {"normal": {"width": 3}},
              "itemStyle": {"normal": {"color": "rgb(51, 136, 255)", "borderWidth": 4}},
              "data": ["14", "12", "11", "18", "18.92", "13.33", "13.67", "11.43", "14.65", "15.51", "13.16", "16.93", "16.07", "12.82", "14", "13.82", "11.23", "13.26", "17.67", "16.75", "14.07", "11.61", "15.19", "12.12", "11.63", "10.32", "14.59", "10.49", "11.36", "14.66", "20.39"]
            }]
          }
        }, {
          "chartText": {
            "nameCn": "平均停留时长",
            "currentNum": "248.23s",
            "lastDate": "15.63",
            "lastWeek": "53.66",
            "remark": "访客停留总时长/访客数"
          }, "chartOption": {
            "tooltip": {
              "trigger": "axis",
              "axisPointer": {"type": "shadow", "label": {"show": true, "backgroundColor": "#7B7DDC"}}
            },
            "grid": {"top": "10%", "left": "3%", "right": "8%", "bottom": "3%", "containLabel": true},
            "xAxis": [{
              "type": "category",
              "boundaryGap": false,
              "axisLine": {"lineStyle": {"color": "#57617B"}},
              "data": ["2020-02-03", "2020-02-04", "2020-02-05", "2020-02-06", "2020-02-07", "2020-02-08", "2020-02-09", "2020-02-10", "2020-02-11", "2020-02-12", "2020-02-13", "2020-02-14", "2020-02-15", "2020-02-16", "2020-02-17", "2020-02-18", "2020-02-19", "2020-02-20", "2020-02-21", "2020-02-22", "2020-02-23", "2020-02-24", "2020-02-25", "2020-02-26", "2020-02-27", "2020-02-28", "2020-02-29", "2020-03-01", "2020-03-02", "2020-03-03", "2020-03-04"]
            }],
            "yAxis": [{
              "type": "value",
              "axisTick": {"show": false},
              "axisLabel": {
                "color": "rgb(3,3,3)",
                "formatter": "{value}s",
                "margin": 10,
                "textStyle": {"fontSize": 14}
              },
              "axisLine": {"show": false},
              "splitLine": {"show": false}
            }],
            "series": [{
              "type": "line",
              "smooth": true,
              "areaStyle": {
                "normal": {
                  "color": "rgba(51, 136, 255, 0.4)",
                  "shadowColor": "rgba(0, 0, 0, 0.1)",
                  "shadowBlur": 10
                }
              },
              "lineStyle": {"normal": {"width": 3}},
              "itemStyle": {"normal": {"color": "rgb(51, 136, 255)", "borderWidth": 4}},
              "data": ["188.41", "157.70", "207.69", "0.00", "0.00", "121.42", "281.43", "149.92", "157.40", "162.56", "167.11", "171.24", "171.65", "202.45", "182.95", "150.88", "186.77", "208.43", "222.70", "205.69", "238.94", "170.11", "204.90", "161.55", "129.50", "134.52", "142.51", "141.29", "159.42", "214.67", "248.23"]
            }]
          }
        }]
      this.percentList = [
        {
          "chartText": {"nameCn": "商品访问转化率", "lastDate": "12.25", "lastWeek": "5.11", "remark": "商品访客数/访客数"},
          "progressBox": {"currentNum": 84.78, "color": "#3c8dfe"}
        }, {
          "chartText": {"nameCn": "访问-加购转化率", "lastDate": "22.99", "lastWeek": "109.46", "remark": "加购人数/访客数"},
          "progressBox": {"currentNum": 48.57, "color": "#926eff"}
        }, {
          "chartText": {"nameCn": "访问-支付转化率", "lastDate": "1588.64", "lastWeek": "44.55", "remark": "支付人数/访客数"},
          "progressBox": {"currentNum": 7.43, "color": "#67bed7"}
        }]
    },
    /* 获取客户看板数据获取函数 */
    getQueryCustomerBoard(params) {
      this.wxIndexList = [
        {
          "wmallCoreIndicatorsDayValueVos": [{"num": "4345934", "time": "2020-02-03"}, {
            "num": "4379889",
            "time": "2020-02-04"
          }, {"num": "4434677", "time": "2020-02-05"}, {"num": "4483916", "time": "2020-02-06"}, {
            "num": "4529703",
            "time": "2020-02-07"
          }, {"num": "4545336", "time": "2020-02-08"}, {"num": "4577852", "time": "2020-02-09"}, {
            "num": "4605399",
            "time": "2020-02-10"
          }, {"num": "4649992", "time": "2020-02-11"}, {"num": "4677638", "time": "2020-02-12"}, {
            "num": "4704510",
            "time": "2020-02-13"
          }, {"num": "4745697", "time": "2020-02-14"}, {"num": "4778501", "time": "2020-02-15"}, {
            "num": "4799705",
            "time": "2020-02-16"
          }, {"num": "4826867", "time": "2020-02-17"}, {"num": "4853271", "time": "2020-02-18"}, {
            "num": "4891669",
            "time": "2020-02-19"
          }, {"num": "4937792", "time": "2020-02-20"}, {"num": "4982631", "time": "2020-02-21"}, {
            "num": "5026590",
            "time": "2020-02-22"
          }, {"num": "5053611", "time": "2020-02-23"}, {"num": "5078203", "time": "2020-02-24"}, {
            "num": "5099578",
            "time": "2020-02-25"
          }, {"num": "5128846", "time": "2020-02-26"}, {"num": "5174775", "time": "2020-02-27"}, {
            "num": "5211877",
            "time": "2020-02-28"
          }, {"num": "5239303", "time": "2020-02-29"}, {"num": "5253117", "time": "2020-03-01"}, {
            "num": "5276249",
            "time": "2020-03-02"
          }, {"num": "5330620", "time": "2020-03-03"}, {"num": "8401562", "time": "2020-03-04"}],
          "nameCn": "累计访客数",
          "currentNum": "8401562",
          "lastWeek": "5.32",
          "lastDate": "1.33"
        }, {
          "wmallCoreIndicatorsDayValueVos": [{"num": "37577", "time": "2020-02-03"}, {
            "num": "33955",
            "time": "2020-02-04"
          }, {"num": "54788", "time": "2020-02-05"}, {"num": "49239", "time": "2020-02-06"}, {
            "num": "45787",
            "time": "2020-02-07"
          }, {"num": "15633", "time": "2020-02-08"}, {"num": "32516", "time": "2020-02-09"}, {
            "num": "27547",
            "time": "2020-02-10"
          }, {"num": "44593", "time": "2020-02-11"}, {"num": "27646", "time": "2020-02-12"}, {
            "num": "26872",
            "time": "2020-02-13"
          }, {"num": "41187", "time": "2020-02-14"}, {"num": "32804", "time": "2020-02-15"}, {
            "num": "21204",
            "time": "2020-02-16"
          }, {"num": "27162", "time": "2020-02-17"}, {"num": "26404", "time": "2020-02-18"}, {
            "num": "38398",
            "time": "2020-02-19"
          }, {"num": "46123", "time": "2020-02-20"}, {"num": "44839", "time": "2020-02-21"}, {
            "num": "43959",
            "time": "2020-02-22"
          }, {"num": "27021", "time": "2020-02-23"}, {"num": "24592", "time": "2020-02-24"}, {
            "num": "21375",
            "time": "2020-02-25"
          }, {"num": "29268", "time": "2020-02-26"}, {"num": "45929", "time": "2020-02-27"}, {
            "num": "37102",
            "time": "2020-02-28"
          }, {"num": "27426", "time": "2020-02-29"}, {"num": "13814", "time": "2020-03-01"}, {
            "num": "23132",
            "time": "2020-03-02"
          }, {"num": "54371", "time": "2020-03-03"}, {"num": "70942", "time": "2020-03-04"}],
          "nameCn": "新增访客数",
          "currentNum": "70942",
          "lastWeek": "142.39",
          "lastDate": "30.48"
        }, {
          "wmallCoreIndicatorsDayValueVos": [{"num": "258049", "time": "2020-02-03"}, {
            "num": "250704",
            "time": "2020-02-04"
          }, {"num": "362648", "time": "2020-02-05"}, {"num": "327050", "time": "2020-02-06"}, {
            "num": "350051",
            "time": "2020-02-07"
          }, {"num": "169914", "time": "2020-02-08"}, {"num": "227526", "time": "2020-02-09"}, {
            "num": "234724",
            "time": "2020-02-10"
          }, {"num": "332549", "time": "2020-02-11"}, {"num": "237997", "time": "2020-02-12"}, {
            "num": "216457",
            "time": "2020-02-13"
          }, {"num": "314398", "time": "2020-02-14"}, {"num": "260957", "time": "2020-02-15"}, {
            "num": "185700",
            "time": "2020-02-16"
          }, {"num": "234992", "time": "2020-02-17"}, {"num": "234421", "time": "2020-02-18"}, {
            "num": "266913",
            "time": "2020-02-19"
          }, {"num": "319950", "time": "2020-02-20"}, {"num": "312160", "time": "2020-02-21"}, {
            "num": "317482",
            "time": "2020-02-22"
          }, {"num": "229018", "time": "2020-02-23"}, {"num": "209171", "time": "2020-02-24"}, {
            "num": "172321",
            "time": "2020-02-25"
          }, {"num": "230050", "time": "2020-02-26"}, {"num": "330444", "time": "2020-02-27"}, {
            "num": "262767",
            "time": "2020-02-28"
          }, {"num": "223425", "time": "2020-02-29"}, {"num": "128692", "time": "2020-03-01"}, {
            "num": "180356",
            "time": "2020-03-02"
          }, {"num": "281537", "time": "2020-03-03"}, {"num": "370318", "time": "2020-03-04"}],
          "nameCn": "当日访客数",
          "currentNum": "370318",
          "lastWeek": "60.97",
          "lastDate": "31.53"
        }]
      this.wyIndexList = [
        {
          "wmallCoreIndicatorsDayValueVos": [{"num": "2173501", "time": "2020-02-03"}, {
            "num": "2188939",
            "time": "2020-02-04"
          }, {"num": "2214191", "time": "2020-02-05"}, {"num": "2238241", "time": "2020-02-06"}, {
            "num": "2258486",
            "time": "2020-02-07"
          }, {"num": "2265231", "time": "2020-02-08"}, {"num": "2276237", "time": "2020-02-09"}, {
            "num": "2286930",
            "time": "2020-02-10"
          }, {"num": "2301528", "time": "2020-02-11"}, {"num": "2310726", "time": "2020-02-12"}, {
            "num": "2321468",
            "time": "2020-02-13"
          }, {"num": "2338361", "time": "2020-02-14"}, {"num": "2352552", "time": "2020-02-15"}, {
            "num": "2361218",
            "time": "2020-02-16"
          }, {"num": "2371316", "time": "2020-02-17"}, {"num": "2382021", "time": "2020-02-18"}, {
            "num": "2398730",
            "time": "2020-02-19"
          }, {"num": "2419585", "time": "2020-02-20"}, {"num": "2439374", "time": "2020-02-21"}, {
            "num": "2459755",
            "time": "2020-02-22"
          }, {"num": "2470684", "time": "2020-02-23"}, {"num": "2480809", "time": "2020-02-24"}, {
            "num": "2489920",
            "time": "2020-02-25"
          }, {"num": "2501663", "time": "2020-02-26"}, {"num": "2519798", "time": "2020-02-27"}, {
            "num": "2534729",
            "time": "2020-02-28"
          }, {"num": "2546327", "time": "2020-02-29"}, {"num": "2551254", "time": "2020-03-01"}, {
            "num": "2560063",
            "time": "2020-03-02"
          }, {"num": "2584024", "time": "2020-03-03"}, {"num": "6617040", "time": "2020-03-04"}],
          "nameCn": "累积会员数",
          "currentNum": "5617040",
          "lastWeek": "4.61",
          "lastDate": "1.28"
        }, {
          "wmallCoreIndicatorsDayValueVos": [{"num": "16048", "time": "2020-02-03"}, {
            "num": "15438",
            "time": "2020-02-04"
          }, {"num": "25252", "time": "2020-02-05"}, {"num": "24050", "time": "2020-02-06"}, {
            "num": "20245",
            "time": "2020-02-07"
          }, {"num": "6745", "time": "2020-02-08"}, {"num": "11006", "time": "2020-02-09"}, {
            "num": "10693",
            "time": "2020-02-10"
          }, {"num": "14598", "time": "2020-02-11"}, {"num": "9198", "time": "2020-02-12"}, {
            "num": "10742",
            "time": "2020-02-13"
          }, {"num": "16893", "time": "2020-02-14"}, {"num": "14191", "time": "2020-02-15"}, {
            "num": "8666",
            "time": "2020-02-16"
          }, {"num": "10098", "time": "2020-02-17"}, {"num": "10705", "time": "2020-02-18"}, {
            "num": "16709",
            "time": "2020-02-19"
          }, {"num": "20855", "time": "2020-02-20"}, {"num": "19789", "time": "2020-02-21"}, {
            "num": "20381",
            "time": "2020-02-22"
          }, {"num": "10929", "time": "2020-02-23"}, {"num": "10125", "time": "2020-02-24"}, {
            "num": "9111",
            "time": "2020-02-25"
          }, {"num": "11743", "time": "2020-02-26"}, {"num": "18135", "time": "2020-02-27"}, {
            "num": "14931",
            "time": "2020-02-28"
          }, {"num": "11598", "time": "2020-02-29"}, {"num": "4927", "time": "2020-03-01"}, {
            "num": "8809",
            "time": "2020-03-02"
          }, {"num": "23961", "time": "2020-03-03"}, {"num": "33016", "time": "2020-03-04"}],
          "nameCn": "新增会员数",
          "currentNum": "33016",
          "lastWeek": "181.15",
          "lastDate": "37.79"
        }, {
          "wmallCoreIndicatorsDayValueVos": [{"num": "35521", "time": "2020-02-03"}, {
            "num": "1989",
            "time": "2020-02-04"
          }, {"num": "31450", "time": "2020-02-05"}, {"num": "26108", "time": "2020-02-06"}, {
            "num": "36646",
            "time": "2020-02-07"
          }, {"num": "3066", "time": "2020-02-08"}, {"num": "10415", "time": "2020-02-09"}, {
            "num": "2582",
            "time": "2020-02-10"
          }, {"num": "25175", "time": "2020-02-11"}, {"num": "13179", "time": "2020-02-12"}, {
            "num": "2745",
            "time": "2020-02-13"
          }, {"num": "31807", "time": "2020-02-14"}, {"num": "22521", "time": "2020-02-15"}, {
            "num": "7836",
            "time": "2020-02-16"
          }, {"num": "1580", "time": "2020-02-17"}, {"num": "15006", "time": "2020-02-18"}, {
            "num": "2217",
            "time": "2020-02-19"
          }, {"num": "20386", "time": "2020-02-20"}, {"num": "27935", "time": "2020-02-21"}, {
            "num": "23684",
            "time": "2020-02-22"
          }, {"num": "12029", "time": "2020-02-23"}, {"num": "3039", "time": "2020-02-24"}, {
            "num": "15085",
            "time": "2020-02-25"
          }, {"num": "11816", "time": "2020-02-26"}, {"num": "15198", "time": "2020-02-27"}, {
            "num": "8840",
            "time": "2020-02-28"
          }, {"num": "14715", "time": "2020-02-29"}, {"num": "2331", "time": "2020-03-01"}, {
            "num": "1115",
            "time": "2020-03-02"
          }, {"num": "1249", "time": "2020-03-03"}, {"num": "27504", "time": "2020-03-04"}],
          "nameCn": "成交会员数",
          "currentNum": "27504",
          "lastWeek": "132.77",
          "lastDate": "2102.08"
        }]
      this.wxOption.legend.data = ["累计访客数", "新增访客数", "当日访客数"]
      this.wyOption.legend.data = ["累积会员数", "新增会员数", "成交会员数"]
      this.wxOption.xAxis[0].data = ["2020-02-03", "2020-02-04", "2020-02-05", "2020-02-06", "2020-02-07", "2020-02-08", "2020-02-09", "2020-02-10", "2020-02-11", "2020-02-12", "2020-02-13", "2020-02-14", "2020-02-15", "2020-02-16", "2020-02-17", "2020-02-18", "2020-02-19", "2020-02-20", "2020-02-21", "2020-02-22", "2020-02-23", "2020-02-24", "2020-02-25", "2020-02-26", "2020-02-27", "2020-02-28", "2020-02-29", "2020-03-01", "2020-03-02", "2020-03-03", "2020-03-04"]
      this.wyOption.xAxis[0].data = ["2020-02-03", "2020-02-04", "2020-02-05", "2020-02-06", "2020-02-07", "2020-02-08", "2020-02-09", "2020-02-10", "2020-02-11", "2020-02-12", "2020-02-13", "2020-02-14", "2020-02-15", "2020-02-16", "2020-02-17", "2020-02-18", "2020-02-19", "2020-02-20", "2020-02-21", "2020-02-22", "2020-02-23", "2020-02-24", "2020-02-25", "2020-02-26", "2020-02-27", "2020-02-28", "2020-02-29", "2020-03-01", "2020-03-02", "2020-03-03", "2020-03-04"]
      this.wxOption.series = [
        {
          "name": "累计访客数",
          "type": "line",
          "smooth": true,
          "areaStyle": {
            "normal": {
              "color": "rgba(51, 136, 255, 0.4)",
              "shadowColor": "rgba(0, 0, 0, 0.1)",
              "shadowBlur": 10
            }
          },
          "lineStyle": {"normal": {"width": 3}},
          "itemStyle": {"normal": {"color": "rgb(51, 136, 255)", "borderWidth": 4}},
          "data": ["4345934", "4379889", "4434677", "4483916", "4529703", "4545336", "4577852", "4605399", "4649992", "4677638", "4704510", "4745697", "4778501", "4799705", "4826867", "4853271", "4891669", "4937792", "4982631", "5026590", "5053611", "5078203", "5099578", "5128846", "5174775", "5211877", "5239303", "5253117", "5276249", "5330620", "8401562"]
        }, {
          "name": "新增访客数",
          "type": "line",
          "smooth": true,
          "areaStyle": {
            "normal": {
              "color": "rgba(255, 102, 0, 0.4)",
              "shadowColor": "rgba(0, 0, 0, 0.1)",
              "shadowBlur": 10
            }
          },
          "lineStyle": {"normal": {"width": 3}},
          "itemStyle": {"normal": {"color": "rgb(255, 102, 0)", "borderWidth": 4}},
          "data": ["37577", "33955", "54788", "49239", "45787", "15633", "32516", "27547", "44593", "27646", "26872", "41187", "32804", "21204", "27162", "26404", "38398", "46123", "44839", "43959", "27021", "24592", "21375", "29268", "45929", "37102", "27426", "13814", "23132", "54371", "70942"]
        }, {
          "name": "当日访客数",
          "type": "line",
          "smooth": true,
          "areaStyle": {
            "normal": {
              "color": "rgba(80, 227, 194, 0.4)",
              "shadowColor": "rgba(0, 0, 0, 0.1)",
              "shadowBlur": 10
            }
          },
          "lineStyle": {"normal": {"width": 3}},
          "itemStyle": {"normal": {"color": "rgb(80, 227, 194)", "borderWidth": 4}},
          "data": ["258049", "250704", "362648", "327050", "350051", "169914", "227526", "234724", "332549", "237997", "216457", "314398", "260957", "185700", "234992", "234421", "266913", "319950", "312160", "317482", "229018", "209171", "172321", "230050", "330444", "262767", "223425", "128692", "180356", "281537", "370318"]
        }]
      this.wyOption.series = [
        {
          "name": "累积会员数",
          "type": "line",
          "smooth": true,
          "areaStyle": {
            "normal": {
              "color": "rgba(51, 136, 255, 0.4)",
              "shadowColor": "rgba(0, 0, 0, 0.1)",
              "shadowBlur": 10
            }
          },
          "lineStyle": {"normal": {"width": 3}},
          "itemStyle": {"normal": {"color": "rgb(51, 136, 255)", "borderWidth": 4}},
          "data": ["2173501", "2188939", "2214191", "2238241", "2258486", "2265231", "2276237", "2286930", "2301528", "2310726", "2321468", "2338361", "2352552", "2361218", "2371316", "2382021", "2398730", "2419585", "2439374", "2459755", "2470684", "2480809", "2489920", "2501663", "2519798", "2534729", "2546327", "2551254", "2560063", "2584024", "2617040"]
        }, {
          "name": "新增会员数",
          "type": "line",
          "smooth": true,
          "areaStyle": {
            "normal": {
              "color": "rgba(255, 102, 0, 0.4)",
              "shadowColor": "rgba(0, 0, 0, 0.1)",
              "shadowBlur": 10
            }
          },
          "lineStyle": {"normal": {"width": 3}},
          "itemStyle": {"normal": {"color": "rgb(255, 102, 0)", "borderWidth": 4}},
          "data": ["16048", "15438", "25252", "24050", "20245", "6745", "11006", "10693", "14598", "9198", "10742", "16893", "14191", "8666", "10098", "10705", "16709", "20855", "19789", "20381", "10929", "10125", "9111", "11743", "18135", "14931", "11598", "4927", "8809", "23961", "33016"]
        }, {
          "name": "成交会员数",
          "type": "line",
          "smooth": true,
          "areaStyle": {
            "normal": {
              "color": "rgba(80, 227, 194, 0.4)",
              "shadowColor": "rgba(0, 0, 0, 0.1)",
              "shadowBlur": 10
            }
          },
          "lineStyle": {"normal": {"width": 3}},
          "itemStyle": {"normal": {"color": "rgb(80, 227, 194)", "borderWidth": 4}},
          "data": ["35521", "1989", "31450", "26108", "36646", "3066", "10415", "2582", "25175", "13179", "2745", "31807", "22521", "7836", "1580", "15006", "2217", "20386", "27935", "23684", "12029", "3039", "15085", "11816", "15198", "8840", "14715", "2331", "1115", "1249", "27504"]
        }]
    },
    /* 点击核心指标处理参数 */
    clickCoreIndexBtn(row) {
      if (row) {
        row.isActive = !row.isActive
      }
      this.coreOptions.yAxis = [{
        "splitLine": {"show": true},
        "axisLine": {"show": false, "lineStyle": {"color": "#B4B4B4"}},
        "axisLabel": {"color": "rgb(3,3,3)", "formatter": "{value} "}
      }, {
        "splitLine": {"show": false},
        "axisLine": {"show": false, "lineStyle": {"color": "#B4B4B4"}},
        "axisLabel": {"color": "rgb(3,3,3)", "formatter": "{value}%"}
      }]
      this.coreOptions.series = [
        {
          "name": "支付金额",
          "type": "line",
          "smooth": true,
          "lineStyle": {"normal": {"width": 3}},
          "itemStyle": {"normal": {"color": "#269fff", "borderWidth": 4}},
          "data": ["4186513.35", "185313.1", "4118582.37", "2587843.76", "4556315.89", "208608.3", "880118.2", "179132.6", "2592627.9", "1555346.55", "167814.38", "2963746.13", "2603966.03", "508503.85", "132370.95", "2215105.32", "169274.66", "2337531.34", "3424322", "2509449.47", "767701.12", "312509.95", "2358967.6", "2375383.51", "1909288.99", "2733763.65", "1792398.85", "193817.85", "80915.55", "164357.1", "3987887.9"]
        }, {
          "name": "支付人数",
          "type": "line",
          "smooth": true,
          "lineStyle": {"normal": {"width": 3}},
          "itemStyle": {"normal": {"color": "#fe840d", "borderWidth": 4}},
          "data": ["35521", "1989", "31450", "26108", "36646", "3066", "10415", "2582", "25175", "13179", "2745", "31807", "22521", "7836", "1580", "15006", "2217", "20386", "27935", "23684", "12029", "3039", "15085", "11816", "15198", "8840", "14715", "2331", "1115", "1249", "27504"]
        }, {
          "name": "支付订单数",
          "type": "line",
          "smooth": true,
          "lineStyle": {"normal": {"width": 3}},
          "itemStyle": {"normal": {"color": "#5793f3", "borderWidth": 4}},
          "data": ["42293", "2096", "35886", "29821", "41690", "3254", "12134", "2705", "28367", "14806", "3065", "35662", "25479", "9149", "1678", "16793", "2455", "22813", "32288", "27280", "14260", "3434", "16649", "13492", "16637", "9765", "16345", "2497", "1208", "1376", "31532"]
        }, {
          "name": "客单价",
          "type": "line",
          "smooth": true,
          "lineStyle": {"normal": {"width": 3}},
          "itemStyle": {"normal": {"color": "#d14a61", "borderWidth": 4}},
          "data": ["117.86", "93.17", "130.96", "99.12", "124.33", "68.04", "84.5", "69.38", "102.98", "118.02", "61.13", "93.18", "115.62", "64.89", "83.78", "147.61", "76.35", "114.66", "122.58", "105.96", "63.82", "102.83", "156.38", "201.03", "125.63", "309.25", "121.81", "83.15", "72.57", "131.59", "144.99"]
        }, {
          "name": "访客数",
          "type": "line",
          "smooth": true,
          "lineStyle": {"normal": {"width": 3}},
          "itemStyle": {"normal": {"color": "#675bba", "borderWidth": 4}},
          "data": ["258049", "250704", "362648", "327050", "350051", "169914", "227526", "234724", "332549", "237997", "216457", "314398", "260957", "185700", "234992", "234421", "266913", "319950", "312160", "317482", "229018", "209171", "172321", "230050", "330444", "262767", "223425", "128692", "180356", "281537", "370318"]
        }, {
          "name": "浏览量",
          "type": "line",
          "smooth": true,
          "lineStyle": {"normal": {"width": 3}},
          "itemStyle": {"normal": {"borderWidth": 4}},
          "data": ["4569304", "3190599", "7010228", "5993012", "6623371", "2264698", "3110327", "2681920", "4871659", "3692419", "2847815", "5323630", "4192648", "2381494", "2738297", "3474851", "3530004", "6161398", "5515083", "5318050", "3221615", "2428588", "2617482", "2787611", "3844059", "2710830", "2813934", "1350117", "2049457", "4127410", "7549345"]
        }, {
          "name": "访问-支付转化率",
          "type": "line",
          "smooth": true,
          "lineStyle": {"normal": {"width": 3}},
          "itemStyle": {"normal": {"borderWidth": 4}},
          "data": ["13.77", "0.79", "8.67", "7.98", "10.47", "1.80", "4.58", "1.10", "7.57", "5.54", "1.27", "10.12", "8.63", "4.22", "0.67", "6.40", "0.83", "6.37", "8.95", "7.46", "5.25", "1.45", "8.75", "5.14", "4.60", "3.36", "6.59", "1.81", "0.62", "0.44", "7.43"],
          "yAxisIndex": 1
        }, {
          "name": "异业订单数",
          "type": "line",
          "smooth": true,
          "lineStyle": {"normal": {"width": 3}},
          "itemStyle": {"normal": {"borderWidth": 4}},
          "data": ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "3", "0", "0", "0", "0", "0", "0", "0", "0", "753", "1", "6218", "0", "0", "0", "0", "0"]
        }, {
          "name": "异业订单金额",
          "type": "line",
          "smooth": true,
          "lineStyle": {"normal": {"width": 3}},
          "itemStyle": {"normal": {"borderWidth": 4}},
          "data": ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0.03", "0", "0", "0", "0", "0", "0", "0", "0", "539882", "699", "2431628.95", "0", "0", "0", "0", "0"]
        }, {
          "name": "退款订单数",
          "type": "line",
          "smooth": true,
          "lineStyle": {"normal": {"width": 3}},
          "itemStyle": {"normal": {"borderWidth": 4}},
          "data": ["4147", "1357", "4536", "4262", "6427", "1825", "1938", "1215", "2682", "2611", "1509", "3147", "3308", "1408", "898", "1835", "732", "1859", "2848", "2229", "1879", "1313", "1330", "1635", "1761", "1266", "1407", "915", "511", "785", "3135"]
        }, {
          "name": "退款金额",
          "type": "line",
          "smooth": true,
          "lineStyle": {"normal": {"width": 3}},
          "itemStyle": {"normal": {"borderWidth": 4}},
          "data": ["436668.25", "152889.75", "507983.57", "410371.65", "670547.93", "179020.05", "163730.12", "104390.08", "261933", "260602.8", "135855.46", "298391.11", "355587.69", "129358", "81314.14", "260059.04", "80267.75", "209024.6", "324669.85", "214191.22", "143513.18", "113227.84", "216705.74", "337684.13", "284751.37", "363622.35", "238135.06", "152898.92", "78902.64", "140973.41", "410936.57"]
        }, {
          "name": "定金支付人数",
          "type": "line",
          "smooth": true,
          "lineStyle": {"normal": {"width": 3}},
          "itemStyle": {"normal": {"borderWidth": 4}},
          "data": ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"]
        }, {
          "name": "定金支付金额",
          "type": "line",
          "smooth": true,
          "lineStyle": {"normal": {"width": 3}},
          "itemStyle": {"normal": {"borderWidth": 4}},
          "data": ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"]
        }, {
          "name": "尾款支付人数",
          "type": "line",
          "smooth": true,
          "lineStyle": {"normal": {"width": 3}},
          "itemStyle": {"normal": {"borderWidth": 4}},
          "data": ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"]
        }, {
          "name": "尾款支付金额 ",
          "type": "line",
          "smooth": true,
          "lineStyle": {"normal": {"width": 3}},
          "itemStyle": {"normal": {"borderWidth": 4}},
          "data": ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"]
        }]
      this.coreOptions.legend.data = [
        {
          "name": "支付金额",
          "type": "line",
          "smooth": true,
          "lineStyle": {"normal": {"width": 3}},
          "itemStyle": {"normal": {"color": "#269fff", "borderWidth": 4}},
          "data": ["4186513.35", "185313.1", "4118582.37", "2587843.76", "4556315.89", "208608.3", "880118.2", "179132.6", "2592627.9", "1555346.55", "167814.38", "2963746.13", "2603966.03", "508503.85", "132370.95", "2215105.32", "169274.66", "2337531.34", "3424322", "2509449.47", "767701.12", "312509.95", "2358967.6", "2375383.51", "1909288.99", "2733763.65", "1792398.85", "193817.85", "80915.55", "164357.1", "3987887.9"]
        }, {
          "name": "支付人数",
          "type": "line",
          "smooth": true,
          "lineStyle": {"normal": {"width": 3}},
          "itemStyle": {"normal": {"color": "#fe840d", "borderWidth": 4}},
          "data": ["35521", "1989", "31450", "26108", "36646", "3066", "10415", "2582", "25175", "13179", "2745", "31807", "22521", "7836", "1580", "15006", "2217", "20386", "27935", "23684", "12029", "3039", "15085", "11816", "15198", "8840", "14715", "2331", "1115", "1249", "27504"]
        }, {
          "name": "支付订单数",
          "type": "line",
          "smooth": true,
          "lineStyle": {"normal": {"width": 3}},
          "itemStyle": {"normal": {"color": "#5793f3", "borderWidth": 4}},
          "data": ["42293", "2096", "35886", "29821", "41690", "3254", "12134", "2705", "28367", "14806", "3065", "35662", "25479", "9149", "1678", "16793", "2455", "22813", "32288", "27280", "14260", "3434", "16649", "13492", "16637", "9765", "16345", "2497", "1208", "1376", "31532"]
        }, {
          "name": "客单价",
          "type": "line",
          "smooth": true,
          "lineStyle": {"normal": {"width": 3}},
          "itemStyle": {"normal": {"color": "#d14a61", "borderWidth": 4}},
          "data": ["117.86", "93.17", "130.96", "99.12", "124.33", "68.04", "84.5", "69.38", "102.98", "118.02", "61.13", "93.18", "115.62", "64.89", "83.78", "147.61", "76.35", "114.66", "122.58", "105.96", "63.82", "102.83", "156.38", "201.03", "125.63", "309.25", "121.81", "83.15", "72.57", "131.59", "144.99"]
        }, {
          "name": "访客数",
          "type": "line",
          "smooth": true,
          "lineStyle": {"normal": {"width": 3}},
          "itemStyle": {"normal": {"color": "#675bba", "borderWidth": 4}},
          "data": ["258049", "250704", "362648", "327050", "350051", "169914", "227526", "234724", "332549", "237997", "216457", "314398", "260957", "185700", "234992", "234421", "266913", "319950", "312160", "317482", "229018", "209171", "172321", "230050", "330444", "262767", "223425", "128692", "180356", "281537", "370318"]
        }, {
          "name": "浏览量",
          "type": "line",
          "smooth": true,
          "lineStyle": {"normal": {"width": 3}},
          "itemStyle": {"normal": {"borderWidth": 4}},
          "data": ["4569304", "3190599", "7010228", "5993012", "6623371", "2264698", "3110327", "2681920", "4871659", "3692419", "2847815", "5323630", "4192648", "2381494", "2738297", "3474851", "3530004", "6161398", "5515083", "5318050", "3221615", "2428588", "2617482", "2787611", "3844059", "2710830", "2813934", "1350117", "2049457", "4127410", "7549345"]
        }, {
          "name": "访问-支付转化率",
          "type": "line",
          "smooth": true,
          "lineStyle": {"normal": {"width": 3}},
          "itemStyle": {"normal": {"borderWidth": 4}},
          "data": ["13.77", "0.79", "8.67", "7.98", "10.47", "1.80", "4.58", "1.10", "7.57", "5.54", "1.27", "10.12", "8.63", "4.22", "0.67", "6.40", "0.83", "6.37", "8.95", "7.46", "5.25", "1.45", "8.75", "5.14", "4.60", "3.36", "6.59", "1.81", "0.62", "0.44", "7.43"],
          "yAxisIndex": 1
        }, {
          "name": "异业订单数",
          "type": "line",
          "smooth": true,
          "lineStyle": {"normal": {"width": 3}},
          "itemStyle": {"normal": {"borderWidth": 4}},
          "data": ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "3", "0", "0", "0", "0", "0", "0", "0", "0", "753", "1", "6218", "0", "0", "0", "0", "0"]
        }, {
          "name": "异业订单金额",
          "type": "line",
          "smooth": true,
          "lineStyle": {"normal": {"width": 3}},
          "itemStyle": {"normal": {"borderWidth": 4}},
          "data": ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0.03", "0", "0", "0", "0", "0", "0", "0", "0", "539882", "699", "2431628.95", "0", "0", "0", "0", "0"]
        }, {
          "name": "退款订单数",
          "type": "line",
          "smooth": true,
          "lineStyle": {"normal": {"width": 3}},
          "itemStyle": {"normal": {"borderWidth": 4}},
          "data": ["4147", "1357", "4536", "4262", "6427", "1825", "1938", "1215", "2682", "2611", "1509", "3147", "3308", "1408", "898", "1835", "732", "1859", "2848", "2229", "1879", "1313", "1330", "1635", "1761", "1266", "1407", "915", "511", "785", "3135"]
        }, {
          "name": "退款金额",
          "type": "line",
          "smooth": true,
          "lineStyle": {"normal": {"width": 3}},
          "itemStyle": {"normal": {"borderWidth": 4}},
          "data": ["436668.25", "152889.75", "507983.57", "410371.65", "670547.93", "179020.05", "163730.12", "104390.08", "261933", "260602.8", "135855.46", "298391.11", "355587.69", "129358", "81314.14", "260059.04", "80267.75", "209024.6", "324669.85", "214191.22", "143513.18", "113227.84", "216705.74", "337684.13", "284751.37", "363622.35", "238135.06", "152898.92", "78902.64", "140973.41", "410936.57"]
        }, {
          "name": "定金支付人数",
          "type": "line",
          "smooth": true,
          "lineStyle": {"normal": {"width": 3}},
          "itemStyle": {"normal": {"borderWidth": 4}},
          "data": ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"]
        }, {
          "name": "定金支付金额",
          "type": "line",
          "smooth": true,
          "lineStyle": {"normal": {"width": 3}},
          "itemStyle": {"normal": {"borderWidth": 4}},
          "data": ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"]
        }, {
          "name": "尾款支付人数",
          "type": "line",
          "smooth": true,
          "lineStyle": {"normal": {"width": 3}},
          "itemStyle": {"normal": {"borderWidth": 4}},
          "data": ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"]
        }, {
          "name": "尾款支付金额 ",
          "type": "line",
          "smooth": true,
          "lineStyle": {"normal": {"width": 3}},
          "itemStyle": {"normal": {"borderWidth": 4}},
          "data": ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"]
        }];
    },
    // 获取支付排名前五的 商品信息
    getSalesTop5(params) {
      this.payTableData = [
        {
          goodsName: '液体颊彩',
          price: '￥1.00',
          img: 'https://www.ifnav.com/static/images/evue-logo.png',
          views: 3268921,
          viewsRate: '32%',
        },
        {
          goodsName: '液体颊彩',
          price: '￥1.00',
          img: 'https://www.ifnav.com/static/images/evue-logo.png',
          views: 38921,
          viewsRate: '22%',
        },
        {
          goodsName: '液体颊彩',
          price: '￥1.00',
          img: 'https://www.ifnav.com/static/images/evue-logo.png',
          views: 38921,
          viewsRate: '22%',
        },
        {
          goodsName: '液体颊彩',
          price: '￥1.00',
          img: 'https://www.ifnav.com/static/images/evue-logo.png',
          views: 38921,
          viewsRate: '22%',
        },
        {
          goodsName: '液体颊彩',
          price: '￥1.00',
          img: 'https://www.ifnav.com/static/images/evue-logo.png',
          views: 38921,
          viewsRate: '22%',
        },
      ]
    },
    // 获取访问排名前五的 商品信息
    getAccessRankingTop5(params) {
      this.RankingTop5 = [
        {
          goodsName: '液体颊彩',
          price: '￥1.00',
          img: 'https://www.ifnav.com/static/images/evue-logo.png',
          views: 3268921,
          viewsRate: '32%',
        },
        {
          goodsName: '液体颊彩',
          price: '￥1.00',
          img: 'https://www.ifnav.com/static/images/evue-logo.png',
          views: 38921,
          viewsRate: '22%',
        },
        {
          goodsName: '液体颊彩',
          price: '￥1.00',
          img: 'https://www.ifnav.com/static/images/evue-logo.png',
          views: 38921,
          viewsRate: '22%',
        },
        {
          goodsName: '液体颊彩',
          price: '￥1.00',
          img: 'https://www.ifnav.com/static/images/evue-logo.png',
          views: 38921,
          viewsRate: '22%',
        },
        {
          goodsName: '液体颊彩',
          price: '￥1.00',
          img: 'https://www.ifnav.com/static/images/evue-logo.png',
          views: 38921,
          viewsRate: '22%',
        },
      ]
    },
    // 获取退货商品排名前五 refundProductInfoTopFive
    getRefundProductInfoTopFive(params) {
      this.refundGoodsTableData = [{
        "skuName": "【小完子】完美日记 「金色bb」光感持妆气垫霜",
        "productId": "2398846341918042",
        "refundTotalO": 1253,
        "refDate": "2020-03-04",
        "refundTotalA": 124213.14,
        "skuImage": "https://pub-img.perfectdiary.com/material/image/2020/02/aba4df29b3ea4cbabc4730a42bd9fb9d.jpg"
      }, {
        "skuName": "【小完子】完美日记 「小黑钻口红」 倾色慕光唇膏",
        "productId": "2398846341917931",
        "refundTotalO": 1109,
        "refDate": "2020-03-04",
        "refundTotalA": 88939.06,
        "skuImage": "https://pub-img.perfectdiary.com/material/image/2020/02/5debd879efa647eb81b76bd0b232f747.jpg"
      }, {
        "skuName": "【小完子】完美日记 完子心选面膜三盒装 完子精选 补水保湿",
        "productId": "5518671416463973",
        "refundTotalO": 122,
        "refDate": "2020-03-04",
        "refundTotalA": 22209.07,
        "skuImage": "https://pub-img.perfectdiary.com/image/2019/09/450c9349f99d47fbbd9917c75f763a54.png"
      }, {
        "skuName": "【小完子】完美日记 无痕时光遮瑕液",
        "productId": "2958165705863415",
        "refundTotalO": 103,
        "refDate": "2020-03-04",
        "refundTotalA": 5076.71,
        "skuImage": "https://pub-img.perfectdiary.com/material/image/2020/02/03277463a429457ab4f1093e05c9be21.jpg"
      }, {
        "skuName": "【小完子】 Abby's Choice完子心选 完美日记 植萃舒缓焕颜安瓶精华  肌底焕颜系列安瓶精华",
        "productId": "5913040146879042",
        "refundTotalO": 99,
        "refDate": "2020-03-04",
        "refundTotalA": 15762.82,
        "skuImage": "https://pub-img.perfectdiary.com/material/image/2020/02/60a7f2f8262742c2a4cf0be2389a501f.jpg"
      }]
    },
    // 获取退款原因排名前五 queryRefundCausalTopFive
    getQueryRefundCausalTopFive(params) {
      this.refundInfoTableData = [{
        "refundCausalRate": "75%",
        "refDate": "2020-03-04",
        "refundTotalSuccessA": 307717.35,
        "refundTotalA": 410936.57,
        "refundCausal": "拍错/多拍/不喜欢",
        "index": 1
      }, {
        "refundCausalRate": "18%",
        "refDate": "2020-03-04",
        "refundTotalSuccessA": 72641.54,
        "refundTotalA": 410936.57,
        "refundCausal": "其他",
        "index": 2
      }, {
        "refundCausalRate": "2%",
        "refDate": "2020-03-04",
        "refundTotalSuccessA": 6469.69,
        "refundTotalA": 410936.57,
        "refundCausal": "买/卖双方协商一致",
        "index": 3
      }, {
        "refundCausalRate": "1%",
        "refDate": "2020-03-04",
        "refundTotalSuccessA": 2477.87,
        "refundTotalA": 410936.57,
        "refundCausal": "买/卖双方协商一致",
        "index": 4
      }, {
        "refundCausalRate": "1%",
        "refDate": "2020-03-04",
        "refundTotalSuccessA": 2429.29,
        "refundTotalA": 410936.57,
        "refundCausal": "买错/多买/不想要",
        "index": 5
      }]
    },
    // 退货看板 交易图表数据获取
    getQuerySuccessRefundAndRate(params) {
      this.paySessionOption.series[0].data = ["0.11", "0.13", "0.09", "0.36", "0.43", "0.56", "0.1"];
      this.paySessionOption.xAxis[0].data = ["2020-02-27", "2020-02-28", "2020-02-29", "2020-03-01", "2020-03-02", "2020-03-03", "2020-03-04"];
      this.sellArr = [
        {
          "name": "成功退款金额",
          "currentNum": "410,8",
          "valueVos": [
            {"num": "282693.74", "time": "2020-02-27"}, {
              "num": "363546.74",
              "time": "2020-02-28"
            },
            {"num": "238234.06", "time": "2020-02-29"},
            {"num": "152878.92", "time": "2020-03-01"},
            {
              "num": "71210.14",
              "time": "2020-03-02"
            },
            {"num": "1406.74", "time": "2020-03-03"},
            {"num": "4107.18", "time": "2020-03-04"}
          ],
          "yesterNum": "12214",
          "remark": "当日成功退款的金额",
          "paySessionOption": {
            "tooltip": {
              "trigger": "axis",
              "axisPointer": {"type": "shadow", "label": {"show": true, "backgroundColor": "#7B7DDC"}}
            },
            "grid": {"top": "10%", "left": "3%", "right": "4%", "bottom": "3%", "containLabel": true},
            "xAxis": [{
              "type": "category",
              "boundaryGap": false,
              "axisLine": {"lineStyle": {"color": "#57617B"}},
              "data": ["2020-02-27", "2020-02-28", "2020-02-29", "2020-03-01", "2020-03-02", "2020-03-03", "2020-03-04"]
            }],
            "yAxis": [{
              "type": "value",
              "axisTick": {"show": false},
              "axisLabel": {"margin": 10, "textStyle": {"fontSize": 14}},
              "axisLine": {"show": false},
              "splitLine": {"show": false}
            }],
            "series": [{
              "type": "line",
              "smooth": true,
              "areaStyle": {
                "normal": {
                  "color": "rgba(51, 136, 255, 0.4)",
                  "shadowColor": "rgba(0, 0, 0, 0.1)",
                  "shadowBlur": 10
                }
              },
              "lineStyle": {"normal": {"width": 3}},
              "itemStyle": {"normal": {"color": "rgb(51, 136, 255)", "borderWidth": 4}},
              "data": ["28264", "363544", "23826", "152872", "78910.14", "14094", "4108"]
            }]
          }
        },
        {
          "name": "退款率",
          "currentNum": "10%",
          "valueVos": [
            {"num": "0.11", "time": "2020-02-27"},
            {"num": "0.13", "time": "2020-02-28"}, {
              "num": "0.09",
              "time": "2020-02-29"
            }, {"num": "0.36", "time": "2020-03-01"},
            {"num": "0.43", "time": "2020-03-02"}, {
              "num": "0.56",
              "time": "2020-03-03"
            }, {"num": "0.1", "time": "2020-03-04"}],
          "yesterNum": "56%",
          "remark": "筛选时间内，发起退款订单数/付款订单数",
          "paySessionOption": {
            "tooltip": {
              "trigger": "axis",
              "axisPointer": {"type": "shadow", "label": {"show": true, "backgroundColor": "#7B7DDC"}}
            },
            "grid": {"top": "10%", "left": "3%", "right": "4%", "bottom": "3%", "containLabel": true},
            "xAxis": [{
              "type": "category",
              "boundaryGap": false,
              "axisLine": {"lineStyle": {"color": "#57617B"}},
              "data": ["2020-02-27", "2020-02-28", "2020-02-29", "2020-03-01", "2020-03-02", "2020-03-03", "2020-03-04"]
            }],
            "yAxis": [{
              "type": "value",
              "axisTick": {"show": false},
              "axisLabel": {"margin": 10, "textStyle": {"fontSize": 14}},
              "axisLine": {"show": false},
              "splitLine": {"show": false}
            }],
            "series": [{
              "type": "line",
              "smooth": true,
              "areaStyle": {
                "normal": {
                  "color": "rgba(51, 136, 255, 0.4)",
                  "shadowColor": "rgba(0, 0, 0, 0.1)",
                  "shadowBlur": 10
                }
              },
              "lineStyle": {"normal": {"width": 3}},
              "itemStyle": {"normal": {"color": "rgb(51, 136, 255)", "borderWidth": 4}},
              "data": ["0.21", "0.13", "0.19", "0.26", "0.13", "0.36", "0.11"]
            }]
          }
        }]
    },
    // 获取 销售目标数据函数
    getSalesTargetManagement(params) {
      this.sellNumber = [{"num": "2121232", "name": "本月已达成"}, {"num": "112143332", "name": "上月达成"}];
      this.sellOption.xAxis[0].data = ["2020-02-03", "2020-02-04", "2020-02-05", "2020-02-06", "2020-02-07", "2020-02-08", "2020-02-09", "2020-02-10", "2020-02-11", "2020-02-12", "2020-02-13", "2020-02-14", "2020-02-15", "2020-02-16", "2020-02-17", "2020-02-18", "2020-02-19", "2020-02-20", "2020-02-21", "2020-02-22", "2020-02-23", "2020-02-24", "2020-02-25", "2020-02-26", "2020-02-27", "2020-02-28", "2020-02-29", "2020-03-01", "2020-03-02", "2020-03-03", "2020-03-04"];
      this.sellOption.series[0].data = [41823.35, 183213.1, 41482.37, 2543843.76, 46315.89, 20208.3, 83118.2, 179132.6, 259227.9, 155346.55, 1624.38, 29346.13, 26966.03, 50803.85, 132370.95, 2232105.32, 169274.66, 233431.34, 34222, 293249, 767701, 332095, 23567.6, 25383.51, 19032288.99, 2732323.65, 1732398.85, 193817.85, 8091.55, 164357.1, 3987887.9];
      this.sellOption.series[1].data = [1176.27, -32.65, 4275.98, -11.49, 30.02, -82.48, 1325.66, -91.72, 1239.05, -60.24, -93.52, -34.95, 1348.26, -42.22, -26.1, -14.56, -89.12, 1212.93, 15.54, -3.63, 50.97, 132.09, 6.49, 1403.27, -12.32, -21.17, -28.57, -71.75, -72.11, -91.03, 61.88];
    },
    // 成交客户模块数据获取接口 queryTransactionCustomer
    getQueryTransactionCustomer(params) {
      this.tradingVolumeOption.series[0].data = [
        {
          name: '新成交客户付款金额',
          value: 260351.03
        },
        {
          name: '老成交客户付款金额',
          value: 3727536.87
        }
      ];
      this.tradingNumberOption.series[0].data = [
        {
          name: '新成交客户数',
          value: 1747
        },
        {
          name: '老成交客户数',
          value: 25757
        }];
    },
    // 切换运营视窗 与 管理视窗 函数
    clickTabFn(index) {
      this.currentTab = index
    },
    // 获取 季度选择器返回参数
    quarterChangeFn(val) {
      console.log(val);
      this.queryForm.quarterTime = val
    },
    // 核心指标滚动图片处理函数
    leftBtnFn() {
      this.currentLeft += this.childBoxWidth
      this.ifFn()
    },
    rightBtnFn() {
      this.currentLeft -= this.childBoxWidth
      this.ifFn()
    },
    ifFn() {
      if (this.currentLeft > 0) {
        this.currentLeft = 0;
        return false
      } else if (this.currentLeft <= this.parentBoxWidth - this.childBoxWidth * this.coreIndexList.length - 1) {
        this.currentLeft = this.parentBoxWidth - this.childBoxWidth * this.coreIndexList.length - 1
        return false
      }
    }
  },
  watch: {
    'timeRange'(newVal, oldVal) {
      if (newVal === 'month') {
        this.dateType = 'month';
        this.isFormat = 'yyyy年MM月';
        this.isValueFormat = 'yyyy-MM';
      } else if (newVal === 'week') {
        this.dateType = 'week';
        this.isFormat = 'yyyy第WW周';
        this.isValueFormat = null
      } else if (newVal === 'date') {
        this.dateType = 'date';
        this.isFormat = 'yyyy年MM月dd日';
        this.isValueFormat = 'yyyy-MM-dd';
      }
    }
  },
}