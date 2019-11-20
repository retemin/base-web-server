<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<html>
<head>

<%@ include file="/WEB-INF/views/include/taglib.jsp"%>

<jsp:include page="/WEB-INF/views/include/base-include.jsp">
	<jsp:param name="include" value="base,Hplus,vuejs,ztree" />
</jsp:include>
<style type="text/css">
	form{
		margin-top:15px;
	}
	.row{
	    margin-left: 12px;
	}
</style>
</head>

<body class="">
	<div class="row">
		<div class="col-sm-12 ">
			<div class="ztree" id="userTree"></div>
		</div>
	</div>
</body>
<script type="text/javascript">
	var treeObj=null;
	$(document).ready(function(){
		reloadUserTree();
	});
	function reloadUserTree(){
		var treeOption ={
				check: {
					enable: true,
					chkStyle: "checkbox",
					chkboxType: { "Y": "ps", "N": "ps" }
				},
				data : {
					simpleData : {
						enable : true,
						idKey: "id",
						pIdKey: "parentId"
					}
				}
		}
		
		$.get(_ctx + "/sys/user/selectTreeData", {'department':""}, function(msg) {
			console.log(msg);
			if (msg.status == "1") {
				//treeListData=JSON.stringify(msg.data);
				//console.log(treeListData);
				for(var i in msg){
	  	  			var item=msg[i];
	  	  			    item['icon']="${ctxStatic}/plugin/jquery-ztree/3.5.12/css/zTreeStyle/img/diy/user-man-icon.png";
	  	  				item['iconClose']="${ctxStatic}/plugin/jquery-ztree/3.5.12/css/zTreeStyle/img/diy/1_open.png";
	  	  				item['iconOpen']="${ctxStatic}/plugin/jquery-ztree/3.5.12/css/zTreeStyle/img/diy/1_close.png";
	  	  				item['icon']="${ctxStatic}/plugin/jquery-ztree/3.5.12/css/zTreeStyle/img/diy/1_close.png";
	  	  		}

				treeObj = $.fn.zTree.init($("#userTree"), treeOption,msg.data);
				$(document).trigger("initComplete");
				//treeObj.expandAll(true);
			} else {
				layer.error("加载菜单列表失败");
			}
			
		});
	}
	
	function getSelected(){
		
		
		if(!treeObj.setting.view.selectedMulti){
			var nodes = treeObj.getSelectedNodes();
			if(nodes.length>0){
				return nodes[0];
			}else{
				return null;
			}
		}else{
			var nodes = treeObj.getCheckedNodes(true);
			return nodes;
		}
		
	}
</script>
</html>