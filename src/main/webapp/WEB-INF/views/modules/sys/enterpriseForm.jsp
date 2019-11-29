<%--
  Created by IntelliJ IDEA.
  User: linsir
  Date: 2019/11/21
  Time: 10:48
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
    <script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=pTxRk6K3ykP2lXYEGfsCbpbUfZbKlliK"></script>
    <style type="text/css">
        form{
            margin-top:8px;
        }
    </style>
</head>

<body class="hidden-x">
<div>
    <div class="col-sm-12 text-right">
        <form class="form-horizontal" id="enterpriseForm" @submit="submitForm">
            <table class="table table-bordered">
                <tr>
                    <td width="20%" align="right"><label><font color="red">*</font>企业名称：</label></td>
                    <td width="30%"><vm-input v-model="data.name" id="name" required/></td>
                    <td width="20%" align="right"><label><font color="red">*</font>企业简称：</label></td>
                    <td width="30%"><vm-input v-model="data.shortName" required/></td>
                </tr>
                <tr>
                    <td align="right"><label><font class="" color="red">*</font>统一社会信用代码：</label></td>
                    <td>

                        <div class="input-group">

                            <input v-model="data.communityCode"  class="form-control data-input input-sm" id="" required/>
                            <span class="input-group-btn">
										<button class="btn btn-info" type="button" id="never">
											没有<i class="fa fa-question"></i>
										</button>
									</span>
                        </div>
                    </td>
                    <td align="right"><label><font class="" color="red">*</font>法定代理人：</label></td>
                    <td><vm-input v-model="data.representative" type="" required/></td>
                </tr>
                <tr>
                    <td align="right"><label><font color="red">*</font>行政区域：</label></td>
                    <td>
                        <vm-select v-model="data.area"  required :options="code.area" required/>
                    </td>
                    <td align="right"><label><font color="red">*</font>企业地址：</label></td>
                    <td>
                        <vm-input v-model="data.location" type="" required/>
                    </td>
                </tr>
                <tr>
                    <td align="right"><label><font class="" color="red">*</font>污染物类别</label></td>
                    <td><vm-multicheck  v-model="data.pollutantLevel" :options="code.pollutantLevel" required/></td>
                    <td align="right"><label><font class="" color="red">*</font>重点级别：</label></td>
                    <td width="30%"><vm-radio v-model="data.importantLevel" :options="code.importLevel" required/></td>
                </tr>
                <tr>
                    <td align="right"><label><font color="red">*</font>行业类别：</label></td>
                    <td>
                        <div class="input-group">
                            <input v-model="data.type" class="form-control data-input input-sm" required/>
                            <span class="input-group-btn">
										<button class="btn btn-info" type="button" id="typeMa" @click="getLei">
											<i class ="fa">获取行业类别</i>
										</button>
									</span>
                        </div>

                    </td>
                    <td align="right"><label><font color="red">*</font>是否启用：</label></td>
                    <td>
                        <vm-select v-model="data.flag" :options="code.flag" required></vm-select>
                    </td>
                </tr>
                <tr>
                    <td align="right"><label><font color="red">*</font>中心经度：</label></td>
                    <td>
                        <div class="input-group" >
                            <input v-model="data.longitude" class="form-control data-input input-sm" readonly="true" required/>
                            <span class="input-group-btn">
										<button class="btn btn-info" type="button" id="getLongitudeBtn" @click="getLongitude">
											<i class ="fa">获取经度</i>
										</button>
									</span>
                        </div>
                    </td>
                    <td align="right"><label><font color="red">*</font>中心纬度：</label></td>
                    <td>
                        <div class="input-group">
                            <input v-model="data.latitude" class="form-control data-input input-sm" readonly="true" required/>
                            <span class="input-group-btn">
										<button class="btn btn-info" type="button" id="getLatitudeBtn" >
											<i class ="fa">获取纬度</i>
										</button>
									</span>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td align="right"><label><font color="red">*</font>联系人：</label></td>
                    <td><vm-input v-model="data.contactor" required/></td>
                    <td align="right"><label><font color="red">*</font>联系人电话：</label></td>
                    <td><vm-input v-model="data.phone" required/></td>
                </tr>
                <tr>
                    <td align="right"><label></font>2019重点排污单位：</label></td>
                    <td>
                        <vm-select v-model="data.keyPolluters"  />
                        <div class="input-group">
                            <span class="input-group-btn">
										<button class="btn btn-info" type="button" id="iskeyPolluters">
											<i class ="fa">是否重点排污单位历史记录</i>
										</button>
									</span>
                        </div>
                    </td>
                    <td align="right"><label>开工日期：</label></td>
                    <td><vm-input v-model="data.officePhone" readonly="true"/></td>
                </tr>
                <tr>
                    <td align="right"><label>电子邮箱：</label></td>
                    <td><vm-input v-model="data.email" /></td>
                    <td align="right"><label>邮政编码：</label></td>
                    <td><vm-input v-model="data.postCode" /></td>
                </tr>
                <tr>
                    <td align="right"><label>通讯地址：</label></td>
                    <td><vm-input v-model="data.mailAddress" /></td>
                    <td align="right"><label>传真：</label></td>
                    <td><vm-input v-model="data.fax" /></td>
                </tr>
                <tr>
                    <td align="right"><label>排序编号：</label></td>
                    <td><vm-input v-model="data.sortid"/></td>
                    <td align="right"><label>备注：</label></td>
                    <td><vm-input v-model="data.remark" /></td>
                </tr>
            </table>
            <div class="footFixToolbar" style="margin-bottom: 10px;">
                <button class="btn btn-info" type="submit" id="saveEnterprise"><i class="fa fa-save fa-fw"></i>保存</button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <button class="btn btn-warning closeNowLayer" type="button" id="cancel"><i class="fa fa-close fa-fw"></i>关闭</button>
            </div>
        </form>
    </div>
