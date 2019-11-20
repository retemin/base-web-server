package com.grkj;

import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import org.springframework.boot.web.server.ErrorPage;
import org.springframework.boot.web.server.ErrorPageRegistrar;
import org.springframework.boot.web.server.ErrorPageRegistry;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.ApplicationContext;
import org.springframework.context.EnvironmentAware;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.DelegatingFilterProxy;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.PathMatchConfigurer;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.handler.SimpleMappingExceptionResolver;
import org.springframework.web.servlet.resource.PathResourceResolver;
import org.springframework.web.servlet.resource.WebJarsResourceResolver;
import org.springframework.web.servlet.view.InternalResourceViewResolver;

import com.grkj.common.web.CustomCorsFilter;
import com.grkj.lib.jsonLib.mapper.JsonMapper;
import com.grkj.lib.jsonLib.resolver.JsonBeanArgumentResolver;
import com.grkj.lib.message.security.CookieHttpOnlyFilter;
import com.grkj.lib.message.security.XssSqlFilter;
import com.grkj.lib.page.resolver.PageArgumentResolver;
import com.grkj.modules.main.controller.ClobalErrorController;
import com.grkj.modules.sys.filter.OperateFilter;

@Configuration
public class SpringContextMVC implements
		EnvironmentAware,ErrorPageRegistrar,WebMvcConfigurer  {

	private Environment env;

	private ApplicationContext context;
	
	private ResourceHandlerRegistry resourceHandlerRegistry;

	@Override
	public void setEnvironment(Environment environment) {
		// TODO Auto-generated method stub
		this.env = environment;
	}
	
	@Override
    public void configurePathMatch(PathMatchConfigurer configurer) {
        configurer.setUseSuffixPatternMatch(false);
    }

	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		
		registry.addResourceHandler("swagger-ui.html")
        	.addResourceLocations("classpath:/META-INF/resources/");
		registry.addResourceHandler("/webjars/**")
        	.addResourceLocations("classpath:/META-INF/resources/webjars/");
		registry.addResourceHandler("/static/modules/**")
			.addResourceLocations("/static/modules/").setCachePeriod(0);
		registry.addResourceHandler("/static/common/**")
			.addResourceLocations("/static/common/").setCachePeriod(0);
		registry.addResourceHandler("/static/plugin/**")
			.addResourceLocations("/static/plugin/").setCachePeriod(31536000);
		registry.addResourceHandler("/webjars/**").addResourceLocations("/webjars/")
			.resourceChain(false)
			.addResolver(new WebJarsResourceResolver())
			.addResolver(new PathResourceResolver());
	}

	
	@Override
    public void registerErrorPages(ErrorPageRegistry registry) {
		//if(env.getProperty("spring.profiles.include").contains("pro")){
		registry.addErrorPages(new ErrorPage(HttpStatus.NOT_FOUND, "/error/404"));
		registry.addErrorPages(new ErrorPage(HttpStatus.INTERNAL_SERVER_ERROR, "/error/500"));
		//}
    }
	

	/**
	 * 定义视图文件解析
	 * 
	 * @return
	 */
	@Bean
	public InternalResourceViewResolver internalResourceViewResolver() {
		InternalResourceViewResolver internalResourceViewResolver = new InternalResourceViewResolver();
		internalResourceViewResolver.setPrefix(env
				.getProperty("web.view.prefix"));
		internalResourceViewResolver.setSuffix(env
				.getProperty("web.view.suffix"));
		return internalResourceViewResolver;
	}
	
	@Bean
	@Profile("pro")
	public ClobalErrorController clobalErrorController(){
		return new ClobalErrorController();
	}

	@Bean
	public StringHttpMessageConverter stringHttpMessageConverter() {
		return new StringHttpMessageConverter(Charset.forName(env
				.getProperty("app.charset")));
	}

	@Bean
	public MappingJackson2HttpMessageConverter mappingJackson2HttpMessageConverter() {
		MappingJackson2HttpMessageConverter mappingJackson2HttpMessageConverter = new MappingJackson2HttpMessageConverter();
		List<MediaType> supportedMediaTypes = new ArrayList<MediaType>();
		supportedMediaTypes.add(new MediaType("application", "json", Charset
				.forName(env.getProperty("app.charset"))));
		mappingJackson2HttpMessageConverter
				.setSupportedMediaTypes(supportedMediaTypes);
		mappingJackson2HttpMessageConverter.setPrettyPrint(false);
		mappingJackson2HttpMessageConverter.setObjectMapper(new JsonMapper().enableSimple());
		return mappingJackson2HttpMessageConverter;
	}

	@Override
	public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
		// equivalent to <mvc:message-converters>
		converters.add(mappingJackson2HttpMessageConverter());
		converters.add(stringHttpMessageConverter());
	}

	@Bean
	public JsonBeanArgumentResolver jsonBeanArgumentResolver() {
		return new JsonBeanArgumentResolver();
	}

	@Bean
	public PageArgumentResolver jqgridArgumentResolver() {
		return new PageArgumentResolver();
	}
	
	@Bean
	public CustomCorsFilter corsFilter() {
		CorsConfiguration config = new CorsConfiguration();

		config.setAllowCredentials(true);
		config.addAllowedOrigin("*");
		config.addAllowedHeader("*");
		config.addAllowedMethod("*");

		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", config);

		CustomCorsFilter filter = new CustomCorsFilter(source);
		return filter;
	}
	
	@Override
	public void addArgumentResolvers(
			List<HandlerMethodArgumentResolver> argumentResolvers) {
		// equivalent to <mvc:argument-resolvers>
		argumentResolvers.add(0, jsonBeanArgumentResolver());
		argumentResolvers.add(jqgridArgumentResolver());
	}

	/************************************************************************************
	 * 注册过滤器，相当于在web.xml增加过滤器
	 ************************************************************************************/
	
	


	/**
	 * 防止xss,sql注入的过滤器
	 * @return
	 */
	@Bean
	@Profile("pro")
	public FilterRegistrationBean<XssSqlFilter> registerXssSqlFilter() {
		FilterRegistrationBean<XssSqlFilter> registration = new FilterRegistrationBean<XssSqlFilter>();
		XssSqlFilter xssFilter = new XssSqlFilter();
		xssFilter.setCheckRefer(false);
		registration.setFilter(xssFilter);
		List<String> urlMapping = new ArrayList<String>();
		urlMapping.add("/*");
		registration.setUrlPatterns(urlMapping);
		return registration;
	}
	
	@Bean 
	public FilterRegistrationBean<CookieHttpOnlyFilter> cookieHttpOnlyFilter(){
		FilterRegistrationBean<CookieHttpOnlyFilter> registration=new FilterRegistrationBean<CookieHttpOnlyFilter>();
		registration.setFilter(new CookieHttpOnlyFilter());
		registration.addUrlPatterns("/**"); 
		return registration;
	}
	
	
	/**
	 * shiro过滤器
	 * 
	 * @return
	 */
	@Bean
	public FilterRegistrationBean<DelegatingFilterProxy> registerShiroFilter() {
		FilterRegistrationBean<DelegatingFilterProxy> registration = new FilterRegistrationBean<DelegatingFilterProxy>();
		registration.setFilter(new DelegatingFilterProxy());
		Map<String, String> initParameters = new HashMap<String, String>();
		initParameters.put("targetFilterLifecycle", "true");
		initParameters.put("targetBeanName", "shiroFilter");
		registration.setInitParameters(initParameters);
		List<String> urlMapping = new ArrayList<String>();
		urlMapping.add("*");
		registration.setUrlPatterns(urlMapping);
		return registration;
	}
	
	/**
	 * 日志过滤器
	 * @return
	 */
	@Profile("pro")
	@Bean
	public OperateFilter operateFilter(){
		return new OperateFilter();
	}
	
	/**
	 * 注册日志过滤器
	 * @return
	 */	
	@Profile("pro")
	@Bean
	public FilterRegistrationBean<OperateFilter> registerLogFilter() {
		FilterRegistrationBean<OperateFilter> registration = new FilterRegistrationBean<OperateFilter>();
		registration.setFilter(operateFilter());
		List<String> urlMapping = new ArrayList<String>();
		urlMapping.add("/*");
		registration.setUrlPatterns(urlMapping);
		return registration;
	}
	
	
	@Bean
	public SimpleMappingExceptionResolver simpleMappingExceptionResolver(){
		SimpleMappingExceptionResolver simpleMappingExceptionResolver=
				new SimpleMappingExceptionResolver();
		Properties mappings = new Properties();
		
		simpleMappingExceptionResolver.setExceptionMappings(mappings);
		
		return simpleMappingExceptionResolver;
	}

	
}
