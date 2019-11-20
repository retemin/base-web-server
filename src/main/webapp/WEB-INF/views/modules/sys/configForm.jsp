<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<html>
<head>


<%@ include file="/WEB-INF/views/include/taglib.jsp"%>

<jsp:include page="/WEB-INF/views/include/base-include.jsp">
	<jsp:param name="include" value="base,vuejs2,metronic,layer,jquery-validation" />
</jsp:include>

<title>表单</title>

<style type="text/css">
	form{
		margin-top:8px;
	}
	.col-lg-12, .col-md-12, .col-sm-12, .col-xs-12,.col-lg-6, .col-md-6, .col-sm-6, .col-xs-6 {
      padding-left: 0px;
      padding-right: 0px;
    }
    td > label{
    	display: block;
    	text-align: right;
    }
    form td {
    line-height: 1.42857;
    padding: 8px;
	}
    td{
    	padding-left:3px;
    	padding-right: 6px;
    }
</style>
</head>

<body class="">
	<div class="container-fluid">
    <vm-valid-form id="form" class="col-xs-12" :rules="rules" @submit="formSubmit" @valid-error="onValid">
        <table :class="'col-xs-12 '+(canEdit='false'?'table-bordered':'')" style="font-size: 12px;">
           <!--  <thead>
                <tr style="height: 1px;">
                    <th width="15%"></th>
                    <th width="35%"></th>
                    <th width="15%"></th>
                    <th width="35%"></th>
                </tr>
            </thead> -->
            <tbody id="">
            	<vm-input name="id" v-model="data.id" :can-edit="canEdit" type="hidden"></vm-input>
            	<vm-input name="flag" v-model="data.flag" type="hidden"></vm-input>
            	<vm-input name="deleteFlag" v-model="data.deleteFlag" type="hidden"></vm-input>
                <vm-input name="updateUser" v-model="data.updateUser" :can-edit="canEdit" type="hidden"></vm-input>
                <vm-input name="updateTime" v-model="data.updateTime" :can-edit="canEdit" type="hidden"></vm-input>
            	<tr>
                    <td width="15%"><label class="control-label">模块</label></td>
                    <td width="35%">
                        <vm-input name="module" v-model="data.module" :can-edit="canEdit"></vm-input>
                    </td>
                    <td width="15%"><label class="control-label">类型</label></td>
                    <td width="35%">
                        <vm-input name="type" v-model="data.type" :can-edit="canEdit" ></vm-input>
                    </td>
                </tr>
                <tr>
                    <td><label class="control-label">名称</label></td>
                    <td>
                        <vm-input name="name" v-model="data.name" :can-edit="canEdit" ></vm-input>
                    </td>
 					<td><label class="control-label">值</label></td>
                    <td>
                        <vm-input name="value" v-model="data.value" :can-edit="canEdit"></vm-input>
                    </td>
                </tr>
                <tr>
                    <td><label class="control-label">父元素</label></td>
                    <td>
                        <vm-input name="parentId" v-model="data.parentId" :can-edit="canEdit"></vm-input>
                    </td>
                    <td><label class="control-label">排序</label></td>
                    <td>
                        <vm-input name="sort" v-model="data.sort" :can-edit="canEdit"></vm-input>
                    </td>
                </tr>
                <tr>
                    <td><label class="control-label">备注</label></td>
                    <td colspan="3">
                        <vm-textarea name="remark" v-model="data.remark" :can-edit="canEdit"></vm-textarea>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="footFixToolbar">
			<!-- <button class="btn btn-outline btn-danger" type="submit" id="saveUser"><i class="glyphicon glyphicon-floppy-disk"></i>&nbsp;保存</button> -->
			<!-- <button class="btn btn-default closeNowLayer" type="button" id="cancel"><i class="glyphicon glyphicon-remove-circle"></i>&nbsp;取消</button> -->
			<button class="btn btn-info" type="submit" id="saveUser"><i class="fa fa-save fa-fw"></i>保存</button>
			<button class="btn btn-warning closeNowLayer" type="button" id="cancel"><i class="fa fa-close fa-fw"></i>关闭</button>
		</div>
    </vm-valid-form>
	</div>
</body>
<script type="text/javascript">
	var id="${id}";
	var vmData={
		data:{
			
		},
		code:{
			flag:[
				{value:"1",name:"是"},
				{value:"0",name:"否"}
			]
		},
		canEdit:"true",
		rules:{
			
        }
	}
	var vm = new Vue({
		el : "#form",
		data :vmData ,
		methods:{
			reloadData:function(){
				if(id){
					$.get(_ctx + "/sys/config/data/"+id,{},function(msg){
						if(msg.status==1){
							vmData.data=msg.data;
						}else{
							layer.error("数据加载错误");
						}
						
					});
				}else{
					vm.$data={
                        id:'',		
                        type:'',		
                        name:'',		
                        value:'',		
                        sort:'',		
                        parentId:'',		
                        flag:'1',		
                        module:'',		
                        remark:'',		
                        createUser:'',		
                        createTime:'',		
                        updateUser:'',		
                        updateTime:'',		
                        deleteFlag:'0'		
				    };
				}
			},
			formSubmit:function(){
				//var loadIndex=layer.loadingWithText("正在提交数据");
				if(!id){
					vmData.data.createrUser = _nowUserName;
					vmData.data.createTime = new Date();
					vmData.data.deleteFlag = 0;
				}
				vmData.data.updateUser = _nowUserName;
				vmData.data.updateTime = new Date();
				vmData.data.flag='1';
				var json=JSON.stringify(vmData.data);
					$.ajax({
						url : _ctx + "/sys/config/save",
						data : json,
						type : "post",
						contentType : "application/json",
						success : function(msg) {
							if(msg.status==1){
								layer.success("保存成功",{time:1000});
								if(id){
									reloadData();
								}else{
									top.layer.closeAll();
				        			top.layer.msg("添加成功");
								}
							}else{
								layer.error("保存失败："+msg.message);
							}
						},
						error : function(msg) {
							layer.close(loadingIndex);
							layer.error("保存失败："+msg.message);
						}
					}); 
			},
			initCode:function(){
				vm.$emit("codeInitCompleted");
			},
	        onValid:function(){
	        	layer.msg('数据验证不通过，请参照页面提示核对数据是否正确！', {icon: 2});
	        }
		},
		mounted:function(){
			
		}
	}); 
	vm.$on('pageInitCompleted', function (msg) {
		  this.initCode();
	});
	
	vm.$on('codeInitCompleted', function (msg) {
		  this.reloadData();
	});
	
	vm.$on('dataReloadCompleted', function (msg) {
		  console.log("data init complete");
	});
	
	vm.$emit("pageInitCompleted");
</script>
</html>