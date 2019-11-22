<%--
  Created by IntelliJ IDEA.
  User: linsir
  Date: 2019/11/20
  Time: 13:51
  To change this template use File | Settings | File Templates.
--%>
<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<html>
<head>
    <%@ include file="/WEB-INF/views/include/taglib.jsp"%>
    <jsp:include page="/WEB-INF/views/include/base-include.jsp">
        <jsp:param name="include" value="base,layer,jqgrid" />
    </jsp:include>

    <script type="text/javascript" src="${ctx}/excel/jqgrid/jqgrid-excel.js"></script>
    <title>企业信息列表</title>
    <style type="text/css">
        #searchForm {
            margin-bottom: 5px;
            margin-left: 5px;
            margin-top: 5px;
        }
        .ui-th-column,.ui-th-ltr {
            text-align: center;
        }
        a.edit{

        }
        a.disable{
            color: brown;
        }
        a.delete{
            color: red;
        }
        #roleListFrame{
            display: none;
            height: 100%;
        }
        #roleListFrame>.list-group{
            height: 208px; /* Fallback for browsers that don't support the calc() function */
            height: -moz-calc(100% - 64px);
            height: -webkit-calc(100% - 64px);
            height: calc(100% - 64px);
            overflow-y:auto;
            display: table;
            width:100%;
        }
        #roleListFrame>.toolbar{
            text-align: center;
        }
        #roleListFrame .list-group-item{
            font-size:16px;
            vertical-align: middle;

        }
        #roleListFrame .list-group-item input[type='checkbox']{
            width:20px;
            height:20px;
            margin-right: 10px;
        }

    </style>
    <script type="text/javascript">
        var tableObj=null;
        var formIndex;
        $(document).ready(function() {
            $.jgrid.defaults.styleUI = "Bootstrap";

            tableObj=$("#dataTable").jqGrid({
                datatype : "json",
                url : "${ctx}/sys/enterprise/jqgrid",
                rowList : [10, 20, 50, 100],
                mtype : "get",
                //height:height,
                colNames : ["ID","企业名称", "行业类别","所属区域","重点级别","联系人","联系电话","运维单位名称","更新时间", "是否可用", "操作"],
                colModel : [
                    {name: "id",index: "id",align: "center",width: 20,hidden: true},
                    {name: "name",index: "name",align: "center",width: 120},
                    {name: "type",index: "type",align: "center",width: 60},
                    {name: "area",index: "area",align: "center",width: 60},
                    {name: "importantLevel",index: "importantLevel",align: "center",width: 50},
                    {name: "contactor",index: "contactor",align: "center",width: 70},
                    {name: "phone",index: "phone",align: "center",width: 70},
                    {name: "operation",index: "operation",align: "center",width: 70},
                    {name: "updateTime",index: "updateTime",align: "center",width: 70},
                    {name: "flag",index: "flag",align: "center",width: 60,
                        formatter:function(cellValue,options,rowObject){
                            // var statusIcon = "<input class='easyui-switchbutton' onText='开' offText='关' name='unitState' >";
                            var statusIcon="<i class=\"fa fa-"+(cellValue==1?"toggle-on text-primary":"toggle-off text-warning")+"\"></i>";
                            return statusIcon;
                        }
                    },
                    {name: "operator",index: "operator",width: 180,align: "center",isExport:false,
                        formatter:function(cellValue,options,rowObject){
                            var pkid = rowObject.id;
                            var name = rowObject.name;
                            var flag= rowObject.flag;
                            var button = "<a href='javascript:void(0);' class='text-info' onclick=\"openForm('"+pkid+"')\">[<span class=\"fa fa-edit fa-fw\" aria-hidden=\"true\"></span>修改] </a>";

                            //删除按钮
                            button += "<a href='javascript:void(0);' class='text-danger' onclick=\"deleteItem('"+pkid+"','"+name+"')\">[<span class=\"fa fa-trash fa-fw\" aria-hidden=\"true\"></span>删除] </a>";
                            if(flag==1){
                                button += "<a href='javascript:void(0);' class='text-warning' onclick=\"updateFlag('"+pkid+"','"+name+"',0)\">[<span class=\"fa fa-ban fa-fw\" aria-hidden=\"true\"></span>禁用] </a>";
                            }else{
                                button += "<a href='javascript:void(0);' class='text-primary' onclick=\"updateFlag('"+pkid+"','"+name+"',1)\">[<span class=\"fa fa-check-circle-o fa-fw\" aria-hidden=\"true\"></span>启用] </a>";
                            }
                            button += "<a href='javascript:void(0);' class='text-primary' onclick=\"ManagerItem('"+pkid+"','"+name+"')\">[<span class=\"fa fa-cog fa-fw\" aria-hidden=\"true\"></span>排口管理] </a>";
                            return button;
                        }
                    }
                ],
                pager : "#pager",
                autowidth: true,
                shrinkToFit: true,
                rowNum: 20,
                viewrecords: true,
                rownumbers : true,
                hidegrid: true,
                loadComplete : function(xhr){},
                postData:{/* "type":"1" */},
                //双击进入[修改]
                ondblClickRow:function(rowid,iRow,iCol,e){

                },
                sortname:"id"
            });

            resizeWindow();
            $(window).on("resize",resizeWindow);

            //點擊新增的時候打開彈框頁面
            $("#newEnterprise").click(function(){
                openForm();
            });
            //搜索点击按钮
            $("#searchForm").submit(function(e){
                e.preventDefault();
                $("#searchForm").submit(function(e){
                    e.preventDefault();
                    //搜索id
                    var id = $("#search_id").val();
                    //搜索名字
                    var name = $("#search_name").val();
                    //搜索类别
                    var type = $("#search_type").val();
                    //搜索所属区域
                    var  area =  $("#search_area").val();
                    //搜索重点级别
                    var importantLevel = $("#search_importantLevel").val();
                    //搜索运维单位名称
                    var operation = $("#search_operation").val();
                    //console.log("loginName:"+loginName);
                    //绑定搜索数据
                    tableObj.setGridParam({postData:{'id':id,'name':name,'type':type,'area':area,'importantLevel':importantLevel,"opeartion":operation},page:1});
                    tableObj.trigger("reloadGrid");
                });
            });

            $("#selectDepartmentBtn").click(function(){
                $.CommonData.data.officeSelect({
                    'onConfirm':function(selectData){
                        //console.log(vm.$data);
                        //vm.$data.officeId=selectData.id;
                        //vm.$data.officeName=selectData.name;
                        $("#search_officeId").val(selectData.id);
                        $("#search_officeName").val(selectData.name);
                    }
                });
            });
        });

        function updateFlag(itemId,name,flag){
            var opName=flag==1?"启用":"禁用";
            layer.confirm("确定"+opName+"企业信息:"+name+"?",function(index){
                layer.close(index);
                var loadingIndex=layer.loadingWithText("正在提交数据");
                $.post(_ctx+"/sys/enterprise/updateFlag/"+itemId,{'flag':flag},function(msg){
                    layer.close(loadingIndex);
                    if(msg.status==1){
                        layer.success("已经成功"+opName+"用户:"+name);
                        tableObj.trigger("reloadGrid");
                    }else{
                        layer.error(opName+"用户失败："+msg.message);
                    }
                });
            });

        }
        function ManagerItem(){

        }
        function deleteItem(itemId){
            layer.confirm("确定删除用户:<span class='text-success'>"+name+"</span>?<p class='text-danger' >(删除后将无法恢复，确定要删除么？<span  class='text-warning'>[<span class=\"fa fa-ban \" aria-hidden=\"true\"></span>禁用] </span>)<p>",function(index){
                layer.close(index);
                var loadingIndex=layer.loadingWithText("正在提交数据");
                $.post(_ctx+"/sys/enterprise/delete/"+itemId,{},function(msg){
                    layer.close(loadingIndex);
                    if(msg.status==1){
                        layer.success("已经成功删除企业信息:"+name);
                        tableObj.trigger("reloadGrid");
                    }else{
                        layer.error("删除企业信息失败："+msg.message);
                    }
                });
            });
        }

        //重新调整jqgrid高度与宽度
        function resizeWindow(){
            var height = $(window).height()-$("#searchForm").height()-130;
            tableObj.setGridHeight(height);
        }

        function openForm(id){
            url=_ctx+"/sys/enterprise/form/"+(id?id:"");
            top.layer.open({
                type: 2,
                title: [(id?"编辑":"新建")+"企业基础信息","font-size:18px;"],
                content:url,
                area: ["1024px", "600px"],
                closeBtn : 2,
                end :function(){
                    tableObj.trigger("reloadGrid");
                }

            });
        }

    </script>

