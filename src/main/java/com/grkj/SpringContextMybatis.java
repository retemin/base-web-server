package com.grkj;

import java.util.Properties;

import javax.sql.DataSource;

import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.springframework.context.ApplicationContext;
import org.springframework.context.EnvironmentAware;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.DependsOn;
import org.springframework.core.env.Environment;
import org.springframework.core.io.ClassPathResource;

import com.grkj.lib.mybatis.configuration.EnableDatabaseAutoConfig;
import com.grkj.lib.mybatis.page.MessagePageAnnoAop;

import tk.mybatis.spring.mapper.MapperScannerConfigurer;

@Configuration
public class SpringContextMybatis  implements EnvironmentAware  {
	
    private Environment env;

	@Bean(name="sqlSessionFactory")
	public SqlSessionFactory sqlSessionFactory(DataSource dsMysql,ApplicationContext applicationContext) throws Exception{
		//USE logback
		org.apache.ibatis.logging.LogFactory.useSlf4jLogging();
		final SqlSessionFactoryBean sessionFactory = new SqlSessionFactoryBean();
        sessionFactory.setDataSource(dsMysql);
        sessionFactory.setMapperLocations(applicationContext.getResources("classpath*:mapper/**/*.xml"));
        sessionFactory.setConfigLocation(new ClassPathResource("config/mybatis-config.xml"));
        return sessionFactory.getObject();
	}
	

	@Bean
	@DependsOn("sqlSessionFactory")
	public MapperScannerConfigurer dbMapperScannerConfigurer(){
		MapperScannerConfigurer mapperScannerConfigurer=new MapperScannerConfigurer();
		Properties properties = new Properties();
		properties.setProperty("mappers", "tk.mybatis.mapper.common.Mapper,com.grkj.lib.mybatis.mapper.ComplexMapper");
		mapperScannerConfigurer.setProperties(properties);
		mapperScannerConfigurer.setBasePackage(env.getProperty("mybatis.MapperScan"));
		mapperScannerConfigurer.setSqlSessionFactoryBeanName("sqlSessionFactory");
		mapperScannerConfigurer.setAnnotationClass(com.grkj.common.persistence.annotation.DBMapper.class);
		return mapperScannerConfigurer;
	}
	
	@Bean
	public MessagePageAnnoAop messagePageAop(){
		MessagePageAnnoAop messagePageAop=new MessagePageAnnoAop();
		messagePageAop.addPackageNames("com.grkj");
		return messagePageAop;
	}
	

	@Override
	public void setEnvironment(Environment environment) {
		// TODO Auto-generated method stub
		this.env=environment;
	}
	
}
