<template>
  <div class="out" style="width:100%;height:100%;">
    <div style="position: absolute;width:100%;height:100%">
      <GISEvent></GISEvent>
    </div>
    <div
      style=" position:absolute;width:100%;height:280px;background:linear-gradient(to bottom,rgba(14,37,68,0.9),rgba(14,37,68,0))">
      <div class=" div-top-in time-weather">
        <div class="weather">
          客流分析
        </div>
        <div class="timer">
          <span id="bannerTime" class="banner-content1">{{date}}</span>
          <span id="bannerWeek" class="banner-content1">{{week}}</span>
          <span id="bannerDate" class="banner-content2">{{time}}</span><br>

        </div>
      </div>
    </div>
    <div
      style="position:absolute;width:600px;height:100%;background:linear-gradient(to right,rgba(14,37,68,0.9),rgba(14,37,68,0))">
      <!--五四广场人流量监控-->
      <div class="flowNum div-left-in">
        <div class=" titleStyle dailyPassengerTitle">五四广场人流量监控</div>
        <div style="position: absolute;width:130px;height:1px;top:35px;right:0; background:#50b3ff"></div>
        <div ref="flowNum" class="flowNumIndex"></div>
      </div>
      <!--人群比例-->
      <div class="flowConsist div-left-in">
        <div class=" titleStyle dailyPassengerTitle">人群比例</div>
        <div style="position: absolute;width:230px;height:1px;top:35px;right:0; background:#50b3ff"></div>
        <div ref="flowConsist" class="flowConsistIndex"></div>
      </div>
      <!--视频监控-->
      <div class="flowConsist div-left-in" style="top:620px;">
        <div class=" titleStyle dailyPassengerTitle">视频监控</div>
        <div style="position: absolute;width:230px;height:1px;top:35px;right:0; background:#50b3ff"></div>

        <video class="video" loop autoplay>
          <source src="../../../static/car1.mp4" type="video/mp4">
        </video>
      </div>

    </div>
  </div>
</template>

