//layer iframe回调
(function($){
	$.layerIframeCallBack = {
			open:function(opts){
				var defaults={
					onLoad:function(){},
					onConfirm:function(){},
					queryParam:{},
					url:"",
					title:"",
					layerParam:{}
				}
				var option=$.extend(defaults,opts);
				for(var key in option.queryParam){
					option.url=option.url+"&&"+key+"="+option.queryParam[key];
				}
				
				var _frameContent=null;
				var layerOption={
				    type: 2,
				    title: option.title,
				    shadeClose: true,
				    maxmin: false, //开启最大化最小化按钮
				    area: ['70%', '70%'],
				    /*btn: ['确定', '取消'],*/
				    content: encodeURI(option.url), //iframe的url
				    success: function(layero, index){
				    	frameContent=layero;
				    	layero.confirm=function(data){
				    		if(typeof option.onConfirm ==='function'){
						    	option.onConfirm(data);
					    	}
					    	top.layer.close(index);
				    	}
				    	
				    	var _contentWindow=frameContent.find("iframe")[0].contentWindow;
				    	_contentWindow._layero=layero;
				        if(typeof option.onLoad ==='function'){
				        	//_contentWindow子页面
				        	option.onLoad(_contentWindow,index);
				        }
				    },
				   
				    cancel :function(index){
				    	if(typeof option.onCancel ==='function'){
				    		option.onCancel();
				    	}
				    	return true;
				    }
				}
				layerOption=$.extend(layerOption,option.layerParam);
				var index=top.layer.open(layerOption); 
				
			},
			openBtn:function(opts){
				var defaults={
					onLoad:function(){},
					onConfirm:function(){},
					queryParam:{},
					url:"",
					title:"",
					layerParam:{}
				}
				var option=$.extend(defaults,opts);
				for(var key in option.queryParam){
					option.url=option.url+"&&"+key+"="+option.queryParam[key];
				}
				
				var _frameContent=null;
				var layerOption={
				    type: 2,
				    title: option.title,
				    shadeClose: true,
				    maxmin: false, //开启最大化最小化按钮
				    area: ['70%', '70%'],
				    btn: ['确定', '取消'],
				    content: encodeURI(option.url), //iframe的url
				    success: function(layero, index){
				    	frameContent=layero;
				    	layero.confirm=function(data){
				    		if(typeof option.onConfirm ==='function'){
						    	option.onConfirm(data);
					    	}
					    	top.layer.close(index);
				    	}
				    	
				    	var _contentWindow=frameContent.find("iframe")[0].contentWindow;
				    	_contentWindow._layero=layero;
				        if(typeof option.onLoad ==='function'){
				        	option.onLoad(_contentWindow,index);
				        }
				    },
				    yes:function(index){
				    	if(typeof option.onConfirm ==='function'){
				    		var _contentWindow=frameContent.find("iframe")[0].contentWindow;
					    	var data=_contentWindow.getSelect();
					    	option.onConfirm(data,_contentWindow);
				    	}
				    	
				    	top.layer.close(index);
				    },
				    cancel :function(index){
				    	if(typeof option.onCancel ==='function'){
				    		option.onCancel();
				    	}
				    	return true;
				    }
				}
				layerOption=$.extend(layerOption,option.layerParam);
				var index=top.layer.open(layerOption); 
				
			}
	}
	
})(jQuery);
		

