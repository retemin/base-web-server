<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<html>
	<head>
		<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
		<jsp:include page="/WEB-INF/views/include/base-include.jsp">
			<jsp:param name="include" value="base,layer,metronic,ztree,vuejs2,jqgrid" />
		</jsp:include>
		<title>部门列表</title>
		<style type="text/css">
			div#rMenu {position:absolute; visibility:hidden; top:0;text-align: left;padding: 2px;}
			*div#rMenu ul li{margin: 1px 0;padding: 0 5px;cursor: pointer;list-style: none outside none;background-color: #EFF3F8;}
			*div#rMenu ul li a{border: 1px solid #A8C5E0;}
			
			html,body,#frame,#frame>fieldset,#treeFrame{
				height: 100%
			}
			
			#frame>fieldset>legend{
				margin-bottom: 5px;
			}
			
			#frame>fieldset>div{
				height:-moz-calc(100% - 50px);
				height:-webkit-calc(100% - 50px);
				height: calc(100% -50px);
			}
			
			#formFrame{
				height:-moz-calc(100% - 50px);
				height:-webkit-calc(100% - 50px);
				height: calc(100% -50px);
			}
			
			#treeFrame,#formFrame{
				overflow-y:auto;
			}
			 
			.ztree{
				font-size: 14px;
				/* font-family: "Microsoft YaHei" ! important; */
			}
			.two-grid-frame{
				width:100%;
				height:100%;
				text-align: center;
				overflow-x: hidden;
			}
			
			.two-grid-frame>div:first-child{
				margin-left: 15px;
			
			}
			
			.two-grid-frame>div:last-child{
				margin-right: -15px;
			
			}
			
			.two-grid-frame>.grid-frame>form{
				margin-bottom: 10px
			}
			
			.two-grid-frame>.mid-control>button:first-child{
				margin-bottom: 20px;
				margin-top: 150px;
			}
			
			.grid-frame{
				padding-top:10px;
			}
		</style>
	</head>
	<body class="">
		<div id="frame">
			<fieldset class="col-xs-12 " id="">
				<legend class="">
					<label>&nbsp;&nbsp;部门列表</label>
				</legend>
				<div class="">
					<div id="treeFrame" class="col-md-3">
						<ul id="treeObj" class="ztree"></ul>
					</div>
					<div id="formFrame" class="col-md-9">
						<form class="form-horizontal" id="officeForm">
							<div class="form-group col-sm-6">
								<label class="control-label col-sm-3">id:</label>
								<div class="col-sm-9">
									<input v-model="data.id" class="form-control input-sm" readonly="readonly">
								</div>
							</div>
							<div class="form-group col-sm-6">
								<label class="control-label col-sm-3">名称:</label>
								<div class="col-sm-9">
									<input v-model="data.name" class="form-control input-sm" required>
								</div>
							</div>
	
							<div class="form-group col-sm-6">
								<label class="control-label col-sm-3">曾用名:</label>
								<div class="col-sm-9">
									<input v-model="data.oldName" class="form-control input-sm">
								</div>
							</div>
							
							<div class="form-group col-sm-6">
								<label class="control-label col-sm-3">所属部门:</label>
								<div class="col-sm-9">
									<input v-model="data.parentId " class="form-control hidden">
									<div class="input-group">
										<input type="text" :value="parentIdName" class="form-control input-sm" readonly="readonly"> 
										<span class="input-group-btn">
											<button class="btn btn-success" id="selectParent" type="button" @click="selectParent">
												<i class="glyphicon glyphicon-search"></i>
											</button>
										</span>
									</div>
								</div>
							</div>
							
							<div class="form-group col-sm-6">
								<label class="control-label col-sm-3">类型:</label>
								<div class="col-sm-9">
									<select v-model="data.type" class="form-control input-sm" required>
										<option value="2">部门</option>
										<option value="1">单位</option>
									</select>
								</div>
							</div>
							
							<div class="form-group col-sm-6">
								<label class="control-label col-sm-3">所属区域:</label>
								<div class="col-sm-9">
									<div class="input-group">
										<input id="areaId" v-model="data.areaId" class="form-control hidden">
										<input id="areaName" v-model="data.areaName" class="form-control input-sm" readonly="readonly">
										<span class="input-group-btn">
											<button class="btn btn-success" id="selectAreaBtn" type="button" @click="selectArea">
												<i class="glyphicon glyphicon-search"></i>
											</button>
										</span>
									</div>
								</div>
							</div>
	
							<div class="form-group col-sm-6">
								<label class="control-label col-sm-3">可用标志:</label>
								<div class="col-sm-9">
									<select v-model="data.flag" class=" form-control" required>
										<option value="1">是</option>
										<option value="0">否</option>
									</select>
								</div>
							</div>
	
							<div class="form-group col-sm-6">
								<label class="control-label col-sm-3">电话:</label>
								<div class="col-sm-9">
									<input v-model="data.tel" class="form-control ">
								</div>
							</div>
							<div class="form-group col-sm-6">
								<label class="control-label col-sm-3">传真:</label>
								<div class="col-sm-9">
									<input v-model="data.fax" class="form-control ">
								</div>
							</div>
	
							<div class="form-group col-sm-6">
								<label class="control-label col-sm-3">地址:</label>
								<div class="col-sm-9">
									<input v-model="data.address" class="form-control ">
								</div>
							</div>
							
							<div class="form-group col-sm-6">
								<label class="control-label col-sm-3">排序:</label>
								<div class="col-sm-9">
									<input v-model="data.sort" class="form-control ">
								</div>
							</div>
	
							<div class="form-group col-sm-6">
								<label class="control-label col-sm-3">备注:</label>
								<div class="col-sm-9">
									<textarea v-model="data.remark" class="form-control " rows="3"></textarea>
								</div>
							</div>
							<div class="form-group col-sm-12 text-center">
								<button class="btn btn-info" type="submit" ><i class="fa fa-save"></i>&nbsp;保  存</button>
								&nbsp;&nbsp;
								<button v-show="data.id!=''" class="btn btn-success" type="button" id="bindUserBtn" @click="bindUser">
									<i class="fa fa-database"></i>
									&nbsp;
									绑定用户
								</button>
							</div>
						</form>
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
		
		<div class="row two-grid-frame" id="userOfficeFrame" style="display: none;">
			<div  class="col-xs-5 grid-frame" id="unbindListGridFrame">
				<form class="form-inline" id="unBindSearchForm">
					 <div class="form-group">
						<label class="">姓名</label>
						<input name="name" class="form-control input-sm"  style="width:100px " >
					</div>
					<div class="form-group">
						<label class="">类型</label>
						<select name="type" class="form-control input-sm"  >
							<option value="2">环保用户</option>
							<option value="1">管理员</option>
							<option value="3">企业用户</option>
						</select>
					</div>
					<button type="submit" class="btn btn-success">搜索</button>
				</form>
				<table id="unbindList" class=""></table>
				<div id="unbindListPager"></div>
			</div>
			<div  class="col-xs-1 mid-control">
				<button class="btn btn-primary col-xs-12" id="bindUser"><span class="fa fa-hand-o-right"></span></button>
				<button class="btn btn-success col-xs-12" id="unbindUser"><span class="fa fa-hand-o-left"></span></button>
			</div>
			<div class="col-xs-6 grid-frame">
				<form class="form-inline" id="bindSearchForm">
					  <div class="form-group">
						<label class="">姓名</label>
						<input name="name" class="form-control input-sm"  >
					</div>
					<button type="submit" class="btn btn-success">搜索</button>
				</form>
				<table id="bindList" class=""></table>
				<div id="bindListPager"></div>
			</div>
		</div>
	
		<script type="text/javascript" src="${ctxStatic}/modules/sys/js/officeList.js"></script>
	</body>
</html>