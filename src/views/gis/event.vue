<template>
  <div class="chart-container">
    <div :id="id" :style="{height:height,width:width}"/>
    <!--<input type="button" value="切换" @click="flyMove">-->
  </div>
</template>

<script>
  var map = null;
  var echartslayer = null;
  var flyMarker = null;

  export default {
    name: 'GISEvent',
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
      return {}
    },
    mounted() {
      this.initMinemap()
    },
    methods: {
      initMinemap: function () {
        minemap.domainUrl = '//minedata.cn';
        minemap.dataDomainUrl = '//datahive.minedata.cn';
        minemap.spriteUrl = '//minedata.cn/minemapapi/v2.0.0/sprite/sprite';
        minemap.serviceUrl = '//minedata.cn/service';
        minemap.accessToken = 'fd64f5f1ed8640d295dc47d9b4e9104f';
        minemap.solution = 11729;
        map = new minemap.Map({
          container: 'map',
          style: '//minedata.cn/service/solu/style/id/11729',
          center: [120.38, 36.11],
          minZoom: 5,
          maxZoom: 18,
          zoom: 11,
          pitch: 30,
          overviewMap: false,
          logoControl: false /* logo控件是否显示，不加该参数时默认显示*/
        });
        this.initMapLoad();
      },
      initMapLoad: function () {
        var that = this;
        map.on('load', function () {
          console.log("map-on-load");
          // that.ODLayer();
          that.flyMove();
        });
      },
      flyMove: function () {
        var that = this;
        //由热力图飞到定点（五四广场）
        map.flyTo({
          center: [120.383866, 36.064929],
          speed: 0.7,
          curve: 1,
          zoom: 16,
          bearing: 0,
          pitch: 80,
          duration: 10000,
          easing: function (t) {
            return t
          }
        });

        //弹出今日视频
        function pop1() {
          //五四广场地铁站
          var elMetro = document.createElement('div');
          elMetro.style.zIndex = 120;
          var pMetro = document.createElement('div');
          pMetro.className = 'ring-point-marker-metro';
          var p1Metro = document.createElement('div');
          p1Metro.className = 'ring-point-inner1-metro';
          var p2Metro = document.createElement('div');
          p2Metro.className = 'ring-point-inner2-metro';
          var p3Metro = document.createElement('div');
          p3Metro.className = 'ring-point-inner3-metro';
          pMetro.appendChild(p1Metro);
          pMetro.appendChild(p2Metro);
          pMetro.appendChild(p3Metro);
          elMetro.appendChild(pMetro);
          var markerMetro = new minemap.Marker(elMetro, {offset: [-15, -10]})
            .setLngLat([120.379550, 36.064095])
            .addTo(map);
          var metroEventLine = document.createElement('div');
          metroEventLine.className = 'metroEventLineClass';
          var metroEventLineMarker = new minemap.Marker(metroEventLine, {offset: [12, -80]})
            .setLngLat([120.379550, 36.064095])
            .addTo(map);
          var metroEvent = document.createElement('div');
          metroEvent.className = 'metroEventClass';
          var metroEventMarker = new minemap.Marker(metroEvent, {offset: [-14, -140]})
            .setLngLat([120.379550, 36.064095])
            .addTo(map);
          var metroPassenger = document.createElement('div');
          metroPassenger.className = 'metroPassengerClass';
          var metroPassengerMarker = new minemap.Marker(metroPassenger, {offset: [-30, -190]})
            .setLngLat([120.379550, 36.064095])
            .addTo(map);
          var metroPassengerNum = document.createElement('div');
          metroPassengerNum.className = 'metroPassengerNumClass';

          var metrorandom = 1500 + Math.round(Math.random() * 100); // 生成5-9的随机数
          metroPassengerNum.innerHTML = metrorandom
          console.log(metrorandom)
          var metroPassengerNumUnit = document.createElement('span');
          metroPassengerNumUnit.className = 'metroPassengerNumUnit';
          metroPassengerNumUnit.innerHTML = '人';
          metroPassengerNum.appendChild(metroPassengerNumUnit);

          var metroPassengerNumMarker = new minemap.Marker(metroPassengerNum, {offset: [0, -190]})
            .setLngLat([120.379550, 36.064095])
            .addTo(map);
          var metroStationName = document.createElement('div');
          metroStationName.className = 'metroStationNameClass';
          metroStationName.innerHTML = '五四广场地铁站';
          var metroStationNameMarker = new minemap.Marker(metroStationName, {offset: [-28, -160]})
            .setLngLat([120.379550, 36.064095])
            .addTo(map);

          //五四广场公交站
          var elBus1 = document.createElement('div');
          elBus1.style.zIndex = 120;
          var pBus1 = document.createElement('div');
          pBus1.className = 'ring-point-marker';
          var p1Bus1 = document.createElement('div');
          p1Bus1.className = 'ring-point-inner1-bus';
          var p2Bus1 = document.createElement('div');
          p2Bus1.className = 'ring-point-inner2-bus';
          var p3Bus1 = document.createElement('div');
          p3Bus1.className = 'ring-point-inner3-bus';
          pBus1.appendChild(p1Bus1);
          pBus1.appendChild(p2Bus1);
          pBus1.appendChild(p3Bus1);
          elBus1.appendChild(pBus1);
          var markerBus1 = new minemap.Marker(elBus1, {offset: [-15, -10]})
            .setLngLat([120.386390, 36.063002])
            .addTo(map);
          var busEventLine1 = document.createElement('div');
          busEventLine1.className = 'busEventLineClass';
          var busEventLineMarker1 = new minemap.Marker(busEventLine1, {offset: [12, -80]})
            .setLngLat([120.386390, 36.063002])
            .addTo(map);
          var busEvent1 = document.createElement('div');
          busEvent1.className = 'busEventClass';
          var busEventMarker1 = new minemap.Marker(busEvent1, {offset: [-14, -140]})
            .setLngLat([120.386390, 36.063002])
            .addTo(map);
          var busPassenger1 = document.createElement('div');
          busPassenger1.className = 'busPassengerClass';
          var busPassengerMarker1 = new minemap.Marker(busPassenger1, {offset: [-30, -190]})
            .setLngLat([120.386390, 36.063002])
            .addTo(map);
          var busPassengerNum1 = document.createElement('div');
          busPassengerNum1.className = 'busPassengerNumClass';
          var bus1random = 90 + Math.round(Math.random() * 10); // 生成5-9的随机数
          busPassengerNum1.innerHTML = bus1random
          console.log(bus1random)
          var busPassengerNum1Unit = document.createElement('span');
          busPassengerNum1Unit.className = 'metroPassengerNumUnit';
          busPassengerNum1Unit.innerHTML = '人';
          busPassengerNum1.appendChild(busPassengerNum1Unit);

          var busPassengerNumMarker1 = new minemap.Marker(busPassengerNum1, {offset: [0, -190]})
            .setLngLat([120.386390, 36.063002])
            .addTo(map);
          var busStationName1 = document.createElement('div');
          busStationName1.className = 'busStationNameClass';
          busStationName1.innerHTML = '五四广场公交站';
          var busStationNameMarker1 = new minemap.Marker(busStationName1, {offset: [-25, -160]})
            .setLngLat([120.386390, 36.063002])
            .addTo(map);

          //市政府公交站
          var el = document.createElement('div');
          el.style.zIndex = 120;
          var p = document.createElement('div');
          p.className = 'ring-point-marker';
          var p1 = document.createElement('div');
          p1.className = 'ring-point-inner1-bus';
          var p2 = document.createElement('div');
          p2.className = 'ring-point-inner2-bus';
          var p3 = document.createElement('div');
          p3.className = 'ring-point-inner3-bus';
          p.appendChild(p1);
          p.appendChild(p2);
          p.appendChild(p3);
          el.appendChild(p);
          var marker = new minemap.Marker(el, {offset: [-15, -10]})
            .setLngLat([120.384278, 36.066154])
            .addTo(map);
          var busEventLine2 = document.createElement('div');
          busEventLine2.className = 'busEventLineClass';
          var busEventLineMarker2 = new minemap.Marker(busEventLine2, {offset: [12, -80]})
            .setLngLat([120.384278, 36.066154])
            .addTo(map);
          var busEvent2 = document.createElement('div');
          busEvent2.className = 'busEventClass';
          var busEventMarker2 = new minemap.Marker(busEvent2, {offset: [-14, -140]})
            .setLngLat([120.384278, 36.066154])
            .addTo(map);
          var busPassenger2 = document.createElement('div');
          busPassenger2.className = 'busPassengerClass';
          var busPassengerMarker2 = new minemap.Marker(busPassenger2, {offset: [-30, -190]})
            .setLngLat([120.384278, 36.066154])
            .addTo(map);
          var busPassengerNum2 = document.createElement('div');
          busPassengerNum2.className = 'busPassengerNumClass';
          var bus2random = 80 + Math.round(Math.random() * 10); // 生成5-9的随机数
          busPassengerNum2.innerHTML = bus2random;
          console.log(bus2random)
          var busPassengerNum2Unit = document.createElement('span');
          busPassengerNum2Unit.className = 'metroPassengerNumUnit';
          busPassengerNum2Unit.innerHTML = '人';
          busPassengerNum2.appendChild(busPassengerNum2Unit);

          var busPassengerNumMarker2 = new minemap.Marker(busPassengerNum2, {offset: [0, -190]})
            .setLngLat([120.384278, 36.066154])
            .addTo(map);
          var busStationName2 = document.createElement('div');
          busStationName2.className = 'busStationNameClass';
          busStationName2.innerHTML = '市政府公交站';
          var busStationNameMarker2 = new minemap.Marker(busStationName2, {offset: [-25, -160]})
            .setLngLat([120.384278, 36.066154])
            .addTo(map);



          //五四广场报警点
          var elAlarm = document.createElement('div');
          elAlarm.style.zIndex = 120;
          var pAlarm = document.createElement('div');
          pAlarm.className = 'ring-point-marker-alarm';
          var p1Alarm = document.createElement('div');
          p1Alarm.className = 'ring-point-inner1-alarm';
          var p2Alarm = document.createElement('div');
          p2Alarm.className = 'ring-point-inner2-alarm';
          var p3Alarm = document.createElement('div');
          p3Alarm.className = 'ring-point-inner3-alarm';
          var p4Alarm = document.createElement('div');
          p4Alarm.className = 'ring-point-inner4-alarm';
          pAlarm.appendChild(p1Alarm);
          pAlarm.appendChild(p2Alarm);
          pAlarm.appendChild(p3Alarm);
          pAlarm.appendChild(p4Alarm);
          elAlarm.appendChild(pAlarm);

          var markerAlarm = new minemap.Marker(elAlarm, {offset: [-85, -90]})
            .setLngLat([120.385154, 36.061663])
            .addTo(map);
          var alarmEventLine = document.createElement('div');
          alarmEventLine.className = 'alarmEventLineClass';
          var alarmEventLineMarker = new minemap.Marker(alarmEventLine, {offset: [12, -200]})
            .setLngLat([120.385154, 36.061663])
            .addTo(map);
          var alarmEventMove = document.createElement('div');
          alarmEventMove.className = 'alarmEventMoveClass';
          var alarmEventMoveMarker = new minemap.Marker(alarmEventMove, {offset: [-24, -279]})
            .setLngLat([120.385154, 36.061663])
            .addTo(map);
          var alarmEvent = document.createElement('div');
          alarmEvent.className = 'alarmEventClass';
          var alarmEventMarker = new minemap.Marker(alarmEvent, {offset: [-18, -270]})
            .setLngLat([120.385154, 36.061663])
            .addTo(map);

          var alarmName = document.createElement('div');
          alarmName.className = 'alarmNameClass';
          alarmName.innerHTML = '大客流报警';
          var alarmNameMarker = new minemap.Marker(alarmName, {offset: [-43, -300]})
            .setLngLat([120.385154, 36.061663])
            .addTo(map);

          //video1-1
          var elVideo = document.createElement('div');
          elVideo.style.zIndex = 120;
          elVideo.className = 'flyVideo';
          elVideo.setAttribute("id", "video1-1");
          var PVideo = document.createElement('div');
          var PVideoName = document.createElement('div');
          PVideoName.className = 'PVideoName';
          PVideoName.innerHTML = '五四广场沿海一线';
          PVideo.innerHTML = '<video class = "videoTmp" height="200px"   autoplay="autoplay" loop><source src="../../../static/show.mp4" type="video/mp4"></video>';
          elVideo.appendChild(PVideoName);
          elVideo.appendChild(PVideo);
          flyMarker = new minemap.Marker(elVideo, {offset: [250, -120]})
            .setLngLat([120.385154, 36.061663])
            .addTo(map);

          // map.on("load", function () {

          map.addSource('polygonSource', {
            'type': 'geojson',
            'data': {
              'type': 'Feature',
              'geometry': {
                'type': 'Polygon',
                'coordinates':
                  [[
                    [120.38245535658132, 36.06211436868588], [120.38329133148085, 36.06247088426261],
                    [120.38414705380973, 36.062779508389596], [120.38433136325693, 36.06282739823823],
                    [120.38502910607997, 36.06290721456875], [120.3864048442968, 36.06298170975383],
                    [120.38718815934925, 36.063045562705256], [120.38738563371368, 36.062720976319085],
                    [120.3873593038079, 36.062673086420034], [120.38735272133141, 36.06244959980535],
                    [120.38731322643724, 36.06215693779039], [120.38724740167282, 36.061795099632036],
                    [120.38685903538482, 36.061779136138156], [120.38663523107903, 36.0617738149776],
                    [120.38649041652604, 36.06175253031739], [120.38593748825593, 36.06156628933455],
                    [120.38593090577945, 36.06139069029926], [120.38589799336165, 36.06131087241596],
                    [120.38584533351462, 36.06123105445165], [120.38578609122658, 36.061145915217736],
                    [120.38563469419722, 36.06105013345875], [120.38543063732078, 36.06099160010173],
                    [120.38525949286219, 36.06097563644485], [120.38510809583283, 36.06099692131524],
                    [120.38499619366212, 36.06101288495344], [120.38479871929769, 36.0611033455519],
                    [120.38469998211548, 36.06113527279628], [120.38453542009768, 36.06115655762346],
                    [120.38441035300968, 36.06115655762346], [120.38418654870401, 36.061119309182914],
                    [120.38392324950394, 36.061044812234485], [120.38371261018665, 36.06103949102432],
                    [120.38337690371026, 36.06114059401436], [120.38313335197512, 36.06129490882381],
                    [120.38302803231647, 36.06131087241596], [120.38244877410489, 36.06211436868588]
                  ]]
              },
              "properties": {
                // "title": "多边形名称",
                // "icon": "school"
              }
            }
          });

          map.addLayer({
            'id': 'polygon',
            'type': 'fill',
            'source': 'polygonSource',
            'layout': {},
            'paint': {
              'fill-color': '#f5384e',
              'fill-opacity': 0.5
            }
          });
          /**
           * 面的名称显示
           */
          map.addLayer({
            "id": "points",
            "type": "symbol",
            "source": "polygonSource",
            "layout": {
              "icon-image": "{icon}-15",
              "text-field": "{title}",
              "text-offset": [0, 0.6],
              "text-anchor": "top"
            },
            "paint": {
              "icon-color": "#0000ff"
            }
          });
          // });

          //画线
          map.addSource("lineSource", {
            "type": "geojson",
            "data": {
              "type": "FeatureCollection",
              "features": [
                {
                  "type": "Feature",
                  "properties": {
                    "color": "#BF151B"
                  },
                  "geometry": {
                    "type": "LineString",
                    "coordinates": [[120.38241467505395, 36.06212047568985], [120.38328140948744, 36.06248809401551], [120.38414210156787, 36.06280906436828], [120.38502180428895, 36.062924756377896], [120.38640833365565, 36.06301189546858], [120.38721714425009, 36.06306769835997], [120.38721714425009, 36.06306769835997]]
                  }
                },
                {
                  "type": "Feature",
                  "properties": {
                    "color": "#BF151B"
                  },
                  "geometry": {
                    "type": "LineString",
                    "coordinates": [[120.3871282839462, 36.0631552654463], [120.38634838093714, 36.063107007393484], [120.3849709240061, 36.06302410669424], [120.38429198605456, 36.062943121228344], [120.38412251597475, 36.06289767834535], [120.38368213617406, 36.06275401909561], [120.38326491338381, 36.06256284601213], [120.38296239813417, 36.062434107603764], [120.38263226041175, 36.06228627712814], [120.38223797896512, 36.06212996243718]]
                  }
                },
                {
                  "type": "Feature",
                  "properties": {
                    "color": "#BF151B"
                  },
                  "geometry": {
                    "type": "LineString",
                    "coordinates": [[120.38236279365958, 36.06220079920422], [120.38225814534957, 36.062363764811195], [120.38217239621463, 36.06247209853257], [120.38197626259819, 36.06275120912504], [120.38178126673, 36.06303895582653], [120.3815093640057, 36.06348613591665], [120.38144216480077, 36.06356381344814], [120.38125830824788, 36.063822253429564], [120.3807935928412, 36.06455405739203], [120.38061679018057, 36.064777320783804]]
                  }
                },
                {
                  "type": "Feature",
                  "properties": {
                    "color": "#E9C148"
                  },
                  "geometry": {
                    "type": "LineString",
                    "coordinates": [[120.38050157881236, 36.064695521461346], [120.38085533578703, 36.06419362450498], [120.38116557011278, 36.063760008199594], [120.38133084416523, 36.063519877823154], [120.38170030134143, 36.06298682081447], [120.38179376491337, 36.062859096277435], [120.38194058564136, 36.062657598357845], [120.38229718279666, 36.06215252336351]]
                  }
                },
                {
                  "type": "Feature",
                  "properties": {
                    "color": "#E9C148"
                  },
                  "geometry": {
                    "type": "LineString",
                    "coordinates": [[120.38709916641517, 36.06317320247034], [120.38638181745478, 36.064172560828325], [120.38595357749665, 36.06478484206498], [120.38545608449391, 36.06549613269655], [120.38492449726328, 36.066244156286146], [120.38498327972104, 36.066244156286146], [120.38553642555121, 36.06547078201288], [120.38601945412222, 36.06478484206498], [120.38644374636948, 36.06418230755098], [120.38693695566275, 36.06347878658558], [120.38715587947058, 36.06318874370801]]
                  }
                },
                {
                  "type": "Feature",
                  "properties": {
                    "color": "#E9C148"
                  },
                  "geometry": {
                    "type": "LineString",
                    "coordinates": [[120.38238788182935, 36.06211175316582], [120.38153659943652, 36.06174061230951], [120.38123258096095, 36.06161158805365], [120.38093716962555, 36.06146871139808], [120.38078163736043, 36.06141469841674]]
                  }
                },
                {
                  "type": "Feature",
                  "properties": {
                    "color": "#E9C148"
                  },
                  "geometry": {
                    "type": "LineString",
                    "coordinates": [[120.387165900556, 36.06315592614824], [120.3876331208553, 36.06319282633072], [120.38786016363042, 36.06321141393464], [120.38849683563654, 36.06325828955602], [120.38889721982218, 36.06328669724661], [120.38945225850603, 36.06331531962124]]
                  }
                },
                {
                  "type": "Feature",
                  "properties": {
                    "color": "#BF151B"
                  },
                  "geometry": {
                    "type": "LineString",
                    "coordinates": [[120.38230743472468, 36.062146930919965], [120.38239258003688, 36.06211329945394], [120.38242454655551, 36.06211329945394], [120.38280913897603, 36.06155007199203], [120.38291491634419, 36.06142445536267], [120.38300258284113, 36.06130349604888], [120.38310022863766, 36.06129033238881], [120.38335116822947, 36.061142750082126], [120.3836918149853, 36.061019849106046], [120.38393074189815, 36.061025879131705], [120.38438441313252, 36.06113023831834], [120.38466043596247, 36.06112400122318], [120.38476507091656, 36.06108683930033], [120.38494805817055, 36.061013830948895], [120.38526265236703, 36.06096019545005], [120.38544085940617, 36.060954293979236], [120.3856274703138, 36.061025879131705], [120.3858005115992, 36.06112400122318], [120.38588239885866, 36.061231759462615], [120.38593915765824, 36.061323343542], [120.38596099433784, 36.06140397915971], [120.3859610165008, 36.06154296653918], [120.38652022226574, 36.061732783747345], [120.38727182047933, 36.061770537459054], [120.38736530402599, 36.06234656501377], [120.38739521833037, 36.062672381257244], [120.38740935461959, 36.06271144181078], [120.38722466177109, 36.06304931848315]]
                  }
                },
                {
                  "type": "Feature",
                  "properties": {
                    "color": "#BF151B"
                  },
                  "geometry": {
                    "type": "LineString",
                    "coordinates": [[120.38237015602277, 36.062194304088905], [120.38238856918713, 36.06209710925235], [120.38277365559236, 36.06149712240992], [120.38287489377024, 36.06138197862687], [120.3829695975441, 36.06125429833233], [120.38309438783278, 36.06123862245278], [120.38333558856533, 36.06109273783041], [120.38368556859041, 36.06096669758581], [120.3839392562337, 36.06097399830752], [120.38439584404483, 36.06108520863957], [120.38464668942049, 36.06107019398992], [120.38494154842664, 36.06095213790057], [120.38522752169348, 36.0609087900492], [120.38543330143307, 36.06090161330005], [120.38564976145534, 36.06097399830752], [120.38584835829067, 36.061100281655314], [120.38592580371238, 36.06118424192215], [120.3859813779739, 36.061293761266796], [120.38601466579541, 36.06140637814951], [120.3860025088477, 36.06153062797952], [120.38655754966197, 36.06168486917268], [120.3868534124233, 36.06170236599014], [120.38725868014961, 36.061711141909655], [120.38731438715246, 36.061711141909655], [120.38744537469796, 36.06249926407513], [120.38743601908203, 36.06273658277975]]
                  }
                }
              ]
            }
          });
          map.addLayer({
            "id": "lines",
            "type": "line",
            "source": "lineSource",
            "layout": {
              "line-join": "round",
              "line-cap": "round"
            },
            "paint": {
              "line-color": {
                "type": "identity",
                "property": "color"
              },
              "line-width": 5.4
            }
          });

          setInterval(function () {
            var metrorandom = 1500 + Math.round(Math.random() * 100); // 生成5-9的随机数
            metroPassengerNum.innerHTML = metrorandom
            var metroPassengerNumUnit = document.createElement('span');
            metroPassengerNumUnit.className = 'metroPassengerNumUnit';
            metroPassengerNumUnit.innerHTML = '人';
            metroPassengerNum.appendChild(metroPassengerNumUnit);

            var bus1random = 90 + Math.round(Math.random() * 10); // 生成随机数
            busPassengerNum1.innerHTML = bus1random
            var busPassengerNum1Unit = document.createElement('span');
            busPassengerNum1Unit.className = 'metroPassengerNumUnit';
            busPassengerNum1Unit.innerHTML = '人';
            busPassengerNum1.appendChild(busPassengerNum1Unit);

            var bus2random1 = 80 + Math.round(Math.random() * 10); // 生成随机数
            busPassengerNum2.innerHTML = bus2random1;
            var busPassengerNum2Unit = document.createElement('span');
            busPassengerNum2Unit.className = 'metroPassengerNumUnit';
            busPassengerNum2Unit.innerHTML = '人';
            busPassengerNum2.appendChild(busPassengerNum2Unit);
          }, 5000);

        }

        //飞到地铁站
        function fly1() {

          // 由五四广场飞到事发地点（地铁A1口）
          map.easeTo({
            center: [120.379550, 36.065095],
            zoom: 17,
            pitch: 80,
            curve: 4,
            bearing: 30,
            duration: 10000,
            easing: function (t) {
              return t;
            }
          });

        }

        //地铁站弹出视频窗口
        function pop2() {
          document.getElementById("video1-1").style.display = "none";
          //video M1
          var elM1 = document.createElement('div');
          elM1.className = 'test-marker2';
          /**自定义css类*/
          elM1.setAttribute("id", "videoM1");
          var m1video = document.createElement('div');
          m1video.innerHTML = '<video class = "videoTmp" width="350px" height="200px" autoplay="autoplay" loop src="../../../static/video6.mp4" ></video>';
          var m1videoname = document.createElement('div');
          m1videoname.className = 'PVideoName';
          m1videoname.innerHTML = '五四广场地铁站A出口';
          elM1.appendChild(m1videoname);
          elM1.appendChild(m1video);
          var marker1 = new minemap.Marker(elM1, {offset: [100, -300]})
            .setLngLat([120.379550, 36.064095]).addTo(map);

          //video M2
          var elM2 = document.createElement('div');
          elM2.className = 'test-marker1';
          /**自定义css类*/
          elM2.setAttribute("id", "videoM2");
          var m2video = document.createElement('div');
          m2video.innerHTML = '<video class = "videoTmp" width="350px" height="200px" autoplay="autoplay" loop src="../../../static/video4.mp4" ></video>';
          var m2videoname = document.createElement('div');
          m2videoname.className = 'PVideoName';
          m2videoname.innerHTML = '五四广场地铁站B出口';
          elM2.appendChild(m2videoname);
          elM2.appendChild(m2video);
          var marker2 = new minemap.Marker(elM2, {offset: [-500, -240]})
            .setLngLat([120.379550, 36.064095]).addTo(map);

          //video M3
          var elM3 = document.createElement('div');
          elM3.className = 'test-marker3';
          /**自定义css类*/
          elM3.setAttribute("id", "videoM3");
          var m3video = document.createElement('div');
          m3video.innerHTML = '<video class = "videoTmp" width="350px" height="200px" autoplay="autoplay" loop src="../../../static/video5.mp4" ></video>';
          var m3videoname = document.createElement('div');
          m3videoname.className = 'PVideoName';
          m3videoname.innerHTML = '五四广场地铁站C出口';
          elM3.appendChild(m3videoname);
          elM3.appendChild(m3video);
          var marker3 = new minemap.Marker(elM3, {offset: [100, 0]})
            .setLngLat([120.379550, 36.064095]).addTo(map);
        }

        //飞到公交站
        function fly2() {
          // 由地铁站飞到公交站
          map.easeTo({
            center: [120.385390, 36.063002],
            zoom: 16.7,
            pitch: 80,
            curve: 4,
            bearing: 0,
            duration: 10000,
            easing: function (t) {
              return t;
            }
          });
        }

        //公交站弹出窗口
        function pop3() {
          document.getElementById("videoM1").style.display = "none";
          document.getElementById("videoM2").style.display = "none";
          document.getElementById("videoM3").style.display = "none";
          //video B1
          var elB1 = document.createElement('div');
          elB1.className = 'test-marker2';
          /**自定义css类*/
          elB1.setAttribute("id", "videoB1");
          var b1video = document.createElement('div');
          b1video.innerHTML = '<video class = "videoTmp" width="350px" height="200px" autoplay="autoplay" loop src="../../../static/car1.mp4" ></video>';
          var b1videoname = document.createElement('div');
          b1videoname.className = 'PVideoName';
          b1videoname.innerHTML = '五四广场公交站视频';
          elB1.appendChild(b1videoname);
          elB1.appendChild(b1video);
          var marker1 = new minemap.Marker(elB1, {offset: [50, -125]})
            .setLngLat([120.386390, 36.063002]).addTo(map);

          var elB2 = document.createElement('div');
          elB2.className = 'test-marker1';
          /**自定义css类*/
          elB2.setAttribute("id", "videoB2");
          var b2video = document.createElement('div');
          b2video.innerHTML = '<video class = "videoTmp" width="350px" height="200px" autoplay="autoplay" loop src="../../../static/car2.mp4" ></video>';
          var b2videoname = document.createElement('div');
          b2videoname.className = 'PVideoName';
          b2videoname.innerHTML = '五四广场公交站视频';
          elB2.appendChild(b2videoname);
          elB2.appendChild(b2video);
          var marker2 = new minemap.Marker(elB2, {offset: [100, -425]})
            .setLngLat([120.386390, 36.063002]).addTo(map);

        }

        //飞回五四广场
        function fly3() {
          document.getElementById("videoB1").style.display = "none";
          document.getElementById("videoB2").style.display = "none";
          map.easeTo({
            center: [120.382866, 36.064929],
            zoom: 16,
            pitch: 80,
            curve: 4,
            bearing: 0,
            duration: 10000,
            easing: function (t) {
              return t;
            }
          });
        }

        setTimeout(pop1, 11000);
        setTimeout(fly1, 18000);
        setTimeout(pop2, 25000);
        setTimeout(fly2, 37000);
        setTimeout(pop3, 48000);
        setTimeout(fly3, 60000);

        function drawLine(startX, startY, endX, endY) {
          var intervalId = null;
          var xLen = 0;
          var yLen = endY - startY;
          var xStep = 0;
          var yStep = 0;

          function rowLine() {
            xLen = endX - startX;
            if (xLen < 0) {
              xStep = startX--;
            } else if (xLen > 0) {
              xStep = startX++;
            } else {
              xStep = startX;
            }
            yLen = endY - startY;
            if (yLen < 0) {
              yStep = startY--;
            } else if (yLen > 0) {
              yStep = startY++;
            } else {
              yStep = startY;
            }
            if (xStep == startX && yStep == startY) {
              if (intervalId != null) {
                clearInterval(intervalId);
                console.log("interval done");
              }
            } else {
              ctx.moveTo(startX, startY);
              ctx.lineTo(xStep, yStep);
              ctx.strokeStyle = '#f00';
              ctx.lineCap = "round";
              ctx.lineWidth = 3;
              ctx.stroke();
            }
          }

          intervalId = setInterval(rowLine, 5);
        }

        function clearLine(startX, startY, width, height) {
          var intervalId = null;
          var endX = startX + width;
          var endY = startY++;

          function delLine() {
            if (endY - startY >= height) {
              if (intervalId != null) {
                clearInterval(intervalId);
                console.log("interval done");
              }
            } else {
              endY = startY++;
              ctx.clearRect(startX, startY, endX, endY);
            }
          }

          intervalId = setInterval(delLine, 5);
        }


      }


    }

  }
