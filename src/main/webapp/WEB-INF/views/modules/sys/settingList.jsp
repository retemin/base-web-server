<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<html>
	<head>
		<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
		<jsp:include page="/WEB-INF/views/include/base-include.jsp">
			<jsp:param name="include" value="base,vuejs2,layer" />
		</jsp:include>
		<script type="text/javascript" src="${ctx }/static/common/js/config.js"></script>
		<title>系统配置列表</title>
		<style type="text/css">
			#app{
				padding:2px;
				margin:2px;
			}
			.content{
				padding:2px;
			}
			.search{
				margin-top:8px;
			}
			#settingContent{
				padding:4px;
			}
			.table td,.table th{
				text-align: center;
			}
		</style>
	</head>
	<body>
		<div id="app">
			<ul class="nav nav-tabs">
				<li v-for="tab in tabs" :class="tab.code==activeTab.code?'active':''" @click="activeTab=tab">
					<a href="javascript:void(0);">{{tab.name}}</a>
				</li>
			</ul>
			<div v-show="activeTab.code=='system'" class="content">
				<table class="table table-striped table-bordered table-hover">
					<thead>
						<tr>
							<th>序号</th>
							<th>参数名</th>
							<th>参数值</th>
						</tr>
					</thead>
					<tr v-for="(setting,i) in systemSettings" class="content">
						<td width="50px">{{i+1}}</td>
						<td>{{setting.config}}</td>
						<td>{{setting.value}}</td>
					</tr>
				</table>
			</div>
			<div v-show="activeTab.code=='base'">
				<form action="" class="row search col-md-12 ">
					<div class="col-md-3">
						<label class="col-sm-4 control-label text-right">作用域:</label>
						<div class="col-sm-8"><vm-select v-model="search.scope" :options="code.scope"/></div>
					</div>
					<div class="col-md-3">
						<label class="col-sm-4 control-label text-right">参数名:</label>
						<div class="col-sm-8"><vm-input v-model="search.config"></div>
					</div>
					<div class="col-md-4">
						<label class="col-sm-3 control-label text-right">是否启用:</label>
						<div class="col-sm-9"><vm-radio v-model="search.flag" :options="code.flag" :item-grid="'col-sm-6'"></vm-radio></div>
					</div>
					<div class="col-md-2">
						<button class="btn btn-info" type="button" @click="searchSetting">搜索</button>
						<button class="btn btn-success" type="button" @click="add">新增</button>
					</div>
				</form>
				<table class="table table-striped table-bordered table-hover">
					<thead>
						<tr>
							<th width="50px">序号</th>
							<th>作用域</th>
							<th>参数名</th>
							<th>参数值</th>
							<th>是否启用</th>
							<th>备注</th>
							<th>操作</th>
						</tr>
					</thead>
					<tr v-for="(setting,i) in baseSettings" class="content">
						<td>{{i+1}}</td>
						<td>{{getScope(setting.scope)}}</td>
						<td>{{setting.config}}</td>
						<td>{{setting.value}}</td>
						<td>
							<i class="fa fa-check-square-o" v-if="setting.flag=='1'"></i>
							<i class="fa fa-close" v-else></i>
						</td>
						<td>{{setting.remarks}}</td>
						<td>
							<a href="javascript:void(0);" @click="edit(setting)">[ <i class="fa fa-edit"></i> ]</a>
							<a href="javascript:void(0);" @click="deleteSetting(setting.pkid)">[ <i class="fa fa-trash-o"></i> ]</a>
						</td>
					</tr>
				</table>
			</div>
			<div id="settingContent" style="display:none;">
				<table class="table table-bordered">
					<tr>
						<td class="text-right"><label class="control-label">配置名：</label></td>
						<td><vm-input v-model="thisSetting.config"></td>
					</tr>
					<tr>
						<td class="text-right"><label class="control-label text-right">配置值：</label></td>
						<td><vm-input v-model="thisSetting.value"></td>
					</tr>
					<tr>
						<td class="text-right"><label class="control-label text-right">作用域：</label></td>
						<td><vm-select v-model="thisSetting.scope" :options="code.scope"></td>
					</tr>
					<tr>
						<td class="text-right"><label class="control-label text-right">是否启用：</label></td>
						<td><vm-radio v-model="thisSetting.flag" :options="code.flag" :item-grid="'col-sm-4'"></td>
					</tr>
					<tr>
						<td class="text-right"><label class="control-label text-right">备注：</label></td>
						<td><vm-input v-model="thisSetting.remarks"></td>
					</tr>
				</table>
				<div align="center">
					<button class="btn btn-success" @click="save" type="button">保存</button>
				</div>
			</div>
		</div>
	</body>
	<script type="text/javascript">
		var vmData = {
			systemSettings:[],
			baseSettings:[],
			tabs:[
				{code:'base',name:'基础配置'},
				{code:'system',name:'系统配置'}
			],
			activeTab:{code:'base',name:'基础配置'},
			search:{
				config:"",
				flag:"1",
				scope:""
			},
			code:{
				flag:[
					{name:"启用",value:"1"},
					{name:"禁用",value:"0"}
				],
				scope:[]
			},
			thisSetting:{},
			addLayer:null
		};
		var vm = new Vue({
			el:"#app",
			data:vmData,
			methods:{
				loadSettings:function(){
					var _this = this;
					$.get(_ctx+"/sys/setting/system",function(msg){
						if(msg.status=="1"){
							_this.systemSettings = msg.data;
						}
					});
					_this.searchSetting();
				},
				add:function(){
					this.addLayer = layer.open({
						type:1,
						title:"新增基础配置",
						area:"600px",
						content:$("#settingContent")
					});
				},
				searchSetting:function(){
					var _this = this;
					$.get(_ctx+"/sys/setting/list",_this.search,function(msg){
						if(msg.status=="1"){
							_this.baseSettings = msg.data;
						}
					});
				},
				save:function(){
					var _this = this;
					$.ajax({
						url: _ctx+"/sys/setting/save",
						type: 'POST',
						contentType:"application/json;charset=UTF-8",
						dataType: 'JSON',
						data: JSON.stringify(_this.thisSetting),
						success: function(msg) {
							if(msg.status=="1"){
								layer.msg("保存成功！",{icon:1});
								if(_this.addLayer){
									layer.close(_this.addLayer);
								}
								_this.loadSettings();
								_this.thisSetting = {};
							}
						}
					});
				},
				edit:function(setting){
					this.thisSetting = setting;
					this.addLayer = layer.open({
						type:1,
						title:"编辑基础配置",
						area:"600px",
						content:$("#settingContent")
					});
				},
				deleteSetting:function(settingId){
					var _this = this;
					layer.confirm("是否删除该配置？",{icon:3,title:"系统提示"},function(index){
						layer.close(index);
						$.get(_ctx+"/sys/setting/delete/"+settingId,function(msg){
							if(msg.status=="1"){
								layer.msg("删除成功！",{icon:1});
								_this.loadSettings();
								_this.thisSetting = {};
							}
						});
					});
				},
				loadScope:function(){
					this.code.scope = $.ConfigCodeUtil.getConfig("系统作用域","系统作用域");
				},
				getScope:function(scope){
					for(var i=0;i<this.code.scope.length;i++){
						if(this.code.scope[i].value==scope){
							return this.code.scope[i].name;
						}
					}
					return scope;
				}
			},
			mounted:function(){
				this.loadScope();
				this.loadSettings();
			}
		});
	</script>
</html>