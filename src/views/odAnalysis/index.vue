<template>
  <div class="out">
    <div v-if="mainPage" style="position: absolute;width:100%;height:100%">
      <div v-if="flowNumTable" class="disireLine ">
        <div class="region">五四广场</div>
        <!--<div id="disireLineExit" class="frameExit"/>-->
        <div class="disireLineContent">
          <div style="line-height: 30px">客流量：<span style="color: #fff;">45万人</span></div>
          <!--<div style="line-height: 30px">人均出行次数：5次</div>-->
        </div>
        <div class="flowButtonBanner">
          <div ref="flowComeIn" class="flowButton flowButtonSelect" @click="comeIn">吸引量</div>
          <div ref="flowComeOut" class="flowButton" @click="comeOut">发生量</div>
        </div>
        <div v-if="InOrOut" class="flowContext">
          <div v-for="(item,key) in regionData" :key="key" class="flowList">
            <div class="col-md-6 flowReginName">{{ item.name }}-{{ item.nameTo }}</div>
            <div class="col-md-6 visitNum" title="">{{ item.value }}万人</div>
          </div>
        </div>
        <div v-else class="flowContext">
          <div v-for="(item,key) in regionData" :key="key" class="flowList">
            <div class="col-md-6 flowReginName">{{ item.nameTo }}-{{ item.name }}</div>
            <div class="col-md-6 visitNum" title="">{{ item.valueTo }}万人</div>
          </div>
        </div>
      </div>
      <Minemaps ref="flowAnalysis"></Minemaps>
    </div>
    <div v-if="eventPage" style="position: absolute;width:100%;height:100%">
      <GISEvent></GISEvent>
    </div>
    <div
      style=" position:absolute;width:100%;height:280px;background:linear-gradient(to bottom,rgba(14,37,68,0.9),rgba(14,37,68,0))">
      <div class=" div-top-in time-title">
        <div class="title">
          <div v-if="mainPage" class=" title1"></div>
          <div v-if="eventPage" class=" title2"></div>
        </div>
        <div class="timer">
          <!--       <span id="bannerTime" class="banner-content1">{{date}}</span>
                 <span id="bannerWeek" class="banner-content1">{{week}}</span>
                 <span id="bannerDate" class="banner-content2">{{time}}</span><br>-->
          <span id="bannerTime" class="banner-content1">2019-05-01</span>
          <span id="bannerWeek" class="banner-content1">星期三</span>
          <span id="bannerDate" class="banner-content2">{{hours}}:{{minutes}}:{{seconds}}</span><br>

        </div>
      </div>
      <!-- 地图图层选择栏-->
      <div v-if="mainPage" class="map-template">
        <div class="map-template-border">
          <!--     <%&#45;&#45;地图导航条&#45;&#45;%>-->
          <div class="map-template-left">
            <div ref="hotMap" class="map-temp map-temp1" @click="changeMap('1')">客流热力</div>
            <div ref="odMap" class="map-temp map-temp2  map-temp-select" @click="changeMap('2')">客流OD</div>
          </div>
        </div>
        <!--      <%&#45;&#45;右侧按钮&#45;&#45;%>-->
        <div class="map-template-right">
          <div class="layer-selection">
            <img class="layer-img" src="../../assets/flow/layer-selection-i.png">
          </div>
          <div class="map-template-title">
            <div class="map-template-content">
              <div class="map-template-content1">地图</div>
              <div class="map-template-content2">图层</div>
            </div>
          </div>
        </div>

      </div>
      <!-- 返回首页-->
      <div v-if="mainPage" class="go-home" @click="goBack"/>
      <div v-if="mainPage&&(!flowNumTable) "
           class="alarmPic"
           @click="goEventPage">
      </div>
    </div>
    <div
      style="position:absolute;width:600px;height:100%;background:linear-gradient(to right,rgba(14,37,68,0.9),rgba(14,37,68,0))">
      <div v-if="mainPage" class="dailyPassenger div-left-in">
        <div class=" titleStyle dailyPassengerTitle">公交客流量</div>
        <div class=" contextStyle ">
          <div class="numStyle" id="busNum"></div>
          <div class="unitStyle">人次</div>
        </div>
      </div>
      <div v-if="mainPage" class="dailyPassenger div-left-in" style="top:190px;">
        <div class=" titleStyle dailyPassengerTitle">出租客流量</div>
        <div class=" contextStyle dailyPassengerContext">
          <div class="numStyle" id="taxiNum"></div>
          <div class="unitStyle">人次</div>
        </div>
      </div>
      <div v-if="mainPage" class="dailyPassenger div-left-in" style="top:250px;">
        <div class=" titleStyle dailyPassengerTitle">轨道客流量</div>
        <div class=" contextStyle dailyPassengerContext">
          <div class="numStyle" id="trackNum"></div>
          <div class="unitStyle">人次</div>
        </div>
      </div>
      <!--客流量构成-->
      <div v-if="mainPage" class="flowConsist div-left-in">
        <div class=" titleStyle dailyPassengerTitle">客流构成</div>
        <div style="position: absolute;width:230px;height:1px;top:35px;right:0; background:#50b3ff"/>
        <div ref="flowConsist" class="flowConsistIndex"/>
      </div>
      <!--客流规模-->
      <div v-if="mainPage" class="flowNum div-left-in">
        <div class=" titleStyle dailyPassengerTitle">客流规模</div>
        <div style="position: absolute;width:230px;height:1px;top:35px;right:0; background:#50b3ff"/>
        <div ref="flowNum" class="flowNumIndex"/>
      </div>
      <!--视频监控-->
      <div v-show="mainPage" class="videoConsist div-left-in" style="top:800px;">
        <div class=" titleStyle dailyPassengerTitle">视频监控</div>
        <div style="position: absolute;width:230px;height:1px;top:35px;right:0; background:#50b3ff"/>

        <!--  <video class="mainVideo" loop autoplay>
            <source src="../../assets/flow/54video.mp4" type="video/mp4">
          </video>-->
        <video class="video video1" muted loop autoplay>
          <source src="../../../static/longStation1.mp4" type="video/mp4">
        </video>
        <video class="video video2 " muted loop autoplay="autoplay">
          <source src="../../../static/highWay.mp4" type="video/mp4">
        </video>
        <video class="video video3" muted loop autoplay="autoplay">
          <source src="../../../static/airport1.mp4" type="video/mp4">
        </video>
        <video class="video video4" muted loop autoplay="autoplay">
          <source src="../../../static/track.mp4" type="video/mp4">
        </video>
      </div>
      <!--事件详情页面-->
      <!--五四广场人流量监控-->
      <div v-show="eventPage" class="flowNum div-left-in" style="top:400px;">
        <div class=" titleStyle dailyPassengerTitle">五四广场人流量监控</div>
        <div style="position: absolute;width:130px;height:1px;top:35px;right:0; background:#50b3ff"></div>
        <div ref="eventFlowNum" class="flowNumIndex"></div>
      </div>
      <!--人群比例-->
      <div v-show="eventPage" class="flowConsist div-left-in" style="top:140px;">
        <div class=" titleStyle dailyPassengerTitle">人群比例</div>
        <div style="position: absolute;width:230px;height:1px;top:35px;right:0; background:#50b3ff"/>
        <div ref="eventFlowConsist" class="flowConsistIndex"/>
      </div>
      <!--视频监控-->
      <div v-show="eventPage" class="videoConsist div-left-in">
        <div class=" titleStyle dailyPassengerTitle">视频监控</div>
        <div style="position: absolute;width:230px;height:1px;top:35px;right:0; background:#50b3ff"/>
        <video class="video video1" muted loop autoplay="autoplay">
          <source src="../../../static/car1.mp4" type="video/mp4">
        </video>
        <video class="video video2 " muted loop autoplay="autoplay">
          <source src="../../../static/car2.mp4" type="video/mp4">
        </video>
        <video class="video video3" muted loop autoplay="autoplay">
          <source src="../../../static/video4.mp4" type="video/mp4">
        </video>
        <video class="video video4" muted loop autoplay="autoplay">
          <source src="../../../static/video5.mp4" type="video/mp4">
        </video>
      </div>

    </div>
    <!--建议-->
    <div v-show="eventPage" class="suggestion">
      报警改进方案：
      <div class="pic"></div>
      <div class="box">
        <div class="wifi-symbol">
          <div class="wifi-circle first"></div>
          <div class="wifi-circle second"></div>
          <div class="wifi-circle third"></div>
        </div>
      </div>
      <video class="voice" loop autoplay>
        <source src="" type="audio/mpeg">
      </video>

      <div class="suggestionContent">
        <div>1、公交站排队人数过多，需要调配运力</div>
        <div>2、轨道站入口客流较少，建议通过轨道分流</div>
        <div>3、区域内出租总数127辆，空车数11辆，需调配运力</div>
      </div>
    </div>
  </div>
