package com.grkj.modules.sys.mapper;

import com.grkj.common.persistence.annotation.DBMapper;
import com.grkj.lib.mybatis.mapper.ComplexMapper;
import com.grkj.modules.sys.entity.RequestLog;

@DBMapper
public interface SysRequestLogMapper extends ComplexMapper<RequestLog> {
	
	
}
