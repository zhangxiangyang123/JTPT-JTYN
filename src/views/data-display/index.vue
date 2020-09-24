<template>
  <div class="content">
    <div class="data-display">
      <div ref="dataAccess" style="position: absolute;width: 1835px;height: 976px" />
      <!--视频-->
      <div style="position: absolute;top:29.5%;left:7%;">
        <div class="font-style">
          <img src="../../assets/dataDot.png" />采用摄像机&nbsp;&nbsp;
          <span id="cameraUsing" />个
        </div>
        <div class="font-style">
          <img src="../../assets/dataDot.png" />总摄像机数&nbsp;&nbsp;
          <span id="cameraAll" />个
        </div>
      </div>
      <!--出租-->
      <div style="position: absolute;top:56.5%;left:1%;">
        <div class="font-style">
          <img src="../../assets/dataDot.png" />数据总量：
          <span id="taxiYear" />
          <!-- <span id="taxiDay" />M/日 -->
        </div>
        <div class="font-style">
          <img src="../../assets/dataDot.png" />今日增量：
          <span id="taxiAll" />
        </div>
        <div class="font-style">
          <img src="../../assets/dataDot.png" />共享数据量：
          <span id="taxiShare" />
        </div>
      </div>
            <!--公交-->
      <div style="position: absolute;top:81%;left:17%;">
        <div class="font-style">
          <img src="../../assets/dataDot.png" />数据总量：
          <span id="busesYear" />
          <!-- <span id="taxiDay" />M/日 -->
        </div>
        <div class="font-style">
          <img src="../../assets/dataDot.png" />今日增量：
          <span id="busesAll" />
        </div>
        <div class="font-style">
          <img src="../../assets/dataDot.png" />共享数据量：
          <span id="busesShare" />
        </div>
      </div>
      <!-- 公交事件 -->
      <div class="click" @click="eventChange" style="position:absolute;bottom:5%;left:30%; cursor:pointer" ></div>
      <div class="bus" v-show="isShow" style="position: absolute;top:18%;left:30%;">
      <span class="close" @click="closeChange" style="position:relative;right:0 cursor:pointer">X</span>
      <!--公交集团-->
      <div class="font-style" style="float:left;padding-left:4%">
        <div class="font-style">
          <img src="../../assets/dataDot.png" /><span>公交集团:</span><br>          
          <img src="../../assets/dataDot.png" />数据总量：
          <span id="busYear" />
        </div>
        <div class="font-style">
          <img src="../../assets/dataDot.png" />今日增量：
          <span id="busAll" />
        </div>
        <div class="font-style">
          <img src="../../assets/dataDot.png" />共享数据量：
          <span id="busShare" />
        </div>
      </div>
      <!--交运集团-->
      <div style="float:left;padding-left:4%">
        <div class="font-style" >
          <img src="../../assets/dataDot.png" /><span>交运集团:</span><br>         
          <img src="../../assets/dataDot.png" />数据总量：
          <span id="DeliveryYear" />
        </div>
        <div class="font-style">
          <img src="../../assets/dataDot.png" />今日增量：
          <span id="DeliveryAll" />
        </div>
        <div class="font-style">
          <img src="../../assets/dataDot.png" />共享数据量：
          <span id="DeliveryShare" />
        </div>
      </div>
      <!--真情巴士-->
      <div style="float:left;padding-left:4%">
        <div class="font-style">
          <img src="../../assets/dataDot.png" /><span>真情巴士:</span><br>         
          <img src="../../assets/dataDot.png" />数据总量：
          <span id="truthYear" />
        </div>
        <div class="font-style">
          <img src="../../assets/dataDot.png" />今日增量：
          <span id="truthAll" />
        </div>
        <div class="font-style">
          <img src="../../assets/dataDot.png" />共享数据量：
          <span id="truthShare" />
        </div>
      </div>
      </div>
      <!--轨道-->
      <div style="position: absolute;top:78.4%;left:75%;">
        <div class="font-style">
          <img src="../../assets/dataDot.png" />数据总量：
          <span id="trackYear" />
        </div>
        <div class="font-style">
          <img src="../../assets/dataDot.png" />今日增量：
          <span id="trackAll" />
        </div>
        <div class="font-style">
          <img src="../../assets/dataDot.png" />共享数据量：
          <span id="trackShare" />
        </div>
      </div>
      <!--网约车-->
      <div style="position: absolute;top:53%;left:83%;">
        <div class="font-style">
          <img src="../../assets/dataDot.png" />数据总量：
          <span id="netCarYear" />
        </div>
        <div class="font-style">
          <img src="../../assets/dataDot.png" />今日增量：
          <span id="netCarAll" />
        </div>
        <div class="font-style">
          <img src="../../assets/dataDot.png" />共享数据量：
          <span id="netCarShare" />
        </div>
      </div>
      <!--水路-->
      <div style="position: absolute;top:33.4%;left:83.3%;">
        <div class="font-style">
          <img src="../../assets/dataDot.png" />数据总量：
          <span id="waterYear" />
        </div>
        <div class="font-style">
          <img src="../../assets/dataDot.png" />今日增量：
          <span id="waterAll" />
        </div>
        <div class="font-style">
          <img src="../../assets/dataDot.png" />共享数据量：
          <span id="waterShare" />
        </div>
      </div>
      <!--铁路-->
      <div style="position: absolute;top:20.2%;left:75%;">
        <div class="font-style">
          <img src="../../assets/dataDot.png" />数据总量：
          <span id="railwayYear" />
        </div>
        <div class="font-style">
          <img src="../../assets/dataDot.png" />今日增量：
          <span id="railwayAll" />
        </div>
        <div class="font-style">
          <img src="../../assets/dataDot.png" />共享数据量：
          <span id="railwayShare" />
        </div>
      </div>
      <!--民航-->
      <div style="position: absolute;top:9.5%;left:70%;">
        <div class="font-style">
          <img src="../../assets/dataDot.png" />数据总量：
          <span id="airYear" />
        </div>
        <div class="font-style">
          <img src="../../assets/dataDot.png" />今日增量：
          <span id="airAll" />
        </div>
        <div class="font-style">
          <img src="../../assets/dataDot.png" />共享数据量：
          <span id="airShare" />
        </div>
      </div>
      <!--长途客运-->
      <div style="position: absolute;top:0.6%;left:60%;">
        <div class="font-style">
          <img src="../../assets/dataDot.png" />数据总量：
          <span id="passengerYear" />
        </div>
        <div class="font-style">
          <img src="../../assets/dataDot.png" />今日增量：
          <span id="passengerAll" />
        </div>
        <div class="font-style">
          <img src="../../assets/dataDot.png" />共享数据量：
          <span id="passengerShare" />
        </div>
      </div>
      <!--公路-->
      <div style="position: absolute;top:8.4%;left:23%;">
        <div class="font-style">
          <img src="../../assets/dataDot.png" />数据总量：
          <span id="roadYear" />
        </div>
        <div class="font-style">
          <img src="../../assets/dataDot.png" />今日增量：
          <span id="roadAll" />
        </div>
        <div class="font-style">
          <img src="../../assets/dataDot.png" />共享数据量：
          <span id="roadShare" />
        </div>
      </div>
      <!--手机信令-->
      <div style="position: absolute;top:17.4%;left:15%;">
        <div class="font-style">
          <img src="../../assets/dataDot.png" />数据总量：
          <span id="phoneYear" />
        </div>
        <div class="font-style">
          <img src="../../assets/dataDot.png" />今日增量：
          <span id="phoneAll" />
        </div>
        <div class="font-style">
          <img src="../../assets/dataDot.png" />共享数据量：
          <span id="phoneShare" />
        </div>
      </div>
      <!--算法仓效果-->
      <div class="lines-light" style=" left: 41%;top:27%;">
        <div class="lines-first" />
      </div>
      <div class="lines-light" style="left:56.5%;top:26%">
        <div class="lines-second" />
      </div>
      <div class="lines-light" style="left:53%;top:20%">
        <div class="lines-third" />
      </div>
      <div class="lines-light" style="left:43%;top:18%">
        <div class="lines-four" />
      </div>
      <div class="lines-light" style="left:46%;top:15%">
        <div class="lines-five" />
      </div>
      <div class="lines-light" style="left:50%;top:12%">
        <div class="lines-six" />
      </div>
      <!--数据中断-->
      <div class="data-aborts">
        <img class="data-img" src="../../assets/dataAbort.png" />
      </div>
    </div>
    <el-input style="display: none" @keyup.enter="switchToOD">登录</el-input>
  </div>