</template>

<script>
  import { parseTime } from '../../utils/index'
  import echarts from 'echarts'
  import { CountUp } from '../../utils/countUp'
  import Minemaps from '../gis/index'
  import GISEvent from '../gis/event'

  export default {
    name: 'OdAnalysis',
    components: { GISEvent, Minemaps },
    data() {
      return {
        mainPage: true, /*第一张图显示内容*/
        eventPage: false, /*详情页内容*/
        mapButton: true, /*地图按钮，去详情页*/
        date: '',
        week: '',
        time: '',
        hours: '',//时
        seconds: '',//秒，
        minutes: '',//分
        timeInterval: null,
        /*客流规模*/
        busRate: [71, 72, 71, 70, 73, 71, 72],
        taxiRate: [15, 15, 14, 16, 15, 16, 15],
        trackRate: [14, 13, 15, 14, 12, 13, 13],
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
        busPassengerTrend: [],
        taxiPassengerTrend: [],
        trackPassengerTrend: [],
        //一天的客流量
        /*  dayBusPassengerTrend: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6895, 16893, 39784, 53635, 167365, 376785, 351264, 301242, 264674, 167436, 125345, 124533, 126436, 135475, 123456, 143267, 132453, 112345, 132453, 112345, 142345, 167463, 194345, 202357, 221364, 502316, 341245, 203412, 150345, 120394, 80346, 50213, 20167, 18034, 10235, 10235, 8023, 12],
          dayTrackPassengerTrend: [0, 1, 0, 12, 0, 1, 0, 0, 0, 2, 123, 272, 10665, 25947, 46963, 47758, 49101, 29484, 19698, 19698, 15902, 15095, 11657, 12674, 11273, 12278, 12033, 13564, 12601, 13005, 12402, 13954, 15248, 16466, 20983, 30685, 33894, 39984, 22983, 18189, 15601, 12083, 11947, 10531, 8434, 4875, 1203, 1203, 1203],
          dayTaxiPassengerTrend: [0, 3314, 2756, 1374, 1180, 1376, 904, 1200, 1618, 2304, 3704, 3378, 5378, 7956, 10726, 33472, 75356, 70252, 60248, 52934, 33486, 25068, 24906, 25286, 27094, 24690, 28652, 26490, 22468, 26490, 22468, 28468, 33492, 38868, 40470, 44272, 100462, 68248, 40682, 30068, 24078, 16068, 10042, 6032, 7606, 6046, 4046, 3604, 2304],
         */
        dayBusPassengerTrend: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6895, 16893, 39784, 53635, 167365, 376785, 351264, 301242, 264674, 167436, 125345, 124533, 126436, 135475, 123456, 143267, 132453, 112345, 132453, 112345, 142345, 167463, 194345, 202357, 221364, 352316, 442316, 452316, 432316, 341245, 203412, 150345, 120394, 80346, 50213, 12],
        dayTrackPassengerTrend: [0, 1, 0, 0, 0, 12, 0, 1, 0, 0, 0, 2, 123, 272, 10665, 25947, 46963, 47758, 49101, 29484, 19698, 19698, 15902, 15095, 11657, 12674, 11273, 12278, 12033, 13564, 12601, 13005, 12402, 13954, 15248, 16466, 20983, 30685, 33894, 39984, 49984, 49984, 39984, 37984, 22983, 18189, 15601, 12083, 1203],
        dayTaxiPassengerTrend: [0, 0, 3314, 0, 2756, 1374, 1180, 1376, 904, 1200, 1618, 2304, 3704, 3378, 5378, 7956, 10726, 33472, 75356, 70252, 60248, 52934, 33486, 25068, 24906, 25286, 27094, 24690, 28652, 26490, 22468, 26490, 22468, 28468, 33492, 38868, 40470, 44272, 100462, 130462, 120462, 135462, 100462, 68248, 40682, 30068, 24078, 16068, 2304],
        /*人群比例*/
        // 老年
        oldManRate: [16, 17],
        // 成年人
        manRate: [26, 28],
        // 青少年
        youngerRate: [28, 29],
        // 儿童
        childrenRate: [16, 14],
        // 幼儿
        youngerChildrenRate: [14, 12],
        /*人流量监控*/
        // 时间
        eventFlowNumChart: null,
        eventPassengerTrend: [],

        //一天的客流量
        /*        eventDayPassengerTrend: [0, 3315, 2756, 1386, 1180, 1377, 904, 1200, 1618, 2306, 3827, 10545, 32936, 73687, 111324, 248595, 501242, 451000, 381188, 337306, 216824, 165508, 161096, 164396, 173842, 160424, 183952, 172507, 147414, 171948, 147215, 184767, 216203, 249679, 263810, 296321, 636672, 449477, 267077, 198602, 160073, 108497, 72202, 36730, 34074, 21156, 15484, 12830, 3519],*/
        eventDayPassengerTrend: [0, 1, 3314, 0, 2756, 1386, 1180, 1377, 904, 1200, 1618, 2306, 3827, 10545, 32936, 73687, 111324, 248595, 501242, 451000, 381188, 337306, 216824, 165508, 161096, 164396, 173842, 160424, 183952, 172507, 147414, 171948, 147215, 184767, 216203, 249679, 263810, 296321, 486672, 612762, 622762, 617762, 481691, 309644, 214010, 168651, 120025, 78364, 3519],
        InOrOut: true,
        regionData: [
          { name: '李沧区', nameTo: '五四广场', value: 6.53, valueTo: 4.67 },
          { name: '崂山区', nameTo: '五四广场', value: 7.54, valueTo: 3.62 },
          { name: '市南区', nameTo: '五四广场', value: 6.52, valueTo: 6.66 },
          { name: '市北区', nameTo: '五四广场', value: 6.15, valueTo: 7.15 },
          { name: '城阳区', nameTo: '五四广场', value: 7.27, valueTo: 4.84 },
          { name: '黄岛区', nameTo: '五四广场', value: 3.54, valueTo: 3.33 },
          { name: '即墨区', nameTo: '五四广场', value: 2.55, valueTo: 2.42 },
          { name: '胶州区', nameTo: '五四广场', value: 4.54, valueTo: 5.43 }
        ],
        flowNumTable: true
      }
    },
    mounted() {
      const that = this
      that.showTime()
      if (this.$refs['flowConsist']) {
        this.initFlowConsistChart()
      }
      if (this.$refs['flowNum']) {
        this.initCapacityIndexChart()
      }
      if (that.timeInterval) {
        clearInterval(that.timeInterval)
      }
      that.timeInterval = setInterval(function() {
        that.showTime()
      }, 1000)
      that.showNum()
      setInterval(function() {
        var random1 = (6 + (Math.random() * 0.5)).toFixed(2); // 生成5-9的随机数
        var random2 = (6 + (Math.random() * 0.5)).toFixed(2); // 生成5-9的随机数
        var random3 = (6 + (Math.random() * 0.5)).toFixed(2); // 生成5-9的随机数
        that.regionData[0].value = random1
        that.regionData[1].value = random2
        that.regionData[4].value = random3

        that.regionData[0].valueTo = random1
        that.regionData[1].valueTo = random2
        that.regionData[4].valueTo = random3
      }, 30000);


    },

    methods: {
      showTime() {
        const date = new Date()
        this.date = parseTime(date, '{y}-{m}-{d}')
        /*this.time = parseTime(date, '{h}:{i}:{s}')*/
        /*        this.hours = date.getHours()
                if (this.hours < 10) {
                  this.hours = '0' + this.hours
                }*/
        this.hours = '19'
        this.minutes = date.getMinutes()
        if (this.minutes < 10) {
          this.minutes = '0' + this.minutes
        }
        this.seconds = date.getSeconds()
        if (this.seconds < 10) {
          this.seconds = '0' + this.seconds
        }
        const arr = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
        if (date.getDay() === 0) {
          this.week = '星期日'
        } else {
          this.week = arr[date.getDay() - 1]
        }
      },
      //公交、出租、轨道客流量实时更新
      showNum() {
        /*   const busNum = [2580486, 2580679, 2580958, 2581493, 2581452, 2580722]
           const taxiNum = [523590, 523723, 523945, 524136, 523978, 523756]
           const trackNum = [452648, 452826, 452938, 453012, 452965, 452782]*/
        let busNum = 2580486
        let taxiNum = 523590
        let trackNum = 452648
        let i = 0
        const that = this
        that.CountUpSeparator('busNum', 0, busNum)
        that.CountUpSeparator('taxiNum', 0, taxiNum)
        that.CountUpSeparator('trackNum', 0, trackNum)
        let myInterval = null
        if (myInterval) {
          clearInterval(myInterval)
        }
        myInterval = setInterval(function() {
          that.CountUpSeparator('busNum', busNum, busNum + 223)
          that.CountUpSeparator('taxiNum', taxiNum, taxiNum + 217)
          that.CountUpSeparator('trackNum', trackNum, trackNum + 233)
          busNum = 2580486 + 223
          taxiNum = 523590 + 217
          trackNum = 452648 + 233
          /*          if (i < (busNum.length - 1)) {
                      that.CountUpSeparator('busNum', busNum[i], busNum[i + 1])
                      that.CountUpSeparator('taxiNum', taxiNum[i], taxiNum[i + 1])
                      that.CountUpSeparator('trackNum', trackNum[i], trackNum[i + 1])
                      i++
                    } else {
                      that.CountUpSeparator('busNum', busNum[busNum.length - 1], busNum[0])
                      that.CountUpSeparator('taxiNum', taxiNum[busNum.length - 1], taxiNum[0])
                      that.CountUpSeparator('trackNum', trackNum[busNum.length - 1], trackNum[0])
                      i = 0
                    }*/

        }, 30000)
      },
      // 客流规模
      initFlowConsistChart() {
        const that = this
        let i = 0
        let busRate = 72
        let taxiRate = 15
        let trackRate = 13
        const flowConsistChart = echarts.init(this.$refs['flowConsist'])
        flowConsistChart.setOption(that.reasonPieEchartOption('公交', busRate, '轨道', trackRate, '出租', taxiRate))
        setInterval(function() {
          if (i < that.busRate.length) {
            busRate = that.busRate[i]
            taxiRate = that.taxiRate[i]
            trackRate = that.trackRate[i]
            i++
          } else {
            i = 0
            busRate = that.busRate[i]
            taxiRate = that.taxiRate[i]
            trackRate = that.trackRate[i]
          }

          flowConsistChart.clear()
          flowConsistChart.setOption(that.reasonPieEchartOption('公交', busRate, '轨道', trackRate, '出租', taxiRate))

        }, 30000)//30秒刷新
      },
      //客流规模
      initCapacityIndexChart() {
        const that = this
        let n = parseInt((parseInt(that.time.split(':')[0]) * 60 + parseInt(that.time.split(':')[1])) / 30)
        that.flowNumChart = echarts.init(this.$refs['flowNum'])
        this.busPassengerTrend = this.dayBusPassengerTrend.slice(0, 41)
        this.taxiPassengerTrend = this.dayTaxiPassengerTrend.slice(0, 41)
        this.trackPassengerTrend = this.dayTrackPassengerTrend.slice(0, 41)
        /*   this.busPassengerTrend = this.dayBusPassengerTrend
           this.taxiPassengerTrend = this.dayTaxiPassengerTrend
           this.trackPassengerTrend = this.dayTrackPassengerTrend*/
        that.flowNumChart.setOption(this.lineEchartOption(this.passengerTrendxDate, this.busPassengerTrend, this.trackPassengerTrend, this.taxiPassengerTrend, '公交', '轨道', '出租'))
        /*   that.flowNumChart.setOption(this.lineEchartOption(this.passengerTrendxDate, this.busPassengerTrend, this.trackPassengerTrend, this.taxiPassengerTrend, '公交', '轨道', '出租'))
                  setInterval(function() {
                    n = parseInt((parseInt(that.time.split(':')[0]) * 60 + parseInt(that.time.split(':')[1])) / 30)
                    that.busPassengerTrend = that.dayBusPassengerTrend.slice(0, n+1)
                    that.taxiPassengerTrend = that.dayTaxiPassengerTrend.slice(0, n+1)
                    that.trackPassengerTrend = that.dayTrackPassengerTrend.slice(0, n+1)
                    that.flowNumChart.clear()
                    that.flowNumChart.setOption(that.lineEchartOption('客流规模', that.passengerTrendxDate, that.busPassengerTrend, this.trackPassengerTrend, this.taxiPassengerTrend, '公交', '轨道', '出租'))
                  }, 30000)*/

      },
      // 人群比例
      initPageFlowConsistChart() {
        const that = this
        let i = 0
        let oldManRate = 15
        let manRate = 30
        let youngerRate = 22
        let childrenRate = 15
        let youngerChildrenRate = 18
        const flowConsistChart = echarts.init(this.$refs['eventFlowConsist'])
        flowConsistChart.setOption(that.reasonPieEchartOption('老人', oldManRate, '成年人', manRate, '青少年', youngerRate, '儿童', childrenRate, '幼儿', youngerChildrenRate))
        setInterval(function() {
          if (i < that.oldManRate.length) {
            oldManRate = that.oldManRate[i]
            manRate = that.manRate[i]
            youngerRate = that.youngerRate[i]
            childrenRate = that.childrenRate[i]
            youngerChildrenRate = that.youngerChildrenRate[i]
            i++
          } else {
            i = 0
            oldManRate = that.oldManRate[i]
            manRate = that.manRate[i]
            youngerRate = that.youngerRate[i]
            childrenRate = that.childrenRate[i]
            youngerChildrenRate = that.youngerChildrenRate[i]
            i++
          }
          flowConsistChart.clear()
          flowConsistChart.setOption(that.reasonPieEchartOption('老人', oldManRate, '成年人', manRate, '青少年', youngerRate, '儿童', childrenRate, '幼儿', youngerChildrenRate))

        }, 30000)//30秒刷新
      },
      //五四广场人流量监控
      initPageCapacityIndexChart() {
        const that = this
        let n = parseInt((parseInt(that.time.split(':')[0]) * 60 + parseInt(that.time.split(':')[1])) / 30)
        const flowNumChart = echarts.init(this.$refs['eventFlowNum'])
        /* this.busPassengerTrend = this.dayBusPassengerTrend.slice(0, n+1)
         this.taxiPassengerTrend = this.dayTaxiPassengerTrend.slice(0, n+1)
         this.trackPassengerTrend = this.dayTrackPassengerTrend.slice(0, n+1)*/
        that.eventPassengerTrend = this.eventDayPassengerTrend.slice(0,41)

        flowNumChart.setOption(this.lineEchartOption(this.passengerTrendxDate, that.eventPassengerTrend, null, null, '人流量', null, null))
        /*       setInterval(function() {
                 n = parseInt((parseInt(that.time.split(':')[0]) * 60 + parseInt(that.time.split(':')[1])) / 30)
                 that.busPassengerTrend = that.dayBusPassengerTrend.slice(0, n+1)
                 that.taxiPassengerTrend = that.dayTaxiPassengerTrend.slice(0, n+1)
                 that.trackPassengerTrend = that.dayTrackPassengerTrend.slice(0, n+1)
                 that.flowNumChart.clear()
                        that.flowNumChart.setOption(this.lineEchartOption(this.passengerTrendxDate, this.passengerTrend, '人流量'))
               }, 30000)*/

      },
      //饼图
      reasonPieEchartOption(name1, rate1, name2, rate2, name3, rate3, name4, rate4, name5, rate5) {
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

      },
      //折线图
      lineEchartOption(xDate, yDate1, yDate2, yDate3, yName1, yName2, yName3) {
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

              },
              {
                name: yName2,
                icon: 'rect'
              },
              {
                name: yName3,
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
            name: '(万人)',
            axisTick: {
              show: false
            },
            axisLabel: {//坐标轴刻度标签的相关设置。
              show: true,
              textStyle: {
                color: '#1ac1ff',
                fontSize: 14
              },
              formatter: function(value, index) {

                return value / 10000
              }
            },

            axisLine: {//坐标轴轴线相关设置。
              lineStyle: {
                color: '#1ac1ff',
                width:
                  1
              }
            }
            ,

            splitLine: {//坐标轴在 grid 区域中的分隔线。
              lineStyle: {
                type: 'dashed',
                color:
                  '#295b92'
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
            },
            {
              data: yDate2,
              markLine: {
                normal: {
                  lineStyle: {
                    type: 'dotted',
                    color: '#2fe4ff',
                    width: 2
                  }
                }

              },
              name: yName2,
              type: 'line',
              symbol: 'none',//不显示折线拐点
              smooth: true,//设置折线图平滑
              itemStyle: {
                normal: {
                  color: '#28ffac'
                }
              },
              lineStyle: {//线条样式
                normal: {
                  color: '#28ffac',
                  width: 3

                }
              },
              areaStyle: {//阴影区域
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(67,254,132,0.5)'
                  },

                    {
                      offset: 1,
                      color: 'rgba(67,254,132,0)'
                    }])
                }
              }
            },
            {
              data: yDate3,
              markLine: {
                normal: {
                  lineStyle: {
                    type: 'dotted',
                    color: '#2fe4ff',
                    width: 2
                  }
                }

              },
              name: yName3,
              type: 'line',
              symbol: 'none',//不显示折线拐点
              smooth: true,//设置折线图平滑
              itemStyle: {
                normal: {
                  color: '#a359ff'
                }
              },
              lineStyle: {//线条样式
                normal: {
                  color: '#a359ff',
                  width: 3

                }
              },
              areaStyle: {//阴影区域
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(163,89,255,0.5)'
                  },

                    {
                      offset: 1,
                      color: 'rgba(163,89,255,0)'
                    }])
                }
              }
            }]

        }

      },
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
      },
      /* 返回数据概览*/
      goBack() {
        this.$router.push({ path: '/' })
      },
      /*事件详情页面*/
      goEventPage() {
        this.mainPage = false
        this.eventPage = true
        if (this.$refs['eventFlowNum']) {
          this.initPageCapacityIndexChart()
        }
        if (this.$refs['eventFlowConsist']) {
          this.initPageFlowConsistChart()
        }
        /*  this.$router.push({ path: '/odAnalysis/event' })*/
      },
      /*切换地图图层*/
      changeMap(n) {
        this.$refs['hotMap'].classList.remove('map-temp-select')
        this.$refs['odMap'].classList.remove('map-temp-select')
        if (n === '1') {
          /* 显示热力图层 */
          this.$refs['hotMap'].classList.add('map-temp-select')
          this.$refs.flowAnalysis.heatLayerChange()
          this.flowNumTable = false
        } else {
          /* 显示OD图层 */
          this.$refs['odMap'].classList.add('map-temp-select')
          this.$refs.flowAnalysis.ODLayer()
          this.flowNumTable = true
        }
      },
      comeIn() {
        this.InOrOut = true
        this.$refs['flowComeIn'].classList.add('flowButtonSelect')
        this.$refs['flowComeOut'].classList.remove('flowButtonSelect')
        this.$refs.flowAnalysis.ODLayer1()
      },
      comeOut() {
        this.InOrOut = false
        this.$refs['flowComeIn'].classList.remove('flowButtonSelect')
        this.$refs['flowComeOut'].classList.add('flowButtonSelect')
        this.$refs.flowAnalysis.ODLayer()
      }
    }
  }
