


var vm = new Vue({
	el : "#mainFrame",
	data : {
		ctx : _ctx,
		menuList:[],
		activeTopMenu:{},
		activeLeftMenu:{},
		iconImgBasePath:_ctx+'/static/modules/main/images/menu-icon/',
		status:{
			theme:'primary'
		}
	},
	methods : {
		'init' : function() {
			console.log(this.menuList.length);
			if(this.menuList){
				var firtMenuItem = null;
				if(this.menuList.length>0) {
					//firtMenuItem= this.menuList[1];//原来默认为倒数第二个菜单显示
					firtMenuItem= this.menuList[this.menuList.length-1];//选择
					this.onMenuItemClick(firtMenuItem);
				}
			}
		},
		'onMenuItemClick' : function(menu) {
			this.activeTopMenu = menu;
			if(this._isNotEmptyArray(menu.childList)){
				if(this._isNotEmptyArray(menu.childList[0].childList)){
					this.activeLeftMenu = menu.childList[0].childList[0];
				}else{
					this.activeLeftMenu = menu.childList[0];
				}
			}else{
				this.activeLeftMenu = menu;
			}
		},
		'onLeftMenuClick':function(leftMenu){
			this.activeLeftMenu = leftMenu;
		},
		'transferMenuHref' : function(href) {
			if (href) {
				if (href.indexOf('://') != -1) {
					return href;
				} else {
					return _ctx + href;
				}
			} else {
				return "javascript:void(0)";
			}
		},
		'openUserInfo':function (){
			top.layer.open({
				  type: 2,
				  title: '个人信息',
				  shadeClose: true,
				  area: ["700px", '360px'],
				  content:  _ctx+ '/sys/user/userInfo' //iframe的url
				}); 
		},
		'openUserModifyPwd':function (){
			top.layer.open({
				  type: 2,
				  title: '修改密码',
				  shadeClose: true,
				  area: ["700px", '360px'],
				  content: _ctx+  '/sys/user/userModifyPwd' //iframe的url
				}); 
		},
		'logout':function(){
			window.location.href=_ctx+'/logout'
		},
		_isNotEmptyArray:function(obj){
			return obj!=null&&obj!=undefined&&obj.length>0;
		}
	},
	watch:{
		'miniNav': function(){
			if(this.miniNav){
				$("body").addClass("page-sidebar-closed");
				$("body").addClass("page-sidebar-fixed");
				this.isHoverLeftMenu=false;
			}else{
				$("body").removeClass("page-sidebar-closed");
				$("body").removeClass("page-sidebar-fixed");
			}
		}
	}
});

function calSumWidth(elements) {
	var width = 0;
	$(elements).each(function() {
		width += $(this).outerWidth(true);
	});
	return width;
}

/**
 * 重置窗口大小
 * @returns
 */
function resizeWindow(){
	var windowHeight = $(window).height();
	$(".page-sidebar-menu").height((windowHeight - 104)+"px");//.css("overflow-y","auto").css("overflow-x","hidden");
	
}

$(document).ready(function() {
	
	$(window).on("resize",resizeWindow);
	$(".page-sidebar-menu").slimScroll({
        height: "100%"
    });
	$.get(_ctx + "/sys/user/getNowUserMenuTree", {}, function(msg) {
		if (msg.status == 1) {
			$(document).trigger("userMenuDataComplete", msg);
		} else {
			layer.error(msg.message);
		}
		
		
	});

	$(document).on('userMenuDataComplete', function(e, msg) {
		vm.menuList = msg.data;
		vm.menuList.sort(function(a,b){
			return b.sort - a.sort;
		});
		vm.init();

	});
	

});