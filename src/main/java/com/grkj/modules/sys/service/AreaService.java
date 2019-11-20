package com.grkj.modules.sys.service;

import java.util.List;

import com.grkj.common.base2.core.CurdService;
import com.grkj.modules.sys.entity.Area;

public interface AreaService extends CurdService<Area>{
	
	List<Area> getList(Object param);

	void updateFlag(String id, Integer flag);
	
	
}