</template>

<script>
import echarts from "echarts";
import { CountUp } from "../../utils/countUp";
import { debounce } from "@/utils";
import { getDataCenterInfo } from "../../api/index/index";
export default {
  name: "DataDisplay",
  data() {
    return {
      isShow:false,
      lists: [],
      myColors: ["#1f77b4", "#629fc9", "#94bedb", "#c9e0ef"],
      defaultWords: [
        { name: "Cat", value: 26 },
        { name: "fish", value: 19 },
        { name: "things", value: 18 },
        { name: "look", value: 16 },
        { name: "two", value: 15 },
        { name: "fun", value: 9 },
        { name: "know", value: 9 },
        {name: "good",value: 9},
        {name: "play",value: 6}
        ]
    };
  },
  created() {
    var _this = this;
    document.onkeydown = function(e) {
      var key = window.event.keyCode;
      if (key === 13) {
        _this.switchToOD();
      }
    };
  },
  mounted() {
    // var startNum = 0
    // var endNum = 115
    // var interGap = 40v
    // var that = this
    // interval = setInterval(function() {
    //   // debugger
    //   // that.CountUpSeparator('cameraUsing', startNum, endNum)
    //   // startNum = endNum
    //   // endNum = endNum + interGap
    //   that.initData()
    // }, 60000)
    this.initData();
    this.initDataAccess(); // 数据流动
    this.getSendIndex();
  },
  methods: {
    eventChange(){
        this.isShow=true
    },
    closeChange(){
        this.isShow=false
    },
    //单位换算
  conver(limit){
    debugger
    var size = "";
    if (limit < 0.1 * 1024) {
      size = (limit).toFixed(1) + "KB";			
    }else if(limit < 0.1 * 1024 * 1024 ){//如果小于0.1MB转化成
			size = (limit / 1024).toFixed(1) + "M";			
		}else if(limit < 0.1 * 1024 * 1024 * 1024){ //如果小于0.1GB转化成G
			size = (limit / (1024 * 1024)).toFixed(1) + "G";
		}else{ //其他转化成T
			size = (limit / (1024 * 1024 * 1024)).toFixed(1) + "T";
		}
		var sizestr = size + ""; 
		var len = sizestr.indexOf("\.");
		var dec = sizestr.substr(len + 1, 2);
		if(dec == "0"){//当小数点后为0时 去掉小数部分
			return sizestr.substring(0,len) + sizestr.substr(len + 3,2);
		}
		return sizestr;
	},
    //获取首页数据
    getSendIndex() {
      getDataCenterInfo("2019-09-29")
        .then(response => {
          console.log("getDataCenterInfo", response);
          this.lists = response.data;
          console.log("this.lists", this.lists);
          this.lists.forEach(item => {
            if (item.type === "出租车") {
              document.getElementById("taxiYear").innerText = this.conver((parseInt(item.totalcount)));
              document.getElementById("taxiAll").innerText = this.conver((parseInt(item.zengcount)));
              document.getElementById("taxiShare").innerText = item.sharecount;
            } else if (item.type === "轨道") {
              document.getElementById("trackYear").innerText = this.conver((parseInt(item.totalcount)));
              document.getElementById("trackAll").innerText = this.conver((parseInt(item.zengcount)));
              document.getElementById("trackShare").innerText = item.sharecount;
            } else if (item.type === "网约车") {
              document.getElementById("netCarYear").innerText = this.conver((parseInt(item.totalcount)));
              document.getElementById("netCarAll").innerText = this.conver((parseInt(item.zengcount)));
              document.getElementById("netCarShare").innerText =item.sharecount;
                item.sharecount;
            } else if (item.type === "水路") {
              console.log('item.totalcount',item.totalcount);
              document.getElementById("waterYear").innerText = this.conver((parseInt(item.totalcount)));
              document.getElementById("waterAll").innerText = ((item.zengcount)/1024).toFixed(1);
              document.getElementById("waterShare").innerText = item.sharecount;
            } else if (item.type === "铁路") {
              document.getElementById("railwayYear").innerText =((item.totalcount)/1024).toFixed(1);
              document.getElementById("railwayAll").innerText = ((item.zengcount)/1024).toFixed(1);
              document.getElementById("railwayShare").innerText =item.sharecount;
                item.sharecount;
            } else if (item.type === "航空") {
              document.getElementById("airYear").innerText = this.conver((parseInt(item.totalcount)));
              document.getElementById("airAll").innerText = ((item.zengcount)/1024).toFixed(1);
              document.getElementById("airShare").innerText = item.sharecount;
            } else if (item.type === "公路") {
              document.getElementById("roadYear").innerText = this.conver((parseInt(item.totalcount)));
              document.getElementById("roadAll").innerText = ((item.zengcount)/1024).toFixed(1);
              document.getElementById("roadShare").innerText = item.sharecount;
            } else if (item.type === "长途客运") {
              document.getElementById("passengerYear").innerText =this.conver((parseInt(item.totalcount)));
              document.getElementById("passengerAll").innerText =this.conver((parseInt(item.zengcount)));
              document.getElementById("passengerShare").innerText =item.sharecount;
            } else if (item.type === "手机信令") {
              document.getElementById("phoneYear").innerText = ((item.totalcount)/1024).toFixed(1);
              document.getElementById("phoneAll").innerText = ((item.zengcount)/1024).toFixed(1);
              document.getElementById("phoneShare").innerText = item.sharecount;
            }else if (item.type === "公交集团") {
              document.getElementById("busYear").innerText = this.conver((parseInt(item.totalcount)));
              document.getElementById("busAll").innerText = this.conver((parseInt(item.zengcount)));
              document.getElementById("busShare").innerText = item.sharecount;
            }else if (item.type === "交运集团") {
              document.getElementById("DeliveryYear").innerText =this.conver((parseInt(item.totalcount)));
              document.getElementById("DeliveryAll").innerText = this.conver((parseInt(item.zengcount)));
              document.getElementById("DeliveryShare").innerText = item.sharecount;
            }else if (item.type === "真情巴士") {
              document.getElementById("truthYear").innerText = this.conver((parseInt(item.totalcount)));
              document.getElementById("truthAll").innerText = this.conver((parseInt(item.zengcount)));
              document.getElementById("truthShare").innerText = item.sharecount;
            }
          });
          //总量
          let index =  document.getElementById("busYear").innerText.indexOf('M')
          let index1 =  document.getElementById("DeliveryYear").innerText.indexOf('M')
          let index2 =  document.getElementById("truthYear").innerText.indexOf('M')
          //增量
          let inde3 =  document.getElementById("busAll").innerText.indexOf('M')
          let index4 =  document.getElementById("DeliveryAll").innerText.indexOf('M')
          let index5 =  document.getElementById("truthAll").innerText.indexOf('M')
          //共享量
          let inde6 =  document.getElementById("busShare").innerText.indexOf('M')
          let index7 =  document.getElementById("DeliveryShare").innerText.indexOf('M')
          let index8 =  document.getElementById("truthShare").innerText.indexOf('M')
          //总量
          let b1 = document.getElementById("busYear").innerText.slice(0,index)
          let b2=  document.getElementById("DeliveryYear").innerText.slice(0,index1)
          let b3 =  document.getElementById("truthYear").innerText.slice(0,index2)
          //增量
          let b4 = document.getElementById("busAll").innerText.slice(0,index)
          let b5=  document.getElementById("DeliveryAll").innerText.slice(0,index1)
          let b6 =  document.getElementById("truthAll").innerText.slice(0,index2)
          //共享量
          let b7 = document.getElementById("busShare").innerText.slice(0,index)
          let b8=  document.getElementById("DeliveryShare").innerText.slice(0,index1)
          let b9 =  document.getElementById("truthShare").innerText.slice(0,index2)
              document.getElementById("busesYear").innerText = (b1-0)+(b2-0)+(b3-0)+'G'
              document.getElementById("busesAll").innerText = (b4-0)+(b5-0)+(b6-0)+'G'
              document.getElementById("busesShare").innerText = (b7-0)+(b8-0)+(b9-0)
              // document.getElementById("busesAll").innerText = ((item.zengcount)/1024).toFixed(1);
              // document.getElementById("busesShare").innerText = item.sharecount;

        })
        .catch(error => {
          console.dir(error);
          busYear;
        }); //     // var xhr = new XMLHttpRequest()
    },
    initData() {
      var that = this;
      // 视频
      that.CountUpSeparator("cameraUsing", 4154, 4154);
      that.CountUpSeparator("cameraAll", 4356, 4356);
      // 出租
      // that.CountUpSeparator("taxiYear", 3265.6, 3265.6);
      // that.CountUpSeparator("taxiDay", 8151, 8161);
      // that.CountUpSeparator("taxiAll", 74, 76);
      // that.CountUpSeparator("taxiTimely", 62, 66);
      // that.CountUpSeparator("taxiShare", 75, 78);
      // setTimeout(function() {
      //   that.CountUpSeparator("taxiDay", 8161, 9161);
      //   that.CountUpSeparator("taxiAll", 76, 77.8);
      //   that.CountUpSeparator("taxiTimely", 66, 68);
      //   that.CountUpSeparator("taxiShare", 78, 84.6);
      // }, 20000);
      // // 公交
      // that.CountUpSeparator("busYear", 2528.8, 2528.8);
      // that.CountUpSeparator("busDay", 6987, 7084);
      // that.CountUpSeparator("busAll", 61, 64.9);
      // that.CountUpSeparator("busTimely", 52, 56.6);
      // that.CountUpSeparator("busShare", 71, 73.6);
      // setTimeout(function() {
      //   that.CountUpSeparator("busDay", 7084, 7094);
      //   that.CountUpSeparator("busAll", 64.9, 68.9);
      //   that.CountUpSeparator("busTimely", 56.6, 60.6);
      //   that.CountUpSeparator("busShare", 73.6, 77.6);
      // }, 40000);
      // // 轨道
      // that.CountUpSeparator("trackYear", 9.6, 9.6);
      // that.CountUpSeparator("trackDay", 15, 25);
      // that.CountUpSeparator("trackAll", 70, 80.6);
      // that.CountUpSeparator("trackTimely", 47, 53.6);
      // that.CountUpSeparator("trackShare", 48, 54.5);
      // setTimeout(function() {
      //   that.CountUpSeparator("trackDay", 25, 27);
      //   that.CountUpSeparator("trackAll", 80, 90.6);
      //   that.CountUpSeparator("trackTimely", 53, 63.6);
      //   that.CountUpSeparator("trackShare", 54, 64.5);
      // }, 60000);
      // // 网约车
      // that.CountUpSeparator("netCarYear", 298.3, 298.3);
      // that.CountUpSeparator("netCarDay", 700, 800.9);
      // that.CountUpSeparator("netCarAll", 39, 42);
      // that.CountUpSeparator("netCarTimely", 68, 77);
      // that.CountUpSeparator("netCarShare", 70, 80.1);
      // setTimeout(function() {
      //   that.CountUpSeparator("netCarDay", 800, 836.9);
      //   that.CountUpSeparator("netCarAll", 42, 49);
      //   that.CountUpSeparator("netCarTimely", 77, 87);
      //   that.CountUpSeparator("netCarShare", 80, 86.1);
      // }, 60000);
      // // 水路
      // that.CountUpSeparator("waterYear", 460.5, 460.5);
      // that.CountUpSeparator("waterDay", 1000, 1192);
      // setTimeout(function() {
      //   that.CountUpSeparator("waterDay", 1192, 1292);
      // }, 80000);
      // // 铁路
      // that.CountUpSeparator("railwayYear", 23, 23);
      // that.CountUpSeparator("railwayDay", 45, 55);
      // setTimeout(function() {
      //   that.CountUpSeparator("railwayDay", 45, 65);
      // }, 100000);
      // // 民航
      // that.CountUpSeparator("airYear", 48.8, 48.8);
      // that.CountUpSeparator("airDay", 100, 117);
      // setTimeout(function() {
      //   that.CountUpSeparator("airDay", 117, 137);
      // }, 120000);
      // // 长途客运
      // that.CountUpSeparator("passengerYear", 48.8, 48.8);
      // that.CountUpSeparator("passengerDay", 87, 100);
      // setTimeout(function() {
      //   that.CountUpSeparator("passengerDay", 100, 137);
      // }, 140000);
      // // 公路
      // that.CountUpSeparator("roadYear", 148.8, 148.8);
      // that.CountUpSeparator("roadDay", 400, 537);
      // setTimeout(function() {
      //   that.CountUpSeparator("roadDay", 537, 637);
      // }, 140000);
    },
    // 跳转到od分析页面
    switchToOD() {
      debugger;
      this.$router.push({ path: "/OdAnalysis" });
    },
    // 数字递增
    CountUpSeparator(elId, startNum, endNum) {
      var options = {
        useEasing: true, // 使用缓和效果
        useGrouping: true, // 使用分组效果
        separator: "", // 分离器，数据够三位，例如100,000
        decimal: ".", // 小数点分割，例如：10.00
        prefix: "", // 第一位默认数字
        suffix: "" // 最后一位默认数字
      };
      if (startNum > endNum) {
        var countUp = new CountUp(elId, endNum, endNum, 0, 10, options);
        countUp.start();
      } else {
        var countUp = new CountUp(elId, startNum, endNum, 0, 10, options);
        countUp.start();
      }
    },
    initDataAccess() {
      var _this = this;
      var scatterData = [
        { value: [36.2, 11.7] }, // 公交
        { value: [76.8, 34.2] }, // 网约车
        { value: [23.2, 36.2] }, // 出租
        { value: [68.5, 8.6] }, // 轨道
        { value: [78.6, 58] }, // 水路
        { value: [70, 66.8] }, // 铁路
        { value: [62.1, 74.6] }, // 民航
        { value: [53.8, 83.3] }, // 长途客运
        { value: [41.3, 80.1] }, // 公路
        { value: [22.7, 61.2] } // 视频
      ];
      var accessLines = [
        { coords: [[36, 11.5], [45.4, 22.5], [36.5, 32.2], [48, 44.4]] }, // 公交
        { coords: [[76.5, 34.5], [70.5, 41], [67.4, 37.2], [57, 48]] }, // 网约车
        { coords: [[23, 36], [28.3, 41.5], [32.6, 36.5], [43.5, 48.5]] }, // 出租
        { coords: [[69, 8], [58.7, 19.8], [66.1, 28.1], [51, 44.5]] }, // 轨道
        { coords: [[78.8, 58], [75, 54], [62, 67], [54.5, 58]] }, // 水路
        { coords: [[70.5, 67], [66.3, 62.7], [62, 67], [54.5, 58]] }, // 铁路
        { coords: [[62, 74], [58.8, 70.5], [62, 67], [54.5, 58]] }, // 民航
        { coords: [[54.5, 83.5], [50.3, 79.2], [62, 67], [54.5, 58]] }, // 长途客运
        { coords: [[41.5, 80], [45.8, 75], [40.3, 68.5], [47.2, 61]] }, // 公路
        { coords: [[23, 61], [27.8, 55], [34.3, 62.2], [43, 53.5]] } // 视频
      ];
      const dataAccessCharts = echarts.init(this.$refs["dataAccess"]);
      dataAccessCharts.setOption(
        _this.dataAccessOption(accessLines, scatterData)
      );
    },
    accessImg() {
      var image =
        '<img style="width: 28px;height: 25px" src="../../../static/pic/circle.png"/>';
      return image;
    },
    dataAccessOption(accessLines, scatterData) {
      return {
        grid: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0
        },
        xAxis: [
          {
            type: "value",
            min: 0,
            max: 100,
            splitLine: { show: false }
          }
        ],
        yAxis: [
          {
            type: "value",
            min: 0,
            max: 100,
            splitLine: { show: false },
            axisLine: { show: false }
          }
        ],
        series: [
          // {
          //   name: 'bgLine',
          //   type: 'lines',
          //   coordinateSystem: 'cartesian2d',
          //   zlevel: 1,
          //   polyline: true,
          //   lineStyle: {
          //     normal: {
          //       color: '#00ffff',
          //       width: 2,
          //       opacity: 0.5
          //     }
          //   },
          //   data: accessLines
          // },
          {
            name: "scatter",
            type: "effectScatter",
            coordinateSystem: "cartesian2d",
            zlevel: 12,
            rippleEffect: {
              scale: 60,
              brushType: "stroke"
            },
            symbolSize: 1,
            itemStyle: {
              show: true,
              color: "#44FF9C"
            },
            data: scatterData
          },
          {
            name: "sLine",
            type: "lines",
            coordinateSystem: "cartesian2d",
            zlevel: 3,
            polyline: true,
            effect: {
              show: true,
              period: 6,
              trailLength: 0,
              // symbol: 'image://static/pic/circle.png',
              // symbol: 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z',
              symbolSize: 15
            },
            lineStyle: {
              normal: {
                color: "#44FF9C",
                width: 0
              }
            },

            data: accessLines
          }
          //   {
          //   name: 'lLine',
          //   type: 'lines',
          //   coordinateSystem: 'cartesian2d',
          //   zlevel: 4,
          //   polyline: true,
          //   effect: {
          //     show: true,
          //     period: 6,
          //     trailLength: 0,
          //     opacity: 1,
          //     symbol: planePath,
          //     symbolSize: 20
          //   },
          //   lineStyle: {
          //     normal: {
          //       color: '#00ffff',
          //       width: 0
          //     }
          //   },
          //   data: accessLines
          // }
        ]
      };
    }
  }
};
</script>

