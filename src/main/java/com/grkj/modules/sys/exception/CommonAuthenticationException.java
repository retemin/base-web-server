package com.grkj.modules.sys.exception;

import org.apache.shiro.authc.AuthenticationException;

public class CommonAuthenticationException extends AuthenticationException{

	private static final long serialVersionUID = 1L;

	public CommonAuthenticationException() {
		super();
		// TODO Auto-generated constructor stub
	}

	public CommonAuthenticationException(String message, Throwable cause) {
		super(message, cause);
		// TODO Auto-generated constructor stub
	}

	public CommonAuthenticationException(String message) {
		super(message);
		// TODO Auto-generated constructor stub
	}

	public CommonAuthenticationException(Throwable cause) {
		super(cause);
		// TODO Auto-generated constructor stub
	}
	
	
	
}
