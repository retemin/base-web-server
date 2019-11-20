<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<html>
	<head>
		<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
		<jsp:include page="/WEB-INF/views/include/base-include.jsp">
			<jsp:param name="include" value="base,metronic,layer,ztree,vuejs2" />
		</jsp:include>
		<title>菜单列表</title>
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
				height:-moz-calc(100% - 5px);
				height:-webkit-calc(100% - 5px);
				height: calc(100% -5px);
			}

			#treeFrame,#formFrame{
				overflow-y:auto;
			}
			 
			.ztree{
				font-size: 14px;
				/* font-family: "Microsoft YaHei" ! important; */
			}
			.input-group-sm{
				height:30px;
			}
			.icon-url{
				padding:0px;
				margin:0px;
			}
			.icon-url img{
				height: 99%;
				padding:0px;
				margin:0px;
			}
			.menu-img{
				display: inline-block;
				margin: 4px;
				padding:4px;
				text-align: center;
				width: 18%;
				cursor: pointer;
				font-size: 14px;
				border-radius: 8px;
				border-color: white;
				border-style: solid;
				border-width: 2px;
			}
			.menu-img-active{
				border-color: #ff9800;
				border-style: solid;
				border-width: 2px;
			}
			.menu-img:hover{
				border-color: #21c064;
				border-style: solid;
				border-width: 2px;
			}
			.menu-img img{
				margin-bottom: 3px;
			}
			
		</style>
	</head>
	<body class="">
		<div id="frame">
		
			<fieldset class="col-xs-12  " id="">
				<legend class="">
					<label>&nbsp;&nbsp;菜单列表</label>
				</legend>
				<div class="">
				
					<div id="treeFrame" class="col-md-3" >
						<ul id="treeObj" class="ztree"></ul>
					</div>
					<div id="formFrame" class="col-md-9">
						<form class="form form-horizon" id="menuForm">
							<table class="table table-bordered">
								<tr>
									<td align="right"><label>id:</label></td>
									<td><vm-input v-model="data.id"  readonly="true"></vm-input></td>
									<td align="right"><label>名称:</label></td>
									<td><vm-input v-model="data.name" ></vm-input></td>
								</tr>
								<tr>
									<td align="right"><label>菜单域:</label></td>
									<td><vm-select v-model="data.scope"  :options="code.scopeOptions"></vm-select></td>
									<td align="right"><label>连接:</label></td>
									<td><vm-input v-model="data.href" ></vm-input></td>
								</tr>
								<tr>
									<td align="right"><label>目标:</label></td>
									<td><vm-input v-model="data.target" ></vm-input></td>
									<td align="right"><label>父节点:</label></td>
									<td>
										<vm-input v-model="data.parentId " class="form-control hidden"></vm-input>
										<div class="input-group input-group-sm">
											<input type="text" :value="parentIdName" class="form-control input-sm" readonly="readonly" /> 
											<span class="input-group-btn">
												<button class="btn btn-success" id="selectParent" type="button">
													<i class="glyphicon glyphicon-search"></i>
												</button>
											</span>
										</div>
									</td>
								</tr>
								<tr>
									<td align="right"><label>图标:</label></td>
									<td>
										<div class="input-group input-group-sm">
											<vm-input v-model="data.icon" ></vm-input>
											<span class="input-group-addon" style="background-color: white;">
												<i v-bind:class="data.icon" id="iconClass" style="color:black;"></i>
											</span>
											<span class="input-group-btn">
												<button type="button" class="btn btn-success" onclick="selectIcon();"><span class="fa fa-file-picture-o" style="font-size:15px;"></span></button>
											</span>
										</div>
									</td>
									<td align="right"><label>排序:</label></td>
									<td><vm-input v-model="data.sort" ></vm-input></td>
								</tr>
								<tr>
									<td align="right"><label>图标url:</label></td>
									<td>
										<div class="input-group input-group-sm">
											<vm-input v-model="data.iconUrl" ></vm-input>
											<span class="input-group-addon icon-url" style="background-color: white;" v-if="data.iconUrl">
												<img :src="iconImgBasePath+data.iconUrl">
											</span>
											<span class="input-group-btn">
												<button type="button" class="btn btn-success" @click.prevent="selectMenuIcon">
												<span class="fa fa-file-picture-o" style="font-size:15px;" tiltle="选择菜单图标"></span>
											</button>
											</span>
										</div>
									</td>
									<td align="right"><label>权限标志:</label></td>
									<td><vm-input v-model="data.permission" ></vm-input></td>
								</tr>
								<tr>
									<td align="right"><label>控制标志:</label></td>
									<td><vm-input v-model="data.controlMark" ></vm-input></td>
									<td align="right"><label>可用标志:</label></td>
									<td><vm-radio v-model="data.flag"  :options="code.flagOptions"></vm-radio></td>
								</tr>
								<tr>
									<td align="right"><label>是否显示:</label></td>
									<td><vm-radio v-model="data.isShow"  :options="code.flagOptions"></vm-radio></td>
									<td align="right"><label>菜单类型:</label></td>
									<td><vm-select v-model="data.type"  :options="code.typeOptions" ></vm-select></td>
								</tr>
								<tr>
									<td colspan="4" align="center">
										<button class="btn btn-info" type="button" ><i class="fa fa-save fa-fw"></i>&nbsp;新建</button>
									<button class="btn btn-success" type="submit" ><i class="fa fa-pencil fa-fw"></i>&nbsp;保存</button>
									</td>
								</tr>
							</table>
						</form>
					</div>
				</div>
				<div id="icon-images" style="display:none;">
					<div v-for="img in code.iconImgs" :class="'menu-img'+(img==selectedIconImg?' menu-img-active':'')" @click="selectThisMenuIcon(img)">
						<img :src="iconImgBasePath+img">
						<div>{{img}}</div>
					</div>
				</div>
			</fieldset>
		</div>
		
		<div id="selectTreeFrame" style="display: none;">
			<ul id="selectTreeObj" class="ztree" style="height: 420px;overflow-y:auto "></ul>
			<div class="" style="margin-left: 125px">
				<button class="btn btn-info" type="submit" id="confirmSelect"><i class="glyphicon glyphicon-floppy-disk"></i>&nbsp;保存</button>
				<button class="btn btn-default" type="button" id="cancelSelect"><i class="glyphicon glyphicon-remove-circle"></i>&nbsp;关闭</button>
				<button class="btn btn-warning" type="button" id="topNode"><i class="glyphicon glyphicon-remove-circle"></i>&nbsp;顶级菜单</button>
			</div>
		</div>
		<script type="text/javascript" src="${ctxStatic}/modules/sys/js/menuList.js"></script>
	</body>
</html>