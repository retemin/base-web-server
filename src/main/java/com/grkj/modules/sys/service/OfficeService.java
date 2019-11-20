package com.grkj.modules.sys.service;

import com.grkj.common.base2.core.CurdService;
import com.grkj.modules.sys.entity.Office;

public interface OfficeService  extends CurdService<Office>{
	public static final String RMI_SERVICENAME="Office";
	
	void updateFlag(String id, String flag);
}
