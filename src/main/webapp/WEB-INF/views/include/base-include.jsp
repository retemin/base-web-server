<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page trimDirectiveWhitespaces="true" %>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<meta http-equiv="X-UA-Compatible" content="IE=edge" >
<META HTTP-EQUIV="pragma" CONTENT="no-cache"> 
<META HTTP-EQUIV="Cache-Control" CONTENT="no-cache, must-revalidate"> 
<meta http-equiv="Expires" content="0" />
<meta name="author" content="grkj" />
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0">


<script type="text/javascript">
var _ctx="${ctx}";
var _ctxRoot="${ctxRoot}";
var _ctxStatic="${ctxStatic}";
var _rowList=[100,200,500,2000];
var _rowNum=500;

var _nowUser="${fns:getUser().loginName}";//当前用户登录id
var _nowUserName="${fns:getUser().name}";// 当前登录用户名称

var _nowUserOfficeId="${fns:getUser().officeId}";// 当前用户所属的部门Id
var _nowUserOfficeName="${fns:getUser().officeName}";// 当前用户所属的部门Name
var _nowUserAreaId="";// 当前用户所属的部门Id

</script>
<c:forEach items="${param.include.split(',')}" var="item" varStatus="itemId">
	<c:choose>
		<c:when test="${'base' eq item}">
    		<script src="${ctxStatic}/plugin/jquery/jquery-2.2.4.min.js" type="text/javascript"></script>
    		<script  type="text/javascript">
    			$.ajaxSetup({cache:false}); 
    		</script>
			<!-- font-awsome -->
			<link rel="stylesheet" href="${ctxStatic}/plugin/font-awesome/css/font-awesome.min.css" />
			<!-- iconfont -->
			<link href="${ctxStatic}/plugin/iconfont/iconfont.css" type="text/css" rel="stylesheet" />
			
			<!-- boostrap -->
			<link href="${ctxStatic}/plugin/bootstrap/3.3.6/css/bootstrap.min.css" type="text/css" rel="stylesheet" />
			<script src="${ctxStatic}/plugin/bootstrap/3.3.6/js/bootstrap.min.js" type="text/javascript"></script>
			
			<link href="${ctxStatic}/common/css/common.css" type="text/css" rel="stylesheet" /> 
			<!-- date -->
			<script src="${ctxStatic}/plugin/laydate/laydate.js" type="text/javascript"></script>
			<!-- other -->
			<script type="text/javascript" src="${ctxStatic}/common/js/string-utils.js"></script>
			<script type="text/javascript" src="${ctxStatic}/common/js/array-utils.js"></script>
			<script type="text/javascript" src="${ctxStatic}/common/js/date-utils.js"></script>
			<script type="text/javascript" src="${ctxStatic}/common/js/object-utils.js"></script>
			<script type="text/javascript" src="${ctxStatic}/common/js/form-utils.js"></script>
			<script type="text/javascript" src="${ctxStatic}/common/js/CommonData-pluign.js"></script>
			<c:if test="${fns:getUser()!=null}">
				<script type="text/javascript" src="${ctxStatic}/modules/code/config/config.js"></script>
			</c:if>
			
			
		</c:when>
		<c:when test="${'select2' eq item}">
			<!-- select 2 -->
			<script src="${ctxStatic}/plugin/select2/4.0.5/js/select2.min.js" type="text/javascript"></script>
			<script src="${ctxStatic}/plugin/select2/4.0.5/js/i18n/zh-CN.js" type="text/javascript"></script>
			<link href="${ctxStatic}/plugin/select2/4.0.5/css/select2.min.css" type="text/css" rel="stylesheet" />
		</c:when>
		<c:when test="${'layer' eq item}">
			<link href="${ctxStatic}/plugin/layer/layer-v3.1.0/theme/default/layer.css" type="text/css" rel="stylesheet" />
			<script src="${ctxStatic}/plugin/layer/layer-v3.1.0/layer.js" type="text/javascript"></script>
			<script src="${ctxStatic}/common/js/layer-extends.js" type="text/javascript"></script>
		</c:when>	
		<c:when test="${'layui' eq item}">
			<link href="${ctxStatic}/plugin/layui/css/layui.css" type="text/css" rel="stylesheet" />
			<script src="${ctxStatic}/plugin/layui/layui.js" type="text/javascript"></script>
		</c:when>		
		<c:when test="${'jquery-validation' eq item}">
			<!-- jquery-validation -->
			<link href="${ctxStatic}/plugin/jquery-validation/1.11.1/jquery.validate.min.css" type="text/css"
				rel="stylesheet" />
			<script src="${ctxStatic}/plugin/jquery-validation/1.11.1/jquery.validate.min.js" type="text/javascript"></script>
			<script src="${ctxStatic}/plugin/jquery-validation/1.11.1/jquery.validate.method.min.js"
				type="text/javascript"></script>
			<script src="${ctxStatic}/common/js/jquery-validate-extend.js" type="text/javascript"></script>
		</c:when>
		<c:when test="${'backstretch' eq item}">
			<script src="${ctxStatic}/plugin/backstretch/jquery.backstretch.min.js" type="text/javascript"></script>
		</c:when>
		<c:when test="${'vuejs2' eq item}">
			<link href="${ctxStatic}/common/css/vue-common.css" rel="stylesheet" />
			<link href="${ctxStatic}/common/css/vue-component.css" rel="stylesheet" />
			<script src="${ctxStatic}/plugin/vuejs/2.5.17/vue.min.js" type="text/javascript"></script>
			<script src="${ctxStatic}/common/js/vue-components.js?v=1.0" type="text/javascript"></script>
		</c:when>
		<c:when test="${'iview' eq item}">
			<link href="${ctxStatic}/plugin/iview/3.0.1/styles/iview.css" rel="stylesheet" />
			<script src="${ctxStatic}/plugin/iview/3.0.1/iview.min.js" type="text/javascript"></script>
			
			<link href="${ctxStatic}/common/css/vue-vm-iview.css" rel="stylesheet" />
			<script src="${ctxStatic}/common/js/vue-vm-iview.js?v=1.0" type="text/javascript"></script>
		</c:when>
		<c:when test="${'magiccheck' eq item }">
			<link href="${ctxStatic}/common/css/magiccheck.css" type="text/css" rel="stylesheet" />
		</c:when>
		<c:when test="${'slimScroll' eq item }">
			<script src="${ctxStatic}/plugin/jquery-slimScroll/jquery.slimscroll.min.js" type="text/javascript"></script>
		</c:when>
		<c:when test="${'dataBind' eq item}">
			<script type="text/javascript">${_customServerScript}</script>
		</c:when>
		<c:when test="${'leaflet' eq item}">
	
			<link href="${ctxStatic}/plugin/leaflet/leaflet.css?v=${now}" type="text/css" rel="stylesheet" />
			<script src="${ctxStatic}/plugin/leaflet/leaflet.js?v=${now}" type="text/javascript"></script>

			<script src="${ctxStatic}/plugin/esri-leaflet/esri-leaflet.js" type="text/javascript"></script>

			<link href="${ctxStatic}/plugin/Leaflet.markercluster/MarkerCluster.css?v=${now}" type="text/css" rel="stylesheet" />
			<link href="${ctxStatic}/plugin/Leaflet.markercluster/MarkerCluster.Default.css?v=${now}" type="text/css" rel="stylesheet" />
			<script src="${ctxStatic}/plugin/Leaflet.markercluster/leaflet.markercluster.js?v=${now}" type="text/javascript"></script>
			
			<script src="${ctxStatic}/plugin/Leaflet.ChineseTmsProviders/leaflet.ChineseTmsProviders.js" type="text/javascript"></script>
		
		</c:when>
		<c:when test="${'ztree' eq item}">
 			<link href="${ctxStatic}/plugin/jquery-ztree/3.5.33/css/zTreeStyle/zTreeStyle.css" type="text/css"
				rel="stylesheet" />  
 		<%-- 	<link href="${ctxStatic}/plugin/jquery-ztree/3.5.33/css/metroStyle/metroStyle.css" type="text/css"
				rel="stylesheet" /> --%>
		<%-- 		<link href="${ctxStatic}/plugin/jquery-ztree/3.5.33/css/awesomeStyle/awesome.css" type="text/css"
				rel="stylesheet" /> --%>
			<script src="${ctxStatic}/plugin/jquery-ztree/3.5.33/js/jquery.ztree.all.js" type="text/javascript"></script>
			<script src="${ctxStatic}/plugin/jquery-ztree/3.5.33/js/jquery.ztree.exhide.min.js" type="text/javascript"></script>
			
			<script type="text/javascript" src="${ctxStatic}/common/js/ztree-utils.js"></script>
		</c:when>
		<c:when test="${'echarts' eq item}">
			<script src="${ctxStatic}/plugin/echarts/echarts.min.js" type="text/javascript"></script>
		</c:when>
		<c:when test="${'noiframe' eq item}">
			<script type="text/javascript" src="${ctxStatic}/common/js/not-permit-iframe.js"></script>
		</c:when>
		
		<c:when test="${'jqgrid' eq item}">
			<!-- jqgrid -->
			<link href="${ctxStatic}/plugin/jqgrid/css/ui.jqgrid.css" rel="stylesheet">
			<script src="${ctxStatic}/plugin/jqgrid/js/i18n/grid.locale-cn.js" type="text/javascript"></script>
			<script src="${ctxStatic}/plugin/jqgrid/js/jquery.jqGrid.min.js" type="text/javascript"></script>
			<script src="${ctxStatic}/plugin/jqgrid/js/grid.treegrid.js" type="text/javascript"></script>
			<%-- <link href="${ctxStatic}/plugin/jqgrid/css/ui.jqgrid.css" type="text/css" rel="stylesheet" /> --%>
			<script type="text/javascript">$.jgrid.defaults.styleUI = "Bootstrap";</script>
		</c:when>
		<c:when test="${'jqgridExp' eq item }">
			<script src="${ctxStatic}/common/js/jqGridExportExcel_backstage.js"></script>
		</c:when>
		<c:when test="${'base64' eq item}">
			<script type="text/javascript" src="${ctxStatic}/plugin/base64/base64.js?v=1.1"></script>
		</c:when>
		<c:when test="${'element' eq item}">
			<link href="${ctxStatic}/plugin/element-ui/2.9.2/element.css" rel="stylesheet">
			<link href="${ctxStatic}/plugin/element-ui/2.9.2/element-custom.css" rel="stylesheet">
			<script type="text/javascript" src="${ctxStatic}/plugin/element-ui/2.9.2/element.min.js"></script>
		</c:when>
	</c:choose>

</c:forEach>