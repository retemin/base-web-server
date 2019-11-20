/**
 * 
 */
var treeObj = null;
var activeNodeId = null;

var treeListData=[];
var officeMap = {};
var selectTreeObj=null;
var vm = new Vue({
	el : "#formFrame",
	data : {},
	computed : {
		"parentIdName" : function() {
			if (officeMap[this.parentId]) {
				return officeMap[this.parentId].name;
			}
			return this.parentId;
		}
	}
});


// 右键部门配置
var rightMenuOption = [ {
	text : "增加子节点",
	click : function(treeNode, treeId, e) {
		vm.$data = {parentId:treeNode.id,pcode:treeNode.type};
		treeObj.closeRightMenu();
	}
}, {
	text : "删除节点",
	click : function(treeNode, treeId, e) {
		removeTreeNode(treeNode);
		treeObj.closeRightMenu();
	}
}, {
	text : "增加顶级节点",
	click : function(treeNode, treeId, e) {
		vm.$data = {};
		treeObj.closeRightMenu();
	}
} ];

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
			idKey : "type",
			pIdKey : "pcode",
			rootPid : "null"
		}
	},
	callback : {
		onClick : function(event, treeId, treeNode) {
			if (treeObj.closeRightMenu) {
				treeObj.closeRightMenu();
			}
			activeNodeId = treeNode.id;
			vm.$data = treeNode;
		},
		onRightClick : function(event, treeId, treeNode) {
			if (treeObj._rightMenu) {
				treeObj._rightMenu.remove();
				treeObj._rightMenu = null;
			}
			var office = rightMenuOption;
			var ul = $("<ul class='dropdown-menu' style='position: absolute;'></ul>");
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


function resizeWindow() {
	$("#iboxFrame>.ibox-content").height(
			$("#iboxFrame").height() - $("#iboxFrame>.ibox-title").height()
					- 50);
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

function reloadTreeData() {

	var loadingIndex = layer.loadingWithText("正在加载列表数据"); // 换了种风格

	$.get(_ctx + "/sys/code/listAll?json", {}, function(msg) {
	
		if (msg.status == "1") {
			treeListData=msg.data;
			treeObj = $.fn.zTree.init($("#treeObj"), treeOption,treeListData);
			//treeObj.expandAll(true);
			for ( var i in msg.data) {
				officeMap[msg.data[i].id] = msg.data[i];
			}
		} else {
			layer.error("加载部门列表失败");
		}
		layer.close(loadingIndex);
	/*	if(onLoad && typeof onLoad=="function"){
			onLoad(treeObj);
		}*/
	});
};

/**
 * 保存表单
 */
function saveForm(){
	var json = JSON.stringify(vm.$data);
	var loadingIndex = layer.loadingWithText("正在保存数据") ;
	$.ajax({
		url : _ctx + "/sys/code/saveUpdate",
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
	layer.confirm('确定要删除【' + treeNode.name + '】?', {
		icon : 3,
		title : '提示'
	}, function(index) {
		$.post(_ctx + "/sys/code/deleteCode/", {id:treeNode.id}, function(result) {
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
					idKey : "type",
					pIdKey : "pcode",
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
		shade:0.2,
		skin: "layui-layer-molv",
		success: function(layero, index){
			$("#selectTreeFrame").data("layerIndex",index);
		}
	});
	//selectTreeObj.expandAll(true);
	
}

$(document).ready(function() {

	resizeWindow();
	reloadTreeData();
	
	$("#selectParent").click(function(e){
		openSelectTree(vm.$data.parentId);
	});
	
	//$("select").select2();

	$("#officeForm").submit(function(e) {
		e.preventDefault();
		saveForm();
	});
	
	$("#confirmSelect").click(function(){
		var index=$("#selectTreeFrame").data("layerIndex");
		var select=selectTreeObj.getSelectedNodes();
		if(select){
			vm.$set("parentId",select[0].id);
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
		vm.$set("parentId",null);
		layer.close(index);
	});
	
	$(document).click(function(event){
		if(!$(event.target).parents(".dropdown-menu").length > 0) {
			treeObj.closeRightMenu();
		}
	});
});
