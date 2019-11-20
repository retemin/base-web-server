package com.grkj.modules.sys.security;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import org.apache.shiro.web.filter.authc.LogoutFilter;

import com.grkj.lib.jsonLib.mapper.JsonMapper;
import com.grkj.lib.message.entity.ResponseMessage;

public class RestfulLogoutFilter extends LogoutFilter{

	@Override
	protected void issueRedirect(ServletRequest request, ServletResponse response, String redirectUrl)
			throws Exception {
		// TODO Auto-generated method stub
		HttpServletRequest httpServletRequest = (HttpServletRequest) request;
		if (httpServletRequest.getContentType() != null
				&& httpServletRequest.getContentType().indexOf("application/json") != -1) {
			response.getWriter().write(JsonMapper.getInstance().toJson(ResponseMessage.newOkInstance(null, "注销成功")));
		}else {
			super.issueRedirect(request, response, redirectUrl);
		}
		
	}
	
}
