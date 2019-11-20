<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<html>
	<head>
		<title>修改密码</title>
		<jsp:include page="/WEB-INF/views/include/base-include.jsp">
		<jsp:param name="include" value="base,jquery-validation,inspinia" />
		</jsp:include>
		<style type="text/css">
			body{
				overflow-x:hidden; 
				padding:4px;
			}
			.table{
				margin:8px;
				width:calc(100% - 16px);
			}
		</style>
		<script type="text/javascript">
			
		</script>
	</head>
	<body  class="white-bg">
		<ul class="nav nav-tabs">
			<li  class="active"><a  href="#" >个人信息</a></li>
			<li><a  href="${ctx}/sys/user/userModifyPwd"  >修改密码</a></li>
		</ul>
		<table class="table table-bordered">
			<tr>
				<td align="right" width="30%"><label>归属部门:</label></td>
				<td>${user.officeName}</td>
			</tr>
			<tr>
				<td align="right"><label>用户名:</label></td>
				<td>${user.name}</td>
			</tr>
			<tr>
				<td align="right"><label>电话:</label></td>
				<td>${user.mobile}</td>
			</tr>
			<tr>
				<td align="right"><label>备注:</label></td>
				<td>${user.remark}</td>
			</tr>
			<tr>
				<td align="right"><label>用户类型:</label></td>
				<td>
					${user.type eq '1'? '管理员' : ''}
					${user.type eq '2'? '环保用户' : ''}
					${user.type eq '3'? '企业用户' : ''}
				</td>
			</tr>
			<tr>
				<td align="right"><label>用户角色:</label></td>
				<td>
					<c:forEach items="${roleList}" var="item">
						<span>${item.name},</span>
					</c:forEach>
				</td>
			</tr>
		</table>
	</body>
</html>