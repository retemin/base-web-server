package com.grkj.modules.sys.security;

import java.io.Serializable;

/**
 * principal of system user
 * @author jiabi
 *
 */
public class BasePrincipal implements Principal,Serializable {

	private static final long serialVersionUID = 1L;

	private String id; 
	private boolean isMobile; // 是否手机登录

	public BasePrincipal(){
		
	}
	
	public BasePrincipal(BaseUsernamePasswordToken token) {
		this.id = token.getUsername();
		this.isMobile = token.getIsMobile();
	}

	public BasePrincipal(String id, boolean isMobile) {
		this.id = id;
		this.isMobile = isMobile;
	}
	
	public String getId() {
		return id;
	}
	public void setId(String id){
		this.id=id;
	}

	public boolean isMobile() {
		return isMobile;
	}

	public void setMobile(boolean isMobile) {
		this.isMobile = isMobile;
	}

	@Override
	public String toString() {
		return id;
	}

}