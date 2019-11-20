/**
 * 数组工具类
 * zp
 */

var ArrayUtils = {};

ArrayUtils.unique = function(arr){
    var result = [], hash = {};
    for (var i = 0, elem; (elem = arr[i]) != null; i++) {
        if (!hash[elem]) {
            result.push(elem);
            hash[elem] = true;
        }
    }
    return result;
}

//排序,由小到大
ArrayUtils.sortSmallToBig = function(arr){
	return arr.sort(function(a,b){
		return a>b?1:-1;
	});
}

//排序,由大到小
ArrayUtils.sortBigToSmall = function(arr){
	return arr.sort(function(a,b){
		return a<b?1:-1;
	});
}