<script>
  import GISEvent from '../gis/event'
  import { parseTime } from '../../utils/index'
  import echarts from 'echarts'

  export default {
    name: 'Event',
    components: { GISEvent },
    data() {
      return {
        date: '',
        week: '',
        time: '',
        timeInterval: null,
        /*客流规模*/
        // 老年
        oldManRate: [16, 17, 15, 18, 15, 15, 13],
        // 成年人
        manRate: [26, 28, 27, 28, 22, 25, 24],
        // 青少年
        youngerRate: [14, 13, 15, 14, 12, 13, 13],
        // 儿童
        childrenRate: [14, 13, 15, 14, 12, 13, 13],
        // 幼儿
        youngerChildrenRate: [14, 13, 15, 14, 12, 13, 13],
        /*客运量一周趋势*/
        // 时间
        passengerTrendxDate: ['00:00', '00:30',
          '01:00', '01:30',
          '02:00', '02:30',
          '03:00', '03:30',
          '04:00', '04:30',
          '05:00', '05:30',
          '06:00', '06:30',
          '07:00', '07:30',
          '08:00', '08:30',
          '09:00', '09:30',
          '10:00', '10:30',
          '11:00', '11:35',
          '12:00', '12:30',
          '13:00', '13:30',
          '14:00', '14:30',
          '15:00', '15:30',
          '16:00', '16:30',
          '17:00', '17:30',
          '18:00', '18:30',
          '19:00', '19:30',
          '20:00', '20:30',
          '21:00', '21:30',
          '22:00', '22:30',
          '23:00', '23:30', '24:00'],
        flowNumChart: null,
        passengerTrend: [],

        //一天的客流量
        dayPassengerTrend: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6895, 16893, 39784, 53635, 167365, 376785, 351264, 301242, 264674, 167436, 125345, 124533, 126436, 135475, 123456, 143267, 132453, 112345, 132453, 112345, 142345, 167463, 194345, 202357, 221364, 502316, 341245, 203412, 150345, 120394, 80346, 50213, 20167, 18034, 10235, 10235, 8023, 12]
      }
    },
    mounted() {
      const that = this
      that.showTime()
      this.initFlowConsistChart()
      if (this.$refs['flowNum']) {
        this.initCapacityIndexChart()
      }

      if (that.timeInterval) {
        clearInterval(that.timeInterval)
      }
      that.timeInterval = setInterval(function() {
        that.showTime()
      }, 1000)

    },
    methods: {
      showTime() {
        const date = new Date()
        this.date = parseTime(date, '{y}-{m}-{d}')
        this.time = parseTime(date, '{h}:{i}:{s}')
        const arr = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']

        if (date.getDay() === 0) {
          this.week = '星期日'
        } else {
          this.week = arr[date.getDay() - 1]
        }
      },
      // 客流规模
      initFlowConsistChart() {
        const that = this
        let i = 0
        let oldManRate = 15
        let manRate = 30
        let youngerRate = 22
        let childrenRate = 15
        let youngerChildrenRate = 18
        const flowConsistChart = echarts.init(this.$refs['flowConsist'])
        flowConsistChart.setOption(that.reasonPieEchartOption('老人', oldManRate, '成年人', manRate, '青少年', youngerRate, '儿童', childrenRate, '幼儿', youngerChildrenRate))
        setInterval(function() {
          if (i < that.oldManRate.length) {
            oldManRate = that.oldManRate
            manRate = that.manRate
            youngerRate = that.youngerRate
            childrenRate = that.childrenRate
            youngerChildrenRate = that.youngerChildrenRate
            i++
          } else {
            i = 0
            oldManRate = that.oldManRate
            manRate = that.manRate
            youngerRate = that.youngerRate
            childrenRate = that.childrenRate
            youngerChildrenRate = that.youngerChildrenRate
            i++
          }

          flowConsistChart.clear()
          flowConsistChart.setOption(that.reasonPieEchartOption('老人', oldManRate, '成年人', manRate, '青少年', youngerRate, '儿童', childrenRate, '幼儿', youngerChildrenRate))

        }, 30000)//30秒刷新
      },
      //客流规模饼图
      reasonPieEchartOption(name1, rate1, name2, rate2, name3, rate3, name4, rate4, name5, rate5
      ) {
        return {

          title: {
            text: '',
            left: 0,
            top: 10,

            textStyle: {
              color: '#fff',
              fontWeight: 'normal',
              fontSize: 16

            }

          },
          grid: {
            borderWidth: 5,
            borderColor: '#fff'
          },

          tooltip: {//提示组件
            show: false

          },
          legend: {//图例组件
            type: 'plain',
            left: 50,
            top: 20,

            show: true,
            itemGap: 20,               // 各个item之间的间隔，单位px，默认为10，
            itemWidth: 12,             // 图例图形宽度
            itemHeight: 12,            // 图例图形高度
            orient: 'vertical',

            // borderColor:'#19abff',
            data: [
              {
                name: name1,
                icon: 'circle'

              },
              {
                name: name2,
                icon: 'circle'
              },
              {
                name: name3,
                icon: 'circle'
              },
              {
                name: name4,
                icon: 'circle'
              },
              {
                name: name5,
                icon: 'circle'
              }
            ],
            selectedMode: 'true',
            formatter: function(name) {
              var index = 0
              var clientlabels = [name1, name2, name3, name4, name5]
              var clientcounts = [rate1, rate2, rate3, rate4, rate5]
              clientlabels.forEach(function(value, i) {
                if (value == name) {
                  index = i
                }
              })
              return name + '  ' + clientcounts[index] + '%'
            },

            textStyle: {
              color: '#fff',
              fontSize: 16

            }

          },

          series: [
            {

              name: '',
              type: 'pie',
              radius: ['40%', '80%'],
              center: ['70%', '50%'],
              hoverOffset: 4,
              left: '10%',

              itemStyle: {
                normal: {
                  label: {
                    show: false   //隐藏标示文字
                  },
                  labelLine: {
                    show: false   //隐藏标示线
                  }

                }
              },

              data: [

                {
                  name: name1,
                  value: rate1,
                  itemStyle: {//图形样式。
                    normal: {
                      color: '#19abff',
                      borderWidth: 1,
                      borderColor: '#1A4D83'
                    }
                  }
                },
                {
                  name: name2,
                  value: rate2,
                  itemStyle: {//图形样式。
                    normal: {
                      color: '#28ffac',
                      borderWidth: 1,
                      borderColor: '#1A4D83'
                    }
                  }
                },
                {
                  name: name3,
                  value: rate3,
                  itemStyle: {//图形样式。
                    normal: {
                      color: '#a359ff',
                      borderWidth: 1,
                      borderColor: '#1A4D83'
                    }
                  }

                }, {
                  name: name4,
                  value: rate4,
                  itemStyle: {//图形样式。
                    normal: {
                      color: '#dc5877',
                      borderWidth: 1,
                      borderColor: '#1A4D83'
                    }
                  }
                }, {
                  name: name5,
                  value: rate5,
                  itemStyle: {//图形样式。
                    normal: {
                      color: '#3a69c3',
                      borderWidth: 1,
                      borderColor: '#1A4D83'
                    }
                  }
                }
              ]
            }
          ]

        }

      }
      ,
      //客流规模
      initCapacityIndexChart() {
        const that = this
        let n = parseInt((parseInt(that.time.split(':')[0]) * 60 + parseInt(that.time.split(':')[1])) / 30)
        that.flowNumChart = echarts.init(this.$refs['flowNum'])
        /* this.busPassengerTrend = this.dayBusPassengerTrend.slice(0, n+1)
         this.taxiPassengerTrend = this.dayTaxiPassengerTrend.slice(0, n+1)
         this.trackPassengerTrend = this.dayTrackPassengerTrend.slice(0, n+1)*/
        this.passengerTrend = this.dayPassengerTrend

        that.flowNumChart.setOption(this.lineEchartOption(this.passengerTrendxDate, this.passengerTrend, '人流量'))
        /*       setInterval(function() {
                 n = parseInt((parseInt(that.time.split(':')[0]) * 60 + parseInt(that.time.split(':')[1])) / 30)
                 that.busPassengerTrend = that.dayBusPassengerTrend.slice(0, n+1)
                 that.taxiPassengerTrend = that.dayTaxiPassengerTrend.slice(0, n+1)
                 that.trackPassengerTrend = that.dayTrackPassengerTrend.slice(0, n+1)
                 that.flowNumChart.clear()
                        that.flowNumChart.setOption(this.lineEchartOption(this.passengerTrendxDate, this.passengerTrend, '人流量'))
               }, 30000)*/

      }
      ,
      lineEchartOption(xDate, yDate1, yName1) {
        return {
          title: {
            text: '',
            left: 15,
            top: 0,

            textStyle: {
              color: '#fff',
              fontWeight: 'normal',
              fontSize: 16

            }

          },
          grid: {
            left: '12%',
            right: '7%',
            bottom: '0%',
            top: '20%',
            containLabel: true
          },
          legend: {//图例组件
            type: 'plain',
            right: 30,
            top: 0,
            show: true,
            itemGap: 25,               // 各个item之间的间隔，单位px，默认为10，
            itemWidth: 15,             // 图例图形宽度
            itemHeight: 3,            // 图例图形高度

            // borderColor:'#19abff',
            data: [
              {
                name: yName1,
                icon: 'rect'

              }
            ],
            selectedMode: 'true',
            formatter: '{name}',

            textStyle: {
              color: '#fff',
              fontSize: 16

            }

          },
          tooltip: {//提示组件
            trigger: 'axis',
            // formatter: "{b}<br>" +"{a0}:{c0}%<br>"+"{a1}:{c1}%<br>"+"{a2}:{c2}%<br>", // formatter: "时间:{b}</br>{a}:{c}",
            // position:[10,10],
            formatter: function(params) {
              var currentDate = ''
              var result = ''
              params.forEach(function(item) {
                var myData = item.name.split(':')
                if (myData[1] === '30') {
                  myData[1] = '00'
                } else {
                  myData[0] = myData[0] - 1
                  myData[1] = '30'
                }
                var oldDate = ''
                if (myData[0] === -1) {
                  oldDate = ''
                } else {
                  oldDate = myData[0] + ':' + myData[1] + '-'
                }

                currentDate = oldDate + item.name
                result += '<br/>' + '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + item.color + '"></span>'
                  + item.seriesName + '：' + item.value + '人'
              })
              return currentDate + result
            },
            textStyle: {
              color: '#fff',
              fontSize: 16,
              fontWeight: 'bold'

            },
            backgroundColor: '#114a88',
            borderWidth: 1,
            borderColor: '#2fe4ff',
            axisPointer: {//坐标轴指示器
              lineStyle: {
                type: 'dashed',
                color: '#2fe4ff',
                width: 2
              }
            }
          },
          xAxis: {
            type: 'category',
            // name:'时间',
            boundaryGap: true,
            data: xDate,
            axisTick: {
              show: false////是否显示坐标轴轴线
            },

            axisLabel: {//坐标轴刻度标签的相关设置。
              show: true,
              interval: 7,//刻度间隔
              rotate: 0,//倾斜显示
              textStyle: {
                color: '#1ac1ff',
                fontSize: 14
              }
            },
            axisLine: {//坐标轴轴线相关设置。
              lineStyle: {
                color: '#1ac1ff'
              }
            },
            splitArea: {
              show: true,
              areaStyle: {
                color: ['rgba(17,44,92,0.3)', 'rgba(17,53,103,0.3)']
              }
            }

          },

          yAxis: {
            type: 'value',
            axisTick: {
              show: false
            },
            axisLabel: {//坐标轴刻度标签的相关设置。
              show: true,
              textStyle: {
                color: '#1ac1ff',
                fontSize: 14
              }

            },

            axisLine: {//坐标轴轴线相关设置。
              lineStyle: {
                color: '#1ac1ff',
                width: 1
              }
            },

            splitLine: {//坐标轴在 grid 区域中的分隔线。
              lineStyle: {
                type: 'dashed',
                color: '#295b92'
              }
            }
          },

          series: [
            {
              data: yDate1,
              markLine: {
                normal: {
                  lineStyle: {
                    type: 'dotted',
                    color: '#2fe4ff',
                    width: 2
                  }
                }

              },
              name: yName1,
              type: 'line',
              symbol: 'none',//不显示折线拐点
              smooth: true,//设置折线图平滑
              itemStyle: {
                normal: {
                  color: '#19abff'
                }
              },
              lineStyle: {//线条样式
                normal: {
                  color: '#19abff',
                  width: 3

                }
              },
              areaStyle: {//阴影区域
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(25,171,255,0.5)'
                  },

                    {
                      offset: 1,
                      color: 'rgba(25,171,255,0)'
                    }])
                }
              }
            }]

        }

      }
      ,
      // 数字递增
      CountUpSeparator(elId, startNum, endNum) {
        var options = {
          useEasing: true, //使用缓和效果
          useGrouping: true, //使用分组效果
          separator: '', //分离器，数据够三位，例如100,000
          decimal: '.', //小数点分割，例如：10.00
          prefix: '', //第一位默认数字
          suffix: '' //最后一位默认数字
        }
        if (startNum > endNum) {
          var countUp = new CountUp(elId, endNum, endNum, 0, 20, options)
          countUp.start()
        }
        else {
          var countUp = new CountUp(elId, startNum, endNum, 0, 20, options)
          countUp.start()
        }
      }
      ,
      /* 返回数据概览*/
      goBack() {
        this.$router.push({ path: '/' })
      }
      ,
      /*事件详情页面*/
      goEventPage() {
        this.$router.push({ path: '/odAnalysis/event' })
      }
      ,
      /*切换地图图层*/
      changeMap(n) {
        this.$refs['hotMap'].classList.remove('map-temp-select')
        this.$refs['odMap'].classList.remove('map-temp-select')
        if (n === '1') {
          /* 显示热力图层 */
          this.$refs['hotMap'].classList.add('map-temp-select')
          this.$refs.flowAnalysis.heatLayer()
        } else {
          /* 显示OD图层 */
          this.$refs['odMap'].classList.add('map-temp-select')
          this.$refs.flowAnalysis.ODLayer()
        }
      }
    }
  }
