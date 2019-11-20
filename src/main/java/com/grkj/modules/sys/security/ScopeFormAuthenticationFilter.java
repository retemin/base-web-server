package com.grkj.modules.sys.security;

import java.io.IOException;
import java.util.Map;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.web.filter.authc.FormAuthenticationFilter;
import org.apache.shiro.web.servlet.ProxiedFilterChain;
import org.apache.shiro.web.util.WebUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;

import com.grkj.common.web.CustomCorsFilter;
import com.grkj.lib.jsonLib.mapper.JsonMapper;
import com.grkj.lib.message.entity.ResponseMessage;
import com.grkj.lib.utils.HttpUtils;
import com.grkj.lib.utils.StringUtils;
import com.grkj.modules.sys.exception.AccountLockException;
import com.grkj.modules.sys.exception.CommonAuthenticationException;
import com.grkj.modules.sys.service.UserService;
import com.grkj.modules.sys.serviceImpl.AuthInfoService;

public class ScopeFormAuthenticationFilter extends FormAuthenticationFilter {

	public static final String DEFAULT_MOBILE_PARAM = "mobileLogin";
	public static final String DEFAULT_MESSAGE_PARAM = "message";

	public static final String PASSWORD_INCORRECT_COUNT_PARAM = "passwordIncorrectCount";

	private String mobileLoginParam = DEFAULT_MOBILE_PARAM;
	private String messageParam = DEFAULT_MESSAGE_PARAM;

	protected Logger logger = LoggerFactory.getLogger(getClass());

	@Value("${app.scope}")
	private String sope;
	
	private JsonMapper jsonMapper=JsonMapper.getInstance();

	@Autowired
	private UserService userService;
	
	@Autowired
	private AuthInfoService authInfoService;
	
	@Autowired(required=false)
	private CustomCorsFilter corsFilter;



	@Override
	protected AuthenticationToken createToken(ServletRequest request, ServletResponse response) {
		String username = getUsername(request);
		String password = getPassword(request);
		if(StringUtils.isBlank(username)&& request.getContentType().contains("application/json") ) {
			try {
				Map<String, Object> jsonMap = jsonMapper.readValue(request.getInputStream());
				username=(String) jsonMap.get("username");
				password=(String) jsonMap.get("password");
			} catch (IOException e) {
				e.printStackTrace();
				throw new CommonAuthenticationException("参数非法");
			}
		}
		if(StringUtils.isBlank(username)) {
			//return null;
			throw new CommonAuthenticationException("用户名不能为空");
		}
		if(StringUtils.isBlank(password)) {
			//return null;
			throw new CommonAuthenticationException("密码不能为空");
		}
		
		Boolean rememberMe = WebUtils.isTrue(request, getRememberMeParam());
		String host = request.getRemoteHost();
		Boolean isMobile = HttpUtils.isMobileDevice((HttpServletRequest) request);
		return new ScopeUsernamePasswordToken(username, password, rememberMe, host, isMobile, sope);

	}
	
	
	
	@Override
	protected AuthenticationToken createToken(String username, String password, ServletRequest request,
			ServletResponse response) {
		Boolean rememberMe = WebUtils.isTrue(request, getRememberMeParam());
		String host = request.getRemoteHost();
		Boolean isMobile = HttpUtils.isMobileDevice((HttpServletRequest) request);
		return  new ScopeUsernamePasswordToken(username, password, rememberMe, host, isMobile, sope);
	}

	@Override
	protected AuthenticationToken createToken(String username, String password, boolean rememberMe, String host) {
		// TODO Auto-generated method stub
		return  new ScopeUsernamePasswordToken(username, password, rememberMe, host, false, sope);
	}


