/**
 * 
 */
var treeObj = null;
var activeNodeId = null;

var treeListData=[];
var areaMap = {};
var selectTreeObj=null;

var vmData={
	data:{},
	canEdit:'true',
	code:{
		typeOptions:[
			{value:'镇街',name:'镇街'},
			{value:'区县',name:'区县'},
			{value:'城市',name:'城市'},
			{value:'省份',name:'省份'},
			{value:'国家',name:'国家'}
		],
		flagOptions:[
			{"name":"是","value":"1"},
			{"name":"否","value":"0"}
		],
	},
	rules:{
		id:{required:true},
		name:{required:true},
	//	parentIdName:{required:true},
		flag:{required:true}
    }
}
var vm = new Vue({
	el : "#areaForm",
	data :vmData,
	computed : {
		"parentIdName" : function() {
			if(vmData.data.parentId){
				if (areaMap[vmData.data.parentId]) {
					return areaMap[vmData.data.parentId].name;
				}
			}
			return '';
		}
	},
	methods:{
		formSubmit:function(){
			saveForm();
		},
		onValid:function(){
        	layer.msg('数据验证不通过，请参照页面提示核对数据是否正确！', {icon: 2});
        }
	}
});


// 右键部门配置
var rightMenuOption = [ {
	text : "增加子节点",
	click : function(treeNode, treeId, e) {
		vm.$set (vmData,'data', {parentId:treeNode.id});
		treeObj.closeRightMenu();
	}
}, {
	text : "删除节点",
	click : function(treeNode, treeId, e) {
		if(treeNode){
			removeTreeNode(treeNode);
		}
		treeObj.closeRightMenu();
	}
}, {
	text : "增加顶级节点",
	click : function(treeNode, treeId, e) {
		vm.$set (vmData,'data', {});
		treeObj.closeRightMenu();
	}
}];

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
			vm.$set(vmData,'data',treeNode);
		},
		onRightClick : function(event, treeId, treeNode) {
			if (treeObj._rightMenu) {
				treeObj._rightMenu.remove();
				treeObj._rightMenu = null;
			}
			var area = rightMenuOption;
			var ul = $("<ul class='dropdown-menu ' style='position: absolute;'></ul>");
			for ( var i in area) {
				var temp = area[i];
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

	$.get(_ctx + "/sys/area/list?json", {}, function(msg) {
	
		if (msg.status == "1") {
			treeListData=msg.data;
			treeObj = $.fn.zTree.init($("#treeObj"), treeOption,treeListData);
			//treeObj.expandAll(true);
			
			var nodes = treeObj.getNodes();
		    for (var i = 0; i < nodes.length; i++) { //设置节点展开
		        treeObj.expandNode(nodes[i], true, false, true);
		    }
			
			for ( var i in msg.data) {
				areaMap[msg.data[i].id] = msg.data[i];
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
	alert("保存表单");
	var json = JSON.stringify(vmData.data);
	var loadingIndex = layer.loadingWithText("正在保存数据") ;
	$.ajax({
		url : _ctx + "/sys/area/save",
		data : json,
		type : "post",
		contentType : "application/json",
		success : function(msg) {
			layer.close(loadingIndex);
			if(msg.status==1){
				//reloadTreeData();
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
	layer.confirm('确定要删除【' + treeNode.name + '】?', {
		icon : 3,
		title : '提示'
	}, function(index) {
		$.post(_ctx + "/sys/area/delete/"+treeNode.id, {}, function(result) {
			if (result.status==1) {
				layer.success("删除成功。");
				reloadTreeData();
			} else {
				layer.error("删除失败。");
			}
		}, "json");
	});
}

function openSelectTree(oldTreeNodeId){
	var option ={
			data : {

				simpleData : {
					enable : true,
					idKey : "id",
					pIdKey : "parentId",
					rootPid : "null"
				}
			}
	}
	selectTreeObj = $.fn.zTree.init($("#selectTreeObj"), option, treeListData);
	
	layer.open({
		type: 1,
		title: "选择所属部门",
		content:$("#selectTreeFrame"),
		area: ['500px', '500px'],
		success: function(layero, index){
			$("#selectTreeFrame").data("layerIndex",index);
		}
	});
	
	var nodes = selectTreeObj.getNodes();
    for (var i = 0; i < nodes.length; i++) { //设置节点展开
    	selectTreeObj.expandNode(nodes[i], true, false, true);
    }
	
	//selectTreeObj.expandAll(true);
	
}

$(document).ready(function() {

	resizeWindow();
	reloadTreeData();
	
	$("#selectParent").click(function(e){
		openSelectTree(vmData.data.parentId);
	});
	
	$("#selectAreaBtn").click(function(){
		$.CommonData.data.areaSelect({
			'onConfirm':function(selectData){
				//console.log(vm.$data);
				vm.$data.areaId=selectData.id;
				vm.$data.areaName=selectData.name;
				
				$("#areaId").val( selectData.id );
				$("#areaName").val( selectData.name );
				
			}
		});
	});
	
	//$("select").select2();

	
	$("#confirmSelect").click(function(){
		var index=$("#selectTreeFrame").data("layerIndex");
		var select=selectTreeObj.getSelectedNodes();
		if(select){
			vm.$set(vmData.data,"parentId",select[0].id);
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
		vm.$set(vmData.data,"parentId",null);
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
				url : _ctx+"/sys/area/bindUsers/"+id,
				data : json,
				type : "post",
				contentType : "application/json",
				success : function(msg) {
					layer.close(loadingIndex);
					if(msg.status==1){
						layer.success("保存成功");
						reloadUserAreaFrame();
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
				url : _ctx+"/sys/area/unBindUsers/"+id,
				data : json,
				type : "post",
				contentType : "application/json",
				success : function(msg) {
					layer.close(loadingIndex);
					if(msg.status==1){
						layer.success("保存成功");
						reloadUserAreaFrame();
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
	
	$("#bindUserBtn").click(function(){
		var id = vm.$data.id;
		if(id){
			initUserAreaFrame(id);
		}else{
			layer.warning("请先保存部门信息");
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
