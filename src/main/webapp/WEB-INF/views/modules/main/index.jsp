<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<!DOCTYPE html>
<html>
	<head>
		<title>${fns:getConfig("system.name")}</title>
		<link rel="shortcut icon" href="${ctxStatic}/modules/main/images/logo.png" type="image/x-icon" />
		
		<jsp:include page="/WEB-INF/views/include/base-include.jsp">
			<jsp:param name="include" value="base,noiframe,layer,vuejs2,iview,slimScroll" />
		</jsp:include>
		
		<link href='${ctxStatic}/modules/main/css/index.css' rel='stylesheet' type='text/css'>
	</head>
	
	<body>
	<div id="mainFrame">
		<div id="header">
			<i-menu mode="horizontal" :theme="status.theme" :active-name="activeTopMenu.id">
				<a href="javascript:void(0);" class="logo">
					<img src="${ctx}/static/modules/main/images/logo.png" alt="logo">
					<span class="maint-title">${fns:getConfig("system.name")}</span>
				</a>
				<Submenu name="userFrame" class="pull-right" >
			         <template slot="title">
			         	<span class="more_info">
				         	<i class="icon iconfont icon-yonghu"></i>
							{{_nowUser}}
			         	</span>
			         </template>
			         <Menu-Item   name="userFrame-userInfo" >
			         	<p class="menuitem-span" @click.prevent="openUserInfo"><span>个人信息</span></p>
			         </Menu-Item>
			         <Menu-Item   name="userFrame-changePwd">
			     		<p class="menuitem-span" @click.prevent="openUserModifyPwd"><span> 修改密码</span></p>    
			        </Menu-Item>
			        <hr/>
			         <Menu-Item   name="userFrame-logout">
			         	<p class="menuitem-span" @click.prevent="logout"><span> 退出登录</span></p>    
			         </Menu-Item>
		        </Submenu>
				<template v-for="item in menuList">
					<li :class="'pull-right top-menu ivu-menu-item'+(activeTopMenu.id==item.id?' selected':'')" @click="onMenuItemClick(item)">
						<p class="menu-item">
							<i :class="item.icon"></i>
							<span>{{item.name}}</span>
						</p>
					</li>
				</template>
    		</i-menu>
		</div>
		<div id="contentFrame">
			<div class="content-left" v-if="_isNotEmptyArray(activeTopMenu.childList)">
				<div class="left-content">
					<ul>
						<template v-for="leftMenu in activeTopMenu.childList" >
							<div class="menu-group" v-if="leftMenu.childList && leftMenu.childList.length>0">
								<!-- <img v-if="leftMenu.iconUrl" :src="iconImgBasePath + leftMenu.iconUrl">
								<i v-else :class="'menu-icon '+leftMenu.icon"></i> -->
								<div class="menu-group-head">
									<span class="menu-word" :title="leftMenu.name">{{leftMenu.name}}</span>
								</div>
								<li v-for="item in leftMenu.childList" :class="activeLeftMenu.id==item.id?'active':''" @click="onLeftMenuClick(item)">
									<img v-if="item.iconUrl" :src="iconImgBasePath + item.iconUrl">
									<i v-else :class="'menu-icon '+item.icon"></i>
									<span class="menu-word" :title="item.name">{{item.name}}</span>
								</li>
							</div>
							<li v-else :class="activeLeftMenu.id==leftMenu.id?'active':''" @click="onLeftMenuClick(leftMenu)">
								<img v-if="leftMenu.iconUrl" :src="iconImgBasePath + leftMenu.iconUrl">
								<i v-else :class="'menu-icon '+leftMenu.icon"></i>
								<span class="menu-word" :title="leftMenu.name">{{leftMenu.name}}</span>
							</li>
						</template>
					</ul>
				</div>
			</div>
			<div :class="_isNotEmptyArray(activeTopMenu.childList)?'content-right':'content-all'" style="display: block;">
				<iframe  width='100%' height='100%' :src="transferMenuHref(activeLeftMenu.href)" frameborder='0' seamless></iframe>
			</div>
		</div>
	</div>
	</body>
	<script type="text/javascript" src="${ctxStatic}/modules/main/js/index.js?v=${now}"></script>
</html>