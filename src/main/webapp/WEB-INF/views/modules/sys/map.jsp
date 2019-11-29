<%--
  Created by IntelliJ IDEA.
  User: linsir
  Date: 2019/11/27
  Time: 16:46
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
    <style type="text/css">
        body, html,#allmap {width: 100%;height: 100%;overflow: hidden;margin:0;font-family:"微软雅黑";}
    </style>
    <script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=pTxRk6K3ykP2lXYEGfsCbpbUfZbKlliK"></script>
    <title>单击获取点击的经纬度</title>
</head>
<body>
    <div id="allmap"></div>
</body>
</html>

<script type="text/javascript">
    // 百度地图API功能
    var map = new BMap.Map("allmap");
    map.centerAndZoom("广州",12);
    map.enableScrollWheelZoom();   //启用滚轮放大缩小，默认禁用
    map.enableContinuousZoom();    //启用地图惯性拖拽，默认禁用
    //单击获取点击的经纬度
    map.addEventListener("click",function(e){
        alert(e.point.lng + "," + e.point.lat);
    });
</script>
