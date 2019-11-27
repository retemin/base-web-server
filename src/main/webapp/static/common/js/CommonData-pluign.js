(function($){
	$.CommonData = {
		options:{
		},
		data:{
			userSelect:function(opts){
				var defaults={
					onLoad:function(){},
					onConfirm:function(){},
					queryParam:{},
					url:_ctx+"/sys/user/selectTree",
					layerParam:{},
					isMulti:true
				}
				var option=$.extend(defaults,opts);
				for(var key in option.queryParam){
					option.url=option.url+"&&"+key+"="+option.queryParam[key];
				}
				
				var _frameContent=null;
				var layerOption={
				    type: 2,
				    title: "选择人员",
				    shadeClose: true,
				    maxmin: true, //开启最大化最小化按钮
				    area: ['70%', '70%'],
				    btn: ['确定', '取消'],
				    content: encodeURI(option.url), //iframe的url
				    success: function(layero, index){
				    	frameContent=layero;
				    	var _contentWindow=frameContent.find("iframe")[0].contentWindow;
				    	_contentWindow._layero=layero;
				        if(typeof option.onLoad ==='function'){
				        	option.onLoad(_contentWindow,index);
				        }
				    },
				    yes:function(index){
				    	if(typeof option.onConfirm ==='function'){
				    		var _contentWindow=frameContent.find("iframe")[0].contentWindow;
					    	var data=_contentWindow.getSelected();
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
				
			},
			processUserSelect:function(opts){
				var defaults={
					taskId:'',
					taskKey:'',
					onLoad:function(){},
					onConfirm:function(){},
					queryParam:{},
					url:'',
					layerParam:{},
					isMulti:true
				}
				var option=$.extend(defaults,opts);
				if(option.taskId){
					option.url=_ctx+"/act/common/nextNodes/"+option.taskId;
					
					if(option.queryParam){
						option.url+="?";
					}
					var firstFlag=true;
					for(var key in option.queryParam){
						if(!firstFlag){
							option.url=option.url+"&&"
						}
						option.url=option.url+key+"="+option.queryParam[key];
						firstFlag=false;
					}
				}else{
					top.layer.error("请先保存数据");
					return false;
				};
				
				
				var _frameContent=null;
				var layerOption={
				    type: 2,
				    title: ["提交业务","font-size:18px;"],
				    shadeClose: true,
				    maxmin: true, //开启最大化最小化按钮
				    area: ['600px', '80%'],
				    btn: ['确定', '取消'],
				    content: encodeURI(option.url), //iframe的url
				    success: function(layero, index){
				    	_frameContent=layero;
				    	var _contentWindow=_frameContent.find("iframe")[0].contentWindow;
				    	_contentWindow._layero=layero;
				        if(typeof option.onLoad ==='function'){
				        	option.onLoad(_contentWindow,index);
				        }
				    },
				    yes:function(index){
				    	if(typeof option.onConfirm ==='function'){
				    		var _contentWindow=_frameContent.find("iframe")[0].contentWindow;
					    	var data=_contentWindow.getSelected();
					    	option.onConfirm(data,_contentWindow,index);
					    	//option.onConfirm(data,_contentWindow);
				    	}
				    	//top.layer.close(index);
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
			//地图定位
			baiduMapSelect:function(opts){
				var _frameContent=null;
				var option=$.extend(opts);
				var wherestr="";
				for(var key in option.queryParam){ 
					wherestr+="&&"+key+"="+option.queryParam[key];
				}
				var layerOption={
				    type: 2,
				    title: "地图选择经纬度",
				    shadeClose: true,
				    closeBtn : 2,
				    shade: 0.2,
				    //skin:"layui-layer-lan",
				    maxmin: true, //开启最大化最小化按钮
				    area: ["80%", "80%"],
				    zIndex: layer.zIndex,
				    btn: ['确定', '取消'],
				    content: encodeURI(_ctx + "/public/baiduDituSearch?n=1"+wherestr),//iframe的url
				    success: function(layero, index){
				    	frameContent=layero;
				    },
				    yes:function(index){
				    		var _contentWindow=frameContent.find("iframe")[0].contentWindow;
					    	var data=_contentWindow.getSelected();
					    	option.onConfirm(data,_contentWindow);
				    	    top.layer.close(index);
				    },
				    cancel :function(index){
				    	 
				    },
				    end:function(index){
				    	layer.close(index);
				    }
				}
				var index=top.layer.open(layerOption); 
			},
			//获取参数表
			getCs:function(type,module,parent,grandpa,remark,onSucess,onError){
				$.get(_ctx + "/code/common/getCode", {
					type : type,
					module : module,
					parent : parent,
					grandpa : grandpa,
					remark : remark
				}, function(msg) {
					if (msg.status == 1) {
						if(onSucess&& typeof onSucess=="function"){
							onSucess(msg.data);
						}
					} else {
						if(onError&& typeof onError=="function"){
							onError(msg);
						}
					};
				});
			},
			roleSelect:function(opts){
					var defaults={
						onLoad:function(){},
						onConfirm:function(){},
						queryParam:{},
						url:_ctx+"/sys/role/selectPage",
						layerParam:{},
						isMulti:true
					}
					var option=$.extend(defaults,opts);
					for(var key in option.queryParam){
						option.url=option.url+"&&"+key+"="+option.queryParam[key];
					}
					
					var _frameContent=null;
					var layerOption={
					    type: 2,
					    title: "选择角色",
					    shadeClose: true,
					    maxmin: true, //开启最大化最小化按钮
					    area: ['40%', '70%'],
					    btn: ['确定', '取消'],
					    content: encodeURI(option.url), //iframe的url
					    success: function(layero, index){
					    	frameContent=layero;
					    	var _contentWindow=frameContent.find("iframe")[0].contentWindow;
					    	_contentWindow._layero=layero;
					        if(typeof option.onLoad ==='function'){
					        	option.onLoad(_contentWindow,index);
					        }
					    },
					    yes:function(index){
					    	if(typeof option.onConfirm ==='function'){
					    		var _contentWindow=frameContent.find("iframe")[0].contentWindow;
						    	var data=_contentWindow.getSelectEnterprise();
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
			},
			/**
			 * 单位选择
			 * @param onConfirm
			 * @param onLoad
			 * @param onCancel
			 * @returns
			 */
			partySelect:function(opts){
				var defaults={
						onConfirm:function(){},
						queryParam:{},
						onLoad:function(){},
						onCancel:function(){},
						layerParam:{},
						url:_ctx+'enterprise/selectList?1'
				}
				var option=$.extend(defaults,opts);
				for(var key in option.queryParam){
					option.url=option.url+"&&"+key+"="+option.queryParam[key];
				}
				var _frameContent=null;
				var layerOption={
				    type: 2,
				    title: "选择企业",
				    shadeClose: true,
				    maxmin: true, //开启最大化最小化按钮
				    area: ['70%', '70%'],
				    btn: ['确定', '取消'],
				    content: encodeURI(option.url), //iframe的url
				    success: function(layero, index){
				    	frameContent=layero;
				    	var _contentWindow=frameContent.find("iframe")[0].contentWindow;
				    	_contentWindow._layero=layero;
				        if(typeof option.onLoad ==='function'){
				        	option.onLoad(_contentWindow,index);
				        }
				    },
				    yes:function(index){
				    	if(typeof option.onConfirm ==='function'){
				    		var _contentWindow=frameContent.find("iframe")[0].contentWindow;
					    	var data=_contentWindow.getSelectEnterprise();
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
			},
			convertStr : function(str){
				if(typeof(str)=="undefined") return "";
				var result = "";
				var strArray = str.split("");
				for(var i=0; i<strArray.length; i++){
					if((i+1)%4==0) result += strArray[i]+"<br/>";
					else result += strArray[i]+"";
				}
				return result;
			},
			/**
			 * 行业类别选择
			 */
			tradeSelect:function(opts){
				var defaults={
						onConfirm:function(data,contentWindow){},
						queryParam:{},
						onLoad:function(){},
						onCancel:function(){},
						layerParam:{},
						url:_ctx+'/paramCode/tradeSelect?1',
						title: "选择行业类型",
						isMulti:false
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
				    maxmin: true, //开启最大化最小化按钮
				    area: ['30%', '70%'],
				    btn: ['确定', '取消'],
				    content: encodeURI(option.url), //iframe的url
				    success: function(layero, index){
				    	frameContent=layero;
				    	var _contentWindow=frameContent.find("iframe")[0].contentWindow;
				    	_contentWindow._layero=layero;
				        if(typeof option.onLoad ==='function'){
				        	option.onLoad(_contentWindow,index);
				        }
				    },
				    yes:function(index){
				    	if(typeof option.onConfirm ==='function'){
				    		var _contentWindow=frameContent.find("iframe")[0].contentWindow;
					    	var data=_contentWindow.getSelected();
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
			
			},
			/**
			 * 行政区域选择
			 */
			areaSelect:function(opts){
				var defaults={
						onConfirm:function(data,contentWindow){},
						queryParam:{},
						onLoad:function(){},
						onCancel:function(){},
						layerParam:{},
						url:_ctx+'/sys/area/areaSelectTree',
						title: "选择行政区域",
						isMulti:false
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
				    area: ['400px', '70%'],
				    btn: ['确定', '取消'],
				    zIndex: top.layer.zIndex, //多窗口模式，层叠打开
				    content: encodeURI(option.url), //iframe的url
				    success: function(layero, index){
				    	frameContent=layero;
				    	var _contentWindow=frameContent.find("iframe")[0].contentWindow;
				    	_contentWindow._layero=layero;
				        if(typeof option.onLoad ==='function'){
				        	option.onLoad(_contentWindow,index);
				        }
				    },
				    yes:function(index){
				    	if(typeof option.onConfirm ==='function'){
				    		var _contentWindow=frameContent.find("iframe")[0].contentWindow;
					    	var data=_contentWindow.getSelected();
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
			
			},
			/**
			 * 部门选择
			 */
			officeSelect:function(opts){
				var defaults={
						onConfirm:function(data,contentWindow){},
						queryParam:{},
						onLoad:function(){},
						onCancel:function(){},
						layerParam:{},
						url:_ctx+'/sys/office/officeSelectTree?1',
						title: "选择部门",
						isMulti:false
				}
				var option=$.extend(defaults,opts);
				for(var key in option.queryParam){
					option.url=option.url+"&&"+key+"="+option.queryParam[key];
				}
				var _frameContent=null;
				var layerOption={
				    type: 2,
				    title: [option.title,"font-size:18px;"],
				    shadeClose: true,
				    zIndex: "20000000",
				    maxmin: true, //开启最大化最小化按钮
				    area: ['30%', '80%'],
				    btn: ['确定', '取消'],
				    content: encodeURI(option.url), //iframe的url
				    success: function(layero, index){
				    	frameContent=layero;
				    	var _contentWindow=frameContent.find("iframe")[0].contentWindow;
				    	_contentWindow._layero=layero;
				        if(typeof option.onLoad ==='function'){
				        	option.onLoad(_contentWindow,index);
				        }
				    },
				    yes:function(index){
				    	if(typeof option.onConfirm ==='function'){
				    		var _contentWindow=frameContent.find("iframe")[0].contentWindow;
					    	var data=_contentWindow.getSelected();
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
			},
			weather:{
				getWeatherForecast : function(city,callBack){
					$.get(encodeURI($.CommonData.options.weather.url+city),{},function(msg){
						if(msg.status==1){
							callBack(JSON.parse(msg.data));
						}else{
							console.log("获取天气信息失败"+msg.message);
						}
					});
				}
			}
		},
		/**
		 * 水流域选择
		 */
		wateSystemSelect:function(opts){
			var defaults={
					onConfirm:function(data,contentWindow){},
					queryParam:{},
					onLoad:function(){},
					onCancel:function(){},
					layerParam:{},
					url:_ctx+'paramCode/waterSystemSelect?1',
					title: "选择水流域",
					isMulti:false
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
			    maxmin: true, //开启最大化最小化按钮
			    area: ['30%', '70%'],
			    btn: ['确定', '取消'],
			    content: encodeURI(option.url), //iframe的url
			    success: function(layero, index){
			    	frameContent=layero;
			    	var _contentWindow=frameContent.find("iframe")[0].contentWindow;
			    	_contentWindow._layero=layero;
			        if(typeof option.onLoad ==='function'){
			        	option.onLoad(_contentWindow,index);
			        }
			    },
			    yes:function(index){
			    	if(typeof option.onConfirm ==='function'){
			    		var _contentWindow=frameContent.find("iframe")[0].contentWindow;
				    	var data=_contentWindow.getSelected();
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
		
		},
		weather:{
			getWeatherForecast : function(city,callBack){
				$.get(encodeURI($.CommonData.options.weather.url+city),{},function(msg){
					if(msg.status==1){
						callBack(JSON.parse(msg.data));
					}else{
						console.log("获取天气信息失败"+msg.message);
					}
				});
			}
		},
		plugin:{
			uploadFiles:function(opts){
				var defaults={
						onUploadComplete:function(data,contentWindow){},
						onFileUploaded:function(data,contentWindow){},
						module:"",
						fileConutLimt:9999, 
						businessId:"",
						hasNote:"0",
						businessType:"",
						businessParam:"",
						onLoad:function(){},
						layerParam:{},
						url:_ctx + "/pluploadFtp/uploadPage?_ng=1",
						title: "附件上传"
				}
				var option=$.extend(defaults,opts);
				option.url=option.url+"&&module="+option.module;
				option.url=option.url+"&&businessId="+option.businessId;
				option.url=option.url+"&&fileConutLimt="+option.fileConutLimt;
				option.url=option.url+"&&businessParam="+option.businessParam;
				option.url=option.url+"&&businessType="+option.businessType;
				option.url=option.url+"&&hasNote="+option.hasNote;
				console.log(option.url);
				
				var _frameContent=null;
				var layerOption={
				    type: 2,
				    title: option.title,
				    shadeClose: true,
				    maxmin: true, //开启最大化最小化按钮
				    area: ["90%", "90%"],
				    zIndex: layer.zIndex,
				    content: encodeURI(option.url), //iframe的url
				    success: function(layero, index){
				    	//layer.setTop(layero);
				    	frameContent=layero;
				    	var _contentWindow=frameContent.find("iframe")[0].contentWindow;
				    	_contentWindow.layero=layero;
				    	
				    	if(typeof option.onUploadComplete ==='function'){
					    	layero.onUploadComplete=option.onUploadComplete;
				    	}
				    	
				    	if(typeof option.onFileUploaded ==='function'){
					    	layero.onFileUploaded=option.onFileUploaded;
				    	}
				    	
				        if(typeof option.onLoad ==='function'){
				        	option.onLoad(_contentWindow,index);
				        }
				    },
				    end:function(index){
				    	if(typeof option.onUploadComplete ==='function'){
				    		var _contentWindow=frameContent.find("iframe")[0].contentWindow;
					    	var data=_contentWindow.getSelected();
				    	}
				    	
				    	layer.close(index);
				    }
				}
				layerOption=$.extend(layerOption,option.layerParam);
				var index=layer.open(layerOption); 

			},
			marqueeUtils : {
				//滚动插件,由下向上,数字越大速度越慢
				init : function (setting){
					var _setting = $.CommonData.options.marquee;
					$.extend(true, _setting, setting);
					var o = _setting.obj;
					o.wrap('<div id="marqueeMainDiv_'+$(o).attr("id")+'" style="overflow:hidden;height:'+_setting.height+';width:'+_setting.width+';" class="marqueeMainDiv">');
					o.wrap('<div id="marqueeFirstDiv_'+$(o).attr("id")+'"></div>');
					o.parent().after('<div id="marqueeBackDiv_'+$(o).attr("id")+'" ></div>');
					var tab=$("#marqueeMainDiv_"+o.attr("id"))[0];
					var tab1=$("#marqueeFirstDiv_"+o.attr("id"))[0];
					var tab2=$("#marqueeBackDiv_"+o.attr("id"))[0];
					tab2.innerHTML=tab1.innerHTML; 
					function Marquee(){
						if(tab2.offsetTop-tab.scrollTop<=0) tab.scrollTop-=tab1.offsetHeight
						else tab.scrollTop++
					}
					var MyMar=setInterval(Marquee,_setting.speed);
					tab.onmouseover=function() {clearInterval(MyMar)};//鼠标移上时清除定时器达到滚动停止的目的
					tab.onmouseout=function() {MyMar=setInterval(Marquee,_setting.speed)};//鼠标移开时重设定时器
				}
			},
			echarts : {
				init : function(setting,func){
					var _setting = $.CommonData.options.echarts;
					$.extend(true, _setting, setting);
					require.config({paths:{echarts:_ctx+'static/plugin/echarts2'}});
					require(
						[
						'echarts',
						'echarts/chart/bar', //柱状图
						'echarts/chart/chord', //和弦图
						'echarts/chart/eventRiver', //事件河流图
						'echarts/chart/force', //力导向布局图
						'echarts/chart/funnel', //漏斗图
						'echarts/chart/gauge', //仪表盘
						'echarts/chart/heatmap', //热力图
						'echarts/chart/k', //K线图
						'echarts/chart/line', //折线图
						'echarts/chart/map', //地图
						'echarts/chart/pie', //饼图
						'echarts/chart/radar', //雷达图
						'echarts/chart/scatter', //散点图
						'echarts/chart/tree', //树图
						'echarts/chart/treemap', //矩形树图
						'echarts/chart/venn', //韦恩图
						'echarts/chart/wordCloud' //字符云
						],
						function(ec){
							$(_setting.selector).each(function(i,o){
								_setting.myEcharts[$(this).attr("id")] = ec.init($(this)[0],_setting.defaultTheme);
								_setting.myEcharts[$(this).attr("id")].showLoading();
								_setting.myEcharts[$(this).attr("id")].setOption(_setting.options[$(this).attr("id")]);
								_setting.myEcharts[$(this).attr("id")].hideLoading();
							});
							func(_setting.myEcharts);
						}
					);
				}
			},
			
		}
	}
})(jQuery);

