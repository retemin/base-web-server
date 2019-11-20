package com.grkj;

import org.springframework.context.EnvironmentAware;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;

import io.swagger.annotations.Api;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger.web.DocExpansion;
import springfox.documentation.swagger.web.OperationsSorter;
import springfox.documentation.swagger.web.TagsSorter;
import springfox.documentation.swagger.web.UiConfiguration;
import springfox.documentation.swagger.web.UiConfigurationBuilder;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import static com.google.common.base.Predicates.and;

import java.util.Collections;

@Configuration
@EnableSwagger2
public class SpringContextSwagger implements EnvironmentAware {

	private Environment env;

	@Bean
	public Docket sysApi() {
		return new Docket(DocumentationType.SWAGGER_2).select()
				.apis(and(RequestHandlerSelectors.withClassAnnotation(Api.class),
						RequestHandlerSelectors.basePackage("com.grkj.modules.sys")))
				.paths(PathSelectors.any()).build().groupName("权限中心")
				.apiInfo(new ApiInfo("权限中心API文档", "系统管理模块的接口文档", "0.1-beta", "",
						new Contact("山西遥测项目组", "http://www.gzgrkj.cn/", "http://www.gzgrkj.cn/"), "", "",
						Collections.emptyList()))
				.pathMapping("/").useDefaultResponseMessages(false);
	}

	@Bean
	public Docket ycApi() {
		return new Docket(DocumentationType.SWAGGER_2).select()
				.apis(and(RequestHandlerSelectors.withClassAnnotation(Api.class),
						RequestHandlerSelectors.basePackage("com.grkj.modules.yc")))
				.paths(PathSelectors.any()).build().groupName("遥测管理模块")
				.apiInfo(new ApiInfo("遥测管理模块API文档", "遥感监测管理模块的接口文档", "0.1-beta", "", null, "", "", Collections.emptyList()))
				.pathMapping("/").useDefaultResponseMessages(false);
	}

	@Bean
	public Docket jdcApi() {
		return new Docket(DocumentationType.SWAGGER_2).select()
				.apis(and(RequestHandlerSelectors.withClassAnnotation(Api.class),
						RequestHandlerSelectors.basePackage("com.grkj.modules.jdc")))
				.paths(PathSelectors.any()).build().groupName("机动车管理模块")
				.apiInfo(new ApiInfo("机动车管理模块API文档", "机动车环检管理模块的接口文档", "0.1-beta", "", null, "", "", Collections.emptyList()))
				.pathMapping("/").useDefaultResponseMessages(false);
	}

	@Bean
	UiConfiguration uiConfig() {
		return UiConfigurationBuilder.builder()
				.deepLinking(true)
				.displayOperationId(false)
				.defaultModelsExpandDepth(1)
				.defaultModelExpandDepth(1)
				.displayRequestDuration(true)
				.docExpansion(DocExpansion.NONE).filter(false)
				.maxDisplayedTags(null)
				.operationsSorter(OperationsSorter.ALPHA)
				.showExtensions(false)
				.tagsSorter(TagsSorter.ALPHA)
				.supportedSubmitMethods(UiConfiguration.Constants.DEFAULT_SUBMIT_METHODS)
				.validatorUrl(null).build();
	}

	@Override
	public void setEnvironment(Environment environment) {
		this.env = environment;
	}
}
