package com.grkj;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.grkj.lib.cache.caffeine.CaffeineCacheManager;
import com.grkj.lib.cache.core.CacheManager;


@Configuration
public class SpringContextCache {
	
	@Bean
	public CacheManager localCacheManager(){
		return new CaffeineCacheManager();
	}
}
