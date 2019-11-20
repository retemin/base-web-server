package com.grkj.modules.sys.exception;

import org.apache.shiro.authc.AuthenticationException;

public class AccountLockException extends AuthenticationException{

	private static final long serialVersionUID = 1L;

	public AccountLockException() {
		super();
		// TODO Auto-generated constructor stub
	}

	public AccountLockException(String message, Throwable cause) {
		super(message, cause);
		// TODO Auto-generated constructor stub
	}

	public AccountLockException(String message) {
		super(message);
		// TODO Auto-generated constructor stub
	}

	public AccountLockException(Throwable cause) {
		super(cause);
		// TODO Auto-generated constructor stub
	}
	
	
	
}
