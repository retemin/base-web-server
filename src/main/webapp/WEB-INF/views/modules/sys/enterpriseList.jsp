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
                url : "${ctx}/sys/user/jqgrid",
                rowList : [10, 20, 50, 100],
                mtype : "get",
                //height:height,
                colNames : ["ID","企业名称", "行业类别","所属区域","重点级别","联系人","联系电话","运维单位名称","更新时间", "是否可用", "操作"],
                colModel : [
                    {name: "id",index: "id",align: "center",width: 100,hidden: true},
                    {name: "name",index: "name",align: "center",width: 70},
                    {name: "type",index: "type",align: "center",width: 70},
                    {name: "area",index: "area",align: "center",width: 70},
                    {name: "importantLevel",index: "importantLevel",align: "center",width: 70},
                    {name: "contactor",index: "contactor",align: "center",width: 70},
                    {name: "phone",index: "phone",align: "center",width: 70},
                    {name: "operation",index: "operation",align: "center",width: 70},
                    {name: "updateTime",index: "updateTime",align: "center",width: 70},
                    {name: "flag",index: "flag",align: "center",width: 70,
                        formatter:function(cellValue,options,rowObject){
                            var statusIcon="<i class=\"fa fa-"+(cellValue==1?"check-circle text-primary":"minus-circle text-warning")+"\"></i>";
                            return statusIcon;
                        }
                    },
                    {name: "operator",index: "operator",width: 180,align: "center",isExport:false,
                        formatter:function(cellValue,options,rowObject){
                            var pkid = rowObject.id;
                            var name = rowObject.name;
                            var flag= rowObject.flag;
                            var button = "<a href='javascript:void(0);' class='text-info' onclick=\"openForm('"+pkid+"')\">[<span class=\"fa fa-edit fa-fw\" aria-hidden=\"true\"></span>修改] </a>";
                            button +="<a href='javascript:void(0);' class='text-success' onclick=\"bindRole('"+pkid+"','"+name+"')\">[<span class=\"fa fa-edit fa-fw\" aria-hidden=\"true\"></span>绑定角色] </a>";
                            if(flag==1){
                                button += "<a href='javascript:void(0);' class='text-warning' onclick=\"updateFlag('"+pkid+"','"+name+"',0)\">[<span class=\"fa fa-ban fa-fw\" aria-hidden=\"true\"></span>禁用] </a>";
                            }else{
                                button += "<a href='javascript:void(0);' class='text-primary' onclick=\"updateFlag('"+pkid+"','"+name+"',1)\">[<span class=\"fa fa-check-circle-o fa-fw\" aria-hidden=\"true\"></span>启用] </a>";
                            }
                            //删除按钮
                            button += "<a href='javascript:void(0);' class='text-danger' onclick=\"deleteItem('"+pkid+"','"+name+"')\">[<span class=\"fa fa-trash fa-fw\" aria-hidden=\"true\"></span>删除] </a>";

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
            $("#newUser").click(function(){
                openForm();
            });

            $("#searchForm").submit(function(e){
                e.preventDefault();
                $("#searchForm").submit(function(e){
                    e.preventDefault();
                    var id = $("#search_id").val();
                    var loginName = $("#search_loginName").val();
                    var name = $("#search_name").val();
                    var officeId = $("#search_officeId").val();
                    var type = $("#search_type").val();
                    console.log("loginName:"+loginName);
                    tableObj.setGridParam({postData:{'id':id,'loginName':loginName,'name':name,'officeId':officeId,'type':type},page:1});
                    tableObj.trigger("reloadGrid");
                });
            });
            loadRoleList();

            $("#roleListFrame").on('click',".list-group>.list-group-item",function(){
                $(this).children("input[type='checkbox']").click();
            });

            $("#roleListFrame").on('click',".list-group>.list-group-item>input",function(e){
                e.stopPropagation();//阻止冒泡
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

            $("#changeRole").click(changeRole);

            $("#export").click(function(){
                jqgridExportUtil.exportExcelWithDataRule(tableObj,"用户列表");
            });
        });

        function updateFlag(itemId,name,flag){
            var opName=flag==1?"启用":"禁用";
            layer.confirm("确定"+opName+"用户:"+name+"?",function(index){
                layer.close(index);
                var loadingIndex=layer.loadingWithText("正在提交数据");
                $.post(_ctx+"/sys/user/updateFlag/"+itemId,{'flag':flag},function(msg){
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

        function deleteItem(itemId,name){
            layer.confirm("确定删除用户:<span class='text-success'>"+name+"</span>?<p class='text-danger' >(删除后将无法恢复，暂停使用请使用<span  class='text-warning'>[<span class=\"fa fa-ban \" aria-hidden=\"true\"></span>禁用] </span>)<p>",function(index){
                layer.close(index);
                var loadingIndex=layer.loadingWithText("正在提交数据");
                $.post(_ctx+"/sys/user/delete/"+itemId,{},function(msg){
                    layer.close(loadingIndex);
                    if(msg.status==1){
                        layer.success("已经成功删除用户:"+name);
                        tableObj.trigger("reloadGrid");
                    }else{
                        layer.error("删除用户失败："+msg.message);
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
            url=_ctx+"/sys/user/form/"+(id?id:"");
            top.layer.open({
                type: 2,
                title: [(id?"编辑":"新建")+"用户","font-size:18px;"],
                content:url,
                area: ["1024px", "500px"],
                closeBtn : 2,
                end :function(){
                    tableObj.trigger("reloadGrid");
                }

            });
        }

        function bindRole(id,name){
            $("#roleListFrame").data("userId",id);
            $("#roleListFrame>.list-group input[type='checkbox']").prop("checked",false);
            loadUserRole(id);
            var index=layer.open({
                type: 1,
                title: ["绑定用户["+name+"]的角色","font-size:18px;"],
                content:$("#roleListFrame"),
                area: ["40%", "80%"],
                closeBtn : 2,
                end :function(){
                    //tableObj.trigger("reloadGrid");
                }

            });
            $("#roleListFrame").data("layerIndex",index);

        }

        function loadRoleList(){
            $.get(_ctx+"/sys/role/availableListData",{},function(msg){
                if(msg.status==1){
                    for(var i in msg.data){
                        var item=msg.data[i];
                        var a="<a class=\"list-group-item\"><input type=\"checkbox\" value="+item.id+">"+item.name+"</a>";
                        $("#roleListFrame>.list-group").append(a);
                    }
                }
            })
        }

        function loadUserRole(userId){
            var index =layer.loadingWithText("正在加载用户角色信息");
            if(userId){
                $.get(_ctx+"/sys/role/userRole/"+userId,{},function(msg){

                    if(msg.status==1){
                        for(var i in msg.data){
                            var item=msg.data[i];
                            $("#roleListFrame>.list-group input[type='checkbox'][value="+item.id+"]").click();
                        }
                    }else{
                        layer.error("加载用户角色信息失败:"+msg.message);
                    }
                    layer.close(index);
                });
            }

        }

        function changeRole(){

            var userId=$("#roleListFrame").data("userId");
            var frameIndex=$("#roleListFrame").data("layerIndex");
            if(userId){
                var loadingIndex = layer.loadingWithText("正在保存用户角色信息") ;
                var roleIds=[];
                $("#roleListFrame>.list-group>.list-group-item>input[type='checkbox'][value]").each(function(){
                    if($(this).prop("checked")){
                        roleIds.push($(this).val());
                    }
                });
                var json=JSON.stringify(roleIds);
                $.ajax({
                    url : _ctx + "/sys/role/saveUserRole/"+userId,
                    data : json,
                    type : "post",
                    contentType : "application/json",
                    success : function(msg) {
                        layer.close(loadingIndex);
                        if(msg.status==1){
                            layer.success("保存成功");
                        }else{
                            layer.error("保存失败："+msg.message);
                        }
                        layer.close(frameIndex);
                    },
                    error : function(msg) {
                        layer.close(loadingIndex);
                        layer.error("保存失败："+msg);
                        layer.close(frameIndex);
                    }
                });
            }

        }

    </script>

</head>

<body class="">
<div class="col-xs-12 search-form">
    <form action="" class="form form-inline " id="searchForm" >
        <div class="form-group">
            <input class="form-control input-sm" id="search_loginName" placeholder="登录名">
        </div>
        <div class="form-group" style="display: none;">
            <input class="form-control input-sm" id="search_name" placeholder="用户名">
        </div>
        <div class="form-group">
            <div class="input-group">
                <input id="search_officeId" class="form-control hidden input-sm">
                <input id="search_officeName" class="form-control input-sm" style="width: 130px;" readonly="readonly" placeholder="部门">
                <span class="input-group-btn">
							<button class="btn btn-info" type="button" id="selectDepartmentBtn">
								<i class="glyphicon glyphicon-search"></i>
							</button>
						</span>
            </div>
        </div>
        <div class="form-group">
            <select class="form-control input-sm" style="width: 140px" id="search_type" >
                <option value="" disabled selected>用户类型</option>
                <option value="1">管理员</option>
                <option value="2">环保用户</option>
                <option value="3">企业用户</option>
            </select>
        </div>

        <button id="search" type="submit" class="btn btn-warning">
            <span class="glyphicon glyphicon-search"></span> 搜索
        </button>

        <a id="newUser" class="btn btn-success">
            <span class="glyphicon glyphicon-plus"></span> 添加
        </a>

        <button id="export" type="button" class="btn btn-warning">
            <span class="glyphicon glyphicon-search"></span> 导出
        </button>
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