package com.grkj;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

import javax.servlet.Filter;

import com.grkj.modules.sys.security.RestfulLogoutFilter;
import com.grkj.modules.sys.security.RestfulUserFilter;
import com.grkj.modules.sys.security.ScopeAuthorizingRealm;
import com.grkj.modules.sys.security.ScopeFormAuthenticationFilter;

import org.apache.shiro.mgt.SecurityManager;
import org.apache.shiro.spring.security.interceptor.AuthorizationAttributeSourceAdvisor;
import org.apache.shiro.spring.web.ShiroFilterFactoryBean;
import org.apache.shiro.web.mgt.DefaultWebSecurityManager;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.EnvironmentAware;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;

@Configuration
public class SpringContextShiro implements EnvironmentAware {
	private Environment env;


	@Bean(name = "shiroFilter")
	public ShiroFilterFactoryBean shiroFilter(SecurityManager securityManager) {
		ShiroFilterFactoryBean shiroFilter = new ShiroFilterFactoryBean();

		shiroFilter.setSecurityManager(securityManager);

		Map<String, Filter> filterMap = new HashMap<String, Filter>();
		filterMap.put("authc", scopeFormAuthenticationFilter());
		filterMap.put("restfulUser", restfulUserFilter());
		filterMap.put("restfulLogout", restfulLogoutFilter());

		// filterMap.put("sso", ssoAuthenticationFilter);
		shiroFilter.setFilters(filterMap);

		// Shiro权限过滤过滤器定义
		Map<String, String> definitionsMap = new LinkedHashMap<String, String>();
		definitionsMap.put("/favicon.ico", "anon");
		definitionsMap.put("/error", "anon");
		definitionsMap.put("/static/plugin/**", "anon");
		definitionsMap.put("/static/common/**", "anon");
		definitionsMap.put("/static/modules/main/css/login.css", "anon");
		definitionsMap.put("/static/modules/main/images/**", "anon");

		definitionsMap.put("/static/modules/login/**", "anon");
		definitionsMap.put("/static/modules/main/**", "anon");
		
		definitionsMap.put("/login", "authc");
		definitionsMap.put("/logout", "restfulLogout");

		definitionsMap.put("/**", "restfulUser");
		shiroFilter.setFilterChainDefinitionMap(definitionsMap);
		shiroFilter.setLoginUrl("/login");
		shiroFilter.setSuccessUrl("/");

		return shiroFilter;
	}
	
	
	@Bean
	public ScopeFormAuthenticationFilter scopeFormAuthenticationFilter() {
		return new ScopeFormAuthenticationFilter();
	}
	
	/**
	 * 禁用spring自动注册filter的bean，解决filter冲突问题
	 * @return
	 */
	@Bean
	public FilterRegistrationBean<ScopeFormAuthenticationFilter> scopeFormAuthenticationFilterRegistration() {
	    FilterRegistrationBean<ScopeFormAuthenticationFilter> registration = new FilterRegistrationBean<ScopeFormAuthenticationFilter>(scopeFormAuthenticationFilter());
	    registration.setEnabled(false);
	    return registration;
	}
	
	
	@Bean
	public RestfulUserFilter restfulUserFilter() {
		return new RestfulUserFilter();
	}
	
	/**
	 * 禁用spring自动注册filter的bean，解决filter冲突问题
	 * @return
	 */
	@Bean
	public FilterRegistrationBean<RestfulUserFilter> restfulUserFilterRegistration() {
	    FilterRegistrationBean<RestfulUserFilter> registration = new FilterRegistrationBean<RestfulUserFilter>(restfulUserFilter());
	    registration.setEnabled(false);
	    return registration;
	}
	
	@Bean
	public RestfulLogoutFilter restfulLogoutFilter() {
		return new RestfulLogoutFilter();
	}
	
	/**
	 * 禁用spring自动注册filter的bean，解决filter冲突问题
	 * @return
	 */
	@Bean
	public FilterRegistrationBean<RestfulLogoutFilter> restfulLogoutFilterRegistration() {
	    FilterRegistrationBean<RestfulLogoutFilter> registration = new FilterRegistrationBean<RestfulLogoutFilter>(restfulLogoutFilter());
	    registration.setEnabled(false);
	    return registration;
	}


	@Bean(name = "securityManager")
	public SecurityManager securityManager(ScopeAuthorizingRealm scopeAuthorizingRealm) {
		DefaultWebSecurityManager defaultWebSecurityManager = new DefaultWebSecurityManager();

/*		ModularRealmAuthenticator authenticator = (ModularRealmAuthenticator) defaultWebSecurityManager
				.getAuthenticator();
		authenticator.setAuthenticationStrategy(new FirstSuccessfulStrategy());

		Collection<Realm> realms = new ArrayList<Realm>();
		realms.add(scopeAuthorizingRealm);
		defaultWebSecurityManager.setRealms(realms);*/
		//改为只有一个realm
		defaultWebSecurityManager.setRealm(scopeAuthorizingRealm);
		return defaultWebSecurityManager;
	}

	@Bean
	public AuthorizationAttributeSourceAdvisor authorizationAttributeSourceAdvisor(SecurityManager securityManager) {
		AuthorizationAttributeSourceAdvisor authorizationAttributeSourceAdvisor = new AuthorizationAttributeSourceAdvisor();
		authorizationAttributeSourceAdvisor.setSecurityManager(securityManager);
		return authorizationAttributeSourceAdvisor;
	}

	@Override
	public void setEnvironment(Environment environment) {
		// TODO Auto-generated method stub
		this.env = environment;
	}
}
