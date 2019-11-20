(function($){
	$.WorkDayPlugin={
		workDayList:[],
		workDayMap:{},
		isInit:false,
		initData:function(){
			var _this=this;
			$.get(_ctx+'/workday/getWorkdays',{},function(msg){
				var dateStr='';
				for(var i in msg.data){
					dateStr=msg.data[i]['start'].substring(0,10);
					_this.workDayList.push(msg.data[i]);
					_this.workDayMap[dateStr]=parseInt(i);
				}
				_this.isInit=true;
			});
		},
		//根据相差的工作日数算出期限
		getWorkDayEnd:function(startDate,dayCount){
			while(!this.isInit){}
			var index=this.workDayMap[startDate];
			if(index){
				var i=0;
				while(true){
					if(dayCount>=0){
						if(this.workDayList[++index]['title']=='工作日'){
							i++;
							if(i>=dayCount){
								break;
							}
						}
					}else{
						if(this.workDayList[--index]['title']=='工作日'){
							i++;
							if(i>=(0-dayCount)){
								break;
							}
						}
					}
				}
				return this.workDayList[index]['start'].substring(0,10);
			}
			return null
		},
		//根据开始时间和结束时间算出之间有多少天工作日
		getWorkDayCount:function(startDate,endDate){
			while(!this.isInit){}
			var startIndex=this.workDayMap[startDate];
			var endIndex=this.workDayMap[endDate];
			
			if(startIndex!=undefined&&endIndex!=undefined){
				var i=0;
				if(startIndex==endIndex){
					return 0;
				}else if(startIndex<endIndex){
					for(var j=startIndex;j<endIndex;j++){
						if(this.workDayList[j]['title']=='工作日'){
							i++;
						}
					}
				}else{
					for(var j=endIndex;j<startIndex;j++){
						if(this.workDayList[j]['title']=='工作日'){
							i--;
						}
					}
				}
				return i;
			}
			return null;
		}
	}
	$.WorkDayPlugin.initData();
})(jQuery);