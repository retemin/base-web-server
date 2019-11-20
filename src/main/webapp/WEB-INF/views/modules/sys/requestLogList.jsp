<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<html>
<head>

<%@ include file="/WEB-INF/views/include/taglib.jsp"%>

<jsp:include page="/WEB-INF/views/include/base-include.jsp">
	<jsp:param name="include" value="base,metronic,layer,jqgrid,jqgridExp" />
</jsp:include>

<title>排污权交易鉴证书查询</title>

<style type="text/css">
	#searchForm {
    	margin-bottom: 3px;
    	margin-left: 3px;
   		margin-top: 5px;
    }
	.ui-jqgrid tr.ui-row-ltr td {
 		 white-space: nowrap;overflow: hidden;text-overflow:ellipsis;
	}
	.ui-jqgrid tr.jqgrow td {
		white-space: normal !important;
		height:auto;
		vertical-align:text-top;
		padding-top:2px;
	}
	body{
		height:100%;
		overflow-x:hidden;
		overflow-y:hidden;
	}
</style>
<script type="text/javascript">
		var tableObj=null;
		
		$(document).ready(function() {
		
			tableObj=$("#dataTable").jqGrid({
			    caption : "日志数据",
			    datatype : "json",
			    url : _ctx+"/sys/requestLog/jqgrid",
			    rowNum : 20,		
			    rowList : [12,30,60],
			    mtype : "get",
			    //height:height,
			    colNames : [
			    	"编号","日志标题","操作人","操作时间","访问IP","请求路径","操作方式","请求参数","操作" 
			    ],
			    colModel : [
			    		 {name: "id",index: "ID",width: 100,align: "center",hidden:true},
			    		 {name: "title",index: "title",width: 70,align: "center",hidden:true},
			    		 {name: "createBy",index: "create_by",width: 60,align: "center",hidden:false},
			    		 {name: "createDate",index: "create_date",width: 95,align: "center",hidden:false},
			    		 {name: "remoteAddr",index: "remote_addr",width: 80,align: "center",hidden:false},
			    		 {name: "requestUri",index: "request_uri",width: 180,align: "left",hidden:false},
			    		 {name: "method",index: "method",width: 50,align: "center",hidden:false,hidden:false},
			    		 {name: "params",index: "params",width: 180,align: "left",hidden:false,hidden:false},
			    		
			    		 {name: "operator",index: "operator",width: 60,align: "center",hidden:true}
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
				sortname:"create_date",
				sortorder:"desc",
				postData:{},// 默认查询待审核数据
				ondblClickRow:function(rowid,iRow,iCol,e){ 
					/* var id = tableObj.jqGrid("getCell",rowid,"id");
					var state = tableObj.jqGrid("getCell",rowid,"state");
					if(state == "待审核"){
						openForm(id);
					}else {
						selectForm(id);
					} */
				}
			});
			
			//初始化加载调整宽度和注册宽度时间
			resizeWindow();
			$(window).on("resize",resizeWindow);
			
			/*查询*/
			$("#searchForm").submit(function(e){
				e.preventDefault();
				var postData={};
				postData["createBy"]=$("#createBy").val();
				postData["remoteAddr"]=$("#remoteAddr").val();
				//postData["params"]=$("#params").val();
				postData["requestUri"]=$("#requestUri").val();
				
				
				tableObj.setGridParam({'postData':postData,page:1});
				tableObj.trigger("reloadGrid");
			});
			
			$("#clear").click(function(){
				$("#searchForm").find(".form-control").each(function(){
					if( this.id=="sheng"||this.id=="shi"||this.id=="qu" ){
					}else{
						$(this).val('').change();
					}
				});
			});
			
		});
		
		/*重新调整jqgrid高度与宽度*/
		function resizeWindow(){
			var height = $(document).height()-$("#searchForm").height()-136;
			tableObj.setGridHeight(height);
		}
		/*替换单元格内容为按钮*/
		function replaceByButton(){
			var ids = tableObj.jqGrid("getDataIDs");
			for (var i = 0; i < ids.length; i++) {
				var id = tableObj.jqGrid("getCell",ids[i],"id");
				var state = tableObj.jqGrid("getCell",ids[i],"state");
				var button="";
				/* if(state == '待审核'){
					button += "<a href='javascript:void(0);' class='text-success' onclick=\"openForm('"+id+"')\">[<span class=\"fa fa-edit\" aria-hidden=\"true\"></span>审核] </a>";
				}else{} */
				button += "<a href='javascript:void(0);' class='text-success' onclick=\"selectForm('"+id+"')\">[<span class=\"fa fa-search\" aria-hidden=\"true\"></span>查看]</a>";
				
				var province = tableObj.jqGrid("getCell",ids[i],"province");
				var city = tableObj.jqGrid("getCell",ids[i],"city");
				var district = tableObj.jqGrid("getCell",ids[i],"district");
				var button1="";
					button1 += province+"&nbsp"+city+"&nbsp"+district;
				
				tableObj.jqGrid("setCell", ids[i], "operator", button);
				tableObj.jqGrid("setCell", ids[i], "operator1", button1);
				
			}
			
		}
		
		/*打开表单*/
		function selectForm(id){
			 top.layer.open({
				  type: 2,
				  title: '查看单位信息',
				  maxmin: true,
				  shadeClose: true, //点击遮罩关闭层 false
				  area : ['90%' , '90%'],
				  //content: "http://127.0.0.1:8081/sxxkz-enterprise/pwxkz/baseinfo/" + id ,
				  content:  enterpriseUrl + "/pwxkz/baseinfo/readonlyForm/" + id ,
				  end:function(){
					  
				  }
			});
		}
		
		function exportExcel(){
			layer.confirm("确定要导出数据？", {
				btn : [ "确定", "取消" ],
				title : "",
				closeBtn : 2
			}, function(index, layero) {
				var createBy=$("#createBy").val();
				var remoteAddr=$("#remoteAddr").val();
				var requestUri=$("#requestUri").val();
				window.location.href=_ctx+"/sys/menuLog/export?createBy="+createBy+"&remoteAddr="+remoteAddr+"&requestUri="+requestUri;
				layer.close(index);
			});
		}
		
	</script>

</head>


<body class="">
			<div class="col-xs-12 search-form">
				 <form action="" class="form form-inline " id="searchForm" >
					<div class="form-group">
						<input class="form-control input-sm" id="createBy"  name="createBy" AUTOCOMPLETE="off" placeholder="操作人"/>
					</div>
					<div class="form-group">
						<input class="form-control input-sm" id="remoteAddr"  name="remoteAddr" AUTOCOMPLETE="off" placeholder="访问IP"/>
					</div>
					<div class="form-group">
						<input class="form-control input-sm" id="requestUri"  name="requestUri" AUTOCOMPLETE="off" placeholder="请求路径"/>
					</div>
					
					<button id="search" type="submit" class="btn btn-info ">
						<span class="glyphicon glyphicon-search"></span> 搜索
					</button>
					<button id="clear" type="button" class="btn btn-primary"><i class="fa fa-repeat dist_r"></i>清空</button>
				</form> 
		</div>
		<div class="col-xs-12 ">
			<div class="jqGrid_wrapper">
				<table id="dataTable" class=""></table>
				<div id="pager"></div>
			</div>
		</div>	
	
		
	</body>
</html>