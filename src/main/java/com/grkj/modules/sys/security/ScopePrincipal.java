package com.grkj.modules.sys.security;

/**
 * principal with scope control ,for multi server authorizing,relate to {@link com.seven.modules.sys.entity.Menu.scope}
 * @author jiabi
 *
 */
public class ScopePrincipal  extends BasePrincipal{
	
	private String scope;

	private static final long serialVersionUID = 1L;

	public ScopePrincipal() {
		super();
		// TODO Auto-generated constructor stub
	}

	public ScopePrincipal(ScopeUsernamePasswordToken token) {
		super(token);
		this.scope=token.getScope();
		// TODO Auto-generated constructor stub
	}
	
	public ScopePrincipal(String id,boolean isMobile,String scope) {
		super(id,isMobile);
		this.scope = scope;
	}

	public String getScope() {
		return scope;
	}

	public void setScope(String scope) {
		this.scope = scope;
	}
	
	

}
