/**
 * 
 */
var treeObj = null;
var activeNodeId = null;

var treeListData=[];
var officeMap = {};
var selectTreeObj=null;

var vmData={
	data:{
		id:''
	}
};

var vm = new Vue({
	el : "#formFrame",
	data :vmData,
	methods:{
		//选择所属部门
		selectParent:function(){
			$.CommonData.data.officeSelect({
				onConfirm:function(data,_contentWindow){
					Vue.set(vmData.data,'parentId',data.id);
					Vue.set(vmData,'parentIdName',data.name);
				}
			});s
		},
		//选择区域
		selectArea:function(){
			$.CommonData.data.areaSelect({
				'onConfirm':function(selectData){
					Vue.set(vmData.data,'areaId',selectData.id);
					Vue.set(vmData.data,'areaName',selectData.name);
				}
			});
		},
		//绑定用户
		bindUser:function(){
			var id = this.data.id;
			if(id){
				initUserOfficeFrame(id);
			}else{
				layer.warning("请先保存部门信息");
			}
		}
	},
	computed : {
		"parentIdName" : function() {
			if (officeMap[this.data.parentId]) {
				return officeMap[this.data.parentId].name;
			}
			return this.data.parentId;
		}
	}
});


// 右键部门配置
var rightMenuOption = [ 
	{
		text : "增加子节点",
		click : function(treeNode, treeId, e) {
			vmData.data = {id:'',parentId:treeNode.id};
			treeObj.closeRightMenu();
		}
	}, 
	{
		text : "删除节点",
		click : function(treeNode, treeId, e) {
			if(treeNode){
				removeTreeNode(treeNode);
			}
			treeObj.closeRightMenu();
		}
	}, 
	{
		text : "增加顶级节点",
		click : function(treeNode, treeId, e) {
			vmData.data = {};
			treeObj.closeRightMenu();
		}
	},
	{
		text : "绑定用户",
		click : function(treeNode, treeId, e) {
			treeObj.closeRightMenu();
			initUserOfficeFrame(treeNode.id);
		}
	}
];

// 树选项配置
var treeOption = {
/*	edit : {
		enable : true,
		showRenameBtn : false,
		renameTitle : "修改",
		showRemoveBtn : true,
		removeTitle : "删除",
	},*/
	view : {
		selectedMulti : false,
		showIcon : true,
		showLine : true
	},
	data : {

		simpleData : {
			enable : true,
			idKey : "id",
			pIdKey : "parentId",
			rootPid : "null"
		}
	},
	callback : {
		onClick : function(event, treeId, treeNode) {
			if (treeObj.closeRightMenu) {
				treeObj.closeRightMenu();
			}
			activeNodeId = treeNode.id;
			vmData.data = treeNode;
		},
		onRightClick : function(event, treeId, treeNode) {
			if (treeObj._rightMenu) {
				treeObj._rightMenu.remove();
				treeObj._rightMenu = null;
			}
			var office = rightMenuOption;
			var ul = $("<ul class='dropdown-menu ' style='position: absolute;'></ul>");
			for ( var i in office) {
				var temp = office[i];
				var li = $("<li></li>");
				var a = $("<a href='javascript:void(0)'></a>");
				a.text(temp.text);
				if (temp.attrs) {
					for ( var key in temp.attrs) {
						a.attr(key, temp.attrs[key]);
					}
				}
				var onClieckFunction= temp.click;
				a.on("click", {
					'treeNode' : treeNode,
					'treeId' : treeId,
					'option':temp
				}, function(e) {
					if (e.data.option.click && typeof e.data.option.click == "function")
						e.data.option.click(e.data.treeNode, e.data.treeId,e.data.option, e);
				});

				li.append(a);
				ul.append(li);
				$("body").append(ul);
				treeObj._rightMenu = ul;
				if (!treeObj.closeRightMenu) {
					treeObj.closeRightMenu = function() {
						if (treeObj._rightMenu) {
							treeObj._rightMenu.remove();
						}
					}
				}

			}

			var top=event.clientY;
			var left=event.clientX;
			if(event.clientY+ul.height()>$(window).height()){
				top=top-ul.height();
			}
			treeObj._rightMenu.css({
				"top" : top + "px",
				"left" : left + "px"
			});
			treeObj._rightMenu.show();
		}
	}
};

