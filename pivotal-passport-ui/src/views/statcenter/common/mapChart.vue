<template>
  <div class="map-chart">
    <div id='mapChartBox' style='width:100%;height:100%;'></div>
  </div>
</template>
<script>
import myChart from 'echarts'
var mapName = 'china'
    
var geoCoordMap = {};

export default {
    props:{
        mapData:{
            type:Array
        },
        textType: {
            type: String
        },
        min:{
            type:Number
        },
        max:{
            type:Number
        }
    },
  data(){
    let that = this
    return {
      mapOption: {
        tooltip: {
            trigger: 'item',
            formatter: function(params) {
                 if(params.name){
                     if(params.value){
                         return `${params.name} <br> ${that.$props.textType}: ${params.value}`
                     }else{
                         return `${params.name} <br> ${that.$props.textType}: 无数据`
                     }
                 }else{
                     return ''
                 }
            },
            backgroundColor: 'rgba(255,255,255,0.5)',
            borderColor: '#333',
            borderWidth: 2,
            textStyle: {
                color: '#333'
            }
        },
        visualMap: {
            type: 'continuous',
            show: true,
            orient: 'horizontal',
            left: '3%',
            min: 0,
            max: 364736,
            top: '3%',
            text: ['高', '低'], // 文本，默认为数值文本
            calculable: false,
            // seriesIndex: [1],
            inRange: {
            // color: ['#3B5077', '#cccccc'] // 蓝黑
            // color: ['#ffc0cb', '#800080'] // 红紫
            // color: ['#3C3B3F', '#605C3C'] // 黑绿
            // color: ['#0f0c29', '#302b63', '#24243e'] // 黑紫黑
            // color: ['#23074d', '#cc5333'] // 紫红
            // color: ['#00467F', '#A5CC82'] // 蓝绿
            color: ['#bcdaf8', '#4580fd'] // 微商城专用配色
            // color: ['#00467F', '#A5CC82'] // 蓝绿
            // color: ['#00467F', '#A5CC82'] // 蓝绿
            // color: ['#00467F', '#A5CC82'] // 蓝绿
            // color: ['#00467F', '#A5CC82'] // 蓝绿

            }
        },
        geo: {
            show: true,
            map: mapName,
            label: {
                normal: {
                    show: false
                },
                emphasis: {
                    show: false,
                }
            },
            roam: true,
            itemStyle: {
                normal: {
                    areaColor: '#ccc',
                    borderColor: '#fff',
                },
                emphasis: {
                    borderColor: '#ccc',
                    areaColor: '#2B91B7',
                }
            }
        },
        series: [
            {
                name: '散点',
                type: 'scatter',
                show: false,
                coordinateSystem: 'geo',
                data: [],
                symbolSize: function(val) {
                    return val[2] / 100;
                },
                label: {
                    show: false,
                    normal: {
                        formatter: '{b}',
                        position: 'right',
                        show: false
                    },
                    emphasis: {
                        show: false
                    }
                },
                itemStyle: {
                    show: false,
                    normal: {
                        color: '#05C3F9'
                    }
                }
            },
            {
                type: 'map',
                map: mapName,
                geoIndex: 0,
                aspectScale: 0.75, //长宽比
                showLegendSymbol: false, // 存在legend时显示
                label: {
                    normal: {
                        show: true
                    },
                    emphasis: {
                        show: false,
                        textStyle: {
                            color: '#fff'
                        }
                    }
                },
                roam: true,
                itemStyle: {
                    normal: {
                        areaColor: '#cccccc',
                        borderColor: '#3B5077',
                    },
                    emphasis: {
                        areaColor: '#2B91B7'
                    }
                },
                animation: false,
                data: []
            },
        ]
      },
    }
  },
  watch: {
    mapData:{
        handler: function(newValue, oldValue) {
            this.mapInit()
        },
        deep: true
    }
  },
  mounted () {
    this.mapInit()
  },
  methods: {
    mapInit(){
        var myMapChart = echarts.init(document.getElementById('mapChartBox'))
        myMapChart.showLoading();
        var mapFeatures = echarts.getMap(mapName).geoJson.features;
        myMapChart.hideLoading();
        mapFeatures.forEach(function(v) {
            // 地区名称
            var name = v.properties.name;
            // 地区经纬度
            geoCoordMap[name] = v.properties.cp;

        });
        this.mapOption.visualMap.min = +this.$props.min
        this.mapOption.visualMap.max = +this.$props.max
        // this.mapOption.series[0].data = this.convertData(this.$props.mapData)
        this.mapOption.series[1].data = this.$props.mapData
        myMapChart.setOption(this.mapOption);
    },
    // convertData (data) {
    //     let res = [];
    //     for (var i = 0; i < data.length; i++) {
    //         var geoCoord = geoCoordMap[data[i].name];
    //         if (geoCoord) {
    //             res.push({
    //                 name: data[i].name,
    //                 value: geoCoord.concat(data[i].value),
    //             });
    //         }
    //     }
    //     return res;
    // }
  }
}
</script>

<style lang="scss">
  .map-chart{
    width: 100%;
    height: 100%;
  }
</style>
