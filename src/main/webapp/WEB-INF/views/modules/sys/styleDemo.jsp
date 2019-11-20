<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<html>
	<head>
		<meta charset="UTF-8">
		<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
		<jsp:include page="/WEB-INF/views/include/base-include.jsp">
			<jsp:param name="include" value="base,vuejs2,layer,jquery-validation,element" />
		</jsp:include>
		<title>项目样式模板</title>
		<style type="text/css">
			fieldset {
				padding: 10px;
				border: 1px solid #ddd;
				border-radius: 4px;
				margin: 0px 20px 10px 20px;
			}
			
			legend {
				margin-bottom: 0px;
				padding:0px 4px;
				border: 0;
				width: auto;
				font-weight: bolder;
			}
			
			.demo-group{
				margin:4px;
			}
			
			.demo-title{
				font-size:16px;
				font-weight: bolder;
				padding:2px;
				margin-top:2px;
			}
			
			.important{
				color: red;
				font-size: 16px;
				font-weight: normal;
			}
			
			#codeContent{
				position: absolute;
				width:1000px;
				height:300px;
				z-index: 999; 
				/* top: 80px; */
				left: 80px;
			}
			
			#codeContent>pre{
				height:-moz-calc(100% - 35px);
				height:-webkit-calc(100% - 35px);
				height: calc(100% - 35px);
				margin: 0px;
			}
			
			.show-code-btn{
				float: right;
				font-size:18px;
				color: green;
				font-weight:bold;
			}
		</style>
	</head>
	<body>
		<div class="data-form" id="app">
			<fieldset>
				<legend>0、总体说明：</legend>
				整个PC端项目：
				<div class="demo-title">1、使用vuejs作为前端框架（base-include.jsp中vuejs：1.0.28；vuejs2：2.5.9）；</div>
				<div class="demo-title">2、使用bootstrap样式（版本是3.3.6）；</div>
				<div class="demo-title">3、使用layui的layer控件，作为系统的弹出框；</div>
			</fieldset>
			
			<fieldset>
				<legend>1、按钮：btn</legend>
				<div class="demo-title">（1）、使用bootstrap的按钮样式：btn。使用<font class="important">默认尺寸</font></div>
				<div class="demo-group hide">
					<span id="btn-lg">
						较大尺寸  btn-lg：
						<button type="button" class="btn btn-default btn-lg">btn btn-default btn-lg</button>
						<button type="button" class="btn btn-primary btn-lg">btn btn-primary btn-lg</button>
						<button type="button" class="btn btn-success btn-lg">btn btn-success btn-lg</button>
						<button type="button" class="btn btn-info btn-lg">btn btn-info btn-lg</button>
						<button type="button" class="btn btn-warning btn-lg">btn btn-warning btn-lg</button>
						<button type="button" class="btn btn-danger btn-lg">btn btn-danger btn-lg</button>
					</span>
					<a href="javascript:showHtmlCode('btn-lg');" class="show-code-btn">[ 显示代码 ]</a>
				</div>
				<div class="demo-group">
					<span id="btn-default">
						默认尺寸：
						<button type="button" class="btn btn-default">btn btn-default</button>
						<button type="button" class="btn btn-primary">btn btn-primary</button>
						<button type="button" class="btn btn-success">btn btn-success</button>
						<button type="button" class="btn btn-info">btn btn-info</button>
						<button type="button" class="btn btn-warning">btn btn-warning</button>
						<button type="button" class="btn btn-danger">btn btn-danger</button>
					</span>
					<a href="javascript:showHtmlCode('btn-default');" class="show-code-btn">[ 显示代码 ]</a>
				</div>
				<div class="demo-group">
					<span id="btn-sm">
						较小尺寸 btn-sm：
						<button type="button" class="btn btn-default btn-sm">btn btn-default btn-sm</button>
						<button type="button" class="btn btn-primary btn-sm">btn btn-primary btn-sm</button>
						<button type="button" class="btn btn-success btn-sm">btn btn-success btn-sm</button>
						<button type="button" class="btn btn-info btn-sm">btn btn-info btn-sm</button>
						<button type="button" class="btn btn-warning btn-sm">btn btn-warning btn-sm</button>
						<button type="button" class="btn btn-danger btn-sm">btn btn-danger btn-sm</button>
					</span>
					<a href="javascript:showHtmlCode('btn-sm');" class="show-code-btn">[ 显示代码 ]</a>
				</div>
				<div class="demo-title">
					（2）、弹框保存和取消按钮：<font class="important">(取消按钮的class加上closeNowLayer，即可绑定关闭弹出功能。)</font>
				</div>
				<div class="demo-group">
					<span id="saveCloseBtn">
						<button class="btn btn-info" type="submit" id="saveUser"><i class="fa fa-save fa-fw"></i>保存</button>
						<button class="btn btn-default closeNowLayer" type="button" id="cancel"><i class="fa fa-close fa-fw"></i>取消</button>
					</span>
					<a href="javascript:showHtmlCode('saveCloseBtn');" class="show-code-btn">[ 显示代码 ]</a>
				</div>
			</fieldset>
			
			<fieldset>
				<legend>2、弹框：layer</legend>
				layer的统一样式与配置：
				<div class="demo-title">（1）、皮肤 skin</div>
				在layer全局配置已设置好了默认皮肤，无需配置skin值。<a href="javascript:openLayer();">例子</a>
				<div class="demo-title">（2）、弹框大小</div>
				根据弹框内容，设定弹框大小，要求是弹框尽量不出现滚动条。若有滚动条也只能是纵向滚动条。
				<div class="demo-title">（3）、阴影</div>
				在layer全局配置已设置好了默认阴影值，无需配置shadow值。
				<div class="demo-title">（4）、官网API</div>
				<a href="http://layer.layui.com/api.html" target="_blank">layer官网API</a>
			</fieldset>
			
			<fieldset>
				<legend>3、表单项：</legend>
				<div class="demo-title">
					（1）、输入框：
					<font class="important">(统一使用较小尺寸的输入框input-sm。)</font>
				</div>
				<span style="width:250px;display:inline-block;" id="input-sm">
					<input id="loginName" class="form-control input-sm" value="form-control input-sm">
				</span>
				<a href="https://v3.bootcss.com/css/" target="_blank">想知道更多内容，请参考bootstrap.V3</a>
				<a href="javascript:showHtmlCode('input-sm');" class="show-code-btn">[ 显示代码 ]</a>
				
				<div class="demo-title">
					（2）、带按钮的输入框：
					<font class="important">(输入框使用较小尺寸，input-sm；按钮使用默认尺寸，btn)</font>
				</div>
				<div>
					<span id="input-btn-search" style="width:250px;display:inline-block;">
						<div class="input-group">
							<input class="form-control input-sm" placeholder="搜索">
							<span class="input-group-btn">
								<button class="btn btn-info" type="button">
									<i class="glyphicon glyphicon-search"></i>
								</button>
							</span>
						</div>
					</span>
					<a href="javascript:showHtmlCode('input-btn-search');" class="show-code-btn">[ 显示代码 ]</a>
				</div>
				<div>
					<span id="input-btn-group" style="width:250px;display:inline-block;">
						<div class="input-group">
							<input class="form-control input-sm" placeholder="选择部门、分组">
							<span class="input-group-btn">
								<button class="btn btn-info" type="button">
									<i class="fa fa-group"></i>
								</button>
							</span>
						</div>
					</span>
					<a href="javascript:showHtmlCode('input-btn-group');" class="show-code-btn">[ 显示代码 ]</a>
				</div>
				<div>
					<span id="input-btn-user" style="width:250px;display:inline-block;">
						<div class="input-group">
							<input class="form-control input-sm" placeholder="选择人员">
							<span class="input-group-btn">
								<button class="btn btn-info" type="button">
									<i class="glyphicon glyphicon-user"></i>
								</button>
							</span>
						</div>
					</span>
					<a href="javascript:showHtmlCode('input-btn-user');" class="show-code-btn">[ 显示代码 ]</a>
				</div>
				<div>
					<span id="input-btn-map" style="width:250px;display:inline-block;">
						<div class="input-group">
							<input class="form-control input-sm" placeholder="地图定位">
							<span class="input-group-btn">
								<button class="btn btn-info" type="button">
									<i class="glyphicon glyphicon-map-marker"></i>
								</button>
							</span>
						</div>
					</span>
					<a href="javascript:showHtmlCode('input-btn-map');" class="show-code-btn">[ 显示代码 ]</a>
				</div>
				
				<div class="demo-title">
					（3）、表单：
					<a href="javascript:showHtmlCode('data-form');" class="show-code-btn">[ 显示代码 ]</a>
				</div>
				<div id="data-form">
					<form class="data-form">
						<table class="table table-bordered">
							<tr>
								<td align="right" width="15%"><label class="required">登录名：</label>
								</td>
								<td width="35%">
									<input id="loginName" id="loginName" class="form-control input-sm" required>
								</td>
								<td align="right" width="15%"><label class="required">用户名：</label></td>
								<td width="35%">
									<input v-model="name" class="form-control input-sm " required/> 
				 				</td>
	 						</tr>
	 						<tr>
								<td align="right"><label>部门：</label></td>
								<td>
									<div class="input-group">
										<input id="officeName" class="form-control input-sm " readonly="readonly">
										<span class="input-group-btn">
											<button class="btn btn-info" type="button" id="selectDepartmentBtn">
												<i class="fa fa-group"></i>
											</button>
										</span>
									</div>
				 				</td>
					      		<td align="right"><label>手机号码：</label></td>
								<td>
									<input id="mobile" class="form-control input-sm"  required>
				      			</td>
				        	</tr>
				        	<tr>
				        		<td align="right"><label>地理位置：</label></td>
				        		<td>
				        			<div class="input-group">
				        				<label class="input-group-addon">经度</label>
					        			<input class="form-control input-sm"/>
					        			<label class="input-group-addon">维度</label>
					        			<input class="form-control input-sm"/>
					        			<span class="input-group-btn">
											<button class="btn btn-info" type="button" id="selectDepartmentBtn">
												<i class="glyphicon glyphicon-map-marker"></i>
											</button>
										</span>
				        			</div>
				        		</td>
				        		<td align="right"><label>数量：</label></td>
								<td>
				            		<input id="duty" class="form-control input-sm " type="number">
				            	</td>
				        	</tr>
				        	<tr>
				        		<td align="right"><label>温度：</label></td>
				        		<td>
				        			<div class="input-group">
      									<input id="flow" class="form-control input-sm ">
      									<div class="input-group-addon">&#8451;</div>
    								</div>
				        		</td>
				        		<td align="right"><label>流量：</label></td>
				        		<td>
				        			<div class="input-group">
      									<input id="flow" class="form-control input-sm ">
      									<div class="input-group-addon">m/s</div>
    								</div>
				        		</td>
				        	</tr>
				        	<tr>
				        		<td align="right"><label>备注：</label></td>
				        		<td colspan="3">
				        			<textarea rows="2" class="form-control input-sm"></textarea>
				        		</td>
				        	</tr>
						</table>
				 	</form>
				</div>
				<div id="footFixToolbar" style="display: none;">
					<div class="footFixToolbar">
						<button class="btn btn-info" type="submit" id="saveUser"><i class="fa fa-save fa-fw"></i>保存</button>
						<button class="btn btn-default closeNowLayer" type="button" id="cancel"><i class="fa fa-close fa-fw"></i>取消</button>
					</div>
				</div>
				<font class="important">
					<div>Ⅰ.表单的class是data-form；</div>
					<div>Ⅱ.统一使用table作为排版容器，class是table table-bordered</div>
					<div>Ⅲ .必填字段名，使用class是required</div>
					<div>
						Ⅳ.提交前校验控件，使用基于vue2.0和jquery validation封装的控件。
					</div>
					<div>Ⅴ.备注的输入框，统一用textarea，class为form-control input-sm，显示2行</div>
					<div>
						Ⅵ.保存取消统一使用底部浮动工具栏，class为footFixToolbar 
						<a href="javascript:showHideFootFixToolbar();">显示/隐藏</a>
						<a href="javascript:showHtmlCode('footFixToolbar');" class="show-code-btn">[ 显示代码 ]</a>
					</div>
					<div>
						Ⅶ.有单位的输入框，使用bootstrap输入框分组的写法，把单位写在输入框右侧，请参考上面温度和流量。
					</div>
				</font>
			</fieldset>
			
			
			<fieldset>
				<legend>4、标签页：.nav </legend>
				<a href="javascript:showHtmlCode('nav');" class="show-code-btn">[ 显示代码 ]</a>
				<div id="nav">
					<ul class="nav nav-tabs">
			  			<li class="active"><a href="javascript:void(0);">标签页1</a></li>
			  			<li><a href="javascript:void(0);">标签页2</a></li>
			  			<li><a href="javascript:void(0);">标签页3</a></li>
					</ul>
				</div>
			</fieldset>
			
			<fieldset>
				<legend>5、数据表：data-table</legend>
				<a href="javascript:showHtmlCode('data-table');" class="show-code-btn">[ 显示代码 ]</a>
				<div id="data-table">
					<table class="data-table">
						<thead>
							<tr>
								<td width="50px">序号</td>
								<td width="15%">设备/设施名称</td>
								<td width="20%">技术要求<br/>（测量范围、精准度、精密度）</td>
								<td width="14%">使用部门</td>
								<td width="10%">预计金额 (元)</td>
								<td width="10%">预计采购日期</td>
								<td>备注</td>
								<td width="100px"><a href="javascript:void(0);" @click="addInstrument">[增加一行]</a></td>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(item,index) in instrumentList">
								<td>{{index+1}}</td>
								<td><vm-input v-model="item.instrumentName" :can-edit="canEdit"></vm-input></td>
								<td><vm-input v-model="item.technicalRequirement" :can-edit="canEdit"></vm-input></td>
								<td>
									<div class="input-group">
										<input v-model="item.useDepartment" class="form-control input-sm " readonly="readonly">
										<span class="input-group-btn">
											<button class="btn btn-info" type="button" id="selectDepartmentBtn">
												<i class="fa fa-group"></i>
											</button>
										</span>
									</div>
								</td>
								<td><vm-input v-model="item.estimatedAmount" :can-edit="canEdit" type="number"></vm-input></td>
								<td><vm-datepicker v-model="item.estimatedPurchaseDate" :can-edit="canEdit"></vm-datepicker></td>
								<td><vm-input v-model="item.remark" :can-edit="canEdit"></vm-input></td>
								<td><a href="javascript:void(0);" @click="deleteOne(item)">[删除]</a></td>
							</tr>
						</tbody>
					</table>
					
				</div>
				<font class="important">
					<div>数据列表是基于vuejs的自定义列表，样式class是data-table。</div>
				</font>
			</fieldset>
			<fieldset>
				<legend>6、区域树：el-tree </legend>
				<a href="javascript:showHtmlCode('el-tree');" class="show-code-btn">[ 显示代码 ]</a>
				<div id="el-tree">
					<el-input placeholder="输入关键字进行过滤" v-model="data.filterText"></el-input>
					<el-tree class="filter-tree" :data="data.areaTree" :props="data.defaultProps" 
						:default-expand-all="false" :filter-node-method="filterNode" ref="tree2"
					 	show-checkbox>
					</el-tree>
				</div>
			</fieldset>
		</div>
		<div id="codeContent" style="display:none;">
			<pre id="htmlEditor"></pre>
		</div>
	</body>
	<script type="text/javascript" src="${ctx}/static/plugin/ace-editor/ace.js"></script>
	<script type="text/javascript" src="${ctx}/static/plugin/ace-editor/theme-eclipse.js"></script>
	<script type="text/javascript" src="${ctx}/static/plugin/ace-editor/ext-statusbar.js"></script>
	<script type="text/javascript" src="${ctx}/static/plugin/ace-editor/ext-language_tools.js"></script>
	<script type="text/javascript" src="${ctx}/static/plugin/ace-editor/mode-html.js"></script>
	<script type="text/javascript" src="${ctx}/static/plugin/ace-editor/mode-css.js"></script>
	<script type="text/javascript" src="${ctx}/static/plugin/ace-editor/mode-javascript.js"></script>
	
	<script type="text/javascript" src="${ctx}/static/plugin/beautify-web/1.7.3/beautify-css.js"></script>
	<script type="text/javascript" src="${ctx}/static/plugin/beautify-web/1.7.3/beautify-html.js"></script>
	<script type="text/javascript" src="${ctx}/static/plugin/beautify-web/1.7.3/beautify.js"></script>
	<script type="text/javascript">
		var vmData = {
			data:{
				filterText: '',
				areaTree:[],
				defaultProps: {
					children: 'children',
					label: 'label'
				}
			},
			instrumentList:[],
			code:{
				sf:[{"name":"否","value":"否"},{"name":"是","value":"是"}],
			},
			canEdit:"true",
			rules:{}
		};
		var vm = new Vue({
			el : "#app",
			data :vmData ,
			methods:{
				filterNode:function(value, data) {
					if (!value) return true;
					return data.label.indexOf(value) !== -1;
				},
				addInstrument:function(){
					this.instrumentList.push({
						"instrumentName":"",
						"technicalRequirement":"",
						"useDepartment":"",
						"estimatedAmount":0,
						"estimatedPurchaseDate":new Date(),
						"remark":""
					});
				},
				deleteOne:function(item){
					this.$data.instrumentList.remove(item);
				},
				formSubmit:function(){
				},
				loadAreaJson:function(){
					var _this = this;
					$.get(_ctx+"/sys/area/list?json",function(msg){
						if(msg.status=="1"){
							for(var i in msg.data){
								var item = msg.data[i];
								if(item.parentId=="" || item.parentId=="0"){
									_this.data.areaTree.push(_this.buildAreaTree(item,msg.data));
								}
							}
						}
					});
				},
				buildAreaTree:function(area,areaList){
					var json = {};
					json.id = area.id;
					json.label = area.name;
					var children = [];
					for(var i in areaList){
						var item = areaList[i];
						if(item.parentId == area.id){
							children.push(this.buildAreaTree(item,areaList));
						}
					}
					if(children.length>0){
						json.children = children;
					}
					return json;
				}
			},
			watch: {
				"data.filterText":function(val) {
					this.$refs.tree2.filter(val);
				}
			},
			mounted:function(){
				this.addInstrument();
				this.loadAreaJson();
			}
		});
		ace.require("ace/ext/language_tools");
		function initEditor(domId,mode){
			editor = ace.edit(domId);
			editor.setTheme("ace/theme/eclipse");
			editor.session.setMode("ace/mode/"+mode);
			editor.$blockScrolling = Infinity;

			editor.setOptions({
			    enableBasicAutocompletion: true,
			    enableSnippets: true,
			    enableLiveAutocompletion: true
			});
			return editor;
		}
		
		var htmlEditor,jsEditor,cssEditor;
		setTimeout(function(){
			htmlEditor = initEditor("htmlEditor","html");
			//jsEditor = initEditor("jsEditor","javascript");
			//cssEditor = initEditor("cssEditor","css");
		},100);
		
		function formatCode(type){
			if(type=="jsCode"){
				jsEditor.setValue(js_beautify(jsEditor.getValue()));
			}else if(type=="cssCode"){
				cssEditor.setValue(css_beautify(cssEditor.getValue()));
			}else if(type='htmlCode'){
				htmlEditor.setValue(html_beautify(htmlEditor.getValue()));
			}
		}
		
		//var loadIndex = null;
		function showHtmlCode(contentId){
			//loadIndex = layer.load(1,{shade:0.5,zIndex:100}); //换了种风格
			htmlEditor.setValue(document.getElementById(contentId).innerHTML);
			this.formatCode('htmlCode');
			$("#codeContent").css("width",($(window).width()*0.6)+"px");
			$("#codeContent").css("height",($(window).height()*0.8-80)+"px");
			layer.open({
				type:1,
				title: ["查看源代码","font-size:18px;"],
				area: ["80%", "80%"],
				content:$("#codeContent")
			});
		}
		
		//隐藏代码显示框
		function hideCodeContent(){
			$("#codeContent").hide();
			layer.close(loadIndex);
		}
		
		//显示隐藏底部浮动工具栏
		function showHideFootFixToolbar(){
			if($("#footFixToolbar").is(":visible")){
				$("#footFixToolbar").hide();
			}else{
				$("#footFixToolbar").show();
			}
		}
		
		function openLayer(){
			top.layer.open({
				type: 2,
				title: ["新增用户","font-size:18px;"],
				content:_ctx+"/sys/user/form",
				area: ["1024px", "550px"]
			});
		}
	</script>
</html>