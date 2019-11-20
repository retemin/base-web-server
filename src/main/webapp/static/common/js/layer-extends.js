/**
 * layer 弹出框扩展
 */

$.extend(layer,{
	_defultOption:{
		success:{
			time:1000,
			icon:1
		},
		warning:{
			time:3000,
			icon:3
		},
		error:{
			//time:5000,
			icon:2
		},
		loadingWithText:{
		
		},
		zIndex:999999999
		
			
	},
	/**
	 * 成功提示
	 */
	success:function(msg,option){
		var opt=$.extend(this._defultOption.success,option);
		this.msg(msg,opt);
	},
	/**
	 * 错误提示，需要手动关闭
	 */
	error:function(msg,option){
		var opt=$.extend(this._defultOption.error,option);
		this.alert(msg,opt);
	},
	warning:function(msg,option){
		var opt=$.extend(this._defultOption.warning,option);
		this.alert(msg,opt);
	},
	/***
	 * 删除方法样式统一
	 */
	deleteItem:function(url,name){
		layer.confirm("确定删除:<span class='text-success'>"+name+"</span>?<p class='text-danger' >(删除后将无法恢复)<p>",{icon: 3, title:'警告'},function(index){
			layer.close(index);
			var loadingIndex=layer.loadingWithText("正在提交数据");
			$.post(url,{},function(msg){
				layer.close(loadingIndex);
				if(msg.status==1){
					layer.success("已经成功删除:"+name);
					tableObj.trigger("reloadGrid");
				}else{
					layer.error("删除失败："+msg.message);
				}
			});
		});
		
		
	},
	/**
	 * 带文字的加载提示
	 */
	loadingWithText:function(msg,option){
		var opt=$.extend(this._defultOption.loadingWithText,option);
		return this.open({
			content:"<h1 style='font-size:15px;color:#003366;margin-left:30px;width:350px;font-family: \"Microsoft YaHei\" ! important;'>"+msg+"</h1>",
			icon:2,
			type:3,
			shade: 0.2,
		});
	},
	getElementLayerIndex:function(element){
		return element.closest("div.layui-layer").prop("id").replace("layui-layer","");
	}

});

layer.config({
	  //type: 2,
	  skin: 'layui-layer-molv',
	  anim:0,
	  shade:0.2,
	  closeBtn:2
})

$(document).ready(function(){
	$(".closeNowLayer").click(function(){
		//假设这是iframe页
		var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
		parent.layer.close(index); //再执行关闭      
	});
});