	@Override
	protected boolean onLoginSuccess(AuthenticationToken token, Subject subject, ServletRequest request,
			ServletResponse response) throws Exception {
		logger.debug("{}(IP:{})login success", token.getPrincipal(), request.getRemoteHost());
		// loger.debug(((ScopeUsernamePasswordToken)token).getUsername()+" login success
		// in pc");
		// 登陆成功清楚密码计数
		HttpServletRequest httpServletRequest = (HttpServletRequest) request;
		httpServletRequest.getSession().setAttribute(PASSWORD_INCORRECT_COUNT_PARAM, null);
		// ajax 请求返回json
		if (httpServletRequest.getContentType()!=null&&httpServletRequest.getContentType().indexOf("application/json") != -1) {
			//手动处理跨域请求
			if(corsFilter!=null) {
				corsFilter.processRequest(httpServletRequest, (HttpServletResponse)response);
			}
			response.setContentType("application/json;charset=utf-8");
			response.getWriter().write(JsonMapper.getInstance().toJson(ResponseMessage.newOkInstance(authInfoService.getNowUserAuthInfo())));
			return false;
		}
		return super.onLoginSuccess(token, subject, request, response);

	}

	@Override
	protected void issueSuccessRedirect(ServletRequest request, ServletResponse response) throws Exception {
		// clear save url for the error rediect because of the use of iframe
		WebUtils.getAndClearSavedRequest(request);
		super.issueSuccessRedirect(request, response);
	}

	/**
	 * 登录失败调用事件
	 */
	@Override
	protected boolean onLoginFailure(AuthenticationToken token, AuthenticationException e, ServletRequest request,
			ServletResponse response) {
		String className = e.getClass().getName(), message = "";
		if (IncorrectCredentialsException.class.getName().equals(className)) {
			message = "密码错误, 请重试.";
			HttpServletRequest httpServletRequest = (HttpServletRequest) request;
			Integer count = (Integer) httpServletRequest.getSession().getAttribute(PASSWORD_INCORRECT_COUNT_PARAM);
			if (count == null) {
				count = 0;
				message = "密码错误，您还有" + (5 - count - 1) + "次重试机会";
			} else if (count >= 5) {

				String userLoginName = ((UsernamePasswordToken) token).getUsername();
				if (!"admin".equals(userLoginName)) {
					userService.lockUser(userLoginName);
				}
				message = "输入密码错误超过5次，锁定用户";
			} else {
				message = "密码错误，您还有" + (5 - count - 1) + "次重试机会";
			}

			httpServletRequest.getSession().setAttribute(PASSWORD_INCORRECT_COUNT_PARAM, ++count);
		} else if (UnknownAccountException.class.getName().equals(className)) {
			message = "用户不存在, 请检查用户名";
		} else if (AccountLockException.class.getName().equals(className)) {
			message = "用户被锁定，请联系管理员";
		} else if (e.getMessage() != null && StringUtils.startsWith(e.getMessage(), "msg:")) {
			message = StringUtils.replace(e.getMessage(), "msg:", "");
		} else {
			message = "用户或密码错误, 请重试.";
		}
		if (logger.isDebugEnabled()) {
			logger.debug("{}(IP:{})login faile,message:{}", token.getPrincipal(), request.getRemoteHost(),message);
			e.printStackTrace(); // 输出到控制台
		}
		// ajax 请求返回json
		HttpServletRequest httpServletRequest = (HttpServletRequest) request;
		if (httpServletRequest.getContentType()!=null&&httpServletRequest.getContentType().indexOf("application/json") != -1) {
			try {
				if(corsFilter!=null) {
					corsFilter.processRequest(httpServletRequest, (HttpServletResponse)response);
				}
				response.setContentType("application/json;charset=utf-8");
				response.getWriter().write(JsonMapper.getInstance().toJson(ResponseMessage.newErrorInstance(message)));
			} catch (IOException e1) {
				// TODO Auto-generated catch block
				throw new RuntimeException(e);
			}
			return false;
		}
		request.setAttribute(getFailureKeyAttribute(), className);
		request.setAttribute(getMessageParam(), message);
		return true;
	}
	
	public String getMessageParam() {
		return messageParam;
	}

}
