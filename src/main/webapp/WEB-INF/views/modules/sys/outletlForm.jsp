<%--
  Created by IntelliJ IDEA.
  User: linsir
  Date: 2019/11/25
  Time: 9:31
  To change this template use File | Settings | File Templates.
--%>
<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<html>
<head>
    <%@ include file="/WEB-INF/views/include/taglib.jsp"%>
    <jsp:include page="/WEB-INF/views/include/base-include.jsp">
        <jsp:param name="include" value="base,metronic,vuejs2,layer,jquery-validation" />
    </jsp:include>
    <style type="text/css">
        form{
            margin-top:8px;
        }
        /*.col-sm-3 {*/
        /*width: 25%;*/
        /*position: relative;*/
        /*min-height: 2px;*/
        /*padding-right: 5px;*/
        /*padding-left: 6px;*/
        /*}*/
        /*.magic-radio + label, .magic-checkbox + label {*/
        /*position: relative;*/
        /*display: block;*/
        /*padding-left: 24px;*/
        /*cursor: pointer;*/
        /*vertical-align: middle;*/
        /*}*/
    </style>
</head>

<body class="hidden-x">
<div>
    <div class="col-sm-12 text-right">
        <form class="form-horizontal" id="outletlForm" @submit="submitForm">
            {{data}}
            <table class="table table-bordered">
                <tr>
                    <td width="20%" align="right"><label><font color="red">*</font>企业编码：</label></td>
                    <td width="30%"><vm-input v-model="data.id" id="id" required  /></td>
                    <td width="20%" align="right"><label><font color="red">*</font>排口名称：</label></td>
                    <td width="30%"><vm-input v-model="data.outletlname" required/></td>
                </tr>
                <tr>
                    <td align="right"><label><font color="red">*</font>类型：</label></td>
                    <td>
                        <vm-select v-model="data.type"  required :options="code.type"></vm-select>
                    </td>
                    <td align="right"><label><font color="red">*</font>是否启用：</label></td>
                    <td>
                        <vm-select v-model="data.flag"  required :options="code.flag"></vm-select>
                    </td>
                </tr>
                <tr>
                    <td align="right"><label><font color="red">*</font>数采仪序号：</label></td>
                    <td>
                        <vm-input v-model="data.instrumentid" type="" required/>
                    </td>
                    <td align="right"><label>数采仪密码：</label></td>
                    <td>
                        <vm-input v-model="data.instrumentpwd" type="" />
                    </td>
                </tr>
                <tr>
                    <td align="right"><label>监控点位置：</label></td>
                    <td>
                        <vm-input v-model="data.monitorypoint" type="" />
                    </td>
                    <td align="right"><label>排口编号：</label></td>
                    <td>
                        <vm-input v-model="data.outletlid" type="" />
                    </td>
                </tr>
                <tr>
                    <td align="right"><label>经度：</label></td>
                    <td>
                        <vm-input v-model="data.longitude" class="form-control data-input input-sm"  />
                    </td>
                    <td align="right"><label>纬度：</label></td>
                    <td>
                        <div class="input-group">
                            <input v-model="data.latitude" class="form-control data-input input-sm"  />
                            <span class="input-group-btn">
										<button class="btn btn-info" type="button" id="getLatitude" @click="getLatitude">
											<i class ="fa">获取经纬度</i>
										</button>
									</span>
                        </div>
                    </td>
                </tr>


            </table>
            <div class="footFixToolbar" style="margin-bottom: 10px;">
                <button class="btn btn-info" type="submit" id="saveOutletl"><i class="fa fa-save fa-fw"></i>保存</button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <button class="btn btn-warning closeNowLayer" type="button" id="cancel"><i class="fa fa-close fa-fw"></i>关闭</button>
            </div>
        </form>
    </div>
</div>

<div id="officeTreeFrame" style="display: none">
    <div class="ztree" id="officeTree"></div>