function initUserOfficeFrame(id){
	layer.open({
		type: 1,
		title: ["绑定用户","font-size:18px"],
		content:$("#userOfficeFrame"),
		area: ['80%', '80%'],
		success: function(layero, index){
			//$("#selectTreeFrame").data("layerIndex",index);
			initUserOfficeGrid(id,$("#bindList"),_ctx+"/sys/office/bindUserList/"+id+"?jqgrid","已绑定用户","bindListPager",{});
			$("#bindList").data("id",id);
			initUserOfficeGrid(id,$("#unbindList"),_ctx+"/sys/office/unBindUserList/"+id+"?jqgrid","未绑定用户","unbindListPager",{type:'2'});
		}
	});
	
}

function reloadUserOfficeFrame(){
	$("#unbindList").trigger("reloadGrid");
	$("#bindList").trigger("reloadGrid");
}

function initUserOfficeGrid(id,tableObj,url,caption,pager,postData){
	if(tableObj.data("isGrid")!=undefined){
		tableObj.setGridParam({'url':url,page:1});
		tableObj.trigger("reloadGrid");
		return ;
	}
	$.jgrid.defaults.styleUI = "Bootstrap";
	
	tableObj.jqGrid({
	    caption : caption,
	    datatype : "json",
	    url:url,
	    //url : _ctx+"/sys/office/unbindList/"+id+"?jqgrid",
	    rowList : [10, 20, 30, 100],
	    mtype : "get",
	    multiselect: true,
	    colNames : ["登录名", "用户名"],
	    colModel : [
	        {name: "id",index: "id",width: 120,hidden: true},
	        {name: "name",index: "name",align: "center",width: 120},
	        //{name: "remark",index: "remark",align: "center",width: 200},
	    ],
	    pager : pager,
	    autowidth: true,
	    shrinkToFit: true,
	    rowNum: 20,
	    viewrecords: true,
	    rownumbers : true,
	    hidegrid: true,
	    loadComplete : function(xhr){
			
		},
		postData:{},
		//双击进入[修改]
		ondblClickRow:function(rowid,iRow,iCol,e){ 
			
		},
		sortname:'id'
	});
	
	
	
	var height = $("#userOfficeFrame").height()-180;
	var width=$("#unbindListGridFrame").width();
	tableObj.setGridHeight(height);
	tableObj.setGridWidth(width);
	
	tableObj.data("isGrid","1");
	tableObj.data("id",id);
}

function resizeWindow() {
	$("#iboxFrame>.ibox-content").height($("#iboxFrame").height() - $("#iboxFrame>.ibox-title").height()- 60);
}

function clickNode(id) {
	if (treeObj) {
		var node = treeObj.getNodeByParam("id", id);
		if (node) {
			//node.click();
			//treeObj.checkNode(node, false, true);
			$("#"+node.tId+"_span").click();
		}
	}
}

function reloadTreeData(onLoad) {

	var loadingIndex = layer.loadingWithText("正在加载列表数据") // 换了种风格

	$.get(_ctx + "/sys/office/list?json", {}, function(msg) {
	
		if (msg.status == "1") {
			treeListData=msg.data;
			treeObj = $.fn.zTree.init($("#treeObj"), treeOption,treeListData);
			//treeObj.expandAll(true);
			
			var nodes = treeObj.getNodes();
		    for (var i = 0; i < nodes.length; i++) { //设置节点展开
		        treeObj.expandNode(nodes[i], true, false, true);
		    }
			
			for ( var i in msg.data) {
				officeMap[msg.data[i].id] = msg.data[i];
			}
		} else {
			layer.error("加载部门列表失败");
		}
		layer.close(loadingIndex);
		if(onLoad && typeof onLoad=="function"){
			onLoad(treeObj);
		}
	});
};

/**
 * 保存表单
 */
