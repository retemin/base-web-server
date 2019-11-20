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
				tableObj=$("#dataTable").jqGrid({
				    datatype : "json",
				    url :"${ctx}/sys/mobile/jqgrid",
				    rowNum : _rowNum,		
				    rowList : _rowList,
				    mtype : "get",
				    //height:height,
				    colNames : [
				    	"主键","移动端操作系统","移动端名称","版本号","上传更新时间","上传更新人","下载","更新内容","操作" 
				    ],
				    colModel : [
						{name: "id",index: "ID",hidden:true},
				    	{name: "systemCode",index: "SYSTEM_CODE",width: 140,align: "center",
							formatter:function(cellvalue, options, rowObject){
								if(cellvalue=="Android")
									return "安卓";
								if(cellvalue=="IOS")
									return "IOS";
								return "其他";
							}
						},
				    	{name: "mobileName",index: "MOBILE_NAME",width: 140,align: "center",hidden:false},
				    	{name: "version",index: "VERSION",width: 140,align: "center",hidden:false},
				    	{name: "uploadTime",index: "UPLOAD_TIME",width: 140,align: "center",hidden:true},
				    	{name: "uploadUser",index: "UPLOAD_USER",width: 140,align: "center",hidden:false},
				    	{name: "savePath",index: "SAVE_PATH",width: 140,align: "center",hidden:true},
				    	{name: "content",index: "CONTENT",width: 140,align: "center",hidden:true},
				    	{name: "operator",index: "operator",width: 140,align: "center",
							formatter:function(cellvalue, options, rowObject){
								var pkid = rowObject.id;
								var name = rowObject.mobileName;
								var systemCode = rowObject.systemCode;
								var button = "<a href='javascript:void(0);' class='text-success' onclick=\"openForm('"+pkid+"')\" title='修改'>[ <i class='fa fa-edit'></i> ] </a>";
								button += "<a href='javascript:void(0);' class='text-danger' onclick=\"deleteItem('"+pkid+"','"+name+"')\" title='删除'>[ <i class='fa fa-trash'></i> ] </a>";
								if(systemCode=="Android"){
									button += "<a href='"+_ctx+"/sys/mobile/download/"+pkid+"' class='text-danger' target='_parent' title='下载'>[ <i class='fa fa-cloud-download'></i> ] </a>";
								}
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
					sortname:"upload_Time",
					sortorder:"desc",
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
						$.post(_ctx+"/sys/mobile/delete/"+itemId,{},function(msg){
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

			/*打开表单*/
			function openForm(id){
				url=_ctx+"/sys/mobile/form/"+(id?id:"");
				top.layer.open({
					type: 2,
					title: (id?"编辑":"新建")+"",
					content:url,
					area: ["1024px", "412px"],
			   		zIndex: layer.zIndex, //多窗口模式，层叠打开
			    	success: function(layero){
			        	top.layer.setTop(layero);
			        },
					end :function(){
						tableObj.trigger("reloadGrid");
					}
					
				});
			}
			
		</script>
	</head>
	
	<body class="">
		<div class="search-form">
			<form action="" class="form form-inline" id="searchForm" >
				<input name="mobileName" class="form-control input-sm" placeholder="移动端名称" AUTOCOMPLETE="off">
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