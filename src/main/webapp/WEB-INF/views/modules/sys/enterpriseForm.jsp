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
										<button class="btn btn-info" type="button" id="typeMa">
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
                        <div class="input-group">
                            <input v-model="data.longitude" class="form-control data-input input-sm" readonly="true" required/>
                            <span class="input-group-btn">
										<button class="btn btn-info" type="button" id="getLongitude">
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
										<button class="btn btn-info" type="button" id="getLatitude">
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
                    <td align="right"><label><font color="red">*</font>2019重点排污单位：</label></td>
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
                <%--<tr>--%>
                    <%--<td align="right"><label>部门：</label></td>--%>
                    <%--<td>--%>
                        <%--<div class="input-group">--%>
                            <%--<input v-model="data.officeId" class="hidden"/>--%>
                            <%--<input v-model="data.officeName" class="form-control data-input input-sm" readonly="readonly"/>--%>
                            <%--<span class="input-group-btn">--%>
										<%--<button class="btn btn-info" type="button" id="selectDepartmentBtn" @click="selectDepartment">--%>
											<%--<i class="glyphicon glyphicon-search"></i>--%>
										<%--</button>--%>
									<%--</span>--%>
                        <%--</div>--%>
                    <%--</td>--%>
                    <%--<td align="right"><label>职务：</label></td>--%>
                    <%--<td><vm-input v-model="data.duty"></td>--%>
                <%--</tr>--%>
                <tr>
                    <td align="right"><label>排序编号：</label></td>
                    <td><vm-input v-model="data.sortid"/></td>
                    <td align="right"><label>备注：</label></td>
                    <td><vm-input v-model="data.remark" /></td>
                </tr>
            </table>
            <%--<div v-show="id!=''" class="text-danger text-left">请注意：不修改密码，保留密码为空即可！</div>--%>
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
            this.loadData();
        },
        methods:{
            //加载数据
            loadData:function(){
                if(id){
                    $.get(_ctx + "/sys/enterprise/data/"+id,{},function(msg){
                        if(msg.status==1){
                            vmData.data=msg.data;
                            //var pollutantLevel = msg.data.pollutantLevel;
                            msg.data.pollutantLevel = msg.data.pollutantLevel.split(";");
                        }else{
                            layer.error("用户数据加载错误");
                        }

                    });
                }else{
                    //设置默认的数据
                    Vue.set(this,"data",{area:"越秀",flag:1,importLevel:"国控"});
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
</script>
</html>