</div>

<div id="officeTreeFrame" style="display: none">
    <div class="ztree" id="officeTree"></div>
</div>
<%--先将地图定义起来 然后使用--%>
<div id='allmap' style='width: 100%; height: 100%; position: absolute; display: none'></div>
</body>
<script type="text/javascript">
    var id="${id}";
    var treeObj=null;
    var vmData={
        data:{},
        code:{
            area:[
                {value:"越秀",name:"越秀"},
                {value:"五山街道",name:"五山街道"},
                {value:"黄埔",name:"黄埔"}
            ],
            flag:[
                {value:"1",name:"是"},
                {value:"0",name:"否"}
            ],
            importLevel:[
                {value:"国控",name:"国控"},
                {value:"省控",name:"省控"},
                {value:"市控",name:"市控"},
                {value:"其他",name:"其他"}
            ],
            sex:[
                {value:"男",name:"男"},
                {value:"女",name:"女"}
            ],
            pollutantLevel:[
                {value:"废水",name:"废水"},
                {value:"废气",name:"废气"},
                {value:"VOCs",name:"VOCs"},
                {value:"油烟",name:"油烟"},
            ]

        },
        canEdit:"false"
    }
    var vm = new Vue({
        el : "#enterpriseForm",
        data :vmData,
        mounted:function(){
            //初始化调用百度地图
            this.initMap();
            this.loadData();
        },
        methods:{
            //获取经纬度时打开一个弹窗，弹窗的内容显示百度地图
            getLongitude:function(){
                layer.open({
                    type: 1,
                    title: ["百度地图","font-size:18px;"],
                    area: ["90%", "90%"],
                    content:$('#allmap')
                });
            },
            //初始化地图
            initMap:function(){
                //创建map实例
                map = new BMap.Map("allmap");
                geoc = new BMap.Geocoder();  //地址解析对象
                markersArray = [];//用于保存标记
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
            //获取行业信息
            getLei:function(){
                var _this = this;
                $.CommonData.data.tradeSelect({
                    'onConfirm':function(selectData){
                        Vue.set(_this.data,"type",selectData.type);
                    },queryParam:{"officeId":vmData.data.officeId }
                });
            },
            //加载数据
            loadData:function(){

                if(id){
                    $.get(_ctx + "/sys/enterprise/data/"+id,{},function(msg){
                        if(msg.status==1){
                            vmData.data=msg.data;
                            vmData.data.pollutantLevel=vmData.data.pollutantLevel.split(";");
                        }else{
                            layer.error("用户数据加载错误");
                        }

                    });
                }else{
                    //设置默认的数据
                    Vue.set(this,"data",{area:"越秀",flag:1,importLevel:"国控",pollutantLevel:""});
                    //将污染物类比我分隔成数组，这样才能在多选框中显示
                    vmData.data.pollutantLevel=vmData.data.pollutantLevel.split(";");
                }
            },
            //提交表单
            submitForm:function(e){
                e.preventDefault();
                if($("#enterpriseForm").valid()){
                    this.saveEnterprise();
                }
                return false;
            },
            //保存数据
            saveEnterprise:function(){
                var _this = this;
                var p=/^(?![^a-zA-Z]+$)(?!\D+$).{8,20}$/;
                //将数组转换为字符串
                vmData.data.pollutantLevel=vmData.data.pollutantLevel.join(";");
                var json = JSON.stringify(vmData.data);
                var loadingIndex=layer.load();
                $.ajax({
                    url : _ctx + "/sys/enterprise/save" ,
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
                //后面为了显示正常，将字符串继续转化位数组
                vmData.data.pollutantLevel=vmData.data.pollutantLevel.split(";");
            }
        }
    });

    resizeWindow();
    $(window).on("resize",resizeWindow);

    function resizeWindow(){
        $("#enterpriseForm").height($(window).height()-80);
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
                    Vue.set(vmData.data,"location",address);
                    Vue.set(vmData.data,"longitude",e.point.lng);
                    Vue.set(vmData.data,"latitude",e.point.lat);
                    layer.closeAll();
                })
        });
        addMarker(e.point);
    }
</script>
</html>
