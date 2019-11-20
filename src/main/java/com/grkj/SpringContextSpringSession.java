package com.grkj;

import org.springframework.context.EnvironmentAware;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.session.data.redis.config.annotation.web.http.EnableRedisHttpSession;
import org.springframework.session.web.http.CookieSerializer;
import org.springframework.session.web.http.DefaultCookieSerializer;
import org.springframework.session.web.http.HttpSessionIdResolver;

import com.grkj.modules.sys.security.BothHttpSessionIdResolver;

@Configuration
@EnableRedisHttpSession(maxInactiveIntervalInSeconds=7200,redisNamespace="grdoc-session")
public class SpringContextSpringSession implements EnvironmentAware{
	
	private Environment env;

	
	@Bean
	public CookieSerializer cookieSerializer() {
		DefaultCookieSerializer defaultCookieSerializer = new DefaultCookieSerializer();
		// cookie名字
		defaultCookieSerializer.setCookieName(env.getProperty("session.tokenName"));
		// 存储路径
		defaultCookieSerializer.setCookiePath("/");
		return defaultCookieSerializer;
	}
	
	@Bean
	public HttpSessionIdResolver httpSessionIdResolver() {
		return new BothHttpSessionIdResolver(env.getProperty("session.tokenName"),cookieSerializer());
	}

	@Override
	public void setEnvironment(Environment environment) {
		env=environment;
	}

}
