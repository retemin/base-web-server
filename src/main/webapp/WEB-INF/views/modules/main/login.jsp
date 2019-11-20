<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<html>

<head>
	<title>公司基础框架</title>
	<%@ include file="/WEB-INF/views/include/taglib.jsp"%>

	<jsp:include page="/WEB-INF/views/include/base-include.jsp">
		<jsp:param name="include" value="base,metronic,backstretch,noiframe,layer,layui" />
	</jsp:include>
	<link rel="stylesheet" type="text/css" href="${ctxStatic}/modules/login/css/index.css" />
	<link rel="stylesheet" type="text/css" href="${ctxStatic}/modules/login/fonts/iconfont.css" />
	<link rel="stylesheet" type="text/css" href="${ctxStatic}/modules/login/css/weather.css" />
</head>
<style>
	.left-img {
		width: 20px;
		height: 100%;
		position: absolute;
		right: 0;
		top: 0;
		cursor: pointer;
	}

	.left-img span:nth-child(2),
	.left-img span:nth-child(3) {
		width: 24px;
		height: 80px;
		color: #fff;
		text-align: center;
		display: flex;
		align-items: center;
		font-size: 14px;
		background: #22b9ff;
		position: absolute;
		right: -16px;
		border-radius: 0 8px 8px 0px;
		box-shadow: 1px 2px 4px 1px #908b8b;
	}

	.left-img span:nth-child(1) {
		display: inline-block;
		width: 38px;
		height: 38px;
		color: #fff;
		position: absolute;
		right: 16px;
		top: 14px;
		display: none;
	}

	.span1 {
		width: 38px;
		height: 38px;
		background: url(${ctxStatic}/modules/login/images/qiehuan.png)
	}

	.left-img span:nth-child(2) {
		top: 18%;
	}

	.left-img span:nth-child(3) {
		bottom: 18%;
	}

	form {
		display: inline-block;
	}

	.contimg {
		display: none;
	}

	.cont1 {
		display: block;

	}

	.and-img,
	.ios-img {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}

	.and-img img,
	.ios-img img {
		height: 80%;
	}

	form {
		width: 100%;
		height: 100%;
	}

	.img-title {
		color: #fff;
		text-align: center;
	}
</style>

<body ondragstart='return false;'>
	<div class="all Weather">
		<div class="dynamic-area1"></div>
		<div class="dynamic-area2"></div>

		<header class="header">
			<img src="${ctxStatic}/modules/login/images/logo.png">
			<!-- <div class="cloud"> </div> -->
		</header>
		<div class="content">

			<!-- 随机图片 -->
			<div class="planting">
				<div class="imgs"><img src="${ctxStatic}/modules/login/images/image_1.png"></div>
			</div>
			<!-- 登录 -->
			<div class="right">
				<div class="login">
					<div class="left-img">
						<span class="span1"></span>
						<span>安卓版</span>
						<!-- 	<span>苹果版</span> -->
					</div>
					<div class="login-left">
						<div class="weath">
							<div class="weath-icon">
								<i class="iconfont icon-artboard"></i>
								<span class="direction">${Weather.windscale }</span>
							</div>
							<div class="weath-icon">
								<i class="iconfont icon-shui"></i>
								<span>相对湿度</span>
								<span class="humidity">${Weather.relativehumidity}</span>
							</div>
							<div class="weath-icon">
								<i class="iconfont icon-aqi_o"></i>
								<span>空气质量</span>
								<span class="direction">
								  <c:if test="${Weather.aqi<=50}">
								     <font style="background-color: green;">${Weather.aqi} 优</font>
								  </c:if>
								  <c:if test="${50<Weather.aqi  && Weather.aqi<=100}">
								     <font style="background-color: yellow;">${Weather.aqi} 良</font>
								  </c:if>
								  <c:if test="${100<Weather.aqi && Weather.aqi<=150}">
								     <font style="background-color: orange;">${Weather.aqi} 轻度污染</font>
								  </c:if>
								  <c:if test="${150<Weather.aqi && Weather.aqi<=200}">
								     <font style="background-color: red;">${Weather.aqi} 中度污染</font>
								  </c:if> 
								  <c:if test="${200<Weather.aqi && Weather.aqi<=300}">
								     <font style="background-color: #FF00FF;">${Weather.aqi} 重度污染</font>
								  </c:if> 
								  <c:if test="${Weather.aqi>300}">
								     <font style="background-color: #8B0000;">${Weather.aqi} 严重污染</font>
								  </c:if>
								</span>
								<div class="weath-icon">
								<i class="iconfont icon-wuranyuan"></i>
								<span>首要污染物</span>
								<span class="humidity">${Weather.primaryPollutantName}</span>
							</div>
							</div>
						</div>
						<div class="weather">
							<span class="num">${Weather.temperature}</span>
							<!-- <span>
								<i>℃</i>
								
								<i class="is"><span class="weathers">晴</span> • 顺义</i>
							</span> -->
						</div>
						<div class="dates">
							<span class="iconfont icon-dingwei1"></span>
							<span class="region">太原</span>
							<span class="iconfont icon-kongqiwu"></span>
							<span>${Weather.weatherconditions}</span>
						</div>
						<div class="format">
							<span>日期:</span>&nbsp;<span class="data"></span>
							<div class="dtal-t detailtime"></div>
						</div>


					</div>

					<div class="login-right">
						<form method="POST" action="${ctx}/login" class="contimg cont1" id="loginform">
							<div class="logtex">登录</div>
							<div class="layui-form-item">
								<label class="layui-form-label"><i class="icon iconfont icon-xiaobiao-"></i></label>
								<div class="layui-input-inline">
									<input type="text" name="username" lay-verify="required" placeholder="请输入账号"
										autocomplete="off" class="layui-input">
								</div>
							</div>
							<div class="layui-form-item">
								<label class="layui-form-label"><i class="icon iconfont icon-outmen-lock"></i></label>
								<div class="layui-input-inline">
									<input type="password" name="password" lay-verify="required" placeholder="请输入密码"
										autocomplete="off" class="layui-input">
								</div>
							</div>
							<!-- <div class="verificationCode">
								<input type="text" class="verification" value="" placeholder="验证码" />
								<input type="text" class="code" value="" />
							</div> -->
							<div class="checkbox">
								<input type="checkbox" id="male" name="sex" />
								<label for="male">记住密码</label>
							</div>
							<button type="submit" class="sign">登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录</button>
						</form>
						<form action="" class="contimg">
							<div class="and-img">
								<img height="100%" src="${ctxStatic}/modules/login/images/Android.png"
									alt="">
								<div class="img-title">Android版</div>
							</div>
						</form>
						<form action="" class="contimg">
							<div class="ios-img">
								<img height="100%" src="${ctxStatic}/modules/login/images/Android.png"
									alt="">
								<div class="img-title">Ios版</div>
							</div>

						</form>
					</div>
				</div>
			</div>
		</div>
		<footer class="footer">
			<p>山西省生态环境厅</p>
			<p>Copyright&nbsp;2018-2019&nbsp;All&nbsp;Right&nbsp;Reserved&nbsp;&nbsp;&nbsp;山西省生态环境厅&nbsp;&nbsp;版权所有
			</p>
		</footer>
	</div>
