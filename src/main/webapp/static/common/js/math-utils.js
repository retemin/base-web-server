//精确加法
Number.prototype.proAdd = function(arg){
	if(null==arg){
		return this;
	}
	var r1,r2,m;
	try{r1=this.toString().split(".")[1].length;}catch(e){r1=0;}
	
	try{r2=arg.toString().split(".")[1].length;}catch(e){r2=0;}
	
	m=Math.pow(10,Math.max(r1,r2));
	return (Math.round(this*m)+Math.round(arg*m))/m;
}
//精确减法
//给Number类型增加一个sub方法，，使用时直接用 .sub 即可完成计算。 
Number.prototype.proSub=function(arg) {
	var r1, r2, m, n;
    try {
        r1 = this.toString().split(".")[1].length;
    }
    catch (e) {
        r1 = 0;
    }
    try {
        r2 = arg.toString().split(".")[1].length;
    }
    catch (e) {
        r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
     //last modify by deeka
     //动态控制精度长度
    n = (r1 >= r2) ? r1 : r2;
    var result=((this * m - arg * m) / m).toFixed(n);
    return Number(result);
};
//乘法函数
//给Number类型增加一个mul方法，使用时直接用 .mul 即可完成计算。 
Number.prototype.proMul=function(arg) {
    var m = 0, s1 = arg.toString(), s2 = this.toString();
	try {
		m += s1.split(".")[1].length;
	}catch (e) {}
	try {
		m += s2.split(".")[1].length;
	}catch (e) {}
	return Number(Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m));
}; 
//除法函数
//给Number类型增加一个mul方法，使用时直接用 .mul 即可完成计算。 
Number.prototype.proDiv=function(arg) {
	 var t1 = 0, t2 = 0, r1, r2;
	 try {
	     t1 = this.toString().split(".")[1].length;
	 }catch (e) {
	 }
	 try {
	     t2 = arg.toString().split(".")[1].length;
	 }catch (e) {
	 }
	 with (Math) {
	     r1 = Number(this.toString().replace(".", ""));
	     r2 = Number(arg.toString().replace(".", ""));
	     return Number((r1 / r2) * pow(10, t2 - t1));
	 }
};

