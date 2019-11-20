package com.grkj.modules.sys.security;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;

import com.grkj.common.web.CustomCorsFilter;
import com.grkj.lib.jsonLib.mapper.JsonMapper;
import com.grkj.lib.message.entity.ResponseMessage;
import com.grkj.modules.sys.utils.UserUtils;

public class RestfulUserFilter extends org.apache.shiro.web.filter.authc.UserFilter {
	@Autowired(required=false)
	private CustomCorsFilter corsFilter;
	
	@Override
	protected boolean onAccessDenied(ServletRequest request, ServletResponse response) throws Exception {
		// TODO Auto-generated method stub
		// ajax 请求返回json
		HttpServletRequest httpServletRequest = (HttpServletRequest) request;
		if (httpServletRequest.getContentType() != null
				&& httpServletRequest.getContentType().indexOf("application/json") != -1) {
			HttpServletResponse  httpServletResponse=(HttpServletResponse) response;
			response.setContentType("application/json;charset=utf-8");
			//手动处理跨域请求
			if(corsFilter!=null) {
				corsFilter.processRequest(httpServletRequest, (HttpServletResponse)response);
			}
			ResponseMessage res=null;
			if(UserUtils.getUser()==null) {
				httpServletResponse.setStatus(401);
				res=new ResponseMessage("401",null,"未登陆");
			}else {
				httpServletResponse.setStatus(403);
				res=ResponseMessage.newForbiddenInstance("没有访问改路径的权限");
			}
			httpServletResponse.getWriter().write(JsonMapper.getInstance().toJson(res));
			return false;
		}
		return super.onAccessDenied(request, response);
	}

	@Override
	protected boolean isAccessAllowed(ServletRequest request, ServletResponse response, Object mappedValue) {
		// TODO Auto-generated method stub
		HttpServletRequest httpRequest = (HttpServletRequest)request;
		if("OPTIONS".equals(httpRequest.getMethod())) {
			return true;
		}
		return super.isAccessAllowed(request, response, mappedValue);
	}
}
