<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<html>
	<head>
		<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
		<jsp:include page="/WEB-INF/views/include/base-include.jsp">
			<jsp:param name="include"  value="base,metronic,layer,jqgrid" />
		</jsp:include>
		<title>列表</title>
		
		<style type="text/css">
			#searchForm {
		    	margin-bottom: 3px;
		    	margin-left: 3px;
		   		margin-top: 5px;
		    }
			.ui-jqgrid tr.ui-row-ltr td {
		 		 white-space: nowrap;overflow: hidden;text-overflow:ellipsis;
			}
		</style>
		
		<script type="text/javascript">
			var tableObj=null;
			$(document).ready(function() {
				initModuleSelect();
				tableObj=$("#dataTable").jqGrid({
				    datatype : "json",
				    url :"${ctx}/sys/config/jqgrid",
				    rowNum : _rowNum,		
				    rowList : _rowList,
				    mtype : "get",
				    //height:height,
				    colNames : [
				    	"主键","模块","类型","名称","值","父元素","是否可用","备注","删除标记1是0否","操作" 
				    ],
				    colModel : [
						{name: "id",index: "ID",hidden:true},
				    	{name: "module",index: "MODULE",width: 140,align: "center",hidden:true},
				    	{name: "type",index: "TYPE",width: 140,align: "center",hidden:false},
				    	{name: "name",index: "NAME",width: 140,align: "center",hidden:false},
				    	{name: "value",index: "VALUE",width: 140,align: "center",hidden:false},
				    	{name: "parentId",index: "PARENT_ID",width: 140,align: "center",hidden:true},
				    	{name: "flag",index: "FLAG",width: 140,align: "center",hidden:false},
				    	{name: "remark",index: "REMARK",width: 140,align: "center",hidden:false},
				    	{name: "deleteFlag",index: "DELETE_FLAG",width: 140,align: "center",hidden:true},
				    	{name: "operator",index: "operator",width: 140,align: "center",
							formatter:function(cellvalue, options, rowObject){
								var pkid = rowObject.id;
								var name = rowObject.name;
								var flag = rowObject.flag;
								var button = "<a href='javascript:void(0);' class='text-success' onclick=\"openForm('"+pkid+"')\" title='修改'>[ <span class=\"fa fa-edit\" aria-hidden=\"true\"></span> ] </a>";
								if(flag=="1"){
									button += "<a href='javascript:void(0);' class='text-warning' onclick=\"updateFlag('"+pkid+"','"+name+"',0)\" title='禁用'>[ <span class=\"fa fa-ban\" aria-hidden=\"true\"></span> ] </a>";
								}else{
									button += "<a href='javascript:void(0);' class='text-primary' onclick=\"updateFlag('"+pkid+"','"+name+"',1)\" title='启用'>[ <span class=\"fa fa-check-circle-o\" aria-hidden=\"true\"></span> ] </a>";
								}
								button += "<a href='javascript:void(0);' class='text-danger' onclick=\"deleteItem('"+pkid+"','"+name+"')\" title='删除'>[ <span class=\"fa fa-trash\" aria-hidden=\"true\"></span> ] </a>";
								return button;
				    		}
				    	}
				    ],
				    pager : "#pager",
				    autowidth: true,
				    shrinkToFit: true,
				    viewrecords: true,
				    rownumbers : true,
				    hidegrid: true,
				    loadComplete : function(xhr){
				    	replaceByButton();
					},
					sortname:"type,sort",
					sortorder:"asc",
					postData:$("#searchForm").serializeObject(),
					ondblClickRow:function(rowid,iRow,iCol,e){ 
						var pkid = tableObj.jqGrid("getCell",rowid,"id");
						openForm(pkid);
					}
				});
				
				//初始化加载调整宽度和注册宽度时间
				resizeWindow();
				$(window).on("resize",resizeWindow);
				
				//给序号列设置标题
				tableObj.jqGrid('setLabel','rn', '序号', {'text-align':'center','color':'#7e91e6','font-size':'14px','font-family':'微软雅黑, Arial, Helvetica, sans-serif'},'');
				
				/*查询*/
				$("#searchForm").submit(function(e){
					e.preventDefault();
					var postData=$("#searchForm").serializeObject();
					console.log(postData);
					tableObj.setGridParam({'postData':postData,page:1});
					tableObj.trigger("reloadGrid");
				});
				
				/*新建记录*/
				$("#newRecord").click(function(){
					openForm();
				});
				
				/*刷新*/
				$("#refresh").click(function(){
					tableObj.trigger("reloadGrid");
				});
			});
			
			/*重新调整jqgrid高度与宽度*/
			function resizeWindow(){
				var height = $(document).height()-$("#searchForm").height()-126;
				tableObj.setGridHeight(height);
			}
			
			/*删除记录*/
			function deleteItem(itemId,name){
				layer.confirm("确定删除:<span class='text-success'>"+name+"</span>?<p class='text-danger' >(删除后将无法恢复)<p>",
					function(index){
						layer.close(index);
						var loadingIndex=layer.loadingWithText("正在提交数据");
						$.post(_ctx+"/sys/config/deleteByPkid/"+itemId,{},function(msg){
							layer.close(loadingIndex);
							if(msg.data==1){
								layer.success("已经成功删除:"+name);
								tableObj.trigger("reloadGrid");
							}else{
								layer.error("删除失败："+msg.message);
							}
						});
					}
				);
			}
			
			/*替换单元格内容为按钮*/
			function replaceByButton(){
				var ids = tableObj.jqGrid("getDataIDs");
				for (var i = 0; i < ids.length; i++) {
					var pkid = tableObj.jqGrid("getCell",ids[i],"id");
					var name = tableObj.jqGrid("getCell",ids[i],"name");
					var flag = tableObj.jqGrid("getCell",ids[i],"flag");
					var statusIcon="<i class=\"fa fa-"+(flag==1?"check-circle text-primary":"minus-circle text-warning")+"\"></i>";
					tableObj.jqGrid("setCell", ids[i], "flag", statusIcon);
				}
			}
			
			/*是否启用*/
			function updateFlag(itemId,name,flag){
				var opName=flag==1?"启用":"禁用";
				layer.confirm("确定"+opName+"配置："+name+"?",function(index){
					layer.close(index);
					var loadingIndex=layer.loadingWithText("正在提交数据");
					$.post(_ctx+"/sys/config/updateFlag/"+itemId,{'flag':flag},function(msg){
						layer.close(loadingIndex);
						if(msg.status==1){
							layer.success("已经成功"+opName+"配置："+name);
							tableObj.trigger("reloadGrid");
						}else{
							layer.error(opName+"配置失败："+msg.message);
						}
					});
				});
				
			}
			
			/*打开表单*/
			function openForm(id){
				url=_ctx+"/sys/config/formPage/"+(id?id:"");
				top.layer.open({
					type: 2,
					title: (id?"编辑":"新建")+"公用代码",
					content:url,
					area: ["1024px", "350px"],
			   		zIndex: layer.zIndex, //多窗口模式，层叠打开
			    	success: function(layero){
			        	top.layer.setTop(layero);
			        },
					end :function(){
						tableObj.trigger("reloadGrid");
					}
					
				});
			}
			
			function initModuleSelect(){
				$("#module").append("<option value=''>**请选择**</option>");
				$.ajax({
					url:_ctx+"/sys/config/module",
					async:false,
					method:"POST",
					success:function(msg){
						if(msg.status=="1"){
							for(var i in msg.data){
								var module = msg.data[i];
								$("#module").append("<option value='"+module.CODE+"'>"+module.NAME+"</option>");
							}
						}
					}
				});
			}
			
			function changeModule(){
				var module = $("#module").val();
				$("#type").html("");
				$("#type").append("<option value=''>**请选择**</option>");
				$.ajax({
					url:_ctx+"/sys/config/type",
					data:{
						"module":module
					},
					async:false,
					method:"POST",
					success:function(msg){
						if(msg.status=="1"){
							for(var i in msg.data){
								var type = msg.data[i];
								$("#type").append("<option value='"+type.CODE+"'>"+type.NAME+"</option>");
							}
						}
					}
				});
			}
		</script>
	</head>
	
	<body class="">
		<div class="search-form">
			<form action="" class="form form-inline" id="searchForm" >
				<input name="module" class="form-control input-sm" placeholder="模块" AUTOCOMPLETE="off">
				<input name="type" class="form-control input-sm" placeholder="类型" AUTOCOMPLETE="off">
				<input name="deleteFlag" type="hidden" value="0" placeholder="是否删除" AUTOCOMPLETE="off">
				<input name="name" class="form-control input-sm" placeholder="名称" AUTOCOMPLETE="off">
				<button id="search" type="submit" class="btn btn-outline btn-info">
					<span class="glyphicon glyphicon-search"></span>&nbsp;&nbsp;搜索
				</button>
				<a id="newRecord" class="btn btn-outline btn-success">
					<span class="glyphicon glyphicon-plus"></span>&nbsp;&nbsp;添加
				</a>
				<button id="refresh" type="button" class="btn btn-outline btn-warning">
					<span class="glyphicon glyphicon-refresh"></span>&nbsp;&nbsp;刷新
				</button>
			</form>
		</div>
		<div class="jqGrid_wrapper jqgrid-table">
			<table id="dataTable" class=""></table>
			<div id="pager"></div>
		</div>
	</body>
</html>