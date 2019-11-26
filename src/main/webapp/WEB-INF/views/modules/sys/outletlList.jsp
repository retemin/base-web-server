<%--
  Created by IntelliJ IDEA.
  User: linsir
  Date: 2019/11/25
  Time: 9:31
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
                url : "${ctx}/sys/outletl/jqgrid",
                rowList : [10, 20, 50, 100],
                mtype : "get",
                //height:height,
                colNames : ["ID","企业名称", "排口名称","监控点位置","类型","数采仪序号","更新时间","是否启用", "操作"],
                colModel : [
                    {name: "id",index: "id",align: "center",width: 20,hidden: true},
                    {name: "ename",index: "ename",align: "center",width: 120},
                    {name: "outletlname",index: "outletlname",align: "center",width: 60},
                    {name: "monitorypoint",index: "monitorypoint",align: "center",width: 60},
                    {name: "type",index: "type",align: "center",width: 50},
                    {name: "instrumentid",index: "instrumentid",align: "center",width: 70},
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
                            var name = rowObject.ename;
                            var flag= rowObject.flag;
                            var button = "<a href='javascript:void(0);' class='text-info' onclick=\"openForm('"+pkid+"')\">[<span class=\"fa fa-edit fa-fw\" aria-hidden=\"true\"></span>修改] </a>";

                            //删除按钮
                            button += "<a href='javascript:void(0);' class='text-danger' onclick=\"deleteItem('"+pkid+"','"+name+"')\">[<span class=\"fa fa-trash fa-fw\" aria-hidden=\"true\"></span>删除] </a>";
                            if(flag==1){
                                button += "<a href='javascript:void(0);' class='text-warning' onclick=\"updateFlag('"+pkid+"','"+name+"',0)\">[<span class=\"fa fa-ban fa-fw\" aria-hidden=\"true\"></span>禁用] </a>";
                            }else{
                                button += "<a href='javascript:void(0);' class='text-primary' onclick=\"updateFlag('"+pkid+"','"+name+"',1)\">[<span class=\"fa fa-check-circle-o fa-fw\" aria-hidden=\"true\"></span>启用] </a>";
                            }
                            button += "<a href='javascript:void(0);' class='text-primary' onclick=\"ManagerItem('"+pkid+"','"+name+"')\">[<span class=\"fa fa-cog fa-fw\" aria-hidden=\"true\"></span>因子管理] </a>";
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
                loadComplete : function(xhr){
                    console.log(xhr);
                },
                postData:{/* "type":"1" */},
                //双击进入[修改]
                ondblClickRow:function(rowid,iRow,iCol,e){

                },
                sortname:""
            });

            resizeWindow();
            $(window).on("resize",resizeWindow);

            //點擊新增的時候打開彈框頁面
            $("#newOutletl").click(function(){
                openForm();
            });
            //搜索点击按钮
                $("#searchForm").submit(function(e){
                    e.preventDefault();
                    //搜索id
                    var id = $("#search_id").val();
                    //搜索企业名字
                    var name = $("#search_name").val();
                    //搜索排口名称
                    var outletlName = $("#search_outletlName").val();
                    //搜索数采仪序号
                    var  instrumentId =  $("#search_instrumentId").val();
                    //搜索类型
                    var  type = $("#search_type").val();
                    //console.log("loginName:"+loginName);
                    //绑定搜索数据
                    tableObj.setGridParam({postData:{'id':id,'name':name,'type':type,'outletlName':outletlName,'instrumentId':instrumentId},page:1});
                    tableObj.trigger("reloadGrid");
                });
        });

        function updateFlag(itemId,name,flag){
            var opName=flag==1?"启用":"禁用";
            layer.confirm("确定"+opName+"企业排口信息:"+name+"?",function(index){
                layer.close(index);
                var loadingIndex=layer.loadingWithText("正在提交数据");
                $.post(_ctx+"/sys/outletl/updateFlag/"+itemId,{'flag':flag},function(msg){
                    layer.close(loadingIndex);
                    if(msg.status==1){
                        layer.success("已经成功"+opName+"企业排口:"+name);
                        tableObj.trigger("reloadGrid");
                    }else{
                        layer.error(opName+"企业排口失败："+msg.message);
                    }
                });
            });

        }
        function ManagerItem(){

        }
        function deleteItem(id,name){
            console.log(id);
            layer.confirm("确定删除企业排口:<span class='text-success'>"+name+"</span>?<p class='text-danger' >(删除后将无法恢复，确定要删除么？<span  class='text-warning'>[<span class=\"fa fa-ban \" aria-hidden=\"true\"></span>禁用] </span>)<p>",function(index){
                layer.close(index);
                var loadingIndex=layer.loadingWithText("正在提交数据");
                $.post(_ctx+"/sys/outletl/delete/"+id,{},function(msg){
                    layer.close(loadingIndex);
                    if(msg.status==1){
                        layer.success("已经成功删除企业排口信息:"+name);
                        tableObj.trigger("reloadGrid");
                    }else{
                        layer.error("删除企业排口信息失败："+msg.message);
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
            url=_ctx+"/sys/outletl/form/"+(id?id:"");
            top.layer.open({
                type: 2,
                title: [(id?"编辑":"新建")+"企业排口信息","font-size:18px;"],
                content:url,
                area: ["1024px", "700px"],
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
        <div class="form-group">
            <label>企业名称:</label>
            <input class="form-control input-sm"  style="width: 120px;" id="search_name" >
        </div>
        <div class="form-group">
            <label>排口名称:</label>
            <input class="form-control input-sm"  style="width: 120px;" id="search_outletlName" >
        </div>
        <div class="form-group">
            <label>数采仪序号:</label>
            <input class="form-control input-sm"  style="width: 120px;" id="search_instrumentId" >
        </div>
            <div class="form-group">
                <label>类型:</label>
                <select class="form-control input-sm" style="width: 140px" id="search_type" >
                    <option value=""  selected>全部</option>
                    <option value="废气">废气</option>
                    <option value="废水">废水</option>
                    <option value="VOCs">VOCs</option>
                    <option value="油烟">油烟</option>
                </select>
            </div>

        <button id="search" type="submit" class="btn btn-warning">
            <span class="glyphicon glyphicon-search"></span> 搜索
        </button>

        <a id="newOutletl" class="btn btn-success">
            <span class="glyphicon glyphicon-plus"></span> 添加
        </a>
    </form>
</div>
<div class="col-xs-12 jqgrid-table">
    <table id="dataTable" class=""></table>
    <div id="pager"></div>
</div>

</body>
</html>