</div>
<div id='allmap' style='width: 100%; height: 100%; position: absolute; display: none'></div>
</body>
<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=pTxRk6K3ykP2lXYEGfsCbpbUfZbKlliK"></script>
<script type="text/javascript">

    var id="${id}";//排口id
    var treeObj=null;
    var vmData={
        data:{"outletlid":id},
        code:{
            flag:[
                {value:"1",name:"是"},
                {value:"0",name:"否"}
            ],
            type:[
                {value:"废气",name:"废气"},
                {value:"废水",name:"废水"},
                {value:"VOCs",name:"VOCs"},
                {value:"油烟",name:"油烟"}
            ]
        },
        canEdit:"false"
    }
    var vm = new Vue({
        el : "#outletlForm",
        data :vmData,
        mounted:function(){
            this.initMap();
            this.loadData();
        },
        methods:{
            //点击获取经纬度的按钮
            getLatitude:function(){
                //在本页面打开一个视图
                layer.open({
                    type:1,
                    title:["百度地图","font-size:18px;"],
                    //弹窗大小
                    area:["90%","90%"],
                    //表示显示的上下文的div，该div默认为隐藏
                    content:$('#allmap'),

                })
            },
            //初始化地图,这个会在页面初始化的时候就init，点击获取百度经纬度的时候只是显示出来而已
            initMap:function(){
                //创建map实例
                map = new BMap.Map("allmap");
                geoc = new BMap.Geocoder();  //地址解析对象
                markersArray = [];//用于保存标记点
                var geolocation = new BMap.Geolocation();
                //var point = new BMap.Point(116.331398, 39.897445);
                map.centerAndZoom("广州", 12); //中心点
                //获取当前的地点的坐标
                geolocation.getCurrentPosition(function (r){
                    if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                        var mk = new BMap.Marker(r.point);
                        map.addOverlay(mk);
                        //将地图上的中心点移动到指定的point上面
                        map.panTo(r.point);
                        //设置能够滚动滑轮
                        map.enableScrollWheelZoom(true);
                    }
                    else {
                        alert('failed' + this.getStatus());
                    }
                }, {enableHighAccuracy: true})
                //监听点击事件，传入showInfo的函数
                map.addEventListener("click", showInfo);
            },
            //加载数据
            loadData:function(){
                if(id){
                    //根据排口id查询数据
                    $.get(_ctx + "/sys/outletl/data/"+id,function(msg){
                        if(msg.status==1){
                            vmData.data=msg.data;
                        }else{
                            layer.error("用户数据加载错误");
                        }
                    });
                }else{
                    //设置默认的数据
                    Vue.set(this,"data",{flag:1});
                }
            },
            //提交表单
            submitForm:function(e){
                e.preventDefault();
                if($("#outletlForm").valid()){
                    if(id){
                        this.saveOutletl();
                    }else{
                        this.updateOutletl();
                    }
                }
                return false;
            },
            //修改数据
            updateOutletl:function(){
                var _this = this;
                var json = JSON.stringify(vmData.data);
                var loadingIndex=layer.load();
                $.ajax({
                    url : _ctx + "/sys/outletl/update" ,
                    data : json,
                    type : "post",
                    contentType : "application/json",
                    success : function(msg) {
                        layer.close(loadingIndex);
                        if(msg.status==1){
                            layer.success("保存成功",{time:1000});
                            if(id){
                                _this.reloadData();
                            }else{
                                layer.closeAll();
                                top.layer.closeAll();
                                top.layer.msg("添加成功");
                            }
                        }else{
                            layer.error("保存失败："+msg.message);
                        }
                    },
                    error : function(msg) {
                        layer.close(loadingIndex);
                        layer.error("保存失败："+msg.message);
                    }
                });
            },
            //保存数据
            saveOutletl:function(){
                var _this = this;
                var json = JSON.stringify(vmData.data);
                var loadingIndex=layer.load();
                $.ajax({
                    url : _ctx + "/sys/outletl/save" ,
                    data : json,
                    type : "post",
                    contentType : "application/json",
                    success : function(msg) {
                        layer.close(loadingIndex);
                        if(msg.status==1){
                            layer.success("保存成功",{time:1000});
                            if(id){
                                _this.reloadData();
                            }else{
                                layer.closeAll();
                                top.layer.closeAll();
                                top.layer.msg("添加成功");
                            }
                        }else{
                            layer.error("保存失败："+msg.message);
                        }
                    },
                    error : function(msg) {
                        layer.close(loadingIndex);
                        layer.error("保存失败："+msg.message);
                    }
                });
            }
        }
    });

    resizeWindow();
    $(window).on("resize",resizeWindow);

    function resizeWindow(){
        $("#outletlForm").height($(window).height()-80);
    }
    //清除标识
    function clearOverlays() {
        if (markersArray) {
            for (i in markersArray) {
                map.removeOverlay(markersArray[i])
            }
        }
    }
    //地图上标注
    function addMarker(point) {
        var marker = new BMap.Marker(point);
        markersArray.push(marker);
        //先清除标记
        clearOverlays();
        //再添加标记
        map.addOverlay(marker);
    }
    //点击地图时处理
    function showInfo(e) {
        geoc.getLocation(e.point, function (rs) {
            var addComp = rs.addressComponents;
            var address = addComp.province + addComp.city + addComp.district + addComp.street + addComp.streetNumber;
            layer.confirm("确定要地址是" + address + "?",
                {
                    btn: ['确定','取消'] //按钮
                }, function () {
                    //Vue.set(vmData.data,"location",address);
                    Vue.set(vmData.data,"longitude",e.point.lng);
                    Vue.set(vmData.data,"latitude",e.point.lat);
                    layer.closeAll();
                })
        });
        addMarker(e.point);
    }
</script>
</html>