</script>

<style scoped>
  .chart-container {
    width: 100%;
    height: 100%;
    /*   font-family: "Microsoft YaHei";*/
    font-family: "SimHei";
  }

</style>
<style>
  @keyframes ring_bound4 {
    from {
      left: 18px;
      top: 18px;
      width: 20px;
      height: 20px;
    }
    to {
      left: -18px;
      top: -18px;
      width: 100px;
      height: 100px;
    }
  }

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

  @keyframes ring_bound4_alarm {
    from {
      left: 80px;
      top: 80px;
      width: 40px;
      height: 40px;
    }
    to {
      left: 0;
      top: 0;
      width: 200px;
      height: 200px;
    }
  }

  @keyframes ring_bound3_alarm {
    from {
      left: 80px;
      top: 80px;
      width: 40px;
      height: 40px;
    }
    to {
      left: 5px;
      top: 5px;
      width: 190px;
      height: 190px;
    }
  }

  @keyframes ring_bound2_alarm {
    from {
      left: 85px;
      top: 85px;
      width: 30px;
      height: 30px;
    }
    to {
      left: 20px;
      top: 20px;
      width: 160px;
      height: 160px;
    }
  }

  @keyframes ring_bound1_alarm {
    from {
      left: 85px;
      top: 85px;
      width: 30px;
      height: 30px;
    }
    to {
      left: 25px;
      top: 25px;
      width: 150px;
      height: 150px;
    }
  }

  .ring-point-marker {
    width: 60px;
    height: 60px;
    cursor: pointer;
    background-color: transparent;
  }

  .ring-point-inner3-bus {
    position: absolute;
    left: 20px;
    top: 20px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    box-shadow: 0 0 10px #17AEBF;
    background-color: transparent;
    background-image: radial-gradient(circle at center, transparent, rgba(23, 174, 191, 0.5));
    border: solid 1px rgba(23, 174, 191, 0.6);
    animation: ring_bound3 2s infinite linear;
    z-index: 3;
  }

  .ring-point-inner2-bus {
    position: absolute;
    left: 25px;
    top: 25px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    box-shadow: 0 0 10px #17AEBF;
    background-color: transparent;
    background-image: radial-gradient(circle at center, transparent, rgba(123, 174, 191, 0.5));
    border: solid 1px rgba(23, 174, 191, 0.6);
    animation: ring_bound2 2s infinite linear;
    z-index: 3;
  }

  .ring-point-inner1-bus {
    position: absolute;
    left: 25px;
    top: 25px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    box-shadow: 0 0 10px #17AEBF;
    background-image: radial-gradient(circle at center, rgba(23, 174, 191, 0.8), rgba(23, 174, 191, 0.3));
    z-index: 1;
  }

  .ring-point-marker-metro {
    width: 60px;
    height: 60px;
    cursor: pointer;
    background-color: transparent;
  }

  .ring-point-inner3-metro {
    position: absolute;
    left: 20px;
    top: 20px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    box-shadow: 0 0 10px #26C7A5;
    background-color: transparent;
    background-image: radial-gradient(circle at center, transparent, rgba(38, 199, 165, 0.5));
    border: solid 1px rgba(38, 199, 165, 0.6);
    animation: ring_bound3 2s infinite linear;
    z-index: 3;
  }

  .ring-point-inner2-metro {
    position: absolute;
    left: 25px;
    top: 25px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    box-shadow: 0 0 10px #26C7A5;
    background-color: transparent;
    background-image: radial-gradient(circle at center, transparent, rgba(38, 199, 165, 0.5));
    border: solid 1px rgba(38, 199, 165, 0.6);
    animation: ring_bound2 2s infinite linear;
    z-index: 3;
  }

  .ring-point-inner1-metro {
    position: absolute;
    left: 25px;
    top: 25px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    box-shadow: 0 0 10px #26C7A5;
    background-image: radial-gradient(circle at center, rgba(38, 199, 165, 0.8), rgba(38, 199, 165, 0.3));
    z-index: 1;
  }

  .ring-point-marker-alarm {
    width: 200px;
    height: 200px;
    cursor: pointer;
    background-color: transparent;
  }

  .ring-point-inner4-alarm {
    position: absolute;
    left: 80px;
    top: 80px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    box-shadow: 0 0 10px #ff0000;
    background-color: transparent;
    background-image: radial-gradient(circle at center, transparent, rgba(255, 0, 0, 0.5));
    border: solid 1px rgba(255, 0, 0, 0.2);
    animation: ring_bound4_alarm 2s infinite linear;
    z-index: 4;
  }

  .ring-point-inner3-alarm {
    position: absolute;
    left: 80px;
    top: 80px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    box-shadow: 0 0 10px #ff0000;
    background-color: transparent;
    background-image: radial-gradient(circle at center, transparent, rgba(255, 0, 0, 0.5));
    border: solid 1px rgba(255, 0, 0, 0.2);
    animation: ring_bound3_alarm 2s infinite linear;
    z-index: 4;
  }

  .ring-point-inner2-alarm {
    position: absolute;
    left: 85px;
    top: 85px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    box-shadow: 0 0 10px #ff0000;
    background-color: transparent;
    background-image: radial-gradient(circle at center, transparent, rgba(255, 0, 0, 0.5));
    border: solid 1px rgba(255, 0, 0, 0.6);
    animation: ring_bound2_alarm 2s infinite linear;
    z-index: 3;
  }

  .ring-point-inner1-alarm {
    position: absolute;
    left: 85px;
    top: 85px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    box-shadow: 0 0 10px #ff0000;
    background-image: radial-gradient(circle at center, rgba(255, 0, 0, 0.8), rgba(255, 0, 0, 0.2));
    border: solid 1px rgba(255, 0, 0, 0.6);
    animation: ring_bound1_alarm 2s infinite linear;
    z-index: 1;
  }

  .flyVideo {
    background: url("../../assets/车辆详情拉出.png") no-repeat;
    background-size: 400px 260px;
    /*width: 400px;*/
    height: 260px;
    padding: 20px;
    animation: change 1s ease-in-out 1;
    animation-fill-mode: forwards /*    animation: showLeft 8s linear 1;
    -moz-animation: showLeft 8s linear 1;
    -webkit-animation: showLeft 8s linear 1;
    -o-animation: showLeft 8s linear 1;*/
  }

  @-webkit-keyframes showLeft {
    from {
      width: 0;
    }
    to {
      width: 400px;
    }
  }

  .test-marker1 {
    background: url("../../assets/车辆详情拉出.png") no-repeat center;
    background-size: 400px 260px;
    /*width: 400px;*/
    height: 260px;
    padding: 20px;
    animation: change 1s ease-in-out 1;
    animation-fill-mode: forwards
    /*animation: showLeft 8s linear 1;*/
    /*-moz-animation: showLeft 8s linear 1;*/
    /*-webkit-animation: showLeft 8s linear 1;*/
    /*-o-animation: showLeft 8s linear 1;*/
  }

  @keyframes change {

    from {
      width: 0px;
    }

    to {
      width: 400px;
    }

  }

  .test-marker2 {
    background: url("../../assets/车辆详情拉出.png") no-repeat center;
    background-size: 400px 260px;
    /*width: 400px;*/
    height: 260px;
    padding: 20px;
    animation: change 1s ease-in-out 1;
    animation-fill-mode: forwards
    /*animation: showLeft 8s linear 1;*/
    /*-moz-animation: showLeft 8s linear 1;*/
    /*-webkit-animation: showLeft 8s linear 1;*/
    /*-o-animation: showLeft 8s linear 1;*/
  }

  .test-marker3 {
    background: url("../../assets/车辆详情拉出.png") no-repeat center;
    background-size: 400px 260px;
    /*width: 400px;*/
    height: 260px;
    padding: 20px;
    animation: change 1s ease-in-out 1;
    animation-fill-mode: forwards
    /*animation: showLeft 8s linear 1;*/
    /*-moz-animation: showLeft 8s linear 1;*/
    /*-webkit-animation: showLeft 8s linear 1;*/
    /*-o-animation: showLeft 8s linear 1;*/
  }

  .metroEventPointClass {
    background: url("../../assets/地铁-点.png");
    background-size: 110px 110px;
    width: 110px;
    height: 110px;
    padding: 20px;
  }

  .metroEventLineClass {
    background: url("../../assets/地铁-线.png");
    background-size: 4px 122px;
    width: 4px;
    height: 122px;
    padding: 0px;
  }

  .metroEventClass {
    background: url("../../assets/地铁.png");
    background-size: 59px 59px;
    width: 59px;
    height: 59px;
    padding: 0px;
    /*animation:scaleout 4s infinite ease-in-out;*/
  }

  .metroPassengerClass {
    background: url("../../assets/客流正常.png");
    background-size: 30px 30px;
    width: 30px;
    height: 30px;
    padding: 0px;
  }

  .metroPassengerNumClass {
    height: 30px;
    margin-top: 5px;
    font-size: 25px;
    color: #26C7A5;
    font-family: "SimHei";
    font-weight: bold;
  }

  .metroStationNameClass {
    color: #FFFFFF;
  }

  .busEventPointClass {
    background: url("../../assets/公交-点.png");
    background-size: 110px 110px;
    width: 110px;
    height: 110px;
    padding: 20px;
  }

  .busEventLineClass {
    background: url("../../assets/公交-线.png");
    background-size: 4px 122px;
    width: 4px;
    height: 122px;
    padding: 0px;
  }

  .busEventClass {
    background: url("../../assets/公交.png");
    background-size: 59px 59px;
    width: 59px;
    height: 59px;
    padding: 0px;
    /*animation:scaleout 5s infinite ease-in-out;*/
  }

  .busPassengerClass {
    background: url("../../assets/客流异常.png");
    background-size: 30px 30px;
    width: 30px;
    height: 30px;
    padding: 0px;
  }

  .busPassengerNumClass {
    height: 30px;
    margin-top: 5px;
    font-size: 25px;
    color: #F4435E;
  }

  .busStationNameClass {
    color: #FFFFFF;
  }

  .alarmEventLineClass {
    background: url("../../assets/报警-线.png");
    background-size: 4px 261px;
    width: 4px;
    height: 261px;
    padding: 0px;
  }

  .alarmEventClass {
    background: url("../../assets/报警.png");
    background-size: 63px 64px;
    width: 63px;
    height: 64px;
    padding: 0px;
    z-index: 99999;
  }

  .alarmEventMoveClass {
    background: url("../../assets/报警-转动.png");
    background-size: 77px 77px;
    width: 77px;
    height: 77px;
    padding: 0px;
    -webkit-transform: rotate(360deg);
    animation: rotation 8s linear infinite;
    -moz-animation: rotation 8s linear infinite;
    -webkit-animation: rotation 8s linear infinite;
    -o-animation: rotation 8s linear infinite;
  }

  .alarmNameClass {
    color: #E13F54;
    font-size: 20px;
    font-weight: bold;
  }

  @-webkit-keyframes rotation {
    from {
      -webkit-transform: rotate(360deg);
    }
    to {
      -webkit-transform: rotate(0deg);
    }
  }

  .videoTmp {

    animation: videochange 1s ease-in-out 1;
    animation-fill-mode: forwards
  }

  @keyframes videochange {
    from {
      width: 0px;
      height: 200px
    }
    to {
      width: 350px;
      height: 200px
    }
  }

  @keyframes scaleout {
    0% {
      transform: scale(1.2);
      opacity: 0.3;
    }
    50% {
      transform: scale(1.0);
      opacity: 1;
    }
    100% {
      transform: scale(1.2);
      opacity: 0.3;
    }
  }

  .PVideoName {
    color: #ffffff;
    font-size: 15px;
    padding-left: 10px;
    width: 0px;
    overflow: hidden;
    animation: videochangename 1s ease-in-out 1;
    animation-fill-mode: forwards
  }

  @keyframes videochangename {
    from {
      width: 0px;
      height: 20px
    }
    to {
      width: 350px;
      height: 20px
    }
  }

  .metroPassengerNumUnit {
    font-size: 15px;
  }
</style>
