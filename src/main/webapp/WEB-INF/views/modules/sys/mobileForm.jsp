<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<html>
	<head>
		<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
		<jsp:include page="/WEB-INF/views/include/base-include.jsp">
			<jsp:param name="include" value="base,vuejs2,metronic,layer,jquery-validation" />
		</jsp:include>
		<title>表单</title>
		<style type="text/css">
			form{
				margin-top:8px;
			}
			.col-lg-12, .col-md-12, .col-sm-12, .col-xs-12,.col-lg-6, .col-md-6, .col-sm-6, .col-xs-6 {
		      padding-left: 0px;
		      padding-right: 0px;
		    }
		    td > label{
		    	display: block;
		    	text-align: right;
		    }
		    form td {
		    line-height: 1.42857;
		    padding: 8px;
			}
		    td{
		    	padding-left:3px;
		    	padding-right: 6px;
		    }
		</style>
	</head>
	<body class="">
		<div class="container-fluid">
		    <vm-valid-form id="form" class="col-xs-12" :rules="rules" @submit="formSubmit" @valid-error="onValid">
		        <table :class="'col-xs-12 '+(canEdit='false'?'table-bordered':'')" style="font-size: 12px;">
		            <tbody id="">
		            	<tr>
		                    <td width="15%"><label class="control-label">移动端操作系统：</label></td>
		                    <td colspan="3">
		                        <vm-radio :options="code.systemCode" name="systemCode" v-model="data.systemCode" :can-edit="canEdit"></vm-input>
		                    </td>
		                </tr>
		                <tr v-if="data.systemCode=='IOS'">
		                	<td width="15%"><label class="control-label">APP STORE地址：</label></td>
		                	<td colspan="3">
		                		<vm-input name="savePath" v-model="data.savePath" :can-edit="canEdit" ></vm-input>
		                	</td>
		                </tr>
		                <tr v-else>
		                	<td width="15%"><label class="control-label">安卓安装包：</label></td>
		                	<td colspan="3">
		                		<input type="file" name="file" id="file">
		                	</td>
		                </tr>
		                <tr>
		                    <td width="15%"><label class="control-label">移动端名称：</label></td>
		                    <td width="35%">
		                        <vm-input name="mobileName" v-model="data.mobileName" :can-edit="canEdit" ></vm-input>
		                    </td>
		                    <td width="15%"><label class="control-label">版本号：</label></td>
		                    <td width="35%">
		                        <vm-input name="version" v-model="data.version" :can-edit="canEdit" ></vm-input>
		                    </td>
		                </tr>
		                <tr>
		 					<td><label class="control-label">上传更新时间：</label></td>
		                    <td>
		                        <vm-datepicker name="uploadTime" v-model="data.uploadTime" :can-edit="canEdit" 
		                        	:picker-type="'datetime'"></vm-datepicker>
		                    </td>
		                    <td><label class="control-label">上传更新人：</label></td>
		                    <td>
		                        <vm-input name="uploadUser" v-model="data.uploadUser" :can-edit="canEdit"></vm-input>
		                    </td>
		                </tr>
		                <tr>
		                    <td><label class="control-label">更新内容</label></td>
		                    <td colspan="3">
		                        <vm-textarea name="content" v-model="data.content" :can-edit="canEdit"></vm-textarea>
		                    </td>
		                </tr>
		            </tbody>
		        </table>
		        <div class="footFixToolbar">
					<button class="btn btn-info" type="submit" id="saveUser"><i class="fa fa-save fa-fw"></i>保存</button>
					<button class="btn btn-warning closeNowLayer" type="button" id="cancel"><i class="fa fa-close fa-fw"></i>关闭</button>
				</div>
		    </vm-valid-form>
		</div>
	</body>
	<script type="text/javascript">
		var id="${id}";
		var vmData={
			data:{
				
			},
			code:{
				flag:[
					{value:"1",name:"是"},
					{value:"0",name:"否"}
				],
				systemCode:[
					{value:"Android",name:"安卓版"},
					{value:"IOS",name:"IOS"}
				]
			},
			canEdit:"true",
			rules:{
				
	        }
		}
		var vm = new Vue({
			el : "#form",
			data :vmData ,
			methods:{
				reloadData:function(){
					if(id){
						$.get(_ctx + "/sys/mobile/data/"+id,{},function(msg){
							if(msg.status==1){
								vmData.data=msg.data;
							}else{
								layer.error("数据加载错误");
							}
							
						});
					}else{
						vm.$data.data = {
							id:"",
							systemCode:"Android",
							mobileName:"",
							version:"V1.0.0.0",
							uploadTime:new Date(),
							uploadUser:_nowUserName,
							savePath:"",
							content:""		
					    };
					}
				},
				formSubmit:function(){
					var loadIndex=layer.loadingWithText("正在提交数据");
					vmData.data.updateUser = _nowUserName;
					vmData.data.updateTime = new Date();
					if($("#file").val()!=""){
				        var form = $('#form')[0];
				        var data = new FormData(form);
						$.ajax({
				            type: "POST",
				            enctype: 'multipart/form-data',
				            url: _ctx+"/sys/mobile/submit",
				            data: data,
				            processData: false,
				            contentType: false,
				            cache: false,
				            timeout: 600000,
				            success: function (data) {
								layer.close(loadIndex);
					            if(data.status=="1"){
					            	layer.success("保存成功",{time:1000},function(){
										$(".closeNowLayer").click();
						            });
						      	}
				            },
				            error: function (e) {
								layer.close(loadIndex);
				                console.log("ERROR : ", e);
				            }
				        });
					}else{
						var json=JSON.stringify(vmData.data);
						$.ajax({
							url : _ctx + "/sys/mobile/save",
							data : json,
							type : "post",
							contentType : "application/json",
							success : function(msg) {
								layer.close(loadIndex);
								if(msg.status==1){
									layer.success("保存成功",{time:1000});
									if(id){
										reloadData();
									}else{
										top.layer.closeAll();
					        			top.layer.msg("添加成功");
									}
								}else{
									layer.error("保存失败："+msg.message);
								}
							},
							error : function(msg) {
								layer.close(loadIndex);
								layer.error("保存失败："+msg.message);
							}
						});
					}
				},
				initCode:function(){
					vm.$emit("codeInitCompleted");
				},
		        onValid:function(){
		        	layer.msg('数据验证不通过，请参照页面提示核对数据是否正确！', {icon: 2});
		        }
			},
			mounted:function(){
				
			}
		}); 
		vm.$on('pageInitCompleted', function (msg) {
			  this.initCode();
		});
		
		vm.$on('codeInitCompleted', function (msg) {
			  this.reloadData();
		});
		
		vm.$on('dataReloadCompleted', function (msg) {
			  console.log("data init complete");
		});
		
		vm.$emit("pageInitCompleted");
	</script>
</html>