</body>
<script type="text/javascript">

	var loginMessage = "${message}";

	if(loginMessage!=""){
		layer.error(loginMessage,{closeBtn:null});
	}
	$(function () {
		function gettime() {
			//获取当前时间
			var date = new Date();
			var year = date.getFullYear();
			var month = date.getMonth() + 1;
			var day = date.getDate();
			var hour = date.getHours();
			var minute = date.getMinutes();
			var second = date.getSeconds();
			if (month < 10) {
				month = "0" + month;
			}
			if (day < 10) {
				day = "0" + day;
			}
			if (hour < 10) {
				hour = "0" + hour;
			}
			if (minute < 10) {
				minute = "0" + minute;
			}
			var nowday = date.getDay();
			switch (nowday) {
				case 0:
					{
						strDate = "星期日"
					}
					break;
				case 1:
					{
						strDate = "星期一"
					}
					break;
				case 2:
					{
						strDate = "星期二"
					}
					break;
				case 3:
					{
						strDate = "星期三"
					}
					break;
				case 4:
					{
						strDate = "星期四"
					}
					break;
				case 5:
					{
						strDate = "星期五"
					}
					break;
				case 6:
					{
						strDate = "星期六"
					}
					break;
				case 7:
					{
						strDate = "星期日"
					}
					break;
			}
			var nowDate = year + "年" + month + "月" + day + "日" + '&nbsp' + strDate;
			$('.data').html(nowDate);
			var detailtime = hour + ':' + minute + '更新';
			$('.detailtime').html("${Weather.turnovertime}");
		}
		setInterval(function () {
			gettime();
		}, 1000)



		var weathers = "${Weather.weatherconditions}";
		if (weathers.indexOf('雷') != -1) {
			$('.Weather').addClass('rain');
			$('.Weather').css('background', 'url(${ctxStatic}/modules/login//images/light.gif) no-repeat');
			$('.Weather').css('backgroundSize', '100% 100%');
		} else if (weathers.indexOf('雨') != -1) {
			$('.Weather').addClass('rain');
			$('.Weather').css('background', 'url(${ctxStatic}/modules/login//images/gray.png) no-repeat');
			$('.Weather').css('backgroundSize', '100% 100%');
			$('.dynamic-area1').css('display', 'none');
			$('.dynamic-area2').css('display', 'none');
		} else if (weathers.indexOf('雪') != -1) {
			$('.Weather').addClass('snow');
		} else if (weathers.indexOf('云') != -1) {
			$('.dynamic-area1').css('display', 'block');
			$('.dynamic-area2').css('display', 'block');
		} else if (weathers.indexOf('沙') != -1 || weathers.indexOf('尘') != -1 || weathers.indexOf('霾') != -1) {
			$('.Weather').css('background', 'url(${ctxStatic}/modules/login/images/wumai.gif) no-repeat');
			$('.Weather').css('backgroundSize', '100% 100%');
		}

	});

</script>

</html>