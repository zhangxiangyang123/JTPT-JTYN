<template>
  <div class="chart-container">
    <div :id="id" :style="{height:height,width:width}"/>
    <!--<input type="button" value="切换" @click="flyMove">-->
  </div>
</template>

<script>
var map = null;
var echartslayer = null;
var heatechartslayer = null;
var heatdata;
var powerDeliveryInterval;

export default {
  name: 'Minemaps',
  props: {
    id: {
      type: String,
      default: 'map'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    }
    // map: '',
    // resultLayer: ''
  },
  data() {
    return {
      urls:['../../../static/taxi23.json','../../../static/taxi2.json']
    }
  },
  mounted() {
    this.initMinemap()
  },
  methods: {
    initMinemap: function() {
      minemap.domainUrl = '//minedata.cn';
      minemap.dataDomainUrl = '//datahive.minedata.cn';
      minemap.spriteUrl = '//minedata.cn/minemapapi/v2.0.0/sprite/sprite';
      minemap.serviceUrl = '//minedata.cn/service';
      minemap.accessToken = 'fd64f5f1ed8640d295dc47d9b4e9104f';
      minemap.solution = 11806;
        map = new minemap.Map({
        container: 'map',
        style: '//minedata.cn/service/solu/style/id/11806',
        center: [120.38, 36.11],
        minZoom: 5,
        maxZoom: 18,
        zoom: 11.5,
        pitch: 30,
        overviewMap: false,
        logoControl: false /* logo控件是否显示，不加该参数时默认显示*/
      });
      this.initMapLoad();
    },
    initMapLoad:function() {
      var that = this;
      map.on('load', function () {
        console.log("map-on-load");
        that.ODLayer1();
        // that.heatLayer();
      });
    },
    flyMove:function() {
      //清除热力图层
      debugger
      map.removeSource('heatmap-source');
      map.removeLayer('heatmap-layer');
      //由热力图飞到定点（五四广场）
      map.flyTo({
        center: [120.384866,36.064529],
        speed:0.7,
        curve:1,
        zoom:16,
        bearing: -30,
        pitch:50,
        duration: 10000,
        easing: function(t) {
          return t
        }
    });
      this.ODLayer();

      setTimeout(function() {
        //添加事件图标
        var el = document.createElement('div');
        el.style.zIndex = 120;
        var p = document.createElement('div');
        p.className = 'ring-point-marker';
        var p1 = document.createElement('div');
        p1.className = 'ring-point-inner1';
        var p2 = document.createElement('div');
        p2.className = 'ring-point-inner2';
        var p3 = document.createElement('div');
        p3.className = 'ring-point-inner3';
        p.appendChild(p1);
        p.appendChild(p2);
        p.appendChild(p3);
        el.appendChild(p);
        var marker = new minemap.Marker(el, {offset: [-40, -40]})
          .setLngLat([120.379550,36.064495])
          .addTo(map);

        //添加事件弹窗
        var ele = document.createElement('div');
        ele.className = 'test-marker';/**自定义css类*/
        ele.style["border"] = "solid 1px #00ff00";
        ele.style["backgroundColor"] = "red";
        var span = document.createElement('span');
        span.innerHTML = '五四广场站';
        ele.appendChild(span);
        var marker1 = new minemap.Marker(ele, {offset: [-25, -25]})
          .setLngLat([120.379550,36.064495+0.0004]).addTo(map);

        // 由五四广场飞到事发地点（地铁A1口）
        map.easeTo({
          center: [120.379550,36.064495],
          zoom: 17,
          pitch:60,
          curve: 4,
          bearing: 20,
          duration: 10000,
          easing: function (t) {
            return t;
          }
        });
        // this.echartslayer.remove();
      }, 13000);

    },

    heatLayer1:function(){
      if(echartslayer){
        this.clearLayer();
      }
      const heatData = {
        "type": "FeatureCollection",
        "features": [
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.401231,36.065823
              ]
            },
            "properties": {
              "mag": 69
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.407267,36.06559
              ]
            },
            "properties": {
              "mag": 58
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.387002,36.068274
              ]
            },
            "properties": {
              "mag": 93
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.38384,36.066056
              ]
            },
            "properties": {
              "mag": 68
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.397206,36.06699
              ]
            },
            "properties": {
              "mag": 89
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.360987,36.060105
              ]
            },
            "properties": {
              "mag": 75
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.358687,36.061505
              ]
            },
            "properties": {
              "mag": 54
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.355956,36.065823
              ]
            },
            "properties": {
              "mag": 125
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.351644,36.064072
              ]
            },
            "properties": {
              "mag": 83
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.356819,36.070841
              ]
            },
            "properties": {
              "mag": 49
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.358687,36.076209
              ]
            },
            "properties": {
              "mag": 60
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.38384,36.069324
              ]
            },
            "properties": {
              "mag": 69
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.411579,36.064423
              ]
            },
            "properties": {
              "mag": 79
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.436732,36.068507
              ]
            },
            "properties": {
              "mag": 97
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.429545,36.063139
              ]
            },
            "properties": {
              "mag": 68
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.449093,36.074692
              ]
            },
            "properties": {
              "mag": 126
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.430695,36.077375
              ]
            },
            "properties": {
              "mag": 103
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.454267,36.080759
              ]
            },
            "properties": {
              "mag": 112
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.399219,36.084026
              ]
            },
            "properties": {
              "mag": 49
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.418909,36.081459
              ]
            },
            "properties": {
              "mag": 58
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.398787,36.087643
              ]
            },
            "properties": {
              "mag": 71
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.384846,36.094292
              ]
            },
            "properties": {
              "mag": 68
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.359693,36.089626
              ]
            },
            "properties": {
              "mag": 86
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.365586,36.091843
              ]
            },
            "properties": {
              "mag": 89
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.38657,36.097909
              ]
            },
            "properties": {
              "mag": 36
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.378953,36.10759
              ]
            },
            "properties": {
              "mag": 17
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.359981,36.107124
              ]
            },
            "properties": {
              "mag": 23
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.467346,36.094759
              ]
            },
            "properties": {
              "mag": 72
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.481288,36.105374
              ]
            },
            "properties": {
              "mag": 53
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.488905,36.12625
              ]
            },
            "properties": {
              "mag": 31
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.449811,36.107357
              ]
            },
            "properties": {
              "mag": 26
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.424515,36.075275
              ]
            },
            "properties": {
              "mag": 36
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.44205,36.104208
              ]
            },
            "properties": {
              "mag": 45
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.378522,36.063839
              ]
            },
            "properties": {
              "mag": 69
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.372054,36.061155
              ]
            },
            "properties": {
              "mag": 53
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.38269,36.069324
              ]
            },
            "properties": {
              "mag": 6
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.383983,36.076675
              ]
            },
            "properties": {
              "mag": 63
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.382115,36.083268
              ]
            },
            "properties": {
              "mag": 39
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.380318,36.092251
              ]
            },
            "properties": {
              "mag": 24
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.419484,36.092601
              ]
            },
            "properties": {
              "mag": 51
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.401375,36.092484
              ]
            },
            "properties": {
              "mag": 31
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.369682,36.097734
              ]
            },
            "properties": {
              "mag": 18
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.379528,36.098025
              ]
            },
            "properties": {
              "mag": 10
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.407052,36.103333
              ]
            },
            "properties": {
              "mag": 12
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.413735,36.10794
              ]
            },
            "properties": {
              "mag": 7
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.408489,36.106424
              ]
            },
            "properties": {
              "mag": 61
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.397925,36.104558
              ]
            },
            "properties": {
              "mag": 42
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.393469,36.105841
              ]
            },
            "properties": {
              "mag": 35
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.455201,36.080934
              ]
            },
            "properties": {
              "mag": 63
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.439966,36.082684
              ]
            },
            "properties": {
              "mag": 47
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.444493,36.084668
              ]
            },
            "properties": {
              "mag": 56
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.454123,36.092484
              ]
            },
            "properties": {
              "mag": 28
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.462387,36.095051
              ]
            },
            "properties": {
              "mag": 41
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.470939,36.11004
              ]
            },
            "properties": {
              "mag": 38
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.460663,36.113538
              ]
            },
            "properties": {
              "mag": 47
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.45592,36.118028
              ]
            },
            "properties": {
              "mag": 51
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.447727,36.116104
              ]
            },
            "properties": {
              "mag": 31
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.440828,36.121177
              ]
            },
            "properties": {
              "mag": 19
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.440828,36.121177
              ]
            },
            "properties": {
              "mag": 14
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.437091,36.124617
              ]
            },
            "properties": {
              "mag": 20
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.379309,36.170341
              ]
            },
            "properties": {
              "mag": 120
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.392423,36.171983
              ]
            },
            "properties": {
              "mag": 80
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.395953,36.149247
              ]
            },
            "properties": {
              "mag": 60
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.360203,36.098351
              ]
            },
            "properties": {
              "mag": 72
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.385024,36.061724
              ]
            },
            "properties": {
              "mag": 98
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.384244,36.063993
              ]
            },
            "properties": {
              "mag": 56
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.381699,36.058477
              ]
            },
            "properties": {
              "mag":56
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.384003,36.062751
              ]
            },
            "properties": {
              "mag": 49
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.384531,36.066088
              ]
            },
            "properties": {
              "mag": 62
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.319574,36.065997
              ]
            },
            "properties": {
              "mag":153
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.328235,36.066707
              ]
            },
            "properties": {
              "mag": 74
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.409429,36.125863
              ]
            },
            "properties": {
              "mag": 38
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.419730,36.131597
              ]
            },
            "properties": {
              "mag": 47
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.422696,36.135604
              ]
            },
            "properties": {
              "mag": 49
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.428249,36.153019
              ]
            },
            "properties": {
              "mag": 57
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.329474,36.087205
              ]
            },
            "properties": {
              "mag": 79
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.334612,36.087089
              ]
            },
            "properties": {
              "mag": 69
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.338278,36.089772
              ]
            },
            "properties": {
              "mag": 59
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.336553,36.082888
              ]
            },
            "properties": {
              "mag": 79
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.347261,36.082743
              ]
            },
            "properties": {
              "mag": 47
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.347979,36.085572
              ]
            },
            "properties": {
              "mag": 88
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.3478,36.090734
              ]
            },
            "properties": {
              "mag": 81
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.402237,36.124093
              ]
            },
            "properties": {
              "mag": 74
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.397063,36.118728
              ]
            },
            "properties": {
              "mag": 58
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.36025,36.10743
              ]
            },
            "properties": {
              "mag": 137
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.362155,36.103435
              ]
            },
            "properties": {
              "mag": 68
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.449937,36.186003
              ]
            },
            "properties": {
              "mag": 58
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.409549,36.207207
              ]
            },
            "properties": {
              "mag": 57
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.393595,36.191014
              ]
            },
            "properties": {
              "mag": 49
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.431396,36.228987
              ]
            },
            "properties": {
              "mag": 69
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.403656,36.24785
              ]
            },
            "properties": {
              "mag": 69
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.393739,36.27218
              ]
            },
            "properties": {
              "mag": 94
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.401644,36.274391
              ]
            },
            "properties": {
              "mag": 70
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.337397,36.253672
              ]
            },
            "properties": {
              "mag": 58
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.437091,36.124617
              ]
            },
            "properties": {
              "mag": 20
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.398482,36.286029
              ]
            },
            "properties": {
              "mag": 48
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.403656,36.330004
              ]
            },
            "properties": {
              "mag": 59
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.510591,36.312789
              ]
            },
            "properties": {
              "mag": 38
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.421622,36.151273
              ]
            },
            "properties": {
              "mag": 38
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.357232,36.123524
              ]
            },
            "properties": {
              "mag": 51
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.386552,36.091449
              ]
            },
            "properties": {
              "mag": 54
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.429815,36.109296
              ]
            },
            "properties": {
              "mag": 49
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.452524,36.127489
              ]
            },
            "properties": {
              "mag": 74
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.469772,36.108596
              ]
            },
            "properties": {
              "mag": 69
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.439014,36.076865
              ]
            },
            "properties": {
              "mag": 49
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.453961,36.088532
              ]
            },
            "properties": {
              "mag": 40
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.447943,36.156446
              ]
            },
            "properties": {
              "mag": 30
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.448949,36.185348
              ]
            },
            "properties": {
              "mag": 51
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.438888,36.185814
              ]
            },
            "properties": {
              "mag": 67
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.412585,36.200611
              ]
            },
            "properties": {
              "mag": 62
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.481863,36.194436
              ]
            },
            "properties": {
              "mag": 45
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.399362,36.193388
              ]
            },
            "properties": {
              "mag": 78
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.432851,36.173287
              ]
            },
            "properties": {
              "mag": 79
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.43242,36.167402
              ]
            },
            "properties": {
              "mag": 63
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.431989,36.164488
              ]
            },
            "properties": {
              "mag": 89
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.436732,36.159068
              ]
            },
            "properties": {
              "mag": 63
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.439786,36.152074
              ]
            },
            "properties": {
              "mag": 57
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.44417,36.149626
              ]
            },
            "properties": {
              "mag": 32
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.456243,36.121527
              ]
            },
            "properties": {
              "mag": 57
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.457105,36.118903
              ]
            },
            "properties": {
              "mag": 59
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.465801,36.11418
              ]
            },
            "properties": {
              "mag": 56
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.469538,36.107299
              ]
            },
            "properties": {
              "mag": 74
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.478305,36.10689
              ]
            },
            "properties": {
              "mag": 65
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.474712,36.103158
              ]
            },
            "properties": {
              "mag": 52
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.471838,36.099892
              ]
            },
            "properties": {
              "mag": 63
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.463789,36.095809
              ]
            },
            "properties": {
              "mag": 47
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.457393,36.085076
              ]
            },
            "properties": {
              "mag": 57
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.450566,36.080001
              ]
            },
            "properties": {
              "mag": 68
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.447835,36.075275
              ]
            },
            "properties": {
              "mag": 75
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.430444,36.071366
              ]
            },
            "properties": {
              "mag": 59
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.402848,36.070432
              ]
            },
            "properties": {
              "mag": 62
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.420455,36.093068
              ]
            },
            "properties": {
              "mag": 63
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.473347,36.179405
              ]
            },
            "properties": {
              "mag": 47
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.494762,36.18092
              ]
            },
            "properties": {
              "mag": 58
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.429941,36.275831
              ]
            },
            "properties": {
              "mag": 58
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.416071,36.263203
              ]
            },
            "properties": {
              "mag": 68
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.42606,36.153124
              ]
            },
            "properties": {
              "mag": 58
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.390703,36.146479
              ]
            },
            "properties": {
              "mag": 37
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.393434,36.111031
              ]
            },
            "properties": {
              "mag": 47
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.366772,36.087234
              ]
            },
            "properties": {
              "mag": 53
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.371874,36.081284
              ]
            },
            "properties": {
              "mag": 59
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.368802,36.137866
              ]
            },
            "properties": {
              "mag": 53
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.375342,36.143054
              ]
            },
            "properties": {
              "mag": 48
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.356513,36.123349
              ]
            },
            "properties": {
              "mag": 62
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.356801,36.11297
              ]
            },
            "properties": {
              "mag": 28
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.375629,36.121367
              ]
            },
            "properties": {
              "mag": 38
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.359819,36.115302
              ]
            },
            "properties": {
              "mag": 47
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.367724,36.103872
              ]
            },
            "properties": {
              "mag": 46
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.359963,36.095357
              ]
            },
            "properties": {
              "mag": 49
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.351051,36.100023
              ]
            },
            "properties": {
              "mag": 38
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.31246,36.06998
              ]
            },
            "properties": {
              "mag": 63
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.314113,36.062453
              ]
            },
            "properties": {
              "mag": 46
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.302399,36.066421
              ]
            },
            "properties": {
              "mag": 47
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.307681,36.061782
              ]
            },
            "properties": {
              "mag": 52
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.308741,36.061286
              ]
            },
            "properties": {
              "mag": 57
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.314634,36.064087
              ]
            },
            "properties": {
              "mag": 37
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.317545,36.065954
              ]
            },
            "properties": {
              "mag": 38
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.319449,36.068172
              ]
            },
            "properties": {
              "mag": 48
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.311364,36.070389
              ]
            },
            "properties": {
              "mag": 68
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.317113,36.074035
              ]
            },
            "properties": {
              "mag": 47
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.325917,36.078907
              ]
            },
            "properties": {
              "mag": 49
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.332205,36.07844
              ]
            },
            "properties": {
              "mag": 37
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.332205,36.07844
              ]
            },
            "properties": {
              "mag": 48
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.336517,36.073306
              ]
            },
            "properties": {
              "mag": 47
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.30601,36.065692
              ]
            },
            "properties": {
              "mag": 48
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.30601,36.065692
              ]
            },
            "properties": {
              "mag": 48
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.313556,36.060353
              ]
            },
            "properties": {
              "mag": 47
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.318263,36.076077
              ]
            },
            "properties": {
              "mag": 52
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.326492,36.072723
              ]
            },
            "properties": {
              "mag": 63
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.325701,36.068172
              ]
            },
            "properties": {
              "mag": 78
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.326348,36.068463
              ]
            },
            "properties": {
              "mag": 54
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.324336,36.068259
              ]
            },
            "properties": {
              "mag": 45
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.435115,36.118626
              ]
            },
            "properties": {
              "mag": 51
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.419808,36.11711
              ]
            },
            "properties": {
              "mag": 63
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.416646,36.11367
              ]
            },
            "properties": {
              "mag": 58
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.420958,36.112795
              ]
            },
            "properties": {
              "mag": 36
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.413053,36.115652
              ]
            },
            "properties": {
              "mag": 45
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.414059,36.108071
              ]
            },
            "properties": {
              "mag": 52
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.409172,36.108071
              ]
            },
            "properties": {
              "mag": 38
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.408741,36.100956
              ]
            },
            "properties": {
              "mag": 28
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.432168,36.10568
              ]
            },
            "properties": {
              "mag": 37
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.431737,36.131628
              ]
            },
            "properties": {
              "mag": 47
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.430228,36.13192
              ]
            },
            "properties": {
              "mag": 36
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.435043,36.138857
              ]
            },
            "properties": {
              "mag": 48
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.440577,36.143229
              ]
            },
            "properties": {
              "mag": 37
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.435187,36.129821
              ]
            },
            "properties": {
              "mag": 45
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.442589,36.121367
              ]
            },
            "properties": {
              "mag": 38
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.441655,36.114544
              ]
            },
            "properties": {
              "mag": 37
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.440145,36.114136
              ]
            },
            "properties": {
              "mag": 37
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.461417,36.105622
              ]
            },
            "properties": {
              "mag": 58
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.425341,36.12125
              ]
            },
            "properties": {
              "mag": 52
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.421245,36.126031
              ]
            },
            "properties": {
              "mag": 37
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.426707,36.129413
              ]
            },
            "properties": {
              "mag": 58
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.371299,36.143404
              ]
            },
            "properties": {
              "mag": 24
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.358795,36.13944
              ]
            },
            "properties": {
              "mag": 14
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.354914,36.144453
              ]
            },
            "properties": {
              "mag": 36
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.37518,36.129996
              ]
            },
            "properties": {
              "mag": 48
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.384666,36.123233
              ]
            },
            "properties": {
              "mag": 68
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.385385,36.109588
              ]
            },
            "properties": {
              "mag": 48
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.413124,36.136758
              ]
            },
            "properties": {
              "mag": 49
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.388834,36.141305
              ]
            },
            "properties": {
              "mag": 35
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.372018,36.140723
              ]
            },
            "properties": {
              "mag": 27
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.369431,36.109238
              ]
            },
            "properties": {
              "mag": 31
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.363754,36.14183
              ]
            },
            "properties": {
              "mag": 38
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.357214,36.133027
              ]
            },
            "properties": {
              "mag": 48
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.363538,36.125448
              ]
            },
            "properties": {
              "mag": 37
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.350315,36.124224
              ]
            },
            "properties": {
              "mag": 49
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.361777,36.125127
              ]
            },
            "properties": {
              "mag": 16
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.350171,36.116527
              ]
            },
            "properties": {
              "mag": 25
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.353369,36.115711
              ]
            },
            "properties": {
              "mag": 33
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.351824,36.12367
              ]
            },
            "properties": {
              "mag": 24
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.349704,36.122766
              ]
            },
            "properties": {
              "mag": 21
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.348357,36.12023
              ]
            },
            "properties": {
              "mag": 32
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.369736,36.148402
              ]
            },
            "properties": {
              "mag": 23
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.366395,36.1454
              ]
            },
            "properties": {
              "mag": 21
            }
          },
          {
            "type": "Feature",
            "geometry": {
              "type": "Point",
              "coordinates": [
                120.364598,36.144206
              ]
            },
            "properties": {
              "mag": 26
            }
          }




        ]
      }
      map.addSource('heatmap-source', {
              type: 'geojson',
              data: heatData
            })

            // 添加图层
            map.addLayer({
              'id': 'heatmap-layer',
              'type': 'heatmap',
              'source': 'heatmap-source',
              'layout': {
                'visibility': 'visible'
              },
              'paint': {
                // 一个热力图数据点的模糊范围，单位是像素，默认值30；要求：值大于等于1，可根据zoom level进行插值设置
                'heatmap-radius': 30,
                // 一个热力图单个数据点的热力程度，默认值为1；要求：值大于等于0，支持使用property中某个的热力值
                'heatmap-weight': {
                  'property': 'mag',
                  'stops': [[0, 0], [10, 1]]
                },
                // 用于统一控制热力值的强度，默认值1；要求：值大于等于0，可根据zoom level进行插值设置
                'heatmap-intensity': 1,
                // 表示热力图颜色阶梯，阶梯的值域范围为0-1，默认值为["interpolate",["linear"],["heatmap-density"],0,"rgba(0, 0, 255, 0)",0.1,"royalblue",0.3,"cyan",0.5,"lime",0.7,"yellow",1,"red"]
                'heatmap-color': [
                  'interpolate',
                  ['linear'],
                  ['heatmap-density'],
                  0, 'rgba(0, 0, 255, 0)', 0.1, 'royalblue', 0.3, 'cyan', 0.5, 'lime', 0.7, 'yellow', 1, 'red'
                ],
                // 表示热力图的不透明度，默认值1；值域范围0-1，可根据zoom level进行插值设置
                'heatmap-opacity': 1
              }
            })
    },
    heatLayer:function(url) {
      // if(echartslayer){
      //   this.clearLayer();
      // }
      map.repaint = true;
      // url = "//minedata.cn/minemapapi/demo/assets/heat-tracks.json";
      minemap.util.getJSON(url, function (error,data) {
        // console.log("1-" + data.length);
        var points = data.map(function (track) {
          return [track[0], track[1], track[2]];
        });
        console.log(points.length);
        var series = [];
        var heatoption = {

          GLMap: {
            roam: true
          },
          coordinateSystem: 'GLMap',
          title: {
            // text: '热力图展示',
            subtext: '',
            left: 'center',
            textStyle: {
              color: '#fff'
            }
          },
          tooltip: {
            trigger: 'item'
          },
          visualMap: {
            show: false,
            top: 'top',
            min: 0,
            max: 10,
            seriesIndex: 0,
            calculable: true,
            inRange: {
              color: ['royalblue', 'cyan', 'lime', 'yellow', 'red']
            }
          },
          series: [{
            type: 'heatmap',
            coordinateSystem: 'GLMap',
            data: points,
            // minOpacity:0.7,
            pointSize: 8,
            blurSize: 12
          }]
        };

        /**
         * 最终要的就是下面这两句，首先创建一个echartslayer
         * 然后再调用echartslayer.chart.setOption 这个charts就是echarts.init 返回的实例
         * echartslayer 拥有的方法
         * resize 重置大小
         * remove 删除
         * dispose 清空
         * getChartId 获取div对应id号，方便样式设置
         */
        heatechartslayer = minemap.Template.create({map: map, type: 'heatmap'});
        heatechartslayer.chart.setOption(heatoption);
      })
    },
    heatLayerUpdate:function(url) {
      minemap.util.getJSON(url, function (error,data) {
        var points = data.map(function (track) {
          return [track[0], track[1], track[2]];
        });
        var heatoption = {
          series: [{
            data: points
          }]
        };
        heatechartslayer.chart.setOption(heatoption);
      })
    },
    heatLayerChange:function() {
      var that = this;
      if(echartslayer){
        this.clearLayer();
      }
      if(heatechartslayer){
        this.clearHeatLayer();
      }
      if(heatechartslayer == null){
        that.heatLayer(that.urls[0]);
      } else {
        that.heatLayerUpdate(that.urls[0]);
      }
      var url= that.urls.pop();
      that.urls.unshift(url);
      powerDeliveryInterval=setInterval(function () {
        if(heatechartslayer == null){
          that.heatLayer(that.urls[0]);
        } else {
          that.heatLayerUpdate(that.urls[0]);
        }
        var url= that.urls.pop();
        that.urls.unshift(url);
      },4000);
    },

    ODLayer:function() {
      //清除热力图层
      if(heatechartslayer){
        this.clearHeatLayer();
      }
      if(echartslayer){
        this.clearLayer();
      }
      map.repaint = true;
        var data = [
          [120.384866, 36.062529, 120.304876,36.068284 , '五四广场', '云南路街道', 20],
          [120.384866, 36.062529, 120.329300,36.083919 , '五四广场', '辽宁路街道', 30],
          [120.384866, 36.062529, 120.353860,36.116096, '五四广场', '四方街道', 10],
          [120.384866, 36.062529, 120.391547,36.141207, '五四广场', '洛阳路街道', 50],
          [120.384866, 36.062529, 120.425925,36.138840, '五四广场', '浮山路街道', 60],
          [120.384866, 36.062529, 120.414586,36.069913 , '五四广场', '金门路街道', 10],
          [120.384866, 36.062529, 120.386932,36.180429 , '五四广场', '兴华路街道', 40],
          [120.384866, 36.062529, 120.458297,36.107191 , '五四广场', '中韩街道', 50],
          [120.384866, 36.062529, 120.466158,36.169191 , '五四广场', '九水街道', 10],
          [120.384866, 36.062529, 120.516049,36.185942 , '五四广场', '北宅街道', 50],
          [120.384866, 36.062529, 120.538049,36.112393 , '五四广场', '沙子口街道', 20],
          [120.384866, 36.062529, 120.395611,36.097474  , '五四广场', '辽源路街道', 40]
        ]
        var colors = [
          // '#00F8FF',
          '#00FF00',
          '#FFF800',
          '#FF0000'
        ]
        var scatterData = [];
        var lineData = [];
        var min = Number.MAX_VALUE;
        var max = Number.MIN_VALUE;
        for (var i = 0; i < data.length; i++) {
          const item = data[i];
          const name = item[4];
          const dest = item[5];
          const count = item[6];

          if (count < min) {
            min = count;
          }
          if (count > max) {
            max = count;
          }
          scatterData.push({
            name: dest,
            count: count,
            value: item.slice(2, 4)
          })
          lineData.push({
            name: name,
            count: count,
            dest: dest,
            coords: [item.slice(0, 2), item.slice(2, 4)]
          });
        }

        const getColor = function (param) {
          var factor = (param.data.count - min) / (max - min);
          var index = Math.round(colors.length * factor);
          return colors[index];
        };

        const series = [{
          name: 'bgLine',
          type: 'lines',
          coordinateSystem: 'GLMap',
          zlevel: 1,
          // symbol: ['none', 'arrow'],
          // symbolSize: 10,
          effect: {
            show: true,
            period: 4, //箭头指向速度，值越小速度越快
            trailLength: 0.02, //特效尾迹长度[0,1]值越大，尾迹越长重
            symbol: 'arrow', //箭头图标
            symbolSize: 7, //图标大小
          },
          lineStyle: {
            normal: {
              color:  getColor,
              width: 3,
              opacity: 0.5,
              curveness: 0.2
            }
          },
          data: lineData
        }, {
          name: 'scatter',
          type: 'effectScatter',
          coordinateSystem: 'GLMap',
          zlevel: 2,
          rippleEffect: {
            scale: 50,
            brushType: 'stroke'
          },
          label: {
            normal: {
              show: true,
              position: 'bottom',
              formatter: '{b}'
            }
          },
          symbolSize: 1,
          itemStyle: {
            normal: {
              show: true,
              color: getColor
            }
          },
          data: scatterData
        },
          {
          name: 'sLine',
          type: 'lines',
          coordinateSystem: 'GLMap',
          zlevel: 3,
          effect: {
            show: true,
            period: 6,
            trailLength: 0.4,
            symbolSize: 5
          },
          lineStyle: {
            normal: {
              color: getColor,
              width: 0,
              curveness: 0.2
            }
          },
          data: lineData
        }, {
          name: 'lLine',
          type: 'lines',
          coordinateSystem: 'GLMap',
          zlevel: 4,
          effect: {
            show: true,
            period: 6,
            trailLength: 0.4,
            opacity: 0.1,
            symbolSize: 20
          },
          lineStyle: {
            normal: {
              color: getColor,
              width: 0,
              curveness: 0.2
            }
          },
          data: lineData
        }
        ];

        //组装option
        var option = {
          GLMap: {
            roam: true
          },
          tooltip: {
            trigger: 'item',
            backgroundColor: 'rgba(0,0,0,0)',
            formatter: function (param) {
              return param.data.name + '->' + param.data.dest + ': ' + param.data.count;
            }
          },
          series: series
        };

        /**
         * 最重要的就是下面这两句，首先创建一个echartslayer
         * 然后再调用echartslayer.chart.setOption 这个charts就是echarts.init 返回的实例
         * echartslayer 拥有的方法
         * resize 重置大小
         * remove 删除
         * dispose 清空
         * getChartId 获取div对应id号，方便样式设置
         */
        echartslayer = minemap.Template.create({map: map, type: 'od'});
        echartslayer.chart.setOption(option);

    },
    ODLayer1:function() {
      //清除热力图层
      if(heatechartslayer){
        this.clearHeatLayer();
      }
      if(echartslayer){
        this.clearLayer();
      }
      map.repaint = true;
      var data = [
        [120.304876,36.068284, 120.384866, 36.062529 , '云南路街道', '五四广场', 20],
        [120.329300,36.083919, 120.384866, 36.062529 , '辽宁路街道', '五四广场', 30],
        [120.353860,36.116096, 120.384866, 36.062529, '四方街道', '五四广场', 40],
        [120.391547,36.141207, 120.384866, 36.062529, '洛阳路街道', '五四广场', 50],
        [120.425925,36.138840, 120.384866, 36.062529, '浮山路街道', '五四广场', 60],
        [120.414586,36.069913, 120.384866, 36.062529 , '金门路街道', '五四广场', 10],
        [120.386932,36.180429, 120.384866, 36.062529 , '兴华路街道', '五四广场', 40],
        [120.458297,36.107191, 120.384866, 36.062529 , '中韩街道', '五四广场', 10],
        [120.466158,36.169191, 120.384866, 36.062529 , '九水街道', '五四广场', 10],
        [120.516049,36.185942, 120.384866, 36.062529 , '北宅街道', '五四广场', 50],
        [120.538049,36.112393, 120.384866, 36.062529, '沙子口街道', '五四广场', 20],
        [120.395611,36.097474, 120.384866, 36.062529, '辽源路街道', '五四广场', 10]
      ]
      var colors = [
        // '#00F8FF',
        '#00FF00',
        '#FFF800',
        '#FF0000'
      ]
      var scatterData = [];
      var lineData = [];
      var min = Number.MAX_VALUE;
      var max = Number.MIN_VALUE;
      for (var i = 0; i < data.length; i++) {
        const item = data[i];
        const name = item[4];
        const dest = item[5];
        const count = item[6];

        if (count < min) {
          min = count;
        }
        if (count > max) {
          max = count;
        }
        scatterData.push({
          name: dest,
          count: count,
          value: item.slice(2, 4)
        })
        lineData.push({
          name: name,
          count: count,
          dest: dest,
          coords: [item.slice(0, 2), item.slice(2, 4)]
        });
      }

      const getColor = function (param) {
        var factor = (param.data.count - min) / (max - min);
        var index = Math.round(colors.length * factor);
        return colors[index];
      };

      const series = [{
        name: 'bgLine',
        type: 'lines',
        coordinateSystem: 'GLMap',
        zlevel: 1,
        // symbol: ['none', 'arrow'],
        // symbolSize: 10,
        effect: {
          show: true,
          period: 4, //箭头指向速度，值越小速度越快
          trailLength: 0.02, //特效尾迹长度[0,1]值越大，尾迹越长重
          symbol: 'arrow', //箭头图标
          symbolSize: 7, //图标大小
        },
        lineStyle: {
          normal: {
            color: getColor,
            width: 3,
            opacity: 0.5,
            curveness: 0.2
          }
        },
        data: lineData
      }, {
        name: 'scatter',
        type: 'effectScatter',
        coordinateSystem: 'GLMap',
        zlevel: 2,
        rippleEffect: {
          scale: 50,
          brushType: 'stroke'
        },
        label: {
          normal: {
            show: true,
            position: 'bottom',
            formatter: '{b}'
          }
        },
        symbolSize: 1,
        itemStyle: {
          normal: {
            show: true,
            color:getColor
          }
        },
        data: scatterData
      }
        //   {
        //   name: 'sLine',
        //   type: 'lines',
        //   coordinateSystem: 'GLMap',
        //   zlevel: 3,
        //   effect: {
        //     show: true,
        //     period: 6,
        //     trailLength: 0.4,
        //     symbolSize: 5
        //   },
        //   lineStyle: {
        //     normal: {
        //       color: getColor,
        //       width: 0,
        //       curveness: 0.2
        //     }
        //   },
        //   data: lineData
        // }, {
        //   name: 'lLine',
        //   type: 'lines',
        //   coordinateSystem: 'GLMap',
        //   zlevel: 4,
        //   effect: {
        //     show: true,
        //     period: 6,
        //     trailLength: 0.4,
        //     opacity: 0.1,
        //     symbolSize: 20
        //   },
        //   lineStyle: {
        //     normal: {
        //       color: getColor,
        //       width: 0,
        //       curveness: 0.2
        //     }
        //   },
        //   data: lineData
        // }
      ];

      //组装option
      var option = {
        GLMap: {
          roam: true
        },
        tooltip: {
          trigger: 'item',
          backgroundColor: 'rgba(0,0,0,0)',
          formatter: function (param) {
            return param.data.name + '->' + param.data.dest + ': ' + param.data.count;
          }
        },
        series: series
      };

      /**
       * 最重要的就是下面这两句，首先创建一个echartslayer
       * 然后再调用echartslayer.chart.setOption 这个charts就是echarts.init 返回的实例
       * echartslayer 拥有的方法
       * resize 重置大小
       * remove 删除
       * dispose 清空
       * getChartId 获取div对应id号，方便样式设置
       */
      echartslayer = minemap.Template.create({map: map, type: 'od'});
      echartslayer.chart.setOption(option);

    },
    clearLayer:function () {
      echartslayer.remove();
      echartslayer=null;
    },
    clearHeatLayer:function () {
      heatechartslayer.remove();
      heatechartslayer=null;
    }

  }

}
</script>