</script>

<style scoped>
  .out {
    font-family: "SimHei";
    /*  background: url('../../assets/flow/map2.jpg') no-repeat center;*/
    background-size: 100% 100%;
  }

  @keyframes topIn {
    from {
      top: -85px;
      opacity: 0;
    }
    to {
      top: 15px;
      opacity: 1;
    }
  }

  @keyframes leftIn {
    from {
      left: -28%;
      opacity: 0;
    }
    to {
      left: 0px;
      opacity: 1;
    }
  }

  .div-top-in {
    -webkit-animation: topIn 0.75s;
    -o-animation: topIn 0.75s;
    animation: topIn 0.75s;
    position: absolute;
  }

  .flowPageDateBanner {
    position: absolute;
    left: 240px;
    top: 12px;
    padding-left: 20px;
    width: 200px;
    height: 60px;
    line-height: 60px;
    background: linear-gradient(90deg, rgba(10, 70, 119, 0.8), rgba(10, 70, 119, 0));
    font-size: 26px;
    color: #30c2ff;
  }

  .timer {
    height: 55px;

    width: 180px;
    display: inline-block;
    margin: 12px 0 15px 15px;
    position: absolute;
    font-size: 22px;

  }

  .banner-content1 {
    font-size: 20px;
    color: #ffffff;
    height: 50%;
  }

  .banner-content2 {
    font-size: 20px;

    color: #2fe4ff;
    height: 50%;
  }

  .time-weather {
    z-index: 999;
    position: absolute;
    left: 15px;
    top: 15px;
    height: 80px;
    width: 428px;
    /*  background-color: #0c264b;
      border: 1px solid #379fff;*/
    overflow: hidden;
    font-size: 20px;
  }

  .weather {
    height: 55px;
    width: 230px;
    display: inline-block;
    margin: 12px 0 15px 0;
    color: #fff;
    font-size: 28px;
    text-align: center;
    /*    border-right: 1px solid #1f81e2;*/
  }

  .dailyPassenger {
    position: absolute;
    /*   left: 20px;*/
    top: 120px;
    width: 390px;
    height: 70px;

    /*  background: linear-gradient(90deg, rgba(48, 147, 209, 0.3), rgba(48, 147, 209, 0));*/
    color: #fff;
  }

  .flowConsist {
    position: absolute;
    /*    left: 20px;*/
    top: 380px;
    width: 390px;
    height: 270px;
    /*    background: linear-gradient(90deg, rgba(48, 147, 209, 0.3), rgba(48, 147, 209, 0));*/
  }

  .flowNum {
    position: absolute;
    top: 120px;
    width: 390px;
    /*    height: 670px;*/

    /*
        background: linear-gradient(90deg, rgba(48, 147, 209, 0.3), rgba(48, 147, 209, 0));*/
  }

  .flowConsistIndex {
    width: 100%;
    height: 200px;
    position: absolute;
    top: 50px;

  }

  .video {
    width: 340px;
    height: 200px;
    position: absolute;
    top: 60px;
    left: 50px;

  }

  .flowNumIndex {
    width: 420px;
    height: 200px;
    position: absolute;
    top: 50px;
  }

  /*左右进出效果*/
  .div-left-in {
    -webkit-animation: leftIn 0.75s;
    -o-animation: leftIn 0.75s;
    animation: leftIn 0.75s;
    position: absolute;
  }

  .titleStyle {
    font-size: 22px;
    color: #fff;
  }

  .dailyPassengerTitle {
    position: absolute;
    left: 50px;
    height: 70px;
    line-height: 70px;
  }

  .contextStyle {
    position: absolute;
    left: 250px;
    width: 250px;
    height: 70px;
    line-height: 70px;
  }

  .numStyle {
    font-size: 36px;
    color: #ffd71b;
    text-align: right;
    position: absolute;
    right: 165px;
  }

  .unitStyle {
    font-size: 22px;
    color: #fff;
    position: absolute;
    left: 90px;
    width: 83px;
  }
</style>
