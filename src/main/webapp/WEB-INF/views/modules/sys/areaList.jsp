<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<html>
	<head>
		<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
		<jsp:include page="/WEB-INF/views/include/base-include.jsp">
			<jsp:param name="include" value="base,metronic,layer,ztree,vuejs2,jqgrid,jquery-validation" />
		</jsp:include>
		<title>系统区域管理列表</title>
	</head>
	<body class="">
		<div class="animated fadeIn" id="frame">
			<fieldset class="col-xs-12 " id="">
				<legend class="">
					<label>&nbsp;&nbsp;区域列表</label>
				</legend>
				<div class="ibox-content">
					<!-- 左侧列表 -->
					<div id="treeFrame" class="col-md-3">
						<ul id="treeObj" class="ztree"></ul>
					</div>
					<!-- 右侧详情 -->
					<div id="form" class="col-md-9">
						<vm-valid-form id="areaForm" :rules="rules" @valid-error="onValid">
							<form class="form-horizontal">
								<div class="form-group col-sm-6">
								<label class="control-label col-sm-3">区域代码:</label>
								<div class="col-sm-9">
									<vm-input v-model="data.id" id="id" name="id" :can-edit='canEdit'></vm-input>
								</div>
							</div>
							<div class="form-group col-sm-6">
								<label class="control-label col-sm-3">区域名称:</label>
								<div class="col-sm-9">
									<vm-input v-model="data.name" id="name" name="name" :can-edit='canEdit'></vm-input>
								</div>
							</div>
	
							<div class="form-group col-sm-6">
								<label class="control-label col-sm-3">区域类型:</label>
								<div class="col-sm-9">
									<vm-select name="type" v-model="data.type" :options="code.typeOptions" :can-edit='canEdit'></vm-select>
								</div>
							</div>
							<div class="form-group col-sm-6">
								<label class="control-label col-sm-3">曾用名:</label>
								<div class="col-sm-9">
									<vm-input v-model="data.oldName" id="oldName" :can-edit='canEdit'></vm-input>
								</div>
							</div>
							<div class="form-group col-sm-6">
								<label class="control-label col-sm-3">排序:</label>
								<div class="col-sm-9">
									<vm-input v-model="data.sort" id="sort" :can-edit='canEdit'></vm-input>
								</div>
							</div>
							<div class="form-group col-sm-6">
								<label class="control-label col-sm-3">父节点:</label>
								<div class="col-sm-9">
									<div class="input-group">
										<input type="text" :value="parentIdName" name="parentIdName"
											class="form-control input-sm" readonly="readonly"> <span
											class="input-group-btn">
											<button class="btn btn-success" id="selectParent"
												type="button">
												<i class="glyphicon glyphicon-search"></i>
											</button>
										</span>
									</div>
									<vm-input v-model="data.parentId" id="parentId" :can-edit='canEdit' class="hidden"></vm-input>
									<vm-textarea v-model="data.parentIds" id="parentIds"  :can-edit='canEdit' class="hidden"></vm-textarea>
								</div>
							</div>
							<div class="form-group col-sm-6">
								<label class="control-label col-sm-3">可用标志:</label>
								<div class="col-sm-9">
									<vm-radio name="flag" v-model="data.flag" :options="code.flagOptions" 
										:can-edit='canEdit' required></vm-radio>
								</div>
							</div>
							<div class="form-group col-sm-6">
								<label class="control-label col-sm-3">备注:</label>
								<div class="col-sm-9">
									<vm-textarea v-model="data.remark" id="remark" :can-edit='canEdit'></vm-textarea>
								</div>
							</div>
							<div class="form-group col-sm-12 text-center">
								<button class="btn btn-info" type="button" @click="formSubmit" id="saveUser">
									<i class="glyphicon glyphicon-floppy-disk"></i>&nbsp;保存
								</button> 
								&nbsp;&nbsp;&nbsp;&nbsp;
								<button class="btn btn-warning closeNowLayer" type="button" id="cancel">
									<i class="fa fa-close fa-fw"></i>&nbsp;关闭
								</button>
							</div>
						</vm-valid-form>
					</div>
				</div>
			</fieldset>
		</div>
		<div id="selectTreeFrame" style="display: none;">
			<ul id="selectTreeObj" class="ztree" style="height: 420px;overflow-y:auto "></ul>
			<div class="" style="margin-left: 125px">
				<button class="btn btn-info" type="submit" id="confirmSelect"><i class="glyphicon glyphicon-floppy-disk"></i>&nbsp;保存</button>
				<button class="btn btn-default" type="button" id="cancelSelect"><i class="glyphicon glyphicon-remove-circle"></i>&nbsp;关闭</button>
				<button class="btn btn-warning" type="button" id="topNode"><i class="glyphicon glyphicon-remove-circle"></i>&nbsp;顶级部门</button>
			</div>
		</div>
	</body>
	<script type="text/javascript" src="${ctxStatic}/modules/sys/js/areaList.js">	</script>
</html>