<style scoped>
  .chart-container{
    width: 100%;
    height: 100%;
  }

</style>
<style>
  @keyframes ring_bound3 {
    from {
      left: 20px;
      top: 20px;
      width: 20px;
      height: 20px;
    }
    to {
      left: 0;
      top: 0;
      width: 60px;
      height: 60px;
    }
  }

  @keyframes ring_bound2 {
    from {
      left: 25px;
      top: 25px;
      width: 10px;
      height: 10px;
    }
    to {
      left: 10px;
      top: 10px;
      width: 40px;
      height: 40px;
    }
  }

  .ring-point-marker {
    width: 60px;
    height: 60px;
    cursor: pointer;
    background-color: transparent;
  }

  .ring-point-inner3 {
    position: absolute;
    left: 20px;
    top: 20px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    box-shadow: 0 0 10px #ff0000;
    background-color: transparent;
    background-image: radial-gradient(circle at center, transparent, rgba(255, 0, 0, 0.5));
    border: solid 1px rgba(255, 0, 0, 0.6);
    animation: ring_bound3 2s infinite linear;
    z-index: 3;
  }
  .ring-point-inner2 {
    position: absolute;
    left: 25px;
    top: 25px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    box-shadow: 0 0 10px #ff0000;
    background-color: transparent;
    background-image: radial-gradient(circle at center, transparent, rgba(255, 0, 0, 0.5));
    border: solid 1px rgba(255, 0, 0, 0.6);
    animation: ring_bound2 2s infinite linear;
    z-index: 3;
  }
  .ring-point-inner1 {
    position: absolute;
    left: 25px;
    top: 25px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    box-shadow: 0 0 10px #ff0000;
    background-image: radial-gradient(circle at center, rgba(255, 0, 0, 0.8), rgba(255, 0, 0, 0.3));
    z-index: 1;
  }
  .eventPoint{
    background: url("../../assets/报警.png") ;
    background-size: 33px 34px;
    width: 33px;
    height: 34px;
    padding: 0px;
  }
</style>
