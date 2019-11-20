/**
 * 防止页面被IFRAME嵌入，阻止别人通过iframe 修改系统
 */

try{
	if(top.location!=window.location){
		top.location.href =window.location.href;
	}
}
catch(e){
	top.location.href = window.location.href;
}