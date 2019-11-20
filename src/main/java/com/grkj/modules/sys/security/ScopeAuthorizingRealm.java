package com.grkj.modules.sys.security;

import java.util.Base64;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.annotation.PostConstruct;

import com.grkj.modules.sys.exception.CommonAuthenticationException;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authc.credential.HashedCredentialsMatcher;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.crypto.hash.Md5Hash;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.apache.shiro.util.ByteSource;
import org.springframework.stereotype.Service;

import com.grkj.Global;
import com.grkj.lib.utils.Encodes;
import com.grkj.lib.utils.StringUtils;
import com.grkj.modules.sys.entity.Menu;
import com.grkj.modules.sys.entity.Role;
import com.grkj.modules.sys.entity.User;
import com.grkj.modules.sys.exception.AccountLockException;
import com.grkj.modules.sys.service.UserService;
import com.grkj.modules.sys.utils.UserUtils;

@Service
public class ScopeAuthorizingRealm extends AuthorizingRealm{
	

	/**
	 * {@inheritDoc}
	 */
	@Override
	protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
		// TODO Auto-generated method stub
		Principal principal = (Principal) getAvailablePrincipal(principals);
		User user =UserUtils.getUserService().getByLoginName(principal.getId());
		if(user!=null){
			SimpleAuthorizationInfo info = new SimpleAuthorizationInfo();
			
			//set the role list
			List<Role> roleList=UserUtils.getRoleService().getUserRoleByUserId(user.getId());
			Set<String> roles=new HashSet<String>();
			for(Role item:roleList){
				roles.add(item.getId());
			}
			info.setRoles(roles);
			
			//set the permission list
			List<Menu> menuList = UserUtils.getMenuService().getListByUserId(user.getId());
			Set<String> stringPermissions=new HashSet<String>();
			for(Menu item:menuList){
				if(!StringUtils.isBlank(item.getPermission())){
					stringPermissions.add(item.getPermission());
				}
			}
			info.setStringPermissions(stringPermissions);
			return info;
		}
		return null;
	}

	/**
	 * {@inheritDoc}
	 */
	@Override
	protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) throws AuthenticationException {
		if(token instanceof ScopeUsernamePasswordToken) {
			try {
				ScopeUsernamePasswordToken usernamePasswordToken = (ScopeUsernamePasswordToken) token;
				User user = UserUtils.getUserService().getByLoginName(usernamePasswordToken.getUsername());
				if (user != null) {
					if (Global.NO.equals(user.getFlag().toString())) {
						throw new AccountLockException("用户不可用");
					}
					//byte[] salt =Base64.getDecoder().decode(user.getPassword().substring(0, 16));
					byte[] salt = Encodes.decodeHex(user.getPassword().substring(0, 16));
					return new SimpleAuthenticationInfo(new ScopePrincipal(usernamePasswordToken),
							user.getPassword().substring(16), ByteSource.Util.bytes(salt), getName());
				}
			}catch (Exception e){
				e.printStackTrace();
				throw new CommonAuthenticationException(e);
			}
		}
		return null;
	}
	
	
	
	
	@Override
	public boolean supports(AuthenticationToken token) {
		// TODO Auto-generated method stub
		return token!=null&&token instanceof ScopeUsernamePasswordToken;
	}

	/**
	 * 设定密码校验的Hash算法与迭代次数
	 */
	@PostConstruct
	public void initCredentialsMatcher() {
		HashedCredentialsMatcher matcher = new HashedCredentialsMatcher(UserService.HASH_ALGORITHM);
		matcher.setHashIterations(UserService.HASH_INTERATIONS);
		setCredentialsMatcher(matcher);
	}

	/**
	 * 重写权限信息缓存key获取方法，解决开启了使用redis的session共享，即借助spring-session的@EnableRedisHttpSession时，shiro的doGetAuthorizationInfo获取权限缓存可能会失效，即从缓存中获取不到权限信息的问题。
	 * 从源码中可以看出AuthorizingRealm获取权限缓存的时候，是Object key = getAuthorizationCacheKey(principals)这样获取的，getAuthorizationCacheKey方法是直接返回PrincipalCollection对象，spring-session每次从redis中获取此对象的时候，反序列化成对象之后，对象的地址都是不同的，这就是导致的原因
	 */
	@Override
	protected Object getAuthorizationCacheKey(PrincipalCollection principals) {
		// TODO Auto-generated method stub
		Principal principal = (Principal) getAvailablePrincipal(principals);
		return "AuthorizationCacheKey_"+principal.getId();
	}
	
	

}