</script>

<style scoped>
  .out {
    font-family: "SimHei";
    /*  background: url('../../assets/flow/map2.jpg') no-repeat center;*/
    width: 100%;
    height: 100%;
    background-color: #01223a;
    overflow: hidden;
    position: absolute;
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

  @keyframes rightIn {
    from {
      right: -28%;
      opacity: 0;
    }
    to {
      right: 25px;
      opacity: 1;
    }
  }

  @keyframes rightIn {
    from {
      right: -28%;
      opacity: 0;
    }
    to {
      right: 30px;
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
    height: 105px;

    width: 180px;
    display: inline-block;
    margin: 17px 0 15px 15px;
    position: absolute;
    left: 355px;
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

  .time-title {
    z-index: 999;
    position: absolute;

    top: 10px;
    height: 105px;
    width: 450px;
  }

  .title1 {
    height: 105px;
    width: 395px;
    background: url('../../assets/flow/title1.png') no-repeat center;
    position: absolute;
    left: -18px;
  }

  .title2 {
    height: 105px;
    width: 395px;
    background: url('../../assets/flow/title2.png') no-repeat center;
    position: absolute;
    left: -18px;
  }

  .dailyPassenger {
    position: absolute;
    /*   left: 20px;*/
    top: 130px;
    width: 390px;
    height: 70px;

    /*  background: linear-gradient(90deg, rgba(48, 147, 209, 0.3), rgba(48, 147, 209, 0));*/
    color: #fff;
  }

  .flowConsist {
    position: absolute;
    /*    left: 20px;*/
    top: 310px;
    width: 390px;
    height: 270px;
    /*    background: linear-gradient(90deg, rgba(48, 147, 209, 0.3), rgba(48, 147, 209, 0));*/
  }

  .flowNum {
    position: absolute;
    top: 540px;
    width: 390px;
    /*    height: 670px;*/

    /*
        background: linear-gradient(90deg, rgba(48, 147, 209, 0.3), rgba(48, 147, 209, 0));*/
  }

  .flowConsistIndex {
    width: 420px;
    height: 200px;
    position: absolute;
    top: 50px;

  }

  .flowNumIndex {
    width: 420px;
    height: 220px;
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

  /*地图图层选择栏*/
  .map-template {
    /*width:690px;*/
    /*width:108px;*/
    /*height:108px;*/
    width: 80px;
    height: 80px;
    position: absolute;
    top: 15px;
    right: 120px;
    /*   overflow: hidden;*/
    z-index: 9999;

  }

  .map-template-border {

    width: 108px;
    /*width:680px;*/
    /*height:68px;*/
    height: 52px;
    position: absolute;

    top: 15px;
    /*    overflow: hidden;*/

  }

  .map-template-left {
    width: 240px;
    height: 50px;
    position: absolute;
    left: -220px;
    /*top:20px;*/
    /*    left: 640px;*/
    /*display: none;*/
    border: 1px solid #2fe4ff;
    border-right: none;
    background-color: #0c264b;

  }

  .map-temp {
    width: 94px;
    height: 34px;
    line-height: 34px;
    text-align: center;
    position: absolute;
    top: 8px;
    font-size: 16px;
    color: #2fe4ff;
    background: url('../../assets/flow/layer-select.png') no-repeat center;
    cursor: pointer;

  }

  .map-temp:hover, .map-temp-select {
    color: #fff;
    background-image: url('../../assets/flow/layer-select-hover.png') !important;

  }

  .map-temp1 {

    left: 15px;
  }

  .map-temp2 {

    left: 125px;
  }

  .map-template-right {
    /*  height:108px;
      width:108px;*/
    width: 80px;
    height: 80px;
    position: absolute;
    top: 0px;
    right: 0px;
    z-index: 999;

    background: url('../../assets/flow/layer-selection-o.png') 0 0/ 80px 80px;

  }

  .layer-img {
    width: 80px;
    height: 80px;
    -webkit-animation: rotation 15s linear infinite;
    animation: rotation 15s linear infinite;
  }

  @keyframes rotation {
    0% {

      transform: rotate(0)
    }
    100% {
      transform: rotate(360deg)
    }

  }

  .map-template-title {
    font-size: 16px;
    background-color: #3373ca;
    border-radius: 50%;
    /* width: 73px;
     height: 73px;*/
    width: 53px;
    height: 53px;
    position: absolute;
    /*  top:17px;
      left:17px;*/
    top: 13px;
    left: 13px;
    color: #fff;

  }

  .map-template-content {
    width: 40px;
    height: 40px;
    position: absolute;
    /*  top:15px;
      left:15px;*/
    top: 7px;
    left: 7px;
    text-align: center;
    line-height: 20px;
  }

  /*返回首页*/
  .go-home {
    width: 65px;
    height: 65px;
    position: absolute;
    top: 20px;
    right: 20px;
    background: url("../../assets/flow/go-home.png") 0 0 /65px 65px no-repeat;
  }

  .go-home:hover {
    background: url("../../assets/flow/go-home-hover.png") 0 0/65px 65px no-repeat;
  }

  .mainVideo {
    width: 340px;
    height: 200px;
    position: absolute;
    top: 60px;
    left: 50px;

  }

  .video {
    width: 170px;
    height: 100px;
    position: absolute;
  }

  .video1 {
    top: 60px;
    left: 50px;
  }

  .video2 {
    top: 60px;
    left: 230px;
  }

  .video3 {
    top: 170px;
    left: 50px;
  }

  .video4 {
    top: 170px;
    left: 230px;
  }

  .videoConsist {
    position: absolute;
    /*    left: 20px;*/
    top: 700px;
    width: 390px;
    height: 260px;
    /*    background: linear-gradient(90deg, rgba(48, 147, 209, 0.3), rgba(48, 147, 209, 0));*/
  }

  .suggestion {
    position: absolute;
    width: 364px;
    height: 180px;
    right: -364px;
    top: 100px;
    color: #fff;
    font-size: 18px;
    /* -webkit-animation: rightIn 0.75s ;
     -o-animation: rightIn 0.75s linear 75s 1;*/
    /*  animation: rightIn 0.75s 30s ;*/

    -webkit-animation: rightIn 2s ease 75s;
    -o-animation: rightIn 2s ease 75s;
    animation: rightIn 2s ease 75s;
    animation-fill-mode: forwards; /*元素固定住动画结束的位置*/
  }

  .suggestionContent {
    position: absolute;
    width: 364px;
    line-height: 30px;
    /*    height: 155px;*/
    padding: 20px 0px 20px 10px;
    top: 25px;
    background: rgba(4, 37, 68, 0.6);
    font-size: 18px;
    color: #01f0fe;
  }

  .disireLine {
    position: absolute;
    width: 285px;
    /*height: 490px;*/
    top: 246px;
    right: 25px;
    z-index: 1000;
    background: rgba(4, 37, 68, 0.6);
    /*  border: 1px solid #0079d9;*/
    -webkit-animation: rightIn 0.75s;
    -o-animation: rightIn 0.75s;
    animation: rightIn 0.75s;
    position: absolute;

  }

  .region {
    position: absolute;
    top: 10px;
    left: 14px;
    height: 30px;
    line-height: 30px;
    background: url('../../assets/regionPoint.png') 0 center/22px 22px no-repeat;
    padding-left: 30px;
    color: #ffd71b;
    font-size: 24px;
  }

  .disireLineContent {
    position: absolute;
    left: 14px;
    top: 50px;
    color: #fff;
    font-size: 20px;
    line-height: 23px;

  }

  .flowButtonBanner {
    position: absolute;
    width: 254px;
    height: 30px;
    line-height: 30px;
    top: 90px;
    /*left: 50%;*/
    margin-left: 15px;
    background-color: #084472;
    color: #32f3ff;
    border: 1px solid #3fb1ff;
    cursor: pointer;
    font-size: 20px;
  }

  .flowButton {
    float: left;
    width: 126px;
    height: 30px;
    text-align: center;
  }

  .flowButtonSelect {
    background-color: #368ced;
    color: #fff;
  }

  .flowContext {
    position: absolute;
    width: 255px;
    /*height: 330px;*/
    top: 130px;
    left: 41%;
    margin-left: -103px;
    background-color: rgba(13, 41, 69, 0.5);
    padding-top: 5px;

  }

  .flowList {
    width: 100%;
    height: 32px;
    line-height: 32px;
  }

  .flowList:hover {
    background-color: #2f7fd8;
  }

  .flowReginName {
    color: #fff;
    font-size: 18px;
    padding: 0;
    padding-left: 10px;
    text-align: left;
    float: left;
  }

  .visitNum {
    color: #32f3ff;
    font-size: 20px;
    padding: 0;
    padding-right: 10px;
    text-align: right;

  }

  .first {
    width: 25px;
    height: 25px;
    top: 35px;
    left: 35px;
    animation: fadeInOut 1s infinite 78s;
    /*    animation-fill-mode:forwards;//元素固定住动画结束的位置*/
    animation-iteration-count: 35;

  }

  .second {
    width: 40px;
    height: 40px;
    top: 25px;
    left: 25px;
    overflow: hidden;
    animation: fadeInOut 1s infinite 78.2s;
    animation-iteration-count: 35;
  }

  .third {
    width: 55px;
    height: 55px;
    top: 15px;
    left: 15px;
    animation: fadeInOut 1s infinite 78.4s;
    animation-iteration-count: 35;

  }

  @keyframes fadeInOut {
    0% {
      opacity: 0; /*初始状态 透明度为0*/
    }
    100% {
      opacity: 1; /*结尾状态 透明度为1*/
    }
  }

  .box {
    width: 50px;
    height: 50px;
    box-sizing: border-box;
    position: absolute;
    top: -15px;
    left: 150px;
    z-index: 999;
    overflow: hidden;
  }

  .wifi-symbol {

    width: 50px;
    height: 50px;
    box-sizing: border-box;
    transform: rotate(135deg);
    overflow: hidden;
    position: absolute;
  }

  .wifi-circle {
    border: 3px solid #01f0fe;
    border-radius: 50%;
    position: absolute;
    box-sizing: border-box;

  }

  .pic {
    position: absolute;
    left: 125px;
    top: -10px;
    width: 23px;
    height: 40px;
    background: url('../../assets/flow/voice.png');
    background-size: 40px 40px;
    z-index: 999;
  }

  .alarmPic {
    width: 33px;
    height: 34px;
    position: absolute;
    right: 930px;
    top: 740px;
    cursor: pointer;
    z-index: 9000;
    background-image: url("../../assets/报警.png");
    background-size: 33px 34px;
    animation: scaleout 2s infinite ease-in-out;

    opacity: 0;

  }

  @keyframes scaleout {
    0% {
      transform: scale(1.0);
      -webkit-transform: scale(1.0);
      opacity: 0;
    }
    50% {
      transform: scale(1.0);
      -webkit-transform: scale(1.0);
      opacity: 1;
    }
    100% {
      transform: scale(1.0);
      -webkit-transform: scale(1.0);
      opacity: 0;
    }
  }
</style>
