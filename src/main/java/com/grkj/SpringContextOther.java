package com.grkj;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

import com.grkj.lib.msoffice.configration.JqgridExcelConfigration;
import com.grkj.lib.msoffice.other.LocalPathTempFileStorage;
import com.grkj.lib.msoffice.other.TempFileStorage;

@Configuration
@Import(JqgridExcelConfigration.class)
public class SpringContextOther {
	
	@Bean
	public TempFileStorage tempFileStorage() {
		return new LocalPathTempFileStorage("f:\\");
	}
}
