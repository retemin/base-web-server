$(function (e) {

  window.map = new BMap.Map("shanxiMap", {
    minZoom: 7
  });
  map.centerAndZoom(new BMap.Point(116.403765, 39.914850), 7);
  map.enableScrollWheelZoom();

  var townsArr = [];
  var treeData = {};
  townsArr = shanxiTown;
  var townsName = ['大同市', '朔州市', '忻州市', '太原市', '阳泉市', '晋中市', '临汾市', '长治市', '晋城市', '运城市', '吕梁市'];

  var bdary = new BMap.Boundary();
  var jingzhongDC = null;
  getBoundary();

  function getBoundary() {
    bdary.get('山西省', function (rs) { //获取行政区域
      map.clearOverlays(); //清除地图覆盖物

      //++++++++++++++++++色块
      var color = ['#8cc152', '#ffce54', '#4fc1e9', '#ac92ec', '#fc6e51', '#e4ff79', '#37bc9b',
        '#3d5980', '#85a3ca',
        '#ed5565', '#5d9cec'
      ];
      for (var i = 0; i < townsArr.length; i++) {
        (function (i) {
          var ply1 = new BMap.Polygon(townsArr[i].coors, {
            strokeWeight: 2,
            strokeColor: "#3385ff",
            // fillColor: color[i],
            fillColor: 'transparent',
            fillOpacity: 0
          }); //建立多边形覆盖物
          map.addOverlay(ply1); //添加覆盖物
          if (i == 5) {
            jingzhongDC = ply1
          }
        })(i);

      }

      var styleJson = [
        {
          "featureType": "land",
          "elementType": "all",
          "stylers": {
            "color": "#e6eef6ff"
          }
        },
        {
          "featureType": "local",
          "elementType": "all",
          "stylers": {
            "color": "#d6d8f4ff"
          }
        },
        {
          "featureType": "water",
          "elementType": "all",
          "stylers": {
            "color": "#d9fbc9ff"
          }
        },
        {
          "featureType": "highway",
          "elementType": "all",
          "stylers": {
            "color": "#c8cdf8ff"
          }
        }
      ]
      map.setMapStyle({ styleJson: styleJson });


      var count = rs.boundaries.length; //行政区域的点有多少个

      var strs = new Array();
      strs = rs.boundaries[0].split(";");
      var max_lng = strs[0].split(',')[0];
      var min_lng = strs[0].split(',')[0];
      var max_lat = strs[0].split(',')[1];
      var min_lat = strs[0].split(',')[1];
      strs.forEach(function (val, idx) {
        var lng = val.split(',')[0];
        if (lng >= max_lng) {
          max_lng = lng;
        } else {
          min_lng = lng;
        }
        var lat = val.split(',')[1];
        if (lat >= max_lat) {
          max_lat = lat;
        } else {
          min_lat = lat;
        }
      })
      var EN = ""; //行政区划东北段点的集合
      var NW = ""; //行政区划西北段点的集合
      var WS = ""; //行政区划西南段点的集合
      var SE = ""; //行政区划东南段点的集合
      var pt_e = strs[0]; //行政区划最东边点的经纬度
      var pt_n = strs[0]; //行政区划最北边点的经纬度
      var pt_w = strs[0]; //行政区划最西边点的经纬度
      var pt_s = strs[0]; //行政区划最南边点的经纬度
      var n1 = ""; //行政区划最东边点在点集合中的索引位置
      var n2 = ""; //行政区划最北边点在点集合中的索引位置
      var n3 = ""; //行政区划最西边点在点集合中的索引位置
      var n4 = ""; //行政区划最南边点在点集合中的索引位置


      //2.循环行政区划边框点集合找出最东南西北四个点的经纬度以及索引位置
      for (var n = 0; n < strs.length; n++) {
        var pt_e_f = parseFloat(pt_e.split(",")[0]);
        var pt_n_f = parseFloat(pt_n.split(",")[1]);
        var pt_w_f = parseFloat(pt_w.split(",")[0]);
        var pt_s_f = parseFloat(pt_s.split(",")[1]);

        var sPt = new Array();
        try {
          sPt = strs[n].split(",");
          var spt_j = parseFloat(sPt[0]);
          var spt_w = parseFloat(sPt[1]);
          if (pt_e_f < spt_j) { //东
            pt_e = strs[n];
            pt_e_f = spt_j; //经度最大
            n1 = n;
          }
          if (pt_n_f < spt_w) { //北
            pt_n_f = spt_w;
            pt_n = strs[n];
            n2 = n;
          }

          if (pt_w_f > spt_j) { //西
            pt_w_f = spt_j; //经度最小
            pt_w = strs[n];
            n3 = n;
          }
          if (pt_s_f > spt_w) { //南
            pt_s_f = spt_w;
            pt_s = strs[n];
            n4 = n;
          }
        } catch (err) {
          alert(err);
        }
      }

      //3.得出东北、西北、西南、东南四段行政区划的边框点的集合
      if (n1 < n2) { //第一种情况 最东边点在索引前面
        for (var o = n1; o <= n2; o++) {
          EN += strs[o] + ";"
        }
        for (var o = n2; o <= n3; o++) {
          NW += strs[o] + ";"
        }
        for (var o = n3; o <= n4; o++) {
          WS += strs[o] + ";"
        }
        for (var o = n4; o < strs.length; o++) {
          SE += strs[o] + ";"
        }
        for (var o = 0; o <= n1; o++) {
          SE += strs[o] + ";"
        }
      } else { //第二种情况 最东边点在索引后面
        /* 山西 */
        for (var o = n2; o <= n1; o++) {
          EN += strs[o] + ";"
        }
        for (var o = n1; o < strs.length; o++) {
          SE += strs[o] + ";"
        }
        for (var o = 0; o <= n4; o++) {
          SE += strs[o] + ";"
        }
        for (var o = n4; o <= n3; o++) {
          WS += strs[o] + ";"
        }
        for (var o = n3; o <= n2; o++) {
          NW += strs[o] + ";"
        }
      }

      //4.自定义外围边框点的集合
      var E_JW = "170.672126, 39.623555;"; //东
      var S_JW = "114.15563, -68.045308;"; //南
      var W_JW = "-169.604276, 38.244136;"; //西
      var N_JW = "105.913641, 81.291804;"; //北
      var EN_JW = "170.672126, 81.291804;"; //东北角
      var NW_JW = "-169.604276,  81.291804;"; //西北角
      var WS_JW = "-169.604276, -68.045308;"; //西南角
      var SE_JW = "170.672126, -68.045308;"; //东南角
      //4.添加环形遮罩层
      for (var i = 0; i < 1; i++) {
        var ply3 = new BMap.Polygon(E_JW + EN_JW + N_JW + EN, {
          strokeColor: "none",
          strokeWeight: 2,
          fillColor: "rgba(255,255,255,1)"
        }); //建立多边形覆盖物
        map.addOverlay(ply3); //遮罩物是半透明的，如果需要纯色可以多添加几层
        var ply4 = new BMap.Polygon(S_JW + SE_JW + E_JW + SE, {
          strokeColor: "none",
          strokeWeight: 2,
          fillColor: "rgba(255,255,255,1)"
        }); //建立多边形覆盖物
        map.addOverlay(ply4); //遮罩物是半透明的，如果需要纯色可以多添加几层
        var ply5 = new BMap.Polygon(W_JW + WS_JW + S_JW + WS, {
          strokeColor: "none",
          strokeWeight: 2,
          fillColor: "rgba(255,255,255,1)"
        }); //建立多边形覆盖物
        map.addOverlay(ply5); //遮罩物是半透明的，如果需要纯色可以多添加几层
        var ply6 = new BMap.Polygon(NW + N_JW + NW_JW + W_JW, {
          strokeColor: "none",
          strokeWeight: 2,
          fillColor: "rgba(255,255,255,1)"
        }); //建立多边形覆盖物
        map.addOverlay(ply6); //遮罩物是半透明的，如果需要纯色可以多添加几层
      }

      for (var i = 0; i < count; i++) { //边界线
        var ply = new BMap.Polygon(rs.boundaries[i], {
          strokeWeight: 2,
          strokeColor: "#3385ff",
          fillColor: "rgba(255,255,255,0)",
          fillColorOpacity: "1"
        }); //建立多边形覆盖物
        map.addOverlay(ply); //添加覆盖物
        map.setViewport(ply.getPath()); //调整视野              
      }

      // 城市名字
      // addlabel();
      //添加点
      addPoint(point_in_road);
      var SValue = JSON.parse(sessionStorage.getItem('name'));
      if (SValue == '市级') {
        map.setViewport(jingzhongDC.getPath());    //调整视野 
        map.setZoom(10);
      }


    });

  }


  var point_in_road = [
    '112.618828,37.748029',//太原
    '112.564463,37.730764',
    '112.590756,37.813656',
    '112.578046,37.859755',
    '112.609863,37.888126',

    '112.711588,37.720248',//晋中
    '112.718774,37.611902',
    '112.753601,37.704265',

    '113.161728,36.228173',//长治

    '113.322067,40.082015',//大同

    '111.139526,37.545789',//吕梁

    '112.705371,38.43383',//忻州

    '112.876399,35.508948',//晋城

    '113.585998,37.874754',//阳泉

    '111.517406,36.109665',//临汾

    '112.442033,39.348159',//朔州

    '110.996353,35.041691',//运城
  ];
  var marker0 = null;

  // -------------------------------窗口信息
  function info(info) {
    var str = '';
    str += '<div id="pointTabs" class="tabs">'
    str += '  <ul>'
    str += '    <li class="liColor">点位信息</li>'
    str += '    <li>实时数据</li>'
    str += '    <li>视频监控</li>'
    str += '    <li id="alert_li" class="alert_li">报警信息</li>'
    str += '  </ul>'
    str += '  <div id="pointTabsContent" class="tab-content">'
    str += '    <div class="active">'
    str += '      <table class="table_place">'
    str += '        <tbody>'
    str += '          <tr>'
    str += '            <td>点位编码:</td>'
    str += '            <td>A21245834</td>'
    str += '            <td>点位类型:</td>'
    str += '            <td>垂直固定式</td>'
    str += '          </tr>'
    str += '          <tr>'
    str += '            <td>点位名称:</td>'
    str += '            <td id="alert_name">开发区108国道A点</td>'
    str += '            <td>运行日期:</td>'
    str += '            <td>2018-11-27</td>'
    str += '          </tr>'
    str += '          <tr>'
    str += '            <td>点位运行状态:</td>'
    str += '            <td>良好</td>'
    str += '            <td>车流方向:</td>'
    str += '            <td>上行</td>'
    str += '          </tr>'
    str += '          <tr>'
    str += '            <td>车道数:</td>'
    str += '            <td>两车道</td>'
    str += '            <td>交通流量:</td>'
    str += '            <td>20辆/秒</td>'
    str += '          </tr>'
    str += '          <tr>'
    str += '            <td>坡度:</td>'
    str += '            <td>12度</td>'
    str += '            <td>超标数量:</td>'
    str += '            <td id="alert_num">0辆</td>'
    str += '          </tr>'
    str += '          <tr>'
    str += '            <td>经度:</td>'
    str += '            <td>112.618828</td>'
    str += '            <td>纬度:</td>'
    str += '            <td>37.748029</td>'
    str += '          </tr>'
    str += '          <tr>'
    str += '            <td>平均通行速度:</td>'
    str += '            <td>50m/S</td>'
    str += '            <td></td>'
    str += '            <td></td>'
    str += '          </tr>'
    str += '        </tbody>'
    str += '      </table>'
    str += '    </div>'


    str += '  <div class="datanow">'
    str += '    <table>'
    str += '      <thead>'
    str += '        <tr>'
    str += '          <td>检测时间:</td>'
    str += '          <td colspan="4">'
    str += '            <span class="detailtime"></span>'
    str += '          </td>'
    str += '        </tr>'
    str += '        <tr>'
    str += '          <td>车牌号码</td>'
    str += '          <td>车牌颜色</td>'
    str += '          <td>号牌种类</td>'
    str += '          <td>燃料种类</td>'
    str += '          <td>判定结果</td>'
    str += '        </tr>'
    str += '      </thead>'
    str += '      <tbody>'
    str += '        <tr>'
    str += '          <td>晋KCS209</td>'
    str += '          <td>蓝色</td>'
    str += '          <td>小型汽车</td>'
    str += '          <td>汽油</td>'
    str += '          <td>正常</td>'
    str += '        </tr>'
    str += '        <tr>'
    str += '          <td>晋KCS389</td>'
    str += '          <td>红色</td>'
    str += '          <td>警用汽车</td>'
    str += '          <td>汽油</td>'
    str += '          <td>正常</td>'
    str += '        </tr>'
    str += '        <tr>'
    str += '          <td>晋JS2084</td>'
    str += '          <td>绿色</td>'
    str += '          <td>新型能源汽车</td>'
    str += '          <td>电</td>'
    str += '          <td>正常</td>'
    str += '        </tr>'
    str += '        <tr>'
    str += '          <td>晋A363T8</td>'
    str += '          <td>紫色</td>'
    str += '          <td>小型汽车</td>'
    str += '          <td>汽油</td>'
    str += '          <td>正常</td>'
    str += '        </tr>'
    str += '        <tr>'
    str += '          <td>晋B34S23</td>'
    str += '          <td>蓝色</td>'
    str += '          <td>小型汽车</td>'
    str += '          <td>汽油</td>'
    str += '          <td>正常</td>'
    str += '        </tr>'
    str += '        <tr>'
    str += '          <td>晋K262D1</td>'
    str += '          <td>黄色</td>'
    str += '          <td>小型汽车</td>'
    str += '          <td>汽油</td>'
    str += '          <td>正常</td>'
    str += '        </tr>'
    str += '        <tr>'
    str += '          <td>晋K22L43</td>'
    str += '          <td>蓝色</td>'
    str += '          <td>小型汽车</td>'
    str += '          <td>汽油</td>'
    str += '          <td>正常</td>'
    str += '        </tr>'
    str += '        <tr>'
    str += '          <td>晋K22L43</td>'
    str += '          <td>蓝色</td>'
    str += '          <td>小型汽车</td>'
    str += '          <td>汽油</td>'
    str += '          <td>正常</td>'
    str += '        </tr>'
    str += '        <tr>'
    str += '          <td>晋K42E32</td>'
    str += '          <td>蓝色</td>'
    str += '          <td>小型汽车</td>'
    str += '          <td>汽油</td>'
    str += '          <td>正常</td>'
    str += '        </tr>'
    str += '        <tr class="overSTD">'
    str += '          <td>晋K162G6</td>'
    str += '          <td>蓝色</td>'
    str += '          <td>小型汽车</td>'
    str += '          <td>汽油</td>'
    str += '          <td class="over">超标</td>'
    str += '        </tr>'
  
    str += '      </tbody>'
    str += '    </table>'
    str += '  </div>'


    
    str += '    <div>'
    str += '      <div id="title_video" class="title_video">开发区108国道A点</div>'
    str += '      <ul class="video">'
    str += '        <li><video  muted  src="video/car2.mp4" controls="controls" autoplay="true"  loop="loop"></video></li>'
    str += '        <li><video  muted src="./video/car3.mp4" controls="controls" autoplay="true"  loop="loop"></video></li>'
    str += '        <li><video  muted src="./video/car4.mp4" controls="controls" autoplay="true"  loop="loop"></video></li>'
    str += '        <li><video  muted src="./video/car5.mp4" controls="controls" autoplay="true"  loop="loop"></video></li>'
    str += '      </ul>'
    str += '      <div id="broken_line"></div>'
    str += '    </div>'
    str += '    <div id="alert_info" class="alert_info">'
    str += '    </div>'

    str += '    <div class="table_datas">'
    str += '      <table class="table_data">'
    str += '        <tbody>'
    str += '          <tr>'
    str += '            <td colspan="3"><span class="linkto"><<</span>数据时间:</td>'
    str += '            <td colspan="2">2018-11-27 11:29:00</td>'
    str += '          </tr>'
    str += '          <tr>'
    str += '            <td>车牌</td>'
    str += '            <td>车型</td>'
    str += '            <td>车速</td>'
    str += '            <td>加速度</td>'
    str += '            <td>是否合格</td>'
    str += '          </tr>'
    str += '          <tr>'
    str += '            <td>晋KCS209</td>'
    str += '            <td>小轿车</td>'
    str += '            <td>50m/S</td>'
    str += '            <td>50m/S²</td>'
    str += '            <td>是</td>'
    str += '          </tr>'
    str += '          <tr>'
    str += '            <td>CO%</td>'
    str += '            <td>CO2%</td>'
    str += '            <td>HC</td>'
    str += '            <td>NOx</td>'
    str += '            <td>不透光度%</td>'
    str += '          </tr>'
    str += '          <tr>'
    str += '            <td id="coOver">10.5</td>'
    str += '            <td>458.6</td>'
    str += '            <td>456.2</td>'
    str += '            <td>482</td>'
    str += '            <td>52</td>'
    str += '          </tr>'
    str += '        </tbody>'
    str += '      </table>'
    str += '      <div id="datacharts"></div>'
    str += '    </div>'


    str += '  </div>'
    str += '</div> '
    return str;
  }

  // --------------------------------初始化echarts
  function initCharts(type) {
    var dataCharts = echarts.init(document.getElementById("datacharts"));
    var option = {
      // color:['#db2927', '#db2927', '#db2927', '#db2927','#db2927'],
      legend: {
        show: true,
        bottom: 20,
        itemWidth: 10,
        itemHeight: 10,
        borderRadius: 20,
        data: [{
          name: 'CO\n(%)',
          icon: 'circle',
        },
        {
          name: 'CO2\n(%)',
          icon: 'circle'
        },
        {
          name: '不透光\n度(%)',
          icon: 'circle'
        },
        {
          name: 'NO\n(PPM)',
          icon: 'circle'
        },
        {
          name: 'HC\n(ppm)',
          icon: 'circle'
        }
        ],
        // data: ['ss']
      },
      grid: [{
        left: "0%",
        right: "8%",
        bottom: "25%",
        top: "20%",
        containLabel: true
      }],
      xAxis: {
        type: 'category',
        data: [],
        axisLine: {
          lineStyle: {
            color: ['#ccc'],
          }
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          show: true,
          textStyle: {
            color: '#333'
          },
        },
      },
      yAxis: {
        name: '单位 %',
        nameTextStyle: {
          color: '#333'
        },
        type: 'value',
        axisLine: {
          lineStyle: {
            color: ['#ccc'],
          }
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          show: true,
          textStyle: {
            color: '#333'
          },
        },
      },
      series: [{
        name: 'CO\n(%)',
        data: [50],
        type: 'bar',
        barWidth: 20,
        barGap: 1.5,


      },
      {
        name: 'CO2\n(%)',
        data: [450],
        type: 'bar',
        barWidth: 20,
      },
      {
        name: '不透光\n度(%)',
        data: [80],
        type: 'bar',
        barWidth: 20,
      },
      {
        name: 'NO\n(PPM)',
        data: [470],
        type: 'bar',
        barWidth: 20,
      },
      {
        name: 'HC\n(ppm)',
        data: [480],
        type: 'bar',
        barWidth: 20,
      },

      ]
    };

    var lineCharts = echarts.init(document.getElementById("broken_line"));
    var lineOption = {
      color: ['#6cbf89', '#c3d37b', '#86a0ff', '#da9554', '#ea6f4d'],
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        itemWidth: 8,
        top: 10,
        data: [{
          name: '1车道',
          icon: 'circle',
        },
        {
          name: '2车道',
          icon: 'circle'
        },
        {
          name: '3车道',
          icon: 'circle'
        },
        {
          name: '4车道',
          icon: 'circle'
        },
        ],
      },
      grid: {
        left: '0%',
        right: '8%',
        bottom: '10%',
        containLabel: true
      },
      toolbox: {
        show: false,
      },
      xAxis: {
        name: 'h',
        nameTextStyle: {
          color: '#333'
        },
        type: 'category',
        boundaryGap: false,
        axisLine: {
          lineStyle: {
            color: ['#ccc'],
          }
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          show: true,
          textStyle: {
            color: '#333'
          },
        },
        data: ['7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20']
      },
      yAxis: {
        name: '单位:辆',
        nameTextStyle: {
          color: '#333'
        },
        type: 'value',
        axisLine: {
          lineStyle: {
            color: ['#ccc'],
          }
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          show: true,
          textStyle: {
            color: '#333'
          },
        },
      },
      series: [{
        name: '1车道',
        type: 'line',
        data: [20, 22, 21, 20, 20, 20, 20, 20, 22, 21, 20, 20, 20, 20],
      },
      {
        name: '2车道',
        type: 'line',
        data: [33, 33, 35, 36, 30, 30, 30, 35, 32, 35, 30, 32, 33, 30],
      },
      {
        name: '3车道',
        type: 'line',
        data: [40, 45, 45, 45, 43, 46, 45, 40, 40, 41, 40, 40, 40, 40],
      },
      {
        name: '4车道',
        type: 'line',
        data: [22, 23, 24, 20, 18, 19, 15, 18, 15, 20, 22, 15, 19, 18],
      },
      ]
    };
    dataCharts.setOption(option);
    lineCharts.setOption(lineOption);
    $('#pointTabs > ul li').click(function (e) {
      $(this).addClass('liColor').siblings().removeClass('liColor');
      $('#pointTabsContent>div').eq($(this).index()).addClass('active').siblings().removeClass('active');
    })

    $('.datanow>table tbody td').click(function(){
      if($(this).parent('tr').hasClass('overSTD')){
        $("#coOver").addClass('over').text('53.5')
      }else{
        $("#coOver").removeClass('over').text('10')
      }
      $('.table_datas').addClass('active')
      $('.table_datas').siblings().removeClass('active');
      
    })
    $('.linkto').click(function () {
      $('.table_datas').removeClass('active');
      $('.datanow').addClass('active');
    })

		gettime();

    treeData = JSON.parse(sessionStorage.getItem('treeData')) || { label: '马练营路监测点A' };
    $("#alert_name").html(treeData.label);
    $("#title_video").html(treeData.label);

    if (type == 'alert') {
      $("#alert_info").html(getAlertTable());
      $("#alert_num").text('11辆').css("color","red");
      $("#alert_li").show();

      
      $('#alert_info tr td:nth-child(1)').click(function(){
        var over = 1;
        sessionStorage.setItem("Ovalue", JSON.stringify(over));
        window.open('./information.html');
      })
      $('#alert_info tr td:nth-child(2)').click(function(){
        var over = 2;
        sessionStorage.setItem("Ovalue", JSON.stringify(over));
        window.open('./information.html');
      })
    } else {
      $("#alert_info").empty();
      $('#pointTabs ul li').eq(0).addClass('liColor').siblings().removeClass('liColor');
      $('#pointTabsContent>div').eq(0).addClass('active').siblings().removeClass('active');
      $("#alert_num").text('0辆');
      $("#alert_li").hide();
    }

  }

  function gettime() {
    //获取当前时间
    var date = new Date();
    date1 = new Date(date.getTime() - 300*1000);

    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    
    var year2 = date1.getFullYear();
    var month2 = date1.getMonth() + 1;
    var day2 = date1.getDate();
    var hour2 = date1.getHours();
    var minute2 = date1.getMinutes();
    var second2 = date1.getSeconds();
    if (month < 10) {
      month = "0" + month;
    }
    if (day < 10) {
      day = "0" + day;
    }
    if (minute < 10) {
      minute = "0" + minute;
    }
    if (second < 10) {
      second = "0" + second;
    }
    var nowday = date.getDay();
    switch (nowday) {
      case 0:
        {
          strDate = "星期日"
        }
        break;
      case 1:
        {
          strDate = "星期一"
        }
        break;
      case 2:
        {
          strDate = "星期二"
        }
        break;
      case 3:
        {
          strDate = "星期三"
        }
        break;
      case 4:
        {
          strDate = "星期四"
        }
        break;
      case 5:
        {
          strDate = "星期五"
        }
        break;
      case 6:
        {
          strDate = "星期六"
        }
        break;
      case 7:
        {
          strDate = "星期日"
        }
        break;
    }
    var detailtime = year2 + "/" + month2 + "/" + day2 + "/" +    hour2 + ':' + minute2;
    var detailtime2 = year + "/" + month + "/" + day + "/"+    hour + ':' + minute;
    var detailtime3 =  detailtime+'-'+detailtime2
    $('.detailtime').html(detailtime3);
  }
			

  // -----------------------------------添加点
  function addPoint(array) {
    var myIcon = null;
    for (var index = 0; index < array.length; index++) {
      var point_lng = array[index].split(',')[0];
      var point_lat = array[index].split(',')[1];
      myIcon = new BMap.Icon(
        "./images/you.png",
        new BMap.Size(25, 35)   
      );
      if (index == 4 || index == 5) {
        myIcon = new BMap.Icon(
          "./images/liang.png",
          new BMap.Size(25, 35) 
        );
      } else if (index == 3) {
        myIcon = new BMap.Icon(
          "./images/qingdu.png",
          new BMap.Size(25, 35) 
        );
      }
      myIcon.setImageSize(new BMap.Size(25, 35));
      // myIcon.setAnchor(new BMap.Size(30, 43));
      var marker = new BMap.Marker(new BMap.Point(parseFloat(point_lng), parseFloat(point_lat)), {
        icon: myIcon
      });
      map.addOverlay(marker);

      if(index == 0){
        marker0 = marker;
      }

      //添加点击事件
      markerClickEvt(marker);

    }

    // 首页点击进来
    var indexPoint = JSON.parse(sessionStorage.getItem('indexPoint'));
    if(indexPoint&&indexPoint.trueFlag){
      attribute(marker0, marker0)
      sessionStorage.removeItem('indexPoint');
    }

    // 报警信息点
    var alertIcon = new BMap.Icon(
      "./images/alert.gif",
      new BMap.Size(44, 44)
    );
    alertIcon.setImageSize(new BMap.Size(44, 44));
    var alertMarker = new BMap.Marker(new BMap.Point(112.564463, 37.730764), { icon: alertIcon });
    map.addOverlay(alertMarker);
    alertMarker.addEventListener("click", function (e) {
      attribute(e, alertMarker, 'alert');
      e.domEvent.stopPropagation();
    });
    alertMarker.addEventListener('infowindowopen', function (e) {
      initCharts('alert');
    })
    alertMarker.addEventListener('infowindowclose', function (e) {
      $("#AQI").slideUp();
    })

    var alertMarker1 = new BMap.Marker(new BMap.Point(112.718774, 37.611902), { icon: alertIcon });
    map.addOverlay(alertMarker1);
    alertMarker1.addEventListener("click", function (e) {
      attribute(e, alertMarker1, 'alert');
      e.domEvent.stopPropagation();
    });
    alertMarker1.addEventListener('infowindowopen', function (e) {
      initCharts('alert');
    })
    alertMarker1.addEventListener('infowindowclose', function (e) {
      $("#AQI").slideUp();
    })

  }

  // --------------------------------点击marker
  function markerClickEvt(marker) {
    marker.addEventListener("click", function (e) {
      attribute(e, marker);
      e.domEvent.stopPropagation();
    });

    marker.addEventListener('infowindowopen', function (e) {
      initCharts();
    })
    marker.addEventListener('infowindowclose', function (e) {
      $("#AQI").slideUp();
    })
  }

  function getAlertTable() {

    var alertTable = '<table>' +
      '  <tr>' +
      "   <th>超标车<span id='colorred'>(6)</span></th>"+
      "   <th>黑名单<span id='colorred'>(5)</span></th>" +
      '        </tr>'+
      '        <tr>'+
      '          <td>粤KGR969</td>'+
      '          <td>京KCS209</td>'+
      '        </tr>'+
      '        <tr>'+
      '          <td>湘KL5301</td>'+
      '          <td>云KZJ420</td>'+
      '        </tr>'+
      '        <tr>'+
      '          <td>赣K0N9HL</td>'+
      '          <td>鲁KEA642</td>'+
      '        </tr>'+
      '        <tr>'+
      '          <td>京KCS209</td>'+
      '          <td>浙KZL866</td>'+
      '        </tr>'+
      '        <tr>'+
      '          <td>赣KEA487</td>'+
      '          <td>粤K44944</td>'+
      '        </tr>'+
      '        <tr>'+
      '          <td>浙KZL866</td>'+
      '          <td></td>'+
      '        </tr>'+
      '        <tr>'+
      '    <td colspan="2">' +
      '      监测超标数据为当日数据，第二天会更新，以当日为准！' +
      '    </td>' +
      '  </tr>' +
      '</table>'

    return alertTable;
  }

  // 点击事件
  function attribute(e, marker, type) {

    // 信息窗口
    var opts = {
      width: 300,     // 信息窗口宽度
      height: 400,     // 信息窗口高度
      // title : "点位信息" , // 信息窗口标题
      enableMessage: true,//设置允许信息窗发送短息
      message: "备注"
    }
    var infoWindow = new BMap.InfoWindow(info(), opts);  // 创建信息窗口对象 
    marker.openInfoWindow(infoWindow, new BMap.Point(e.point.lng, e.point.lat)); //开启信息窗口  


    // alert("marker的位置是" + e.point.lng + "," + e.point.lat);    
    treeData = JSON.parse(sessionStorage.getItem('treeData')) || { label: '马练营路监测点A' };
    $("#AQI .title_aqi .name").html(treeData.label);
    $("#alert_name").text(treeData.label);
    $("#AQI .title_aqi .name").text(treeData.label);
    $('#pointTabs > ul li').eq(0).addClass('liColor').siblings().removeClass('liColor');
    $('#pointTabsContent>div').eq(0).addClass('active').siblings().removeClass('active');

    $("#AQI").slideDown();

  }


  function addlabel(name) {
    var pointArray = [
      new BMap.Point(113.320809, 40.084237),
      new BMap.Point(112.569295, 39.55131),
      new BMap.Point(112.684278, 38.743697),
      new BMap.Point(112.185001, 37.914805),
      new BMap.Point(113.58704, 37.865097),
      new BMap.Point(113.254595, 37.343881),
      new BMap.Point(111.525527, 36.094676),
      new BMap.Point(113.124862, 36.202665),
      new BMap.Point(112.858577, 35.496284),
      new BMap.Point(111.01281, 35.033179),
      new BMap.Point(111.149874, 37.526331),
    ];
    var optsArray = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
    var labelArray = [];
    for (var i = 0; i < townsName.length; i++) {
      optsArray[i].position = pointArray[i];
      optsArray[i].offset = new BMap.Size(-10, -10);
      labelArray[i] = new BMap.Label(townsName[i], optsArray[i]);
      labelArray[i].setStyle({
        color: "#333",
        borderColor: "rgb(170, 220, 188)",
        borderRadius: "3px",
        fontSize: "12px",
        height: "20px",
        lineHeight: "18px",
        fontFamily: "微软雅黑"
      });
      map.addOverlay(labelArray[i]);
    }
  }
})