<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<html>
	<head>
		<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
		<jsp:include page="/WEB-INF/views/include/base-include.jsp">
			<jsp:param name="include" value="base,metronic,ztree,vuejs2,layer,jquery-validation" />
		</jsp:include>
		<style type="text/css">
			#roleForm {
				margin-top: 20px;
			}
			.ztree{
					font-size: 14px;
					/* font-family: "Microsoft YaHei" ! important; */
			}
						
			#treeFrame,#roleForm{
				height: 100%;
				overflow-y:auto;
				overflow-x:hidden;
				margin-bottom: 15px; 
			}
		</style>
	</head>
	
	<body class="">
		<div class="col-sm-12" id="frame">
			<div class="col-sm-6 text-center">
				<form class="form-horizontal" id="roleForm">
					<div class="form-group ">
						<label class="control-label col-sm-2">id:</label>
						<div class="col-sm-10">
							<input v-model="data.id" class="form-control " readonly="true">
						</div>
					</div>
					<div class="form-group ">
						<label class="control-label col-sm-2">名称:</label>
						<div class="col-sm-10">
							<input v-model="data.name" class="form-control " required>
						</div>
					</div>
					<div class="form-group ">
						<label class="control-label col-sm-2">可用标志:</label>
						<div class="col-sm-10">
							<select v-model="data.flag" class="form-control" required>
								<option value="1">是</option>
								<option value="0">否</option>
							</select>
						</div>
					</div>
					<div class="form-group ">
						<label class="control-label col-sm-2">备注:</label>
						<div class="col-sm-10">
							<textarea v-model="data.remark" class="form-control " rows="3"></textarea>
						</div>
					</div>
					
				</form>
				<button class="btn btn-info"  style="margin-right: 20px" id="saveRole"><i class='fa fa-save fa-fw'></i>保存角色信息</button>
			</div>
			<div class="col-sm-6 text-center" >
				<div id="treeFrame">
					<vm-select v-model="status.menuScope" :options="code.menuScopes"></vm-select>
					<div id="menuTree"  class="ztree"></div>
				</div>
				<button class="btn btn-success"  style="margin-right: 20px" id="saveRoleMenu"><i class='fa fa-save fa-fw'></i>保存角色权限</button>
			</div>
		</div>
	
	</body>
	
	<script type="text/javascript">
		var id="${id}";
		var treeObj=null;
		
		$("*[v-model]").each(function(){
			var vName=$(this).attr("v-model");
			$(this).attr("id",vName);
			$(this).attr("name",vName);
		});
		var vm = new Vue({
			el : "#frame",
			data : {
				status:{
					'menuScope':''
				},
				code:{
					'menuScopes':[]
				},
				data:{}
			},
			watch:{
				//选择的菜单域改变，改变显示的节点
				'status.menuScope':function(newValue){
					if(treeObj){
						var nodes=treeObj.transformToArray(treeObj.getNodes());
						var showNodes=[];
						var hideNodes=[];
						for(var i in nodes){
							if(nodes[i].scope==newValue){
								/* $("menuTree_"+nodes[i].id).show(); */
								showNodes.push(nodes[i]);
							}else{
								/* $("menuTree_"+nodes[i].id).hide(); */
								hideNodes.push(nodes[i]);
							}
						}
					 	treeObj.hideNodes(hideNodes);
						treeObj.showNodes(showNodes); 
					}
				}
			}
		});
		$(document).ready(function() {
			reloadData();
			 if(id){
				reloadMenuTree();
			 }
			 
			 $(document).on("menuTreeInitComplete",function(){
				 reloadRoleMenu();
			 });
			 
					
			resizeWindow();
			$(window).on("resize",resizeWindow);
			
			//$(form).validate({});
			$("#roleForm").submit(function(e){
				e.preventDefault();
				if($(this).valid()){
					saveRole();
				}
			});
			
			$("#saveRole").click(function(){
				$("#roleForm").submit();
			});
			$("#saveRoleMenu").click(saveRoleMenu);
		});
		
		function saveRole(){
			var json = JSON.stringify(vm.$data.data);
			var loadingIndex = layer.loadingWithText("正在保存角色信息") // 换了种风格
			//alert(json);
			$.ajax({
				url : _ctx + "/sys/role/save",
				data : json,
				type : "post",
				contentType : "application/json",
				success : function(msg) {
					layer.close(loadingIndex);
					if(msg.status==1){
						layer.success("保存成功");
						console.log(msg.data);
						window.location.href=_ctx+"/sys/role/form/"+msg.data.id;
					}else{
						layer.error("保存失败："+msg.message);
					}
				},
				error : function(msg) {
					layer.close(loadingIndex);
					layer.error("保存失败："+msg);
				}
			});
		}
		
		function saveRoleMenu(){
			if(!id){
				layer.warning("请先保存角色信息");
				return;
			}
			var nodes=treeObj.transformToArray( treeObj.getNodes());
			var menuIds=[];
			for(var i in nodes){
				if(nodes[i].checked){
					menuIds.push(nodes[i].id);
				}
			}
			
			if(!menuIds){
				layer.warning("请先选择一个节点");
				return;
			}
			var loadingIndex = layer.loadingWithText("正在保存角色权限信息") ;
			var json=JSON.stringify(menuIds);	
			$.ajax({
				url : _ctx + "/sys/menu/saveRoleMenu/"+id,
				data : json,
				type : "post",
				contentType : "application/json",
				success : function(msg) {
					layer.close(loadingIndex);
					if(msg.status==1){
						layer.success("保存成功");
					}else{
						layer.error("保存失败："+msg.message);
					}
				},
				error : function(msg) {
					layer.close(loadingIndex);
					layer.error("保存失败："+msg);
				}
			});
		}
		
		function reloadData(){
			if(id){
				$.get(_ctx + "/sys/role/data/"+id,{},function(msg){
					if(msg.status==1){
						vm.$data.data=msg.data;
					}else{
						layer.error("角色数据加载错误");
					}
				});
			}else{
				vm.$data={
						flag:1
				}
			}
			
		}
		
		function reloadRoleMenu(){
			$.get(_ctx + "/sys/menu/roleMenu/"+id,{},function(msg){
				if(msg.status==1){
					var roleMenuList=msg.data;
					for(var i in roleMenuList){
						var menuId=roleMenuList[i].id;
						var tempNode=treeObj.getNodeByParam("id",menuId);
						if(tempNode){
							treeObj.checkNode(tempNode, true, false,true);
						}
					}
					var menuScopes=$.ConfigCodeUtil.getConfig('system','menuScope');
					vm.$data.code.menuScopes=menuScopes;
					vm.$data.status.menuScope=menuScopes[0].value;
				}else{
					layer.error("无法获取角色关联的菜单项");
				}
			});
		}
		
		function reloadMenuTree(){
			var treeOption ={
					check: {
						enable: true,
						chkStyle: "checkbox",
						chkboxType: { "Y": "ps", "N": "ps" }
					},
					data : {
						simpleData : {
							enable : true,
							idKey : "id",
							pIdKey : "parentId",
							rootPid : "null"
						}
					}
			}
			
			$.get(_ctx + "/sys/menu/availableListData", {}, function(msg) {
				
				if (msg.status == "1") {
					treeListData=msg.data;
					treeObj = $.fn.zTree.init($("#menuTree"), treeOption,treeListData);
					$(document).trigger("menuTreeInitComplete");
					treeObj.expandAll(true);
				} else {
					layer.error("加载菜单列表失败");
				}
				
			});
		}
		
		
		function resizeWindow(){
			$("#treeFrame").height($(window).height()-60);
			$("#roleForm").height($(window).height()-80);
		}
	</script>
</html>