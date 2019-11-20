$(function (e){
  
  var map = new BMap.Map("shanxiMap", {
    minZoom: 7
  });
  map.centerAndZoom(new BMap.Point(116.403765, 39.914850), 7);
  // map.addControl(new BMap.NavigationControl({
  //   type: BMAP_NAVIGATION_CONTROL_SMALL
  // }));
  map.enableScrollWheelZoom();
  
  var townsArr = [];
  townsArr = shanxiTown;
  var townsName = ['大同市','朔州市','忻州市','太原市','阳泉市','晋中市','临汾市','长治市','晋城市','运城市','吕梁市'];
  
  getBoundary();
  
  function getBoundary() {
    var bdary = new BMap.Boundary();
    bdary.get('山西省', function (rs) { //获取行政区域
      map.clearOverlays(); //清除地图覆盖物
  
  
      var color = ['#8cc152', '#ffce54', '#4fc1e9', '#ac92ec', '#fc6e51', '#e4ff79', '#37bc9b',
        '#3d5980', '#85a3ca',
        '#ed5565', '#5d9cec'
      ];
      for (var i = 0; i < townsArr.length; i++) {
          (function (i) {
              var ply1 = new BMap.Polygon(townsArr[i].coors, {
                  strokeWeight: 2,
                  strokeColor: "#3385ff",
                  fillColor: color[i],
                  fillOpacity: 0
              }); //建立多边形覆盖物
              map.addOverlay(ply1); //添加覆盖物
          })(i);
          // map.setViewport(ply1.getPath());    //调整视野    
      }
  
      var styleJson = [{
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
      console.log(strs.length)
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
          fillColor: "rgb(255,255,255)"
        }); //建立多边形覆盖物
        map.addOverlay(ply3); //遮罩物是半透明的，如果需要纯色可以多添加几层
        var ply4 = new BMap.Polygon(S_JW + SE_JW + E_JW + SE, {
          strokeColor: "none",
          strokeWeight: 2,
          fillColor: "rgb(255,255,255)"
        }); //建立多边形覆盖物
        map.addOverlay(ply4); //遮罩物是半透明的，如果需要纯色可以多添加几层
        var ply5 = new BMap.Polygon(W_JW + WS_JW + S_JW + WS, {
          strokeColor: "none",
          strokeWeight: 2,
          fillColor: "rgb(255,255,255)"
        }); //建立多边形覆盖物
        map.addOverlay(ply5); //遮罩物是半透明的，如果需要纯色可以多添加几层
        var ply6 = new BMap.Polygon(NW + N_JW + NW_JW + W_JW, {
          strokeColor: "none",
          strokeWeight: 2,
          fillColor: "rgb(255,255,255)"
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
  
      // var marker = new BMap.Marker(new BMap.Point(parseFloat(pt_s.split(',')[0]), parseFloat(pt_s.split(',')[1])));
      // var marker1 = new BMap.Marker(new BMap.Point(parseFloat(pt_e.split(',')[0]), parseFloat(pt_e.split(',')[1])));
      // var marker2 = new BMap.Marker(new BMap.Point(parseFloat(pt_w.split(',')[0]), parseFloat(pt_w.split(',')[1])));
      // var marker3 = new BMap.Marker(new BMap.Point(parseFloat(pt_n.split(',')[0]), parseFloat(pt_n.split(',')[1])));
      // map.addOverlay(marker);
      // map.addOverlay(marker1);
      // map.addOverlay(marker2);
      // map.addOverlay(marker3);
  
      // 城市名字
      addlabel();
      //点
      addPoint(townsArr);
  
    });
  
  }
  
  function addPoint(array) {
    var points = [];
    var myIcon = null;
    for (var index = 0; index < array.length; index++) {
      for (var i = 5; i < 10; i++) {
        var point = array[index].coors.split(';')[i+i*28];
        if(i%2==0&&i!=8){
          myIcon = new BMap.Icon(
        		  _ctxStatic+"/modules/login/images/normal.png",
            new BMap.Size(17, 25)
          );
        }else if(i%2!=0){
          myIcon = new BMap.Icon(
        		  _ctxStatic+"/modules/login/images/abnormal.png",
            new BMap.Size(17, 25)
          );
        }else{
          myIcon = new BMap.Icon(
        		  _ctxStatic+"/modules/login/images/offline.png",
            new BMap.Size(17, 25)
          );
        }
        myIcon.setImageSize(new BMap.Size(17, 25));
        // myIcon.setAnchor(new BMap.Size(30, 43));
        points.push(point)
        var marker = new BMap.Marker(new BMap.Point(parseFloat(point.split(',')[0]), parseFloat(point.split(',')[1])), {
          icon: myIcon
        });
        map.addOverlay(marker);
  
        //添加点击事件
        markerClickEvt(marker);
      }
    }
  }
  
  // --------------------------------点击marker
    function markerClickEvt(marker) {
      marker.addEventListener("click", function (e) {
        sessionStorage.setItem('indexPoint',JSON.stringify({trueFlag:true}));
        window.open('./gis.html');
      });
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