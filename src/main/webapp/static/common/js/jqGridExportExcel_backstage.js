/**
 * @author binzec
 * 功能说明:
 * 	将指定jqgrid中的页面看得见的数据进行导出(即忽略掉后台无查询出来的数据,即当页数据)
 * 	导出经过后台,使用了POI框架
 * 	导出的excel格式为xls,有样式!
 * 使用说明:
 * 	1.使用时本页面必须引入layer控件
 * 	2.使用时,先引入本js文件,然后再在需要触发的按钮上绑定单击事件:onclick="jqGridExportExcel('param1','param2','param3')"
 * 		'param1'为要导出的jqgrid的id值
 * 		'param2'是确定导出内容是否包含隐藏域:1是,0不是(不传则默认是不包含隐藏域)
 * 		'param3'最后一栏是否是操作栏:1是,0不是(不传默认为有操作栏)
 * */

/**
 * jqGrid的对象
 */
var tableObj = null;

/**
 * @Param jqGrid	列表的id
 * @param hiddenFlag确定导出内容是否包含隐藏域:1包含,0不包含(不传默认为0)
 * @param operFlag	最后一栏是否是操作栏:1是,0不是(不传默认为1)
 * 导出方法
 */
function jqGridExportExcel(jqGridId, hiddenFlag, operFlag) {
	if(hiddenFlag != "1"){
		hiddenFlag = "0";
	}
	if(operFlag != "0"){
		operFlag = "1";
	}
	layer.confirm("确定要导出数据？", {
		btn : [ "确定", "取消" ],
		title : "",
		closeBtn : 2
	}, function(index, layero) {
		doSubmit(jqGridId, hiddenFlag, operFlag);
		layer.close(index);
	});
}

/**
 * 获取提交到后台的数据:表标题,表头,表数据
 * 模拟一个form表单提交,并将数据传到后台
 */
function doSubmit(jqGridId, hiddenFlag, operFlag){
	tableObj = $("#" + jqGridId);
	
	var form = document.createElement("form");
	form.setAttribute("method", "post");
	form.setAttribute("action", _ctx+"/ExportExcel/export");
	form.setAttribute("id", "submitId");
	document.body.appendChild(form);
	var input1 = document.createElement("input");
	input1.setAttribute("name", "caption");
	input1.setAttribute("id", "captionid");
	input1.setAttribute("value", tableObj.jqGrid("getGridParam","caption"));
	document.getElementById("submitId").appendChild(input1);
	
	
	var input2 = document.createElement("input");
	input2.setAttribute("name", "colName");
	input2.setAttribute("id", "colNameid");
	input2.setAttribute("value", getColName(hiddenFlag, operFlag));
	document.getElementById("submitId").appendChild(input2);
	
	var input3 = document.createElement("input");
	input3.setAttribute("name", "colData");
	input3.setAttribute("id", "colDataid");
	input3.setAttribute("value", getColData());
	document.getElementById("submitId").appendChild(input3);
	
	var otherParam = getOtherParam();

	var input4 = document.createElement("input");
	input4.setAttribute("name", "menuid");
	input4.setAttribute("id", "menuid_id");
	input4.setAttribute("value", otherParam.menuid);
	document.getElementById("submitId").appendChild(input4);
	
	var input5 = document.createElement("input");
	input5.setAttribute("name", "postData");
	input5.setAttribute("id", "postDataid");
	input5.setAttribute("value", JSON.stringify(otherParam.postData));
	document.getElementById("submitId").appendChild(input5);
	
	
	var input6 = document.createElement("input");
	input6.setAttribute("name", "countpage");
	input6.setAttribute("id", "countpageid");
	input6.setAttribute("value", otherParam.countpage);
	document.getElementById("submitId").appendChild(input6);
	
	var input7 = document.createElement("input");
	input7.setAttribute("name", "condition");
	input7.setAttribute("id", "conditionid");
	input7.setAttribute("value", otherParam.condition);
	document.getElementById("submitId").appendChild(input7);
	
	$("#captionid").hide();
	$("#colNameid").hide();
	$("#colDataid").hide();
	$("#menuid_id").hide();
	$("#postDataid").hide();
	$("#countpageid").hide();
	$("#conditionid").hide();
	$("#submitId").submit();
	if($.support.msie){ 
		document.getElementById("submitId").removeNode();
	}else{
		document.getElementById("submitId").remove();	
	}
	
}

