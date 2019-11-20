
var daymap={};
var  maindayData={};
// 关于月份： 在设置时要-1，使用时要+1
$(function() {
	var d = new Date();
	laydate.render({
		elem : '#dataTime',
		type : 'month',
		value : d.getFullYear() + '-' + lay.digit(d.getMonth() + 1)
	});
	
	
	reload();
	
	/* 查询 */
	$("#search").click(function(e) {
		reload();
	});
});

function reload(){
 
	$("#calendar").html(""); 
	$('#calendar').calendar({
		ifSwitch : false, // 是否切换月份
		hoverDate : true, // hover是否显示当天信息
		backToday : true  // 是否返回当天
	});

}
 

(function($, window, document, undefined) {
	 
	var Calendar = function(elem, options) {
     	this.$calendar = elem;

		this.defaults = {
			ifSwitch : true,
			hoverDate : false,
			backToday : false
		};

		this.opts = $.extend({}, this.defaults, options);

		// console.log(this.opts);
	};

	Calendar.prototype = {
		 
		showHoverInfo : function(obj) { // hover 时显示当天信息
			var _dateStr = $(obj).attr('data');
			var offset_t = $(obj).offset().top+ (this.$calendar_today.height() - $(obj).height()) / 2;
			var offset_l = $(obj).offset().left + $(obj).width();
			
			var changeStr = _dateStr.substr(0, 4) + '-' + _dateStr.substr(4, 2)+ '-' + _dateStr.substring(6);
			
			var _week = changingStr(changeStr).getDay();
			var _weekStr = '';

			this.$calendar_today.show();

			this.$calendar_today.css({
				left : offset_l + 30,
				top : offset_t
			}).stop().animate({
				left : offset_l + 16,
				top : offset_t,
				opacity : 1
			});

			switch (_week) {
			case 0:
				_weekStr = '星期日';
				break;
			case 1:
				_weekStr = '星期一';
				break;
			case 2:
				_weekStr = '星期二';
				break;
			case 3:
				_weekStr = '星期三';
				break;
			case 4:
				_weekStr = '星期四';
				break;
			case 5:
				_weekStr = '星期五';
				break;
			case 6:
				_weekStr = '星期六';
				break;
			}
			
			//组装弹出aqi
            if(maindayData[changeStr]!=""&&maindayData[changeStr]!=undefined){
            	 var aqiStr="";
				 aqiStr+="AQI:"+maindayData[changeStr]['AQI_VALUE'];
				 aqiStr+="<br>空气质量："+maindayData[changeStr]['AQI_LEVEL'];
				 aqiStr+="<br>PM2.5:"+maindayData[changeStr]['PMTWO'];
				 aqiStr+="<br>PM10:"+maindayData[changeStr]['PMTEN'];
				 aqiStr+="<br>CO:"+maindayData[changeStr]['CO'];
				 aqiStr+="<br>O₃:"+maindayData[changeStr]['OEIGHT'];
				 aqiStr+="<br>SO₂:"+maindayData[changeStr]['SOTWO'];
				 aqiStr+="<br>NO₂:"+maindayData[changeStr]['NOTWO'];
				  
            	this.$calendarToday_date.html(aqiStr);
            }else{
            	this.$calendarToday_date.text("暂无数据");
            }
		 
		},
		
        getData:function(){
        	var dataMaps={};
        	var d = new Date();
			var date=$("#dataTime").val();
			var titleDate="";
			if(date==null||date=='undefined'||date==''){
				var d = new Date();
				date=d.getFullYear() + '-' + lay.digit(d.getMonth() + 1);
			}
			titleDate=date.substring(0, 4) + '年' + date.substring(6,7);
			$("#title").html(titleDate + "月AQI日历");
			 
		    $.get(_ctx + "/aqiRank/getConut", {"dataTime" : date}, function(msg) {
				if (msg.status == 1) {
					
					for (var i = 0; i < msg.data.length; i++) {
						var datamap= msg.data[i];
						var key=datamap.DT;
						var value=datamap.AQI_VALUE;
						 
						 var itemData={};
						 itemData['AQI_VALUE']=datamap.AQI_VALUE;
						 itemData['AQI_LEVEL']=datamap.AQI_LEVEL;
						 itemData['PMTWO']=datamap.PMTWO;
						 itemData['PMTEN']=datamap.PMTEN;
						 itemData['CO']=datamap.CO;
						 itemData['OEIGHT']=datamap.OEIGHT;
						 itemData['SOTWO']=datamap.SOTWO;
						 itemData['NOTWO']=datamap.NOTWO;
						 
						 dataMaps[key]=itemData;
						 
						/*console.log(ssssssssss); */
					}
					 
					/*console.log(datamapR);*/
					Calendar.prototype.showCalendar(dataMaps);
					maindayData=dataMaps;
				} else {
					layer.error("加载数据失败");
				}
			});
		     
		},
		
		//显示日期改变颜色的方法
		showCalendar : function(dataMap) { // 输入数据并显示
			/*console.log("------------------");*/
			/*console.log(dataMap);*/
			var self = this;
			var dataT = $("#dataTime").val();
			 
			var dataT=$("#dataTime").val();
			
			if(dataT==null||dataT=='undefined'||dataT==''){
				var d = new Date();
				dataT=d.getFullYear() + '-' + lay.digit(d.getMonth() + 1);
			}
			
			var year = dataT.substring(0, 4);
			// 默认的月份
			var month = dataT.substring(6, 7);
			// 默认的日期
			var dateStr = '';
			var firstDay = new Date(year, month - 1, 1); // 当前月的第一天
			
			
			daymap.each(function(i) {
				// allDay: 得到当前列表显示的所有天数
				var allDay = new Date(year, month - 1, i + 1- firstDay.getDay());
				var allDay_str = returnDateStr(allDay);
				var allDay_str_new = returnDateStrNew(allDay);

				 $(this).text(allDay.getDate()).attr('data', allDay_str);
				 
				// 如果是选中的日子，改变样式-----------------------------
				if (dataMap[allDay_str_new]!=null) {
					
					 
					var dataNumber=parseInt(dataMap[allDay_str_new]['AQI_VALUE']);
					  
				    if(1<=dataNumber&&dataNumber<=50){
				    	$(this).attr('class', 'item item-curDay-green');
				    }
				    if(51<=dataNumber&&dataNumber<=100){
				    	$(this).attr('class', 'item item-curDay-yellow');
				    }
				    if(101<=dataNumber&&dataNumber<=150){
				    	$(this).attr('class', 'item item-curDay-orange');
				    }
				    if(151<=dataNumber&&dataNumber<=200){
				    	$(this).attr('class', 'item item-curDay-red');
				    }
				    if(201<=dataNumber&&dataNumber<=300){
				    	$(this).attr('class', 'item item-curDay-purple');
				    }
				    if(300<dataNumber){
				    	$(this).attr('class', 'item item-curDay-yz');
				    }
					  
				}  
				else if (returnDateStr(firstDay).substr(0, 6) === allDay_str.substr(0, 6)) {
			         
					$(this).attr('class', 'item item-curMonth');
		        } else {
		        
		          $(this).attr('class', 'item');
		        }
			});
		},

		renderDOM : function() { // 渲染DOM

			/* this.$calendar_title = $('<div class="calendar-title" ></div>'); */
			this.$calendar_week = $('<ul class="calendar-week"></ul>');
			this.$calendar_date = $('<ul class="calendar-date"></ul>');
			this.$calendar_today = $('<div class="calendar-today"></div>');
 
			var _weekStr = '<li class="item">日</li>'
					+ '<li class="item">一</li>' + '<li class="item">二</li>'
					+ '<li class="item">三</li>' + '<li class="item">四</li>'
					+ '<li class="item">五</li>' + '<li class="item">六</li>';
			var _dateStr = '';
			var _dayStr = '<i class="triangle"></i>' + '<p class="date"></p>'
					+ '<p class="week"></p>';

			for (var i = 0; i < 6; i++) {
				_dateStr += '<li class="item">26</li>'
						+ '<li class="item">26</li>'
						+ '<li class="item">26</li>'
						+ '<li class="item">26</li>'
						+ '<li class="item">26</li>'
						+ '<li class="item">26</li>'
						+ '<li class="item">26</li>';
			}

			/* this.$calendar_title.html(_titleStr); */
			this.$calendar_week.html(_weekStr);
			this.$calendar_date.html(_dateStr);
			this.$calendar_today.html(_dayStr);

			this.$calendar.append(this.$calendar_title, this.$calendar_week,this.$calendar_date, this.$calendar_today);
			this.$calendar.show();
		},

		inital : function() { // 初始化
			
			var datamapaa={};
			var self = this;

			this.renderDOM();
 
			this.$calendarDate_item = this.$calendar_date.find('.item');
			daymap=this.$calendarDate_item;
			this.$calendarToday_date = this.$calendar_today.find('.date');
			this.$calendarToday_week = this.$calendar_today.find('.week');
			this.getData();
 
			//this.showCalendar(datamapaa);
 
			 
			this.$calendarDate_item.hover(function() {

				self.showHoverInfo($(this));
			}, function() {
				self.$calendar_today.css({
					left : 0,
					top : 0
				}).hide();
			});
		},

		constructor : Calendar
	};

	
	//初始化-------------
	$.fn.calendar = function(options) {
		 
		var calendar = new Calendar(this, options);
		return calendar.inital();
	};
 
	// ========== 使用到的方法 ==========

	var dateObj = (function() {
		var _date = new Date();

		return {
			getDate : function() {
				return _date;
			},

			setDate : function(date) {
				_date = date;
			}
		}
	})();

	// 时间转成 20190626这种
	function returnDateStr(date) { // 日期转字符串
		var year = date.getFullYear();
		var month = date.getMonth() + 1;
		var day = date.getDate();
  
		month = month <= 9 ? ('0' + month) : ('' + month);
		day = day <= 9 ? ('0' + day) : ('' + day);

		return year + month + day;
	}
	;
	function returnDateStrNew(date) { // 日期转字符串
		var year = date.getFullYear();
		var month = date.getMonth() + 1;
		var day = date.getDate();
  
		month = month <= 9 ? ('0' + month) : ('' + month);
		day = day <= 9 ? ('0' + day) : ('' + day);

		return year +'-'+ month+'-' + day;
	}
	;
	// 日期时间转换 2019-06-26 转成 20190626这种
	function changingStr(fDate) { // 字符串转日期
		var fullDate = fDate.split("-");
		return new Date(fullDate[0], fullDate[1] - 1, fullDate[2]);
	}
	;

})(jQuery, window, document);