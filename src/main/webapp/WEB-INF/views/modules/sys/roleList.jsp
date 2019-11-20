<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<html>
	<head>
		<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
		<jsp:include page="/WEB-INF/views/include/base-include.jsp">
			<jsp:param name="include" value="base,metronic,layer,jqgrid" />
		</jsp:include>
		<title>角色列表</title>
		<style type="text/css">
			#searchForm {
			    margin-bottom: 3px;
			    margin-left: 3px;
			    margin-top: 5px;
		    }
		    .ui-th-column,.ui-th-ltr {
				text-align: center;
			}
			a.edit{
				
			}
			a.disable{
				color: brown;
			}
			a.delete{
				color: red;
			}
		</style>
		
		<script type="text/javascript">
			var tableObj=null;
			$(document).ready(function() {
				$.jgrid.defaults.styleUI = "Bootstrap";
				
				tableObj=$("#dataTable").jqGrid({
				    datatype : "json",
				    url : "${ctx}/sys/role/jqgrid",
				    rowList : [10, 20, 30, 100],
				    mtype : "get",
				    //height:height,
				    colNames : ["id", "名称","备注", "是否可用",  "操作"],
				    colModel : [
				        {name: "id",index: "id",width: 60,hidden: true},
				        {name: "name",index: "name",align: "center",width: 120},
				        {name: "remark",index: "remark",align: "center",width: 200},
				        {name: "flag",index: "flag",align: "center",width: 100},
				        {name: "operator",index: "operator",width: 120,align: "center"}
				    ],
				    pager : "#pager",
				    autowidth: true,
				    shrinkToFit: true,
				    rowNum: 20,
				    viewrecords: true,
				    rownumbers : true,
				    hidegrid: true,
				    loadComplete : function(xhr){
						replaceByButton();
					},
					postData:{},
					//双击进入[修改]
					ondblClickRow:function(rowid,iRow,iCol,e){ 
						
					},
					sortname:"id"
				});
				resizeWindow();
				$(window).on("resize",resizeWindow);
				
				$("#newRole").click(function(){
					openForm();
				});
				
				$("#searchForm").submit(function(e){
					e.preventDefault();
					$("#searchForm").submit(function(e){
						e.preventDefault();
						var name = $("#search_name").val();
						tableObj.setGridParam({postData:{'name':name},page:1});
						tableObj.trigger("reloadGrid");
					});
				});
			});
			
			function updateFlag(itemId,name,flag){
				var opName=flag==1?"启用":"禁用";
				layer.confirm("确定"+opName+"角色:"+name+"?",function(index){
					layer.close(index);
					var loadingIndex=layer.loadingWithText("正在提交数据");
					$.post(_ctx+"/sys/role/updateFlag/"+itemId,{'flag':flag},function(msg){
						layer.close(loadingIndex);
						if(msg.status==1){
							layer.success("已经成功"+opName+"角色:"+name);
							tableObj.trigger("reloadGrid");
						}else{
							layer.error(opName+"角色失败："+msg.message);
						}
					});
				});
				
			}
			
			function deleteItem(itemId,name){
				layer.confirm("确定删除角色:<span class='text-success'>"+name+"</span>?<p class='text-danger' >(删除后将无法恢复，暂停使用请使用<span  class='text-warning'>[<span class=\"fa fa-ban \" aria-hidden=\"true\"></span>禁用] </span>)<p>",function(index){
					layer.close(index);
					var loadingIndex=layer.loadingWithText("正在提交数据");
					$.post(_ctx+"/sys/role/delete/"+itemId,{},function(msg){
						layer.close(loadingIndex);
						if(msg.status==1){
							layer.success("已经成功删除角色:"+name);
							tableObj.trigger("reloadGrid");
						}else{
							layer.error("删除角色失败："+msg.message);
						}
					});
				});
			}
			
			//重新调整jqgrid高度与宽度
			function resizeWindow(){
				var height = $(document).height()-$("#searchForm").height()-126;
				tableObj.setGridHeight(height);
			}
			
			//替换单元格内容为按钮
			function replaceByButton(){
				var ids = tableObj.jqGrid("getDataIDs");
				for (var i = 0; i < ids.length; i++) {
					var pkid = tableObj.jqGrid("getCell",ids[i],"id");
					var name = tableObj.jqGrid("getCell",ids[i],"name");
					var flag=tableObj.jqGrid("getCell",ids[i],"flag");
					var button = "<a href='javascript:void(0);' class='text-success' onclick=\"openForm('"+pkid+"')\">[<span class=\"fa fa-edit fa-fw\" aria-hidden=\"true\"></span>修改] </a>";
					if(flag==1){
						button += "<a href='javascript:void(0);' class='text-warning' onclick=\"updateFlag('"+pkid+"','"+name+"',0)\">[<span class=\"fa fa-ban fa-fw\" aria-hidden=\"true\"></span>禁用] </a>";
					}else{
						button += "<a href='javascript:void(0);' class='text-primary' onclick=\"updateFlag('"+pkid+"','"+name+"',1)\">[<span class=\"fa fa-check-circle-o fa-fw\" aria-hidden=\"true\"></span>启用] </a>";
					}
					button += "<a href='javascript:void(0);' class='text-danger' onclick=\"deleteItem('"+pkid+"','"+name+"')\">[<span class=\"fa fa-trash fa-fw\" aria-hidden=\"true\"></span>删除] </a>";
					tableObj.jqGrid("setCell", ids[i], "operator", button);
					
					var statusIcon="<i class=\"fa fa-"+(flag==1?"check-circle text-primary":"minus-circle text-warning")+"\"></i>";
					tableObj.jqGrid("setCell", ids[i], "flag", statusIcon);
				}
			}
			
			function openForm(id){
				url=_ctx+"/sys/role/form/"+(id?id:"");
				top.layer.open({
					type: 2,
					title: (id?"编辑":"新建")+"角色",
					content:url,
					area: ["90%", "90%"],
				    closeBtn : 2,
					end :function(){
						tableObj.trigger("reloadGrid");
					}
					
				});
			}
		</script>
	
	</head>
	
	<body class="">
		<div id="frame">
			<div class="col-xs-12 search-form">
				<form action="" class="form form-inline " id="searchForm" >
					<div class="form-group">
						<input class="form-control input-sm" id="search_name" placeholder="角色名称"/>
					</div>
					<button id="search" type="submit" class="btn btn-info">
						<span class="glyphicon glyphicon-search"></span> 搜索
					</button>
					<a id="newRole" class="btn btn-success">
						<span class="glyphicon glyphicon-plus"></span> 添加
					</a>
				</form>
			</div>
			<div class="col-xs-12 jqgrid-table">
				<table id="dataTable" class=""></table>
				<div id="pager"></div>
			</div>
		</div>
	</body>
</html>