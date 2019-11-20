package com.grkj.modules.sys.security;

public class ScopeUsernamePasswordToken extends BaseUsernamePasswordToken{

	private static final long serialVersionUID = 1L;
	
	private String scope;
	private String captcha;
	
	

	public String getCaptcha() {
		return captcha;
	}

	public void setCaptcha(String captcha) {
		this.captcha = captcha;
	}

	public ScopeUsernamePasswordToken() {
		super();
		// TODO Auto-generated constructor stub
	}

	public ScopeUsernamePasswordToken(String username, String password, String captcha, Boolean rememberMe, String host,
			Boolean isMobile,String scope) {
		super(username, password, rememberMe, host, isMobile);
		this.scope=scope;
		this.captcha=captcha;
		// TODO Auto-generated constructor stub
	}
	
	public ScopeUsernamePasswordToken(String username, String password, Boolean rememberMe
			, String host,
			Boolean isMobile,String scope) {
		super(username, password, rememberMe, host, isMobile);
		this.scope=scope;
		// TODO Auto-generated constructor stub
	}

	public String getScope() {
		return scope;
	}

	public void setScope(String scope) {
		this.scope = scope;
	}
	
	

}
