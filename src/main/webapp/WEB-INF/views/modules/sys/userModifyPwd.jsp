<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/WEB-INF/views/include/taglib.jsp"%>
<html>
<head>
	<title>修改密码</title>
	<jsp:include page="/WEB-INF/views/include/base-include.jsp">
	<jsp:param name="include" value="base,layer,jquery-validation,inspinia" />
	</jsp:include>
	<style type="text/css">
		body{
			overflow-x:hidden; 
			padding:4px;
		}
	</style>
	<script type="text/javascript">
	$(document).ready(function() {
		$("#oldPassword").focus();
		$("#inputForm").validate({
			rules: {
			},
			messages: {
				confirmNewPassword: {equalTo: "输入与上面相同的密码"},
			},
			submitHandler: function(form){
				submit();
			},
			errorContainer: "#messageBox",
			errorPlacement: function(error, element) {
				$("#messageBox").text("输入有误，请先更正。");
				if (element.is(":checkbox")||element.is(":radio")||element.parent().is(".input-append")){
					error.appendTo(element.parent().parent());
				} else {
					error.insertAfter(element);
				}
			}
		});
	});
	function submit(){
		var oldPassword=$("#oldPassword").val();
		var newPassword=$("#newPassword").val();
		  var parent=/^(?![^a-zA-Z]+$)(?!\D+$).{8,20}$/;
		  if(!parent.test($("#newPassword").val())){
			  layer.tips("密码必须8-20位,必须由数字+字母组成","#newPassword");
			  $("#newPassword").focus();
			  return 
		  }
		$.ajax({
			url : _ctx + "/sys/user/updatePassword?oldPassword="+oldPassword+"&newPassword="+newPassword,
			data : null,
			type : "post",
			contentType : "application/json",
			success : function(msg) {
				if(msg.status==1){
					top.layer.success("保存成功");
				}else{
					top.layer.error("保存失败："+msg.message);
				}
			},
			error : function(msg) {
				top.layer.close(loadingIndex);
				top.layer.error("保存失败："+msg.message);
			}
		});
	}
	</script>
</head>
<body  class="white-bg">
	<ul class="nav nav-tabs">
		<li><a href="${ctx}/sys/user/userInfo">个人信息</a></li>
		<li class="active"><a href="#">修改密码</a></li>
	</ul><br/>
	<form:form id="inputForm"  method="post" class="form-horizontal">
		<table class="table table-bordered">
			<tr>
				<td align="right" width="30%"><label>旧密码:</label></td>
				<td>
					<input id="oldPassword" name="oldPassword"  type="password" value="" maxlength="50" minlength="5" class="required form-control"/>
				</td>
			</tr>
			<tr>
				<td align="right" width="30%"><label>新密码:</label></td>
				<td>
					<input id="newPassword" name="newPassword" type="password" value="" 
						maxlength="50" minlength="6" class="required strongPassword  form-control"/>
				</td>
			</tr>
			<tr>
				<td align="right" width="30%"><label>确认新密码:</label></td>
				<td>
					<input id="confirmNewPassword" name="confirmNewPassword" type="password" value="" 
						maxlength="50" minlength="6" class="required form-control" equalTo="#newPassword"/>
				</td>
			</tr>
			<tr>
				<td colspan="2" align="center">
					<input class="btn btn-large btn-primary" type="submit" value="提交"/>
				</td>
			</tr>
		</table>
	</form:form>
</body>
</html>