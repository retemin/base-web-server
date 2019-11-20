/**
 * 
 */
var treeObj = null;
var activeNodeId = null;

var treeListData=[];
var menuMap = {};
var selectTreeObj=null;

var vmData={
	data:{
		id:'',
		icon:''
	},
	canEdit:'true',
	code:{
		flagOptions:[{"name":"否","value":"0"},{"name":"是","value":"1"}],
		scopeOptions:[],
		typeOptions:[{"name":"移动端菜单","value":"0"},{"name":"网页菜单","value":"1"}],
		iconImgs:[
			"与新车数据分析.png","业务系统对接.png","交通流量统计.png","办结业务.png",
			"在用车数据分析.png","外埠车辆管理.png","已办业务.png","待办业务.png","数据质量列表.png",
			"数据质量规则库.png","点位基本信息.png","组12.png","组13.png","组14.png","组15.png",
			"超标信息交换.png","超标预计功能.png","通知公告.png","遥感监测数据.png","遥感监测查询.png",
			"遥感监测统计.png","遥测设备对接.png","高排车辆报警.png"
		]
	},
	iconImgBasePath:_ctx+'/static/modules/main/images/menu-icon/',
	selectedIconImg:"",
	queryParam:{}
}

var vm = new Vue({
	el : "#frame",
	data : vmData,
	computed : {
		"parentIdName" : function() {
			if (menuMap[this.data.parentId]) {
				return menuMap[this.data.parentId].name;
			}
			return '';
		}
	},
	methods:{
		showUrlIcon:function(){
			var url=this.data.iconUrl;
			url=url.startWith("http://")?url:_ctx+url;
			top.layer.open({
			      type: 2,
			      title: '图片预览',
			      shadeClose: true,
			      shade: false,
			      maxmin: true, //开启最大化最小化按钮
			      area: ['893px', '600px'],
				  content: [url, 'no'] //iframe的url，no代表不显示滚动条
			});
		},
		selectMenuIcon:function(){
			var _this = this;
			layer.open({
				type:1,
				title: '选择菜单图标',
				shadeClose: true,
				shade: [0.6, '#393D49'],
				area: ['80%', '80%'],
				content: $("#icon-images"),
				btn:["确定","取消"],
				yes:function(index){
					if(this.selectedIconImg!=""){
						Vue.set(_this.data,"iconUrl",_this.selectedIconImg);
					}
					layer.close(index);
				}
			});
		},
		selectThisMenuIcon:function(img){
			this.selectedIconImg = img;
		}
	},
	watch:{
		'queryParam.scope':function(){
			reloadTreeData();
		}
	}
});


// 右键菜单配置
var rightMenuOption = [ {
	text : "增加子节点",
	click : function(treeNode, treeId, e) {
		vm.$set (vmData,'data', {parentId:treeNode.id,isNet:"1",isShow:"1",flag:"1",type:"1",sort:30,scope:treeNode.scope});
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
		vm.$set (vmData,'data', {isNet:"1",isShow:"1",flag:"1",type:"1",sort:30,scope:vmData.code.scopeOptions[0].value});
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
			var menu = rightMenuOption;
			var ul = $("<ul class='dropdown-menu ' style='position: absolute;'></ul>");
			for ( var i in menu) {
				var temp = menu[i];
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
	$("#iboxFrame>.ibox-content").height($("#iboxFrame").height() - $("#iboxFrame>.ibox-title").height()- 50);
}


function reloadTreeData(onLoad) {

	var loadingIndex = layer.loadingWithText("正在加载列表数据") // 换了种风格

	$.get(_ctx + "/sys/menu/list?json", {scope:vmData.queryParam.scope}, function(msg) {
	
		if (msg.status == "1") {
			treeListData=msg.data;
			treeObj = $.fn.zTree.init($("#treeObj"), treeOption,treeListData);
			treeObj.expandAll(true);
			for ( var i in msg.data) {
				menuMap[msg.data[i].id] = msg.data[i];
			}
		} else {
			layer.error("加载菜单列表失败");
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
		url : _ctx + "/sys/menu/save",
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
		$.post(_ctx + "/sys/menu/delete/"+treeNode.id, {}, function(result) {
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
		title: "选择父节点",
		content:$("#selectTreeFrame"),
		area: ['500px', '500px'],
		success: function(layero, index){
			$("#selectTreeFrame").data("layerIndex",index);
		}

	});
	//selectTreeObj.expandAll(true);
	
}
function initCode(){
	vmData.code.scopeOptions=$.ConfigCodeUtil.getConfig('system','menuScope');
}

$(document).ready(function() {

	resizeWindow();
	initCode();
	reloadTreeData();
	
	$("#selectParent").click(function(e){
		openSelectTree(vm.$data.parentId);
	});
	
	//$("select").select2();

	$("#menuForm").submit(function(e) {
		e.preventDefault();
		saveForm();
	});
	
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
});

function selectIcon(){
	top.layer.open({
		type: 2,
		title: "选择图标",
		content:_ctx+"/sys/menu/menuIconPage",
		area: ['80%', '90%'],
		btn: ['确定','取消'],
		yes: function(index, layero){
			var iconClass = layero.find('iframe')[0].contentWindow.getSelectIcon();
			if(iconClass!=""){
				vm.$set(vmData.data,'icon',iconClass);
			}
			top.layer.close(index);
		}
	});
}