</head>

<body class="">
<div class="col-xs-12 search-form">
    <form action="" class="form form-inline " id="searchForm" >
        <%--<div class="form-group">--%>
            <%--<label class="col-sm-4 control-label text-right">作用域:</label>--%>
            <%--<div class="col-sm-8"><vm-select v-model="search.scope" :options="code.scope"/></div>--%>
        <%--</div>--%>
        <%--<div class="col-md-3">--%>
            <%--<label class="col-sm-4 control-label text-right">参数名:</label>--%>
            <%--<div class="col-sm-8"><vm-input v-model="search.config"></div>--%>
        <%--</div>--%>
            <div class="form-group">
                <label>所属区域:</label>
                <select class="form-control input-sm" style="width: 140px" id="search_area" >
                    <option value=""  selected>全部</option>
                    <option value="黄埔">黄埔</option>
                    <option value="天河">天河</option>
                    <option value="越秀">越秀</option>
                </select>
            </div>
            <div class="form-group">
                <label>重点级别:</label>
                <select class="form-control input-sm" style="width: 100px" id="search_importantLevel" >
                    <option value=""  selected>全部</option>
                    <option value="国控">国控</option>
                    <option value="省控">省控</option>
                    <option value="市控">市控</option>
                    <option value="其他">其他</option>
                </select>
            </div>
        <div class="form-group">
            <label>企业名称:</label>
            <input class="form-control input-sm"  style="width: 120px;" id="search_name" >
        </div>
            <div class="form-group">
                <label>行业类别:</label>
                <input class="form-control input-sm"  style="width: 120px;" id="search_type" >
            </div>
            <div class="form-group">
                <label>运维单位名称:</label>
                <input class="form-control input-sm"  style="width: 120px;" id="search_operation" >
            </div>
            <%--注释的是部门的搜索按钮--%>
        <%--<div class="form-group">--%>
            <%--<div class="input-group">--%>
                <%--<input id="search_officeId" class="form-control hidden input-sm">--%>
                <%--<input id="search_officeName" class="form-control input-sm" style="width: 130px;" readonly="readonly" placeholder="部门">--%>
                <%--<span class="input-group-btn">--%>
							<%--<button class="btn btn-info" type="button" id="selectDepartmentBtn">--%>
								<%--<i class="glyphicon glyphicon-search"></i>--%>
							<%--</button>--%>
						<%--</span>--%>
            <%--</div>--%>
        <%--</div>--%>


        <button id="search" type="submit" class="btn btn-warning">
            <span class="glyphicon glyphicon-search"></span> 搜索
        </button>

        <a id="newEnterprise" class="btn btn-success">
            <span class="glyphicon glyphicon-plus"></span> 添加
        </a>
    </form>
</div>
<div class="col-xs-12 jqgrid-table">
    <table id="dataTable" class=""></table>
    <div id="pager"></div>
</div>

<div id="roleListFrame">
    <div class="list-group">
    </div>
    <div class="toolbar">
        <a id="changeRole" class="btn btn-success button">
            <span class="glyphicon glyphicon-edit"></span>&nbsp;&nbsp;保存
        </a>
    </div>
</div>
</body>
</html>