/**
 * 字符串工具类
 */

var StringUtil={};

StringUtil.isEmpty = function(str) {
	if(typeof str == "undefined" || str == null || str == ""){
        return true;
    }else{
        return false;
    }
};

StringUtil.isBlank = function(str) {
	return (!str || /^\s*$/.test(str));
};

StringUtil.formatFileSize=function(size){
	if(size){
		var k=size;
		var unit="B";
		if(k>1024){
			k=k/1024;
			unit="KB";
			if(k>1024){
				k=k/1024;
				unit="MB";
				if(k>1024){
					k=k/1024;
					unit="GB";
				}
			}
		}
		return k.toFixed(2)+unit;
	}
	return '';
};

StringUtil.isNumber=function(value) {
    var patrn = /^(-)?\d+(\.\d+)?$/;
    if (patrn.exec(value) == null || value == "") {
        return false
    } else {
        return true
    }
}
//中文校验
StringUtil.isChinese= function(input) {
	return /^[\u4E00-\u9FA5]+$/.test(input);
},

/**
 * 字符串endwith方法
 * @param s
 * @returns {Boolean}
 */
String.prototype.endWith = function(s) {
	if (s == null || s == "" || this.length == 0 || s.length > this.length)
		return false;
	if (this.substring(this.length - s.length) == s)
		return true;
	else
		return false;
	return true;
};


/**
 * 字符串startwith方法
 * @param s
 * @returns {Boolean}
 */
String.prototype.startWith = function(s) {
	if (s == null || s == "" || this.length == 0 || s.length > this.length)
		return false;
	if (this.substr(0, s.length) == s)
		return true;
	else
		return false;
	return true;
};

String.prototype.replaceAll=function(regexp, replaceValue){
	return this.replace(new RegExp(regexp,"g"), replaceValue);
};

String.prototype.contain=function(regexp){
	var re=new RegExp(regexp);
	return re.test(this);
};

String.prototype.trim=function trim(){  //删除左右两端的空格
	 return this.replace(/(^\s*)|(\s*$)/g, "");
};
String.prototype.ltrim=function ltrim(){  //删除左边的空格
	 return this.replace(/(^\s*)/g,"");
};
String.prototype.rtrim=function rtrim(){  //删除右边的空格
	 return this.replace(/(\s*$)/g,"");
};
String.prototype.equals=function(val2) {
	return this == val2;
};
String.prototype.equalsIgnoreCase=function(val2) {
	return this.toLocaleLowerCase() == val2.toLocaleLowerCase();
};

 