<style scoped>
.close{
  /* width:15px;
  height: 15px; */
  cursor: pointer;
  position: relative;
  right: -0.6%;
  top:-11%;
  background-color: #06cdff;
  }
.click{
  width: 8%;
  height: 18%;
  /* background-color: red; */
  background-color:rgba(0,0,0,0);
}
.bus{
  padding-top: 1%;
  width:32%;
  height: 18%;
  border: 1px solid #06cdff;
  /* padding: 30px 0px 0px 0px; */
  background-color: rgba(30,54,90,.94);
}
.content {
  width: 100%;
  height: 100%;
  background-image: url("../../assets/dataPageBg.jpg");
  background-size: cover;
}
.data-display {
  position: relative;
  top: 5%;
  left: 0;
  margin: 0 auto;
  width: 1835px;
  height: 976px;
  background: url("../../assets/midContent.png");
  background-size: cover;
}
.font-style {
  color: #00d7fe;
  font-size: 20px;
  line-height: 30px;
}
@keyframes flyLines {
  from {
    margin-top: 200px;
  }
  to {
    margin-top: -200px;
  }
}
.lines-light {
  width: 60px;
  height: 300px;
  position: absolute;
  overflow: hidden;
}
.lines-first {
  z-index: 100;
  width: 11px;
  margin: 0 auto;
  height: 234px;
  background: url("../../assets/number.jpg");
  animation: flyLines 5.5s linear infinite normal;
}
.lines-second {
  z-index: 100;
  width: 11px;
  margin: 0 auto;
  height: 234px;
  background: url("../../assets/number.jpg");
  animation: flyLines 4s linear infinite normal;
}
.lines-third {
  z-index: 100;
  width: 11px;
  margin: 0 auto;
  height: 234px;
  background: url("../../assets/number.jpg");
  animation: flyLines 5s linear infinite normal;
}
.lines-four {
  z-index: 100;
  width: 11px;
  margin: 0 auto;
  height: 234px;
  opacity: 0.6;
  background: url("../../assets/number.jpg");
  animation: flyLines 6s linear infinite normal;
}
.lines-five {
  z-index: 100;
  width: 11px;
  margin: 0 auto;
  height: 234px;
  opacity: 0.2;
  background: url("../../assets/number.jpg");
  animation: flyLines 7s linear infinite normal;
}
.lines-six {
  z-index: 100;
  width: 11px;
  margin: 0 auto;
  height: 234px;
  opacity: 0.2;
  background: url("../../assets/number.jpg");
  animation: flyLines 8s linear infinite normal;
}
.data-aborts {
  position: absolute;
  top: 26%;
  left: 35.5%;
  width: 26px;
  height: 31px;
  background: url("../../assets/flow/circle.png") center center no-repeat;
}
.data-img {
  height: 100%;
  cursor: pointer;
  -webkit-animation: scaleout 3.3s infinite ease-in-out;
  animation: scaleout 2s infinite ease-in-out;
}
@-webkit-keyframes scaleout {
  0% {
    -webkit-transform: scale(1);
  }
  100% {
    -webkit-transform: scale(2.1);
    opacity: 0;
  }
}
@keyframes scaleout {
  0% {
    transform: scale(1);
    -webkit-transform: scale(1);
    opacity: 0;
  }
  50% {
    transform: scale(1);
    -webkit-transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    -webkit-transform: scale(1);
    opacity: 0;
  }
}
</style>