function getOtherParam(){
	var menuid;
	menuid=$(".open").find(".active").find("a").prop("id");
	if(menuid ==undefined){
		menuid=$(".open").find(".active").find("a").prop("id");
	}
	var countpage = $("#sp_1_searchResult_pager").text();
	var inputarr = new Array();
	$("input[type='text']").each(function(){
		if($(this).attr("autocomplete")){
		}else if($(this).attr("aria-haspopup")){
		}else if($(this).attr("role")){
		}else{
			inputarr.push($.trim($(this).val()));
		}
	  });
	
	$("a[href='javascript:void(0)']").find("span[class='select2-chosen']").each(function(){
		inputarr.push($.trim($(this).html()));
	});
	
	
	/*$(".control-label").each(function(){
		alert($(this).text());
		inputarr.push($(this).text());
		$("input[type='text']").each(function(){
			alert($.trim($(this).val()));
			//inputarr.push($.trim($(this).val()));	
		});
	});
	alert(inputarr);*/
	var postData = tableObj.jqGrid("getGridParam","postData");
	var condition = inputarr;
	//var url = tableObj.jqGrid("getGridParam","url");
	return {
		postData:postData,
		menuid:menuid,
		countpage:countpage,
		condition:condition
	};
}

/**
 * 各列表头值
 */
var colValues = [];
/**
 * 各列表头名
 */
var colNames = [];

/**
 * 获取表头,用","隔开
 */
function getColName(hiddenFlag, operFlag){
	var colNames_all = tableObj.jqGrid("getGridParam","colNames");
	var colModel = tableObj.jqGrid("getGridParam","colModel");
	var j = 0;
	var length = null;
	if(operFlag == "1"){
		length = colModel.length - 1;
	} else {
		length = colModel.length;
	}
	//遍历除最后一个("操作")之外的所有列,排除隐藏列
	for (var i = 0; i < length; i++) {
		//如有第一列序号的,忽略掉
		if(colModel[i].name != "rn"){
			//隐藏域也要导出来
			if(hiddenFlag == "1"){
				//全部表头值
				colValues[j] = colModel[i].name;
				//全部表头名
				colNames[j++] = colNames_all[i];
			} else {
				var colModelHidden = colModel[i].hidden;
				if(colModelHidden == false){
					//没有隐藏的表头值
					colValues[j] = colModel[i].name;
					//没有隐藏的表头名
					colNames[j++] = colNames_all[i];
				}
			}
		}
	}
	//表头
	var content = "";
	for (var i = 0; i < colNames.length; i++) {
		content += colNames[i] + "@%,";
	}
	content = content.replaceAll("&nbsp;","");
	content = content.substring(0, content.length-3);
	return content;
	
}
/**
 * 获取表数据,格式为:
 * 		每行各字段用"@%,"隔开
 * 		各行之间用"@%;"隔开
 */
function getColData(){
	var content = "";
	//表数据
	var ids = tableObj.jqGrid("getDataIDs");
	for (var i = 0; i < ids.length; i++) {
		var row = tableObj.getRowData(ids[i]);
		for (var j = 0; j < colValues.length; j++) {
			var val = row[colValues[j]];
			if(val == ""){
				val = " ";
			}
			if(j == colValues.length - 1){
				content += val + "@%;";
			} else {
				content += val + "@%,";
			}
		}
	}
	content = content.replaceAll("&nbsp;","");
	content = content.substring(0, content.length-3);
	return content;
}
