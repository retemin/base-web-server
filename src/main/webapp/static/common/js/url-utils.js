/**
 * url 路径解析工具
 */

var UrlUtil={};
/**
 * 从hash串中获取参数
 */
UrlUtil.getHashParam=function(paramKey){
	var hash=window.location.hash;
	var data=JSON.parse(hash);
	return data[paramKey];
}

/**
 * 设置hash值
 */
UrlUtil.setHashParam=function(paramKey,paramValue){
	var hash=window.location.hash;
	var data=JSON.parse(hash);
	data[paramKey]=paramValue;
	window.location.hash=JSON.stringify(data);
}