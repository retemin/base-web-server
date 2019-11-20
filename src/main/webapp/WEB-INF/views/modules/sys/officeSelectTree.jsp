<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<html>
<head>

<%@ include file="/WEB-INF/views/include/taglib.jsp"%>

<jsp:include page="/WEB-INF/views/include/base-include.jsp">
	<jsp:param name="include"
		value="base,metronic,vuejs2,layer,ztree" />
</jsp:include>
<style type="text/css">
form {
	margin-top: 15px;
}
</style>
</head>

<body class="">
	<div class="col-sm-12 ">
		<div class="ztree" id="treeObj"></div>
	</div>
</body>
<script type="text/javascript">
	var officeId_="${officeId}";
	var dataOption={
			url:_ctx + "/sys/office/availableListData?json",
			param:{},
			getUrl:function(){
				if(!this.url.indexOf('?')>0){
					this.url+='?';
				}
				for(var key in this.param){
					var value=this.param[key];
					if(value)
						this.url+=+"&"+key+"="+value;
				}

				return encodeURI(this.url);
			}
	};
	
	function reloadUserTree() {
		var treeOption = {
			data : {
				simpleData : {
					enable : true,
					idKey : "id",
					pIdKey : "parentId",
					rootPid : "null"
				}
			},
			view:{
				selectedMulti:false
			}
		}

		//var loadingIndex = layer.loadingWithText("正在加载列表数据") // 换了种风格

		$.get( dataOption.getUrl(), {}, function(msg) {
			if (msg.status == "1") {
				treeListData = msg.data;
				treeObj = $.fn.zTree.init($("#treeObj"), treeOption,
						treeListData);
				treeObj.expandAll(true);
				
				var nodes = treeObj.getNodes();
			    for (var i = 0; i < nodes.length; i++) { //设置节点展开
			        treeObj.expandNode(nodes[i], true, false, true);
			    }
			    
			    // 根据Id查找数据
			    if(  officeId_!=null && officeId_!="" && officeId_!="undefined"){
			    	// 选中当前节点
					var node = treeObj.getNodeByParam("id", officeId_, null);
					// 选中父节点
			    	var nodeParent = treeObj.getNodeByParam("id", node.parentId, null);
					
					treeObj.selectNode(nodeParent,true);//指定选中ID的节点
					treeObj.expandNode(nodeParent, true, false);//指定选中ID节点展开  
					treeObj.selectNode(node,true);//指定选中ID的节点
				}

				/* for ( var i in msg.data) {
					officeMap[msg.data[i].id] = msg.data[i];
				} */
			} else {
				layer.error("加载部门列表失败");
			}
			layer.close(loadingIndex);

		});
	}
	$(document).ready(function() {
		reloadUserTree();
	});

	function getSelected() {
		//console.log(treeObj.setting.view.selectedMulti);
		if (!treeObj.setting.view.selectedMulti) {
			var nodes = treeObj.getSelectedNodes();
			if (nodes.length > 0) {
				return nodes[0];
			} else {
				return null;
			}
		} else {
			var nodes = treeObj.getCheckedNodes(true);
			return nodes;
		}
	}
</script>
</html>