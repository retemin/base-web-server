package com.grkj;

import java.time.Duration;

import org.apache.commons.pool2.impl.GenericObjectPoolConfig;
import org.springframework.context.EnvironmentAware;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.data.redis.connection.ReactiveRedisConnectionFactory;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.RedisStandaloneConfiguration;
import org.springframework.data.redis.connection.lettuce.LettuceClientConfiguration;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.connection.lettuce.LettucePoolingClientConfiguration;
import org.springframework.data.redis.core.StringRedisTemplate;

@Configuration
public class SpringContextRedis implements EnvironmentAware {
	private Environment env;
	
	@Bean
	public StringRedisTemplate stringRedisTemplate(RedisConnectionFactory factory) {
		return new StringRedisTemplate(factory);
		
	}

	/**
	 * 自定义redisConnectionFactory  设置自己的host跟port，
	 * 注意这个bean必须要叫redisConnectionFactory 才能覆盖自动配置的redisConnectionFactory
	 * @return
	 */
	@Bean
	public ReactiveRedisConnectionFactory redisConnectionFactory() {
		GenericObjectPoolConfig poolConfig = new GenericObjectPoolConfig() ;
		poolConfig.setMinIdle(Integer.valueOf(env.getProperty("spring.redis.lettuce.pool.min-idle")));
		poolConfig.setMaxIdle(Integer.valueOf(env.getProperty("spring.redis.lettuce.pool.max-idle")));
		poolConfig.setMaxWaitMillis(Integer.valueOf(env.getProperty("spring.redis.lettuce.pool.max-wait")));
		poolConfig.setMaxTotal(Integer.valueOf(env.getProperty("spring.redis.lettuce.pool.max-active")));
		
	  LettuceClientConfiguration clientConfig = LettucePoolingClientConfiguration.builder()
	    .poolConfig(poolConfig)
	    .commandTimeout(Duration.ofMillis(Long.valueOf(env.getProperty("spring.redis.timeout")))  )
	    .shutdownTimeout(Duration.ofMillis(Long.valueOf(env.getProperty("spring.redis.lettuce.shutdown-timeout"))))
	    .build();

	  return new LettuceConnectionFactory(new RedisStandaloneConfiguration(env.getProperty("spring.redis.host"),Integer.valueOf(env.getProperty("spring.redis.port")) ), clientConfig);
	}

	@Override
	public void setEnvironment(Environment environment) {
		this.env=environment;
	}
}
