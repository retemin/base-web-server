/**
 * 
 */
package com.grkj.modules.sys.exception;

import org.apache.shiro.authc.AuthenticationException;

/**
 * <p>Title: CaptchaNotExistException</p>
 * <p>Description: </p>
 * <p>Company:Guangzhou Software Technology Co.,Ltd</p> 
 * @author TW
 * @date 2017年1月4日 上午9:28:09
 */
public class CaptchaErrorException extends AuthenticationException{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	/**
	 * 
	 */
	public CaptchaErrorException() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @param message
	 * @param cause
	 */
	public CaptchaErrorException(String message, Throwable cause) {
		super(message, cause);
		// TODO Auto-generated constructor stub
	}

	/**
	 * @param message
	 */
	public CaptchaErrorException(String message) {
		super(message);
		// TODO Auto-generated constructor stub
	}

	/**
	 * @param cause
	 */
	public CaptchaErrorException(Throwable cause) {
		super(cause);
		// TODO Auto-generated constructor stub
	}
	
}
