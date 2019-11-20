package com.grkj;

import javax.sql.DataSource;

import org.springframework.context.EnvironmentAware;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.core.env.Environment;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import com.alibaba.druid.pool.DruidDataSource;

@Configuration
@EnableTransactionManagement()
public class SpringContextDataSource implements EnvironmentAware {
	private Environment env;

	@Bean(name = "dsMain",initMethod="init",destroyMethod="close")
	@Primary
	public DataSource dsMain() {
		//org.apache.tomcat.jdbc.pool.DataSource ds = new org.apache.tomcat.jdbc.pool.DataSource();
		DruidDataSource ds=new DruidDataSource();
		ds.setName(env.getProperty("datasource.main.name"));
		ds.setDriverClassName(env.getProperty("datasource.main.driverClassName"));
		ds.setUrl(env.getProperty("datasource.main.url"));
		ds.setMaxActive(Integer.valueOf(env.getProperty("datasource.main.maxActive")));
		ds.setMinIdle(Integer.valueOf(env.getProperty("datasource.main.minIdle")));
		ds.setMaxWait(Integer.valueOf(env.getProperty("datasource.main.maxWait")));
		ds.setInitialSize(Integer.valueOf(env.getProperty("datasource.main.initialSize")));
		ds.setUsername(env.getProperty("datasource.main.username"));
		ds.setPassword(env.getProperty("datasource.main.password"));
		ds.setTestWhileIdle(true);
		ds.setValidationQuery(env.getProperty("datasource.main.validationQuery"));
		ds.setDefaultAutoCommit(false);
		//ds.setCommitOnReturn(false);

		return ds;
	}
	
	@Bean
	public JdbcTemplate jdbcTemplate() {
		JdbcTemplate template = new JdbcTemplate();
		template.setDataSource(dsMain());
		return template;
	}
	

	@Bean(name = "transactionManager")
	@Primary
	public PlatformTransactionManager transactionManager(DataSource dsMain) {
		return  new DataSourceTransactionManager(dsMain);
	}


	@Override
	public void setEnvironment(Environment environment) {
		// TODO Auto-generated method stub
		this.env = environment;
	}
}
