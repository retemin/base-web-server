package com.grkj.modules.sys.security;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.session.web.http.CookieHttpSessionIdResolver;
import org.springframework.session.web.http.CookieSerializer;
import org.springframework.session.web.http.DefaultCookieSerializer;
import org.springframework.session.web.http.HeaderHttpSessionIdResolver;
import org.springframework.session.web.http.HttpSessionIdResolver;

import com.grkj.lib.utils.StringUtils;

/**
 * 兼容cookies sessionid 与头部sessionid 获取sessionId  ,有限从都不获取
 * @author jiabi
 *
 */
public class BothHttpSessionIdResolver implements HttpSessionIdResolver {
	
	private String tokenName;
	
	private CookieHttpSessionIdResolver cookieHttpSessionIdResolver;
	private HeaderHttpSessionIdResolver headerHttpSessionIdResolver;
	
	@Autowired(required=false)
	private CookieSerializer cookieSerializer ;
	
	public BothHttpSessionIdResolver(String tokenName,CookieSerializer cookieSerializer) {
		this.tokenName=tokenName;
		cookieHttpSessionIdResolver=new CookieHttpSessionIdResolver();
		if(cookieSerializer!=null) {
			this.cookieSerializer=cookieSerializer;
		}else if(this.cookieSerializer==null){
			this.cookieSerializer=new DefaultCookieSerializer();
			((DefaultCookieSerializer)this.cookieSerializer).setCookieName(tokenName);
		}
		cookieHttpSessionIdResolver.setCookieSerializer(this.cookieSerializer);
		headerHttpSessionIdResolver=new HeaderHttpSessionIdResolver(tokenName);
	}
	
	@Override
	public List<String> resolveSessionIds(HttpServletRequest request) {
		// TODO Auto-generated method stub
		if(StringUtils.isNotBlank(request.getHeader(tokenName))) {
			return headerHttpSessionIdResolver.resolveSessionIds(request);
		}else {
			return cookieHttpSessionIdResolver.resolveSessionIds(request);
		}
	}

	@Override
	public void setSessionId(HttpServletRequest request, HttpServletResponse response, String sessionId) {
		// TODO Auto-generated method stub
		if(StringUtils.isNotBlank(request.getHeader(tokenName))) {
			 headerHttpSessionIdResolver.setSessionId(request, response, sessionId);
		}else {
			 cookieHttpSessionIdResolver.setSessionId(request, response, sessionId);
		}
	}

	@Override
	public void expireSession(HttpServletRequest request, HttpServletResponse response) {
		// TODO Auto-generated method stub
		if(StringUtils.isNotBlank(request.getHeader(tokenName))) {
			headerHttpSessionIdResolver.expireSession(request, response);
		}else {
		    cookieHttpSessionIdResolver.expireSession(request, response);
		}
	}

}
