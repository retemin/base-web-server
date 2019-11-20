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
		</style>
	</head>

	<body class="hidden-x">
		<div>
			<div class="col-sm-12 text-right">
				<form class="form-horizontal" id="userForm" @submit="submitForm">
					<table class="table table-bordered">
						<tr>
							<td width="20%" align="right"><label><font color="red">*</font>登录名：</label></td>
							<td width="30%"><vm-input v-model="data.loginName" id="loginName" required/></td>
							<td width="20%" align="right"><label><font color="red">*</font>用户名：</label></td>
							<td width="30%"><vm-input v-model="data.name" required/></td>
						</tr>
						<tr>
							<td align="right"><label><font class="pwd" color="red">*</font>密码：</label></td>
							<td><vm-input  v-model="data.password" type="password" id="password"></td>
							<td align="right"><label><font class="pwd" color="red">*</font>确认密码：</label></td>
							<td><vm-input v-model="data.confirmPassword" type="password" data-rule-equalTo="#password"></td>
						</tr>
						<tr>
							<td align="right"><label><font color="red">*</font>类型：</label></td>
							<td>
								<vm-select v-model="data.type"  required :options="code.type"></vm-select>
							</td>
							<td align="right"><label><font color="red">*</font>可用标志：</label></td>
							<td>
								<vm-radio v-model="data.flag" :options="code.flag" required></vm-radio>
							</td>
						</tr>
						<tr>
							<td align="right"><label>曾用名：</label></td>
							<td><vm-input v-model="data.oldName" ></td>
							<td align="right"><label>性别：</label></td>
							<td>
								<vm-radio v-model="data.sex" :options="code.sex"></vm-radio>
							</td>
						</tr>
						<tr>
							<td align="right"><label>手机：</label></td>
							<td><vm-input v-model="data.mobile" ></td>
							<td align="right"><label>办公电话：</label></td>
							<td><vm-input v-model="data.officePhone"></td>
						</tr>
						<tr>
							<td align="right"><label>部门：</label></td>
							<td>
								<div class="input-group">
									<input v-model="data.officeId" class="hidden"/>
									<input v-model="data.officeName" class="form-control data-input input-sm" readonly="readonly"/>
									<span class="input-group-btn">
										<button class="btn btn-info" type="button" id="selectDepartmentBtn" @click="selectDepartment">
											<i class="glyphicon glyphicon-search"></i>
										</button>
									</span>
								</div>
							</td>
							<td align="right"><label>职务：</label></td>
							<td><vm-input v-model="data.duty"></td>
						</tr>
						<tr>
							<td align="right"><label>排序编号：</label></td>
							<td><vm-input v-model="data.sortid"></td>
							<td align="right"><label>备注：</label></td>
							<td><vm-input v-model="data.remark" ></td>
						</tr>
					</table>
					<div v-show="id!=''" class="text-danger text-left">请注意：不修改密码，保留密码为空即可！</div>
					<div class="footFixToolbar" style="margin-bottom: 10px;">
						<button class="btn btn-info" type="submit" id="saveUser"><i class="fa fa-save fa-fw"></i>保存</button>
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
				type:[
					{value:"1",name:"管理员"},
					{value:"2",name:"环保用户"},
					{value:"3",name:"企业用户"}
				],
				flag:[
					{value:"1",name:"是"},
					{value:"0",name:"否"}
				],
				sex:[
					{value:"男",name:"男"},
					{value:"女",name:"女"}
				]
			}
		}
		var vm = new Vue({
			el : "#userForm",
			data :vmData,
			mounted:function(){
				this.loadData();
			},
			methods:{
				//部门选择
				selectDepartment:function(){
					var _this = this;
					$.CommonData.data.officeSelect({
						'onConfirm':function(selectData){
							Vue.set(_this.data,"officeId",selectData.id);
							Vue.set(_this.data,"officeName",selectData.name);
						},queryParam:{"officeId":vmData.data.officeId }
					});
				},
				//加载数据
				loadData:function(){
					if(id){
						$.get(_ctx + "/sys/user/data/"+id,{},function(msg){
							if(msg.status==1){
								vmData.data=msg.data;
							}else{
								layer.error("用户数据加载错误");
							}
							
						});
					}else{
						Vue.set(this,"data",{type:1,flag:1,sex:"男"});
					}
				},
				//提交表单
				submitForm:function(e){
					e.preventDefault();
					if($("#userForm").valid()){
						this.saveUser();
					}
					return false;
				},
				//保存数据
				saveUser:function(){
					var _this = this;
					var p=/^(?![^a-zA-Z]+$)(?!\D+$).{8,20}$/;
					if(vmData.data.password){
						if(!p.test(vmData.data.password)){
							layer.tips("密码必须8-20位,必须由数字+字母组成","#password");
							$("#password").focus();
							return ;
						}
					}
				 	var json = JSON.stringify(vmData.data);
				 	var loadingIndex=layer.load();
					$.ajax({
						url : _ctx + "/sys/user/save",
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
			$("#userForm").height($(window).height()-80);
		}
	</script>
</html>