function saveForm(){
	var json = JSON.stringify(vmData.data);
	var loadingIndex = layer.loadingWithText("正在保存数据") ;
	$.ajax({
		url : _ctx + "/sys/office/save",
		data : json,
		type : "post",
		contentType : "application/json",
		success : function(msg) {
			layer.close(loadingIndex);
			if(msg.status==1){
				reloadTreeData(function(){
					var node = treeObj.getNodeByParam("id", msg.data);
					if (node) {
						$("#"+node.tId+"_span").click();
						//等待tree完全打开
						setTimeout(function(){
							$("#treeFrame").scrollTop($("#"+node.tId+"_span").offset().top);
							console.log($("#treeFrame").scrollTop());
						},200);
					}
					
				});
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

/**
 * 删除选中节点
 */
function removeTreeNode(treeNode) {
	console.log(treeNode)
	layer.confirm('确定要删除【' + treeNode.name + '】?', {
		icon : 3,
		title : '提示'
	}, function(index) {
		$.post(_ctx + "/sys/office/delete/"+treeNode.id, {}, function(result) {
			if (result.status==1) {
				layer.success("删除成功。");
				reloadTreeData();
			} else {
				layer.error("删除失败。");
			}
		}, "json");
	});
}

$(document).ready(function() {

	resizeWindow();
	reloadTreeData();
	
	$("#officeForm").submit(function(e) {
		e.preventDefault();
		saveForm();
	});
	
	$("#confirmSelect").click(function(){
		var index=$("#selectTreeFrame").data("layerIndex");
		var select=selectTreeObj.getSelectedNodes();
		if(select){
			vmData.data.parentId=select[0].id;
			layer.close(index);
		}else{
			layer.alert("请选择一个节点作为父节点");
		}
	});
	
	$("#cancelSelect").click(function(){
		var index=$("#selectTreeFrame").data("layerIndex");
		layer.close(index);
	});
	
	$("#topNode").click(function(){
		var index=$("#selectTreeFrame").data("layerIndex");
		vmData.data.parentId=null;
		layer.close(index);
	});
	
	
	$("#bindUser").click(function(){
		var id=$("#bindList").data("id");
		var tableObj=$("#unbindList");
		var rowIds = tableObj.jqGrid('getGridParam', 'selarrrow'); 
		if(id&&rowIds&&rowIds.length>0){
			var loadingIndex = layer.loadingWithText("正在保存用户部门信息") ;
			var userList=[];
			for(var i in rowIds){
				var userId = tableObj.jqGrid("getCell",rowIds[i],"id");
				userList.push(userId);
			}
			var json=JSON.stringify(userList);
			$.ajax({
				url : _ctx+"/sys/office/bindUsers/"+id,
				data : json,
				type : "post",
				contentType : "application/json",
				success : function(msg) {
					layer.close(loadingIndex);
					if(msg.status==1){
						layer.success("保存成功");
						reloadUserOfficeFrame();
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
		
	});
	
	
	$("#unbindUser").click(function(){
		var id=$("#unbindList").data("id");
		var tableObj=$("#bindList");
		var rowIds = tableObj.jqGrid('getGridParam', 'selarrrow'); 
		if(id&&rowIds&&rowIds.length>0){
			var loadingIndex = layer.loadingWithText("正在保存用户部门信息") ;
			var userList=[];
			for(var i in rowIds){
				var userId = tableObj.jqGrid("getCell",rowIds[i],"id");
				userList.push(userId);
			}
			var json=JSON.stringify(userList);
			$.ajax({
				url : _ctx+"/sys/office/unBindUsers/"+id,
				data : json,
				type : "post",
				contentType : "application/json",
				success : function(msg) {
					layer.close(loadingIndex);
					if(msg.status==1){
						layer.success("保存成功");
						reloadUserOfficeFrame();
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
	});

	
		
	$("#unBindSearchForm").submit(function(e){
		e.preventDefault();
		var tableObj=$("#unbindList");
		var name=$(this).find("input[name='name']").val();
		var type=$(this).find("select[name='type']").val();
		tableObj.setGridParam({postData:{'name':name,'type':type},page:1});
		tableObj.trigger("reloadGrid");
	});
	
	$("#bindSearchForm").submit(function(e){
		e.preventDefault();
		var tableObj=$("#bindList");
		var name=$(this).find("input[name='name']").val();
		tableObj.setGridParam({postData:{'name':name},page:1});
		tableObj.trigger("reloadGrid");
	});
	
});
