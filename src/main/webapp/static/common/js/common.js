/**
 * @author binzec
 * 一些共用方法
 */
//父窗口,由layer的success方法调用赋值
var pWin,pIndex;
function setParent(parentWin,index) {
	pWin = parentWin;
	pIndex = index;
	// 如果还有其他样式修改，则可以调用mounted()方法
	try {
		mounted();
	} catch(e){}
}
// 默认的那个jqgrid的对象
var tableObj,vm;
function initInterface() {
	/*============================jqgrid样式============================*/
	tableObj = $("#tableContent");
	// 设置搜索栏样式（单行模式）
	$(".searchForm").css("padding", "3px").addClass("form-inline");
	$(".searchForm input, .searchForm select").addClass("form-control");
	// 搜索框多行，采用table形式
	$(".formTable td").css("font-size","13px").css("padding","2px");
	$(".formTable input, .formTable select").addClass("form-control");
	var trs = $(".formTable tr");
	$.each(trs, function(i, tr) {
		var tds = $(tr).children("td");
		if (tds.length > 1) {
			$.each(tds, function(j, td) {
				if (j % 2 == 0) {
					$(td).css("text-align","right").css("font-weight","bold");
				}
			});
		}
	});
	// 搜索按钮
	$("#search").click(function(e) {
		e.preventDefault();
		var param = getSearchFormDataJson();
		tableObj.setGridParam({postData:param,page:1});
		tableObj.trigger("reloadGrid");
	});
	//当列表不是处于弹窗layer里的,而是在iframe区域内的,才执行重置高度的逻辑
	var index = window.parent.layer.getFrameIndex(window.name);
	if(isNull(index)) {
		// 如果存在搜索框，则说明该页面是列表页面
		if($(".searchForm").length > 0 || $(".formTable").length > 0){
			// 重新定义jqgrid宽度和高度
			window.onload = function(){
				setGridHeight();
			}
			// 响应式改变jqgrid宽度和高度
			$(window).bind("resize", function() {
				setGridHeight();
			});
		}
	}
	/*============================table样式============================*/
	// 如果底部按钮被隐藏了，则表单为全屏；否则需要留出一部分给foot放按钮
	var foot = $("#foot").css("display");
	if (isNull(foot) || foot == "none") {
		$("#mainContent").css("overflow-y","auto").css("position","absolute").css("left","0").css("right","0").css("top","0").css("bottom","0").css("height","100%").css("padding","10px");
	} else {
		// 火狐浏览器不支持calc语法
		var height = "calc(100%-51px)";
		var browser = getBrowser();
		if(browser == "Firefox"){
			height = (document.body.clientHeight - 51) + "px";
		}
		$("body").css("overflow-y","hidden");
		$("#mainContent").css("overflow-y","auto").css("position","absolute").css("left","0").css("right","0").css("top","0").css("bottom","47px").css("height",height).css("padding","10px");
		$("#foot").css("z-index","9999").css("position","fixed").css("width","100%").css("height","50px").css("line-height","50px").css("text-align","center").css("margin-top",(document.body.clientHeight - 51) + "px");
		$(window).bind("resize", function() {
			$("#foot").css("margin-top",(document.body.clientHeight - 51) + "px");
		});
	}
	// 取出每一个table
	var infoTables = $(".infoTable");
	if($(".infoTable").length > 0) {
		// 遍历每一个table
		$.each(infoTables,function(i,infoTable){
			// 取出table下的全部tr
			var trs = $(infoTable).find("tr");
			// 计算这个table里一行里最多的td数量
			var tdMaxLen = 0;
			for (var j = 0; j < trs.length; j++) {
				var tdLen = $(trs[j]).find("td").length;
				if(tdLen > tdMaxLen) {
					tdMaxLen = tdLen;
				}
			}
			// 标题行，自动扩展占据整个tr
			$(".bigHeading, .heading").attr("colspan",tdMaxLen);
			// 说明，在td里加到class属性，td里的文字就会占据整个tr并套上一层红色的样式
			var ins = $(".ins");
			$.each(ins, function(i,obj) {
				var html = $(obj).html();
				$(obj).attr("colspan", tdMaxLen).html("<b style='font-size: 16px;'>" + html + "</b>");
			});
		});
	}
}
//表单数据添加
//	url:	局部访问后台的路径
//	data:	需要交互的数据（json串）
//	func:	回调函数
function doAdd(url, data, func) {
	var loadIndex = load();
	ajaxForm(url, JSON.stringify(data), function(msg) {
		closeLoad(loadIndex);
		if (msg == "fail") {
			window.top.layer.msg("添加失败，请联系管理员！", {icon : 2});
			// 添加失败，则需要把id置空，否则下一次点击保存会进入修改方法
			Vue.set(vm.data, "id", null);
		} else if (msg == "actFail") {
			window.top.layer.msg("流程开创失败，请联系管理员！", {icon : 2});
			Vue.set(vm.data, "id", null);
		} else {
			if(func){
				func(msg);
			}
		}
	});
}
//表单数据修改
//	url:	局部访问后台的路径
//	data:	需要交互的数据（json串）
//	func:	回调函数
function doUpdate(url, data, func) {
	var loadIndex = load();
	ajaxForm(url, JSON.stringify(data), function(msg) {
		closeLoad(loadIndex);
		if (msg == "fail") {
			window.top.layer.msg("修改失败，请联系管理员！", {icon : 2});
		} else {
			if(func){
				func(msg);
			}
		}
	});
}
//基本数据校验，通过返回true，不通过返回false
//  1.只针对input、select、textarea这三种标签有效；
//  2.对全部input标签内容进行去空处理，class加了notrim则跳过；
//  3.给标签的class里加入req，可做非空判断，如果为空，会取上一个兄弟元素（即td）的内容做警告；
//  4.给input标签的class里加入pos，可做正数校验；加入neg，可做负数校验；假如zero，可做0校验（这3者可组合使用，例如pos和zero组合，则校验为必须大于等于0）；
//  5.给input标签的class里加入int，可做整数校验；
//  6.给input标签的class里加入number，单纯做数字校验（pos/neg/int也包含了这个校验）
//	i-某些时候一个表单可能是一部分一部分提交，上述class属性可以在末尾增加数字来区分批次
function commonVerify(k) {
	if (isNull(k)) {
		k = "";
	}
	var os = $(".infoTable input, .infoTable select, .infoTable textarea");
	for (var i = 0; i < os.length; i++) {
		var o = $(os[i]);
		var info = "［" + o.closest("td").prev().text().replace("：", "").replace("*", "").trim() + "］" ;
		var val = o.val();
		// 看是否需要非空判断
		if (o.hasClass("req" + k)) {
			if (isNull(val)) {
				warm(o, info + "是必填项，不允许为空！");
				return false;
			}
		}
		// 只针对input标签进行值的校验
		if (o.is("input")) {
			// 将空值全部去除掉
			if (!o.hasClass("notrim")) {
				val = val.replace(/\s/g, "");
				o.val(val);
			}
			// 为了不影响性能，只做一次数字校验
			var numberDone = false;
			// 做正/0/负数校验
			var pos = o.hasClass("pos" + k);
			var zero = o.hasClass("zero" + k);
			var neg = o.hasClass("neg" + k);
			// >0
			if (pos == true && zero == false && neg == false) {
				if (!verifyNumber(o, info)) {
					return false;
				} else {
					if (!(val > 0)) {
						warm(o, info + "必须填正数！");
						return false;
					}
				}
				// >=0
			} else if (pos == true && zero == true && neg == false) {
				if (!verifyNumber(o, info)) {
					return false;
				} else {
					if (!(val >= 0)) {
						warm(o, info + "必须填大于等于0的数！");
						return false;
					}
				}
				// 全部数字即可
			} else if (pos == true && zero == true && neg == true) {
				if (!verifyNumber(o, info)) {
					return false;
				}
				// <=0
			} else if (pos == false && zero == true && neg == true) {
				if (!verifyNumber(o, info)) {
					return false;
				} else {
					if (!(val <= 0)) {
						warm(o, info + "必须填小于等于0的数！");
						return false;
					}
				}
				// <0
			} else if (pos == false && zero == false && neg == true) {
				if (!verifyNumber(o, info)) {
					return false;
				} else {
					if (!(val < 0)) {
						warm(o, info + "必须填小于0的数！");
						return false;
					}
				}
				// 不管
			} else if (pos == false && zero == false && neg == false) {
				numberDone = true;
				// =0
			} else if (pos == false && zero == true && neg == false) {
				if (val != 0) {
					warm(o, info + "必须填0！");
					return false;
				}
				numberDone = true;
				// !=0
			} else if (pos == true && zero == false && neg == true) {
				if (val == 0) {
					warm(o, info + "不允许填0！");
					return false;
				}
				numberDone = true;
			}
			// 整数校验
			if (o.hasClass("int" + k)) {
				if (numberDone) {
					if (!verifyNumber(o, info)) {
						return false;
					}
					numberDone = false;
				}
				if (val.toString().indexOf(".") != -1) {
					warm(o, info + "必须填整数！");
					return false;
				}
			}
			// 数字校验，上面如果做了这里就不做了
			if (o.hasClass("number" + k)) {
				if (numberDone) {
					if (!verifyNumber(o, info)) {
						return false;
					}
					numberDone = false;
				}
			}
		}
	}
	return true;
}
//警告样式
function warm(o, info) {
	window.top.layer.msg(info,{icon:7});
	o.focus();
}
//校验数字
function verifyNumber(o, info) {
	if (!/^(\-|\+)?\d+(\.\d+)?$/.test(o.val())) {
		warm(o, info + "必须填数字！");
		return false;
	} else {
		return true;
	}
}
//重新设置jqgird高度和宽度
function setGridHeight() {
	var winHeight = $(document).height();
	tableObj.setGridWidth($(document).width());
	var sf = $(".searchForm").height();
	var ft = $(".formTable").height();
	if(sf > 0){
		tableObj.jqGrid("setGridHeight", winHeight-sf-$(".nav").height()-87); 
	}
	if(ft > 0){
		tableObj.jqGrid("setGridHeight", winHeight-ft-$(".nav").height()-81); 
	}
}
//删除方法
//	url：		删除路径
//	tableObjId：	删除之后要刷新的jqgrid的id(不传默认刷新id为tableContent的jqgrid)
//	func：		回调方法
function doDel(url, tableObjId, func){
	doConfirm("删除之后不可恢复，您确定要删除吗？", function() {
		var loadIndex = load();
		$.ajax({
			url : url,
			data : {},
			async : false,
			type : "post",
			success : function(msg) {
				closeLoad(loadIndex);
				if (msg == "fail") {
					window.top.layer.msg("操作失败，请联系管理员！", {icon : 2});
				} else {
					if (isNull(tableObjId)) {
						if (tableObj) {
							tableObj.trigger("reloadGrid");
						}
					} else {
						$("#" + tableObjId).trigger("reloadGrid");
					}
					if (func) {
						func(msg);
					} else {
						window.top.layer.msg("删除成功！",{icon:6});
					}
				}
			},
			error : function(e) {
				console.log("url-->" + url + "；error-->" + JSON.stringify(e));
				window.top.layer.msg("操作失败，请联系管理员！", {icon : 2});
			}
		});
	});
}
//重设table下jqgrid的样式，修复css冲突bug
//	tableId：	是该jqgrid的id
//	scroll：		true-支持横向滚动;false-普通
//	total：		需要列表展示多少行的高度,如果不传就以rowNum作为标准,但是不会小于5行高度
function resetJqgrid(tableId,scroll,total){
	var $t = $("#"+tableId);
	//设置列名居中
	$(".ui-th-column,.ui-th-ltr").css("text-align","center");
	//看jqgrid的行数设置高度
	var rowNum;
	if(isNull(total)) {
		rowNum = $t.jqGrid("getGridParam","rowNum");
	} else {
		rowNum = total;
	}
	if(rowNum < 5) {
		rowNum = 5;
	}
	var height = rowNum*40;
	if(scroll == true){
		$t.setGridHeight((height+12.5)+"px");
		$t.closest(".ui-jqgrid-bdiv").css({"overflow-x":"scroll"});
	} else {
		$t.setGridHeight((height+0.5)+"px");
	}
	//根据父标签设置宽度
	window.setTimeout(function(){
		var $div = $("#gbox_"+tableId);
		$div.find(".ui-jqgrid-pager").find("td").css("border","white").css("height","28px");
		$t.setGridWidth($div.parents().width() - 10);
	},100);
}
//关闭本身窗口
function closeSelf() {
	var index = parent.layer.getFrameIndex(window.name);
	window.parent.layer.close(index);
}
// 生成UUID
function UUID() {
	return "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, function(c) {
		var r = Math.random() * 16 | 0, v = c == "x" ? r : (r & 0x3 | 0x8);
		return v.toString(16).toUpperCase();
	});
}
// 从后台获取随机编码
function getKey() {
	var key = "";
	ajax_f(_ctx + "/keyGenerator/getNext", {}, function(msg) {
		key = msg;
	}, false);
	return key;
}
//yyyy-MM-dd HH:mm:ss格式的时间进行处理
//	默认为1,其他情况也按1处理
//		1.yyyy-MM-dd
//		2.yyyy/MM/dd
//		3.yyyy/MM/dd HH:mm:ss
//		4.yyyy/MM/dd HH/mm/ss
//		5.yyyyMMdd
//		6.yyyyMMddHHmmss
//		7.yyyy
//		8.MM
//		9.dd
function formatDate(d, f) {
	var result = undefined;
	var s1 = "-";
	var s2 = ":";
	var s3 = "/";
	if (!isNull(d)) {
		var year = d.substring(0, 4);
		var month = d.substring(5, 7);
		var date = d.substring(8, 10);
		var hour = d.substring(11, 13);
		var minute = d.substring(14, 16);
		var second = d.substring(17, 19);
		if (f == 1) {
			result = d.substring(0, 10);
		} else if (f == 2) {
			result = year + s3 + month + s3 + date;
		} else if (f == 3) {
			result = year + s3 + month + s3 + date + " " + hour + s2 + minute + s2 + second;
		} else if (f == 4) {
			result = year + s3 + month + s3 + date + " " + hour + s3 + minute + s3 + second;
		} else if (f == 5) {
			result = year + month + date;
		} else if (f == 6) {
			result = year + month + date + hour + minute + second;
		} else if (f == 7) {
			result = year;
		} else if (f == 8) {
			result = month;
		} else if (f == 9) {
			result = date;
		} else {
			result = d.substring(0, 10);
		}
	}
	return result;
}
//获取当前时间（客户端时间），输入不同的type能得到不同格式的时间
//	type-默认为1,其他情况也按1处理
//		1.yyyy-MM-dd HH:mm:ss
//		2.yyyy-MM-dd
//		3.yyyy/MM/dd
//		4.yyyy/MM/dd HH:mm:ss
//		5.yyyy/MM/dd HH/mm/ss
//		6.yyyyMMdd
//		7.yyyyMMddHHmmss
//		8.yyyy
//		9.mm
//		10.dd
//		11.季度:1,2,3,4
function getCurTime(type) {
	var date = new Date();
	var s1 = "-";
	var s2 = ":";
	var s3 = "/";
	// 年
	var year = date.getFullYear();
	// 月
	var month = date.getMonth() + 1;
	if (month >= 1 && month <= 9) {
		month = "0" + month;
	}
	// 日
	var strDate = date.getDate();
	if (strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}
	// 时
	var hour = date.getHours();
	if (hour >= 0 && hour <= 9) {
		hour = "0" + hour;
	}
	// 分
	var minute = date.getMinutes();
	if (minute >= 0 && minute <= 9) {
		minute = "0" + minute;
	}
	// 秒
	var second = date.getSeconds();
	if (second >= 0 && second <= 9) {
		second = "0" + second;
	}
	var result = "";
	if (type == 1) {
		result = year + s1 + month + s1 + strDate + " " + hour + s2 + minute + s2 + second;
	} else if (type == 2) {
		result = year + s1 + month + s1 + strDate;
	} else if (type == 3) {
		result = year + s3 + month + s3 + strDate;
	} else if (type == 4) {
		result = year + s3 + month + s3 + strDate + " " + hour + s2 + minute + s2 + second;
	} else if (type == 5) {
		result = year + s3 + month + s3 + strDate + " " + hour + s3 + minute + s3 + second;
	} else if (type == 6) {
		result = year + month + strDate;
	} else if (type == 7) {
		result = year + month + strDate + hour + minute + second;
	} else if (type == 8) {
		result = year;
	} else if (type == 9) {
		result = month;
	} else if (type == 10) {
		result = strDate;
	} else if(type == 11) {
		var jd;
		if(month < 4) {
			jd = 1;
		} else if(month < 7) {
			jd = 2;
		} else if(month < 10) {
			jd = 3;
		} else {
			jd = 4;
		}
		return jd;
	} else {
		result = year + s1 + month + s1 + strDate + " " + hour + s2 + minute + s2 + second;
	}
	return result;
}
// 计算两个日期之间的天数（格式为年月日）
function dateDiff(sDate1, sDate2) {
    var aDate, oDate1, oDate2, iDays;
    aDate = sDate1.split("-");
    oDate1 = new Date(aDate[1] + "-" + aDate[2] + "-"  +  aDate[0]);
    aDate = sDate2.split("-");  
    oDate2 = new Date(aDate[1] + "-" + aDate[2] +  "-"  +  aDate[0]);  
    iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 /24);
    return iDays;
}
//json格式提交方法（后台用@requestBody接收参数）
//	url:	局部访问后台的路径
//	data:	需要交互的数据
//	func:	回调函数
//	async:	true-异步；false-同步，默认是异步
function ajaxForm(url, data, func, async) {
	if (isNull(async)) {
		async = true;
	}
	$.ajax({
		url : url,
		data : data,
		async : async,
		type : "post",
		contentType : "application/json",
		success : function(msg) {
			func(msg);
		},
		error:function(e){
			console.log("url-->" + url + "；error-->" + JSON.stringify(e));
		}
	});
}
//普通提交方法
//	url:	局部访问后台的路径
//	data:	需要交互的数据
//	func:	回调函数
//	async:	true-异步；false-同步，默认是异步
function ajax_f(url, data, func, async){
	if (isNull(async)) {
		async = true;
	}
	$.ajax({
		url : url,
		data : data,
		async : async,
		type : "post",
		success : function(msg) {
			if (msg == "fail") {
				window.top.layer.msg("操作失败，请联系管理员！", {icon : 2});
			} else {
				func(msg);
			}
		},
		error : function(e) {
			window.top.layer.msg("操作失败，请联系管理员！", {icon : 2});
			console.log("url-->" + url + "；error-->" + JSON.stringify(e));
		}
	});
}
//是否为空的校验
//空的返回true，不是则返回false
function isNull(value) {
	if (value == undefined) {
		return true;
	}
	if (value == null) {
		return true;
	}
	value = value + "";
	if (value == "") {
		return true;
	}
	return false;
}
// 置顶弹窗口
//	url:	打开窗口页面的访问路径
//	title:	窗口的标题,不传东西则无标题
//	area:	窗口的大小,默认["90%","90%"]
//	endFunc:关闭窗口触发方法
//	closeBtn:按钮的样式(0,1,2)(默认是2)
//	offset:弹窗位置,默认auto
function openPage(url, title, area_str, endFunc, closeBtn, offset_str) {
	if (!title) {
		title = "";
	}
	var area;
	if(area_str){
		var ii = area_str.split(",");
		area = [ii[0],ii[1]];
	} else {
		area = ["90%","90%"];
	}
	if(isNull(closeBtn)){
		closeBtn = 2;
	}
	var offset = "auto";
	if(isNull(offset_str)) {
		var browser = getBrowser();
		if(browser == "Firefox"){
			offset = "20px";
		}
	} else {
		var ii = offset_str.split(",");
		offset = [ii[0],ii[1]];
	}
	window.top.layer.open({
		shift: 5,
		type : 2,
		title : title,
		closeBtn : closeBtn,
		shade : 0.5,
		area : area,
		offset : offset,
		content : encodeURI(url),
	    success : function(layero,index){
	    	var win = layero.find("iframe")[0].contentWindow;
	    	try {
	    		win.setParent(window,index);
	    	} catch(e){
	    		
	    	}
	    },
	    end: function(){
	    	if(endFunc) endFunc();
	    }
	});
}
//基于父界面的弹窗
function openPage_p(url, title, area_str, endFunc, closeBtn, offset_str) {
	if (!title) {
		title = "";
	}
	var area;
	if(area_str){
		var ii = area_str.split(",");
		area = [ii[0],ii[1]];
	} else {
		area = ["90%","90%"];
	}
	if(isNull(closeBtn)){
		closeBtn = 2;
	}
	var offset = "auto";
	if(!isNull(offset_str)) {
		var ii = offset_str.split(",");
		offset = [ii[0],ii[1]];
	}
	window.layer.open({
		shift: 5,
		type : 2,
		title : title,
		closeBtn : closeBtn,
		offset : offset,
		shade : 0.2,
		area : area,
		moveOut : true,
		content : encodeURI(url),
	    success : function(layero,index){
	    	var win = layero.find("iframe")[0].contentWindow;
	    	try {
	    		win.setParent(window,index);
	    	} catch(e){}
	    },
	    end: function(){
	    	if(endFunc) endFunc();
	    }
	});
}
//展示提示信息
function doInfo(content) {
	if (isNull(content)) {
		content = "";
	}
	content = "<span style='font-weight: bold;'>" + content + "</span>";
	window.top.layer.msg(content, {
		time : 0,
		btn : [ "知道了" ],
		icon : 3,
		shift : 5,
		shade : 0.3
	});
}
//提示信息通用方法
//	info:提示语句(必填)
//	func:点击[我确定],回调函数(必填)
//	func2:点击[我再看看],回调函数(非必填)
//	endFunc:关闭窗口的回调函数(非必填)
function doConfirm(info, func, func2, endFunc) {
	info = "<span style='font-weight: bold;'>" + info + "</span>";
	window.top.layer.confirm(info, {
		title : "",
		shift : 5,
		closeBtn : 2,
		icon : 3,
		btn : [ "我确定", "我再看看" ],
		end : function(i) {
			window.setTimeout(function() {
				window.top.layer.close(i);
				if (endFunc) {
					endFunc();
				}
			}, 1);
		}
	}, function(i) {
		window.setTimeout(function() {
			window.top.layer.close(i);
			func();
		}, 1);
	}, function(i) {
		window.setTimeout(function() {
			window.top.layer.close(i);
			if (func2) {
				func2();
			}
		}, 1);
	});
}
//小窗口打开一份PDF
function openPDF(url) {
	window.layer.open({
		type : 2,
		content : url + "?v=" + getCurTime(),
		title : "说明",
		shift : 5,
		moveOut : true,
		maxmin : true,
		area : [ "500px", "350px" ],
		shade : 0,
		resize : true
	});
}
// 精度加法（如要减法，则传负数即可；如集合里有空值，则按0处理）
// 	arr：加数数组，例如add([1,2,3,4])-->10
function add(arr) {
	var result = 0;
	for (var i = 0; i < arr.length; i++) {
		var a = isNull(arr[i]) ? 0 : arr[i];
		if (a != 0) {
			result = Math.floor(mul([a, 1000000]) + mul([result, 1000000])) / 1000000;
		}
	}
	return result;
}
// 精确乘法（如集合里有空值，则按1处理）
//	arr：乘数数组，例如mul([1,2,3,4])-->24
function mul(arr) {
	var result = 1;
	for (var i = 0; i < arr.length; i++) {
		var m = 0;
		var s1 = (isNull(arr[i]) ? 1 : arr[i]).toString();
		var s2 = result.toString();
		try {
			m += s1.split(".")[1].length;
		} catch (e) {}
		try {
			m += s2.split(".")[1].length;
		} catch (e) {}
		result = (Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m));
	}
	return result;
}
// 遮罩层
// 	isTop：true-置顶遮罩；false-基于父页面遮罩（默认true）
function load(isTop) {
	if (isNull(isTop)) {
		isTop = true;
	}
	var loadIndex = "";
	if (isTop == false) {
		
		loadIndex = window.layer.load(1, {
			shade : [ 0.1, "#FFF" ]
		});
	} else {
		loadIndex = window.top.layer.load(1, {
			shade : [ 0.1, "#FFF" ]
		});
	}
	return loadIndex;
}
// 关闭遮罩层
function closeLoad(loadIndex) {
	try {window.top.layer.close(loadIndex);} catch(e1) {}
	try {window.layer.close(loadIndex);} catch(e2) {}
}
//判断浏览器
function getBrowser() {
	//取得浏览器的userAgent字符串
	var userAgent = navigator.userAgent;
	// 火狐浏览器
	if(userAgent.indexOf("Firefox") != -1){
		return "Firefox";
	}
	// 判断IE浏览器
	var ieVerison = IEVersion(userAgent);
	if(ieVerison != -1) {
		return "IE";
	}
}
//判断是否是IE浏览器以及浏览器版本
function IEVersion(userAgent) {
	//取得浏览器的userAgent字符串
	if(isNull(userAgent)) {
		var userAgent = navigator.userAgent;
	}
	//判断是否IE<11浏览器  
	var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1;
	//判断是否IE的Edge浏览器  
	var isEdge = userAgent.indexOf("Edge") > -1 && !isIE;
	var isIE11 = userAgent.indexOf("Trident") > -1 && userAgent.indexOf("rv:11.0") > -1;
	if (isIE) {
		var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
		reIE.test(userAgent);
		var fIEVersion = parseFloat(RegExp["$1"]);
		if (fIEVersion == 7) {
			return 7;
		} else if (fIEVersion == 8) {
			return 8;
		} else if (fIEVersion == 9) {
			return 9;
		} else if (fIEVersion == 10) {
			return 10;
		} else {
			//IE版本<=7
			return 6;
		}
	} else if (isEdge) {
		return "edge";
	} else if (isIE11) {
		return 11;
	} else {
		//不是ie浏览器
		return -1;
	}
}

//获取系统默认查询起始年份
function getDefaultStartYear(){
	return (getCurTime(8)-5);
}
//获取系统默认查询终止年份
function getDefaultEndYear(){
	return (getCurTime(8)-2);
}