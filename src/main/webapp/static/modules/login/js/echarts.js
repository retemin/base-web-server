
$(document).ready(function(){
	columnar1();//超标车型结构分析
	columnar2(); //设备连接率4个
	columnar3(); //各地市连接率
	columnar4(); //设备连接日历
	columnar5(); //数据连接情况
	initJsNumList();//接收数量
});
	var exceedingSTCarChart = echarts.init(document.getElementById("exceedingSTCar"));
	var reportChart = echarts.init(document.getElementById("report"));
	var enterpriseChart = echarts.init(document.getElementById("enterprise")); 
	var equitmentChart = echarts.init(document.getElementById("equitment"));
	var equipm1Chart = echarts.init(document.getElementById("equipm1")); //设备连接率
	var equipm2Chart = echarts.init(document.getElementById("equipm2")); //设备连接率
	var equipm3Chart = echarts.init(document.getElementById("equipm3")); //设备连接率
	var equipm4Chart = echarts.init(document.getElementById("equipm4")); //设备连接率
	function columnar1(){
		var dataOne = [];
		var dataTwo = [];
		var dataThree = [];
		$.post(_ctx + "/yc/point/getCarStatistics",{},function(msg){
			var dataOne = [];
			if(msg.status == 1){
				if(msg.data.length > 0){
					$.each(msg.data,function(i,val){
						dataOne.push(msg.data[i]["NAME"]);
						if(msg.data[i].TYPE =='cl'){
							dataTwo.push({"name":msg.data[i].NAME,"value":msg.data[i].SUM})
						}else{
							dataThree.push({"name":msg.data[i].NAME,"value":msg.data[i].SUM})
						}
					})
					var exceedingSTCarOption = {
						tooltip: {
							trigger: 'item',
							formatter: "{b} : {c} ({d}%)"
						},
						color: ['#8ba4ff', '#ffb6ff', '#a88fe3', '#60daff', '#508ff9', '#4ebade', '#8ef5e2', '#f8b274', '#41aeff',
							'#ff21bc', '#ed7d31', '#2099de'
						],
						legend: {
							x: 'center',
							// y : 'bottom',
							left: 20,
							right: 20,
							bottom: 15,
							// width: 160,
							itemGap: 12,
							itemWidth: 12,
							itemHeight: 6,
							formatter: "{name}",
							data: dataOne
						},
						calculable: true,
						series: [{
							name: '面积模式',
							type: 'pie',
							radius: ['35%', '45%'],
							center: ['50%', '40%'],
							label: {
								normal: {
									fontSize: 15,
									
								}
							},
							data: dataTwo
						}, {
							name: '面积模式',
							type: 'pie',
							radius: ['0%', '25%'],
							center: ['50%', '40%'],
							 label: {
								normal: {
									show: false,
									position: 'outer',
									fontSize: 15,
									formatter: "{b} \n {d}%"
								}
							}, 
							data: dataThree
						}]
					}
					exceedingSTCarChart.setOption(exceedingSTCarOption);
					window.addEventListener("resize", function() {
						exceedingSTCarChart.resize();
					});
				}
			}
		});
	}
	
	
	function columnar2(){
		var dataOne = [];
		var dataTwo = [];
		var dataThree = [];
		var dataFour = [];
		$.post(_ctx + "/yc/point/getEquipmentStatistics",{},function(msg){
			var dataOne = [];
			if(msg.status == 1){
				if(msg.data.length > 0){
					$.each(msg.data,function(i,val){
						dataOne.push(msg.data[i]["APER"]);//垂直式
						dataTwo.push(msg.data[i]["BPER"]);//水平式
						dataThree.push(msg.data[i]["CPER"]);//移动式
						dataFour.push(msg.data[i]["ZHPER"]);
					})
					/**
					 * 垂直式统计
					 */
					var equipm1Option = { //设备连接率
						title: [{
							text: dataOne+'%',
							x: 'center',
							y: '40%',
							textStyle: {
								fontSize: 20,
								fontWeight: 'normal',
								fontStyle: 'normal',
								color: '#333333'
							},
						}],
						color: ['#94dc21', '#ccc', 'transparent'],
						series: [{
							type: 'pie',
							radius: ['70%', '100%'],
							startAngle: 180,
							center: ['50%', '50%'],
							hoverAnimation: false,
							label: {
								normal: {
									show: false,
									position: 'center'
								},
							},
							data: [{
								value: dataOne,
							}, {
								value: 100-dataOne,
							}, {
								value: 100,
							}]
						}, ]
					}
					equipm1Chart.setOption(equipm1Option);
					window.addEventListener("resize", function() {
						equipm1Chart.resize();
					});
					/**
					 * 水平式统计
					 */
					var equipm2Option = { //设备连接率
							title: [{
								text: dataTwo+'%',
								x: 'center',
								y: '40%',
								textStyle: {
									fontSize: 20,
									fontWeight: 'normal',
									fontStyle: 'normal',
									color: '#333333'
								},
							}],
							color: ['#4d71fb', '#ccc', 'transparent'],
							series: [{
								type: 'pie',
								radius: ['70%', '100%'],
								startAngle: 180,
								center: ['50%', '50%'],
								hoverAnimation: false,
								label: {
									normal: {
										show: false,
										position: 'center'
									},
								},
								data: [{
									value: dataTwo,
								}, {
									value: 100-dataTwo,
								}, {
									value: 100,
								}]
							}, ]
						}
						equipm2Chart.setOption(equipm2Option);
						window.addEventListener("resize", function() {
							equipm2Chart.resize();
						});
						/**
						 * 移动式统计
						 */
						var equipm3Option = { //设备连接率
								title: [{
									text: dataThree+'%',
									x: 'center',
									y: '40%',
									textStyle: {
										fontSize: 20,
										fontWeight: 'normal',
										fontStyle: 'normal',
										color: '#333333'
									},
								}],
								color: ['#f20d12', '#ccc', 'transparent'],
								series: [{
									type: 'pie',
									radius: ['70%', '100%'],
									startAngle: 180,
									center: ['50%', '50%'],
									hoverAnimation: false,
									label: {
										normal: {
											show: false,
											position: 'center'
										},
									},
									data: [{
										value: dataThree,
									}, {
										value: 100-dataThree,
									}, {
										value: 100,
									}]
								}]
							}
							equipm3Chart.setOption(equipm3Option);
							window.addEventListener("resize", function() {
								equipm3Chart.resize();
							});
							/**
							 * gis地图 连接率统计
							 */
							var equitmentOption = {
									tooltip: {
										trigger: 'item',
										formatter: '{a} <br/>{b} : {c} %'
									},
									series: [{
										name: '仪表盘',
										type: 'gauge',
										data: [{
											value: dataFour,
										}],
										radius: '80%',
										center: ['50%', '50%'],
										min: 0,
										max: 100,
										splitNumber: 10,
										axisLine: { // 坐标轴线
											lineStyle: { // 属性lineStyle控制线条样式
												width: 8,
												color: [
													[0.2, '#62c87f'],
													[0.8, '#5d9cec'],
													[1, '#f15755']
												]
											}
										},
										axisTick: { // 坐标轴小标记
											length: 13, // 属性length控制线长
											lineStyle: { // 属性lineStyle控制线条样式
												color: 'auto'
											}
										},
										splitLine: { // 分隔线
											length: 15, // 属性length控制线长
											lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
												color: 'auto'
											}
										},
										axisLabel: {
											color: '#666',
											fontSize: 10,
										},
										detail: {
											formatter: '{value}%',
											fontSize: 16,
											offsetCenter: [0, '85%']
										},
										pointer: {
											width: 3 // 指针大小
										}
									}]
								}
							equitmentChart.setOption(equitmentOption);
							window.addEventListener("resize", function() {
								equitmentChart.resize();
							});
				}
			}
		});
  }
	function columnar3(){
		$.post(_ctx + "/yc/point/getAreaStatistics",{},function(msg){
			var dataOne = [];
			var dataTwo = [];
			if(msg.status == 1){
				if(msg.data.length > 0){
					$.each(msg.data,function(i,val){
						dataOne.push(msg.data[i]["NAME"]);
						dataTwo.push(val["APER"]);
					})
					var equipm4Option = { //设备连接率
						color: ['#4c72fb', '#ed4e0c'],
						tooltip: {
							trigger: 'axis',
							extraCssText:'width:100px;height:80px;background:#6e6e6eb8'
						},
						grid: {
							left: '3%',
							right: '4%',
							bottom: '3%',
							top: '11%',
							containLabel: true
						},
						xAxis: [{
							type: 'category',
							data: dataOne,
							axisTick: {
								alignWithLabel: true
							},
							axisLabel: {
								show: true,
								rotate: 55,
								textStyle: {
									color: '#333',
								},
							},
						}],
						yAxis: [{
							type: 'value',
							name: '%',
							min: 0,
							max: 100,
							nameTextStyle: {
								fontSize: 14
							}
						}],
						series: [{
							type: 'bar',
							barWidth: '15',
							data: dataTwo,
							itemStyle: {
								normal: {
									barBorderRadius: 7.5,
								}
							},
						}, {
							type: 'line',
							data: dataTwo
						}]
					}
					equipm4Chart.setOption(equipm4Option);
					window.addEventListener("resize", function() {
						equipm4Chart.resize();
					});
				}
			}
		});
	}
	
	function columnar4(){
		var planlist; 
		var heatmapData = [];//数值
		var lunarData = []; //日历 
		$.post(_ctx + "/yc/point/getDeviceStatistics",{},function(msg){
			var dataOne = [];
			var dataTwo = [];
			if(msg.status == 1){
				if(msg.data.length > 0){
					planlist=msg.data;
					   var daysOfMonth=[];
					   var fullYear = new Date().getFullYear();
					   var month = new Date().getMonth()+1;
					   var lastDayOfMonth  = new Date(fullYear,month,0).getDate();
					   for ( var i = 1; i <= lastDayOfMonth; i++) {
						   if(month<10){
							   if(i<10){
								   daysOfMonth.push(fullYear+'-'+'0'+month+'-'+'0'+i);//月  日补0
							   }else{
								   daysOfMonth.push(fullYear+'-'+'0'+month+'-'+i);
							   }
						   }else{
							   if(i<10){
								   daysOfMonth.push(fullYear+'-'+month+'-'+'0'+i);//日补0
							   }else{
								   daysOfMonth.push(fullYear+'-'+month+'-'+i);
							   }
						   }
					   }  
					   for (var i = 0; i < daysOfMonth.length; i++) { //循环  匹配时间  插入对应的值
						      var temp = daysOfMonth[i]; 
						  for ( var j = 0; j < planlist.length; j++) { 
						      if (temp==planlist[j].GETTIME){ 
						           heatmapData.push([temp,planlist[j].APER]); //匹配对应的时间段和数值
						            break; 
						       }else{ 
						           if(j==(planlist.length-1)){ 
						               heatmapData.push([temp,0]); //没有相对应的时间 补零(日历格式)
						                 break; 
						         } 
						       } 
						     } 
						   lunarData.push([ 
						   daysOfMonth[i], //eg:2017-1-1 
						   2 
						   // daysOfMonth[i][1],//eg:初四 
						   // daysOfMonth[i][2] //eg:春分 
						   ]); 
						   }

						   var date = new Date(); 
						   var todaytime=date.toLocaleDateString();//当前时间（年月日） 
						   var year = date.getFullYear(); 
						   var month = date.getMonth()+1; 
						   if(month<10){
							   var mydate=(year.toString()+"-"+'0'+month.toString()); //得到的月份和年份
						   }else{
							   var mydate=(year.toString()+"-"+month.toString()); //得到的月份和年份
						   }
					var enterpriseOption = {
						tooltip: {
							formatter: function(params) {
								return params.value[0]+'<br/>'+'设备连接率: ' + params.value[1];
							}
						},
						visualMap: {
							show: true,
							calculable: true,
							seriesIndex: [2],
							orient: 'vertical',
							 textGap:10, 
							left: 'left',
							bottom: 20, 
							type: 'piecewise',
					          pieces: [                //对应的值匹配对应的背景颜色
					        	 {
					        	    max: 50,
			                        label: '<50%',
			                        color:'#f20d13',
					             }, // 不指定 max，表示 max 为无限大（Infinity）。
					             {
					                 min: 50,
					                 max: 60,
					                 label: '50-60%',
					                 color:'#e57918',
					             },
					             {
					                 min: 60,
					                 max: 70,
					                 label: '60-70%',
					                 color:'#e394b9',
					             },
					             {
					                 min: 70,
					                 max: 80,
					                 label: '70-80%',
					                 color:'#ebc38a',
					             },
					             {
					                 min: 80,
					                 max: 90,
					                 label: '80-90%',
					                 color:'#eff049',
					             },
					             {
					                 min: 90,
					                 max: 100,
					                 label: '90-100%',
					                 color:'#94dd25',
					             },
					         ],
			                color: '#fff',
			                textStyle: {
			                    color: 'grey',
			                },
			                visibility: 'off'
			            },
						calendar: [{
							left: '25%',
							right: '5%',
							bottom: '5%',
							top: '20%',
							cellSize: 'auto',
							yearLabel: {
								show: false
							},
							orient: 'vertical',
							dayLabel: {
								firstDay: 1,
								nameMap: 'cn'
							},
							monthLabel: {
								show: false
							},
							range: mydate    //当前年月
						}],
				
						series: [{
							type: 'scatter',
							coordinateSystem: 'calendar',
							symbolSize: 1,
							label: {
								normal: {
									show: true,
									formatter: function(params) {
										var d = echarts.number.parseDate(params.value[0]);
										return d.getDate();
									},
									textStyle: {
										color: '#000'
									}
								}
							},
							data: lunarData
						}, {
							type: 'scatter',
							coordinateSystem: 'calendar',
							symbolSize: 1,
							label: {
								normal: {
									show: true,
									formatter: function(params) {
										return '\n\n\n' + (params.value[3] || '');
									},
									textStyle: {
										fontSize: 14,
										fontWeight: 600,
										color: '#EE0000'
									}
								}
							},
							data: lunarData
						}, {
							name: '设备连接率',
							type: 'heatmap',
							coordinateSystem: 'calendar',
							data: heatmapData
						}]
					}
					enterpriseChart.setOption(enterpriseOption);
					window.addEventListener("resize", function() {
						enterpriseChart.resize();
					});
				}
			}
		});
	}
	function columnar5(){
		$.post(_ctx + "/yc/point/getDataStatistics",{},function(msg){
			var dataOne = [];
			var dataTwo = [];
			var dataThree = [];
			if(msg.status == 1){
				if(msg.data.length > 0){
					$.each(msg.data,function(i,val){
						dataOne.push(msg.data[i]["NAME"]);
						dataTwo.push(val["JSNUM"]);
						dataThree.push(val["SBNUM"]);
					})
					var reportOption = {
						tooltip: {
							trigger: 'axis'
						},
						color: ['#6380e0', '#f69641'],
						legend: {
							show: false,
							data: ['总接收量', '总上报量']
						},
						grid: [{
							left: 10,
							right: 20,
							bottom: 20,
							top: 50,
							containLabel: true
						}],
						calculable: true,
						xAxis: [{
							type: 'category',
							axisLine: {
								show: true,
								lineStyle: {
									color: '#dbdbdb',
									width: 4
								}
							},
							axisTick: {
								show: false
							},
							axisLabel: {
								show: true,
								textStyle: {
									color: '#333'
								},
							},
							data: dataOne
						}],
						yAxis: [{
							type: 'value',
							name: '条',
							nameTextStyle: {
								fontSize: 14
							}
						}],
						series: [{
								name: '总接收量',
								type: 'bar',
								data: dataTwo,
								barWidth: 12,
								barGap: '50%',
								itemStyle: {
									normal: {
										//柱形图圆角，初始化效果
										barBorderRadius: [5, 5, 5, 5],
										label: {
											show: true, //是否展示
											textStyle: {
												fontWeight: 'normal',
												fontSize: '10',
												fontFamily: '微软雅黑',
											}
										}
									}
								},
								label: {
									normal: {
										show: true,
										fontSize: 10,
										position: 'top'
									}
								},
							},
							{
								name: '总上报量',
								type: 'bar',
								data: dataThree,
								barWidth: 12,
								barGap: '50%',
								itemStyle: {
									normal: {
										//柱形图圆角，初始化效果
										barBorderRadius: [5, 5, 5, 5],
										label: {
											show: true, //是否展示
											textStyle: {
												fontWeight: 'normal',
												fontSize: '10',
												fontFamily: '微软雅黑',
											}
										}
									}
								},
								label: {
									normal: {
										show: true,
										fontSize: 10,
										position: 'top'
									}
								},
							}
						]
					};
					reportChart.setOption(reportOption);
					window.addEventListener("resize", function() {
						reportChart.resize();
					});
				}
			}
		});
	}


	if (document.body.offsetWidth >= 1920) {
		exceedingSTCarOption.legend.itemWidth = 15;
		exceedingSTCarOption.legend.itemHeight = 8;
		exceedingSTCarOption.legend.itemGap = 15;
	}
	//exceedingSTCarChart.setOption(exceedingSTCarOption);
	//reportChart.setOption(reportOption);
	//enterpriseChart.setOption(enterpriseOption);
	//equitmentChart.setOption(equitmentOption);
	//equipm1Chart.setOption(equipm1Option);
	//equipm2Chart.setOption(equipm2Option);
	//equipm3Chart.setOption(equipm3Option);
	//equipm4Chart.setOption(equipm4Option);


	window.onresize = function(e) {
		if (document.body.offsetWidth >= 1920) {
			exceedingSTCarOption.legend.itemWidth = 15;
			exceedingSTCarOption.legend.itemHeight = 8;
			exceedingSTCarOption.legend.itemGap = 15;
		} else {
			exceedingSTCarOption.legend.itemWidth = 12;
			exceedingSTCarOption.legend.itemHeight = 6;
			exceedingSTCarOption.legend.itemGap = 12;
		}
		//exceedingSTCarChart.setOption(exceedingSTCarOption);
		//enterpriseChart.setOption(enterpriseOption);
		//equitmentChart.setOption(equitmentOption);
		//exceedingSTCarChart.resize();
		//reportChart.resize();
		//enterpriseChart.resize();
		//equitmentChart.resize();
		//equipm1Chart.resize();
		//equipm2Chart.resize();
		//equipm3Chart.resize();
		//equipm4Chart.resize();
	}

	var visualImg = document.getElementById("visual");
	var visualDom = {
		div: visualImg,
		speedX: 1,
		speedY: 1,
		x: -120,
		y: 100
	}
	var animationFrameID = null;
	setTimeout(function() {
		visualImg.style.display = 'block';
		// var timer = setInterval(function(){
		move();
		// }, 20);
		visualImg.addEventListener('mouseover', function() {
			cancelAnimationFrame(animationFrameID);
		});
		visualImg.addEventListener('mouseout', function() {
			animationFrameID = requestAnimationFrame(move);
		});
	}, 2000);

	setInterval(function() {
		setTimeout(function() {
			visualImg.style.display = 'none';
		}, 20000); //消失
		visualImg.style.display = 'block';
	}, 30000);

	function move() {
		draw(visualDom);
		updata(visualDom);
		animationFrameID = requestAnimationFrame(move);
	}

	function draw(obj) {
		obj.div.style.top = obj.y + 'px';
		obj.div.style.left = obj.x + 'px';
	}

	function updata(obj) {
		obj.x = obj.div.offsetLeft + obj.speedX;
		obj.y = obj.div.offsetTop + obj.speedY;
		if (obj.x < 0) {
			obj.x = 0;
			obj.speedX *= (-1);
		}
		if (obj.y < 0) {
			obj.y = 0;
			obj.speedY *= (-1);
		}
		if (obj.x > (window.innerWidth - 120)) {
			obj.x = window.innerWidth - 120;
			obj.speedX *= (-1);
		}
		if (obj.y > (window.innerHeight - 120)) {
			obj.y = window.innerHeight - 120;
			obj.speedY *= (-1);
		}
	} 
	
	function initJsNumList() {
		var str = jsNum;
		var strCollection =converStr(str).split(",");
		var list="";
		if(strCollection.length<6){//不够六位数  前面补0 (不解释  设计上是这么说的  有问题 找设计)
			for (var i = 0; i < 6-strCollection.length; i++) {
				list+='<span>'+0+'</span>';
		    }  
		}
		for (var i = 0; i < strCollection.length; i++) {
			list+="<span>"+strCollection[i]+"</span>";
	    }  
		$("#jsList").html(list);
	}
	function converStr(str){//给数字字符串添加逗号分隔符
		 if(/\./.test(str)){
			return str.replace(/\d(?=(\d{1})+\.)/g, "$&,").split("").reverse().join("").replace(/\d(?=(\d{1})+\.)/g, "$&,").split("").reverse().join("");
		 }else{
			return str.replace(/\d(?=(\d{1})+$)/g, "$&,");
		 }

	}
