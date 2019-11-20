/**
 * vuejs 扩展类
 */

Vue.filter('urlComplete', function (url) {
	if(url) return url.startWith("http://")?url:_ctx+url;
	return null;
});