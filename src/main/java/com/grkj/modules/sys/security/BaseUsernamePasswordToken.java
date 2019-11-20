package com.grkj.modules.sys.security;

import org.apache.shiro.authc.UsernamePasswordToken;

public class BaseUsernamePasswordToken extends UsernamePasswordToken {

	private static final long serialVersionUID = 1L;
	
	private Boolean isMobile;
	

	public BaseUsernamePasswordToken() {
		super();
		// TODO Auto-generated constructor stub
	}

	public BaseUsernamePasswordToken(String username,  String password, boolean rememberMe, String host,Boolean isMobile) {
		super(username, password, rememberMe, host);
		this.isMobile=isMobile;
		// TODO Auto-generated constructor stub
	}


	public Boolean getIsMobile() {
		return isMobile;
	}

	public void setIsMobile(Boolean isMobile) {
		this.isMobile = isMobile;
	}
	
	
}
