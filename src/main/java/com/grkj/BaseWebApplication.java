package com.grkj;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.SpringBootConfiguration;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.freemarker.FreeMarkerAutoConfiguration;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.autoconfigure.jdbc.DataSourceTransactionManagerAutoConfiguration;
import org.springframework.boot.context.TypeExcludeFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.ComponentScan.Filter;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.context.annotation.FilterType;
import org.springframework.context.annotation.Lazy;

import com.grkj.common.keyGenerator.Time22KeyGenerator;
import com.grkj.lib.keyGenerator.KeyGenerator;
import com.grkj.lib.message.web.HandlerExceptionController;
import com.grkj.lib.monitor.configuration.EnableMonitorConfiguration;
import com.grkj.lib.monitor.configuration.EnableMonitorUIConfiguration;
import com.grkj.lib.utils.SpringContextHolder;

@SpringBootConfiguration
@EnableAutoConfiguration(exclude={DataSourceAutoConfiguration.class,DataSourceTransactionManagerAutoConfiguration.class,FreeMarkerAutoConfiguration.class})
@EnableAspectJAutoProxy
@ComponentScan(excludeFilters={@Filter(type=FilterType.REGEX,pattern="com.grkj.lib.*"),
		@Filter(type = FilterType.CUSTOM, classes = TypeExcludeFilter.class)})
@EnableMonitorConfiguration
@EnableMonitorUIConfiguration
public class BaseWebApplication {

	public static void main(String[] args) {
		SpringApplication.run(BaseWebApplication.class, args);
	}
	
	@Bean
	@Lazy(false)
	public SpringContextHolder springContextHolder(){
		return new SpringContextHolder();
	}
	
	@Bean
	public KeyGenerator<String> stringKeyGenerator(){
		return new Time22KeyGenerator();
	}
	
	@Bean
	public HandlerExceptionController handlerExceptionController(){
		HandlerExceptionController handler = new HandlerExceptionController();
		handler.setPrintStackTrace(true);
		return handler;
	}
}
